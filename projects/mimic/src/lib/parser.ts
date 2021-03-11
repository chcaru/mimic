import { MimicDefintion } from './contracts';
import { getDefinitions } from './definition';
import { createDefinitionGenerator } from './generator';

export const mimicDefinitions = (code: string) => getDefinitions(code);

export const mimicGenerators = (definitions: MimicDefintion[]) => {

    const definitionMap = {};
    for (const definition of definitions) {
        definitionMap[definition.name] = definition;
    }

    const generatorMap = {};
    const generatorDefs = definitions.map(
        definition => createDefinitionGenerator(definition.name, definitionMap, generatorMap),
    );
    for (const generatorDef of generatorDefs) {
        generatorMap[generatorDef.name] = generatorDef.generator;
    }

    return {
        generatorMap,
        generatorDefs,
    };
};

export const mimic = (code: string) => {
    const definitions = mimicDefinitions(code);
    return mimicGenerators(definitions);
};
