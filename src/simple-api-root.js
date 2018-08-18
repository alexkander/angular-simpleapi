'use strict';

export default function SimpleApiRoot() { 'ngInject';

  const URLS  = {};
  const PROPS = ['accessTokenId', 'currentUserId', 'rememberMe', 'currentUserData'];

  this.setBaseUrl = (name, url) => {
    URLS[name] = url;
  };

  this.$get = function (SimpleApiEventEmitter, SimpleApiModel) { 'ngInject';

    class SimpleApiRoot extends SimpleApiEventEmitter{

      constructor(propsPrefix, authHeader, $logger) {
        super();
        this.authHeader  = authHeader || 'authorization';
        this.propsPrefix = propsPrefix;
        this.models      = () => this;
        this.instances   = {};
        this.$logger     = $logger;
        
        PROPS.forEach((name) => {
          this[name] = this._load(this.propsPrefix + name);
        });
      }

      getBaseUrl() {
        return URLS[this.propsPrefix]
      }

      save() {
        const storage = this.rememberMe ? localStorage : sessionStorage;
        PROPS.forEach((name) => {
          this._save(storage, this.propsPrefix + name, this[name]);
        });
      }

      setUser(accessTokenId, currentUserId, userData) {
        this.accessTokenId = accessTokenId;
        this.currentUserId = currentUserId;
        this.currentUserData = userData;
        this.$emit('user.setted', {});
      }

      clearUser() {
        this.accessTokenId = null;
        this.currentUserId = null;
        this.currentUserData = null;
      }

      clearStorage() {
        PROPS.forEach((name) => {
          this._save(sessionStorage, this.propsPrefix + name, null);
          this._save(localStorage, this.propsPrefix + name, null);
        });
      }

      url(url, ignoreBaseUrl) {
        if (!this.accessTokenId) return url;
        url = url.split('?');

        const params = [];
        if (url.length!==1) params.push(url.pop());

        params.push('access_token='+this.accessTokenId);
        url.push('?'+params.join('&'));
        if (!ignoreBaseUrl) {
          url.unshift(this.getBaseUrl());
        }
        url = url.join('');

        return url;

      }

      // Note: LocalStorage converts the value to string
      // We are using empty string as a marker for null/undefined values.
      _save(storage, key, value) {
        try {
          storage[key] = JSON.stringify(value);
        } catch (err) {
          console.log('Cannot access local/session storage:', err);
        }
      }

      _load(key) {
        return JSON.parse(localStorage[key] || sessionStorage[key] || 'null');
      }

      model(name, url) {
        if (this.instances[name]) return this.instances[name];
        this.instances[name] = new SimpleApiModel(name, url || `/${name}s`, this);
        this.models[name] = this.instances[name].ModelBuilded;
        return this.models[name];
      }

    }

    return SimpleApiRoot;

  };

}