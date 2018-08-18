'use strict';

export default function SimpleApiEventEmitter () { 'ngInject';

  this.$get = function () { 'ngInject';

    class SimpleApiEventEmitter {
      
      constructor() {
        this.$_listeners = [];
      }

      $on(eventName, callback) {
        if(!(eventName in this.$_listeners)) {
          this.$_listeners[eventName] = [];
        }
        this.$_listeners[eventName].push(callback);
        return this;
      }

      $once(eventName, callback) {
        const handler = (...args) => {
          callback.apply(null, args);
          this.$off(eventName, handler);
        };
        this.$on(eventName, handler);
      }

      $off(eventName, callback) {
        var stack = this.$_listeners[eventName] || [];
        var idx = stack.indexOf(callback);
        if (idx !== -1) {
          stack.splice(idx, 1);
          return this.$off(eventName, callback);
        }
        return this;
      }

      $emit(eventName, event) {
        var stack = this.$_listeners[eventName] || [];
        stack.map((callback) => {
          callback.call(this, event||{});
        });
        return this;
      }

      static $make(obj) {
        if (!obj.$_listeners) {
          obj.$_listeners = [];
          obj.$on = SimpleApiEventEmitter.prototype.$on;
          obj.$off = SimpleApiEventEmitter.prototype.$off;
          obj.$emit = SimpleApiEventEmitter.prototype.$emit;
        }
        return obj;
      }

    }

    return SimpleApiEventEmitter;

  };

};