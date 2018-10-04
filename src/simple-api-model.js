'use strict';

export default function SimpleApiModel() { 'ngInject';

  this.$get = function ($http, $q) { 'ngInject';

    class SimpleApiModel {

      constructor(name, endpoint, rootApi, $io, $logger) {
        this.name          = name;
        this.actions       = {};
        this.endpoint      = endpoint;
        this.rootApi         = rootApi;
        this.currentAction = null;
        this.$io           = $io;
        this.$logger       = $logger || rootApi.$logger;
        this.ModelBuilded  = (...args) => {
          const [prop, value] = args;
          if (args.length==0) return this;
          if (args.length==1) return this[prop];
          this[prop] = value;
        };

        if (this.$io) {
          this.rootApi.$on('user.setted', () => {
            this.$io.connect({
              userId: this.rootApi.currentUserId,
              id:     this.rootApi.accessTokenId,
            });
          });
        }

        if (this.rootApi.currentUserId && this.rootApi.accessTokenId) {
          this.rootApi.$emit('user.setted', {});
        }

      }

      buildUrl(url, params) {
        return this.rootApi.getBaseUrl() + this.endpoint + SimpleApiModel.buildUrl(url, params);
      }

      httpBuildMethod (args) {

        const self = this;

        let Method = function (params = {}, req = {}, debug = false) {
          
          const isArray = args.isArray;
          const value  = isArray?[]:{};

          let waiting = $q.resolve();
          
          req.method = args.method;
          req.url = self.buildUrl(args.url, params);
          req.headers = req.headers || {};

          if (self.rootApi.interceptor) {
            waiting = $q.resolve()
            .then(() => self.rootApi.interceptor(req));
          }

          if (self.rootApi.accessTokenId) {
            if(!req.headers[self.rootApi.authHeader])
              req.headers[self.rootApi.authHeader] = self.rootApi.accessTokenId;
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

          value.$promise = $q.resolve(waiting)
          .then(() => {
            let $promise = $http(req);
            if (self.rootApi.postProcessed) {
              return self.rootApi.postProcessed($promise);
            }
            return $promise;
          })
          .then((response) => {
            if (isArray) {
              value.push.apply(value, response.data);
            } else {
              angular.extend(value, response.data);
            }
            value.$resolved = true;
            if ((debug || self.debug) && self.$logger) {
              self.$logger(`${self.name}.${args.name}`, params, value);
            }
            return value;
          })
          .catch((response) => {
            value.$error = response.data;
            value.$resolved = true;
            throw value.$error;
          });

          return value;
        };

        if (this.$io) {
          const $io = this.$io;
          const actionConf = this.actions[actionName];
          if (!actionConf.socketable) return;
          const oldMethod = Method;
          let ret;
          Method = function (params) {
            ret = oldMethod(params);
            ret.$promise
            .then(() => {
              $io.subscribe(ret, 'prototype.onUpdated', ret.id);
            });
            return ret;
          };
        }

        Method.$url = (params = {}, req = {}) => {
          return this.rootApi.url(this.buildUrl(args.url, params), true);
        };

        Method.$exec = (params = {}, req = {}) => {
          const result = Method(params, req, true);
          return result;
        };  

        return Method;
      }

      httpMethod (verb, name, url, attrs = {}) {
        this.currentAction = name;
        this.actions[name] = angular.extend({name, url}, attrs, {
          method: verb.toUpperCase(),
        });

        this.actions[name].fn = this.httpBuildMethod(this.actions[name]);

        this.ModelBuilded[name] = this.actions[name].fn;

        return this;
      }

      socketable (actionName) {
        this.currentAction = actionName = actionName || this.currentAction;
        if (!this.actions[actionName]) throw new Error('not.defined.action.'+actionName);
        this.actions[actionName].socketable = true;
        return this;
      }

      isArray (actionName) {
        this.currentAction = actionName = actionName || this.currentAction;
        if (!this.actions[actionName]) throw new Error('not.defined.action.'+actionName);
        this.actions[actionName].isArray = true;
        return this;
      }

      method (name, fn) {
        this.ModelBuilded.prototype[name] = fn;
        return this;
      }

      expand (extra) {
        angular.extend(this.ModelBuilded, extra);
        return this;
      }

      get     (name, url, attrs) { return this.httpMethod('get', name, url, attrs); }
      post    (name, url, attrs) { return this.httpMethod('post', name, url, attrs); }
      delete  (name, url, attrs) { return this.httpMethod('delete', name, url, attrs); }
      put     (name, url, attrs) { return this.httpMethod('put', name, url, attrs); }
      patch   (name, url, attrs) { return this.httpMethod('patch', name, url, attrs); }
      options (name, url, attrs) { return this.httpMethod('options', name, url, attrs); }

      static buildUrl (url, params) {
        Object.keys(params).map((argName) => {
          url = url.split(':'+argName).join(params[argName]);
        });
        return url;
      }

    }

    return SimpleApiModel;

  };

};