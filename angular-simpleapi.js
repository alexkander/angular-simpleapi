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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWFmYzc0YzU4NDYzYzNmNzg2YTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktbW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJTaW1wbGVBcGlFdmVudEVtaXR0ZXIiLCJTaW1wbGVBcGlNb2RlbCIsIlNpbXBsZUFwaVJvb3QiLCIkZ2V0IiwiJF9saXN0ZW5lcnMiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsInB1c2giLCJoYW5kbGVyIiwiYXJncyIsImFwcGx5IiwiJG9mZiIsIiRvbiIsInN0YWNrIiwiaWR4IiwiaW5kZXhPZiIsInNwbGljZSIsImV2ZW50IiwibWFwIiwiY2FsbCIsIm9iaiIsInByb3RvdHlwZSIsIiRlbWl0IiwiJGh0dHAiLCJuYW1lIiwiZW5kcG9pbnQiLCJyb290QXBpIiwiJGlvIiwiJGxvZ2dlciIsImFjdGlvbnMiLCJjdXJyZW50QWN0aW9uIiwiTW9kZWxCdWlsZGVkIiwicHJvcCIsInZhbHVlIiwibGVuZ3RoIiwiY29ubmVjdCIsInVzZXJJZCIsImN1cnJlbnRVc2VySWQiLCJpZCIsImFjY2Vzc1Rva2VuSWQiLCJ1cmwiLCJwYXJhbXMiLCJnZXRCYXNlVXJsIiwiYnVpbGRVcmwiLCJzZWxmIiwiTWV0aG9kIiwicmVxIiwiZGVidWciLCJpc0FycmF5IiwibWV0aG9kIiwiaGVhZGVycyIsImludGVyY2VwdG9yIiwiYXV0aEhlYWRlciIsImRhdGEiLCIkcmVzb2x2ZWQiLCIkcHJvbWlzZSIsInRoZW4iLCJyZXNwb25zZSIsImV4dGVuZCIsImNhdGNoIiwiJGVycm9yIiwiYWN0aW9uQ29uZiIsImFjdGlvbk5hbWUiLCJzb2NrZXRhYmxlIiwib2xkTWV0aG9kIiwicmV0Iiwic3Vic2NyaWJlIiwiJHVybCIsIiRleGVjIiwicmVzdWx0IiwidmVyYiIsImF0dHJzIiwidG9VcHBlckNhc2UiLCJmbiIsImh0dHBCdWlsZE1ldGhvZCIsIkVycm9yIiwiZXh0cmEiLCJodHRwTWV0aG9kIiwiT2JqZWN0Iiwia2V5cyIsImFyZ05hbWUiLCJzcGxpdCIsImpvaW4iLCJVUkxTIiwiUFJPUFMiLCJzZXRCYXNlVXJsIiwicHJvcHNQcmVmaXgiLCJtb2RlbHMiLCJpbnN0YW5jZXMiLCJmb3JFYWNoIiwiX2xvYWQiLCJzdG9yYWdlIiwicmVtZW1iZXJNZSIsImxvY2FsU3RvcmFnZSIsInNlc3Npb25TdG9yYWdlIiwiX3NhdmUiLCJ1c2VyRGF0YSIsImN1cnJlbnRVc2VyRGF0YSIsImlnbm9yZUJhc2VVcmwiLCJwb3AiLCJ1bnNoaWZ0Iiwia2V5IiwiSlNPTiIsInN0cmluZ2lmeSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJwYXJzZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUEsS0FBSSwwQkFBMEIsdUJBQXVCOztBQURyRDs7QUFLQSxLQUFJLG1CQUFtQix1QkFBdUI7O0FBSjlDOztBQVFBLEtBQUksa0JBQWtCLHVCQUF1Qjs7QUFFN0MsVUFBUyx1QkFBdUIsS0FBSyxFQUFFLE9BQU8sT0FBTyxJQUFJLGFBQWEsTUFBTSxFQUFFLFNBQVM7O0FBUnZGQSxTQUFRQyxPQUFPLGVBQWUsSUFFN0JDLFNBQVMseUJBQXlCQyxpQ0FDbENELFNBQVMsa0JBQWtCRSwwQkFDM0JGLFNBQVMsaUJBQWlCRyx5Qjs7Ozs7O0FDVjNCOztBQUVBLFFBQU8sZUFBZSxT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QUFJLEtBQUtnRCxVQUFVaEUsT0FBTyxPQUFPLEtBQUtnRSxVQUFVaEU7V0FDaEQsS0FBS2dFLFVBQVVoRSxRQUFRLElBQUl2QixlQUFldUIsTUFBTWdCLGFBQVdoQixPQUFYLEtBQW9CO1dBQ3BFLEtBQUsrRCxPQUFPL0QsUUFBUSxLQUFLZ0UsVUFBVWhFLE1BQU1PO1dBQ3pDLE9BQU8sS0FBS3dELE9BQU8vRDs7OztPQXBGb0M7T0FFL0J4Qjs7S0F1RjVCLE9BQU9FIiwiZmlsZSI6ImFuZ3VsYXItc2ltcGxlYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOWFmYzc0YzU4NDYzYzNmNzg2YTgiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBTaW1wbGVBcGlFdmVudEVtaXR0ZXIgZnJvbSAnLi9zaW1wbGUtYXBpLWV2ZW50LWVtaXR0ZXInO1xuaW1wb3J0IFNpbXBsZUFwaU1vZGVsIGZyb20gJy4vc2ltcGxlLWFwaS1tb2RlbCc7XG5pbXBvcnQgU2ltcGxlQXBpUm9vdCBmcm9tICcuL3NpbXBsZS1hcGktcm9vdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCduZ1NpbXBsZUFwaScsIFtdKVxuXG4ucHJvdmlkZXIoJ1NpbXBsZUFwaUV2ZW50RW1pdHRlcicsIFNpbXBsZUFwaUV2ZW50RW1pdHRlcilcbi5wcm92aWRlcignU2ltcGxlQXBpTW9kZWwnLCBTaW1wbGVBcGlNb2RlbClcbi5wcm92aWRlcignU2ltcGxlQXBpUm9vdCcsIFNpbXBsZUFwaVJvb3QpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpRXZlbnRFbWl0dGVyICgpIHsgJ25nSW5qZWN0JztcblxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoKSB7ICduZ0luamVjdCc7XG5cbiAgICBjbGFzcyBTaW1wbGVBcGlFdmVudEVtaXR0ZXIge1xuICAgICAgXG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy4kX2xpc3RlbmVycyA9IFtdO1xuICAgICAgfVxuXG4gICAgICAkb24oZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBpZighKGV2ZW50TmFtZSBpbiB0aGlzLiRfbGlzdGVuZXJzKSkge1xuICAgICAgICAgIHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgICRvbmNlKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgdGhpcy4kb2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuJG9uKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB9XG5cbiAgICAgICRvZmYoZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICAgICAgICB2YXIgc3RhY2sgPSB0aGlzLiRfbGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIHZhciBpZHggPSBzdGFjay5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICBzdGFjay5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy4kb2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAkZW1pdChldmVudE5hbWUsIGV2ZW50KSB7XG4gICAgICAgIHZhciBzdGFjayA9IHRoaXMuJF9saXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgc3RhY2subWFwKChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZXZlbnR8fHt9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBzdGF0aWMgJG1ha2Uob2JqKSB7XG4gICAgICAgIGlmICghb2JqLiRfbGlzdGVuZXJzKSB7XG4gICAgICAgICAgb2JqLiRfbGlzdGVuZXJzID0gW107XG4gICAgICAgICAgb2JqLiRvbiA9IFNpbXBsZUFwaUV2ZW50RW1pdHRlci5wcm90b3R5cGUuJG9uO1xuICAgICAgICAgIG9iai4kb2ZmID0gU2ltcGxlQXBpRXZlbnRFbWl0dGVyLnByb3RvdHlwZS4kb2ZmO1xuICAgICAgICAgIG9iai4kZW1pdCA9IFNpbXBsZUFwaUV2ZW50RW1pdHRlci5wcm90b3R5cGUuJGVtaXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHJldHVybiBTaW1wbGVBcGlFdmVudEVtaXR0ZXI7XG5cbiAgfTtcblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxlLWFwaS1ldmVudC1lbWl0dGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaW1wbGVBcGlNb2RlbCgpIHsgJ25nSW5qZWN0JztcblxuICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoJGh0dHApIHsgJ25nSW5qZWN0JztcblxuICAgIGNsYXNzIFNpbXBsZUFwaU1vZGVsIHtcblxuICAgICAgY29uc3RydWN0b3IobmFtZSwgZW5kcG9pbnQsIHJvb3RBcGksICRpbywgJGxvZ2dlcikge1xuICAgICAgICB0aGlzLm5hbWUgICAgICAgICAgPSBuYW1lO1xuICAgICAgICB0aGlzLmFjdGlvbnMgICAgICAgPSB7fTtcbiAgICAgICAgdGhpcy5lbmRwb2ludCAgICAgID0gZW5kcG9pbnQ7XG4gICAgICAgIHRoaXMucm9vdEFwaSAgICAgICAgID0gcm9vdEFwaTtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICAgICAgdGhpcy4kaW8gICAgICAgICAgID0gJGlvO1xuICAgICAgICB0aGlzLiRsb2dnZXIgICAgICAgPSAkbG9nZ2VyIHx8IHJvb3RBcGkuJGxvZ2dlcjtcbiAgICAgICAgdGhpcy5Nb2RlbEJ1aWxkZWQgID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICBjb25zdCBbcHJvcCwgdmFsdWVdID0gYXJncztcbiAgICAgICAgICBpZiAoYXJncy5sZW5ndGg9PTApIHJldHVybiB0aGlzO1xuICAgICAgICAgIGlmIChhcmdzLmxlbmd0aD09MSkgcmV0dXJuIHRoaXNbcHJvcF07XG4gICAgICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLiRpbykge1xuICAgICAgICAgIHRoaXMucm9vdEFwaS4kb24oJ3VzZXIuc2V0dGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kaW8uY29ubmVjdCh7XG4gICAgICAgICAgICAgIHVzZXJJZDogdGhpcy5yb290QXBpLmN1cnJlbnRVc2VySWQsXG4gICAgICAgICAgICAgIGlkOiAgICAgdGhpcy5yb290QXBpLmFjY2Vzc1Rva2VuSWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJvb3RBcGkuY3VycmVudFVzZXJJZCAmJiB0aGlzLnJvb3RBcGkuYWNjZXNzVG9rZW5JZCkge1xuICAgICAgICAgIHRoaXMucm9vdEFwaS4kZW1pdCgndXNlci5zZXR0ZWQnLCB7fSk7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICBidWlsZFVybCh1cmwsIHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290QXBpLmdldEJhc2VVcmwoKSArIHRoaXMuZW5kcG9pbnQgKyBTaW1wbGVBcGlNb2RlbC5idWlsZFVybCh1cmwsIHBhcmFtcyk7XG4gICAgICB9XG5cbiAgICAgIGh0dHBCdWlsZE1ldGhvZCAoYXJncykge1xuXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGxldCBNZXRob2QgPSBmdW5jdGlvbiAocGFyYW1zID0ge30sIHJlcSA9IHt9LCBkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgY29uc3QgaXNBcnJheSA9IGFyZ3MuaXNBcnJheTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSAgPSBpc0FycmF5P1tdOnt9O1xuICAgICAgICAgIFxuICAgICAgICAgIHJlcS5tZXRob2QgPSBhcmdzLm1ldGhvZDtcbiAgICAgICAgICByZXEudXJsID0gc2VsZi5idWlsZFVybChhcmdzLnVybCwgcGFyYW1zKTtcbiAgICAgICAgICByZXEuaGVhZGVycyA9IHJlcS5oZWFkZXJzIHx8IHt9O1xuXG4gICAgICAgICAgaWYgKHNlbGYucm9vdEFwaS5pbnRlcmNlcHRvcikge1xuICAgICAgICAgICAgc2VsZi5yb290QXBpLmludGVyY2VwdG9yKHJlcSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucm9vdEFwaS5hY2Nlc3NUb2tlbklkKSB7XG4gICAgICAgICAgICBpZighcmVxLmhlYWRlcnNbc2VsZi5yb290QXBpLmF1dGhIZWFkZXJdKVxuICAgICAgICAgICAgICByZXEuaGVhZGVyc1tzZWxmLnJvb3RBcGkuYXV0aEhlYWRlcl0gPSBzZWxmLnJvb3RBcGkuYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICAgIHJlcS5wYXJhbXMgPSBwYXJhbXM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcS5kYXRhID0gcGFyYW1zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgdmFsdWUuJHByb21pc2UgPSAkaHR0cChyZXEpXG4gICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheSkge1xuICAgICAgICAgICAgICB2YWx1ZS5wdXNoLmFwcGx5KHZhbHVlLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHZhbHVlLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoKGRlYnVnIHx8IHNlbGYuZGVidWcpICYmIHNlbGYuJGxvZ2dlcikge1xuICAgICAgICAgICAgICBzZWxmLiRsb2dnZXIoYCR7c2VsZi5uYW1lfS4ke2FyZ3MubmFtZX1gLCBwYXJhbXMsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHZhbHVlLiRlcnJvciA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhyb3cgdmFsdWUuJGVycm9yO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLiRpbykge1xuICAgICAgICAgIGNvbnN0ICRpbyA9IHRoaXMuJGlvO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbkNvbmYgPSB0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV07XG4gICAgICAgICAgaWYgKCFhY3Rpb25Db25mLnNvY2tldGFibGUpIHJldHVybjtcbiAgICAgICAgICBjb25zdCBvbGRNZXRob2QgPSBNZXRob2Q7XG4gICAgICAgICAgbGV0IHJldDtcbiAgICAgICAgICBNZXRob2QgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICByZXQgPSBvbGRNZXRob2QocGFyYW1zKTtcbiAgICAgICAgICAgIHJldC4kcHJvbWlzZVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAkaW8uc3Vic2NyaWJlKHJldCwgJ3Byb3RvdHlwZS5vblVwZGF0ZWQnLCByZXQuaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBNZXRob2QuJHVybCA9IChwYXJhbXMgPSB7fSwgcmVxID0ge30pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yb290QXBpLnVybCh0aGlzLmJ1aWxkVXJsKGFyZ3MudXJsLCBwYXJhbXMpLCB0cnVlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBNZXRob2QuJGV4ZWMgPSAocGFyYW1zID0ge30sIHJlcSA9IHt9KSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gTWV0aG9kKHBhcmFtcywgcmVxLCB0cnVlKTtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9OyAgXG5cbiAgICAgICAgcmV0dXJuIE1ldGhvZDtcbiAgICAgIH1cblxuICAgICAgaHR0cE1ldGhvZCAodmVyYiwgbmFtZSwgdXJsLCBhdHRycyA9IHt9KSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG5hbWU7XG4gICAgICAgIHRoaXMuYWN0aW9uc1tuYW1lXSA9IGFuZ3VsYXIuZXh0ZW5kKHtuYW1lLCB1cmx9LCBhdHRycywge1xuICAgICAgICAgIG1ldGhvZDogdmVyYi50b1VwcGVyQ2FzZSgpLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFjdGlvbnNbbmFtZV0uZm4gPSB0aGlzLmh0dHBCdWlsZE1ldGhvZCh0aGlzLmFjdGlvbnNbbmFtZV0pO1xuXG4gICAgICAgIHRoaXMuTW9kZWxCdWlsZGVkW25hbWVdID0gdGhpcy5hY3Rpb25zW25hbWVdLmZuO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBzb2NrZXRhYmxlIChhY3Rpb25OYW1lKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IGFjdGlvbk5hbWUgPSBhY3Rpb25OYW1lIHx8IHRoaXMuY3VycmVudEFjdGlvbjtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGlvbnNbYWN0aW9uTmFtZV0pIHRocm93IG5ldyBFcnJvcignbm90LmRlZmluZWQuYWN0aW9uLicrYWN0aW9uTmFtZSk7XG4gICAgICAgIHRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXS5zb2NrZXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGlzQXJyYXkgKGFjdGlvbk5hbWUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gYWN0aW9uTmFtZSA9IGFjdGlvbk5hbWUgfHwgdGhpcy5jdXJyZW50QWN0aW9uO1xuICAgICAgICBpZiAoIXRoaXMuYWN0aW9uc1thY3Rpb25OYW1lXSkgdGhyb3cgbmV3IEVycm9yKCdub3QuZGVmaW5lZC5hY3Rpb24uJythY3Rpb25OYW1lKTtcbiAgICAgICAgdGhpcy5hY3Rpb25zW2FjdGlvbk5hbWVdLmlzQXJyYXkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbWV0aG9kIChuYW1lLCBmbikge1xuICAgICAgICB0aGlzLk1vZGVsQnVpbGRlZC5wcm90b3R5cGVbbmFtZV0gPSBmbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGV4cGFuZCAoZXh0cmEpIHtcbiAgICAgICAgYW5ndWxhci5leHRlbmQodGhpcy5Nb2RlbEJ1aWxkZWQsIGV4dHJhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGdldCAgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnZ2V0JywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIHBvc3QgICAgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgncG9zdCcsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBkZWxldGUgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ2RlbGV0ZScsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBwdXQgICAgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ3B1dCcsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG4gICAgICBwYXRjaCAgIChuYW1lLCB1cmwsIGF0dHJzKSB7IHJldHVybiB0aGlzLmh0dHBNZXRob2QoJ3BhdGNoJywgbmFtZSwgdXJsLCBhdHRycyk7IH1cbiAgICAgIG9wdGlvbnMgKG5hbWUsIHVybCwgYXR0cnMpIHsgcmV0dXJuIHRoaXMuaHR0cE1ldGhvZCgnb3B0aW9ucycsIG5hbWUsIHVybCwgYXR0cnMpOyB9XG5cbiAgICAgIHN0YXRpYyBidWlsZFVybCAodXJsLCBwYXJhbXMpIHtcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoKGFyZ05hbWUpID0+IHtcbiAgICAgICAgICB1cmwgPSB1cmwuc3BsaXQoJzonK2FyZ05hbWUpLmpvaW4ocGFyYW1zW2FyZ05hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpTW9kZWw7XG5cbiAgfTtcblxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2ltcGxlLWFwaS1tb2RlbC5qcyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU2ltcGxlQXBpUm9vdCgpIHsgJ25nSW5qZWN0JztcblxuICBjb25zdCBVUkxTICA9IHt9O1xuICBjb25zdCBQUk9QUyA9IFsnYWNjZXNzVG9rZW5JZCcsICdjdXJyZW50VXNlcklkJywgJ3JlbWVtYmVyTWUnLCAnY3VycmVudFVzZXJEYXRhJ107XG5cbiAgdGhpcy5zZXRCYXNlVXJsID0gKG5hbWUsIHVybCkgPT4ge1xuICAgIFVSTFNbbmFtZV0gPSB1cmw7XG4gIH07XG5cbiAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24gKFNpbXBsZUFwaUV2ZW50RW1pdHRlciwgU2ltcGxlQXBpTW9kZWwpIHsgJ25nSW5qZWN0JztcblxuICAgIGNsYXNzIFNpbXBsZUFwaVJvb3QgZXh0ZW5kcyBTaW1wbGVBcGlFdmVudEVtaXR0ZXJ7XG5cbiAgICAgIGNvbnN0cnVjdG9yKHByb3BzUHJlZml4LCBhdXRoSGVhZGVyLCAkbG9nZ2VyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXV0aEhlYWRlciAgPSBhdXRoSGVhZGVyIHx8ICdhdXRob3JpemF0aW9uJztcbiAgICAgICAgdGhpcy5wcm9wc1ByZWZpeCA9IHByb3BzUHJlZml4O1xuICAgICAgICB0aGlzLm1vZGVscyAgICAgID0gKCkgPT4gdGhpcztcbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgICA9IHt9O1xuICAgICAgICB0aGlzLiRsb2dnZXIgICAgID0gJGxvZ2dlcjtcbiAgICAgICAgXG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gdGhpcy5fbG9hZCh0aGlzLnByb3BzUHJlZml4ICsgbmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnZXRCYXNlVXJsKCkge1xuICAgICAgICByZXR1cm4gVVJMU1t0aGlzLnByb3BzUHJlZml4XVxuICAgICAgfVxuXG4gICAgICBzYXZlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5yZW1lbWJlck1lID8gbG9jYWxTdG9yYWdlIDogc2Vzc2lvblN0b3JhZ2U7XG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLl9zYXZlKHN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCB0aGlzW25hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldFVzZXIoYWNjZXNzVG9rZW5JZCwgY3VycmVudFVzZXJJZCwgdXNlckRhdGEpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gYWNjZXNzVG9rZW5JZDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlcklkID0gY3VycmVudFVzZXJJZDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSB1c2VyRGF0YTtcbiAgICAgICAgdGhpcy4kZW1pdCgndXNlci5zZXR0ZWQnLCB7fSk7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVXNlcigpIHtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlcklkID0gbnVsbDtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlckRhdGEgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBjbGVhclN0b3JhZ2UoKSB7XG4gICAgICAgIFBST1BTLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICB0aGlzLl9zYXZlKHNlc3Npb25TdG9yYWdlLCB0aGlzLnByb3BzUHJlZml4ICsgbmFtZSwgbnVsbCk7XG4gICAgICAgICAgdGhpcy5fc2F2ZShsb2NhbFN0b3JhZ2UsIHRoaXMucHJvcHNQcmVmaXggKyBuYW1lLCBudWxsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHVybCh1cmwsIGlnbm9yZUJhc2VVcmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjY2Vzc1Rva2VuSWQpIHJldHVybiB1cmw7XG4gICAgICAgIHVybCA9IHVybC5zcGxpdCgnPycpO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IFtdO1xuICAgICAgICBpZiAodXJsLmxlbmd0aCE9PTEpIHBhcmFtcy5wdXNoKHVybC5wb3AoKSk7XG5cbiAgICAgICAgcGFyYW1zLnB1c2goJ2FjY2Vzc190b2tlbj0nK3RoaXMuYWNjZXNzVG9rZW5JZCk7XG4gICAgICAgIHVybC5wdXNoKCc/JytwYXJhbXMuam9pbignJicpKTtcbiAgICAgICAgaWYgKCFpZ25vcmVCYXNlVXJsKSB7XG4gICAgICAgICAgdXJsLnVuc2hpZnQodGhpcy5nZXRCYXNlVXJsKCkpO1xuICAgICAgICB9XG4gICAgICAgIHVybCA9IHVybC5qb2luKCcnKTtcblxuICAgICAgICByZXR1cm4gdXJsO1xuXG4gICAgICB9XG5cbiAgICAgIC8vIE5vdGU6IExvY2FsU3RvcmFnZSBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gc3RyaW5nXG4gICAgICAvLyBXZSBhcmUgdXNpbmcgZW1wdHkgc3RyaW5nIGFzIGEgbWFya2VyIGZvciBudWxsL3VuZGVmaW5lZCB2YWx1ZXMuXG4gICAgICBfc2F2ZShzdG9yYWdlLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3RvcmFnZVtrZXldID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnQ2Fubm90IGFjY2VzcyBsb2NhbC9zZXNzaW9uIHN0b3JhZ2U6JywgZXJyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfbG9hZChrZXkpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2tleV0gfHwgc2Vzc2lvblN0b3JhZ2Vba2V5XSB8fCAnbnVsbCcpO1xuICAgICAgfVxuXG4gICAgICBtb2RlbChuYW1lLCB1cmwpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzW25hbWVdKSByZXR1cm4gdGhpcy5pbnN0YW5jZXNbbmFtZV07XG4gICAgICAgIHRoaXMuaW5zdGFuY2VzW25hbWVdID0gbmV3IFNpbXBsZUFwaU1vZGVsKG5hbWUsIHVybCB8fCBgLyR7bmFtZX1zYCwgdGhpcyk7XG4gICAgICAgIHRoaXMubW9kZWxzW25hbWVdID0gdGhpcy5pbnN0YW5jZXNbbmFtZV0uTW9kZWxCdWlsZGVkO1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNbbmFtZV07XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gU2ltcGxlQXBpUm9vdDtcblxuICB9O1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NpbXBsZS1hcGktcm9vdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=