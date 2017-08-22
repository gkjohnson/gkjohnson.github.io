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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*__wc__loader*/

(function() {
  'use strict';

  const userPolymer = window.Polymer;

  /**
   * @namespace Polymer
   * @summary Polymer is a lightweight library built on top of the web
   *   standards-based Web Components API's, and makes it easy to build your
   *   own custom HTML elements.
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer = function(info) {
    return window.Polymer._polymerFn(info);
  }

  // support user settings on the Polymer object
  if (userPolymer) {
    Object.assign(Polymer, userPolymer);
  }

  // To be plugged by legacy implementation if loaded
  /* eslint-disable valid-jsdoc */
  /**
   * @param {!PolymerInit} info Prototype for the custom element. It must contain
   *   an `is` property to specify the element name. Other properties populate
   *   the element prototype. The `properties`, `observers`, `hostAttributes`,
   *   and `listeners` properties are processed to create element features.
   * @return {!Object} Returns a custom element class for the given provided
   *   prototype `info` object. The name of the element if given by `info.is`.
   */
  window.Polymer._polymerFn = function(info) { // eslint-disable-line no-unused-vars
    throw new Error('Load polymer.html to use the Polymer() function.');
  }
  /* eslint-enable */

  window.Polymer.version = '2.0.1';

  /* eslint-disable no-unused-vars */
  /*
  When using Closure Compiler, JSCompiler_renameProperty(property, object) is replaced by the munged name for object[property]
  We cannot alias this function, so we have to use a small shim that has the same behavior when not compiling.
  */
  window.JSCompiler_renameProperty = function(prop, obj) {
    return prop;
  }
  /* eslint-enable */

})();



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);



(function() {

  'use strict';

  // unique global id for deduping mixins.
  let dedupeId = 0;

  /**
   * @constructor
   * @extends {Function}
   */
  function MixinFunction(){}
  /** @type {(WeakMap | undefined)} */
  MixinFunction.prototype.__mixinApplications;
  /** @type {(Object | undefined)} */
  MixinFunction.prototype.__mixinSet;

  /* eslint-disable valid-jsdoc */
  /**
   * Wraps an ES6 class expression mixin such that the mixin is only applied
   * if it has not already been applied its base argument.  Also memoizes mixin
   * applications.
   *
   * @memberof Polymer
   * @template T
   * @param {T} mixin ES6 class expression mixin to wrap
   * @suppress {invalidCasts}
   */
  Polymer.dedupingMixin = function(mixin) {
    let mixinApplications = /** @type {!MixinFunction} */(mixin).__mixinApplications;
    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      /** @type {!MixinFunction} */(mixin).__mixinApplications = mixinApplications;
    }
    // maintain a unique id for each mixin
    let mixinDedupeId = dedupeId++;
    function dedupingMixin(base) {
      let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      let map = mixinApplications;
      let extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */(mixin)(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
      return extended;
    }

    return dedupingMixin;
  };
  /* eslint-enable valid-jsdoc */

})();




/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);



  (function() {
    'use strict';

    let CSS_URL_RX = /(url\()([^)]*)(\))/g;
    let ABS_URL = /(^\/)|(^#)|(^[\w-\d]*:)/;
    let workingURL;
    let resolveDoc;
    /**
     * Resolves the given URL against the provided `baseUri'.
     *
     * @memberof Polymer.ResolveUrl
     * @param {string} url Input URL to resolve
     * @param {?string=} baseURI Base URI to resolve the URL against
     * @return {string} resolved URL
     */
    function resolveUrl(url, baseURI) {
      if (url && ABS_URL.test(url)) {
        return url;
      }
      // Lazy feature detection.
      if (workingURL === undefined) {
        workingURL = false;
        try {
          const u = new URL('b', 'http://a');
          u.pathname = 'c%20d';
          workingURL = (u.href === 'http://a/c%20d');
        } catch (e) {
          // silently fail
        }
      }
      if (!baseURI) {
        baseURI = document.baseURI || window.location.href;
      }
      if (workingURL) {
        return (new URL(url, baseURI)).href;
      }
      // Fallback to creating an anchor into a disconnected document.
      if (!resolveDoc) {
        resolveDoc = document.implementation.createHTMLDocument('temp');
        resolveDoc.base = resolveDoc.createElement('base');
        resolveDoc.head.appendChild(resolveDoc.base);
        resolveDoc.anchor = resolveDoc.createElement('a');
        resolveDoc.body.appendChild(resolveDoc.anchor);
      }
      resolveDoc.base.href = baseURI;
      resolveDoc.anchor.href = url;
      return resolveDoc.anchor.href || url;

    }

    /**
     * Resolves any relative URL's in the given CSS text against the provided
     * `ownerDocument`'s `baseURI`.
     *
     * @memberof Polymer.ResolveUrl
     * @param {string} cssText CSS text to process
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Processed CSS text with resolved URL's
     */
    function resolveCss(cssText, baseURI) {
      return cssText.replace(CSS_URL_RX, function(m, pre, url, post) {
        return pre + '\'' +
          resolveUrl(url.replace(/["']/g, ''), baseURI) +
          '\'' + post;
      });
    }

    /**
     * Returns a path from a given `url`. The path includes the trailing
     * `/` from the url.
     *
     * @memberof Polymer.ResolveUrl
     * @param {string} url Input URL to transform
     * @return {string} resolved path
     */
    function pathFromUrl(url) {
      return url.substring(0, url.lastIndexOf('/') + 1);
    }

    /**
     * Module with utilities for resolving relative URL's.
     *
     * @namespace
     * @memberof Polymer
     * @summary Module with utilities for resolving relative URL's.
     */
    Polymer.ResolveUrl = {
      resolveCss: resolveCss,
      resolveUrl: resolveUrl,
      pathFromUrl: pathFromUrl
    };

  })();




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {
  'use strict';

  const caseMap = {};
  const DASH_TO_CAMEL = /-[a-z]/g;
  const CAMEL_TO_DASH = /([A-Z])/g;

  /**
   * Module with utilities for converting between "dash-case" and "camelCase"
   * identifiers.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides utilities for converting between "dash-case"
   *   and "camelCase".
   */
  const CaseMap = {

    /**
     * Converts "dash-case" identifier (e.g. `foo-bar-baz`) to "camelCase"
     * (e.g. `fooBarBaz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} dash Dash-case identifier
     * @return {string} Camel-case representation of the identifier
     */
    dashToCamelCase(dash) {
      return caseMap[dash] || (
        caseMap[dash] = dash.indexOf('-') < 0 ? dash : dash.replace(DASH_TO_CAMEL,
          (m) => m[1].toUpperCase()
        )
      );
    },

    /**
     * Converts "camelCase" identifier (e.g. `fooBarBaz`) to "dash-case"
     * (e.g. `foo-bar-baz`).
     *
     * @memberof Polymer.CaseMap
     * @param {string} camel Camel-case identifier
     * @return {string} Dash-case representation of the identifier
     */
    camelToDashCase(camel) {
      return caseMap[camel] || (
        caseMap[camel] = camel.replace(CAMEL_TO_DASH, '-$1').toLowerCase()
      );
    }

  };

  Polymer.CaseMap = CaseMap;
})();



/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	if (typeof execScript !== "undefined")
		execScript(src);
	else
		eval.call(null, src);
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(12);


(function() {
  'use strict';

  /**
   * Base class that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends HTMLElement
   * @appliesMixin Polymer.ElementMixin
   * @summary Custom element base class that provides the core API for Polymer's
   *   key meta-programming features including template stamping, data-binding,
   *   attribute deserialization, and property change observation
   */
  const Element = Polymer.ElementMixin(HTMLElement);
  /**
   * @constructor
   * @implements {Polymer_ElementMixin}
   * @extends {HTMLElement}
   */
  Polymer.Element = Element;
})();



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(16);

__webpack_require__(3);

__webpack_require__(17);

__webpack_require__(18);


(function() {

  'use strict';

  /** @const {Object} */
  const CaseMap = Polymer.CaseMap;

  // Monotonically increasing unique ID used for de-duping effects triggered
  // from multiple properties in the same turn
  let dedupeId = 0;

  /**
   * Property effect types; effects are stored on the prototype using these keys
   * @enum {string}
   */
  const TYPES = {
    COMPUTE: '__computeEffects',
    REFLECT: '__reflectEffects',
    NOTIFY: '__notifyEffects',
    PROPAGATE: '__propagateEffects',
    OBSERVE: '__observeEffects',
    READ_ONLY: '__readOnly'
  }

  /**
   * @typedef {{
   * name: (string | undefined),
   * structured: (boolean | undefined),
   * wildcard: (boolean | undefined)
   * }}
   */
  let DataTrigger; //eslint-disable-line no-unused-vars

  /**
   * @typedef {{
   * info: ?,
   * trigger: (!DataTrigger | undefined),
   * fn: (!Function | undefined)
   * }}
   */
  let DataEffect; //eslint-disable-line no-unused-vars

  let PropertyEffectsType; //eslint-disable-line no-unused-vars

  /**
   * Ensures that the model has an own-property map of effects for the given type.
   * The model may be a prototype or an instance.
   *
   * Property effects are stored as arrays of effects by property in a map,
   * by named type on the model. e.g.
   *
   *   __computeEffects: {
   *     foo: [ ... ],
   *     bar: [ ... ]
   *   }
   *
   * If the model does not yet have an effect map for the type, one is created
   * and returned.  If it does, but it is not an own property (i.e. the
   * prototype had effects), the the map is deeply cloned and the copy is
   * set on the model and returned, ready for new effects to be added.
   *
   * @param {Object} model Prototype or instance
   * @param {string} type Property effect type
   * @return {Object} The own-property map of effects for the given type
   * @private
   */
  function ensureOwnEffectMap(model, type) {
    let effects = model[type];
    if (!effects) {
      effects = model[type] = {};
    } else if (!model.hasOwnProperty(type)) {
      effects = model[type] = Object.create(model[type]);
      for (let p in effects) {
        let protoFx = effects[p];
        let instFx = effects[p] = Array(protoFx.length);
        for (let i=0; i<protoFx.length; i++) {
          instFx[i] = protoFx[i];
        }
      }
    }
    return effects;
  }

  // -- effects ----------------------------------------------

  /**
   * Runs all effects of a given type for the given set of property changes
   * on an instance.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {Object} props Bag of current property changes
   * @param {Object=} oldProps Bag of previous values for changed properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffects(inst, effects, props, oldProps, hasPaths, extraArgs) {
    if (effects) {
      let ran = false;
      let id = dedupeId++;
      for (let prop in props) {
        if (runEffectsForProperty(inst, effects, id, prop, props, oldProps, hasPaths, extraArgs)) {
          ran = true;
        }
      }
      return ran;
    }
    return false;
  }

  /**
   * Runs a list of effects for a given property.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} effects Object map of property-to-Array of effects
   * @param {number} dedupeId Counter used for de-duping effects
   * @param {string} prop Name of changed property
   * @param {*} props Changed properties
   * @param {*} oldProps Old properties
   * @param {boolean=} hasPaths True with `props` contains one or more paths
   * @param {*=} extraArgs Additional metadata to pass to effect function
   * @return {boolean} True if an effect ran for this property
   * @private
   */
  function runEffectsForProperty(inst, effects, dedupeId, prop, props, oldProps, hasPaths, extraArgs) {
    let ran = false;
    let rootProperty = hasPaths ? Polymer.Path.root(prop) : prop;
    let fxs = effects[rootProperty];
    if (fxs) {
      for (let i=0, l=fxs.length, fx; (i<l) && (fx=fxs[i]); i++) {
        if ((!fx.info || fx.info.lastRun !== dedupeId) &&
            (!hasPaths || pathMatchesTrigger(prop, fx.trigger))) {
          if (fx.info) {
            fx.info.lastRun = dedupeId;
          }
          fx.fn(inst, prop, props, oldProps, fx.info, hasPaths, extraArgs);
          ran = true;
        }
      }
    }
    return ran;
  }

  /**
   * Determines whether a property/path that has changed matches the trigger
   * criteria for an effect.  A trigger is a descriptor with the following
   * structure, which matches the descriptors returned from `parseArg`.
   * e.g. for `foo.bar.*`:
   * ```
   * trigger: {
   *   name: 'a.b',
   *   structured: true,
   *   wildcard: true
   * }
   * ```
   * If no trigger is given, the path is deemed to match.
   *
   * @param {string} path Path or property that changed
   * @param {DataTrigger} trigger Descriptor
   * @return {boolean} Whether the path matched the trigger
   */
  function pathMatchesTrigger(path, trigger) {
    if (trigger) {
      let triggerPath = trigger.name;
      return (triggerPath == path) ||
        (trigger.structured && Polymer.Path.isAncestor(triggerPath, path)) ||
        (trigger.wildcard && Polymer.Path.isDescendant(triggerPath, path));
    } else {
      return true;
    }
  }

  /**
   * Implements the "observer" effect.
   *
   * Calls the method with `info.methodName` on the instance, passing the
   * new and old values.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runObserverEffect(inst, property, props, oldProps, info) {
    let fn = inst[info.methodName];
    let changedProp = info.property;
    if (fn) {
      fn.call(inst, inst.__data[changedProp], oldProps[changedProp]);
    } else if (!info.dynamicFn) {
      console.warn('observer method `' + info.methodName + '` not defined');
    }
  }

  /**
   * Runs "notify" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * will dispatch path notification events in the case that the property
   * changed was a path and the root property for that path didn't have a
   * "notify" effect.  This is to maintain 1.0 behavior that did not require
   * `notify: true` to ensure object sub-property notifications were
   * sent.
   *
   * @param {!PropertyEffectsType} inst The instance with effects to run
   * @param {Object} notifyProps Bag of properties to notify
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffects(inst, notifyProps, props, oldProps, hasPaths) {
    // Notify
    let fxs = inst[TYPES.NOTIFY];
    let notified;
    let id = dedupeId++;
    // Try normal notify effects; if none, fall back to try path notification
    for (let prop in notifyProps) {
      if (notifyProps[prop]) {
        if (fxs && runEffectsForProperty(inst, fxs, id, prop, props, oldProps, hasPaths)) {
          notified = true;
        } else if (hasPaths && notifyPath(inst, prop, props)) {
          notified = true;
        }
      }
    }
    // Flush host if we actually notified and host was batching
    // And the host has already initialized clients; this prevents
    // an issue with a host observing data changes before clients are ready.
    let host;
    if (notified && (host = inst.__dataHost) && host._invalidateProperties) {
      host._invalidateProperties();
    }
  }

  /**
   * Dispatches {property}-changed events with path information in the detail
   * object to indicate a sub-path of the property was changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} path The path that was changed
   * @param {Object} props Bag of current property changes
   * @return {boolean} Returns true if the path was notified
   * @private
   */
  function notifyPath(inst, path, props) {
    let rootProperty = Polymer.Path.root(path);
    if (rootProperty !== path) {
      let eventName = Polymer.CaseMap.camelToDashCase(rootProperty) + '-changed';
      dispatchNotifyEvent(inst, eventName, props[path], path);
      return true;
    }
    return false;
  }

  /**
   * Dispatches {property}-changed events to indicate a property (or path)
   * changed.
   *
   * @param {!PropertyEffectsType} inst The element from which to fire the event
   * @param {string} eventName The name of the event to send ('{property}-changed')
   * @param {*} value The value of the changed property
   * @param {string | null | undefined} path If a sub-path of this property changed, the path
   *   that changed (optional).
   * @private
   * @suppress {invalidCasts}
   */
  function dispatchNotifyEvent(inst, eventName, value, path) {
    let detail = {
      value: value,
      queueProperty: true
    };
    if (path) {
      detail.path = path;
    }
    /** @type {!HTMLElement} */(inst).dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  /**
   * Implements the "notify" effect.
   *
   * Dispatches a non-bubbling event named `info.eventName` on the instance
   * with a detail object containing the new `value`.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runNotifyEffect(inst, property, props, oldProps, info, hasPaths) {
    let rootProperty = hasPaths ? Polymer.Path.root(property) : property;
    let path = rootProperty != property ? property : null;
    let value = path ? Polymer.Path.get(inst, path) : inst.__data[property];
    if (path && value === undefined) {
      value = props[property];  // specifically for .splices
    }
    dispatchNotifyEvent(inst, info.eventName, value, path);
  }

  /**
   * Handler function for 2-way notification events. Receives context
   * information captured in the `addNotifyListener` closure from the
   * `__notifyListeners` metadata.
   *
   * Sets the value of the notified property to the host property or path.  If
   * the event contained path information, translate that path to the host
   * scope's name for that path first.
   *
   * @param {CustomEvent} event Notification event (e.g. '<property>-changed')
   * @param {!PropertyEffectsType} inst Host element instance handling the notification event
   * @param {string} fromProp Child element property that was bound
   * @param {string} toPath Host property/path that was bound
   * @param {boolean} negate Whether the binding was negated
   * @private
   */
  function handleNotification(event, inst, fromProp, toPath, negate) {
    let value;
    let detail = /** @type {Object} */(event.detail);
    let fromPath = detail && detail.path;
    if (fromPath) {
      toPath = Polymer.Path.translate(fromProp, toPath, fromPath);
      value = detail && detail.value;
    } else {
      value = event.target[fromProp];
    }
    value = negate ? !value : value;
    if (!inst[TYPES.READ_ONLY] || !inst[TYPES.READ_ONLY][toPath]) {
      if (inst._setPendingPropertyOrPath(toPath, value, true, Boolean(fromPath))
        && (!detail || !detail.queueProperty)) {
        inst._invalidateProperties();
      }
    }
  }

  /**
   * Implements the "reflect" effect.
   *
   * Sets the attribute named `info.attrName` to the given property value.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runReflectEffect(inst, property, props, oldProps, info) {
    let value = inst.__data[property];
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, info.attrName, 'attribute', /** @type {Node} */(inst));
    }
    inst._propertyToAttribute(property, info.attrName, value);
  }

  /**
   * Runs "computed" effects for a set of changed properties.
   *
   * This method differs from the generic `runEffects` method in that it
   * continues to run computed effects based on the output of each pass until
   * there are no more newly computed properties.  This ensures that all
   * properties that will be computed by the initial set of changes are
   * computed before other effects (binding propagation, observers, and notify)
   * run.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {!Object} changedProps Bag of changed properties
   * @param {!Object} oldProps Bag of previous values for changed properties
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @private
   */
  function runComputedEffects(inst, changedProps, oldProps, hasPaths) {
    let computeEffects = inst[TYPES.COMPUTE];
    if (computeEffects) {
      let inputProps = changedProps;
      while (runEffects(inst, computeEffects, inputProps, oldProps, hasPaths)) {
        Object.assign(oldProps, inst.__dataOld);
        Object.assign(changedProps, inst.__dataPending);
        inputProps = inst.__dataPending;
        inst.__dataPending = null;
      }
    }
  }

  /**
   * Implements the "computed property" effect by running the method with the
   * values of the arguments specified in the `info` object and setting the
   * return value to the computed property specified.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @private
   */
  function runComputedEffect(inst, property, props, oldProps, info) {
    let result = runMethodEffect(inst, property, props, oldProps, info);
    let computedProp = info.methodInfo;
    if (inst.__dataHasAccessor && inst.__dataHasAccessor[computedProp]) {
      inst._setPendingProperty(computedProp, result, true);
    } else {
      inst[computedProp] = result;
    }
  }

  /**
   * Computes path changes based on path links set up using the `linkPaths`
   * API.
   *
   * @param {!PropertyEffectsType} inst The instance whose props are changing
   * @param {string | !Array<(string|number)>} path Path that has changed
   * @param {*} value Value of changed path
   * @private
   */
  function computeLinkedPaths(inst, path, value) {
    let links = inst.__dataLinkedPaths;
    if (links) {
      let link;
      for (let a in links) {
        let b = links[a];
        if (Polymer.Path.isDescendant(a, path)) {
          link = Polymer.Path.translate(a, b, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        } else if (Polymer.Path.isDescendant(b, path)) {
          link = Polymer.Path.translate(b, a, path);
          inst._setPendingPropertyOrPath(link, value, true, true);
        }
      }
    }
  }

  // -- bindings ----------------------------------------------

  /**
   * Adds binding metadata to the current `nodeInfo`, and binding effects
   * for all part dependencies to `templateInfo`.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {NodeInfo} nodeInfo Node metadata for current template node
   * @param {string} kind Binding kind, either 'property', 'attribute', or 'text'
   * @param {string} target Target property name
   * @param {!Array<!BindingPart>} parts Array of binding part metadata
   * @param {string=} literal Literal text surrounding binding parts (specified
   *   only for 'property' bindings, since these must be initialized as part
   *   of boot-up)
   * @private
   */
  function addBinding(constructor, templateInfo, nodeInfo, kind, target, parts, literal) {
    // Create binding metadata and add to nodeInfo
    nodeInfo.bindings = nodeInfo.bindings || [];
    let /** Binding */ binding = { kind, target, parts, literal, isCompound: (parts.length !== 1) };
    nodeInfo.bindings.push(binding);
    // Add listener info to binding metadata
    if (shouldAddListener(binding)) {
      let {event, negate} = binding.parts[0];
      binding.listenerEvent = event || (CaseMap.camelToDashCase(target) + '-changed');
      binding.listenerNegate = negate;
    }
    // Add "propagate" property effects to templateInfo
    let index = templateInfo.nodeInfoList.length;
    for (let i=0; i<binding.parts.length; i++) {
      let part = binding.parts[i];
      part.compoundIndex = i;
      addEffectForBindingPart(constructor, templateInfo, binding, part, index);
    }
  }

  /**
   * Adds property effects to the given `templateInfo` for the given binding
   * part.
   *
   * @param {Function} constructor Class that `_parseTemplate` is currently
   *   running on
   * @param {TemplateInfo} templateInfo Template metadata for current template
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {number} index Index into `nodeInfoList` for this node
   */
  function addEffectForBindingPart(constructor, templateInfo, binding, part, index) {
    if (!part.literal) {
      if (binding.kind === 'attribute' && binding.target[0] === '-') {
        console.warn('Cannot set attribute ' + binding.target +
          ' because "-" is not a valid attribute starting character');
      } else {
        let dependencies = part.dependencies;
        let info = { index, binding, part, evaluator: constructor };
        for (let j=0; j<dependencies.length; j++) {
          let trigger = dependencies[j];
          if (typeof trigger == 'string') {
            trigger = parseArg(trigger);
            trigger.wildcard = true;
          }
          constructor._addTemplatePropertyEffect(templateInfo, trigger.rootProperty, {
            fn: runBindingEffect,
            info, trigger
          });
        }
      }
    }
  }

  /**
   * Implements the "binding" (property/path binding) effect.
   *
   * Note that binding syntax is overridable via `_parseBindings` and
   * `_evaluateBinding`.  This method will call `_evaluateBinding` for any
   * non-literal parts returned from `_parseBindings`.  However,
   * there is no support for _path_ bindings via custom binding parts,
   * as this is specific to Polymer's path binding syntax.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} path Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @param {boolean} hasPaths True with `props` contains one or more paths
   * @param {Array} nodeList List of nodes associated with `nodeInfoList` template
   *   metadata
   * @private
   */
  function runBindingEffect(inst, path, props, oldProps, info, hasPaths, nodeList) {
    let node = nodeList[info.index];
    let binding = info.binding;
    let part = info.part;
    // Subpath notification: transform path and set to client
    // e.g.: foo="{{obj.sub}}", path: 'obj.sub.prop', set 'foo.prop'=obj.sub.prop
    if (hasPaths && part.source && (path.length > part.source.length) &&
        (binding.kind == 'property') && !binding.isCompound &&
        node.__dataHasAccessor && node.__dataHasAccessor[binding.target]) {
      let value = props[path];
      path = Polymer.Path.translate(part.source, binding.target, path);
      if (node._setPendingPropertyOrPath(path, value, false, true)) {
        inst._enqueueClient(node);
      }
    } else {
      let value = info.evaluator._evaluateBinding(inst, part, path, props, oldProps, hasPaths);
      // Propagate value to child
      applyBindingValue(inst, node, binding, part, value);
    }
  }

  /**
   * Sets the value for an "binding" (binding) effect to a node,
   * either as a property or attribute.
   *
   * @param {!PropertyEffectsType} inst The instance owning the binding effect
   * @param {Node} node Target node for binding
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @param {*} value Value to set
   * @private
   */
  function applyBindingValue(inst, node, binding, part, value) {
    value = computeBindingValue(node, value, binding, part);
    if (Polymer.sanitizeDOMValue) {
      value = Polymer.sanitizeDOMValue(value, binding.target, binding.kind, node);
    }
    if (binding.kind == 'attribute') {
      // Attribute binding
      inst._valueToNodeAttribute(/** @type {Element} */(node), value, binding.target);
    } else {
      // Property binding
      let prop = binding.target;
      if (node.__dataHasAccessor && node.__dataHasAccessor[prop]) {
        if (!node[TYPES.READ_ONLY] || !node[TYPES.READ_ONLY][prop]) {
          if (node._setPendingProperty(prop, value)) {
            inst._enqueueClient(node);
          }
        }
      } else  {
        inst._setUnmanagedPropertyToNode(node, prop, value);
      }
    }
  }

  /**
   * Transforms an "binding" effect value based on compound & negation
   * effect metadata, as well as handling for special-case properties
   *
   * @param {Node} node Node the value will be set to
   * @param {*} value Value to set
   * @param {!Binding} binding Binding metadata
   * @param {!BindingPart} part Binding part metadata
   * @return {*} Transformed value to set
   * @private
   */
  function computeBindingValue(node, value, binding, part) {
    if (binding.isCompound) {
      let storage = node.__dataCompoundStorage[binding.target];
      storage[part.compoundIndex] = value;
      value = storage.join('');
    }
    if (binding.kind !== 'attribute') {
      // Some browsers serialize `undefined` to `"undefined"`
      if (binding.target === 'textContent' ||
          (node.localName == 'input' && binding.target == 'value')) {
        value = value == undefined ? '' : value;
      }
    }
    return value;
  }

  /**
   * Returns true if a binding's metadata meets all the requirements to allow
   * 2-way binding, and therefore a `<property>-changed` event listener should be
   * added:
   * - used curly braces
   * - is a property (not attribute) binding
   * - is not a textContent binding
   * - is not compound
   *
   * @param {!Binding} binding Binding metadata
   * @return {boolean} True if 2-way listener should be added
   * @private
   */
  function shouldAddListener(binding) {
    return Boolean(binding.target) &&
           binding.kind != 'attribute' &&
           binding.kind != 'text' &&
           !binding.isCompound &&
           binding.parts[0].mode === '{';
  }

  /**
   * Setup compound binding storage structures, notify listeners, and dataHost
   * references onto the bound nodeList.
   *
   * @param {!PropertyEffectsType} inst Instance that bas been previously bound
   * @param {TemplateInfo} templateInfo Template metadata
   * @private
   */
  function setupBindings(inst, templateInfo) {
    // Setup compound storage, dataHost, and notify listeners
    let {nodeList, nodeInfoList} = templateInfo;
    if (nodeInfoList.length) {
      for (let i=0; i < nodeInfoList.length; i++) {
        let info = nodeInfoList[i];
        let node = nodeList[i];
        let bindings = info.bindings;
        if (bindings) {
          for (let i=0; i<bindings.length; i++) {
            let binding = bindings[i];
            setupCompoundStorage(node, binding);
            addNotifyListener(node, inst, binding);
          }
        }
        node.__dataHost = inst;
      }
    }
  }

  /**
   * Initializes `__dataCompoundStorage` local storage on a bound node with
   * initial literal data for compound bindings, and sets the joined
   * literal parts to the bound property.
   *
   * When changes to compound parts occur, they are first set into the compound
   * storage array for that property, and then the array is joined to result in
   * the final value set to the property/attribute.
   *
   * @param {Node} node Bound node to initialize
   * @param {Binding} binding Binding metadata
   * @private
   */
  function setupCompoundStorage(node, binding) {
    if (binding.isCompound) {
      // Create compound storage map
      let storage = node.__dataCompoundStorage ||
        (node.__dataCompoundStorage = {});
      let parts = binding.parts;
      // Copy literals from parts into storage for this binding
      let literals = new Array(parts.length);
      for (let j=0; j<parts.length; j++) {
        literals[j] = parts[j].literal;
      }
      let target = binding.target;
      storage[target] = literals;
      // Configure properties with their literal parts
      if (binding.literal && binding.kind == 'property') {
        node[target] = binding.literal;
      }
    }
  }

  /**
   * Adds a 2-way binding notification event listener to the node specified
   *
   * @param {Object} node Child element to add listener to
   * @param {!PropertyEffectsType} inst Host element instance to handle notification event
   * @param {Binding} binding Binding metadata
   * @private
   */
  function addNotifyListener(node, inst, binding) {
    if (binding.listenerEvent) {
      let part = binding.parts[0];
      node.addEventListener(binding.listenerEvent, function(e) {
        handleNotification(e, inst, binding.target, part.source, part.negate);
      });
    }
  }

  // -- for method-based effects (complexObserver & computed) --------------

  /**
   * Adds property effects for each argument in the method signature (and
   * optionally, for the method name if `dynamic` is true) that calls the
   * provided effect function.
   *
   * @param {Element | Object} model Prototype or instance
   * @param {!MethodSignature} sig Method signature metadata
   * @param {string} type Type of property effect to add
   * @param {Function} effectFn Function to run when arguments change
   * @param {*=} methodInfo Effect-specific information to be included in
   *   method effect metadata
   * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
   *   method names should be included as a dependency to the effect. Note,
   *   defaults to true if the signature is static (sig.static is true).
   * @private
   */
  function createMethodEffect(model, sig, type, effectFn, methodInfo, dynamicFn) {
    dynamicFn = sig.static || (dynamicFn &&
      (typeof dynamicFn !== 'object' || dynamicFn[sig.methodName]));
    let info = {
      methodName: sig.methodName,
      args: sig.args,
      methodInfo,
      dynamicFn
    };
    for (let i=0, arg; (i<sig.args.length) && (arg=sig.args[i]); i++) {
      if (!arg.literal) {
        model._addPropertyEffect(arg.rootProperty, type, {
          fn: effectFn, info: info, trigger: arg
        });
      }
    }
    if (dynamicFn) {
      model._addPropertyEffect(sig.methodName, type, {
        fn: effectFn, info: info
      });
    }
  }

  /**
   * Calls a method with arguments marshaled from properties on the instance
   * based on the method signature contained in the effect metadata.
   *
   * Multi-property observers, computed properties, and inline computing
   * functions call this function to invoke the method, then use the return
   * value accordingly.
   *
   * @param {!PropertyEffectsType} inst The instance the effect will be run on
   * @param {string} property Name of property
   * @param {Object} props Bag of current property changes
   * @param {Object} oldProps Bag of previous values for changed properties
   * @param {?} info Effect metadata
   * @return {*} Returns the return value from the method invocation
   * @private
   */
  function runMethodEffect(inst, property, props, oldProps, info) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    let context = inst._methodHost || inst;
    let fn = context[info.methodName];
    if (fn) {
      let args = marshalArgs(inst.__data, info.args, property, props);
      return fn.apply(context, args);
    } else if (!info.dynamicFn) {
      console.warn('method `' + info.methodName + '` not defined');
    }
  }

  const emptyArray = [];

  // Regular expressions used for binding
  const IDENT  = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
  const NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
  const SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
  const DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
  const STRING = '(?:' + SQUOTE_STRING + '|' + DQUOTE_STRING + ')';
  const ARGUMENT = '(?:(' + IDENT + '|' + NUMBER + '|' +  STRING + ')\\s*' + ')';
  const ARGUMENTS = '(?:' + ARGUMENT + '(?:,\\s*' + ARGUMENT + ')*' + ')';
  const ARGUMENT_LIST = '(?:' + '\\(\\s*' +
                                '(?:' + ARGUMENTS + '?' + ')' +
                              '\\)\\s*' + ')';
  const BINDING = '(' + IDENT + '\\s*' + ARGUMENT_LIST + '?' + ')'; // Group 3
  const OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
  const CLOSE_BRACKET = '(?:]]|}})';
  const NEGATE = '(?:(!)\\s*)?'; // Group 2
  const EXPRESSION = OPEN_BRACKET + NEGATE + BINDING + CLOSE_BRACKET;
  const bindingRegex = new RegExp(EXPRESSION, "g");

  /**
   * Create a string from binding parts of all the literal parts
   *
   * @param {!Array<BindingPart>} parts All parts to stringify
   * @return {string} String made from the literal parts
   */
  function literalFromParts(parts) {
    let s = '';
    for (let i=0; i<parts.length; i++) {
      let literal = parts[i].literal;
      s += literal || '';
    }
    return s;
  }

  /**
   * Parses an expression string for a method signature, and returns a metadata
   * describing the method in terms of `methodName`, `static` (whether all the
   * arguments are literals), and an array of `args`
   *
   * @param {string} expression The expression to parse
   * @return {?MethodSignature} The method metadata object if a method expression was
   *   found, otherwise `undefined`
   * @private
   */
  function parseMethod(expression) {
    // tries to match valid javascript property names
    let m = expression.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (m) {
      let methodName = m[1];
      let sig = { methodName, static: true, args: emptyArray };
      if (m[2].trim()) {
        // replace escaped commas with comma entity, split on un-escaped commas
        let args = m[2].replace(/\\,/g, '&comma;').split(',');
        return parseArgs(args, sig);
      } else {
        return sig;
      }
    }
    return null;
  }

  /**
   * Parses an array of arguments and sets the `args` property of the supplied
   * signature metadata object. Sets the `static` property to false if any
   * argument is a non-literal.
   *
   * @param {!Array<string>} argList Array of argument names
   * @param {!MethodSignature} sig Method signature metadata object
   * @return {!MethodSignature} The updated signature metadata object
   * @private
   */
  function parseArgs(argList, sig) {
    sig.args = argList.map(function(rawArg) {
      let arg = parseArg(rawArg);
      if (!arg.literal) {
        sig.static = false;
      }
      return arg;
    }, this);
    return sig;
  }

  /**
   * Parses an individual argument, and returns an argument metadata object
   * with the following fields:
   *
   *   {
   *     value: 'prop',        // property/path or literal value
   *     literal: false,       // whether argument is a literal
   *     structured: false,    // whether the property is a path
   *     rootProperty: 'prop', // the root property of the path
   *     wildcard: false       // whether the argument was a wildcard '.*' path
   *   }
   *
   * @param {string} rawArg The string value of the argument
   * @return {!MethodArg} Argument metadata object
   * @private
   */
  function parseArg(rawArg) {
    // clean up whitespace
    let arg = rawArg.trim()
      // replace comma entity with comma
      .replace(/&comma;/g, ',')
      // repair extra escape sequences; note only commas strictly need
      // escaping, but we allow any other char to be escaped since its
      // likely users will do this
      .replace(/\\(.)/g, '\$1')
      ;
    // basic argument descriptor
    let a = {
      name: arg,
      value: '',
      literal: false
    };
    // detect literal value (must be String or Number)
    let fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch(fc) {
      case "'":
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
      a.rootProperty = Polymer.Path.root(arg);
      // detect structured path (has dots)
      a.structured = Polymer.Path.isPath(arg);
      if (a.structured) {
        a.wildcard = (arg.slice(-2) == '.*');
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  }

  /**
   * Gather the argument values for a method specified in the provided array
   * of argument metadata.
   *
   * The `path` and `value` arguments are used to fill in wildcard descriptor
   * when the method is being called as a result of a path notification.
   *
   * @param {Object} data Instance data storage object to read properties from
   * @param {!Array<!MethodArg>} args Array of argument metadata
   * @param {string} path Property/path name that triggered the method effect
   * @param {Object} props Bag of current property changes
   * @return {Array<*>} Array of argument values
   * @private
   */
  function marshalArgs(data, args, path, props) {
    let values = [];
    for (let i=0, l=args.length; i<l; i++) {
      let arg = args[i];
      let name = arg.name;
      let v;
      if (arg.literal) {
        v = arg.value;
      } else {
        if (arg.structured) {
          v = Polymer.Path.get(data, name);
          // when data is not stored e.g. `splices`
          if (v === undefined) {
            v = props[name];
          }
        } else {
          v = data[name];
        }
      }
      if (arg.wildcard) {
        // Only send the actual path changed info if the change that
        // caused the observer to run matched the wildcard
        let baseChanged = (name.indexOf(path + '.') === 0);
        let matches = (path.indexOf(name) === 0 && !baseChanged);
        values[i] = {
          path: matches ? path : name,
          value: matches ? props[path] : v,
          base: v
        };
      } else {
        values[i] = v;
      }
    }
    return values;
  }

  // data api

  /**
   * Sends array splice notifications (`.splices` and `.length`)
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {Array} splices Array of splice records
   * @private
   */
  function notifySplices(inst, array, path, splices) {
    let splicesPath = path + '.splices';
    inst.notifyPath(splicesPath, { indexSplices: splices });
    inst.notifyPath(path + '.length', array.length);
    // Null here to allow potentially large splice records to be GC'ed.
    inst.__data[splicesPath] = {indexSplices: null};
  }

  /**
   * Creates a splice record and sends an array splice notification for
   * the described mutation
   *
   * Note: this implementation only accepts normalized paths
   *
   * @param {!PropertyEffectsType} inst Instance to send notifications to
   * @param {Array} array The array the mutations occurred on
   * @param {string} path The path to the array that was mutated
   * @param {number} index Index at which the array mutation occurred
   * @param {number} addedCount Number of added items
   * @param {Array} removed Array of removed items
   * @private
   */
  function notifySplice(inst, array, path, index, addedCount, removed) {
    notifySplices(inst, array, path, [{
      index: index,
      addedCount: addedCount,
      removed: removed,
      object: array,
      type: 'splice'
    }]);
  }

  /**
   * Returns an upper-cased version of the string.
   *
   * @param {string} name String to uppercase
   * @return {string} Uppercased string
   * @private
   */
  function upper(name) {
    return name[0].toUpperCase() + name.substring(1);
  }

  /**
   * Element class mixin that provides meta-programming for Polymer's template
   * binding and data observation (collectively, "property effects") system.
   *
   * This mixin uses provides the following key static methods for adding
   * property effects to an element class:
   * - `addPropertyEffect`
   * - `createPropertyObserver`
   * - `createMethodObserver`
   * - `createNotifyingProperty`
   * - `createReadOnlyProperty`
   * - `createReflectedProperty`
   * - `createComputedProperty`
   * - `bindTemplate`
   *
   * Each method creates one or more property accessors, along with metadata
   * used by this mixin's implementation of `_propertiesChanged` to perform
   * the property effects.
   *
   * Underscored versions of the above methods also exist on the element
   * prototype for adding property effects on instances at runtime.
   *
   * Note that this mixin overrides several `PropertyAccessors` methods, in
   * many cases to maintain guarantees provided by the Polymer 1.x features;
   * notably it changes property accessors to be synchronous by default
   * whereas the default when using `PropertyAccessors` standalone is to be
   * async by default.
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.TemplateStamp
   * @appliesMixin Polymer.PropertyAccessors
   * @memberof Polymer
   * @summary Element class mixin that provides meta-programming for Polymer's
   * template binding and data observation system.
   */
  Polymer.PropertyEffects = Polymer.dedupingMixin(superClass => {

    /**
     * @constructor
     * @extends {superClass}
     * @implements {Polymer_PropertyAccessors}
     * @implements {Polymer_TemplateStamp}
     * @unrestricted
     */
    const propertyEffectsBase = Polymer.TemplateStamp(Polymer.PropertyAccessors(superClass));

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyEffects}
     * @extends {propertyEffectsBase}
     * @unrestricted
     */
    class PropertyEffects extends propertyEffectsBase {

      constructor() {
        super();
        /** @type {boolean} */
        this.__dataClientsReady;
        /** @type {Array} */
        this.__dataPendingClients;
        /** @type {Object} */
        this.__dataToNotify;
        /** @type {Object} */
        this.__dataLinkedPaths;
        /** @type {boolean} */
        this.__dataHasPaths;
        /** @type {Object} */
        this.__dataCompoundStorage;
        /** @type {Polymer_PropertyEffects} */
        this.__dataHost;
        /** @type {!Object} */
        this.__dataTemp;
        /** @type {boolean} */
        this.__dataClientsInitialized;
        /** @type {!Object} */
        this.__data;
        /** @type {!Object} */
        this.__dataPending;
        /** @type {!Object} */
        this.__dataOld;
        /** @type {Object} */
        this.__computeEffects;
        /** @type {Object} */
        this.__reflectEffects;
        /** @type {Object} */
        this.__notifyEffects;
        /** @type {Object} */
        this.__propagateEffects;
        /** @type {Object} */
        this.__observeEffects;
        /** @type {Object} */
        this.__readOnly;
        /** @type {number} */
        this.__dataCounter;
        /** @type {!TemplateInfo} */
        this.__templateInfo;
      }

      get PROPERTY_EFFECT_TYPES() {
        return TYPES;
      }

      _initializeProperties() {
        super._initializeProperties();
        hostStack.registerHost(this);
        this.__dataClientsReady = false;
        this.__dataPendingClients = null;
        this.__dataToNotify = null;
        this.__dataLinkedPaths = null;
        this.__dataHasPaths = false;
        // May be set on instance prior to upgrade
        this.__dataCompoundStorage = this.__dataCompoundStorage || null;
        this.__dataHost = this.__dataHost || null;
        this.__dataTemp = {};
        this.__dataClientsInitialized = false;
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to provide a
       * more efficient implementation of initializing properties from
       * the prototype on the instance.
       *
       * @override
       * @param {Object} props Properties to initialize on the prototype
       */
      _initializeProtoProperties(props) {
        this.__data = Object.create(props);
        this.__dataPending = Object.create(props);
        this.__dataOld = {};
      }

      /**
       * Overrides `Polymer.PropertyAccessors` implementation to avoid setting
       * `_setProperty`'s `shouldNotify: true`.
       *
       * @override
       * @param {Object} props Properties to initialize on the instance
       */
      _initializeInstanceProperties(props) {
        let readOnly = this[TYPES.READ_ONLY];
        for (let prop in props) {
          if (!readOnly || !readOnly[prop]) {
            this.__dataPending = this.__dataPending || {};
            this.__dataOld = this.__dataOld || {};
            this.__data[prop] = this.__dataPending[prop] = props[prop];
          }
        }
      }

      // Prototype setup ----------------------------------------

      /**
       * Equivalent to static `addPropertyEffect` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      _addPropertyEffect(property, type, effect) {
        this._createPropertyAccessor(property, type == TYPES.READ_ONLY);
        // effects are accumulated into arrays per property based on type
        let effects = ensureOwnEffectMap(this, type)[property];
        if (!effects) {
          effects = this[type][property] = [];
        }
        effects.push(effect);
      }

      /**
       * Removes the given property effect.
       *
       * @param {string} property Property the effect was associated with
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object to remove
       */
      _removePropertyEffect(property, type, effect) {
        let effects = ensureOwnEffectMap(this, type)[property];
        let idx = effects.indexOf(effect);
        if (idx >= 0) {
          effects.splice(idx, 1);
        }
      }

      /**
       * Returns whether the current prototype/instance has a property effect
       * of a certain type.
       *
       * @param {string} property Property name
       * @param {string=} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasPropertyEffect(property, type) {
        let effects = this[type];
        return Boolean(effects && effects[property]);
      }

      /**
       * Returns whether the current prototype/instance has a "read only"
       * accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasReadOnlyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.READ_ONLY);
      }

      /**
       * Returns whether the current prototype/instance has a "notify"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasNotifyEffect(property) {
        return this._hasPropertyEffect(property, TYPES.NOTIFY);
      }

      /**
       * Returns whether the current prototype/instance has a "reflect to attribute"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasReflectEffect(property) {
        return this._hasPropertyEffect(property, TYPES.REFLECT);
      }

      /**
       * Returns whether the current prototype/instance has a "computed"
       * property effect for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if the prototype/instance has an effect of this type
       * @protected
       */
      _hasComputedEffect(property) {
        return this._hasPropertyEffect(property, TYPES.COMPUTE);
      }

      // Runtime ----------------------------------------

      /**
       * Sets a pending property or path.  If the root property of the path in
       * question had no accessor, the path is set, otherwise it is enqueued
       * via `_setPendingProperty`.
       *
       * This function isolates relatively expensive functionality necessary
       * for the public API (`set`, `setProperties`, `notifyPath`, and property
       * change listeners via {{...}} bindings), such that it is only done
       * when paths enter the system, and not at every propagation step.  It
       * also sets a `__dataHasPaths` flag on the instance which is used to
       * fast-path slower path-matching code in the property effects host paths.
       *
       * `path` can be a path string or array of path parts as accepted by the
       * public API.
       *
       * @param {string | !Array<number|string>} path Path to set
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify Set to true if this change should
       *  cause a property notification event dispatch
       * @param {boolean=} isPathNotification If the path being set is a path
       *   notification of an already changed value, as opposed to a request
       *   to set and notify the change.  In the latter `false` case, a dirty
       *   check is performed and then the value is set to the path before
       *   enqueuing the pending property change.
       * @return {boolean} Returns true if the property/path was enqueued in
       *   the pending changes bag.
       * @protected
       */
      _setPendingPropertyOrPath(path, value, shouldNotify, isPathNotification) {
        if (isPathNotification ||
            Polymer.Path.root(Array.isArray(path) ? path[0] : path) !== path) {
          // Dirty check changes being set to a path against the actual object,
          // since this is the entry point for paths into the system; from here
          // the only dirty checks are against the `__dataTemp` cache to prevent
          // duplicate work in the same turn only. Note, if this was a notification
          // of a change already set to a path (isPathNotification: true),
          // we always let the change through and skip the `set` since it was
          // already dirty checked at the point of entry and the underlying
          // object has already been updated
          if (!isPathNotification) {
            let old = Polymer.Path.get(this, path);
            path = /** @type {string} */ (Polymer.Path.set(this, path, value));
            // Use property-accessor's simpler dirty check
            if (!path || !super._shouldPropertyChange(path, value, old)) {
              return false;
            }
          }
          this.__dataHasPaths = true;
          if (this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify)) {
            computeLinkedPaths(this, path, value);
            return true;
          }
        } else {
          if (this.__dataHasAccessor && this.__dataHasAccessor[path]) {
            return this._setPendingProperty(/**@type{string}*/(path), value, shouldNotify);
          } else {
            this[path] = value;
          }
        }
        return false;
      }

      /**
       * Applies a value to a non-Polymer element/node's property.
       *
       * The implementation makes a best-effort at binding interop:
       * Some native element properties have side-effects when
       * re-setting the same value (e.g. setting `<input>.value` resets the
       * cursor position), so we do a dirty-check before setting the value.
       * However, for better interop with non-Polymer custom elements that
       * accept objects, we explicitly re-set object changes coming from the
       * Polymer world (which may include deep object changes without the
       * top reference changing), erring on the side of providing more
       * information.
       *
       * Users may override this method to provide alternate approaches.
       *
       * @param {Node} node The node to set a property on
       * @param {string} prop The property to set
       * @param {*} value The value to set
       * @protected
       */
      _setUnmanagedPropertyToNode(node, prop, value) {
        // It is a judgment call that resetting primitives is
        // "bad" and resettings objects is also "good"; alternatively we could
        // implement a whitelist of tag & property values that should never
        // be reset (e.g. <input>.value && <select>.value)
        if (value !== node[prop] || typeof value == 'object') {
          node[prop] = value;
        }
      }

      /**
       * Overrides the `PropertyAccessors` implementation to introduce special
       * dirty check logic depending on the property & value being set:
       *
       * 1. Any value set to a path (e.g. 'obj.prop': 42 or 'obj.prop': {...})
       *    Stored in `__dataTemp`, dirty checked against `__dataTemp`
       * 2. Object set to simple property (e.g. 'prop': {...})
       *    Stored in `__dataTemp` and `__data`, dirty checked against
       *    `__dataTemp` by default implementation of `_shouldPropertyChange`
       * 3. Primitive value set to simple property (e.g. 'prop': 42)
       *    Stored in `__data`, dirty checked against `__data`
       *
       * The dirty-check is important to prevent cycles due to two-way
       * notification, but paths and objects are only dirty checked against any
       * previous value set during this turn via a "temporary cache" that is
       * cleared when the last `_propertiesChaged` exits. This is so:
       * a. any cached array paths (e.g. 'array.3.prop') may be invalidated
       *    due to array mutations like shift/unshift/splice; this is fine
       *    since path changes are dirty-checked at user entry points like `set`
       * b. dirty-checking for objects only lasts one turn to allow the user
       *    to mutate the object in-place and re-set it with the same identity
       *    and have all sub-properties re-propagated in a subsequent turn.
       *
       * The temp cache is not necessarily sufficient to prevent invalid array
       * paths, since a splice can happen during the same turn (with pathological
       * user code); we could introduce a "fixup" for temporarily cached array
       * paths if needed: https://github.com/Polymer/polymer/issues/4227
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @param {boolean=} shouldNotify True if property should fire notification
       *   event (applies only for `notify: true` properties)
       * @return {boolean} Returns true if the property changed
       * @override
       */
      _setPendingProperty(property, value, shouldNotify) {
        let isPath = this.__dataHasPaths && Polymer.Path.isPath(property);
        let prevProps = isPath ? this.__dataTemp : this.__data;
        if (this._shouldPropertyChange(property, value, prevProps[property])) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (!(property in this.__dataOld)) {
            this.__dataOld[property] = this.__data[property];
          }
          // Paths are stored in temporary cache (cleared at end of turn),
          // which is used for dirty-checking, all others stored in __data
          if (isPath) {
            this.__dataTemp[property] = value;
          } else {
            this.__data[property] = value;
          }
          // All changes go into pending property bag, passed to _propertiesChanged
          this.__dataPending[property] = value;
          // Track properties that should notify separately
          if (isPath || (this[TYPES.NOTIFY] && this[TYPES.NOTIFY][property])) {
            this.__dataToNotify = this.__dataToNotify || {};
            this.__dataToNotify[property] = shouldNotify;
          }
          return true;
        }
        return false;
      }

      /**
       * Overrides base implementation to ensure all accessors set `shouldNotify`
       * to true, for per-property notification tracking.
       *
       * @override
       */
      _setProperty(property, value) {
        if (this._setPendingProperty(property, value, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Overrides `PropertyAccessor`'s default async queuing of
       * `_propertiesChanged`: if `__dataReady` is false (has not yet been
       * manually flushed), the function no-ops; otherwise flushes
       * `_propertiesChanged` synchronously.
       *
       * @override
       */
      _invalidateProperties() {
        if (this.__dataReady) {
          this._flushProperties();
        }
      }

      /**
       * Enqueues the given client on a list of pending clients, whose
       * pending property changes can later be flushed via a call to
       * `_flushClients`.
       *
       * @param {Object} client PropertyEffects client to enqueue
       * @protected
       */
      _enqueueClient(client) {
        this.__dataPendingClients = this.__dataPendingClients || [];
        if (client !== this) {
          this.__dataPendingClients.push(client);
        }
      }

      /**
       * Flushes any clients previously enqueued via `_enqueueClient`, causing
       * their `_flushProperties` method to run.
       *
       * @protected
       */
      _flushClients() {
        if (!this.__dataClientsReady) {
          this.__dataClientsReady = true;
          this._readyClients();
          // Override point where accessors are turned on; importantly,
          // this is after clients have fully readied, providing a guarantee
          // that any property effects occur only after all clients are ready.
          this.__dataReady = true;
        } else {
          this.__enableOrFlushClients();
        }
      }

      // NOTE: We ensure clients either enable or flush as appropriate. This
      // handles two corner cases:
      // (1) clients flush properly when connected/enabled before the host
      // enables; e.g.
      //   (a) Templatize stamps with no properties and does not flush and
      //   (b) the instance is inserted into dom and
      //   (c) then the instance flushes.
      // (2) clients enable properly when not connected/enabled when the host
      // flushes; e.g.
      //   (a) a template is runtime stamped and not yet connected/enabled
      //   (b) a host sets a property, causing stamped dom to flush
      //   (c) the stamped dom enables.
      __enableOrFlushClients() {
        let clients = this.__dataPendingClients;
        if (clients) {
          this.__dataPendingClients = null;
          for (let i=0; i < clients.length; i++) {
            let client = clients[i];
            if (!client.__dataEnabled) {
              client._enableProperties();
            } else if (client.__dataPending) {
              client._flushProperties();
            }
          }
        }
      }

      /**
       * Perform any initial setup on client dom. Called before the first
       * `_flushProperties` call on client dom and before any element
       * observers are called.
       *
       * @protected
       */
      _readyClients() {
        this.__enableOrFlushClients();
      }

      /**
       * Sets a bag of property changes to this instance, and
       * synchronously processes all effects of the properties as a batch.
       *
       * Property names must be simple properties, not paths.  Batched
       * path propagation is not supported.
       *
       * @param {Object} props Bag of one or more key-value pairs whose key is
       *   a property and value is the new value to set for that property.
       * @param {boolean=} setReadOnly When true, any private values set in
       *   `props` will be set. By default, `setProperties` will not set
       *   `readOnly: true` root properties.
       * @public
       */
      setProperties(props, setReadOnly) {
        for (let path in props) {
          if (setReadOnly || !this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][path]) {
            //TODO(kschaaf): explicitly disallow paths in setProperty?
            // wildcard observers currently only pass the first changed path
            // in the `info` object, and you could do some odd things batching
            // paths, e.g. {'foo.bar': {...}, 'foo': null}
            this._setPendingPropertyOrPath(path, props[path], true);
          }
        }
        this._invalidateProperties();
      }

      /**
       * Overrides `PropertyAccessors` so that property accessor
       * side effects are not enabled until after client dom is fully ready.
       * Also calls `_flushClients` callback to ensure client dom is enabled
       * that was not enabled as a result of flushing properties.
       *
       * @override
       */
      ready() {
        // It is important that `super.ready()` is not called here as it
        // immediately turns on accessors. Instead, we wait until `readyClients`
        // to enable accessors to provide a guarantee that clients are ready
        // before processing any accessors side effects.
        this._flushProperties();
        // If no data was pending, `_flushProperties` will not `flushClients`
        // so ensure this is done.
        if (!this.__dataClientsReady) {
          this._flushClients();
        }
        // Before ready, client notifications do not trigger _flushProperties.
        // Therefore a flush is necessary here if data has been set.
        if (this.__dataPending) {
          this._flushProperties();
        }
      }

      /**
       * Implements `PropertyAccessors`'s properties changed callback.
       *
       * Runs each class of effects for the batch of changed properties in
       * a specific order (compute, propagate, reflect, observe, notify).
       *
       * @override
       */
      _propertiesChanged(currentProps, changedProps, oldProps) {
        // ----------------------------
        // let c = Object.getOwnPropertyNames(changedProps || {});
        // window.debug && console.group(this.localName + '#' + this.id + ': ' + c);
        // if (window.debug) { debugger; }
        // ----------------------------
        let hasPaths = this.__dataHasPaths;
        this.__dataHasPaths = false;
        // Compute properties
        runComputedEffects(this, changedProps, oldProps, hasPaths);
        // Clear notify properties prior to possible reentry (propagate, observe),
        // but after computing effects have a chance to add to them
        let notifyProps = this.__dataToNotify;
        this.__dataToNotify = null;
        // Propagate properties to clients
        this._propagatePropertyChanges(changedProps, oldProps, hasPaths);
        // Flush clients
        this._flushClients();
        // Reflect properties
        runEffects(this, this[TYPES.REFLECT], changedProps, oldProps, hasPaths);
        // Observe properties
        runEffects(this, this[TYPES.OBSERVE], changedProps, oldProps, hasPaths);
        // Notify properties to host
        if (notifyProps) {
          runNotifyEffects(this, notifyProps, changedProps, oldProps, hasPaths);
        }
        // Clear temporary cache at end of turn
        if (this.__dataCounter == 1) {
          this.__dataTemp = {};
        }
        // ----------------------------
        // window.debug && console.groupEnd(this.localName + '#' + this.id + ': ' + c);
        // ----------------------------
      }

      /**
       * Called to propagate any property changes to stamped template nodes
       * managed by this element.
       *
       * @param {Object} changedProps Bag of changed properties
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @protected
       */
      _propagatePropertyChanges(changedProps, oldProps, hasPaths) {
        if (this[TYPES.PROPAGATE]) {
          runEffects(this, this[TYPES.PROPAGATE], changedProps, oldProps, hasPaths);
        }
        let templateInfo = this.__templateInfo;
        while (templateInfo) {
          runEffects(this, templateInfo.propertyEffects, changedProps, oldProps,
            hasPaths, templateInfo.nodeList);
          templateInfo = templateInfo.nextTemplateInfo;
        }
      }

      /**
       * Aliases one data path as another, such that path notifications from one
       * are routed to the other.
       *
       * @param {string | !Array<string|number>} to Target path to link.
       * @param {string | !Array<string|number>} from Source path to link.
       * @public
       */
      linkPaths(to, from) {
        to = Polymer.Path.normalize(to);
        from = Polymer.Path.normalize(from);
        this.__dataLinkedPaths = this.__dataLinkedPaths || {};
        this.__dataLinkedPaths[to] = from;
      }

      /**
       * Removes a data path alias previously established with `_linkPaths`.
       *
       * Note, the path to unlink should be the target (`to`) used when
       * linking the paths.
       *
       * @param {string | !Array<string|number>} path Target path to unlink.
       * @public
       */
      unlinkPaths(path) {
        path = Polymer.Path.normalize(path);
        if (this.__dataLinkedPaths) {
          delete this.__dataLinkedPaths[path];
        }
      }

      /**
       * Notify that an array has changed.
       *
       * Example:
       *
       *     this.items = [ {name: 'Jim'}, {name: 'Todd'}, {name: 'Bill'} ];
       *     ...
       *     this.items.splice(1, 1, {name: 'Sam'});
       *     this.items.push({name: 'Bob'});
       *     this.notifySplices('items', [
       *       { index: 1, removed: [{name: 'Todd'}], addedCount: 1, obect: this.items, type: 'splice' },
       *       { index: 3, removed: [], addedCount: 1, object: this.items, type: 'splice'}
       *     ]);
       *
       * @param {string} path Path that should be notified.
       * @param {Array} splices Array of splice records indicating ordered
       *   changes that occurred to the array. Each record should have the
       *   following fields:
       *    * index: index at which the change occurred
       *    * removed: array of items that were removed from this index
       *    * addedCount: number of new items added at this index
       *    * object: a reference to the array in question
       *    * type: the string literal 'splice'
       *
       *   Note that splice records _must_ be normalized such that they are
       *   reported in index order (raw results from `Object.observe` are not
       *   ordered and must be normalized/merged before notifying).
       * @public
      */
      notifySplices(path, splices) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        notifySplices(this, array, info.path, splices);
      }

      /**
       * Convenience method for reading a value from a path.
       *
       * Note, if any part in the path is undefined, this method returns
       * `undefined` (this method does not throw when dereferencing undefined
       * paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to read.  The path may be specified as a string (e.g. `foo.bar.baz`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `users.12.name` or `['users', 12, 'name']`).
       * @param {Object=} root Root object from which the path is evaluated.
       * @return {*} Value at the path, or `undefined` if any part of the path
       *   is undefined.
       * @public
       */
      get(path, root) {
        return Polymer.Path.get(root || this, path);
      }

      /**
       * Convenience method for setting a value to a path and notifying any
       * elements bound to the same path.
       *
       * Note, if any part in the path except for the last is undefined,
       * this method does nothing (this method does not throw when
       * dereferencing undefined paths).
       *
       * @param {(string|!Array<(string|number)>)} path Path to the value
       *   to write.  The path may be specified as a string (e.g. `'foo.bar.baz'`)
       *   or an array of path parts (e.g. `['foo.bar', 'baz']`).  Note that
       *   bracketed expressions are not supported; string-based path parts
       *   *must* be separated by dots.  Note that when dereferencing array
       *   indices, the index may be used as a dotted part directly
       *   (e.g. `'users.12.name'` or `['users', 12, 'name']`).
       * @param {*} value Value to set at the specified path.
       * @param {Object=} root Root object from which the path is evaluated.
       *   When specified, no notification will occur.
       * @public
      */
      set(path, value, root) {
        if (root) {
          Polymer.Path.set(root, path, value);
        } else {
          if (!this[TYPES.READ_ONLY] || !this[TYPES.READ_ONLY][/** @type {string} */(path)]) {
            if (this._setPendingPropertyOrPath(path, value, true)) {
              this._invalidateProperties();
            }
          }
        }
      }

      /**
       * Adds items onto the end of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {...*} items Items to push onto array
       * @return {number} New length of the array.
       * @public
       */
      push(path, ...items) {
        let info = {path: ''};
        let array = /** @type {Array}*/(Polymer.Path.get(this, path, info));
        let len = array.length;
        let ret = array.push(...items);
        if (items.length) {
          notifySplice(this, array, info.path, len, items.length, []);
        }
        return ret;
      }

      /**
       * Removes an item from the end of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */
      pop(path) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        let hadLength = Boolean(array.length);
        let ret = array.pop();
        if (hadLength) {
          notifySplice(this, array, info.path, array.length, 0, [ret]);
        }
        return ret;
      }

      /**
       * Starting from the start index specified, removes 0 or more items
       * from the array and inserts 0 or more new items in their place.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.splice`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {number} start Index from which to start removing/inserting.
       * @param {number} deleteCount Number of items to remove.
       * @param {...*} items Items to insert into array.
       * @return {Array} Array of removed items.
       * @public
       */
      splice(path, start, deleteCount, ...items) {
        let info = {path : ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        // Normalize fancy native splice handling of crazy start values
        if (start < 0) {
          start = array.length - Math.floor(-start);
        } else {
          start = Math.floor(start);
        }
        if (!start) {
          start = 0;
        }
        let ret = array.splice(start, deleteCount, ...items);
        if (items.length || ret.length) {
          notifySplice(this, array, info.path, start, items.length, ret);
        }
        return ret;
      }

      /**
       * Removes an item from the beginning of array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.pop`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @return {*} Item that was removed.
       * @public
       */
      shift(path) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        let hadLength = Boolean(array.length);
        let ret = array.shift();
        if (hadLength) {
          notifySplice(this, array, info.path, 0, 0, [ret]);
        }
        return ret;
      }

      /**
       * Adds items onto the beginning of the array at the path specified.
       *
       * The arguments after `path` and return value match that of
       * `Array.prototype.push`.
       *
       * This method notifies other paths to the same array that a
       * splice occurred to the array.
       *
       * @param {string} path Path to array.
       * @param {...*} items Items to insert info array
       * @return {number} New length of the array.
       * @public
       */
      unshift(path, ...items) {
        let info = {path: ''};
        let array = /** @type {Array} */(Polymer.Path.get(this, path, info));
        let ret = array.unshift(...items);
        if (items.length) {
          notifySplice(this, array, info.path, 0, items.length, []);
        }
        return ret;
      }

      /**
       * Notify that a path has changed.
       *
       * Example:
       *
       *     this.item.user.name = 'Bob';
       *     this.notifyPath('item.user.name');
       *
       * @param {string} path Path that should be notified.
       * @param {*=} value Value at the path (optional).
       * @public
      */
      notifyPath(path, value) {
        /** @type {string} */
        let propPath;
        if (arguments.length == 1) {
          // Get value if not supplied
          let info = {path: ''};
          value = Polymer.Path.get(this, path, info);
          propPath = info.path;
        } else if (Array.isArray(path)) {
          // Normalize path if needed
          propPath = Polymer.Path.normalize(path);
        } else {
          propPath = /** @type{string} */(path);
        }
        if (this._setPendingPropertyOrPath(propPath, value, true, true)) {
          this._invalidateProperties();
        }
      }

      /**
       * Equivalent to static `createReadOnlyProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @protected
       */
      _createReadOnlyProperty(property, protectedSetter) {
        this._addPropertyEffect(property, TYPES.READ_ONLY);
        if (protectedSetter) {
          this['_set' + upper(property)] = /** @this {PropertyEffects} */function(value) {
            this._setProperty(property, value);
          }
        }
      }

      /**
       * Equivalent to static `createPropertyObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @param {string} methodName Name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @protected
       */
      _createPropertyObserver(property, methodName, dynamicFn) {
        let info = { property, methodName, dynamicFn: Boolean(dynamicFn) };
        this._addPropertyEffect(property, TYPES.OBSERVE, {
          fn: runObserverEffect, info, trigger: {name: property}
        });
        if (dynamicFn) {
          this._addPropertyEffect(methodName, TYPES.OBSERVE, {
            fn: runObserverEffect, info, trigger: {name: methodName}
          });
        }
      }

      /**
       * Equivalent to static `createMethodObserver` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      _createMethodObserver(expression, dynamicFn) {
        let sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed observer expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.OBSERVE, runMethodEffect, null, dynamicFn);
      }

      /**
       * Equivalent to static `createNotifyingProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @protected
       */
      _createNotifyingProperty(property) {
        this._addPropertyEffect(property, TYPES.NOTIFY, {
          fn: runNotifyEffect,
          info: {
            eventName: CaseMap.camelToDashCase(property) + '-changed',
            property: property
          }
        });
      }

      /**
       * Equivalent to static `createReflectedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Property name
       * @protected
       */
      _createReflectedProperty(property) {
        let attr = CaseMap.camelToDashCase(property);
        if (attr[0] === '-') {
          console.warn('Property ' + property + ' cannot be reflected to attribute ' +
            attr + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property thisead.');
        } else {
          this._addPropertyEffect(property, TYPES.REFLECT, {
            fn: runReflectEffect,
            info: {
              attrName: attr
            }
          });
        }
      }

      /**
       * Equivalent to static `createComputedProperty` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      _createComputedProperty(property, expression, dynamicFn) {
        let sig = parseMethod(expression);
        if (!sig) {
          throw new Error("Malformed computed expression '" + expression + "'");
        }
        createMethodEffect(this, sig, TYPES.COMPUTE, runComputedEffect, property, dynamicFn);
      }

      // -- static class methods ------------

      /**
       * Ensures an accessor exists for the specified property, and adds
       * to a list of "property effects" that will run when the accessor for
       * the specified property is set.  Effects are grouped by "type", which
       * roughly corresponds to a phase in effect processing.  The effect
       * metadata should be in the following form:
       *
       *   {
       *     fn: effectFunction, // Reference to function to call to perform effect
       *     info: { ... }       // Effect metadata passed to function
       *     trigger: {          // Optional triggering metadata; if not provided
       *       name: string      // the property is treated as a wildcard
       *       structured: boolean
       *       wildcard: boolean
       *     }
       *   }
       *
       * Effects are called from `_propertiesChanged` in the following order by
       * type:
       *
       * 1. COMPUTE
       * 2. PROPAGATE
       * 3. REFLECT
       * 4. OBSERVE
       * 5. NOTIFY
       *
       * Effect functions are called with the following signature:
       *
       *   effectFunction(inst, path, props, oldProps, info, hasPaths)
       *
       * @param {string} property Property that should trigger the effect
       * @param {string} type Effect type, from this.PROPERTY_EFFECT_TYPES
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      static addPropertyEffect(property, type, effect) {
        this.prototype._addPropertyEffect(property, type, effect);
      }

      /**
       * Creates a single-property observer for the given property.
       *
       * @param {string} property Property name
       * @param {string} methodName Name of observer method to call
       * @param {boolean=} dynamicFn Whether the method name should be included as
       *   a dependency to the effect.
       * @protected
       */
      static createPropertyObserver(property, methodName, dynamicFn) {
        this.prototype._createPropertyObserver(property, methodName, dynamicFn);
      }

      /**
       * Creates a multi-property "method observer" based on the provided
       * expression, which should be a string in the form of a normal Javascript
       * function signature: `'methodName(arg1, [..., argn])'`.  Each argument
       * should correspond to a property or path in the context of this
       * prototype (or instance), or may be a literal string or number.
       *
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating
       *   whether method names should be included as a dependency to the effect.
       * @protected
       */
      static createMethodObserver(expression, dynamicFn) {
        this.prototype._createMethodObserver(expression, dynamicFn);
      }

      /**
       * Causes the setter for the given property to dispatch `<property>-changed`
       * events to notify of changes to the property.
       *
       * @param {string} property Property name
       * @protected
       */
      static createNotifyingProperty(property) {
        this.prototype._createNotifyingProperty(property);
      }

      /**
       * Creates a read-only accessor for the given property.
       *
       * To set the property, use the protected `_setProperty` API.
       * To create a custom protected setter (e.g. `_setMyProp()` for
       * property `myProp`), pass `true` for `protectedSetter`.
       *
       * Note, if the property will have other property effects, this method
       * should be called first, before adding other effects.
       *
       * @param {string} property Property name
       * @param {boolean=} protectedSetter Creates a custom protected setter
       *   when `true`.
       * @protected
       */
      static createReadOnlyProperty(property, protectedSetter) {
        this.prototype._createReadOnlyProperty(property, protectedSetter);
      }

      /**
       * Causes the setter for the given property to reflect the property value
       * to a (dash-cased) attribute of the same name.
       *
       * @param {string} property Property name
       * @protected
       */
      static createReflectedProperty(property) {
        this.prototype._createReflectedProperty(property);
      }

      /**
       * Creates a computed property whose value is set to the result of the
       * method described by the given `expression` each time one or more
       * arguments to the method changes.  The expression should be a string
       * in the form of a normal Javascript function signature:
       * `'methodName(arg1, [..., argn])'`
       *
       * @param {string} property Name of computed property to set
       * @param {string} expression Method expression
       * @param {boolean|Object=} dynamicFn Boolean or object map indicating whether
       *   method names should be included as a dependency to the effect.
       * @protected
       */
      static createComputedProperty(property, expression, dynamicFn) {
        this.prototype._createComputedProperty(property, expression, dynamicFn);
      }

      /**
       * Parses the provided template to ensure binding effects are created
       * for them, and then ensures property accessors are created for any
       * dependent properties in the template.  Binding effects for bound
       * templates are stored in a linked list on the instance so that
       * templates can be efficiently stamped and unstamped.
       *
       * @param {HTMLTemplateElement} template Template containing binding
       *   bindings
       * @return {Object} Template metadata object
       * @protected
       */
      static bindTemplate(template) {
        return this.prototype._bindTemplate(template);
      }

      // -- binding ----------------------------------------------

      /**
       * Equivalent to static `bindTemplate` API but can be called on
       * an instance to add effects at runtime.  See that method for
       * full API docs.
       *
       * This method may be called on the prototype (for prototypical template
       * binding, to avoid creating accessors every instance) once per prototype,
       * and will be called with `runtimeBinding: true` by `_stampTemplate` to
       * create and link an instance of the template metadata associated with a
       * particular stamping.
       *
       * @param {HTMLTemplateElement} template Template containing binding
       *   bindings
       * @param {boolean=} instanceBinding When false (default), performs
       *   "prototypical" binding of the template and overwrites any previously
       *   bound template for the class. When true (as passed from
       *   `_stampTemplate`), the template info is instanced and linked into
       *   the list of bound templates.
       * @return {!TemplateInfo} Template metadata object; for `runtimeBinding`,
       *   this is an instance of the prototypical template info
       * @protected
       */
      _bindTemplate(template, instanceBinding) {
        let templateInfo = this.constructor._parseTemplate(template);
        let wasPreBound = this.__templateInfo == templateInfo;
        // Optimization: since this is called twice for proto-bound templates,
        // don't attempt to recreate accessors if this template was pre-bound
        if (!wasPreBound) {
          for (let prop in templateInfo.propertyEffects) {
            this._createPropertyAccessor(prop);
          }
        }
        if (instanceBinding) {
          // For instance-time binding, create instance of template metadata
          // and link into list of templates if necessary
          templateInfo = /** @type {!TemplateInfo} */(Object.create(templateInfo));
          templateInfo.wasPreBound = wasPreBound;
          if (!wasPreBound && this.__templateInfo) {
            let last = this.__templateInfoLast || this.__templateInfo;
            this.__templateInfoLast = last.nextTemplateInfo = templateInfo;
            templateInfo.previousTemplateInfo = last;
            return templateInfo;
          }
        }
        return this.__templateInfo = templateInfo;
      }

      /**
       * Adds a property effect to the given template metadata, which is run
       * at the "propagate" stage of `_propertiesChanged` when the template
       * has been bound to the element via `_bindTemplate`.
       *
       * The `effect` object should match the format in `_addPropertyEffect`.
       *
       * @param {Object} templateInfo Template metadata to add effect to
       * @param {string} prop Property that should trigger the effect
       * @param {Object=} effect Effect metadata object
       * @protected
       */
      static _addTemplatePropertyEffect(templateInfo, prop, effect) {
        let hostProps = templateInfo.hostProps = templateInfo.hostProps || {};
        hostProps[prop] = true;
        let effects = templateInfo.propertyEffects = templateInfo.propertyEffects || {};
        let propEffects = effects[prop] = effects[prop] || [];
        propEffects.push(effect);
      }

      /**
       * Stamps the provided template and performs instance-time setup for
       * Polymer template features, including data bindings, declarative event
       * listeners, and the `this.$` map of `id`'s to nodes.  A document fragment
       * is returned containing the stamped DOM, ready for insertion into the
       * DOM.
       *
       * This method may be called more than once; however note that due to
       * `shadycss` polyfill limitations, only styles from templates prepared
       * using `ShadyCSS.prepareTemplate` will be correctly polyfilled (scoped
       * to the shadow root and support CSS custom properties), and note that
       * `ShadyCSS.prepareTemplate` may only be called once per element. As such,
       * any styles required by in runtime-stamped templates must be included
       * in the main element template.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       * @override
       * @protected
       */
      _stampTemplate(template) {
        // Ensures that created dom is `_enqueueClient`'d to this element so
        // that it can be flushed on next call to `_flushProperties`
        hostStack.beginHosting(this);
        let dom = super._stampTemplate(template);
        hostStack.endHosting(this);
        let templateInfo = /** @type {!TemplateInfo} */(this._bindTemplate(template, true));
        // Add template-instance-specific data to instanced templateInfo
        templateInfo.nodeList = dom.nodeList;
        // Capture child nodes to allow unstamping of non-prototypical templates
        if (!templateInfo.wasPreBound) {
          let nodes = templateInfo.childNodes = [];
          for (let n=dom.firstChild; n; n=n.nextSibling) {
            nodes.push(n);
          }
        }
        dom.templateInfo = templateInfo;
        // Setup compound storage, 2-way listeners, and dataHost for bindings
        setupBindings(this, templateInfo);
        // Flush properties into template nodes if already booted
        if (this.__dataReady) {
          runEffects(this, templateInfo.propertyEffects, this.__data, null,
            false, templateInfo.nodeList);
        }
        return dom;
      }

      /**
       * Removes and unbinds the nodes previously contained in the provided
       * DocumentFragment returned from `_stampTemplate`.
       *
       * @param {!StampedTemplate} dom DocumentFragment previously returned
       *   from `_stampTemplate` associated with the nodes to be removed
       * @protected
       */
      _removeBoundDom(dom) {
        // Unlink template info
        let templateInfo = dom.templateInfo;
        if (templateInfo.previousTemplateInfo) {
          templateInfo.previousTemplateInfo.nextTemplateInfo =
            templateInfo.nextTemplateInfo;
        }
        if (templateInfo.nextTemplateInfo) {
          templateInfo.nextTemplateInfo.previousTemplateInfo =
            templateInfo.previousTemplateInfo;
        }
        if (this.__templateInfoLast == templateInfo) {
          this.__templateInfoLast = templateInfo.previousTemplateInfo;
        }
        templateInfo.previousTemplateInfo = templateInfo.nextTemplateInfo = null;
        // Remove stamped nodes
        let nodes = templateInfo.childNodes;
        for (let i=0; i<nodes.length; i++) {
          let node = nodes[i];
          node.parentNode.removeChild(node);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from `TextNode`'s' `textContent`.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNode(node, templateInfo, nodeInfo) {
        let noted = super._parseTemplateNode(node, templateInfo, nodeInfo);
        if (node.nodeType === Node.TEXT_NODE) {
          let parts = this._parseBindings(node.textContent, templateInfo);
          if (parts) {
            // Initialize the textContent with any literal parts
            // NOTE: default to a space here so the textNode remains; some browsers
            // (IE) evacipate an empty textNode following cloneNode/importNode.
            node.textContent = literalFromParts(parts) || ' ';
            addBinding(this, templateInfo, nodeInfo, 'text', 'textContent', parts);
            noted = true;
          }
        }
        return noted;
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * parsing bindings from attributes.  A `bindings`
       * array is added to `nodeInfo` and populated with binding metadata
       * with information capturing the binding target, and a `parts` array
       * with one or more metadata objects capturing the source(s) of the
       * binding.
       *
       * @override
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        let parts = this._parseBindings(value, templateInfo);
        if (parts) {
          // Attribute or property
          let origName = name;
          let kind = 'property';
          if (name[name.length-1] == '$') {
            name = name.slice(0, -1);
            kind = 'attribute';
          }
          // Initialize attribute bindings with any literal parts
          let literal = literalFromParts(parts);
          if (literal && kind == 'attribute') {
            node.setAttribute(name, literal);
          }
          // Clear attribute before removing, since IE won't allow removing
          // `value` attribute if it previously had a value (can't
          // unconditionally set '' before removing since attributes with `$`
          // can't be set using setAttribute)
          if (node.localName === 'input' && origName === 'value') {
            node.setAttribute(origName, '');
          }
          // Remove annotation
          node.removeAttribute(origName);
          // Case hackery: attributes are lower-case, but bind targets
          // (properties) are case sensitive. Gambit is to map dash-case to
          // camel-case: `foo-bar` becomes `fooBar`.
          // Attribute bindings are excepted.
          if (kind === 'property') {
            name = Polymer.CaseMap.dashToCamelCase(name);
          }
          addBinding(this, templateInfo, nodeInfo, kind, name, parts, literal);
          return true;
        } else {
          return super._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value);
        }
      }

      /**
       * Overrides default `TemplateStamp` implementation to add support for
       * binding the properties that a nested template depends on to the template
       * as `_host_<property>`.
       *
       * @override
       * @param {Node} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template node
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       * @protected
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateNestedTemplate(node, templateInfo, nodeInfo) {
        let noted = super._parseTemplateNestedTemplate(node, templateInfo, nodeInfo);
        // Merge host props into outer template and add bindings
        let hostProps = nodeInfo.templateInfo.hostProps;
        let mode = '{';
        for (let source in hostProps) {
          let parts = [{ mode, source, dependencies: [source] }];
          addBinding(this, templateInfo, nodeInfo, 'property', '_host_' + source, parts);
        }
        return noted;
      }

      /**
       * Called to parse text in a template (either attribute values or
       * textContent) into binding metadata.
       *
       * Any overrides of this method should return an array of binding part
       * metadata  representing one or more bindings found in the provided text
       * and any "literal" text in between.  Any non-literal parts will be passed
       * to `_evaluateBinding` when any dependencies change.  The only required
       * fields of each "part" in the returned array are as follows:
       *
       * - `dependencies` - Array containing trigger metadata for each property
       *   that should trigger the binding to update
       * - `literal` - String containing text if the part represents a literal;
       *   in this case no `dependencies` are needed
       *
       * Additional metadata for use by `_evaluateBinding` may be provided in
       * each part object as needed.
       *
       * The default implementation handles the following types of bindings
       * (one or more may be intermixed with literal strings):
       * - Property binding: `[[prop]]`
       * - Path binding: `[[object.prop]]`
       * - Negated property or path bindings: `[[!prop]]` or `[[!object.prop]]`
       * - Two-way property or path bindings (supports negation):
       *   `{{prop}}`, `{{object.prop}}`, `{{!prop}}` or `{{!object.prop}}`
       * - Inline computed method (supports negation):
       *   `[[compute(a, 'literal', b)]]`, `[[!compute(a, 'literal', b)]]`
       *
       * @param {string} text Text to parse from attribute or textContent
       * @param {Object} templateInfo Current template metadata
       * @return {Array<!BindingPart>} Array of binding part metadata
       * @protected
       */
      static _parseBindings(text, templateInfo) {
        let parts = [];
        let lastIndex = 0;
        let m;
        // Example: "literal1{{prop}}literal2[[!compute(foo,bar)]]final"
        // Regex matches:
        //        Iteration 1:  Iteration 2:
        // m[1]: '{{'          '[['
        // m[2]: ''            '!'
        // m[3]: 'prop'        'compute(foo,bar)'
        while ((m = bindingRegex.exec(text)) !== null) {
          // Add literal part
          if (m.index > lastIndex) {
            parts.push({literal: text.slice(lastIndex, m.index)});
          }
          // Add binding part
          let mode = m[1][0];
          let negate = Boolean(m[2]);
          let source = m[3].trim();
          let customEvent = false, notifyEvent = '', colon = -1;
          if (mode == '{' && (colon = source.indexOf('::')) > 0) {
            notifyEvent = source.substring(colon + 2);
            source = source.substring(0, colon);
            customEvent = true;
          }
          let signature = parseMethod(source);
          let dependencies = [];
          if (signature) {
            // Inline computed function
            let {args, methodName} = signature;
            for (let i=0; i<args.length; i++) {
              let arg = args[i];
              if (!arg.literal) {
                dependencies.push(arg);
              }
            }
            let dynamicFns = templateInfo.dynamicFns;
            if (dynamicFns && dynamicFns[methodName] || signature.static) {
              dependencies.push(methodName);
              signature.dynamicFn = true;
            }
          } else {
            // Property or path
            dependencies.push(source);
          }
          parts.push({
            source, mode, negate, customEvent, signature, dependencies,
            event: notifyEvent
          });
          lastIndex = bindingRegex.lastIndex;
        }
        // Add a final literal part
        if (lastIndex && lastIndex < text.length) {
          let literal = text.substring(lastIndex);
          if (literal) {
            parts.push({
              literal: literal
            });
          }
        }
        if (parts.length) {
          return parts;
        } else {
          return null;
        }
      }

      /**
       * Called to evaluate a previously parsed binding part based on a set of
       * one or more changed dependencies.
       *
       * @param {this} inst Element that should be used as scope for
       *   binding dependencies
       * @param {BindingPart} part Binding part metadata
       * @param {string} path Property/path that triggered this effect
       * @param {Object} props Bag of current property changes
       * @param {Object} oldProps Bag of previous values for changed properties
       * @param {boolean} hasPaths True with `props` contains one or more paths
       * @return {*} Value the binding part evaluated to
       * @protected
       */
      static _evaluateBinding(inst, part, path, props, oldProps, hasPaths) {
        let value;
        if (part.signature) {
          value = runMethodEffect(inst, path, props, oldProps, part.signature);
        } else if (path != part.source) {
          value = Polymer.Path.get(inst, part.source);
        } else {
          if (hasPaths && Polymer.Path.isPath(path)) {
            value = Polymer.Path.get(inst, path);
          } else {
            value = inst.__data[path];
          }
        }
        if (part.negate) {
          value = !value;
        }
        return value;
      }

    }

    // make a typing for closure :P
    PropertyEffectsType = PropertyEffects;

    return PropertyEffects;
  });

  /**
   * Helper api for enqueing client dom created by a host element.
   *
   * By default elements are flushed via `_flushProperties` when
   * `connectedCallback` is called. Elements attach their client dom to
   * themselves at `ready` time which results from this first flush.
   * This provides an ordering guarantee that the client dom an element
   * creates is flushed before the element itself (i.e. client `ready`
   * fires before host `ready`).
   *
   * However, if `_flushProperties` is called *before* an element is connected,
   * as for example `Templatize` does, this ordering guarantee cannot be
   * satisfied because no elements are connected. (Note: Bound elements that
   * receive data do become enqueued clients and are properly ordered but
   * unbound elements are not.)
   *
   * To maintain the desired "client before host" ordering guarantee for this
   * case we rely on the "host stack. Client nodes registers themselves with
   * the creating host element when created. This ensures that all client dom
   * is readied in the proper order, maintaining the desired guarantee.
   *
   * @private
   */
  let hostStack = {

    stack: [],

    /**
     * @param {*} inst Instance to add to hostStack
     * @this {hostStack}
     */
    registerHost(inst) {
      if (this.stack.length) {
        let host = this.stack[this.stack.length-1];
        host._enqueueClient(inst);
      }
    },

    /**
     * @param {*} inst Instance to begin hosting
     * @this {hostStack}
     */
    beginHosting(inst) {
      this.stack.push(inst);
    },

    /**
     * @param {*} inst Instance to end hosting
     * @this {hostStack}
     */
    endHosting(inst) {
      let stackLen = this.stack.length;
      if (stackLen && this.stack[stackLen-1] == inst) {
        this.stack.pop();
      }
    }

  }

})();



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {

  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
  let AsyncInterface; // eslint-disable-line no-unused-vars

  // Microtask implemented using Mutation Observer
  let microtaskCurrHandle = 0;
  let microtaskLastHandle = 0;
  let microtaskCallbacks = [];
  let microtaskNodeContent = 0;
  let microtaskNode = document.createTextNode('');
  new window.MutationObserver(microtaskFlush).observe(microtaskNode, {characterData: true});

  function microtaskFlush() {
    const len = microtaskCallbacks.length;
    for (let i = 0; i < len; i++) {
      let cb = microtaskCallbacks[i];
      if (cb) {
        try {
          cb();
        } catch (e) {
          setTimeout(() => { throw e });
        }
      }
    }
    microtaskCallbacks.splice(0, len);
    microtaskLastHandle += len;
  }

  /**
   * Module that provides a number of strategies for enqueuing asynchronous
   * tasks.  Each sub-module provides a standard `run(fn)` interface that returns a
   * handle, and a `cancel(handle)` interface for canceling async tasks before
   * they run.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module that provides a number of strategies for enqueuing asynchronous
   * tasks.
   */
  Polymer.Async = {

    /**
     * Async interface wrapper around `setTimeout`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `setTimeout`.
     */
    timeOut: {
      /**
       * Returns a sub-module with the async interface providing the provided
       * delay.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} delay Time to wait before calling callbacks in ms
       * @return {AsyncInterface} An async timeout interface
       */
      after(delay) {
        return  {
          run(fn) { return setTimeout(fn, delay) },
          cancel: window.clearTimeout.bind(window)
        }
      },
      /**
       * Enqueues a function called in the next task.
       *
       * @memberof Polymer.Async.timeOut
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.setTimeout.bind(window),
      /**
       * Cancels a previously enqueued `timeOut` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.clearTimeout.bind(window)
    },

    /**
     * Async interface wrapper around `requestAnimationFrame`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestAnimationFrame`.
     */
    animationFrame: {
      /**
       * Enqueues a function called at `requestAnimationFrame` timing.
       *
       * @memberof Polymer.Async.animationFrame
       * @param {Function} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run: window.requestAnimationFrame.bind(window),
      /**
       * Cancels a previously enqueued `animationFrame` callback.
       *
       * @memberof Polymer.Async.timeOut
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel: window.cancelAnimationFrame.bind(window)
    },

    /**
     * Async interface wrapper around `requestIdleCallback`.  Falls back to
     * `setTimeout` on browsers that do not support `requestIdleCallback`.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface wrapper around `requestIdleCallback`.
     */
    idlePeriod: {
      /**
       * Enqueues a function called at `requestIdleCallback` timing.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {function(IdleDeadline)} fn Callback to run
       * @return {number} Handle used for canceling task
       */
      run(fn) {
        return window.requestIdleCallback ?
          window.requestIdleCallback(fn) :
          window.setTimeout(fn, 16);
      },
      /**
       * Cancels a previously enqueued `idlePeriod` callback.
       *
       * @memberof Polymer.Async.idlePeriod
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel(handle) {
        window.cancelIdleCallback ?
          window.cancelIdleCallback(handle) :
          window.clearTimeout(handle);
      }
    },

    /**
     * Async interface for enqueueing callbacks that run at microtask timing.
     *
     * Note that microtask timing is achieved via a single `MutationObserver`,
     * and thus callbacks enqueued with this API will all run in a single
     * batch, and not interleaved with other microtasks such as promises.
     * Promises are avoided as an implementation choice for the time being
     * due to Safari bugs that cause Promises to lack microtask guarantees.
     *
     * @namespace
     * @memberof Polymer.Async
     * @summary Async interface for enqueueing callbacks that run at microtask
     *   timing.
     */
    microTask: {

      /**
       * Enqueues a function called at microtask timing.
       *
       * @memberof Polymer.Async.microTask
       * @param {Function} callback Callback to run
       * @return {number} Handle used for canceling task
       */
      run(callback) {
        microtaskNode.textContent = microtaskNodeContent++;
        microtaskCallbacks.push(callback);
        return microtaskCurrHandle++;
      },

      /**
       * Cancels a previously enqueued `microTask` callback.
       *
       * @memberof Polymer.Async.microTask
       * @param {number} handle Handle returned from `run` of callback to cancel
       */
      cancel(handle) {
        const idx = handle - microtaskLastHandle;
        if (idx >= 0) {
          if (!microtaskCallbacks[idx]) {
            throw new Error('invalid async handle: ' + handle);
          }
          microtaskCallbacks[idx] = null;
        }
      }

    }
  };

})();



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(1);


(function() {
  'use strict';

  // Common implementation for mixin & behavior
  function mutablePropertyChange(inst, property, value, old, mutableData) {
    let isObject;
    if (mutableData) {
      isObject = (typeof value === 'object' && value !== null);
      // Pull `old` for Objects from temp cache, but treat `null` as a primitive
      if (isObject) {
        old = inst.__dataTemp[property];
      }
    }
    // Strict equality check, but return false for NaN===NaN
    let shouldChange = (old !== value && (old === old || value === value));
    // Objects are stored in temporary cache (cleared at end of
    // turn), which is used for dirty-checking
    if (isObject && shouldChange) {
      inst.__dataTemp[property] = value;
    }
    return shouldChange;
  }

  /**
   * Element class mixin to skip strict dirty-checking for objects and arrays
   * (always consider them to be "dirty"), for use on elements utilizing
   * `Polymer.PropertyEffects`
   *
   * By default, `Polymer.PropertyEffects` performs strict dirty checking on
   * objects, which means that any deep modifications to an object or array will
   * not be propagated unless "immutable" data patterns are used (i.e. all object
   * references from the root to the mutation were changed).
   *
   * Polymer also provides a proprietary data mutation and path notification API
   * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
   * mutation and notification of deep changes in an object graph to all elements
   * bound to the same object graph.
   *
   * In cases where neither immutable patterns nor the data mutation API can be
   * used, applying this mixin will cause Polymer to skip dirty checking for
   * objects and arrays (always consider them to be "dirty").  This allows a
   * user to make a deep modification to a bound object graph, and then either
   * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
   * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
   * elements that wish to be updated based on deep mutations must apply this
   * mixin or otherwise skip strict dirty checking for objects/arrays.
   *
   * In order to make the dirty check strategy configurable, see
   * `Polymer.OptionalMutableData`.
   *
   * Note, the performance characteristics of propagating large object graphs
   * will be worse as opposed to using strict dirty checking with immutable
   * patterns or Polymer's path notification API.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin to skip strict dirty-checking for objects
   *   and arrays
   */
  Polymer.MutableData = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_MutableData}
     */
    class MutableData extends superClass {
      /**
       * Overrides `Polymer.PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * This method pulls the value to dirty check against from the `__dataTemp`
       * cache (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, true);
      }

    }
    /** @type {boolean} */
    MutableData.prototype.mutableData = false;

    return MutableData;

  });


  /**
   * Element class mixin to add the optional ability to skip strict
   * dirty-checking for objects and arrays (always consider them to be
   * "dirty") by setting a `mutable-data` attribute on an element instance.
   *
   * By default, `Polymer.PropertyEffects` performs strict dirty checking on
   * objects, which means that any deep modifications to an object or array will
   * not be propagated unless "immutable" data patterns are used (i.e. all object
   * references from the root to the mutation were changed).
   *
   * Polymer also provides a proprietary data mutation and path notification API
   * (e.g. `notifyPath`, `set`, and array mutation API's) that allow efficient
   * mutation and notification of deep changes in an object graph to all elements
   * bound to the same object graph.
   *
   * In cases where neither immutable patterns nor the data mutation API can be
   * used, applying this mixin will allow Polymer to skip dirty checking for
   * objects and arrays (always consider them to be "dirty").  This allows a
   * user to make a deep modification to a bound object graph, and then either
   * simply re-set the object (e.g. `this.items = this.items`) or call `notifyPath`
   * (e.g. `this.notifyPath('items')`) to update the tree.  Note that all
   * elements that wish to be updated based on deep mutations must apply this
   * mixin or otherwise skip strict dirty checking for objects/arrays.
   *
   * While this mixin adds the ability to forgo Object/Array dirty checking,
   * the `mutableData` flag defaults to false and must be set on the instance.
   *
   * Note, the performance characteristics of propagating large object graphs
   * will be worse by relying on `mutableData: true` as opposed to using
   * strict dirty checking with immutable patterns or Polymer's path notification
   * API.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin to optionally skip strict dirty-checking
   *   for objects and arrays
   */
  Polymer.OptionalMutableData = Polymer.dedupingMixin(superClass => {

    /**
     * @mixinClass
     * @polymer
     * @implements {Polymer_OptionalMutableData}
     */
    class OptionalMutableData extends superClass {

      static get properties() {
        return {
          /**
           * Instance-level flag for configuring the dirty-checking strategy
           * for this element.  When true, Objects and Arrays will skip dirty
           * checking, otherwise strict equality checking will be used.
           */
          mutableData: Boolean
        };
      }

      /**
       * Overrides `Polymer.PropertyEffects` to provide option for skipping
       * strict equality checking for Objects and Arrays.
       *
       * When `this.mutableData` is true on this instance, this method
       * pulls the value to dirty check against from the `__dataTemp` cache
       * (rather than the normal `__data` cache) for Objects.  Since the temp
       * cache is cleared at the end of a turn, this implementation allows
       * side-effects of deep object changes to be processed by re-setting the
       * same object (using the temp cache as an in-turn backstop to prevent
       * cycles due to 2-way notification).
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, this.mutableData);
      }
    }

    return OptionalMutableData;

  });

  // Export for use by legacy behavior
  Polymer.MutableData._mutablePropertyChange = mutablePropertyChange;

})();



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/!function(a){var b="\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n    \n    \n    <link rel=\"shortcut icon\" href=\"./favicons/favicon.ico\">\n    <link rel=\"icon\" sizes=\"16x16 32x32 64x64\" href=\"./favicons/favicon.ico\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"196x196\" href=\"./favicons/favicon-192.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"160x160\" href=\"./favicons/favicon-160.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"96x96\" href=\"./favicons/favicon-96.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"64x64\" href=\"./favicons/favicon-64.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"./favicons/favicon-32.png\">\n    <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"./favicons/favicon-16.png\">\n    <link rel=\"apple-touch-icon\" href=\"./favicons/favicon-57.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"114x114\" href=\"./favicons/favicon-114.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"72x72\" href=\"./favicons/favicon-72.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"144x144\" href=\"./favicons/favicon-144.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"60x60\" href=\"./favicons/favicon-60.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"120x120\" href=\"./favicons/favicon-120.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"76x76\" href=\"./favicons/favicon-76.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"152x152\" href=\"./favicons/favicon-152.png\">\n    <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"./favicons/favicon-180.png\">\n    <meta name=\"msapplication-TileColor\" content=\"#FFFFFF\">\n    <meta name=\"msapplication-TileImage\" content=\"./favicons/favicon-144.png\">\n    <meta name=\"msapplication-config\" content=\"./favicons/browserconfig.xml\">\n    \n\n    <title>Garrett Johnson</title>\n\n    \n    <link href=\"https://fonts.googleapis.com/css?family=Roboto:100,300,500\" rel=\"stylesheet\">\n    <link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\" integrity=\"sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN\" crossorigin=\"anonymous\">\n\n    \n    \n    \n\n    \n    \n    \n    \n    \n\n    <style>/* Animations */@keyframes fade{from{opacity:0;}to{opacity:1;}}/* Overrides */html,body{margin:0;padding:0;height:100%;}body{animation:fade 3s ease;font-family:Roboto,helvetica,arial,sans-serif;font-weight:300;/* Material Color Blue Gray 800 */ color:#37474F;background-color:#F5F8FA;/* lighter version of the above color */ background-color:#fcfdfd;}body.dark{background-color:#222;color:#ddd;}h5{/* Material Color Blue Gray 200 */ color:#B0BEC5;margin:5px;}#icons a{color:inherit;opacity:0.25;transition:opacity .25s ease;}#icons a:hover{opacity:1;}.fa{font-size:28px;padding:0 5px;}/* Title Section */#title{height:100vh;width:100%;position:relative;font-weight:100;}#title .center-container{width:100%;position:absolute;top:50%;}#title .content{margin-top:-60px;}#name{text-align:center;font-size:60px;}#email{text-align:center;font-size:33.5px;}#icons{padding:10px 5px;}/* Projects */#project-container{display:flex;}#project-container:before,#project-container:after{content:\"\";flex:1;}#project-container:after{/* Adding buffer for the menu on the right */ min-width:200px;}#projects{max-width:950px;margin:auto;}/* Stuck Headers */#sticky-icon-container{position:absolute;bottom:0;width:100%;}#icons{display:flex;}#icons .buffer{flex:1;}#copyright{text-align:center;width:100%;font-size:14px;padding:5px 0;opacity:0.5;}#about-section{display:flex;flex-wrap:wrap;position:relative;margin-bottom:200px;}#about-section markdown-element{margin:0;}#about-description{flex:5;min-width:450px;}#about-image-container{flex:1;display:flex;flex-direction:column;}#about-image-container .buffer{flex:1;}#about-image{width:200px;height:100%;background:url(data:image/jpeg;base64,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);background-size:cover;margin:auto;height:100%;}/* Menu */#menu{position:absolute;right:0;text-align:right;/* zero out the <ul> padding and margin */ padding:0;padding-top:25px;margin:0;max-width:200px;}#menu li{margin:5px;list-style:none;font-size:14px;opacity:0.5;cursor:default;}#menu li.active{opacity:1;}#menu li:hover{opacity:1;}#menu .buffer{flex:1;}</style>\n    <style>markdown-element{display:block;margin-bottom:200px;}.markdown a{color:inherit;opacity:0.6;transition:opacity 0.2s ease;}.markdown a:hover{opacity:1;}.markdown h1,.markdown h2,.markdown h3,.markdown h4,.markdown h5,.markdown p,.markdown section{max-width:800px;margin-left:auto;margin-right:auto;padding:0 20px;/*border-left:2px solid transparent;*/}.markdown h1,.markdown h2,.markdown h3,.markdown h4,.markdown h5{font-weight:normal;}.markdown h1,.markdown h2{max-width:800px;}.markdown p{/* Material Color Deep Orange 500 */ /*border-left-color:#FF5722;*/}.markdown sliding-image{height:350px;}.markdown sliding-image,.markdown #about-image{margin:auto;box-shadow:0 0 10px rgba(0,0,0,0.1);border:10px solid white;}</style>\n    <style>/* Screen scale transitions and scroll mitigation*/body{overflow-x:hidden;}#icons{margin-top:0;transition:margin-right 0.2s ease;}#menu{transition:right 0.2s ease;}#project-container:after{transition:min-width 0.2s ease;}@media (max-width:800px){sticky-element[stuck] #icons{margin-right:-200px;}#menu{right:-200px;}#project-container:after{min-width:0;}}@media (max-width:500px){#name{font-size:13vw;}#email{font-size:7.35vw;}.markdown sliding-image{height:150px;}#about-section{display:block;}#about-description{min-width:auto;}#menu{display:none;}}</style>\n\n    \n";if(a.head){var c=a.head,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);!function(a){var b="\n    <pop-over></pop-over>\n    <div id=\"title\">\n\n        <div class=\"center-container\">\n            <div class=\"content\">\n                <div id=\"name\">Garrett Johnson</div>\n                <div id=\"email\">garrett.kjohnson@gmail.com</div>\n            </div>\n        </div>\n\n        <sticky-element id=\"sticky-icon-container\">\n            <div id=\"icons\">\n                <div class=\"buffer\"></div>\n                <a referrer=\"noopener noreferrerr\" target=\"_blank\" href=\"https://github.com/gkjohnson\" title=\"Github\">\n                    <i class=\"fa fa-github\"></i>\n                </a>\n                <a referrer=\"noopener noreferrerr\" target=\"_blank\" href=\"https://www.linkedin.com/in/garrett-kjohnson/\" title=\"LinkedIn\">\n                    <i class=\"fa fa-linkedin\"></i>\n                </a>\n                <a referrer=\"noopener noreferrerr\" target=\"_blank\" href=\"https://www.instagram.com/gkjohnso/\" title=\"Instagram\">\n                    <i class=\"fa fa-instagram\"></i>\n                </a>\n            </div>\n        </sticky-element>\n    </div>\n\n    <div id=\"content\">\n        <sticky-element top-offset=\"45\">\n            <ul id=\"menu\">\n                <li>Me</li>\n                <li>ProtoSpace</li>\n                <li>Collaborative System Analysis</li>\n                <li>Sidekick</li>\n                <li>Human Robotic Systems</li>\n                <li>Spacecraft Sequencing</li>\n                <li>Major Final Project</li>\n                <li>CS174A Graphics Final</li>\n                <li>CS174A Graphics Projects</li>\n            </ul>\n        </sticky-element>\n\n        <div id=\"project-container\">\n            <div id=\"projects\" class=\"markdown\">\n                <h1 id=\"me\">Me</h1>\n                <section id=\"about-section\">\n                    <div id=\"about-image-container\">\n                        <div class=\"buffer\"></div>\n                        <div id=\"about-image\"></div>\n                        <div class=\"buffer\"></div>\n                    </div>\n                    <div id=\"about-description\">\n                        <markdown-element href=\"../projects/about.md\"></markdown-element>\n                    </div>\n                </section>\n\n                <h1>Professional Projects</h1>\n                <markdown-element href=\"../projects/protospace.md\"></markdown-element>\n                <markdown-element href=\"../projects/ime.md\"></markdown-element>\n                <markdown-element href=\"../projects/sidekick.md\"></markdown-element>\n                <markdown-element href=\"../projects/hrs.md\"></markdown-element>\n                <markdown-element href=\"../projects/sequencing.md\"></markdown-element>\n                \n                <h1>College Projects</h1>\n                <markdown-element href=\"../projects/graphics.md\"></markdown-element>\n            </div>\n        </div>\n    </div>\n    \n    <div id=\"copyright\">Garrett Johnson © 2017</div>\n\n\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);
__webpack_require__(10);

__webpack_require__(5);

__webpack_require__(19);

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(29);


        const updateTitlePos = () => {
            const el = document.querySelector('#title .center-container')
            const ratio = document.body.scrollTop / window.innerHeight

            const lerp = (a, b, r) => a + (b - a) * r
            const pos = lerp(50, 90, ratio)
            const opacity = lerp(1, 0, ratio)
            el.style = `top: ${pos}%; opacity: ${opacity}`
        }

        const updateMenu = () => {
            const items = document.querySelectorAll('#menu li')
            const collection = []
            for (let i = 0; i < items.length; i++) {
                const menuItem = items[i]
                const approxid = menuItem.innerText.split(' ').join('-').toLowerCase()
                const target = document.querySelector(`.markdown [id*="${approxid}"]`)

                menuItem.classList.remove('active')

                collection.push({
                    menuItem,
                    top: target ? target.getBoundingClientRect().top : Infinity
                })
            }

            collection.sort((a, b) => Math.abs(a.top) - Math.abs(b.top))

            const focusItem = collection.shift(1).menuItem
            if (focusItem) focusItem.classList.add('active')

        }

        const menuSetup = () => {
            const menuContainer = document.querySelector('#menu')
            menuContainer.addEventListener('click', e => {
                const menuItem = e.target

                if (menuItem.tagName.toLowerCase() !== 'li') return

                const approxid = menuItem.innerText.split(' ').join('-').toLowerCase()
                const target = document.querySelector(`.markdown [id*="${approxid}"]`)

                if (target) {
                    const rect = target.getBoundingClientRect()
                    const scrollPos = window.pageYOffset + rect.top
                    window.scrollTo(0, scrollPos)
                }
            })
        }

        document.onreadystatechange = () => {
            if (document.readyState === 'interactive') {
                menuSetup()

                // TODO: It seems that you can "scroll" before this
                // 'interactive' event is fired...
                // requestAnimationFrame(() => document.body.scrollTop = 0)
            }

            updateTitlePos()
        }

        window.addEventListener('scroll', () => updateTitlePos())
        window.addEventListener('scroll', () => updateMenu())


    


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4)(__webpack_require__(11))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "(function(){/*\n\n Copyright (c) 2016 The Polymer Project Authors. All rights reserved.\n This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n Code distributed by Google as part of the polymer project is also\n subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\n Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n Code distributed by Google as part of the polymer project is also\n subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\nCopyright (c) 2016 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\nThe complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\nThe complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\nCode distributed by Google as part of the polymer project is also\nsubject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n\nCopyright (c) 2017 The Polymer Project Authors. All rights reserved.\nThis code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\nThe complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\nThe complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\nCode distributed by Google as part of the polymer project is also\nsubject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n*/\n'use strict';var Ib=\"undefined\"!=typeof window&&window===this?this:\"undefined\"!=typeof global&&null!=global?global:this;\n(function(){function k(){var a=this;this.s={};this.g=document.documentElement;var b=new Ja;b.rules=[];this.h=t.set(this.g,new t(b));this.i=!1;this.b=this.a=null;Jb(function(){a.c()})}function F(){this.customStyles=[];this.enqueued=!1}function Kb(){}function oa(a){this.cache={};this.c=void 0===a?100:a}function p(){}function t(a,b,c,d,e){this.G=a||null;this.b=b||null;this.sa=c||[];this.P=null;this.Z=e||\"\";this.a=this.B=this.K=null}function r(){}function Ja(){this.end=this.start=0;this.rules=this.parent=\nthis.previous=null;this.cssText=this.parsedCssText=\"\";this.atRule=!1;this.type=0;this.parsedSelector=this.selector=this.keyframesName=\"\"}function Hd(a){function b(b,c){Object.defineProperty(b,\"innerHTML\",{enumerable:c.enumerable,configurable:!0,get:c.get,set:function(b){var d=this,e=void 0;n(this)&&(e=[],P(this,function(a){a!==d&&e.push(a)}));c.set.call(this,b);if(e)for(var f=0;f<e.length;f++){var g=e[f];1===g.__CE_state&&a.disconnectedCallback(g)}this.ownerDocument.__CE_hasRegistry?a.c(this):a.j(this);\nreturn b}})}function c(b,c){w(b,\"insertAdjacentElement\",function(b,d){var e=n(d);b=c.call(this,b,d);e&&a.a(d);n(b)&&a.b(d);return b})}Lb?w(Element.prototype,\"attachShadow\",function(a){return this.__CE_shadowRoot=a=Lb.call(this,a)}):console.warn(\"Custom Elements: `Element#attachShadow` was not patched.\");if(Ka&&Ka.get)b(Element.prototype,Ka);else if(La&&La.get)b(HTMLElement.prototype,La);else{var d=Ma.call(document,\"div\");a.u(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){return Mb.call(this,\n!0).innerHTML},set:function(a){var b=\"template\"===this.localName?this.content:this;for(d.innerHTML=a;0<b.childNodes.length;)Na.call(b,b.childNodes[0]);for(;0<d.childNodes.length;)pa.call(b,d.childNodes[0])}})})}w(Element.prototype,\"setAttribute\",function(b,c){if(1!==this.__CE_state)return Nb.call(this,b,c);var d=Oa.call(this,b);Nb.call(this,b,c);c=Oa.call(this,b);a.attributeChangedCallback(this,b,d,c,null)});w(Element.prototype,\"setAttributeNS\",function(b,c,d){if(1!==this.__CE_state)return Ob.call(this,\nb,c,d);var e=qa.call(this,b,c);Ob.call(this,b,c,d);d=qa.call(this,b,c);a.attributeChangedCallback(this,c,e,d,b)});w(Element.prototype,\"removeAttribute\",function(b){if(1!==this.__CE_state)return Pb.call(this,b);var c=Oa.call(this,b);Pb.call(this,b);null!==c&&a.attributeChangedCallback(this,b,c,null,null)});w(Element.prototype,\"removeAttributeNS\",function(b,c){if(1!==this.__CE_state)return Qb.call(this,b,c);var d=qa.call(this,b,c);Qb.call(this,b,c);var e=qa.call(this,b,c);d!==e&&a.attributeChangedCallback(this,\nc,d,e,b)});Rb?c(HTMLElement.prototype,Rb):Sb?c(Element.prototype,Sb):console.warn(\"Custom Elements: `Element#insertAdjacentElement` was not patched.\");Tb(a,Element.prototype,{La:Id,append:Jd});Kd(a,{kb:Ld,jb:Md,replaceWith:Nd,remove:Od})}function Kd(a,b){var c=Element.prototype;c.before=function(c){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});b.kb.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=\nd[f],g instanceof Element&&a.b(g)};c.after=function(c){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});b.jb.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)};c.replaceWith=function(c){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});var g=n(this);b.replaceWith.apply(this,d);for(var h=0;h<f.length;h++)a.a(f[h]);\nif(g)for(a.a(this),f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)};c.remove=function(){var c=n(this);b.remove.call(this);c&&a.a(this)}}function Pd(a){function b(b,d){Object.defineProperty(b,\"textContent\",{enumerable:d.enumerable,configurable:!0,get:d.get,set:function(b){if(this.nodeType===Node.TEXT_NODE)d.set.call(this,b);else{var c=void 0;if(this.firstChild){var e=this.childNodes,h=e.length;if(0<h&&n(this)){c=Array(h);for(var m=0;m<h;m++)c[m]=e[m]}}d.set.call(this,b);if(c)for(b=0;b<c.length;b++)a.a(c[b])}}})}\nw(Node.prototype,\"insertBefore\",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Ub.call(this,b,d);if(n(this))for(d=0;d<c.length;d++)a.b(c[d]);return b}c=n(b);d=Ub.call(this,b,d);c&&a.a(b);n(this)&&a.b(b);return d});w(Node.prototype,\"appendChild\",function(b){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=pa.call(this,b);if(n(this))for(var e=0;e<c.length;e++)a.b(c[e]);return b}c=n(b);e=pa.call(this,b);c&&a.a(b);n(this)&&\na.b(b);return e});w(Node.prototype,\"cloneNode\",function(b){b=Mb.call(this,b);this.ownerDocument.__CE_hasRegistry?a.c(b):a.j(b);return b});w(Node.prototype,\"removeChild\",function(b){var c=n(b),e=Na.call(this,b);c&&a.a(b);return e});w(Node.prototype,\"replaceChild\",function(b,d){if(b instanceof DocumentFragment){var c=Array.prototype.slice.apply(b.childNodes);b=Vb.call(this,b,d);if(n(this))for(a.a(d),d=0;d<c.length;d++)a.b(c[d]);return b}c=n(b);var f=Vb.call(this,b,d),g=n(this);g&&a.a(d);c&&a.a(b);g&&\na.b(b);return f});Pa&&Pa.get?b(Node.prototype,Pa):a.u(function(a){b(a,{enumerable:!0,configurable:!0,get:function(){for(var a=[],b=0;b<this.childNodes.length;b++)a.push(this.childNodes[b].textContent);return a.join(\"\")},set:function(a){for(;this.firstChild;)Na.call(this,this.firstChild);pa.call(this,document.createTextNode(a))}})})}function Qd(a){w(Document.prototype,\"createElement\",function(b){if(this.__CE_hasRegistry){var c=a.f(b);if(c)return new c.constructor}b=Ma.call(this,b);a.g(b);return b});\nw(Document.prototype,\"importNode\",function(b,c){b=Rd.call(this,b,c);this.__CE_hasRegistry?a.c(b):a.j(b);return b});w(Document.prototype,\"createElementNS\",function(b,c){if(this.__CE_hasRegistry&&(null===b||\"http://www.w3.org/1999/xhtml\"===b)){var d=a.f(c);if(d)return new d.constructor}b=Sd.call(this,b,c);a.g(b);return b});Tb(a,Document.prototype,{La:Td,append:Ud})}function Tb(a,b,c){b.prepend=function(b){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof\nNode&&n(a)});c.La.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)};b.append=function(b){for(var d=[],f=0;f<arguments.length;++f)d[f-0]=arguments[f];f=d.filter(function(a){return a instanceof Node&&n(a)});c.append.apply(this,d);for(var g=0;g<f.length;g++)a.a(f[g]);if(n(this))for(f=0;f<d.length;f++)g=d[f],g instanceof Element&&a.b(g)}}function Vd(a){window.HTMLElement=function(){function b(){var b=this.constructor,d=a.C(b);if(!d)throw Error(\"The custom element being constructed was not registered with `customElements`.\");\nvar e=d.constructionStack;if(0===e.length)return e=Ma.call(document,d.localName),Object.setPrototypeOf(e,b.prototype),e.__CE_state=1,e.__CE_definition=d,a.g(e),e;d=e.length-1;var f=e[d];if(f===Wb)throw Error(\"The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.\");e[d]=Wb;Object.setPrototypeOf(f,b.prototype);a.g(f);return f}b.prototype=Wd.prototype;return b}()}function z(a){this.f=!1;this.a=a;this.h=new Map;this.g=function(a){return a()};this.b=!1;\nthis.c=[];this.i=new Qa(a,document)}function Xb(){var a=this;this.b=this.a=void 0;this.c=new Promise(function(b){a.b=b;a.a&&b(a.a)})}function Qa(a,b){this.b=a;this.a=b;this.N=void 0;this.b.c(this.a);\"loading\"===this.a.readyState&&(this.N=new MutationObserver(this.f.bind(this)),this.N.observe(this.a,{childList:!0,subtree:!0}))}function u(){this.s=new Map;this.l=new Map;this.i=[];this.h=!1}function l(a,b,c){if(a!==Yb)throw new TypeError(\"Illegal constructor\");a=document.createDocumentFragment();a.__proto__=\nl.prototype;a.D(b,c);return a}function ra(a){if(!a.__shady||void 0===a.__shady.firstChild){a.__shady=a.__shady||{};a.__shady.firstChild=Ra(a);a.__shady.lastChild=Sa(a);Zb(a);for(var b=a.__shady.childNodes=U(a),c=0,d;c<b.length&&(d=b[c]);c++)d.__shady=d.__shady||{},d.__shady.parentNode=a,d.__shady.nextSibling=b[c+1]||null,d.__shady.previousSibling=b[c-1]||null,$b(d)}}function Xd(a){var b=a&&a.N;b&&(b.ca.delete(a.ab),b.ca.size||(a.fb.__shady.X=null))}function Yd(a,b){a.__shady=a.__shady||{};a.__shady.X||\n(a.__shady.X=new sa);a.__shady.X.ca.add(b);var c=a.__shady.X;return{ab:b,N:c,fb:a,takeRecords:function(){return c.takeRecords()}}}function sa(){this.a=!1;this.addedNodes=[];this.removedNodes=[];this.ca=new Set}function Q(a,b){V[W]=a;V[W+1]=b;W+=2;2===W&&(Ta?Ta(X):Zd())}function $d(){return function(){return process.Fb(X)}}function ae(){return\"undefined\"!==typeof Ua?function(){Ua(X)}:Va()}function be(){var a=0,b=new ac(X),c=document.createTextNode(\"\");b.observe(c,{characterData:!0});return function(){c.data=\na=++a%2}}function ce(){var a=new MessageChannel;a.port1.onmessage=X;return function(){return a.port2.postMessage(0)}}function Va(){var a=setTimeout;return function(){return a(X,1)}}function X(){for(var a=0;a<W;a+=2)(0,V[a])(V[a+1]),V[a]=void 0,V[a+1]=void 0;W=0}function de(){try{var a=require(\"vertx\");Ua=a.Hb||a.Gb;return ae()}catch(b){return Va()}}function Wa(a,b){var c=this,d=new this.constructor(Y);void 0===d[ta]&&bc(d);var e=c.o;if(e){var f=arguments[e-1];Q(function(){return cc(e,d,f,c.m)})}else Xa(c,\nd,a,b);return d}function Ya(a){if(a&&\"object\"===typeof a&&a.constructor===this)return a;var b=new this(Y);ea(b,a);return b}function Y(){}function dc(a){try{return a.then}catch(b){return fa.error=b,fa}}function ee(a,b,c,d){try{a.call(b,c,d)}catch(e){return e}}function fe(a,b,c){Q(function(a){var d=!1,f=ee(c,b,function(c){d||(d=!0,b!==c?ea(a,c):J(a,c))},function(b){d||(d=!0,A(a,b))});!d&&f&&(d=!0,A(a,f))},a)}function ge(a,b){1===b.o?J(a,b.m):2===b.o?A(a,b.m):Xa(b,void 0,function(b){return ea(a,b)},\nfunction(b){return A(a,b)})}function ec(a,b,c){b.constructor===a.constructor&&c===Wa&&b.constructor.resolve===Ya?ge(a,b):c===fa?(A(a,fa.error),fa.error=null):void 0===c?J(a,b):\"function\"===typeof c?fe(a,b,c):J(a,b)}function ea(a,b){if(a===b)A(a,new TypeError(\"You cannot resolve a promise with itself\"));else{var c=typeof b;null===b||\"object\"!==c&&\"function\"!==c?J(a,b):ec(a,b,dc(b))}}function he(a){a.Ca&&a.Ca(a.m);Za(a)}function J(a,b){void 0===a.o&&(a.m=b,a.o=1,0!==a.U.length&&Q(Za,a))}function A(a,\nb){void 0===a.o&&(a.o=2,a.m=b,Q(he,a))}function Xa(a,b,c,d){var e=a.U,f=e.length;a.Ca=null;e[f]=b;e[f+1]=c;e[f+2]=d;0===f&&a.o&&Q(Za,a)}function Za(a){var b=a.U,c=a.o;if(0!==b.length){for(var d,e,f=a.m,g=0;g<b.length;g+=3)d=b[g],e=b[g+c],d?cc(c,d,e,f):e(f);a.U.length=0}}function fc(){this.error=null}function cc(a,b,c,d){var e=\"function\"===typeof c;if(e){try{var f=c(d)}catch(L){$a.error=L,f=$a}if(f===$a){var g=!0;var h=f.error;f.error=null}else var m=!0;if(b===f){A(b,new TypeError(\"A promises callback cannot return that same promise.\"));\nreturn}}else f=d,m=!0;void 0===b.o&&(e&&m?ea(b,f):g?A(b,h):1===a?J(b,f):2===a&&A(b,f))}function ie(a,b){try{b(function(b){ea(a,b)},function(b){A(a,b)})}catch(c){A(a,c)}}function bc(a){a[ta]=gc++;a.o=void 0;a.m=void 0;a.U=[]}function ha(a,b){this.eb=a;this.J=new a(Y);this.J[ta]||bc(this.J);hc(b)?(this.aa=this.length=b.length,this.m=Array(this.length),0===this.length?J(this.J,this.m):(this.length=this.length||0,this.cb(b),0===this.aa&&J(this.J,this.m))):A(this.J,Error(\"Array Methods must be provided an Array\"))}\nfunction q(a){this[ta]=gc++;this.m=this.o=void 0;this.U=[];if(Y!==a){if(\"function\"!==typeof a)throw new TypeError(\"You must pass a resolver function as the first argument to the promise constructor\");if(this instanceof q)ie(this,a);else throw new TypeError(\"Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.\");}}function Z(a){return a.__shady&&void 0!==a.__shady.firstChild}function H(a){return\"ShadyRoot\"===a.Wa}function ia(a){a=a.getRootNode();\nif(H(a))return a}function ab(a,b){if(a&&b)for(var c=Object.getOwnPropertyNames(b),d=0,e;d<c.length&&(e=c[d]);d++){var f=Object.getOwnPropertyDescriptor(b,e);f&&Object.defineProperty(a,e,f)}}function bb(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];for(d=0;d<c.length;d++)ab(a,c[d]);return a}function je(a,b){for(var c in b)a[c]=b[c]}function ic(a){cb.push(a);db.textContent=jc++}function kc(a){eb||(eb=!0,ic(ua));ja.push(a)}function ua(){eb=!1;for(var a=!!ja.length;ja.length;)ja.shift()();\nreturn a}function ke(a,b){var c=b.getRootNode();return a.map(function(a){var b=c===a.target.getRootNode();if(b&&a.addedNodes){if(b=Array.from(a.addedNodes).filter(function(a){return c===a.getRootNode()}),b.length)return a=Object.create(a),Object.defineProperty(a,\"addedNodes\",{value:b,configurable:!0}),a}else if(b)return a}).filter(function(a){return a})}function lc(a){switch(a){case \"&\":return\"&amp;\";case \"<\":return\"&lt;\";case \">\":return\"&gt;\";case '\"':return\"&quot;\";case \"\\u00a0\":return\"&nbsp;\"}}\nfunction mc(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=!0;return b}function fb(a,b){\"template\"===a.localName&&(a=a.content);for(var c=\"\",d=b?b(a):a.childNodes,e=0,f=d.length,g;e<f&&(g=d[e]);e++){a:{var h=g;var m=a;var L=b;switch(h.nodeType){case Node.ELEMENT_NODE:for(var k=h.localName,l=\"<\"+k,n=h.attributes,p=0;m=n[p];p++)l+=\" \"+m.name+'=\"'+m.value.replace(le,lc)+'\"';l+=\">\";h=me[k]?l:l+fb(h,L)+\"</\"+k+\">\";break a;case Node.TEXT_NODE:h=h.data;h=m&&ne[m.localName]?h:h.replace(oe,lc);break a;case Node.COMMENT_NODE:h=\n\"\\x3c!--\"+h.data+\"--\\x3e\";break a;default:throw window.console.error(h),Error(\"not implemented\");}}c+=h}return c}function aa(a){B.currentNode=a;return B.parentNode()}function Ra(a){B.currentNode=a;return B.firstChild()}function Sa(a){B.currentNode=a;return B.lastChild()}function nc(a){B.currentNode=a;return B.previousSibling()}function oc(a){B.currentNode=a;return B.nextSibling()}function U(a){var b=[];B.currentNode=a;for(a=B.firstChild();a;)b.push(a),a=B.nextSibling();return b}function pc(a){C.currentNode=\na;return C.parentNode()}function qc(a){C.currentNode=a;return C.firstChild()}function rc(a){C.currentNode=a;return C.lastChild()}function sc(a){C.currentNode=a;return C.previousSibling()}function tc(a){C.currentNode=a;return C.nextSibling()}function uc(a){var b=[];C.currentNode=a;for(a=C.firstChild();a;)b.push(a),a=C.nextSibling();return b}function vc(a){return fb(a,function(a){return U(a)})}function wc(a){switch(a.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:a=document.createTreeWalker(a,\nNodeFilter.SHOW_TEXT,null,!1);for(var b=\"\",c;c=a.nextNode();)b+=c.nodeValue;return b;default:return a.nodeValue}}function M(a,b,c){for(var d in b){var e=Object.getOwnPropertyDescriptor(a,d);e&&e.configurable||!e&&c?Object.defineProperty(a,d,b[d]):c&&console.warn(\"Could not define\",d,\"on\",a)}}function R(a){M(a,xc);M(a,gb);M(a,hb)}function yc(a,b,c){$b(a);c=c||null;a.__shady=a.__shady||{};b.__shady=b.__shady||{};c&&(c.__shady=c.__shady||{});a.__shady.previousSibling=c?c.__shady.previousSibling:b.lastChild;\nvar d=a.__shady.previousSibling;d&&d.__shady&&(d.__shady.nextSibling=a);(d=a.__shady.nextSibling=c)&&d.__shady&&(d.__shady.previousSibling=a);a.__shady.parentNode=b;c?c===b.__shady.firstChild&&(b.__shady.firstChild=a):(b.__shady.lastChild=a,b.__shady.firstChild||(b.__shady.firstChild=a));b.__shady.childNodes=null}function ib(a,b,c){if(b===a)throw Error(\"Failed to execute 'appendChild' on 'Node': The new child element contains the parent.\");if(c){var d=c.__shady&&c.__shady.parentNode;if(void 0!==d&&\nd!==a||void 0===d&&aa(c)!==a)throw Error(\"Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.\");}if(c===b)return b;b.parentNode&&jb(b.parentNode,b);d=ia(a);var e;if(e=d)a:{if(!b.__noInsertionPoint){var f;\"slot\"===b.localName?f=[b]:b.querySelectorAll&&(f=b.querySelectorAll(\"slot\"));if(f&&f.length){e=f;break a}}e=void 0}f=e;d&&(\"slot\"===a.localName||f)&&d.M();if(Z(a)){e=c;Zb(a);a.__shady=a.__shady||{};void 0!==a.__shady.firstChild&&\n(a.__shady.childNodes=null);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){for(var g=b.childNodes,h=0;h<g.length;h++)yc(g[h],a,e);b.__shady=b.__shady||{};e=void 0!==b.__shady.firstChild?null:void 0;b.__shady.firstChild=b.__shady.lastChild=e;b.__shady.childNodes=e}else yc(b,a,e);if(kb(a)){a.__shady.root.M();var m=!0}else a.__shady.root&&(m=!0)}m||(m=H(a)?a.host:a,c?(c=zc(c),lb.call(m,b,c)):Ac.call(m,b));Bc(a,b);f&&d.$a(f);return b}function jb(a,b){if(b.parentNode!==a)throw Error(\"The node to be removed is not a child of this node: \"+\nb);var c=ia(b);if(Z(a)){b.__shady=b.__shady||{};a.__shady=a.__shady||{};b===a.__shady.firstChild&&(a.__shady.firstChild=b.__shady.nextSibling);b===a.__shady.lastChild&&(a.__shady.lastChild=b.__shady.previousSibling);var d=b.__shady.previousSibling;var e=b.__shady.nextSibling;d&&(d.__shady=d.__shady||{},d.__shady.nextSibling=e);e&&(e.__shady=e.__shady||{},e.__shady.previousSibling=d);b.__shady.parentNode=b.__shady.previousSibling=b.__shady.nextSibling=void 0;void 0!==a.__shady.childNodes&&(a.__shady.childNodes=\nnull);if(kb(a)){a.__shady.root.M();var f=!0}}Cc(b);c&&((e=a&&\"slot\"===a.localName)&&(f=!0),((d=c.gb(b))||e)&&c.M());f||(f=H(a)?a.host:a,(!a.__shady.root&&\"slot\"!==b.localName||f===aa(b))&&ka.call(f,b));Bc(a,null,b);return b}function Cc(a){if(a.__shady&&void 0!==a.__shady.ta)for(var b=a.childNodes,c=0,d=b.length,e;c<d&&(e=b[c]);c++)Cc(e);a.__shady&&(a.__shady.ta=void 0)}function zc(a){var b=a;a&&\"slot\"===a.localName&&(b=(b=a.__shady&&a.__shady.V)&&b.length?b[0]:zc(a.nextSibling));return b}function kb(a){return(a=\na&&a.__shady&&a.__shady.root)&&a.Ba()}function Dc(a,b){\"slot\"===b?(a=a.parentNode,kb(a)&&a.__shady.root.M()):\"slot\"===a.localName&&\"name\"===b&&(b=ia(a))&&(b.ib(a),b.M())}function Bc(a,b,c){if(a=a.__shady&&a.__shady.X)b&&a.addedNodes.push(b),c&&a.removedNodes.push(c),a.vb()}function Ec(a){if(a&&a.nodeType){a.__shady=a.__shady||{};var b=a.__shady.ta;void 0===b&&(H(a)?b=a:b=(b=a.parentNode)?Ec(b):a,document.documentElement.contains(a)&&(a.__shady.ta=b));return b}}function va(a,b,c){var d=[];Fc(a.childNodes,\nb,c,d);return d}function Fc(a,b,c,d){for(var e=0,f=a.length,g;e<f&&(g=a[e]);e++){var h;if(h=g.nodeType===Node.ELEMENT_NODE){h=g;var m=b,L=c,k=d,l=m(h);l&&k.push(h);L&&L(l)?h=l:(Fc(h.childNodes,m,L,k),h=void 0)}if(h)break}}function Gc(a){a=a.getRootNode();H(a)&&a.Ea()}function Hc(a,b,c){wa||(wa=window.ShadyCSS&&window.ShadyCSS.ScopingShim);wa&&\"class\"===b?wa.setElementClass(a,c):(Ic.call(a,b,c),Dc(a,b))}function Jc(a,b){if(a.ownerDocument!==document)return mb.call(document,a,b);var c=mb.call(document,\na,!1);if(b){a=a.childNodes;b=0;for(var d;b<a.length;b++)d=Jc(a[b],!0),c.appendChild(d)}return c}function nb(a,b){var c=[],d=a;for(a=a===window?window:a.getRootNode();d;)c.push(d),d=d.assignedSlot?d.assignedSlot:d.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&d.host&&(b||d!==a)?d.host:d.parentNode;c[c.length-1]===document&&c.push(window);return c}function Kc(a,b){if(!H)return a;a=nb(a,!0);for(var c=0,d,e,f,g;c<b.length;c++)if(d=b[c],f=d===window?window:d.getRootNode(),f!==e&&(g=a.indexOf(f),e=f),!H(f)||\n-1<g)return d}function ob(a){function b(b,d){b=new a(b,d);b.ja=d&&!!d.composed;return b}je(b,a);b.prototype=a.prototype;return b}function Lc(a,b,c){if(c=b.__handlers&&b.__handlers[a.type]&&b.__handlers[a.type][c])for(var d=0,e;(e=c[d])&&a.target!==a.relatedTarget&&(e.call(b,a),!a.Ua);d++);}function pe(a){var b=a.composedPath();Object.defineProperty(a,\"currentTarget\",{get:function(){return d},configurable:!0});for(var c=b.length-1;0<=c;c--){var d=b[c];Lc(a,d,\"capture\");if(a.ka)return}Object.defineProperty(a,\n\"eventPhase\",{get:function(){return Event.AT_TARGET}});var e;for(c=0;c<b.length;c++){d=b[c];var f=d.__shady&&d.__shady.root;if(0===c||f&&f===e)if(Lc(a,d,\"bubble\"),d!==window&&(e=d.getRootNode()),a.ka)break}}function Mc(a,b,c,d,e,f){for(var g=0;g<a.length;g++){var h=a[g],m=h.type,k=h.capture,l=h.once,n=h.passive;if(b===h.node&&c===m&&d===k&&e===l&&f===n)return g}return-1}function Nc(a,b,c){if(b){if(\"object\"===typeof c){var d=!!c.capture;var e=!!c.once;var f=!!c.passive}else d=!!c,f=e=!1;var g=c&&c.la||\nthis,h=b.$;if(h){if(-1<Mc(h,g,a,d,e,f))return}else b.$=[];h=function(d){e&&this.removeEventListener(a,b,c);d.__target||Oc(d);if(g!==this){var f=Object.getOwnPropertyDescriptor(d,\"currentTarget\");Object.defineProperty(d,\"currentTarget\",{get:function(){return g},configurable:!0})}if(d.composed||-1<d.composedPath().indexOf(g))if(d.target===d.relatedTarget)d.eventPhase===Event.BUBBLING_PHASE&&d.stopImmediatePropagation();else if(d.eventPhase===Event.CAPTURING_PHASE||d.bubbles||d.target===g){var h=\"object\"===\ntypeof b&&b.handleEvent?b.handleEvent(d):b.call(g,d);g!==this&&(f?(Object.defineProperty(d,\"currentTarget\",f),f=null):delete d.currentTarget);return h}};b.$.push({node:this,type:a,capture:d,once:e,passive:f,yb:h});pb[a]?(this.__handlers=this.__handlers||{},this.__handlers[a]=this.__handlers[a]||{capture:[],bubble:[]},this.__handlers[a][d?\"capture\":\"bubble\"].push(h)):(this instanceof Window?Pc:Qc).call(this,a,h,c)}}function Rc(a,b,c){if(b){if(\"object\"===typeof c){var d=!!c.capture;var e=!!c.once;var f=\n!!c.passive}else d=!!c,f=e=!1;var g=c&&c.la||this,h=void 0;var m=null;try{m=b.$}catch(L){}m&&(e=Mc(m,g,a,d,e,f),-1<e&&(h=m.splice(e,1)[0].yb,m.length||(b.$=void 0)));(this instanceof Window?Sc:Tc).call(this,a,h||b,c);h&&pb[a]&&this.__handlers&&this.__handlers[a]&&(a=this.__handlers[a][d?\"capture\":\"bubble\"],h=a.indexOf(h),-1<h&&a.splice(h,1))}}function qe(){for(var a in pb)window.addEventListener(a,function(a){a.__target||(Oc(a),pe(a))},!0)}function Oc(a){a.__target=a.target;a.za=a.relatedTarget;if(D.W){var b=\nUc,c=Object.getPrototypeOf(a);if(!c.hasOwnProperty(\"__patchProto\")){var d=Object.create(c);d.Ab=c;ab(d,b);c.__patchProto=d}a.__proto__=c.__patchProto}else ab(a,Uc)}function la(a,b){return{index:a,Y:[],ba:b}}function re(a,b,c,d){var e=0,f=0,g=0,h=0,m=Math.min(b-e,d-f);if(0==e&&0==f)a:{for(g=0;g<m;g++)if(a[g]!==c[g])break a;g=m}if(b==a.length&&d==c.length){h=a.length;for(var k=c.length,l=0;l<m-g&&se(a[--h],c[--k]);)l++;h=l}e+=g;f+=g;b-=h;d-=h;if(0==b-e&&0==d-f)return[];if(e==b){for(b=la(e,0);f<d;)b.Y.push(c[f++]);\nreturn[b]}if(f==d)return[la(e,b-e)];m=e;g=f;d=d-g+1;h=b-m+1;b=Array(d);for(k=0;k<d;k++)b[k]=Array(h),b[k][0]=k;for(k=0;k<h;k++)b[0][k]=k;for(k=1;k<d;k++)for(l=1;l<h;l++)if(a[m+l-1]===c[g+k-1])b[k][l]=b[k-1][l-1];else{var n=b[k-1][l]+1,p=b[k][l-1]+1;b[k][l]=n<p?n:p}m=b.length-1;g=b[0].length-1;d=b[m][g];for(a=[];0<m||0<g;)0==m?(a.push(2),g--):0==g?(a.push(3),m--):(h=b[m-1][g-1],k=b[m-1][g],l=b[m][g-1],n=k<l?k<h?k:h:l<h?l:h,n==h?(h==d?a.push(0):(a.push(1),d=h),m--,g--):n==k?(a.push(3),m--,d=k):(a.push(2),\ng--,d=l));a.reverse();b=void 0;m=[];for(g=0;g<a.length;g++)switch(a[g]){case 0:b&&(m.push(b),b=void 0);e++;f++;break;case 1:b||(b=la(e,0));b.ba++;e++;b.Y.push(c[f]);f++;break;case 2:b||(b=la(e,0));b.ba++;e++;break;case 3:b||(b=la(e,0)),b.Y.push(c[f]),f++}b&&m.push(b);return m}function se(a,b){return a===b}function Vc(a){var b=[];do b.unshift(a);while(a=a.parentNode);return b}function Wc(a){Gc(a);return a.__shady&&a.__shady.assignedSlot||null}function N(a,b){for(var c=Object.getOwnPropertyNames(b),\nd=0;d<c.length;d++){var e=c[d],f=Object.getOwnPropertyDescriptor(b,e);f.value?a[e]=f.value:Object.defineProperty(a,e,f)}}function te(){var a=window.customElements&&window.customElements.nativeHTMLElement||HTMLElement;N(window.Node.prototype,ue);N(window.Window.prototype,ve);N(window.Text.prototype,we);N(window.DocumentFragment.prototype,qb);N(window.Element.prototype,Xc);N(window.Document.prototype,Yc);window.HTMLSlotElement&&N(window.HTMLSlotElement.prototype,Zc);N(a.prototype,xe);D.W&&(R(window.Node.prototype),\nR(window.Text.prototype),R(window.DocumentFragment.prototype),R(window.Element.prototype),R(a.prototype),R(window.Document.prototype),window.HTMLSlotElement&&R(window.HTMLSlotElement.prototype))}function $c(a){var b=ye.has(a);a=/^[a-z][.0-9_a-z]*-[\\-.0-9_a-z]*$/.test(a);return!b&&a}function n(a){var b=a.isConnected;if(void 0!==b)return b;for(;a&&!(a.__CE_isImportDocument||a instanceof Document);)a=a.parentNode||(window.ShadowRoot&&a instanceof ShadowRoot?a.host:void 0);return!(!a||!(a.__CE_isImportDocument||\na instanceof Document))}function rb(a,b){for(;b&&b!==a&&!b.nextSibling;)b=b.parentNode;return b&&b!==a?b.nextSibling:null}function P(a,b,c){c=c?c:new Set;for(var d=a;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d;b(e);var f=e.localName;if(\"link\"===f&&\"import\"===e.getAttribute(\"rel\")){d=e.import;if(d instanceof Node&&!c.has(d))for(c.add(d),d=d.firstChild;d;d=d.nextSibling)P(d,b,c);d=rb(a,e);continue}else if(\"template\"===f){d=rb(a,e);continue}if(e=e.__CE_shadowRoot)for(e=e.firstChild;e;e=e.nextSibling)P(e,\nb,c)}d=d.firstChild?d.firstChild:rb(a,d)}}function w(a,b,c){a[b]=c}function sb(a){a=a.replace(G.mb,\"\").replace(G.port,\"\");var b=ad,c=a,d=new Ja;d.start=0;d.end=c.length;for(var e=d,f=0,g=c.length;f<g;f++)if(\"{\"===c[f]){e.rules||(e.rules=[]);var h=e,m=h.rules[h.rules.length-1]||null;e=new Ja;e.start=f+1;e.parent=h;e.previous=m;h.rules.push(e)}else\"}\"===c[f]&&(e.end=f+1,e=e.parent||d);return b(d,a)}function ad(a,b){var c=b.substring(a.start,a.end-1);a.parsedCssText=a.cssText=c.trim();a.parent&&(c=b.substring(a.previous?\na.previous.end:a.parent.start,a.start-1),c=ze(c),c=c.replace(G.Ka,\" \"),c=c.substring(c.lastIndexOf(\";\")+1),c=a.parsedSelector=a.selector=c.trim(),a.atRule=0===c.indexOf(\"@\"),a.atRule?0===c.indexOf(\"@media\")?a.type=K.MEDIA_RULE:c.match(G.rb)&&(a.type=K.ia,a.keyframesName=a.selector.split(G.Ka).pop()):a.type=0===c.indexOf(\"--\")?K.va:K.STYLE_RULE);if(c=a.rules)for(var d=0,e=c.length,f;d<e&&(f=c[d]);d++)ad(f,b);return a}function ze(a){return a.replace(/\\\\([0-9a-f]{1,6})\\s/gi,function(a,c){a=c;for(c=6-\na.length;c--;)a=\"0\"+a;return\"\\\\\"+a})}function bd(a,b,c){c=void 0===c?\"\":c;var d=\"\";if(a.cssText||a.rules){var e=a.rules,f;if(f=e)f=e[0],f=!(f&&f.selector&&0===f.selector.indexOf(\"--\"));if(f){f=0;for(var g=e.length,h;f<g&&(h=e[f]);f++)d=bd(h,b,d)}else b?b=a.cssText:(b=a.cssText,b=b.replace(G.Fa,\"\").replace(G.Ja,\"\"),b=b.replace(G.sb,\"\").replace(G.xb,\"\")),(d=b.trim())&&(d=\"  \"+d+\"\\n\")}d&&(a.selector&&(c+=a.selector+\" {\\n\"),c+=d,a.selector&&(c+=\"}\\n\\n\"));return c}function cd(a){x=a&&a.shimcssproperties?\n!1:y||!(navigator.userAgent.match(/AppleWebKit\\/601|Edge\\/15/)||!window.CSS||!CSS.supports||!CSS.supports(\"box-shadow\",\"0 0 0 var(--foo)\"))}function ba(a,b){if(!a)return\"\";\"string\"===typeof a&&(a=sb(a));b&&ca(a,b);return bd(a,x)}function xa(a){!a.__cssRules&&a.textContent&&(a.__cssRules=sb(a.textContent));return a.__cssRules||null}function dd(a){return!!a.parent&&a.parent.type===K.ia}function ca(a,b,c,d){if(a){var e=!1,f=a.type;if(d&&f===K.MEDIA_RULE){var g=a.selector.match(Ae);g&&(window.matchMedia(g[1]).matches||\n(e=!0))}f===K.STYLE_RULE?b(a):c&&f===K.ia?c(a):f===K.va&&(e=!0);if((a=a.rules)&&!e){e=0;f=a.length;for(var h;e<f&&(h=a[e]);e++)ca(h,b,c,d)}}}function tb(a,b,c,d){var e=document.createElement(\"style\");b&&e.setAttribute(\"scope\",b);e.textContent=a;ed(e,c,d);return e}function ed(a,b,c){b=b||document.head;b.insertBefore(a,c&&c.nextSibling||b.firstChild);S?a.compareDocumentPosition(S)===Node.DOCUMENT_POSITION_PRECEDING&&(S=a):S=a}function fd(a,b){var c=a.indexOf(\"var(\");if(-1===c)return b(a,\"\",\"\",\"\");a:{var d=\n0;var e=c+3;for(var f=a.length;e<f;e++)if(\"(\"===a[e])d++;else if(\")\"===a[e]&&0===--d)break a;e=-1}d=a.substring(c+4,e);c=a.substring(0,c);a=fd(a.substring(e+1),b);e=d.indexOf(\",\");return-1===e?b(c,d.trim(),\"\",a):b(c,d.substring(0,e).trim(),d.substring(e+1).trim(),a)}function ya(a,b){y?a.setAttribute(\"class\",b):window.ShadyDOM.nativeMethods.setAttribute.call(a,\"class\",b)}function T(a){var b=a.localName,c=\"\";b?-1<b.indexOf(\"-\")||(c=b,b=a.getAttribute&&a.getAttribute(\"is\")||\"\"):(b=a.is,c=a.extends);\nreturn{is:b,Z:c}}function gd(a){for(var b=0;b<a.length;b++){var c=a[b];if(c.target!==document.documentElement&&c.target!==document.head)for(var d=0;d<c.addedNodes.length;d++){var e=c.addedNodes[d];if(e.nodeType===Node.ELEMENT_NODE){var f=e.getRootNode();var g=e;var h=[];g.classList?h=Array.from(g.classList):g instanceof window.SVGElement&&g.hasAttribute(\"class\")&&(h=g.getAttribute(\"class\").split(/\\s+/));g=h;h=g.indexOf(v.c);(g=-1<h?g[h+1]:\"\")&&f===e.ownerDocument?v.a(e,g,!0):f.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&\n(f=f.host)&&(f=T(f).is,g!==f&&(g&&v.a(e,g,!0),v.a(e,f)))}}}}function Be(a){if(a=za[a])a._applyShimCurrentVersion=a._applyShimCurrentVersion||0,a._applyShimValidatingVersion=a._applyShimValidatingVersion||0,a._applyShimNextVersion=(a._applyShimNextVersion||0)+1}function hd(a){return a._applyShimCurrentVersion===a._applyShimNextVersion}function Ce(a){a._applyShimValidatingVersion=a._applyShimNextVersion;a.b||(a.b=!0,De.then(function(){a._applyShimCurrentVersion=a._applyShimNextVersion;a.b=!1}))}function Jb(a){requestAnimationFrame(function(){id?\nid(a):(ub||(ub=new Promise(function(a){vb=a}),\"complete\"===document.readyState?vb():document.addEventListener(\"readystatechange\",function(){\"complete\"===document.readyState&&vb()})),ub.then(function(){a&&a()}))})}(function(){if(!function(){var a=document.createEvent(\"Event\");a.initEvent(\"foo\",!0,!0);a.preventDefault();return a.defaultPrevented}()){var a=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(a.call(this),Object.defineProperty(this,\"defaultPrevented\",\n{get:function(){return!0},configurable:!0}))}}var b=/Trident/.test(navigator.userAgent);if(!window.CustomEvent||b&&\"function\"!==typeof window.CustomEvent)window.CustomEvent=function(a,b){b=b||{};var c=document.createEvent(\"CustomEvent\");c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c},window.CustomEvent.prototype=window.Event.prototype;if(!window.Event||b&&\"function\"!==typeof window.Event){var c=window.Event;window.Event=function(a,b){b=b||{};var c=document.createEvent(\"Event\");\nc.initEvent(a,!!b.bubbles,!!b.cancelable);return c};if(c)for(var d in c)window.Event[d]=c[d];window.Event.prototype=c.prototype}if(!window.MouseEvent||b&&\"function\"!==typeof window.MouseEvent){b=window.MouseEvent;window.MouseEvent=function(a,b){b=b||{};var c=document.createEvent(\"MouseEvent\");c.initMouseEvent(a,!!b.bubbles,!!b.cancelable,b.view||window,b.detail,b.screenX,b.screenY,b.clientX,b.clientY,b.ctrlKey,b.altKey,b.shiftKey,b.metaKey,b.button,b.relatedTarget);return c};if(b)for(d in b)window.MouseEvent[d]=\nb[d];window.MouseEvent.prototype=b.prototype}Array.from||(Array.from=function(a){return[].slice.call(a)});Object.assign||(Object.assign=function(a,b){for(var c=[].slice.call(arguments,1),d=0,e;d<c.length;d++)if(e=c[d])for(var f=a,k=e,l=Object.getOwnPropertyNames(k),n=0;n<l.length;n++)e=l[n],f[e]=k[e];return a})})(window.WebComponents);(function(){function a(){}var b=\"undefined\"===typeof HTMLTemplateElement;/Trident/.test(navigator.userAgent)&&function(){var a=Document.prototype.importNode;Document.prototype.importNode=\nfunction(){var b=a.apply(this,arguments);if(b.nodeType===Node.DOCUMENT_FRAGMENT_NODE){var c=this.createDocumentFragment();c.appendChild(b);return c}return b}}();var c=Node.prototype.cloneNode,d=Document.prototype.createElement,e=Document.prototype.importNode,f=function(){if(!b){var a=document.createElement(\"template\"),c=document.createElement(\"template\");c.content.appendChild(document.createElement(\"div\"));a.content.appendChild(c);a=a.cloneNode(!0);return 0===a.content.childNodes.length||0===a.content.firstChild.content.childNodes.length||\n!(document.createDocumentFragment().cloneNode()instanceof DocumentFragment)}}();if(b){var g=function(a){switch(a){case \"&\":return\"&amp;\";case \"<\":return\"&lt;\";case \">\":return\"&gt;\";case \"\\u00a0\":return\"&nbsp;\"}},h=function(b){Object.defineProperty(b,\"innerHTML\",{get:function(){for(var a=\"\",b=this.content.firstChild;b;b=b.nextSibling)a+=b.outerHTML||b.data.replace(r,g);return a},set:function(b){m.body.innerHTML=b;for(a.b(m);this.content.firstChild;)this.content.removeChild(this.content.firstChild);\nfor(;m.body.firstChild;)this.content.appendChild(m.body.firstChild)},configurable:!0})},m=document.implementation.createHTMLDocument(\"template\"),k=!0,l=document.createElement(\"style\");l.textContent=\"template{display:none;}\";var n=document.head;n.insertBefore(l,n.firstElementChild);a.prototype=Object.create(HTMLElement.prototype);var p=!document.createElement(\"div\").hasOwnProperty(\"innerHTML\");a.O=function(b){if(!b.content){b.content=m.createDocumentFragment();for(var c;c=b.firstChild;)b.content.appendChild(c);\nif(p)b.__proto__=a.prototype;else if(b.cloneNode=function(b){return a.a(this,b)},k)try{h(b)}catch(cf){k=!1}a.b(b.content)}};h(a.prototype);a.b=function(b){b=b.querySelectorAll(\"template\");for(var c=0,d=b.length,e;c<d&&(e=b[c]);c++)a.O(e)};document.addEventListener(\"DOMContentLoaded\",function(){a.b(document)});Document.prototype.createElement=function(){var b=d.apply(this,arguments);\"template\"===b.localName&&a.O(b);return b};var r=/[&\\u00A0<>]/g}if(b||f)a.a=function(a,b){var d=c.call(a,!1);this.O&&\nthis.O(d);b&&(d.content.appendChild(c.call(a.content,!0)),this.ra(d.content,a.content));return d},a.prototype.cloneNode=function(b){return a.a(this,b)},a.ra=function(a,b){if(b.querySelectorAll){b=b.querySelectorAll(\"template\");a=a.querySelectorAll(\"template\");for(var c=0,d=a.length,e,f;c<d;c++)f=b[c],e=a[c],this.O&&this.O(f),e.parentNode.replaceChild(f.cloneNode(!0),e)}},Node.prototype.cloneNode=function(b){if(this instanceof DocumentFragment)if(b)var d=this.ownerDocument.importNode(this,!0);else return this.ownerDocument.createDocumentFragment();\nelse d=c.call(this,b);b&&a.ra(d,this);return d},Document.prototype.importNode=function(b,c){if(\"template\"===b.localName)return a.a(b,c);var d=e.call(this,b,c);c&&a.ra(d,b);return d},f&&(window.HTMLTemplateElement.prototype.cloneNode=function(b){return a.a(this,b)});b&&(window.HTMLTemplateElement=a)})();var wb;Array.isArray?wb=Array.isArray:wb=function(a){return\"[object Array]\"===Object.prototype.toString.call(a)};var hc=wb,W=0,Ua,Ta,jd=\"undefined\"!==typeof window?window:void 0,kd=jd||{},ac=kd.MutationObserver||\nkd.WebKitMutationObserver,Ee=\"undefined\"!==typeof Uint8ClampedArray&&\"undefined\"!==typeof importScripts&&\"undefined\"!==typeof MessageChannel,V=Array(1E3);var Zd=\"undefined\"===typeof self&&\"undefined\"!==typeof process&&\"[object process]\"==={}.toString.call(process)?$d():ac?be():Ee?ce():jd||\"function\"!==typeof require?Va():de();var ta=Math.random().toString(36).substring(16),fa=new fc,$a=new fc,gc=0;ha.prototype.cb=function(a){for(var b=0;void 0===this.o&&b<a.length;b++)this.bb(a[b],b)};ha.prototype.bb=\nfunction(a,b){var c=this.eb,d=c.resolve;d===Ya?(d=dc(a),d===Wa&&void 0!==a.o?this.oa(a.o,b,a.m):\"function\"!==typeof d?(this.aa--,this.m[b]=a):c===q?(c=new c(Y),ec(c,a,d),this.pa(c,b)):this.pa(new c(function(b){return b(a)}),b)):this.pa(d(a),b)};ha.prototype.oa=function(a,b,c){var d=this.J;void 0===d.o&&(this.aa--,2===a?A(d,c):this.m[b]=c);0===this.aa&&J(d,this.m)};ha.prototype.pa=function(a,b){var c=this;Xa(a,void 0,function(a){return c.oa(1,b,a)},function(a){return c.oa(2,b,a)})};q.g=function(a){return(new ha(this,\na)).J};q.h=function(a){var b=this;return hc(a)?new b(function(c,d){for(var e=a.length,f=0;f<e;f++)b.resolve(a[f]).then(c,d)}):new b(function(a,b){return b(new TypeError(\"You must pass an array to race.\"))})};q.resolve=Ya;q.i=function(a){var b=new this(Y);A(b,a);return b};q.f=function(a){Ta=a};q.c=function(a){Q=a};q.b=Q;q.prototype={constructor:q,then:Wa};q.a=function(){if(\"undefined\"!==typeof global)var a=global;else if(\"undefined\"!==typeof self)a=self;else try{a=Function(\"return this\")()}catch(d){throw Error(\"polyfill failed because global object is unavailable in this environment\");\n}var b=a.Promise;if(b){var c=null;try{c=Object.prototype.toString.call(b.resolve())}catch(d){}if(\"[object Promise]\"===c&&!b.Db)return}a.Promise=q};q.Promise=q;q.a();(function(a){function b(a,b){if(\"function\"===typeof window.CustomEvent)return new CustomEvent(a,b);var c=document.createEvent(\"CustomEvent\");c.initCustomEvent(a,!!b.bubbles,!!b.cancelable,b.detail);return c}function c(a){if(n)return a.ownerDocument!==document?a.ownerDocument:null;var b=a.__importDoc;if(!b&&a.parentNode){b=a.parentNode;\nif(\"function\"===typeof b.closest)b=b.closest(\"link[rel=import]\");else for(;!h(b)&&(b=b.parentNode););a.__importDoc=b}return b}function d(a){var b=document.querySelectorAll(\"link[rel=import]:not(import-dependency)\"),c=b.length;c?l(b,function(b){return g(b,function(){0===--c&&a()})}):a()}function e(a){function b(){\"loading\"!==document.readyState&&document.body&&(document.removeEventListener(\"readystatechange\",b),a())}document.addEventListener(\"readystatechange\",b);b()}function f(a){e(function(){return d(function(){return a&&\na()})})}function g(a,b){if(a.__loaded)b&&b();else if(\"script\"===a.localName&&!a.src||\"style\"===a.localName&&!a.firstChild)a.__loaded=!0,b&&b();else{var c=function(d){a.removeEventListener(d.type,c);a.__loaded=!0;b&&b()};a.addEventListener(\"load\",c);x&&\"style\"===a.localName||a.addEventListener(\"error\",c)}}function h(a){return a.nodeType===Node.ELEMENT_NODE&&\"link\"===a.localName&&\"import\"===a.rel}function k(){var a=this;this.a={};this.b=0;this.f=new MutationObserver(function(b){return a.l(b)});this.f.observe(document.head,\n{childList:!0,subtree:!0});this.c(document)}function l(a,b,c){var d=a?a.length:0,e=c?-1:1;for(c=c?d-1:0;c<d&&0<=c;c+=e)b(a[c],c)}var n=\"import\"in document.createElement(\"link\"),p=null;!1===\"currentScript\"in document&&Object.defineProperty(document,\"currentScript\",{get:function(){return p||(\"complete\"!==document.readyState?document.scripts[document.scripts.length-1]:null)},configurable:!0});var r=/(^\\/)|(^#)|(^[\\w-\\d]*:)/,t=/(url\\()([^)]*)(\\))/g,v=/(@import[\\s]+(?!url\\())([^;]*)(;)/g,y=/(<link[^>]*)(rel=['|\"]?stylesheet['|\"]?[^>]*>)/g,\nq={nb:function(a,b){a.href&&a.setAttribute(\"href\",q.ua(a.getAttribute(\"href\"),b));a.src&&a.setAttribute(\"src\",q.ua(a.getAttribute(\"src\"),b));if(\"style\"===a.localName){var c=q.Ma(a.textContent,b,t);a.textContent=q.Ma(c,b,v)}},Ma:function(a,b,c){return a.replace(c,function(a,c,d,e){a=d.replace(/[\"']/g,\"\");b&&(a=q.Na(a,b));return c+\"'\"+a+\"'\"+e})},ua:function(a,b){return a&&r.test(a)?a:q.Na(a,b)},Na:function(a,b){if(void 0===q.ma){q.ma=!1;try{var c=new URL(\"b\",\"http://a\");c.pathname=\"c%20d\";q.ma=\"http://a/c%20d\"===\nc.href}catch(df){}}if(q.ma)return(new URL(a,b)).href;c=q.Za;c||(c=document.implementation.createHTMLDocument(\"temp\"),q.Za=c,c.xa=c.createElement(\"base\"),c.head.appendChild(c.xa),c.wa=c.createElement(\"a\"));c.xa.href=b;c.wa.href=a;return c.wa.href||a}},z={async:!0,load:function(a,b,c){if(a)if(a.match(/^data:/)){a=a.split(\",\");var d=a[1];d=-1<a[0].indexOf(\";base64\")?atob(d):decodeURIComponent(d);b(d)}else{var e=new XMLHttpRequest;e.open(\"GET\",a,z.async);e.onload=function(){var a=e.responseURL||e.getResponseHeader(\"Location\");\na&&0===a.indexOf(\"/\")&&(a=(location.origin||location.protocol+\"//\"+location.host)+a);var d=e.response||e.responseText;304===e.status||0===e.status||200<=e.status&&300>e.status?b(d,a):c(d)};e.send()}else c(\"error: href must be specified\")}},x=/Trident/.test(navigator.userAgent)||/Edge\\/\\d./i.test(navigator.userAgent);k.prototype.c=function(a){var b=this;a=a.querySelectorAll(\"link[rel=import]\");l(a,function(a){return b.h(a)})};k.prototype.h=function(a){var b=this,c=a.href;if(void 0!==this.a[c]){var d=\nthis.a[c];d&&d.__loaded&&(a.import=d,this.g(a))}else this.b++,this.a[c]=\"pending\",z.load(c,function(a,d){a=b.s(a,d||c);b.a[c]=a;b.b--;b.c(a);b.i()},function(){b.a[c]=null;b.b--;b.i()})};k.prototype.s=function(a,b){if(!a)return document.createDocumentFragment();x&&(a=a.replace(y,function(a,b,c){return-1===a.indexOf(\"type=\")?b+\" type=import-disable \"+c:a}));var c=document.createElement(\"template\");c.innerHTML=a;if(c.content)a=c.content;else for(a=document.createDocumentFragment();c.firstChild;)a.appendChild(c.firstChild);\nif(c=a.querySelector(\"base\"))b=q.ua(c.getAttribute(\"href\"),b),c.removeAttribute(\"href\");c=a.querySelectorAll('link[rel=import], link[rel=stylesheet][href][type=import-disable],\\n    style:not([type]), link[rel=stylesheet][href]:not([type]),\\n    script:not([type]), script[type=\"application/javascript\"],\\n    script[type=\"text/javascript\"]');var d=0;l(c,function(a){g(a);q.nb(a,b);a.setAttribute(\"import-dependency\",\"\");\"script\"===a.localName&&!a.src&&a.textContent&&(a.setAttribute(\"src\",\"data:text/javascript;charset=utf-8,\"+\nencodeURIComponent(a.textContent+(\"\\n//# sourceURL=\"+b+(d?\"-\"+d:\"\")+\".js\\n\"))),a.textContent=\"\",d++)});return a};k.prototype.i=function(){var a=this;if(!this.b){this.f.disconnect();this.flatten(document);var b=!1,c=!1,d=function(){c&&b&&(a.c(document),a.b||(a.f.observe(document.head,{childList:!0,subtree:!0}),a.j()))};this.v(function(){c=!0;d()});this.u(function(){b=!0;d()})}};k.prototype.flatten=function(a){var b=this;a=a.querySelectorAll(\"link[rel=import]\");l(a,function(a){var c=b.a[a.href];(a.import=\nc)&&c.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&(b.a[a.href]=a,a.readyState=\"loading\",a.import=a,b.flatten(c),a.appendChild(c))})};k.prototype.u=function(a){function b(e){if(e<d){var f=c[e],h=document.createElement(\"script\");f.removeAttribute(\"import-dependency\");l(f.attributes,function(a){return h.setAttribute(a.name,a.value)});p=h;f.parentNode.replaceChild(h,f);g(h,function(){p=null;b(e+1)})}else a()}var c=document.querySelectorAll(\"script[import-dependency]\"),d=c.length;b(0)};k.prototype.v=function(a){var b=\ndocument.querySelectorAll(\"style[import-dependency],\\n    link[rel=stylesheet][import-dependency]\"),d=b.length;if(d){var e=x&&!!document.querySelector(\"link[rel=stylesheet][href][type=import-disable]\");l(b,function(b){g(b,function(){b.removeAttribute(\"import-dependency\");0===--d&&a()});if(e&&b.parentNode!==document.head){var f=document.createElement(b.localName);f.__appliedElement=b;f.setAttribute(\"type\",\"import-placeholder\");b.parentNode.insertBefore(f,b.nextSibling);for(f=c(b);f&&c(f);)f=c(f);f.parentNode!==\ndocument.head&&(f=null);document.head.insertBefore(b,f);b.removeAttribute(\"type\")}})}else a()};k.prototype.j=function(){var a=this,b=document.querySelectorAll(\"link[rel=import]\");l(b,function(b){return a.g(b)},!0)};k.prototype.g=function(a){a.__loaded||(a.__loaded=!0,a.import&&(a.import.readyState=\"complete\"),a.dispatchEvent(b(a.import?\"load\":\"error\",{bubbles:!1,cancelable:!1,detail:void 0})))};k.prototype.l=function(a){var b=this;l(a,function(a){return l(a.addedNodes,function(a){a&&a.nodeType===\nNode.ELEMENT_NODE&&(h(a)?b.h(a):b.c(a))})})};if(n){var w=document.querySelectorAll(\"link[rel=import]\");l(w,function(a){a.import&&\"loading\"===a.import.readyState||(a.__loaded=!0)});w=function(a){a=a.target;h(a)&&(a.__loaded=!0)};document.addEventListener(\"load\",w,!0);document.addEventListener(\"error\",w,!0)}else{var u=Object.getOwnPropertyDescriptor(Node.prototype,\"baseURI\");Object.defineProperty((!u||u.configurable?Node:Element).prototype,\"baseURI\",{get:function(){var a=h(this)?this:c(this);return a?\na.href:u&&u.get?u.get.call(this):(document.querySelector(\"base\")||window.location).href},configurable:!0,enumerable:!0});e(function(){return new k})}f(function(){return document.dispatchEvent(b(\"HTMLImportsLoaded\",{cancelable:!0,bubbles:!0,detail:void 0}))});a.useNative=n;a.whenReady=f;a.importForElement=c})(window.HTMLImports=window.HTMLImports||{});window.WebComponents=window.WebComponents||{flags:{}};var ld=document.querySelector('script[src*=\"webcomponents-lite.js\"]'),Fe=/wc-(.+)/,E={};if(!E.noOpts){location.search.slice(1).split(\"&\").forEach(function(a){a=\na.split(\"=\");var b;a[0]&&(b=a[0].match(Fe))&&(E[b[1]]=a[1]||!0)});if(ld)for(var md=0,Aa;Aa=ld.attributes[md];md++)\"src\"!==Aa.name&&(E[Aa.name]=Aa.value||!0);if(E.log&&E.log.split){var Ge=E.log.split(\",\");E.log={};Ge.forEach(function(a){E.log[a]=!0})}else E.log={}}window.WebComponents.flags=E;var nd=E.shadydom;nd&&(window.ShadyDOM=window.ShadyDOM||{},window.ShadyDOM.force=nd);var od=E.register||E.ce;od&&window.customElements&&(window.customElements.forcePolyfill=od);var D=window.ShadyDOM||{};D.ob=\n!(!Element.prototype.attachShadow||!Node.prototype.getRootNode);var xb=Object.getOwnPropertyDescriptor(Node.prototype,\"firstChild\");D.W=!!(xb&&xb.configurable&&xb.get);D.Ia=D.force||!D.ob;var da=Element.prototype,pd=da.matches||da.matchesSelector||da.mozMatchesSelector||da.msMatchesSelector||da.oMatchesSelector||da.webkitMatchesSelector,db=document.createTextNode(\"\"),jc=0,cb=[];(new MutationObserver(function(){for(;cb.length;)try{cb.shift()()}catch(a){throw db.textContent=jc++,a;}})).observe(db,{characterData:!0});\nvar ja=[],eb;ua.list=ja;sa.prototype.vb=function(){var a=this;this.a||(this.a=!0,ic(function(){a.b()}))};sa.prototype.b=function(){if(this.a){this.a=!1;var a=this.takeRecords();a.length&&this.ca.forEach(function(b){b(a)})}};sa.prototype.takeRecords=function(){if(this.addedNodes.length||this.removedNodes.length){var a=[{addedNodes:this.addedNodes,removedNodes:this.removedNodes}];this.addedNodes=[];this.removedNodes=[];return a}return[]};var Ac=Element.prototype.appendChild,lb=Element.prototype.insertBefore,\nka=Element.prototype.removeChild,Ic=Element.prototype.setAttribute,qd=Element.prototype.removeAttribute,yb=Element.prototype.cloneNode,mb=Document.prototype.importNode,Qc=Element.prototype.addEventListener,Tc=Element.prototype.removeEventListener,Pc=Window.prototype.addEventListener,Sc=Window.prototype.removeEventListener,zb=Element.prototype.dispatchEvent,He=Object.freeze({appendChild:Ac,insertBefore:lb,removeChild:ka,setAttribute:Ic,removeAttribute:qd,cloneNode:yb,importNode:mb,addEventListener:Qc,\nremoveEventListener:Tc,Ib:Pc,Jb:Sc,dispatchEvent:zb,querySelector:Element.prototype.querySelector,querySelectorAll:Element.prototype.querySelectorAll}),le=/[&\\u00A0\"]/g,oe=/[&\\u00A0<>]/g,me=mc(\"area base br col command embed hr img input keygen link meta param source track wbr\".split(\" \")),ne=mc(\"style script xmp iframe noembed noframes plaintext noscript\".split(\" \")),B=document.createTreeWalker(document,NodeFilter.SHOW_ALL,null,!1),C=document.createTreeWalker(document,NodeFilter.SHOW_ELEMENT,null,\n!1),Ie=Object.freeze({parentNode:aa,firstChild:Ra,lastChild:Sa,previousSibling:nc,nextSibling:oc,childNodes:U,parentElement:pc,firstElementChild:qc,lastElementChild:rc,previousElementSibling:sc,nextElementSibling:tc,children:uc,innerHTML:vc,textContent:wc}),Ab=Object.getOwnPropertyDescriptor(Element.prototype,\"innerHTML\")||Object.getOwnPropertyDescriptor(HTMLElement.prototype,\"innerHTML\"),Ba=document.implementation.createHTMLDocument(\"inert\").createElement(\"div\"),Bb=Object.getOwnPropertyDescriptor(Document.prototype,\n\"activeElement\"),xc={parentElement:{get:function(){var a=this.__shady&&this.__shady.parentNode;a&&a.nodeType!==Node.ELEMENT_NODE&&(a=null);return void 0!==a?a:pc(this)},configurable:!0},parentNode:{get:function(){var a=this.__shady&&this.__shady.parentNode;return void 0!==a?a:aa(this)},configurable:!0},nextSibling:{get:function(){var a=this.__shady&&this.__shady.nextSibling;return void 0!==a?a:oc(this)},configurable:!0},previousSibling:{get:function(){var a=this.__shady&&this.__shady.previousSibling;\nreturn void 0!==a?a:nc(this)},configurable:!0},className:{get:function(){return this.getAttribute(\"class\")||\"\"},set:function(a){this.setAttribute(\"class\",a)},configurable:!0},nextElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.nextSibling){for(var a=this.nextSibling;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return tc(this)},configurable:!0},previousElementSibling:{get:function(){if(this.__shady&&void 0!==this.__shady.previousSibling){for(var a=this.previousSibling;a&&\na.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;return a}return sc(this)},configurable:!0}},gb={childNodes:{get:function(){if(Z(this)){if(!this.__shady.childNodes){this.__shady.childNodes=[];for(var a=this.firstChild;a;a=a.nextSibling)this.__shady.childNodes.push(a)}var b=this.__shady.childNodes}else b=U(this);b.item=function(a){return b[a]};return b},configurable:!0},childElementCount:{get:function(){return this.children.length},configurable:!0},firstChild:{get:function(){var a=this.__shady&&\nthis.__shady.firstChild;return void 0!==a?a:Ra(this)},configurable:!0},lastChild:{get:function(){var a=this.__shady&&this.__shady.lastChild;return void 0!==a?a:Sa(this)},configurable:!0},textContent:{get:function(){if(Z(this)){for(var a=[],b=0,c=this.childNodes,d;d=c[b];b++)d.nodeType!==Node.COMMENT_NODE&&a.push(d.textContent);return a.join(\"\")}return wc(this)},set:function(a){switch(this.nodeType){case Node.ELEMENT_NODE:case Node.DOCUMENT_FRAGMENT_NODE:for(;this.firstChild;)this.removeChild(this.firstChild);\n(0<a.length||this.nodeType===Node.ELEMENT_NODE)&&this.appendChild(document.createTextNode(a));break;default:this.nodeValue=a}},configurable:!0},firstElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.firstChild){for(var a=this.firstChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.nextSibling;return a}return qc(this)},configurable:!0},lastElementChild:{get:function(){if(this.__shady&&void 0!==this.__shady.lastChild){for(var a=this.lastChild;a&&a.nodeType!==Node.ELEMENT_NODE;)a=a.previousSibling;\nreturn a}return rc(this)},configurable:!0},children:{get:function(){var a;Z(this)?a=Array.prototype.filter.call(this.childNodes,function(a){return a.nodeType===Node.ELEMENT_NODE}):a=uc(this);a.item=function(b){return a[b]};return a},configurable:!0},innerHTML:{get:function(){var a=\"template\"===this.localName?this.content:this;return Z(this)?fb(a):vc(a)},set:function(a){for(var b=\"template\"===this.localName?this.content:this;b.firstChild;)b.removeChild(b.firstChild);for(Ab&&Ab.set?Ab.set.call(Ba,a):\nBa.innerHTML=a;Ba.firstChild;)b.appendChild(Ba.firstChild)},configurable:!0}},rd={shadowRoot:{get:function(){return this.__shady&&this.__shady.tb||null},configurable:!0}},hb={activeElement:{get:function(){var a=Bb&&Bb.get?Bb.get.call(document):D.W?void 0:document.activeElement;if(a&&a.nodeType){var b=!!H(this);if(this===document||b&&this.host!==a&&this.host.contains(a)){for(b=ia(a);b&&b!==this;)a=b.host,b=ia(a);a=this===document?b?null:a:b===this?a:null}else a=null}else a=null;return a},set:function(){},\nconfigurable:!0}},$b=D.W?function(){}:function(a){a.__shady&&a.__shady.Xa||(a.__shady=a.__shady||{},a.__shady.Xa=!0,M(a,xc,!0))},Zb=D.W?function(){}:function(a){a.__shady&&a.__shady.Va||(a.__shady=a.__shady||{},a.__shady.Va=!0,M(a,gb,!0),M(a,rd,!0))},wa=null,Je={blur:!0,focus:!0,focusin:!0,focusout:!0,click:!0,dblclick:!0,mousedown:!0,mouseenter:!0,mouseleave:!0,mousemove:!0,mouseout:!0,mouseover:!0,mouseup:!0,wheel:!0,beforeinput:!0,input:!0,keydown:!0,keyup:!0,compositionstart:!0,compositionupdate:!0,\ncompositionend:!0,touchstart:!0,touchend:!0,touchmove:!0,touchcancel:!0,pointerover:!0,pointerenter:!0,pointerdown:!0,pointermove:!0,pointerup:!0,pointercancel:!0,pointerout:!0,pointerleave:!0,gotpointercapture:!0,lostpointercapture:!0,dragstart:!0,drag:!0,dragenter:!0,dragleave:!0,dragover:!0,drop:!0,dragend:!0,DOMActivate:!0,DOMFocusIn:!0,DOMFocusOut:!0,keypress:!0},Uc={get composed(){!1!==this.isTrusted&&void 0===this.ja&&(this.ja=Je[this.type]);return this.ja||!1},composedPath:function(){this.ya||\n(this.ya=nb(this.__target,this.composed));return this.ya},get target(){return Kc(this.currentTarget,this.composedPath())},get relatedTarget(){if(!this.za)return null;this.Aa||(this.Aa=nb(this.za,!0));return Kc(this.currentTarget,this.Aa)},stopPropagation:function(){Event.prototype.stopPropagation.call(this);this.ka=!0},stopImmediatePropagation:function(){Event.prototype.stopImmediatePropagation.call(this);this.ka=this.Ua=!0}},pb={focus:!0,blur:!0},Ke=ob(window.Event),Le=ob(window.CustomEvent),Me=\nob(window.MouseEvent),Yb={};l.prototype=Object.create(DocumentFragment.prototype);l.prototype.D=function(a,b){this.Wa=\"ShadyRoot\";ra(a);ra(this);this.host=a;this.L=b&&b.mode;a.__shady=a.__shady||{};a.__shady.root=this;a.__shady.tb=\"closed\"!==this.L?this:null;this.T=!1;this.b=[];this.a=null;b=U(a);for(var c=0,d=b.length;c<d;c++)ka.call(a,b[c])};l.prototype.M=function(){var a=this;this.T||(this.T=!0,kc(function(){return a.Ea()}))};l.prototype.C=function(){for(var a=this,b=this;b;)b.T&&(a=b),b=b.hb();\nreturn a};l.prototype.hb=function(){var a=this.host.getRootNode();if(H(a))for(var b=this.host.childNodes,c=0,d;c<b.length;c++)if(d=b[c],this.h(d))return a};l.prototype.Ea=function(){this.T&&this.C()._renderRoot()};l.prototype._renderRoot=function(){this.T=!1;this.v();this.s()};l.prototype.v=function(){for(var a=0,b;a<this.b.length;a++)b=this.b[a],this.l(b);for(b=this.host.firstChild;b;b=b.nextSibling)this.f(b);for(a=0;a<this.b.length;a++){b=this.b[a];if(!b.__shady.assignedNodes.length)for(var c=b.firstChild;c;c=\nc.nextSibling)this.f(c,b);c=b.parentNode;(c=c.__shady&&c.__shady.root)&&c.Ba()&&c._renderRoot();this.c(b.__shady.V,b.__shady.assignedNodes);if(c=b.__shady.Da){for(var d=0;d<c.length;d++)c[d].__shady.na=null;b.__shady.Da=null;c.length>b.__shady.assignedNodes.length&&(b.__shady.qa=!0)}b.__shady.qa&&(b.__shady.qa=!1,this.g(b))}};l.prototype.f=function(a,b){a.__shady=a.__shady||{};var c=a.__shady.na;a.__shady.na=null;b||(b=(b=this.a[a.slot||\"__catchall\"])&&b[0]);b?(b.__shady.assignedNodes.push(a),a.__shady.assignedSlot=\nb):a.__shady.assignedSlot=void 0;c!==a.__shady.assignedSlot&&a.__shady.assignedSlot&&(a.__shady.assignedSlot.__shady.qa=!0)};l.prototype.l=function(a){var b=a.__shady.assignedNodes;a.__shady.assignedNodes=[];a.__shady.V=[];if(a.__shady.Da=b)for(var c=0;c<b.length;c++){var d=b[c];d.__shady.na=d.__shady.assignedSlot;d.__shady.assignedSlot===a&&(d.__shady.assignedSlot=null)}};l.prototype.c=function(a,b){for(var c=0,d;c<b.length&&(d=b[c]);c++)\"slot\"==d.localName?this.c(a,d.__shady.assignedNodes):a.push(b[c])};\nl.prototype.g=function(a){zb.call(a,new Event(\"slotchange\"));a.__shady.assignedSlot&&this.g(a.__shady.assignedSlot)};l.prototype.s=function(){for(var a=this.b,b=[],c=0;c<a.length;c++){var d=a[c].parentNode;d.__shady&&d.__shady.root||!(0>b.indexOf(d))||b.push(d)}for(a=0;a<b.length;a++)c=b[a],this.I(c===this?this.host:c,this.u(c))};l.prototype.u=function(a){var b=[];a=a.childNodes;for(var c=0;c<a.length;c++){var d=a[c];if(this.h(d)){d=d.__shady.V;for(var e=0;e<d.length;e++)b.push(d[e])}else b.push(d)}return b};\nl.prototype.h=function(a){return\"slot\"==a.localName};l.prototype.I=function(a,b){for(var c=U(a),d=re(b,b.length,c,c.length),e=0,f=0,g;e<d.length&&(g=d[e]);e++){for(var h=0,k;h<g.Y.length&&(k=g.Y[h]);h++)aa(k)===a&&ka.call(a,k),c.splice(g.index+f,1);f-=g.ba}for(e=0;e<d.length&&(g=d[e]);e++)for(f=c[g.index],h=g.index;h<g.index+g.ba;h++)k=b[h],lb.call(a,k,f),c.splice(h,0,k)};l.prototype.$a=function(a){this.a=this.a||{};this.b=this.b||[];for(var b=0;b<a.length;b++){var c=a[b];c.__shady=c.__shady||{};\nra(c);ra(c.parentNode);var d=this.i(c);if(this.a[d]){var e=e||{};e[d]=!0;this.a[d].push(c)}else this.a[d]=[c];this.b.push(c)}if(e)for(var f in e)this.a[f]=this.j(this.a[f])};l.prototype.i=function(a){var b=a.name||a.getAttribute(\"name\")||\"__catchall\";return a.Ya=b};l.prototype.j=function(a){return a.sort(function(a,c){a=Vc(a);for(var b=Vc(c),e=0;e<a.length;e++){c=a[e];var f=b[e];if(c!==f)return a=Array.from(c.parentNode.childNodes),a.indexOf(c)-a.indexOf(f)}})};l.prototype.gb=function(a){this.a=this.a||\n{};this.b=this.b||[];var b=this.a,c;for(c in b)for(var d=b[c],e=0;e<d.length;e++){var f=d[e],g;a:{for(g=f;g;){if(g==a){g=!0;break a}g=g.parentNode}g=void 0}if(g){d.splice(e,1);var h=this.b.indexOf(f);0<=h&&this.b.splice(h,1);e--;this.H(f);h=!0}}return h};l.prototype.ib=function(a){var b=a.Ya,c=this.i(a);if(c!==b){b=this.a[b];var d=b.indexOf(a);0<=d&&b.splice(d,1);b=this.a[c]||(this.a[c]=[]);b.push(a);1<b.length&&(this.a[c]=this.j(b))}};l.prototype.H=function(a){if(a=a.__shady.V)for(var b=0;b<a.length;b++){var c=\na[b],d=aa(c);d&&ka.call(d,c)}};l.prototype.Ba=function(){return!!this.b.length};l.prototype.addEventListener=function(a,b,c){\"object\"!==typeof c&&(c={capture:!!c});c.la=this;this.host.addEventListener(a,b,c)};l.prototype.removeEventListener=function(a,b,c){\"object\"!==typeof c&&(c={capture:!!c});c.la=this;this.host.removeEventListener(a,b,c)};l.prototype.getElementById=function(a){return va(this,function(b){return b.id==a},function(a){return!!a})[0]||null};(function(a){M(a,gb,!0);M(a,hb,!0)})(l.prototype);\nvar ve={addEventListener:Nc.bind(window),removeEventListener:Rc.bind(window)},ue={addEventListener:Nc,removeEventListener:Rc,appendChild:function(a){return ib(this,a)},insertBefore:function(a,b){return ib(this,a,b)},removeChild:function(a){return jb(this,a)},replaceChild:function(a,b){ib(this,a,b);jb(this,b);return a},cloneNode:function(a){if(\"template\"==this.localName)var b=yb.call(this,a);else if(b=yb.call(this,!1),a){a=this.childNodes;for(var c=0,d;c<a.length;c++)d=a[c].cloneNode(!0),b.appendChild(d)}return b},\ngetRootNode:function(){return Ec(this)},get isConnected(){var a=this.ownerDocument;if(a&&a.contains&&a.contains(this)||(a=a.documentElement)&&a.contains&&a.contains(this))return!0;for(a=this;a&&!(a instanceof Document);)a=a.parentNode||(a instanceof l?a.host:void 0);return!!(a&&a instanceof Document)},dispatchEvent:function(a){ua();return zb.call(this,a)}},we={get assignedSlot(){return Wc(this)}},qb={querySelector:function(a){return va(this,function(b){return pd.call(b,a)},function(a){return!!a})[0]||\nnull},querySelectorAll:function(a){return va(this,function(b){return pd.call(b,a)})}},Zc={assignedNodes:function(a){if(\"slot\"===this.localName)return Gc(this),this.__shady?(a&&a.flatten?this.__shady.V:this.__shady.assignedNodes)||[]:[]}},Xc=bb({setAttribute:function(a,b){Hc(this,a,b)},removeAttribute:function(a){qd.call(this,a);Dc(this,a)},attachShadow:function(a){if(!this)throw\"Must provide a host.\";if(!a)throw\"Not enough arguments.\";return new l(Yb,this,a)},get slot(){return this.getAttribute(\"slot\")},\nset slot(a){Hc(this,\"slot\",a)},get assignedSlot(){return Wc(this)}},qb,Zc);Object.defineProperties(Xc,rd);var Yc=bb({importNode:function(a,b){return Jc(a,b)},getElementById:function(a){return va(this,function(b){return b.id==a},function(a){return!!a})[0]||null}},qb);Object.defineProperties(Yc,{_activeElement:hb.activeElement});var Ne=HTMLElement.prototype.blur,xe=bb({blur:function(){var a=this.__shady&&this.__shady.root;(a=a&&a.activeElement)?a.blur():Ne.call(this)}});D.Ia&&(window.ShadyDOM={inUse:D.Ia,\npatch:function(a){return a},isShadyRoot:H,enqueue:kc,flush:ua,settings:D,filterMutations:ke,observeChildren:Yd,unobserveChildren:Xd,nativeMethods:He,nativeTree:Ie},window.Event=Ke,window.CustomEvent=Le,window.MouseEvent=Me,qe(),te(),window.ShadowRoot=l);var ye=new Set(\"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph\".split(\" \"));u.prototype.D=function(a,b){this.s.set(a,b);this.l.set(b.constructor,b)};u.prototype.f=function(a){return this.s.get(a)};\nu.prototype.C=function(a){return this.l.get(a)};u.prototype.u=function(a){this.h=!0;this.i.push(a)};u.prototype.j=function(a){var b=this;this.h&&P(a,function(a){return b.g(a)})};u.prototype.g=function(a){if(this.h&&!a.__CE_patched){a.__CE_patched=!0;for(var b=0;b<this.i.length;b++)this.i[b](a)}};u.prototype.b=function(a){var b=[];P(a,function(a){return b.push(a)});for(a=0;a<b.length;a++){var c=b[a];1===c.__CE_state?this.connectedCallback(c):this.v(c)}};u.prototype.a=function(a){var b=[];P(a,function(a){return b.push(a)});\nfor(a=0;a<b.length;a++){var c=b[a];1===c.__CE_state&&this.disconnectedCallback(c)}};u.prototype.c=function(a,b){var c=this;b=b?b:new Set;var d=[];P(a,function(a){if(\"link\"===a.localName&&\"import\"===a.getAttribute(\"rel\")){var e=a.import;e instanceof Node&&\"complete\"===e.readyState?(e.__CE_isImportDocument=!0,e.__CE_hasRegistry=!0):a.addEventListener(\"load\",function(){var d=a.import;d.__CE_documentLoadHandled||(d.__CE_documentLoadHandled=!0,d.__CE_isImportDocument=!0,d.__CE_hasRegistry=!0,b.delete(d),\nc.c(d,b))})}else d.push(a)},b);if(this.h)for(a=0;a<d.length;a++)this.g(d[a]);for(a=0;a<d.length;a++)this.v(d[a])};u.prototype.v=function(a){if(void 0===a.__CE_state){var b=this.f(a.localName);if(b){b.constructionStack.push(a);var c=b.constructor;try{try{if(new c!==a)throw Error(\"The custom element constructor did not produce the element being upgraded.\");}finally{b.constructionStack.pop()}}catch(f){throw a.__CE_state=2,f;}a.__CE_state=1;a.__CE_definition=b;if(b.attributeChangedCallback)for(b=b.observedAttributes,\nc=0;c<b.length;c++){var d=b[c],e=a.getAttribute(d);null!==e&&this.attributeChangedCallback(a,d,null,e,null)}n(a)&&this.connectedCallback(a)}}};u.prototype.connectedCallback=function(a){var b=a.__CE_definition;b.connectedCallback&&b.connectedCallback.call(a)};u.prototype.disconnectedCallback=function(a){var b=a.__CE_definition;b.disconnectedCallback&&b.disconnectedCallback.call(a)};u.prototype.attributeChangedCallback=function(a,b,c,d,e){var f=a.__CE_definition;f.attributeChangedCallback&&-1<f.observedAttributes.indexOf(b)&&\nf.attributeChangedCallback.call(a,b,c,d,e)};Qa.prototype.c=function(){this.N&&this.N.disconnect()};Qa.prototype.f=function(a){var b=this.a.readyState;\"interactive\"!==b&&\"complete\"!==b||this.c();for(b=0;b<a.length;b++)for(var c=a[b].addedNodes,d=0;d<c.length;d++)this.b.c(c[d])};Xb.prototype.resolve=function(a){if(this.a)throw Error(\"Already resolved.\");this.a=a;this.b&&this.b(a)};z.prototype.define=function(a,b){var c=this;if(!(b instanceof Function))throw new TypeError(\"Custom element constructors must be functions.\");\nif(!$c(a))throw new SyntaxError(\"The element name '\"+a+\"' is not valid.\");if(this.a.f(a))throw Error(\"A custom element with name '\"+a+\"' has already been defined.\");if(this.f)throw Error(\"A custom element is already being defined.\");this.f=!0;try{var d=function(a){var b=e[a];if(void 0!==b&&!(b instanceof Function))throw Error(\"The '\"+a+\"' callback must be a function.\");return b},e=b.prototype;if(!(e instanceof Object))throw new TypeError(\"The custom element constructor's prototype is not an object.\");\nvar f=d(\"connectedCallback\");var g=d(\"disconnectedCallback\");var h=d(\"adoptedCallback\");var k=d(\"attributeChangedCallback\");var l=b.observedAttributes||[]}catch(bf){return}finally{this.f=!1}this.a.D(a,{localName:a,constructor:b,connectedCallback:f,disconnectedCallback:g,adoptedCallback:h,attributeChangedCallback:k,observedAttributes:l,constructionStack:[]});this.c.push(a);this.b||(this.b=!0,this.g(function(){return c.j()}))};z.prototype.j=function(){if(!1!==this.b)for(this.b=!1,this.a.c(document);0<\nthis.c.length;){var a=this.c.shift();(a=this.h.get(a))&&a.resolve(void 0)}};z.prototype.get=function(a){if(a=this.a.f(a))return a.constructor};z.prototype.whenDefined=function(a){if(!$c(a))return Promise.reject(new SyntaxError(\"'\"+a+\"' is not a valid custom element name.\"));var b=this.h.get(a);if(b)return b.c;b=new Xb;this.h.set(a,b);this.a.f(a)&&-1===this.c.indexOf(a)&&b.resolve(void 0);return b.c};z.prototype.l=function(a){this.i.c();var b=this.g;this.g=function(c){return a(function(){return b(c)})}};\nwindow.CustomElementRegistry=z;z.prototype.define=z.prototype.define;z.prototype.get=z.prototype.get;z.prototype.whenDefined=z.prototype.whenDefined;z.prototype.polyfillWrapFlushCallback=z.prototype.l;var Ma=window.Document.prototype.createElement,Sd=window.Document.prototype.createElementNS,Rd=window.Document.prototype.importNode,Td=window.Document.prototype.prepend,Ud=window.Document.prototype.append,Mb=window.Node.prototype.cloneNode,pa=window.Node.prototype.appendChild,Ub=window.Node.prototype.insertBefore,\nNa=window.Node.prototype.removeChild,Vb=window.Node.prototype.replaceChild,Pa=Object.getOwnPropertyDescriptor(window.Node.prototype,\"textContent\"),Lb=window.Element.prototype.attachShadow,Ka=Object.getOwnPropertyDescriptor(window.Element.prototype,\"innerHTML\"),Oa=window.Element.prototype.getAttribute,Nb=window.Element.prototype.setAttribute,Pb=window.Element.prototype.removeAttribute,qa=window.Element.prototype.getAttributeNS,Ob=window.Element.prototype.setAttributeNS,Qb=window.Element.prototype.removeAttributeNS,\nSb=window.Element.prototype.insertAdjacentElement,Id=window.Element.prototype.prepend,Jd=window.Element.prototype.append,Ld=window.Element.prototype.before,Md=window.Element.prototype.after,Nd=window.Element.prototype.replaceWith,Od=window.Element.prototype.remove,Wd=window.HTMLElement,La=Object.getOwnPropertyDescriptor(window.HTMLElement.prototype,\"innerHTML\"),Rb=window.HTMLElement.prototype.insertAdjacentElement,Wb=new function(){},Ca=window.customElements;if(!Ca||Ca.forcePolyfill||\"function\"!=\ntypeof Ca.define||\"function\"!=typeof Ca.get){var ma=new u;Vd(ma);Qd(ma);Pd(ma);Hd(ma);document.__CE_hasRegistry=!0;var Oe=new z(ma);Object.defineProperty(window,\"customElements\",{configurable:!0,enumerable:!0,value:Oe})}var K={STYLE_RULE:1,ia:7,MEDIA_RULE:4,va:1E3},G={mb:/\\/\\*[^*]*\\*+([^/*][^*]*\\*+)*\\//gim,port:/@import[^;]*;/gim,Fa:/(?:^[^;\\-\\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\\n]|$)/gim,Ja:/(?:^[^;\\-\\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\\n]|$)?/gim,sb:/@apply\\s*\\(?[^);]*\\)?\\s*(?:[;\\n]|$)?/gim,xb:/[^;:]*?:[^;]*?var\\([^;]*\\)(?:[;\\n]|$)?/gim,\nrb:/^@[^\\s]*keyframes/,Ka:/\\s+/g},y=!(window.ShadyDOM&&window.ShadyDOM.inUse);if(window.ShadyCSS&&void 0!==window.ShadyCSS.nativeCss)var x=window.ShadyCSS.nativeCss;else window.ShadyCSS?(cd(window.ShadyCSS),window.ShadyCSS=void 0):cd(window.WebComponents&&window.WebComponents.flags);var Da=/(?:^|[;\\s{]\\s*)(--[\\w-]*?)\\s*:\\s*(?:((?:'(?:\\\\'|.)*?'|\"(?:\\\\\"|.)*?\"|\\([^)]*?\\)|[^};{])+)|\\{([^}]*)\\}(?:(?=[;\\s}])|$))/gi,Ea=/(?:^|\\W+)@apply\\s*\\(?([^);\\n]*)\\)?/gi,Pe=/(--[\\w-]+)\\s*([:,;)]|$)/gi,Qe=/(animation\\s*:)|(animation-name\\s*:)/,\nAe=/@media\\s(.*)/,Re=/\\{[^}]*\\}/g,S=null;r.prototype.a=function(a,b,c){a.__styleScoped?a.__styleScoped=null:this.i(a,b||\"\",c)};r.prototype.i=function(a,b,c){a.nodeType===Node.ELEMENT_NODE&&this.C(a,b,c);if(a=\"template\"===a.localName?(a.content||a.Bb).childNodes:a.children||a.childNodes)for(var d=0;d<a.length;d++)this.i(a[d],b,c)};r.prototype.C=function(a,b,c){if(b)if(a.classList)c?(a.classList.remove(\"style-scope\"),a.classList.remove(b)):(a.classList.add(\"style-scope\"),a.classList.add(b));else if(a.getAttribute){var d=\na.getAttribute(Se);c?d&&(b=d.replace(\"style-scope\",\"\").replace(b,\"\"),ya(a,b)):ya(a,(d?d+\" \":\"\")+\"style-scope \"+b)}};r.prototype.b=function(a,b,c){var d=a.__cssBuild;y||\"shady\"===d?b=ba(b,c):(a=T(a),b=this.I(b,a.is,a.Z,c)+\"\\n\\n\");return b.trim()};r.prototype.I=function(a,b,c,d){var e=this.f(b,c);b=this.h(b);var f=this;return ba(a,function(a){a.c||(f.S(a,b,e),a.c=!0);d&&d(a,b,e)})};r.prototype.h=function(a){return a?Te+a:\"\"};r.prototype.f=function(a,b){return b?\"[is=\"+a+\"]\":a};r.prototype.S=function(a,\nb,c){this.j(a,this.g,b,c)};r.prototype.j=function(a,b,c,d){a.selector=a.A=this.l(a,b,c,d)};r.prototype.l=function(a,b,c,d){var e=a.selector.split(sd);if(!dd(a)){a=0;for(var f=e.length,g;a<f&&(g=e[a]);a++)e[a]=b.call(this,g,c,d)}return e.join(sd)};r.prototype.u=function(a){return a.replace(Cb,function(a,c,d){-1<d.indexOf(\"+\")?d=d.replace(/\\+/g,\"___\"):-1<d.indexOf(\"___\")&&(d=d.replace(/___/g,\"+\"));return\":\"+c+\"(\"+d+\")\"})};r.prototype.g=function(a,b,c){var d=this,e=!1;a=a.trim();var f=Cb.test(a);f&&\n(a=a.replace(Cb,function(a,b,c){return\":\"+b+\"(\"+c.replace(/\\s/g,\"\")+\")\"}),a=this.u(a));a=a.replace(Ue,Db+\" $1\");a=a.replace(Ve,function(a,f,k){e||(a=d.D(k,f,b,c),e=e||a.stop,f=a.lb,k=a.value);return f+k});f&&(a=this.u(a));return a};r.prototype.D=function(a,b,c,d){var e=a.indexOf(Eb);0<=a.indexOf(Db)?a=this.H(a,d):0!==e&&(a=c?this.s(a,c):a);c=!1;0<=e&&(b=\"\",c=!0);if(c){var f=!0;c&&(a=a.replace(We,function(a,b){return\" > \"+b}))}a=a.replace(Xe,function(a,b,c){return'[dir=\"'+c+'\"] '+b+\", \"+b+'[dir=\"'+\nc+'\"]'});return{value:a,lb:b,stop:f}};r.prototype.s=function(a,b){a=a.split(td);a[0]+=b;return a.join(td)};r.prototype.H=function(a,b){var c=a.match(ud);return(c=c&&c[2].trim()||\"\")?c[0].match(vd)?a.replace(ud,function(a,c,f){return b+f}):c.split(vd)[0]===b?c:Ye:a.replace(Db,b)};r.prototype.R=function(a){a.selector=a.parsedSelector;this.v(a);this.j(a,this.L)};r.prototype.v=function(a){a.selector===Ze&&(a.selector=\"html\")};r.prototype.L=function(a){return a.match(Eb)?this.g(a,wd):this.s(a.trim(),wd)};\nIb.Object.defineProperties(r.prototype,{c:{configurable:!0,enumerable:!0,get:function(){return\"style-scope\"}}});var Cb=/:(nth[-\\w]+)\\(([^)]+)\\)/,wd=\":not(.style-scope)\",sd=\",\",Ve=/(^|[\\s>+~]+)((?:\\[.+?\\]|[^\\s>+~=[])+)/g,vd=/[[.:#*]/,Db=\":host\",Ze=\":root\",Eb=\"::slotted\",Ue=new RegExp(\"^(\"+Eb+\")\"),ud=/(:host)(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))/,We=/(?:::slotted)(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))/,Xe=/(.*):dir\\((?:(ltr|rtl))\\)/,Te=\".\",td=\":\",Se=\"class\",Ye=\"should_not_match\",v=new r;t.get=function(a){return a?\na.__styleInfo:null};t.set=function(a,b){return a.__styleInfo=b};t.prototype.c=function(){return this.G};t.prototype._getStyleRules=t.prototype.c;var xd=function(a){return a.matches||a.matchesSelector||a.mozMatchesSelector||a.msMatchesSelector||a.oMatchesSelector||a.webkitMatchesSelector}(window.Element.prototype),$e=navigator.userAgent.match(\"Trident\");p.prototype.R=function(a){var b=this,c={},d=[],e=0;ca(a,function(a){b.c(a);a.index=e++;b.I(a.w.cssText,c)},function(a){d.push(a)});a.b=d;a=[];for(var f in c)a.push(f);\nreturn a};p.prototype.c=function(a){if(!a.w){var b={},c={};this.b(a,c)&&(b.F=c,a.rules=null);b.cssText=this.H(a);a.w=b}};p.prototype.b=function(a,b){var c=a.w;if(c){if(c.F)return Object.assign(b,c.F),!0}else{c=a.parsedCssText;for(var d;a=Da.exec(c);){d=(a[2]||a[3]).trim();if(\"inherit\"!==d||\"unset\"!==d)b[a[1].trim()]=d;d=!0}return d}};p.prototype.H=function(a){return this.L(a.parsedCssText)};p.prototype.L=function(a){return a.replace(Re,\"\").replace(Da,\"\")};p.prototype.I=function(a,b){for(var c;c=Pe.exec(a);){var d=\nc[1];\":\"!==c[2]&&(b[d]=!0)}};p.prototype.fa=function(a){for(var b=Object.getOwnPropertyNames(a),c=0,d;c<b.length;c++)d=b[c],a[d]=this.a(a[d],a)};p.prototype.a=function(a,b){if(a)if(0<=a.indexOf(\";\"))a=this.f(a,b);else{var c=this;a=fd(a,function(a,e,f,g){if(!e)return a+g;(e=c.a(b[e],b))&&\"initial\"!==e?\"apply-shim-inherit\"===e&&(e=\"inherit\"):e=c.a(b[f]||f,b)||f;return a+(e||\"\")+g})}return a&&a.trim()||\"\"};p.prototype.f=function(a,b){a=a.split(\";\");for(var c=0,d,e;c<a.length;c++)if(d=a[c]){Ea.lastIndex=\n0;if(e=Ea.exec(d))d=this.a(b[e[1]],b);else if(e=d.indexOf(\":\"),-1!==e){var f=d.substring(e);f=f.trim();f=this.a(f,b)||f;d=d.substring(0,e)+f}a[c]=d&&d.lastIndexOf(\";\")===d.length-1?d.slice(0,-1):d||\"\"}return a.join(\";\")};p.prototype.D=function(a,b){var c=\"\";a.w||this.c(a);a.w.cssText&&(c=this.f(a.w.cssText,b));a.cssText=c};p.prototype.C=function(a,b){var c=a.cssText,d=a.cssText;null==a.Ha&&(a.Ha=Qe.test(c));if(a.Ha)if(null==a.da){a.da=[];for(var e in b)d=b[e],d=d(c),c!==d&&(c=d,a.da.push(e))}else{for(e=\n0;e<a.da.length;++e)d=b[a.da[e]],c=d(c);d=c}a.cssText=d};p.prototype.ea=function(a,b){var c={},d=this,e=[];ca(a,function(a){a.w||d.c(a);var f=a.A||a.parsedSelector;b&&a.w.F&&f&&xd.call(b,f)&&(d.b(a,c),a=a.index,f=parseInt(a/32,10),e[f]=(e[f]||0)|1<<a%32)},null,!0);return{F:c,key:e}};p.prototype.ha=function(a,b,c,d){b.w||this.c(b);if(b.w.F){var e=T(a);a=e.is;e=e.Z;e=a?v.f(a,e):\"html\";var f=b.parsedSelector,g=\":host > *\"===f||\"html\"===f,h=0===f.indexOf(\":host\")&&!g;\"shady\"===c&&(g=f===e+\" > *.\"+e||\n-1!==f.indexOf(\"html\"),h=!g&&0===f.indexOf(e));\"shadow\"===c&&(g=\":host > *\"===f||\"html\"===f,h=h&&!g);if(g||h)c=e,h&&(y&&!b.A&&(b.A=v.l(b,v.g,v.h(a),e)),c=b.A||e),d({wb:c,qb:h,Eb:g})}};p.prototype.S=function(a,b){var c={},d={},e=this,f=b&&b.__cssBuild;ca(b,function(b){e.ha(a,b,f,function(f){xd.call(a.Cb||a,f.wb)&&(f.qb?e.b(b,c):e.b(b,d))})},null,!0);return{ub:d,pb:c}};p.prototype.ga=function(a,b,c){var d=this,e=T(a),f=v.f(e.is,e.Z),g=new RegExp(\"(?:^|[^.#[:])\"+(a.extends?\"\\\\\"+f.slice(0,-1)+\"\\\\]\":f)+\n\"($|[.:[\\\\s>+~])\");e=t.get(a).G;var h=this.h(e,c);return v.b(a,e,function(a){d.D(a,b);y||dd(a)||!a.cssText||(d.C(a,h),d.l(a,g,f,c))})};p.prototype.h=function(a,b){a=a.b;var c={};if(!y&&a)for(var d=0,e=a[d];d<a.length;e=a[++d])this.j(e,b),c[e.keyframesName]=this.i(e);return c};p.prototype.i=function(a){return function(b){return b.replace(a.f,a.a)}};p.prototype.j=function(a,b){a.f=new RegExp(a.keyframesName,\"g\");a.a=a.keyframesName+\"-\"+b;a.A=a.A||a.selector;a.selector=a.A.replace(a.keyframesName,a.a)};\np.prototype.l=function(a,b,c,d){a.A=a.A||a.selector;d=\".\"+d;for(var e=a.A.split(\",\"),f=0,g=e.length,h;f<g&&(h=e[f]);f++)e[f]=h.match(b)?h.replace(c,d):d+\" \"+h;a.selector=e.join(\",\")};p.prototype.u=function(a,b,c){var d=a.getAttribute(\"class\")||\"\",e=d;c&&(e=d.replace(new RegExp(\"\\\\s*x-scope\\\\s*\"+c+\"\\\\s*\",\"g\"),\" \"));e+=(e?\" \":\"\")+\"x-scope \"+b;d!==e&&ya(a,e)};p.prototype.v=function(a,b,c,d){b=d?d.textContent||\"\":this.ga(a,b,c);var e=t.get(a),f=e.a;f&&!y&&f!==d&&(f._useCount--,0>=f._useCount&&f.parentNode&&\nf.parentNode.removeChild(f));y?e.a?(e.a.textContent=b,d=e.a):b&&(d=tb(b,c,a.shadowRoot,e.b)):d?d.parentNode||($e&&-1<b.indexOf(\"@media\")&&(d.textContent=b),ed(d,null,e.b)):b&&(d=tb(b,c,null,e.b));d&&(d._useCount=d._useCount||0,e.a!=d&&d._useCount++,e.a=d);return d};p.prototype.s=function(a,b){var c=xa(a),d=this;a.textContent=ba(c,function(a){var c=a.cssText=a.parsedCssText;a.w&&a.w.cssText&&(c=c.replace(G.Fa,\"\").replace(G.Ja,\"\"),a.cssText=d.f(c,b))})};Ib.Object.defineProperties(p.prototype,{g:{configurable:!0,\nenumerable:!0,get:function(){return\"x-scope\"}}});var O=new p,Fb={},Fa=window.customElements;if(Fa&&!y){var af=Fa.define;Fa.define=function(a,b,c){var d=document.createComment(\" Shady DOM styles for \"+a+\" \"),e=document.head;e.insertBefore(d,(S?S.nextSibling:null)||e.firstChild);S=d;Fb[a]=d;return af.call(Fa,a,b,c)}}oa.prototype.a=function(a,b,c){for(var d=0;d<c.length;d++){var e=c[d];if(a.F[e]!==b[e])return!1}return!0};oa.prototype.b=function(a,b,c,d){var e=this.cache[a]||[];e.push({F:b,styleElement:c,\nB:d});e.length>this.c&&e.shift();this.cache[a]=e};oa.prototype.fetch=function(a,b,c){if(a=this.cache[a])for(var d=a.length-1;0<=d;d--){var e=a[d];if(this.a(e,b,c))return e}};if(!y){var yd=new MutationObserver(gd),zd=function(a){yd.observe(a,{childList:!0,subtree:!0})};if(window.customElements&&!window.customElements.polyfillWrapFlushCallback)zd(document);else{var Gb=function(){zd(document.body)};window.HTMLImports?window.HTMLImports.whenReady(Gb):requestAnimationFrame(function(){if(\"loading\"===document.readyState){var a=\nfunction(){Gb();document.removeEventListener(\"readystatechange\",a)};document.addEventListener(\"readystatechange\",a)}else Gb()})}Kb=function(){gd(yd.takeRecords())}}var za={},De=Promise.resolve(),ub=null,id=window.HTMLImports&&window.HTMLImports.whenReady||null,vb,Ga=null,na=null;F.prototype.Ga=function(){!this.enqueued&&na&&(this.enqueued=!0,Jb(na))};F.prototype.b=function(a){a.__seenByShadyCSS||(a.__seenByShadyCSS=!0,this.customStyles.push(a),this.Ga())};F.prototype.a=function(a){return a.__shadyCSSCachedStyle?\na.__shadyCSSCachedStyle:a.getStyle?a.getStyle():a};F.prototype.c=function(){for(var a=this.customStyles,b=0;b<a.length;b++){var c=a[b];if(!c.__shadyCSSCachedStyle){var d=this.a(c);d&&(d=d.__appliedElement||d,Ga&&Ga(d),c.__shadyCSSCachedStyle=d)}}return a};F.prototype.addCustomStyle=F.prototype.b;F.prototype.getStyleForCustomStyle=F.prototype.a;F.prototype.processStyles=F.prototype.c;Object.defineProperties(F.prototype,{transformCallback:{get:function(){return Ga},set:function(a){Ga=a}},validateCallback:{get:function(){return na},\nset:function(a){var b=!1;na||(b=!0);na=a;b&&this.Ga()}}});var Ad=new oa;k.prototype.C=function(){Kb()};k.prototype.S=function(a){var b=this.s[a]=(this.s[a]||0)+1;return a+\"-\"+b};k.prototype.Ra=function(a){return xa(a)};k.prototype.Ta=function(a){return ba(a)};k.prototype.R=function(a){a=a.content.querySelectorAll(\"style\");for(var b=[],c=0;c<a.length;c++){var d=a[c];b.push(d.textContent);d.parentNode.removeChild(d)}return b.join(\"\").trim()};k.prototype.fa=function(a){return(a=a.content.querySelector(\"style\"))?\na.getAttribute(\"css-build\")||\"\":\"\"};k.prototype.prepareTemplate=function(a,b,c){if(!a.f){a.f=!0;a.name=b;a.extends=c;za[b]=a;var d=this.fa(a),e=this.R(a);c={is:b,extends:c,zb:d};y||v.a(a.content,b);this.c();var f=Ea.test(e)||Da.test(e);Ea.lastIndex=0;Da.lastIndex=0;e=sb(e);f&&x&&this.a&&this.a.transformRules(e,b);a._styleAst=e;a.g=d;d=[];x||(d=O.R(a._styleAst));if(!d.length||x)b=this.ea(c,a._styleAst,y?a.content:null,Fb[b]),a.a=b;a.c=d}};k.prototype.ea=function(a,b,c,d){b=v.b(a,b);if(b.length)return tb(b,\na.is,c,d)};k.prototype.ha=function(a){var b=T(a),c=b.is;b=b.Z;var d=Fb[c];c=za[c];if(c){var e=c._styleAst;var f=c.c}return t.set(a,new t(e,d,f,0,b))};k.prototype.H=function(){!this.a&&window.ShadyCSS&&window.ShadyCSS.ApplyShim&&(this.a=window.ShadyCSS.ApplyShim,this.a.invalidCallback=Be)};k.prototype.I=function(){var a=this;!this.b&&window.ShadyCSS&&window.ShadyCSS.CustomStyleInterface&&(this.b=window.ShadyCSS.CustomStyleInterface,this.b.transformCallback=function(b){a.v(b)},this.b.validateCallback=\nfunction(){requestAnimationFrame(function(){(a.b.enqueued||a.i)&&a.f()})})};k.prototype.c=function(){this.H();this.I()};k.prototype.f=function(){this.c();if(this.b){var a=this.b.processStyles();this.b.enqueued&&(x?this.Pa(a):(this.u(this.g,this.h),this.D(a)),this.b.enqueued=!1,this.i&&!x&&this.styleDocument())}};k.prototype.styleElement=function(a,b){var c=T(a).is,d=t.get(a);d||(d=this.ha(a));this.j(a)||(this.i=!0);b&&(d.P=d.P||{},Object.assign(d.P,b));if(x){if(d.P){b=d.P;for(var e in b)null===e?\na.style.removeProperty(e):a.style.setProperty(e,b[e])}if(((e=za[c])||this.j(a))&&e&&e.a&&!hd(e)){if(hd(e)||e._applyShimValidatingVersion!==e._applyShimNextVersion)this.c(),this.a&&this.a.transformRules(e._styleAst,c),e.a.textContent=v.b(a,d.G),Ce(e);y&&(c=a.shadowRoot)&&(c.querySelector(\"style\").textContent=v.b(a,d.G));d.G=e._styleAst}}else this.u(a,d),d.sa&&d.sa.length&&this.L(a,d)};k.prototype.l=function(a){return(a=a.getRootNode().host)?t.get(a)?a:this.l(a):this.g};k.prototype.j=function(a){return a===\nthis.g};k.prototype.L=function(a,b){var c=T(a).is,d=Ad.fetch(c,b.K,b.sa),e=d?d.styleElement:null,f=b.B;b.B=d&&d.B||this.S(c);e=O.v(a,b.K,b.B,e);y||O.u(a,b.B,f);d||Ad.b(c,b.K,e,b.B)};k.prototype.u=function(a,b){var c=this.l(a),d=t.get(c);c=Object.create(d.K||null);var e=O.S(a,b.G);a=O.ea(d.G,a).F;Object.assign(c,e.pb,a,e.ub);this.ga(c,b.P);O.fa(c);b.K=c};k.prototype.ga=function(a,b){for(var c in b){var d=b[c];if(d||0===d)a[c]=d}};k.prototype.styleDocument=function(a){this.styleSubtree(this.g,a)};k.prototype.styleSubtree=\nfunction(a,b){var c=a.shadowRoot;(c||this.j(a))&&this.styleElement(a,b);if(b=c&&(c.children||c.childNodes))for(a=0;a<b.length;a++)this.styleSubtree(b[a]);else if(a=a.children||a.childNodes)for(b=0;b<a.length;b++)this.styleSubtree(a[b])};k.prototype.Pa=function(a){for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);c&&this.Oa(c)}};k.prototype.D=function(a){for(var b=0;b<a.length;b++){var c=this.b.getStyleForCustomStyle(a[b]);c&&O.s(c,this.h.K)}};k.prototype.v=function(a){var b=this,\nc=xa(a);ca(c,function(a){y?v.v(a):v.R(a);x&&(b.c(),b.a&&b.a.transformRule(a))});x?a.textContent=ba(c):this.h.G.rules.push(c)};k.prototype.Oa=function(a){if(x&&this.a){var b=xa(a);this.c();this.a.transformRules(b);a.textContent=ba(b)}};k.prototype.getComputedStyleValue=function(a,b){var c;x||(c=(t.get(a)||t.get(this.l(a))).K[b]);return(c=c||window.getComputedStyle(a).getPropertyValue(b))?c.trim():\"\"};k.prototype.Sa=function(a,b){var c=a.getRootNode();b=b?b.split(/\\s/):[];c=c.host&&c.host.localName;\nif(!c){var d=a.getAttribute(\"class\");if(d){d=d.split(/\\s/);for(var e=0;e<d.length;e++)if(d[e]===v.c){c=d[e+1];break}}}c&&b.push(v.c,c);x||(c=t.get(a))&&c.B&&b.push(O.g,c.B);ya(a,b.join(\" \"))};k.prototype.Qa=function(a){return t.get(a)};k.prototype.flush=k.prototype.C;k.prototype.prepareTemplate=k.prototype.prepareTemplate;k.prototype.styleElement=k.prototype.styleElement;k.prototype.styleDocument=k.prototype.styleDocument;k.prototype.styleSubtree=k.prototype.styleSubtree;k.prototype.getComputedStyleValue=\nk.prototype.getComputedStyleValue;k.prototype.setElementClass=k.prototype.Sa;k.prototype._styleInfoForNode=k.prototype.Qa;k.prototype.transformCustomStyleForDocument=k.prototype.v;k.prototype.getStyleAst=k.prototype.Ra;k.prototype.styleAstToString=k.prototype.Ta;k.prototype.flushCustomStyles=k.prototype.f;Object.defineProperties(k.prototype,{nativeShadow:{get:function(){return y}},nativeCss:{get:function(){return x}}});var I=new k;if(window.ShadyCSS){var Bd=window.ShadyCSS.ApplyShim;var Cd=window.ShadyCSS.CustomStyleInterface}window.ShadyCSS=\n{ScopingShim:I,prepareTemplate:function(a,b,c){I.f();I.prepareTemplate(a,b,c)},styleSubtree:function(a,b){I.f();I.styleSubtree(a,b)},styleElement:function(a){I.f();I.styleElement(a)},styleDocument:function(a){I.f();I.styleDocument(a)},getComputedStyleValue:function(a,b){return I.getComputedStyleValue(a,b)},nativeCss:x,nativeShadow:y};Bd&&(window.ShadyCSS.ApplyShim=Bd);Cd&&(window.ShadyCSS.CustomStyleInterface=Cd);var Hb=window.customElements,Ha=window.HTMLImports;window.WebComponents=window.WebComponents||\n{};if(Hb&&Hb.polyfillWrapFlushCallback){var Ia,Dd=function(){if(Ia){var a=Ia;Ia=null;a();return!0}},Ed=Ha.whenReady;Hb.polyfillWrapFlushCallback(function(a){Ia=a;Ed(Dd)});Ha.whenReady=function(a){Ed(function(){Dd()?Ha.whenReady(a):a()})}}Ha.whenReady(function(){requestAnimationFrame(function(){window.WebComponents.ready=!0;document.dispatchEvent(new CustomEvent(\"WebComponentsReady\",{bubbles:!0}))})});var Fd=document.createElement(\"style\");Fd.textContent=\"body {transition: opacity ease-in 0.2s; } \\nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \\n\";\nvar Gd=document.querySelector(\"head\");Gd.insertBefore(Fd,Gd.firstChild)})();}).call(this);\n\n//# sourceMappingURL=webcomponents-lite.js.map\n"

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(13);

__webpack_require__(1);

__webpack_require__(3);

__webpack_require__(14);

__webpack_require__(2);

__webpack_require__(15);

__webpack_require__(6);


(function() {
  'use strict';

  /**
   * Element class mixin that provides the core API for Polymer's meta-programming
   * features including template stamping, data-binding, attribute deserialization,
   * and property change observation.
   *
   * Subclassers may provide the following static getters to return metadata
   * used to configure Polymer's features for the class:
   *
   * - `static get is()`: When the template is provided via a `dom-module`,
   *   users should return the `dom-module` id from a static `is` getter.  If
   *   no template is needed or the template is provided directly via the
   *   `template` getter, there is no need to define `is` for the element.
   *
   * - `static get template()`: Users may provide the template directly (as
   *   opposed to via `dom-module`) by implementing a static `template` getter.
   *   The getter may return an `HTMLTemplateElement` or a string, which will
   *   automatically be parsed into a template.
   *
   * - `static get properties()`: Should return an object describing
   *   property-related metadata used by Polymer features (key: property name
   *   value: object containing property metadata). Valid keys in per-property
   *   metadata include:
   *   - `type` (String|Number|Object|Array|...): Used by
   *     `attributeChangedCallback` to determine how string-based attributes
   *     are deserialized to JavaScript property values.
   *   - `notify` (boolean): Causes a change in the property to fire a
   *     non-bubbling event called `<property>-changed`. Elements that have
   *     enabled two-way binding to the property use this event to observe changes.
   *   - `readOnly` (boolean): Creates a getter for the property, but no setter.
   *     To set a read-only property, use the private setter method
   *     `_setProperty(property, value)`.
   *   - `observer` (string): Observer method name that will be called when
   *     the property changes. The arguments of the method are
   *     `(value, previousValue)`.
   *   - `computed` (string): String describing method and dependent properties
   *     for computing the value of this property (e.g. `'computeFoo(bar, zot)'`).
   *     Computed properties are read-only by default and can only be changed
   *     via the return value of the computing method.
   *
   * - `static get observers()`: Array of strings describing multi-property
   *   observer methods and their dependent properties (e.g.
   *   `'observeABC(a, b, c)'`).
   *
   * The base class provides default implementations for the following standard
   * custom element lifecycle callbacks; users may override these, but should
   * call the super method to ensure
   * - `constructor`: Run when the element is created or upgraded
   * - `connectedCallback`: Run each time the element is connected to the
   *   document
   * - `disconnectedCallback`: Run each time the element is disconnected from
   *   the document
   * - `attributeChangedCallback`: Run each time an attribute in
   *   `observedAttributes` is set or removed (note: this element's default
   *   `observedAttributes` implementation will automatically return an array
   *   of dash-cased attributes based on `properties`)
   *
   * @mixinFunction
   * @polymer
   * @appliesMixin Polymer.PropertyEffects
   * @memberof Polymer
   * @property rootPath {string} Set to the value of `Polymer.rootPath`,
   *   which defaults to the main document path
   * @property importPath {string} Set to the value of the class's static
   *   `importPath` property, which defaults to the path of this element's
   *   `dom-module` (when `is` is used), but can be overridden for other
   *   import strategies.
   * @summary Element class mixin that provides the core API for Polymer's
   * meta-programming features.
   */
  Polymer.ElementMixin = Polymer.dedupingMixin(base => {

    /**
     * @constructor
     * @extends {base}
     * @implements {Polymer_PropertyEffects}
     */
    const polymerElementBase = Polymer.PropertyEffects(base);

    let caseMap = Polymer.CaseMap;

    /**
     * Returns the `properties` object specifically on `klass`. Use for:
     * (1) super chain mixes togther to make `propertiesForClass` which is
     * then used to make `observedAttributes`.
     * (2) properties effects and observers are created from it at `finalize` time.
     *
     * @param {HTMLElement} klass Element class
     * @return {Object} Object containing own properties for this class
     * @private
     */
    function ownPropertiesForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__ownProperties', klass))) {
        klass.__ownProperties =
          klass.hasOwnProperty(JSCompiler_renameProperty('properties', klass)) ?
          /** @type PolymerElementConstructor */ (klass).properties : {};
      }
      return klass.__ownProperties;
    }

    /**
     * Returns the `observers` array specifically on `klass`. Use for
     * setting up observers.
     *
     * @param {HTMLElement} klass Element class
     * @return {Array} Array containing own observers for this class
     * @private
     */
    function ownObserversForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__ownObservers', klass))) {
        klass.__ownObservers =
          klass.hasOwnProperty(JSCompiler_renameProperty('observers', klass)) ?
          /** @type PolymerElementConstructor */ (klass).observers : [];
      }
      return klass.__ownObservers;
    }

    /**
     * Mixes `props` into `flattenedProps` but upgrades shorthand type
     * syntax to { type: Type}.
     *
     * @param {Object} flattenedProps Bag to collect flattened properties into
     * @param {Object} props Bag of properties to add to `flattenedProps`
     * @return {Object} The input `flattenedProps` bag
     * @private
     */
    function flattenProperties(flattenedProps, props) {
      for (let p in props) {
        let o = props[p];
        if (typeof o == 'function') {
          o = { type: o };
        }
        flattenedProps[p] = o;
      }
      return flattenedProps;
    }

    /**
     * Returns a flattened list of properties mixed together from the chain of all
     * constructor's `config.properties`. This list is used to create
     * (1) observedAttributes,
     * (2) class property default values
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     * @suppress {missingProperties} class.prototype is not a property for some reason?
     * @private
     */
    function propertiesForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__classProperties', klass))) {
        klass.__classProperties =
        flattenProperties({}, ownPropertiesForClass(klass));
        let superCtor = Object.getPrototypeOf(klass.prototype).constructor;
        if (superCtor.prototype instanceof PolymerElement) {
          klass.__classProperties = Object.assign(
            Object.create(propertiesForClass(/** @type PolymerElementConstructor */(superCtor))),
            klass.__classProperties);
        }
      }
      return klass.__classProperties;
    }

    /**
     * Returns a list of properties with default values.
     * This list is created as an optimization since it is a subset of
     * the list returned from `propertiesForClass`.
     * This list is used in `_initializeProperties` to set property defaults.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @return {PolymerElementProperties} Flattened properties for this class
     *   that have default values
     * @private
     */
    function propertyDefaultsForClass(klass) {
      if (!klass.hasOwnProperty(
        JSCompiler_renameProperty('__classPropertyDefaults', klass))) {
        klass.__classPropertyDefaults = null;
        let props = propertiesForClass(klass);
        for (let p in props) {
          let info = props[p];
          if ('value' in info) {
            klass.__classPropertyDefaults = klass.__classPropertyDefaults || {};
            klass.__classPropertyDefaults[p] = info;
          }
        }
      }
      return klass.__classPropertyDefaults;
    }

    /**
     * Returns true if a `klass` has finalized. Called in `ElementClass.finalize()`
     * @param {PolymerElementConstructor} klass Element class
     * @return {boolean} True if all metaprogramming for this class has been
     *   completed
     * @private
     */
    function hasClassFinalized(klass) {
      return klass.hasOwnProperty(JSCompiler_renameProperty('__finalized', klass));
    }

    /**
     * Called by `ElementClass.finalize()`. Ensures this `klass` and
     * *all superclasses* are finalized by traversing the prototype chain
     * and calling `klass.finalize()`.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClassAndSuper(klass) {
      let proto = /** @type PolymerElementConstructor */ (klass).prototype;
      let superCtor = Object.getPrototypeOf(proto).constructor;
      if (superCtor.prototype instanceof PolymerElement) {
        superCtor.finalize();
      }
      finalizeClass(klass);
    }

    /**
     * Configures a `klass` based on a staic `klass.config` object and
     * a `template`. This includes creating accessors and effects
     * for properties in `config` and the `template` as well as preparing the
     * `template` for stamping.
     *
     * @param {PolymerElementConstructor} klass Element class
     * @private
     */
    function finalizeClass(klass) {
      klass.__finalized = true;
      let proto = /** @type PolymerElementConstructor */ (klass).prototype;
      if (klass.hasOwnProperty(
        JSCompiler_renameProperty('is', klass)) && klass.is) {
        Polymer.telemetry.register(proto);
      }
      let props = ownPropertiesForClass(klass);
      if (props) {
        finalizeProperties(proto, props);
      }
      let observers = ownObserversForClass(klass);
      if (observers) {
        finalizeObservers(proto, observers, props);
      }
      // note: create "working" template that is finalized at instance time
      let template = /** @type PolymerElementConstructor */ (klass).template;
      if (template) {
        if (typeof template === 'string') {
          let t = document.createElement('template');
          t.innerHTML = template;
          template = t;
        } else {
          template = template.cloneNode(true);
        }
        proto._template = template;
      }
    }

    /**
     * Configures a `proto` based on a `properties` object.
     * Leverages `PropertyEffects` to create property accessors and effects
     * supporting, observers, reflecting to attributes, change notification,
     * computed properties, and read only properties.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *    and effects to
     * @param {Object} properties Flattened bag of property descriptors for
     *    this class
     * @private
     */
    function finalizeProperties(proto, properties) {
      for (let p in properties) {
        createPropertyFromConfig(proto, p, properties[p], properties);
      }
    }

    /**
     * Configures a `proto` based on a `observers` array.
     * Leverages `PropertyEffects` to create observers.
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {Object} observers Flattened array of observer descriptors for
     *   this class
     * @param {Object} dynamicFns Object containing keys for any properties
     *   that are functions and should trigger the effect when the function
     *   reference is changed
     * @private
     */
    function finalizeObservers(proto, observers, dynamicFns) {
      for (let i=0; i < observers.length; i++) {
        proto._createMethodObserver(observers[i], dynamicFns);
      }
    }

    /**
     * Creates effects for a property.
     *
     * Note, once a property has been set to
     * `readOnly`, `computed`, `reflectToAttribute`, or `notify`
     * these values may not be changed. For example, a subclass cannot
     * alter these settings. However, additional `observers` may be added
     * by subclasses.
     *
     * The info object should may contain property metadata as follows:
     *
     * * `type`: {function} type to which an attribute matching the property
     * is deserialized. Note the property is camel-cased from a dash-cased
     * attribute. For example, 'foo-bar' attribute is dersialized to a
     * property named 'fooBar'.
     *
     * * `readOnly`: {boolean} creates a readOnly property and
     * makes a private setter for the private of the form '_setFoo' for a
     * property 'foo',
     *
     * * `computed`: {string} creates a computed property. A computed property
     * also automatically is set to `readOnly: true`. The value is calculated
     * by running a method and arguments parsed from the given string. For
     * example 'compute(foo)' will compute a given property when the
     * 'foo' property changes by executing the 'compute' method. This method
     * must return the computed value.
     *
     * * `reflectToAttriute`: {boolean} If true, the property value is reflected
     * to an attribute of the same name. Note, the attribute is dash-cased
     * so a property named 'fooBar' is reflected as 'foo-bar'.
     *
     * * `notify`: {boolean} sends a non-bubbling notification event when
     * the property changes. For example, a property named 'foo' sends an
     * event named 'foo-changed' with `event.detail` set to the value of
     * the property.
     *
     * * observer: {string} name of a method that runs when the property
     * changes. The arguments of the method are (value, previousValue).
     *
     * Note: Users may want control over modifying property
     * effects via subclassing. For example, a user might want to make a
     * reflectToAttribute property not do so in a subclass. We've chosen to
     * disable this because it leads to additional complication.
     * For example, a readOnly effect generates a special setter. If a subclass
     * disables the effect, the setter would fail unexpectedly.
     * Based on feedback, we may want to try to make effects more malleable
     * and/or provide an advanced api for manipulating them.
     * Also consider adding warnings when an effect cannot be changed.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {string} name Name of the property.
     * @param {Object} info Info object from which to create property effects.
     * Supported keys:
     * @param {Object} allProps Flattened map of all properties defined in this
     *   element (including inherited properties)
     * @private
     */
    function createPropertyFromConfig(proto, name, info, allProps) {
      // computed forces readOnly...
      if (info.computed) {
        info.readOnly = true;
      }
      // Note, since all computed properties are readOnly, this prevents
      // adding additional computed property effects (which leads to a confusing
      // setup where multiple triggers for setting a property)
      // While we do have `hasComputedEffect` this is set on the property's
      // dependencies rather than itself.
      if (info.computed  && !proto._hasReadOnlyEffect(name)) {
        proto._createComputedProperty(name, info.computed, allProps);
      }
      if (info.readOnly && !proto._hasReadOnlyEffect(name)) {
        proto._createReadOnlyProperty(name, !info.computed);
      }
      if (info.reflectToAttribute && !proto._hasReflectEffect(name)) {
        proto._createReflectedProperty(name);
      }
      if (info.notify && !proto._hasNotifyEffect(name)) {
        proto._createNotifyingProperty(name);
      }
      // always add observer
      if (info.observer) {
        proto._createPropertyObserver(name, info.observer, allProps[info.observer]);
      }
    }

    /**
     * Configures an element `proto` to function with a given `template`.
     * The element name `is` and extends `ext` must be specified for ShadyCSS
     * style scoping.
     *
     * @param {PolymerElement} proto Element class prototype to add accessors
     *   and effects to
     * @param {!HTMLTemplateElement} template Template to process and bind
     * @param {string} baseURI URL against which to resolve urls in
     *   style element cssText
     * @param {string} is Tag name (or type extension name) for this element
     * @param {string=} ext For type extensions, the tag name that was extended
     * @private
     */
    function finalizeTemplate(proto, template, baseURI, is, ext) {
      // support `include="module-name"`
      let cssText =
        Polymer.StyleGather.cssFromTemplate(template, baseURI) +
        Polymer.StyleGather.cssFromModuleImports(is);
      if (cssText) {
        let style = document.createElement('style');
        style.textContent = cssText;
        template.content.insertBefore(style, template.content.firstChild);
      }
      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, is, ext);
      }
      proto._bindTemplate(template);
    }

    /**
     * @polymer
     * @mixinClass
     * @unrestricted
     * @implements {Polymer_ElementMixin}
     */
    class PolymerElement extends polymerElementBase {

      /**
       * Standard Custom Elements V1 API.  The default implementation returns
       * a list of dash-cased attributes based on a flattening of all properties
       * declared in `static get properties()` for this element and any
       * superclasses.
       *
       * @return {Array} Observed attribute list
       */
      static get observedAttributes() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('__observedAttributes', this))) {
          let list = [];
          let properties = propertiesForClass(this);
          for (let prop in properties) {
            list.push(Polymer.CaseMap.camelToDashCase(prop));
          }
          this.__observedAttributes = list;
        }
        return this.__observedAttributes;
      }

      /**
       * Called automatically when the first element instance is created to
       * ensure that class finalization work has been completed.
       * May be called by users to eagerly perform class finalization work
       * prior to the creation of the first element instance.
       *
       * Class finalization work generally includes meta-programming such as
       * creating property accessors and any property effect metadata needed for
       * the features used.
       *
       * @public
       */
      static finalize() {
        if (!hasClassFinalized(this)) {
          finalizeClassAndSuper(this);
        }
      }

      /**
       * Returns the template that will be stamped into this element's shadow root.
       *
       * If a `static get is()` getter is defined, the default implementation
       * will return the first `<template>` in a `dom-module` whose `id`
       * matches this element's `is`.
       *
       * Users may override this getter to return an arbitrary template
       * (in which case the `is` getter is unnecessary). The template returned
       * may be either an `HTMLTemplateElement` or a string that will be
       * automatically parsed into a template.
       *
       * Note that when subclassing, if the super class overrode the default
       * implementation and the subclass would like to provide an alternate
       * template via a `dom-module`, it should override this getter and
       * return `Polymer.DomModule.import(this.is, 'template')`.
       *
       * If a subclass would like to modify the super class template, it should
       * clone it rather than modify it in place.  If the getter does expensive
       * work such as cloning/modifying a template, it should memoize the
       * template for maximum performance:
       *
       *   let memoizedTemplate;
       *   class MySubClass extends MySuperClass {
       *     static get template() {
       *       if (!memoizedTemplate) {
       *         memoizedTemplate = super.template.cloneNode(true);
       *         let subContent = document.createElement('div');
       *         subContent.textContent = 'This came from MySubClass';
       *         memoizedTemplate.content.appendChild(subContent);
       *       }
       *       return memoizedTemplate;
       *     }
       *   }
       *
       * @return {HTMLTemplateElement|string} Template to be stamped
       */
      static get template() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_template', this))) {
          this._template = Polymer.DomModule && Polymer.DomModule.import(
            /** @type PolymerElementConstructor*/ (this).is, 'template') ||
            // note: implemented so a subclass can retrieve the super
            // template; call the super impl this way so that `this` points
            // to the superclass.
            Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.template;
        }
        return this._template;
      }

      /**
       * Path matching the url from which the element was imported.
       * This path is used to resolve url's in template style cssText.
       * The `importPath` property is also set on element instances and can be
       * used to create bindings relative to the import path.
       * Defaults to the path matching the url containing a `dom-module` element
       * matching this element's static `is` property.
       * Note, this path should contain a trailing `/`.
       *
       * @return {string} The import path for this element class
       */
      static get importPath() {
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_importPath', this))) {
            const module = Polymer.DomModule && Polymer.DomModule.import(/** @type PolymerElementConstructor */ (this).is);
            this._importPath = module ? module.assetpath : '' ||
            Object.getPrototypeOf(/** @type PolymerElementConstructor*/ (this).prototype).constructor.importPath;
        }
        return this._importPath;
      }

      /**
       * Overrides the default `Polymer.PropertyAccessors` to ensure class
       * metaprogramming related to property accessors and effects has
       * completed (calls `finalize`).
       *
       * It also initializes any property defaults provided via `value` in
       * `properties` metadata.
       *
       * @override
       * @suppress {invalidCasts}
       */
      _initializeProperties() {
        Polymer.telemetry.instanceCount++;
        this.constructor.finalize();
        const importPath = this.constructor.importPath;
        // note: finalize template when we have access to `localName` to
        // avoid dependence on `is` for polyfilling styling.
        if (this._template && !this._template.__polymerFinalized) {
          this._template.__polymerFinalized = true;
          const baseURI =
            importPath ? Polymer.ResolveUrl.resolveUrl(importPath) : '';
          finalizeTemplate(/** @type {!PolymerElement} */(this.__proto__), this._template, baseURI,
            /**@type {!HTMLElement}*/(this).localName);
        }
        super._initializeProperties();
        // set path defaults
        this.rootPath = Polymer.rootPath;
        this.importPath = importPath;
        // apply property defaults...
        let p$ = propertyDefaultsForClass(this.constructor);
        if (!p$) {
          return;
        }
        for (let p in p$) {
          let info = p$[p];
          // Don't set default value if there is already an own property, which
          // happens when a `properties` property with default but no effects had
          // a property set (e.g. bound) by its host before upgrade
          if (!this.hasOwnProperty(p)) {
            let value = typeof info.value == 'function' ?
              info.value.call(this) :
              info.value;
            // Set via `_setProperty` if there is an accessor, to enable
            // initializing readOnly property defaults
            if (this._hasAccessor(p)) {
              this._setPendingProperty(p, value, true);
            } else {
              this[p] = value;
            }
          }
        }
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `connectedCallback`.
       *
       * The default implementation enables the property effects system and
       * flushes any pending properties, and updates shimmed CSS properties
       * when using the ShadyCSS scoping/custom properties polyfill.
       *
       * @suppress {invalidCasts}
       */
      connectedCallback() {
        if (window.ShadyCSS && this._template) {
          window.ShadyCSS.styleElement(/** @type {!HTMLElement} */(this));
        }
        this._enableProperties();
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `disconnectedCallback`.
       */
      disconnectedCallback() {}

      /**
       * Stamps the element template.
       *
       * @override
       */
      ready() {
        if (this._template) {
          this.root = this._stampTemplate(this._template);
          this.$ = this.root.$;
        }
        super.ready();
      }

      /**
       * Implements `PropertyEffects`'s `_readyClients` call. Attaches
       * element dom by calling `_attachDom` with the dom stamped from the
       * element's template via `_stampTemplate`. Note that this allows
       * client dom to be attached to the element prior to any observers
       * running.
       *
       * @override
       */
      _readyClients() {
        if (this._template) {
          this.root = this._attachDom(this.root);
        }
        // The super._readyClients here sets the clients initialized flag.
        // We must wait to do this until after client dom is created/attached
        // so that this flag can be checked to prevent notifications fired
        // during this process from being handled before clients are ready.
        super._readyClients();
      }


      /**
       * Attaches an element's stamped dom to itself. By default,
       * this method creates a `shadowRoot` and adds the dom to it.
       * However, this method may be overridden to allow an element
       * to put its dom in another location.
       *
       * @throws {Error}
       * @suppress {missingReturn}
       * @param {NodeList} dom to attach to the element.
       * @return {Node} node to which the dom has been attached.
       */
      _attachDom(dom) {
        if (this.attachShadow) {
          if (dom) {
            if (!this.shadowRoot) {
              this.attachShadow({mode: 'open'});
            }
            this.shadowRoot.appendChild(dom);
            return this.shadowRoot;
          }
          return null;
        } else {
          throw new Error('ShadowDOM not available. ' +
            // TODO(sorvell): move to compile-time conditional when supported
          'Polymer.Element can create dom as children instead of in ' +
          'ShadowDOM by setting `this.root = this;\` before \`ready\`.');
        }
      }

      /**
       * Provides a default implementation of the standard Custom Elements
       * `attributeChangedCallback`.
       *
       * By default, attributes declared in `properties` metadata are
       * deserialized using their `type` information to properties of the
       * same name.  "Dash-cased" attributes are deserialzed to "camelCase"
       * properties.
       *
       * @param {string} name Name of attribute.
       * @param {?string} old Old value of attribute.
       * @param {?string} value Current value of attribute.
       * @override
       */
      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          let property = caseMap.dashToCamelCase(name);
          let type = propertiesForClass(this.constructor)[property].type;
          if (!this._hasReadOnlyEffect(property)) {
            this._attributeToProperty(name, value, type);
          }
        }
      }

      /**
       * When using the ShadyCSS scoping and custom property shim, causes all
       * shimmed styles in this element (and its subtree) to be updated
       * based on current custom property values.
       *
       * The optional parameter overrides inline custom property styles with an
       * object of properties where the keys are CSS properties, and the values
       * are strings.
       *
       * Example: `this.updateStyles({'--color': 'blue'})`
       *
       * These properties are retained unless a value of `null` is set.
       *
       * @param {Object=} properties Bag of custom property key/values to
       *   apply to this element.
       * @suppress {invalidCasts}
       */
      updateStyles(properties) {
        if (window.ShadyCSS) {
          window.ShadyCSS.styleSubtree(/** @type {!HTMLElement} */(this), properties);
        }
      }

      /**
       * Rewrites a given URL relative to a base URL. The base URL defaults to
       * the original location of the document containing the `dom-module` for
       * this element. This method will return the same URL before and after
       * bundling.
       *
       * @param {string} url URL to resolve.
       * @param {string=} base Optional base URL to resolve against, defaults
       * to the element's `importPath`
       * @return {string} Rewritten URL relative to base
       */
      resolveUrl(url, base) {
        if (!base && this.importPath) {
          base = Polymer.ResolveUrl.resolveUrl(this.importPath);
        }
        return Polymer.ResolveUrl.resolveUrl(url, base);
      }

      /**
       * Overrides `PropertyAccessors` to add map of dynamic functions on
       * template info, for consumption by `PropertyEffects` template binding
       * code. This map determines which method templates should have accessors
       * created for them.
       *
       * @override
       * @suppress {missingProperties} Interfaces in closure do not inherit statics, but classes do
       */
      static _parseTemplateContent(template, templateInfo, nodeInfo) {
        templateInfo.dynamicFns = templateInfo.dynamicFns || propertiesForClass(this);
        return super._parseTemplateContent(template, templateInfo, nodeInfo);
      }

    }

    return PolymerElement;
  });

  /**
   * Provides basic tracking of element definitions (registrations) and
   * instance counts.
   *
   * @namespace
   * @summary Provides basic tracking of element definitions (registrations) and
   * instance counts.
   */
  Polymer.telemetry = {
    /**
     * Total number of Polymer element instances created.
     * @type {number}
     */
    instanceCount: 0,
    /**
     * Array of Polymer element classes that have been finalized.
     * @type {Array<Polymer.Element>}
     */
    registrations: [],
    /**
     * @param {!PolymerElementConstructor} prototype Element prototype to log
     * @this {this}
     * @private
     */
    _regLog: function(prototype) {
      console.log('[' + prototype.is + ']: registered')
    },
    /**
     * Registers a class prototype for telemetry purposes.
     * @param {HTMLElement} prototype Element prototype to register
     * @this {this}
     * @protected
     */
    register: function(prototype) {
      this.registrations.push(prototype);
      Polymer.log && this._regLog(prototype);
    },
    /**
     * Logs all elements registered with an `is` to the console.
     * @public
     * @this {this}
     */
    dumpRegistrations: function() {
      this.registrations.forEach(this._regLog);
    }
  };

  /**
   * When using the ShadyCSS scoping and custom property shim, causes all
   * shimmed `styles` (via `custom-style`) in the document (and its subtree)
   * to be updated based on current custom property values.
   *
   * The optional parameter overrides inline custom property styles with an
   * object of properties where the keys are CSS properties, and the values
   * are strings.
   *
   * Example: `Polymer.updateStyles({'--color': 'blue'})`
   *
   * These properties are retained unless a value of `null` is set.
   *
   * @param {Object=} props Bag of custom property key/values to
   *   apply to the document.
   */
  Polymer.updateStyles = function(props) {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleDocument(props);
    }
  };

})();



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(2);


/** @suppress {deprecated} */
(function() {
  'use strict';

  /**
   * Legacy settings.
   * @namespace
   * @memberof Polymer
   */
  const settings = Polymer.Settings || {};
  settings.useShadow = !(window.ShadyDOM);
  settings.useNativeCSSProperties =
    Boolean(!window.ShadyCSS || window.ShadyCSS.nativeCss);
  settings.useNativeCustomElements =
    !(window.customElements.polyfillWrapFlushCallback);

  /**
   * Sets the global, legacy settings.
   *
   * @deprecated
   * @memberof Polymer
   */
  Polymer.Settings = settings;

  /**
   * Globally settable property that is automatically assigned to
   * `Polymer.ElementMixin` instances, useful for binding in templates to
   * make URL's relative to an application's root.  Defaults to the main
   * document URL, but can be overridden by users.  It may be useful to set
   * `Polymer.rootPath` to provide a stable application mount path when
   * using client side routing.
   *
   * @memberof Polymer
   */
  let rootPath = Polymer.rootPath ||
    Polymer.ResolveUrl.pathFromUrl(document.baseURI || window.location.href);

  Polymer.rootPath = rootPath;

  /**
   * Sets the global rootPath property used by `Polymer.ElementMixin` and
   * available via `Polymer.rootPath`.
   *
   * @memberof Polymer
   * @param {string} path The new root path
   */
  Polymer.setRootPath = function(path) {
    Polymer.rootPath = path;
  }
})();



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(2);


(function() {
  'use strict';

  const MODULE_STYLE_LINK_SELECTOR = 'link[rel=import][type~=css]';
  const INCLUDE_ATTR = 'include';

  function importModule(moduleId) {
    if (!Polymer.DomModule) {
      return null;
    }
    return Polymer.DomModule.import(moduleId);
  }

  /** @typedef {{assetpath: string}} */
  let templateWithAssetPath; // eslint-disable-line no-unused-vars

  /**
   * Module with utilities for collection CSS text from `<templates>`, external
   * stylesheets, and `dom-module`s.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for collection CSS text from various sources.
   */
  const StyleGather = {

    /**
     * Returns CSS text of styles in a space-separated list of `dom-module`s.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleIds List of dom-module id's within which to
     * search for css.
     * @return {string} Concatenated CSS content from specified `dom-module`s
     * @this {StyleGather}
     */
    cssFromModules(moduleIds) {
      let modules = moduleIds.trim().split(' ');
      let cssText = '';
      for (let i=0; i < modules.length; i++) {
        cssText += this.cssFromModule(modules[i]);
      }
      return cssText;
    },

    /**
     * Returns CSS text of styles in a given `dom-module`.  CSS in a `dom-module`
     * can come either from `<style>`s within the first `<template>`, or else
     * from one or more `<link rel="import" type="css">` links outside the
     * template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId dom-module id to gather styles from
     * @return {string} Concatenated CSS content from specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModule(moduleId) {
      let m = importModule(moduleId);
      if (m && m._cssText === undefined) {
        let cssText = '';
        // include css from the first template in the module
        let t = m.querySelector('template');
        if (t) {
          cssText += this.cssFromTemplate(t, /** @type {templateWithAssetPath }*/(m).assetpath);
        }
        // module imports: <link rel="import" type="css">
        cssText += this.cssFromModuleImports(moduleId);
        m._cssText = cssText || null;
      }
      if (!m) {
        console.warn('Could not find style data in module named', moduleId);
      }
      return m && m._cssText || '';
    },

    /**
     * Returns CSS text of `<styles>` within a given template.
     *
     * Any `<styles>` processed are removed from their original location.
     *
     * @memberof Polymer.StyleGather
     * @param {HTMLTemplateElement} template Template to gather styles from
     * @param {string} baseURI Base URI to resolve the URL against
     * @return {string} Concatenated CSS content from specified template
     * @this {StyleGather}
     */
    cssFromTemplate(template, baseURI) {
      let cssText = '';
      // if element is a template, get content from its .content
      let e$ = template.content.querySelectorAll('style');
      for (let i=0; i < e$.length; i++) {
        let e = e$[i];
        // support style sharing by allowing styles to "include"
        // other dom-modules that contain styling
        let include = e.getAttribute(INCLUDE_ATTR);
        if (include) {
          cssText += this.cssFromModules(include);
        }
        e.parentNode.removeChild(e);
        cssText += baseURI ?
          Polymer.ResolveUrl.resolveCss(e.textContent, baseURI) : e.textContent;
      }
      return cssText;
    },

    /**
     * Returns CSS text from stylsheets loaded via `<link rel="import" type="css">`
     * links within the specified `dom-module`.
     *
     * @memberof Polymer.StyleGather
     * @param {string} moduleId Id of `dom-module` to gather CSS from
     * @return {string} Concatenated CSS content from links in specified `dom-module`
     * @this {StyleGather}
     */
    cssFromModuleImports(moduleId) {
      let cssText = '';
      let m = importModule(moduleId);
      if (!m) {
        return cssText;
      }
      let p$ = m.querySelectorAll(MODULE_STYLE_LINK_SELECTOR);
      for (let i=0; i < p$.length; i++) {
        let p = p$[i];
        if (p.import) {
          let importDoc = p.import;
          // NOTE: polyfill affordance.
          // under the HTMLImports polyfill, there will be no 'body',
          // but the import pseudo-doc can be used directly.
          let container = importDoc.body ? importDoc.body : importDoc;
          cssText +=
            Polymer.ResolveUrl.resolveCss(container.textContent,
              importDoc.baseURI);
        }
      }
      return cssText;
    }
  };

  Polymer.StyleGather = StyleGather;
})();



/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(2);


(function() {
  'use strict';

  let modules = {};
  let lcModules = {};
  function findModule(id) {
    return modules[id] || lcModules[id.toLowerCase()];
  }

  function styleOutsideTemplateCheck(inst) {
    if (inst.querySelector('style')) {
      console.warn('dom-module %s has style outside template', inst.id);
    }
  }

  /**
   * The `dom-module` element registers the dom it contains to the name given
   * by the module's id attribute. It provides a unified database of dom
   * accessible via its static `import` API.
   *
   * A key use case of `dom-module` is for providing custom element `<template>`s
   * via HTML imports that are parsed by the native HTML parser, that can be
   * relocated during a bundling pass and still looked up by `id`.
   *
   * Example:
   *
   *     <dom-module id="foo">
   *       <img src="stuff.png">
   *     </dom-module>
   *
   * Then in code in some other location that cannot access the dom-module above
   *
   *     let img = document.createElement('dom-module').import('foo', 'img');
   *
   * @customElement
   * @extends HTMLElement
   * @memberof Polymer
   * @summary Custom element that provides a registry of relocatable DOM content
   *   by `id` that is agnostic to bundling.
   * @unrestricted
   */
  class DomModule extends HTMLElement {

    static get observedAttributes() { return ['id'] }

    /**
     * Retrieves the element specified by the css `selector` in the module
     * registered by `id`. For example, this.import('foo', 'img');
     * @param {string} id The id of the dom-module in which to search.
     * @param {string=} selector The css selector by which to find the element.
     * @return {Element} Returns the element which matches `selector` in the
     * module registered at the specified `id`.
     */
    static import(id, selector) {
      if (id) {
        let m = findModule(id);
        if (m && selector) {
          return m.querySelector(selector);
        }
        return m;
      }
      return null;
    }

    attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this.register();
      }
    }

    /**
     * The absolute URL of the original location of this `dom-module`.
     *
     * This value will differ from this element's `ownerDocument` in the
     * following ways:
     * - Takes into account any `assetpath` attribute added during bundling
     *   to indicate the original location relative to the bundled location
     * - Uses the HTMLImports polyfill's `importForElement` API to ensure
     *   the path is relative to the import document's location since
     *   `ownerDocument` is not currently polyfilled
     */
    get assetpath() {
      // Don't override existing assetpath.
      if (!this.__assetpath) {
        // note: assetpath set via an attribute must be relative to this
        // element's location; accomodate polyfilled HTMLImports
        const owner = window.HTMLImports && HTMLImports.importForElement ?
          HTMLImports.importForElement(this) || document : this.ownerDocument;
        const url = Polymer.ResolveUrl.resolveUrl(
          this.getAttribute('assetpath') || '', owner.baseURI);
        this.__assetpath = Polymer.ResolveUrl.pathFromUrl(url);
      }
      return this.__assetpath;
    }

    /**
     * Registers the dom-module at a given id. This method should only be called
     * when a dom-module is imperatively created. For
     * example, `document.createElement('dom-module').register('foo')`.
     * @param {string=} id The id at which to register the dom-module.
     */
    register(id) {
      id = id || this.id;
      if (id) {
        this.id = id;
        // store id separate from lowercased id so that
        // in all cases mixedCase id will stored distinctly
        // and lowercase version is a fallback
        modules[id] = this;
        lcModules[id.toLowerCase()] = this;
        styleOutsideTemplateCheck(this);
      }
    }
  }

  DomModule.prototype['modules'] = modules;

  customElements.define('dom-module', DomModule);

  // export
  Polymer.DomModule = DomModule;

})();



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {
  'use strict';

  /**
   * Module with utilities for manipulating structured data path strings.
   *
   * @namespace
   * @memberof Polymer
   * @summary Module with utilities for manipulating structured data path strings.
   */
  const Path = {

    /**
     * Returns true if the given string is a structured data path (has dots).
     *
     * Example:
     *
     * ```
     * Polymer.Path.isPath('foo.bar.baz') // true
     * Polymer.Path.isPath('foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {boolean} True if the string contained one or more dots
     */
    isPath: function(path) {
      return path.indexOf('.') >= 0;
    },

    /**
     * Returns the root property name for the given path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.root('foo.bar.baz') // 'foo'
     * Polymer.Path.root('foo')         // 'foo'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} path Path string
     * @return {string} Root property name
     */
    root: function(path) {
      let dotIndex = path.indexOf('.');
      if (dotIndex === -1) {
        return path;
      }
      return path.slice(0, dotIndex);
    },

    /**
     * Given `base` is `foo.bar`, `foo` is an ancestor, `foo.bar` is not
     * Returns true if the given path is an ancestor of the base path.
     *
     * Example:
     *
     * ```
     * Polymer.Path.isAncestor('foo.bar', 'foo')         // true
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isAncestor('foo.bar', 'foo.bar.baz') // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is an ancestor of `base`.
     */
    isAncestor: function(base, path) {
      //     base.startsWith(path + '.');
      return base.indexOf(path + '.') === 0;
    },

    /**
     * Given `base` is `foo.bar`, `foo.bar.baz` is an descendant
     *
     * Example:
     *
     * ```
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar.baz') // true
     * Polymer.Path.isDescendant('foo.bar', 'foo.bar')     // false
     * Polymer.Path.isDescendant('foo.bar', 'foo')         // false
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Path string to test against.
     * @param {string} path Path string to test.
     * @return {boolean} True if `path` is a descendant of `base`.
     */
    isDescendant: function(base, path) {
      //     path.startsWith(base + '.');
      return path.indexOf(base + '.') === 0;
    },

    /**
     * Replaces a previous base path with a new base path, preserving the
     * remainder of the path.
     *
     * User must ensure `path` has a prefix of `base`.
     *
     * Example:
     *
     * ```
     * Polymer.Path.translate('foo.bar', 'zot' 'foo.bar.baz') // 'zot.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string} base Current base string to remove
     * @param {string} newBase New base string to replace with
     * @param {string} path Path to translate
     * @return {string} Translated string
     */
    translate: function(base, newBase, path) {
      return newBase + path.slice(base.length);
    },

    /**
     * @param {string} base Path string to test against
     * @param {string} path Path string to test
     * @return {boolean} True if `path` is equal to `base`
     * @this {Path}
     */
    matches: function(base, path) {
      return (base === path) ||
             this.isAncestor(base, path) ||
             this.isDescendant(base, path);
    },

    /**
     * Converts array-based paths to flattened path.  String-based paths
     * are returned as-is.
     *
     * Example:
     *
     * ```
     * Polymer.Path.normalize(['foo.bar', 0, 'baz'])  // 'foo.bar.0.baz'
     * Polymer.Path.normalize('foo.bar.0.baz')        // 'foo.bar.0.baz'
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {string} Flattened path
     */
    normalize: function(path) {
      if (Array.isArray(path)) {
        let parts = [];
        for (let i=0; i<path.length; i++) {
          let args = path[i].toString().split('.');
          for (let j=0; j<args.length; j++) {
            parts.push(args[j]);
          }
        }
        return parts.join('.');
      } else {
        return path;
      }
    },

    /**
     * Splits a path into an array of property names. Accepts either arrays
     * of path parts or strings.
     *
     * Example:
     *
     * ```
     * Polymer.Path.split(['foo.bar', 0, 'baz'])  // ['foo', 'bar', '0', 'baz']
     * Polymer.Path.split('foo.bar.0.baz')        // ['foo', 'bar', '0', 'baz']
     * ```
     *
     * @memberof Polymer.Path
     * @param {string | !Array<string|number>} path Input path
     * @return {!Array<string>} Array of path parts
     * @this {Path}
     * @suppress {checkTypes}
     */
    split: function(path) {
      if (Array.isArray(path)) {
        return this.normalize(path).split('.');
      }
      return path.toString().split('.');
    },

    /**
     * Reads a value from a path.  If any sub-property in the path is `undefined`,
     * this method returns `undefined` (will never throw.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to read
     * @param {Object=} info If an object is provided to `info`, the normalized
     *  (flattened) path will be set to `info.path`.
     * @return {*} Value at path, or `undefined` if the path could not be
     *  fully dereferenced.
     * @this {Path}
     */
    get: function(root, path, info) {
      let prop = root;
      let parts = this.split(path);
      // Loop over path parts[0..n-1] and dereference
      for (let i=0; i<parts.length; i++) {
        if (!prop) {
          return;
        }
        let part = parts[i];
        prop = prop[part];
      }
      if (info) {
        info.path = parts.join('.');
      }
      return prop;
    },

    /**
     * Sets a value to a path.  If any sub-property in the path is `undefined`,
     * this method will no-op.
     *
     * @memberof Polymer.Path
     * @param {Object} root Object from which to dereference path from
     * @param {string | !Array<string|number>} path Path to set
     * @param {*} value Value to set to path
     * @return {string | undefined} The normalized version of the input path
     * @this {Path}
     */
    set: function(root, path, value) {
      let prop = root;
      let parts = this.split(path);
      let last = parts[parts.length-1];
      if (parts.length > 1) {
        // Loop over path parts[0..n-2] and dereference
        for (let i=0; i<parts.length-1; i++) {
          let part = parts[i];
          prop = prop[part];
          if (!prop) {
            return;
          }
        }
        // Set value to object at end of path
        prop[last] = value;
      } else {
        // Simple property set
        prop[path] = value;
      }
      return parts.join('.');
    }

  };

  /**
   * Returns true if the given string is a structured data path (has dots).
   *
   * This function is deprecated.  Use `Polymer.Path.isPath` instead.
   *
   * Example:
   *
   * ```
   * Polymer.Path.isDeep('foo.bar.baz') // true
   * Polymer.Path.isDeep('foo')         // false
   * ```
   *
   * @deprecated
   * @memberof Polymer.Path
   * @param {string} path Path string
   * @return {boolean} True if the string contained one or more dots
   */
  Path.isDeep = Path.isPath;

  Polymer.Path = Path;

})();



/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(3);

__webpack_require__(7);


(function() {

  'use strict';

  let caseMap = Polymer.CaseMap;

  let microtask = Polymer.Async.microTask;

  // Save map of native properties; this forms a blacklist or properties
  // that won't have their values "saved" by `saveAccessorValue`, since
  // reading from an HTMLElement accessor from the context of a prototype throws
  const nativeProperties = {};
  let proto = HTMLElement.prototype;
  while (proto) {
    let props = Object.getOwnPropertyNames(proto);
    for (let i=0; i<props.length; i++) {
      nativeProperties[props[i]] = true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  /**
   * Used to save the value of a property that will be overridden with
   * an accessor. If the `model` is a prototype, the values will be saved
   * in `__dataProto`, and it's up to the user (or downstream mixin) to
   * decide how/when to set these values back into the accessors.
   * If `model` is already an instance (it has a `__data` property), then
   * the value will be set as a pending property, meaning the user should
   * call `_invalidateProperties` or `_flushProperties` to take effect
   *
   * @param {Object} model Prototype or instance
   * @param {string} property Name of property
   * @private
   */
  function saveAccessorValue(model, property) {
    // Don't read/store value for any native properties since they could throw
    if (!nativeProperties[property]) {
      let value = model[property];
      if (value !== undefined) {
        if (model.__data) {
          // Adding accessor to instance; update the property
          // It is the user's responsibility to call _flushProperties
          model._setPendingProperty(property, value);
        } else {
          // Adding accessor to proto; save proto's value for instance-time use
          if (!model.__dataProto) {
            model.__dataProto = {};
          } else if (!model.hasOwnProperty(JSCompiler_renameProperty('__dataProto', model))) {
            model.__dataProto = Object.create(model.__dataProto);
          }
          model.__dataProto[property] = value;
        }
      }
    }
  }

  /**
   * Element class mixin that provides basic meta-programming for creating one
   * or more property accessors (getter/setter pair) that enqueue an async
   * (batched) `_propertiesChanged` callback.
   *
   * For basic usage of this mixin, simply declare attributes to observe via
   * the standard `static get observedAttributes()`, implement `_propertiesChanged`
   * on the class, and then call `MyClass.createPropertiesForAttributes()` once
   * on the class to generate property accessors for each observed attribute
   * prior to instancing.  Last, call `this._flushProperties()` once to enable
   * the accessors.
   *
   * Any `observedAttributes` will automatically be
   * deserialized via `attributeChangedCallback` and set to the associated
   * property using `dash-case`-to-`camelCase` convention.
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin for reacting to property changes from
   *   generated property accessors.
   */
  Polymer.PropertyAccessors = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_PropertyAccessors}
     * @extends HTMLElement
     * @unrestricted
     */
    class PropertyAccessors extends superClass {

      /**
       * Generates property accessors for all attributes in the standard
       * static `observedAttributes` array.
       *
       * Attribute names are mapped to property names using the `dash-case` to
       * `camelCase` convention
       *
       */
      static createPropertiesForAttributes() {
        let a$ = this.observedAttributes;
        for (let i=0; i < a$.length; i++) {
          this.prototype._createPropertyAccessor(caseMap.dashToCamelCase(a$[i]));
        }
      }

      constructor() {
        super();
        /** @type {boolean} */
        this.__serializing;
        /** @type {number} */
        this.__dataCounter;
        /** @type {boolean} */
        this.__dataEnabled;
        /** @type {boolean} */
        this.__dataReady;
        /** @type {boolean} */
        this.__dataInvalid;
        /** @type {!Object} */
        this.__data;
        /** @type {Object} */
        this.__dataPending;
        /** @type {Object} */
        this.__dataOld;
        /** @type {Object} */
        this.__dataProto;
        /** @type {Object} */
        this.__dataHasAccessor;
        /** @type {Object} */
        this.__dataInstanceProps;
        this._initializeProperties();
      }

      /**
       * Implements native Custom Elements `attributeChangedCallback` to
       * set an attribute value to a property via `_attributeToProperty`.
       *
       * @param {string} name Name of attribute that changed
       * @param {?string} old Old attribute value
       * @param {?string} value New attribute value
       */
      attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this._attributeToProperty(name, value);
        }
      }

      /**
       * Initializes the local storage for property accessors.
       *
       * Provided as an override point for performing any setup work prior
       * to initializing the property accessor system.
       *
       * @protected
       */
      _initializeProperties() {
        this.__serializing = false;
        this.__dataCounter = 0;
        this.__dataEnabled = false;
        this.__dataReady = false;
        this.__dataInvalid = false;
        this.__data = {};
        this.__dataPending = null;
        this.__dataOld = null;
        if (this.__dataProto) {
          this._initializeProtoProperties(this.__dataProto);
          this.__dataProto = null;
        }
        // Capture instance properties; these will be set into accessors
        // during first flush. Don't set them here, since we want
        // these to overwrite defaults/constructor assignments
        for (let p in this.__dataHasAccessor) {
          if (this.hasOwnProperty(p)) {
            this.__dataInstanceProps = this.__dataInstanceProps || {};
            this.__dataInstanceProps[p] = this[p];
            delete this[p];
          }
        }
      }

      /**
       * Called at instance time with bag of properties that were overwritten
       * by accessors on the prototype when accessors were created.
       *
       * The default implementation sets these properties back into the
       * setter at instance time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @protected
       */
      _initializeProtoProperties(props) {
        for (let p in props) {
          this._setProperty(p, props[p]);
        }
      }

      /**
       * Called at ready time with bag of instance properties that overwrote
       * accessors when the element upgraded.
       *
       * The default implementation sets these properties back into the
       * setter at ready time.  This method is provided as an override
       * point for customizing or providing more efficient initialization.
       *
       * @param {Object} props Bag of property values that were overwritten
       *   when creating property accessors.
       * @protected
       */
      _initializeInstanceProperties(props) {
        Object.assign(this, props);
      }

      /**
       * Ensures the element has the given attribute. If it does not,
       * assigns the given value to the attribute.
       *
       *
       * @param {string} attribute Name of attribute to ensure is set.
       * @param {string} value of the attribute.
       */
      _ensureAttribute(attribute, value) {
        if (!this.hasAttribute(attribute)) {
          this._valueToNodeAttribute(this, value, attribute);
        }
      }

      /**
       * Deserializes an attribute to its associated property.
       *
       * This method calls the `_deserializeValue` method to convert the string to
       * a typed value.
       *
       * @param {string} attribute Name of attribute to deserialize.
       * @param {?string} value of the attribute.
       * @param {*=} type type to deserialize to.
       */
      _attributeToProperty(attribute, value, type) {
        // Don't deserialize back to property if currently reflecting
        if (!this.__serializing) {
          let property = caseMap.dashToCamelCase(attribute);
          this[property] = this._deserializeValue(value, type);
        }
      }

      /**
       * Serializes a property to its associated attribute.
       *
       * @param {string} property Property name to reflect.
       * @param {string=} attribute Attribute name to reflect.
       * @param {*=} value Property value to refect.
       */
      _propertyToAttribute(property, attribute, value) {
        this.__serializing = true;
        value = (arguments.length < 3) ? this[property] : value;
        this._valueToNodeAttribute(this, value,
          attribute || caseMap.camelToDashCase(property));
        this.__serializing = false;
      }

      /**
       * Sets a typed value to an HTML attribute on a node.
       *
       * This method calls the `_serializeValue` method to convert the typed
       * value to a string.  If the `_serializeValue` method returns `undefined`,
       * the attribute will be removed (this is the default for boolean
       * type `false`).
       *
       * @param {Element} node Element to set attribute to.
       * @param {*} value Value to serialize.
       * @param {string} attribute Attribute name to serialize to.
       */
      _valueToNodeAttribute(node, value, attribute) {
        let str = this._serializeValue(value);
        if (str === undefined) {
          node.removeAttribute(attribute);
        } else {
          node.setAttribute(attribute, str);
        }
      }

      /**
       * Converts a typed JavaScript value to a string.
       *
       * This method is called by Polymer when setting JS property values to
       * HTML attributes.  Users may override this method on Polymer element
       * prototypes to provide serialization for custom types.
       *
       * @param {*} value Property value to serialize.
       * @return {string | undefined} String serialized from the provided property value.
       */
      _serializeValue(value) {
        /* eslint-disable no-fallthrough */
        switch (typeof value) {
          case 'boolean':
            return value ? '' : undefined;

          case 'object':
            if (value instanceof Date) {
              return value.toString();
            } else if (value) {
              try {
                return JSON.stringify(value);
              } catch(x) {
                return '';
              }
            }

          default:
            return value != null ? value.toString() : undefined;
        }
      }

      /**
       * Converts a string to a typed JavaScript value.
       *
       * This method is called by Polymer when reading HTML attribute values to
       * JS properties.  Users may override this method on Polymer element
       * prototypes to provide deserialization for custom `type`s.  Note,
       * the `type` argument is the value of the `type` field provided in the
       * `properties` configuration object for a given property, and is
       * by convention the constructor for the type to deserialize.
       *
       * Note: The return value of `undefined` is used as a sentinel value to
       * indicate the attribute should be removed.
       *
       * @param {?string} value Attribute value to deserialize.
       * @param {*=} type Type to deserialize the string to.
       * @return {*} Typed value deserialized from the provided string.
       */
      _deserializeValue(value, type) {
        /**
         * @type {*}
         */
        let outValue;
        switch (type) {
          case Number:
            outValue = Number(value);
            break;

          case Boolean:
            outValue = (value !== null);
            break;

          case Object:
            try {
              outValue = JSON.parse(/** @type string */(value));
            } catch(x) {
              // allow non-JSON literals like Strings and Numbers
            }
            break;

          case Array:
            try {
              outValue = JSON.parse(/** @type string */(value));
            } catch(x) {
              outValue = null;
              console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${value}`);
            }
            break;

          case Date:
            outValue = new Date(value);
            break;

          case String:
          default:
            outValue = value;
            break;
        }

        return outValue;
      }
      /* eslint-enable no-fallthrough */

      /**
       * Creates a setter/getter pair for the named property with its own
       * local storage.  The getter returns the value in the local storage,
       * and the setter calls `_setProperty`, which updates the local storage
       * for the property and enqueues a `_propertiesChanged` callback.
       *
       * This method may be called on a prototype or an instance.  Calling
       * this method may overwrite a property value that already exists on
       * the prototype/instance by creating the accessor.  When calling on
       * a prototype, any overwritten values are saved in `__dataProto`,
       * and it is up to the subclasser to decide how/when to set those
       * properties back into the accessor.  When calling on an instance,
       * the overwritten value is set via `_setPendingProperty`, and the
       * user should call `_invalidateProperties` or `_flushProperties`
       * for the values to take effect.
       *
       * @param {string} property Name of the property
       * @param {boolean=} readOnly When true, no setter is created; the
       *   protected `_setProperty` function must be used to set the property
       * @protected
       */
      _createPropertyAccessor(property, readOnly) {
        if (!this.hasOwnProperty('__dataHasAccessor')) {
          this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor);
        }
        if (!this.__dataHasAccessor[property]) {
          this.__dataHasAccessor[property] = true;
          saveAccessorValue(this, property);
          Object.defineProperty(this, property, {
            /* eslint-disable valid-jsdoc */
            /** @this {PropertyAccessors} */
            get: function() {
              return this.__data[property];
            },
            /** @this {PropertyAccessors} */
            set: readOnly ? function() {} : function(value) {
              this._setProperty(property, value);
            }
            /* eslint-enable */
          });
        }
      }

      /**
       * Returns true if this library created an accessor for the given property.
       *
       * @param {string} property Property name
       * @return {boolean} True if an accessor was created
       */
      _hasAccessor(property) {
        return this.__dataHasAccessor && this.__dataHasAccessor[property];
      }

      /**
       * Updates the local storage for a property (via `_setPendingProperty`)
       * and enqueues a `_proeprtiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @protected
       */
      _setProperty(property, value) {
        if (this._setPendingProperty(property, value)) {
          this._invalidateProperties();
        }
      }

      /**
       * Updates the local storage for a property, records the previous value,
       * and adds it to the set of "pending changes" that will be passed to the
       * `_propertiesChanged` callback.  This method does not enqueue the
       * `_propertiesChanged` callback.
       *
       * @param {string} property Name of the property
       * @param {*} value Value to set
       * @return {boolean} Returns true if the property changed
       * @protected
       */
      _setPendingProperty(property, value) {
        let old = this.__data[property];
        let changed = this._shouldPropertyChange(property, value, old)
        if (changed) {
          if (!this.__dataPending) {
            this.__dataPending = {};
            this.__dataOld = {};
          }
          // Ensure old is captured from the last turn
          if (this.__dataOld && !(property in this.__dataOld)) {
            this.__dataOld[property] = old;
          }
          this.__data[property] = value;
          this.__dataPending[property] = value;
        }
        return changed;
      }

      /**
       * Returns true if the specified property has a pending change.
       *
       * @param {string} prop Property name
       * @return {boolean} True if property has a pending change
       * @protected
       */
      _isPropertyPending(prop) {
        return Boolean(this.__dataPending && (prop in this.__dataPending));
      }

      /**
       * Marks the properties as invalid, and enqueues an async
       * `_propertiesChanged` callback.
       *
       * @protected
       */
      _invalidateProperties() {
        if (!this.__dataInvalid && this.__dataReady) {
          this.__dataInvalid = true;
          microtask.run(() => {
            if (this.__dataInvalid) {
              this.__dataInvalid = false;
              this._flushProperties();
            }
          });
        }
      }

      /**
       * Call to enable property accessor processing. Before this method is
       * called accessor values will be set but side effects are
       * queued. When called, any pending side effects occur immediately.
       * For elements, generally `connectedCallback` is a normal spot to do so.
       * It is safe to call this method multiple times as it only turns on
       * property accessors once.
       */
      _enableProperties() {
        if (!this.__dataEnabled) {
          this.__dataEnabled = true;
          if (this.__dataInstanceProps) {
            this._initializeInstanceProperties(this.__dataInstanceProps);
            this.__dataInstanceProps = null;
          }
          this.ready()
        }
      }

      /**
       * Calls the `_propertiesChanged` callback with the current set of
       * pending changes (and old values recorded when pending changes were
       * set), and resets the pending set of changes. Generally, this method
       * should not be called in user code.
       *
       *
       * @protected
       */
      _flushProperties() {
        if (this.__dataPending && this.__dataOld) {
          let changedProps = this.__dataPending;
          this.__dataPending = null;
          this.__dataCounter++;
          this._propertiesChanged(this.__data, changedProps, this.__dataOld);
          this.__dataCounter--;
        }
      }

      /**
       * Lifecycle callback called the first time properties are being flushed.
       * Prior to `ready`, all property sets through accessors are queued and
       * their effects are flushed after this method returns.
       *
       * Users may override this function to implement behavior that is
       * dependent on the element having its properties initialized, e.g.
       * from defaults (initialized from `constructor`, `_initializeProperties`),
       * `attributeChangedCallback`, or values propagated from host e.g. via
       * bindings.  `super.ready()` must be called to ensure the data system
       * becomes enabled.
       *
       * @public
       */
      ready() {
        this.__dataReady = true;
        // Run normal flush
        this._flushProperties();
      }

      /**
       * Callback called when any properties with accessors created via
       * `_createPropertyAccessor` have been set.
       *
       * @param {!Object} currentProps Bag of all current accessor values
       * @param {!Object} changedProps Bag of properties changed since the last
       *   call to `_propertiesChanged`
       * @param {!Object} oldProps Bag of previous values for each property
       *   in `changedProps`
       * @protected
       */
      _propertiesChanged(currentProps, changedProps, oldProps) { // eslint-disable-line no-unused-vars
      }

      /**
       * Method called to determine whether a property value should be
       * considered as a change and cause the `_propertiesChanged` callback
       * to be enqueued.
       *
       * The default implementation returns `true` for primitive types if a
       * strict equality check fails, and returns `true` for all Object/Arrays.
       * The method always returns false for `NaN`.
       *
       * Override this method to e.g. provide stricter checking for
       * Objects/Arrays when using immutable patterns.
       *
       * @param {string} property Property name
       * @param {*} value New property value
       * @param {*} old Previous property value
       * @return {boolean} Whether the property should be considered a change
       *   and enqueue a `_proeprtiesChanged` callback
       * @protected
       */
      _shouldPropertyChange(property, value, old) {
        return (
          // Strict equality check
          (old !== value &&
           // This ensures (old==NaN, value==NaN) always returns false
           (old === old || value === value))
        );
      }

    }

    return PropertyAccessors;

  });

})();



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);


(function() {

  'use strict';

  // 1.x backwards-compatible auto-wrapper for template type extensions
  // This is a clear layering violation and gives favored-nation status to
  // dom-if and dom-repeat templates.  This is a conceit we're choosing to keep
  // a.) to ease 1.x backwards-compatibility due to loss of `is`, and
  // b.) to maintain if/repeat capability in parser-constrained elements
  //     (e.g. table, select) in lieu of native CE type extensions without
  //     massive new invention in this space (e.g. directive system)
  const templateExtensions = {
    'dom-if': true,
    'dom-repeat': true
  };
  function wrapTemplateExtension(node) {
    let is = node.getAttribute('is');
    if (is && templateExtensions[is]) {
      let t = node;
      t.removeAttribute('is');
      node = t.ownerDocument.createElement(is);
      t.parentNode.replaceChild(node, t);
      node.appendChild(t);
      while(t.attributes.length) {
        node.setAttribute(t.attributes[0].name, t.attributes[0].value);
        t.removeAttribute(t.attributes[0].name);
      }
    }
    return node;
  }

  function findTemplateNode(root, nodeInfo) {
    // recursively ascend tree until we hit root
    let parent = nodeInfo.parentInfo && findTemplateNode(root, nodeInfo.parentInfo);
    // unwind the stack, returning the indexed node at each level
    if (parent) {
      // note: marginally faster than indexing via childNodes
      // (http://jsperf.com/childnodes-lookup)
      for (let n=parent.firstChild, i=0; n; n=n.nextSibling) {
        if (nodeInfo.parentIndex === i++) {
          return n;
        }
      }
    } else {
      return root;
    }
  }

  // construct `$` map (from id annotations)
  function applyIdToMap(inst, map, node, nodeInfo) {
    if (nodeInfo.id) {
      map[nodeInfo.id] = node;
    }
  }

  // install event listeners (from event annotations)
  function applyEventListener(inst, node, nodeInfo) {
    if (nodeInfo.events && nodeInfo.events.length) {
      for (let j=0, e$=nodeInfo.events, e; (j<e$.length) && (e=e$[j]); j++) {
        inst._addMethodEventListenerToNode(node, e.name, e.value, inst);
      }
    }
  }

  // push configuration references at configure time
  function applyTemplateContent(inst, node, nodeInfo) {
    if (nodeInfo.templateInfo) {
      node._templateInfo = nodeInfo.templateInfo;
    }
  }

  function createNodeEventHandler(context, eventName, methodName) {
    // Instances can optionally have a _methodHost which allows redirecting where
    // to find methods. Currently used by `templatize`.
    context = context._methodHost || context;
    let handler = function(e) {
      if (context[methodName]) {
        context[methodName](e, e.detail);
      } else {
        console.warn('listener method `' + methodName + '` not defined');
      }
    };
    return handler;
  }

  /**
   * Element mixin that provides basic template parsing and stamping, including
   * the following template-related features for stamped templates:
   *
   * - Declarative event listeners (`on-eventname="listener"`)
   * - Map of node id's to stamped node instances (`this.$.id`)
   * - Nested template content caching/removal and re-installation (performance
   *   optimization)
   *
   * @mixinFunction
   * @polymer
   * @memberof Polymer
   * @summary Element class mixin that provides basic template parsing and stamping
   */
  Polymer.TemplateStamp = Polymer.dedupingMixin(superClass => {

    /**
     * @polymer
     * @mixinClass
     * @implements {Polymer_TemplateStamp}
     */
    class TemplateStamp extends superClass {

      /**
       * Scans a template to produce template metadata.
       *
       * Template-specific metadata are stored in the object returned, and node-
       * specific metadata are stored in objects in its flattened `nodeInfoList`
       * array.  Only nodes in the template that were parsed as nodes of
       * interest contain an object in `nodeInfoList`.  Each `nodeInfo` object
       * contains an `index` (`childNodes` index in parent) and optionally
       * `parent`, which points to node info of its parent (including its index).
       *
       * The template metadata object returned from this method has the following
       * structure (many fields optional):
       *
       * ```js
       *   {
       *     // Flattened list of node metadata (for nodes that generated metadata)
       *     nodeInfoList: [
       *       {
       *         // `id` attribute for any nodes with id's for generating `$` map
       *         id: {string},
       *         // `on-event="handler"` metadata
       *         events: [
       *           {
       *             name: {string},   // event name
       *             value: {string},  // handler method name
       *           }, ...
       *         ],
       *         // Notes when the template contained a `<slot>` for shady DOM
       *         // optimization purposes
       *         hasInsertionPoint: {boolean},
       *         // For nested `<template>`` nodes, nested template metadata
       *         templateInfo: {object}, // nested template metadata
       *         // Metadata to allow efficient retrieval of instanced node
       *         // corresponding to this metadata
       *         parentInfo: {number},   // reference to parent nodeInfo>
       *         parentIndex: {number},  // index in parent's `childNodes` collection
       *         infoIndex: {number},    // index of this `nodeInfo` in `templateInfo.nodeInfoList`
       *       },
       *       ...
       *     ],
       *     // When true, the template had the `strip-whitespace` attribute
       *     // or was nested in a template with that setting
       *     stripWhitespace: {boolean},
       *     // For nested templates, nested template content is moved into
       *     // a document fragment stored here; this is an optimization to
       *     // avoid the cost of nested template cloning
       *     content: {DocumentFragment}
       *   }
       * ```
       *
       * This method kicks off a recursive treewalk as follows:
       *
       * ```
       *    _parseTemplate <---------------------+
       *      _parseTemplateContent              |
       *        _parseTemplateNode  <------------|--+
       *          _parseTemplateNestedTemplate --+  |
       *          _parseTemplateChildNodes ---------+
       *          _parseTemplateNodeAttributes
       *            _parseTemplateNodeAttribute
       *
       * ```
       *
       * These methods may be overridden to add custom metadata about templates
       * to either `templateInfo` or `nodeInfo`.
       *
       * Note that this method may be destructive to the template, in that
       * e.g. event annotations may be removed after being noted in the
       * template metadata.
       *
       * @param {!HTMLTemplateElement} template Template to parse
       * @param {TemplateInfo=} outerTemplateInfo Template metadata from the outer
       *   template, for parsing nested templates
       * @return {!TemplateInfo} Parsed template metadata
       */
      static _parseTemplate(template, outerTemplateInfo) {
        // since a template may be re-used, memo-ize metadata
        if (!template._templateInfo) {
          let templateInfo = template._templateInfo = {};
          templateInfo.nodeInfoList = [];
          templateInfo.stripWhiteSpace =
            (outerTemplateInfo && outerTemplateInfo.stripWhiteSpace) ||
            template.hasAttribute('strip-whitespace');
          this._parseTemplateContent(template, templateInfo, {parent: null});
        }
        return template._templateInfo;
      }

      static _parseTemplateContent(template, templateInfo, nodeInfo) {
        return this._parseTemplateNode(template.content, templateInfo, nodeInfo);
      }

      /**
       * Parses template node and adds template and node metadata based on
       * the current node, and its `childNodes` and `attributes`.
       *
       * This method may be overridden to add custom node or template specific
       * metadata based on this node.
       *
       * @param {Node} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNode(node, templateInfo, nodeInfo) {
        let noted;
        let element = /** @type Element */(node);
        if (element.localName == 'template' && !element.hasAttribute('preserve-content')) {
          noted = this._parseTemplateNestedTemplate(element, templateInfo, nodeInfo) || noted;
        } else if (element.localName === 'slot') {
          // For ShadyDom optimization, indicating there is an insertion point
          templateInfo.hasInsertionPoint = true;
        }
        if (element.firstChild) {
          noted = this._parseTemplateChildNodes(element, templateInfo, nodeInfo) || noted;
        }
        if (element.hasAttributes && element.hasAttributes()) {
          noted = this._parseTemplateNodeAttributes(element, templateInfo, nodeInfo) || noted;
        }
        return noted;
      }

      /**
       * Parses template child nodes for the given root node.
       *
       * This method also wraps whitelisted legacy template extensions
       * (`is="dom-if"` and `is="dom-repeat"`) with their equivalent element
       * wrappers, collapses text nodes, and strips whitespace from the template
       * if the `templateInfo.stripWhitespace` setting was provided.
       *
       * @param {Node} root Root node whose `childNodes` will be parsed
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       */
      static _parseTemplateChildNodes(root, templateInfo, nodeInfo) {
        for (let node=root.firstChild, parentIndex=0, next; node; node=next) {
          // Wrap templates
          if (node.localName == 'template') {
            node = wrapTemplateExtension(node);
          }
          // collapse adjacent textNodes: fixes an IE issue that can cause
          // text nodes to be inexplicably split =(
          // note that root.normalize() should work but does not so we do this
          // manually.
          next = node.nextSibling;
          if (node.nodeType === Node.TEXT_NODE) {
            let /** Node */ n = next;
            while (n && (n.nodeType === Node.TEXT_NODE)) {
              node.textContent += n.textContent;
              next = n.nextSibling;
              root.removeChild(n);
              n = next;
            }
            // optionally strip whitespace
            if (templateInfo.stripWhiteSpace && !node.textContent.trim()) {
              root.removeChild(node);
              continue;
            }
          }
          let childInfo = { parentIndex, parentInfo: nodeInfo };
          if (this._parseTemplateNode(node, templateInfo, childInfo)) {
            childInfo.infoIndex = templateInfo.nodeInfoList.push(/** @type {!NodeInfo} */(childInfo)) - 1;
          }
          // Increment if not removed
          if (node.parentNode) {
            parentIndex++;
          }
        }
      }

      /**
       * Parses template content for the given nested `<template>`.
       *
       * Nested template info is stored as `templateInfo` in the current node's
       * `nodeInfo`. `template.content` is removed and stored in `templateInfo`.
       * It will then be the responsibility of the host to set it back to the
       * template and for users stamping nested templates to use the
       * `_contentForTemplate` method to retrieve the content for this template
       * (an optimization to avoid the cost of cloning nested template content).
       *
       * @param {HTMLTemplateElement} node Node to parse (a <template>)
       * @param {TemplateInfo} outerTemplateInfo Template metadata for current template
       *   that includes the template `node`
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNestedTemplate(node, outerTemplateInfo, nodeInfo) {
        let templateInfo = this._parseTemplate(node, outerTemplateInfo);
        let content = templateInfo.content =
          node.content.ownerDocument.createDocumentFragment();
        content.appendChild(node.content);
        nodeInfo.templateInfo = templateInfo;
        return true;
      }

      /**
       * Parses template node attributes and adds node metadata to `nodeInfo`
       * for nodes of interest.
       *
       * @param {Element} node Node to parse
       * @param {TemplateInfo} templateInfo Template metadata for current template
       * @param {NodeInfo} nodeInfo Node metadata for current template.
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNodeAttributes(node, templateInfo, nodeInfo) {
        // Make copy of original attribute list, since the order may change
        // as attributes are added and removed
        let noted = false;
        let attrs = Array.from(node.attributes);
        for (let i=attrs.length-1, a; (a=attrs[i]); i--) {
          noted = this._parseTemplateNodeAttribute(node, templateInfo, nodeInfo, a.name, a.value) || noted;
        }
        return noted;
      }

      /**
       * Parses a single template node attribute and adds node metadata to
       * `nodeInfo` for attributes of interest.
       *
       * This implementation adds metadata for `on-event="handler"` attributes
       * and `id` attributes.
       *
       * @param {Element} node Node to parse
       * @param {!TemplateInfo} templateInfo Template metadata for current template
       * @param {!NodeInfo} nodeInfo Node metadata for current template.
       * @param {string} name Attribute name
       * @param {string} value Attribute value
       * @return {boolean} `true` if the visited node added node-specific
       *   metadata to `nodeInfo`
       */
      static _parseTemplateNodeAttribute(node, templateInfo, nodeInfo, name, value) {
        // events (on-*)
        if (name.slice(0, 3) === 'on-') {
          node.removeAttribute(name);
          nodeInfo.events = nodeInfo.events || [];
          nodeInfo.events.push({
            name: name.slice(3),
            value
          });
          return true;
        }
        // static id
        else if (name === 'id') {
          nodeInfo.id = value;
          return true;
        }
        return false;
      }

      /**
       * Returns the `content` document fragment for a given template.
       *
       * For nested templates, Polymer performs an optimization to cache nested
       * template content to avoid the cost of cloning deeply nested templates.
       * This method retrieves the cached content for a given template.
       *
       * @param {HTMLTemplateElement} template Template to retrieve `content` for
       * @return {DocumentFragment} Content fragment
       */
      static _contentForTemplate(template) {
        let templateInfo = /** @type {HTMLTemplateElementWithInfo} */ (template)._templateInfo;
        return (templateInfo && templateInfo.content) || template.content;
      }

      /**
       * Clones the provided template content and returns a document fragment
       * containing the cloned dom.
       *
       * The template is parsed (once and memoized) using this library's
       * template parsing features, and provides the following value-added
       * features:
       * * Adds declarative event listeners for `on-event="handler"` attributes
       * * Generates an "id map" for all nodes with id's under `$` on returned
       *   document fragment
       * * Passes template info including `content` back to templates as
       *   `_templateInfo` (a performance optimization to avoid deep template
       *   cloning)
       *
       * Note that the memoized template parsing process is destructive to the
       * template: attributes for bindings and declarative event listeners are
       * removed after being noted in notes, and any nested `<template>.content`
       * is removed and stored in notes as well.
       *
       * @param {!HTMLTemplateElement} template Template to stamp
       * @return {!StampedTemplate} Cloned template content
       */
      _stampTemplate(template) {
        // Polyfill support: bootstrap the template if it has not already been
        if (template && !template.content &&
            window.HTMLTemplateElement && HTMLTemplateElement.decorate) {
          HTMLTemplateElement.decorate(template);
        }
        let templateInfo = this.constructor._parseTemplate(template);
        let nodeInfo = templateInfo.nodeInfoList;
        let content = templateInfo.content || template.content;
        let dom = /** @type DocumentFragment */ (document.importNode(content, true));
        // NOTE: ShadyDom optimization indicating there is an insertion point
        dom.__noInsertionPoint = !templateInfo.hasInsertionPoint;
        let nodes = dom.nodeList = new Array(nodeInfo.length);
        dom.$ = {};
        for (let i=0, l=nodeInfo.length, info; (i<l) && (info=nodeInfo[i]); i++) {
          let node = nodes[i] = findTemplateNode(dom, info);
          applyIdToMap(this, dom.$, node, info);
          applyTemplateContent(this, node, info);
          applyEventListener(this, node, info);
        }
        return /** @type {!StampedTemplate} */(dom);
      }

      /**
       * Adds an event listener by method name for the event provided.
       *
       * This method generates a handler function that looks up the method
       * name at handling time.
       *
       * @param {Node} node Node to add listener on
       * @param {string} eventName Name of event
       * @param {string} methodName Name of method
       * @param {*=} context Context the method will be called on (defaults
       *   to `node`)
       * @return {Function} Generated handler function
       */
      _addMethodEventListenerToNode(node, eventName, methodName, context) {
        context = context || node;
        let handler = createNodeEventHandler(context, eventName, methodName);
        this._addEventListenerToNode(node, eventName, handler);
        return handler;
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to add event listener to
       * @param {string} eventName Name of event
       * @param {Function} handler Listener function to add
       */
      _addEventListenerToNode(node, eventName, handler) {
        node.addEventListener(eventName, handler);
      }

      /**
       * Override point for adding custom or simulated event handling.
       *
       * @param {Node} node Node to remove event listener from
       * @param {string} eventName Name of event
       * @param {Function} handler Listener function to remove
       */
      _removeEventListenerFromNode(node, eventName, handler) {
        node.removeEventListener(eventName, handler);
      }

    }

    return TemplateStamp;

  });

})();



/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(5);

__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(8);


(function() {
  'use strict';

  let TemplateInstanceBase = Polymer.TemplateInstanceBase; // eslint-disable-line

  /**
   * @constructor
   * @implements {Polymer_OptionalMutableData}
   * @extends {Polymer.Element}
   */
  const domRepeatBase = Polymer.OptionalMutableData(Polymer.Element);

  /**
   * The `<dom-repeat>` element will automatically stamp and binds one instance
   * of template content to each object in a user-provided array.
   * `dom-repeat` accepts an `items` property, and one instance of the template
   * is stamped for each item into the DOM at the location of the `dom-repeat`
   * element.  The `item` property will be set on each instance's binding
   * scope, thus templates should bind to sub-properties of `item`.
   *
   * Example:
   *
   * ```html
   * <dom-module id="employee-list">
   *
   *   <template>
   *
   *     <div> Employee list: </div>
   *     <template is="dom-repeat" items="{{employees}}">
   *         <div>First name: <span>{{item.first}}</span></div>
   *         <div>Last name: <span>{{item.last}}</span></div>
   *     </template>
   *
   *   </template>
   *
   *   <script>
   *     Polymer({
   *       is: 'employee-list',
   *       ready: function() {
   *         this.employees = [
   *             {first: 'Bob', last: 'Smith'},
   *             {first: 'Sally', last: 'Johnson'},
   *             ...
   *         ];
   *       }
   *     });
   *   < /script>
   *
   * </dom-module>
   * ```
   *
   * Notifications for changes to items sub-properties will be forwarded to template
   * instances, which will update via the normal structured data notification system.
   *
   * Mutations to the `items` array itself should be made using the Array
   * mutation API's on `Polymer.Base` (`push`, `pop`, `splice`, `shift`,
   * `unshift`), and template instances will be kept in sync with the data in the
   * array.
   *
   * Events caught by event handlers within the `dom-repeat` template will be
   * decorated with a `model` property, which represents the binding scope for
   * each template instance.  The model is an instance of Polymer.Base, and should
   * be used to manipulate data on the instance, for example
   * `event.model.set('item.checked', true);`.
   *
   * Alternatively, the model for a template instance for an element stamped by
   * a `dom-repeat` can be obtained using the `modelForElement` API on the
   * `dom-repeat` that stamped it, for example
   * `this.$.domRepeat.modelForElement(event.target).set('item.checked', true);`.
   * This may be useful for manipulating instance data of event targets obtained
   * by event handlers on parents of the `dom-repeat` (event delegation).
   *
   * A view-specific filter/sort may be applied to each `dom-repeat` by supplying a
   * `filter` and/or `sort` property.  This may be a string that names a function on
   * the host, or a function may be assigned to the property directly.  The functions
   * should implemented following the standard `Array` filter/sort API.
   *
   * In order to re-run the filter or sort functions based on changes to sub-fields
   * of `items`, the `observe` property may be set as a space-separated list of
   * `item` sub-fields that should cause a re-filter/sort when modified.  If
   * the filter or sort function depends on properties not contained in `items`,
   * the user should observe changes to those properties and call `render` to update
   * the view based on the dependency change.
   *
   * For example, for an `dom-repeat` with a filter of the following:
   *
   * ```js
   * isEngineer: function(item) {
   *     return item.type == 'engineer' || item.manager.type == 'engineer';
   * }
   * ```
   *
   * Then the `observe` property should be configured as follows:
   *
   * ```html
   * <template is="dom-repeat" items="{{employees}}"
   *           filter="isEngineer" observe="type manager.type">
   * ```
   *
   * @customElement
   * @polymer
   * @memberof Polymer
   * @extends {domRepeatBase}
   * @appliesMixin Polymer.OptionalMutableData
   * @summary Custom element for stamping instance of a template bound to
   *   items in an array.
   */
  class DomRepeat extends domRepeatBase {

    // Not needed to find template; can be removed once the analyzer
    // can find the tag name from customElements.define call
    static get is() { return 'dom-repeat'; }

    static get template() { return null; }

    static get properties() {

      /**
       * Fired whenever DOM is added or removed by this template (by
       * default, rendering occurs lazily).  To force immediate rendering, call
       * `render`.
       *
       * @event dom-change
       */
      return {

        /**
         * An array containing items determining how many instances of the template
         * to stamp and that that each template instance should bind to.
         */
        items: {
          type: Array
        },

        /**
         * The name of the variable to add to the binding scope for the array
         * element associated with a given template instance.
         */
        as: {
          type: String,
          value: 'item'
        },

        /**
         * The name of the variable to add to the binding scope with the index
         * of the instance in the sorted and filtered list of rendered items.
         * Note, for the index in the `this.items` array, use the value of the
         * `itemsIndexAs` property.
         */
        indexAs: {
          type: String,
          value: 'index'
        },

        /**
         * The name of the variable to add to the binding scope with the index
         * of the instance in the `this.items` array. Note, for the index of
         * this instance in the sorted and filtered list of rendered items,
         * use the value of the `indexAs` property.
         */
        itemsIndexAs: {
          type: String,
          value: 'itemsIndex'
        },

        /**
         * A function that should determine the sort order of the items.  This
         * property should either be provided as a string, indicating a method
         * name on the element's host, or else be an actual function.  The
         * function should match the sort function passed to `Array.sort`.
         * Using a sort function has no effect on the underlying `items` array.
         */
        sort: {
          type: Function,
          observer: '__sortChanged'
        },

        /**
         * A function that can be used to filter items out of the view.  This
         * property should either be provided as a string, indicating a method
         * name on the element's host, or else be an actual function.  The
         * function should match the sort function passed to `Array.filter`.
         * Using a filter function has no effect on the underlying `items` array.
         */
        filter: {
          type: Function,
          observer: '__filterChanged'
        },

        /**
         * When using a `filter` or `sort` function, the `observe` property
         * should be set to a space-separated list of the names of item
         * sub-fields that should trigger a re-sort or re-filter when changed.
         * These should generally be fields of `item` that the sort or filter
         * function depends on.
         */
        observe: {
          type: String,
          observer: '__observeChanged'
        },

        /**
         * When using a `filter` or `sort` function, the `delay` property
         * determines a debounce time after a change to observed item
         * properties that must pass before the filter or sort is re-run.
         * This is useful in rate-limiting shuffing of the view when
         * item changes may be frequent.
         */
        delay: Number,

        /**
         * Count of currently rendered items after `filter` (if any) has been applied.
         * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
         * set of template instances is rendered.
         *
         */
        renderedItemCount: {
          type: Number,
          notify: true,
          readOnly: true
        },

        /**
         * Defines an initial count of template instances to render after setting
         * the `items` array, before the next paint, and puts the `dom-repeat`
         * into "chunking mode".  The remaining items will be created and rendered
         * incrementally at each animation frame therof until all instances have
         * been rendered.
         */
        initialCount: {
          type: Number,
          observer: '__initializeChunking'
        },

        /**
         * When `initialCount` is used, this property defines a frame rate to
         * target by throttling the number of instances rendered each frame to
         * not exceed the budget for the target frame rate.  Setting this to a
         * higher number will allow lower latency and higher throughput for
         * things like event handlers, but will result in a longer time for the
         * remaining items to complete rendering.
         */
        targetFramerate: {
          type: Number,
          value: 20
        },

        _targetFrameTime: {
          type: Number,
          computed: '__computeFrameTime(targetFramerate)'
        }

      }

    }

    static get observers() {
      return [ '__itemsChanged(items.*)' ]
    }

    constructor() {
      super();
      this.__instances = [];
      this.__limit = Infinity;
      this.__pool = [];
      this.__renderDebouncer = null;
      this.__itemsIdxToInstIdx = {};
      this.__chunkCount = null;
      this.__lastChunkTime = null;
      this.__sortFn = null;
      this.__filterFn = null;
      this.__observePaths = null;
      this.__ctor = null;
      this.__isDetached = true;
      this.template = null;
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.__isDetached = true;
      for (let i=0; i<this.__instances.length; i++) {
        this.__detachInstance(i);
      }
    }

    connectedCallback() {
      super.connectedCallback();
      // only perform attachment if the element was previously detached.
      if (this.__isDetached) {
        this.__isDetached = false;
        let parent = this.parentNode;
        for (let i=0; i<this.__instances.length; i++) {
          this.__attachInstance(i, parent);
        }
      }
    }

    __ensureTemplatized() {
      // Templatizing (generating the instance constructor) needs to wait
      // until ready, since won't have its template content handed back to
      // it until then
      if (!this.__ctor) {
        let template = this.template = this.querySelector('template');
        if (!template) {
          // // Wait until childList changes and template should be there by then
          let observer = new MutationObserver(() => {
            if (this.querySelector('template')) {
              observer.disconnect();
              this.__render();
            } else {
              throw new Error('dom-repeat requires a <template> child');
            }
          })
          observer.observe(this, {childList: true});
          return false;
        }
        // Template instance props that should be excluded from forwarding
        let instanceProps = {};
        instanceProps[this.as] = true;
        instanceProps[this.indexAs] = true;
        instanceProps[this.itemsIndexAs] = true;
        this.__ctor = Polymer.Templatize.templatize(template, this, {
          mutableData: this.mutableData,
          parentModel: true,
          instanceProps: instanceProps,
          /**
           * @this {this}
           * @param {string} prop Property to set
           * @param {*} value Value to set property to
           */
          forwardHostProp: function(prop, value) {
            let i$ = this.__instances;
            for (let i=0, inst; (i<i$.length) && (inst=i$[i]); i++) {
              inst.forwardHostProp(prop, value);
            }
          },
          /**
           * @this {this}
           * @param {Object} inst Instance to notify
           * @param {string} prop Property to notify
           * @param {*} value Value to notify
           */
          notifyInstanceProp: function(inst, prop, value) {
            if (Polymer.Path.matches(this.as, prop)) {
              let idx = inst[this.itemsIndexAs];
              if (prop == this.as) {
                this.items[idx] = value;
              }
              let path = Polymer.Path.translate(this.as, 'items.' + idx, prop);
              this.notifyPath(path, value);
            }
          }
        });
      }
      return true;
    }

    __getMethodHost() {
      // Technically this should be the owner of the outermost template.
      // In shadow dom, this is always getRootNode().host, but we can
      // approximate this via cooperation with our dataHost always setting
      // `_methodHost` as long as there were bindings (or id's) on this
      // instance causing it to get a dataHost.
      return this.__dataHost._methodHost || this.__dataHost;
    }

    __sortChanged(sort) {
      let methodHost = this.__getMethodHost();
      this.__sortFn = sort && (typeof sort == 'function' ? sort :
        function() { return methodHost[sort].apply(methodHost, arguments); });
      if (this.items) {
        this.__debounceRender(this.__render);
      }
    }

    __filterChanged(filter) {
      let methodHost = this.__getMethodHost();
      this.__filterFn = filter && (typeof filter == 'function' ? filter :
        function() { return methodHost[filter].apply(methodHost, arguments); });
      if (this.items) {
        this.__debounceRender(this.__render);
      }
    }

    __computeFrameTime(rate) {
      return Math.ceil(1000/rate);
    }

    __initializeChunking() {
      if (this.initialCount) {
        this.__limit = this.initialCount;
        this.__chunkCount = this.initialCount;
        this.__lastChunkTime = performance.now();
      }
    }

    __tryRenderChunk() {
      // Debounced so that multiple calls through `_render` between animation
      // frames only queue one new rAF (e.g. array mutation & chunked render)
      if (this.items && this.__limit < this.items.length) {
        this.__debounceRender(this.__requestRenderChunk);
      }
    }

    __requestRenderChunk() {
      requestAnimationFrame(()=>this.__renderChunk());
    }

    __renderChunk() {
      // Simple auto chunkSize throttling algorithm based on feedback loop:
      // measure actual time between frames and scale chunk count by ratio
      // of target/actual frame time
      let currChunkTime = performance.now();
      let ratio = this._targetFrameTime / (currChunkTime - this.__lastChunkTime);
      this.__chunkCount = Math.round(this.__chunkCount * ratio) || 1;
      this.__limit += this.__chunkCount;
      this.__lastChunkTime = currChunkTime;
      this.__debounceRender(this.__render);
    }

    __observeChanged() {
      this.__observePaths = this.observe &&
        this.observe.replace('.*', '.').split(' ');
    }

    __itemsChanged(change) {
      if (this.items && !Array.isArray(this.items)) {
        console.warn('dom-repeat expected array for `items`, found', this.items);
      }
      // If path was to an item (e.g. 'items.3' or 'items.3.foo'), forward the
      // path to that instance synchronously (retuns false for non-item paths)
      if (!this.__handleItemPath(change.path, change.value)) {
        // Otherwise, the array was reset ('items') or spliced ('items.splices'),
        // so queue a full refresh
        this.__initializeChunking();
        this.__debounceRender(this.__render);
      }
    }

    __handleObservedPaths(path) {
      if (this.__observePaths) {
        path = path.substring(path.indexOf('.') + 1);
        let paths = this.__observePaths;
        for (let i=0; i<paths.length; i++) {
          if (path.indexOf(paths[i]) === 0) {
            this.__debounceRender(this.__render, this.delay);
            return true;
          }
        }
      }
    }

    /**
     * @param {function(this:DomRepeat)} fn Function to debounce.
     * @param {number=} delay Delay in ms to debounce by.
     */
    __debounceRender(fn, delay = 0) {
      this.__renderDebouncer = Polymer.Debouncer.debounce(
            this.__renderDebouncer
          , delay > 0 ? Polymer.Async.timeOut.after(delay) : Polymer.Async.microTask
          , fn.bind(this));
      Polymer.enqueueDebouncer(this.__renderDebouncer);
    }

    /**
     * Forces the element to render its content. Normally rendering is
     * asynchronous to a provoking change. This is done for efficiency so
     * that multiple changes trigger only a single render. The render method
     * should be called if, for example, template rendering is required to
     * validate application state.
     */
    render() {
      // Queue this repeater, then flush all in order
      this.__debounceRender(this.__render);
      Polymer.flush();
    }

    __render() {
      if (!this.__ensureTemplatized()) {
        // No template found yet
        return;
      }
      this.__applyFullRefresh();
      // Reset the pool
      // TODO(kschaaf): Reuse pool across turns and nested templates
      // Now that objects/arrays are re-evaluated when set, we can safely
      // reuse pooled instances across turns, however we still need to decide
      // semantics regarding how long to hold, how many to hold, etc.
      this.__pool.length = 0;
      // Set rendered item count
      this._setRenderedItemCount(this.__instances.length);
      // Notify users
      this.dispatchEvent(new CustomEvent('dom-change', {
        bubbles: true,
        composed: true
      }));
      // Check to see if we need to render more items
      this.__tryRenderChunk();
    }

    __applyFullRefresh() {
      let items = this.items || [];
      let isntIdxToItemsIdx = new Array(items.length);
      for (let i=0; i<items.length; i++) {
        isntIdxToItemsIdx[i] = i;
      }
      // Apply user filter
      if (this.__filterFn) {
        isntIdxToItemsIdx = isntIdxToItemsIdx.filter((i, idx, array) =>
          this.__filterFn(items[i], idx, array));
      }
      // Apply user sort
      if (this.__sortFn) {
        isntIdxToItemsIdx.sort((a, b) => this.__sortFn(items[a], items[b]));
      }
      // items->inst map kept for item path forwarding
      const itemsIdxToInstIdx = this.__itemsIdxToInstIdx = {};
      let instIdx = 0;
      // Generate instances and assign items
      const limit = Math.min(isntIdxToItemsIdx.length, this.__limit);
      for (; instIdx<limit; instIdx++) {
        let inst = this.__instances[instIdx];
        let itemIdx = isntIdxToItemsIdx[instIdx];
        let item = items[itemIdx];
        itemsIdxToInstIdx[itemIdx] = instIdx;
        if (inst && instIdx < this.__limit) {
          inst._setPendingProperty(this.as, item);
          inst._setPendingProperty(this.indexAs, instIdx);
          inst._setPendingProperty(this.itemsIndexAs, itemIdx);
          inst._flushProperties();
        } else {
          this.__insertInstance(item, instIdx, itemIdx);
        }
      }
      // Remove any extra instances from previous state
      for (let i=this.__instances.length-1; i>=instIdx; i--) {
        this.__detachAndRemoveInstance(i);
      }
    }

    __detachInstance(idx) {
      let inst = this.__instances[idx];
      for (let i=0; i<inst.children.length; i++) {
        let el = inst.children[i];
        inst.root.appendChild(el);
      }
      return inst;
    }

    __attachInstance(idx, parent) {
      let inst = this.__instances[idx];
      parent.insertBefore(inst.root, this);
    }

    __detachAndRemoveInstance(idx) {
      let inst = this.__detachInstance(idx);
      if (inst) {
        this.__pool.push(inst);
      }
      this.__instances.splice(idx, 1);
    }

    __stampInstance(item, instIdx, itemIdx) {
      let model = {};
      model[this.as] = item;
      model[this.indexAs] = instIdx;
      model[this.itemsIndexAs] = itemIdx;
      return new this.__ctor(model);
    }

    __insertInstance(item, instIdx, itemIdx) {
      let inst = this.__pool.pop();
      if (inst) {
        // TODO(kschaaf): If the pool is shared across turns, hostProps
        // need to be re-set to reused instances in addition to item
        inst._setPendingProperty(this.as, item);
        inst._setPendingProperty(this.indexAs, instIdx);
        inst._setPendingProperty(this.itemsIndexAs, itemIdx);
        inst._flushProperties();
      } else {
        inst = this.__stampInstance(item, instIdx, itemIdx);
      }
      let beforeRow = this.__instances[instIdx + 1];
      let beforeNode = beforeRow ? beforeRow.children[0] : this;
      this.parentNode.insertBefore(inst.root, beforeNode);
      this.__instances[instIdx] = inst;
      return inst;
    }

    // Implements extension point from Templatize mixin
    _showHideChildren(hidden) {
      for (let i=0; i<this.__instances.length; i++) {
        this.__instances[i]._showHideChildren(hidden);
      }
    }

    // Called as a side effect of a host items.<key>.<path> path change,
    // responsible for notifying item.<path> changes to inst for key
    __handleItemPath(path, value) {
      let itemsPath = path.slice(6); // 'items.'.length == 6
      let dot = itemsPath.indexOf('.');
      let itemsIdx = dot < 0 ? itemsPath : itemsPath.substring(0, dot);
      // If path was index into array...
      if (itemsIdx == parseInt(itemsIdx, 10)) {
        let itemSubPath = dot < 0 ? '' : itemsPath.substring(dot+1);
        // If the path is observed, it will trigger a full refresh
        this.__handleObservedPaths(itemSubPath);
        // Note, even if a rull refresh is triggered, always do the path
        // notification because unless mutableData is used for dom-repeat
        // and all elements in the instance subtree, a full refresh may
        // not trigger the proper update.
        let instIdx = this.__itemsIdxToInstIdx[itemsIdx];
        let inst = this.__instances[instIdx];
        if (inst) {
          let itemPath = this.as + (itemSubPath ? '.' + itemSubPath : '');
          // This is effectively `notifyPath`, but avoids some of the overhead
          // of the public API
          inst._setPendingPropertyOrPath(itemPath, value, false, true);
          inst._flushProperties();
        }
        return true;
      }
    }

    /**
     * Returns the item associated with a given element stamped by
     * this `dom-repeat`.
     *
     * Note, to modify sub-properties of the item,
     * `modelForElement(el).set('item.<sub-prop>', value)`
     * should be used.
     *
     * @param {HTMLElement} el Element for which to return the item.
     * @return {*} Item associated with the element.
     */
    itemForElement(el) {
      let instance = this.modelForElement(el);
      return instance && instance[this.as];
    }

    /**
     * Returns the inst index for a given element stamped by this `dom-repeat`.
     * If `sort` is provided, the index will reflect the sorted order (rather
     * than the original array order).
     *
     * @param {HTMLElement} el Element for which to return the index.
     * @return {*} Row index associated with the element (note this may
     *   not correspond to the array index if a user `sort` is applied).
     */
    indexForElement(el) {
      let instance = this.modelForElement(el);
      return instance && instance[this.indexAs];
    }

    /**
     * Returns the template "model" associated with a given element, which
     * serves as the binding scope for the template instance the element is
     * contained in. A template model is an instance of `Polymer.Base`, and
     * should be used to manipulate data associated with this template instance.
     *
     * Example:
     *
     *   let model = modelForElement(el);
     *   if (model.index < 10) {
     *     model.set('item.checked', true);
     *   }
     *
     * @param {HTMLElement} el Element for which to return a template model.
     * @return {TemplateInstanceBase} Model representing the binding scope for
     *   the element.
     */
    modelForElement(el) {
      return Polymer.Templatize.modelForElement(this.template, el);
    }

  }

  customElements.define(DomRepeat.is, DomRepeat);

  Polymer.DomRepeat = DomRepeat;

})();




/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(6);

__webpack_require__(8);


  (function() {
    'use strict';

    // Base class for HTMLTemplateElement extension that has property effects
    // machinery for propagating host properties to children. This is an ES5
    // class only because Babel (incorrectly) requires super() in the class
    // constructor even though no `this` is used and it returns an instance.
    let newInstance = null;
    /**
     * @constructor
     * @extends {HTMLTemplateElement}
     */
    function HTMLTemplateElementExtension() { return newInstance; }
    HTMLTemplateElementExtension.prototype = Object.create(HTMLTemplateElement.prototype, {
      constructor: {
        value: HTMLTemplateElementExtension,
        writable: true
      }
    });
    /**
     * @constructor
     * @implements {Polymer_PropertyEffects}
     * @extends {HTMLTemplateElementExtension}
     */
    const DataTemplate = Polymer.PropertyEffects(HTMLTemplateElementExtension);
    /**
     * @constructor
     * @implements {Polymer_MutableData}
     * @extends {DataTemplate}
     */
    const MutableDataTemplate = Polymer.MutableData(DataTemplate);

    // Applies a DataTemplate subclass to a <template> instance
    function upgradeTemplate(template, constructor) {
      newInstance = template;
      Object.setPrototypeOf(template, constructor.prototype);
      new constructor();
      newInstance = null;
    }

    // Base class for TemplateInstance's
    /**
     * @constructor
     * @implements {Polymer_PropertyEffects}
     */
    const base = Polymer.PropertyEffects(class {});

    /**
     * @polymer
     * @customElement
     * @appliesMixin Polymer.PropertyEffects
     * @unrestricted
     */
    class TemplateInstanceBase extends base {
      constructor(props) {
        super();
        this._configureProperties(props);
        this.root = this._stampTemplate(this.__dataHost);
        // Save list of stamped children
        let children = this.children = [];
        for (let n = this.root.firstChild; n; n=n.nextSibling) {
          children.push(n);
          n.__templatizeInstance = this;
        }
        if (this.__templatizeOwner.__hideTemplateChildren__) {
          this._showHideChildren(true);
        }
        // Flush props only when props are passed if instance props exist
        // or when there isn't instance props.
        let options = this.__templatizeOptions;
        if ((props && options.instanceProps) || !options.instanceProps) {
          this._enableProperties();
        }
      }
      /**
       * Configure the given `props` by calling `_setPendingProperty`. Also
       * sets any properties stored in `__hostProps`.
       * @private
       * @param {Object} props Object of property name-value pairs to set.
       */
      _configureProperties(props) {
        let options = this.__templatizeOptions;
        if (props) {
          for (let iprop in options.instanceProps) {
            if (iprop in props) {
              this._setPendingProperty(iprop, props[iprop]);
            }
          }
        }
        for (let hprop in this.__hostProps) {
          this._setPendingProperty(hprop, this.__dataHost['_host_' + hprop]);
        }
      }
      /**
       * Forwards a host property to this instance.  This method should be
       * called on instances from the `options.forwardHostProp` callback
       * to propagate changes of host properties to each instance.
       *
       * Note this method enqueues the change, which are flushed as a batch.
       *
       * @param {string} prop Property or path name
       * @param {*} value Value of the property to forward
       */
      forwardHostProp(prop, value) {
        if (this._setPendingPropertyOrPath(prop, value, false, true)) {
          this.__dataHost._enqueueClient(this);
        }
      }
      /**
       * @override
       */
      _addEventListenerToNode(node, eventName, handler) {
        if (this._methodHost && this.__templatizeOptions.parentModel) {
          // If this instance should be considered a parent model, decorate
          // events this template instance as `model`
          this._methodHost._addEventListenerToNode(node, eventName, (e) => {
            e.model = this;
            handler(e);
          });
        } else {
          // Otherwise delegate to the template's host (which could be)
          // another template instance
          let templateHost = this.__dataHost.__dataHost;
          if (templateHost) {
            templateHost._addEventListenerToNode(node, eventName, handler);
          }
        }
      }
      /**
       * Shows or hides the template instance top level child elements. For
       * text nodes, `textContent` is removed while "hidden" and replaced when
       * "shown."
       * @param {boolean} hide Set to true to hide the children;
       * set to false to show them.
       * @protected
       */
      _showHideChildren(hide) {
        let c = this.children;
        for (let i=0; i<c.length; i++) {
          let n = c[i];
          // Ignore non-changes
          if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
            if (n.nodeType === Node.TEXT_NODE) {
              if (hide) {
                n.__polymerTextContent__ = n.textContent;
                n.textContent = '';
              } else {
                n.textContent = n.__polymerTextContent__;
              }
            } else if (n.style) {
              if (hide) {
                n.__polymerDisplay__ = n.style.display;
                n.style.display = 'none';
              } else {
                n.style.display = n.__polymerDisplay__;
              }
            }
          }
          n.__hideTemplateChildren__ = hide;
          if (n._showHideChildren) {
            n._showHideChildren(hide);
          }
        }
      }
      /**
       * Overrides default property-effects implementation to intercept
       * textContent bindings while children are "hidden" and cache in
       * private storage for later retrieval.
       *
       * @override
       */
      _setUnmanagedPropertyToNode(node, prop, value) {
        if (node.__hideTemplateChildren__ &&
            node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
          node.__polymerTextContent__ = value;
        } else {
          super._setUnmanagedPropertyToNode(node, prop, value);
        }
      }
      /**
       * Find the parent model of this template instance.  The parent model
       * is either another templatize instance that had option `parentModel: true`,
       * or else the host element.
       *
       * @return {Polymer_PropertyEffects} The parent model of this instance
       */
      get parentModel() {
        let model = this.__parentModel;
        if (!model) {
          let options;
          model = this
          do {
            // A template instance's `__dataHost` is a <template>
            // `model.__dataHost.__dataHost` is the template's host
            model = model.__dataHost.__dataHost;
          } while ((options = model.__templatizeOptions) && !options.parentModel)
          this.__parentModel = model;
        }
        return model;
      }
    }

    /** @type {!DataTemplate} */
    TemplateInstanceBase.prototype.__dataHost;
    /** @type {!TemplatizeOptions} */
    TemplateInstanceBase.prototype.__templatizeOptions;
    /** @type {!Polymer_PropertyEffects} */
    TemplateInstanceBase.prototype._methodHost;
    /** @type {!Object} */
    TemplateInstanceBase.prototype.__templatizeOwner;
    /** @type {!Object} */
    TemplateInstanceBase.prototype.__hostProps;

    /**
     * @constructor
     * @extends {TemplateInstanceBase}
     * @implements {Polymer_MutableData}
     */
    const MutableTemplateInstanceBase = Polymer.MutableData(TemplateInstanceBase);

    function findMethodHost(template) {
      // Technically this should be the owner of the outermost template.
      // In shadow dom, this is always getRootNode().host, but we can
      // approximate this via cooperation with our dataHost always setting
      // `_methodHost` as long as there were bindings (or id's) on this
      // instance causing it to get a dataHost.
      let templateHost = template.__dataHost;
      return templateHost && templateHost._methodHost || templateHost;
    }

    /* eslint-disable valid-jsdoc */
    /**
     * @suppress {missingProperties} class.prototype is not defined for some reason
     */
    function createTemplatizerClass(template, templateInfo, options) {
      // Anonymous class created by the templatize
      let base = options.mutableData ?
        MutableTemplateInstanceBase : TemplateInstanceBase;
      /**
       * @constructor
       * @extends {base}
       */
      let klass = class extends base { }
      klass.prototype.__templatizeOptions = options;
      klass.prototype._bindTemplate(template);
      addNotifyEffects(klass, template, templateInfo, options);
      return klass;
    }

    /**
     * @suppress {missingProperties} class.prototype is not defined for some reason
     */
    function addPropagateEffects(template, templateInfo, options) {
      let userForwardHostProp = options.forwardHostProp;
      if (userForwardHostProp) {
        // Provide data API and property effects on memoized template class
        let klass = templateInfo.templatizeTemplateClass;
        if (!klass) {
          let base = options.mutableData ? MutableDataTemplate : DataTemplate;
          klass = templateInfo.templatizeTemplateClass =
            class TemplatizedTemplate extends base {}
          // Add template - >instances effects
          // and host <- template effects
          let hostProps = templateInfo.hostProps;
          for (let prop in hostProps) {
            klass.prototype._addPropertyEffect('_host_' + prop,
              klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,
              {fn: createForwardHostPropEffect(prop, userForwardHostProp)});
            klass.prototype._createNotifyingProperty('_host_' + prop);
          }
        }
        upgradeTemplate(template, klass);
        // Mix any pre-bound data into __data; no need to flush this to
        // instances since they pull from the template at instance-time
        if (template.__dataProto) {
          // Note, generally `__dataProto` could be chained, but it's guaranteed
          // to not be since this is a vanilla template we just added effects to
          Object.assign(template.__data, template.__dataProto);
        }
        // Clear any pending data for performance
        template.__dataTemp = {};
        template.__dataPending = null;
        template.__dataOld = null;
        template._enableProperties();
      }
    }
    /* eslint-enable valid-jsdoc */

    function createForwardHostPropEffect(hostProp, userForwardHostProp) {
      return function forwardHostProp(template, prop, props) {
        userForwardHostProp.call(template.__templatizeOwner,
          prop.substring('_host_'.length), props[prop]);
      }
    }

    function addNotifyEffects(klass, template, templateInfo, options) {
      let hostProps = templateInfo.hostProps || {};
      for (let iprop in options.instanceProps) {
        delete hostProps[iprop];
        let userNotifyInstanceProp = options.notifyInstanceProp;
        if (userNotifyInstanceProp) {
          klass.prototype._addPropertyEffect(iprop,
            klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp)});
        }
      }
      if (options.forwardHostProp && template.__dataHost) {
        for (let hprop in hostProps) {
          klass.prototype._addPropertyEffect(hprop,
            klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,
            {fn: createNotifyHostPropEffect()})
        }
      }
    }

    function createNotifyInstancePropEffect(instProp, userNotifyInstanceProp) {
      return function notifyInstanceProp(inst, prop, props) {
        userNotifyInstanceProp.call(inst.__templatizeOwner,
          inst, prop, props[prop]);
      }
    }

    function createNotifyHostPropEffect() {
      return function notifyHostProp(inst, prop, props) {
        inst.__dataHost._setPendingPropertyOrPath('_host_' + prop, props[prop], true, true);
      }
    }

    /**
     * Module for preparing and stamping instances of templates that utilize
     * Polymer's data-binding and declarative event listener features.
     *
     * Example:
     *
     *     // Get a template from somewhere, e.g. light DOM
     *     let template = this.querySelector('template');
     *     // Prepare the template
     *     let TemplateClass = Polymer.Templatize.templatize(template);
     *     // Instance the template with an initial data model
     *     let instance = new TemplateClass({myProp: 'initial'});
     *     // Insert the instance's DOM somewhere, e.g. element's shadow DOM
     *     this.shadowRoot.appendChild(instance.root);
     *     // Changing a property on the instance will propagate to bindings
     *     // in the template
     *     instance.myProp = 'new value';
     *
     * The `options` dictionary passed to `templatize` allows for customizing
     * features of the generated template class, including how outer-scope host
     * properties should be forwarded into template instances, how any instance
     * properties added into the template's scope should be notified out to
     * the host, and whether the instance should be decorated as a "parent model"
     * of any event handlers.
     *
     *     // Customze property forwarding and event model decoration
     *     let TemplateClass = Polymer.Templatize.templatize(template, this, {
     *       parentModel: true,
     *       instanceProps: {...},
     *       forwardHostProp(property, value) {...},
     *       notifyInstanceProp(instance, property, value) {...},
     *     });
     *
     *
     * @namespace
     * @memberof Polymer
     * @summary Module for preparing and stamping instances of templates
     *   utilizing Polymer templating features.
     */

    const Templatize = {

      /**
       * Returns an anonymous `Polymer.PropertyEffects` class bound to the
       * `<template>` provided.  Instancing the class will result in the
       * template being stamped into document fragment stored as the instance's
       * `root` property, after which it can be appended to the DOM.
       *
       * Templates may utilize all Polymer data-binding features as well as
       * declarative event listeners.  Event listeners and inline computing
       * functions in the template will be called on the host of the template.
       *
       * The constructor returned takes a single argument dictionary of initial
       * property values to propagate into template bindings.  Additionally
       * host properties can be forwarded in, and instance properties can be
       * notified out by providing optional callbacks in the `options` dictionary.
       *
       * Valid configuration in `options` are as follows:
       *
       * - `forwardHostProp(property, value)`: Called when a property referenced
       *   in the template changed on the template's host. As this library does
       *   not retain references to templates instanced by the user, it is the
       *   templatize owner's responsibility to forward host property changes into
       *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
       *    method on the generated class should be called to forward host
       *   properties into the template to prevent unnecessary property-changed
       *   notifications. Any properties referenced in the template that are not
       *   defined in `instanceProps` will be notified up to the template's host
       *   automatically.
       * - `instanceProps`: Dictionary of property names that will be added
       *   to the instance by the templatize owner.  These properties shadow any
       *   host properties, and changes within the template to these properties
       *   will result in `notifyInstanceProp` being called.
       * - `mutableData`: When `true`, the generated class will skip strict
       *   dirty-checking for objects and arrays (always consider them to be
       *   "dirty").
       * - `notifyInstanceProp(instance, property, value)`: Called when
       *   an instance property changes.  Users may choose to call `notifyPath`
       *   on e.g. the owner to notify the change.
       * - `parentModel`: When `true`, events handled by declarative event listeners
       *   (`on-event="handler"`) will be decorated with a `model` property pointing
       *   to the template instance that stamped it.  It will also be returned
       *   from `instance.parentModel` in cases where template instance nesting
       *   causes an inner model to shadow an outer model.
       *
       * Note that the class returned from `templatize` is generated only once
       * for a given `<template>` using `options` from the first call for that
       * template, and the cached class is returned for all subsequent calls to
       * `templatize` for that template.  As such, `options` callbacks should not
       * close over owner-specific properties since only the first `options` is
       * used; rather, callbacks are called bound to the `owner`, and so context
       * needed from the callbacks (such as references to `instances` stamped)
       * should be stored on the `owner` such that they can be retrieved via `this`.
       *
       * @memberof Polymer.Templatize
       * @param {!HTMLTemplateElement} template Template to templatize
       * @param {!Polymer_PropertyEffects} owner Owner of the template instances;
       *   any optional callbacks will be bound to this owner.
       * @param {Object=} options Options dictionary (see summary for details)
       * @return {function(new:TemplateInstanceBase)} Generated class bound to the template
       *   provided
       * @suppress {invalidCasts}
       */
      templatize(template, owner, options) {
        options = /** @type {!TemplatizeOptions} */(options || {});
        if (template.__templatizeOwner) {
          throw new Error('A <template> can only be templatized once');
        }
        template.__templatizeOwner = owner;
        let templateInfo = owner.constructor._parseTemplate(template);
        // Get memoized base class for the prototypical template, which
        // includes property effects for binding template & forwarding
        let baseClass = templateInfo.templatizeInstanceClass;
        if (!baseClass) {
          baseClass = createTemplatizerClass(template, templateInfo, options);
          templateInfo.templatizeInstanceClass = baseClass;
        }
        // Host property forwarding must be installed onto template instance
        addPropagateEffects(template, templateInfo, options);
        // Subclass base class and add reference for this specific template
        let klass = class TemplateInstance extends baseClass {};
        klass.prototype._methodHost = findMethodHost(template);
        klass.prototype.__dataHost = template;
        klass.prototype.__templatizeOwner = owner;
        klass.prototype.__hostProps = templateInfo.hostProps;
        return /** @type {function(new:TemplateInstanceBase)} */(klass);
      },

      /**
       * Returns the template "model" associated with a given element, which
       * serves as the binding scope for the template instance the element is
       * contained in. A template model is an instance of
       * `TemplateInstanceBase`, and should be used to manipulate data
       * associated with this template instance.
       *
       * Example:
       *
       *   let model = modelForElement(el);
       *   if (model.index < 10) {
       *     model.set('item.checked', true);
       *   }
       *
       * @memberof Polymer.Templatize
       * @param {HTMLTemplateElement} template The model will be returned for
       *   elements stamped from this template
       * @param {Node} node Node for which to return a template model.
       * @return {TemplateInstanceBase} Template instance representing the
       *   binding scope for the element
       */
      modelForElement(template, node) {
        let model;
        while (node) {
          // An element with a __templatizeInstance marks the top boundary
          // of a scope; walk up until we find one, and then ensure that
          // its __dataHost matches `this`, meaning this dom-repeat stamped it
          if ((model = node.__templatizeInstance)) {
            // Found an element stamped by another template; keep walking up
            // from its __dataHost
            if (model.__dataHost != template) {
              node = model.__dataHost;
            } else {
              return model;
            }
          } else {
            // Still in a template scope, keep going up until
            // a __templatizeInstance is found
            node = node.parentNode;
          }
        }
        return null;
      }
    }

    Polymer.Templatize = Templatize;
    Polymer.TemplateInstanceBase = TemplateInstanceBase;

  })();




/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(7);


(function() {
  'use strict';

  /** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
  let AsyncModule; // eslint-disable-line no-unused-vars

  /**
   * @summary Collapse multiple callbacks into one invocation after a timer.
   * @memberof Polymer
   */
  class Debouncer {
    constructor() {
      this._asyncModule = null;
      this._callback = null;
      this._timer = null;
    }
    /**
     * Sets the scheduler; that is, a module with the Async interface,
     * a callback and optional arguments to be passed to the run function
     * from the async module.
     *
     * @param {!AsyncModule} asyncModule Object with Async interface.
     * @param {function()} callback Callback to run.
     */
    setConfig(asyncModule, callback) {
      this._asyncModule = asyncModule;
      this._callback = callback;
      this._timer = this._asyncModule.run(() => {
        this._timer = null;
        this._callback()
      });
    }
    /**
     * Cancels an active debouncer and returns a reference to itself.
     */
    cancel() {
      if (this.isActive()) {
        this._asyncModule.cancel(this._timer);
        this._timer = null;
      }
    }
    /**
     * Flushes an active debouncer and returns a reference to itself.
     */
    flush() {
      if (this.isActive()) {
        this.cancel();
        this._callback();
      }
    }
    /**
     * Returns true if the debouncer is active.
     *
     * @return {boolean} True if active.
     */
    isActive() {
      return this._timer != null;
    }
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * _debounceWork() {
   *   this._debounceJob = Polymer.Debouncer.debounce(this._debounceJob,
   *       Polymer.Async.microTask, () => {
   *     this._doWork();
   *   });
   * }
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `Polymer.enqueueDebouncer` and
   * `Polymer.flush`. For example, extend the above example by adding
   * `Polymer.enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `Polymer.flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncModule} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
    static debounce(debouncer, asyncModule, callback) {
      if (debouncer instanceof Debouncer) {
        debouncer.cancel();
      } else {
        debouncer = new Debouncer();
      }
      debouncer.setConfig(asyncModule, callback);
      return debouncer;
    }
  }

  Polymer.Debouncer = Debouncer;
})();



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/
__webpack_require__(0);


(function() {
  'use strict';

  let debouncerQueue = [];

  /**
   * Adds a `Polymer.Debouncer` to a list of globally flushable tasks.
   *
   * @memberof Polymer
   * @param {Polymer.Debouncer} debouncer Debouncer to enqueue
   */
  Polymer.enqueueDebouncer = function(debouncer) {
    debouncerQueue.push(debouncer);
  }

  function flushDebouncers() {
    const didFlush = Boolean(debouncerQueue.length);
    while (debouncerQueue.length) {
      try {
        debouncerQueue.shift().flush();
      } catch(e) {
        setTimeout(() => {
          throw e;
        });
      }
    }
    return didFlush;
  }

  /**
   * Forces several classes of asynchronously queued tasks to flush:
   * - Debouncers added via `enqueueDebouncer`
   * - ShadyDOM distribution
   *
   * @memberof Polymer
   */
  Polymer.flush = function() {
    let shadyDOM, debouncers;
    do {
      shadyDOM = window.ShadyDOM && ShadyDOM.flush();
      if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
        window.ShadyCSS.ScopingShim.flush();
      }
      debouncers = flushDebouncers();
    } while (shadyDOM || debouncers);
  }

})();



/***/ }),
/* 23 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"sticky-element\">\n    <template>\n        <style type=\"text/css\">#content[stuck]{position:fixed;width:100%;z-index:1000;}</style>\n        <div id=\"wrapper\">\n            <div id=\"content\" stuck$=\"[[stuck]]\" style$=\"[[_getTopStyle(topOffset)]]\">\n                <slot></slot>\n            </div>\n        </div>\n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    (function() {
        class StickyElement extends Polymer.Element {
            static get is() { return 'sticky-element' }

            static get properties() {
                return {
                    stuck: {
                        type: Boolean,
                        value: false,
                        reflectToAttribute: true
                    },

                    topOffset: {
                        type: Number,
                        value: 0
                    }
                }
            }

            connectedCallback() {
                super.connectedCallback()
                
                let ogHeight = 0
                const wrapper = this.shadowRoot.querySelector('#wrapper')
                const content = this.shadowRoot.querySelector('#content')
                this._scrollFunc = () => {
                    if (!this.stuck) wrapper.style = `height:${content.clientHeight}px`

                    this.stuck = wrapper.getBoundingClientRect().top  <= this.topOffset
                }
                window.addEventListener('scroll', this._scrollFunc)
            }

            disconnectedCallback() {
                super.disconnectedCallback()
                window.removeEventListener('scroll', this._scrollFunc)
            }

            _getTopStyle(offset) {
                return `top:${offset}px;`
            }

        }
        customElements.define(StickyElement.is, StickyElement)

    })()



/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"markdown-element\">\n    <template>\n        <style type=\"text/css\">:host{display:block;}</style>\n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);
__webpack_require__(25);


    (function() {
        class MarkdownElement extends Polymer.Element {
            static get is() { return 'markdown-element' }

            static get properties() {
                return {
                    href: {
                        type: String,
                        value: null,
                        observer: '_hrefObserver'
                    }
                }
            }

            _hrefObserver(href) {
                if (!href) return

                const renderer = new marked.Renderer()
                renderer.image = (href, title, text) => {
                    const split = href.split(' ')
                    const singleValue = split.length === 1
                    const tag = singleValue ? 'img' : split.shift(1)
                    const args = {}

                    if (singleValue) {
                        args.src = split[0]
                    } else {
                        split.forEach(arg => {
                            arg = arg.split('=')
                            args[arg[0]] = arg[1]
                        })
                    }

                    let argString = ''
                    for (let key in args) argString += ` ${key}="${args[key]}"`
                    console.log(`<${tag} ${argString}></${tag}>`)
                    return `<${tag} ${argString}></${tag}>`
                }

                renderer.paragraph = text => {
                    if (/<sliding-image/g.test(text)) return text
                    else return `<p>${text}</p>`
                }

                fetch(href)
                    .then(res => res.text())
                    .then(text => {
                        this.innerHTML = marked(text, { renderer })
                    })
            }

            _attachDom(d) { this.appendChild(d) }

        }
        customElements.define(MarkdownElement.is, MarkdownElement)

    })()



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4)(__webpack_require__(26))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = "/**\n * marked - a markdown parser\n * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)\n * https://github.com/chjj/marked\n */\n(function(){var block={newline:/^\\n+/,code:/^( {4}[^\\n]+\\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\\n+|$)/,heading:/^ *(#{1,6}) *([^\\n]+?) *#* *(?:\\n+|$)/,nptable:noop,lheading:/^([^\\n]+)\\n *(=|-){2,} *(?:\\n+|$)/,blockquote:/^( *>[^\\n]+(\\n(?!def)[^\\n]+)*\\n*)+/,list:/^( *)(bull) [\\s\\S]+?(?:hr|def|\\n{2,}(?! )(?!\\1bull )\\n*|\\s*$)/,html:/^ *(?:comment *(?:\\n|\\s*$)|closed *(?:\\n{2,}|\\s*$)|closing *(?:\\n{2,}|\\s*$))/,def:/^ *\\[([^\\]]+)\\]: *<?([^\\s>]+)>?(?: +[\"(]([^\\n]+)[\")])? *(?:\\n+|$)/,table:noop,paragraph:/^((?:[^\\n]+\\n?(?!hr|heading|lheading|blockquote|tag|def))+)\\n*/,text:/^[^\\n]+/};block.bullet=/(?:[*+-]|\\d+\\.)/;block.item=/^( *)(bull) [^\\n]*(?:\\n(?!\\1bull )[^\\n]*)*/;block.item=replace(block.item,\"gm\")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)(\"hr\",\"\\\\n+(?=\\\\1?(?:[-*_] *){3,}(?:\\\\n+|$))\")(\"def\",\"\\\\n+(?=\"+block.def.source+\")\")();block.blockquote=replace(block.blockquote)(\"def\",block.def)();block._tag=\"(?!(?:\"+\"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code\"+\"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo\"+\"|span|br|wbr|ins|del|img)\\\\b)\\\\w+(?!:/|[^\\\\w\\\\s@]*@)\\\\b\";block.html=replace(block.html)(\"comment\",/<!--[\\s\\S]*?-->/)(\"closed\",/<(tag)[\\s\\S]+?<\\/\\1>/)(\"closing\",/<tag(?:\"[^\"]*\"|'[^']*'|[^'\">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)(\"hr\",block.hr)(\"heading\",block.heading)(\"lheading\",block.lheading)(\"blockquote\",block.blockquote)(\"tag\",\"<\"+block._tag)(\"def\",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \\.]*(\\S+)? *\\n([\\s\\S]*?)\\s*\\1 *(?:\\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\\n]+?) *#* *(?:\\n+|$)/});block.gfm.paragraph=replace(block.paragraph)(\"(?!\",\"(?!\"+block.gfm.fences.source.replace(\"\\\\1\",\"\\\\2\")+\"|\"+block.list.source.replace(\"\\\\1\",\"\\\\3\")+\"|\")();block.tables=merge({},block.gfm,{nptable:/^ *(\\S.*\\|.*)\\n *([-:]+ *\\|[-| :]*)\\n((?:.*\\|.*(?:\\n|$))*)\\n*/,table:/^ *\\|(.+)\\n *\\|( *[-:]+[-| :]*)\\n((?: *\\|.*(?:\\n|$))*)\\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\\r\\n|\\r/g,\"\\n\").replace(/\\t/g,\"    \").replace(/\\u00a0/g,\" \").replace(/\\u2424/g,\"\\n\");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,\"\"),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:\"space\"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,\"\");this.tokens.push({type:\"code\",text:!this.options.pedantic?cap.replace(/\\n+$/,\"\"):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:\"code\",lang:cap[2],text:cap[3]||\"\"});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:\"heading\",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:\"table\",header:cap[1].replace(/^ *| *\\| *$/g,\"\").split(/ *\\| */),align:cap[2].replace(/^ *|\\| *$/g,\"\").split(/ *\\| */),cells:cap[3].replace(/\\n$/,\"\").split(\"\\n\")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]=\"right\"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]=\"center\"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]=\"left\"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:\"heading\",depth:cap[2]===\"=\"?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:\"hr\"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:\"blockquote_start\"});cap=cap[0].replace(/^ *> ?/gm,\"\");this.token(cap,top,true);this.tokens.push({type:\"blockquote_end\"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:\"list_start\",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\\d+\\.) +/,\"\");if(~item.indexOf(\"\\n \")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp(\"^ {1,\"+space+\"}\",\"gm\"),\"\"):item.replace(/^ {1,4}/gm,\"\")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join(\"\\n\")+src;i=l-1}}loose=next||/\\n\\n(?!\\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)===\"\\n\";if(!loose)loose=next}this.tokens.push({type:loose?\"loose_item_start\":\"list_item_start\"});this.token(item,false,bq);this.tokens.push({type:\"list_item_end\"})}this.tokens.push({type:\"list_end\"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?\"paragraph\":\"html\",pre:!this.options.sanitizer&&(cap[1]===\"pre\"||cap[1]===\"script\"||cap[1]===\"style\"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:\"table\",header:cap[1].replace(/^ *| *\\| *$/g,\"\").split(/ *\\| */),align:cap[2].replace(/^ *|\\| *$/g,\"\").split(/ *\\| */),cells:cap[3].replace(/(?: *\\| *)?\\n$/,\"\").split(\"\\n\")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]=\"right\"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]=\"center\"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]=\"left\"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\\| *| *\\| *$/g,\"\").split(/ *\\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:\"paragraph\",text:cap[1].charAt(cap[1].length-1)===\"\\n\"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:\"text\",text:cap[0]});continue}if(src){throw new Error(\"Infinite loop on byte: \"+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\\\([\\\\`*{}\\[\\]()#+\\-.!_>])/,autolink:/^<([^ >]+(@|:\\/)[^ >]+)>/,url:noop,tag:/^<!--[\\s\\S]*?-->|^<\\/?\\w+(?:\"[^\"]*\"|'[^']*'|[^'\">])*?>/,link:/^!?\\[(inside)\\]\\(href\\)/,reflink:/^!?\\[(inside)\\]\\s*\\[([^\\]]*)\\]/,nolink:/^!?\\[((?:\\[[^\\]]*\\]|[^\\[\\]])*)\\]/,strong:/^__([\\s\\S]+?)__(?!_)|^\\*\\*([\\s\\S]+?)\\*\\*(?!\\*)/,em:/^\\b_((?:[^_]|__)+?)_\\b|^\\*((?:\\*\\*|[\\s\\S])+?)\\*(?!\\*)/,code:/^(`+)\\s*([\\s\\S]*?[^`])\\s*\\1(?!`)/,br:/^ {2,}\\n(?!\\s*$)/,del:noop,text:/^[\\s\\S]+?(?=[\\\\<!\\[_*`]| {2,}\\n|$)/};inline._inside=/(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*/;inline._href=/\\s*<?([\\s\\S]*?)>?(?:\\s+['\"]([\\s\\S]*?)['\"])?\\s*/;inline.link=replace(inline.link)(\"inside\",inline._inside)(\"href\",inline._href)();inline.reflink=replace(inline.reflink)(\"inside\",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^__(?=\\S)([\\s\\S]*?\\S)__(?!_)|^\\*\\*(?=\\S)([\\s\\S]*?\\S)\\*\\*(?!\\*)/,em:/^_(?=\\S)([\\s\\S]*?\\S)_(?!_)|^\\*(?=\\S)([\\s\\S]*?\\S)\\*(?!\\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)(\"])\",\"~|])\")(),url:/^(https?:\\/\\/[^\\s<]+[^<.,:;\"')\\]\\s])/,del:/^~~(?=\\S)([\\s\\S]*?\\S)~~/,text:replace(inline.text)(\"]|\",\"~]|\")(\"|\",\"|https?://|\")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)(\"{2,}\",\"*\")(),text:replace(inline.gfm.text)(\"{2,}\",\"*\")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error(\"Tokens array requires a `links` property.\")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out=\"\",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]===\"@\"){text=cap[1].charAt(6)===\":\"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle(\"mailto:\")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\\s+/g,\" \");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error(\"Infinite loop on byte: \"+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!==\"!\"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,\"—\").replace(/--/g,\"–\").replace(/(^|[-\\u2014/(\\[{\"\\s])'/g,\"$1‘\").replace(/'/g,\"’\").replace(/(^|[-\\u2014/(\\[{\\u2018\\s])\"/g,\"$1“\").replace(/\"/g,\"”\").replace(/\\.{3}/g,\"…\")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out=\"\",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch=\"x\"+ch.toString(16)}out+=\"&#\"+ch+\";\"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return\"<pre><code>\"+(escaped?code:escape(code,true))+\"\\n</code></pre>\"}return'<pre><code class=\"'+this.options.langPrefix+escape(lang,true)+'\">'+(escaped?code:escape(code,true))+\"\\n</code></pre>\\n\"};Renderer.prototype.blockquote=function(quote){return\"<blockquote>\\n\"+quote+\"</blockquote>\\n\"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return\"<h\"+level+' id=\"'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\\w]+/g,\"-\")+'\">'+text+\"</h\"+level+\">\\n\"};Renderer.prototype.hr=function(){return this.options.xhtml?\"<hr/>\\n\":\"<hr>\\n\"};Renderer.prototype.list=function(body,ordered){var type=ordered?\"ol\":\"ul\";return\"<\"+type+\">\\n\"+body+\"</\"+type+\">\\n\"};Renderer.prototype.listitem=function(text){return\"<li>\"+text+\"</li>\\n\"};Renderer.prototype.paragraph=function(text){return\"<p>\"+text+\"</p>\\n\"};Renderer.prototype.table=function(header,body){return\"<table>\\n\"+\"<thead>\\n\"+header+\"</thead>\\n\"+\"<tbody>\\n\"+body+\"</tbody>\\n\"+\"</table>\\n\"};Renderer.prototype.tablerow=function(content){return\"<tr>\\n\"+content+\"</tr>\\n\"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?\"th\":\"td\";var tag=flags.align?\"<\"+type+' style=\"text-align:'+flags.align+'\">':\"<\"+type+\">\";return tag+content+\"</\"+type+\">\\n\"};Renderer.prototype.strong=function(text){return\"<strong>\"+text+\"</strong>\"};Renderer.prototype.em=function(text){return\"<em>\"+text+\"</em>\"};Renderer.prototype.codespan=function(text){return\"<code>\"+text+\"</code>\"};Renderer.prototype.br=function(){return this.options.xhtml?\"<br/>\":\"<br>\"};Renderer.prototype.del=function(text){return\"<del>\"+text+\"</del>\"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\\w:]/g,\"\").toLowerCase()}catch(e){return\"\"}if(prot.indexOf(\"javascript:\")===0||prot.indexOf(\"vbscript:\")===0){return\"\"}}var out='<a href=\"'+href+'\"';if(title){out+=' title=\"'+title+'\"'}out+=\">\"+text+\"</a>\";return out};Renderer.prototype.image=function(href,title,text){var out='<img src=\"'+href+'\" alt=\"'+text+'\"';if(title){out+=' title=\"'+title+'\"'}out+=this.options.xhtml?\"/>\":\">\";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out=\"\";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type===\"text\"){body+=\"\\n\"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case\"space\":{return\"\"}case\"hr\":{return this.renderer.hr()}case\"heading\":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case\"code\":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case\"table\":{var header=\"\",body=\"\",i,row,cell,flags,j;cell=\"\";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell=\"\";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case\"blockquote_start\":{var body=\"\";while(this.next().type!==\"blockquote_end\"){body+=this.tok()}return this.renderer.blockquote(body)}case\"list_start\":{var body=\"\",ordered=this.token.ordered;while(this.next().type!==\"list_end\"){body+=this.tok()}return this.renderer.list(body,ordered)}case\"list_item_start\":{var body=\"\";while(this.next().type!==\"list_item_end\"){body+=this.token.type===\"text\"?this.parseText():this.tok()}return this.renderer.listitem(body)}case\"loose_item_start\":{var body=\"\";while(this.next().type!==\"list_item_end\"){body+=this.tok()}return this.renderer.listitem(body)}case\"html\":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case\"paragraph\":{return this.renderer.paragraph(this.inline.output(this.token.text))}case\"text\":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\\w+;)/g:/&/g,\"&amp;\").replace(/</g,\"&lt;\").replace(/>/g,\"&gt;\").replace(/\"/g,\"&quot;\").replace(/'/g,\"&#39;\")}function unescape(html){return html.replace(/&([#\\w]+);/g,function(_,n){n=n.toLowerCase();if(n===\"colon\")return\":\";if(n.charAt(0)===\"#\"){return n.charAt(1)===\"x\"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return\"\"})}function replace(regex,opt){regex=regex.source;opt=opt||\"\";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\\[])\\^/g,\"$1\");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt===\"function\"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!==\"code\"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+=\"\\nPlease report this to https://github.com/chjj/marked.\";if((opt||marked.defaults).silent){return\"<p>An error occured:</p><pre>\"+escape(e.message+\"\",true)+\"</pre>\"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:\"lang-\",smartypants:false,headerPrefix:\"\",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!==\"undefined\"&&typeof exports===\"object\"){module.exports=marked}else if(typeof define===\"function\"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!==\"undefined\"?window:global)}());"

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"skills-element\">\n    <template>\n        <style type=\"text/css\">ul{margin:0;padding:0;}li{list-style:none;flex:1;text-align:center;font-weight:300;font-size:14px;cursor:default;}[hovered] li:not([active]){opacity:0.25;}#ratios{height:4px;/*margin-top:-10px;*/ padding-top:10px;transition:height 0.2s ease,padding-top 0.2s ease;}[hovered] #ratios{height:14px;padding-top:0;}#ratios li{height:100%;margin:0;padding:0;float:left;color:transparent;text-align:left;font-size:11px;transition:color 0.2s ease;}[hovered] #ratios li{/* uncomment to show percentages */ /*color:white;*/}#ratios li span{display:inline-block;padding:1px;padding-left:5px;}#dots{display:flex;flex-wrap:wrap;}#dots li{padding-top:10px;min-width:100px;}.dot{display:inline-block;border-radius:10px;height:10px;width:10px;margin-right:5px;}/* warm colors red 500,800 #F44336 #C62828 pink 500,800 #E91E63 #AD1457 orange 800 #EF6C00 yellow 500,800 #FFEB3B #F9A825 cool colors light green 500,800 #8BC34A #558B2F teal 500,800 #009688 #00695C light blue 500,800 #03A9F4 #0277BD indigo 500,800 #3F51B5 #283593 */ [skill=\"C/C++\"]{background-color:#EF6C00;}/* orange 800 */ [skill=\"Python\"]{background-color:#F44336;}/* red 500 */ [skill=\"Javascript\"]{background-color:#FFEB3B;}/* yellow 500 */ [skill=\"HTML/CSS\"]{background-color:#E91E63;}/* pink 500 */ [skill=\"C#\"]{background-color:#F9A825;}/* yellow 800 */ [skill=\"Graphics\"]{background-color:#AD1457;}/* pink 800 */ [skill=\"Prototyping\"]{background-color:#80CBC4;}/* teal 500 */ [skill=\"Research\"]{background-color:#03A9F4;}/* light blue 500 */ [skill=\"Leadership\"]{background-color:#3F51B5;}/* indigo 800 */ [skill=\"Visualization\"]{background-color:#283593;}/* indigo 800 */ #tags span{padding:3px 5px;background-color:#eee;margin-bottom:3px;display:inline-block;cursor:default;font-size:14px;}[hovered] #tags span:not([active]){/*opacity:0.25;*/}[hovered] #tags span[active]{background-color:#37474F;color:white;}</style>\n\n        <div id=\"container\" hovered$=\"[[_hovered]]\">\n            <div id=\"tags\">\n                <template is=\"dom-repeat\" items=\"[[_processTags(_skills)]]\">\n                    <span active$=\"[[_contains(_hovered,item.skills)]]\">[[item.name]]</span>\n                </template>\n            </div>\n\n            <ul id=\"ratios\">\n                <template is=\"dom-repeat\" items=\"[[_processSkills(_skills)]]\">\n                    <li on-mouseenter=\"_skillMouseenterHandler\" on-mouseleave=\"_skillMouseleaveHandler\" skill$=\"[[item.name]]\" style$=\"[[_getWidthStyle(item.weight)]]\" active$=\"[[_equals(_hovered, item.name)]]\">\n                        <span>[[_toReadablePercentage(item.weight)]]</span>\n                    </li>\n               </template>\n            </ul>\n\n            <ul id=\"dots\">\n                <template is=\"dom-repeat\" items=\"[[_processSkills(_skills)]]\">\n                    <li on-mouseenter=\"_skillMouseenterHandler\" on-mouseleave=\"_skillMouseleaveHandler\" active$=\"[[_equals(_hovered, item.name)]]\">\n                        <span class=\"dot\" skill$=\"[[item.name]]\"></span>\n                        <span>[[item.name]]</span>\n                    </li>\n               </template>\n            </ul>\n        </div>\n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    (function() {
        class SkillsElement extends Polymer.Element {
            static get is() { return 'skills-element' }

            static get properties() {
                return {
                    src: {
                        type: String,
                        value: null,
                        observer: '_srcObserver'
                    },

                    _skills: {
                        type: Object,
                        value: () => { return {} }
                    },

                    _hovered: {
                        type: String,
                        value: null
                    }
                }
            }

            /* Utilities */
            _equals(a,b) { return a === b }

            _contains(sk, arr) { 
                if (!sk || !arr) return false
                console.log(arr.indexOf(sk) !== -1)

                return arr.indexOf(sk) !== -1
            }

            _processSkills(skills) {
                const arr = []
                let tot = 0

                for (let name in skills) tot += skills[name].weight

                for (let name in skills) {
                    arr.push({
                        name,
                        weight: skills[name].weight / tot,
                        description: skills[name].description
                    })
                }

                arr.sort((a, b) => {
                    // Sort by weight
                    // const aw = Math.floor(a.weight * 100)
                    // const bw = Math.floor(b.weight * 100)
                    // if (aw > bw) return -1
                    // else if(aw < bw) return 1

                    // Sort by name
                    if (a.name > b.name) return 1
                    else if (a.name < b.name) return -1
                    else return 0
                })

                return arr
            }

            _processTags(skills) {
                const tags = {}
                for(let name in skills) {
                    const sk = skills[name]
                    const tagList = sk.tags
                    for(let tag of tagList) {
                        const lctag = tag.toLowerCase()
                        tags[lctag] = tags[lctag] || { name: tag, skills: [] }
                        tags[lctag].skills.push(name)

                        console.log(tags[lctag].skills)
                    }
                }

                const arr = []
                for(let tag in tags) arr.push(tags[tag])

                return arr
            }

            _getWidthStyle(weight) {
                return `width: ${weight*100}%`
            }

            _toReadablePercentage(weight) {
                return Math.floor(weight * 100) + '%'
            }

            /* Observers */
            _srcObserver(src) {
                if (!src) return

                fetch(src)
                    .then(res => res.json())
                    .then(json => this._skills = json)
            }

            /* Event Handlers */
            _skillMouseenterHandler(e) {
                this._hovered = e.model.item.name

                if (e.model.item.description) {
                    this.dispatchEvent(new CustomEvent('display-popover', {
                        bubbles: true,
                        detail: {
                            target: this.shadowRoot.querySelector('#dots li[active]'),
                            text: e.model.item.description
                        }
                    }))
                }
            }

            _skillMouseleaveHandler(e) {
                this._hovered = null
                this.dispatchEvent(new CustomEvent('close-popover', { bubbles: true }))
            }
        }
        customElements.define(SkillsElement.is, SkillsElement)

    })()



/***/ }),
/* 28 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"sliding-image\">\n    <template>\n        <style type=\"text/css\">:host{display:block;background-position:center;background-size:cover;height:300px;position:relative;}</style>\n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    (function() {
        class SlidingImage extends Polymer.Element {
            static get is() { return 'sliding-image' }

            static get properties() {
                return {
                    src: {
                        type: String,
                        value: null,
                        reflectToAttribute: true
                    },

                    ratio: {
                        type: Number,
                        value: 0
                    },

                    minPerc: {
                        type: Number,
                        value: 35
                    },

                    maxPerc: {
                        type: Number,
                        value: 65
                    }
                }
            }

            static get observers() {
                return ['_styleObserver(src, ratio, minPerc, maxPerc)']
            }

            _styleObserver(src, ratio, min, max) {
                src = this.resolveUrl(src)

                const lerp = (from, to, ratio) => from + (to - from) * ratio
                const perc = lerp(min, max, ratio)
                this.style.backgroundImage = `url(${src})`
                this.style.backgroundPositionY = `${perc}%`
            }

            connectedCallback() {
                super.connectedCallback()

                this._scrollFunc = () => {
                    const rect = this.getBoundingClientRect()
                    const maxHeight = window.innerHeight + this.clientHeight / 2
                    const dist = rect.top + this.clientHeight / 2
                    const ratio = dist / maxHeight

                    this.ratio = ratio

                }
                this._scrollFunc()
                window.addEventListener('scroll', this._scrollFunc)
                window.addEventListener('resize', this._scrollFunc)
            }

            disconnectedCallback() {
                super.disconnectedCallback()
                window.removeEventListener('scroll', this._scrollFunc)
                window.removeEventListener('resize', this._scrollFunc)
            }

        }
        customElements.define(SlidingImage.is, SlidingImage)

    })()



/***/ }),
/* 29 */
/***/ (function(module, exports) {

/*__wc__loader*/!function(a){var b="<dom-module id=\"pop-over\">\n    <template>\n        <style type=\"text/css\">:host{pointer-events:none;}#popover{display:none;position:fixed;width:0;height:0;margin-top:10px;z-index:1000;}#popover[active]{display:block;}#arrow{border-width:0 5px 5px 5px;border-color:transparent transparent #37474F transparent;border-style:solid;position:absolute;top:-5px;left:-5px;}#content-container{width:220px;position:absolute;}#content{display:inline-block;background-color:#37474F;padding:10px;color:#fcfdfd;font-size:14px;line-height:17px;}</style>\n\n        <div id=\"popover\" active$=\"[[_exists(target,text)]]\" style$=\"[[_getPosStyle(_targetRect)]]\">\n            <div id=\"arrow\"></div>\n            <div id=\"content-container\" style$=\"[[_getOffsetStyle(_contentRect,_targetRect)]]\">\n                <span id=\"content\">[[text]]</span>\n            </div>\n        </div>\n    </template>\n</dom-module>\n";if(a.body){var c=a.body,d=a.createElement("div");for(d.innerHTML=b;d.children.length>0;)c.appendChild(d.children[0])}else a.write(b)}(document);

    (function() {
        class PopOver extends Polymer.Element {
            static get is() { return 'pop-over' }

            static get properties() {
                return {
                    target: {
                        type: HTMLElement,
                        value: null
                    },

                    text: {
                        type: String,
                        value: ''
                    },

                    _contentRect: {
                        type: Object,
                        value: null
                    },

                    _targetRect: {
                        type: Object,
                        value: null
                    },

                    _animationid: {
                        type: Number,
                        value: null
                    }
                }
            }

            static get observers() {
                return ['_contentObserver(target,text)']
            }

            connectedCallback() {
                super.connectedCallback()

                this._displayFunc = e => {
                    this.target = e.detail.target
                    this.text = e.detail.text
                }

                this._closeFunc = () => {
                    this.target = null
                    this.text = ''
                }

                window.addEventListener('display-popover', this._displayFunc)
                window.addEventListener('close-popover', this._closeFunc)
            }

            disconnectedCallback() {
                window.removeEventListener('display-popover', this._displayFunc)
                window.removeEventListener('close-popover', this._closeFunc)
            }

            /* Utilities */
            _exists() {
                let exists = true
                for(let val of arguments) exists &= !!val
                
                return !!exists
            }

            _getPosStyle(rect) {
                if (!rect) return ''

                const top = rect.bottom
                const left = rect.left + rect.width / 2
                return `top:${top}px; left:${left}px`
            }

            _getOffsetStyle(rect, targetRect) {
                if (!rect) return

                const center = targetRect.left + targetRect.width / 2
                const hwidth = rect.width / 2

                if(center - hwidth < 5) return `left:-${center - 5}px;`
                if(center + hwidth > window.innerWidth - 5) return `right:-${window.innerWidth - center - 5}px;`
                return `left:-${hwidth}px;`
            }

            /* Observers */
            _contentObserver(target, text) {
                if (this._animationid || !target || !text) return

                const _do = () => {
                    if (!this.target) {
                        this._animationid = null
                        return
                    }

                    this._targetRect = this.target.getBoundingClientRect()
                    this._contentRect = this.shadowRoot.querySelector('#content').getBoundingClientRect()
                    this._animationid = requestAnimationFrame(_do)                    
                }
                _do()
            }
        }
        customElements.define(PopOver.is, PopOver)

    })()



/***/ })
/******/ ]);