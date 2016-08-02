var Nurse = Nurse || {};

Nurse.DependencyContainer = function () {
    var factories = {},
        cached = {};

    /**
     * @param String dependencyKey
     * @param callback factoryCallback
     * @return self
     * @throws Error
     */
    this.set = function (dependencyKey, factoryCallback) {
        if (typeof(factoryCallback) !== 'function') {
            throw 'Factory must be a callback';
        }

        if (factories.hasOwnProperty(dependencyKey)) {
            throw 'Dependency "' + dependencyKey + '" was already defined';
        }

        factories[dependencyKey] = factoryCallback;
        return this;
    };

    /**
     * @param String dependencyKey
     * @return mixed
     * @throws Error
     */
    this.get = function (dependencyKey) {
        if (!factories.hasOwnProperty(dependencyKey)) {
            throw 'Undefined dependency "' + dependencyKey + '"';
        }

        if (!cached.hasOwnProperty(dependencyKey)) {
            cached[dependencyKey] = factories[dependencyKey](this);
        }

        return cached[dependencyKey];
    };
};
