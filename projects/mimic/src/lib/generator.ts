import {
    MimicDefinitionKind,
    MimicDefinition,
    MimicGenerator,
    MimicInterfaceDefinition,
    MimicType,
    MimicTypeDefinition,
    MimicTypeKind,
} from './contracts';
import { generatePrimary } from './primary.generator';

const getRandom = (min: number, max: number) => min + Math.random() * (max - min);
const getRandomInt = (min: number, max: number) => Math.round(getRandom(min, max));
const getRandomArray = (min: number, max: number) => new Array(getRandomInt(min, max)).fill(null);
const sometimes = (probability: number, gen: MimicGenerator) => () => probability > Math.random() ? gen() : undefined;
const maybeSometimes = (prop: MimicType, gen: MimicGenerator) =>
    prop.optional ? sometimes(prop.sometimes ?? 0.5, gen)
    : prop.sometimes !== undefined ? sometimes(prop.sometimes, gen)
    : gen;

const createTypeGenerator = (type: MimicType, generators: Record<string, MimicGenerator>) => {
    let generator: MimicGenerator;
    switch (type.kind) {
        case MimicTypeKind.DefinitionReference:
            generator = () => generators[type.definition]();
            break;
        case MimicTypeKind.Literal:
            generator = () => type.value;
            break;
        case MimicTypeKind.Primary:
            generator = () => generatePrimary(type.primary, type.args || []);
            break;
        case MimicTypeKind.Array:
            const elementGenerator = createTypeGenerator(type.element, generators);
            generator = () => getRandomArray(type.min, type.max).map(elementGenerator);
            break;
        case MimicTypeKind.Union:
            const typeGenerators = type.types.map(type => createTypeGenerator(type, generators));
            generator = () => typeGenerators[getRandomInt(0, typeGenerators.length - 1)]();
            break;
    }
    return maybeSometimes(type, generator);
};

const createInterfaceDefinitionGenerator = (definition: MimicInterfaceDefinition, generators: Record<string, MimicGenerator>) => {
    const properties = definition.properties.map(property => ({
        property,
        generator: createTypeGenerator(property.type, generators),
    }));

    const generator = () => {
        const value = {};
        for (const { property, generator } of properties) {
            value[property.name] = generator();
        }
        return value;
    };

    return {
        name: definition.name,
        generator,
    };
};

const createTypeDefinitionGenerator = (definition: MimicTypeDefinition, generators: Record<string, MimicGenerator>) => ({
    name: definition.name,
    generator: createTypeGenerator(definition.type, generators),
});

export const createDefinitionGenerator = (name: string, definitions: Record<string, MimicDefinition>, generators: Record<string, MimicGenerator> = {}) => {
    const definition = definitions[name];
    switch (definition.kind) {
        case MimicDefinitionKind.Interface: return createInterfaceDefinitionGenerator(definition, generators);
        case MimicDefinitionKind.Type: return createTypeDefinitionGenerator(definition, generators);
    }
};
