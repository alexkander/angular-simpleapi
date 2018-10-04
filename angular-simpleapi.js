/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _simpleApiEventEmitter = __webpack_require__(1);
	
	var _simpleApiEventEmitter2 = _interopRequireDefault(_simpleApiEventEmitter);
	
	var _simpleApiModel = __webpack_require__(2);
	
	var _simpleApiModel2 = _interopRequireDefault(_simpleApiModel);
	
	var _simpleApiRoot = __webpack_require__(3);
	
	var _simpleApiRoot2 = _interopRequireDefault(_simpleApiRoot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	angular.module('ngSimpleApi', []).provider('SimpleApiEventEmitter', _simpleApiEventEmitter2.default).provider('SimpleApiModel', _simpleApiModel2.default).provider('SimpleApiRoot', _simpleApiRoot2.default);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
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
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
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
	
	            value.$resolved = false;
	
	            value.$promise = $q.resolve(waiting).then(function () {
	              var $promise = $http(req);
	              if (self.rootApi.postProcessed) {
	                return self.rootApi.postProcessed($promise);
	              }
	              return $promise;
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
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
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
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDAzYmUxYThlYjgwNGUyMjUxNzYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJTaW1wbGVBcGlFdmVudEVtaXR0ZXIiLCJTaW1wbGVBcGlNb2RlbCIsIlNpbXBsZUFwaVJvb3QiLCIkZ2V0IiwiJF9saXN0ZW5lcnMiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsInB1c2giLCJoYW5kbGVyIiwiYXJncyIsImFwcGx5IiwiJG9mZiIsIiRvbiIsInN0YWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImV2ZW50IiwibWFwIiwiY2FsbCIsIm9iaiIsInByb3RvdHlwZSIsIiRlbWl0IiwiJGh0dHAiLCIkcSIsIm5hbWUiLCJlbmRwb2ludCIsInJvb3RBcGkiLCIkaW8iLCIkbG9nZ2VyIiwiYWN0aW9ucyIsImN1cnJlbnRBY3Rpb24iLCJNb2RlbEJ1aWxkZWQiLCJwcm9wIiwidmFsdWUiLCJsZW5ndGgiLCJjb25uZWN0IiwidXNlcklkIiwiY3VycmVudFVzZXJJZCIsImlkIiwiYWNjZXNzVG9rZW5JZCIsInVybCIsInBhcmFtcyIsImdldEJhc2VVcmwiLCJidWlsZFVybCIsInNlbGYiLCJNZXRob2QiLCJyZXEiLCJkZWJ1ZyIsImlzQXJyYXkiLCJ3YWl0aW5nIiwicmVzb2x2ZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJpbnRlcmNlcHRvciIsInRoZW4iLCJhdXRoSGVhZGVyIiwiZGF0YSIsIiRyZXNvbHZlZCIsIiRwcm9taXNlIiwicG9zdFByb2Nlc3NlZCIsInJlc3BvbnNlIiwiZXh0ZW5kIiwiY2F0Y2giLCIkZXJyb3IiLCJhY3Rpb25Db25mIiwiYWN0aW9uTmFtZSIsInNvY2tldGFibGUiLCJvbGRNZXRob2QiLCJyZXQiLCJzdWJzY3JpYmUiLCIkdXJsIiwiJGV4ZWMiLCJyZXN1bHQiLCJ2ZXJiIiwiYXR0cnMiLCJ0b1VwcGVyQ2FzZSIsImZuIiwiaHR0cEJ1aWxkTWV0aG9kIiwiRXJyb3IiLCJleHRyYSIsImh0dHBNZXRob2QiLCJPYmplY3QiLCJrZXlzIiwiYXJnTmFtZSIsInNwbGl0Iiwiam9pbiIsIlVSTFMiLCJQUk9QUyIsInNldEJhc2VVcmwiLCJwcm9wc1ByZWZpeCIsIm1vZGVscyIsImluc3RhbmNlcyIsImZvckVhY2giLCJfbG9hZCIsInN0b3JhZ2UiLCJyZW1lbWJlck1lIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJfc2F2ZSIsInVzZXJEYXRhIiwiY3VycmVudFVzZXJEYXRhIiwiaWdub3JlQmFzZVVybCIsInBvcCIsInVuc2hpZnQiLCJrZXkiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyIiwiY29uc29sZSIsImxvZyIsInBhcnNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUFFQSxLQUFJLDBCQUEwQix1QkFBdUI7O0FBRHJEOztBQUtBLEtBQUksbUJBQW1CLHVCQUF1Qjs7QUFKOUM7O0FBUUEsS0FBSSxrQkFBa0IsdUJBQXVCOztBQUU3QyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QUFSdkZBLFNBQVFDLE9BQU8sZUFBZSxJQUU3QkMsU0FBUyx5QkFBeUJDLGlDQUNsQ0QsU0FBUyxrQkFBa0JFLDBCQUMzQkYsU0FB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N0Q7O1dBRW5CRixPQUFNQSxLQUFJNkMsS0FBSzs7V0FFZixPQUFPN0M7Ozs7OztVQTlEZ0Q7U0FBQTtTQUFBLHNCQW9FbkRzRCxTQUFTVSxLQUFLdkUsT0FBTztXQUN6QixJQUFJO2FBQ0Y2RCxRQUFRVSxPQUFPQyxLQUFLQyxVQUFVekU7YUFDOUIsT0FBTzBFLEtBQUs7YUFDWkMsUUFBUUMsSUFBSSx3Q0FBd0NGOzs7VUF4RUM7U0FBQTtTQUFBLHNCQTRFbkRILEtBQUs7V0FDVCxPQUFPQyxLQUFLSyxNQUFNZCxhQUFhUSxRQUFRUCxlQUFlTyxRQUFROztVQTdFUDtTQUFBO1NBQUEsc0JBZ0ZuRGhGLE1BQU1nQixLQUFLO1dBQ2YsSUFBSSxLQUFLbUQsVUFBVW5FLE9BQU8sT0FBTyxLQUFLbUUsVUFBVW5FO1dBQ2hELEtBQUttRSxVQUFVbkUsUUFBUSxJQUFJeEIsZUFBZXdCLE1BQU1nQixhQUFXaEIsT0FBWCxLQUFvQjtXQUNwRSxLQUFLa0UsT0FBT2xFLFFBQVEsS0FBS21FLFVBQVVuRSxNQUFNTztXQUN6QyxPQUFPLEtBQUsyRCxPQUFPbEU7Ozs7T0FwRm9DO09BRS9CekI7O0tBdUY1QixPQUFPRSIsImZpbGUiOiJhbmd1bGFyLXNpbXBsZWFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDAwM2JlMWE4ZWI4MDRlMjI1MTc2IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgU2ltcGxlQXBpRXZlbnRFbWl0dGVyIGZyb20gJy4vc2ltcGxlLWFwaS1ldmVudC1lbWl0dGVyJztcbmltcG9ydCBTaW1wbGVBcGlNb2RlbCBmcm9tICcuL3NpbXBsZS1hcGktbW9kZWwnO1xuaW1wb3J0IFNpbXBsZUFwaVJvb3QgZnJvbSAnLi9zaW1wbGUtYXBpLXJvb3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbmdTaW1wbGVBcGknLCBbXSlcblxuLnByb3ZpZGVyKCdTaW1wbGVBcGlFdmVudEVtaXR0ZXInLCBTaW1wbGVBcGlFdmVudEVtaXR0ZXIpXG4ucHJvdmlkZXIoJ1NpbXBsZUFwaU1vZGVsJywgU2ltcGxlQXBpTW9kZWwpXG4ucHJvdmlkZXIoJ1NpbXBsZUFwaVJvb3QnLCBTaW1wbGVBcGlSb290KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpbXBsZUFwaUV2ZW50RW1pdHRlciAoKSB7ICduZ0luamVjdCc7XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpRXZlbnRFbWl0dGVyIHtcbiAgICAgIFxuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJF9saXN0ZW5lcnMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgJG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYoIShldmVudE5hbWUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcbiAgICAgICAgICB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAkb25jZShldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgIHRoaXMuJG9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLiRvbihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICAkb2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICB2YXIgaWR4ID0gc3RhY2suaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgc3RhY2suc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG9mZihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgJGVtaXQoZXZlbnROYW1lLCBldmVudCkge1xuICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHN0YWNrLm1hcCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGV2ZW50fHx7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgc3RhdGljICRtYWtlKG9iaikge1xuICAgICAgICBpZiAoIW9iai4kX2xpc3RlbmVycykge1xuICAgICAgICAgIG9iai4kX2xpc3RlbmVycyA9IFtdO1xuICAgICAgICAgIG9iai4kb24gPSBTaW1wbGVBcGlFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRvbjtcbiAgICAgICAgICBvYmouJG9mZiA9IFNpbXBsZUFwaUV2ZW50RW1pdHRlci5wcm90b3R5cGUuJG9mZjtcbiAgICAgICAgICBvYmouJGVtaXQgPSBTaW1wbGVBcGlFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRlbWl0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpRXZlbnRFbWl0dGVyO1xuXG4gIH07XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZS1hcGktZXZlbnQtZW1pdHRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpTW9kZWwoKSB7ICduZ0luamVjdCc7XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKCRodHRwLCAkcSkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpTW9kZWwge1xuXG4gICAgICBjb25zdHJ1Y3RvcihuYW1lLCBlbmRwb2ludCwgcm9vdEFwaSwgJGlvLCAkbG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubmFtZSAgICAgICAgICA9IG5hbWU7XG4gICAgICAgIHRoaXMuYWN0aW9ucyAgICAgICA9IHt9O1xuICAgICAgICB0aGlzLmVuZHBvaW50ICAgICAgPSBlbmRwb2ludDtcbiAgICAgICAgdGhpcy5yb290QXBpICAgICAgICAgPSByb290QXBpO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLiRpbyAgICAgICAgICAgPSAkaW87XG4gICAgICAgIHRoaXMuJGxvZ2dlciAgICAgICA9ICRsb2dnZXIgfHwgcm9vdEFwaS4kbG9nZ2VyO1xuICAgICAgICB0aGlzLk1vZGVsQnVpbGRlZCAgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IFtwcm9wLCB2YWx1ZV0gPSBhcmdzO1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aD09MCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoPT0xKSByZXR1cm4gdGhpc1twcm9wXTtcbiAgICAgICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuJGlvKSB7XG4gICAgICAgICAgdGhpcy5yb290QXBpLiRvbigndXNlci5zZXR0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpby5jb25uZWN0KHtcbiAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnJvb3RBcGkuY3VycmVudFVzZXJJZCxcbiAgICAgICAgICAgICAgaWQ6ICAgICB0aGlzLnJvb3RBcGkuYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm9vdEFwaS5jdXJyZW50VXNlcklkICYmIHRoaXMucm9vdEFwaS5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgdGhpcy5yb290QXBpLiRlbWl0KCd1c2VyLnNldHRlZCcsIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIGJ1aWxkVXJsKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RBcGkuZ2V0QmFzZVVybCgpICsgdGhpcy5lbmRwb2ludCArIFNpbXBsZUFwaU1vZGVsLmJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgaHR0cEJ1aWxkTWV0aG9kIChhcmdzKSB7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IE1ldGhvZCA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSwgcmVxID0ge30sIGRlYnVnID0gZmFsc2UpIHtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBpc0FycmF5ID0gYXJncy5pc0FycmF5O1xuICAgICAgICAgIGNvbnN0IHZhbHVlICA9IGlzQXJyYXk/W106e307XG5cbiAgICAgICAgICBsZXQgd2FpdGluZyA9ICRxLnJlc29sdmUoKTtcbiAgICAgICAgICBcbiAgICAgICAgICByZXEubWV0aG9kID0gYXJncy5tZXRob2Q7XG4gICAgICAgICAgcmVxLnVybCA9IHNlbGYuYnVpbGRVcmwoYXJncy51cmwsIHBhcmFtcyk7XG4gICAgICAgICAgcmVxLmhlYWRlcnMgPSByZXEuaGVhZGVycyB8fCB7fTtcblxuICAgICAgICAgIGlmIChzZWxmLnJvb3RBcGkuaW50ZXJjZXB0b3IpIHtcbiAgICAgICAgICAgIHdhaXRpbmcgPSAkcS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHNlbGYucm9vdEFwaS5pbnRlcmNlcHRvcihyZXEpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5yb290QXBpLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICAgIGlmKCFyZXEuaGVhZGVyc1tzZWxmLnJvb3RBcGkuYXV0aEhlYWRlcl0pXG4gICAgICAgICAgICAgIHJlcS5oZWFkZXJzW3NlbGYucm9vdEFwaS5hdXRoSGVhZGVyXSA9IHNlbGYucm9vdEFwaS5hY2Nlc3NUb2tlbklkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgICAgaWYgKCFyZXEucGFyYW1zKSB7XG4gICAgICAgICAgICAgIHJlcS5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghcmVxLmRhdGEpIHtcbiAgICAgICAgICAgICAgcmVxLmRhdGEgPSBwYXJhbXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgICAgICB2YWx1ZS4kcHJvbWlzZSA9ICRxLnJlc29sdmUod2FpdGluZylcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgJHByb21pc2UgPSAkaHR0cChyZXEpO1xuICAgICAgICAgICAgaWYgKHNlbGYucm9vdEFwaS5wb3N0UHJvY2Vzc2VkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWxmLnJvb3RBcGkucG9zdFByb2Nlc3NlZCgkcHJvbWlzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJHByb21pc2U7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KSB7XG4gICAgICAgICAgICAgIHZhbHVlLnB1c2guYXBwbHkodmFsdWUsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQodmFsdWUsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICgoZGVidWcgfHwgc2VsZi5kZWJ1ZykgJiYgc2VsZi4kbG9nZ2VyKSB7XG4gICAgICAgICAgICAgIHNlbGYuJGxvZ2dlcihgJHtzZWxmLm5hbWV9LiR7YXJncy5uYW1lfWAsIHBhcmFtcywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWUuJGVycm9yID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICB0aHJvdyB2YWx1ZS4kZXJyb3I7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuJGlvKSB7XG4gICAgICAgICAgY29uc3QgJGlvID0gdGhpcy4kaW87XG4gICAgICAgICAgY29uc3QgYWN0aW9uQ29uZiA9IHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXTtcbiAgICAgICAgICBpZiAoIWFjdGlvbkNvbmYuc29ja2V0YWJsZSkgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IG9sZE1ldGhvZCA9IE1ldGhvZDtcbiAgICAgICAgICBsZXQgcmV0O1xuICAgICAgICAgIE1ldGhvZCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldCA9IG9sZE1ldGhvZChwYXJhbXMpO1xuICAgICAgICAgICAgcmV0LiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICRpby5zdWJzY3JpYmUocmV0LCAncHJvdG90eXBlLm9uVXBkYXRlZCcsIHJldC5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIE1ldGhvZC4kdXJsID0gKHBhcmFtcyA9IHt9LCByZXEgPSB7fSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RBcGkudXJsKHRoaXMuYnVpbGRVcmwoYXJncy51cmwsIHBhcmFtcyksIHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIE1ldGhvZC4kZXhlYyA9IChwYXJhbXMgPSB7fSwgcmVxID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBNZXRob2QocGFyYW1zLCByZXEsIHRydWUpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07ICBcblxuICAgICAgICByZXR1cm4gTWV0aG9kO1xuICAgICAgfVxuXG4gICAgICBodHRwTWV0aG9kICh2ZXJiLCBuYW1lLCB1cmwsIGF0dHJzID0ge30pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbmFtZTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW25hbWVdID0gYW5ndWxhci5leHRlbmQoe25hbWUsIHVybH0sIGF0dHJzLCB7XG4gICAgICAgICAgbWV0aG9kOiB2ZXJiLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uc1tuYW1lXS5mbiA9IHRoaXMuaHR0cEJ1aWxkTWV0aG9kKHRoaXMuYWN0aW9uc1tuYW1lXSk7XG5cbiAgICAgICAgdGhpcy5Nb2RlbEJ1aWxkZWRbbmFtZV0gPSB0aGlzLmFjdGlvbnNbbmFtZV0uZm47XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHNvY2tldGFibGUgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gYWN0aW9uTmFtZSA9IGFjdGlvbk5hbWUgfHwgdGhpcy5jdXJyZW50QWN0aW9uO1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXSkgdGhyb3cgbmV3IEVycm9yKCdub3QuZGVmaW5lZC5hY3Rpb24uJythY3Rpb25OYW1lKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdLnNvY2tldGFibGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaXNBcnJheSAoYWN0aW9uTmFtZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBhY3Rpb25OYW1lID0gYWN0aW9uTmFtZSB8fCB0aGlzLmN1cnJlbnRBY3Rpb247XG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdKSB0aHJvdyBuZXcgRXJyb3IoJ25vdC5kZWZpbmVkLmFjdGlvbi4nK2FjdGlvbk5hbWUpO1xuICAgICAgICB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0uaXNBcnJheSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBtZXRob2QgKG5hbWUsIGZuKSB7XG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkLnByb3RvdHlwZVtuYW1lXSA9IGZuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZXhwYW5kIChleHRyYSkge1xuICAgICAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLk1vZGVsQnVpbGRlZCwgZXh0cmEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZ2V0ICAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdnZXQnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgcG9zdCAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdwb3N0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIGRlbGV0ZSAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnZGVsZXRlJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHB1dCAgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncHV0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHBhdGNoICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncGF0Y2gnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgb3B0aW9ucyAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdvcHRpb25zJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cblxuICAgICAgc3RhdGljIGJ1aWxkVXJsICh1cmwsIHBhcmFtcykge1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgoYXJnTmFtZSkgPT4ge1xuICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnOicrYXJnTmFtZSkuam9pbihwYXJhbXNbYXJnTmFtZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlNb2RlbDtcblxuICB9O1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaW1wbGUtYXBpLW1vZGVsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW1wbGVBcGlSb290KCkgeyAnbmdJbmplY3QnO1xuXG4gIGNvbnN0IFVSTFMgID0ge307XG4gIGNvbnN0IFBST1BTID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZScsICdjdXJyZW50VXNlckRhdGEnXTtcblxuICB0aGlzLnNldEJhc2VVcmwgPSAobmFtZSwgdXJsKSA9PiB7XG4gICAgVVJMU1tuYW1lXSA9IHVybDtcbiAgfTtcblxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoU2ltcGxlQXBpRXZlbnRFbWl0dGVyLCBTaW1wbGVBcGlNb2RlbCkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpUm9vdCBleHRlbmRzIFNpbXBsZUFwaUV2ZW50RW1pdHRlcntcblxuICAgICAgY29uc3RydWN0b3IocHJvcHNQcmVmaXgsIGF1dGhIZWFkZXIsICRsb2dnZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hdXRoSGVhZGVyICA9IGF1dGhIZWFkZXIgfHwgJ2F1dGhvcml6YXRpb24nO1xuICAgICAgICB0aGlzLnByb3BzUHJlZml4ID0gcHJvcHNQcmVmaXg7XG4gICAgICAgIHRoaXMubW9kZWxzICAgICAgPSAoKSA9PiB0aGlzO1xuICAgICAgICB0aGlzLmluc3RhbmNlcyAgID0ge307XG4gICAgICAgIHRoaXMuJGxvZ2dlciAgICAgPSAkbG9nZ2VyO1xuICAgICAgICBcbiAgICAgICAgUFJPUFMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSB0aGlzLl9sb2FkKHRoaXMucHJvcHNQcmVmaXggKyBuYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEJhc2VVcmwoKSB7XG4gICAgICAgIHJldHVybiBVUkxTW3RoaXMucHJvcHNQcmVmaXhdXG4gICAgICB9XG5cbiAgICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgUFJPUFMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3NhdmUoc3RvcmFnZSwgdGhpcy5wcm9wc1ByZWZpeCArIG5hbWUsIHRoaXNbbmFtZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2V0VXNlcihhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgICAgICB0aGlzLiRlbWl0KCd1c2VyLnNldHRlZCcsIHt9KTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJVc2VyKCkge1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyU3RvcmFnZSgpIHtcbiAgICAgICAgUFJPUFMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3NhdmUoc2Vzc2lvblN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCBudWxsKTtcbiAgICAgICAgICB0aGlzLl9zYXZlKGxvY2FsU3RvcmFnZSwgdGhpcy5wcm9wc1ByZWZpeCArIG5hbWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdXJsKHVybCwgaWdub3JlQmFzZVVybCkge1xuICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5JZCkgcmV0dXJuIHVybDtcbiAgICAgICAgdXJsID0gdXJsLnNwbGl0KCc/Jyk7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmICh1cmwubGVuZ3RoIT09MSkgcGFyYW1zLnB1c2godXJsLnBvcCgpKTtcblxuICAgICAgICBwYXJhbXMucHVzaCgnYWNjZXNzX3Rva2VuPScrdGhpcy5hY2Nlc3NUb2tlbklkKTtcbiAgICAgICAgdXJsLnB1c2goJz8nK3BhcmFtcy5qb2luKCcmJykpO1xuICAgICAgICBpZiAoIWlnbm9yZUJhc2VVcmwpIHtcbiAgICAgICAgICB1cmwudW5zaGlmdCh0aGlzLmdldEJhc2VVcmwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdXJsID0gdXJsLmpvaW4oJycpO1xuXG4gICAgICAgIHJldHVybiB1cmw7XG5cbiAgICAgIH1cblxuICAgICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cbiAgICAgIF9zYXZlKHN0b3JhZ2UsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdG9yYWdlW2tleV0gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF9sb2FkKGtleSkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8ICdudWxsJyk7XG4gICAgICB9XG5cbiAgICAgIG1vZGVsKG5hbWUsIHVybCkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZXNbbmFtZV0pIHJldHVybiB0aGlzLmluc3RhbmNlc1tuYW1lXTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNbbmFtZV0gPSBuZXcgU2ltcGxlQXBpTW9kZWwobmFtZSwgdXJsIHx8IGAvJHtuYW1lfXNgLCB0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbHNbbmFtZV0gPSB0aGlzLmluc3RhbmNlc1tuYW1lXS5Nb2RlbEJ1aWxkZWQ7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tuYW1lXTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlSb290O1xuXG4gIH07XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxlLWFwaS1yb290LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==