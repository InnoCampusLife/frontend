/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _arguments = arguments;
	var Vue = __webpack_require__(1);
	var VueRouter = __webpack_require__(3);
	var app = __webpack_require__(4);
	var newRouter = __webpack_require__(14);

	__webpack_require__(72);

	Vue.use(VueRouter);

	var router = newRouter(new VueRouter({
	    hashbang: false,
	    history: true
	}));

	router.start(app, 'app');

	// Polyfills

	if (!String.prototype.includes) {
	    String.prototype.includes = function () {
	        return String.prototype.indexOf.apply(undefined, _arguments) !== -1;
	    };
	}

	if (!Array.prototype.includes) {
	    Array.prototype.includes = function (searchElement /*, fromIndex*/) {
	        if (undefined == null) {
	            throw new TypeError('Array.prototype.includes called on null or undefined');
	        }
	        var O = Object(undefined);
	        var len = parseInt(O.length, 10) || 0;
	        if (len === 0) {
	            return false;
	        }
	        var n = parseInt(_arguments[1], 10) || 0;
	        var k;
	        if (n >= 0) {
	            k = n;
	        } else {
	            k = len + n;
	            if (k < 0) {
	                k = 0;
	            }
	        }
	        var currentElement;
	        while (k < len) {
	            currentElement = O[k];
	            if (searchElement === currentElement || searchElement !== searchElement && currentElement !== currentElement) {
	                // NaN !== NaN
	                return true;
	            }
	            k++;
	        }
	        return false;
	    };
	}

	if (!Object.prototype.equals) Object.defineProperty(Object.prototype, "equals", {
	    enumerable: false,
	    value: function value(obj) {
	        var p;
	        if (this === obj) {
	            return true;
	        }

	        // some checks for native types first

	        // function and sring
	        if (typeof this === "function" || typeof this === "string" || this instanceof String) {
	            return this.toString() === obj.toString();
	        }

	        // number
	        if (this instanceof Number || typeof this === "number") {
	            if (obj instanceof Number || typeof obj === "number") {
	                return this.valueOf() === obj.valueOf();
	            }
	            return false;
	        }

	        // null.equals(null) and undefined.equals(undefined) do not inherit from the 
	        // Object.prototype so we can return false when they are passed as obj
	        if (_typeof(this) !== (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || obj === null || typeof obj === "undefined") {
	            return false;
	        }

	        function sort(o) {
	            var result = {};

	            if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== "object") {
	                return o;
	            }

	            Object.keys(o).sort().forEach(function (key) {
	                result[key] = sort(o[key]);
	            });

	            return result;
	        }

	        if (_typeof(this) === "object") {
	            if (Array.isArray(this)) {
	                // check on arrays
	                return JSON.stringify(this) === JSON.stringify(obj);
	            } else {
	                // anyway objects
	                for (p in this) {
	                    if (_typeof(this[p]) !== _typeof(obj[p])) {
	                        return false;
	                    }
	                    if (this[p] === null !== (obj[p] === null)) {
	                        return false;
	                    }
	                    switch (_typeof(this[p])) {
	                        case 'undefined':
	                            if (typeof obj[p] !== 'undefined') {
	                                return false;
	                            }
	                            break;
	                        case 'object':
	                            if (this[p] !== null && obj[p] !== null && (this[p].constructor.toString() !== obj[p].constructor.toString() || !this[p].equals(obj[p]))) {
	                                return false;
	                            }
	                            break;
	                        case 'function':
	                            if (this[p].toString() !== obj[p].toString()) {
	                                return false;
	                            }
	                            break;
	                        default:
	                            if (this[p] !== obj[p]) {
	                                return false;
	                            }
	                    }
	                };
	            }
	        }

	        // at least check them with JSON
	        return JSON.stringify(sort(this)) === JSON.stringify(sort(obj));
	    }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.28
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	'use strict';

	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}

	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */

	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    if (obj._isVue) {
	      delete obj._data[key];
	      obj._digest();
	    }
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */

	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}

	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	var literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/;

	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}

	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */

	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}

	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function _toString(value) {
	  return value == null ? '' : value.toString();
	}

	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */

	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}

	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */

	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}

	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */

	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}

	/**
	 * Camelize a hyphen-delimited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var camelizeRE = /-(\w)/g;

	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}

	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}

	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var hyphenateRE = /([^-])([A-Z])/g;

	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase();
	}

	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */

	var classifyRE = /(?:^|[-_\/])(\w)/g;

	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}

	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */

	function bind(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}

	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */

	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}

	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */

	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';

	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}

	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */

	var isArray = Array.isArray;

	/**
	 * Define a property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */

	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */

	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}

	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */

	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}

	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */

	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */

	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}

	var hasProto = ('__proto__' in {});

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	// UA sniffing for working around browser-specific quirks
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && UA.indexOf('trident') > 0;
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;

	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}

	/* istanbul ignore next */
	function isNative(Ctor) {
	  return (/native code/.test(Ctor.toString())
	  );
	}

	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */

	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc = undefined;

	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var noop = function noop() {};
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) setTimeout(noop);
	    };
	  } else if (typeof MutationObserver !== 'undefined') {
	    // use MutationObserver where native Promise is not available,
	    // e.g. IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout;
	  }

	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();

	var _Set = undefined;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = function () {
	    this.set = Object.create(null);
	  };
	  _Set.prototype.has = function (key) {
	    return this.set[key] !== undefined;
	  };
	  _Set.prototype.add = function (key) {
	    this.set[key] = 1;
	  };
	  _Set.prototype.clear = function () {
	    this.set = Object.create(null);
	  };
	}

	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}

	var p = Cache.prototype;

	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */

	p.put = function (key, value) {
	  var removed;

	  var entry = this.get(key, true);
	  if (!entry) {
	    if (this.size === this.limit) {
	      removed = this.shift();
	    }
	    entry = {
	      key: key
	    };
	    this._keymap[key] = entry;
	    if (this.tail) {
	      this.tail.newer = entry;
	      entry.older = this.tail;
	    } else {
	      this.head = entry;
	    }
	    this.tail = entry;
	    this.size++;
	  }
	  entry.value = value;

	  return removed;
	};

	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */

	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	    this.size--;
	  }
	  return entry;
	};

	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */

	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};

	var cache$1 = new Cache(1000);
	var reservedArgRE = /^in$|^-?\d+/;

	/**
	 * Parser state
	 */

	var str;
	var dir;
	var len;
	var index;
	var chr;
	var state;
	var startState = 0;
	var filterState = 1;
	var filterNameState = 2;
	var filterArgState = 3;

	var doubleChr = 0x22;
	var singleChr = 0x27;
	var pipeChr = 0x7C;
	var escapeChr = 0x5C;
	var spaceChr = 0x20;

	var expStartChr = { 0x5B: 1, 0x7B: 1, 0x28: 1 };
	var expChrPair = { 0x5B: 0x5D, 0x7B: 0x7D, 0x28: 0x29 };

	function peek() {
	  return str.charCodeAt(index + 1);
	}

	function next() {
	  return str.charCodeAt(++index);
	}

	function eof() {
	  return index >= len;
	}

	function eatSpace() {
	  while (peek() === spaceChr) {
	    next();
	  }
	}

	function isStringStart(chr) {
	  return chr === doubleChr || chr === singleChr;
	}

	function isExpStart(chr) {
	  return expStartChr[chr];
	}

	function isExpEnd(start, chr) {
	  return expChrPair[start] === chr;
	}

	function parseString() {
	  var stringQuote = next();
	  var chr;
	  while (!eof()) {
	    chr = next();
	    // escape char
	    if (chr === escapeChr) {
	      next();
	    } else if (chr === stringQuote) {
	      break;
	    }
	  }
	}

	function parseSpecialExp(chr) {
	  var inExp = 0;
	  var startChr = chr;

	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	      continue;
	    }

	    if (startChr === chr) {
	      inExp++;
	    }
	    if (isExpEnd(startChr, chr)) {
	      inExp--;
	    }

	    next();

	    if (inExp === 0) {
	      break;
	    }
	  }
	}

	/**
	 * syntax:
	 * expression | filterName  [arg  arg [| filterName arg arg]]
	 */

	function parseExpression() {
	  var start = index;
	  while (!eof()) {
	    chr = peek();
	    if (isStringStart(chr)) {
	      parseString();
	    } else if (isExpStart(chr)) {
	      parseSpecialExp(chr);
	    } else if (chr === pipeChr) {
	      next();
	      chr = peek();
	      if (chr === pipeChr) {
	        next();
	      } else {
	        if (state === startState || state === filterArgState) {
	          state = filterState;
	        }
	        break;
	      }
	    } else if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
	      eatSpace();
	      break;
	    } else {
	      if (state === filterState) {
	        state = filterNameState;
	      }
	      next();
	    }
	  }

	  return str.slice(start + 1, index) || null;
	}

	function parseFilterList() {
	  var filters = [];
	  while (!eof()) {
	    filters.push(parseFilter());
	  }
	  return filters;
	}

	function parseFilter() {
	  var filter = {};
	  var args;

	  state = filterState;
	  filter.name = parseExpression().trim();

	  state = filterArgState;
	  args = parseFilterArguments();

	  if (args.length) {
	    filter.args = args;
	  }
	  return filter;
	}

	function parseFilterArguments() {
	  var args = [];
	  while (!eof() && state !== filterState) {
	    var arg = parseExpression();
	    if (!arg) {
	      break;
	    }
	    args.push(processFilterArg(arg));
	  }

	  return args;
	}

	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */

	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}

	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} s
	 * @return {Object}
	 */

	function parseDirective(s) {
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }

	  // reset parser state
	  str = s;
	  dir = {};
	  len = str.length;
	  index = -1;
	  chr = '';
	  state = startState;

	  var filters;

	  if (str.indexOf('|') < 0) {
	    dir.expression = str.trim();
	  } else {
	    dir.expression = parseExpression().trim();
	    filters = parseFilterList();
	    if (filters.length) {
	      dir.filters = filters;
	    }
	  }

	  cache$1.put(s, dir);
	  return dir;
	}

	var directive = Object.freeze({
	  parseDirective: parseDirective
	});

	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */

	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}

	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '|' + open + '((?:.|\\n)+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '((?:.|\\n)+?)' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}

	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */

	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}

	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @param {Vue} [vm]
	 * @return {String}
	 */

	function tokensToExp(tokens, vm) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token, vm);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], vm, true);
	  }
	}

	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Vue} [vm]
	 * @param {Boolean} [single]
	 * @return {String}
	 */

	function formatToken(token, vm, single) {
	  return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"';
	}

	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */

	var filterRE = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}

	var text = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});

	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];

	var config = Object.defineProperties({

	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */

	  debug: false,

	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */

	  silent: false,

	  /**
	   * Whether to use async rendering.
	   */

	  async: true,

	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */

	  warnExpressionErrors: true,

	  /**
	   * Whether to allow devtools inspection.
	   * Disabled by default in production builds.
	   */

	  devtools: process.env.NODE_ENV !== 'production',

	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */

	  _delimitersChanged: true,

	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */

	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],

	  /**
	   * prop binding modes
	   */

	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },

	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */

	  _maxUpdateCount: 100

	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */

	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	var warn = undefined;
	var formatComponentName = undefined;

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';

	    warn = function (msg, vm) {
	      if (hasConsole && !config.silent) {
	        console.error('[Vue warn]: ' + msg + (vm ? formatComponentName(vm) : ''));
	      }
	    };

	    formatComponentName = function (vm) {
	      var name = vm._isVue ? vm.$options.name : vm.name;
	      return name ? ' (found in component: <' + hyphenate(name) + '>)' : '';
	    };
	  })();
	}

	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}

	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}

	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}

	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */

	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}

	var transition = Object.freeze({
	  appendWithTransition: appendWithTransition,
	  beforeWithTransition: beforeWithTransition,
	  removeWithTransition: removeWithTransition,
	  applyTransition: applyTransition
	});

	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */

	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}

	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function inDoc(node) {
	  if (!node) return false;
	  var doc = node.ownerDocument.documentElement;
	  var parent = node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}

	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */

	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}

	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */

	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}

	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */

	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}

	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}

	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}

	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */

	function remove(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */

	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}

	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */

	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}

	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 * @param {Boolean} [useCapture]
	 */

	function on(el, event, cb, useCapture) {
	  el.addEventListener(event, cb, useCapture);
	}

	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */

	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}

	/**
	 * For IE9 compat: when both class and :class are present
	 * getAttribute('class') returns wrong value...
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getClass(el) {
	  var classname = el.className;
	  if (typeof classname === 'object') {
	    classname = classname.baseVal || '';
	  }
	  return classname;
	}

	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !/svg$/.test(el.namespaceURI)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}

	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */

	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + getClass(el) + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}

	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element|DocumentFragment}
	 */

	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && isFragment(el.content)) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}

	/**
	 * Trim possible empty head/tail text and comment
	 * nodes inside a parent.
	 *
	 * @param {Node} node
	 */

	function trimNode(node) {
	  var child;
	  /* eslint-disable no-sequences */
	  while ((child = node.firstChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  while ((child = node.lastChild, isTrimmable(child))) {
	    node.removeChild(child);
	  }
	  /* eslint-enable no-sequences */
	}

	function isTrimmable(node) {
	  return node && (node.nodeType === 3 && !node.data.trim() || node.nodeType === 8);
	}

	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */

	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}

	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */

	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__v_anchor = true;
	  return anchor;
	}

	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */

	var refRE = /^v-ref:/;

	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}

	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */

	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}

	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */

	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}

	/**
	 * Check if a node is a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isFragment(node) {
	  return node && node.nodeType === 11;
	}

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 *
	 * @param {Element} el
	 * @return {String}
	 */

	function getOuterHTML(el) {
	  if (el.outerHTML) {
	    return el.outerHTML;
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML;
	  }
	}

	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i;
	var reservedTagRE = /^(slot|partial|component)$/i;

	var isUnknownElement = undefined;
	if (process.env.NODE_ENV !== 'production') {
	  isUnknownElement = function (el, tag) {
	    if (tag.indexOf('-') > -1) {
	      // http://stackoverflow.com/a/28210364/1070244
	      return el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
	    } else {
	      return (/HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        // Firefox returns unknown for some "Interactive elements."
	        !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
	      );
	    }
	  };
	}

	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el, options);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
	        if (expectedTag) {
	          warn('Unknown custom element: <' + tag + '> - ' + 'did you mean <' + expectedTag + '>? ' + 'HTML is case-insensitive, remember to use kebab-case in templates.');
	        } else if (isUnknownElement(el, tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el, options);
	  }
	}

	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */

	function getIsBinding(el, options) {
	  // dynamic syntax
	  var exp = el.getAttribute('is');
	  if (exp != null) {
	    if (resolveAsset(options, 'components', exp)) {
	      el.removeAttribute('is');
	      return { id: exp };
	    }
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */

	var strats = config.optionMergeStrategies = Object.create(null);

	/**
	 * Helper that recursively merges two data objects together.
	 */

	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}

	/**
	 * Data
	 */

	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};

	/**
	 * El
	 */

	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */

	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */

	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */

	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};

	/**
	 * Other object hashes.
	 */

	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};

	/**
	 * Default strategy.
	 */

	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */

	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var ids = Object.keys(components);
	    var def;
	    if (process.env.NODE_ENV !== 'production') {
	      var map = options._componentNameMap = {};
	    }
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      // record a all lowercase <-> kebab-case mapping for
	      // possible custom element case error warning
	      if (process.env.NODE_ENV !== 'production') {
	        map[key.replace(/-/g, '').toLowerCase()] = hyphenate(key);
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */

	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}

	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */

	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */

	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  if (process.env.NODE_ENV !== 'production') {
	    if (child.propsData && !vm) {
	      warn('propsData can only be used as an instantiation option.');
	    }
	  }
	  var options = {};
	  var key;
	  if (child['extends']) {
	    parent = typeof child['extends'] === 'function' ? mergeOptions(parent, child['extends'].options, vm) : mergeOptions(parent, child['extends'], vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      var mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
	      parent = mergeOptions(parent, mixinOptions, vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @param {Boolean} warnMissing
	 * @return {Object|Function}
	 */

	function resolveAsset(options, type, id, warnMissing) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return;
	  }
	  var assets = options[type];
	  var camelizedId;
	  var res = assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
	  }
	  return res;
	}

	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$1++;
	  this.subs = [];
	}

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;

	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};

	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */

	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};

	/**
	 * Add self as a dependency to the target watcher.
	 */

	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};

	/**
	 * Notify all subscribers of a new value.
	 */

	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)

	/**
	 * Intercept mutating methods and emit events
	 */

	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});

	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */

	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});

	/**
	 * Convenience method to remove the element at given index or target element reference.
	 *
	 * @param {*} item
	 */

	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However in certain cases, e.g.
	 * v-for scope alias and props, we don't want to force conversion
	 * because the value may be a nested value under a frozen data structure.
	 *
	 * So whenever we want to set a reactive property without forcing
	 * conversion on the new value, we wrap that call inside this function.
	 */

	var shouldConvert = true;

	function withoutConversion(fn) {
	  shouldConvert = false;
	  fn();
	  shouldConvert = true;
	}

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */

	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}

	// Instance methods

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */

	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */

	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */

	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};

	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};

	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */

	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} src
	 */

	function protoAugment(target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */

	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */

	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}

	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */

	function defineReactive(obj, key, val) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return;
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}



	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		devtools: devtools,
		isIE: isIE,
		isIE9: isIE9,
		isAndroid: isAndroid,
		isIOS: isIOS,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		get _Set () { return _Set; },
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		isFragment: isFragment,
		getOuterHTML: getOuterHTML,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		checkComponentAttr: checkComponentAttr,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});

	var uid = 0;

	function initMixin (Vue) {
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */

	  Vue.prototype._init = function (options) {
	    options = options || {};

	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives

	    // a uid
	    this._uid = uid++;

	    // a flag to avoid this being observed
	    this._isVue = true;

	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization

	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}

	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = false;
	    this._unlinkFn = null;

	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;

	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;

	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to register itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }

	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }

	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);

	    // set ref
	    this._updateRef();

	    // initialize data as empty object.
	    // it will be filled up in _initData().
	    this._data = {};

	    // call init hook
	    this._callHook('init');

	    // initialize data observation and scope inheritance.
	    this._initState();

	    // setup event system and option events.
	    this._initEvents();

	    // call created hook
	    this._callHook('created');

	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}

	var pathCache = new Cache(1000);

	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;

	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;

	var pathStateMachine = [];

	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};

	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};

	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};

	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};

	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};

	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};

	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */

	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }

	  var code = ch.charCodeAt(0);

	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;

	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';

	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }

	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }

	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }

	  return 'else';
	}

	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */

	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}

	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;

	  var actions = [];

	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };

	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };

	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };

	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };

	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }

	  while (mode != null) {
	    index++;
	    c = path[index];

	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }

	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;

	    if (transition === ERROR) {
	      return; // parse error
	    }

	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }

	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}

	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */

	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}

	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */

	function getPath(obj, path) {
	  return parseExpression$1(path).get(obj);
	}

	/**
	 * Warn against setting non-existent root path on a vm.
	 */

	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path, vm) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.', vm);
	  };
	}

	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */

	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression$1(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path, last);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path, obj);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}

	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});

	var expressionCache = new Cache(1000);

	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');

	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'protected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');

	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/;

	function noop() {}

	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */

	var saved = [];

	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */

	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}

	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */

	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}

	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */

	function restore(str, i) {
	  return saved[i];
	}

	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */

	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here because the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}

	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */

	function makeGetterFn(body) {
	  try {
	    /* eslint-disable no-new-func */
	    return new Function('scope', 'return ' + body + ';');
	    /* eslint-enable no-new-func */
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production') {
	      /* istanbul ignore if */
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        warn('It seems you are using the default build of Vue.js in an environment ' + 'with Content Security Policy that prohibits unsafe-eval. ' + 'Use the CSP-compliant build instead: ' + 'http://vuejs.org/guide/installation.html#CSP-compliant-build');
	      } else {
	        warn('Invalid expression. ' + 'Generated function body: ' + body);
	      }
	    }
	    return noop;
	  }
	}

	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */

	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}

	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */

	function parseExpression$1(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}

	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */

	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat literal values as paths
	  !literalValueRE$1.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}

	var expression = Object.freeze({
	  parseExpression: parseExpression$1,
	  isSimplePath: isSimplePath
	});

	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.

	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;

	/**
	 * Reset the batcher's state.
	 */

	function resetBatcherState() {
	  queue.length = 0;
	  userQueue.length = 0;
	  has = {};
	  circular = {};
	  waiting = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */

	function flushBatcherQueue() {
	  var _again = true;

	  _function: while (_again) {
	    _again = false;

	    runBatcherQueue(queue);
	    runBatcherQueue(userQueue);
	    // user watchers triggered more watchers,
	    // keep flushing until it depletes
	    if (queue.length) {
	      _again = true;
	      continue _function;
	    }
	    // dev tool hook
	    /* istanbul ignore if */
	    if (devtools && config.devtools) {
	      devtools.emit('flush');
	    }
	    resetBatcherState();
	  }
	}

	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */

	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn('You may have an infinite update loop for watcher ' + 'with expression "' + watcher.expression + '"', watcher.vm);
	        break;
	      }
	    }
	  }
	  queue.length = 0;
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */

	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String|Function} expOrFn
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression$1(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */

	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};

	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */

	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter ' + '"' + this.expression + '": ' + e.toString(), this.vm);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.', this.vm);
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};

	/**
	 * Prepare for dependency collection.
	 */

	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	};

	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */

	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */

	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this.deps[i];
	    if (!this.newDepIds.has(dep.id)) {
	      dep.removeSub(this);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */

	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};

	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */

	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */

	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */

	Watcher.prototype.depend = function () {
	  var i = this.deps.length;
	  while (i--) {
	    this.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */

	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      this.vm._watchers.$remove(this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this.deps[i].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};

	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */

	var seenObjects = new _Set();
	function traverse(val, seen) {
	  var i = undefined,
	      keys = undefined;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return;
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) traverse(val[i], seen);
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) traverse(val[keys[i]], seen);
	    }
	  }
	}

	var text$1 = {

	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },

	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};

	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);

	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};

	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];

	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];

	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];

	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */

	function isRealTemplate(node) {
	  return isTemplate(node) && isFragment(node.content);
	}

	var tagRE$1 = /<([\w:-]+)/;
	var entityRE = /&#?\w+?;/;
	var commentRE = /<!--/;

	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */

	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var cacheKey = raw ? templateString : templateString.trim();
	  var hit = templateCache.get(cacheKey);
	  if (hit) {
	    return hit;
	  }

	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	  var commentMatch = commentRE.test(templateString);

	  if (!tagMatch && !entityMatch && !commentMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');

	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }

	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	  if (!raw) {
	    trimNode(frag);
	  }
	  templateCache.put(cacheKey, frag);
	  return frag;
	}

	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */

	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment. However, iOS Safari has
	  // bug when using directly cloned template content with touch
	  // events and can cause crashes when the nodes are removed from DOM, so we
	  // have to treat template elements as string templates. (#2805)
	  /* istanbul ignore if */
	  if (isRealTemplate(node)) {
	    return stringToFragment(node.innerHTML);
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}

	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();

	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();

	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */

	function cloneNode(node) {
	  /* istanbul ignore if */
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */

	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;

	  // if the template is already a document fragment,
	  // do nothing
	  if (isFragment(template)) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }

	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }

	  return frag && shouldClone ? cloneNode(frag) : frag;
	}

	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});

	var html = {

	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },

	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },

	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};

	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 * @param {Fragment} [parentFrag]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__v_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__v_frag = this;
	}

	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */

	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	};

	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, single node version
	 */

	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  this.beforeRemove();
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */

	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}

	/**
	 * Remove fragment, multi-nodes version
	 */

	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  this.beforeRemove();
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}

	/**
	 * Prepare the fragment for removal.
	 */

	Fragment.prototype.beforeRemove = function () {
	  var i, l;
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    // call the same method recursively on child
	    // fragments, depth-first
	    this.childFrags[i].beforeRemove(false);
	  }
	  for (i = 0, l = this.children.length; i < l; i++) {
	    // Call destroy for all contained instances,
	    // with remove:false and defer:true.
	    // Defer is necessary because we need to
	    // keep the children to call detach hooks
	    // on them.
	    this.children[i].$destroy(false, true);
	  }
	  var dirs = this.unlink.dirs;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    // disable the watchers on all the directives
	    // so that the rendered content stays the same
	    // during removal.
	    dirs[i]._watcher && dirs[i]._watcher.teardown();
	  }
	};

	/**
	 * Destroy the fragment.
	 */

	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.node.__v_frag = null;
	  this.unlink();
	};

	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function attach(child) {
	  if (!child._isAttached && inDoc(child.$el)) {
	    child._callHook('attached');
	  }
	}

	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */

	function detach(child) {
	  if (child._isAttached && !inDoc(child.$el)) {
	    child._callHook('detached');
	  }
	}

	var linkerCache = new Cache(5000);

	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el) && !el.hasAttribute('v-if')) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : getOuterHTML(el));
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}

	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */

	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};

	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var IF = 2100;
	var FOR = 2200;
	var SLOT = 2300;

	var uid$3 = 0;

	var vFor = {

	  priority: FOR,
	  terminal: true,

	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],

	  bind: function bind() {
	    if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('v-if')) {
	      warn('<' + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute('v-if') + '">: ' + 'Using v-if and v-for on the same element is not recommended - ' + 'consider filtering the source Array instead.', this.vm);
	    }

	    // support "item in/of items" syntax
	    var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }

	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid v-for expression "' + this.descriptor.raw + '": ' + 'alias is required.', this.vm);
	      return;
	    }

	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$3;

	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';

	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);

	    // cache
	    this.cache = Object.create(null);

	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },

	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },

	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */

	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');

	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;

	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          withoutConversion(function () {
	            frag.scope[alias] = value;
	          });
	        }
	      } else {
	        // new instance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }

	    // we're done for the initial render.
	    if (init) {
	      return;
	    }

	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    // when removing a large number of fragments, watcher removal
	    // turns out to be a perf bottleneck, so we batch the watcher
	    // removals into a single filter call!
	    this.vm._vForRemoving = true;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	    this.vm._vForRemoving = false;
	    if (removalIndex) {
	      this.vm._watchers = this.vm._watchers.filter(function (w) {
	        return w.active;
	      });
	    }

	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },

	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */

	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    // important: define the scope alias without forced conversion
	    // so that frozen data structures remain non-reactive.
	    withoutConversion(function () {
	      defineReactive(scope, alias, value);
	    });
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },

	  /**
	   * Update the v-ref on owner vm.
	   */

	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },

	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */

	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },

	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */

	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__v_frag = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      var target = prevEl.nextSibling;
	      /* istanbul ignore if */
	      if (!target) {
	        // reset end anchor position in case the position was messed up
	        // by an external drag-n-drop library.
	        after(this.end, prevEl);
	        target = this.end;
	      }
	      frag.before(target);
	    }
	  },

	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */

	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },

	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */

	  move: function move(frag, prevEl) {
	    // fix a common issue with Sortable:
	    // if prevEl doesn't have nextSibling, this means it's
	    // been dragged after the end anchor. Just re-position
	    // the end anchor to the end of the container.
	    /* istanbul ignore if */
	    if (!prevEl.nextSibling) {
	      this.end.parentNode.appendChild(this.end);
	    }
	    frag.before(prevEl.nextSibling, false);
	  },

	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */

	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = getTrackByKey(index, key, value, trackByKey);
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else if (Object.isExtensible(value)) {
	        def(value, id, frag);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Frozen v-for objects cannot be automatically tracked, make sure to ' + 'provide a track-by key.');
	      }
	    }
	    frag.raw = value;
	  },

	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */

	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },

	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */

	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = getTrackByKey(index, key, value, trackByKey);
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },

	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */

	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },

	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */

	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },

	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * watcher's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */

	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number' && !isNaN(value)) {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },

	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};

	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */

	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__v_frag;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__v_frag;
	  }
	  return frag;
	}

	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */

	function range(n) {
	  var i = -1;
	  var ret = new Array(Math.floor(n));
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}

	/**
	 * Get the track by key for an item.
	 *
	 * @param {Number} index
	 * @param {String} key
	 * @param {*} value
	 * @param {String} [trackByKey]
	 */

	function getTrackByKey(index, key, value, trackByKey) {
	  return trackByKey ? trackByKey === '$index' ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value;
	}

	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.', this.vm);
	  };
	}

	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */

	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}

	var vIf = {

	  priority: IF,
	  terminal: true,

	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseEl = next;
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.', this.vm);
	      this.invalid = true;
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },

	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    // lazy init factory
	    if (!this.factory) {
	      this.factory = new FragmentFactory(this.vm, this.el);
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },

	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseEl && !this.elseFrag) {
	      if (!this.elseFactory) {
	        this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl);
	      }
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	    if (this.elseFrag) {
	      this.elseFrag.destroy();
	    }
	  }
	};

	var show = {

	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },

	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },

	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};

	var text$2 = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;

	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }

	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange && !lazy) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }

	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };

	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }

	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      var method = jQuery.fn.on ? 'on' : 'bind';
	      jQuery(el)[method]('change', this.rawListener);
	      if (!lazy) {
	        jQuery(el)[method]('input', this.listener);
	      }
	    } else {
	      this.on('change', this.rawListener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }

	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }

	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    // #3029 only update when the value changes. This prevent
	    // browsers from overwriting values like selectionStart
	    value = _toString(value);
	    if (value !== this.el.value) this.el.value = value;
	  },

	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      var method = jQuery.fn.off ? 'off' : 'unbind';
	      jQuery(el)[method]('change', this.listener);
	      jQuery(el)[method]('input', this.listener);
	    }
	  }
	};

	var radio = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };

	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);

	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};

	var select = {

	  bind: function bind() {
	    var _this = this;

	    var self = this;
	    var el = this.el;

	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };

	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');

	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);

	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }

	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', function () {
	      nextTick(_this.forceUpdate);
	    });
	    if (!inDoc(el)) {
	      nextTick(this.forceUpdate);
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },

	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};

	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */

	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}

	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */

	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}

	var checkbox = {

	  bind: function bind() {
	    var self = this;
	    var el = this.el;

	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };

	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }

	    this.listener = function () {
	      var model = self._watcher.get();
	      if (isArray(model)) {
	        var val = self.getValue();
	        var i = indexOf(model, val);
	        if (el.checked) {
	          if (i < 0) {
	            self.set(model.concat(val));
	          }
	        } else if (i > -1) {
	          self.set(model.slice(0, i).concat(model.slice(i + 1)));
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };

	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },

	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};

	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};

	var model = {

	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],

	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */

	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model="' + this.descriptor.raw + '". ' + 'You might want to use a two-way filter to ensure correct behavior.', this.vm);
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag, this.vm);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },

	  /**
	   * Check read/write filter stats.
	   */

	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },

	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': [8, 46],
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};

	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  codes = [].concat.apply([], codes);
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}

	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}

	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}

	function selfFilter(handler) {
	  return function selfHandler(e) {
	    if (e.target === e.currentTarget) {
	      return handler.call(this, e);
	    }
	  };
	}

	var on$1 = {

	  priority: ON,
	  acceptStatement: true,
	  keyCodes: keyCodes,

	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },

	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }

	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler, this.vm);
	      return;
	    }

	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    if (this.modifiers.self) {
	      handler = selfFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent' && key !== 'self' && key !== 'capture';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }

	    this.reset();
	    this.handler = handler;

	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on(this.el, this.arg, this.handler, this.modifiers.capture);
	    }
	  },

	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },

	  unbind: function unbind() {
	    this.reset();
	  }
	};

	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);

	var testEl = null;

	var style = {

	  deep: true,

	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },

	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          warn('It\'s probably a bad idea to use !important with inline rules. ' + 'This feature will be deprecated in a future version of Vue.');
	        }
	        value = value.replace(importantRE, '').trim();
	        this.el.style.setProperty(prop.kebab, value, isImportant);
	      } else {
	        this.el.style[prop.camel] = value;
	      }
	    } else {
	      this.el.style[prop.camel] = '';
	    }
	  }

	};

	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}

	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */

	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  var i = prefixes.length;
	  var prefixed;
	  if (camel !== 'filter' && camel in testEl.style) {
	    return {
	      kebab: prop,
	      camel: camel
	    };
	  }
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return {
	        kebab: prefixes[i] + prop,
	        camel: prefixed
	      };
	    }
	  }
	}

	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;

	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(?:value|checked|selected|muted)$/;
	// these attributes expect enumrated values of "true" or "false"
	// but are not boolean attributes
	var enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/;

	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};

	var bind$1 = {

	  priority: BIND,

	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    var descriptor = this.descriptor;
	    var tokens = descriptor.interp;
	    if (tokens) {
	      // handle interpolations with one-time tokens
	      if (descriptor.hasOneTime) {
	        this.expression = tokensToExp(tokens, this._scope || this.vm);
	      }

	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.', this.vm);
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }

	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.', this.vm);
	        }

	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.', this.vm);
	        }
	      }
	    }
	  },

	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },

	  // share object handler with v-bind:class
	  handleObject: style.handleObject,

	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (this.modifiers.camel) {
	      attr = camelize(attr);
	    }
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      var attrValue = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;

	      if (el[attr] !== attrValue) {
	        el[attr] = attrValue;
	      }
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (enumeratedAttrRE.test(attr)) {
	      el.setAttribute(attr, value ? 'true' : 'false');
	    } else if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value === true ? '' : value);
	      } else {
	        el.setAttribute(attr, value === true ? '' : value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};

	var el = {

	  priority: EL,

	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },

	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};

	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.', this.vm);
	  }
	};

	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};

	// logic control
	// two-way binding
	// event handling
	// attributes
	// ref & el
	// cloak
	// must export plain object
	var directives = {
	  text: text$1,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on$1,
	  bind: bind$1,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};

	var vClass = {

	  deep: true,

	  update: function update(value) {
	    if (!value) {
	      this.cleanup();
	    } else if (typeof value === 'string') {
	      this.setClass(value.trim().split(/\s+/));
	    } else {
	      this.setClass(normalize$1(value));
	    }
	  },

	  setClass: function setClass(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      var val = value[i];
	      if (val) {
	        apply(this.el, val, addClass);
	      }
	    }
	    this.prevKeys = value;
	  },

	  cleanup: function cleanup(value) {
	    var prevKeys = this.prevKeys;
	    if (!prevKeys) return;
	    var i = prevKeys.length;
	    while (i--) {
	      var key = prevKeys[i];
	      if (!value || value.indexOf(key) < 0) {
	        apply(this.el, key, removeClass);
	      }
	    }
	  }
	};

	/**
	 * Normalize objects and arrays (potentially containing objects)
	 * into array of strings.
	 *
	 * @param {Object|Array<String|Object>} value
	 * @return {Array<String>}
	 */

	function normalize$1(value) {
	  var res = [];
	  if (isArray(value)) {
	    for (var i = 0, l = value.length; i < l; i++) {
	      var _key = value[i];
	      if (_key) {
	        if (typeof _key === 'string') {
	          res.push(_key);
	        } else {
	          for (var k in _key) {
	            if (_key[k]) res.push(k);
	          }
	        }
	      }
	    }
	  } else if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) res.push(key);
	    }
	  }
	  return res;
	}

	/**
	 * Add or remove a class/classes on an element
	 *
	 * @param {Element} el
	 * @param {String} key The class name. This may or may not
	 *                     contain a space character, in such a
	 *                     case we'll deal with multiple class
	 *                     names at once.
	 * @param {Function} fn
	 */

	function apply(el, key, fn) {
	  key = key.trim();
	  if (key.indexOf(' ') === -1) {
	    fn(el, key);
	    return;
	  }
	  // The key contains one or more space characters.
	  // Since a class name doesn't accept such characters, we
	  // treat it as multiple classes.
	  var keys = key.split(/\s+/);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    fn(el, keys[i]);
	  }
	}

	var component = {

	  priority: COMPONENT,

	  params: ['keep-alive', 'transition-mode', 'inline-template'],

	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */

	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      this.el.removeAttribute(':is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },

	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */

	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },

	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */

	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },

	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  resolveComponent: function resolveComponent(value, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || (typeof value === 'string' ? value : null);
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(value, this.pendingComponentCb);
	  },

	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */

	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHooks = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHooks && !cached) {
	      this.waitingFor = newComponent;
	      callActivateHooks(activateHooks, newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },

	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */

	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },

	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */

	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template, child);
	      }
	      return child;
	    }
	  },

	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */

	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },

	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */

	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      if (!this.keepAlive) {
	        this.waitingFor.$destroy();
	      }
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._inactive = true;
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },

	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */

	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },

	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */

	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (current) current._inactive = true;
	    target._inactive = false;
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },

	  /**
	   * Unbind.
	   */

	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};

	/**
	 * Call activate hooks in order (asynchronous)
	 *
	 * @param {Array} hooks
	 * @param {Vue} vm
	 * @param {Function} cb
	 */

	function callActivateHooks(hooks, vm, cb) {
	  var total = hooks.length;
	  var called = 0;
	  hooks[0].call(vm, next);
	  function next() {
	    if (++called >= total) {
	      cb();
	    } else {
	      hooks[called].call(vm, next);
	    }
	  }
	}

	var propBindingModes = config._propBindingModes;
	var empty = {};

	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;

	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @param {Vue} vm
	 * @return {Function} propsLinkFn
	 */

	function compileProps(el, propOptions, vm) {
	  var props = [];
	  var propsData = vm.$options.propsData;
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;

	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.', vm);
	      continue;
	    }

	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.', vm);
	      continue;
	    }

	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };

	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value) && !parsed.filters) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value, vm);
	        }
	      }
	      prop.parentPath = value;

	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.', vm);
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (propsData && (value = propsData[name] || propsData[path]) !== null) {
	      // has propsData
	      prop.raw = value;
	    } else if (process.env.NODE_ENV !== 'production') {
	      // check possible camelCase prop usage
	      var lowerCaseName = path.toLowerCase();
	      value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(':' + lowerCaseName) || el.getAttribute('v-bind:' + lowerCaseName) || el.getAttribute(':' + lowerCaseName + '.once') || el.getAttribute('v-bind:' + lowerCaseName + '.once') || el.getAttribute(':' + lowerCaseName + '.sync') || el.getAttribute('v-bind:' + lowerCaseName + '.sync'));
	      if (value) {
	        warn('Possible usage error for prop `' + lowerCaseName + '` - ' + 'did you mean `' + attr + '`? HTML is case-insensitive, remember to use ' + 'kebab-case for props in templates.', vm);
	      } else if (options.required && (!propsData || !(name in propsData) && !(path in propsData))) {
	        // warn missing required
	        warn('Missing required prop: ' + name, vm);
	      }
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}

	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */

	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var inlineProps = vm.$options.propsData;
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (inlineProps && hasOwn(inlineProps, path)) {
	        initProp(vm, prop, inlineProps[path]);
	      }if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, undefined);
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (prop.mode === propBindingModes.ONE_TIME) {
	          // one time binding
	          value = (scope || vm._context || vm).$get(prop.parentPath);
	          initProp(vm, prop, value);
	        } else {
	          if (vm._context) {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          } else {
	              // root instance
	              initProp(vm, prop, vm.$get(prop.parentPath));
	            }
	        }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value, or with same
	        // literal value (e.g. disabled="disabled")
	        // see https://github.com/vuejs/vue-loader/issues/182
	        value = options.type === Boolean && (raw === '' || raw === hyphenate(prop.name)) ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}

	/**
	 * Process a prop with a rawValue, applying necessary coersions,
	 * default values & assertions and call the given callback with
	 * processed value.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} rawValue
	 * @param {Function} fn
	 */

	function processPropValue(vm, prop, rawValue, fn) {
	  var isSimple = prop.dynamic && isSimplePath(prop.parentPath);
	  var value = rawValue;
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop);
	  }
	  value = coerceProp(prop, value, vm);
	  var coerced = value !== rawValue;
	  if (!assertProp(prop, value, vm)) {
	    value = undefined;
	  }
	  if (isSimple && !coerced) {
	    withoutConversion(function () {
	      fn(value);
	    });
	  } else {
	    fn(value);
	  }
	}

	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function initProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    defineReactive(vm, prop.path, value);
	  });
	}

	/**
	 * Update a prop's value on a vm.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */

	function updateProp(vm, prop, value) {
	  processPropValue(vm, prop, value, function (value) {
	    vm[prop.path] = value;
	  });
	}

	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @return {*}
	 */

	function getPropDefaultValue(vm, prop) {
	  // no default, return undefined
	  var options = prop.options;
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid default value for prop "' + prop.name + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}

	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 * @param {Vue} vm
	 */

	function assertProp(prop, value, vm) {
	  if (!prop.options.required && ( // non-required
	  prop.raw === null || // abscent
	  value == null) // null or undefined
	  ) {
	      return true;
	    }
	  var options = prop.options;
	  var type = options.type;
	  var valid = !type;
	  var expectedTypes = [];
	  if (type) {
	    if (!isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    if (process.env.NODE_ENV !== 'production') {
	      warn('Invalid prop: type check failed for prop "' + prop.name + '".' + ' Expected ' + expectedTypes.map(formatType).join(', ') + ', got ' + formatValue(value) + '.', vm);
	    }
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator(value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm);
	      return false;
	    }
	  }
	  return true;
	}

	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */

	function coerceProp(prop, value, vm) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  if (typeof coerce === 'function') {
	    return coerce(value);
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + '.', vm);
	    return value;
	  }
	}

	/**
	 * Assert the type of a value
	 *
	 * @param {*} value
	 * @param {Function} type
	 * @return {Object}
	 */

	function assertType(value, type) {
	  var valid;
	  var expectedType;
	  if (type === String) {
	    expectedType = 'string';
	    valid = typeof value === expectedType;
	  } else if (type === Number) {
	    expectedType = 'number';
	    valid = typeof value === expectedType;
	  } else if (type === Boolean) {
	    expectedType = 'boolean';
	    valid = typeof value === expectedType;
	  } else if (type === Function) {
	    expectedType = 'function';
	    valid = typeof value === expectedType;
	  } else if (type === Object) {
	    expectedType = 'object';
	    valid = isPlainObject(value);
	  } else if (type === Array) {
	    expectedType = 'array';
	    valid = isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  };
	}

	/**
	 * Format type for output
	 *
	 * @param {String} type
	 * @return {String}
	 */

	function formatType(type) {
	  return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'custom type';
	}

	/**
	 * Format value
	 *
	 * @param {*} value
	 * @return {String}
	 */

	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}

	var bindingModes = config._propBindingModes;

	var propDef = {

	  bind: function bind() {
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;

	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      updateProp(child, prop, val);
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });

	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);

	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },

	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};

	var queue$1 = [];
	var queued = false;

	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */

	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}

	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */

	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}

	var TYPE_TRANSITION = 'transition';
	var TYPE_ANIMATION = 'animation';
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';

	/**
	 * If a just-entered element is applied the
	 * leave class while its enter transition hasn't started yet,
	 * and the transitioned property has the same value for both
	 * enter/leave, then the leave transition will be skipped and
	 * the transitionend event never fires. This function ensures
	 * its callback to be called after a transition has started
	 * by waiting for double raf.
	 *
	 * It falls back to setTimeout on devices that support CSS
	 * transitions but not raf (e.g. Android 4.2 browser) - since
	 * these environments are usually slow, we are giving it a
	 * relatively large timeout.
	 */

	var raf = inBrowser && window.requestAnimationFrame;
	var waitForTransitionStart = raf
	/* istanbul ignore next */
	? function (fn) {
	  raf(function () {
	    raf(fn);
	  });
	} : function (fn) {
	  setTimeout(fn, 50);
	};

	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = hooks && hooks.enterClass || id + '-enter';
	  this.leaveClass = hooks && hooks.leaveClass || id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // check css transition type
	  this.type = hooks && hooks.type;
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION) {
	      warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
	    }
	  }
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind(self[m], self);
	  });
	}

	var p$1 = Transition.prototype;

	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */

	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};

	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */

	p$1.enterNextTick = function () {
	  var _this = this;

	  // prevent transition skipping
	  this.justEntered = true;
	  waitForTransitionStart(function () {
	    _this.justEntered = false;
	  });
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};

	/**
	 * The "cleanup" phase of an entering transition.
	 */

	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};

	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */

	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};

	/**
	 * The "nextTick" phase of a leaving transition.
	 */

	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};

	/**
	 * The "cleanup" phase of a leaving transition.
	 */

	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};

	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */

	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};

	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */

	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};

	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */

	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};

	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */

	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.type || this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};

	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */

	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on(el, event, onEnd);
	};

	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */

	function isHidden(el) {
	  if (/svg$/.test(el.namespaceURI)) {
	    // SVG elements do not have offset(Width|Height)
	    // so we need to check the client rect
	    var rect = el.getBoundingClientRect();
	    return !(rect.width || rect.height);
	  } else {
	    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	  }
	}

	var transition$1 = {

	  priority: TRANSITION,

	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    oldId = oldId || 'v';
	    el.__v_trans = new Transition(el, id, hooks, this.vm);
	    removeClass(el, oldId + '-transition');
	    addClass(el, id + '-transition');
	  }
	};

	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition$1
	};

	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;

	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	var DEFAULT_TERMINAL_PRIORITY = 2000;

	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */

	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && !isScript(el) && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;

	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */

	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}

	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */

	function linkAndCapture(linker, vm) {
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV === 'production') {
	    // reset directives before every capture in production
	    // mode, so that when unlinking we don't need to splice
	    // them out (which turns out to be a perf hit).
	    // they are kept in development mode because they are
	    // useful for Vue's own tests.
	    vm._directives = [];
	  }
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  sortDirectives(dirs);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}

	/**
	 * sort directives by priority (stable sort)
	 *
	 * @param {Array} dirs
	 */
	function sortDirectives(dirs) {
	  if (dirs.length === 0) return;

	  var groupedMap = {};
	  var i, j, k, l;
	  var index = 0;
	  var priorities = [];
	  for (i = 0, j = dirs.length; i < j; i++) {
	    var dir = dirs[i];
	    var priority = dir.descriptor.def.priority || DEFAULT_PRIORITY;
	    var array = groupedMap[priority];
	    if (!array) {
	      array = groupedMap[priority] = [];
	      priorities.push(priority);
	    }
	    array.push(dir);
	  }

	  priorities.sort(function (a, b) {
	    return a > b ? -1 : a === b ? 0 : 1;
	  });
	  for (i = 0, j = priorities.length; i < j; i++) {
	    var group = groupedMap[priorities[i]];
	    for (k = 0, l = group.length; k < l; k++) {
	      dirs[index++] = group[k];
	    }
	  }
	}

	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */

	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  }
	  // expose linked directives
	  unlink.dirs = dirs;
	  return unlink;
	}

	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */

	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (process.env.NODE_ENV !== 'production' && !destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}

	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */

	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props, vm);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}

	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */

	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;

	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;

	      var componentName = options.el.tagName.toLowerCase();
	      if (componentName === 'component' && options.name) {
	        componentName += ':' + options.name;
	      }

	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + componentName + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment-Instance');
	    }
	  }

	  options._containerAttrs = options._replacerAttrs = null;
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }

	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);

	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}

	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && !isScript(node)) {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}

	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */

	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    // a textarea which has v-pre attr should skip complie.
	    if (getAttr(el, 'v-pre') !== null) {
	      return skip;
	    }
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  var attrs = hasAttrs && toArray(el.attributes);
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, attrs, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(attrs, options);
	  }
	  return linkFn;
	}

	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */

	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }

	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }

	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }

	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}

	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */

	function removeText(vm, node) {
	  remove(node);
	}

	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */

	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: directives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}

	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */

	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = _toString(value);
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}

	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}

	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */

	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}

	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */

	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) {
	    return;
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}

	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */

	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}

	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Array} attrs
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */

	function checkTerminalDirectives(el, attrs, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }

	  var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef;
	  for (var i = 0, j = attrs.length; i < j; i++) {
	    attr = attrs[i];
	    name = attr.name.replace(modifierRE, '');
	    if (matched = name.match(dirAttrRE)) {
	      def = resolveAsset(options, 'directives', matched[1]);
	      if (def && def.terminal) {
	        if (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) {
	          termDef = def;
	          rawName = attr.name;
	          modifiers = parseModifiers(attr.name);
	          value = attr.value;
	          dirName = matched[1];
	          arg = matched[2];
	        }
	      }
	    }
	  }

	  if (termDef) {
	    return makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers);
	  }
	}

	function skip() {}
	skip.terminal = true;

	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} def
	 * @param {String} [rawName]
	 * @param {String} [arg]
	 * @param {Object} [modifiers]
	 * @return {Function} terminalLinkFn
	 */

	function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    arg: arg,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    attr: rawName,
	    modifiers: modifiers,
	    def: def
	  };
	  // check ref for v-for, v-if and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}

	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */

	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');

	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', directives.bind, tokens);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.', options);
	        }
	      }
	    } else

	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else

	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', directives.on);
	        } else

	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', directives.bind);
	            }
	          } else

	            // normal directives
	            if (matched = name.match(dirAttrRE)) {
	              dirName = matched[1];
	              arg = matched[2];

	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }

	              dirDef = resolveAsset(options, 'directives', dirName, true);
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }

	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Array} [interpTokens]
	   */

	  function pushDir(dirName, def, interpTokens) {
	    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens);
	    var parsed = !hasOneTimeToken && parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      // conversion from interpolation strings with one-time token
	      // to expression is differed until directive bind time so that we
	      // have access to the actual vm context for one-time bindings.
	      expression: parsed && parsed.expression,
	      filters: parsed && parsed.filters,
	      interp: interpTokens,
	      hasOneTime: hasOneTimeToken
	    });
	  }

	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}

	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */

	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}

	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */

	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}

	/**
	 * Check if an interpolation string contains one-time tokens.
	 *
	 * @param {Array} tokens
	 * @return {Boolean}
	 */

	function hasOneTime(tokens) {
	  var i = tokens.length;
	  while (i--) {
	    if (tokens[i].oneTime) return true;
	  }
	}

	function isScript(el) {
	  return el.tagName === 'SCRIPT' && (!el.hasAttribute('type') || el.getAttribute('type') === 'text/javascript');
	}

	var specialCharRE = /[^\w\-:\.]/;

	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (isFragment(el)) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}

	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */

	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    if (!replacer) {
	      return frag;
	    }
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}

	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */

	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}

	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */

	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class' && !parseText(value) && (value = value.trim())) {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}

	/**
	 * Scan and determine slot content distribution.
	 * We do this during transclusion instead at compile time so that
	 * the distribution is decoupled from the compilation order of
	 * the slots.
	 *
	 * @param {Element|DocumentFragment} template
	 * @param {Element} content
	 * @param {Vue} vm
	 */

	function resolveSlots(vm, content) {
	  if (!content) {
	    return;
	  }
	  var contents = vm._slotContents = Object.create(null);
	  var el, name;
	  for (var i = 0, l = content.children.length; i < l; i++) {
	    el = content.children[i];
	    /* eslint-disable no-cond-assign */
	    if (name = el.getAttribute('slot')) {
	      (contents[name] || (contents[name] = [])).push(el);
	    }
	    /* eslint-enable no-cond-assign */
	    if (process.env.NODE_ENV !== 'production' && getBindAttr(el, 'slot')) {
	      warn('The "slot" attribute must be static.', vm.$parent);
	    }
	  }
	  for (name in contents) {
	    contents[name] = extractFragment(contents[name], content);
	  }
	  if (content.hasChildNodes()) {
	    var nodes = content.childNodes;
	    if (nodes.length === 1 && nodes[0].nodeType === 3 && !nodes[0].data.trim()) {
	      return;
	    }
	    contents['default'] = extractFragment(content.childNodes, content);
	  }
	}

	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @return {DocumentFragment}
	 */

	function extractFragment(nodes, parent) {
	  var frag = document.createDocumentFragment();
	  nodes = toArray(nodes);
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      parent.removeChild(node);
	      node = parseTemplate(node, true);
	    }
	    frag.appendChild(node);
	  }
	  return frag;
	}



	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude,
		resolveSlots: resolveSlots
	});

	function stateMixin (Vue) {
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */

	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });

	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */

	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };

	  /**
	   * Initialize props.
	   */

	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.', this);
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };

	  /**
	   * Initialize the data.
	   */

	  Vue.prototype._initData = function () {
	    var dataFn = this.$options.data;
	    var data = this._data = dataFn ? dataFn() : {};
	    if (!isPlainObject(data)) {
	      data = {};
	      process.env.NODE_ENV !== 'production' && warn('data functions should return an object.', this);
	    }
	    var props = this._props;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      // there are two scenarios where we can proxy a data key:
	      // 1. it's not already defined as a prop
	      // 2. it's provided via a instantiation option AND there are no
	      //    template prop present
	      if (!props || !hasOwn(props, key)) {
	        this._proxy(key);
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('Data field "' + key + '" is already defined ' + 'as a prop. To provide default value for a prop, use the "default" ' + 'prop option; if you want to pass prop values to an instantiation ' + 'call, use the "propsData" option.', this);
	      }
	    }
	    // observe data
	    observe(data, this);
	  };

	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */

	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };

	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */

	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };

	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */

	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };

	  /**
	   * Force update on every watcher in scope.
	   */

	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };

	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */

	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop;
	          def.set = userDef.set ? bind(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };

	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }

	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */

	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind(methods[key], this);
	      }
	    }
	  };

	  /**
	   * Initialize meta information like $index, $key & $value.
	   */

	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}

	var eventRE = /^v-on:|^@/;

	function eventsMixin (Vue) {
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */

	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };

	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */

	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, value, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        // force the expression into a statement so that
	        // it always dynamically resolves the method to call (#2670)
	        // kinda ugly hack, but does the job.
	        value = attrs[i].value;
	        if (isSimplePath(value)) {
	          value += '.apply(this, $arguments)';
	        }
	        handler = (vm._scope || vm._context).$eval(value, true);
	        handler._fromParent = true;
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }

	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */

	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }

	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */

	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".', vm);
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }

	  /**
	   * Setup recursive attached/detached calls
	   */

	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };

	  /**
	   * Callback to recursively call attached hook on children
	   */

	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }

	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */

	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }

	  /**
	   * Callback to recursively call detached hook on children
	   */

	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }

	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */

	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }

	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */

	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}

	function noop$1() {}

	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Object} [modifiers]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} arg
	 *                 - {String} raw
	 *                 - {String} [ref]
	 *                 - {Array<Object>} [interp]
	 *                 - {Boolean} [hasOneTime]
	 * @param {Vue} vm
	 * @param {Node} el
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}

	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 */

	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;

	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }

	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }

	  // setup directive params
	  this._setupParams();

	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;

	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop$1;
	    }
	    var preProcess = this._preProcess ? bind(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};

	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */

	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = hyphenate(params[i]);
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};

	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */

	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};

	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */

	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression$1(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};

	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */

	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};

	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */

	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};

	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 * @param {Boolean} [useCapture]
	 */

	Directive.prototype.on = function (event, handler, useCapture) {
	  on(this.el, event, handler, useCapture);(this._listeners || (this._listeners = [])).push([event, handler]);
	};

	/**
	 * Teardown the watcher and call unbind.
	 */

	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};

	function lifecycleMixin (Vue) {
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */

	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };

	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._compile = function (el) {
	    var options = this.$options;

	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);

	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }

	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);

	    // resolve slot distribution
	    resolveSlots(this, options._content);

	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }

	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);

	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };

	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }

	    this._isCompiled = true;
	    this._callHook('compiled');
	  };

	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */

	  Vue.prototype._initElement = function (el) {
	    if (isFragment(el)) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };

	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {Object} descriptor - parsed directive descriptor
	   * @param {Node} node   - target node
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */

	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };

	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */

	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }

	    var destroyReady;
	    var pendingRemoval;

	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };

	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }

	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }

	    destroyReady = true;
	    cleanupIfPossible();
	  };

	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */

	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data && this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}

	function miscMixin (Vue) {
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */

	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[write ? l - i - 1 : i];
	      fn = resolveAsset(this.$options, 'filters', filter.name, true);
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };

	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String|Function} value
	   * @param {Function} cb
	   */

	  Vue.prototype._resolveComponent = function (value, cb) {
	    var factory;
	    if (typeof value === 'function') {
	      factory = value;
	    } else {
	      factory = resolveAsset(this.$options, 'components', value, true);
	    }
	    /* istanbul ignore if */
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory.call(this, function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component' + (typeof value === 'string' ? ': ' + value : '') + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}

	var filterRE$1 = /[^|]\|[^|]/;

	function dataAPI (Vue) {
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */

	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression$1(exp);
	    if (res) {
	      if (asStatement) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          var result = res.get.call(self, self);
	          self.$arguments = null;
	          return result;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };

	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */

	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression$1(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };

	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */

	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };

	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */

	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };

	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */

	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE$1.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };

	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */

	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };

	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */

	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      var key;
	      for (key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	      if (this._props) {
	        for (key in this._props) {
	          data[key] = clean(this[key]);
	        }
	      }
	    }
	    console.log(data);
	  };

	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */

	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}

	function domAPI (Vue) {
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */

	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };

	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };

	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };

	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */

	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };

	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */

	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }

	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */

	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }

	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }

	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }

	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */

	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}

	function eventsAPI (Vue) {
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };

	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };

	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */

	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };

	  /**
	   * Trigger an event on self.
	   *
	   * @param {String|Object} event
	   * @return {Boolean} shouldPropagate
	   */

	  Vue.prototype.$emit = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    var cbs = this._events[event];
	    var shouldPropagate = isSource || !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      // this is a somewhat hacky solution to the question raised
	      // in #2102: for an inline component listener like <comp @test="doThis">,
	      // the propagation handling is somewhat broken. Therefore we
	      // need to treat these inline callbacks differently.
	      var hasParentCbs = isSource && cbs.some(function (cb) {
	        return cb._fromParent;
	      });
	      if (hasParentCbs) {
	        shouldPropagate = false;
	      }
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var cb = cbs[i];
	        var res = cb.apply(this, args);
	        if (res === true && (!hasParentCbs || cb._fromParent)) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };

	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String|Object} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$broadcast = function (event) {
	    var isSource = typeof event === 'string';
	    event = isSource ? event : event.name;
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    var args = toArray(arguments);
	    if (isSource) {
	      // use object event to indicate non-source emit
	      // on children
	      args[0] = { name: event, source: this };
	    }
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, args);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, args);
	      }
	    }
	    return this;
	  };

	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */

	  Vue.prototype.$dispatch = function (event) {
	    var shouldPropagate = this.$emit.apply(this, arguments);
	    if (!shouldPropagate) return;
	    var parent = this.$parent;
	    var args = toArray(arguments);
	    // use object event to indicate non-source emit
	    // on parents
	    args[0] = { name: event, source: this };
	    while (parent) {
	      shouldPropagate = parent.$emit.apply(parent, args);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };

	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */

	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}

	function lifecycleAPI (Vue) {
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */

	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.', this);
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };

	  /**
	   * Mark an instance as ready.
	   */

	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }

	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   *
	   * @param {Boolean} remove
	   * @param {Boolean} deferCleanup
	   */

	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };

	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @param {Object} [scope]
	   * @param {Fragment} [frag]
	   * @return {Function}
	   */

	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}

	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */

	function Vue(options) {
	  this._init(options);
	}

	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);

	// install instance APIs
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);

	var slot = {

	  priority: SLOT,
	  params: ['name'],

	  bind: function bind() {
	    // this was resolved during component transclusion
	    var name = this.params.name || 'default';
	    var content = this.vm._slotContents && this.vm._slotContents[name];
	    if (!content || !content.hasChildNodes()) {
	      this.fallback();
	    } else {
	      this.compile(content.cloneNode(true), this.vm._context, this.vm);
	    }
	  },

	  compile: function compile(content, context, host) {
	    if (content && context) {
	      if (this.el.hasChildNodes() && content.childNodes.length === 1 && content.childNodes[0].nodeType === 1 && content.childNodes[0].hasAttribute('v-if')) {
	        // if the inserted slot has v-if
	        // inject fallback content as the v-else
	        var elseBlock = document.createElement('template');
	        elseBlock.setAttribute('v-else', '');
	        elseBlock.innerHTML = this.el.innerHTML;
	        // the else block should be compiled in child scope
	        elseBlock._context = this.vm;
	        content.appendChild(elseBlock);
	      }
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },

	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },

	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};

	var partial = {

	  priority: PARTIAL,

	  params: ['name'],

	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },

	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },

	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id, true);
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },

	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};

	var elementDirectives = {
	  slot: slot,
	  partial: partial
	};

	var convertArray = vFor._postProcess;

	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */

	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  n = toNumber(n);
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}

	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */

	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = Array.prototype.concat.apply([], toArray(arguments, n));
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}

	/**
	 * Order filter for arrays
	 *
	 * @param {String|Array<String>|Function} ...sortKeys
	 * @param {Number} [order]
	 */

	function orderBy(arr) {
	  var comparator = null;
	  var sortKeys = undefined;
	  arr = convertArray(arr);

	  // determine order (last argument)
	  var args = toArray(arguments, 1);
	  var order = args[args.length - 1];
	  if (typeof order === 'number') {
	    order = order < 0 ? -1 : 1;
	    args = args.length > 1 ? args.slice(0, -1) : args;
	  } else {
	    order = 1;
	  }

	  // determine sortKeys & comparator
	  var firstArg = args[0];
	  if (!firstArg) {
	    return arr;
	  } else if (typeof firstArg === 'function') {
	    // custom comparator
	    comparator = function (a, b) {
	      return firstArg(a, b) * order;
	    };
	  } else {
	    // string keys. flatten first
	    sortKeys = Array.prototype.concat.apply([], args);
	    comparator = function (a, b, i) {
	      i = i || 0;
	      return i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1);
	    };
	  }

	  function baseCompare(a, b, sortKeyIndex) {
	    var sortKey = sortKeys[sortKeyIndex];
	    if (sortKey) {
	      if (sortKey !== '$key') {
	        if (isObject(a) && '$value' in a) a = a.$value;
	        if (isObject(b) && '$value' in b) b = b.$value;
	      }
	      a = isObject(a) ? getPath(a, sortKey) : a;
	      b = isObject(b) ? getPath(b, sortKey) : b;
	    }
	    return a === b ? 0 : a > b ? order : -order;
	  }

	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(comparator);
	}

	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */

	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}

	var digitsRE = /(\d{3})(?=\d)/g;

	// asset collections must be a plain object.
	var filters = {

	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,

	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */

	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },

	  /**
	   * 'abc' => 'Abc'
	   */

	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },

	  /**
	   * 'abc' => 'ABC'
	   */

	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },

	  /**
	   * 'AbC' => 'abc'
	   */

	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },

	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   * @param {Number} decimals Decimal places
	   */

	  currency: function currency(value, _currency, decimals) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    decimals = decimals != null ? decimals : 2;
	    var stringified = Math.abs(value).toFixed(decimals);
	    var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = decimals ? stringified.slice(-1 - decimals) : '';
	    var sign = value < 0 ? '-' : '';
	    return sign + _currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },

	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */

	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    var length = args.length;
	    if (length > 1) {
	      var index = value % 10 - 1;
	      return index in args ? args[index] : args[length - 1];
	    } else {
	      return args[0] + (value === 1 ? '' : 's');
	    }
	  },

	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */

	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};

	function installGlobalAPI (Vue) {
	  /**
	   * Vue and every constructor that extends Vue has an
	   * associated options object, which can be accessed during
	   * compilation steps as `this.constructor.options`.
	   *
	   * These can be seen as the default options of every
	   * Vue instance.
	   */

	  Vue.options = {
	    directives: directives,
	    elementDirectives: elementDirectives,
	    filters: filters,
	    transitions: {},
	    components: {},
	    partials: {},
	    replace: true
	  };

	  /**
	   * Expose useful internals
	   */

	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;

	  /**
	   * The following are exposed for advanced usage / plugins
	   */

	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text,
	    template: template,
	    directive: directive,
	    expression: expression
	  };

	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */

	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */

	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn('Invalid component name: "' + name + '". Component names ' + 'can only contain alphanumeric characaters and the hyphen.');
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };

	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */

	  function createClass(name) {
	    /* eslint-disable no-new-func */
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	    /* eslint-enable no-new-func */
	  }

	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */

	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };

	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */

	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };

	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */

	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          if (!definition.name) {
	            definition.name = id;
	          }
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });

	  // expose internal transition API
	  extend(Vue.transition, transition);
	}

	installGlobalAPI(Vue);

	Vue.version = '1.0.28';

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue);
	    } else if (process.env.NODE_ENV !== 'production' && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)) {
	      console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	    }
	  }
	}, 0);

	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * vue-router v0.7.13
	 * (c) 2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  global.VueRouter = factory();
	}(this, function () { 'use strict';

	  var babelHelpers = {};

	  babelHelpers.classCallCheck = function (instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  };
	  function Target(path, matcher, delegate) {
	    this.path = path;
	    this.matcher = matcher;
	    this.delegate = delegate;
	  }

	  Target.prototype = {
	    to: function to(target, callback) {
	      var delegate = this.delegate;

	      if (delegate && delegate.willAddRoute) {
	        target = delegate.willAddRoute(this.matcher.target, target);
	      }

	      this.matcher.add(this.path, target);

	      if (callback) {
	        if (callback.length === 0) {
	          throw new Error("You must have an argument in the function passed to `to`");
	        }
	        this.matcher.addChild(this.path, target, callback, this.delegate);
	      }
	      return this;
	    }
	  };

	  function Matcher(target) {
	    this.routes = {};
	    this.children = {};
	    this.target = target;
	  }

	  Matcher.prototype = {
	    add: function add(path, handler) {
	      this.routes[path] = handler;
	    },

	    addChild: function addChild(path, target, callback, delegate) {
	      var matcher = new Matcher(target);
	      this.children[path] = matcher;

	      var match = generateMatch(path, matcher, delegate);

	      if (delegate && delegate.contextEntered) {
	        delegate.contextEntered(target, match);
	      }

	      callback(match);
	    }
	  };

	  function generateMatch(startingPath, matcher, delegate) {
	    return function (path, nestedCallback) {
	      var fullPath = startingPath + path;

	      if (nestedCallback) {
	        nestedCallback(generateMatch(fullPath, matcher, delegate));
	      } else {
	        return new Target(startingPath + path, matcher, delegate);
	      }
	    };
	  }

	  function addRoute(routeArray, path, handler) {
	    var len = 0;
	    for (var i = 0, l = routeArray.length; i < l; i++) {
	      len += routeArray[i].path.length;
	    }

	    path = path.substr(len);
	    var route = { path: path, handler: handler };
	    routeArray.push(route);
	  }

	  function eachRoute(baseRoute, matcher, callback, binding) {
	    var routes = matcher.routes;

	    for (var path in routes) {
	      if (routes.hasOwnProperty(path)) {
	        var routeArray = baseRoute.slice();
	        addRoute(routeArray, path, routes[path]);

	        if (matcher.children[path]) {
	          eachRoute(routeArray, matcher.children[path], callback, binding);
	        } else {
	          callback.call(binding, routeArray);
	        }
	      }
	    }
	  }

	  function map (callback, addRouteCallback) {
	    var matcher = new Matcher();

	    callback(generateMatch("", matcher, this.delegate));

	    eachRoute([], matcher, function (route) {
	      if (addRouteCallback) {
	        addRouteCallback(this, route);
	      } else {
	        this.add(route);
	      }
	    }, this);
	  }

	  var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];

	  var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');

	  var noWarning = false;
	  function warn(msg) {
	    if (!noWarning && typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  function tryDecode(uri, asComponent) {
	    try {
	      return asComponent ? decodeURIComponent(uri) : decodeURI(uri);
	    } catch (e) {
	      warn('malformed URI' + (asComponent ? ' component: ' : ': ') + uri);
	    }
	  }

	  function isArray(test) {
	    return Object.prototype.toString.call(test) === "[object Array]";
	  }

	  // A Segment represents a segment in the original route description.
	  // Each Segment type provides an `eachChar` and `regex` method.
	  //
	  // The `eachChar` method invokes the callback with one or more character
	  // specifications. A character specification consumes one or more input
	  // characters.
	  //
	  // The `regex` method returns a regex fragment for the segment. If the
	  // segment is a dynamic of star segment, the regex fragment also includes
	  // a capture.
	  //
	  // A character specification contains:
	  //
	  // * `validChars`: a String with a list of all valid characters, or
	  // * `invalidChars`: a String with a list of all invalid characters
	  // * `repeat`: true if the character specification can repeat

	  function StaticSegment(string) {
	    this.string = string;
	  }
	  StaticSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      var string = this.string,
	          ch;

	      for (var i = 0, l = string.length; i < l; i++) {
	        ch = string.charAt(i);
	        callback({ validChars: ch });
	      }
	    },

	    regex: function regex() {
	      return this.string.replace(escapeRegex, '\\$1');
	    },

	    generate: function generate() {
	      return this.string;
	    }
	  };

	  function DynamicSegment(name) {
	    this.name = name;
	  }
	  DynamicSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "/", repeat: true });
	    },

	    regex: function regex() {
	      return "([^/]+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function StarSegment(name) {
	    this.name = name;
	  }
	  StarSegment.prototype = {
	    eachChar: function eachChar(callback) {
	      callback({ invalidChars: "", repeat: true });
	    },

	    regex: function regex() {
	      return "(.+)";
	    },

	    generate: function generate(params) {
	      var val = params[this.name];
	      return val == null ? ":" + this.name : val;
	    }
	  };

	  function EpsilonSegment() {}
	  EpsilonSegment.prototype = {
	    eachChar: function eachChar() {},
	    regex: function regex() {
	      return "";
	    },
	    generate: function generate() {
	      return "";
	    }
	  };

	  function parse(route, names, specificity) {
	    // normalize route as not starting with a "/". Recognition will
	    // also normalize.
	    if (route.charAt(0) === "/") {
	      route = route.substr(1);
	    }

	    var segments = route.split("/"),
	        results = [];

	    // A routes has specificity determined by the order that its different segments
	    // appear in. This system mirrors how the magnitude of numbers written as strings
	    // works.
	    // Consider a number written as: "abc". An example would be "200". Any other number written
	    // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	    // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	    // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	    // leading symbol, "1".
	    // The rule is that symbols to the left carry more weight than symbols to the right
	    // when a number is written out as a string. In the above strings, the leading digit
	    // represents how many 100's are in the number, and it carries more weight than the middle
	    // number which represents how many 10's are in the number.
	    // This system of number magnitude works well for route specificity, too. A route written as
	    // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	    // `x`, irrespective of the other parts.
	    // Because of this similarity, we assign each type of segment a number value written as a
	    // string. We can find the specificity of compound routes by concatenating these strings
	    // together, from left to right. After we have looped through all of the segments,
	    // we convert the string to a number.
	    specificity.val = '';

	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i],
	          match;

	      if (match = segment.match(/^:([^\/]+)$/)) {
	        results.push(new DynamicSegment(match[1]));
	        names.push(match[1]);
	        specificity.val += '3';
	      } else if (match = segment.match(/^\*([^\/]+)$/)) {
	        results.push(new StarSegment(match[1]));
	        specificity.val += '2';
	        names.push(match[1]);
	      } else if (segment === "") {
	        results.push(new EpsilonSegment());
	        specificity.val += '1';
	      } else {
	        results.push(new StaticSegment(segment));
	        specificity.val += '4';
	      }
	    }

	    specificity.val = +specificity.val;

	    return results;
	  }

	  // A State has a character specification and (`charSpec`) and a list of possible
	  // subsequent states (`nextStates`).
	  //
	  // If a State is an accepting state, it will also have several additional
	  // properties:
	  //
	  // * `regex`: A regular expression that is used to extract parameters from paths
	  //   that reached this accepting state.
	  // * `handlers`: Information on how to convert the list of captures into calls
	  //   to registered handlers with the specified parameters
	  // * `types`: How many static, dynamic or star segments in this route. Used to
	  //   decide which route to use if multiple registered routes match a path.
	  //
	  // Currently, State is implemented naively by looping over `nextStates` and
	  // comparing a character specification against a character. A more efficient
	  // implementation would use a hash of keys pointing at one or more next states.

	  function State(charSpec) {
	    this.charSpec = charSpec;
	    this.nextStates = [];
	  }

	  State.prototype = {
	    get: function get(charSpec) {
	      var nextStates = this.nextStates;

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        var child = nextStates[i];

	        var isEqual = child.charSpec.validChars === charSpec.validChars;
	        isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;

	        if (isEqual) {
	          return child;
	        }
	      }
	    },

	    put: function put(charSpec) {
	      var state;

	      // If the character specification already exists in a child of the current
	      // state, just return that state.
	      if (state = this.get(charSpec)) {
	        return state;
	      }

	      // Make a new state for the character spec
	      state = new State(charSpec);

	      // Insert the new state as a child of the current state
	      this.nextStates.push(state);

	      // If this character specification repeats, insert the new state as a child
	      // of itself. Note that this will not trigger an infinite loop because each
	      // transition during recognition consumes a character.
	      if (charSpec.repeat) {
	        state.nextStates.push(state);
	      }

	      // Return the new state
	      return state;
	    },

	    // Find a list of child states matching the next character
	    match: function match(ch) {
	      // DEBUG "Processing `" + ch + "`:"
	      var nextStates = this.nextStates,
	          child,
	          charSpec,
	          chars;

	      // DEBUG "  " + debugState(this)
	      var returned = [];

	      for (var i = 0, l = nextStates.length; i < l; i++) {
	        child = nextStates[i];

	        charSpec = child.charSpec;

	        if (typeof (chars = charSpec.validChars) !== 'undefined') {
	          if (chars.indexOf(ch) !== -1) {
	            returned.push(child);
	          }
	        } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	          if (chars.indexOf(ch) === -1) {
	            returned.push(child);
	          }
	        }
	      }

	      return returned;
	    }

	    /** IF DEBUG
	    , debug: function() {
	      var charSpec = this.charSpec,
	          debug = "[",
	          chars = charSpec.validChars || charSpec.invalidChars;
	       if (charSpec.invalidChars) { debug += "^"; }
	      debug += chars;
	      debug += "]";
	       if (charSpec.repeat) { debug += "+"; }
	       return debug;
	    }
	    END IF **/
	  };

	  /** IF DEBUG
	  function debug(log) {
	    console.log(log);
	  }

	  function debugState(state) {
	    return state.nextStates.map(function(n) {
	      if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	      return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	    }).join(", ")
	  }
	  END IF **/

	  // Sort the routes by specificity
	  function sortSolutions(states) {
	    return states.sort(function (a, b) {
	      return b.specificity.val - a.specificity.val;
	    });
	  }

	  function recognizeChar(states, ch) {
	    var nextStates = [];

	    for (var i = 0, l = states.length; i < l; i++) {
	      var state = states[i];

	      nextStates = nextStates.concat(state.match(ch));
	    }

	    return nextStates;
	  }

	  var oCreate = Object.create || function (proto) {
	    function F() {}
	    F.prototype = proto;
	    return new F();
	  };

	  function RecognizeResults(queryParams) {
	    this.queryParams = queryParams || {};
	  }
	  RecognizeResults.prototype = oCreate({
	    splice: Array.prototype.splice,
	    slice: Array.prototype.slice,
	    push: Array.prototype.push,
	    length: 0,
	    queryParams: null
	  });

	  function findHandler(state, path, queryParams) {
	    var handlers = state.handlers,
	        regex = state.regex;
	    var captures = path.match(regex),
	        currentCapture = 1;
	    var result = new RecognizeResults(queryParams);

	    for (var i = 0, l = handlers.length; i < l; i++) {
	      var handler = handlers[i],
	          names = handler.names,
	          params = {};

	      for (var j = 0, m = names.length; j < m; j++) {
	        params[names[j]] = captures[currentCapture++];
	      }

	      result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	    }

	    return result;
	  }

	  function addSegment(currentState, segment) {
	    segment.eachChar(function (ch) {
	      var state;

	      currentState = currentState.put(ch);
	    });

	    return currentState;
	  }

	  function decodeQueryParamPart(part) {
	    // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	    part = part.replace(/\+/gm, '%20');
	    return tryDecode(part, true);
	  }

	  // The main interface

	  var RouteRecognizer = function RouteRecognizer() {
	    this.rootState = new State();
	    this.names = {};
	  };

	  RouteRecognizer.prototype = {
	    add: function add(routes, options) {
	      var currentState = this.rootState,
	          regex = "^",
	          specificity = {},
	          handlers = [],
	          allSegments = [],
	          name;

	      var isEmpty = true;

	      for (var i = 0, l = routes.length; i < l; i++) {
	        var route = routes[i],
	            names = [];

	        var segments = parse(route.path, names, specificity);

	        allSegments = allSegments.concat(segments);

	        for (var j = 0, m = segments.length; j < m; j++) {
	          var segment = segments[j];

	          if (segment instanceof EpsilonSegment) {
	            continue;
	          }

	          isEmpty = false;

	          // Add a "/" for the new segment
	          currentState = currentState.put({ validChars: "/" });
	          regex += "/";

	          // Add a representation of the segment to the NFA and regex
	          currentState = addSegment(currentState, segment);
	          regex += segment.regex();
	        }

	        var handler = { handler: route.handler, names: names };
	        handlers.push(handler);
	      }

	      if (isEmpty) {
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	      }

	      currentState.handlers = handlers;
	      currentState.regex = new RegExp(regex + "$");
	      currentState.specificity = specificity;

	      if (name = options && options.as) {
	        this.names[name] = {
	          segments: allSegments,
	          handlers: handlers
	        };
	      }
	    },

	    handlersFor: function handlersFor(name) {
	      var route = this.names[name],
	          result = [];
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      for (var i = 0, l = route.handlers.length; i < l; i++) {
	        result.push(route.handlers[i]);
	      }

	      return result;
	    },

	    hasRoute: function hasRoute(name) {
	      return !!this.names[name];
	    },

	    generate: function generate(name, params) {
	      var route = this.names[name],
	          output = "";
	      if (!route) {
	        throw new Error("There is no route named " + name);
	      }

	      var segments = route.segments;

	      for (var i = 0, l = segments.length; i < l; i++) {
	        var segment = segments[i];

	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }

	        output += "/";
	        output += segment.generate(params);
	      }

	      if (output.charAt(0) !== '/') {
	        output = '/' + output;
	      }

	      if (params && params.queryParams) {
	        output += this.generateQueryString(params.queryParams);
	      }

	      return output;
	    },

	    generateQueryString: function generateQueryString(params) {
	      var pairs = [];
	      var keys = [];
	      for (var key in params) {
	        if (params.hasOwnProperty(key)) {
	          keys.push(key);
	        }
	      }
	      keys.sort();
	      for (var i = 0, len = keys.length; i < len; i++) {
	        key = keys[i];
	        var value = params[key];
	        if (value == null) {
	          continue;
	        }
	        var pair = encodeURIComponent(key);
	        if (isArray(value)) {
	          for (var j = 0, l = value.length; j < l; j++) {
	            var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	            pairs.push(arrayPair);
	          }
	        } else {
	          pair += "=" + encodeURIComponent(value);
	          pairs.push(pair);
	        }
	      }

	      if (pairs.length === 0) {
	        return '';
	      }

	      return "?" + pairs.join("&");
	    },

	    parseQueryString: function parseQueryString(queryString) {
	      var pairs = queryString.split("&"),
	          queryParams = {};
	      for (var i = 0; i < pairs.length; i++) {
	        var pair = pairs[i].split('='),
	            key = decodeQueryParamPart(pair[0]),
	            keyLength = key.length,
	            isArray = false,
	            value;
	        if (pair.length === 1) {
	          value = 'true';
	        } else {
	          //Handle arrays
	          if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	            isArray = true;
	            key = key.slice(0, keyLength - 2);
	            if (!queryParams[key]) {
	              queryParams[key] = [];
	            }
	          }
	          value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	        }
	        if (isArray) {
	          queryParams[key].push(value);
	        } else {
	          queryParams[key] = value;
	        }
	      }
	      return queryParams;
	    },

	    recognize: function recognize(path, silent) {
	      noWarning = silent;
	      var states = [this.rootState],
	          pathLen,
	          i,
	          l,
	          queryStart,
	          queryParams = {},
	          isSlashDropped = false;

	      queryStart = path.indexOf('?');
	      if (queryStart !== -1) {
	        var queryString = path.substr(queryStart + 1, path.length);
	        path = path.substr(0, queryStart);
	        if (queryString) {
	          queryParams = this.parseQueryString(queryString);
	        }
	      }

	      path = tryDecode(path);
	      if (!path) return;

	      // DEBUG GROUP path

	      if (path.charAt(0) !== "/") {
	        path = "/" + path;
	      }

	      pathLen = path.length;
	      if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	        path = path.substr(0, pathLen - 1);
	        isSlashDropped = true;
	      }

	      for (i = 0, l = path.length; i < l; i++) {
	        states = recognizeChar(states, path.charAt(i));
	        if (!states.length) {
	          break;
	        }
	      }

	      // END DEBUG GROUP

	      var solutions = [];
	      for (i = 0, l = states.length; i < l; i++) {
	        if (states[i].handlers) {
	          solutions.push(states[i]);
	        }
	      }

	      states = sortSolutions(solutions);

	      var state = solutions[0];

	      if (state && state.handlers) {
	        // if a trailing slash was dropped and a star segment is the last segment
	        // specified, put the trailing slash back
	        if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	          path = path + "/";
	        }
	        return findHandler(state, path, queryParams);
	      }
	    }
	  };

	  RouteRecognizer.prototype.map = map;

	  var genQuery = RouteRecognizer.prototype.generateQueryString;

	  // export default for holding the Vue reference
	  var exports$1 = {};
	  /**
	   * Warn stuff.
	   *
	   * @param {String} msg
	   */

	  function warn$1(msg) {
	    /* istanbul ignore next */
	    if (typeof console !== 'undefined') {
	      console.error('[vue-router] ' + msg);
	    }
	  }

	  /**
	   * Resolve a relative path.
	   *
	   * @param {String} base
	   * @param {String} relative
	   * @param {Boolean} append
	   * @return {String}
	   */

	  function resolvePath(base, relative, append) {
	    var query = base.match(/(\?.*)$/);
	    if (query) {
	      query = query[1];
	      base = base.slice(0, -query.length);
	    }
	    // a query!
	    if (relative.charAt(0) === '?') {
	      return base + relative;
	    }
	    var stack = base.split('/');
	    // remove trailing segment if:
	    // - not appending
	    // - appending to trailing slash (last segment is empty)
	    if (!append || !stack[stack.length - 1]) {
	      stack.pop();
	    }
	    // resolve relative path
	    var segments = relative.replace(/^\//, '').split('/');
	    for (var i = 0; i < segments.length; i++) {
	      var segment = segments[i];
	      if (segment === '.') {
	        continue;
	      } else if (segment === '..') {
	        stack.pop();
	      } else {
	        stack.push(segment);
	      }
	    }
	    // ensure leading slash
	    if (stack[0] !== '') {
	      stack.unshift('');
	    }
	    return stack.join('/');
	  }

	  /**
	   * Forgiving check for a promise
	   *
	   * @param {Object} p
	   * @return {Boolean}
	   */

	  function isPromise(p) {
	    return p && typeof p.then === 'function';
	  }

	  /**
	   * Retrive a route config field from a component instance
	   * OR a component contructor.
	   *
	   * @param {Function|Vue} component
	   * @param {String} name
	   * @return {*}
	   */

	  function getRouteConfig(component, name) {
	    var options = component && (component.$options || component.options);
	    return options && options.route && options.route[name];
	  }

	  /**
	   * Resolve an async component factory. Have to do a dirty
	   * mock here because of Vue core's internal API depends on
	   * an ID check.
	   *
	   * @param {Object} handler
	   * @param {Function} cb
	   */

	  var resolver = undefined;

	  function resolveAsyncComponent(handler, cb) {
	    if (!resolver) {
	      resolver = {
	        resolve: exports$1.Vue.prototype._resolveComponent,
	        $options: {
	          components: {
	            _: handler.component
	          }
	        }
	      };
	    } else {
	      resolver.$options.components._ = handler.component;
	    }
	    resolver.resolve('_', function (Component) {
	      handler.component = Component;
	      cb(Component);
	    });
	  }

	  /**
	   * Map the dynamic segments in a path to params.
	   *
	   * @param {String} path
	   * @param {Object} params
	   * @param {Object} query
	   */

	  function mapParams(path, params, query) {
	    if (params === undefined) params = {};

	    path = path.replace(/:([^\/]+)/g, function (_, key) {
	      var val = params[key];
	      /* istanbul ignore if */
	      if (!val) {
	        warn$1('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	      }
	      return val || '';
	    });
	    if (query) {
	      path += genQuery(query);
	    }
	    return path;
	  }

	  var hashRE = /#.*$/;

	  var HTML5History = (function () {
	    function HTML5History(_ref) {
	      var root = _ref.root;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HTML5History);

	      if (root && root !== '/') {
	        // make sure there's the starting slash
	        if (root.charAt(0) !== '/') {
	          root = '/' + root;
	        }
	        // remove trailing slash
	        this.root = root.replace(/\/$/, '');
	        this.rootRE = new RegExp('^\\' + this.root);
	      } else {
	        this.root = null;
	      }
	      this.onChange = onChange;
	      // check base tag
	      var baseEl = document.querySelector('base');
	      this.base = baseEl && baseEl.getAttribute('href');
	    }

	    HTML5History.prototype.start = function start() {
	      var _this = this;

	      this.listener = function (e) {
	        var url = location.pathname + location.search;
	        if (_this.root) {
	          url = url.replace(_this.rootRE, '');
	        }
	        _this.onChange(url, e && e.state, location.hash);
	      };
	      window.addEventListener('popstate', this.listener);
	      this.listener();
	    };

	    HTML5History.prototype.stop = function stop() {
	      window.removeEventListener('popstate', this.listener);
	    };

	    HTML5History.prototype.go = function go(path, replace, append) {
	      var url = this.formatPath(path, append);
	      if (replace) {
	        history.replaceState({}, '', url);
	      } else {
	        // record scroll position by replacing current state
	        history.replaceState({
	          pos: {
	            x: window.pageXOffset,
	            y: window.pageYOffset
	          }
	        }, '', location.href);
	        // then push new state
	        history.pushState({}, '', url);
	      }
	      var hashMatch = path.match(hashRE);
	      var hash = hashMatch && hashMatch[0];
	      path = url
	      // strip hash so it doesn't mess up params
	      .replace(hashRE, '')
	      // remove root before matching
	      .replace(this.rootRE, '');
	      this.onChange(path, null, hash);
	    };

	    HTML5History.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/'
	      // absolute path
	      ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	    };

	    return HTML5History;
	  })();

	  var HashHistory = (function () {
	    function HashHistory(_ref) {
	      var hashbang = _ref.hashbang;
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, HashHistory);

	      this.hashbang = hashbang;
	      this.onChange = onChange;
	    }

	    HashHistory.prototype.start = function start() {
	      var self = this;
	      this.listener = function () {
	        var path = location.hash;
	        var raw = path.replace(/^#!?/, '');
	        // always
	        if (raw.charAt(0) !== '/') {
	          raw = '/' + raw;
	        }
	        var formattedPath = self.formatPath(raw);
	        if (formattedPath !== path) {
	          location.replace(formattedPath);
	          return;
	        }
	        // determine query
	        // note it's possible to have queries in both the actual URL
	        // and the hash fragment itself.
	        var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	        self.onChange(path.replace(/^#!?/, '') + query);
	      };
	      window.addEventListener('hashchange', this.listener);
	      this.listener();
	    };

	    HashHistory.prototype.stop = function stop() {
	      window.removeEventListener('hashchange', this.listener);
	    };

	    HashHistory.prototype.go = function go(path, replace, append) {
	      path = this.formatPath(path, append);
	      if (replace) {
	        location.replace(path);
	      } else {
	        location.hash = path;
	      }
	    };

	    HashHistory.prototype.formatPath = function formatPath(path, append) {
	      var isAbsoloute = path.charAt(0) === '/';
	      var prefix = '#' + (this.hashbang ? '!' : '');
	      return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	    };

	    return HashHistory;
	  })();

	  var AbstractHistory = (function () {
	    function AbstractHistory(_ref) {
	      var onChange = _ref.onChange;
	      babelHelpers.classCallCheck(this, AbstractHistory);

	      this.onChange = onChange;
	      this.currentPath = '/';
	    }

	    AbstractHistory.prototype.start = function start() {
	      this.onChange('/');
	    };

	    AbstractHistory.prototype.stop = function stop() {
	      // noop
	    };

	    AbstractHistory.prototype.go = function go(path, replace, append) {
	      path = this.currentPath = this.formatPath(path, append);
	      this.onChange(path);
	    };

	    AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	      return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	    };

	    return AbstractHistory;
	  })();

	  /**
	   * Determine the reusability of an existing router view.
	   *
	   * @param {Directive} view
	   * @param {Object} handler
	   * @param {Transition} transition
	   */

	  function canReuse(view, handler, transition) {
	    var component = view.childVM;
	    if (!component || !handler) {
	      return false;
	    }
	    // important: check view.Component here because it may
	    // have been changed in activate hook
	    if (view.Component !== handler.component) {
	      return false;
	    }
	    var canReuseFn = getRouteConfig(component, 'canReuse');
	    return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	      to: transition.to,
	      from: transition.from
	    }) : true; // defaults to true
	  }

	  /**
	   * Check if a component can deactivate.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canDeactivate(view, transition, next) {
	    var fromComponent = view.childVM;
	    var hook = getRouteConfig(fromComponent, 'canDeactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, fromComponent, next, {
	        expectBoolean: true
	      });
	    }
	  }

	  /**
	   * Check if a component can activate.
	   *
	   * @param {Object} handler
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function canActivate(handler, transition, next) {
	    resolveAsyncComponent(handler, function (Component) {
	      // have to check due to async-ness
	      if (transition.aborted) {
	        return;
	      }
	      // determine if this component can be activated
	      var hook = getRouteConfig(Component, 'canActivate');
	      if (!hook) {
	        next();
	      } else {
	        transition.callHook(hook, null, next, {
	          expectBoolean: true
	        });
	      }
	    });
	  }

	  /**
	   * Call deactivate hooks for existing router-views.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Function} next
	   */

	  function deactivate(view, transition, next) {
	    var component = view.childVM;
	    var hook = getRouteConfig(component, 'deactivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHooks(hook, component, next);
	    }
	  }

	  /**
	   * Activate / switch component for a router-view.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   * @param {Number} depth
	   * @param {Function} [cb]
	   */

	  function activate(view, transition, depth, cb, reuse) {
	    var handler = transition.activateQueue[depth];
	    if (!handler) {
	      saveChildView(view);
	      if (view._bound) {
	        view.setComponent(null);
	      }
	      cb && cb();
	      return;
	    }

	    var Component = view.Component = handler.component;
	    var activateHook = getRouteConfig(Component, 'activate');
	    var dataHook = getRouteConfig(Component, 'data');
	    var waitForData = getRouteConfig(Component, 'waitForData');

	    view.depth = depth;
	    view.activated = false;

	    var component = undefined;
	    var loading = !!(dataHook && !waitForData);

	    // "reuse" is a flag passed down when the parent view is
	    // either reused via keep-alive or as a child of a kept-alive view.
	    // of course we can only reuse if the current kept-alive instance
	    // is of the correct type.
	    reuse = reuse && view.childVM && view.childVM.constructor === Component;

	    if (reuse) {
	      // just reuse
	      component = view.childVM;
	      component.$loadingRouteData = loading;
	    } else {
	      saveChildView(view);

	      // unbuild current component. this step also destroys
	      // and removes all nested child views.
	      view.unbuild(true);

	      // build the new component. this will also create the
	      // direct child view of the current one. it will register
	      // itself as view.childView.
	      component = view.build({
	        _meta: {
	          $loadingRouteData: loading
	        },
	        created: function created() {
	          this._routerView = view;
	        }
	      });

	      // handle keep-alive.
	      // when a kept-alive child vm is restored, we need to
	      // add its cached child views into the router's view list,
	      // and also properly update current view's child view.
	      if (view.keepAlive) {
	        component.$loadingRouteData = loading;
	        var cachedChildView = component._keepAliveRouterView;
	        if (cachedChildView) {
	          view.childView = cachedChildView;
	          component._keepAliveRouterView = null;
	        }
	      }
	    }

	    // cleanup the component in case the transition is aborted
	    // before the component is ever inserted.
	    var cleanup = function cleanup() {
	      component.$destroy();
	    };

	    // actually insert the component and trigger transition
	    var insert = function insert() {
	      if (reuse) {
	        cb && cb();
	        return;
	      }
	      var router = transition.router;
	      if (router._rendered || router._transitionOnLoad) {
	        view.transition(component);
	      } else {
	        // no transition on first render, manual transition
	        /* istanbul ignore if */
	        if (view.setCurrent) {
	          // 0.12 compat
	          view.setCurrent(component);
	        } else {
	          // 1.0
	          view.childVM = component;
	        }
	        component.$before(view.anchor, null, false);
	      }
	      cb && cb();
	    };

	    var afterData = function afterData() {
	      // activate the child view
	      if (view.childView) {
	        activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	      }
	      insert();
	    };

	    // called after activation hook is resolved
	    var afterActivate = function afterActivate() {
	      view.activated = true;
	      if (dataHook && waitForData) {
	        // wait until data loaded to insert
	        loadData(component, transition, dataHook, afterData, cleanup);
	      } else {
	        // load data and insert at the same time
	        if (dataHook) {
	          loadData(component, transition, dataHook);
	        }
	        afterData();
	      }
	    };

	    if (activateHook) {
	      transition.callHooks(activateHook, component, afterActivate, {
	        cleanup: cleanup,
	        postActivate: true
	      });
	    } else {
	      afterActivate();
	    }
	  }

	  /**
	   * Reuse a view, just reload data if necessary.
	   *
	   * @param {Directive} view
	   * @param {Transition} transition
	   */

	  function reuse(view, transition) {
	    var component = view.childVM;
	    var dataHook = getRouteConfig(component, 'data');
	    if (dataHook) {
	      loadData(component, transition, dataHook);
	    }
	  }

	  /**
	   * Asynchronously load and apply data to component.
	   *
	   * @param {Vue} component
	   * @param {Transition} transition
	   * @param {Function} hook
	   * @param {Function} cb
	   * @param {Function} cleanup
	   */

	  function loadData(component, transition, hook, cb, cleanup) {
	    component.$loadingRouteData = true;
	    transition.callHooks(hook, component, function () {
	      component.$loadingRouteData = false;
	      component.$emit('route-data-loaded', component);
	      cb && cb();
	    }, {
	      cleanup: cleanup,
	      postActivate: true,
	      processData: function processData(data) {
	        // handle promise sugar syntax
	        var promises = [];
	        if (isPlainObject(data)) {
	          Object.keys(data).forEach(function (key) {
	            var val = data[key];
	            if (isPromise(val)) {
	              promises.push(val.then(function (resolvedVal) {
	                component.$set(key, resolvedVal);
	              }));
	            } else {
	              component.$set(key, val);
	            }
	          });
	        }
	        if (promises.length) {
	          return promises[0].constructor.all(promises);
	        }
	      }
	    });
	  }

	  /**
	   * Save the child view for a kept-alive view so that
	   * we can restore it when it is switched back to.
	   *
	   * @param {Directive} view
	   */

	  function saveChildView(view) {
	    if (view.keepAlive && view.childVM && view.childView) {
	      view.childVM._keepAliveRouterView = view.childView;
	    }
	    view.childView = null;
	  }

	  /**
	   * Check plain object.
	   *
	   * @param {*} val
	   */

	  function isPlainObject(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  /**
	   * A RouteTransition object manages the pipeline of a
	   * router-view switching process. This is also the object
	   * passed into user route hooks.
	   *
	   * @param {Router} router
	   * @param {Route} to
	   * @param {Route} from
	   */

	  var RouteTransition = (function () {
	    function RouteTransition(router, to, from) {
	      babelHelpers.classCallCheck(this, RouteTransition);

	      this.router = router;
	      this.to = to;
	      this.from = from;
	      this.next = null;
	      this.aborted = false;
	      this.done = false;
	    }

	    /**
	     * Abort current transition and return to previous location.
	     */

	    RouteTransition.prototype.abort = function abort() {
	      if (!this.aborted) {
	        this.aborted = true;
	        // if the root path throws an error during validation
	        // on initial load, it gets caught in an infinite loop.
	        var abortingOnLoad = !this.from.path && this.to.path === '/';
	        if (!abortingOnLoad) {
	          this.router.replace(this.from.path || '/');
	        }
	      }
	    };

	    /**
	     * Abort current transition and redirect to a new location.
	     *
	     * @param {String} path
	     */

	    RouteTransition.prototype.redirect = function redirect(path) {
	      if (!this.aborted) {
	        this.aborted = true;
	        if (typeof path === 'string') {
	          path = mapParams(path, this.to.params, this.to.query);
	        } else {
	          path.params = path.params || this.to.params;
	          path.query = path.query || this.to.query;
	        }
	        this.router.replace(path);
	      }
	    };

	    /**
	     * A router view transition's pipeline can be described as
	     * follows, assuming we are transitioning from an existing
	     * <router-view> chain [Component A, Component B] to a new
	     * chain [Component A, Component C]:
	     *
	     *  A    A
	     *  | => |
	     *  B    C
	     *
	     * 1. Reusablity phase:
	     *   -> canReuse(A, A)
	     *   -> canReuse(B, C)
	     *   -> determine new queues:
	     *      - deactivation: [B]
	     *      - activation: [C]
	     *
	     * 2. Validation phase:
	     *   -> canDeactivate(B)
	     *   -> canActivate(C)
	     *
	     * 3. Activation phase:
	     *   -> deactivate(B)
	     *   -> activate(C)
	     *
	     * Each of these steps can be asynchronous, and any
	     * step can potentially abort the transition.
	     *
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.start = function start(cb) {
	      var transition = this;

	      // determine the queue of views to deactivate
	      var deactivateQueue = [];
	      var view = this.router._rootView;
	      while (view) {
	        deactivateQueue.unshift(view);
	        view = view.childView;
	      }
	      var reverseDeactivateQueue = deactivateQueue.slice().reverse();

	      // determine the queue of route handlers to activate
	      var activateQueue = this.activateQueue = toArray(this.to.matched).map(function (match) {
	        return match.handler;
	      });

	      // 1. Reusability phase
	      var i = undefined,
	          reuseQueue = undefined;
	      for (i = 0; i < reverseDeactivateQueue.length; i++) {
	        if (!canReuse(reverseDeactivateQueue[i], activateQueue[i], transition)) {
	          break;
	        }
	      }
	      if (i > 0) {
	        reuseQueue = reverseDeactivateQueue.slice(0, i);
	        deactivateQueue = reverseDeactivateQueue.slice(i).reverse();
	        activateQueue = activateQueue.slice(i);
	      }

	      // 2. Validation phase
	      transition.runQueue(deactivateQueue, canDeactivate, function () {
	        transition.runQueue(activateQueue, canActivate, function () {
	          transition.runQueue(deactivateQueue, deactivate, function () {
	            // 3. Activation phase

	            // Update router current route
	            transition.router._onTransitionValidated(transition);

	            // trigger reuse for all reused views
	            reuseQueue && reuseQueue.forEach(function (view) {
	              return reuse(view, transition);
	            });

	            // the root of the chain that needs to be replaced
	            // is the top-most non-reusable view.
	            if (deactivateQueue.length) {
	              var _view = deactivateQueue[deactivateQueue.length - 1];
	              var depth = reuseQueue ? reuseQueue.length : 0;
	              activate(_view, transition, depth, cb);
	            } else {
	              cb();
	            }
	          });
	        });
	      });
	    };

	    /**
	     * Asynchronously and sequentially apply a function to a
	     * queue.
	     *
	     * @param {Array} queue
	     * @param {Function} fn
	     * @param {Function} cb
	     */

	    RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	      var transition = this;
	      step(0);
	      function step(index) {
	        if (index >= queue.length) {
	          cb();
	        } else {
	          fn(queue[index], transition, function () {
	            step(index + 1);
	          });
	        }
	      }
	    };

	    /**
	     * Call a user provided route transition hook and handle
	     * the response (e.g. if the user returns a promise).
	     *
	     * If the user neither expects an argument nor returns a
	     * promise, the hook is assumed to be synchronous.
	     *
	     * @param {Function} hook
	     * @param {*} [context]
	     * @param {Function} [cb]
	     * @param {Object} [options]
	     *                 - {Boolean} expectBoolean
	     *                 - {Boolean} postActive
	     *                 - {Function} processData
	     *                 - {Function} cleanup
	     */

	    RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	      var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	      var _ref$expectBoolean = _ref.expectBoolean;
	      var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	      var _ref$postActivate = _ref.postActivate;
	      var postActivate = _ref$postActivate === undefined ? false : _ref$postActivate;
	      var processData = _ref.processData;
	      var cleanup = _ref.cleanup;

	      var transition = this;
	      var nextCalled = false;

	      // abort the transition
	      var abort = function abort() {
	        cleanup && cleanup();
	        transition.abort();
	      };

	      // handle errors
	      var onError = function onError(err) {
	        postActivate ? next() : abort();
	        if (err && !transition.router._suppress) {
	          warn$1('Uncaught error during transition: ');
	          throw err instanceof Error ? err : new Error(err);
	        }
	      };

	      // since promise swallows errors, we have to
	      // throw it in the next tick...
	      var onPromiseError = function onPromiseError(err) {
	        try {
	          onError(err);
	        } catch (e) {
	          setTimeout(function () {
	            throw e;
	          }, 0);
	        }
	      };

	      // advance the transition to the next step
	      var next = function next() {
	        if (nextCalled) {
	          warn$1('transition.next() should be called only once.');
	          return;
	        }
	        nextCalled = true;
	        if (transition.aborted) {
	          cleanup && cleanup();
	          return;
	        }
	        cb && cb();
	      };

	      var nextWithBoolean = function nextWithBoolean(res) {
	        if (typeof res === 'boolean') {
	          res ? next() : abort();
	        } else if (isPromise(res)) {
	          res.then(function (ok) {
	            ok ? next() : abort();
	          }, onPromiseError);
	        } else if (!hook.length) {
	          next();
	        }
	      };

	      var nextWithData = function nextWithData(data) {
	        var res = undefined;
	        try {
	          res = processData(data);
	        } catch (err) {
	          return onError(err);
	        }
	        if (isPromise(res)) {
	          res.then(next, onPromiseError);
	        } else {
	          next();
	        }
	      };

	      // expose a clone of the transition object, so that each
	      // hook gets a clean copy and prevent the user from
	      // messing with the internals.
	      var exposed = {
	        to: transition.to,
	        from: transition.from,
	        abort: abort,
	        next: processData ? nextWithData : next,
	        redirect: function redirect() {
	          transition.redirect.apply(transition, arguments);
	        }
	      };

	      // actually call the hook
	      var res = undefined;
	      try {
	        res = hook.call(context, exposed);
	      } catch (err) {
	        return onError(err);
	      }

	      if (expectBoolean) {
	        // boolean hooks
	        nextWithBoolean(res);
	      } else if (isPromise(res)) {
	        // promise
	        if (processData) {
	          res.then(nextWithData, onPromiseError);
	        } else {
	          res.then(next, onPromiseError);
	        }
	      } else if (processData && isPlainOjbect(res)) {
	        // data promise sugar
	        nextWithData(res);
	      } else if (!hook.length) {
	        next();
	      }
	    };

	    /**
	     * Call a single hook or an array of async hooks in series.
	     *
	     * @param {Array} hooks
	     * @param {*} context
	     * @param {Function} cb
	     * @param {Object} [options]
	     */

	    RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	      var _this = this;

	      if (Array.isArray(hooks)) {
	        this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, next, options);
	          }
	        }, cb);
	      } else {
	        this.callHook(hooks, context, cb, options);
	      }
	    };

	    return RouteTransition;
	  })();

	  function isPlainOjbect(val) {
	    return Object.prototype.toString.call(val) === '[object Object]';
	  }

	  function toArray(val) {
	    return val ? Array.prototype.slice.call(val) : [];
	  }

	  var internalKeysRE = /^(component|subRoutes|fullPath)$/;

	  /**
	   * Route Context Object
	   *
	   * @param {String} path
	   * @param {Router} router
	   */

	  var Route = function Route(path, router) {
	    var _this = this;

	    babelHelpers.classCallCheck(this, Route);

	    var matched = router._recognizer.recognize(path);
	    if (matched) {
	      // copy all custom fields from route configs
	      [].forEach.call(matched, function (match) {
	        for (var key in match.handler) {
	          if (!internalKeysRE.test(key)) {
	            _this[key] = match.handler[key];
	          }
	        }
	      });
	      // set query and params
	      this.query = matched.queryParams;
	      this.params = [].reduce.call(matched, function (prev, cur) {
	        if (cur.params) {
	          for (var key in cur.params) {
	            prev[key] = cur.params[key];
	          }
	        }
	        return prev;
	      }, {});
	    }
	    // expose path and router
	    this.path = path;
	    // for internal use
	    this.matched = matched || router._notFoundHandler;
	    // internal reference to router
	    Object.defineProperty(this, 'router', {
	      enumerable: false,
	      value: router
	    });
	    // Important: freeze self to prevent observation
	    Object.freeze(this);
	  };

	  function applyOverride (Vue) {
	    var _Vue$util = Vue.util;
	    var extend = _Vue$util.extend;
	    var isArray = _Vue$util.isArray;
	    var defineReactive = _Vue$util.defineReactive;

	    // override Vue's init and destroy process to keep track of router instances
	    var init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      options = options || {};
	      var root = options._parent || options.parent || this;
	      var router = root.$router;
	      var route = root.$route;
	      if (router) {
	        // expose router
	        this.$router = router;
	        router._children.push(this);
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          defineReactive(this, '$route', route);
	        }
	      }
	      init.call(this, options);
	    };

	    var destroy = Vue.prototype._destroy;
	    Vue.prototype._destroy = function () {
	      if (!this._isBeingDestroyed && this.$router) {
	        this.$router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    };

	    // 1.0 only: enable route mixins
	    var strats = Vue.config.optionMergeStrategies;
	    var hooksToMergeRE = /^(data|activate|deactivate)$/;

	    if (strats) {
	      strats.route = function (parentVal, childVal) {
	        if (!childVal) return parentVal;
	        if (!parentVal) return childVal;
	        var ret = {};
	        extend(ret, parentVal);
	        for (var key in childVal) {
	          var a = ret[key];
	          var b = childVal[key];
	          // for data, activate and deactivate, we need to merge them into
	          // arrays similar to lifecycle hooks.
	          if (a && hooksToMergeRE.test(key)) {
	            ret[key] = (isArray(a) ? a : [a]).concat(b);
	          } else {
	            ret[key] = b;
	          }
	        }
	        return ret;
	      };
	    }
	  }

	  function View (Vue) {

	    var _ = Vue.util;
	    var componentDef =
	    // 0.12
	    Vue.directive('_component') ||
	    // 1.0
	    Vue.internalDirectives.component;
	    // <router-view> extends the internal component directive
	    var viewDef = _.extend({}, componentDef);

	    // with some overrides
	    _.extend(viewDef, {

	      _isRouterView: true,

	      bind: function bind() {
	        var route = this.vm.$route;
	        /* istanbul ignore if */
	        if (!route) {
	          warn$1('<router-view> can only be used inside a ' + 'router-enabled app.');
	          return;
	        }
	        // force dynamic directive so v-component doesn't
	        // attempt to build right now
	        this._isDynamicLiteral = true;
	        // finally, init by delegating to v-component
	        componentDef.bind.call(this);

	        // locate the parent view
	        var parentView = undefined;
	        var parent = this.vm;
	        while (parent) {
	          if (parent._routerView) {
	            parentView = parent._routerView;
	            break;
	          }
	          parent = parent.$parent;
	        }
	        if (parentView) {
	          // register self as a child of the parent view,
	          // instead of activating now. This is so that the
	          // child's activate hook is called after the
	          // parent's has resolved.
	          this.parentView = parentView;
	          parentView.childView = this;
	        } else {
	          // this is the root view!
	          var router = route.router;
	          router._rootView = this;
	        }

	        // handle late-rendered view
	        // two possibilities:
	        // 1. root view rendered after transition has been
	        //    validated;
	        // 2. child view rendered after parent view has been
	        //    activated.
	        var transition = route.router._currentTransition;
	        if (!parentView && transition.done || parentView && parentView.activated) {
	          var depth = parentView ? parentView.depth + 1 : 0;
	          activate(this, transition, depth);
	        }
	      },

	      unbind: function unbind() {
	        if (this.parentView) {
	          this.parentView.childView = null;
	        }
	        componentDef.unbind.call(this);
	      }
	    });

	    Vue.elementDirective('router-view', viewDef);
	  }

	  var trailingSlashRE = /\/$/;
	  var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	  var queryStringRE = /\?.*$/;

	  // install v-link, which provides navigation support for
	  // HTML5 history mode
	  function Link (Vue) {
	    var _Vue$util = Vue.util;
	    var _bind = _Vue$util.bind;
	    var isObject = _Vue$util.isObject;
	    var addClass = _Vue$util.addClass;
	    var removeClass = _Vue$util.removeClass;

	    var onPriority = Vue.directive('on').priority;
	    var LINK_UPDATE = '__vue-router-link-update__';

	    var activeId = 0;

	    Vue.directive('link-active', {
	      priority: 9999,
	      bind: function bind() {
	        var _this = this;

	        var id = String(activeId++);
	        // collect v-links contained within this element.
	        // we need do this here before the parent-child relationship
	        // gets messed up by terminal directives (if, for, components)
	        var childLinks = this.el.querySelectorAll('[v-link]');
	        for (var i = 0, l = childLinks.length; i < l; i++) {
	          var link = childLinks[i];
	          var existingId = link.getAttribute(LINK_UPDATE);
	          var value = existingId ? existingId + ',' + id : id;
	          // leave a mark on the link element which can be persisted
	          // through fragment clones.
	          link.setAttribute(LINK_UPDATE, value);
	        }
	        this.vm.$on(LINK_UPDATE, this.cb = function (link, path) {
	          if (link.activeIds.indexOf(id) > -1) {
	            link.updateClasses(path, _this.el);
	          }
	        });
	      },
	      unbind: function unbind() {
	        this.vm.$off(LINK_UPDATE, this.cb);
	      }
	    });

	    Vue.directive('link', {
	      priority: onPriority - 2,

	      bind: function bind() {
	        var vm = this.vm;
	        /* istanbul ignore if */
	        if (!vm.$route) {
	          warn$1('v-link can only be used inside a router-enabled app.');
	          return;
	        }
	        this.router = vm.$route.router;
	        // update things when the route changes
	        this.unwatch = vm.$watch('$route', _bind(this.onRouteUpdate, this));
	        // check v-link-active ids
	        var activeIds = this.el.getAttribute(LINK_UPDATE);
	        if (activeIds) {
	          this.el.removeAttribute(LINK_UPDATE);
	          this.activeIds = activeIds.split(',');
	        }
	        // no need to handle click if link expects to be opened
	        // in a new window/tab.
	        /* istanbul ignore if */
	        if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	          return;
	        }
	        // handle click
	        this.handler = _bind(this.onClick, this);
	        this.el.addEventListener('click', this.handler);
	      },

	      update: function update(target) {
	        this.target = target;
	        if (isObject(target)) {
	          this.append = target.append;
	          this.exact = target.exact;
	          this.prevActiveClass = this.activeClass;
	          this.activeClass = target.activeClass;
	        }
	        this.onRouteUpdate(this.vm.$route);
	      },

	      onClick: function onClick(e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) return;

	        var target = this.target;
	        if (target) {
	          // v-link with expression, just go
	          e.preventDefault();
	          this.router.go(target);
	        } else {
	          // no expression, delegate for an <a> inside
	          var el = e.target;
	          while (el.tagName !== 'A' && el !== this.el) {
	            el = el.parentNode;
	          }
	          if (el.tagName === 'A' && sameOrigin(el)) {
	            e.preventDefault();
	            var path = el.pathname;
	            if (this.router.history.root) {
	              path = path.replace(this.router.history.rootRE, '');
	            }
	            this.router.go({
	              path: path,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      },

	      onRouteUpdate: function onRouteUpdate(route) {
	        // router.stringifyPath is dependent on current route
	        // and needs to be called again whenver route changes.
	        var newPath = this.router.stringifyPath(this.target);
	        if (this.path !== newPath) {
	          this.path = newPath;
	          this.updateActiveMatch();
	          this.updateHref();
	        }
	        if (this.activeIds) {
	          this.vm.$emit(LINK_UPDATE, this, route.path);
	        } else {
	          this.updateClasses(route.path, this.el);
	        }
	      },

	      updateActiveMatch: function updateActiveMatch() {
	        this.activeRE = this.path && !this.exact ? new RegExp('^' + this.path.replace(/\/$/, '').replace(queryStringRE, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      },

	      updateHref: function updateHref() {
	        if (this.el.tagName !== 'A') {
	          return;
	        }
	        var path = this.path;
	        var router = this.router;
	        var isAbsolute = path.charAt(0) === '/';
	        // do not format non-hash relative paths
	        var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, this.append) : path;
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      },

	      updateClasses: function updateClasses(path, el) {
	        var activeClass = this.activeClass || this.router._linkActiveClass;
	        // clear old class
	        if (this.prevActiveClass && this.prevActiveClass !== activeClass) {
	          toggleClasses(el, this.prevActiveClass, removeClass);
	        }
	        // remove query string before matching
	        var dest = this.path.replace(queryStringRE, '');
	        path = path.replace(queryStringRE, '');
	        // add new class
	        if (this.exact) {
	          if (dest === path ||
	          // also allow additional trailing slash
	          dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        } else {
	          if (this.activeRE && this.activeRE.test(path)) {
	            toggleClasses(el, activeClass, addClass);
	          } else {
	            toggleClasses(el, activeClass, removeClass);
	          }
	        }
	      },

	      unbind: function unbind() {
	        this.el.removeEventListener('click', this.handler);
	        this.unwatch && this.unwatch();
	      }
	    });

	    function sameOrigin(link) {
	      return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	    }

	    // this function is copied from v-bind:class implementation until
	    // we properly expose it...
	    function toggleClasses(el, key, fn) {
	      key = key.trim();
	      if (key.indexOf(' ') === -1) {
	        fn(el, key);
	        return;
	      }
	      var keys = key.split(/\s+/);
	      for (var i = 0, l = keys.length; i < l; i++) {
	        fn(el, keys[i]);
	      }
	    }
	  }

	  var historyBackends = {
	    abstract: AbstractHistory,
	    hash: HashHistory,
	    html5: HTML5History
	  };

	  // late bind during install
	  var Vue = undefined;

	  /**
	   * Router constructor
	   *
	   * @param {Object} [options]
	   */

	  var Router = (function () {
	    function Router() {
	      var _this = this;

	      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      var _ref$hashbang = _ref.hashbang;
	      var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	      var _ref$abstract = _ref.abstract;
	      var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	      var _ref$history = _ref.history;
	      var history = _ref$history === undefined ? false : _ref$history;
	      var _ref$saveScrollPosition = _ref.saveScrollPosition;
	      var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	      var _ref$transitionOnLoad = _ref.transitionOnLoad;
	      var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	      var _ref$suppressTransitionError = _ref.suppressTransitionError;
	      var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	      var _ref$root = _ref.root;
	      var root = _ref$root === undefined ? null : _ref$root;
	      var _ref$linkActiveClass = _ref.linkActiveClass;
	      var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	      babelHelpers.classCallCheck(this, Router);

	      /* istanbul ignore if */
	      if (!Router.installed) {
	        throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	      }

	      // Vue instances
	      this.app = null;
	      this._children = [];

	      // route recognizer
	      this._recognizer = new RouteRecognizer();
	      this._guardRecognizer = new RouteRecognizer();

	      // state
	      this._started = false;
	      this._startCb = null;
	      this._currentRoute = {};
	      this._currentTransition = null;
	      this._previousTransition = null;
	      this._notFoundHandler = null;
	      this._notFoundRedirect = null;
	      this._beforeEachHooks = [];
	      this._afterEachHooks = [];

	      // trigger transition on initial render?
	      this._rendered = false;
	      this._transitionOnLoad = transitionOnLoad;

	      // history mode
	      this._root = root;
	      this._abstract = abstract;
	      this._hashbang = hashbang;

	      // check if HTML5 history is available
	      var hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	      this._history = history && hasPushState;
	      this._historyFallback = history && !hasPushState;

	      // create history object
	      var inBrowser = Vue.util.inBrowser;
	      this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';

	      var History = historyBackends[this.mode];
	      this.history = new History({
	        root: root,
	        hashbang: this._hashbang,
	        onChange: function onChange(path, state, anchor) {
	          _this._match(path, state, anchor);
	        }
	      });

	      // other options
	      this._saveScrollPosition = saveScrollPosition;
	      this._linkActiveClass = linkActiveClass;
	      this._suppress = suppressTransitionError;
	    }

	    /**
	     * Allow directly passing components to a route
	     * definition.
	     *
	     * @param {String} path
	     * @param {Object} handler
	     */

	    // API ===================================================

	    /**
	    * Register a map of top-level paths.
	    *
	    * @param {Object} map
	    */

	    Router.prototype.map = function map(_map) {
	      for (var route in _map) {
	        this.on(route, _map[route]);
	      }
	      return this;
	    };

	    /**
	     * Register a single root-level path
	     *
	     * @param {String} rootPath
	     * @param {Object} handler
	     *                 - {String} component
	     *                 - {Object} [subRoutes]
	     *                 - {Boolean} [forceRefresh]
	     *                 - {Function} [before]
	     *                 - {Function} [after]
	     */

	    Router.prototype.on = function on(rootPath, handler) {
	      if (rootPath === '*') {
	        this._notFound(handler);
	      } else {
	        this._addRoute(rootPath, handler, []);
	      }
	      return this;
	    };

	    /**
	     * Set redirects.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.redirect = function redirect(map) {
	      for (var path in map) {
	        this._addRedirect(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set aliases.
	     *
	     * @param {Object} map
	     */

	    Router.prototype.alias = function alias(map) {
	      for (var path in map) {
	        this._addAlias(path, map[path]);
	      }
	      return this;
	    };

	    /**
	     * Set global before hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.beforeEach = function beforeEach(fn) {
	      this._beforeEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Set global after hook.
	     *
	     * @param {Function} fn
	     */

	    Router.prototype.afterEach = function afterEach(fn) {
	      this._afterEachHooks.push(fn);
	      return this;
	    };

	    /**
	     * Navigate to a given path.
	     * The path can be an object describing a named path in
	     * the format of { name: '...', params: {}, query: {}}
	     * The path is assumed to be already decoded, and will
	     * be resolved against root (if provided)
	     *
	     * @param {String|Object} path
	     * @param {Boolean} [replace]
	     */

	    Router.prototype.go = function go(path) {
	      var replace = false;
	      var append = false;
	      if (Vue.util.isObject(path)) {
	        replace = path.replace;
	        append = path.append;
	      }
	      path = this.stringifyPath(path);
	      if (path) {
	        this.history.go(path, replace, append);
	      }
	    };

	    /**
	     * Short hand for replacing current path
	     *
	     * @param {String} path
	     */

	    Router.prototype.replace = function replace(path) {
	      if (typeof path === 'string') {
	        path = { path: path };
	      }
	      path.replace = true;
	      this.go(path);
	    };

	    /**
	     * Start the router.
	     *
	     * @param {VueConstructor} App
	     * @param {String|Element} container
	     * @param {Function} [cb]
	     */

	    Router.prototype.start = function start(App, container, cb) {
	      /* istanbul ignore if */
	      if (this._started) {
	        warn$1('already started.');
	        return;
	      }
	      this._started = true;
	      this._startCb = cb;
	      if (!this.app) {
	        /* istanbul ignore if */
	        if (!App || !container) {
	          throw new Error('Must start vue-router with a component and a ' + 'root container.');
	        }
	        /* istanbul ignore if */
	        if (App instanceof Vue) {
	          throw new Error('Must start vue-router with a component, not a ' + 'Vue instance.');
	        }
	        this._appContainer = container;
	        var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	        // give it a name for better debugging
	        Ctor.options.name = Ctor.options.name || 'RouterApp';
	      }

	      // handle history fallback in browsers that do not
	      // support HTML5 history API
	      if (this._historyFallback) {
	        var _location = window.location;
	        var _history = new HTML5History({ root: this._root });
	        var path = _history.root ? _location.pathname.replace(_history.rootRE, '') : _location.pathname;
	        if (path && path !== '/') {
	          _location.assign((_history.root || '') + '/' + this.history.formatPath(path) + _location.search);
	          return;
	        }
	      }

	      this.history.start();
	    };

	    /**
	     * Stop listening to route changes.
	     */

	    Router.prototype.stop = function stop() {
	      this.history.stop();
	      this._started = false;
	    };

	    /**
	     * Normalize named route object / string paths into
	     * a string.
	     *
	     * @param {Object|String|Number} path
	     * @return {String}
	     */

	    Router.prototype.stringifyPath = function stringifyPath(path) {
	      var generatedPath = '';
	      if (path && typeof path === 'object') {
	        if (path.name) {
	          var extend = Vue.util.extend;
	          var currentParams = this._currentTransition && this._currentTransition.to.params;
	          var targetParams = path.params || {};
	          var params = currentParams ? extend(extend({}, currentParams), targetParams) : targetParams;
	          generatedPath = encodeURI(this._recognizer.generate(path.name, params));
	        } else if (path.path) {
	          generatedPath = encodeURI(path.path);
	        }
	        if (path.query) {
	          // note: the generated query string is pre-URL-encoded by the recognizer
	          var query = this._recognizer.generateQueryString(path.query);
	          if (generatedPath.indexOf('?') > -1) {
	            generatedPath += '&' + query.slice(1);
	          } else {
	            generatedPath += query;
	          }
	        }
	      } else {
	        generatedPath = encodeURI(path ? path + '' : '');
	      }
	      return generatedPath;
	    };

	    // Internal methods ======================================

	    /**
	    * Add a route containing a list of segments to the internal
	    * route recognizer. Will be called recursively to add all
	    * possible sub-routes.
	    *
	    * @param {String} path
	    * @param {Object} handler
	    * @param {Array} segments
	    */

	    Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	      guardComponent(path, handler);
	      handler.path = path;
	      handler.fullPath = (segments.reduce(function (path, segment) {
	        return path + segment.path;
	      }, '') + path).replace('//', '/');
	      segments.push({
	        path: path,
	        handler: handler
	      });
	      this._recognizer.add(segments, {
	        as: handler.name
	      });
	      // add sub routes
	      if (handler.subRoutes) {
	        for (var subPath in handler.subRoutes) {
	          // recursively walk all sub routes
	          this._addRoute(subPath, handler.subRoutes[subPath],
	          // pass a copy in recursion to avoid mutating
	          // across branches
	          segments.slice());
	        }
	      }
	    };

	    /**
	     * Set the notFound route handler.
	     *
	     * @param {Object} handler
	     */

	    Router.prototype._notFound = function _notFound(handler) {
	      guardComponent('*', handler);
	      this._notFoundHandler = [{ handler: handler }];
	    };

	    /**
	     * Add a redirect record.
	     *
	     * @param {String} path
	     * @param {String} redirectPath
	     */

	    Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	      if (path === '*') {
	        this._notFoundRedirect = redirectPath;
	      } else {
	        this._addGuard(path, redirectPath, this.replace);
	      }
	    };

	    /**
	     * Add an alias record.
	     *
	     * @param {String} path
	     * @param {String} aliasPath
	     */

	    Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	      this._addGuard(path, aliasPath, this._match);
	    };

	    /**
	     * Add a path guard.
	     *
	     * @param {String} path
	     * @param {String} mappedPath
	     * @param {Function} handler
	     */

	    Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	      var _this2 = this;

	      this._guardRecognizer.add([{
	        path: path,
	        handler: function handler(match, query) {
	          var realPath = mapParams(mappedPath, match.params, query);
	          _handler.call(_this2, realPath);
	        }
	      }]);
	    };

	    /**
	     * Check if a path matches any redirect records.
	     *
	     * @param {String} path
	     * @return {Boolean} - if true, will skip normal match.
	     */

	    Router.prototype._checkGuard = function _checkGuard(path) {
	      var matched = this._guardRecognizer.recognize(path, true);
	      if (matched) {
	        matched[0].handler(matched[0], matched.queryParams);
	        return true;
	      } else if (this._notFoundRedirect) {
	        matched = this._recognizer.recognize(path);
	        if (!matched) {
	          this.replace(this._notFoundRedirect);
	          return true;
	        }
	      }
	    };

	    /**
	     * Match a URL path and set the route context on vm,
	     * triggering view updates.
	     *
	     * @param {String} path
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._match = function _match(path, state, anchor) {
	      var _this3 = this;

	      if (this._checkGuard(path)) {
	        return;
	      }

	      var currentRoute = this._currentRoute;
	      var currentTransition = this._currentTransition;

	      if (currentTransition) {
	        if (currentTransition.to.path === path) {
	          // do nothing if we have an active transition going to the same path
	          return;
	        } else if (currentRoute.path === path) {
	          // We are going to the same path, but we also have an ongoing but
	          // not-yet-validated transition. Abort that transition and reset to
	          // prev transition.
	          currentTransition.aborted = true;
	          this._currentTransition = this._prevTransition;
	          return;
	        } else {
	          // going to a totally different path. abort ongoing transition.
	          currentTransition.aborted = true;
	        }
	      }

	      // construct new route and transition context
	      var route = new Route(path, this);
	      var transition = new RouteTransition(this, route, currentRoute);

	      // current transition is updated right now.
	      // however, current route will only be updated after the transition has
	      // been validated.
	      this._prevTransition = currentTransition;
	      this._currentTransition = transition;

	      if (!this.app) {
	        (function () {
	          // initial render
	          var router = _this3;
	          _this3.app = new _this3._appConstructor({
	            el: _this3._appContainer,
	            created: function created() {
	              this.$router = router;
	            },
	            _meta: {
	              $route: route
	            }
	          });
	        })();
	      }

	      // check global before hook
	      var beforeHooks = this._beforeEachHooks;
	      var startTransition = function startTransition() {
	        transition.start(function () {
	          _this3._postTransition(route, state, anchor);
	        });
	      };

	      if (beforeHooks.length) {
	        transition.runQueue(beforeHooks, function (hook, _, next) {
	          if (transition === _this3._currentTransition) {
	            transition.callHook(hook, null, next, {
	              expectBoolean: true
	            });
	          }
	        }, startTransition);
	      } else {
	        startTransition();
	      }

	      if (!this._rendered && this._startCb) {
	        this._startCb.call(null);
	      }

	      // HACK:
	      // set rendered to true after the transition start, so
	      // that components that are acitvated synchronously know
	      // whether it is the initial render.
	      this._rendered = true;
	    };

	    /**
	     * Set current to the new transition.
	     * This is called by the transition object when the
	     * validation of a route has succeeded.
	     *
	     * @param {Transition} transition
	     */

	    Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	      // set current route
	      var route = this._currentRoute = transition.to;
	      // update route context for all children
	      if (this.app.$route !== route) {
	        this.app.$route = route;
	        this._children.forEach(function (child) {
	          child.$route = route;
	        });
	      }
	      // call global after hook
	      if (this._afterEachHooks.length) {
	        this._afterEachHooks.forEach(function (hook) {
	          return hook.call(null, {
	            to: transition.to,
	            from: transition.from
	          });
	        });
	      }
	      this._currentTransition.done = true;
	    };

	    /**
	     * Handle stuff after the transition.
	     *
	     * @param {Route} route
	     * @param {Object} [state]
	     * @param {String} [anchor]
	     */

	    Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	      // handle scroll positions
	      // saved scroll positions take priority
	      // then we check if the path has an anchor
	      var pos = state && state.pos;
	      if (pos && this._saveScrollPosition) {
	        Vue.nextTick(function () {
	          window.scrollTo(pos.x, pos.y);
	        });
	      } else if (anchor) {
	        Vue.nextTick(function () {
	          var el = document.getElementById(anchor.slice(1));
	          if (el) {
	            window.scrollTo(window.scrollX, el.offsetTop);
	          }
	        });
	      }
	    };

	    return Router;
	  })();

	  function guardComponent(path, handler) {
	    var comp = handler.component;
	    if (Vue.util.isPlainObject(comp)) {
	      comp = handler.component = Vue.extend(comp);
	    }
	    /* istanbul ignore if */
	    if (typeof comp !== 'function') {
	      handler.component = null;
	      warn$1('invalid component for route "' + path + '".');
	    }
	  }

	  /* Installation */

	  Router.installed = false;

	  /**
	   * Installation interface.
	   * Install the necessary directives.
	   */

	  Router.install = function (externalVue) {
	    /* istanbul ignore if */
	    if (Router.installed) {
	      warn$1('already installed.');
	      return;
	    }
	    Vue = externalVue;
	    applyOverride(Vue);
	    View(Vue);
	    Link(Vue);
	    exports$1.Vue = Vue;
	    Router.installed = true;
	  };

	  // auto install
	  /* istanbul ignore if */
	  if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(Router);
	  }

	  return Router;

	}));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(5)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\app.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(13)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-7a9f9c66/app.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	// 	<router-view></router-view>
	// </template>
	//
	// <script>
	module.exports = {
		ready: function ready() {
			console.log('App is awaiting your command!');
		},
		data: function data() {
			var modules = __webpack_require__(6);
			return {
				user: {
					account: modules.accounts,
					innopoints: modules.innopoints
				},
				query: null
			};
		}
	};
	// </script>

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(7);
	var api_url = config.server.api_url;

	var testAccounts = __webpack_require__(8);

	console.log(testAccounts);

	var modules = {
		accounts: {
			roles: ['ghost', 'student', 'moderator'],
			have: function have(role) {
				return !!(this.roles.indexOf(role.toLowerCase()) > -1);
			},

			//data

			id: null,
			username: null,
			role: null,
			firstName: null,
			lastName: null,
			patronymic: null,
			studyGroup: null,
			tgId: null,

			get token() {
				return this.storage.get(config.token_name);
			},

			set token(value) {
				return this.storage.set(config.token_name, value);
			},

			get fullName() {
				var ln = !!this.lastName ? this.lastName + ' ' : '';
				var fn = !!this.firstName ? this.firstName : '';
				var pn = !!this.patronymic ? ' ' + this.patronymic : '';
				return fn + ln + pn;
			},

			get loggedIn() {
				return this.storage.get(config.token_name) ? true : false;
			},

			get isGhost() {
				return !!this.is('ghost');
			},

			get isStudent() {
				return !!this.is('student');
			},

			get isModerator() {
				return !!this.is('moderator');
			},

			is: function is(ofType) {
				return !!this.role && !!modules.accounts.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
			},

			clear: function clear() {
				this.id = null;
				this.role = null;
				this.firstName = null;
				this.lastName = null;
				this.patronymic = null;
				this.studyGroup = null;
				this.token = null;
				this.storage.clear();
			},

			set: function set(data) {
				if (data.id) this.id = data.id;
				if (data.username) this.username = data.username;
				if (data.role) this.role = data.role;
				if (data.firstName) this.firstName = data.firstName;
				if (data.lastName) this.lastName = data.lastName;
				if (data.patronymic) this.patronymic = data.patronymic;
				if (data.studyGroup) this.studyGroup = data.studyGroup;
				if (data.token) this.token = data.token;
			},

			update: function update(successCallback, errorCallback) {
				var that = this;
				this.get(function (result) {
					that.set(result);
					if (successCallback) successCallback(result);
				}, errorCallback);
			},

			storage: __webpack_require__(11),

			preferences: {
				//TODO
				fixHeader: true,

				save: function save(successCallback, errorCallback) {
					var that = this;
					var type = "PUT",
					    url = this.url + modules.accounts.token + '/updatePreferences',
					    data = {
						preferences: that
					};

					ajax(type, url, data, successCallback, errorCallback);
				},

				get: function get(successCallback, errorCallback) {
					var type = "GET",
					    url = this.url + modules.accounts.token + '/getPreferences',
					    data = '';

					ajax(type, url, data, successCallback, errorCallback);
				}
			},

			//

			//api

			version: 1,
			name: "accounts",
			get url() {
				return api_url + "v" + this.version + "/" + this.name + "/";
			},

			create: function create(password, email, successCallback, errorCallback) {
				var type = "POST",
				    url = this.url,
				    data = {
					username: this.username,
					password: password,
					email: email,
					firstName: this.firstName,
					lastName: this.lastName,
					studyGroup: this.studyGroup
				};

				ajax(type, url, data, successCallback, errorCallback);
			},

			authorize: function authorize(password, successCallback, errorCallback) {
				var type = "POST",
				    url = this.url + "auth",
				    data = {
					username: this.username,
					password: password
				};

				ajax(type, url, data, successCallback, errorCallback);
			},

			get: function get(successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token,
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			///MODER METHODS
			//
			list: function list(successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token + "/listAccounts",
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			updateRole: function updateRole(account_id, new_role, successCallback, errorCallback) {
				var type = "PUT",
				    url = this.url + this.token + "/updateRole",
				    data = { accountId: account_id, newRole: new_role };

				ajax(type, url, data, successCallback, errorCallback);
			},
			//
			///

			exists: function exists(successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token + "/exists",
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			getBio: function getBio(args, successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token + "/getBio?" + (args.id ? "id=" + args.id : "username=" + args.username),
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			}
		},
		innopoints: {
			roles: ['student', 'admin'],
			have: function have(role) {
				return !!(this.roles.indexOf(role) > -1);
			},
			data: {
				id: null,
				amount: null,
				role: null,

				// cart : [],

				get isStudent() {
					return !!this.is('student');
				},

				get isAdmin() {
					return !!this.is('admin');
				},

				is: function is(ofType) {
					return !!this.role && !!modules.innopoints.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
				},

				update: function update(_successCallback, errorCallback) {
					var that = this;
					modules.innopoints.api.user.get({
						successCallback: function successCallback(result) {
							that.id = result.id;
							that.amount = result.points_amount || 0;
							that.role = result.type;

							if (_successCallback) _successCallback(result);
						},
						errorCallback: errorCallback
					});
				}
			},

			api: {
				version: 1,
				name: "points",
				get url() {
					return api_url + "v" + this.version + "/" + this.name + "/";
				},

				getActivities: function getActivities(args) {
					var type = "GET",
					    url = this.url + "activities" + (args.cat_id ? '/' + args.cat_id : ''),
					    data = { skip: args.skip_count || null, limit: args.limit_count || null };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				getCategories: function getCategories(args) {
					var type = "GET",
					    url = this.url + "categories",
					    data = { skip: args.skip_count || null, limit: args.limit_count || null };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				shop: {
					get url() {
						return modules.innopoints.api.url + "shop/";
					},

					getItems: function getItems(args) {
						var type = "GET",
						    url = this.url + "items",
						    data = {
							skip: args.skip_count || null,
							limit: args.limit_count || null,
							fields: args.fields || 'title',
							order: args.order || 'ASC',
							category_id: args.category_id || null
						};

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					getItem: function getItem(id, successCallback, errorCallback) {
						var type = "GET",
						    url = this.url + "items/" + id,
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					order: {
						get url() {
							return modules.innopoints.api.user.url;
						},

						create: function create(args) {
							var type = "POST",
							    url = this.url + modules.accounts.token + '/orders',
							    data = '';

							ajax(type, url, data, args.successCallback, args.errorCallback);
						},

						update: function update(args) {
							var type = "POST",
							    url = this.url + modules.accounts.token + '/orders/' + args.id + '/contributors/' + args.action,
							    data = '';

							ajax(type, url, data, args.successCallback, args.errorCallback);
						},

						delete: function _delete(args) {
							var type = "DELETE",
							    url = this.url + modules.accounts.token + '/orders/' + args.id,
							    data = '';

							ajax(type, url, data, args.successCallback, args.errorCallback);
						}
					}
				},

				user: {
					get isAdmin() {
						return modules.innopoints.data.isAdmin;
					},
					get url() {
						return modules.innopoints.api.url + (this.isAdmin ? "admin/" : "accounts/");
					},

					get: function get(args) {
						var type = "GET",
						    url = modules.innopoints.api.url + 'accounts/' + modules.accounts.token,
						    data = '';

						if (this.isAdmin) if (args.id) url += "/accounts/" + args.id;

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					create: function create(successCallback, errorCallback) {
						var type = "POST",
						    url = this.url + modules.accounts.token,
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					getFile: function getFile(appl_id, file_id, successCallback, errorCallback) {
						var type = "GET",
						    url = this.url + modules.accounts.token + "/applications/" + appl_id + "/files/" + file_id,
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					getAccounts: function getAccounts(args) {
						var type = "GET",
						    url = this.url + modules.accounts.token,
						    data = { skip: args.skip_count || null, limit: args.limit_count || null };

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					updateAccount: function updateAccount(args) {
						var type = "PUT",
						    url = this.url + modules.accounts.token + "/accounts/" + args.id,
						    data = { points_amount: args.points };

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					application: {
						get url() {
							return modules.innopoints.api.user.url;
						},

						create: function create(application, successCallback, errorCallback) {
							var type = "POST",
							    url = this.url + modules.accounts.token + "/applications",
							    data = { application: application };

							ajax(type, url, data, successCallback, errorCallback);
						},

						update: function update(appl_id, new_params, successCallback, errorCallback) {
							var type = "PUT",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id,
							    data = new_params;

							ajax(type, url, data, successCallback, errorCallback);
						},

						send: function send(appl_id, successCallback, errorCallback) {
							var type = "PUT",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id + '/approve',
							    data = '';

							ajax(type, url, data, successCallback, errorCallback);
						},

						get: function get(appl_id, successCallback, errorCallback) {
							var type = "GET",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id,
							    data = '';

							ajax(type, url, data, successCallback, errorCallback);
						},

						delete: function _delete(appl_id, successCallback, errorCallback) {
							var type = "DELETE",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id,
							    data = '';

							ajax(type, url, data, successCallback, errorCallback);
						},

						approve: function approve(appl_id, successCallback, errorCallback) {
							var type = "PUT",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id + "/approve",
							    data = '';

							ajax(type, url, data, successCallback, errorCallback);
						},

						reject: function reject(appl_id, successCallback, errorCallback) {
							var type = "PUT",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id + "/reject",
							    data = '';

							ajax(type, url, data, successCallback, errorCallback);
						},

						dismiss: function dismiss(appl_id, successCallback, errorCallback) {
							var type = "PUT",
							    url = this.url + modules.accounts.token + "/applications/" + appl_id + "/to_rework",
							    data = '';

							ajax(type, url, data, successCallback, errorCallback);
						}
					},

					applications: {
						get url() {
							return modules.innopoints.api.user.url;
						},

						get: function get(args) {
							if (args.status == 'all') args.status = null;

							var type = "GET",
							    url = this.url + modules.accounts.token + "/applications" + (args.status ? '/' + args.status : ''),
							    data = { skip: args.skip_count, limit: args.limit_count };

							ajax(type, url, data, args.successCallback, args.errorCallback);
						}
					}
				}
			}
		}
	};

	function ajax(type, url, data, successCallback, errorCallback) {
		var xhr = new XMLHttpRequest();
		xhr.open(type, url, true);
		xhr.onload = function () {
			if (xhr.response.result) {
				console.log(xhr.response.status);

				if (successCallback) successCallback(xhr.response.result);
			} else if (xhr.response.error) {
				console.log(xhr.response.error);

				if (errorCallback) errorCallback(xhr.response.error);
			}
		};
		xhr.dataType = "json";
		xhr.contentType = 'json';
		xhr.responseType = 'json';
		if (!(url.indexOf("getBio") > -1)) xhr.setRequestHeader('Content-Type', 'application/json');

		xhr.send(JSON.stringify(data));
	}

	module.exports = modules;
	module.exports.token = modules.accounts.token;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		server: {
			ip: "uis.university.innopolis.ru",
			port: 8770,
			get api_url() {
				return "http://" + this.ip + ":" + (this.port || 21) + "/api/";
			}
		},
		token_name: "usertoken"
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  "accounts": __webpack_require__(9),
	  "innopoints": __webpack_require__(12)
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var config = __webpack_require__(10);
	var api_url = __webpack_require__(7).server.api_url;

	module.exports = {
		name: "accounts",
		roles: ['ghost', 'student', 'moderator'],

		have: function have(role) {
			return !!this.roles.includes(role.toLowerCase());
		},

		data: {
			id: null,
			username: null,
			role: null,
			firstName: null,
			lastName: null,
			patronymic: null,
			studyGroup: null,
			tgId: null,

			get token() {
				return this.storage.get(config.token_name);
			},

			set token(value) {
				return this.storage.set(config.token_name, value);
			},

			get fullName() {
				var ln = !!this.lastName ? this.lastName + ' ' : '';
				var fn = !!this.firstName ? this.firstName : '';
				var pn = !!this.patronymic ? ' ' + this.patronymic : '';
				return fn + ln + pn;
			},

			get loggedIn() {
				return this.storage.get(config.token_name) ? true : false;
			},

			get isGhost() {
				return !!this.is('ghost');
			},

			get isStudent() {
				return !!this.is('student');
			},

			get isModerator() {
				return !!this.is('moderator');
			},

			is: function is(ofType) {
				return !!this.role && !!modules.accounts.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
			},

			clear: function clear() {
				this.id = null;
				this.role = null;
				this.firstName = null;
				this.lastName = null;
				this.patronymic = null;
				this.studyGroup = null;
				this.token = null;
				this.storage.clear();
			},

			set: function set(data) {
				if (data.id) this.id = data.id;
				if (data.username) this.username = data.username;
				if (data.role) this.role = data.role;
				if (data.firstName) this.firstName = data.firstName;
				if (data.lastName) this.lastName = data.lastName;
				if (data.patronymic) this.patronymic = data.patronymic;
				if (data.studyGroup) this.studyGroup = data.studyGroup;
				if (data.token) this.token = data.token;
			},

			update: function update(successCallback, errorCallback) {
				var that = this;
				this.get(function (result) {
					that.set(result);
					if (successCallback) successCallback(result);
				}, errorCallback);
			},

			storage: __webpack_require__(11),

			preferences: {
				//TODO
				fixHeader: true,

				save: function save(successCallback, errorCallback) {
					var that = this;
					var type = "PUT",
					    url = this.url + modules.accounts.token + '/updatePreferences',
					    data = {
						preferences: that
					};

					ajax(type, url, data, successCallback, errorCallback);
				},

				get: function get(successCallback, errorCallback) {
					var type = "GET",
					    url = this.url + modules.accounts.token + '/getPreferences',
					    data = '';

					ajax(type, url, data, successCallback, errorCallback);
				}
			}
		},
		//

		api: {
			version: 1,
			name: "accounts",
			get url() {
				return api_url + "v" + this.version + "/" + this.name + "/";
			},

			create: function create(password, email, successCallback, errorCallback) {
				var type = "POST",
				    url = this.url,
				    data = {
					username: this.username,
					password: password,
					email: email,
					firstName: this.firstName,
					lastName: this.lastName,
					studyGroup: this.studyGroup
				};

				ajax(type, url, data, successCallback, errorCallback);
			},

			authorize: function authorize(password, successCallback, errorCallback) {
				var type = "POST",
				    url = this.url + "auth",
				    data = {
					username: this.username,
					password: password
				};

				ajax(type, url, data, successCallback, errorCallback);
			},

			get: function get(successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token,
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			///MODER METHODS
			//
			list: function list(successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token + "/listAccounts",
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			updateRole: function updateRole(account_id, new_role, successCallback, errorCallback) {
				var type = "PUT",
				    url = this.url + this.token + "/updateRole",
				    data = { accountId: account_id, newRole: new_role };

				ajax(type, url, data, successCallback, errorCallback);
			},
			//
			///

			exists: function exists(successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token + "/exists",
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			},

			getBio: function getBio(args, successCallback, errorCallback) {
				var type = "GET",
				    url = this.url + this.token + "/getBio?" + (args.id ? "id=" + args.id : "username=" + args.username),
				    data = '';

				ajax(type, url, data, successCallback, errorCallback);
			}
		}
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
		token_name: 'usertoken'
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
		get: function get(key) {
			return localStorage.getItem(key);
		},
		set: function set(key, value) {
			if (value) localStorage.setItem(key, value);
			return localStorage.getItem(key);
		},
		clear: function clear() {
			localStorage.clear();
		}
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var api_url = __webpack_require__(7).server.api_url;
	var accounts = { get token() {
			return localStorage.getItem('usertoken');
		} };
	module.exports = {
		name: "innopoints",
		roles: ['student', 'admin'],
		have: function have(role) {
			return !!(this.roles.indexOf(role) > -1);
		},
		data: {
			id: null,
			amount: null,
			role: null,

			get isStudent() {
				return !!this.is('student');
			},

			get isAdmin() {
				return !!this.is('admin');
			},

			is: function is(ofType) {
				return !!this.role && !!innopoints.have(ofType) && !!(this.role.toLowerCase() === ofType.toLowerCase());
			},

			update: function update(_successCallback, errorCallback) {
				var that = this;
				innopoints.api.user.get({
					successCallback: function successCallback(result) {
						that.id = result.id;
						that.amount = result.points_amount || 0;
						that.role = result.type;

						if (_successCallback) _successCallback(result);
					},
					errorCallback: errorCallback
				});
			}
		},

		api: {
			version: 1,
			name: "points",
			get url() {
				return api_url + "v" + this.version + "/" + this.name + "/";
			},

			getActivities: function getActivities(args) {
				var type = "GET",
				    url = this.url + "activities" + (args.cat_id ? '/' + args.cat_id : ''),
				    data = { skip: args.skip_count || null, limit: args.limit_count || null };

				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			getCategories: function getCategories(args) {
				var type = "GET",
				    url = this.url + "categories",
				    data = { skip: args.skip_count || null, limit: args.limit_count || null };

				ajax(type, url, data, args.successCallback, args.errorCallback);
			},

			shop: {
				get url() {
					return innopoints.api.url + "shop/";
				},

				getItems: function getItems(args) {
					var type = "GET",
					    url = this.url + "items",
					    data = {
						skip: args.skip_count || null,
						limit: args.limit_count || null,
						fields: args.fields || 'title',
						order: args.order || 'ASC',
						category_id: args.category_id || null
					};

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				getItem: function getItem(id, successCallback, errorCallback) {
					var type = "GET",
					    url = this.url + "items/" + id,
					    data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				order: {
					get url() {
						return innopoints.api.user.url;
					},

					create: function create(args) {
						var type = "POST",
						    url = this.url + accounts.token + '/orders',
						    data = '';

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					update: function update(args) {
						var type = "POST",
						    url = this.url + accounts.token + '/orders/' + args.id + '/contributors/' + args.action,
						    data = '';

						ajax(type, url, data, args.successCallback, args.errorCallback);
					},

					delete: function _delete(args) {
						var type = "DELETE",
						    url = this.url + accounts.token + '/orders/' + args.id,
						    data = '';

						ajax(type, url, data, args.successCallback, args.errorCallback);
					}
				}
			},

			user: {
				get isAdmin() {
					return innopoints.data.isAdmin;
				},
				get url() {
					return innopoints.api.url + (this.isAdmin ? "admin/" : "accounts/");
				},

				get: function get(args) {
					var type = "GET",
					    url = innopoints.api.url + 'accounts/' + accounts.token,
					    data = '';

					if (this.isAdmin) if (args.id) url += "/accounts/" + args.id;

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				create: function create(successCallback, errorCallback) {
					var type = "POST",
					    url = this.url + accounts.token,
					    data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				getFile: function getFile(appl_id, file_id, successCallback, errorCallback) {
					var type = "GET",
					    url = this.url + accounts.token + "/applications/" + appl_id + "/files/" + file_id,
					    data = '';

					ajax(type, url, data, successCallback, errorCallback);
				},

				getAccounts: function getAccounts(args) {
					var type = "GET",
					    url = this.url + accounts.token,
					    data = { skip: args.skip_count || null, limit: args.limit_count || null };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				updateAccount: function updateAccount(args) {
					var type = "PUT",
					    url = this.url + accounts.token + "/accounts/" + args.id,
					    data = { points_amount: args.points };

					ajax(type, url, data, args.successCallback, args.errorCallback);
				},

				application: {
					get url() {
						return innopoints.api.user.url;
					},

					create: function create(application, successCallback, errorCallback) {
						var type = "POST",
						    url = this.url + accounts.token + "/applications",
						    data = { application: application };

						ajax(type, url, data, successCallback, errorCallback);
					},

					update: function update(appl_id, new_params, successCallback, errorCallback) {
						var type = "PUT",
						    url = this.url + accounts.token + "/applications/" + appl_id,
						    data = new_params;

						ajax(type, url, data, successCallback, errorCallback);
					},

					send: function send(appl_id, successCallback, errorCallback) {
						var type = "PUT",
						    url = this.url + accounts.token + "/applications/" + appl_id + '/approve',
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					get: function get(appl_id, successCallback, errorCallback) {
						var type = "GET",
						    url = this.url + accounts.token + "/applications/" + appl_id,
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					delete: function _delete(appl_id, successCallback, errorCallback) {
						var type = "DELETE",
						    url = this.url + accounts.token + "/applications/" + appl_id,
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					approve: function approve(appl_id, successCallback, errorCallback) {
						var type = "PUT",
						    url = this.url + accounts.token + "/applications/" + appl_id + "/approve",
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					reject: function reject(appl_id, successCallback, errorCallback) {
						var type = "PUT",
						    url = this.url + accounts.token + "/applications/" + appl_id + "/reject",
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					},

					dismiss: function dismiss(appl_id, successCallback, errorCallback) {
						var type = "PUT",
						    url = this.url + accounts.token + "/applications/" + appl_id + "/to_rework",
						    data = '';

						ajax(type, url, data, successCallback, errorCallback);
					}
				},

				applications: {
					get url() {
						return innopoints.api.user.url;
					},

					get: function get(args) {
						if (args.status == 'all') args.status = null;

						var type = "GET",
						    url = this.url + accounts.token + "/applications" + (args.status ? '/' + args.status : ''),
						    data = { skip: args.skip_count, limit: args.limit_count };

						ajax(type, url, data, args.successCallback, args.errorCallback);
					}
				}
			}
		}
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "\n<router-view></router-view>\n";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var user = __webpack_require__(6).accounts;

	var adminZone = true,
	    authorizedZone = true,
	    loginPage = true;

	var router_view = { template: '<router-view></router-view>' };

	module.exports = function (router) {
		router.map({
			'/login': {
				component: __webpack_require__(15),
				loginPage: loginPage
			},
			'/': {
				component: __webpack_require__(18),
				subRoutes: {
					'/': {
						component: __webpack_require__(24),
						subRoutes: {
							'/': {
								component: __webpack_require__(30)
							}
						}
					},
					'/profile': {
						component: __webpack_require__(33),
						subRoutes: {
							'/:username': {
								name: 'profile',
								component: __webpack_require__(36)
							}
						}
					},
					'/accounts': {
						component: __webpack_require__(39),
						subRoutes: {
							'/': {
								component: __webpack_require__(42),
								name: 'accounts'
							}
						}
					},
					'/innopoints': {
						component: __webpack_require__(49),
						subRoutes: {
							'/:username': {
								component: router_view,
								subRoutes: {
									'/': {
										component: { template: '' },
										name: 'innopoints'
									},
									'/applications': {
										component: router_view,
										subRoutes: {
											'/:filter': {
												component: __webpack_require__(52),
												name: 'applications'
											}
										}
									},
									'/apply': {
										component: __webpack_require__(58),
										name: 'apply'
									}
								}
							}
						}
					},
					'/store': {
						component: __webpack_require__(63),
						subRoutes: {
							'/': {
								component: __webpack_require__(66),
								name: 'store'
							},
							'/item/:item': {
								component: __webpack_require__(68),
								name: 'item'
							}
						}
					}
				},
				authorizedZone: authorizedZone
			}
		});

		router.beforeEach(function (transition) {
			if (!user.loggedIn) {
				if (transition.to.authorizedZone) transition.redirect('/login');else transition.next();
			} else {
				if (transition.to.loginPage) transition.redirect('/');else transition.next();
			}
		}).redirect({
			'*': '/',
			'/innopoints/:username/': '/innopoints/:username/applications/'
		});

		return router;
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(16)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\login.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(17)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-5f825324/login.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	// <style type="text/css" media="screen">
	// 	main[wrapper] * {
	// 		box-sizing: border-box;
	// 		margin: 0;
	// 		padding: 0;
	// 	}
	//
	// 	main[wrapper][login] [container] {
	// 		font-family: 'Roboto', sans-serif;
	// 		color: white;
	// 		font-weight: 100 !important;
	// 	}
	//
	// 	main[wrapper][login] [container] ::-webkit-input-placeholder,
	// 	main[wrapper][login] [container] :-moz-placeholder,
	// 	main[wrapper][login] [container] :-ms-input-placeholder,
	// 	main[wrapper][login] [container] ::-moz-placeholder {
	// 		font-family: 'Roboto', sans-serif;
	// 		color: white;
	// 		opacity: 1;
	// 		font-weight: 100 !important;
	// 	}
	// 	main[wrapper][login] {
	// 		transition: none;
	// 		/* background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%); */
	// 		background: hsl(225, 14%, 22%);
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		width: 100vw;
	// 		height: 100vh;
	// 		overflow: hidden;
	// 	}
	// 	main[wrapper][form-success] [container] h1 {
	// 		transform: translateY(85px);
	// 	}
	// 	[container] {
	// 		z-index: 1;
	// 		max-width: 600px;
	// 		text-align: center;
	// 	}
	// 	[container] h1 {
	// 		font-size: 40px;
	// 		transition-duration: 1s;
	// 		transition-timing-function: ease-in-put;
	// 		font-weight: 200;
	// 	}
	//
	// 	main[wrapper] form {
	// 		height: 25rem;
	// 		padding: 20px 0;
	// 		position: relative;
	// 		text-align: center;
	// 		z-index: 2;
	// 	}
	//
	// 	main[wrapper] form input {
	// 		-webkit-appearance: none;
	// 		-moz-appearance: none;
	// 		appearance: none;
	// 		outline: 0;
	// 		border: 0;
	// 		background-color: rgba(255, 255, 255, 0.2);
	// 		width: 250px;
	// 		border-radius: 5px;
	// 		padding: 10px 15px;
	// 		margin: 0 auto 10px auto;
	// 		display: block;
	// 		/* text-align: center; */
	// 		font-size: 18px;
	// 		color: white;
	// 		transition-duration: 0.25s;
	// 	}
	// 	main[wrapper] form input::-webkit-input-placeholder {color:rgba(255,255,255,0.5);}
	// 	main[wrapper] form input::-moz-placeholder          {color:rgba(255,255,255,0.5);}/* Firefox 19+ */
	// 	main[wrapper] form input:-moz-placeholder           {color:rgba(255,255,255,0.5);}/* Firefox 18- */
	// 	main[wrapper] form input:-ms-input-placeholder      {color:rgba(255,255,255,0.5);}
	//
	// 	main[wrapper] form input[error] {
	// 		border: 1px solid red;
	// 	}
	//
	// 	main[wrapper] form input:hover {
	// 		background-color: rgba(255, 255, 255, 0.4);
	// 	}
	//
	// 	main[wrapper] form input:active,
	// 	main[wrapper] form input:focus {
	// 		background-color: rgba(255,255,255,0.25);
	// 	}
	//
	// 	main[wrapper] form button[place] {
	// 		-webkit-appearance: none;
	// 		-moz-appearance: none;
	// 		appearance: none;
	// 		position: absolute;
	// 		padding: 10px 15px;
	// 		color: #fff;
	// 		font-size: 1.2rem;
	// 		outline: 0;
	// 		border: 0;
	// 		border-top: 1px solid transparent;
	// 		cursor: pointer;
	// 		transform: translate3d(-50%,0,0);
	// 		transition: transform ease .5s, width ease .5s, background-color ease .2s, border-color ease .3s;
	// 		-webkit-user-select: none;
	// 		-moz-user-select: none;
	// 		-ms-user-select: none;
	// 		user-select: none;
	// 	}
	//
	// 	main[wrapper] form button[place="form"] {
	// 		border-radius: 5px;
	// 		width: 250px;
	// 		background-color: rgba(255,255,255,0.3);
	// 	}
	//
	// 	main[wrapper] form button[place="bottom"][purp="login"] {
	// 		transform: translate3d(-50%,5rem,0);
	// 	}
	//
	// 	main[wrapper] form button[place="form"]:focus {
	// 		background-color: rgba(255,255,255,0.2);
	// 	}
	//
	// 	main[wrapper] form button[place="form"]:hover {
	// 		background-color: rgba(255,255,255,0.4);
	// 		/* transition: transform ease 0.5s, width ease .5s, background-color ease 0s, border-color ease .3s; */
	//
	// 	}
	// 	main[wrapper] form button[place="form"]:active {
	// 		background-color: rgba(255,255,255,.6);
	// 	}
	//
	// 	main[wrapper] form button[place="bottom"] {
	// 		width: 7rem;
	// 		transform: translate3d(-50%,5rem,0);
	// 		z-index: 99;
	// 		border-top: 1px solid #fff;
	// 	}
	//
	// 	main[wrapper] button[place="bottom"]:active,
	// 	main[wrapper] button[place="bottom"]:hover {
	// 		border-top: 1px solid transparent;
	// 	}
	//
	// 	main[wrapper] [background] {
	// 		position: fixed;
	// 		top: 0;
	// 		left: 0;
	// 		width: 100%;
	// 		height: 100%;
	// 		z-index: 0;
	// 		opacity: 0.7;
	// 		background: url('data:image/jpeg;base64,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');
	// 		/* background: url('http://66.media.tumblr.com/c548439697291ff097986d530edee2ed/tumblr_npz4tbnGlA1uv05vvo4_1280.jpg'); */
	// 		/* background: -webkit-linear-gradient(hsl(226, 100%, 68%) 0%, hsl(227, 81%, 57%) 100%); */
	// 		/* background: -o-linear-gradient(hsl(226, 100%, 68%) 0%, hsl(227, 81%, 57%) 100%); */
	// 		/* background: linear-gradient(hsl(226, 100%, 68%) 0%, hsl(227, 81%, 57%) 100%); */
	// 		background-repeat: no-repeat;
	// 		background-position: center;
	// 		background-size: cover;
	// 	}
	// 	/* main[wrapper] [background] li {
	// 		position: absolute;
	// 		list-style: none;
	// 		display: block;
	// 		width: 40px;
	// 		height: 40px;
	// 		background-color: #fff;
	// 		opacity: 0.5;
	// 		bottom: -160px;
	// 		animation: square 25s infinite;
	// 		transition-timing-function: linear; Chrome, Safari, Opera
	// 		animation-delay: calc(12s + 60s);
	// 	}
	// 	main[wrapper] [background] li:nth-child(1) {
	// 		left: 10%;
	// 	}
	// 	main[wrapper] [background] li:nth-child(2) {
	// 		left: 20%;
	// 		width: 80px;
	// 		height: 80px;
	// 		animation-delay: calc(2s + 60s);
	// 		animation-duration: 17s;
	// 	}
	// 	main[wrapper] [background] li:nth-child(3) {
	// 		left: 25%;
	// 		animation-delay: calc(4s + 60s);
	// 	}
	// 	main[wrapper] [background] li:nth-child(4) {
	// 		left: 40%;
	// 		width: 60px;
	// 		height: 60px;
	// 		animation-duration: 22s;
	// 		opacity: 0.25;
	// 	}
	// 	main[wrapper] [background] li:nth-child(5) {
	// 		left: 70%;
	// 	}
	// 	main[wrapper] [background] li:nth-child(6) {
	// 		left: 80%;
	// 		width: 120px;
	// 		height: 120px;
	// 		animation-delay: calc(3s + 60s);
	// 		opacity: 0.07;
	// 	}
	// 	main[wrapper] [background] li:nth-child(7) {
	// 		left: 32%;
	// 		width: 160px;
	// 		height: 160px;
	// 		animation-delay: calc(7s + 60s);
	// 	}
	// 	main[wrapper] [background] li:nth-child(8) {
	// 		left: 55%;
	// 		width: 20px;
	// 		height: 20px;
	// 		animation-delay: calc(15s + 60s);
	// 		animation-duration: 40s;
	// 	}
	// 	main[wrapper] [background] li:nth-child(9) {
	// 		left: 25%;
	// 		width: 10px;
	// 		height: 10px;
	// 		animation-delay: calc(2s + 60s);
	// 		animation-duration: 40s;
	// 		opacity: 0.05;
	// 	}
	// 	main[wrapper] [background] li:nth-child(10) {
	// 		left: 90%;
	// 		width: 160px;
	// 		height: 160px;
	// 		animation-delay: calc(11s + 60s);
	// 	}
	// 	@keyframes square {
	// 		0% {
	// 			transform: translateY(0);
	// 		}
	// 		100% {
	// 			transform: translateY(-160vh) rotate(600deg);
	// 		}
	// 	} */
	// </style>
	//
	// <main wrapper login flex center children scroller-y>
	// 	<div container>
	// 		<!-- <h1 style="font-family: 'Source Sans Pro', sans-serif;color: white;font-weight:lighter;">Welcome</h1> -->
	// 		<form login>
	// 			<!-- TODO : rework oninput events -->
	// 			<input
	// 				type="text"
	// 				name="username"
	// 				id="username"
	// 				placeholder="Username"
	// 				autocompvare="off"
	// 				maxlength="32"
	// 				v-on:input="usernameInputEvent"
	// 				v-model="user.account.username"
	// 				@keyup.enter="isLogin ? login($event) : register($event)"
	// 			>
	// 			<input
	// 				type="password"
	// 				name="password"
	// 				id="password"
	// 				placeholder="Password"
	// 				autocompvare="off"
	// 				maxlength="64"
	// 				v-on:input="passwordInputEvent"
	// 				@keyup.enter="isLogin ? login($event) : register($event)"
	// 			>
	// 			<div v-show="!isLogin" transition="height" transition-mode="out-in" style="height:212px"> 
	// 				<input
	// 					type="email"
	// 					name="email"
	// 					id="email"
	// 					placeholder="Email"
	// 					autocompvare="off"
	// 					v-on:input="emailInputEvent"
	// 					@keyup.enter="isLogin ? login($event) : register($event)"
	// 				>
	// 				<input
	// 					type="text"
	// 					name="firstname"
	// 					id="firstname"
	// 					placeholder="First Name"
	// 					autocompvare="off"
	// 					v-on:input="/*usernameInputEvent*/"
	// 					v-model="user.account.firstName"
	// 					@keyup.enter="isLogin ? login($event) : register($event)"
	// 				>
	// 				<input
	// 					type="text"
	// 					name="lastname"
	// 					id="lastname"
	// 					placeholder="Last Name"
	// 					autocompvare="off"
	// 					v-on:input="/*usernameInputEvent*/"
	// 					v-model="user.account.lastName"
	// 					@keyup.enter="isLogin ? login($event) : register($event)"
	// 				>
	// 				<input
	// 					type="text"
	// 					name="group"
	// 					id="group"
	// 					placeholder="Study Group (BS1-2, BS4-1)"
	// 					autocompvare="off"
	// 					v-on:input="/*usernameInputEvent*/"
	// 					v-model="user.account.studyGroup"
	// 					@keyup.enter="isLogin ? login($event) : register($event)"
	// 				>
	// 			</div>
	//
	// 			<button :place="isLogin ? 'form' : 'bottom'" style="color:#fff" purp="login"
	// 				type="button"
	// 				@click="login"
	// 				@keyup.enter="login"
	// 			>Log in</button>
	// 			<button :place="isLogin ? 'bottom' : 'form'" style="color:#fff"
	// 				type="button"
	// 				@click="register"
	// 				@keyup.enter="register"
	// 			>Register</button>
	// 		</form>
	// 	</div>
	// 	<ul background>
	// <!-- 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li>
	// 		<li></li> -->
	// 	</ul>
	// </main>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {
				user: this.$router.app.user,
				isLogin: true
			};
		},
		methods: {
			login: function login(e) {
				e.preventDefault();
				if (this.isLogin) this.user.account.authorize(password.value, this.formSuccessCallback, this.formErrorCallback);else {
					this.isLogin = true;
					e.target.blur();
				}
			},
			register: function register(e) {
				e.preventDefault();
				if (!this.isLogin) {
					if (this.checkUsernameInput('strict') && this.checkPasswordInput('strict') && this.checkEmailInput() && this.checkNameInput()) this.user.account.create(password.value, email.value, this.formSuccessCallback, this.formErrorCallback);
				} else {
					this.isLogin = false;
					e.target.blur();
				}
			},

			/// Form Callbacks
			//
			formSuccessCallback: function formSuccessCallback(result) {
				this.user.account.set(result);
				this.$router.go("/");
			},
			formErrorCallback: function formErrorCallback(result) {
				//this.setError(result, 'username');
			},
			//
			///

			///Reusable LoginData checkers
			//
			usernameInputEvent: function usernameInputEvent(e) {
				this.checkUsernameInput();
			},

			checkUsernameInput: function checkUsernameInput(strict) {
				var regex = strict ? /^([0-9]|[a-z]|[A-Z]|[_]){3,32}$/ : /^([0-9]|[a-z]|[A-Z]|[_])*$/;
				var ufe = !regex.test(this.user.account.username);

				if (ufe) this.setError('username');else this.removeError('username');

				return !ufe;
			},

			passwordInputEvent: function passwordInputEvent(e) {
				this.checkPasswordInput();
			},

			checkPasswordInput: function checkPasswordInput(strict) {
				var regex = strict ? /^.{5,64}$/ : /^.*$/;
				var pfe = !regex.test(password.value);

				if (pfe) this.setError('password');else this.removeError('password');

				return !pfe;
			},

			emailInputEvent: function emailInputEvent(e) {
				this.checkEmailInput();
			},

			checkEmailInput: function checkEmailInput() {
				var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
				var pfe = !regex.test(email.value);

				if (pfe) this.setError('email');else this.removeError('email');

				return !pfe;
			},

			nameInputEvent: function nameInputEvent(e) {
				this.checkNameInput();
			},

			checkNameInput: function checkNameInput() {
				//([BS]|[MS])[1-4]-[0-9]+
				var regex = /^.+$/;
				var pfe = !regex.test(firstname.value) && !regex.test(lastname.value);

				if (pfe) {
					this.setError('firstname');
					this.setError('lastname');
				} else {
					this.removeError('firstname');
					this.removeError('lastname');
				}

				return !pfe;
			},

			//TODO
			setError: function setError(toWhat) {
				var elem = document.getElementById(toWhat);
				elem.setAttribute('error', '');
			},

			//TODO
			removeError: function removeError(fromWhat) {
				var elem = document.getElementById(fromWhat);
				elem.removeAttribute('error');
			}
		}
	};
	// </script>

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = "\r\n<style type=\"text/css\" media=\"screen\">\r\n\tmain[wrapper] * {\r\n\t\tbox-sizing: border-box;\r\n\t\tmargin: 0;\r\n\t\tpadding: 0;\r\n\t}\r\n\r\n\tmain[wrapper][login] [container] {\r\n\t\tfont-family: 'Roboto', sans-serif;\r\n\t\tcolor: white;\r\n\t\tfont-weight: 100 !important;\r\n\t}\r\n\r\n\tmain[wrapper][login] [container] ::-webkit-input-placeholder,\r\n\tmain[wrapper][login] [container] :-moz-placeholder,\r\n\tmain[wrapper][login] [container] :-ms-input-placeholder,\r\n\tmain[wrapper][login] [container] ::-moz-placeholder {\r\n\t\tfont-family: 'Roboto', sans-serif;\r\n\t\tcolor: white;\r\n\t\topacity: 1;\r\n\t\tfont-weight: 100 !important;\r\n\t}\r\n\tmain[wrapper][login] {\r\n\t\ttransition: none;\r\n\t\t/* background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%); */\r\n\t\tbackground: hsl(225, 14%, 22%);\r\n\t\tposition: absolute;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\twidth: 100vw;\r\n\t\theight: 100vh;\r\n\t\toverflow: hidden;\r\n\t}\r\n\tmain[wrapper][form-success] [container] h1 {\r\n\t\ttransform: translateY(85px);\r\n\t}\r\n\t[container] {\r\n\t\tz-index: 1;\r\n\t\tmax-width: 600px;\r\n\t\ttext-align: center;\r\n\t}\r\n\t[container] h1 {\r\n\t\tfont-size: 40px;\r\n\t\ttransition-duration: 1s;\r\n\t\ttransition-timing-function: ease-in-put;\r\n\t\tfont-weight: 200;\r\n\t}\r\n\r\n\tmain[wrapper] form {\r\n\t\theight: 25rem;\r\n\t\tpadding: 20px 0;\r\n\t\tposition: relative;\r\n\t\ttext-align: center;\r\n\t\tz-index: 2;\r\n\t}\r\n\r\n\tmain[wrapper] form input {\r\n\t\t-webkit-appearance: none;\r\n\t\t-moz-appearance: none;\r\n\t\tappearance: none;\r\n\t\toutline: 0;\r\n\t\tborder: 0;\r\n\t\tbackground-color: rgba(255, 255, 255, 0.2);\r\n\t\twidth: 250px;\r\n\t\tborder-radius: 5px;\r\n\t\tpadding: 10px 15px;\r\n\t\tmargin: 0 auto 10px auto;\r\n\t\tdisplay: block;\r\n\t\t/* text-align: center; */\r\n\t\tfont-size: 18px;\r\n\t\tcolor: white;\r\n\t\ttransition-duration: 0.25s;\r\n\t}\r\n\tmain[wrapper] form input::-webkit-input-placeholder {color:rgba(255,255,255,0.5);}\r\n\tmain[wrapper] form input::-moz-placeholder          {color:rgba(255,255,255,0.5);}/* Firefox 19+ */\r\n\tmain[wrapper] form input:-moz-placeholder           {color:rgba(255,255,255,0.5);}/* Firefox 18- */\r\n\tmain[wrapper] form input:-ms-input-placeholder      {color:rgba(255,255,255,0.5);}\r\n\r\n\tmain[wrapper] form input[error] {\r\n\t\tborder: 1px solid red;\r\n\t}\r\n\r\n\tmain[wrapper] form input:hover {\r\n\t\tbackground-color: rgba(255, 255, 255, 0.4);\r\n\t}\r\n\r\n\tmain[wrapper] form input:active,\r\n\tmain[wrapper] form input:focus {\r\n\t\tbackground-color: rgba(255,255,255,0.25);\r\n\t}\r\n\r\n\tmain[wrapper] form button[place] {\r\n\t\t-webkit-appearance: none;\r\n\t\t-moz-appearance: none;\r\n\t\tappearance: none;\r\n\t\tposition: absolute;\r\n\t\tpadding: 10px 15px;\r\n\t\tcolor: #fff;\r\n\t\tfont-size: 1.2rem;\r\n\t\toutline: 0;\r\n\t\tborder: 0;\r\n\t\tborder-top: 1px solid transparent;\r\n\t\tcursor: pointer;\r\n\t\ttransform: translate3d(-50%,0,0);\r\n\t\ttransition: transform ease .5s, width ease .5s, background-color ease .2s, border-color ease .3s;\r\n\t\t-webkit-user-select: none;\r\n\t\t-moz-user-select: none;\r\n\t\t-ms-user-select: none;\r\n\t\tuser-select: none;\r\n\t}\r\n\r\n\tmain[wrapper] form button[place=\"form\"] {\r\n\t\tborder-radius: 5px;\r\n\t\twidth: 250px;\r\n\t\tbackground-color: rgba(255,255,255,0.3);\r\n\t}\r\n\r\n\tmain[wrapper] form button[place=\"bottom\"][purp=\"login\"] {\r\n\t\ttransform: translate3d(-50%,5rem,0);\r\n\t}\r\n\r\n\tmain[wrapper] form button[place=\"form\"]:focus {\r\n\t\tbackground-color: rgba(255,255,255,0.2);\r\n\t}\r\n\r\n\tmain[wrapper] form button[place=\"form\"]:hover {\r\n\t\tbackground-color: rgba(255,255,255,0.4);\r\n\t\t/* transition: transform ease 0.5s, width ease .5s, background-color ease 0s, border-color ease .3s; */\r\n\r\n\t}\r\n\tmain[wrapper] form button[place=\"form\"]:active {\r\n\t\tbackground-color: rgba(255,255,255,.6);\r\n\t}\r\n\r\n\tmain[wrapper] form button[place=\"bottom\"] {\r\n\t\twidth: 7rem;\r\n\t\ttransform: translate3d(-50%,5rem,0);\r\n\t\tz-index: 99;\r\n\t\tborder-top: 1px solid #fff;\r\n\t}\r\n\r\n\tmain[wrapper] button[place=\"bottom\"]:active,\r\n\tmain[wrapper] button[place=\"bottom\"]:hover {\r\n\t\tborder-top: 1px solid transparent;\r\n\t}\r\n\r\n\tmain[wrapper] [background] {\r\n\t\tposition: fixed;\r\n\t\ttop: 0;\r\n\t\tleft: 0;\r\n\t\twidth: 100%;\r\n\t\theight: 100%;\r\n\t\tz-index: 0;\r\n\t\topacity: 0.7;\r\n\t\tbackground: url('data:image/jpeg;base64,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');\r\n\t\t/* background: url('http://66.media.tumblr.com/c548439697291ff097986d530edee2ed/tumblr_npz4tbnGlA1uv05vvo4_1280.jpg'); */\r\n\t\t/* background: -webkit-linear-gradient(hsl(226, 100%, 68%) 0%, hsl(227, 81%, 57%) 100%); */\r\n\t\t/* background: -o-linear-gradient(hsl(226, 100%, 68%) 0%, hsl(227, 81%, 57%) 100%); */\r\n\t\t/* background: linear-gradient(hsl(226, 100%, 68%) 0%, hsl(227, 81%, 57%) 100%); */\r\n\t\tbackground-repeat: no-repeat;\r\n\t\tbackground-position: center;\r\n\t\tbackground-size: cover;\r\n\t}\r\n\t/* main[wrapper] [background] li {\r\n\t\tposition: absolute;\r\n\t\tlist-style: none;\r\n\t\tdisplay: block;\r\n\t\twidth: 40px;\r\n\t\theight: 40px;\r\n\t\tbackground-color: #fff;\r\n\t\topacity: 0.5;\r\n\t\tbottom: -160px;\r\n\t\tanimation: square 25s infinite;\r\n\t\ttransition-timing-function: linear; Chrome, Safari, Opera\r\n\t\tanimation-delay: calc(12s + 60s);\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(1) {\r\n\t\tleft: 10%;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(2) {\r\n\t\tleft: 20%;\r\n\t\twidth: 80px;\r\n\t\theight: 80px;\r\n\t\tanimation-delay: calc(2s + 60s);\r\n\t\tanimation-duration: 17s;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(3) {\r\n\t\tleft: 25%;\r\n\t\tanimation-delay: calc(4s + 60s);\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(4) {\r\n\t\tleft: 40%;\r\n\t\twidth: 60px;\r\n\t\theight: 60px;\r\n\t\tanimation-duration: 22s;\r\n\t\topacity: 0.25;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(5) {\r\n\t\tleft: 70%;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(6) {\r\n\t\tleft: 80%;\r\n\t\twidth: 120px;\r\n\t\theight: 120px;\r\n\t\tanimation-delay: calc(3s + 60s);\r\n\t\topacity: 0.07;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(7) {\r\n\t\tleft: 32%;\r\n\t\twidth: 160px;\r\n\t\theight: 160px;\r\n\t\tanimation-delay: calc(7s + 60s);\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(8) {\r\n\t\tleft: 55%;\r\n\t\twidth: 20px;\r\n\t\theight: 20px;\r\n\t\tanimation-delay: calc(15s + 60s);\r\n\t\tanimation-duration: 40s;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(9) {\r\n\t\tleft: 25%;\r\n\t\twidth: 10px;\r\n\t\theight: 10px;\r\n\t\tanimation-delay: calc(2s + 60s);\r\n\t\tanimation-duration: 40s;\r\n\t\topacity: 0.05;\r\n\t}\r\n\tmain[wrapper] [background] li:nth-child(10) {\r\n\t\tleft: 90%;\r\n\t\twidth: 160px;\r\n\t\theight: 160px;\r\n\t\tanimation-delay: calc(11s + 60s);\r\n\t}\r\n\t@keyframes square {\r\n\t\t0% {\r\n\t\t\ttransform: translateY(0);\r\n\t\t}\r\n\t\t100% {\r\n\t\t\ttransform: translateY(-160vh) rotate(600deg);\r\n\t\t}\r\n\t} */\r\n</style>\r\n\r\n<main wrapper login flex center children scroller-y>\r\n\t<div container>\r\n\t\t<!-- <h1 style=\"font-family: 'Source Sans Pro', sans-serif;color: white;font-weight:lighter;\">Welcome</h1> -->\r\n\t\t<form login>\r\n\t\t\t<!-- TODO : rework oninput events -->\r\n\t\t\t<input\r\n\t\t\t\ttype=\"text\"\r\n\t\t\t\tname=\"username\"\r\n\t\t\t\tid=\"username\"\r\n\t\t\t\tplaceholder=\"Username\"\r\n\t\t\t\tautocompvare=\"off\"\r\n\t\t\t\tmaxlength=\"32\"\r\n\t\t\t\tv-on:input=\"usernameInputEvent\"\r\n\t\t\t\tv-model=\"user.account.username\"\r\n\t\t\t\t@keyup.enter=\"isLogin ? login($event) : register($event)\"\r\n\t\t\t>\r\n\t\t\t<input\r\n\t\t\t\ttype=\"password\"\r\n\t\t\t\tname=\"password\"\r\n\t\t\t\tid=\"password\"\r\n\t\t\t\tplaceholder=\"Password\"\r\n\t\t\t\tautocompvare=\"off\"\r\n\t\t\t\tmaxlength=\"64\"\r\n\t\t\t\tv-on:input=\"passwordInputEvent\"\r\n\t\t\t\t@keyup.enter=\"isLogin ? login($event) : register($event)\"\r\n\t\t\t>\r\n\t\t\t<div v-show=\"!isLogin\" transition=\"height\" transition-mode=\"out-in\" style=\"height:212px\"> \r\n\t\t\t\t<input\r\n\t\t\t\t\ttype=\"email\"\r\n\t\t\t\t\tname=\"email\"\r\n\t\t\t\t\tid=\"email\"\r\n\t\t\t\t\tplaceholder=\"Email\"\r\n\t\t\t\t\tautocompvare=\"off\"\r\n\t\t\t\t\tv-on:input=\"emailInputEvent\"\r\n\t\t\t\t\t@keyup.enter=\"isLogin ? login($event) : register($event)\"\r\n\t\t\t\t>\r\n\t\t\t\t<input\r\n\t\t\t\t\ttype=\"text\"\r\n\t\t\t\t\tname=\"firstname\"\r\n\t\t\t\t\tid=\"firstname\"\r\n\t\t\t\t\tplaceholder=\"First Name\"\r\n\t\t\t\t\tautocompvare=\"off\"\r\n\t\t\t\t\tv-on:input=\"/*usernameInputEvent*/\"\r\n\t\t\t\t\tv-model=\"user.account.firstName\"\r\n\t\t\t\t\t@keyup.enter=\"isLogin ? login($event) : register($event)\"\r\n\t\t\t\t>\r\n\t\t\t\t<input\r\n\t\t\t\t\ttype=\"text\"\r\n\t\t\t\t\tname=\"lastname\"\r\n\t\t\t\t\tid=\"lastname\"\r\n\t\t\t\t\tplaceholder=\"Last Name\"\r\n\t\t\t\t\tautocompvare=\"off\"\r\n\t\t\t\t\tv-on:input=\"/*usernameInputEvent*/\"\r\n\t\t\t\t\tv-model=\"user.account.lastName\"\r\n\t\t\t\t\t@keyup.enter=\"isLogin ? login($event) : register($event)\"\r\n\t\t\t\t>\r\n\t\t\t\t<input\r\n\t\t\t\t\ttype=\"text\"\r\n\t\t\t\t\tname=\"group\"\r\n\t\t\t\t\tid=\"group\"\r\n\t\t\t\t\tplaceholder=\"Study Group (BS1-2, BS4-1)\"\r\n\t\t\t\t\tautocompvare=\"off\"\r\n\t\t\t\t\tv-on:input=\"/*usernameInputEvent*/\"\r\n\t\t\t\t\tv-model=\"user.account.studyGroup\"\r\n\t\t\t\t\t@keyup.enter=\"isLogin ? login($event) : register($event)\"\r\n\t\t\t\t>\r\n\t\t\t</div>\r\n\r\n\t\t\t<button :place=\"isLogin ? 'form' : 'bottom'\" style=\"color:#fff\" purp=\"login\"\r\n\t\t\t\ttype=\"button\"\r\n\t\t\t\t@click=\"login\"\r\n\t\t\t\t@keyup.enter=\"login\"\r\n\t\t\t>Log in</button>\r\n\t\t\t<button :place=\"isLogin ? 'bottom' : 'form'\" style=\"color:#fff\"\r\n\t\t\t\ttype=\"button\"\r\n\t\t\t\t@click=\"register\"\r\n\t\t\t\t@keyup.enter=\"register\"\r\n\t\t\t>Register</button>\r\n\t\t</form>\r\n\t</div>\r\n\t<ul background>\r\n<!-- \t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li>\r\n\t\t<li></li> -->\r\n\t</ul>\r\n</main>\r\n";

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(19)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(23)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d4505d78/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// <template>
	// 	<sidebar></sidebar>
	// 	<router-view></router-view>
	// </template>
	//
	// <script>
	var sidebar = __webpack_require__(20);

	module.exports = {
		components: {
			sidebar: sidebar
		},
		route: {
			data: function data(transition) {
				console.log("Called GET in Main");
				var router = this.$router;
				var user = this.$root.user;
				user.account.update(function (result) {
					user.innopoints.data.update(function (result) {
						transition.next();
					}, function (error) {
						user.innopoints.api.user.create(function (result) {
							user.innopoints.data.update(function (result) {
								transition.next();
							});
						});
					});
				}, function (error) {
					console.log("Updating Error");
					router.go('/login');
				});
			}
		}
	};
	// </script>

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(21)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\sidebar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(22)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d8058cbe/sidebar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	// 	<aside class="sidebar">
	// 		<div class="header" v-link="'/'"><span>UIS</span></div>
	// 		<ul class="menu">
	//  			<li>
	// 				<button class="item" v-link="{ name: 'profile', params: { username: user.account.username } }">
	// 					<span class="icon pe-7s-user"></span>
	// 					<p class="text">Profile</p>
	// 				</button>
	// 			</li> 
	// 			<li>
	// 				<button class="item" v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }">
	// 					<span class="icon pe-7s-medal"></span>
	// 					<p class="text">Innopoints</p>
	// 					<span class="info right"
	// 						v-show="user.account.isStudent && !user.innopoints.isAdmin"
	// 						v-text="user.innopoints.data.amount"
	// 					></span>
	// 				</button>
	// 			</li>
	// 			<li>
	// 				<button class="item" v-link="{ name: 'store' }">
	// 					<span class="icon pe-7s-shopbag"></span>
	// 					<p class="text">Store</p>
	// 				</button>
	// 			</li>
	// 			<li v-if="user.account.isModerator">
	// 				<button class="item" v-link="{ name: 'accounts' }">
	// 					<span class="icon pe-7s-users"></span>
	// 					<p class="text">Accounts</p>
	// 				</button>
	// 			</li>
	//
	// 			<li>
	// 				<button class="item" bottom logout id="logout" @click="logout" block>
	// 					<span class="icon pe-7s-upload pe-rotate-270"></span>
	// 					<p class="text">Log out</p>
	// 				</button>
	// 			</li>
	// 		</ul>
	// 	</aside>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {
				user: this.$router.app.user
			};
		},
		methods: {
			logout: function logout(e) {
				this.user.account.clear();
				this.$router.go('/login');
			}
		}
	};
	// </script>

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "\n\t<aside class=\"sidebar\">\n\t\t<div class=\"header\" v-link=\"'/'\"><span>UIS</span></div>\n\t\t<ul class=\"menu\">\n \t\t\t<li>\n\t\t\t\t<button class=\"item\" v-link=\"{ name: 'profile', params: { username: user.account.username } }\">\n\t\t\t\t\t<span class=\"icon pe-7s-user\"></span>\n\t\t\t\t\t<p class=\"text\">Profile</p>\n\t\t\t\t</button>\n\t\t\t</li> \n\t\t\t<li>\n\t\t\t\t<button class=\"item\" v-link=\"{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }\">\n\t\t\t\t\t<span class=\"icon pe-7s-medal\"></span>\n\t\t\t\t\t<p class=\"text\">Innopoints</p>\n\t\t\t\t\t<span class=\"info right\"\n\t\t\t\t\t\tv-show=\"user.account.isStudent && !user.innopoints.isAdmin\"\n\t\t\t\t\t\tv-text=\"user.innopoints.data.amount\"\n\t\t\t\t\t></span>\n\t\t\t\t</button>\n\t\t\t</li>\n\t\t\t<li>\n\t\t\t\t<button class=\"item\" v-link=\"{ name: 'store' }\">\n\t\t\t\t\t<span class=\"icon pe-7s-shopbag\"></span>\n\t\t\t\t\t<p class=\"text\">Store</p>\n\t\t\t\t</button>\n\t\t\t</li>\n\t\t\t<li v-if=\"user.account.isModerator\">\n\t\t\t\t<button class=\"item\" v-link=\"{ name: 'accounts' }\">\n\t\t\t\t\t<span class=\"icon pe-7s-users\"></span>\n\t\t\t\t\t<p class=\"text\">Accounts</p>\n\t\t\t\t</button>\n\t\t\t</li>\n\n\t\t\t<li>\n\t\t\t\t<button class=\"item\" bottom logout id=\"logout\" @click=\"logout\" block>\n\t\t\t\t\t<span class=\"icon pe-7s-upload pe-rotate-270\"></span>\n\t\t\t\t\t<p class=\"text\">Log out</p>\n\t\t\t\t</button>\n\t\t\t</li>\n\t\t</ul>\n\t</aside>\n";

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "\n<sidebar></sidebar>\n<router-view></router-view>\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(25)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\content.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(29)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-d572e784/content.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _header = __webpack_require__(26);

	var _header2 = _interopRequireDefault(_header);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		data: function data() {
			return {
				user: this.$root.user
			};
		},

		components: {
			mainHeader: _header2.default
		}
	};
	// </script>
	// <template>
	// 	<main class="content">
	// 		<main-header>
	// 			<slot name="header"></slot>
	// 		</main-header>
	// 		<div class="content-main py-1" scroller-x scroller-y>
	// 			<router-view></router-view>
	// 			<!--TODO place footer here-->
	// 		</div>
	// 	</main>
	// </template>
	//
	// <script>

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(27)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(28)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-18459358/header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	// <template>
	// 	<header>
	// 		<slot></slot>
	// 	</header>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {};
		},
		methods: {}
	};
	// </script>

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n\t<slot></slot>\n</header>\n";

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "\n<main class=\"content\">\n\t<main-header>\n\t\t<slot name=\"header\"></slot>\n\t</main-header>\n\t<div class=\"content-main py-1\" scroller-x scroller-y>\n\t\t<router-view></router-view>\n\t\t<!--TODO place footer here-->\n\t</div>\n</main>\n";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(31)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\test.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(32)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-51fdfb9d/test.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	// <template>
	// 	<h1>Current path: {{ $route.path }}</h1>
	// 	<pre>{{ user | json 2 }}</pre>
	// 	<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {
				user: this.$router.app.user
			};
		},
		route: {
			data: function data(transition) {
				// this.user.account.update(transition.next);
				console.log("test route updated!");
				transition.next();
			}
		}
	};
	// </script>

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "\n<h1>Current path: {{ $route.path }}</h1>\n<pre>{{ user | json 2 }}</pre>\n<pre v-if=\"$loadingRouteData\">Data is not updated yet!</pre>\n";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(34)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\profile\\main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(35)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-071051d2/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _content = __webpack_require__(24);

	var _content2 = _interopRequireDefault(_content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		data: function data() {
			return {
				user: {}
			};
		},
		route: {
			data: function data(transition) {
				console.log("Called get in user");

				var username = this.$route.params.username;
				var user = this.$root.user.account;

				if (user.username != username) {
					console.log("called getBio: " + username);
					user.getBio({ username: username }, function (result) {
						console.log(result);
						transition.next({
							user: result
						});
					});
				} else {
					if (user.id) transition.next({ user: user });else user.exists(function (result) {
						transition.next({ user: user });
					});
				}
			}
		},
		components: {
			content: _content2.default
		}
	};
	// </script>
	// <template>
	// 	<content>
	// 		<div slot="header">
	// 			<div>Profile</div>
	// 		</div>
	// 	</content>
	// </template>
	//
	// <script>

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = "\n<content>\n\t<div slot=\"header\">\n\t\t<div>Profile</div>\n\t</div>\n</content>\n";

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(37)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\profile\\profile.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(38)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4f158ebb/profile.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";

	// <template>
	// 	<div class="container">
	// 		<div class="card card-block" block>
	// 			<div class="row">
	// 				<div class="col-sm text-sm-right">
	// 					<p>Username</p>
	// 				</div>
	// 				<div class="col-sm">
	// 					<p class="font-weight-bold">{{ user.username }}</p>
	// 				</div>
	// 			</div>
	// 			<div class="row">
	// 				<div class="col-sm text-sm-right">
	// 					<p>Role</p>
	// 				</div>
	// 				<div class="col-sm">
	// 					<p class="font-weight-bold">{{ user.role }}</p>
	// 				</div>
	// 			</div>
	// 			<pre v-show="user.studyGroup != null">{{ user.studyGroup }}</pre>
	// 			<pre v-show="user.tgId != null">{{ user.tgId }}</pre>
	// 			<pre v-show="user.firstName">{{ user.firstName + " " + user.lastName }}</pre>
	// 			<pre v-if="$loadingRouteData">Data is not updated yet!</pre>
	// 		</div>
	// 		<div block>
	// 			<router-view></router-view>
	// 		</div> 
	// 	</div>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {
				user: {}
			};
		},
		route: {
			data: function data(transition) {
				console.log("Called get in user");

				var username = this.$route.params.username;
				var user = this.$root.user.account;

				if (user.username != username) {
					console.log("called getBio: " + username);
					user.getBio({ username: username }, function (result) {
						console.log(result);
						transition.next({
							user: result
						});
					});
				} else {
					if (user.id) transition.next({ user: user });else user.exists(function (result) {
						transition.next({ user: user });
					});
				}
			}
		}
	};
	// </script>

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"container\">\n\t<div class=\"card card-block\" block>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-sm text-sm-right\">\n\t\t\t\t<p>Username</p>\n\t\t\t</div>\n\t\t\t<div class=\"col-sm\">\n\t\t\t\t<p class=\"font-weight-bold\">{{ user.username }}</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"col-sm text-sm-right\">\n\t\t\t\t<p>Role</p>\n\t\t\t</div>\n\t\t\t<div class=\"col-sm\">\n\t\t\t\t<p class=\"font-weight-bold\">{{ user.role }}</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<pre v-show=\"user.studyGroup != null\">{{ user.studyGroup }}</pre>\n\t\t<pre v-show=\"user.tgId != null\">{{ user.tgId }}</pre>\n\t\t<pre v-show=\"user.firstName\">{{ user.firstName + \" \" + user.lastName }}</pre>\n\t\t<pre v-if=\"$loadingRouteData\">Data is not updated yet!</pre>\n\t</div>\n\t<div block>\n\t\t<router-view></router-view>\n\t</div> \n</div>\n";

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(40)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\accounts\\main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(41)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-c2899a18/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	// 	<content></content>
	// </template>
	//
	// <script>
	var content = __webpack_require__(24);

	module.exports = {
		components: {
			content: content
		}
	};
	// </script>

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = "\n<content></content>\n";

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(43)
	__vue_script__ = __webpack_require__(47)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\accounts\\admin.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(48)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4b8f5ba4/admin.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(44);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(46)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4b8f5ba4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./admin.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-4b8f5ba4&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./admin.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(45)();
	// imports


	// module
	exports.push([module.id, "/* Gotta fix this */\n.card[_v-4b8f5ba4] {\n  text-align: left;\n}\ntd[_v-4b8f5ba4] {\n  vertical-align: middle;\n}\nselect.form-control[_v-4b8f5ba4] {\n  padding: .25rem .5rem;\n}\n", ""]);

	// exports


/***/ },
/* 45 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	// <style lang="less" scoped>
	//
	// 	/* Gotta fix this */
	// 	.card {
	// 		text-align: left;
	// 	}
	//
	// 	td {
	// 		vertical-align: middle;
	// 	}
	//
	// 	select.form-control {
	// 		padding: .25rem .5rem;
	// 	}
	//
	// </style>
	//
	// <template>
	// 	<div class="container">
	// 		<div class="card card-block">
	//
	// 			<h1 class="card-title mb-1">Registered users</h1>
	//
	// 			<p class="text-xs-center" v-show="$loadingRouteData">Loading Users</p>
	//
	// 			<div class="table-responsive" v-show="users.length">
	// 				<table class="table  table-striped table-bordered">
	// 					<thead>
	// 						<tr>
	// 							<th class="text-xs-center" @click="sortBy('id')">#</th>
	// 							<th class="text-xs-center" @click="sortBy('username')">Username</th>
	// 							<th class="text-xs-center" @click="sortBy('firstName')">First Name</th>
	// 							<th class="text-xs-center" @click="sortBy('lastName')">Last Name</th>
	// 							<th class="text-xs-center" @click="sortBy('tgId')">Alias</th>
	// 							<th class="text-xs-center" @click="sortBy('role')">Role</th>							
	// 						</tr>
	// 					</thead>
	// 					<tbody>
	// 						<tr v-for="u in users">
	// 							<th scope="row">{{ $index + 1 }}</td>
	// 							<td >{{ u.username }}</td>
	// 							<td>{{ u.firstName | capitalize}}</td>
	// 							<td>{{ u.lastName | capitalize}}</td>
	// 							<td>@{{ u.tgId }}</td>
	// 							<td class="text-xs-center p-0">
	// 								<select class="form-control" name="role_select" id="user_{{ u.id }}" @change="selectChanged">
	// 									<option value="ghost" :selected="u.role == 'ghost'">Ghost</option>
	// 									<option value="student" :selected="u.role == 'student'">Student</option>
	// 								</select>
	// 							</td>
	// 						</tr>
	// 					</tbody>
	// 				</table>
	// 			</div>
	//
	// 			<!-- Fix disabling -->
	// 			<button :disabled="selectChanged" class="btn btn-primary btn-lg btn-block" id="acceptRoles" @click="sendRoles" @keyup.enter="sendRoles">Save Changes</button>
	// 		</div>
	// 	</div>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {
				sortKey: 1,
				users: [],
				dirty: false
			};
		},

		props: ['user', 'roleChanged'],
		methods: {
			selectChanged: function selectChanged(e) {
				this.roleChanged(e);
			},
			sendRoles: function sendRoles(e) {
				var update = this.$router.app.user.account.updateRole;
				this.users.forEach(function (user) {
					var newRole = document.getElementById('user_' + user.id).value;
					if (newRole != user.role) update(user.id, user.role = newRole);
				});
				e.target.textContent = "Saved";
			},
			roleChanged: function roleChanged(e) {
				acceptRoles.textContent = "Save Changes";
			},
			sortBy: function sortBy(key) {
				this.users.sort(this.compareBy(key));
			},
			compareBy: function compareBy(key) {
				return function (a, b) {
					console.log(a, b, key);
					if (a[key] < b[key]) return -1;
					if (a[key] > b[key]) return 1;
					return 0;
				};
			}
		},
		route: {
			data: function data(transition) {
				var _this = this;

				var api = this.$root.user;
				api.account.list(function (result) {
					transition.next({
						users: result.sort(_this.compareBy('id'))
					});
				}, transition.abort //Don't let non-moder enter this 'page'.
				);
			}
		}
	};
	// </script>

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"container\" _v-4b8f5ba4=\"\">\n\t<div class=\"card card-block\" _v-4b8f5ba4=\"\">\n\t\t\n\t\t<h1 class=\"card-title mb-1\" _v-4b8f5ba4=\"\">Registered users</h1>\n\n\t\t<p class=\"text-xs-center\" v-show=\"$loadingRouteData\" _v-4b8f5ba4=\"\">Loading Users</p>\n\n\t\t<div class=\"table-responsive\" v-show=\"users.length\" _v-4b8f5ba4=\"\">\n\t\t\t<table class=\"table  table-striped table-bordered\" _v-4b8f5ba4=\"\">\n\t\t\t\t<thead _v-4b8f5ba4=\"\">\n\t\t\t\t\t<tr _v-4b8f5ba4=\"\">\n\t\t\t\t\t\t<th class=\"text-xs-center\" @click=\"sortBy('id')\" _v-4b8f5ba4=\"\">#</th>\n\t\t\t\t\t\t<th class=\"text-xs-center\" @click=\"sortBy('username')\" _v-4b8f5ba4=\"\">Username</th>\n\t\t\t\t\t\t<th class=\"text-xs-center\" @click=\"sortBy('firstName')\" _v-4b8f5ba4=\"\">First Name</th>\n\t\t\t\t\t\t<th class=\"text-xs-center\" @click=\"sortBy('lastName')\" _v-4b8f5ba4=\"\">Last Name</th>\n\t\t\t\t\t\t<th class=\"text-xs-center\" @click=\"sortBy('tgId')\" _v-4b8f5ba4=\"\">Alias</th>\n\t\t\t\t\t\t<th class=\"text-xs-center\" @click=\"sortBy('role')\" _v-4b8f5ba4=\"\">Role</th>\t\t\t\t\t\t\t\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody _v-4b8f5ba4=\"\">\n\t\t\t\t\t<tr v-for=\"u in users\" _v-4b8f5ba4=\"\">\n\t\t\t\t\t\t<th scope=\"row\" _v-4b8f5ba4=\"\">{{ $index + 1 }}\n\t\t\t\t\t\t</th><td _v-4b8f5ba4=\"\">{{ u.username }}</td>\n\t\t\t\t\t\t<td _v-4b8f5ba4=\"\">{{ u.firstName | capitalize}}</td>\n\t\t\t\t\t\t<td _v-4b8f5ba4=\"\">{{ u.lastName | capitalize}}</td>\n\t\t\t\t\t\t<td _v-4b8f5ba4=\"\">@{{ u.tgId }}</td>\n\t\t\t\t\t\t<td class=\"text-xs-center p-0\" _v-4b8f5ba4=\"\">\n\t\t\t\t\t\t\t<select class=\"form-control\" name=\"role_select\" id=\"user_{{ u.id }}\" @change=\"selectChanged\" _v-4b8f5ba4=\"\">\n\t\t\t\t\t\t\t\t<option value=\"ghost\" :selected=\"u.role == 'ghost'\" _v-4b8f5ba4=\"\">Ghost</option>\n\t\t\t\t\t\t\t\t<option value=\"student\" :selected=\"u.role == 'student'\" _v-4b8f5ba4=\"\">Student</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\n\t\t<!-- Fix disabling -->\n\t\t<button :disabled=\"selectChanged\" class=\"btn btn-primary btn-lg btn-block\" id=\"acceptRoles\" @click=\"sendRoles\" @keyup.enter=\"sendRoles\" _v-4b8f5ba4=\"\">Save Changes</button>\n\t</div>\n</div>\n";

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(50)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\innopoints\\main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(51)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-0bddf0f1/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	// 	<content>
	// 		<div content slot="header" flex align center>
	// 			<input item type="search" id="search" inline
	// 				:placeholder="'Search ' + $route.name"
	// 				v-model="$router.app.query"
	// 				v-show="$route.path.includes('applications')"
	// 			/>
	// 			<template v-if="$route.path.includes('applications')">
	// 				<button item 
	// 					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'all' } }"
	// 					v-if="!user.innopoints.data.isAdmin"
	// 				>All</button>
	// 				<button item
	// 					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'in_process' } }"
	// 				>In&nbsp;process</button>
	// 				<button item
	// 					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rejected' } }"
	// 				>Rejected</button>
	// 				<button item
	// 					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'rework' } }"
	// 				>In&nbsp;rework</button>
	// 				<button item
	// 					v-link="{name: 'applications',	params: { username: user.account.username, filter: 'approved' } }"
	// 				>Approved</button>
	// 			</template>
	// 			<template v-else>
	// 				<button main item v-link="{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }" inline>
	// 					Applications
	// 				</button>
	// 			</template>
	//
	// 			<button item right v-link="{ name: 'apply', params: { username: user.account.username } }">
	// 				<span text info>Apply</span>
	// 			</button>
	// 		</div>
	// 	</content>
	// </template>
	//
	// <script>
	var content = __webpack_require__(24);

	module.exports = {
		data: function data() {
			// var route = this.$route;
			return {
				route: this.$route,
				user: this.$root.user
			};
		},
		components: {
			content: content
		},
		methods: {
			filter_changed: function filter_changed(e) {
				this.$router.go({
					name: 'applications',
					params: {
						username: this.user.account.username,
						filter: e.target.dataset.value
					}
				});
			}
		}
	};
	// </script>

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = "\n<content>\n\t<div content slot=\"header\" flex align center>\n\t\t<input item type=\"search\" id=\"search\" inline\n\t\t\t:placeholder=\"'Search ' + $route.name\"\n\t\t\tv-model=\"$router.app.query\"\n\t\t\tv-show=\"$route.path.includes('applications')\"\n\t\t/>\n\t\t<template v-if=\"$route.path.includes('applications')\">\n\t\t\t<button item \n\t\t\t\tv-link=\"{name: 'applications',\tparams: { username: user.account.username, filter: 'all' } }\"\n\t\t\t\tv-if=\"!user.innopoints.data.isAdmin\"\n\t\t\t>All</button>\n\t\t\t<button item\n\t\t\t\tv-link=\"{name: 'applications',\tparams: { username: user.account.username, filter: 'in_process' } }\"\n\t\t\t>In&nbsp;process</button>\n\t\t\t<button item\n\t\t\t\tv-link=\"{name: 'applications',\tparams: { username: user.account.username, filter: 'rejected' } }\"\n\t\t\t>Rejected</button>\n\t\t\t<button item\n\t\t\t\tv-link=\"{name: 'applications',\tparams: { username: user.account.username, filter: 'rework' } }\"\n\t\t\t>In&nbsp;rework</button>\n\t\t\t<button item\n\t\t\t\tv-link=\"{name: 'applications',\tparams: { username: user.account.username, filter: 'approved' } }\"\n\t\t\t>Approved</button>\n\t\t</template>\n\t\t<template v-else>\n\t\t\t<button main item v-link=\"{ name: 'applications', params: { username: user.account.username, filter: 'in_process' } }\" inline>\n\t\t\t\tApplications\n\t\t\t</button>\n\t\t</template>\n\t\t\n\t\t<button item right v-link=\"{ name: 'apply', params: { username: user.account.username } }\">\n\t\t\t<span text info>Apply</span>\n\t\t</button>\n\t</div>\n</content>\n";

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(53)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\innopoints\\applications.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(57)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-3cf6ab5b/applications.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	// 	<div class="container">
	// 		<pre v-show="$loadingRouteData">Loading...</pre>
	//
	// 		<pre v-show="!applications.length && !$loadingRouteData">Empty</pre>
	//
	// 		<template v-if="applications.length">
	// 			<application
	// 				v-for="appl in applications
	// 				 | filterBy $root.query in 'type' '_id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1"
	// 				:application="appl"
	// 				:user="user"
	// 				:success="action_success"
	// 			></application>
	// 		</template>
	// 	</div>
	// </template>
	//
	// <script>
	module.exports = {
		data: function data() {
			return {
				user: this.$root.user,
				applications: []
			};
		},
		components: {
			application: __webpack_require__(54)
		},
		methods: {
			action_success: function action_success(id, new_status) {
				if (this.$route.params.filter === 'all' || this.$route.params.filter == null) this.applications.find(function (x) {
					return x.id == id;
				}).status = new_status;else document.getElementById('card' + id).remove();
			}
		},
		route: {
			data: function data(transition) {
				this.applications = [];
				var params = this.$route.params;
				var user = this.user;

				if (user.innopoints.data.isAdmin && !params.filter || params.filter == 'all') params.filter = null;

				var request = function request(result) {
					if (result.applications.length) {
						console.log(result);
						console.log("called appl get");
						var _length = result.applications.length;
						result.applications.forEach(function (res) {
							res.creation_time = res.creation_date;
							res.creation_date = new Date(res.creation_time * 1000).toLocaleString('ru');
						});
					}
					transition.next({
						applications: result.applications
					});
				};

				user.innopoints.data.update(function (result) {
					console.log(user.innopoints.data);
					console.log(result);
					user.innopoints.api.user.applications.get({
						status: params.filter || null,
						successCallback: request
					});
				});
			}
		}
	};
	// </script>

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(55)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\innopoints\\application.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(56)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4ee26270/application.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 55 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	// 	<div card class="card" :status="application.status" :id="'card' + application.id">
	// 		<header flex>
	// 			<section left>
	// 				<span>{{application.type | capitalize}}</span> <span misc>{{(application._id = '#' + application.id)}} by {{application.author.username}}</span>
	// 				<span block misc>Status: <span :status="application.status">{{application.status.split('_').join(' ')}}</span></span>
	// 			</section>
	// 			<section right>
	// 				<span misc v-text="application.creation_date"></span>
	// 			</section>
	// 		</header><!-- header -->
	// 		<section content v-show="application.work">
	// 			<div block>
	// 				<h4 v-show="application.type=='group'">Participants:</h4>
	// 				<div>
	// 					<div block v-for="work in application.work">
	// 						<a :href="'http://uis.university.innopolis.ru:8770/profile/' + work.actor.username">{{work.actor.username}}</a> - <span>{{ work.activity.title }}[{{ work.activity.price }}]</span>
	// 					</div>						
	// 				</div>
	// 			</div>
	// 		</section>
	// 		<section content v-show="application.comment">
	// 			<div block>
	// 				<h4>Comment: </h4>
	// 				<template v-if="application.comment && application.comment.length">
	// 					<p v-for="comment in application.comment.split('\n')" track-by="$index">{{comment}}</p>
	// 				</template>
	// 			</div>
	// 		</section>
	// 		<section content v-show="application.files.length > 0">
	// 			<div block>
	// 			<h4>files: </h4>
	// 			<p v-for="file of application.files">{{file | json}}</p>
	// 			</div>
	// 		</section>	
	// 		<footer v-if="user.innopoints.data.isAdmin && application.status=='in_process'">
	// 			<div block controls>
	// 				<button item success data-id="{{application.id}}" @click="approve">Approve</button>
	// 				<button item error data-id="{{application.id}}" @click="reject">Reject</button>
	// 				<button item warning data-id="{{application.id}}" @click="toRework">To rework</button>
	// 			</div>
	// 		</footer>
	// 		<footer v-if="!user.innopoints.data.isAdmin">
	// 			<div block controls>
	// 				<button item error data-id="{{application.id}}" @click="_delete" v-show="(application.status=='in_process' || application.status=='rework')">Delete</button>
	// 				<button item success data-id="{{application.id}}" @click="resend" v-show="(application.status=='rework')">Resend</span></button>
	// 			</div>
	// 		</footer>
	// 	</div>
	// </template>
	//
	// <script>
	module.exports = {
		props: ['application', 'user', 'success'],
		methods: {
			approve: function approve(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.approve(e.target.dataset.id, function (result) {
					success(e.target.dataset.id, 'approved', _appls);
				}, console.log);
			},
			reject: function reject(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.reject(e.target.dataset.id, function (result) {
					success(e.target.dataset.id, 'rejected', _appls);
				}, console.log);
			},
			toRework: function toRework(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.dismiss(e.target.dataset.id, function (result) {
					success(e.target.dataset.id, 'rework', _appls);
				}, console.log);
			},
			_delete: function _delete(e) {
				var _appls = this.applications;
				this.user.innopoints.api.user.application.delete(e.target.dataset.id, function (result) {
					console.log(result);
					document.getElementById('card' + e.target.dataset.id).remove();
				}, console.log);
			},
			resend: function resend(e) {
				var _appls = this.applications;
				var success = this.success;
				this.user.innopoints.api.user.application.send(e.target.dataset.id, function (result) {
					success(e.target.dataset.id, 'resend', _appls);
				}, console.log);
			}
		}
	};
	// </script>

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "\n<div card class=\"card\" :status=\"application.status\" :id=\"'card' + application.id\">\n\t<header flex>\n\t\t<section left>\n\t\t\t<span>{{application.type | capitalize}}</span> <span misc>{{(application._id = '#' + application.id)}} by {{application.author.username}}</span>\n\t\t\t<span block misc>Status: <span :status=\"application.status\">{{application.status.split('_').join(' ')}}</span></span>\n\t\t</section>\n\t\t<section right>\n\t\t\t<span misc v-text=\"application.creation_date\"></span>\n\t\t</section>\n\t</header><!-- header -->\n\t<section content v-show=\"application.work\">\n\t\t<div block>\n\t\t\t<h4 v-show=\"application.type=='group'\">Participants:</h4>\n\t\t\t<div>\n\t\t\t\t<div block v-for=\"work in application.work\">\n\t\t\t\t\t<a :href=\"'http://uis.university.innopolis.ru:8770/profile/' + work.actor.username\">{{work.actor.username}}</a> - <span>{{ work.activity.title }}[{{ work.activity.price }}]</span>\n\t\t\t\t</div>\t\t\t\t\t\t\n\t\t\t</div>\n\t\t</div>\n\t</section>\n\t<section content v-show=\"application.comment\">\n\t\t<div block>\n\t\t\t<h4>Comment: </h4>\n\t\t\t<template v-if=\"application.comment && application.comment.length\">\n\t\t\t\t<p v-for=\"comment in application.comment.split('\\n')\" track-by=\"$index\">{{comment}}</p>\n\t\t\t</template>\n\t\t</div>\n\t</section>\n\t<section content v-show=\"application.files.length > 0\">\n\t\t<div block>\n\t\t<h4>files: </h4>\n\t\t<p v-for=\"file of application.files\">{{file | json}}</p>\n\t\t</div>\n\t</section>\t\n\t<footer v-if=\"user.innopoints.data.isAdmin && application.status=='in_process'\">\n\t\t<div block controls>\n\t\t\t<button item success data-id=\"{{application.id}}\" @click=\"approve\">Approve</button>\n\t\t\t<button item error data-id=\"{{application.id}}\" @click=\"reject\">Reject</button>\n\t\t\t<button item warning data-id=\"{{application.id}}\" @click=\"toRework\">To rework</button>\n\t\t</div>\n\t</footer>\n\t<footer v-if=\"!user.innopoints.data.isAdmin\">\n\t\t<div block controls>\n\t\t\t<button item error data-id=\"{{application.id}}\" @click=\"_delete\" v-show=\"(application.status=='in_process' || application.status=='rework')\">Delete</button>\n\t\t\t<button item success data-id=\"{{application.id}}\" @click=\"resend\" v-show=\"(application.status=='rework')\">Resend</span></button>\n\t\t</div>\n\t</footer>\n</div>\n";

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"container\">\n\t<pre v-show=\"$loadingRouteData\">Loading...</pre>\n\n\t<pre v-show=\"!applications.length && !$loadingRouteData\">Empty</pre>\n\n\t<template v-if=\"applications.length\">\n\t\t<application\n\t\t\tv-for=\"appl in applications\n\t\t\t | filterBy $root.query in 'type' '_id' 'comment' 'creation_date' 'author.username' | orderBy 'creation_time' -1\"\n\t\t\t:application=\"appl\"\n\t\t\t:user=\"user\"\n\t\t\t:success=\"action_success\"\n\t\t></application>\n\t</template>\n</div>\n";

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(59)
	__vue_script__ = __webpack_require__(61)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\innopoints\\apply.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(62)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-05beb5e6/apply.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(60);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(46)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-05beb5e6&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./apply.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-05beb5e6&scoped=true!./../../../node_modules/less-loader/index.js!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./apply.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(45)();
	// imports


	// module
	exports.push([module.id, "/*\n.card {\n\tbackground: hsla(0, 0, 100, 1);\n\tborder-radius: 4px;\n\tpadding: 1rem 2rem;\n\ttext-align: left;\n}\n\n.card + .card {\n\tmargin-top: 1rem;\n}\n*/\n/* Gotta fix this */\n.card[_v-05beb5e6] {\n  text-align: left;\n}\n#upload[_v-05beb5e6] {\n  display: none;\n}\ntd[_v-05beb5e6] {\n  vertical-align: middle;\n}\ntd button[_v-05beb5e6] {\n  min-width: 1em;\n}\ninput[readonly][_v-05beb5e6] {\n  color: rgba(0, 0, 0, 0.8);\n  background: #ffffff;\n  border-color: #ffffff;\n}\n", ""]);

	// exports


/***/ },
/* 61 */
/***/ function(module, exports) {

	'use strict';

	// <style lang="less" scoped>
	//
	// 	/*
	// 	.card {
	// 		background: hsla(0, 0, 100, 1);
	// 		border-radius: 4px;
	// 		padding: 1rem 2rem;
	// 		text-align: left;
	// 	}
	//
	// 	.card + .card {
	// 		margin-top: 1rem;
	// 	}
	// 	*/
	//
	// 	/* Gotta fix this */
	// 	.card {
	// 		text-align: left;
	// 	}
	//
	// 	#upload {
	// 		display: none;
	// 	}
	//
	// 	td {
	// 		vertical-align: middle;
	// 	}
	//
	// 	td button {
	// 		min-width: 1em;
	// 	}
	//
	// 	input[readonly] {
	// 		color: hsla(0, 0%, 0%, 0.8);
	// 		background: hsl(0, 0%, 100%);
	// 		border-color: hsl(0, 0%, 100%);
	// 	}
	//
	// </style>
	//
	// <template>
	// 	<div class="container">
	//
	// 		<!-- While loading -->
	// 		<div>
	// 			<p v-show="$loadingRouteData">Loading…</p>
	// 		</div>
	//
	// 		<!-- When loaded -->
	// 		<div v-show="!$loadingRouteData" class="card">
	// 			<form id="ip_request">
	//
	// 				<div class="card-block">
	// 					<h1 class="card-title">New Application</h1>
	// 					<!--<h6 class="card-subtitle text-muted">by {{ user.account.username }}</h6>-->
	// 				</div>
	//
	// 				<div class="card-block">
	// 					<div class="form-group row flex-items-sm-middle mb-0">
	// 						<label class="col-sm col-form-label col-form-label-lg" for="activity_category">
	// 							<h4>Category</h4>
	// 						</label>
	// 						<div class="col-sm">
	// 							<select class="form-control form-control-lg" id="activity_category" v-model="current.category_id" @change="category_changed">
	// 								<option value="blank" selected>Choose Category</option>
	// 								<option value="">All</option>
	// 								<option v-for="c in categories" value="{{ c.id }}">{{ c.title }}</option>
	// 							</select>
	// 						</div>
	// 					</div>
	// 				</div>
	//
	// 				<div class="card-block">
	//
	// 					<h4 class="mb-1">
	// 						<template v-if="current.users.length > 1">Participants</template>
	// 						<template v-else>Participant</template>
	// 					</h4>
	//
	// 					<ul class="list-group">
	//
	// 						<li class="list-group-item py-1" v-for="u of current.users">
	//
	// 							<div class="clearfix mb-1" v-show="current.users.length > 1">
	// 								<button type="button" class="close" aria-label="Close" @click="current_users_remove($index)" v-if="current.users.length > 1">
	// 									<span aria-hidden="true">&times;</span>
	// 								</button>
	//
	// 								<span class="text-muted" v-show="current.users.length > 1">{{ $index + 1 }}</span>
	// 							</div>
	//
	// 							<div class="form-group row flex-items-sm-middle">
	// 								<label class="col-sm col-form-label" for="username_{{ $index }}">Username</label>
	// 								<div class="col-sm">
	// 									<input class="form-control" id="username_{{ $index }}" data-index="{{ $index }}" type="text" placeholder="username" @input="username_changed" value="{{ $index || user.innopoints.data.isAdmin ? '' : user.account.username }}" v-model="u.username">
	// 								</div>
	// 							</div>
	//
	// 							<div class="form-group row flex-items-sm-middle">
	// 								<label class="col-sm col-form-label" for="activity_{{ $index }}">Activity</label>
	// 								<div class="col-sm">
	// 									<select class="form-control" :disabled="!categorySelected || !u.username" id="activity_{{ $index }}" class="activity" v-model="u.activity_id" @change="activity_changed">
	// 										<option value="" selected>Choose Activity</option>
	// 										<option v-for="a in activities" value="{{ a.id }}">{{ a.title }}</option>
	// 									</select>
	// 								</div>
	// 							</div>
	//
	// 							<div class="form-group row flex-items-sm-middle">
	// 								<label class="col-sm col-form-label" for="amount_{{ $index }}">Quantity</label>
	// 								<div class="col-sm">
	// 									<input class="form-control" :disabled="!(!showAmount(u.activity_id) && activitySelected)" id="amount_{{ $index }}" type="number" class="amount" value="1" min="1" max="365" v-model="u.amount">
	// 								</div>
	// 							</div>
	//
	// 							<div class="form-group row flex-items-sm-middle mb-0">
	// 								<label class="col-sm col-form-label">Innopoints</label>
	// 									<div class="col-sm">
	// 										<input class="form-control" type="number" value="0123456789" readonly>
	// 									</div>
	// 							</div>
	//
	// 						</li>
	// 					</ul>
	//
	// 					<div class="clearfix mt-1">
	// 						<button type="button" class="btn btn-success float-xs-left" @click="current_users_count_inc">&plus; Add</button>
	// 						<button type="button" class="btn btn-danger float-xs-right" @click="current_users_count_clear" v-if="current.users.length > 1">&times; Clear</button>
	// 					</div>
	//
	// 				</div>
	//
	// 				<div class="card-block">
	// 					<label for="upload">
	// 						<h4>Files</h4>
	// 					</label>
	// 					<div class="table-responsive">
	// 						<table class="table  table-striped table-bordered" v-show="current.files.length">
	// 							<thead>
	// 								<tr>
	// 									<th class="text-xs-center">#</th>
	// 									<th class="text-xs-center">Name</th>
	// 									<th class="text-xs-center">Type</th>
	// 									<th class="text-xs-center">Size</th>
	// 									<th class="text-xs-center">Remove</th>
	// 								</tr>
	// 							</thead>
	// 							<tbody>
	// 								<tr v-for="f in current.files">
	// 									<th scope="row">{{ $index + 1 }}</td>
	// 									<td>{{ f.name }}</td>
	// 									<td>{{ f.type }}</td>
	// 									<td class="text-xs-right">{{ f.size }} KB</td>
	// 									<td class="text-xs-center py-0">
	// 										<button type="button" class="close float-xs-none" aria-label="Remove File" @click="removeFile($index)">
	// 											<span aria-hidden="true">&times;</span>
	// 										</button>
	// 									</td>
	// 								</tr>
	// 							</tbody>
	// 						</table>
	// 					</div>
	// 					<div class="clearfix">
	// 						<button type="button" class="btn btn-success float-xs-left" onClick="upload.click()">&plus; Add</button>
	// 						<button type="button" class="btn btn-danger float-xs-right" @click="current.files = []" v-show="current.files.length">&times; Clear</button>
	// 					</div>
	// 					<input id="upload" type="file" @change="uploaded" multiple>
	// 				</div> 
	//
	// 				<div class="card-block">
	// 					<div class="form-group">
	// 						<label for="comment">
	// 							<h4>Comment</h4>
	// 						</label>
	// 						<textarea class="form-control" id="comment" placeholder="Write a comment" v-model="current.comment" rows="4"></textarea>
	// 					</div>
	// 				</div>
	//
	// 				<div class="card-block">
	// 					<button class="btn btn-primary btn-lg btn-block" :disabled="!activitySelected" type="button" @click="send" id="send">Send</button>
	// 					<p class="mt-1 mb-0 text-xs-center" v-show="!categorySelected">Select Category</p>
	// 					<p class="mt-1 mb-0 text-xs-center" v-show="categorySelected && !activitySelected">Select Activities</p>
	// 				</div>
	//
	// 			</form>
	// 		</div>
	//
	// 	</div><!-- template wrap -->
	// </template>
	//
	// <script>

	module.exports = {
		data: function data() {
			var user = this.$root.user;
			return {
				user: user,
				categories: [],
				activities: [],
				activitySelected: false,
				categorySelected: false,
				current: {
					application: {},
					get isPersonal() {
						return this.users.length == 1 && this.users[0].user_id == user.account.id && !user.account.isModerator;
					},
					category_id: 0,
					users: [{
						user_id: user.account.id,
						activity_id: '',
						amount: 1
					}],
					files: [],
					comment: ''
				}
			};
		},


		methods: {
			current_users_count_inc: function current_users_count_inc() {
				this.current.users.push({
					user_id: null,
					activity_id: '',
					amount: 1
				});
				this.activity_changed();
			},
			current_users_count_clear: function current_users_count_clear() {
				this.current.users.splice(1, this.current.users.length - 1);
				this.activity_changed();
			},
			current_users_remove: function current_users_remove(index) {
				this.current.users.splice(index, 1);
				this.activity_changed();
				console.log(this.current.users);
			},
			username_changed: function username_changed(e) {
				var users = this.current.users;
				this.user.account.getBio({
					username: e.target.value
				}, function (result) {
					users[e.target.dataset.index].user_id = result.id;
				}, function (error) {
					console.log("Incorrect Username");
					//TODO
				});
			},
			category_changed: function category_changed(e) {
				this.categorySelected = this.activitySelected = false;
				var self = this;
				this.user.innopoints.api.getActivities({
					cat_id: self.current.category_id,
					successCallback: self.setActivities
				});
			},
			activity_changed: function activity_changed(e) {
				var counter = 0;
				this.current.users.forEach(function (_user) {
					if (_user.activity_id !== '') counter++;
				});
				this.activitySelected = counter == this.current.users.length;
			},
			setActivities: function setActivities(result) {
				this.activities = result;
				this.categorySelected = true;
			},
			uploaded: function uploaded(e) {
				this.current.files = Object.keys(e.target.files).map(function (key) {
					return e.target.files[key];
				});
			},
			removeFile: function removeFile(index) {
				this.current.files.splice(index, 1);
			},
			send: function (_send) {
				function send(_x) {
					return _send.apply(this, arguments);
				}

				send.toString = function () {
					return _send.toString();
				};

				return send;
			}(function (e) {
				send.textContent = "Sending...";
				this.current.application.type = this.current.isPersonal ? "personal" : "group";
				// TODO - catch bugs and exceptions
				this.current.application.work = [];

				var that = this;

				this.current.users.some(function (cur_user) {
					var activity_id = that.activities.find(function (x) {
						return x.id == cur_user.activity_id;
					}).id,
					    amount = parseInt(cur_user.amount) || null;

					that.current.application.work.push({
						activity_id: activity_id,
						amount: amount,
						actor: cur_user.user_id
					});

					if (that.current.isPersonal) return true;
				});

				this.current.application.comment = this.current.comment;
				this.current.application.files = this.current.files;

				this.user.innopoints.api.user.application.create(this.current.application, this.sendSuccess, this.error);
			}),
			sendSuccess: function sendSuccess(result) {
				send.textContent = "Sent";
			},
			error: function error(_error) {
				alert('Unsuccessful: ' + _error);
				send.textContent = "Failed to Send";
			},
			showAmount: function showAmount(id) {
				var temp = this.activities.find(function (x) {
					return x.id == id;
				});
				return temp && temp.type != 'permanent';
			}
		},

		route: {
			data: function data(transition) {
				console.log('calling get for innopoints');
				var user = this.$router.app.user;
				this.$router.app.user.account.update(function (result) {
					user.innopoints.api.getCategories({
						successCallback: function successCallback(result) {
							transition.next({
								categories: result
							});
						}
					});
				});
			}
		}
	};
	// </script>

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<div class=\"container\" _v-05beb5e6=\"\">\n\t\n\t<!-- While loading -->\n\t<div _v-05beb5e6=\"\">\n\t\t<p v-show=\"$loadingRouteData\" _v-05beb5e6=\"\">Loading…</p>\n\t</div>\n\t\n\t<!-- When loaded -->\n\t<div v-show=\"!$loadingRouteData\" class=\"card\" _v-05beb5e6=\"\">\n\t\t<form id=\"ip_request\" _v-05beb5e6=\"\">\n\n\t\t\t<div class=\"card-block\" _v-05beb5e6=\"\">\n\t\t\t\t<h1 class=\"card-title\" _v-05beb5e6=\"\">New Application</h1>\n\t\t\t\t<!--<h6 class=\"card-subtitle text-muted\">by {{ user.account.username }}</h6>-->\n\t\t\t</div>\n\n\t\t\t<div class=\"card-block\" _v-05beb5e6=\"\">\n\t\t\t\t<div class=\"form-group row flex-items-sm-middle mb-0\" _v-05beb5e6=\"\">\n\t\t\t\t\t<label class=\"col-sm col-form-label col-form-label-lg\" for=\"activity_category\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t<h4 _v-05beb5e6=\"\">Category</h4>\n\t\t\t\t\t</label>\n\t\t\t\t\t<div class=\"col-sm\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t<select class=\"form-control form-control-lg\" id=\"activity_category\" v-model=\"current.category_id\" @change=\"category_changed\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<option value=\"blank\" selected=\"\" _v-05beb5e6=\"\">Choose Category</option>\n\t\t\t\t\t\t\t<option value=\"\" _v-05beb5e6=\"\">All</option>\n\t\t\t\t\t\t\t<option v-for=\"c in categories\" value=\"{{ c.id }}\" _v-05beb5e6=\"\">{{ c.title }}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"card-block\" _v-05beb5e6=\"\">\n\n\t\t\t\t<h4 class=\"mb-1\" _v-05beb5e6=\"\">\n\t\t\t\t\t<template v-if=\"current.users.length > 1\">Participants</template>\n\t\t\t\t\t<template v-else=\"\">Participant</template>\n\t\t\t\t</h4>\n\n\t\t\t\t<ul class=\"list-group\" _v-05beb5e6=\"\">\n\t\t\t\t\t\n\t\t\t\t\t<li class=\"list-group-item py-1\" v-for=\"u of current.users\" _v-05beb5e6=\"\">\n\n\t\t\t\t\t\t<div class=\"clearfix mb-1\" v-show=\"current.users.length > 1\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"close\" aria-label=\"Close\" @click=\"current_users_remove($index)\" v-if=\"current.users.length > 1\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t<span aria-hidden=\"true\" _v-05beb5e6=\"\">×</span>\n\t\t\t\t\t\t\t</button>\n\n\t\t\t\t\t\t\t<span class=\"text-muted\" v-show=\"current.users.length > 1\" _v-05beb5e6=\"\">{{ $index + 1 }}</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"form-group row flex-items-sm-middle\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<label class=\"col-sm col-form-label\" for=\"username_{{ $index }}\" _v-05beb5e6=\"\">Username</label>\n\t\t\t\t\t\t\t<div class=\"col-sm\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"username_{{ $index }}\" data-index=\"{{ $index }}\" type=\"text\" placeholder=\"username\" @input=\"username_changed\" value=\"{{ $index || user.innopoints.data.isAdmin ? '' : user.account.username }}\" v-model=\"u.username\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"form-group row flex-items-sm-middle\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<label class=\"col-sm col-form-label\" for=\"activity_{{ $index }}\" _v-05beb5e6=\"\">Activity</label>\n\t\t\t\t\t\t\t<div class=\"col-sm\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t<select class=\"form-control\" :disabled=\"!categorySelected || !u.username\" id=\"activity_{{ $index }}\" v-model=\"u.activity_id\" @change=\"activity_changed\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t\t<option value=\"\" selected=\"\" _v-05beb5e6=\"\">Choose Activity</option>\n\t\t\t\t\t\t\t\t\t<option v-for=\"a in activities\" value=\"{{ a.id }}\" _v-05beb5e6=\"\">{{ a.title }}</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class=\"form-group row flex-items-sm-middle\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<label class=\"col-sm col-form-label\" for=\"amount_{{ $index }}\" _v-05beb5e6=\"\">Quantity</label>\n\t\t\t\t\t\t\t<div class=\"col-sm\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t<input class=\"form-control\" :disabled=\"!(!showAmount(u.activity_id) &amp;&amp; activitySelected)\" id=\"amount_{{ $index }}\" type=\"number\" value=\"1\" min=\"1\" max=\"365\" v-model=\"u.amount\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"form-group row flex-items-sm-middle mb-0\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<label class=\"col-sm col-form-label\" _v-05beb5e6=\"\">Innopoints</label>\n\t\t\t\t\t\t\t\t<div class=\"col-sm\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t\t<input class=\"form-control\" type=\"number\" value=\"0123456789\" readonly=\"\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\n\t\t\t\t<div class=\"clearfix mt-1\" _v-05beb5e6=\"\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-success float-xs-left\" @click=\"current_users_count_inc\" _v-05beb5e6=\"\">+ Add</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger float-xs-right\" @click=\"current_users_count_clear\" v-if=\"current.users.length > 1\" _v-05beb5e6=\"\">× Clear</button>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t</div>\n\n\t\t\t<div class=\"card-block\" _v-05beb5e6=\"\">\n\t\t\t\t<label for=\"upload\" _v-05beb5e6=\"\">\n\t\t\t\t\t<h4 _v-05beb5e6=\"\">Files</h4>\n\t\t\t\t</label>\n\t\t\t\t<div class=\"table-responsive\" _v-05beb5e6=\"\">\n\t\t\t\t\t<table class=\"table  table-striped table-bordered\" v-show=\"current.files.length\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t<thead _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<tr _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t<th class=\"text-xs-center\" _v-05beb5e6=\"\">#</th>\n\t\t\t\t\t\t\t\t<th class=\"text-xs-center\" _v-05beb5e6=\"\">Name</th>\n\t\t\t\t\t\t\t\t<th class=\"text-xs-center\" _v-05beb5e6=\"\">Type</th>\n\t\t\t\t\t\t\t\t<th class=\"text-xs-center\" _v-05beb5e6=\"\">Size</th>\n\t\t\t\t\t\t\t\t<th class=\"text-xs-center\" _v-05beb5e6=\"\">Remove</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t<tbody _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t<tr v-for=\"f in current.files\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t<th scope=\"row\" _v-05beb5e6=\"\">{{ $index + 1 }}\n\t\t\t\t\t\t\t\t</th><td _v-05beb5e6=\"\">{{ f.name }}</td>\n\t\t\t\t\t\t\t\t<td _v-05beb5e6=\"\">{{ f.type }}</td>\n\t\t\t\t\t\t\t\t<td class=\"text-xs-right\" _v-05beb5e6=\"\">{{ f.size }} KB</td>\n\t\t\t\t\t\t\t\t<td class=\"text-xs-center py-0\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"close float-xs-none\" aria-label=\"Remove File\" @click=\"removeFile($index)\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t\t\t\t\t<span aria-hidden=\"true\" _v-05beb5e6=\"\">×</span>\n\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"clearfix\" _v-05beb5e6=\"\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-success float-xs-left\" onclick=\"upload.click()\" _v-05beb5e6=\"\">+ Add</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-danger float-xs-right\" @click=\"current.files = []\" v-show=\"current.files.length\" _v-05beb5e6=\"\">× Clear</button>\n\t\t\t\t</div>\n\t\t\t\t<input id=\"upload\" type=\"file\" @change=\"uploaded\" multiple=\"\" _v-05beb5e6=\"\">\n\t\t\t</div> \n\n\t\t\t<div class=\"card-block\" _v-05beb5e6=\"\">\n\t\t\t\t<div class=\"form-group\" _v-05beb5e6=\"\">\n\t\t\t\t\t<label for=\"comment\" _v-05beb5e6=\"\">\n\t\t\t\t\t\t<h4 _v-05beb5e6=\"\">Comment</h4>\n\t\t\t\t\t</label>\n\t\t\t\t\t<textarea class=\"form-control\" id=\"comment\" placeholder=\"Write a comment\" v-model=\"current.comment\" rows=\"4\" _v-05beb5e6=\"\"></textarea>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"card-block\" _v-05beb5e6=\"\">\n\t\t\t\t<button class=\"btn btn-primary btn-lg btn-block\" :disabled=\"!activitySelected\" type=\"button\" @click=\"send\" id=\"send\" _v-05beb5e6=\"\">Send</button>\n\t\t\t\t<p class=\"mt-1 mb-0 text-xs-center\" v-show=\"!categorySelected\" _v-05beb5e6=\"\">Select Category</p>\n\t\t\t\t<p class=\"mt-1 mb-0 text-xs-center\" v-show=\"categorySelected &amp;&amp; !activitySelected\" _v-05beb5e6=\"\">Select Activities</p>\n\t\t\t</div>\n\n\t\t</form>\n\t</div>\n\n</div><!-- template wrap -->\n";

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(64)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\store\\main.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(65)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-304b079f/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	// 	<content>
	// 		<div content slot="header" flex align center>
	// 			<div class="container-fluid">
	// 				<div class="input-group">
	// 					<input class="form-control" type="search" id="search" search inline placeholder="Search store" v-model="$router.app.query" v-show="$route.path.endsWith('store')">
	// 					<span class="input-group-btn">
	// 						<button class="btn btn-secondary" type="button">🔍</button>
	// 					</span>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</content>
	// </template>
	//
	// <script>
	module.exports = {
		components: {
			content: __webpack_require__(24)
		}
	};
	// </script>

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "\n<content>\n\t<div content slot=\"header\" flex align center>\n\t\t<div class=\"container-fluid\">\n\t\t\t<div class=\"input-group\">\n\t\t\t\t<input class=\"form-control\" type=\"search\" id=\"search\" search inline placeholder=\"Search store\" v-model=\"$router.app.query\" v-show=\"$route.path.endsWith('store')\">\n\t\t\t\t<span class=\"input-group-btn\">\n\t\t\t\t\t<button class=\"btn btn-secondary\" type=\"button\">🔍</button>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</content>\n";

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(67)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\store\\store.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(71)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4f85f8eb/store.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _storage = __webpack_require__(11);

	var _storage2 = _interopRequireDefault(_storage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = {
		data: function data() {
			return {
				items: [],
				storage: _storage2.default
			};
		},
		components: {
			item: __webpack_require__(68)
		},
		route: {
			data: function data(transition) {
				var _cart = JSON.parse(_storage2.default.get('cart'));
				this.$router.app.user.innopoints.api.shop.getItems({
					successCallback: function successCallback(result) {
						result.forEach(function (item) {
							var arr = [];
							for (var option in item.options) {
								arr.push({ title: option, values: item.options[option] });
							}item.options = arr;
							console.log(item.options);
						});
						transition.next({
							items: result
						});
					}
				});
			}
		},
		methods: {
			buy: function buy(item) {
				console.log(item.selected);
				console.log(!!item.combinations.find(function (c) {
					return c.options.equals(item.selected.options);
				}));
				item.selected = {
					id: item.combinations.find(function (c) {
						return c.options.equals(item.selected.options);
					}).id
				};
				console.log(item.selected);
			}
		}
	};
	// </script>
	// <template>
	// 	<div class="container-fluid">
	// 		<section class="card-columns" shop>
	// 			<section class="card" product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
	// 				<item :item="item" :buy="buy"></item>
	// 			</section>
	//
	// 			<!-- For testing purposes-->
	// 			<section class="card" product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
	// 				<item :item="item">
	// 					<button type="button" class="btn btn-outline-primary btn-block" @click="buy(item)">Buy</button>
	// 				</item>
	// 			</section>
	// 			<section class="card" product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
	// 				<item :item="item">
	// 					<button type="button" class="btn btn-outline-primary btn-block" @click="buy(item)">Buy</button>
	// 				</item>
	// 			</section>
	// 			<section class="card" product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
	// 				<item :item="item">
	// 					<button type="button" class="btn btn-outline-primary btn-block" @click="buy(item)">Buy</button>
	// 				</item>
	// 			</section>
	// 			<section class="card" product v-for="item in items | filterBy $router.app.query in 'title' 'price' 'category.title' ">
	// 				<item :item="item">
	// 					<button type="button" class="btn btn-outline-primary btn-block" @click="buy(item)">Buy</button>
	// 				</item>
	// 			</section>
	//
	// 		</section>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(69)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\views\\store\\item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(70)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-76fb3ff9/item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	// <template>
	// 	<div>
	// 		<img class="card-img-top" src="http://lorempixel.com/{{ Math.floor(Math.random() * 4 + 2) * 100 }}/{{ Math.floor(Math.random() * 4 + 2) * 100 }}/food" alt="">
	// 		<div class="card-block">
	// 			<h4 class="card-title">{{ item.title }} <span class="tag tag-default float-xs-right">{{ item.price }}</span></h4> 
	// 			<h5 class="card-subtitle text-muted mb-1">{{ item.category.title }}</h5>
	// 			<p class="card-text" v-show="item.possible_joint_purchase">This item can be bought by a group of {{ item.max_buyers }}!</p>
	// 			<div class="form-group" v-for="option in item.options">
	// 				<select class="form-control" :name="option.title" :id="option.title" :data-index="$index" @change="onselect(item, $event)">
	// 					<option value="">Choose {{option.title}}</option>
	// 					<option v-for="value in option.values" :value="value">{{ value }}</option>
	// 				</select>
	// 			</div>
	// 			<div :id="item.title" controls>
	// 				<button type="button" class="btn btn-outline-primary btn-block" @click="buy(item)">Buy</button>
	// 			</div>
	// 		</div>
	// 	</div>
	// </template>
	//
	// <script>
	module.exports = {
		props: ['item', 'buy'],
		methods: {
			onselect: function onselect(item, e) {
				if (!item.selected || !item.selected.options) item.selected = { options: {} };

				if (e.target.value !== "") item.selected.options[e.target.name] = e.target.value;else delete item.selected.options[e.target.name];

				if (Object.keys(item.selected.options).length == item.options.length) document.getElementById(item.title).style.display = "block";else document.getElementById(item.title).style.display = "none";
			}
		}
	};
	// </script>

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\t<img class=\"card-img-top\" src=\"http://lorempixel.com/{{ Math.floor(Math.random() * 4 + 2) * 100 }}/{{ Math.floor(Math.random() * 4 + 2) * 100 }}/food\" alt=\"\">\n\t<div class=\"card-block\">\n\t\t<h4 class=\"card-title\">{{ item.title }} <span class=\"tag tag-default float-xs-right\">{{ item.price }}</span></h4> \n\t\t<h5 class=\"card-subtitle text-muted mb-1\">{{ item.category.title }}</h5>\n\t\t<p class=\"card-text\" v-show=\"item.possible_joint_purchase\">This item can be bought by a group of {{ item.max_buyers }}!</p>\n\t\t<div class=\"form-group\" v-for=\"option in item.options\">\n\t\t\t<select class=\"form-control\" :name=\"option.title\" :id=\"option.title\" :data-index=\"$index\" @change=\"onselect(item, $event)\">\n\t\t\t\t<option value=\"\">Choose {{option.title}}</option>\n\t\t\t\t<option v-for=\"value in option.values\" :value=\"value\">{{ value }}</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div :id=\"item.title\" controls>\n\t\t\t<button type=\"button\" class=\"btn btn-outline-primary btn-block\" @click=\"buy(item)\">Buy</button>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"container-fluid\">\n\t<section class=\"card-columns\" shop>\n\t\t<section class=\"card\" product v-for=\"item in items | filterBy $router.app.query in 'title' 'price' 'category.title' \">\n\t\t\t<item :item=\"item\" :buy=\"buy\"></item>\n\t\t</section>\n\n\t\t<!-- For testing purposes-->\n\t\t<section class=\"card\" product v-for=\"item in items | filterBy $router.app.query in 'title' 'price' 'category.title' \">\n\t\t\t<item :item=\"item\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-outline-primary btn-block\" @click=\"buy(item)\">Buy</button>\n\t\t\t</item>\n\t\t</section>\n\t\t<section class=\"card\" product v-for=\"item in items | filterBy $router.app.query in 'title' 'price' 'category.title' \">\n\t\t\t<item :item=\"item\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-outline-primary btn-block\" @click=\"buy(item)\">Buy</button>\n\t\t\t</item>\n\t\t</section>\n\t\t<section class=\"card\" product v-for=\"item in items | filterBy $router.app.query in 'title' 'price' 'category.title' \">\n\t\t\t<item :item=\"item\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-outline-primary btn-block\" @click=\"buy(item)\">Buy</button>\n\t\t\t</item>\n\t\t</section>\n\t\t<section class=\"card\" product v-for=\"item in items | filterBy $router.app.query in 'title' 'price' 'category.title' \">\n\t\t\t<item :item=\"item\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-outline-primary btn-block\" @click=\"buy(item)\">Buy</button>\n\t\t\t</item>\n\t\t</section>\n\n\t</section>\n</div>\n";

/***/ },
/* 72 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);