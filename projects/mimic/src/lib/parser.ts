import { getDefinitions } from './definition';
import { createDefinitionGenerator } from './generator';

export const mimic = (code: string) => {
    const definitions = getDefinitions(code);

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
        definitionMap,
        definitions,
        generatorMap,
        generatorDefs,
    };
};
