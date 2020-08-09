/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _simpleApiEventEmitter = __webpack_require__(/*! ./simple-api-event-emitter */ "./src/simple-api-event-emitter.js");

var _simpleApiEventEmitter2 = _interopRequireDefault(_simpleApiEventEmitter);

var _simpleApiModel = __webpack_require__(/*! ./simple-api-model */ "./src/simple-api-model.js");

var _simpleApiModel2 = _interopRequireDefault(_simpleApiModel);

var _simpleApiRoot = __webpack_require__(/*! ./simple-api-root */ "./src/simple-api-root.js");

var _simpleApiRoot2 = _interopRequireDefault(_simpleApiRoot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('ngSimpleApi', []).provider('SimpleApiEventEmitter', _simpleApiEventEmitter2.default).provider('SimpleApiModel', _simpleApiModel2.default).provider('SimpleApiRoot', _simpleApiRoot2.default);

/***/ }),

/***/ "./src/simple-api-event-emitter.js":
/*!*****************************************!*\
  !*** ./src/simple-api-event-emitter.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = SimpleApiEventEmitter;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SimpleApiEventEmitter() {
  'ngInject';

  this.$get = function () {
    'ngInject';

    var SimpleApiEventEmitter = function () {
      function SimpleApiEventEmitter() {
        _classCallCheck(this, SimpleApiEventEmitter);

        this.$_listeners = [];
      }

      _createClass(SimpleApiEventEmitter, [{
        key: '$on',
        value: function $on(eventName, callback) {
          if (!(eventName in this.$_listeners)) {
            this.$_listeners[eventName] = [];
          }
          this.$_listeners[eventName].push(callback);
          return this;
        }
      }, {
        key: '$once',
        value: function $once(eventName, callback) {
          var _this = this;

          var handler = function handler() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            callback.apply(null, args);
            _this.$off(eventName, handler);
          };
          this.$on(eventName, handler);
        }
      }, {
        key: '$off',
        value: function $off(eventName, callback) {
          var stack = this.$_listeners[eventName] || [];
          var idx = stack.indexOf(callback);
          if (idx !== -1) {
            stack.splice(idx, 1);
            return this.$off(eventName, callback);
          }
          return this;
        }
      }, {
        key: '$emit',
        value: function $emit(eventName, event) {
          var _this2 = this;

          var stack = this.$_listeners[eventName] || [];
          stack.map(function (callback) {
            callback.call(_this2, event || {});
          });
          return this;
        }
      }], [{
        key: '$make',
        value: function $make(obj) {
          if (!obj.$_listeners) {
            obj.$_listeners = [];
            obj.$on = SimpleApiEventEmitter.prototype.$on;
            obj.$off = SimpleApiEventEmitter.prototype.$off;
            obj.$emit = SimpleApiEventEmitter.prototype.$emit;
          }
          return obj;
        }
      }]);

      return SimpleApiEventEmitter;
    }();

    return SimpleApiEventEmitter;
  };
};

/***/ }),

/***/ "./src/simple-api-model.js":
/*!*********************************!*\
  !*** ./src/simple-api-model.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = SimpleApiModel;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SimpleApiModel() {
  'ngInject';

  this.$get = ["$http", "$q", function ($http, $q) {
    'ngInject';

    var SimpleApiModel = function () {
      function SimpleApiModel(name, endpoint, rootApi, $io, $logger) {
        var _this = this;

        _classCallCheck(this, SimpleApiModel);

        this.name = name;
        this.actions = {};
        this.endpoint = endpoint;
        this.rootApi = rootApi;
        this.currentAction = null;
        this.$io = $io;
        this.$logger = $logger || rootApi.$logger;
        this.ModelBuilded = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var prop = args[0],
              value = args[1];

          if (args.length == 0) return _this;
          if (args.length == 1) return _this[prop];
          _this[prop] = value;
        };

        if (this.$io) {
          this.rootApi.$on('user.setted', function () {
            _this.$io.connect({
              userId: _this.rootApi.currentUserId,
              id: _this.rootApi.accessTokenId
            });
          });
        }

        if (this.rootApi.currentUserId && this.rootApi.accessTokenId) {
          this.rootApi.$emit('user.setted', {});
        }
      }

      _createClass(SimpleApiModel, [{
        key: 'buildUrl',
        value: function buildUrl(url, params) {
          return this.rootApi.getBaseUrl() + this.endpoint + SimpleApiModel.buildUrl(url, params);
        }
      }, {
        key: 'httpBuildMethod',
        value: function httpBuildMethod(args) {
          var _this2 = this;

          var self = this;

          var Method = function Method() {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


            var isArray = args.isArray;
            var value = isArray ? [] : {};

            var waiting = $q.resolve();

            var getReq = function getReq(req) {
              req.method = args.method;
              req.url = self.buildUrl(args.url, params);
              req.headers = req.headers || {};

              if (self.rootApi.interceptor) {
                waiting = $q.resolve().then(function () {
                  return self.rootApi.interceptor(req);
                });
              }

              if (self.rootApi.accessTokenId) {
                if (!req.headers[self.rootApi.authHeader]) req.headers[self.rootApi.authHeader] = self.rootApi.accessTokenId;
              }

              if (req.method === 'GET') {
                if (!req.params) {
                  req.params = params;
                }
              } else {
                if (!req.data) {
                  req.data = params;
                }
              }
              return req;
            };

            value.$resolved = false;

            value.$promise = $q.resolve(waiting).then(function () {
              var $promise = function $promise() {
                return $http(getReq(Object.assign({}, req)));
              };
              if (self.rootApi.postProcessed) {
                return self.rootApi.postProcessed($promise(), $promise);
              }
              return $promise();
            }).then(function (response) {
              if (isArray) {
                value.push.apply(value, response.data);
              } else {
                angular.extend(value, response.data);
              }
              value.$resolved = true;
              if ((debug || self.debug) && self.$logger) {
                self.$logger(self.name + '.' + args.name, params, value);
              }
              return value;
            }).catch(function (response) {
              value.$error = response.data;
              value.$resolved = true;
              throw value.$error;
            });

            return value;
          };

          if (this.$io) {
            var $io = this.$io;
            var actionConf = this.actions[actionName];
            if (!actionConf.socketable) return;
            var oldMethod = Method;
            var ret = void 0;
            Method = function Method(params) {
              ret = oldMethod(params);
              ret.$promise.then(function () {
                $io.subscribe(ret, 'prototype.onUpdated', ret.id);
              });
              return ret;
            };
          }

          Method.$url = function () {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return _this2.rootApi.url(_this2.buildUrl(args.url, params), true);
          };

          Method.$exec = function () {
            var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var req = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var result = Method(params, req, true);
            return result;
          };

          return Method;
        }
      }, {
        key: 'httpMethod',
        value: function httpMethod(verb, name, url) {
          var attrs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

          this.currentAction = name;
          this.actions[name] = angular.extend({ name: name, url: url }, attrs, {
            method: verb.toUpperCase()
          });

          this.actions[name].fn = this.httpBuildMethod(this.actions[name]);

          this.ModelBuilded[name] = this.actions[name].fn;

          return this;
        }
      }, {
        key: 'socketable',
        value: function socketable(actionName) {
          this.currentAction = actionName = actionName || this.currentAction;
          if (!this.actions[actionName]) throw new Error('not.defined.action.' + actionName);
          this.actions[actionName].socketable = true;
          return this;
        }
      }, {
        key: 'isArray',
        value: function isArray(actionName) {
          this.currentAction = actionName = actionName || this.currentAction;
          if (!this.actions[actionName]) throw new Error('not.defined.action.' + actionName);
          this.actions[actionName].isArray = true;
          return this;
        }
      }, {
        key: 'method',
        value: function method(name, fn) {
          this.ModelBuilded.prototype[name] = fn;
          return this;
        }
      }, {
        key: 'expand',
        value: function expand(extra) {
          angular.extend(this.ModelBuilded, extra);
          return this;
        }
      }, {
        key: 'get',
        value: function get(name, url, attrs) {
          return this.httpMethod('get', name, url, attrs);
        }
      }, {
        key: 'post',
        value: function post(name, url, attrs) {
          return this.httpMethod('post', name, url, attrs);
        }
      }, {
        key: 'delete',
        value: function _delete(name, url, attrs) {
          return this.httpMethod('delete', name, url, attrs);
        }
      }, {
        key: 'put',
        value: function put(name, url, attrs) {
          return this.httpMethod('put', name, url, attrs);
        }
      }, {
        key: 'patch',
        value: function patch(name, url, attrs) {
          return this.httpMethod('patch', name, url, attrs);
        }
      }, {
        key: 'options',
        value: function options(name, url, attrs) {
          return this.httpMethod('options', name, url, attrs);
        }
      }], [{
        key: 'buildUrl',
        value: function buildUrl(url, params) {
          Object.keys(params).map(function (argName) {
            url = url.split(':' + argName).join(params[argName]);
          });
          return url;
        }
      }]);

      return SimpleApiModel;
    }();

    return SimpleApiModel;
  }];
};

/***/ }),

/***/ "./src/simple-api-root.js":
/*!********************************!*\
  !*** ./src/simple-api-root.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = SimpleApiRoot;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function SimpleApiRoot() {
  'ngInject';

  var URLS = {};
  var PROPS = ['accessTokenId', 'currentUserId', 'rememberMe', 'currentUserData'];

  this.setBaseUrl = function (name, url) {
    URLS[name] = url;
  };

  this.$get = ["SimpleApiEventEmitter", "SimpleApiModel", function (SimpleApiEventEmitter, SimpleApiModel) {
    'ngInject';

    var SimpleApiRoot = function (_SimpleApiEventEmitte) {
      _inherits(SimpleApiRoot, _SimpleApiEventEmitte);

      function SimpleApiRoot(propsPrefix, authHeader, $logger) {
        _classCallCheck(this, SimpleApiRoot);

        var _this = _possibleConstructorReturn(this, (SimpleApiRoot.__proto__ || Object.getPrototypeOf(SimpleApiRoot)).call(this));

        _this.authHeader = authHeader || 'authorization';
        _this.propsPrefix = propsPrefix;
        _this.models = function () {
          return _this;
        };
        _this.instances = {};
        _this.$logger = $logger;

        PROPS.forEach(function (name) {
          _this[name] = _this._load(_this.propsPrefix + name);
        });
        return _this;
      }

      _createClass(SimpleApiRoot, [{
        key: 'getBaseUrl',
        value: function getBaseUrl() {
          return URLS[this.propsPrefix];
        }
      }, {
        key: 'save',
        value: function save() {
          var _this2 = this;

          var storage = this.rememberMe ? localStorage : sessionStorage;
          PROPS.forEach(function (name) {
            _this2._save(storage, _this2.propsPrefix + name, _this2[name]);
          });
        }
      }, {
        key: 'setUser',
        value: function setUser(accessTokenId, currentUserId, userData) {
          this.accessTokenId = accessTokenId;
          this.currentUserId = currentUserId;
          this.currentUserData = userData;
          this.$emit('user.setted', {});
        }
      }, {
        key: 'clearUser',
        value: function clearUser() {
          this.accessTokenId = null;
          this.currentUserId = null;
          this.currentUserData = null;
        }
      }, {
        key: 'clearStorage',
        value: function clearStorage() {
          var _this3 = this;

          PROPS.forEach(function (name) {
            _this3._save(sessionStorage, _this3.propsPrefix + name, null);
            _this3._save(localStorage, _this3.propsPrefix + name, null);
          });
        }
      }, {
        key: 'url',
        value: function url(_url, ignoreBaseUrl) {
          if (!this.accessTokenId) return _url;
          _url = _url.split('?');

          var params = [];
          if (_url.length !== 1) params.push(_url.pop());

          params.push('access_token=' + this.accessTokenId);
          _url.push('?' + params.join('&'));
          if (!ignoreBaseUrl) {
            _url.unshift(this.getBaseUrl());
          }
          _url = _url.join('');

          return _url;
        }

        // Note: LocalStorage converts the value to string
        // We are using empty string as a marker for null/undefined values.

      }, {
        key: '_save',
        value: function _save(storage, key, value) {
          try {
            storage[key] = JSON.stringify(value);
          } catch (err) {
            console.log('Cannot access local/session storage:', err);
          }
        }
      }, {
        key: '_load',
        value: function _load(key) {
          return JSON.parse(localStorage[key] || sessionStorage[key] || 'null');
        }
      }, {
        key: 'model',
        value: function model(name, url) {
          if (this.instances[name]) return this.instances[name];
          this.instances[name] = new SimpleApiModel(name, url || '/' + name + 's', this);
          this.models[name] = this.instances[name].ModelBuilded;
          return this.models[name];
        }
      }]);

      return SimpleApiRoot;
    }(SimpleApiEventEmitter);

    return SimpleApiRoot;
  }];
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJTaW1wbGVBcGlFdmVudEVtaXR0ZXIiLCJTaW1wbGVBcGlNb2RlbCIsIlNpbXBsZUFwaVJvb3QiLCIkZ2V0IiwiJF9saXN0ZW5lcnMiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsInB1c2giLCJoYW5kbGVyIiwiYXJncyIsImFwcGx5IiwiJG9mZiIsIiRvbiIsInN0YWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImV2ZW50IiwibWFwIiwiY2FsbCIsIm9iaiIsInByb3RvdHlwZSIsIiRlbWl0IiwiJGh0dHAiLCIkcSIsIm5hbWUiLCJlbmRwb2ludCIsInJvb3RBcGkiLCIkaW8iLCIkbG9nZ2VyIiwiYWN0aW9ucyIsImN1cnJlbnRBY3Rpb24iLCJNb2RlbEJ1aWxkZWQiLCJwcm9wIiwidmFsdWUiLCJsZW5ndGgiLCJjb25uZWN0IiwidXNlcklkIiwiY3VycmVudFVzZXJJZCIsImlkIiwiYWNjZXNzVG9rZW5JZCIsInVybCIsInBhcmFtcyIsImdldEJhc2VVcmwiLCJidWlsZFVybCIsInNlbGYiLCJNZXRob2QiLCJyZXEiLCJkZWJ1ZyIsImlzQXJyYXkiLCJ3YWl0aW5nIiwicmVzb2x2ZSIsImdldFJlcSIsIm1ldGhvZCIsImhlYWRlcnMiLCJpbnRlcmNlcHRvciIsInRoZW4iLCJhdXRoSGVhZGVyIiwiZGF0YSIsIiRyZXNvbHZlZCIsIiRwcm9taXNlIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zdFByb2Nlc3NlZCIsInJlc3BvbnNlIiwiZXh0ZW5kIiwiY2F0Y2giLCIkZXJyb3IiLCJhY3Rpb25Db25mIiwiYWN0aW9uTmFtZSIsInNvY2tldGFibGUiLCJvbGRNZXRob2QiLCJyZXQiLCJzdWJzY3JpYmUiLCIkdXJsIiwiJGV4ZWMiLCJyZXN1bHQiLCJ2ZXJiIiwiYXR0cnMiLCJ0b1VwcGVyQ2FzZSIsImZuIiwiaHR0cEJ1aWxkTWV0aG9kIiwiRXJyb3IiLCJleHRyYSIsImh0dHBNZXRob2QiLCJrZXlzIiwiYXJnTmFtZSIsInNwbGl0Iiwiam9pbiIsIlVSTFMiLCJQUk9QUyIsInNldEJhc2VVcmwiLCJwcm9wc1ByZWZpeCIsIm1vZGVscyIsImluc3RhbmNlcyIsImZvckVhY2giLCJfbG9hZCIsInN0b3JhZ2UiLCJyZW1lbWJlck1lIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJfc2F2ZSIsInVzZXJEYXRhIiwiY3VycmVudFVzZXJEYXRhIiwiaWdub3JlQmFzZVVybCIsInBvcCIsInVuc2hpZnQiLCJrZXkiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyIiwiY29uc29sZSIsImxvZyIsInBhcnNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLFFBQVFDLE1BQVIsQ0FBZSxhQUFmLEVBQThCLEVBQTlCLEVBRUNDLFFBRkQsQ0FFVSx1QkFGVixFQUVtQ0MsK0JBRm5DLEVBR0NELFFBSEQsQ0FHVSxnQkFIVixFQUc0QkUsd0JBSDVCLEVBSUNGLFFBSkQsQ0FJVSxlQUpWLEVBSTJCRyx1QkFKM0IsRTs7Ozs7Ozs7Ozs7O0FDTmE7Ozs7Ozs7O2tCQUVXRixxQjs7OztBQUFULFNBQVNBLHFCQUFULEdBQWtDO0FBQUU7O0FBRWpELE9BQUtHLElBQUwsR0FBWSxZQUFZO0FBQUU7O0FBQUYsUUFFaEJILHFCQUZnQjtBQUlwQix1Q0FBYztBQUFBOztBQUNaLGFBQUtJLFdBQUwsR0FBbUIsRUFBbkI7QUFDRDs7QUFObUI7QUFBQTtBQUFBLDRCQVFoQkMsU0FSZ0IsRUFRTEMsUUFSSyxFQVFLO0FBQ3ZCLGNBQUcsRUFBRUQsYUFBYSxLQUFLRCxXQUFwQixDQUFILEVBQXFDO0FBQ25DLGlCQUFLQSxXQUFMLENBQWlCQyxTQUFqQixJQUE4QixFQUE5QjtBQUNEO0FBQ0QsZUFBS0QsV0FBTCxDQUFpQkMsU0FBakIsRUFBNEJFLElBQTVCLENBQWlDRCxRQUFqQztBQUNBLGlCQUFPLElBQVA7QUFDRDtBQWRtQjtBQUFBO0FBQUEsOEJBZ0JkRCxTQWhCYyxFQWdCSEMsUUFoQkcsRUFnQk87QUFBQTs7QUFDekIsY0FBTUUsVUFBVSxTQUFWQSxPQUFVLEdBQWE7QUFBQSw4Q0FBVEMsSUFBUztBQUFUQSxrQkFBUztBQUFBOztBQUMzQkgscUJBQVNJLEtBQVQsQ0FBZSxJQUFmLEVBQXFCRCxJQUFyQjtBQUNBLGtCQUFLRSxJQUFMLENBQVVOLFNBQVYsRUFBcUJHLE9BQXJCO0FBQ0QsV0FIRDtBQUlBLGVBQUtJLEdBQUwsQ0FBU1AsU0FBVCxFQUFvQkcsT0FBcEI7QUFDRDtBQXRCbUI7QUFBQTtBQUFBLDZCQXdCZkgsU0F4QmUsRUF3QkpDLFFBeEJJLEVBd0JNO0FBQ3hCLGNBQUlPLFFBQVEsS0FBS1QsV0FBTCxDQUFpQkMsU0FBakIsS0FBK0IsRUFBM0M7QUFDQSxjQUFJUyxNQUFNRCxNQUFNRSxPQUFOLENBQWNULFFBQWQsQ0FBVjtBQUNBLGNBQUlRLFFBQVEsQ0FBQyxDQUFiLEVBQWdCO0FBQ2RELGtCQUFNRyxNQUFOLENBQWFGLEdBQWIsRUFBa0IsQ0FBbEI7QUFDQSxtQkFBTyxLQUFLSCxJQUFMLENBQVVOLFNBQVYsRUFBcUJDLFFBQXJCLENBQVA7QUFDRDtBQUNELGlCQUFPLElBQVA7QUFDRDtBQWhDbUI7QUFBQTtBQUFBLDhCQWtDZEQsU0FsQ2MsRUFrQ0hZLEtBbENHLEVBa0NJO0FBQUE7O0FBQ3RCLGNBQUlKLFFBQVEsS0FBS1QsV0FBTCxDQUFpQkMsU0FBakIsS0FBK0IsRUFBM0M7QUFDQVEsZ0JBQU1LLEdBQU4sQ0FBVSxVQUFDWixRQUFELEVBQWM7QUFDdEJBLHFCQUFTYSxJQUFULENBQWMsTUFBZCxFQUFvQkYsU0FBTyxFQUEzQjtBQUNELFdBRkQ7QUFHQSxpQkFBTyxJQUFQO0FBQ0Q7QUF4Q21CO0FBQUE7QUFBQSw4QkEwQ1BHLEdBMUNPLEVBMENGO0FBQ2hCLGNBQUksQ0FBQ0EsSUFBSWhCLFdBQVQsRUFBc0I7QUFDcEJnQixnQkFBSWhCLFdBQUosR0FBa0IsRUFBbEI7QUFDQWdCLGdCQUFJUixHQUFKLEdBQVVaLHNCQUFzQnFCLFNBQXRCLENBQWdDVCxHQUExQztBQUNBUSxnQkFBSVQsSUFBSixHQUFXWCxzQkFBc0JxQixTQUF0QixDQUFnQ1YsSUFBM0M7QUFDQVMsZ0JBQUlFLEtBQUosR0FBWXRCLHNCQUFzQnFCLFNBQXRCLENBQWdDQyxLQUE1QztBQUNEO0FBQ0QsaUJBQU9GLEdBQVA7QUFDRDtBQWxEbUI7O0FBQUE7QUFBQTs7QUFzRHRCLFdBQU9wQixxQkFBUDtBQUVELEdBeEREO0FBMERELEU7Ozs7Ozs7Ozs7OztBQzlEWTs7QUFFYixPQUFPLGVBQWUsU0FBUyxjQUFjO0VBQzNDLE9BQU87OztBQUdULElBQUksZUFBZSxZQUFZLEVBQUUsU0FBUyxpQkFBaUIsUUFBUSxPQUFPLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEVBQUUsSUFBSSxhQUFhLE1BQU0sSUFBSSxXQUFXLGFBQWEsV0FBVyxjQUFjLE9BQU8sV0FBVyxlQUFlLE1BQU0sSUFBSSxXQUFXLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxlQUFlLFFBQVEsV0FBVyxLQUFLLGlCQUFpQixPQUFPLFVBQVUsYUFBYSxZQUFZLGFBQWEsRUFBRSxJQUFJLFlBQVksaUJBQWlCLFlBQVksV0FBVyxhQUFhLElBQUksYUFBYSxpQkFBaUIsYUFBYSxjQUFjLE9BQU87O0FBRWhpQixRQUFRLFVBTmdCQzs7QUFReEIsU0FBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7O0FBUmpHLFNBQVNBLGlCQUFpQjtFQUFFOztFQUV6QyxLQUFLRSx1QkFBTyxVQUFVb0IsT0FBT0MsSUFBSTtJQUFFOztJQUFGLElBRXpCdkIsaUJBRnlCO01BSTdCLHdCQUFZd0IsTUFBTUMsVUFBVUMsU0FBU0MsS0FBS0MsU0FBUztRQUFBOztRQUFBOztRQUNqRCxLQUFLSixPQUFnQkE7UUFDckIsS0FBS0ssVUFBZ0I7UUFDckIsS0FBS0osV0FBZ0JBO1FBQ3JCLEtBQUtDLFVBQWtCQTtRQUN2QixLQUFLSSxnQkFBZ0I7UUFDckIsS0FBS0gsTUFBZ0JBO1FBQ3JCLEtBQUtDLFVBQWdCQSxXQUFXRixRQUFRRTtRQUN4QyxLQUFLRyxlQUFnQixZQUFhO1VBQUEsa0NBQVR2QixPQUFTO1lBQVRBLEtBQVM7OztVQUFBLElBQ3pCd0IsT0FBZXhCLEtBRFU7Y0FDbkJ5QixRQUFTekIsS0FEVTs7VUFFaEMsSUFBSUEsS0FBSzBCLFVBQVEsR0FBRyxPQUFPO1VBQzNCLElBQUkxQixLQUFLMEIsVUFBUSxHQUFHLE9BQU8sTUFBS0Y7VUFDaEMsTUFBS0EsUUFBUUM7OztRQUdmLElBQUksS0FBS04sS0FBSztVQUNaLEtBQUtELFFBQVFmLElBQUksZUFBZSxZQUFNO1lBQ3BDLE1BQUtnQixJQUFJUSxRQUFRO2NBQ2ZDLFFBQVEsTUFBS1YsUUFBUVc7Y0FDckJDLElBQVEsTUFBS1osUUFBUWE7Ozs7O1FBSzNCLElBQUksS0FBS2IsUUFBUVcsaUJBQWlCLEtBQUtYLFFBQVFhLGVBQWU7VUFDNUQsS0FBS2IsUUFBUUwsTUFBTSxlQUFlOzs7O01BN0JUO1FBQUE7UUFBQSx5QkFrQ3BCbUIsS0FBS0MsUUFBUTtVQUNwQixPQUFPLEtBQUtmLFFBQVFnQixlQUFlLEtBQUtqQixXQUFXekIsZUFBZTJDLFNBQVNILEtBQUtDOztTQW5DckQ7UUFBQTtRQUFBLGdDQXNDWmpDLE1BQU07VUFBQTs7VUFFckIsSUFBTW9DLE9BQU87O1VBRWIsSUFBSUMsU0FBUyxrQkFBZ0Q7WUFBQSxJQUF0Q0osU0FBc0Msb0VBQTdCO1lBQTZCLElBQXpCSyxNQUF5QixvRUFBbkI7WUFBbUIsSUFBZkMsUUFBZSxvRUFBUDs7O1lBRXBELElBQU1DLFVBQVV4QyxLQUFLd0M7WUFDckIsSUFBTWYsUUFBU2UsVUFBUSxLQUFHOztZQUUxQixJQUFJQyxVQUFVMUIsR0FBRzJCOztZQUVqQixJQUFNQyxTQUFTLFNBQVRBLE9BQVVMLEtBQVE7Y0FDdEJBLElBQUlNLFNBQVM1QyxLQUFLNEM7Y0FDbEJOLElBQUlOLE1BQU1JLEtBQUtELFNBQVNuQyxLQUFLZ0MsS0FBS0M7Y0FDbENLLElBQUlPLFVBQVVQLElBQUlPLFdBQVc7O2NBRTdCLElBQUlULEtBQUtsQixRQUFRNEIsYUFBYTtnQkFDNUJMLFVBQVUxQixHQUFHMkIsVUFDWkssS0FBSztrQkFBQSxPQUFNWCxLQUFLbEIsUUFBUTRCLFlBQVlSOzs7O2NBR3ZDLElBQUlGLEtBQUtsQixRQUFRYSxlQUFlO2dCQUM5QixJQUFHLENBQUNPLElBQUlPLFFBQVFULEtBQUtsQixRQUFROEIsYUFDM0JWLElBQUlPLFFBQVFULEtBQUtsQixRQUFROEIsY0FBY1osS0FBS2xCLFFBQVFhOzs7Y0FHeEQsSUFBSU8sSUFBSU0sV0FBVyxPQUFPO2dCQUN4QixJQUFJLENBQUNOLElBQUlMLFFBQVE7a0JBQ2ZLLElBQUlMLFNBQVNBOztxQkFFVjtnQkFDTCxJQUFJLENBQUNLLElBQUlXLE1BQU07a0JBQ2JYLElBQUlXLE9BQU9oQjs7O2NBR2YsT0FBT0s7OztZQUdUYixNQUFNeUIsWUFBWTs7WUFFbEJ6QixNQUFNMEIsV0FBV3BDLEdBQUcyQixRQUFRRCxTQUMzQk0sS0FBSyxZQUFNO2NBQ1YsSUFBTUksV0FBVyxTQUFYQSxXQUFXO2dCQUFBLE9BQU1yQyxNQUFNNkIsT0FBT1MsT0FBT0MsT0FBTyxJQUFJZjs7Y0FDdEQsSUFBSUYsS0FBS2xCLFFBQVFvQyxlQUFlO2dCQUM5QixPQUFPbEIsS0FBS2xCLFFBQVFvQyxjQUFjSCxZQUFZQTs7Y0FFaEQsT0FBT0E7ZUFFUkosS0FBSyxVQUFDUSxVQUFhO2NBQ2xCLElBQUlmLFNBQVM7Z0JBQ1hmLE1BQU0zQixLQUFLRyxNQUFNd0IsT0FBTzhCLFNBQVNOO3FCQUM1QjtnQkFDTDdELFFBQVFvRSxPQUFPL0IsT0FBTzhCLFNBQVNOOztjQUVqQ3hCLE1BQU15QixZQUFZO2NBQ2xCLElBQUksQ0FBQ1gsU0FBU0gsS0FBS0csVUFBVUgsS0FBS2hCLFNBQVM7Z0JBQ3pDZ0IsS0FBS2hCLFFBQVdnQixLQUFLcEIsT0FBckIsTUFBNkJoQixLQUFLZ0IsTUFBUWlCLFFBQVFSOztjQUVwRCxPQUFPQTtlQUVSZ0MsTUFBTSxVQUFDRixVQUFhO2NBQ25COUIsTUFBTWlDLFNBQVNILFNBQVNOO2NBQ3hCeEIsTUFBTXlCLFlBQVk7Y0FDbEIsTUFBTXpCLE1BQU1pQzs7O1lBR2QsT0FBT2pDOzs7VUFHVCxJQUFJLEtBQUtOLEtBQUs7WUFDWixJQUFNQSxNQUFNLEtBQUtBO1lBQ2pCLElBQU13QyxhQUFhLEtBQUt0QyxRQUFRdUM7WUFDaEMsSUFBSSxDQUFDRCxXQUFXRSxZQUFZO1lBQzVCLElBQU1DLFlBQVl6QjtZQUNsQixJQUFJMEI7WUFDSjFCLFNBQVMsZ0JBQVVKLFFBQVE7Y0FDekI4QixNQUFNRCxVQUFVN0I7Y0FDaEI4QixJQUFJWixTQUNISixLQUFLLFlBQU07Z0JBQ1Y1QixJQUFJNkMsVUFBVUQsS0FBSyx1QkFBdUJBLElBQUlqQzs7Y0FFaEQsT0FBT2lDOzs7O1VBSVgxQixPQUFPNEIsT0FBTyxZQUEyQjtZQUFBLElBQTFCaEMsU0FBMEIsb0VBQWpCO1lBQWlCLElBQWJLLE1BQWEsb0VBQVA7O1lBQ2hDLE9BQU8sT0FBS3BCLFFBQVFjLElBQUksT0FBS0csU0FBU25DLEtBQUtnQyxLQUFLQyxTQUFTOzs7VUFHM0RJLE9BQU82QixRQUFRLFlBQTJCO1lBQUEsSUFBMUJqQyxTQUEwQixvRUFBakI7WUFBaUIsSUFBYkssTUFBYSxvRUFBUDs7WUFDakMsSUFBTTZCLFNBQVM5QixPQUFPSixRQUFRSyxLQUFLO1lBQ25DLE9BQU82Qjs7O1VBR1QsT0FBTzlCOztTQXBJb0I7UUFBQTtRQUFBLDJCQXVJakIrQixNQUFNcEQsTUFBTWdCLEtBQWlCO1VBQUEsSUFBWnFDLFFBQVksb0VBQUo7O1VBQ25DLEtBQUsvQyxnQkFBZ0JOO1VBQ3JCLEtBQUtLLFFBQVFMLFFBQVE1QixRQUFRb0UsT0FBTyxFQUFDeEMsWUFBTWdCLFlBQU1xQyxPQUFPO1lBQ3REekIsUUFBUXdCLEtBQUtFOzs7VUFHZixLQUFLakQsUUFBUUwsTUFBTXVELEtBQUssS0FBS0MsZ0JBQWdCLEtBQUtuRCxRQUFRTDs7VUFFMUQsS0FBS08sYUFBYVAsUUFBUSxLQUFLSyxRQUFRTCxNQUFNdUQ7O1VBRTdDLE9BQU87O1NBakpvQjtRQUFBO1FBQUEsMkJBb0pqQlgsWUFBWTtVQUN0QixLQUFLdEMsZ0JBQWdCc0MsYUFBYUEsY0FBYyxLQUFLdEM7VUFDckQsSUFBSSxDQUFDLEtBQUtELFFBQVF1QyxhQUFhLE1BQU0sSUFBSWEsTUFBTSx3QkFBc0JiO1VBQ3JFLEtBQUt2QyxRQUFRdUMsWUFBWUMsYUFBYTtVQUN0QyxPQUFPOztTQXhKb0I7UUFBQTtRQUFBLHdCQTJKcEJELFlBQVk7VUFDbkIsS0FBS3RDLGdCQUFnQnNDLGFBQWFBLGNBQWMsS0FBS3RDO1VBQ3JELElBQUksQ0FBQyxLQUFLRCxRQUFRdUMsYUFBYSxNQUFNLElBQUlhLE1BQU0sd0JBQXNCYjtVQUNyRSxLQUFLdkMsUUFBUXVDLFlBQVlwQixVQUFVO1VBQ25DLE9BQU87O1NBL0pvQjtRQUFBO1FBQUEsdUJBa0tyQnhCLE1BQU11RCxJQUFJO1VBQ2hCLEtBQUtoRCxhQUFhWCxVQUFVSSxRQUFRdUQ7VUFDcEMsT0FBTzs7U0FwS29CO1FBQUE7UUFBQSx1QkF1S3JCRyxPQUFPO1VBQ2J0RixRQUFRb0UsT0FBTyxLQUFLakMsY0FBY21EO1VBQ2xDLE9BQU87O1NBektvQjtRQUFBO1FBQUEsb0JBNEtwQjFELE1BQU1nQixLQUFLcUMsT0FBTztVQUFFLE9BQU8sS0FBS00sV0FBVyxPQUFPM0QsTUFBTWdCLEtBQUtxQzs7U0E1S3pDO1FBQUE7UUFBQSxxQkE2S3BCckQsTUFBTWdCLEtBQUtxQyxPQUFPO1VBQUUsT0FBTyxLQUFLTSxXQUFXLFFBQVEzRCxNQUFNZ0IsS0FBS3FDOztTQTdLMUM7UUFBQTtRQUFBLHdCQThLcEJyRCxNQUFNZ0IsS0FBS3FDLE9BQU87VUFBRSxPQUFPLEtBQUtNLFdBQVcsVUFBVTNELE1BQU1nQixLQUFLcUM7O1NBOUs1QztRQUFBO1FBQUEsb0JBK0twQnJELE1BQU1nQixLQUFLcUMsT0FBTztVQUFFLE9BQU8sS0FBS00sV0FBVyxPQUFPM0QsTUFBTWdCLEtBQUtxQzs7U0EvS3pDO1FBQUE7UUFBQSxzQkFnTHBCckQsTUFBTWdCLEtBQUtxQyxPQUFPO1VBQUUsT0FBTyxLQUFLTSxXQUFXLFNBQVMzRCxNQUFNZ0IsS0FBS3FDOztTQWhMM0M7UUFBQTtRQUFBLHdCQWlMcEJyRCxNQUFNZ0IsS0FBS3FDLE9BQU87VUFBRSxPQUFPLEtBQUtNLFdBQVcsV0FBVzNELE1BQU1nQixLQUFLcUM7O1VBakw3QztRQUFBO1FBQUEseUJBbUxackMsS0FBS0MsUUFBUTtVQUM1Qm1CLE9BQU93QixLQUFLM0MsUUFBUXhCLElBQUksVUFBQ29FLFNBQVk7WUFDbkM3QyxNQUFNQSxJQUFJOEMsTUFBTSxNQUFJRCxTQUFTRSxLQUFLOUMsT0FBTzRDOztVQUUzQyxPQUFPN0M7Ozs7TUF2TG9COzs7SUE0TC9CLE9BQU94Qzs7Q0FJVixDOzs7Ozs7Ozs7Ozs7QUNwTVk7O0FBRWIsT0FBTyxlQUFlLFNBQVMsY0FBYztFQUMzQyxPQUFPOzs7QUFHVCxJQUFJLGVBQWUsWUFBWSxFQUFFLFNBQVMsaUJBQWlCLFFBQVEsT0FBTyxFQUFFLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSyxFQUFFLElBQUksYUFBYSxNQUFNLElBQUksV0FBVyxhQUFhLFdBQVcsY0FBYyxPQUFPLFdBQVcsZUFBZSxNQUFNLElBQUksV0FBVyxZQUFZLFdBQVcsV0FBVyxNQUFNLE9BQU8sZUFBZSxRQUFRLFdBQVcsS0FBSyxpQkFBaUIsT0FBTyxVQUFVLGFBQWEsWUFBWSxhQUFhLEVBQUUsSUFBSSxZQUFZLGlCQUFpQixZQUFZLFdBQVcsYUFBYSxJQUFJLGFBQWEsaUJBQWlCLGFBQWEsY0FBYyxPQUFPOztBQUVoaUIsUUFBUSxVQU5nQkM7O0FBUXhCLFNBQVMsZ0JBQWdCLFVBQVUsYUFBYSxFQUFFLElBQUksRUFBRSxvQkFBb0IsY0FBYyxFQUFFLE1BQU0sSUFBSSxVQUFVOztBQUVoSCxTQUFTLDJCQUEyQixNQUFNLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sSUFBSSxlQUFlLGdFQUFnRSxPQUFPLFNBQVMsT0FBTyxTQUFTLFlBQVksT0FBTyxTQUFTLGNBQWMsT0FBTzs7QUFFek8sU0FBUyxVQUFVLFVBQVUsWUFBWSxFQUFFLElBQUksT0FBTyxlQUFlLGNBQWMsZUFBZSxNQUFNLEVBQUUsTUFBTSxJQUFJLFVBQVUsNkRBQTZELE9BQU8sZUFBZSxTQUFTLFlBQVksT0FBTyxPQUFPLGNBQWMsV0FBVyxXQUFXLEVBQUUsYUFBYSxFQUFFLE9BQU8sVUFBVSxZQUFZLE9BQU8sVUFBVSxNQUFNLGNBQWMsV0FBVyxJQUFJLFlBQVksT0FBTyxpQkFBaUIsT0FBTyxlQUFlLFVBQVUsY0FBYyxTQUFTLFlBQVk7O0FBWmxkLFNBQVNBLGdCQUFnQjtFQUFFOztFQUV4QyxJQUFNdUYsT0FBUTtFQUNkLElBQU1DLFFBQVEsQ0FBQyxpQkFBaUIsaUJBQWlCLGNBQWM7O0VBRS9ELEtBQUtDLGFBQWEsVUFBQ2xFLE1BQU1nQixLQUFRO0lBQy9CZ0QsS0FBS2hFLFFBQVFnQjs7O0VBR2YsS0FBS3RDLG1EQUFPLFVBQVVILHVCQUF1QkMsZ0JBQWdCO0lBQUU7O0lBQUYsSUFFckRDLGdCQUZxRDtNQUFBOztNQUl6RCx1QkFBWTBGLGFBQWFuQyxZQUFZNUIsU0FBUztRQUFBOztRQUFBOztRQUU1QyxNQUFLNEIsYUFBY0EsY0FBYztRQUNqQyxNQUFLbUMsY0FBY0E7UUFDbkIsTUFBS0MsU0FBYztVQUFBOztRQUNuQixNQUFLQyxZQUFjO1FBQ25CLE1BQUtqRSxVQUFjQTs7UUFFbkI2RCxNQUFNSyxRQUFRLFVBQUN0RSxNQUFTO1VBQ3RCLE1BQUtBLFFBQVEsTUFBS3VFLE1BQU0sTUFBS0osY0FBY25FOztRQVREOzs7TUFKVztRQUFBO1FBQUEsNkJBaUI1QztVQUNYLE9BQU9nRSxLQUFLLEtBQUtHOztTQWxCc0M7UUFBQTtRQUFBLHVCQXFCbEQ7VUFBQTs7VUFDTCxJQUFNSyxVQUFVLEtBQUtDLGFBQWFDLGVBQWVDO1VBQ2pEVixNQUFNSyxRQUFRLFVBQUN0RSxNQUFTO1lBQ3RCLE9BQUs0RSxNQUFNSixTQUFTLE9BQUtMLGNBQWNuRSxNQUFNLE9BQUtBOzs7U0F4Qkc7UUFBQTtRQUFBLHdCQTRCakRlLGVBQWVGLGVBQWVnRSxVQUFVO1VBQzlDLEtBQUs5RCxnQkFBZ0JBO1VBQ3JCLEtBQUtGLGdCQUFnQkE7VUFDckIsS0FBS2lFLGtCQUFrQkQ7VUFDdkIsS0FBS2hGLE1BQU0sZUFBZTs7U0FoQzZCO1FBQUE7UUFBQSw0QkFtQzdDO1VBQ1YsS0FBS2tCLGdCQUFnQjtVQUNyQixLQUFLRixnQkFBZ0I7VUFDckIsS0FBS2lFLGtCQUFrQjs7U0F0Q2dDO1FBQUE7UUFBQSwrQkF5QzFDO1VBQUE7O1VBQ2JiLE1BQU1LLFFBQVEsVUFBQ3RFLE1BQVM7WUFDdEIsT0FBSzRFLE1BQU1ELGdCQUFnQixPQUFLUixjQUFjbkUsTUFBTTtZQUNwRCxPQUFLNEUsTUFBTUYsY0FBYyxPQUFLUCxjQUFjbkUsTUFBTTs7O1NBNUNHO1FBQUE7UUFBQSxvQkFnRHJEZ0IsTUFBSytELGVBQWU7VUFDdEIsSUFBSSxDQUFDLEtBQUtoRSxlQUFlLE9BQU9DO1VBQ2hDQSxPQUFNQSxLQUFJOEMsTUFBTTs7VUFFaEIsSUFBTTdDLFNBQVM7VUFDZixJQUFJRCxLQUFJTixXQUFTLEdBQUdPLE9BQU9uQyxLQUFLa0MsS0FBSWdFOztVQUVwQy9ELE9BQU9uQyxLQUFLLGtCQUFnQixLQUFLaUM7VUFDakNDLEtBQUlsQyxLQUFLLE1BQUltQyxPQUFPOEMsS0FBSztVQUN6QixJQUFJLENBQUNnQixlQUFlO1lBQ2xCL0QsS0FBSWlFLFFBQVEsS0FBSy9EOztVQUVuQkYsT0FBTUEsS0FBSStDLEtBQUs7O1VBRWYsT0FBTy9DOzs7Ozs7U0E5RGdEO1FBQUE7UUFBQSxzQkFvRW5Ed0QsU0FBU1UsS0FBS3pFLE9BQU87VUFDekIsSUFBSTtZQUNGK0QsUUFBUVUsT0FBT0MsS0FBS0MsVUFBVTNFO1lBQzlCLE9BQU80RSxLQUFLO1lBQ1pDLFFBQVFDLElBQUksd0NBQXdDRjs7O1NBeEVDO1FBQUE7UUFBQSxzQkE0RW5ESCxLQUFLO1VBQ1QsT0FBT0MsS0FBS0ssTUFBTWQsYUFBYVEsUUFBUVAsZUFBZU8sUUFBUTs7U0E3RVA7UUFBQTtRQUFBLHNCQWdGbkRsRixNQUFNZ0IsS0FBSztVQUNmLElBQUksS0FBS3FELFVBQVVyRSxPQUFPLE9BQU8sS0FBS3FFLFVBQVVyRTtVQUNoRCxLQUFLcUUsVUFBVXJFLFFBQVEsSUFBSXhCLGVBQWV3QixNQUFNZ0IsYUFBV2hCLE9BQVgsS0FBb0I7VUFDcEUsS0FBS29FLE9BQU9wRSxRQUFRLEtBQUtxRSxVQUFVckUsTUFBTU87VUFDekMsT0FBTyxLQUFLNkQsT0FBT3BFOzs7O01BcEZvQztNQUUvQnpCOztJQXVGNUIsT0FBT0UiLCJmaWxlIjoiYW5ndWxhci1zaW1wbGVhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFNpbXBsZUFwaUV2ZW50RW1pdHRlciBmcm9tICcuL3NpbXBsZS1hcGktZXZlbnQtZW1pdHRlcic7XG5pbXBvcnQgU2ltcGxlQXBpTW9kZWwgZnJvbSAnLi9zaW1wbGUtYXBpLW1vZGVsJztcbmltcG9ydCBTaW1wbGVBcGlSb290IGZyb20gJy4vc2ltcGxlLWFwaS1yb290JztcblxuYW5ndWxhci5tb2R1bGUoJ25nU2ltcGxlQXBpJywgW10pXG5cbi5wcm92aWRlcignU2ltcGxlQXBpRXZlbnRFbWl0dGVyJywgU2ltcGxlQXBpRXZlbnRFbWl0dGVyKVxuLnByb3ZpZGVyKCdTaW1wbGVBcGlNb2RlbCcsIFNpbXBsZUFwaU1vZGVsKVxuLnByb3ZpZGVyKCdTaW1wbGVBcGlSb290JywgU2ltcGxlQXBpUm9vdCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW1wbGVBcGlFdmVudEVtaXR0ZXIgKCkgeyAnbmdJbmplY3QnO1xuXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uICgpIHsgJ25nSW5qZWN0JztcblxuICAgIGNsYXNzIFNpbXBsZUFwaUV2ZW50RW1pdHRlciB7XG4gICAgICBcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRfbGlzdGVuZXJzID0gW107XG4gICAgICB9XG5cbiAgICAgICRvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmKCEoZXZlbnROYW1lIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgJG9uY2UoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICB0aGlzLiRvZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy4kb24oZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgJG9mZihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdmFyIGlkeCA9IHN0YWNrLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgIHN0YWNrLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLiRvZmYoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgICRlbWl0KGV2ZW50TmFtZSwgZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICBzdGFjay5tYXAoKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldmVudHx8e30pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyAkbWFrZShvYmopIHtcbiAgICAgICAgaWYgKCFvYmouJF9saXN0ZW5lcnMpIHtcbiAgICAgICAgICBvYmouJF9saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgICBvYmouJG9uID0gU2ltcGxlQXBpRXZlbnRFbWl0dGVyLnByb3RvdHlwZS4kb247XG4gICAgICAgICAgb2JqLiRvZmYgPSBTaW1wbGVBcGlFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRvZmY7XG4gICAgICAgICAgb2JqLiRlbWl0ID0gU2ltcGxlQXBpRXZlbnRFbWl0dGVyLnByb3RvdHlwZS4kZW1pdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFNpbXBsZUFwaUV2ZW50RW1pdHRlcjtcblxuICB9O1xuXG59OyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpTW9kZWwoKSB7ICduZ0luamVjdCc7XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKCRodHRwLCAkcSkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpTW9kZWwge1xuXG4gICAgICBjb25zdHJ1Y3RvcihuYW1lLCBlbmRwb2ludCwgcm9vdEFwaSwgJGlvLCAkbG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubmFtZSAgICAgICAgICA9IG5hbWU7XG4gICAgICAgIHRoaXMuYWN0aW9ucyAgICAgICA9IHt9O1xuICAgICAgICB0aGlzLmVuZHBvaW50ICAgICAgPSBlbmRwb2ludDtcbiAgICAgICAgdGhpcy5yb290QXBpICAgICAgICAgPSByb290QXBpO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLiRpbyAgICAgICAgICAgPSAkaW87XG4gICAgICAgIHRoaXMuJGxvZ2dlciAgICAgICA9ICRsb2dnZXIgfHwgcm9vdEFwaS4kbG9nZ2VyO1xuICAgICAgICB0aGlzLk1vZGVsQnVpbGRlZCAgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IFtwcm9wLCB2YWx1ZV0gPSBhcmdzO1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aD09MCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoPT0xKSByZXR1cm4gdGhpc1twcm9wXTtcbiAgICAgICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuJGlvKSB7XG4gICAgICAgICAgdGhpcy5yb290QXBpLiRvbigndXNlci5zZXR0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpby5jb25uZWN0KHtcbiAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnJvb3RBcGkuY3VycmVudFVzZXJJZCxcbiAgICAgICAgICAgICAgaWQ6ICAgICB0aGlzLnJvb3RBcGkuYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm9vdEFwaS5jdXJyZW50VXNlcklkICYmIHRoaXMucm9vdEFwaS5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgdGhpcy5yb290QXBpLiRlbWl0KCd1c2VyLnNldHRlZCcsIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIGJ1aWxkVXJsKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RBcGkuZ2V0QmFzZVVybCgpICsgdGhpcy5lbmRwb2ludCArIFNpbXBsZUFwaU1vZGVsLmJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgaHR0cEJ1aWxkTWV0aG9kIChhcmdzKSB7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IE1ldGhvZCA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSwgcmVxID0ge30sIGRlYnVnID0gZmFsc2UpIHtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBpc0FycmF5ID0gYXJncy5pc0FycmF5O1xuICAgICAgICAgIGNvbnN0IHZhbHVlICA9IGlzQXJyYXk/W106e307XG5cbiAgICAgICAgICBsZXQgd2FpdGluZyA9ICRxLnJlc29sdmUoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBnZXRSZXEgPSAocmVxKSA9PiB7XG4gICAgICAgICAgICByZXEubWV0aG9kID0gYXJncy5tZXRob2Q7XG4gICAgICAgICAgICByZXEudXJsID0gc2VsZi5idWlsZFVybChhcmdzLnVybCwgcGFyYW1zKTtcbiAgICAgICAgICAgIHJlcS5oZWFkZXJzID0gcmVxLmhlYWRlcnMgfHwge307XG5cbiAgICAgICAgICAgIGlmIChzZWxmLnJvb3RBcGkuaW50ZXJjZXB0b3IpIHtcbiAgICAgICAgICAgICAgd2FpdGluZyA9ICRxLnJlc29sdmUoKVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiBzZWxmLnJvb3RBcGkuaW50ZXJjZXB0b3IocmVxKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzZWxmLnJvb3RBcGkuYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgICAgICBpZighcmVxLmhlYWRlcnNbc2VsZi5yb290QXBpLmF1dGhIZWFkZXJdKVxuICAgICAgICAgICAgICAgIHJlcS5oZWFkZXJzW3NlbGYucm9vdEFwaS5hdXRoSGVhZGVyXSA9IHNlbGYucm9vdEFwaS5hY2Nlc3NUb2tlbklkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICAgICAgaWYgKCFyZXEucGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgcmVxLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFyZXEuZGF0YSkge1xuICAgICAgICAgICAgICAgIHJlcS5kYXRhID0gcGFyYW1zO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVxO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICAgIHZhbHVlLiRwcm9taXNlID0gJHEucmVzb2x2ZSh3YWl0aW5nKVxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRwcm9taXNlID0gKCkgPT4gJGh0dHAoZ2V0UmVxKE9iamVjdC5hc3NpZ24oe30sIHJlcSkpKTtcbiAgICAgICAgICAgIGlmIChzZWxmLnJvb3RBcGkucG9zdFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yb290QXBpLnBvc3RQcm9jZXNzZWQoJHByb21pc2UoKSwgJHByb21pc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRwcm9taXNlKCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KSB7XG4gICAgICAgICAgICAgIHZhbHVlLnB1c2guYXBwbHkodmFsdWUsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQodmFsdWUsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICgoZGVidWcgfHwgc2VsZi5kZWJ1ZykgJiYgc2VsZi4kbG9nZ2VyKSB7XG4gICAgICAgICAgICAgIHNlbGYuJGxvZ2dlcihgJHtzZWxmLm5hbWV9LiR7YXJncy5uYW1lfWAsIHBhcmFtcywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWUuJGVycm9yID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICB0aHJvdyB2YWx1ZS4kZXJyb3I7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuJGlvKSB7XG4gICAgICAgICAgY29uc3QgJGlvID0gdGhpcy4kaW87XG4gICAgICAgICAgY29uc3QgYWN0aW9uQ29uZiA9IHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXTtcbiAgICAgICAgICBpZiAoIWFjdGlvbkNvbmYuc29ja2V0YWJsZSkgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IG9sZE1ldGhvZCA9IE1ldGhvZDtcbiAgICAgICAgICBsZXQgcmV0O1xuICAgICAgICAgIE1ldGhvZCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldCA9IG9sZE1ldGhvZChwYXJhbXMpO1xuICAgICAgICAgICAgcmV0LiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICRpby5zdWJzY3JpYmUocmV0LCAncHJvdG90eXBlLm9uVXBkYXRlZCcsIHJldC5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIE1ldGhvZC4kdXJsID0gKHBhcmFtcyA9IHt9LCByZXEgPSB7fSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RBcGkudXJsKHRoaXMuYnVpbGRVcmwoYXJncy51cmwsIHBhcmFtcyksIHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIE1ldGhvZC4kZXhlYyA9IChwYXJhbXMgPSB7fSwgcmVxID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBNZXRob2QocGFyYW1zLCByZXEsIHRydWUpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07ICBcblxuICAgICAgICByZXR1cm4gTWV0aG9kO1xuICAgICAgfVxuXG4gICAgICBodHRwTWV0aG9kICh2ZXJiLCBuYW1lLCB1cmwsIGF0dHJzID0ge30pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbmFtZTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW25hbWVdID0gYW5ndWxhci5leHRlbmQoe25hbWUsIHVybH0sIGF0dHJzLCB7XG4gICAgICAgICAgbWV0aG9kOiB2ZXJiLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uc1tuYW1lXS5mbiA9IHRoaXMuaHR0cEJ1aWxkTWV0aG9kKHRoaXMuYWN0aW9uc1tuYW1lXSk7XG5cbiAgICAgICAgdGhpcy5Nb2RlbEJ1aWxkZWRbbmFtZV0gPSB0aGlzLmFjdGlvbnNbbmFtZV0uZm47XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHNvY2tldGFibGUgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gYWN0aW9uTmFtZSA9IGFjdGlvbk5hbWUgfHwgdGhpcy5jdXJyZW50QWN0aW9uO1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXSkgdGhyb3cgbmV3IEVycm9yKCdub3QuZGVmaW5lZC5hY3Rpb24uJythY3Rpb25OYW1lKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdLnNvY2tldGFibGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaXNBcnJheSAoYWN0aW9uTmFtZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBhY3Rpb25OYW1lID0gYWN0aW9uTmFtZSB8fCB0aGlzLmN1cnJlbnRBY3Rpb247XG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdKSB0aHJvdyBuZXcgRXJyb3IoJ25vdC5kZWZpbmVkLmFjdGlvbi4nK2FjdGlvbk5hbWUpO1xuICAgICAgICB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0uaXNBcnJheSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBtZXRob2QgKG5hbWUsIGZuKSB7XG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkLnByb3RvdHlwZVtuYW1lXSA9IGZuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZXhwYW5kIChleHRyYSkge1xuICAgICAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLk1vZGVsQnVpbGRlZCwgZXh0cmEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZ2V0ICAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdnZXQnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgcG9zdCAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdwb3N0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIGRlbGV0ZSAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnZGVsZXRlJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHB1dCAgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncHV0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHBhdGNoICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncGF0Y2gnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgb3B0aW9ucyAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdvcHRpb25zJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cblxuICAgICAgc3RhdGljIGJ1aWxkVXJsICh1cmwsIHBhcmFtcykge1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgoYXJnTmFtZSkgPT4ge1xuICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnOicrYXJnTmFtZSkuam9pbihwYXJhbXNbYXJnTmFtZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlNb2RlbDtcblxuICB9O1xuXG59OyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpUm9vdCgpIHsgJ25nSW5qZWN0JztcblxuICBjb25zdCBVUkxTICA9IHt9O1xuICBjb25zdCBQUk9QUyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnLCAnY3VycmVudFVzZXJEYXRhJ107XG5cbiAgdGhpcy5zZXRCYXNlVXJsID0gKG5hbWUsIHVybCkgPT4ge1xuICAgIFVSTFNbbmFtZV0gPSB1cmw7XG4gIH07XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKFNpbXBsZUFwaUV2ZW50RW1pdHRlciwgU2ltcGxlQXBpTW9kZWwpIHsgJ25nSW5qZWN0JztcblxuICAgIGNsYXNzIFNpbXBsZUFwaVJvb3QgZXh0ZW5kcyBTaW1wbGVBcGlFdmVudEVtaXR0ZXJ7XG5cbiAgICAgIGNvbnN0cnVjdG9yKHByb3BzUHJlZml4LCBhdXRoSGVhZGVyLCAkbG9nZ2VyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXV0aEhlYWRlciAgPSBhdXRoSGVhZGVyIHx8ICdhdXRob3JpemF0aW9uJztcbiAgICAgICAgdGhpcy5wcm9wc1ByZWZpeCA9IHByb3BzUHJlZml4O1xuICAgICAgICB0aGlzLm1vZGVscyAgICAgID0gKCkgPT4gdGhpcztcbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgICA9IHt9O1xuICAgICAgICB0aGlzLiRsb2dnZXIgICAgID0gJGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gdGhpcy5fbG9hZCh0aGlzLnByb3BzUHJlZml4ICsgbmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnZXRCYXNlVXJsKCkge1xuICAgICAgICByZXR1cm4gVVJMU1t0aGlzLnByb3BzUHJlZml4XVxuICAgICAgfVxuXG4gICAgICBzYXZlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLl9zYXZlKHN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCB0aGlzW25hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldFVzZXIoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICAgICAgdGhpcy4kZW1pdCgndXNlci5zZXR0ZWQnLCB7fSk7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVXNlcigpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjbGVhclN0b3JhZ2UoKSB7XG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLl9zYXZlKHNlc3Npb25TdG9yYWdlLCB0aGlzLnByb3BzUHJlZml4ICsgbmFtZSwgbnVsbCk7XG4gICAgICAgICAgdGhpcy5fc2F2ZShsb2NhbFN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVybCh1cmwsIGlnbm9yZUJhc2VVcmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuSWQpIHJldHVybiB1cmw7XG4gICAgICAgIHVybCA9IHVybC5zcGxpdCgnPycpO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAodXJsLmxlbmd0aCE9PTEpIHBhcmFtcy5wdXNoKHVybC5wb3AoKSk7XG5cbiAgICAgICAgcGFyYW1zLnB1c2goJ2FjY2Vzc190b2tlbj0nK3RoaXMuYWNjZXNzVG9rZW5JZCk7XG4gICAgICAgIHVybC5wdXNoKCc/JytwYXJhbXMuam9pbignJicpKTtcbiAgICAgICAgaWYgKCFpZ25vcmVCYXNlVXJsKSB7XG4gICAgICAgICAgdXJsLnVuc2hpZnQodGhpcy5nZXRCYXNlVXJsKCkpO1xuICAgICAgICB9XG4gICAgICAgIHVybCA9IHVybC5qb2luKCcnKTtcblxuICAgICAgICByZXR1cm4gdXJsO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgICBfc2F2ZShzdG9yYWdlLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3RvcmFnZVtrZXldID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfbG9hZChrZXkpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCAnbnVsbCcpO1xuICAgICAgfVxuXG4gICAgICBtb2RlbChuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzW25hbWVdKSByZXR1cm4gdGhpcy5pbnN0YW5jZXNbbmFtZV07XG4gICAgICAgIHRoaXMuaW5zdGFuY2VzW25hbWVdID0gbmV3IFNpbXBsZUFwaU1vZGVsKG5hbWUsIHVybCB8fCBgLyR7bmFtZX1zYCwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxzW25hbWVdID0gdGhpcy5pbnN0YW5jZXNbbmFtZV0uTW9kZWxCdWlsZGVkO1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbbmFtZV07XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpUm9vdDtcblxuICB9O1xuXG59Il0sInNvdXJjZVJvb3QiOiIifQ==