(function (moduleFactory) {
    if (typeof dject !== 'undefined') {
        dject.register(moduleFactory);
    } else {
        module.exports = moduleFactory;
    }
})(
    (function () {
        typeRegistryFactory.dependencies = [];

        function typeRegistryFactory({ }) {

            return function () {

                let types = {};

                function getTypeObject() {
                    return types;
                }

                function register(typeName, typeFunction, arity = 1) {
                    typeFunction.typeName = typeName;

                    if (typeof typeFunction.arity === 'undefined') {
                        typeFunction.arity = arity;
                    }

                    types[typeName] = typeFunction;
                }

                function getType(typeName) {
                    return types[typeName];
                }

                return {
                    getType,
                    getTypeObject,
                    register
                };
            };
        }

        return typeRegistryFactory;
    })());