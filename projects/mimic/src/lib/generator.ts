import {
    MimicDefinition,
    MimicGenerator,
    MimicType,
    MimicTypeKind,
    MimicTemplateLiteralPartKind,
} from './contracts';
import { generatePrimary } from './primary.generator';

const getRandom = (min: number, max: number) => min + Math.random() * (max - min);
const getRandomInt = (min: number, max: number) => Math.round(getRandom(min, max));
const getRandomArray = (min: number, max: number) => new Array(getRandomInt(min, max)).fill(null);

const createTypeGenerator = (type: MimicType, generators: Record<string, MimicGenerator>): MimicGenerator => {
    switch (type.kind) {
        case MimicTypeKind.DefinitionReference:
            return () => generators[type.definition]();
        case MimicTypeKind.Literal:
            return () => type.value;
        case MimicTypeKind.Primary:
            const primaryArgs = (type.args || []).map(arg => typeof arg === 'object'
                ? createTypeGenerator(arg.type, generators)
                : arg,
            );
            return () => generatePrimary(type.primary, primaryArgs);
        case MimicTypeKind.Array:
            const arrayElementGenerator = createTypeGenerator(type.element, generators);
            return () => getRandomArray(type.min, type.max).map(arrayElementGenerator);
        case MimicTypeKind.Union:
            const unionTypeGenerators = type.types.map(type => createTypeGenerator(type, generators));
            return () => unionTypeGenerators[getRandomInt(0, unionTypeGenerators.length - 1)]();
        case MimicTypeKind.TemplateLiteral:
            const { parts } = type;
            const templateLiteralTypeGenerators = parts.map(part => part.kind === MimicTemplateLiteralPartKind.StringLiteral
                ? part.text
                : createTypeGenerator(part.type, generators),
            );
            return () => {
                let templateOutput = '';
                for (let i = 0; i < templateLiteralTypeGenerators.length; i++) {
                    templateOutput += parts[i].kind === MimicTemplateLiteralPartKind.StringLiteral
                        ? templateLiteralTypeGenerators[i] as string
                        : (templateLiteralTypeGenerators[i] as MimicGenerator)();
                }
                return templateOutput;
            };
        case MimicTypeKind.Optional:
            const optionalTypeGenerator = createTypeGenerator(type.type, generators);
            return () => type.chance > Math.random()
                ? optionalTypeGenerator()
                : undefined;
        case MimicTypeKind.Object:
            const typeLiteralPropertyGenerators = type.properties.map(property => ({
                property,
                generator: createTypeGenerator(property.type, generators),
            }));
            return () => {
                const value = {};
                for (const { property, generator } of typeLiteralPropertyGenerators) {
                    value[property.name] = generator();
                }
                return value;
            };
        case MimicTypeKind.Tuple:
            const tupleGenerators = type.elements.map(element => createTypeGenerator(element, generators));
            return () => tupleGenerators.map(elementGenerator => elementGenerator());
    }
};

export const createDefinitionGenerator = (name: string, definitions: Record<string, MimicDefinition>, generators: Record<string, MimicGenerator> = {}) => ({
    name: definitions[name].name,
    generator: createTypeGenerator(definitions[name].type, generators),
})
