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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGI5ZGY2NmVkYTI3NzFmZjk3MmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJTaW1wbGVBcGlFdmVudEVtaXR0ZXIiLCJTaW1wbGVBcGlNb2RlbCIsIlNpbXBsZUFwaVJvb3QiLCIkZ2V0IiwiJF9saXN0ZW5lcnMiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsInB1c2giLCJoYW5kbGVyIiwiYXJncyIsImFwcGx5IiwiJG9mZiIsIiRvbiIsInN0YWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImV2ZW50IiwibWFwIiwiY2FsbCIsIm9iaiIsInByb3RvdHlwZSIsIiRlbWl0IiwiJGh0dHAiLCIkcSIsIm5hbWUiLCJlbmRwb2ludCIsInJvb3RBcGkiLCIkaW8iLCIkbG9nZ2VyIiwiYWN0aW9ucyIsImN1cnJlbnRBY3Rpb24iLCJNb2RlbEJ1aWxkZWQiLCJwcm9wIiwidmFsdWUiLCJsZW5ndGgiLCJjb25uZWN0IiwidXNlcklkIiwiY3VycmVudFVzZXJJZCIsImlkIiwiYWNjZXNzVG9rZW5JZCIsInVybCIsInBhcmFtcyIsImdldEJhc2VVcmwiLCJidWlsZFVybCIsInNlbGYiLCJNZXRob2QiLCJyZXEiLCJkZWJ1ZyIsImlzQXJyYXkiLCJ3YWl0aW5nIiwicmVzb2x2ZSIsImdldFJlcSIsIm1ldGhvZCIsImhlYWRlcnMiLCJpbnRlcmNlcHRvciIsInRoZW4iLCJhdXRoSGVhZGVyIiwiZGF0YSIsIiRyZXNvbHZlZCIsIiRwcm9taXNlIiwiT2JqZWN0IiwiYXNzaWduIiwicG9zdFByb2Nlc3NlZCIsInJlc3BvbnNlIiwiZXh0ZW5kIiwiY2F0Y2giLCIkZXJyb3IiLCJhY3Rpb25Db25mIiwiYWN0aW9uTmFtZSIsInNvY2tldGFibGUiLCJvbGRNZXRob2QiLCJyZXQiLCJzdWJzY3JpYmUiLCIkdXJsIiwiJGV4ZWMiLCJyZXN1bHQiLCJ2ZXJiIiwiYXR0cnMiLCJ0b1VwcGVyQ2FzZSIsImZuIiwiaHR0cEJ1aWxkTWV0aG9kIiwiRXJyb3IiLCJleHRyYSIsImh0dHBNZXRob2QiLCJrZXlzIiwiYXJnTmFtZSIsInNwbGl0Iiwiam9pbiIsIlVSTFMiLCJQUk9QUyIsInNldEJhc2VVcmwiLCJwcm9wc1ByZWZpeCIsIm1vZGVscyIsImluc3RhbmNlcyIsImZvckVhY2giLCJfbG9hZCIsInN0b3JhZ2UiLCJyZW1lbWJlck1lIiwibG9jYWxTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJfc2F2ZSIsInVzZXJEYXRhIiwiY3VycmVudFVzZXJEYXRhIiwiaWdub3JlQmFzZVVybCIsInBvcCIsInVuc2hpZnQiLCJrZXkiLCJKU09OIiwic3RyaW5naWZ5IiwiZXJyIiwiY29uc29sZSIsImxvZyIsInBhcnNlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTs7QUFFQSxLQUFJLDBCQUEwQix1QkFBdUI7O0FBRHJEOztBQUtBLEtBQUksbUJBQW1CLHVCQUF1Qjs7QUFKOUM7O0FBUUEsS0FBSSxrQkFBa0IsdUJBQXVCOztBQUU3QyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QUFSdkZBLFNBQVFDLE9BQU8sZUFBZSxJQUU3QkMsU0FBUyx5QkFBeUJDLGlDQUNsQ0QsU0FBUyxr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RCxPQUFPbkMsS0FBSyxrQkFBZ0IsS0FBS2lDO1dBQ2pDQyxLQUFJbEMsS0FBSyxNQUFJbUMsT0FBTzhDLEtBQUs7V0FDekIsSUFBSSxDQUFDZ0IsZUFBZTthQUNsQi9ELEtBQUlpRSxRQUFRLEtBQUsvRDs7V0FFbkJGLE9BQU1BLEtBQUkrQyxLQUFLOztXQUVmLE9BQU8vQzs7Ozs7O1VBOURnRDtTQUFBO1NBQUEsc0JBb0VuRHdELFNBQVNVLEtBQUt6RSxPQUFPO1dBQ3pCLElBQUk7YUFDRitELFFBQVFVLE9BQU9DLEtBQUtDLFVBQVUzRTthQUM5QixPQUFPNEUsS0FBSzthQUNaQyxRQUFRQyxJQUFJLHdDQUF3Q0Y7OztVQXhFQztTQUFBO1NBQUEsc0JBNEVuREgsS0FBSztXQUNULE9BQU9DLEtBQUtLLE1BQU1kLGFBQWFRLFFBQVFQLGVBQWVPLFFBQVE7O1VBN0VQO1NBQUE7U0FBQSxzQkFnRm5EbEYsTUFBTWdCLEtBQUs7V0FDZixJQUFJLEtBQUtxRCxVQUFVckUsT0FBTyxPQUFPLEtBQUtxRSxVQUFVckU7V0FDaEQsS0FBS3FFLFVBQVVyRSxRQUFRLElBQUl4QixlQUFld0IsTUFBTWdCLGFBQVdoQixPQUFYLEtBQW9CO1dBQ3BFLEtBQUtvRSxPQUFPcEUsUUFBUSxLQUFLcUUsVUFBVXJFLE1BQU1PO1dBQ3pDLE9BQU8sS0FBSzZELE9BQU9wRTs7OztPQXBGb0M7T0FFL0J6Qjs7S0F1RjVCLE9BQU9FIiwiZmlsZSI6ImFuZ3VsYXItc2ltcGxlYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGI5ZGY2NmVkYTI3NzFmZjk3MmUiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBTaW1wbGVBcGlFdmVudEVtaXR0ZXIgZnJvbSAnLi9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXInO1xuaW1wb3J0IFNpbXBsZUFwaU1vZGVsIGZyb20gJy4vc2ltcGxlLWFwaS1tb2RlbCc7XG5pbXBvcnQgU2ltcGxlQXBpUm9vdCBmcm9tICcuL3NpbXBsZS1hcGktcm9vdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCduZ1NpbXBsZUFwaScsIFtdKVxuXG4ucHJvdmlkZXIoJ1NpbXBsZUFwaUV2ZW50RW1pdHRlcicsIFNpbXBsZUFwaUV2ZW50RW1pdHRlcilcbi5wcm92aWRlcignU2ltcGxlQXBpTW9kZWwnLCBTaW1wbGVBcGlNb2RlbClcbi5wcm92aWRlcignU2ltcGxlQXBpUm9vdCcsIFNpbXBsZUFwaVJvb3QpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpRXZlbnRFbWl0dGVyICgpIHsgJ25nSW5qZWN0JztcblxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoKSB7ICduZ0luamVjdCc7XG5cbiAgICBjbGFzcyBTaW1wbGVBcGlFdmVudEVtaXR0ZXIge1xuICAgICAgXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kX2xpc3RlbmVycyA9IFtdO1xuICAgICAgfVxuXG4gICAgICAkb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBpZighKGV2ZW50TmFtZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xuICAgICAgICAgIHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgICRvbmNlKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgdGhpcy4kb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuJG9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgICRvZmYoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHZhciBpZHggPSBzdGFjay5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICBzdGFjay5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kb2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAkZW1pdChldmVudE5hbWUsIGV2ZW50KSB7XG4gICAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgc3RhY2subWFwKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXZlbnR8fHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBzdGF0aWMgJG1ha2Uob2JqKSB7XG4gICAgICAgIGlmICghb2JqLiRfbGlzdGVuZXJzKSB7XG4gICAgICAgICAgb2JqLiRfbGlzdGVuZXJzID0gW107XG4gICAgICAgICAgb2JqLiRvbiA9IFNpbXBsZUFwaUV2ZW50RW1pdHRlci5wcm90b3R5cGUuJG9uO1xuICAgICAgICAgIG9iai4kb2ZmID0gU2ltcGxlQXBpRXZlbnRFbWl0dGVyLnByb3RvdHlwZS4kb2ZmO1xuICAgICAgICAgIG9iai4kZW1pdCA9IFNpbXBsZUFwaUV2ZW50RW1pdHRlci5wcm90b3R5cGUuJGVtaXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlFdmVudEVtaXR0ZXI7XG5cbiAgfTtcblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxlLWFwaS1ldmVudC1lbWl0dGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW1wbGVBcGlNb2RlbCgpIHsgJ25nSW5qZWN0JztcblxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoJGh0dHAsICRxKSB7ICduZ0luamVjdCc7XG5cbiAgICBjbGFzcyBTaW1wbGVBcGlNb2RlbCB7XG5cbiAgICAgIGNvbnN0cnVjdG9yKG5hbWUsIGVuZHBvaW50LCByb290QXBpLCAkaW8sICRsb2dnZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lICAgICAgICAgID0gbmFtZTtcbiAgICAgICAgdGhpcy5hY3Rpb25zICAgICAgID0ge307XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgICAgICA9IGVuZHBvaW50O1xuICAgICAgICB0aGlzLnJvb3RBcGkgICAgICAgICA9IHJvb3RBcGk7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuJGlvICAgICAgICAgICA9ICRpbztcbiAgICAgICAgdGhpcy4kbG9nZ2VyICAgICAgID0gJGxvZ2dlciB8fCByb290QXBpLiRsb2dnZXI7XG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkICA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgW3Byb3AsIHZhbHVlXSA9IGFyZ3M7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoPT0wKSByZXR1cm4gdGhpcztcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGg9PTEpIHJldHVybiB0aGlzW3Byb3BdO1xuICAgICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy4kaW8pIHtcbiAgICAgICAgICB0aGlzLnJvb3RBcGkuJG9uKCd1c2VyLnNldHRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGlvLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMucm9vdEFwaS5jdXJyZW50VXNlcklkLFxuICAgICAgICAgICAgICBpZDogICAgIHRoaXMucm9vdEFwaS5hY2Nlc3NUb2tlbklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb290QXBpLmN1cnJlbnRVc2VySWQgJiYgdGhpcy5yb290QXBpLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICB0aGlzLnJvb3RBcGkuJGVtaXQoJ3VzZXIuc2V0dGVkJywge30pO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgYnVpbGRVcmwodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdEFwaS5nZXRCYXNlVXJsKCkgKyB0aGlzLmVuZHBvaW50ICsgU2ltcGxlQXBpTW9kZWwuYnVpbGRVcmwodXJsLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBodHRwQnVpbGRNZXRob2QgKGFyZ3MpIHtcblxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgTWV0aG9kID0gZnVuY3Rpb24gKHBhcmFtcyA9IHt9LCByZXEgPSB7fSwgZGVidWcgPSBmYWxzZSkge1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGlzQXJyYXkgPSBhcmdzLmlzQXJyYXk7XG4gICAgICAgICAgY29uc3QgdmFsdWUgID0gaXNBcnJheT9bXTp7fTtcblxuICAgICAgICAgIGxldCB3YWl0aW5nID0gJHEucmVzb2x2ZSgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGdldFJlcSA9IChyZXEpID0+IHtcbiAgICAgICAgICAgIHJlcS5tZXRob2QgPSBhcmdzLm1ldGhvZDtcbiAgICAgICAgICAgIHJlcS51cmwgPSBzZWxmLmJ1aWxkVXJsKGFyZ3MudXJsLCBwYXJhbXMpO1xuICAgICAgICAgICAgcmVxLmhlYWRlcnMgPSByZXEuaGVhZGVycyB8fCB7fTtcblxuICAgICAgICAgICAgaWYgKHNlbGYucm9vdEFwaS5pbnRlcmNlcHRvcikge1xuICAgICAgICAgICAgICB3YWl0aW5nID0gJHEucmVzb2x2ZSgpXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHNlbGYucm9vdEFwaS5pbnRlcmNlcHRvcihyZXEpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGYucm9vdEFwaS5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgICAgIGlmKCFyZXEuaGVhZGVyc1tzZWxmLnJvb3RBcGkuYXV0aEhlYWRlcl0pXG4gICAgICAgICAgICAgICAgcmVxLmhlYWRlcnNbc2VsZi5yb290QXBpLmF1dGhIZWFkZXJdID0gc2VsZi5yb290QXBpLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgICAgICBpZiAoIXJlcS5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgICByZXEucGFyYW1zID0gcGFyYW1zO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXJlcS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgcmVxLmRhdGEgPSBwYXJhbXM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgICAgICB2YWx1ZS4kcHJvbWlzZSA9ICRxLnJlc29sdmUod2FpdGluZylcbiAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkcHJvbWlzZSA9ICgpID0+ICRodHRwKGdldFJlcShPYmplY3QuYXNzaWduKHt9LCByZXEpKSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5yb290QXBpLnBvc3RQcm9jZXNzZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNlbGYucm9vdEFwaS5wb3N0UHJvY2Vzc2VkKCRwcm9taXNlKCksICRwcm9taXNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkcHJvbWlzZSgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgICB2YWx1ZS5wdXNoLmFwcGx5KHZhbHVlLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHZhbHVlLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoKGRlYnVnIHx8IHNlbGYuZGVidWcpICYmIHNlbGYuJGxvZ2dlcikge1xuICAgICAgICAgICAgICBzZWxmLiRsb2dnZXIoYCR7c2VsZi5uYW1lfS4ke2FyZ3MubmFtZX1gLCBwYXJhbXMsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhbHVlLiRlcnJvciA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhyb3cgdmFsdWUuJGVycm9yO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLiRpbykge1xuICAgICAgICAgIGNvbnN0ICRpbyA9IHRoaXMuJGlvO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbkNvbmYgPSB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV07XG4gICAgICAgICAgaWYgKCFhY3Rpb25Db25mLnNvY2tldGFibGUpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBvbGRNZXRob2QgPSBNZXRob2Q7XG4gICAgICAgICAgbGV0IHJldDtcbiAgICAgICAgICBNZXRob2QgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICByZXQgPSBvbGRNZXRob2QocGFyYW1zKTtcbiAgICAgICAgICAgIHJldC4kcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAkaW8uc3Vic2NyaWJlKHJldCwgJ3Byb3RvdHlwZS5vblVwZGF0ZWQnLCByZXQuaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBNZXRob2QuJHVybCA9IChwYXJhbXMgPSB7fSwgcmVxID0ge30pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yb290QXBpLnVybCh0aGlzLmJ1aWxkVXJsKGFyZ3MudXJsLCBwYXJhbXMpLCB0cnVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBNZXRob2QuJGV4ZWMgPSAocGFyYW1zID0ge30sIHJlcSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gTWV0aG9kKHBhcmFtcywgcmVxLCB0cnVlKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9OyAgXG5cbiAgICAgICAgcmV0dXJuIE1ldGhvZDtcbiAgICAgIH1cblxuICAgICAgaHR0cE1ldGhvZCAodmVyYiwgbmFtZSwgdXJsLCBhdHRycyA9IHt9KSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG5hbWU7XG4gICAgICAgIHRoaXMuYWN0aW9uc1tuYW1lXSA9IGFuZ3VsYXIuZXh0ZW5kKHtuYW1lLCB1cmx9LCBhdHRycywge1xuICAgICAgICAgIG1ldGhvZDogdmVyYi50b1VwcGVyQ2FzZSgpLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGlvbnNbbmFtZV0uZm4gPSB0aGlzLmh0dHBCdWlsZE1ldGhvZCh0aGlzLmFjdGlvbnNbbmFtZV0pO1xuXG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkW25hbWVdID0gdGhpcy5hY3Rpb25zW25hbWVdLmZuO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBzb2NrZXRhYmxlIChhY3Rpb25OYW1lKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IGFjdGlvbk5hbWUgPSBhY3Rpb25OYW1lIHx8IHRoaXMuY3VycmVudEFjdGlvbjtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0pIHRocm93IG5ldyBFcnJvcignbm90LmRlZmluZWQuYWN0aW9uLicrYWN0aW9uTmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXS5zb2NrZXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlzQXJyYXkgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gYWN0aW9uTmFtZSA9IGFjdGlvbk5hbWUgfHwgdGhpcy5jdXJyZW50QWN0aW9uO1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXSkgdGhyb3cgbmV3IEVycm9yKCdub3QuZGVmaW5lZC5hY3Rpb24uJythY3Rpb25OYW1lKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdLmlzQXJyYXkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbWV0aG9kIChuYW1lLCBmbikge1xuICAgICAgICB0aGlzLk1vZGVsQnVpbGRlZC5wcm90b3R5cGVbbmFtZV0gPSBmbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGV4cGFuZCAoZXh0cmEpIHtcbiAgICAgICAgYW5ndWxhci5leHRlbmQodGhpcy5Nb2RlbEJ1aWxkZWQsIGV4dHJhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGdldCAgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnZ2V0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHBvc3QgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncG9zdCcsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBkZWxldGUgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ2RlbGV0ZScsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBwdXQgICAgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ3B1dCcsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBwYXRjaCAgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ3BhdGNoJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIG9wdGlvbnMgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnb3B0aW9ucycsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG5cbiAgICAgIHN0YXRpYyBidWlsZFVybCAodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoKGFyZ05hbWUpID0+IHtcbiAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJzonK2FyZ05hbWUpLmpvaW4ocGFyYW1zW2FyZ05hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpTW9kZWw7XG5cbiAgfTtcblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxlLWFwaS1tb2RlbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpUm9vdCgpIHsgJ25nSW5qZWN0JztcblxuICBjb25zdCBVUkxTICA9IHt9O1xuICBjb25zdCBQUk9QUyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnLCAnY3VycmVudFVzZXJEYXRhJ107XG5cbiAgdGhpcy5zZXRCYXNlVXJsID0gKG5hbWUsIHVybCkgPT4ge1xuICAgIFVSTFNbbmFtZV0gPSB1cmw7XG4gIH07XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKFNpbXBsZUFwaUV2ZW50RW1pdHRlciwgU2ltcGxlQXBpTW9kZWwpIHsgJ25nSW5qZWN0JztcblxuICAgIGNsYXNzIFNpbXBsZUFwaVJvb3QgZXh0ZW5kcyBTaW1wbGVBcGlFdmVudEVtaXR0ZXJ7XG5cbiAgICAgIGNvbnN0cnVjdG9yKHByb3BzUHJlZml4LCBhdXRoSGVhZGVyLCAkbG9nZ2VyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXV0aEhlYWRlciAgPSBhdXRoSGVhZGVyIHx8ICdhdXRob3JpemF0aW9uJztcbiAgICAgICAgdGhpcy5wcm9wc1ByZWZpeCA9IHByb3BzUHJlZml4O1xuICAgICAgICB0aGlzLm1vZGVscyAgICAgID0gKCkgPT4gdGhpcztcbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgICA9IHt9O1xuICAgICAgICB0aGlzLiRsb2dnZXIgICAgID0gJGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gdGhpcy5fbG9hZCh0aGlzLnByb3BzUHJlZml4ICsgbmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnZXRCYXNlVXJsKCkge1xuICAgICAgICByZXR1cm4gVVJMU1t0aGlzLnByb3BzUHJlZml4XVxuICAgICAgfVxuXG4gICAgICBzYXZlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLl9zYXZlKHN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCB0aGlzW25hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldFVzZXIoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICAgICAgdGhpcy4kZW1pdCgndXNlci5zZXR0ZWQnLCB7fSk7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVXNlcigpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjbGVhclN0b3JhZ2UoKSB7XG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLl9zYXZlKHNlc3Npb25TdG9yYWdlLCB0aGlzLnByb3BzUHJlZml4ICsgbmFtZSwgbnVsbCk7XG4gICAgICAgICAgdGhpcy5fc2F2ZShsb2NhbFN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVybCh1cmwsIGlnbm9yZUJhc2VVcmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuSWQpIHJldHVybiB1cmw7XG4gICAgICAgIHVybCA9IHVybC5zcGxpdCgnPycpO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAodXJsLmxlbmd0aCE9PTEpIHBhcmFtcy5wdXNoKHVybC5wb3AoKSk7XG5cbiAgICAgICAgcGFyYW1zLnB1c2goJ2FjY2Vzc190b2tlbj0nK3RoaXMuYWNjZXNzVG9rZW5JZCk7XG4gICAgICAgIHVybC5wdXNoKCc/JytwYXJhbXMuam9pbignJicpKTtcbiAgICAgICAgaWYgKCFpZ25vcmVCYXNlVXJsKSB7XG4gICAgICAgICAgdXJsLnVuc2hpZnQodGhpcy5nZXRCYXNlVXJsKCkpO1xuICAgICAgICB9XG4gICAgICAgIHVybCA9IHVybC5qb2luKCcnKTtcblxuICAgICAgICByZXR1cm4gdXJsO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgICBfc2F2ZShzdG9yYWdlLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3RvcmFnZVtrZXldID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfbG9hZChrZXkpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCAnbnVsbCcpO1xuICAgICAgfVxuXG4gICAgICBtb2RlbChuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzW25hbWVdKSByZXR1cm4gdGhpcy5pbnN0YW5jZXNbbmFtZV07XG4gICAgICAgIHRoaXMuaW5zdGFuY2VzW25hbWVdID0gbmV3IFNpbXBsZUFwaU1vZGVsKG5hbWUsIHVybCB8fCBgLyR7bmFtZX1zYCwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxzW25hbWVdID0gdGhpcy5pbnN0YW5jZXNbbmFtZV0uTW9kZWxCdWlsZGVkO1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbbmFtZV07XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpUm9vdDtcblxuICB9O1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=