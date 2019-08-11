(function (moduleFactory) {
    if (typeof dject !== 'undefined') {
        dject.register(
            moduleFactory,
            moduleFactory.name,
            moduleFactory.dependencies
        );
    } else {
        module.exports = moduleFactory;
    }
})(
    (function () {
        typeRegistrarFactory.dependencies = [];

        function typeRegistrarFactory({ }) {

            return function (typeRegistry) {
                function checkArity(type, typeName, subtype, subtypeName) {
                    if (type.arity !== subtype.length) {
                        const errorMessage = `Cannot register subtype ${subtypeName}.`
                            + ` Type arity must match parent.`
                            + ` ${typeName} has an arity of ${type.arity},`
                            + ` ${subtypeName} has an arity of ${subtype.length}`
                        throw new Error(errorMessage);
                    }
                }

                function defineType(typeName, typeFunction) {
                    typeFunction.arity = typeFunction.length;

                    typeRegistry.register(typeName, typeFunction);
                }

                function defineSubtype(
                    parentTypeName,
                    subtypeName,
                    subtypeFunction
                ) {
                    const parentType = typeRegistry.getType(parentTypeName);
                    
                    checkArity(parentType, subtypeName, subtypeFunction, subtypeName);

                    const subtype = buildSubtype(parentType, subtypeFunction);

                    subtype.arity = subtypeFunction.length;

                    typeRegistry.register(subtypeName, subtype);
                }

                function buildSubtype(parentType, typeFunction) {
                    return function (...args) {
                        return parentType.call(null, ...args)
                            && typeFunction.call(null, ...args);
                    }
                }

                return {
                    defineSubtype,
                    defineType
                };
            };
        }

        return typeRegistrarFactory;
    })());