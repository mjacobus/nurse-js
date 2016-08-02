describe("Nurse.DiContainer", function () {
    var container;

    beforeEach(function () {
        container = new Nurse.DependencyContainer();

        container.set('foo', function () {
            return 'fooDependency';
        }).set('fooBar', function (di) {
            return [di.get('foo'), 'BarDependency'].join('_');
        });
    });

    describe(".set()", function () {
        it("throws an exception when dependency is already set", function () {
            expect(function () {
                container.set('foo', function () {});
            }).toThrow('Dependency "foo" was already defined');
        });

        it("throws an exception when callback is not a function", function () {
            expect(function () {
                container.set('baz', {});
            }).toThrow('Factory must be a callback');
        });
    });

    describe(".get()", function () {
        it("returns the dependency by key", function () {
            expect(container.get('foo')).toEqual('fooDependency');
        });

        it("returns the cached dependency by key", function () {
            var counter = 0;

            container.set('cached', function () {
                counter = counter + 1;
                return counter;
            });

            expect(container.get('cached')).toEqual(1);
            expect(container.get('cached')).toEqual(1);
        });

        it("passes the container as argument to the factoryCallback", function() {
            expect(container.get('fooBar')).toEqual("fooDependency_BarDependency")
        });

        it('throws an exception when dependency is not set', function() {
            expect(function () {
                container.get('NonExisting')
            }).toThrow('Undefined dependency "NonExisting"');
        });
    });
});

