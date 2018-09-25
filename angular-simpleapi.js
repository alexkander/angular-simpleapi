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
	              if (!req.params) {
	                req.params = params;
	              }
	            } else {
	              if (!req.data) {
	                req.data = params;
	              }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTg3MDYzMjU2ODNmZjE2NTllMjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJTaW1wbGVBcGlFdmVudEVtaXR0ZXIiLCJTaW1wbGVBcGlNb2RlbCIsIlNpbXBsZUFwaVJvb3QiLCIkZ2V0IiwiJF9saXN0ZW5lcnMiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsInB1c2giLCJoYW5kbGVyIiwiYXJncyIsImFwcGx5IiwiJG9mZiIsIiRvbiIsInN0YWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImV2ZW50IiwibWFwIiwiY2FsbCIsIm9iaiIsInByb3RvdHlwZSIsIiRlbWl0IiwiJGh0dHAiLCJuYW1lIiwiZW5kcG9pbnQiLCJyb290QXBpIiwiJGlvIiwiJGxvZ2dlciIsImFjdGlvbnMiLCJjdXJyZW50QWN0aW9uIiwiTW9kZWxCdWlsZGVkIiwicHJvcCIsInZhbHVlIiwibGVuZ3RoIiwiY29ubmVjdCIsInVzZXJJZCIsImN1cnJlbnRVc2VySWQiLCJpZCIsImFjY2Vzc1Rva2VuSWQiLCJ1cmwiLCJwYXJhbXMiLCJnZXRCYXNlVXJsIiwiYnVpbGRVcmwiLCJzZWxmIiwiTWV0aG9kIiwicmVxIiwiZGVidWciLCJpc0FycmF5IiwibWV0aG9kIiwiaGVhZGVycyIsImludGVyY2VwdG9yIiwiYXV0aEhlYWRlciIsImRhdGEiLCIkcmVzb2x2ZWQiLCIkcHJvbWlzZSIsInRoZW4iLCJyZXNwb25zZSIsImV4dGVuZCIsImNhdGNoIiwiJGVycm9yIiwiYWN0aW9uQ29uZiIsImFjdGlvbk5hbWUiLCJzb2NrZXRhYmxlIiwib2xkTWV0aG9kIiwicmV0Iiwic3Vic2NyaWJlIiwiJHVybCIsIiRleGVjIiwicmVzdWx0IiwidmVyYiIsImF0dHJzIiwidG9VcHBlckNhc2UiLCJmbiIsImh0dHBCdWlsZE1ldGhvZCIsIkVycm9yIiwiZXh0cmEiLCJodHRwTWV0aG9kIiwiT2JqZWN0Iiwia2V5cyIsImFyZ05hbWUiLCJzcGxpdCIsImpvaW4iLCJVUkxTIiwiUFJPUFMiLCJzZXRCYXNlVXJsIiwicHJvcHNQcmVmaXgiLCJtb2RlbHMiLCJpbnN0YW5jZXMiLCJmb3JFYWNoIiwiX2xvYWQiLCJzdG9yYWdlIiwicmVtZW1iZXJNZSIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiX3NhdmUiLCJ1c2VyRGF0YSIsImN1cnJlbnRVc2VyRGF0YSIsImlnbm9yZUJhc2VVcmwiLCJwb3AiLCJ1bnNoaWZ0Iiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJwYXJzZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUEsS0FBSSwwQkFBMEIsdUJBQXVCOztBQURyRDs7QUFLQSxLQUFJLG1CQUFtQix1QkFBdUI7O0FBSjlDOztBQVFBLEtBQUksa0JBQWtCLHVCQUF1Qjs7QUFFN0MsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FBUnZGQSxTQUFRQyxPQUFPLGVBQWUsSUFFN0JDLFNBQVMseUJBQXlCQyxpQ0FDbENELFNBQVMsa0JBQWtCRSwwQkFDM0JGLFNBQVMsaUJBQWlCRyx5Qjs7Ozs7O0FDVjNCOztBQUVBLFFBQU8sZUFBZSxT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UCxlQUFlTyxRQUFROztVQTdFUDtTQUFBO1NBQUEsc0JBZ0ZuRDdFLE1BQU1nQixLQUFLO1dBQ2YsSUFBSSxLQUFLZ0QsVUFBVWhFLE9BQU8sT0FBTyxLQUFLZ0UsVUFBVWhFO1dBQ2hELEtBQUtnRSxVQUFVaEUsUUFBUSxJQUFJdkIsZUFBZXVCLE1BQU1nQixhQUFXaEIsT0FBWCxLQUFvQjtXQUNwRSxLQUFLK0QsT0FBTy9ELFFBQVEsS0FBS2dFLFVBQVVoRSxNQUFNTztXQUN6QyxPQUFPLEtBQUt3RCxPQUFPL0Q7Ozs7T0FwRm9DO09BRS9CeEI7O0tBdUY1QixPQUFPRSIsImZpbGUiOiJhbmd1bGFyLXNpbXBsZWFwaS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGU4NzA2MzI1NjgzZmYxNjU5ZTIxIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgU2ltcGxlQXBpRXZlbnRFbWl0dGVyIGZyb20gJy4vc2ltcGxlLWFwaS1ldmVudC1lbWl0dGVyJztcbmltcG9ydCBTaW1wbGVBcGlNb2RlbCBmcm9tICcuL3NpbXBsZS1hcGktbW9kZWwnO1xuaW1wb3J0IFNpbXBsZUFwaVJvb3QgZnJvbSAnLi9zaW1wbGUtYXBpLXJvb3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbmdTaW1wbGVBcGknLCBbXSlcblxuLnByb3ZpZGVyKCdTaW1wbGVBcGlFdmVudEVtaXR0ZXInLCBTaW1wbGVBcGlFdmVudEVtaXR0ZXIpXG4ucHJvdmlkZXIoJ1NpbXBsZUFwaU1vZGVsJywgU2ltcGxlQXBpTW9kZWwpXG4ucHJvdmlkZXIoJ1NpbXBsZUFwaVJvb3QnLCBTaW1wbGVBcGlSb290KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpbXBsZUFwaUV2ZW50RW1pdHRlciAoKSB7ICduZ0luamVjdCc7XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKCkgeyAnbmdJbmplY3QnO1xuXG4gICAgY2xhc3MgU2ltcGxlQXBpRXZlbnRFbWl0dGVyIHtcbiAgICAgIFxuICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuJF9saXN0ZW5lcnMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgJG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYoIShldmVudE5hbWUgaW4gdGhpcy4kX2xpc3RlbmVycykpIHtcbiAgICAgICAgICB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAkb25jZShldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgIHRoaXMuJG9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLiRvbihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICAkb2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIHN0YWNrID0gdGhpcy4kX2xpc3RlbmVyc1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICB2YXIgaWR4ID0gc3RhY2suaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgc3RhY2suc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuJG9mZihldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgJGVtaXQoZXZlbnROYW1lLCBldmVudCkge1xuICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHN0YWNrLm1hcCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGV2ZW50fHx7fSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgc3RhdGljICRtYWtlKG9iaikge1xuICAgICAgICBpZiAoIW9iai4kX2xpc3RlbmVycykge1xuICAgICAgICAgIG9iai4kX2xpc3RlbmVycyA9IFtdO1xuICAgICAgICAgIG9iai4kb24gPSBTaW1wbGVBcGlFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRvbjtcbiAgICAgICAgICBvYmouJG9mZiA9IFNpbXBsZUFwaUV2ZW50RW1pdHRlci5wcm90b3R5cGUuJG9mZjtcbiAgICAgICAgICBvYmouJGVtaXQgPSBTaW1wbGVBcGlFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRlbWl0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpRXZlbnRFbWl0dGVyO1xuXG4gIH07XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZS1hcGktZXZlbnQtZW1pdHRlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpTW9kZWwoKSB7ICduZ0luamVjdCc7XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKCRodHRwKSB7ICduZ0luamVjdCc7XG5cbiAgICBjbGFzcyBTaW1wbGVBcGlNb2RlbCB7XG5cbiAgICAgIGNvbnN0cnVjdG9yKG5hbWUsIGVuZHBvaW50LCByb290QXBpLCAkaW8sICRsb2dnZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lICAgICAgICAgID0gbmFtZTtcbiAgICAgICAgdGhpcy5hY3Rpb25zICAgICAgID0ge307XG4gICAgICAgIHRoaXMuZW5kcG9pbnQgICAgICA9IGVuZHBvaW50O1xuICAgICAgICB0aGlzLnJvb3RBcGkgICAgICAgICA9IHJvb3RBcGk7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMuJGlvICAgICAgICAgICA9ICRpbztcbiAgICAgICAgdGhpcy4kbG9nZ2VyICAgICAgID0gJGxvZ2dlciB8fCByb290QXBpLiRsb2dnZXI7XG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkICA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgW3Byb3AsIHZhbHVlXSA9IGFyZ3M7XG4gICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoPT0wKSByZXR1cm4gdGhpcztcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGg9PTEpIHJldHVybiB0aGlzW3Byb3BdO1xuICAgICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy4kaW8pIHtcbiAgICAgICAgICB0aGlzLnJvb3RBcGkuJG9uKCd1c2VyLnNldHRlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGlvLmNvbm5lY3Qoe1xuICAgICAgICAgICAgICB1c2VySWQ6IHRoaXMucm9vdEFwaS5jdXJyZW50VXNlcklkLFxuICAgICAgICAgICAgICBpZDogICAgIHRoaXMucm9vdEFwaS5hY2Nlc3NUb2tlbklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yb290QXBpLmN1cnJlbnRVc2VySWQgJiYgdGhpcy5yb290QXBpLmFjY2Vzc1Rva2VuSWQpIHtcbiAgICAgICAgICB0aGlzLnJvb3RBcGkuJGVtaXQoJ3VzZXIuc2V0dGVkJywge30pO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgYnVpbGRVcmwodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdEFwaS5nZXRCYXNlVXJsKCkgKyB0aGlzLmVuZHBvaW50ICsgU2ltcGxlQXBpTW9kZWwuYnVpbGRVcmwodXJsLCBwYXJhbXMpO1xuICAgICAgfVxuXG4gICAgICBodHRwQnVpbGRNZXRob2QgKGFyZ3MpIHtcblxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgTWV0aG9kID0gZnVuY3Rpb24gKHBhcmFtcyA9IHt9LCByZXEgPSB7fSwgZGVidWcgPSBmYWxzZSkge1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGlzQXJyYXkgPSBhcmdzLmlzQXJyYXk7XG4gICAgICAgICAgY29uc3QgdmFsdWUgID0gaXNBcnJheT9bXTp7fTtcbiAgICAgICAgICBcbiAgICAgICAgICByZXEubWV0aG9kID0gYXJncy5tZXRob2Q7XG4gICAgICAgICAgcmVxLnVybCA9IHNlbGYuYnVpbGRVcmwoYXJncy51cmwsIHBhcmFtcyk7XG4gICAgICAgICAgcmVxLmhlYWRlcnMgPSByZXEuaGVhZGVycyB8fCB7fTtcblxuICAgICAgICAgIGlmIChzZWxmLnJvb3RBcGkuaW50ZXJjZXB0b3IpIHtcbiAgICAgICAgICAgIHNlbGYucm9vdEFwaS5pbnRlcmNlcHRvcihyZXEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLnJvb3RBcGkuYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgICAgaWYoIXJlcS5oZWFkZXJzW3NlbGYucm9vdEFwaS5hdXRoSGVhZGVyXSlcbiAgICAgICAgICAgICAgcmVxLmhlYWRlcnNbc2VsZi5yb290QXBpLmF1dGhIZWFkZXJdID0gc2VsZi5yb290QXBpLmFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlcS5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgICBpZiAoIXJlcS5wYXJhbXMpIHtcbiAgICAgICAgICAgICAgcmVxLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFyZXEuZGF0YSkge1xuICAgICAgICAgICAgICByZXEuZGF0YSA9IHBhcmFtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSBmYWxzZTtcblxuICAgICAgICAgIHZhbHVlLiRwcm9taXNlID0gJGh0dHAocmVxKVxuICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkpIHtcbiAgICAgICAgICAgICAgdmFsdWUucHVzaC5hcHBseSh2YWx1ZSwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCh2YWx1ZSwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKChkZWJ1ZyB8fCBzZWxmLmRlYnVnKSAmJiBzZWxmLiRsb2dnZXIpIHtcbiAgICAgICAgICAgICAgc2VsZi4kbG9nZ2VyKGAke3NlbGYubmFtZX0uJHthcmdzLm5hbWV9YCwgcGFyYW1zLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS4kZXJyb3IgPSByZXNwb25zZS5kYXRhO1xuICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRocm93IHZhbHVlLiRlcnJvcjtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy4kaW8pIHtcbiAgICAgICAgICBjb25zdCAkaW8gPSB0aGlzLiRpbztcbiAgICAgICAgICBjb25zdCBhY3Rpb25Db25mID0gdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdO1xuICAgICAgICAgIGlmICghYWN0aW9uQ29uZi5zb2NrZXRhYmxlKSByZXR1cm47XG4gICAgICAgICAgY29uc3Qgb2xkTWV0aG9kID0gTWV0aG9kO1xuICAgICAgICAgIGxldCByZXQ7XG4gICAgICAgICAgTWV0aG9kID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0ID0gb2xkTWV0aG9kKHBhcmFtcyk7XG4gICAgICAgICAgICByZXQuJHByb21pc2VcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgJGlvLnN1YnNjcmliZShyZXQsICdwcm90b3R5cGUub25VcGRhdGVkJywgcmV0LmlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgTWV0aG9kLiR1cmwgPSAocGFyYW1zID0ge30sIHJlcSA9IHt9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucm9vdEFwaS51cmwodGhpcy5idWlsZFVybChhcmdzLnVybCwgcGFyYW1zKSwgdHJ1ZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgTWV0aG9kLiRleGVjID0gKHBhcmFtcyA9IHt9LCByZXEgPSB7fSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IE1ldGhvZChwYXJhbXMsIHJlcSwgdHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTsgIFxuXG4gICAgICAgIHJldHVybiBNZXRob2Q7XG4gICAgICB9XG5cbiAgICAgIGh0dHBNZXRob2QgKHZlcmIsIG5hbWUsIHVybCwgYXR0cnMgPSB7fSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBuYW1lO1xuICAgICAgICB0aGlzLmFjdGlvbnNbbmFtZV0gPSBhbmd1bGFyLmV4dGVuZCh7bmFtZSwgdXJsfSwgYXR0cnMsIHtcbiAgICAgICAgICBtZXRob2Q6IHZlcmIudG9VcHBlckNhc2UoKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hY3Rpb25zW25hbWVdLmZuID0gdGhpcy5odHRwQnVpbGRNZXRob2QodGhpcy5hY3Rpb25zW25hbWVdKTtcblxuICAgICAgICB0aGlzLk1vZGVsQnVpbGRlZFtuYW1lXSA9IHRoaXMuYWN0aW9uc1tuYW1lXS5mbjtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgc29ja2V0YWJsZSAoYWN0aW9uTmFtZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBhY3Rpb25OYW1lID0gYWN0aW9uTmFtZSB8fCB0aGlzLmN1cnJlbnRBY3Rpb247XG4gICAgICAgIGlmICghdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdKSB0aHJvdyBuZXcgRXJyb3IoJ25vdC5kZWZpbmVkLmFjdGlvbi4nK2FjdGlvbk5hbWUpO1xuICAgICAgICB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0uc29ja2V0YWJsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBpc0FycmF5IChhY3Rpb25OYW1lKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IGFjdGlvbk5hbWUgPSBhY3Rpb25OYW1lIHx8IHRoaXMuY3VycmVudEFjdGlvbjtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0pIHRocm93IG5ldyBFcnJvcignbm90LmRlZmluZWQuYWN0aW9uLicrYWN0aW9uTmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXS5pc0FycmF5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIG1ldGhvZCAobmFtZSwgZm4pIHtcbiAgICAgICAgdGhpcy5Nb2RlbEJ1aWxkZWQucHJvdG90eXBlW25hbWVdID0gZm47XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBleHBhbmQgKGV4dHJhKSB7XG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMuTW9kZWxCdWlsZGVkLCBleHRyYSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBnZXQgICAgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ2dldCcsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBwb3N0ICAgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ3Bvc3QnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgZGVsZXRlICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdkZWxldGUnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgcHV0ICAgICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdwdXQnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuICAgICAgcGF0Y2ggICAobmFtZSwgdXJsLCBhdHRycykgeyByZXR1cm4gdGhpcy5odHRwTWV0aG9kKCdwYXRjaCcsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBvcHRpb25zIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ29wdGlvbnMnLCBuYW1lLCB1cmwsIGF0dHJzKTsgfVxuXG4gICAgICBzdGF0aWMgYnVpbGRVcmwgKHVybCwgcGFyYW1zKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKChhcmdOYW1lKSA9PiB7XG4gICAgICAgICAgdXJsID0gdXJsLnNwbGl0KCc6JythcmdOYW1lKS5qb2luKHBhcmFtc1thcmdOYW1lXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFNpbXBsZUFwaU1vZGVsO1xuXG4gIH07XG5cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFNpbXBsZUFwaVJvb3QoKSB7ICduZ0luamVjdCc7XG5cbiAgY29uc3QgVVJMUyAgPSB7fTtcbiAgY29uc3QgUFJPUFMgPSBbJ2FjY2Vzc1Rva2VuSWQnLCAnY3VycmVudFVzZXJJZCcsICdyZW1lbWJlck1lJywgJ2N1cnJlbnRVc2VyRGF0YSddO1xuXG4gIHRoaXMuc2V0QmFzZVVybCA9IChuYW1lLCB1cmwpID0+IHtcbiAgICBVUkxTW25hbWVdID0gdXJsO1xuICB9O1xuXG4gIHRoaXMuJGdldCA9IGZ1bmN0aW9uIChTaW1wbGVBcGlFdmVudEVtaXR0ZXIsIFNpbXBsZUFwaU1vZGVsKSB7ICduZ0luamVjdCc7XG5cbiAgICBjbGFzcyBTaW1wbGVBcGlSb290IGV4dGVuZHMgU2ltcGxlQXBpRXZlbnRFbWl0dGVye1xuXG4gICAgICBjb25zdHJ1Y3Rvcihwcm9wc1ByZWZpeCwgYXV0aEhlYWRlciwgJGxvZ2dlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmF1dGhIZWFkZXIgID0gYXV0aEhlYWRlciB8fCAnYXV0aG9yaXphdGlvbic7XG4gICAgICAgIHRoaXMucHJvcHNQcmVmaXggPSBwcm9wc1ByZWZpeDtcbiAgICAgICAgdGhpcy5tb2RlbHMgICAgICA9ICgpID0+IHRoaXM7XG4gICAgICAgIHRoaXMuaW5zdGFuY2VzICAgPSB7fTtcbiAgICAgICAgdGhpcy4kbG9nZ2VyICAgICA9ICRsb2dnZXI7XG4gICAgICAgIFxuICAgICAgICBQUk9QUy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgdGhpc1tuYW1lXSA9IHRoaXMuX2xvYWQodGhpcy5wcm9wc1ByZWZpeCArIG5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2V0QmFzZVVybCgpIHtcbiAgICAgICAgcmV0dXJuIFVSTFNbdGhpcy5wcm9wc1ByZWZpeF1cbiAgICAgIH1cblxuICAgICAgc2F2ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMucmVtZW1iZXJNZSA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xuICAgICAgICBQUk9QUy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc2F2ZShzdG9yYWdlLCB0aGlzLnByb3BzUHJlZml4ICsgbmFtZSwgdGhpc1tuYW1lXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRVc2VyKGFjY2Vzc1Rva2VuSWQsIGN1cnJlbnRVc2VySWQsIHVzZXJEYXRhKSB7XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW5JZCA9IGFjY2Vzc1Rva2VuSWQ7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJJZCA9IGN1cnJlbnRVc2VySWQ7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJEYXRhID0gdXNlckRhdGE7XG4gICAgICAgIHRoaXMuJGVtaXQoJ3VzZXIuc2V0dGVkJywge30pO1xuICAgICAgfVxuXG4gICAgICBjbGVhclVzZXIoKSB7XG4gICAgICAgIHRoaXMuYWNjZXNzVG9rZW5JZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuY3VycmVudFVzZXJEYXRhID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY2xlYXJTdG9yYWdlKCkge1xuICAgICAgICBQUk9QUy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgICAgdGhpcy5fc2F2ZShzZXNzaW9uU3RvcmFnZSwgdGhpcy5wcm9wc1ByZWZpeCArIG5hbWUsIG51bGwpO1xuICAgICAgICAgIHRoaXMuX3NhdmUobG9jYWxTdG9yYWdlLCB0aGlzLnByb3BzUHJlZml4ICsgbmFtZSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB1cmwodXJsLCBpZ25vcmVCYXNlVXJsKSB7XG4gICAgICAgIGlmICghdGhpcy5hY2Nlc3NUb2tlbklkKSByZXR1cm4gdXJsO1xuICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJz8nKTtcblxuICAgICAgICBjb25zdCBwYXJhbXMgPSBbXTtcbiAgICAgICAgaWYgKHVybC5sZW5ndGghPT0xKSBwYXJhbXMucHVzaCh1cmwucG9wKCkpO1xuXG4gICAgICAgIHBhcmFtcy5wdXNoKCdhY2Nlc3NfdG9rZW49Jyt0aGlzLmFjY2Vzc1Rva2VuSWQpO1xuICAgICAgICB1cmwucHVzaCgnPycrcGFyYW1zLmpvaW4oJyYnKSk7XG4gICAgICAgIGlmICghaWdub3JlQmFzZVVybCkge1xuICAgICAgICAgIHVybC51bnNoaWZ0KHRoaXMuZ2V0QmFzZVVybCgpKTtcbiAgICAgICAgfVxuICAgICAgICB1cmwgPSB1cmwuam9pbignJyk7XG5cbiAgICAgICAgcmV0dXJuIHVybDtcblxuICAgICAgfVxuXG4gICAgICAvLyBOb3RlOiBMb2NhbFN0b3JhZ2UgY29udmVydHMgdGhlIHZhbHVlIHRvIHN0cmluZ1xuICAgICAgLy8gV2UgYXJlIHVzaW5nIGVtcHR5IHN0cmluZyBhcyBhIG1hcmtlciBmb3IgbnVsbC91bmRlZmluZWQgdmFsdWVzLlxuICAgICAgX3NhdmUoc3RvcmFnZSwga2V5LCB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHN0b3JhZ2Vba2V5XSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgX2xvYWQoa2V5KSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtrZXldIHx8IHNlc3Npb25TdG9yYWdlW2tleV0gfHwgJ251bGwnKTtcbiAgICAgIH1cblxuICAgICAgbW9kZWwobmFtZSwgdXJsKSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlc1tuYW1lXSkgcmV0dXJuIHRoaXMuaW5zdGFuY2VzW25hbWVdO1xuICAgICAgICB0aGlzLmluc3RhbmNlc1tuYW1lXSA9IG5ldyBTaW1wbGVBcGlNb2RlbChuYW1lLCB1cmwgfHwgYC8ke25hbWV9c2AsIHRoaXMpO1xuICAgICAgICB0aGlzLm1vZGVsc1tuYW1lXSA9IHRoaXMuaW5zdGFuY2VzW25hbWVdLk1vZGVsQnVpbGRlZDtcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW25hbWVdO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgcmV0dXJuIFNpbXBsZUFwaVJvb3Q7XG5cbiAgfTtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zaW1wbGUtYXBpLXJvb3QuanMiXSwic291cmNlUm9vdCI6IiJ9