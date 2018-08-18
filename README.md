# angular-simpleapi

Bower package with Angular JS module to use offline resources as images, json, css, js among others.

## Dependencies

* AngularJS

## Installation

Bower:

```
$ bower install angular-simpleapi
```

Or you can download the package [here](https://codeload.github.com/arondn2/angular-simpleapi/zip/master).

Add javascript file to html file, for example:

```html
<script src="angular-simpleapi/angular-simpleapi.js"></script>
```

Finally you must add `ngSimpleApi` to your module dependencies:

```javascript
angular.module('app', ['ngSimpleApi']);
```

## Usage

Coming soon.

## Licence
Released under [the MIT license](https://github.com/arondn2/angular-simpleapi/blob/master/LICENSE)

## Changelog

### V0.0.2
* Debug Option

### V0.0.1
* First release
* Providers `SimpleApiEventEmitter`, `SimpleApiModel` and `SimpleApiRoot`
