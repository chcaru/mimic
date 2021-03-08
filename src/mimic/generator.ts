import {
    MimicDefintion,
    MimicGenerator,
    MimicProperty,
    MimicPropertyKind,
} from './contracts';
import { generatePrimary } from './primary.generator';

const getRandom = (min: number, max: number) => min + Math.random() * (max - min);
const getRandomInt = (min: number, max: number) => Math.round(getRandom(min, max));
const getRandomArray = (min: number, max: number) => new Array(getRandomInt(min, max)).fill(null);
const sometimes = (probability: number, gen: MimicGenerator) => () => probability > Math.random() ? gen() : undefined;
const maybeSometimes = (prop: MimicProperty, gen: MimicGenerator) => prop.optional
    ? sometimes(prop.sometimes ?? 0.5, gen)
    : prop.sometimes !== undefined
        ? sometimes(prop.sometimes, gen)
        : gen;

const createPropertyGenerator = (property: MimicProperty, generators: Record<string, MimicGenerator>) => {
    let generator: MimicGenerator;
    switch (property.kind) {
        case MimicPropertyKind.DefinitionReference:
            generator = () => generators[property.definition]();
            break;
        case MimicPropertyKind.Literal:
            generator = () => property.value;
            break;
        case MimicPropertyKind.Primary:
            generator = () => generatePrimary(property.primary, property.args || []);
            break;
        case MimicPropertyKind.Array:
            const elementGenerator = createPropertyGenerator(property.element as MimicProperty, generators);
            generator = () => getRandomArray(property.min, property.max).map(elementGenerator);
            break;
        case MimicPropertyKind.Union:
            const typeGenerators = property.types.map(type => createPropertyGenerator(type as MimicProperty, generators));
            generator = () => typeGenerators[getRandomInt(0, typeGenerators.length - 1)]();
            break;
    }
    return maybeSometimes(property, generator);
};

export const createDefinitionGenerator = (name: string, definitions: Record<string, MimicDefintion>, generators: Record<string, MimicGenerator> = {}) => {
    const definition = definitions[name];
    const properties = definition.members.map(member => ({
        member,
        generator: createPropertyGenerator(member, generators),
    }));

    const generator = () => {
        const value = {};
        for (const property of properties) {
            value[property.member.name] = property.generator();
        }
        return value;
    };

    return {
        name,
        generator,
    };
};
