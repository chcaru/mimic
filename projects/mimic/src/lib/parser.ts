import { MimicDefinition, MimicGeneratorResult } from './contracts';
import { getDefinitions } from './definition';
import { createDefinitionGenerator } from './generator';

export const mimicDefinitions = (code: string) => getDefinitions(code);

export const mimicGenerators = (definitions: MimicDefinition[]): MimicGeneratorResult => {

    const definitionMap = {};
    for (const definition of definitions) {
        definitionMap[definition.name] = definition;
    }

    const generatorMap = {};
    const generatorDefinitions = definitions.map(
        definition => createDefinitionGenerator(definition.name, definitionMap, generatorMap),
    );
    for (const generatorDef of generatorDefinitions) {
        generatorMap[generatorDef.name] = generatorDef.generator;
    }

    return {
        definitions: generatorDefinitions,
        map: generatorMap,
    };
};

export const mimic = (code: string) => {
    const definitions = mimicDefinitions(code);
    return mimicGenerators(definitions);
};
