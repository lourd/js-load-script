(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.loadScript = factory());
}(this, function () { 'use strict';

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.onload = () => resolve();

      script.onerror = reject;
      script.src = url;
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    });
  }

  return loadScript;

}));
