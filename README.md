Nurse DI
-----------------

Simple solution for dependency injection in Javascript.

[![Build Status](https://travis-ci.org/mjacobus/nurse-js.svg)](https://travis-ci.org/mjacobus/nurse-js)
[![Code Climate](https://codeclimate.com/github/mjacobus/nurse-js/badges/gpa.svg)](https://codeclimate.com/github/mjacobus/nurse-js)

```javascript
var factory = new Nurse.DependencyContainer();

factory.set('twitter', function () {
    return new MyTwitterClient('credentials');
});

factory.set('facebook', function () {
    return new MyFacebookClient('credentials');
});

factory.set('userProfile', function (dependencies) {
    return new MyUserProfile({
        twitterApi: dependencies.get('twitter'),
        facebookApi: dependencies.get('facebook'),
    });
});
```

```javascript
var me = factory.get('userProfile');

me.twit('Check out this out!');

me.likePost('somepost');
```

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
