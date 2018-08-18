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
	
	  this.$get = ["$http", function ($http) {
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
	
	            req.method = args.method;
	            req.url = self.buildUrl(args.url, params);
	            req.headers = req.headers || {};
	
	            if (self.rootApi.interceptor) {
	              self.rootApi.interceptor(req);
	            }
	
	            if (self.rootApi.accessTokenId) {
	              if (!req.headers[self.rootApi.authHeader]) req.headers[self.rootApi.authHeader] = self.rootApi.accessTokenId;
	            }
	
	            if (req.method === 'GET') {
	              req.params = params;
	            } else {
	              req.data = params;
	            }
	
	            value.$resolved = false;
	
	            value.$promise = $http(req).then(function (response) {
	              if (isArray) {
	                value.push.apply(value, response.data);
	              } else {
	                angular.extend(value, response.data);
	              }
	              value.$resolved = true;
	              if ((debug || self.debug) && self.$logger) {
	                // self.$logger(`${self.name}.${args.name}`, params, value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjMzM2M4NzcxMzg0MjQzNTQzMTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJTaW1wbGVBcGlFdmVudEVtaXR0ZXIiLCJTaW1wbGVBcGlNb2RlbCIsIlNpbXBsZUFwaVJvb3QiLCIkZ2V0IiwiJF9saXN0ZW5lcnMiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsInB1c2giLCJoYW5kbGVyIiwiYXJncyIsImFwcGx5IiwiJG9mZiIsIiRvbiIsInN0YWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImV2ZW50IiwibWFwIiwiY2FsbCIsIm9iaiIsInByb3RvdHlwZSIsIiRlbWl0IiwiJGh0dHAiLCJuYW1lIiwiZW5kcG9pbnQiLCJyb290QXBpIiwiJGlvIiwiJGxvZ2dlciIsImFjdGlvbnMiLCJjdXJyZW50QWN0aW9uIiwiTW9kZWxCdWlsZGVkIiwicHJvcCIsInZhbHVlIiwibGVuZ3RoIiwiY29ubmVjdCIsInVzZXJJZCIsImN1cnJlbnRVc2VySWQiLCJpZCIsImFjY2Vzc1Rva2VuSWQiLCJ1cmwiLCJwYXJhbXMiLCJnZXRCYXNlVXJsIiwiYnVpbGRVcmwiLCJzZWxmIiwiTWV0aG9kIiwicmVxIiwiZGVidWciLCJpc0FycmF5IiwibWV0aG9kIiwiaGVhZGVycyIsImludGVyY2VwdG9yIiwiYXV0aEhlYWRlciIsImRhdGEiLCIkcmVzb2x2ZWQiLCIkcHJvbWlzZSIsInRoZW4iLCJyZXNwb25zZSIsImV4dGVuZCIsImNhdGNoIiwiJGVycm9yIiwiYWN0aW9uQ29uZiIsImFjdGlvbk5hbWUiLCJzb2NrZXRhYmxlIiwib2xkTWV0aG9kIiwicmV0Iiwic3Vic2NyaWJlIiwiJHVybCIsIiRleGVjIiwicmVzdWx0IiwidmVyYiIsImF0dHJzIiwidG9VcHBlckNhc2UiLCJmbiIsImh0dHBCdWlsZE1ldGhvZCIsIkVycm9yIiwiZXh0cmEiLCJodHRwTWV0aG9kIiwiT2JqZWN0Iiwia2V5cyIsImFyZ05hbWUiLCJzcGxpdCIsImpvaW4iLCJVUkxTIiwiUFJPUFMiLCJzZXRCYXNlVXJsIiwicHJvcHNQcmVmaXgiLCJtb2RlbHMiLCJpbnN0YW5jZXMiLCJmb3JFYWNoIiwiX2xvYWQiLCJzdG9yYWdlIiwicmVtZW1iZXJNZSIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiX3NhdmUiLCJ1c2VyRGF0YSIsImN1cnJlbnRVc2VyRGF0YSIsImlnbm9yZUJhc2VVcmwiLCJwb3AiLCJ1bnNoaWZ0Iiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJwYXJzZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUEsS0FBSSwwQkFBMEIsdUJBQXVCOztBQURyRDs7QUFLQSxLQUFJLG1CQUFtQix1QkFBdUI7O0FBSjlDOztBQVFBLEtBQUksa0JBQWtCLHVCQUF1Qjs7QUFFN0MsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FBUnZGQSxTQUFRQyxPQUFPLGVBQWUsSUFFN0JDLFNBQVMseUJBQXlCQyxpQ0FDbENELFNBQVMsa0JBQWtCRSwwQkFDM0JGLFNBQVMsaUJBQWlCRyx5Qjs7Ozs7O0FDVjNCOztBQUVBLFFBQU8sZUFBZSxT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LFFBQVEsSUFBSXZCLGVBQWV1QixNQUFNZ0IsYUFBV2hCLE9BQVgsS0FBb0I7V0FDcEUsS0FBSytELE9BQU8vRCxRQUFRLEtBQUtnRSxVQUFVaEUsTUFBTU87V0FDekMsT0FBTyxLQUFLd0QsT0FBTy9EOzs7O09BcEZvQztPQUUvQnhCOztLQXVGNUIsT0FBT0UiLCJmaWxlIjoiYW5ndWxhci1zaW1wbGVhcGkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MzMzYzg3NzEzODQyNDM1NDMxNyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFNpbXBsZUFwaUV2ZW50RW1pdHRlciBmcm9tICcuL3NpbXBsZS1hcGktZXZlbnQtZW1pdHRlcic7XG5pbXBvcnQgU2ltcGxlQXBpTW9kZWwgZnJvbSAnLi9zaW1wbGUtYXBpLW1vZGVsJztcbmltcG9ydCBTaW1wbGVBcGlSb290IGZyb20gJy4vc2ltcGxlLWFwaS1yb290JztcblxuYW5ndWxhci5tb2R1bGUoJ25nU2ltcGxlQXBpJywgW10pXG5cbi5wcm92aWRlcignU2ltcGxlQXBpRXZlbnRFbWl0dGVyJywgU2ltcGxlQXBpRXZlbnRFbWl0dGVyKVxuLnByb3ZpZGVyKCdTaW1wbGVBcGlNb2RlbCcsIFNpbXBsZUFwaU1vZGVsKVxuLnByb3ZpZGVyKCdTaW1wbGVBcGlSb290JywgU2ltcGxlQXBpUm9vdCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW1wbGVBcGlFdmVudEVtaXR0ZXIgKCkgeyAnbmdJbmplY3QnO1xuXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uICgpIHsgJ25nSW5qZWN0JztcblxuICAgIGNsYXNzIFNpbXBsZUFwaUV2ZW50RW1pdHRlciB7XG4gICAgICBcbiAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLiRfbGlzdGVuZXJzID0gW107XG4gICAgICB9XG5cbiAgICAgICRvbihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmKCEoZXZlbnROYW1lIGluIHRoaXMuJF9saXN0ZW5lcnMpKSB7XG4gICAgICAgICAgdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgJG9uY2UoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICB0aGlzLiRvZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy4kb24oZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgJG9mZihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgdmFyIGlkeCA9IHN0YWNrLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgIHN0YWNrLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHJldHVybiB0aGlzLiRvZmYoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgICRlbWl0KGV2ZW50TmFtZSwgZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICBzdGFjay5tYXAoKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBldmVudHx8e30pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHN0YXRpYyAkbWFrZShvYmopIHtcbiAgICAgICAgaWYgKCFvYmouJF9saXN0ZW5lcnMpIHtcbiAgICAgICAgICBvYmouJF9saXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgICBvYmouJG9uID0gU2ltcGxlQXBpRXZlbnRFbWl0dGVyLnByb3RvdHlwZS4kb247XG4gICAgICAgICAgb2JqLiRvZmYgPSBTaW1wbGVBcGlFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRvZmY7XG4gICAgICAgICAgb2JqLiRlbWl0ID0gU2ltcGxlQXBpRXZlbnRFbWl0dGVyLnByb3RvdHlwZS4kZW1pdDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFNpbXBsZUFwaUV2ZW50RW1pdHRlcjtcblxuICB9O1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpbXBsZUFwaU1vZGVsKCkgeyAnbmdJbmplY3QnO1xuXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uICgkaHR0cCkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpTW9kZWwge1xuXG4gICAgICBjb25zdHJ1Y3RvcihuYW1lLCBlbmRwb2ludCwgcm9vdEFwaSwgJGlvLCAkbG9nZ2VyKSB7XG4gICAgICAgIHRoaXMubmFtZSAgICAgICAgICA9IG5hbWU7XG4gICAgICAgIHRoaXMuYWN0aW9ucyAgICAgICA9IHt9O1xuICAgICAgICB0aGlzLmVuZHBvaW50ICAgICAgPSBlbmRwb2ludDtcbiAgICAgICAgdGhpcy5yb290QXBpICAgICAgICAgPSByb290QXBpO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgICAgICB0aGlzLiRpbyAgICAgICAgICAgPSAkaW87XG4gICAgICAgIHRoaXMuJGxvZ2dlciAgICAgICA9ICRsb2dnZXIgfHwgcm9vdEFwaS4kbG9nZ2VyO1xuICAgICAgICB0aGlzLk1vZGVsQnVpbGRlZCAgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNvbnN0IFtwcm9wLCB2YWx1ZV0gPSBhcmdzO1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aD09MCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoPT0xKSByZXR1cm4gdGhpc1twcm9wXTtcbiAgICAgICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuJGlvKSB7XG4gICAgICAgICAgdGhpcy5yb290QXBpLiRvbigndXNlci5zZXR0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRpby5jb25uZWN0KHtcbiAgICAgICAgICAgICAgdXNlcklkOiB0aGlzLnJvb3RBcGkuY3VycmVudFVzZXJJZCxcbiAgICAgICAgICAgICAgaWQ6ICAgICB0aGlzLnJvb3RBcGkuYWNjZXNzVG9rZW5JZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucm9vdEFwaS5jdXJyZW50VXNlcklkICYmIHRoaXMucm9vdEFwaS5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgdGhpcy5yb290QXBpLiRlbWl0KCd1c2VyLnNldHRlZCcsIHt9KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIGJ1aWxkVXJsKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJvb3RBcGkuZ2V0QmFzZVVybCgpICsgdGhpcy5lbmRwb2ludCArIFNpbXBsZUFwaU1vZGVsLmJ1aWxkVXJsKHVybCwgcGFyYW1zKTtcbiAgICAgIH1cblxuICAgICAgaHR0cEJ1aWxkTWV0aG9kIChhcmdzKSB7XG5cbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IE1ldGhvZCA9IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSwgcmVxID0ge30sIGRlYnVnID0gZmFsc2UpIHtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBpc0FycmF5ID0gYXJncy5pc0FycmF5O1xuICAgICAgICAgIGNvbnN0IHZhbHVlICA9IGlzQXJyYXk/W106e307XG4gICAgICAgICAgXG4gICAgICAgICAgcmVxLm1ldGhvZCA9IGFyZ3MubWV0aG9kO1xuICAgICAgICAgIHJlcS51cmwgPSBzZWxmLmJ1aWxkVXJsKGFyZ3MudXJsLCBwYXJhbXMpO1xuICAgICAgICAgIHJlcS5oZWFkZXJzID0gcmVxLmhlYWRlcnMgfHwge307XG5cbiAgICAgICAgICBpZiAoc2VsZi5yb290QXBpLmludGVyY2VwdG9yKSB7XG4gICAgICAgICAgICBzZWxmLnJvb3RBcGkuaW50ZXJjZXB0b3IocmVxKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VsZi5yb290QXBpLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICAgIGlmKCFyZXEuaGVhZGVyc1tzZWxmLnJvb3RBcGkuYXV0aEhlYWRlcl0pXG4gICAgICAgICAgICAgIHJlcS5oZWFkZXJzW3NlbGYucm9vdEFwaS5hdXRoSGVhZGVyXSA9IHNlbGYucm9vdEFwaS5hY2Nlc3NUb2tlbklkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgICAgcmVxLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVxLmRhdGEgPSBwYXJhbXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gZmFsc2U7XG5cbiAgICAgICAgICB2YWx1ZS4kcHJvbWlzZSA9ICRodHRwKHJlcSlcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KSB7XG4gICAgICAgICAgICAgIHZhbHVlLnB1c2guYXBwbHkodmFsdWUsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQodmFsdWUsIHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICgoZGVidWcgfHwgc2VsZi5kZWJ1ZykgJiYgc2VsZi4kbG9nZ2VyKSB7XG4gICAgICAgICAgICAgIC8vIHNlbGYuJGxvZ2dlcihgJHtzZWxmLm5hbWV9LiR7YXJncy5uYW1lfWAsIHBhcmFtcywgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgdmFsdWUuJGVycm9yID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICB0aHJvdyB2YWx1ZS4kZXJyb3I7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuJGlvKSB7XG4gICAgICAgICAgY29uc3QgJGlvID0gdGhpcy4kaW87XG4gICAgICAgICAgY29uc3QgYWN0aW9uQ29uZiA9IHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXTtcbiAgICAgICAgICBpZiAoIWFjdGlvbkNvbmYuc29ja2V0YWJsZSkgcmV0dXJuO1xuICAgICAgICAgIGNvbnN0IG9sZE1ldGhvZCA9IE1ldGhvZDtcbiAgICAgICAgICBsZXQgcmV0O1xuICAgICAgICAgIE1ldGhvZCA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHJldCA9IG9sZE1ldGhvZChwYXJhbXMpO1xuICAgICAgICAgICAgcmV0LiRwcm9taXNlXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICRpby5zdWJzY3JpYmUocmV0LCAncHJvdG90eXBlLm9uVXBkYXRlZCcsIHJldC5pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIE1ldGhvZC4kdXJsID0gKHBhcmFtcyA9IHt9LCByZXEgPSB7fSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvb3RBcGkudXJsKHRoaXMuYnVpbGRVcmwoYXJncy51cmwsIHBhcmFtcyksIHRydWUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIE1ldGhvZC4kZXhlYyA9IChwYXJhbXMgPSB7fSwgcmVxID0ge30pID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBNZXRob2QocGFyYW1zLCByZXEsIHRydWUpO1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07ICBcblxuICAgICAgICByZXR1cm4gTWV0aG9kO1xuICAgICAgfVxuXG4gICAgICBodHRwTWV0aG9kICh2ZXJiLCBuYW1lLCB1cmwsIGF0dHJzID0ge30pIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbmFtZTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW25hbWVdID0gYW5ndWxhci5leHRlbmQoe25hbWUsIHVybH0sIGF0dHJzLCB7XG4gICAgICAgICAgbWV0aG9kOiB2ZXJiLnRvVXBwZXJDYXNlKCksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWN0aW9uc1tuYW1lXS5mbiA9IHRoaXMuaHR0cEJ1aWxkTWV0aG9kKHRoaXMuYWN0aW9uc1tuYW1lXSk7XG5cbiAgICAgICAgdGhpcy5Nb2RlbEJ1aWxkZWRbbmFtZV0gPSB0aGlzLmFjdGlvbnNbbmFtZV0uZm47XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHNvY2tldGFibGUgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gYWN0aW9uTmFtZSA9IGFjdGlvbk5hbWUgfHwgdGhpcy5jdXJyZW50QWN0aW9uO1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXSkgdGhyb3cgbmV3IEVycm9yKCdub3QuZGVmaW5lZC5hY3Rpb24uJythY3Rpb25OYW1lKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdLnNvY2tldGFibGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgaXNBcnJheSAoYWN0aW9uTmFtZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBhY3Rpb25OYW1lID0gYWN0aW9uTmFtZSB8fCB0aGlzLmN1cnJlbnRBY3Rpb247XG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdKSB0aHJvdyBuZXcgRXJyb3IoJ25vdC5kZWZpbmVkLmFjdGlvbi4nK2FjdGlvbk5hbWUpO1xuICAgICAgICB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0uaXNBcnJheSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBtZXRob2QgKG5hbWUsIGZuKSB7XG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkLnByb3RvdHlwZVtuYW1lXSA9IGZuO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZXhwYW5kIChleHRyYSkge1xuICAgICAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLk1vZGVsQnVpbGRlZCwgZXh0cmEpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZ2V0ICAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdnZXQnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgcG9zdCAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdwb3N0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIGRlbGV0ZSAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnZGVsZXRlJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHB1dCAgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncHV0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHBhdGNoICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncGF0Y2gnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgb3B0aW9ucyAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdvcHRpb25zJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cblxuICAgICAgc3RhdGljIGJ1aWxkVXJsICh1cmwsIHBhcmFtcykge1xuICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgoYXJnTmFtZSkgPT4ge1xuICAgICAgICAgIHVybCA9IHVybC5zcGxpdCgnOicrYXJnTmFtZSkuam9pbihwYXJhbXNbYXJnTmFtZV0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlNb2RlbDtcblxuICB9O1xuXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaW1wbGUtYXBpLW1vZGVsLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW1wbGVBcGlSb290KCkgeyAnbmdJbmplY3QnO1xuXG4gIGNvbnN0IFVSTFMgID0ge307XG4gIGNvbnN0IFBST1BTID0gWydhY2Nlc3NUb2tlbklkJywgJ2N1cnJlbnRVc2VySWQnLCAncmVtZW1iZXJNZScsICdjdXJyZW50VXNlckRhdGEnXTtcblxuICB0aGlzLnNldEJhc2VVcmwgPSAobmFtZSwgdXJsKSA9PiB7XG4gICAgVVJMU1tuYW1lXSA9IHVybDtcbiAgfTtcblxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoU2ltcGxlQXBpRXZlbnRFbWl0dGVyLCBTaW1wbGVBcGlNb2RlbCkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpUm9vdCBleHRlbmRzIFNpbXBsZUFwaUV2ZW50RW1pdHRlcntcblxuICAgICAgY29uc3RydWN0b3IocHJvcHNQcmVmaXgsIGF1dGhIZWFkZXIsICRsb2dnZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hdXRoSGVhZGVyICA9IGF1dGhIZWFkZXIgfHwgJ2F1dGhvcml6YXRpb24nO1xuICAgICAgICB0aGlzLnByb3BzUHJlZml4ID0gcHJvcHNQcmVmaXg7XG4gICAgICAgIHRoaXMubW9kZWxzICAgICAgPSAoKSA9PiB0aGlzO1xuICAgICAgICB0aGlzLmluc3RhbmNlcyAgID0ge307XG4gICAgICAgIHRoaXMuJGxvZ2dlciAgICAgPSAkbG9nZ2VyO1xuICAgICAgICBcbiAgICAgICAgUFJPUFMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSB0aGlzLl9sb2FkKHRoaXMucHJvcHNQcmVmaXggKyBuYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdldEJhc2VVcmwoKSB7XG4gICAgICAgIHJldHVybiBVUkxTW3RoaXMucHJvcHNQcmVmaXhdXG4gICAgICB9XG5cbiAgICAgIHNhdmUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLnJlbWVtYmVyTWUgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcbiAgICAgICAgUFJPUFMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3NhdmUoc3RvcmFnZSwgdGhpcy5wcm9wc1ByZWZpeCArIG5hbWUsIHRoaXNbbmFtZV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2V0VXNlcihhY2Nlc3NUb2tlbklkLCBjdXJyZW50VXNlcklkLCB1c2VyRGF0YSkge1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuSWQgPSBhY2Nlc3NUb2tlbklkO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSBjdXJyZW50VXNlcklkO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgICAgICB0aGlzLiRlbWl0KCd1c2VyLnNldHRlZCcsIHt9KTtcbiAgICAgIH1cblxuICAgICAgY2xlYXJVc2VyKCkge1xuICAgICAgICB0aGlzLmFjY2Vzc1Rva2VuSWQgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VySWQgPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRVc2VyRGF0YSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyU3RvcmFnZSgpIHtcbiAgICAgICAgUFJPUFMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgIHRoaXMuX3NhdmUoc2Vzc2lvblN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCBudWxsKTtcbiAgICAgICAgICB0aGlzLl9zYXZlKGxvY2FsU3RvcmFnZSwgdGhpcy5wcm9wc1ByZWZpeCArIG5hbWUsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdXJsKHVybCwgaWdub3JlQmFzZVVybCkge1xuICAgICAgICBpZiAoIXRoaXMuYWNjZXNzVG9rZW5JZCkgcmV0dXJuIHVybDtcbiAgICAgICAgdXJsID0gdXJsLnNwbGl0KCc/Jyk7XG5cbiAgICAgICAgY29uc3QgcGFyYW1zID0gW107XG4gICAgICAgIGlmICh1cmwubGVuZ3RoIT09MSkgcGFyYW1zLnB1c2godXJsLnBvcCgpKTtcblxuICAgICAgICBwYXJhbXMucHVzaCgnYWNjZXNzX3Rva2VuPScrdGhpcy5hY2Nlc3NUb2tlbklkKTtcbiAgICAgICAgdXJsLnB1c2goJz8nK3BhcmFtcy5qb2luKCcmJykpO1xuICAgICAgICBpZiAoIWlnbm9yZUJhc2VVcmwpIHtcbiAgICAgICAgICB1cmwudW5zaGlmdCh0aGlzLmdldEJhc2VVcmwoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdXJsID0gdXJsLmpvaW4oJycpO1xuXG4gICAgICAgIHJldHVybiB1cmw7XG5cbiAgICAgIH1cblxuICAgICAgLy8gTm90ZTogTG9jYWxTdG9yYWdlIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBzdHJpbmdcbiAgICAgIC8vIFdlIGFyZSB1c2luZyBlbXB0eSBzdHJpbmcgYXMgYSBtYXJrZXIgZm9yIG51bGwvdW5kZWZpbmVkIHZhbHVlcy5cbiAgICAgIF9zYXZlKHN0b3JhZ2UsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzdG9yYWdlW2tleV0gPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdDYW5ub3QgYWNjZXNzIGxvY2FsL3Nlc3Npb24gc3RvcmFnZTonLCBlcnIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIF9sb2FkKGtleSkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2Vba2V5XSB8fCBzZXNzaW9uU3RvcmFnZVtrZXldIHx8ICdudWxsJyk7XG4gICAgICB9XG5cbiAgICAgIG1vZGVsKG5hbWUsIHVybCkge1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZXNbbmFtZV0pIHJldHVybiB0aGlzLmluc3RhbmNlc1tuYW1lXTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZXNbbmFtZV0gPSBuZXcgU2ltcGxlQXBpTW9kZWwobmFtZSwgdXJsIHx8IGAvJHtuYW1lfXNgLCB0aGlzKTtcbiAgICAgICAgdGhpcy5tb2RlbHNbbmFtZV0gPSB0aGlzLmluc3RhbmNlc1tuYW1lXS5Nb2RlbEJ1aWxkZWQ7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tuYW1lXTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlSb290O1xuXG4gIH07XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxlLWFwaS1yb290LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==