(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MP3Tag = factory());
})(this, (function () { 'use strict';

  function ownKeys$2(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$2(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var check = function (it) {
    return it && it.Math === Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global$w =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || commonjsGlobal || Function('return this')();

  var objectGetOwnPropertyDescriptor = {};

  var fails$C = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$B = fails$C;

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails$B(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] !== 7;
  });

  var fails$A = fails$C;
  var functionBindNative = !fails$A(function () {
    // eslint-disable-next-line es/no-function-prototype-bind -- safe
    var test = function () {/* empty */}.bind();
    // eslint-disable-next-line no-prototype-builtins -- safe
    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;
  var call$m = Function.prototype.call;
  var functionCall = NATIVE_BIND$3 ? call$m.bind(call$m) : function () {
    return call$m.apply(call$m, arguments);
  };

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({
    1: 2
  }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  } : $propertyIsEnumerable$1;

  var createPropertyDescriptor$6 = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var NATIVE_BIND$2 = functionBindNative;
  var FunctionPrototype$2 = Function.prototype;
  var call$l = FunctionPrototype$2.call;
  var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$l, call$l);
  var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
    return function () {
      return call$l.apply(fn, arguments);
    };
  };

  var uncurryThis$D = functionUncurryThis;
  var toString$i = uncurryThis$D({}.toString);
  var stringSlice$7 = uncurryThis$D(''.slice);
  var classofRaw$2 = function (it) {
    return stringSlice$7(toString$i(it), 8, -1);
  };

  var uncurryThis$C = functionUncurryThis;
  var fails$z = fails$C;
  var classof$f = classofRaw$2;
  var $Object$4 = Object;
  var split = uncurryThis$C(''.split);

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails$z(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$f(it) === 'String' ? split(it, '') : $Object$4(it);
  } : $Object$4;

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined$6 = function (it) {
    return it === null || it === undefined;
  };

  var isNullOrUndefined$5 = isNullOrUndefined$6;
  var $TypeError$g = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible$8 = function (it) {
    if (isNullOrUndefined$5(it)) throw $TypeError$g("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings
  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$8;
  var toIndexedObject$a = function (it) {
    return IndexedObject$2(requireObjectCoercible$7(it));
  };

  var documentAll$2 = typeof document == 'object' && document.all;

  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;
  var documentAll_1 = {
    all: documentAll$2,
    IS_HTMLDDA: IS_HTMLDDA
  };

  var $documentAll$1 = documentAll_1;
  var documentAll$1 = $documentAll$1.all;

  // `IsCallable` abstract operation
  // https://tc39.es/ecma262/#sec-iscallable
  var isCallable$o = $documentAll$1.IS_HTMLDDA ? function (argument) {
    return typeof argument == 'function' || argument === documentAll$1;
  } : function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$n = isCallable$o;
  var $documentAll = documentAll_1;
  var documentAll = $documentAll.all;
  var isObject$e = $documentAll.IS_HTMLDDA ? function (it) {
    return typeof it == 'object' ? it !== null : isCallable$n(it) || it === documentAll;
  } : function (it) {
    return typeof it == 'object' ? it !== null : isCallable$n(it);
  };

  var global$v = global$w;
  var isCallable$m = isCallable$o;
  var aFunction = function (argument) {
    return isCallable$m(argument) ? argument : undefined;
  };
  var getBuiltIn$8 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$v[namespace]) : global$v[namespace] && global$v[namespace][method];
  };

  var uncurryThis$B = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$B({}.isPrototypeOf);

  var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

  var global$u = global$w;
  var userAgent$2 = engineUserAgent;
  var process = global$u.process;
  var Deno = global$u.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;
  if (v8) {
    match = v8.split('.');
    // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  }

  // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  // so check `userAgent` even if `.v8` exists, but 0
  if (!version && userAgent$2) {
    match = userAgent$2.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = userAgent$2.match(/Chrome\/(\d+)/);
      if (match) version = +match[1];
    }
  }
  var engineV8Version = version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$y = fails$C;
  var global$t = global$w;
  var $String$6 = global$t.String;

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$y(function () {
    var symbol = Symbol('symbol detection');
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$6(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$6 = symbolConstructorDetection;
  var useSymbolAsUid = NATIVE_SYMBOL$6 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var getBuiltIn$7 = getBuiltIn$8;
  var isCallable$l = isCallable$o;
  var isPrototypeOf$7 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var $Object$3 = Object;
  var isSymbol$5 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$7('Symbol');
    return isCallable$l($Symbol) && isPrototypeOf$7($Symbol.prototype, $Object$3(it));
  };

  var $String$5 = String;
  var tryToString$6 = function (argument) {
    try {
      return $String$5(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var isCallable$k = isCallable$o;
  var tryToString$5 = tryToString$6;
  var $TypeError$f = TypeError;

  // `Assert: IsCallable(argument) is true`
  var aCallable$7 = function (argument) {
    if (isCallable$k(argument)) return argument;
    throw $TypeError$f(tryToString$5(argument) + ' is not a function');
  };

  var aCallable$6 = aCallable$7;
  var isNullOrUndefined$4 = isNullOrUndefined$6;

  // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod
  var getMethod$5 = function (V, P) {
    var func = V[P];
    return isNullOrUndefined$4(func) ? undefined : aCallable$6(func);
  };

  var call$k = functionCall;
  var isCallable$j = isCallable$o;
  var isObject$d = isObject$e;
  var $TypeError$e = TypeError;

  // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive
  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$j(fn = input.toString) && !isObject$d(val = call$k(fn, input))) return val;
    if (isCallable$j(fn = input.valueOf) && !isObject$d(val = call$k(fn, input))) return val;
    if (pref !== 'string' && isCallable$j(fn = input.toString) && !isObject$d(val = call$k(fn, input))) return val;
    throw $TypeError$e("Can't convert object to primitive value");
  };

  var shared$7 = {exports: {}};

  var global$s = global$w;

  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$7 = Object.defineProperty;
  var defineGlobalProperty$3 = function (key, value) {
    try {
      defineProperty$7(global$s, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$s[key] = value;
    }
    return value;
  };

  var global$r = global$w;
  var defineGlobalProperty$2 = defineGlobalProperty$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$r[SHARED] || defineGlobalProperty$2(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$7.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.32.2',
    mode: 'global',
    copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.32.2/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });
  var sharedExports = shared$7.exports;

  var requireObjectCoercible$6 = requireObjectCoercible$8;
  var $Object$2 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject$c = function (argument) {
    return $Object$2(requireObjectCoercible$6(argument));
  };

  var uncurryThis$A = functionUncurryThis;
  var toObject$b = toObject$c;
  var hasOwnProperty = uncurryThis$A({}.hasOwnProperty);

  // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty
  // eslint-disable-next-line es/no-object-hasown -- safe
  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$b(it), key);
  };

  var uncurryThis$z = functionUncurryThis;
  var id = 0;
  var postfix = Math.random();
  var toString$h = uncurryThis$z(1.0.toString);
  var uid$4 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$h(++id + postfix, 36);
  };

  var global$q = global$w;
  var shared$6 = sharedExports;
  var hasOwn$h = hasOwnProperty_1;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$5 = symbolConstructorDetection;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var Symbol$3 = global$q.Symbol;
  var WellKnownSymbolsStore$1 = shared$6('wks');
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$3;
  var wellKnownSymbol$q = function (name) {
    if (!hasOwn$h(WellKnownSymbolsStore$1, name)) {
      WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$5 && hasOwn$h(Symbol$3, name) ? Symbol$3[name] : createWellKnownSymbol('Symbol.' + name);
    }
    return WellKnownSymbolsStore$1[name];
  };

  var call$j = functionCall;
  var isObject$c = isObject$e;
  var isSymbol$4 = isSymbol$5;
  var getMethod$4 = getMethod$5;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$p = wellKnownSymbol$q;
  var $TypeError$d = TypeError;
  var TO_PRIMITIVE = wellKnownSymbol$p('toPrimitive');

  // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  var toPrimitive$2 = function (input, pref) {
    if (!isObject$c(input) || isSymbol$4(input)) return input;
    var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$j(exoticToPrim, input, pref);
      if (!isObject$c(result) || isSymbol$4(result)) return result;
      throw $TypeError$d("Can't convert object to primitive value");
    }
    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive$1 = toPrimitive$2;
  var isSymbol$3 = isSymbol$5;

  // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey
  var toPropertyKey$5 = function (argument) {
    var key = toPrimitive$1(argument, 'string');
    return isSymbol$3(key) ? key : key + '';
  };

  var global$p = global$w;
  var isObject$b = isObject$e;
  var document$1 = global$p.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS$1 = isObject$b(document$1) && isObject$b(document$1.createElement);
  var documentCreateElement$2 = function (it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$i = descriptors;
  var fails$x = fails$C;
  var createElement = documentCreateElement$2;

  // Thanks to IE8 for its funny defineProperty
  var ie8DomDefine = !DESCRIPTORS$i && !fails$x(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a !== 7;
  });

  var DESCRIPTORS$h = descriptors;
  var call$i = functionCall;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$5 = createPropertyDescriptor$6;
  var toIndexedObject$9 = toIndexedObject$a;
  var toPropertyKey$4 = toPropertyKey$5;
  var hasOwn$g = hasOwnProperty_1;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;

  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$h ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$9(O);
    P = toPropertyKey$4(P);
    if (IE8_DOM_DEFINE$1) try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) {/* empty */}
    if (hasOwn$g(O, P)) return createPropertyDescriptor$5(!call$i(propertyIsEnumerableModule$1.f, O, P), O[P]);
  };

  var objectDefineProperty = {};

  var DESCRIPTORS$g = descriptors;
  var fails$w = fails$C;

  // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
  var v8PrototypeDefineBug = DESCRIPTORS$g && fails$w(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () {/* empty */}, 'prototype', {
      value: 42,
      writable: false
    }).prototype !== 42;
  });

  var isObject$a = isObject$e;
  var $String$4 = String;
  var $TypeError$c = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject$h = function (argument) {
    if (isObject$a(argument)) return argument;
    throw $TypeError$c($String$4(argument) + ' is not an object');
  };

  var DESCRIPTORS$f = descriptors;
  var IE8_DOM_DEFINE = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$g = anObject$h;
  var toPropertyKey$3 = toPropertyKey$5;
  var $TypeError$b = TypeError;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var $defineProperty$1 = Object.defineProperty;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE$1 = 'configurable';
  var WRITABLE = 'writable';

  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  objectDefineProperty.f = DESCRIPTORS$f ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$g(O);
    P = toPropertyKey$3(P);
    anObject$g(Attributes);
    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$1(O, P);
      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    }
    return $defineProperty$1(O, P, Attributes);
  } : $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$g(O);
    P = toPropertyKey$3(P);
    anObject$g(Attributes);
    if (IE8_DOM_DEFINE) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {/* empty */}
    if ('get' in Attributes || 'set' in Attributes) throw $TypeError$b('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$e = descriptors;
  var definePropertyModule$6 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$9 = DESCRIPTORS$e ? function (object, key, value) {
    return definePropertyModule$6.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var makeBuiltIn$3 = {exports: {}};

  var DESCRIPTORS$d = descriptors;
  var hasOwn$f = hasOwnProperty_1;
  var FunctionPrototype$1 = Function.prototype;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getDescriptor = DESCRIPTORS$d && Object.getOwnPropertyDescriptor;
  var EXISTS = hasOwn$f(FunctionPrototype$1, 'name');
  // additional protection from minified / mangled / dropped function names
  var PROPER = EXISTS && function something() {/* empty */}.name === 'something';
  var CONFIGURABLE = EXISTS && (!DESCRIPTORS$d || DESCRIPTORS$d && getDescriptor(FunctionPrototype$1, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
  };

  var uncurryThis$y = functionUncurryThis;
  var isCallable$i = isCallable$o;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$y(Function.toString);

  // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  if (!isCallable$i(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }
  var inspectSource$2 = store$1.inspectSource;

  var global$o = global$w;
  var isCallable$h = isCallable$o;
  var WeakMap$1 = global$o.WeakMap;
  var weakMapBasicDetection = isCallable$h(WeakMap$1) && /native code/.test(String(WeakMap$1));

  var shared$5 = sharedExports;
  var uid$2 = uid$4;
  var keys$2 = shared$5('keys');
  var sharedKey$4 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$2(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP = weakMapBasicDetection;
  var global$n = global$w;
  var isObject$9 = isObject$e;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$9;
  var hasOwn$e = hasOwnProperty_1;
  var shared$4 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$4 = hiddenKeys$5;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$3 = global$n.TypeError;
  var WeakMap = global$n.WeakMap;
  var set$1, get$1, has;
  var enforce = function (it) {
    return has(it) ? get$1(it) : set$1(it, {});
  };
  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject$9(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
      }
      return state;
    };
  };
  if (NATIVE_WEAK_MAP || shared$4.state) {
    var store = shared$4.state || (shared$4.state = new WeakMap());
    /* eslint-disable no-self-assign -- prototype methods protection */
    store.get = store.get;
    store.has = store.has;
    store.set = store.set;
    /* eslint-enable no-self-assign -- prototype methods protection */
    set$1 = function (it, metadata) {
      if (store.has(it)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      store.set(it, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return store.get(it) || {};
    };
    has = function (it) {
      return store.has(it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$4[STATE] = true;
    set$1 = function (it, metadata) {
      if (hasOwn$e(it, STATE)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$8(it, STATE, metadata);
      return metadata;
    };
    get$1 = function (it) {
      return hasOwn$e(it, STATE) ? it[STATE] : {};
    };
    has = function (it) {
      return hasOwn$e(it, STATE);
    };
  }
  var internalState = {
    set: set$1,
    get: get$1,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var uncurryThis$x = functionUncurryThis;
  var fails$v = fails$C;
  var isCallable$g = isCallable$o;
  var hasOwn$d = hasOwnProperty_1;
  var DESCRIPTORS$c = descriptors;
  var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
  var inspectSource$1 = inspectSource$2;
  var InternalStateModule$6 = internalState;
  var enforceInternalState$3 = InternalStateModule$6.enforce;
  var getInternalState$7 = InternalStateModule$6.get;
  var $String$3 = String;
  // eslint-disable-next-line es/no-object-defineproperty -- safe
  var defineProperty$6 = Object.defineProperty;
  var stringSlice$6 = uncurryThis$x(''.slice);
  var replace$6 = uncurryThis$x(''.replace);
  var join$1 = uncurryThis$x([].join);
  var CONFIGURABLE_LENGTH = DESCRIPTORS$c && !fails$v(function () {
    return defineProperty$6(function () {/* empty */}, 'length', {
      value: 8
    }).length !== 8;
  });
  var TEMPLATE = String(String).split('String');
  var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
    if (stringSlice$6($String$3(name), 0, 7) === 'Symbol(') {
      name = '[' + replace$6($String$3(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
    }
    if (options && options.getter) name = 'get ' + name;
    if (options && options.setter) name = 'set ' + name;
    if (!hasOwn$d(value, 'name') || CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name) {
      if (DESCRIPTORS$c) defineProperty$6(value, 'name', {
        value: name,
        configurable: true
      });else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$d(options, 'arity') && value.length !== options.arity) {
      defineProperty$6(value, 'length', {
        value: options.arity
      });
    }
    try {
      if (options && hasOwn$d(options, 'constructor') && options.constructor) {
        if (DESCRIPTORS$c) defineProperty$6(value, 'prototype', {
          writable: false
        });
        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
      } else if (value.prototype) value.prototype = undefined;
    } catch (error) {/* empty */}
    var state = enforceInternalState$3(value);
    if (!hasOwn$d(state, 'source')) {
      state.source = join$1(TEMPLATE, typeof name == 'string' ? name : '');
    }
    return value;
  };

  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  // eslint-disable-next-line no-extend-native -- required
  Function.prototype.toString = makeBuiltIn$2(function toString() {
    return isCallable$g(this) && getInternalState$7(this).source || inspectSource$1(this);
  }, 'toString');
  var makeBuiltInExports = makeBuiltIn$3.exports;

  var isCallable$f = isCallable$o;
  var definePropertyModule$5 = objectDefineProperty;
  var makeBuiltIn$1 = makeBuiltInExports;
  var defineGlobalProperty$1 = defineGlobalProperty$3;
  var defineBuiltIn$c = function (O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== undefined ? options.name : key;
    if (isCallable$f(value)) makeBuiltIn$1(value, name, options);
    if (options.global) {
      if (simple) O[key] = value;else defineGlobalProperty$1(key, value);
    } else {
      try {
        if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
      } catch (error) {/* empty */}
      if (simple) O[key] = value;else definePropertyModule$5.f(O, key, {
        value: value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
    }
    return O;
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$5 = Math.floor;

  // `Math.trunc` method
  // https://tc39.es/ecma262/#sec-math.trunc
  // eslint-disable-next-line es/no-math-trunc -- safe
  var mathTrunc = Math.trunc || function trunc(x) {
    var n = +x;
    return (n > 0 ? floor$5 : ceil)(n);
  };

  var trunc$1 = mathTrunc;

  // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity
  var toIntegerOrInfinity$8 = function (argument) {
    var number = +argument;
    // eslint-disable-next-line no-self-compare -- NaN check
    return number !== number || number === 0 ? 0 : trunc$1(number);
  };

  var toIntegerOrInfinity$7 = toIntegerOrInfinity$8;
  var max$3 = Math.max;
  var min$5 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex$7 = function (index, length) {
    var integer = toIntegerOrInfinity$7(index);
    return integer < 0 ? max$3(integer + length, 0) : min$5(integer, length);
  };

  var toIntegerOrInfinity$6 = toIntegerOrInfinity$8;
  var min$4 = Math.min;

  // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength
  var toLength$9 = function (argument) {
    return argument > 0 ? min$4(toIntegerOrInfinity$6(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$8 = toLength$9;

  // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike
  var lengthOfArrayLike$f = function (obj) {
    return toLength$8(obj.length);
  };

  var toIndexedObject$8 = toIndexedObject$a;
  var toAbsoluteIndex$6 = toAbsoluteIndex$7;
  var lengthOfArrayLike$e = lengthOfArrayLike$f;

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$4 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$8($this);
      var length = lengthOfArrayLike$e(O);
      var index = toAbsoluteIndex$6(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check
      if (IS_INCLUDES && el !== el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };
  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$4(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$4(false)
  };

  var uncurryThis$w = functionUncurryThis;
  var hasOwn$c = hasOwnProperty_1;
  var toIndexedObject$7 = toIndexedObject$a;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;
  var push$4 = uncurryThis$w([].push);
  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$7(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$c(hiddenKeys$3, key) && hasOwn$c(O, key) && push$4(result, key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (hasOwn$c(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$4(result, key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$6 = getBuiltIn$8;
  var uncurryThis$v = functionUncurryThis;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
  var anObject$f = anObject$h;
  var concat$1 = uncurryThis$v([].concat);

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn$6('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$f(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$2.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$b = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$4 = objectDefineProperty;
  var copyConstructorProperties$2 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$4.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!hasOwn$b(target, key) && !(exceptions && hasOwn$b(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$u = fails$C;
  var isCallable$e = isCallable$o;
  var replacement = /#|\.prototype\./;
  var isForced$2 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable$e(detection) ? fails$u(detection) : !!detection;
  };
  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };
  var data = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';
  var isForced_1 = isForced$2;

  var global$m = global$w;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$9;
  var defineBuiltIn$b = defineBuiltIn$c;
  var defineGlobalProperty = defineGlobalProperty$3;
  var copyConstructorProperties$1 = copyConstructorProperties$2;
  var isForced$1 = isForced_1;

  /*
    options.target         - name of the target object
    options.global         - target is the global object
    options.stat           - export as static methods of target
    options.proto          - export as prototype methods of target
    options.real           - real prototype method for the `pure` version
    options.forced         - export even if the native feature is available
    options.bind           - bind methods to the target, required for the `pure` version
    options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe         - use the simple assignment of property instead of delete + defineProperty
    options.sham           - add a flag to not completely full polyfills
    options.enumerable     - export as enumerable property
    options.dontCallGetSet - prevent calling a getter on target
    options.name           - the .name of the function if it does not match the key
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global$m;
    } else if (STATIC) {
      target = global$m[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
      target = (global$m[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$7(sourceProperty, 'sham', true);
      }
      defineBuiltIn$b(target, key, sourceProperty, options);
    }
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3;

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$b = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$3 = objectDefineProperty;
  var anObject$e = anObject$h;
  var toIndexedObject$6 = toIndexedObject$a;
  var objectKeys$1 = objectKeys$2;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  objectDefineProperties.f = DESCRIPTORS$b && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$e(O);
    var props = toIndexedObject$6(Properties);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) definePropertyModule$3.f(O, key = keys[index++], props[key]);
    return O;
  };

  var $$r = _export;
  var DESCRIPTORS$a = descriptors;
  var defineProperties = objectDefineProperties.f;

  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe
  $$r({
    target: 'Object',
    stat: true,
    forced: Object.defineProperties !== defineProperties,
    sham: !DESCRIPTORS$a
  }, {
    defineProperties: defineProperties
  });

  var classof$e = classofRaw$2;

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray$6 = Array.isArray || function isArray(argument) {
    return classof$e(argument) === 'Array';
  };

  var $$q = _export;
  var isArray$5 = isArray$6;

  // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray
  $$q({
    target: 'Array',
    stat: true
  }, {
    isArray: isArray$5
  });

  var getBuiltIn$5 = getBuiltIn$8;
  var html$1 = getBuiltIn$5('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$d = anObject$h;
  var definePropertiesModule$1 = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$1 = hiddenKeys$5;
  var html = html$1;
  var documentCreateElement$1 = documentCreateElement$2;
  var sharedKey$2 = sharedKey$4;
  var GT = '>';
  var LT = '<';
  var PROTOTYPE$2 = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO$1 = sharedKey$2('IE_PROTO');
  var EmptyConstructor = function () {/* empty */};
  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {/* ignore */}
    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
    return NullProtoObject();
  };
  hiddenKeys$1[IE_PROTO$1] = true;

  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  // eslint-disable-next-line es/no-object-create -- safe
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE$2] = anObject$d(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$2] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
  };

  var wellKnownSymbol$o = wellKnownSymbol$q;
  var create$3 = objectCreate;
  var defineProperty$5 = objectDefineProperty.f;
  var UNSCOPABLES = wellKnownSymbol$o('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] === undefined) {
    defineProperty$5(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$3(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables$3 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$t = fails$C;
  var correctPrototypeGetter = !fails$t(function () {
    function F() {/* empty */}
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var hasOwn$a = hasOwnProperty_1;
  var isCallable$d = isCallable$o;
  var toObject$a = toObject$c;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey$1('IE_PROTO');
  var $Object$1 = Object;
  var ObjectPrototype$3 = $Object$1.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
    var object = toObject$a(O);
    if (hasOwn$a(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$d(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }
    return object instanceof $Object$1 ? ObjectPrototype$3 : null;
  };

  var fails$s = fails$C;
  var isCallable$c = isCallable$o;
  var isObject$8 = isObject$e;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var defineBuiltIn$a = defineBuiltIn$c;
  var wellKnownSymbol$n = wellKnownSymbol$q;
  var ITERATOR$7 = wellKnownSymbol$n('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }
  var NEW_ITERATOR_PROTOTYPE = !isObject$8(IteratorPrototype$2) || fails$s(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable$c(IteratorPrototype$2[ITERATOR$7])) {
    defineBuiltIn$a(IteratorPrototype$2, ITERATOR$7, function () {
      return this;
    });
  }
  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$4 = objectDefineProperty.f;
  var hasOwn$9 = hasOwnProperty_1;
  var wellKnownSymbol$m = wellKnownSymbol$q;
  var TO_STRING_TAG$3 = wellKnownSymbol$m('toStringTag');
  var setToStringTag$4 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$9(target, TO_STRING_TAG$3)) {
      defineProperty$4(target, TO_STRING_TAG$3, {
        configurable: true,
        value: TAG
      });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$2 = objectCreate;
  var createPropertyDescriptor$3 = createPropertyDescriptor$6;
  var setToStringTag$3 = setToStringTag$4;
  var Iterators$4 = iterators;
  var returnThis$1 = function () {
    return this;
  };
  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$2(IteratorPrototype$1, {
      next: createPropertyDescriptor$3(+!ENUMERABLE_NEXT, next)
    });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var uncurryThis$u = functionUncurryThis;
  var aCallable$5 = aCallable$7;
  var functionUncurryThisAccessor = function (object, key, method) {
    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return uncurryThis$u(aCallable$5(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) {/* empty */}
  };

  var isCallable$b = isCallable$o;
  var $String$2 = String;
  var $TypeError$a = TypeError;
  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$b(argument)) return argument;
    throw $TypeError$a("Can't set " + $String$2(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThisAccessor = functionUncurryThisAccessor;
  var anObject$c = anObject$h;
  var aPossiblePrototype = aPossiblePrototype$1;

  // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {/* empty */}
    return function setPrototypeOf(O, proto) {
      anObject$c(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$p = _export;
  var call$h = functionCall;
  var FunctionName$1 = functionName;
  var isCallable$a = isCallable$o;
  var createIteratorConstructor = iteratorCreateConstructor;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var setPrototypeOf$4 = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$4;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$9;
  var defineBuiltIn$9 = defineBuiltIn$c;
  var wellKnownSymbol$l = wellKnownSymbol$q;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;
  var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$6 = wellKnownSymbol$l('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';
  var returnThis = function () {
    return this;
  };
  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);
    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS:
          return function keys() {
            return new IteratorConstructor(this, KIND);
          };
        case VALUES:
          return function values() {
            return new IteratorConstructor(this, KIND);
          };
        case ENTRIES:
          return function entries() {
            return new IteratorConstructor(this, KIND);
          };
      }
      return function () {
        return new IteratorConstructor(this);
      };
    };
    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$6] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$4) {
            setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$a(CurrentIteratorPrototype[ITERATOR$6])) {
            defineBuiltIn$9(CurrentIteratorPrototype, ITERATOR$6, returnThis);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME$2 && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$1) {
        createNonEnumerableProperty$6(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() {
          return call$h(nativeIterator, this);
        };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$9(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$p({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    }

    // define iterator
    if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
      defineBuiltIn$9(IterablePrototype, ITERATOR$6, defaultIterator, {
        name: DEFAULT
      });
    }
    Iterators$3[NAME] = defaultIterator;
    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject$2 = function (value, done) {
    return {
      value: value,
      done: done
    };
  };

  var toIndexedObject$5 = toIndexedObject$a;
  var addToUnscopables$2 = addToUnscopables$3;
  var Iterators$2 = iterators;
  var InternalStateModule$5 = internalState;
  var defineProperty$3 = objectDefineProperty.f;
  var defineIterator$1 = iteratorDefine;
  var createIterResultObject$1 = createIterResultObject$2;
  var DESCRIPTORS$9 = descriptors;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$4 = InternalStateModule$5.set;
  var getInternalState$6 = InternalStateModule$5.getterFor(ARRAY_ITERATOR);

  // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator
  var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
    setInternalState$4(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$5(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind
    });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$6(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return createIterResultObject$1(undefined, true);
    }
    switch (kind) {
      case 'keys':
        return createIterResultObject$1(index, false);
      case 'values':
        return createIterResultObject$1(target[index], false);
    }
    return createIterResultObject$1([index, target[index]], false);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject
  var values = Iterators$2.Arguments = Iterators$2.Array;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$2('keys');
  addToUnscopables$2('values');
  addToUnscopables$2('entries');

  // V8 ~ Chrome 45- bug
  if (DESCRIPTORS$9 && values.name !== 'values') try {
    defineProperty$3(values, 'name', {
      value: 'values'
    });
  } catch (error) {/* empty */}

  var classofRaw$1 = classofRaw$2;
  var uncurryThis$t = functionUncurryThis;
  var functionUncurryThisClause = function (fn) {
    // Nashorn bug:
    //   https://github.com/zloirock/core-js/issues/1128
    //   https://github.com/zloirock/core-js/issues/1130
    if (classofRaw$1(fn) === 'Function') return uncurryThis$t(fn);
  };

  // eslint-disable-next-line es/no-typed-arrays -- safe
  var arrayBufferBasicDetection = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var makeBuiltIn = makeBuiltInExports;
  var defineProperty$2 = objectDefineProperty;
  var defineBuiltInAccessor$8 = function (target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, {
      getter: true
    });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, {
      setter: true
    });
    return defineProperty$2.f(target, name, descriptor);
  };

  var defineBuiltIn$8 = defineBuiltIn$c;
  var defineBuiltIns$1 = function (target, src, options) {
    for (var key in src) defineBuiltIn$8(target, key, src[key], options);
    return target;
  };

  var isPrototypeOf$6 = objectIsPrototypeOf;
  var $TypeError$9 = TypeError;
  var anInstance$2 = function (it, Prototype) {
    if (isPrototypeOf$6(Prototype, it)) return it;
    throw $TypeError$9('Incorrect invocation');
  };

  var toIntegerOrInfinity$5 = toIntegerOrInfinity$8;
  var toLength$7 = toLength$9;
  var $RangeError$2 = RangeError;

  // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex
  var toIndex$2 = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity$5(it);
    var length = toLength$7(number);
    if (number !== length) throw $RangeError$2('Wrong length or index');
    return length;
  };

  // `Math.sign` method implementation
  // https://tc39.es/ecma262/#sec-math.sign
  // eslint-disable-next-line es/no-math-sign -- safe
  var mathSign = Math.sign || function sign(x) {
    var n = +x;
    // eslint-disable-next-line no-self-compare -- NaN check
    return n === 0 || n !== n ? n : n < 0 ? -1 : 1;
  };

  // IEEE754 conversions based on https://github.com/feross/ieee754
  var sign = mathSign;
  var trunc = mathTrunc;
  var $Array$4 = Array;
  var abs = Math.abs;
  var pow = Math.pow;
  var floor$4 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;
  var roundToEven = function (number) {
    var truncated = trunc(number);
    var delta = abs(number - truncated);
    if (delta > 0.5 || delta === 0.5 && truncated % 2 !== 0) {
      return truncated + sign(number);
    }
    return truncated;
  };
  var pack = function (number, mantissaLength, bytes) {
    var buffer = $Array$4(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var s = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs(number);
    // eslint-disable-next-line no-self-compare -- NaN check
    if (number !== number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number !== number ? 1 : 0;
      exponent = eMax;
    } else {
      exponent = floor$4(log(number) / LN2);
      c = pow(2, -exponent);
      if (number * c < 1) {
        exponent--;
        c *= 2;
      }
      if (exponent + eBias >= 1) {
        number += rt / c;
      } else {
        number += rt * pow(2, 1 - eBias);
      }
      if (number * c >= 2) {
        exponent++;
        c /= 2;
      }
      if (exponent + eBias >= eMax) {
        mantissa = 0;
        exponent = eMax;
      } else if (exponent + eBias >= 1) {
        mantissa = roundToEven((number * c - 1) * pow(2, mantissaLength));
        exponent += eBias;
      } else {
        mantissa = roundToEven(number * pow(2, eBias - 1) * pow(2, mantissaLength));
        exponent = 0;
      }
    }
    while (mantissaLength >= 8) {
      buffer[index++] = mantissa & 255;
      mantissa /= 256;
      mantissaLength -= 8;
    }
    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;
    while (exponentLength > 0) {
      buffer[index++] = exponent & 255;
      exponent /= 256;
      exponentLength -= 8;
    }
    buffer[--index] |= s * 128;
    return buffer;
  };
  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var s = buffer[index--];
    var exponent = s & 127;
    var mantissa;
    s >>= 7;
    while (nBits > 0) {
      exponent = exponent * 256 + buffer[index--];
      nBits -= 8;
    }
    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;
    while (nBits > 0) {
      mantissa = mantissa * 256 + buffer[index--];
      nBits -= 8;
    }
    if (exponent === 0) {
      exponent = 1 - eBias;
    } else if (exponent === eMax) {
      return mantissa ? NaN : s ? -Infinity : Infinity;
    } else {
      mantissa += pow(2, mantissaLength);
      exponent -= eBias;
    }
    return (s ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
  };
  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  var toObject$9 = toObject$c;
  var toAbsoluteIndex$5 = toAbsoluteIndex$7;
  var lengthOfArrayLike$d = lengthOfArrayLike$f;

  // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill
  var arrayFill$1 = function fill(value /* , start = 0, end = @length */) {
    var O = toObject$9(this);
    var length = lengthOfArrayLike$d(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$5(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$5(end, length);
    while (endPos > index) O[index++] = value;
    return O;
  };

  var toPropertyKey$2 = toPropertyKey$5;
  var definePropertyModule$2 = objectDefineProperty;
  var createPropertyDescriptor$2 = createPropertyDescriptor$6;
  var createProperty$4 = function (object, key, value) {
    var propertyKey = toPropertyKey$2(key);
    if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$2(0, value));else object[propertyKey] = value;
  };

  var toAbsoluteIndex$4 = toAbsoluteIndex$7;
  var lengthOfArrayLike$c = lengthOfArrayLike$f;
  var createProperty$3 = createProperty$4;
  var $Array$3 = Array;
  var max$2 = Math.max;
  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$c(O);
    var k = toAbsoluteIndex$4(start, length);
    var fin = toAbsoluteIndex$4(end === undefined ? length : end, length);
    var result = $Array$3(max$2(fin - k, 0));
    var n = 0;
    for (; k < fin; k++, n++) createProperty$3(result, n, O[k]);
    result.length = n;
    return result;
  };

  var global$l = global$w;
  var uncurryThis$s = functionUncurryThis;
  var DESCRIPTORS$8 = descriptors;
  var NATIVE_ARRAY_BUFFER$2 = arrayBufferBasicDetection;
  var FunctionName = functionName;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$9;
  var defineBuiltInAccessor$7 = defineBuiltInAccessor$8;
  var defineBuiltIns = defineBuiltIns$1;
  var fails$r = fails$C;
  var anInstance$1 = anInstance$2;
  var toIntegerOrInfinity$4 = toIntegerOrInfinity$8;
  var toLength$6 = toLength$9;
  var toIndex$1 = toIndex$2;
  var IEEE754 = ieee754;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var setPrototypeOf$3 = objectSetPrototypeOf;
  var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
  var arrayFill = arrayFill$1;
  var arraySlice$6 = arraySliceSimple;
  var setToStringTag$1 = setToStringTag$4;
  var InternalStateModule$4 = internalState;
  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var ARRAY_BUFFER$1 = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE$1 = 'prototype';
  var WRONG_LENGTH$1 = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var getInternalArrayBufferState = InternalStateModule$4.getterFor(ARRAY_BUFFER$1);
  var getInternalDataViewState = InternalStateModule$4.getterFor(DATA_VIEW);
  var setInternalState$3 = InternalStateModule$4.set;
  var NativeArrayBuffer$1 = global$l[ARRAY_BUFFER$1];
  var $ArrayBuffer = NativeArrayBuffer$1;
  var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE$1];
  var $DataView = global$l[DATA_VIEW];
  var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE$1];
  var ObjectPrototype$2 = Object.prototype;
  var Array$1 = global$l.Array;
  var RangeError$3 = global$l.RangeError;
  var fill = uncurryThis$s(arrayFill);
  var reverse = uncurryThis$s([].reverse);
  var packIEEE754 = IEEE754.pack;
  var unpackIEEE754 = IEEE754.unpack;
  var packInt8 = function (number) {
    return [number & 0xFF];
  };
  var packInt16 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF];
  };
  var packInt32 = function (number) {
    return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
  };
  var unpackInt32 = function (buffer) {
    return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
  };
  var packFloat32 = function (number) {
    return packIEEE754(number, 23, 4);
  };
  var packFloat64 = function (number) {
    return packIEEE754(number, 52, 8);
  };
  var addGetter$1 = function (Constructor, key, getInternalState) {
    defineBuiltInAccessor$7(Constructor[PROTOTYPE$1], key, {
      configurable: true,
      get: function () {
        return getInternalState(this)[key];
      }
    });
  };
  var get = function (view, count, index, isLittleEndian) {
    var store = getInternalDataViewState(view);
    var intIndex = toIndex$1(index);
    var boolIsLittleEndian = !!isLittleEndian;
    if (intIndex + count > store.byteLength) throw RangeError$3(WRONG_INDEX);
    var bytes = store.bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySlice$6(bytes, start, start + count);
    return boolIsLittleEndian ? pack : reverse(pack);
  };
  var set = function (view, count, index, conversion, value, isLittleEndian) {
    var store = getInternalDataViewState(view);
    var intIndex = toIndex$1(index);
    var pack = conversion(+value);
    var boolIsLittleEndian = !!isLittleEndian;
    if (intIndex + count > store.byteLength) throw RangeError$3(WRONG_INDEX);
    var bytes = store.bytes;
    var start = intIndex + store.byteOffset;
    for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1];
  };
  if (!NATIVE_ARRAY_BUFFER$2) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$1(this, ArrayBufferPrototype$1);
      var byteLength = toIndex$1(length);
      setInternalState$3(this, {
        type: ARRAY_BUFFER$1,
        bytes: fill(Array$1(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS$8) {
        this.byteLength = byteLength;
        this.detached = false;
      }
    };
    ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE$1];
    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance$1(this, DataViewPrototype$1);
      anInstance$1(buffer, ArrayBufferPrototype$1);
      var bufferState = getInternalArrayBufferState(buffer);
      var bufferLength = bufferState.byteLength;
      var offset = toIntegerOrInfinity$4(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError$3('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength$6(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError$3(WRONG_LENGTH$1);
      setInternalState$3(this, {
        type: DATA_VIEW,
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset,
        bytes: bufferState.bytes
      });
      if (!DESCRIPTORS$8) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };
    DataViewPrototype$1 = $DataView[PROTOTYPE$1];
    if (DESCRIPTORS$8) {
      addGetter$1($ArrayBuffer, 'byteLength', getInternalArrayBufferState);
      addGetter$1($DataView, 'buffer', getInternalDataViewState);
      addGetter$1($DataView, 'byteLength', getInternalDataViewState);
      addGetter$1($DataView, 'byteOffset', getInternalDataViewState);
    }
    defineBuiltIns(DataViewPrototype$1, {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset /* , littleEndian */) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
      },
      getUint32: function getUint32(byteOffset /* , littleEndian */) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
      },
      getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
      },
      setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
      },
      setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
        set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
      },
      setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
        set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
    /* eslint-disable no-new -- required for testing */
    if (!fails$r(function () {
      NativeArrayBuffer$1(1);
    }) || !fails$r(function () {
      new NativeArrayBuffer$1(-1);
    }) || fails$r(function () {
      new NativeArrayBuffer$1();
      new NativeArrayBuffer$1(1.5);
      new NativeArrayBuffer$1(NaN);
      return NativeArrayBuffer$1.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
    })) {
      /* eslint-enable no-new -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance$1(this, ArrayBufferPrototype$1);
        return new NativeArrayBuffer$1(toIndex$1(length));
      };
      $ArrayBuffer[PROTOTYPE$1] = ArrayBufferPrototype$1;
      for (var keys$1 = getOwnPropertyNames$2(NativeArrayBuffer$1), j = 0, key; keys$1.length > j;) {
        if (!((key = keys$1[j++]) in $ArrayBuffer)) {
          createNonEnumerableProperty$5($ArrayBuffer, key, NativeArrayBuffer$1[key]);
        }
      }
      ArrayBufferPrototype$1.constructor = $ArrayBuffer;
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$5(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
    }

    // WebKit bug - the same parent prototype for typed arrays and data view
    if (setPrototypeOf$3 && getPrototypeOf$1(DataViewPrototype$1) !== ObjectPrototype$2) {
      setPrototypeOf$3(DataViewPrototype$1, ObjectPrototype$2);
    }

    // iOS Safari 7.x bug
    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = uncurryThis$s(DataViewPrototype$1.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) defineBuiltIns(DataViewPrototype$1, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, {
      unsafe: true
    });
  }
  setToStringTag$1($ArrayBuffer, ARRAY_BUFFER$1);
  setToStringTag$1($DataView, DATA_VIEW);
  var arrayBuffer = {
    ArrayBuffer: $ArrayBuffer,
    DataView: $DataView
  };

  var wellKnownSymbol$k = wellKnownSymbol$q;
  var TO_STRING_TAG$2 = wellKnownSymbol$k('toStringTag');
  var test = {};
  test[TO_STRING_TAG$2] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$9 = isCallable$o;
  var classofRaw = classofRaw$2;
  var wellKnownSymbol$j = wellKnownSymbol$q;
  var TO_STRING_TAG$1 = wellKnownSymbol$j('toStringTag');
  var $Object = Object;

  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) === 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {/* empty */}
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof$d = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable$9(O.callee) ? 'Arguments' : result;
  };

  var uncurryThis$r = functionUncurryThis;
  var fails$q = fails$C;
  var isCallable$8 = isCallable$o;
  var classof$c = classof$d;
  var getBuiltIn$4 = getBuiltIn$8;
  var inspectSource = inspectSource$2;
  var noop = function () {/* empty */};
  var empty = [];
  var construct = getBuiltIn$4('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$4 = uncurryThis$r(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$8(argument)) return false;
    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };
  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$8(argument)) return false;
    switch (classof$c(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
    }
    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$4(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };
  isConstructorLegacy.sham = true;

  // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor
  var isConstructor$4 = !construct || fails$q(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var isConstructor$3 = isConstructor$4;
  var tryToString$4 = tryToString$6;
  var $TypeError$8 = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor$2 = function (argument) {
    if (isConstructor$3(argument)) return argument;
    throw $TypeError$8(tryToString$4(argument) + ' is not a constructor');
  };

  var anObject$b = anObject$h;
  var aConstructor$1 = aConstructor$2;
  var isNullOrUndefined$3 = isNullOrUndefined$6;
  var wellKnownSymbol$i = wellKnownSymbol$q;
  var SPECIES$5 = wellKnownSymbol$i('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor$2 = function (O, defaultConstructor) {
    var C = anObject$b(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined$3(S = anObject$b(C)[SPECIES$5]) ? defaultConstructor : aConstructor$1(S);
  };

  var $$o = _export;
  var uncurryThis$q = functionUncurryThisClause;
  var fails$p = fails$C;
  var ArrayBufferModule$2 = arrayBuffer;
  var anObject$a = anObject$h;
  var toAbsoluteIndex$3 = toAbsoluteIndex$7;
  var toLength$5 = toLength$9;
  var speciesConstructor$1 = speciesConstructor$2;
  var ArrayBuffer$4 = ArrayBufferModule$2.ArrayBuffer;
  var DataView$2 = ArrayBufferModule$2.DataView;
  var DataViewPrototype = DataView$2.prototype;
  var nativeArrayBufferSlice = uncurryThis$q(ArrayBuffer$4.prototype.slice);
  var getUint8 = uncurryThis$q(DataViewPrototype.getUint8);
  var setUint8 = uncurryThis$q(DataViewPrototype.setUint8);
  var INCORRECT_SLICE = fails$p(function () {
    return !new ArrayBuffer$4(2).slice(1, undefined).byteLength;
  });

  // `ArrayBuffer.prototype.slice` method
  // https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
  $$o({
    target: 'ArrayBuffer',
    proto: true,
    unsafe: true,
    forced: INCORRECT_SLICE
  }, {
    slice: function slice(start, end) {
      if (nativeArrayBufferSlice && end === undefined) {
        return nativeArrayBufferSlice(anObject$a(this), start); // FF fix
      }

      var length = anObject$a(this).byteLength;
      var first = toAbsoluteIndex$3(start, length);
      var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
      var result = new (speciesConstructor$1(this, ArrayBuffer$4))(toLength$5(fin - first));
      var viewSource = new DataView$2(this);
      var viewTarget = new DataView$2(result);
      var index = 0;
      while (first < fin) {
        setUint8(viewTarget, index++, getUint8(viewSource, first++));
      }
      return result;
    }
  });

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$b = classof$d;

  // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$b(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var defineBuiltIn$7 = defineBuiltIn$c;
  var toString$g = objectToString;

  // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring
  if (!TO_STRING_TAG_SUPPORT) {
    defineBuiltIn$7(Object.prototype, 'toString', toString$g, {
      unsafe: true
    });
  }

  var typedArrayConstructor = {exports: {}};

  var wellKnownSymbol$h = wellKnownSymbol$q;
  var ITERATOR$5 = wellKnownSymbol$h('iterator');
  var SAFE_CLOSING = false;
  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return {
          done: !!called++
        };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$5] = function () {
      return this;
    };
    // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {/* empty */}
  var checkCorrectnessOfIteration$2 = function (exec, SKIP_CLOSING) {
    try {
      if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    } catch (error) {
      return false;
    } // workaround of old WebKit + `eval` bug
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$5] = function () {
        return {
          next: function () {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };
      exec(object);
    } catch (error) {/* empty */}
    return ITERATION_SUPPORT;
  };

  var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
  var DESCRIPTORS$7 = descriptors;
  var global$k = global$w;
  var isCallable$7 = isCallable$o;
  var isObject$7 = isObject$e;
  var hasOwn$8 = hasOwnProperty_1;
  var classof$a = classof$d;
  var tryToString$3 = tryToString$6;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$9;
  var defineBuiltIn$6 = defineBuiltIn$c;
  var defineBuiltInAccessor$6 = defineBuiltInAccessor$8;
  var isPrototypeOf$5 = objectIsPrototypeOf;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var wellKnownSymbol$g = wellKnownSymbol$q;
  var uid$1 = uid$4;
  var InternalStateModule$3 = internalState;
  var enforceInternalState$2 = InternalStateModule$3.enforce;
  var getInternalState$5 = InternalStateModule$3.get;
  var Int8Array$4 = global$k.Int8Array;
  var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
  var Uint8ClampedArray$1 = global$k.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
  var TypedArray$1 = Int8Array$4 && getPrototypeOf(Int8Array$4);
  var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf(Int8ArrayPrototype$1);
  var ObjectPrototype$1 = Object.prototype;
  var TypeError$2 = global$k.TypeError;
  var TO_STRING_TAG = wellKnownSymbol$g('toStringTag');
  var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
  // Fixing native typed arrays in Opera Presto crashes the browser, see #595
  var NATIVE_ARRAY_BUFFER_VIEWS$3 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$2 && classof$a(global$k.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQUIRED = false;
  var NAME, Constructor, Prototype;
  var TypedArrayConstructorsList = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  };
  var BigIntArrayConstructorsList = {
    BigInt64Array: 8,
    BigUint64Array: 8
  };
  var isView = function isView(it) {
    if (!isObject$7(it)) return false;
    var klass = classof$a(it);
    return klass === 'DataView' || hasOwn$8(TypedArrayConstructorsList, klass) || hasOwn$8(BigIntArrayConstructorsList, klass);
  };
  var getTypedArrayConstructor$1 = function (it) {
    var proto = getPrototypeOf(it);
    if (!isObject$7(proto)) return;
    var state = getInternalState$5(proto);
    return state && hasOwn$8(state, TYPED_ARRAY_CONSTRUCTOR) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$1(proto);
  };
  var isTypedArray$1 = function (it) {
    if (!isObject$7(it)) return false;
    var klass = classof$a(it);
    return hasOwn$8(TypedArrayConstructorsList, klass) || hasOwn$8(BigIntArrayConstructorsList, klass);
  };
  var aTypedArray$m = function (it) {
    if (isTypedArray$1(it)) return it;
    throw TypeError$2('Target is not a typed array');
  };
  var aTypedArrayConstructor$3 = function (C) {
    if (isCallable$7(C) && (!setPrototypeOf$2 || isPrototypeOf$5(TypedArray$1, C))) return C;
    throw TypeError$2(tryToString$3(C) + ' is not a typed array constructor');
  };
  var exportTypedArrayMethod$n = function (KEY, property, forced, options) {
    if (!DESCRIPTORS$7) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global$k[ARRAY];
      if (TypedArrayConstructor && hasOwn$8(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        // old WebKit bug - some methods are non-configurable
        try {
          TypedArrayConstructor.prototype[KEY] = property;
        } catch (error2) {/* empty */}
      }
    }
    if (!TypedArrayPrototype$2[KEY] || forced) {
      defineBuiltIn$6(TypedArrayPrototype$2, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && Int8ArrayPrototype$1[KEY] || property, options);
    }
  };
  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS$7) return;
    if (setPrototypeOf$2) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global$k[ARRAY];
        if (TypedArrayConstructor && hasOwn$8(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) {/* empty */}
      }
      if (!TypedArray$1[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return defineBuiltIn$6(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && TypedArray$1[KEY] || property);
        } catch (error) {/* empty */}
      } else return;
    }
    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$k[ARRAY];
      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        defineBuiltIn$6(TypedArrayConstructor, KEY, property);
      }
    }
  };
  for (NAME in TypedArrayConstructorsList) {
    Constructor = global$k[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState$2(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;else NATIVE_ARRAY_BUFFER_VIEWS$3 = false;
  }
  for (NAME in BigIntArrayConstructorsList) {
    Constructor = global$k[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) enforceInternalState$2(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  }

  // WebKit bug - typed arrays constructors prototype is Object.prototype
  if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !isCallable$7(TypedArray$1) || TypedArray$1 === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray$1 = function TypedArray() {
      throw TypeError$2('Incorrect invocation');
    };
    if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME in TypedArrayConstructorsList) {
      if (global$k[NAME]) setPrototypeOf$2(global$k[NAME], TypedArray$1);
    }
  }
  if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$1) {
    TypedArrayPrototype$2 = TypedArray$1.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME in TypedArrayConstructorsList) {
      if (global$k[NAME]) setPrototypeOf$2(global$k[NAME].prototype, TypedArrayPrototype$2);
    }
  }

  // WebKit bug - one more object in Uint8ClampedArray prototype chain
  if (NATIVE_ARRAY_BUFFER_VIEWS$3 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
    setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
  }
  if (DESCRIPTORS$7 && !hasOwn$8(TypedArrayPrototype$2, TO_STRING_TAG)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineBuiltInAccessor$6(TypedArrayPrototype$2, TO_STRING_TAG, {
      configurable: true,
      get: function () {
        return isObject$7(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
      }
    });
    for (NAME in TypedArrayConstructorsList) if (global$k[NAME]) {
      createNonEnumerableProperty$4(global$k[NAME], TYPED_ARRAY_TAG$1, NAME);
    }
  }
  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$3,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
    aTypedArray: aTypedArray$m,
    aTypedArrayConstructor: aTypedArrayConstructor$3,
    exportTypedArrayMethod: exportTypedArrayMethod$n,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    getTypedArrayConstructor: getTypedArrayConstructor$1,
    isView: isView,
    isTypedArray: isTypedArray$1,
    TypedArray: TypedArray$1,
    TypedArrayPrototype: TypedArrayPrototype$2
  };

  /* eslint-disable no-new -- required for testing */
  var global$j = global$w;
  var fails$o = fails$C;
  var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$2;
  var NATIVE_ARRAY_BUFFER_VIEWS$2 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var ArrayBuffer$3 = global$j.ArrayBuffer;
  var Int8Array$3 = global$j.Int8Array;
  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$2 || !fails$o(function () {
    Int8Array$3(1);
  }) || !fails$o(function () {
    new Int8Array$3(-1);
  }) || !checkCorrectnessOfIteration$1(function (iterable) {
    new Int8Array$3();
    new Int8Array$3(null);
    new Int8Array$3(1.5);
    new Int8Array$3(iterable);
  }, true) || fails$o(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$3(new ArrayBuffer$3(2), 1, undefined).length !== 1;
  });

  var isObject$6 = isObject$e;
  var floor$3 = Math.floor;

  // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es/no-number-isinteger -- safe
  var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
    return !isObject$6(it) && isFinite(it) && floor$3(it) === it;
  };

  var toIntegerOrInfinity$3 = toIntegerOrInfinity$8;
  var $RangeError$1 = RangeError;
  var toPositiveInteger$1 = function (it) {
    var result = toIntegerOrInfinity$3(it);
    if (result < 0) throw $RangeError$1("The argument can't be less than 0");
    return result;
  };

  var toPositiveInteger = toPositiveInteger$1;
  var $RangeError = RangeError;
  var toOffset$2 = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw $RangeError('Wrong offset');
    return offset;
  };

  var round = Math.round;
  var toUint8Clamped$1 = function (it) {
    var value = round(it);
    return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
  };

  var uncurryThis$p = functionUncurryThisClause;
  var aCallable$4 = aCallable$7;
  var NATIVE_BIND$1 = functionBindNative;
  var bind$4 = uncurryThis$p(uncurryThis$p.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable$4(fn);
    return that === undefined ? fn : NATIVE_BIND$1 ? bind$4(fn, that) : function /* ...args */
    () {
      return fn.apply(that, arguments);
    };
  };

  var classof$9 = classof$d;
  var getMethod$3 = getMethod$5;
  var isNullOrUndefined$2 = isNullOrUndefined$6;
  var Iterators$1 = iterators;
  var wellKnownSymbol$f = wellKnownSymbol$q;
  var ITERATOR$4 = wellKnownSymbol$f('iterator');
  var getIteratorMethod$3 = function (it) {
    if (!isNullOrUndefined$2(it)) return getMethod$3(it, ITERATOR$4) || getMethod$3(it, '@@iterator') || Iterators$1[classof$9(it)];
  };

  var call$g = functionCall;
  var aCallable$3 = aCallable$7;
  var anObject$9 = anObject$h;
  var tryToString$2 = tryToString$6;
  var getIteratorMethod$2 = getIteratorMethod$3;
  var $TypeError$7 = TypeError;
  var getIterator$2 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable$3(iteratorMethod)) return anObject$9(call$g(iteratorMethod, argument));
    throw $TypeError$7(tryToString$2(argument) + ' is not iterable');
  };

  var wellKnownSymbol$e = wellKnownSymbol$q;
  var Iterators = iterators;
  var ITERATOR$3 = wellKnownSymbol$e('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod$2 = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$3] === it);
  };

  var classof$8 = classof$d;
  var isBigIntArray$1 = function (it) {
    var klass = classof$8(it);
    return klass === 'BigInt64Array' || klass === 'BigUint64Array';
  };

  var toPrimitive = toPrimitive$2;
  var $TypeError$6 = TypeError;

  // `ToBigInt` abstract operation
  // https://tc39.es/ecma262/#sec-tobigint
  var toBigInt$2 = function (argument) {
    var prim = toPrimitive(argument, 'number');
    if (typeof prim == 'number') throw $TypeError$6("Can't convert number to bigint");
    // eslint-disable-next-line es/no-bigint -- safe
    return BigInt(prim);
  };

  var bind$3 = functionBindContext;
  var call$f = functionCall;
  var aConstructor = aConstructor$2;
  var toObject$8 = toObject$c;
  var lengthOfArrayLike$b = lengthOfArrayLike$f;
  var getIterator$1 = getIterator$2;
  var getIteratorMethod$1 = getIteratorMethod$3;
  var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
  var isBigIntArray = isBigIntArray$1;
  var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
  var toBigInt$1 = toBigInt$2;
  var typedArrayFrom$1 = function from(source /* , mapfn, thisArg */) {
    var C = aConstructor(this);
    var O = toObject$8(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod$1(O);
    var i, length, result, thisIsBigIntArray, value, step, iterator, next;
    if (iteratorMethod && !isArrayIteratorMethod$1(iteratorMethod)) {
      iterator = getIterator$1(O, iteratorMethod);
      next = iterator.next;
      O = [];
      while (!(step = call$f(next, iterator)).done) {
        O.push(step.value);
      }
    }
    if (mapping && argumentsLength > 2) {
      mapfn = bind$3(mapfn, arguments[2]);
    }
    length = lengthOfArrayLike$b(O);
    result = new (aTypedArrayConstructor$2(C))(length);
    thisIsBigIntArray = isBigIntArray(result);
    for (i = 0; length > i; i++) {
      value = mapping ? mapfn(O[i], i) : O[i];
      // FF30- typed arrays doesn't properly convert objects to typed array values
      result[i] = thisIsBigIntArray ? toBigInt$1(value) : +value;
    }
    return result;
  };

  var isArray$4 = isArray$6;
  var isConstructor$2 = isConstructor$4;
  var isObject$5 = isObject$e;
  var wellKnownSymbol$d = wellKnownSymbol$q;
  var SPECIES$4 = wellKnownSymbol$d('species');
  var $Array$2 = Array;

  // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;
    if (isArray$4(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (isConstructor$2(C) && (C === $Array$2 || isArray$4(C.prototype))) C = undefined;else if (isObject$5(C)) {
        C = C[SPECIES$4];
        if (C === null) C = undefined;
      }
    }
    return C === undefined ? $Array$2 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1;

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate$3 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind$2 = functionBindContext;
  var uncurryThis$o = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toObject$7 = toObject$c;
  var lengthOfArrayLike$a = lengthOfArrayLike$f;
  var arraySpeciesCreate$2 = arraySpeciesCreate$3;
  var push$3 = uncurryThis$o([].push);

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  var createMethod$3 = function (TYPE) {
    var IS_MAP = TYPE === 1;
    var IS_FILTER = TYPE === 2;
    var IS_SOME = TYPE === 3;
    var IS_EVERY = TYPE === 4;
    var IS_FIND_INDEX = TYPE === 6;
    var IS_FILTER_REJECT = TYPE === 7;
    var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$7($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind$2(callbackfn, that);
      var length = lengthOfArrayLike$a(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$2;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
      var value, result;
      for (; length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3:
              return true;
            // some
            case 5:
              return value;
            // find
            case 6:
              return index;
            // findIndex
            case 2:
              push$3(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every
            case 7:
              push$3(target, value);
            // filterReject
          }
        }
      }

      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };
  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$3(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$3(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$3(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$3(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$3(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$3(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$3(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$3(7)
  };

  var getBuiltIn$3 = getBuiltIn$8;
  var defineBuiltInAccessor$5 = defineBuiltInAccessor$8;
  var wellKnownSymbol$c = wellKnownSymbol$q;
  var DESCRIPTORS$6 = descriptors;
  var SPECIES$3 = wellKnownSymbol$c('species');
  var setSpecies$3 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
    if (DESCRIPTORS$6 && Constructor && !Constructor[SPECIES$3]) {
      defineBuiltInAccessor$5(Constructor, SPECIES$3, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var isCallable$6 = isCallable$o;
  var isObject$4 = isObject$e;
  var setPrototypeOf$1 = objectSetPrototypeOf;

  // makes subclassing work correct for wrapped built-ins
  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$6(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$4(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };

  var $$n = _export;
  var global$i = global$w;
  var call$e = functionCall;
  var DESCRIPTORS$5 = descriptors;
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
  var ArrayBufferViewCore$o = arrayBufferViewCore;
  var ArrayBufferModule$1 = arrayBuffer;
  var anInstance = anInstance$2;
  var createPropertyDescriptor$1 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$9;
  var isIntegralNumber = isIntegralNumber$1;
  var toLength$4 = toLength$9;
  var toIndex = toIndex$2;
  var toOffset$1 = toOffset$2;
  var toUint8Clamped = toUint8Clamped$1;
  var toPropertyKey$1 = toPropertyKey$5;
  var hasOwn$7 = hasOwnProperty_1;
  var classof$7 = classof$d;
  var isObject$3 = isObject$e;
  var isSymbol$2 = isSymbol$5;
  var create$1 = objectCreate;
  var isPrototypeOf$4 = objectIsPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var typedArrayFrom = typedArrayFrom$1;
  var forEach$2 = arrayIteration.forEach;
  var setSpecies$2 = setSpecies$3;
  var defineBuiltInAccessor$4 = defineBuiltInAccessor$8;
  var definePropertyModule$1 = objectDefineProperty;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var InternalStateModule$2 = internalState;
  var inheritIfRequired$1 = inheritIfRequired$2;
  var getInternalState$4 = InternalStateModule$2.get;
  var setInternalState$2 = InternalStateModule$2.set;
  var enforceInternalState$1 = InternalStateModule$2.enforce;
  var nativeDefineProperty$1 = definePropertyModule$1.f;
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var RangeError$2 = global$i.RangeError;
  var ArrayBuffer$2 = ArrayBufferModule$1.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer$2.prototype;
  var DataView$1 = ArrayBufferModule$1.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = ArrayBufferViewCore$o.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore$o.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore$o.TypedArray;
  var TypedArrayPrototype$1 = ArrayBufferViewCore$o.TypedArrayPrototype;
  var aTypedArrayConstructor$1 = ArrayBufferViewCore$o.aTypedArrayConstructor;
  var isTypedArray = ArrayBufferViewCore$o.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';
  var fromList = function (C, list) {
    aTypedArrayConstructor$1(C);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  };
  var addGetter = function (it, key) {
    defineBuiltInAccessor$4(it, key, {
      configurable: true,
      get: function () {
        return getInternalState$4(this)[key];
      }
    });
  };
  var isArrayBuffer = function (it) {
    var klass;
    return isPrototypeOf$4(ArrayBufferPrototype, it) || (klass = classof$7(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer';
  };
  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target) && !isSymbol$2(key) && key in target && isIntegralNumber(+key) && key >= 0;
  };
  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey$1(key);
    return isTypedArrayIndex(target, key) ? createPropertyDescriptor$1(2, target[key]) : nativeGetOwnPropertyDescriptor$1(target, key);
  };
  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey$1(key);
    if (isTypedArrayIndex(target, key) && isObject$3(descriptor) && hasOwn$7(descriptor, 'value') && !hasOwn$7(descriptor, 'get') && !hasOwn$7(descriptor, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable && (!hasOwn$7(descriptor, 'writable') || descriptor.writable) && (!hasOwn$7(descriptor, 'enumerable') || descriptor.enumerable)) {
      target[key] = descriptor.value;
      return target;
    }
    return nativeDefineProperty$1(target, key, descriptor);
  };
  if (DESCRIPTORS$5) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS$1) {
      getOwnPropertyDescriptorModule$1.f = wrappedGetOwnPropertyDescriptor;
      definePropertyModule$1.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype$1, 'buffer');
      addGetter(TypedArrayPrototype$1, 'byteOffset');
      addGetter(TypedArrayPrototype$1, 'byteLength');
      addGetter(TypedArrayPrototype$1, 'length');
    }
    $$n({
      target: 'Object',
      stat: true,
      forced: !NATIVE_ARRAY_BUFFER_VIEWS$1
    }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });
    typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = global$i[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};
      var getter = function (that, index) {
        var data = getInternalState$4(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };
      var setter = function (that, index, value) {
        var data = getInternalState$4(that);
        data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true);
      };
      var addElement = function (that, index) {
        nativeDefineProperty$1(that, index, {
          get: function () {
            return getter(this, index);
          },
          set: function (value) {
            return setter(this, index, value);
          },
          enumerable: true
        });
      };
      if (!NATIVE_ARRAY_BUFFER_VIEWS$1) {
        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
          anInstance(that, TypedArrayConstructorPrototype);
          var index = 0;
          var byteOffset = 0;
          var buffer, byteLength, length;
          if (!isObject$3(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer$2(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset$1(offset, BYTES);
            var $len = data.byteLength;
            if ($length === undefined) {
              if ($len % BYTES) throw RangeError$2(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw RangeError$2(WRONG_LENGTH);
            } else {
              byteLength = toLength$4($length) * BYTES;
              if (byteLength + byteOffset > $len) throw RangeError$2(WRONG_LENGTH);
            }
            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return fromList(TypedArrayConstructor, data);
          } else {
            return call$e(typedArrayFrom, TypedArrayConstructor, data);
          }
          setInternalState$2(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView$1(buffer)
          });
          while (index < length) addElement(that, index++);
        });
        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$1(TypedArrayPrototype$1);
      } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired$1(function () {
            if (!isObject$3(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
            return call$e(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });
        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        forEach$2(getOwnPropertyNames$1(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty$3(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }
      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }
      enforceInternalState$1(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;
      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }
      var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor;
      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
      $$n({
        global: true,
        constructor: true,
        forced: FORCED,
        sham: !NATIVE_ARRAY_BUFFER_VIEWS$1
      }, exported);
      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty$3(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }
      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }
      setSpecies$2(CONSTRUCTOR_NAME);
    };
  } else typedArrayConstructor.exports = function () {/* empty */};
  var typedArrayConstructorExports = typedArrayConstructor.exports;

  var createTypedArrayConstructor$2 = typedArrayConstructorExports;

  // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$2('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var tryToString$1 = tryToString$6;
  var $TypeError$5 = TypeError;
  var deletePropertyOrThrow$1 = function (O, P) {
    if (!delete O[P]) throw $TypeError$5('Cannot delete property ' + tryToString$1(P) + ' of ' + tryToString$1(O));
  };

  var toObject$6 = toObject$c;
  var toAbsoluteIndex$2 = toAbsoluteIndex$7;
  var lengthOfArrayLike$9 = lengthOfArrayLike$f;
  var deletePropertyOrThrow = deletePropertyOrThrow$1;
  var min$3 = Math.min;

  // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es/no-array-prototype-copywithin -- safe
  var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
    var O = toObject$6(this);
    var len = lengthOfArrayLike$9(O);
    var to = toAbsoluteIndex$2(target, len);
    var from = toAbsoluteIndex$2(start, len);
    var end = arguments.length > 2 ? arguments[2] : undefined;
    var count = min$3((end === undefined ? len : toAbsoluteIndex$2(end, len)) - from, len - to);
    var inc = 1;
    if (from < to && to < from + count) {
      inc = -1;
      from += count - 1;
      to += count - 1;
    }
    while (count-- > 0) {
      if (from in O) O[to] = O[from];else deletePropertyOrThrow(O, to);
      to += inc;
      from += inc;
    }
    return O;
  };

  var uncurryThis$n = functionUncurryThis;
  var ArrayBufferViewCore$n = arrayBufferViewCore;
  var $ArrayCopyWithin = arrayCopyWithin;
  var u$ArrayCopyWithin = uncurryThis$n($ArrayCopyWithin);
  var aTypedArray$l = ArrayBufferViewCore$n.aTypedArray;
  var exportTypedArrayMethod$m = ArrayBufferViewCore$n.exportTypedArrayMethod;

  // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
  exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start /* , end */) {
    return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var ArrayBufferViewCore$m = arrayBufferViewCore;
  var $every$1 = arrayIteration.every;
  var aTypedArray$k = ArrayBufferViewCore$m.aTypedArray;
  var exportTypedArrayMethod$l = ArrayBufferViewCore$m.exportTypedArrayMethod;

  // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
  exportTypedArrayMethod$l('every', function every(callbackfn /* , thisArg */) {
    return $every$1(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$l = arrayBufferViewCore;
  var $fill = arrayFill$1;
  var toBigInt = toBigInt$2;
  var classof$6 = classof$d;
  var call$d = functionCall;
  var uncurryThis$m = functionUncurryThis;
  var fails$n = fails$C;
  var aTypedArray$j = ArrayBufferViewCore$l.aTypedArray;
  var exportTypedArrayMethod$k = ArrayBufferViewCore$l.exportTypedArrayMethod;
  var slice$1 = uncurryThis$m(''.slice);

  // V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
  var CONVERSION_BUG = fails$n(function () {
    var count = 0;
    // eslint-disable-next-line es/no-typed-arrays -- safe
    new Int8Array(2).fill({
      valueOf: function () {
        return count++;
      }
    });
    return count !== 1;
  });

  // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  exportTypedArrayMethod$k('fill', function fill(value /* , start, end */) {
    var length = arguments.length;
    aTypedArray$j(this);
    var actualValue = slice$1(classof$6(this), 0, 3) === 'Big' ? toBigInt(value) : +value;
    return call$d($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
  }, CONVERSION_BUG);

  var lengthOfArrayLike$8 = lengthOfArrayLike$f;
  var arrayFromConstructorAndList$1 = function (Constructor, list) {
    var index = 0;
    var length = lengthOfArrayLike$8(list);
    var result = new Constructor(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var ArrayBufferViewCore$k = arrayBufferViewCore;
  var speciesConstructor = speciesConstructor$2;
  var aTypedArrayConstructor = ArrayBufferViewCore$k.aTypedArrayConstructor;
  var getTypedArrayConstructor = ArrayBufferViewCore$k.getTypedArrayConstructor;

  // a part of `TypedArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#typedarray-species-create
  var typedArraySpeciesConstructor$4 = function (originalArray) {
    return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor(originalArray)));
  };

  var arrayFromConstructorAndList = arrayFromConstructorAndList$1;
  var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;
  var typedArrayFromSpeciesAndList = function (instance, list) {
    return arrayFromConstructorAndList(typedArraySpeciesConstructor$3(instance), list);
  };

  var ArrayBufferViewCore$j = arrayBufferViewCore;
  var $filter = arrayIteration.filter;
  var fromSpeciesAndList = typedArrayFromSpeciesAndList;
  var aTypedArray$i = ArrayBufferViewCore$j.aTypedArray;
  var exportTypedArrayMethod$j = ArrayBufferViewCore$j.exportTypedArrayMethod;

  // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
  exportTypedArrayMethod$j('filter', function filter(callbackfn /* , thisArg */) {
    var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return fromSpeciesAndList(this, list);
  });

  var ArrayBufferViewCore$i = arrayBufferViewCore;
  var $find = arrayIteration.find;
  var aTypedArray$h = ArrayBufferViewCore$i.aTypedArray;
  var exportTypedArrayMethod$i = ArrayBufferViewCore$i.exportTypedArrayMethod;

  // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
  exportTypedArrayMethod$i('find', function find(predicate /* , thisArg */) {
    return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$h = arrayBufferViewCore;
  var $findIndex = arrayIteration.findIndex;
  var aTypedArray$g = ArrayBufferViewCore$h.aTypedArray;
  var exportTypedArrayMethod$h = ArrayBufferViewCore$h.exportTypedArrayMethod;

  // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
  exportTypedArrayMethod$h('findIndex', function findIndex(predicate /* , thisArg */) {
    return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$g = arrayBufferViewCore;
  var $forEach$2 = arrayIteration.forEach;
  var aTypedArray$f = ArrayBufferViewCore$g.aTypedArray;
  var exportTypedArrayMethod$g = ArrayBufferViewCore$g.exportTypedArrayMethod;

  // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
  exportTypedArrayMethod$g('forEach', function forEach(callbackfn /* , thisArg */) {
    $forEach$2(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$f = arrayBufferViewCore;
  var $includes$1 = arrayIncludes.includes;
  var aTypedArray$e = ArrayBufferViewCore$f.aTypedArray;
  var exportTypedArrayMethod$f = ArrayBufferViewCore$f.exportTypedArrayMethod;

  // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
  exportTypedArrayMethod$f('includes', function includes(searchElement /* , fromIndex */) {
    return $includes$1(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$e = arrayBufferViewCore;
  var $indexOf$1 = arrayIncludes.indexOf;
  var aTypedArray$d = ArrayBufferViewCore$e.aTypedArray;
  var exportTypedArrayMethod$e = ArrayBufferViewCore$e.exportTypedArrayMethod;

  // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
  exportTypedArrayMethod$e('indexOf', function indexOf(searchElement /* , fromIndex */) {
    return $indexOf$1(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var global$h = global$w;
  var fails$m = fails$C;
  var uncurryThis$l = functionUncurryThis;
  var ArrayBufferViewCore$d = arrayBufferViewCore;
  var ArrayIterators = es_array_iterator;
  var wellKnownSymbol$b = wellKnownSymbol$q;
  var ITERATOR$2 = wellKnownSymbol$b('iterator');
  var Uint8Array$2 = global$h.Uint8Array;
  var arrayValues = uncurryThis$l(ArrayIterators.values);
  var arrayKeys = uncurryThis$l(ArrayIterators.keys);
  var arrayEntries = uncurryThis$l(ArrayIterators.entries);
  var aTypedArray$c = ArrayBufferViewCore$d.aTypedArray;
  var exportTypedArrayMethod$d = ArrayBufferViewCore$d.exportTypedArrayMethod;
  var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;
  var GENERIC = !fails$m(function () {
    TypedArrayPrototype[ITERATOR$2].call([1]);
  });
  var ITERATOR_IS_VALUES = !!TypedArrayPrototype && TypedArrayPrototype.values && TypedArrayPrototype[ITERATOR$2] === TypedArrayPrototype.values && TypedArrayPrototype.values.name === 'values';
  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$c(this));
  };

  // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
  exportTypedArrayMethod$d('entries', function entries() {
    return arrayEntries(aTypedArray$c(this));
  }, GENERIC);
  // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
  exportTypedArrayMethod$d('keys', function keys() {
    return arrayKeys(aTypedArray$c(this));
  }, GENERIC);
  // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
  exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, {
    name: 'values'
  });
  // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
  exportTypedArrayMethod$d(ITERATOR$2, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, {
    name: 'values'
  });

  var ArrayBufferViewCore$c = arrayBufferViewCore;
  var uncurryThis$k = functionUncurryThis;
  var aTypedArray$b = ArrayBufferViewCore$c.aTypedArray;
  var exportTypedArrayMethod$c = ArrayBufferViewCore$c.exportTypedArrayMethod;
  var $join = uncurryThis$k([].join);

  // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  exportTypedArrayMethod$c('join', function join(separator) {
    return $join(aTypedArray$b(this), separator);
  });

  var NATIVE_BIND = functionBindNative;
  var FunctionPrototype = Function.prototype;
  var apply$5 = FunctionPrototype.apply;
  var call$c = FunctionPrototype.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$c.bind(apply$5) : function () {
    return call$c.apply(apply$5, arguments);
  });

  var fails$l = fails$C;
  var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$l(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () {
        return 1;
      }, 1);
    });
  };

  /* eslint-disable es/no-array-prototype-lastindexof -- safe */
  var apply$4 = functionApply;
  var toIndexedObject$4 = toIndexedObject$a;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$8;
  var lengthOfArrayLike$7 = lengthOfArrayLike$f;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;
  var min$2 = Math.min;
  var $lastIndexOf$1 = [].lastIndexOf;
  var NEGATIVE_ZERO$1 = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$2 = arrayMethodIsStrict$3('lastIndexOf');
  var FORCED$8 = NEGATIVE_ZERO$1 || !STRICT_METHOD$2;

  // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
  var arrayLastIndexOf = FORCED$8 ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO$1) return apply$4($lastIndexOf$1, this, arguments) || 0;
    var O = toIndexedObject$4(this);
    var length = lengthOfArrayLike$7(O);
    var index = length - 1;
    if (arguments.length > 1) index = min$2(index, toIntegerOrInfinity$2(arguments[1]));
    if (index < 0) index = length + index;
    for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
    return -1;
  } : $lastIndexOf$1;

  var ArrayBufferViewCore$b = arrayBufferViewCore;
  var apply$3 = functionApply;
  var $lastIndexOf = arrayLastIndexOf;
  var aTypedArray$a = ArrayBufferViewCore$b.aTypedArray;
  var exportTypedArrayMethod$b = ArrayBufferViewCore$b.exportTypedArrayMethod;

  // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
    var length = arguments.length;
    return apply$3($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var ArrayBufferViewCore$a = arrayBufferViewCore;
  var $map = arrayIteration.map;
  var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;
  var aTypedArray$9 = ArrayBufferViewCore$a.aTypedArray;
  var exportTypedArrayMethod$a = ArrayBufferViewCore$a.exportTypedArrayMethod;

  // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
  exportTypedArrayMethod$a('map', function map(mapfn /* , thisArg */) {
    return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (typedArraySpeciesConstructor$2(O))(length);
    });
  });

  var aCallable$2 = aCallable$7;
  var toObject$5 = toObject$c;
  var IndexedObject = indexedObject;
  var lengthOfArrayLike$6 = lengthOfArrayLike$f;
  var $TypeError$4 = TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$2 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable$2(callbackfn);
      var O = toObject$5(that);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike$6(O);
      var index = IS_RIGHT ? length - 1 : 0;
      var i = IS_RIGHT ? -1 : 1;
      if (argumentsLength < 2) while (true) {
        if (index in self) {
          memo = self[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw $TypeError$4('Reduce of empty array with no initial value');
        }
      }
      for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
      return memo;
    };
  };
  var arrayReduce = {
    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    left: createMethod$2(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$2(true)
  };

  var ArrayBufferViewCore$9 = arrayBufferViewCore;
  var $reduce = arrayReduce.left;
  var aTypedArray$8 = ArrayBufferViewCore$9.aTypedArray;
  var exportTypedArrayMethod$9 = ArrayBufferViewCore$9.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
  exportTypedArrayMethod$9('reduce', function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$8 = arrayBufferViewCore;
  var $reduceRight = arrayReduce.right;
  var aTypedArray$7 = ArrayBufferViewCore$8.aTypedArray;
  var exportTypedArrayMethod$8 = ArrayBufferViewCore$8.exportTypedArrayMethod;

  // `%TypedArray%.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
  exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$7 = arrayBufferViewCore;
  var aTypedArray$6 = ArrayBufferViewCore$7.aTypedArray;
  var exportTypedArrayMethod$7 = ArrayBufferViewCore$7.exportTypedArrayMethod;
  var floor$2 = Math.floor;

  // `%TypedArray%.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
  exportTypedArrayMethod$7('reverse', function reverse() {
    var that = this;
    var length = aTypedArray$6(that).length;
    var middle = floor$2(length / 2);
    var index = 0;
    var value;
    while (index < middle) {
      value = that[index];
      that[index++] = that[--length];
      that[length] = value;
    }
    return that;
  });

  var global$g = global$w;
  var call$b = functionCall;
  var ArrayBufferViewCore$6 = arrayBufferViewCore;
  var lengthOfArrayLike$5 = lengthOfArrayLike$f;
  var toOffset = toOffset$2;
  var toIndexedObject$3 = toObject$c;
  var fails$k = fails$C;
  var RangeError$1 = global$g.RangeError;
  var Int8Array$2 = global$g.Int8Array;
  var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
  var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
  var aTypedArray$5 = ArrayBufferViewCore$6.aTypedArray;
  var exportTypedArrayMethod$6 = ArrayBufferViewCore$6.exportTypedArrayMethod;
  var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$k(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    call$b($set, array, {
      length: 1,
      0: 3
    }, 1);
    return array[1] !== 3;
  });

  // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
  var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$6.NATIVE_ARRAY_BUFFER_VIEWS && fails$k(function () {
    var array = new Int8Array$2(2);
    array.set(1);
    array.set('2', 1);
    return array[0] !== 0 || array[1] !== 2;
  });

  // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
  exportTypedArrayMethod$6('set', function set(arrayLike /* , offset */) {
    aTypedArray$5(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toIndexedObject$3(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call$b($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike$5(src);
    var index = 0;
    if (len + offset > length) throw RangeError$1('Wrong length');
    while (index < len) this[offset + index] = src[index++];
  }, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

  var uncurryThis$j = functionUncurryThis;
  var arraySlice$5 = uncurryThis$j([].slice);

  var ArrayBufferViewCore$5 = arrayBufferViewCore;
  var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
  var fails$j = fails$C;
  var arraySlice$4 = arraySlice$5;
  var aTypedArray$4 = ArrayBufferViewCore$5.aTypedArray;
  var exportTypedArrayMethod$5 = ArrayBufferViewCore$5.exportTypedArrayMethod;
  var FORCED$7 = fails$j(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  });

  // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
  exportTypedArrayMethod$5('slice', function slice(start, end) {
    var list = arraySlice$4(aTypedArray$4(this), start, end);
    var C = typedArraySpeciesConstructor$1(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);
    while (length > index) result[index] = list[index++];
    return result;
  }, FORCED$7);

  var ArrayBufferViewCore$4 = arrayBufferViewCore;
  var $some = arrayIteration.some;
  var aTypedArray$3 = ArrayBufferViewCore$4.aTypedArray;
  var exportTypedArrayMethod$4 = ArrayBufferViewCore$4.exportTypedArrayMethod;

  // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
  exportTypedArrayMethod$4('some', function some(callbackfn /* , thisArg */) {
    return $some(aTypedArray$3(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var arraySlice$3 = arraySliceSimple;
  var floor$1 = Math.floor;
  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$1(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(array, mergeSort(arraySlice$3(array, 0, middle), comparefn), mergeSort(arraySlice$3(array, middle), comparefn), comparefn);
  };
  var insertionSort = function (array, comparefn) {
    var length = array.length;
    var i = 1;
    var element, j;
    while (i < length) {
      j = i;
      element = array[i];
      while (j && comparefn(array[j - 1], element) > 0) {
        array[j] = array[--j];
      }
      if (j !== i++) array[j] = element;
    }
    return array;
  };
  var merge = function (array, left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    while (lindex < llength || rindex < rlength) {
      array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
    }
    return array;
  };
  var arraySort = mergeSort;

  var userAgent$1 = engineUserAgent;
  var firefox = userAgent$1.match(/firefox\/(\d+)/i);
  var engineFfVersion = !!firefox && +firefox[1];

  var UA = engineUserAgent;
  var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

  var userAgent = engineUserAgent;
  var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
  var engineWebkitVersion = !!webkit && +webkit[1];

  var global$f = global$w;
  var uncurryThis$i = functionUncurryThisClause;
  var fails$i = fails$C;
  var aCallable$1 = aCallable$7;
  var internalSort = arraySort;
  var ArrayBufferViewCore$3 = arrayBufferViewCore;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;
  var aTypedArray$2 = ArrayBufferViewCore$3.aTypedArray;
  var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;
  var Uint16Array$1 = global$f.Uint16Array;
  var nativeSort = Uint16Array$1 && uncurryThis$i(Uint16Array$1.prototype.sort);

  // WebKit
  var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$i(function () {
    nativeSort(new Uint16Array$1(2), null);
  }) && fails$i(function () {
    nativeSort(new Uint16Array$1(2), {});
  }));
  var STABLE_SORT = !!nativeSort && !fails$i(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 74;
    if (FF) return FF < 67;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 602;
    var array = new Uint16Array$1(516);
    var expected = Array(516);
    var index, mod;
    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }
    nativeSort(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });
    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });
  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (y !== y) return -1;
      // eslint-disable-next-line no-self-compare -- NaN check
      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  };

  // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
  exportTypedArrayMethod$3('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable$1(comparefn);
    if (STABLE_SORT) return nativeSort(this, comparefn);
    return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var ArrayBufferViewCore$2 = arrayBufferViewCore;
  var toLength$3 = toLength$9;
  var toAbsoluteIndex$1 = toAbsoluteIndex$7;
  var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;
  var aTypedArray$1 = ArrayBufferViewCore$2.aTypedArray;
  var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod;

  // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
  exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
    var O = aTypedArray$1(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex$1(begin, length);
    var C = typedArraySpeciesConstructor(O);
    return new C(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength$3((end === undefined ? length : toAbsoluteIndex$1(end, length)) - beginIndex));
  });

  var global$e = global$w;
  var apply$2 = functionApply;
  var ArrayBufferViewCore$1 = arrayBufferViewCore;
  var fails$h = fails$C;
  var arraySlice$2 = arraySlice$5;
  var Int8Array$1 = global$e.Int8Array;
  var aTypedArray = ArrayBufferViewCore$1.aTypedArray;
  var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;

  // iOS Safari 6.x fails here
  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$h(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });
  var FORCED$6 = fails$h(function () {
    return [1, 2].toLocaleString() !== new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails$h(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  });

  // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
  exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
    return apply$2($toLocaleString, TO_LOCALE_STRING_BUG ? arraySlice$2(aTypedArray(this)) : aTypedArray(this), arraySlice$2(arguments));
  }, FORCED$6);

  var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
  var fails$g = fails$C;
  var global$d = global$w;
  var uncurryThis$h = functionUncurryThis;
  var Uint8Array$1 = global$d.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var join = uncurryThis$h([].join);
  if (fails$g(function () {
    arrayToString.call({});
  })) {
    arrayToString = function toString() {
      return join(this);
    };
  }
  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString;

  // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
  exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var fails$f = fails$C;
  var wellKnownSymbol$a = wellKnownSymbol$q;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$2 = wellKnownSymbol$a('species');
  var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$f(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$2] = function () {
        return {
          foo: 1
        };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$m = _export;
  var isArray$3 = isArray$6;
  var isConstructor$1 = isConstructor$4;
  var isObject$2 = isObject$e;
  var toAbsoluteIndex = toAbsoluteIndex$7;
  var lengthOfArrayLike$4 = lengthOfArrayLike$f;
  var toIndexedObject$2 = toIndexedObject$a;
  var createProperty$2 = createProperty$4;
  var wellKnownSymbol$9 = wellKnownSymbol$q;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
  var nativeSlice = arraySlice$5;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');
  var SPECIES$1 = wellKnownSymbol$9('species');
  var $Array$1 = Array;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  $$m({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$2(this);
      var length = lengthOfArrayLike$4(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray$3(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (isConstructor$1(Constructor) && (Constructor === $Array$1 || isArray$3(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$2(Constructor)) {
          Constructor = Constructor[SPECIES$1];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$1 || Constructor === undefined) {
          return nativeSlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$1 : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$2(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var $$l = _export;
  var ArrayBufferViewCore = arrayBufferViewCore;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

  // `ArrayBuffer.isView` method
  // https://tc39.es/ecma262/#sec-arraybuffer.isview
  $$l({
    target: 'ArrayBuffer',
    stat: true,
    forced: !NATIVE_ARRAY_BUFFER_VIEWS
  }, {
    isView: ArrayBufferViewCore.isView
  });

  var $$k = _export;
  var global$c = global$w;
  var arrayBufferModule = arrayBuffer;
  var setSpecies$1 = setSpecies$3;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
  var NativeArrayBuffer = global$c[ARRAY_BUFFER];

  // `ArrayBuffer` constructor
  // https://tc39.es/ecma262/#sec-arraybuffer-constructor
  $$k({
    global: true,
    constructor: true,
    forced: NativeArrayBuffer !== ArrayBuffer$1
  }, {
    ArrayBuffer: ArrayBuffer$1
  });
  setSpecies$1(ARRAY_BUFFER);

  var $TypeError$3 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger$2 = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$3('Maximum allowed index exceeded');
    return it;
  };

  var $$j = _export;
  var fails$e = fails$C;
  var isArray$2 = isArray$6;
  var isObject$1 = isObject$e;
  var toObject$4 = toObject$c;
  var lengthOfArrayLike$3 = lengthOfArrayLike$f;
  var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
  var createProperty$1 = createProperty$4;
  var arraySpeciesCreate$1 = arraySpeciesCreate$3;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
  var wellKnownSymbol$8 = wellKnownSymbol$q;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$8('isConcatSpreadable');

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$e(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var isConcatSpreadable = function (O) {
    if (!isObject$1(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$2(O);
  };
  var FORCED$5 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

  // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  $$j({
    target: 'Array',
    proto: true,
    arity: 1,
    forced: FORCED$5
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$4(this);
      var A = arraySpeciesCreate$1(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike$3(E);
          doesNotExceedSafeInteger$1(n + len);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
        } else {
          doesNotExceedSafeInteger$1(n + 1);
          createProperty$1(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var classof$5 = classof$d;
  var $String$1 = String;
  var toString$f = function (argument) {
    if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String$1(argument);
  };

  var isObject = isObject$e;
  var classof$4 = classofRaw$2;
  var wellKnownSymbol$7 = wellKnownSymbol$q;
  var MATCH$2 = wellKnownSymbol$7('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$4(it) === 'RegExp');
  };

  var isRegExp$1 = isRegexp;
  var $TypeError$2 = TypeError;
  var notARegexp = function (it) {
    if (isRegExp$1(it)) {
      throw $TypeError$2("The method doesn't accept regular expressions");
    }
    return it;
  };

  var wellKnownSymbol$6 = wellKnownSymbol$q;
  var MATCH$1 = wellKnownSymbol$6('match');
  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {/* empty */}
    }
    return false;
  };

  var $$i = _export;
  var uncurryThis$g = functionUncurryThisClause;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength$2 = toLength$9;
  var toString$e = toString$f;
  var notARegExp$1 = notARegexp;
  var requireObjectCoercible$5 = requireObjectCoercible$8;
  var correctIsRegExpLogic$1 = correctIsRegexpLogic;

  // eslint-disable-next-line es/no-string-prototype-endswith -- safe
  var nativeEndsWith = uncurryThis$g(''.endsWith);
  var slice = uncurryThis$g(''.slice);
  var min$1 = Math.min;
  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('endsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.endsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.endswith
  $$i({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
  }, {
    endsWith: function endsWith(searchString /* , endPosition = @length */) {
      var that = toString$e(requireObjectCoercible$5(this));
      notARegExp$1(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = that.length;
      var end = endPosition === undefined ? len : min$1(toLength$2(endPosition), len);
      var search = toString$e(searchString);
      return nativeEndsWith ? nativeEndsWith(that, search, end) : slice(that, end - search.length, end) === search;
    }
  });

  var $$h = _export;
  var ArrayBufferModule = arrayBuffer;
  var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;

  // `DataView` constructor
  // https://tc39.es/ecma262/#sec-dataview-constructor
  $$h({
    global: true,
    constructor: true,
    forced: !NATIVE_ARRAY_BUFFER
  }, {
    DataView: ArrayBufferModule.DataView
  });

  var createTypedArrayConstructor$1 = typedArrayConstructorExports;

  // `Uint16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor$1('Uint16', function (init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var $forEach$1 = arrayIteration.forEach;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;
  var STRICT_METHOD$1 = arrayMethodIsStrict$2('forEach');

  // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var $$g = _export;
  var forEach$1 = arrayForEach;

  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  $$g({
    target: 'Array',
    proto: true,
    forced: [].forEach !== forEach$1
  }, {
    forEach: forEach$1
  });

  // iterable DOM collections
  // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  var domIterables = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };

  // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  var documentCreateElement = documentCreateElement$2;
  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var global$b = global$w;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$9;
  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };
  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$b[COLLECTION_NAME] && global$b[COLLECTION_NAME].prototype);
    }
  }
  handlePrototype(DOMTokenListPrototype);

  var ENCODINGS = ['windows1251', 'utf-16', 'utf-16be', 'utf-8'];
  function decodeUTF8(bytes) {
    var string = '';
    var i = 0;
    var c = 0;
    var c2 = 0;
    var c3 = 0;
    i += bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf ? 3 : 0;
    while (i < bytes.length) {
      c = bytes[i++];
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          string += String.fromCharCode(c);
          break;
        case 12:
        case 13:
          c2 = bytes[i++];
          string += String.fromCharCode((c & 0x1f) << 6 | c2 & 0x3f);
          break;
        case 14:
          c2 = bytes[i++];
          c3 = bytes[i++];
          string += String.fromCharCode((c & 0x0f) << 12 | (c2 & 0x3f) << 6 | (c3 & 0x3f) << 0);
          break;
        default:
          string += '';
      }
    }
    return string;
  }
  function encodeUTF8(string) {
    var bytes = [];
    for (var i = 0; i < string.length; i++) {
      var charCode = string.charCodeAt(i);
      if (charCode < 0x80) {
        bytes.push(charCode);
      } else if (charCode < 0x800) {
        bytes.push(0xc0 | charCode >> 6, 0x80 | charCode & 0x3f);
      } else if (charCode < 0xd800 || charCode >= 0xe000) {
        bytes.push(0xe0 | charCode >> 12, 0x80 | charCode >> 6 & 0x3f, 0x80 | charCode & 0x3f);
      } else {
        i++;
        charCode = 0x10000 + ((charCode & 0x3ff) << 10 | string.charCodeAt(i) & 0x3ff);
        bytes.push(0xf0 | charCode >> 18, 0x80 | charCode >> 12 & 0x3f, 0x80 | charCode >> 6 & 0x3f, 0x80 | charCode & 0x3f);
      }
    }
    return bytes;
  }
  function encodeString(string) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'windows1251';
    var bytes = [];
    switch (format) {
      case 'utf8':
      case 'utf-8':
        bytes = encodeUTF8(string);
        break;
      case 'utf16':
      case 'utf16be':
      case 'utf-16':
      case 'utf-16be':
        {
          var buffer = new ArrayBuffer(string.length * 2);
          var uint16 = new Uint16Array(buffer);
          var uint8 = new Uint8Array(buffer);
          for (var i = 0; i < string.length; i++) {
            uint16[i] = string.charCodeAt(i);
          }
          bytes = [0xff, 0xfe];
          uint8.forEach(function (_byte) {
            return bytes.push(_byte);
          });
          break;
        }
      case 'windows1251':
      case 'windows-1251':
      default:
        for (var _i = 0; _i < string.length; _i++) {
          bytes.push(string.charCodeAt(_i));
        }
    }
    return bytes;
  }
  function encoding2Index(encoding) {
    var index = -1;
    switch (encoding) {
      case 'windows1251':
      case 'windows-1251':
        index = 0;
        break;
      case 'utf16':
      case 'utf-16':
        index = 1;
        break;
      case 'utf16be':
      case 'utf-16be':
        index = 2;
        break;
      case 'utf8':
      case 'utf-8':
        index = 3;
        break;
      default:
        index = -1;
    }
    return index;
  }

  function isBuffer(param) {
    return param instanceof ArrayBuffer || typeof Buffer !== 'undefined' && param instanceof Buffer;
  }

  var BufferView = /*#__PURE__*/function (_DataView) {
    _inherits(BufferView, _DataView);
    var _super = _createSuper(BufferView);
    function BufferView() {
      _classCallCheck(this, BufferView);
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      if (typeof params[0] === 'number' || Array.isArray(params[0])) {
        params[0] = new Uint8Array(params[0]);
      }
      if (ArrayBuffer.isView(params[0])) {
        params[0] = params[0].buffer;
      }
      return _super.call.apply(_super, [this].concat(params));
    }
    _createClass(BufferView, [{
      key: "getString",
      value: function getString(offset, maxlength) {
        var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'windows1251';
        var string = '';
        var bytes = this.getUint8(offset, maxlength);
        if (!Array.isArray(bytes)) bytes = [bytes];
        switch (format) {
          case 'utf8':
          case 'utf-8':
            string = decodeUTF8(bytes);
            break;
          case 'utf16':
          case 'utf16be':
          case 'utf-16':
          case 'utf-16be':
            {
              var le = null;
              if (bytes[0] === 0xff && bytes[1] === 0xfe) le = true;else if (bytes[0] === 0xfe && bytes[1] === 0xff) le = false;
              if (le !== null) {
                offset += 2;
                maxlength -= 2;
              }
              string = this.getUint16String(offset, maxlength, le === true);
              break;
            }
          case 'windows1251':
          default:
            string = this.getUint8String(offset, maxlength);
        }
        return {
          string: string.endsWith('\0') ? string.substring(0, string.length - 1) : string,
          length: bytes.length
        };
      }
    }, {
      key: "getCString",
      value: function getCString(offset) {
        var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'windows1251';
        var bytes, bytesPerChar;
        var limit = this.byteLength - offset;
        switch (format) {
          case 'utf16':
          case 'utf16be':
          case 'utf-16':
          case 'utf-16be':
            bytesPerChar = 2;
            bytes = this.getUint16(offset, limit);
            break;
          default:
            bytesPerChar = 1;
            bytes = this.getUint8(offset, limit);
        }
        if (!Array.isArray(bytes)) bytes = [bytes];
        for (var i = 0; i < bytes.length; i++) {
          if (bytes[i] === 0x00) {
            limit = (i + 1) * bytesPerChar;
            break;
          }
        }
        return this.getString(offset, limit, format);
      }
    }, {
      key: "getUint8String",
      value: function getUint8String(offset, length) {
        var bytes = this.getUint8(offset, length);
        var string = '';
        if (!Array.isArray(bytes)) bytes = [bytes];
        for (var i = 0; i < bytes.length; i++) {
          var character = String.fromCharCode(bytes[i]);
          string += character;
        }
        return string;
      }
    }, {
      key: "getUint16String",
      value: function getUint16String(offset, length) {
        var le = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var bytes = this.getUint16(offset, length, le);
        var string = '';
        if (!Array.isArray(bytes)) bytes = [bytes];
        for (var i = 0; i < bytes.length; i++) {
          var character = String.fromCharCode(bytes[i]);
          string += character;
        }
        return string;
      }
    }, {
      key: "getUint8",
      value: function getUint8(offset) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var limit = offset + length;
        var bytes = [];
        if (this.byteLength - limit < 0) return false;
        for (var i = offset; i < limit; i++) {
          var _byte = DataView.prototype.getUint8.call(this, i);
          bytes.push(_byte);
        }
        return bytes.length === 1 ? bytes[0] : bytes;
      }
    }, {
      key: "getUint16",
      value: function getUint16(offset) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var le = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        while (length % 2 !== 0) length -= 1;
        var limit = offset + length;
        var bytes = [];
        if (this.byteLength - limit < 0) return false;
        for (var i = offset; i < limit; i += 2) {
          var _byte2 = DataView.prototype.getUint16.call(this, i, le);
          bytes.push(_byte2);
        }
        return bytes.length === 1 ? bytes[0] : bytes;
      }
    }, {
      key: "getUint24",
      value: function getUint24(offset) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
        var le = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        while (length % 3 !== 0) length -= 1;
        var limit = offset + length;
        var bytes = [];
        if (this.byteLength - limit < 0 || length <= 0) return false;
        for (var i = offset; i < limit; i += 3) {
          var a = DataView.prototype.getUint16.call(this, i, le);
          var b = DataView.prototype.getUint8.call(this, i + 2);
          var _byte3 = le ? (b << 16) + a : (a << 8) + b;
          bytes.push(_byte3);
        }
        return bytes.length === 1 ? bytes[0] : bytes;
      }
    }, {
      key: "setUint24",
      value: function setUint24(offset, value) {
        var le = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (value > 16777215) return false;
        if (le) {
          DataView.prototype.setUint16.call(this, offset + 1, value >> 8, le);
          DataView.prototype.setUint8.call(this, offset, value & 0xFF);
        } else {
          DataView.prototype.setUint16.call(this, offset, value >> 8, le);
          DataView.prototype.setUint8.call(this, offset + 2, value & 0xFF);
        }
      }
    }], [{
      key: "isViewable",
      value: function isViewable(param) {
        if (isBuffer(param) || Array.isArray(param) || ArrayBuffer.isView(param)) {
          return true;
        }
        return false;
      }
    }]);
    return BufferView;
  }( /*#__PURE__*/_wrapNativeSuper(DataView));

  var anObject$8 = anObject$h;

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags$1 = function () {
    var that = anObject$8(this);
    var result = '';
    if (that.hasIndices) result += 'd';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.unicodeSets) result += 'v';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$d = fails$C;
  var global$a = global$w;

  // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var $RegExp$2 = global$a.RegExp;
  var UNSUPPORTED_Y$2 = fails$d(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') !== null;
  });

  // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008
  var MISSED_STICKY$2 = UNSUPPORTED_Y$2 || fails$d(function () {
    return !$RegExp$2('a', 'y').sticky;
  });
  var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$d(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') !== null;
  });
  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY$2,
    UNSUPPORTED_Y: UNSUPPORTED_Y$2
  };

  var fails$c = fails$C;
  var global$9 = global$w;

  // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  var $RegExp$1 = global$9.RegExp;
  var regexpUnsupportedDotAll = fails$c(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$b = fails$C;
  var global$8 = global$w;

  // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  var $RegExp = global$8.RegExp;
  var regexpUnsupportedNcg = fails$b(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  /* eslint-disable regexp/no-useless-quantifier -- testing */
  var call$a = functionCall;
  var uncurryThis$f = functionUncurryThis;
  var toString$d = toString$f;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$1 = regexpStickyHelpers;
  var shared$3 = sharedExports;
  var create = objectCreate;
  var getInternalState$3 = internalState.get;
  var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
  var nativeReplace = shared$3('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$7 = uncurryThis$f(''.charAt);
  var indexOf = uncurryThis$f(''.indexOf);
  var replace$5 = uncurryThis$f(''.replace);
  var stringSlice$5 = uncurryThis$f(''.slice);
  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$a(nativeExec, re1, 'a');
    call$a(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();
  var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;

  // nonparticipating capturing group, copied from es5-shim's String#split patch.
  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;
  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$3(re);
      var str = toString$d(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;
      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$a(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }
      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$1 && re.sticky;
      var flags = call$a(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;
      if (sticky) {
        flags = replace$5(flags, 'y', '');
        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }
        strCopy = stringSlice$5(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$7(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        }
        // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.
        reCopy = new RegExp('^(?:' + source + ')', flags);
      }
      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
      match = call$a(nativeExec, sticky ? reCopy : re, strCopy);
      if (sticky) {
        if (match) {
          match.input = stringSlice$5(match.input, charsAdded);
          match[0] = stringSlice$5(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
        call$a(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }
      if (match && groups) {
        match.groups = object = create(null);
        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }
      return match;
    };
  }
  var regexpExec$2 = patchedExec;

  var $$f = _export;
  var exec$3 = regexpExec$2;

  // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec
  $$f({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec$3
  }, {
    exec: exec$3
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var uncurryThis$e = functionUncurryThisClause;
  var defineBuiltIn$5 = defineBuiltIn$c;
  var regexpExec$1 = regexpExec$2;
  var fails$a = fails$C;
  var wellKnownSymbol$5 = wellKnownSymbol$q;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$9;
  var SPECIES = wellKnownSymbol$5('species');
  var RegExpPrototype$5 = RegExp.prototype;
  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$5(KEY);
    var DELEGATES_TO_SYMBOL = !fails$a(function () {
      // String methods call symbol-named RegEp methods
      var O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ''[KEY](O) !== 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$a(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;
      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {};
        // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.
        re.constructor = {};
        re.constructor[SPECIES] = function () {
          return re;
        };
        re.flags = '';
        re[SYMBOL] = /./[SYMBOL];
      }
      re.exec = function () {
        execCalled = true;
        return null;
      };
      re[SYMBOL]('');
      return !execCalled;
    });
    if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
      var uncurriedNativeRegExpMethod = uncurryThis$e(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$e(nativeMethod);
        var $exec = regexp.exec;
        if ($exec === regexpExec$1 || $exec === RegExpPrototype$5.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: uncurriedNativeRegExpMethod(regexp, str, arg2)
            };
          }
          return {
            done: true,
            value: uncurriedNativeMethod(str, regexp, arg2)
          };
        }
        return {
          done: false
        };
      });
      defineBuiltIn$5(String.prototype, KEY, methods[0]);
      defineBuiltIn$5(RegExpPrototype$5, SYMBOL, methods[1]);
    }
    if (SHAM) createNonEnumerableProperty$1(RegExpPrototype$5[SYMBOL], 'sham', true);
  };

  var uncurryThis$d = functionUncurryThis;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$8;
  var toString$c = toString$f;
  var requireObjectCoercible$4 = requireObjectCoercible$8;
  var charAt$6 = uncurryThis$d(''.charAt);
  var charCodeAt$1 = uncurryThis$d(''.charCodeAt);
  var stringSlice$4 = uncurryThis$d(''.slice);
  var createMethod$1 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$c(requireObjectCoercible$4($this));
      var position = toIntegerOrInfinity$1(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$6(S, position) : first : CONVERT_TO_STRING ? stringSlice$4(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };
  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$1(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$1(true)
  };

  var charAt$5 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex$2 = function (S, index, unicode) {
    return index + (unicode ? charAt$5(S, index).length : 1);
  };

  var uncurryThis$c = functionUncurryThis;
  var toObject$3 = toObject$c;
  var floor = Math.floor;
  var charAt$4 = uncurryThis$c(''.charAt);
  var replace$4 = uncurryThis$c(''.replace);
  var stringSlice$3 = uncurryThis$c(''.slice);
  // eslint-disable-next-line redos/no-vulnerable -- safe
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject$3(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace$4(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$4(ch, 0)) {
        case '$':
          return '$';
        case '&':
          return matched;
        case '`':
          return stringSlice$3(str, 0, position);
        case "'":
          return stringSlice$3(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$3(ch, 1, -1)];
          break;
        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$4(ch, 1) : captures[f - 1] + charAt$4(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var call$9 = functionCall;
  var anObject$7 = anObject$h;
  var isCallable$5 = isCallable$o;
  var classof$3 = classofRaw$2;
  var regexpExec = regexpExec$2;
  var $TypeError$1 = TypeError;

  // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec
  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;
    if (isCallable$5(exec)) {
      var result = call$9(exec, R, S);
      if (result !== null) anObject$7(result);
      return result;
    }
    if (classof$3(R) === 'RegExp') return call$9(regexpExec, R, S);
    throw $TypeError$1('RegExp#exec called on incompatible receiver');
  };

  var apply$1 = functionApply;
  var call$8 = functionCall;
  var uncurryThis$b = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$9 = fails$C;
  var anObject$6 = anObject$h;
  var isCallable$4 = isCallable$o;
  var isNullOrUndefined$1 = isNullOrUndefined$6;
  var toIntegerOrInfinity = toIntegerOrInfinity$8;
  var toLength$1 = toLength$9;
  var toString$b = toString$f;
  var requireObjectCoercible$3 = requireObjectCoercible$8;
  var advanceStringIndex$1 = advanceStringIndex$2;
  var getMethod$2 = getMethod$5;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol$4 = wellKnownSymbol$q;
  var REPLACE = wellKnownSymbol$4('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis$b([].concat);
  var push$2 = uncurryThis$b([].push);
  var stringIndexOf$2 = uncurryThis$b(''.indexOf);
  var stringSlice$2 = uncurryThis$b(''.slice);
  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  }();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  }();
  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$9(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
    return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$3(this);
      var replacer = isNullOrUndefined$1(searchValue) ? undefined : getMethod$2(searchValue, REPLACE);
      return replacer ? call$8(replacer, searchValue, O, replaceValue) : call$8(nativeReplace, toString$b(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$6(this);
      var S = toString$b(string);
      if (typeof replaceValue == 'string' && stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$2(replaceValue, '$<') === -1) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }
      var functionalReplace = isCallable$4(replaceValue);
      if (!functionalReplace) replaceValue = toString$b(replaceValue);
      var global = rx.global;
      var fullUnicode;
      if (global) {
        fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      var result;
      while (true) {
        result = regExpExec$1(rx, S);
        if (result === null) break;
        push$2(results, result);
        if (!global) break;
        var matchStr = toString$b(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$b(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        var replacement;
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push$2(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$2(replacerArgs, namedCaptures);
          replacement = toString$b(apply$1(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice$2(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice$2(S, nextSourcePosition);
    }];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  // TODO: Remove from `core-js@4`
  var uncurryThis$a = functionUncurryThis;
  var defineBuiltIn$4 = defineBuiltIn$c;
  var DatePrototype = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING$1 = 'toString';
  var nativeDateToString = uncurryThis$a(DatePrototype[TO_STRING$1]);
  var thisTimeValue = uncurryThis$a(DatePrototype.getTime);

  // `Date.prototype.toString` method
  // https://tc39.es/ecma262/#sec-date.prototype.tostring
  if (String(new Date(NaN)) !== INVALID_DATE) {
    defineBuiltIn$4(DatePrototype, TO_STRING$1, function toString() {
      var value = thisTimeValue(this);
      // eslint-disable-next-line no-self-compare -- NaN check
      return value === value ? nativeDateToString(this) : INVALID_DATE;
    });
  }

  var call$7 = functionCall;
  var hasOwn$6 = hasOwnProperty_1;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var regExpFlags$1 = regexpFlags$1;
  var RegExpPrototype$4 = RegExp.prototype;
  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype$4) && !hasOwn$6(R, 'flags') && isPrototypeOf$3(RegExpPrototype$4, R) ? call$7(regExpFlags$1, R) : flags;
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var defineBuiltIn$3 = defineBuiltIn$c;
  var anObject$5 = anObject$h;
  var $toString$1 = toString$f;
  var fails$8 = fails$C;
  var getRegExpFlags$1 = regexpGetFlags;
  var TO_STRING = 'toString';
  var RegExpPrototype$3 = RegExp.prototype;
  var nativeToString = RegExpPrototype$3[TO_STRING];
  var NOT_GENERIC = fails$8(function () {
    return nativeToString.call({
      source: 'a',
      flags: 'b'
    }) !== '/a/b';
  });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn$3(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$5(this);
      var pattern = $toString$1(R.source);
      var flags = $toString$1(getRegExpFlags$1(R));
      return '/' + pattern + '/' + flags;
    }, {
      unsafe: true
    });
  }

  // a string of all valid unicode whitespaces
  var whitespaces$3 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$9 = functionUncurryThis;
  var requireObjectCoercible$2 = requireObjectCoercible$8;
  var toString$a = toString$f;
  var whitespaces$2 = whitespaces$3;
  var replace$3 = uncurryThis$9(''.replace);
  var ltrim = RegExp('^[' + whitespaces$2 + ']+');
  var rtrim = RegExp('(^|[^' + whitespaces$2 + '])[' + whitespaces$2 + ']+$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod = function (TYPE) {
    return function ($this) {
      var string = toString$a(requireObjectCoercible$2($this));
      if (TYPE & 1) string = replace$3(string, ltrim, '');
      if (TYPE & 2) string = replace$3(string, rtrim, '$1');
      return string;
    };
  };
  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod(3)
  };

  var global$7 = global$w;
  var fails$7 = fails$C;
  var uncurryThis$8 = functionUncurryThis;
  var toString$9 = toString$f;
  var trim$1 = stringTrim.trim;
  var whitespaces$1 = whitespaces$3;
  var $parseInt$1 = global$7.parseInt;
  var Symbol$2 = global$7.Symbol;
  var ITERATOR$1 = Symbol$2 && Symbol$2.iterator;
  var hex = /^[+-]?0x/i;
  var exec$2 = uncurryThis$8(hex.exec);
  var FORCED$4 = $parseInt$1(whitespaces$1 + '08') !== 8 || $parseInt$1(whitespaces$1 + '0x16') !== 22
  // MS Edge 18- broken with boxed symbols
  || ITERATOR$1 && !fails$7(function () {
    $parseInt$1(Object(ITERATOR$1));
  });

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED$4 ? function parseInt(string, radix) {
    var S = trim$1(toString$9(string));
    return $parseInt$1(S, radix >>> 0 || (exec$2(hex, S) ? 16 : 10));
  } : $parseInt$1;

  var $$e = _export;
  var $parseInt = numberParseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  $$e({
    global: true,
    forced: parseInt !== $parseInt
  }, {
    parseInt: $parseInt
  });

  var $$d = _export;
  var $includes = arrayIncludes.includes;
  var fails$6 = fails$C;
  var addToUnscopables$1 = addToUnscopables$3;

  // FF99+ bug
  var BROKEN_ON_SPARSE = fails$6(function () {
    // eslint-disable-next-line es/no-array-prototype-includes -- detection
    return !Array(1).includes();
  });

  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  $$d({
    target: 'Array',
    proto: true,
    forced: BROKEN_ON_SPARSE
  }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables$1('includes');

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */
  var $$c = _export;
  var uncurryThis$7 = functionUncurryThisClause;
  var $indexOf = arrayIncludes.indexOf;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
  var nativeIndexOf = uncurryThis$7([].indexOf);
  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
  var FORCED$3 = NEGATIVE_ZERO || !arrayMethodIsStrict$1('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  $$c({
    target: 'Array',
    proto: true,
    forced: FORCED$3
  }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0 : $indexOf(this, searchElement, fromIndex);
    }
  });

  function isBitSet(_byte, bit) {
    return (_byte & 1 << bit) > 0;
  }
  function setBit(_byte2, bit) {
    return _byte2 | 1 << bit;
  }
  function decodeSynch(synch) {
    var out = 0;
    var mask = 0x7F000000;
    while (mask) {
      out >>= 1;
      out |= synch & mask;
      mask >>= 8;
    }
    return out;
  }
  function encodeSynch(size) {
    var out = 0;
    var mask = 0x7F;
    while (mask ^ 0x7FFFFFFF) {
      out = size & ~mask;
      out <<= 1;
      out |= size & mask;
      mask = (mask + 1 << 8) - 1;
      size = out;
    }
    return out;
  }
  function mergeBytes() {
    var merged = [];
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }
    params.forEach(function (param) {
      if (param.forEach) param.forEach(function (_byte3) {
        return merged.push(_byte3);
      });else merged.push(param);
    });
    return new Uint8Array(merged);
  }
  function synch(unsynch) {
    var bytes = [];
    var i = 0;
    while (i < unsynch.length) {
      bytes.push(unsynch[i]);
      if (unsynch[i] === 0xff && unsynch[i + 1] === 0x00) i++;
      i++;
    }
    return bytes;
  }
  function unsynch(synch) {
    var bytes = [];
    var i = 0;
    while (i < synch.length) {
      bytes.push(synch[i]);
      if (synch[i] === 0xff && (synch[i + 1] >= 0xe0 || synch[i + 1] === 0x00)) {
        bytes.push(0);
      }
      i++;
    }
    return bytes;
  }
  function dataBlock(data, max) {
    data = data || [];
    var bytes = [];
    var length = data.length;
    var offset = max - length;
    for (var i = 0; i < offset; i++) bytes.push(0);
    for (var _i = 0; _i < length; _i++) bytes.push(data[_i]);
    return bytes;
  }
  function bytesToLong(bytes) {
    var value = 0;
    for (var i = 0; i < bytes.length; i++) {
      value = value * 256 + bytes[i];
    }
    return value;
  }
  function longToBytes(_long) {
    var bytes = [];
    while (_long > 0) {
      var _byte4 = _long & 0xff;
      bytes.unshift(_byte4);
      _long = (_long - _byte4) / 256;
    }
    return bytes;
  }

  var GENRES = ['Blues', 'Classic Rock', 'Country', 'Dance', 'Disco', 'Funk', 'Grunge', 'Hip-Hop', 'Jazz', 'Metal', 'New Age', 'Oldies', 'Other', 'Pop', 'R&B', 'Rap', 'Reggae', 'Rock', 'Techno', 'Industrial', 'Alternative', 'Ska', 'Death Metal', 'Pranks', 'Soundtrack', 'Euro-Techno', 'Ambient', 'Trip-Hop', 'Vocal', 'Jazz+Funk', 'Fusion', 'Trance', 'Classical', 'Instrumental', 'Acid', 'House', 'Game', 'Sound Clip', 'Gospel', 'Noise', 'Alt. Rock', 'Bass', 'Soul', 'Punk', 'Space', 'Meditative', 'Instrumental Pop', 'Instrumental Rock', 'Ethnic', 'Gothic', 'Darkwave', 'Techno-Industrial', 'Electronic', 'Pop-Folk', 'Eurodance', 'Dream', 'Southern Rock', 'Comedy', 'Cult', 'Gangsta Rap', 'Top 40', 'Christian Rap', 'Pop/Funk', 'Jungle', 'Native American', 'Cabaret', 'New Wave', 'Psychedelic', 'Rave', 'Showtunes', 'Trailer', 'Lo-Fi', 'Tribal', 'Acid Punk', 'Acid Jazz', 'Polka', 'Retro', 'Musical', 'Rock & Roll', 'Hard Rock', 'Folk', 'Folk-Rock', 'National Folk', 'Swing', 'Fast-Fusion', 'Bebop', 'Latin', 'Revival', 'Celtic', 'Bluegrass', 'Avantgarde', 'Gothic Rock', 'Progressive Rock', 'Psychedelic Rock', 'Symphonic Rock', 'Slow Rock', 'Big Band', 'Chorus', 'Easy Listening', 'Acoustic', 'Humour', 'Speech', 'Chanson', 'Opera', 'Chamber Music', 'Sonata', 'Symphony', 'Booty Bass', 'Primus', 'Porn Groove', 'Satire', 'Slow Jam', 'Club', 'Tango', 'Samba', 'Folklore', 'Ballad', 'Power Ballad', 'Rhythmic Soul', 'Freestyle', 'Duet', 'Punk Rock', 'Drum Solo', 'A Cappella', 'Euro-House', 'Dance Hall', 'Goa', 'Drum & Bass', 'Club-House', 'Hardcore', 'Terror', 'Indie', 'BritPop', 'Afro-Punk', 'Polsk Punk', 'Beat', 'Christian Gangsta Rap', 'Heavy Metal', 'Black Metal', 'Crossover', 'Contemporary Christian', 'Christian Rock', 'Merengue', 'Salsa', 'Thrash Metal', 'Anime', 'JPop', 'Synthpop', 'Abstract', 'Art Rock', 'Baroque', 'Bhangra', 'Big Beat', 'Breakbeat', 'Chillout', 'Downtempo', 'Dub', 'EBM', 'Eclectic', 'Electro', 'Electroclash', 'Emo', 'Experimental', 'Garage', 'Global', 'IDM', 'Illbient', 'Industro-Goth', 'Jam Band', 'Krautrock', 'Leftfield', 'Lounge', 'Math Rock', 'New Romantic', 'Nu-Breakz', 'Post-Punk', 'Post-Rock', 'Psytrance', 'Shoegaze', 'Space Rock', 'Trop Rock', 'World Music', 'Neoclassical', 'Audiobook', 'Audio Theatre', 'Neue Deutsche Welle', 'Podcast', 'Indie Rock', 'G-Funk', 'Dubstep', 'Garage Rock', 'Psybient'];
  function hasID3v1(buffer) {
    var offset = buffer.byteLength - 128;
    if (offset > -1) {
      var view = new BufferView(buffer, offset);
      return view.getString(0, 3).string === 'TAG';
    } else return false;
  }
  function decode$1(buffer) {
    var view = new BufferView(buffer, buffer.byteLength - 128);
    var title = view.getString(3, 30, 'utf-8').string.replace(/\0/g, '');
    var artist = view.getString(33, 30, 'utf-8').string.replace(/\0/g, '');
    var album = view.getString(63, 30, 'utf-8').string.replace(/\0/g, '');
    var year = view.getString(93, 4, 'utf-8').string.replace(/\0/g, '');
    var track = view.getUint8(126).toString() || '';
    var comment = view.getString(97, track !== null ? 28 : 30, 'utf-8').string.replace(/\0/g, '');
    var genre = GENRES[view.getUint8(127)] || '';
    var tags = {
      title: title,
      artist: artist,
      album: album,
      year: year,
      track: track,
      comment: comment,
      genre: genre
    };
    var details = {
      version: track ? 1 : 0,
      size: 128
    };
    return {
      tags: tags,
      details: details
    };
  }
  function validate$1(tags, strict) {
    var title = tags.title,
      artist = tags.artist,
      album = tags.album,
      year = tags.year,
      comment = tags.comment,
      track = tags.track,
      genre = tags.genre;
    if (typeof title !== 'string') {
      throw new Error('Title is not a string');
    } else if (encodeString(title, 'utf-8').length > 30) {
      throw new Error('Title length exceeds 30 characters');
    }
    if (typeof artist !== 'string') {
      throw new Error('Artist is not a string');
    } else if (encodeString(artist, 'utf-8').length > 30) {
      throw new Error('Artist length exceeds 30 characters');
    }
    if (typeof album !== 'string') {
      throw new Error('Album is not a string');
    } else if (encodeString(album, 'utf-8').length > 30) {
      throw new Error('Album length exceeds 30 characters');
    }
    if (typeof year !== 'string') {
      throw new Error('Year is not a string');
    } else if (encodeString(year, 'utf-8').length > 4) {
      throw new Error('Year length exceeds 4 characters');
    }
    if (typeof comment !== 'string') {
      throw new Error('Comment is not a string');
    }
    if (typeof track !== 'string') {
      throw new Error('Track is not a string');
    } else if (parseInt(track) > 255 || parseInt(track) < 0) {
      throw new Error('Track should be in range 255 - 0');
    }
    if (track !== '') {
      if (encodeString(comment, 'utf-8').length > 28) {
        throw new Error('Comment length exceeds 28 characters');
      }
    } else if (encodeString(comment, 'utf-8').length > 30) {
      throw new Error('Comment length exceeds 30 characters');
    }
    if (typeof genre !== 'string') {
      throw new Error('Genre is not a string');
    } else if (strict && !GENRES.includes(genre) && genre !== '') {
      throw new Error('Unknown genre');
    }
    return true;
  }
  function encode$1(tags) {
    var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';
    var title = tags.title,
      artist = tags.artist,
      album = tags.album,
      year = tags.year,
      comment = tags.comment,
      track = tags.track,
      genre = tags.genre;
    title = encodeString(title, encoding);
    artist = encodeString(artist, encoding);
    album = encodeString(album, encoding);
    year = encodeString(year, encoding);
    comment = encodeString(comment, encoding);
    genre = GENRES.indexOf(genre);
    while (title.length < 30) title.push(0);
    while (artist.length < 30) artist.push(0);
    while (album.length < 30) album.push(0);
    while (year.length < 4) year.push(0);
    if (track !== '') {
      while (comment.length < 28) comment.push(0);
      comment.push(0, parseInt(track));
    } else {
      while (comment.length < 30) comment.push(0);
    }
    return mergeBytes(0x54, 0x41, 0x47, title, artist, album, year, comment, genre > -1 ? genre : 12).buffer;
  }

  var global$6 = global$w;
  var DESCRIPTORS$4 = descriptors;
  var defineBuiltInAccessor$3 = defineBuiltInAccessor$8;
  var regExpFlags = regexpFlags$1;
  var fails$5 = fails$C;

  // babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
  var RegExp$1 = global$6.RegExp;
  var RegExpPrototype$2 = RegExp$1.prototype;
  var FORCED$2 = DESCRIPTORS$4 && fails$5(function () {
    var INDICES_SUPPORT = true;
    try {
      RegExp$1('.', 'd');
    } catch (error) {
      INDICES_SUPPORT = false;
    }
    var O = {};
    // modern V8 bug
    var calls = '';
    var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';
    var addGetter = function (key, chr) {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(O, key, {
        get: function () {
          calls += chr;
          return true;
        }
      });
    };
    var pairs = {
      dotAll: 's',
      global: 'g',
      ignoreCase: 'i',
      multiline: 'm',
      sticky: 'y'
    };
    if (INDICES_SUPPORT) pairs.hasIndices = 'd';
    for (var key in pairs) addGetter(key, pairs[key]);

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var result = Object.getOwnPropertyDescriptor(RegExpPrototype$2, 'flags').get.call(O);
    return result !== expected || calls !== expected;
  });

  // `RegExp.prototype.flags` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  if (FORCED$2) defineBuiltInAccessor$3(RegExpPrototype$2, 'flags', {
    configurable: true,
    get: regExpFlags
  });

  var call$6 = functionCall;
  var anObject$4 = anObject$h;
  var getMethod$1 = getMethod$5;
  var iteratorClose$1 = function (iterator, kind, value) {
    var innerResult, innerError;
    anObject$4(iterator);
    try {
      innerResult = getMethod$1(iterator, 'return');
      if (!innerResult) {
        if (kind === 'throw') throw value;
        return value;
      }
      innerResult = call$6(innerResult, iterator);
    } catch (error) {
      innerError = true;
      innerResult = error;
    }
    if (kind === 'throw') throw value;
    if (innerError) throw innerResult;
    anObject$4(innerResult);
    return value;
  };

  var anObject$3 = anObject$h;
  var iteratorClose = iteratorClose$1;

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject$3(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var bind$1 = functionBindContext;
  var call$5 = functionCall;
  var toObject$2 = toObject$c;
  var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$2;
  var isConstructor = isConstructor$4;
  var lengthOfArrayLike$2 = lengthOfArrayLike$f;
  var createProperty = createProperty$4;
  var getIterator = getIterator$2;
  var getIteratorMethod = getIteratorMethod$3;
  var $Array = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject$2(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (; !(step = call$5(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike$2(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
      for (; length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
  };

  var $$b = _export;
  var from = arrayFrom;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$2;
  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  $$b({
    target: 'Array',
    stat: true,
    forced: INCORRECT_ITERATION
  }, {
    from: from
  });

  var charAt$3 = stringMultibyte.charAt;
  var toString$8 = toString$f;
  var InternalStateModule$1 = internalState;
  var defineIterator = iteratorDefine;
  var createIterResultObject = createIterResultObject$2;
  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = InternalStateModule$1.set;
  var getInternalState$2 = InternalStateModule$1.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: toString$8(iterated),
      index: 0
    });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$2(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt$3(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
  });

  var $$a = _export;
  var uncurryThis$6 = functionUncurryThis;
  var notARegExp = notARegexp;
  var requireObjectCoercible$1 = requireObjectCoercible$8;
  var toString$7 = toString$f;
  var correctIsRegExpLogic = correctIsRegexpLogic;
  var stringIndexOf$1 = uncurryThis$6(''.indexOf);

  // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes
  $$a({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
  }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~stringIndexOf$1(toString$7(requireObjectCoercible$1(this)), toString$7(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  function getHeaderFlags(_byte, version) {
    var flags = {
      unsynchronisation: isBitSet(_byte, 7)
    };
    switch (version) {
      case 2:
        flags.compression = isBitSet(_byte, 6);
        break;
      case 3:
        flags.extendedHeader = isBitSet(_byte, 6);
        flags.experimentalIndicator = isBitSet(_byte, 5);
        break;
      case 4:
        flags.extendedHeader = isBitSet(_byte, 6);
        flags.experimentalIndicator = isBitSet(_byte, 5);
        flags.footerPresent = isBitSet(_byte, 4);
        break;
    }
    return flags;
  }
  function getFrameFlags(bytes, version) {
    var flags = {};
    switch (version) {
      case 3:
        flags.tagAlterPreservation = isBitSet(bytes[0], 7);
        flags.fileAlterPreservation = isBitSet(bytes[0], 6);
        flags.readOnly = isBitSet(bytes[0], 5);
        flags.compression = isBitSet(bytes[1], 7);
        flags.encryption = isBitSet(bytes[1], 6);
        flags.groupingIdentity = isBitSet(bytes[1], 5);
        break;
      case 4:
        flags.tagAlterPreservation = isBitSet(bytes[0], 6);
        flags.fileAlterPreservation = isBitSet(bytes[0], 5);
        flags.readOnly = isBitSet(bytes[0], 4);
        flags.groupingIdentity = isBitSet(bytes[1], 6);
        flags.compression = isBitSet(bytes[1], 3);
        flags.encryption = isBitSet(bytes[1], 2);
        flags.unsynchronisation = isBitSet(bytes[1], 1);
        flags.dataLengthIndicator = isBitSet(bytes[1], 0);
        break;
    }
    return flags;
  }

  function textFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var len = view.byteLength - 1;
    return version === 3 || version === 2 ? view.getCString(1, encoding).string.replace(/\//g, '\\\\') : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
  }
  function setFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var len = view.byteLength - 1;
    return version === 3 || version === 2 ? view.getCString(1, encoding).string : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
  }
  function iplsFrame$1(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var len = view.byteLength - 1;
    return view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
  }
  function urlFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    return view.getCString(0).string;
  }
  function txxxFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var description = view.getCString(1, encoding);
    var valueOffset = description.length + 1;
    var valueLength = view.byteLength - valueOffset;
    var value = view.getString(valueOffset, valueLength, encoding);
    return {
      description: description.string,
      text: value.string
    };
  }
  function wxxxFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var description = view.getCString(1, encoding);
    var urlOffset = description.length + 1;
    var urlLength = view.byteLength - urlOffset;
    var url = view.getString(urlOffset, urlLength);
    return {
      description: description.string,
      url: url.string
    };
  }
  function langDescFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var descriptor = view.getCString(4, encoding);
    var textOffset = descriptor.length + 4;
    var textLength = view.byteLength - textOffset;
    var text = view.getString(textOffset, textLength, encoding);
    return {
      language: view.getString(1, 3).string,
      descriptor: descriptor.string,
      text: text.string
    };
  }
  function win1251Frame$1(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var length = view.byteLength - 1;
    return view.getString(1, length, encoding).string;
  }
  function apicFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var mime = view.getCString(1);
    var type = view.getUint8(mime.length + 1);
    var desc = view.getCString(mime.length + 2, encoding);
    var dataOffset = mime.length + desc.length + 2;
    var dataLength = view.byteLength - dataOffset;
    var data = view.getUint8(dataOffset, dataLength);
    var dataArr = Array.isArray(data) ? data : [data];
    return {
      format: mime.string,
      type: type,
      description: desc.string,
      data: dataArr
    };
  }
  function geobFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var mime = view.getCString(1);
    var fname = view.getCString(mime.length + 1, encoding);
    var desc = view.getCString(fname.length + mime.length + 1, encoding);
    var binOffset = mime.length + fname.length + desc.length + 1;
    var binLength = view.byteLength - binOffset;
    var object = view.getUint8(binOffset, binLength);
    var dataArr = Array.isArray(object) ? object : [object];
    return {
      format: mime.string,
      filename: fname.string,
      description: desc.string,
      object: dataArr
    };
  }
  function ufidFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var ownerId = view.getCString(0);
    var id = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
    var dataArr = Array.isArray(id) ? id : [id];
    return {
      ownerId: ownerId.string,
      id: dataArr
    };
  }
  function userFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    return {
      language: view.getString(1, 3).string,
      text: view.getString(4, view.byteLength - 4, encoding).string
    };
  }
  function owneFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var currencyCode = view.getString(1, 3);
    var currency = view.getCString(4);
    var date = view.getString(currency.length + 4, 8);
    var sellerOffset = currency.length + date.length + 4;
    var sellerLength = view.byteLength - sellerOffset;
    var seller = view.getString(sellerOffset, sellerLength, encoding);
    return {
      currencyCode: currencyCode.string,
      currencyPrice: currency.string,
      date: date.string,
      seller: seller.string
    };
  }
  function privFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var ownerId = view.getCString(0);
    var data = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
    var dataArr = Array.isArray(data) ? data : [data];
    return {
      ownerId: ownerId.string,
      data: dataArr
    };
  }
  function rvadFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var incdec = view.getUint8(0);
    var bitsvolume = view.getUint8(1);
    var datablocks = [];
    var blocklength = Math.ceil(bitsvolume / 8);
    for (var i = 2; i < view.byteLength; i += blocklength) {
      datablocks.push(view.getUint8(i, blocklength));
    }
    return {
      bitsvolume: bitsvolume,
      incdec: {
        right: isBitSet(incdec, 0),
        left: isBitSet(incdec, 1),
        rightback: isBitSet(incdec, 2),
        leftback: isBitSet(incdec, 3),
        center: isBitSet(incdec, 4),
        bass: isBitSet(incdec, 5)
      },
      volumechange: {
        right: typeof datablocks[0] !== 'undefined' ? datablocks[0] : [],
        left: typeof datablocks[1] !== 'undefined' ? datablocks[1] : [],
        rightback: typeof datablocks[4] !== 'undefined' ? datablocks[4] : [],
        leftback: typeof datablocks[5] !== 'undefined' ? datablocks[5] : [],
        center: typeof datablocks[8] !== 'undefined' ? datablocks[8] : [],
        bass: typeof datablocks[10] !== 'undefined' ? datablocks[10] : []
      },
      peakvolume: {
        right: typeof datablocks[2] !== 'undefined' ? datablocks[2] : [],
        left: typeof datablocks[3] !== 'undefined' ? datablocks[3] : [],
        rightback: typeof datablocks[6] !== 'undefined' ? datablocks[6] : [],
        leftback: typeof datablocks[7] !== 'undefined' ? datablocks[7] : [],
        center: typeof datablocks[9] !== 'undefined' ? datablocks[9] : [],
        bass: typeof datablocks[11] !== 'undefined' ? datablocks[11] : []
      }
    };
  }
  function rva2Frame$2(buffer, version) {
    var view = new BufferView(buffer);
    var identification = view.getCString(0);
    var channels = [];
    var read = identification.length;
    while (read < view.byteLength) {
      var type = view.getUint8(read);
      var volumeadjust = view.getInt16(read + 1, true);
      var bitspeak = view.getUint8(read + 3);
      var length = Math.ceil(bitspeak / 8);
      var peakvolume = view.getUint8(read + 4, length);
      channels.push({
        type: type,
        volumeadjust: volumeadjust,
        bitspeak: bitspeak,
        peakvolume: Array.isArray(peakvolume) ? peakvolume : [peakvolume]
      });
      read += 4 + length;
    }
    return {
      identification: identification.string,
      channels: channels
    };
  }
  function signFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var data = view.getUint8(1, view.byteLength - 1);
    var dataArr = Array.isArray(data) ? data : [data];
    return {
      group: view.getUint8(0),
      signature: dataArr
    };
  }
  function seekFrame(buffer, version) {
    var view = new BufferView(buffer);
    return view.getUint32(0);
  }
  function formatted(time, line) {
    var minutes = Math.floor(time / 60000).toString();
    var seconds = Math.floor(time % 60000 / 1000).toString();
    seconds = seconds.length === 1 ? '0' + seconds : seconds;
    var ms = (time % 1000).toString();
    while (ms.length < 3) ms = '0' + ms;
    return "[".concat(minutes, ":").concat(seconds, ".").concat(ms, "] ").concat(line, "\n");
  }
  function syltFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var language = view.getString(1, 3).string;
    var format = view.getUint8(4);
    var type = view.getUint8(5);
    var _descriptor = view.getCString(6, encoding);
    var descriptor = _descriptor.string;
    var dataOffset = _descriptor.length + 6;
    var length = view.byteLength - dataOffset;
    var raw = view.getUint8(dataOffset, length);
    var rview = new BufferView(Array.isArray(raw) ? raw : [raw]);
    var data = [];
    var lyrics = '';
    for (var i = 0; i < raw.length; i += 4) {
      var _line = rview.getCString(i, encoding);
      var line = _line.string;
      var time = rview.getUint32(i + _line.length);
      data.push({
        time: time,
        line: line
      });
      lyrics += formatted(time, line);
      i += _line.length;
    }
    return {
      language: language,
      format: format,
      type: type,
      descriptor: descriptor,
      data: data,
      lyrics: lyrics
    };
  }
  function mcdiFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var data = view.getUint8(0, view.byteLength);
    var dataArr = Array.isArray(data) ? data : [data];
    return {
      data: dataArr
    };
  }
  function sytcFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var format = view.getUint8(0);
    var raw = view.getUint8(1, view.byteLength - 1);
    var rview = new BufferView(Array.isArray(raw) ? raw : [raw]);
    var data = [];
    for (var i = 0; i < raw.length; i += 5) {
      var bpm = rview.getUint8(i);
      if (bpm === 255) {
        bpm += rview.getUint8(++i);
      }
      var time = rview.getUint32(i + 1);
      data.push({
        bpm: bpm,
        time: time
      });
    }
    return {
      format: format,
      data: data
    };
  }
  function etcoFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var format = view.getUint8(0);
    var raw = view.getUint8(1, view.byteLength - 1);
    var rview = new BufferView(Array.isArray(raw) ? raw : [raw]);
    var data = [];
    for (var i = 0; i < raw.length; i += 5) {
      var event = rview.getUint8(i);
      var time = rview.getUint32(i + 1);
      data.push({
        event: event,
        time: time
      });
    }
    return {
      format: format,
      data: data
    };
  }
  function pcntFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var data = view.getUint8(0, view.byteLength);
    var dataArr = Array.isArray(data) ? data : [data];
    return bytesToLong(dataArr).toString();
  }
  function popmFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[0];
    var email = view.getCString(0, encoding);
    var rating = view.getUint8(email.length);
    var counterOffset = email.length + 1;
    var counterLimit = buffer.byteLength - counterOffset;
    var counter = 0;
    if (counterLimit > 0) {
      var counterBytes = view.getUint8(counterOffset, counterLimit);
      var counterBytesArr = Array.isArray(counterBytes) ? counterBytes : [counterBytes];
      counter = bytesToLong(counterBytesArr);
    }
    return {
      email: email.string,
      rating: rating,
      counter: counter
    };
  }

  var call$4 = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject$2 = anObject$h;
  var isNullOrUndefined = isNullOrUndefined$6;
  var toLength = toLength$9;
  var toString$6 = toString$f;
  var requireObjectCoercible = requireObjectCoercible$8;
  var getMethod = getMethod$5;
  var advanceStringIndex = advanceStringIndex$2;
  var regExpExec = regexpExecAbstract;

  // @@match logic
  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
      return matcher ? call$4(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$6(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$2(this);
      var S = toString$6(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done) return res.value;
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString$6(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }];
  });

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var classof$2 = classofRaw$2;
  var toIndexedObject$1 = toIndexedObject$a;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var arraySlice$1 = arraySliceSimple;
  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return arraySlice$1(windowNames);
    }
  };

  // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$2(it) === 'Window' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$1(it));
  };

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$3 = wellKnownSymbol$q;
  wellKnownSymbolWrapped.f = wellKnownSymbol$3;

  var global$5 = global$w;
  var path$1 = global$5;

  var path = path$1;
  var hasOwn$5 = hasOwnProperty_1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$1 = objectDefineProperty.f;
  var wellKnownSymbolDefine = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!hasOwn$5(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var call$3 = functionCall;
  var getBuiltIn$2 = getBuiltIn$8;
  var wellKnownSymbol$2 = wellKnownSymbol$q;
  var defineBuiltIn$2 = defineBuiltIn$c;
  var symbolDefineToPrimitive = function () {
    var Symbol = getBuiltIn$2('Symbol');
    var SymbolPrototype = Symbol && Symbol.prototype;
    var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
    var TO_PRIMITIVE = wellKnownSymbol$2('toPrimitive');
    if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
      // `Symbol.prototype[@@toPrimitive]` method
      // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
      // eslint-disable-next-line no-unused-vars -- required for .length
      defineBuiltIn$2(SymbolPrototype, TO_PRIMITIVE, function (hint) {
        return call$3(valueOf, this);
      }, {
        arity: 1
      });
    }
  };

  var $$9 = _export;
  var global$4 = global$w;
  var call$2 = functionCall;
  var uncurryThis$5 = functionUncurryThis;
  var DESCRIPTORS$3 = descriptors;
  var NATIVE_SYMBOL$4 = symbolConstructorDetection;
  var fails$4 = fails$C;
  var hasOwn$4 = hasOwnProperty_1;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var anObject$1 = anObject$h;
  var toIndexedObject = toIndexedObject$a;
  var toPropertyKey = toPropertyKey$5;
  var $toString = toString$f;
  var createPropertyDescriptor = createPropertyDescriptor$6;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule = objectDefineProperty;
  var definePropertiesModule = objectDefineProperties;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var defineBuiltIn$1 = defineBuiltIn$c;
  var defineBuiltInAccessor$2 = defineBuiltInAccessor$8;
  var shared$2 = sharedExports;
  var sharedKey = sharedKey$4;
  var hiddenKeys = hiddenKeys$5;
  var uid = uid$4;
  var wellKnownSymbol$1 = wellKnownSymbol$q;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol = wellKnownSymbolDefine;
  var defineSymbolToPrimitive = symbolDefineToPrimitive;
  var setToStringTag = setToStringTag$4;
  var InternalStateModule = internalState;
  var $forEach = arrayIteration.forEach;
  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var setInternalState = InternalStateModule.set;
  var getInternalState$1 = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$4.Symbol;
  var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
  var TypeError$1 = global$4.TypeError;
  var QObject = global$4.QObject;
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var push$1 = uncurryThis$5([].push);
  var AllSymbols = shared$2('symbols');
  var ObjectPrototypeSymbols = shared$2('op-symbols');
  var WellKnownSymbolsStore = shared$2('wks');

  // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

  // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
  var setSymbolDescriptor = DESCRIPTORS$3 && fails$4(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function () {
        return nativeDefineProperty(this, 'a', {
          value: 7
        }).a;
      }
    })).a !== 7;
  }) ? function (O, P, Attributes) {
    var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
    if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
    nativeDefineProperty(O, P, Attributes);
    if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
      nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
    }
  } : nativeDefineProperty;
  var wrap = function (tag, description) {
    var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$3) symbol.description = description;
    return symbol;
  };
  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject$1(O);
    var key = toPropertyKey(P);
    anObject$1(Attributes);
    if (hasOwn$4(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$4(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$4(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }
      return setSymbolDescriptor(O, key, Attributes);
    }
    return nativeDefineProperty(O, key, Attributes);
  };
  var $defineProperties = function defineProperties(O, Properties) {
    anObject$1(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!DESCRIPTORS$3 || call$2($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };
  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };
  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = call$2(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype && hasOwn$4(AllSymbols, P) && !hasOwn$4(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$4(this, P) || !hasOwn$4(AllSymbols, P) || hasOwn$4(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };
  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype && hasOwn$4(AllSymbols, key) && !hasOwn$4(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);
    if (descriptor && hasOwn$4(AllSymbols, key) && !(hasOwn$4(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }
    return descriptor;
  };
  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!hasOwn$4(AllSymbols, key) && !hasOwn$4(hiddenKeys, key)) push$1(result, key);
    });
    return result;
  };
  var $getOwnPropertySymbols = function (O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (hasOwn$4(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$4(ObjectPrototype, key))) {
        push$1(result, AllSymbols[key]);
      }
    });
    return result;
  };

  // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor
  if (!NATIVE_SYMBOL$4) {
    $Symbol = function Symbol() {
      if (isPrototypeOf$2(SymbolPrototype$1, this)) throw TypeError$1('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
      var tag = uid(description);
      var setter = function (value) {
        if (this === ObjectPrototype) call$2(setter, ObjectPrototypeSymbols, value);
        if (hasOwn$4(this, HIDDEN) && hasOwn$4(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };
      if (DESCRIPTORS$3 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
        configurable: true,
        set: setter
      });
      return wrap(tag, description);
    };
    SymbolPrototype$1 = $Symbol[PROTOTYPE];
    defineBuiltIn$1(SymbolPrototype$1, 'toString', function toString() {
      return getInternalState$1(this).tag;
    });
    defineBuiltIn$1($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });
    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule.f = $defineProperty;
    definePropertiesModule.f = $defineProperties;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule$1.f = $getOwnPropertySymbols;
    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$1(name), name);
    };
    if (DESCRIPTORS$3) {
      // https://github.com/tc39/proposal-Symbol-description
      defineBuiltInAccessor$2(SymbolPrototype$1, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$1(this).description;
        }
      });
      {
        defineBuiltIn$1(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
          unsafe: true
        });
      }
    }
  }
  $$9({
    global: true,
    constructor: true,
    wrap: true,
    forced: !NATIVE_SYMBOL$4,
    sham: !NATIVE_SYMBOL$4
  }, {
    Symbol: $Symbol
  });
  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });
  $$9({
    target: SYMBOL,
    stat: true,
    forced: !NATIVE_SYMBOL$4
  }, {
    useSetter: function () {
      USE_SETTER = true;
    },
    useSimple: function () {
      USE_SETTER = false;
    }
  });
  $$9({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL$4,
    sham: !DESCRIPTORS$3
  }, {
    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    create: $create,
    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    defineProperty: $defineProperty,
    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    defineProperties: $defineProperties,
    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor
  });
  $$9({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL$4
  }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames
  });

  // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
  defineSymbolToPrimitive();

  // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
  setToStringTag($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  var NATIVE_SYMBOL$3 = symbolConstructorDetection;

  /* eslint-disable es/no-symbol -- safe */
  var symbolRegistryDetection = NATIVE_SYMBOL$3 && !!Symbol['for'] && !!Symbol.keyFor;

  var $$8 = _export;
  var getBuiltIn$1 = getBuiltIn$8;
  var hasOwn$3 = hasOwnProperty_1;
  var toString$5 = toString$f;
  var shared$1 = sharedExports;
  var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;
  var StringToSymbolRegistry = shared$1('string-to-symbol-registry');
  var SymbolToStringRegistry$1 = shared$1('symbol-to-string-registry');

  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  $$8({
    target: 'Symbol',
    stat: true,
    forced: !NATIVE_SYMBOL_REGISTRY$1
  }, {
    'for': function (key) {
      var string = toString$5(key);
      if (hasOwn$3(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = getBuiltIn$1('Symbol')(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry$1[symbol] = string;
      return symbol;
    }
  });

  var $$7 = _export;
  var hasOwn$2 = hasOwnProperty_1;
  var isSymbol$1 = isSymbol$5;
  var tryToString = tryToString$6;
  var shared = sharedExports;
  var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;
  var SymbolToStringRegistry = shared('symbol-to-string-registry');

  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  $$7({
    target: 'Symbol',
    stat: true,
    forced: !NATIVE_SYMBOL_REGISTRY
  }, {
    keyFor: function keyFor(sym) {
      if (!isSymbol$1(sym)) throw TypeError(tryToString(sym) + ' is not a symbol');
      if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    }
  });

  var uncurryThis$4 = functionUncurryThis;
  var isArray$1 = isArray$6;
  var isCallable$3 = isCallable$o;
  var classof$1 = classofRaw$2;
  var toString$4 = toString$f;
  var push = uncurryThis$4([].push);
  var getJsonReplacerFunction = function (replacer) {
    if (isCallable$3(replacer)) return replacer;
    if (!isArray$1(replacer)) return;
    var rawLength = replacer.length;
    var keys = [];
    for (var i = 0; i < rawLength; i++) {
      var element = replacer[i];
      if (typeof element == 'string') push(keys, element);else if (typeof element == 'number' || classof$1(element) === 'Number' || classof$1(element) === 'String') push(keys, toString$4(element));
    }
    var keysLength = keys.length;
    var root = true;
    return function (key, value) {
      if (root) {
        root = false;
        return value;
      }
      if (isArray$1(this)) return value;
      for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
    };
  };

  var $$6 = _export;
  var getBuiltIn = getBuiltIn$8;
  var apply = functionApply;
  var call$1 = functionCall;
  var uncurryThis$3 = functionUncurryThis;
  var fails$3 = fails$C;
  var isCallable$2 = isCallable$o;
  var isSymbol = isSymbol$5;
  var arraySlice = arraySlice$5;
  var getReplacerFunction = getJsonReplacerFunction;
  var NATIVE_SYMBOL$2 = symbolConstructorDetection;
  var $String = String;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var exec$1 = uncurryThis$3(/./.exec);
  var charAt$2 = uncurryThis$3(''.charAt);
  var charCodeAt = uncurryThis$3(''.charCodeAt);
  var replace$2 = uncurryThis$3(''.replace);
  var numberToString = uncurryThis$3(1.0.toString);
  var tester = /[\uD800-\uDFFF]/g;
  var low = /^[\uD800-\uDBFF]$/;
  var hi = /^[\uDC00-\uDFFF]$/;
  var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$2 || fails$3(function () {
    var symbol = getBuiltIn('Symbol')('stringify detection');
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) !== '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({
      a: symbol
    }) !== '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) !== '{}';
  });

  // https://github.com/tc39/proposal-well-formed-stringify
  var ILL_FORMED_UNICODE = fails$3(function () {
    return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify('\uDEAD') !== '"\\udead"';
  });
  var stringifyWithSymbolsFix = function (it, replacer) {
    var args = arraySlice(arguments);
    var $replacer = getReplacerFunction(replacer);
    if (!isCallable$2($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
    args[1] = function (key, value) {
      // some old implementations (like WebKit) could pass numbers as keys
      if (isCallable$2($replacer)) value = call$1($replacer, this, $String(key), value);
      if (!isSymbol(value)) return value;
    };
    return apply($stringify, null, args);
  };
  var fixIllFormed = function (match, offset, string) {
    var prev = charAt$2(string, offset - 1);
    var next = charAt$2(string, offset + 1);
    if (exec$1(low, match) && !exec$1(hi, next) || exec$1(hi, match) && !exec$1(low, prev)) {
      return '\\u' + numberToString(charCodeAt(match, 0), 16);
    }
    return match;
  };
  if ($stringify) {
    // `JSON.stringify` method
    // https://tc39.es/ecma262/#sec-json.stringify
    $$6({
      target: 'JSON',
      stat: true,
      arity: 3,
      forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice(arguments);
        var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
        return ILL_FORMED_UNICODE && typeof result == 'string' ? replace$2(result, tester, fixIllFormed) : result;
      }
    });
  }

  var $$5 = _export;
  var NATIVE_SYMBOL$1 = symbolConstructorDetection;
  var fails$2 = fails$C;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var toObject$1 = toObject$c;

  // V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443
  var FORCED$1 = !NATIVE_SYMBOL$1 || fails$2(function () {
    getOwnPropertySymbolsModule.f(1);
  });

  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  $$5({
    target: 'Object',
    stat: true,
    forced: FORCED$1
  }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$1(it)) : [];
    }
  });

  var $$4 = _export;
  var DESCRIPTORS$2 = descriptors;
  var global$3 = global$w;
  var uncurryThis$2 = functionUncurryThis;
  var hasOwn$1 = hasOwnProperty_1;
  var isCallable$1 = isCallable$o;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var toString$3 = toString$f;
  var defineBuiltInAccessor$1 = defineBuiltInAccessor$8;
  var copyConstructorProperties = copyConstructorProperties$2;
  var NativeSymbol = global$3.Symbol;
  var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;
  if (DESCRIPTORS$2 && isCallable$1(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined)) {
    var EmptyStringDescriptionStore = {};
    // wrap Symbol constructor for correct work with undefined description
    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$3(arguments[0]);
      var result = isPrototypeOf$1(SymbolPrototype, this) ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };
    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    SymbolWrapper.prototype = SymbolPrototype;
    SymbolPrototype.constructor = SymbolWrapper;
    var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)';
    var thisSymbolValue = uncurryThis$2(SymbolPrototype.valueOf);
    var symbolDescriptiveString = uncurryThis$2(SymbolPrototype.toString);
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    var replace$1 = uncurryThis$2(''.replace);
    var stringSlice$1 = uncurryThis$2(''.slice);
    defineBuiltInAccessor$1(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = thisSymbolValue(this);
        if (hasOwn$1(EmptyStringDescriptionStore, symbol)) return '';
        var string = symbolDescriptiveString(symbol);
        var desc = NATIVE_SYMBOL ? stringSlice$1(string, 7, -1) : replace$1(string, regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });
    $$4({
      global: true,
      constructor: true,
      forced: true
    }, {
      Symbol: SymbolWrapper
    });
  }

  var $$3 = _export;
  var $every = arrayIteration.every;
  var arrayMethodIsStrict = arrayMethodIsStrict$4;
  var STRICT_METHOD = arrayMethodIsStrict('every');

  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  $$3({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD
  }, {
    every: function every(callbackfn /* , thisArg */) {
      return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // TODO: Remove from `core-js@4` since it's moved to entry points

  var $$2 = _export;
  var call = functionCall;
  var isCallable = isCallable$o;
  var anObject = anObject$h;
  var toString$2 = toString$f;
  var DELEGATES_TO_EXEC = function () {
    var execCalled = false;
    var re = /[ac]/;
    re.exec = function () {
      execCalled = true;
      return /./.exec.apply(this, arguments);
    };
    return re.test('abc') === true && execCalled;
  }();
  var nativeTest = /./.test;

  // `RegExp.prototype.test` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.test
  $$2({
    target: 'RegExp',
    proto: true,
    forced: !DELEGATES_TO_EXEC
  }, {
    test: function (S) {
      var R = anObject(this);
      var string = toString$2(S);
      var exec = R.exec;
      if (!isCallable(exec)) return call(nativeTest, R, string);
      var result = call(exec, R, string);
      if (result === null) return false;
      anObject(result);
      return true;
    }
  });

  var global$2 = global$w;
  var fails$1 = fails$C;
  var uncurryThis$1 = functionUncurryThis;
  var toString$1 = toString$f;
  var trim = stringTrim.trim;
  var whitespaces = whitespaces$3;
  var charAt$1 = uncurryThis$1(''.charAt);
  var $parseFloat$1 = global$2.parseFloat;
  var Symbol$1 = global$2.Symbol;
  var ITERATOR = Symbol$1 && Symbol$1.iterator;
  var FORCED = 1 / $parseFloat$1(whitespaces + '-0') !== -Infinity
  // MS Edge 18- broken with boxed symbols
  || ITERATOR && !fails$1(function () {
    $parseFloat$1(Object(ITERATOR));
  });

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED ? function parseFloat(string) {
    var trimmedString = trim(toString$1(string));
    var result = $parseFloat$1(trimmedString);
    return result === 0 && charAt$1(trimmedString, 0) === '-' ? -0 : result;
  } : $parseFloat$1;

  var $$1 = _export;
  var $parseFloat = numberParseFloat;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  $$1({
    global: true,
    forced: parseFloat !== $parseFloat
  }, {
    parseFloat: $parseFloat
  });

  var defineProperty = objectDefineProperty.f;
  var proxyAccessor$1 = function (Target, Source, key) {
    key in Target || defineProperty(Target, key, {
      configurable: true,
      get: function () {
        return Source[key];
      },
      set: function (it) {
        Source[key] = it;
      }
    });
  };

  var DESCRIPTORS$1 = descriptors;
  var global$1 = global$w;
  var uncurryThis = functionUncurryThis;
  var isForced = isForced_1;
  var inheritIfRequired = inheritIfRequired$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$9;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var isPrototypeOf = objectIsPrototypeOf;
  var isRegExp = isRegexp;
  var toString = toString$f;
  var getRegExpFlags = regexpGetFlags;
  var stickyHelpers = regexpStickyHelpers;
  var proxyAccessor = proxyAccessor$1;
  var defineBuiltIn = defineBuiltIn$c;
  var fails = fails$C;
  var hasOwn = hasOwnProperty_1;
  var enforceInternalState = internalState.enforce;
  var setSpecies = setSpecies$3;
  var wellKnownSymbol = wellKnownSymbol$q;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var MATCH = wellKnownSymbol('match');
  var NativeRegExp = global$1.RegExp;
  var RegExpPrototype$1 = NativeRegExp.prototype;
  var SyntaxError = global$1.SyntaxError;
  var exec = uncurryThis(RegExpPrototype$1.exec);
  var charAt = uncurryThis(''.charAt);
  var replace = uncurryThis(''.replace);
  var stringIndexOf = uncurryThis(''.indexOf);
  var stringSlice = uncurryThis(''.slice);
  // TODO: Use only proper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;
  var MISSED_STICKY$1 = stickyHelpers.MISSED_STICKY;
  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var BASE_FORCED = DESCRIPTORS$1 && (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i';
  }));
  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = charAt(string, index);
      if (chr === '\\') {
        result += chr + charAt(string, ++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        }
        result += chr;
      }
    }
    return result;
  };
  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = {};
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = charAt(string, index);
      if (chr === '\\') {
        chr += charAt(string, ++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (exec(IS_NCG, stringSlice(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwn(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;else result += chr;
    }
    return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = isPrototypeOf(RegExpPrototype$1, this);
      var patternIsRegExp = isRegExp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;
      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }
      if (patternIsRegExp || isPrototypeOf(RegExpPrototype$1, pattern)) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
      }
      pattern = pattern === undefined ? '' : toString(pattern);
      flags = flags === undefined ? '' : toString(flags);
      rawPattern = pattern;
      if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
        dotAll = !!flags && stringIndexOf(flags, 's') > -1;
        if (dotAll) flags = replace(flags, /s/g, '');
      }
      rawFlags = flags;
      if (MISSED_STICKY$1 && 'sticky' in re1) {
        sticky = !!flags && stringIndexOf(flags, 'y') > -1;
        if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '');
      }
      if (UNSUPPORTED_NCG) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }
      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);
      if (dotAll || sticky || groups.length) {
        state = enforceInternalState(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }
      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) {/* empty */}
      return result;
    };
    for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
      proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
    }
    RegExpPrototype$1.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$1;
    defineBuiltIn(global$1, 'RegExp', RegExpWrapper, {
      constructor: true
    });
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var DESCRIPTORS = descriptors;
  var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
  var classof = classofRaw$2;
  var defineBuiltInAccessor = defineBuiltInAccessor$8;
  var getInternalState = internalState.get;
  var RegExpPrototype = RegExp.prototype;
  var $TypeError = TypeError;

  // `RegExp.prototype.sticky` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
  if (DESCRIPTORS && MISSED_STICKY) {
    defineBuiltInAccessor(RegExpPrototype, 'sticky', {
      configurable: true,
      get: function sticky() {
        if (this === RegExpPrototype) return;
        // We can't use InternalStateModule.getterFor because
        // we don't add metadata for regexps created by a literal.
        if (classof(this) === 'RegExp') {
          return !!getInternalState(this).sticky;
        }
        throw $TypeError('Incompatible receiver, RegExp required');
      }
    });
  }

  var year = '(\\d{4})';
  var month = '(0[1-9]|1[0-2])';
  var day = '(0[1-9]|1\\d|2\\d|3[0-1])';
  var hour = '(0\\d|1\\d|2[0-3])';
  var minute = '(0\\d|1\\d|2\\d|3\\d|4\\d|5\\d)';
  var second = minute;
  var timeRegex = new RegExp("^(".concat(year, "(-").concat(month, "(-").concat(day, "(T").concat(hour, "(:").concat(minute, "(:").concat(second, ")?)?)?)?)?)$"));

  function includes(array, object) {
    var included = false;
    var i = 0;
    while (i < array.length && !included) {
      if (objectEqual(array[i], object)) {
        included = true;
        break;
      } else i++;
    }
    return included;
  }
  function objectEqual(obj1, obj2) {
    for (var prop in obj1) {
      if (_typeof(obj1[prop]) !== _typeof(obj2[prop])) return false;
      switch (_typeof(obj1[prop])) {
        case 'object':
          if (!objectEqual(obj1[prop], obj2[prop])) return false;
          break;
        case 'function':
          if (typeof obj2[prop] === 'undefined' || obj1[prop].toString() !== obj2[prop].toString()) return false;
          break;
        default:
          if (obj1[prop] !== obj2[prop]) return false;
      }
    }
    for (var _prop in obj2) {
      if (typeof obj1[_prop] === 'undefined') return false;
    }
    return true;
  }
  function overwriteDefault(usrObj, defObj) {
    var object = {};
    for (var prop in defObj) {
      var defVal = defObj[prop];
      var usrVal = usrObj[prop];
      if (typeof usrVal === 'undefined') {
        object[prop] = defVal;
        continue;
      }
      switch (_typeof(defVal)) {
        case 'object':
          object[prop] = overwriteDefault(usrVal, defVal);
          break;
        default:
          object[prop] = _typeof(defVal) === _typeof(usrVal) ? usrVal : defVal;
      }
    }
    return object;
  }

  var stringRegex = /^(.*)$/;
  var setRegex = /^([0-9]+)(\/[0-9]+)?$/;
  var urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/;
  var langRegex = /^([a-z]{3}|XXX)$/;
  var imageRegex = /(image\/[a-z0-9!#$&.+\-^_]+){0,129}/;
  var emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  var syltRegex = /^((\[\d{1,}:\d{2}\.\d{3}\]) (.*))/;
  function textFrame$1(value, version, strict) {
    if (typeof value !== 'string') {
      throw new Error('Value is not a string');
    }
    if (strict && !value.match(stringRegex)) {
      throw new Error('Newlines are not allowed');
    }
    return true;
  }
  function setFrame$1(value, version, strict) {
    if (version === 2 || version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (set) {
      textFrame$1(set, version, strict);
      if (typeof set !== 'string' && typeof set !== 'number') {
        throw new Error('Value is not a string/number');
      }
      var match = set.match(setRegex);
      if (strict && typeof set === 'string') {
        if (match === null) throw new Error('Invalid format (eg. 1/2)');
        var position = parseInt(match[1]);
        var total = match[2] ? parseInt(match[2].substring(1)) : null;
        if (total !== null && position > total) {
          throw new Error('Position is greater then total');
        }
      }
    });
    return true;
  }
  function timeFrame(value, version, strict) {
    if (version === 2 || version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (time) {
      textFrame$1(time, version, strict);
      if (version === 3 && strict && !time.match(/^(\d{4})$/)) {
        throw new Error('Value is not 4 numeric characters');
      }
      if (version === 4 && strict && !time.match(timeRegex)) {
        throw new Error('Time frames must follow ISO 8601');
      }
    });
    return true;
  }
  function tkeyFrame(value, version, strict) {
    if (version === 2 || version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (tkey) {
      textFrame$1(tkey, version, strict);
      if (strict && !tkey.match(/^([A-Gb#mo]{1,3})$/)) {
        throw new Error('Invalid TKEY Format (eg Cbm)');
      }
    });
    return true;
  }
  function tlanFrame(value, version, strict) {
    if (version === 2 || version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (tlan) {
      textFrame$1(tlan, version, strict);
      if (strict && !tlan.match(langRegex)) {
        throw new Error('Language must follow ISO 639-2');
      }
    });
    return true;
  }
  function tsrcFrame(value, version, strict) {
    if (version === 2 || version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (tsrc) {
      textFrame$1(tsrc, version, strict);
      if (strict && !tsrc.match(/^([A-Z0-9]{12})$/)) {
        throw new Error('Invalid ISRC format');
      }
    });
    return true;
  }
  function urlFrame$1(value, version, strict) {
    textFrame$1(value, version, strict);
    if (strict && !value.match(urlRegex)) throw new Error('Invalid URL');
    return true;
  }
  function txxxFrame$1(values, version, strict) {
    var descriptions = [];
    values.forEach(function (value) {
      textFrame$1(value.description, version, strict);
      textFrame$1(value.text, version, strict);
      if (strict && includes(descriptions, value.description)) {
        throw new Error('Description should not duplicate');
      } else descriptions.push(value.description);
    });
    return true;
  }
  function wxxxFrame$1(values, version, strict) {
    var descriptions = [];
    values.forEach(function (value) {
      textFrame$1(value.description, version, strict);
      urlFrame$1(value.url, version, strict);
      if (strict && includes(descriptions, value.description)) {
        throw new Error('Description should not duplicate');
      } else descriptions.push(value.description);
    });
    return true;
  }
  function langDescFrame$1(values, version, strict) {
    var langDescs = [];
    values.forEach(function (langDesc) {
      textFrame$1(langDesc.language, version, strict);
      textFrame$1(langDesc.descriptor, version, strict);
      if (typeof langDesc.text !== 'string') {
        throw new Error('Text is not a string');
      }
      if (strict && !langDesc.language.match(langRegex)) {
        throw new Error('Language must follow ISO 639-2');
      }
      var checkObj = {
        language: langDesc.language,
        descriptor: langDesc.descriptor
      };
      if (strict && includes(langDescs, checkObj)) {
        throw new Error('Language and descriptor should not duplicate');
      } else langDescs.push(checkObj);
    });
    return true;
  }
  function apicFrame$1(values, version, strict) {
    var descriptions = [];
    values.forEach(function (apic) {
      textFrame$1(apic.format, version, strict);
      textFrame$1(apic.description, version, strict);
      if (typeof apic.type !== 'number') {
        throw new Error('Type is not a number');
      }
      if (apic.type > 255 || apic.type < 0) {
        throw new Error('Type should be in range of 0 - 255');
      }
      if (!BufferView.isViewable(apic.data)) {
        throw new Error('Image data should be viewable');
      }
      if (strict) {
        if (apic.type > 21 || apic.type < 0) {
          throw new Error('Type should be in range of 0 - 21');
        }
        if (!apic.format.match(imageRegex)) {
          throw new Error('Format should be an image MIME');
        }
        if (apic.description.length > 64) {
          throw new Error('Description should not exceed 64');
        }
        if (includes(descriptions, apic.description)) {
          throw new Error('Description should not duplicate');
        } else descriptions.push(apic.description);
      }
    });
    return true;
  }
  function geobFrame$1(values, version, strict) {
    var descriptions = [];
    values.forEach(function (geob) {
      textFrame$1(geob.format, version, strict);
      textFrame$1(geob.filename, version, strict);
      textFrame$1(geob.description, version, strict);
      if (!BufferView.isViewable(geob.object)) {
        throw new Error('Object data should be viewable');
      }
      if (strict && includes(descriptions, geob.description)) {
        throw new Error('GEOB description should not duplicate');
      } else descriptions.push(geob.description);
    });
    return true;
  }
  function ufidFrame$1(values, version, strict) {
    var ownerIds = [];
    values.forEach(function (ufid) {
      textFrame$1(ufid.ownerId, version, strict);
      if (!BufferView.isViewable(ufid.id)) {
        throw new Error('ID should be viewable');
      }
      if (strict) {
        if (ufid.ownerId === '') {
          throw new Error('ownerId should not be blank');
        }
        var idLength = ufid.id.byteLength || ufid.id.length || 0;
        if (idLength > 64) {
          throw new Error('ID bytelength should not exceed 64 bytes');
        }
        if (includes(ownerIds, ufid.ownerId)) {
          throw new Error('ownerId should not duplicate');
        } else ownerIds.push(ufid.ownerId);
      }
    });
    return true;
  }
  function userFrame$1(values, version, strict) {
    values.forEach(function (user) {
      textFrame$1(user.language, version, strict);
      if (typeof user.text !== 'string') {
        throw new Error('Text is not a string');
      }
      if (strict && !user.language.match(langRegex)) {
        throw new Error('Language must follow ISO 639-2');
      }
    });
    return true;
  }
  function owneFrame$1(value, version, strict) {
    textFrame$1(value.date, version, strict);
    textFrame$1(value.seller, version, strict);
    textFrame$1(value.currencyCode, version, strict);
    textFrame$1(value.currencyPrice, version, strict);
    if (strict) {
      if (!value.date.match("".concat(year).concat(month).concat(day))) {
        throw new Error('Date is not valid (format: YYYYMMDD)');
      }
      if (!value.currencyCode.match(/^([A-Z]{3})$/)) {
        throw new Error('Currency code is not valid (eg. USD)');
      }
      if (!value.currencyPrice.match(/^(\d*)\.(\d+)$/)) {
        throw new Error('Currency price is not valid (eg. 2.00)');
      }
    }
    return true;
  }
  function privFrame$1(values, version, strict) {
    var contents = [];
    values.forEach(function (priv) {
      textFrame$1(priv.ownerId, version, strict);
      if (!BufferView.isViewable(priv.data)) {
        throw new Error('Data should be viewable');
      }
      if (strict && includes(contents, priv.data)) {
        throw new Error('Data should not duplicate');
      } else contents.push(priv.data);
    });
    return true;
  }
  function checkRvadData(object, props, limit, name) {
    for (var i = 0; i < props.length; i++) {
      var prop = props[i];
      var data = object[prop];
      if (data) {
        if (!BufferView.isViewable(data)) {
          throw new Error("".concat(name, ".").concat(prop, " must be viewable"));
        }
        var view = new BufferView(data);
        var length = view.byteLength;
        if (length > limit) {
          throw new Error("".concat(name, ".").concat(prop, " exceeds bits limit"));
        }
      }
    }
  }
  function rvadFrame$1(values, version, strict) {
    if (_typeof(values) !== 'object') {
      throw new Error('Values must be an object');
    }
    var volumechange = values.volumechange;
    var peakvolume = values.peakvolume;
    var bitsvolume = values.bitsvolume || 0x10;
    var limit = Math.ceil(bitsvolume / 8);
    if (bitsvolume && (bitsvolume < 0 || bitsvolume > 255)) {
      throw new Error('Bits volume should be in the range of 0 - 255');
    }
    if (strict && bitsvolume === 0) {
      throw new Error('Bits used for volume description may not be 0');
    }
    var props = ['right', 'left', 'rightback', 'leftback', 'center', 'bass'];
    if (volumechange) checkRvadData(volumechange, props, limit, 'volumechange');
    if (peakvolume) checkRvadData(peakvolume, props, limit, 'peakvolume');
    return true;
  }
  function rva2Frame$1(values, version, strict) {
    var frames = [];
    values.forEach(function (value) {
      if (!Array.isArray(value.channels)) {
        throw new Error('Channels should be an array');
      }
      for (var i = 0; i < value.channels.length; i++) {
        var channel = value.channels[i];
        if (typeof channel.type !== 'number') {
          throw new Error('Type of channel should be a number');
        }
        if (strict && (channel.type < 0 || channel.type > 8)) {
          throw new Error('Type of channel should be in the range of 0 - 8');
        }
        if (typeof channel.volumeadjust !== 'number') {
          throw new Error('Volume adjustment should be a number');
        }
        if (typeof channel.bitspeak !== 'number') {
          throw new Error('Bits representing peak should be a number');
        }
        if (channel.bitspeak < 0 || channel.bitspeak > 255) {
          throw new Error('Bits representing peak should be in range of 0 - 255');
        }
        if (!BufferView.isViewable(channel.peakvolume)) {
          throw new Error('Peak volume must be viewable');
        }
        var view = new BufferView(channel.peakvolume);
        var length = view.byteLength;
        var limit = Math.ceil(channel.bitspeak / 8);
        if (length > limit) {
          throw new Error('Peak volume exceeds bits limit');
        }
      }
      var checkObj = {
        identification: value.identification
      };
      if (strict && includes(frames, checkObj)) {
        throw new Error('RVA2 identification should be unique');
      } else frames.push(checkObj);
    });
  }
  function signFrame$1(values, version, strict) {
    var signs = [];
    values.forEach(function (sign) {
      if (typeof sign.group !== 'number') {
        throw new Error('Group ID is not a number');
      }
      if (sign.group < 0 || sign.group > 255) {
        throw new Error('Group ID should be in the range of 0 - 255');
      }
      if (!BufferView.isViewable(sign.signature)) {
        throw new Error('Signature should be viewable');
      }
      if (strict && includes(signs, sign)) {
        throw new Error('SIGN contents should not be identical to others');
      } else signs.push(sign);
    });
    return true;
  }
  function syltFrame$1(values, version, strict) {
    var sylts = [];
    values.forEach(function (_ref) {
      var language = _ref.language,
        descriptor = _ref.descriptor,
        type = _ref.type,
        format = _ref.format,
        lyrics = _ref.lyrics,
        data = _ref.data;
      textFrame$1(language, version, strict);
      textFrame$1(descriptor, version, strict);
      if (lyrics && typeof lyrics !== 'string') {
        throw new Error('Lyrics is not a string');
      }
      if (data) {
        var _iterator = _createForOfIteratorHelper(data),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _step.value,
              time = _step$value.time,
              line = _step$value.line;
            if (typeof line !== 'string') {
              throw new Error('Line is not a string');
            }
            if (typeof time !== 'number') {
              throw new Error('Timestamp is not a number');
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      if (typeof type !== 'number') {
        throw new Error('Type is not a number');
      } else if (type > 255 || type < 0) {
        throw new Error('Type should be in range of 0 - 255');
      }
      if (typeof format !== 'number') {
        throw new Error('Format is not a number');
      } else if (format > 255 || format < 0) {
        throw new Error('Format should be in range of 0 - 255');
      }
      if (strict) {
        if (!language.match(langRegex)) {
          throw new Error('Language must follow ISO 639-2');
        }
        if (type > 6 || type < 0) {
          throw new Error('Type should be in range of 0 - 8');
        }
        if (format > 2 || format < 1) {
          throw new Error('Format should be either 1 or 2');
        }
        if (lyrics && !lyrics.split('\n').every(function (entry) {
          return !entry.length || syltRegex.test(entry);
        })) {
          throw new Error('Lyrics must follow this format: [mm:ss.xxx]');
        }
        var checkObj = {
          language: language,
          descriptor: descriptor
        };
        if (includes(sylts, checkObj)) {
          throw new Error('1 SYLT with same language and descriptor only');
        } else sylts.push(checkObj);
      }
    });
    return true;
  }
  function mcdiFrame$1(value, version, strict) {
    if (!BufferView.isViewable(value.data)) {
      throw new Error('Data should be viewable');
    }
    return true;
  }
  function sytcFrame$1(value, version, strict) {
    if (typeof value.format !== 'number') {
      throw new Error('Timestamp format is not a number');
    } else if (value.format > 255 || value.format < 0) {
      throw new Error('Timestamp format should be in range of 0 - 255');
    }
    if (strict && (value.format > 2 || value.format < 1)) {
      throw new Error('Invalid timestamp format (should be 1 or 2)');
    }
    var _iterator2 = _createForOfIteratorHelper(value.data),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _step2$value = _step2.value,
          bpm = _step2$value.bpm,
          time = _step2$value.time;
        if (typeof bpm !== 'number') {
          throw new Error('BPM is not a number');
        } else if (bpm > 510 || bpm < 0) {
          throw new Error('BPM should be in range of 0 - 510');
        }
        if (typeof time !== 'number') {
          throw new Error('Timestamp is not a number');
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return true;
  }
  function etcoFrame$1(value, version, strict) {
    if (typeof value.format !== 'number') {
      throw new Error('Format is not a number');
    } else if (value.format > 255 || value.format < 0) {
      throw new Error('Format should be in range of 0 - 255');
    }
    if (strict && (value.format > 2 || value.format < 1)) {
      throw new Error('Invalid timestamp format (should be 1 or 2)');
    }
    var _iterator3 = _createForOfIteratorHelper(value.data),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _step3$value = _step3.value,
          event = _step3$value.event,
          time = _step3$value.time;
        if (typeof event !== 'number') {
          throw new Error('Event is not a number');
        } else if (event > 255 || event < 0) {
          throw new Error('Event should be in range of 0 - 255');
        }
        if (typeof time !== 'number') {
          throw new Error('Timestamp is not a number');
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return true;
  }
  function pcntFrame$1(value, version, strict) {
    if (isNaN(value) || isNaN(parseFloat(value))) {
      throw new Error('Value is not numerical');
    }
    return true;
  }
  function popmFrame$1(values, version, strict) {
    var popms = [];
    values.forEach(function (_ref2) {
      var email = _ref2.email,
        rating = _ref2.rating,
        counter = _ref2.counter;
      textFrame$1(email, version, strict);
      if (typeof rating !== 'number') {
        throw new Error('Rating is not a number');
      } else if (rating > 255 || rating < 0) {
        throw new Error('Rating should be in range of 0 - 255');
      }
      if (typeof counter !== 'number') {
        throw new Error('Counter is not a number');
      }
      if (strict) {
        if (!email.match(emailRegex)) {
          throw new Error('Email is not a valid email');
        }
        var checkObj = {
          email: email
        };
        if (includes(popms, checkObj)) {
          throw new Error('1 POPM with same email only');
        } else popms.push(checkObj);
      }
    });
    return true;
  }
  function unsupportedFrame$1(values, version, strict) {
    values.forEach(function (value) {
      if (!Array.isArray(value)) {
        throw new Error('Unsupported frame is not an array');
      }
    });
    return true;
  }

  var createTypedArrayConstructor = typedArrayConstructorExports;

  // `Int16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects
  createTypedArrayConstructor('Int16', function (init) {
    return function Int16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var isArray = isArray$6;
  var lengthOfArrayLike$1 = lengthOfArrayLike$f;
  var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;
  var bind = functionBindContext;

  // `FlattenIntoArray` abstract operation
  // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
  var flattenIntoArray$1 = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
    var targetIndex = start;
    var sourceIndex = 0;
    var mapFn = mapper ? bind(mapper, thisArg) : false;
    var element, elementLen;
    while (sourceIndex < sourceLen) {
      if (sourceIndex in source) {
        element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
        if (depth > 0 && isArray(element)) {
          elementLen = lengthOfArrayLike$1(element);
          targetIndex = flattenIntoArray$1(target, original, element, elementLen, targetIndex, depth - 1) - 1;
        } else {
          doesNotExceedSafeInteger(targetIndex + 1);
          target[targetIndex] = element;
        }
        targetIndex++;
      }
      sourceIndex++;
    }
    return targetIndex;
  };
  var flattenIntoArray_1 = flattenIntoArray$1;

  var $ = _export;
  var flattenIntoArray = flattenIntoArray_1;
  var aCallable = aCallable$7;
  var toObject = toObject$c;
  var lengthOfArrayLike = lengthOfArrayLike$f;
  var arraySpeciesCreate = arraySpeciesCreate$3;

  // `Array.prototype.flatMap` method
  // https://tc39.es/ecma262/#sec-array.prototype.flatmap
  $({
    target: 'Array',
    proto: true
  }, {
    flatMap: function flatMap(callbackfn /* , thisArg */) {
      var O = toObject(this);
      var sourceLen = lengthOfArrayLike(O);
      var A;
      aCallable(callbackfn);
      A = arraySpeciesCreate(O, 0);
      A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      return A;
    }
  });

  // this method was added to unscopables after implementation
  // in popular engines, so it's moved to a separate module
  var addToUnscopables = addToUnscopables$3;

  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('flatMap');

  function getHeaderBytes(id, size, version, flags) {
    var idBytes = encodeString(id);
    var sizeView = new BufferView(version === 2 ? 3 : 4);
    if (version === 2) sizeView.setUint24(0, size);else sizeView.setUint32(0, version === 3 ? size : encodeSynch(size));
    var flagsBytes = [];
    if (version === 3 || version === 4) {
      flagsBytes.push(0, 0);
      if (version === 4 && flags.unsynchronisation) {
        flagsBytes[1] = setBit(flagsBytes[1], 1);
      }
      if (version === 4 && flags.dataLengthIndicator) {
        flagsBytes[1] = setBit(flagsBytes[1], 0);
      }
    }
    return mergeBytes(idBytes, sizeView.getUint8(0, version === 2 ? 3 : 4), flagsBytes);
  }
  function unsynchData(data, version) {
    var sizeView = new BufferView(4);
    var dataBytes = unsynch(data);
    var content = [];
    if (version === 4) {
      sizeView.setUint32(0, encodeSynch(data.length));
      content.push.apply(content, _toConsumableArray(sizeView.getUint8(0, 4)));
    }
    dataBytes.forEach(function (_byte) {
      return content.push(_byte);
    });
    return new Uint8Array(content);
  }
  function textFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var strBytes = [];
    switch (version) {
      case 2:
      case 3:
        strBytes = encodeString(value.replace(/\\\\/g, '/') + '\0', encoding);
        break;
      case 4:
        strBytes = encodeString(value.replace(/\\\\/g, '\0') + '\0', encoding);
        break;
    }
    var data = mergeBytes(encodingIndex, strBytes);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function win1251Frame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var strBytes = [];
    switch (version) {
      case 2:
      case 3:
        strBytes = encodeString(value.replace(/\\\\/g, '/') + '\0');
        break;
      case 4:
        strBytes = encodeString(value.replace(/\\\\/g, '\0') + '\0');
        break;
    }
    var data = mergeBytes(0, strBytes);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function setFrame(value, options) {
    var version = options.version;
    if (version === 2 || version === 3) value = value.toString().split('\\\\')[0];else if (version === 4) value = value.toString().replace(/\\\\/g, '\0');
    return win1251Frame(value, options);
  }
  function urlFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var strBytes = encodeString(value + '\0');
    if (unsynch) strBytes = unsynchData(strBytes, version);
    var header = getHeaderBytes(id, strBytes.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, strBytes);
  }
  function txxxFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    values.forEach(function (txxx) {
      var descBytes = encodeString(txxx.description + '\0', encoding);
      var strBytes = encodeString(txxx.text + '\0', encoding);
      var data = mergeBytes(encodingIndex, descBytes, strBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte2) {
        return bytes.push(_byte2);
      });
    });
    return bytes;
  }
  function wxxxFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    values.forEach(function (wxxx) {
      var descBytes = encodeString(wxxx.description + '\0', encoding);
      var strBytes = encodeString(wxxx.url + '\0');
      var data = mergeBytes(encodingIndex, descBytes, strBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte3) {
        return bytes.push(_byte3);
      });
    });
    return bytes;
  }
  function iplsFrame(value, options) {
    options.version = 4;
    return textFrame(value, options);
  }
  function langDescFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    values.forEach(function (langDesc) {
      var langBytes = encodeString(langDesc.language);
      var descBytes = encodeString(langDesc.descriptor + '\0', encoding);
      var textBytes = encodeString(langDesc.text + '\0', encoding);
      var data = mergeBytes(encodingIndex, langBytes, descBytes, textBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte4) {
        return bytes.push(_byte4);
      });
    });
    return bytes;
  }
  function apicFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    values.forEach(function (apic) {
      var mimeBytes = encodeString(apic.format + '\0');
      var imageBytes = new Uint8Array(apic.data);
      var strBytes = encodeString(apic.description + '\0', encoding);
      var data = mergeBytes(encodingIndex, mimeBytes, apic.type, strBytes, imageBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte5) {
        return bytes.push(_byte5);
      });
    });
    return bytes;
  }
  function geobFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    values.forEach(function (geob) {
      var mime = encodeString(geob.format + '\0');
      var object = new Uint8Array(geob.object);
      var filename = encodeString(geob.filename + '\0', encoding);
      var description = encodeString(geob.description + '\0', encoding);
      var data = mergeBytes(encodingIndex, mime, filename, description, object);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte6) {
        return bytes.push(_byte6);
      });
    });
    return bytes;
  }
  function ufidFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (ufid) {
      var ownerBytes = encodeString(ufid.ownerId + '\0');
      var idBytes = new Uint8Array(ufid.id);
      var data = mergeBytes(ownerBytes, idBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte7) {
        return bytes.push(_byte7);
      });
    });
    return bytes;
  }
  function userFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    var langBytes = encodeString(value.language);
    var textBytes = encodeString(value.text + '\0', encoding);
    var data = mergeBytes(encodingIndex, langBytes, textBytes);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    var merged = mergeBytes(header, data);
    merged.forEach(function (_byte8) {
      return bytes.push(_byte8);
    });
    return bytes;
  }
  function owneFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var codeBytes = encodeString(value.currencyCode);
    var priceBytes = encodeString(value.currencyPrice + '\0');
    var dateBytes = encodeString(value.date);
    var sellerBytes = encodeString(value.seller, encoding);
    var data = mergeBytes(encodingIndex, codeBytes, priceBytes, dateBytes, sellerBytes);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function privFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (priv) {
      var ownerIdBytes = encodeString(priv.ownerId);
      var privData = new Uint8Array(priv.data);
      var data = mergeBytes(ownerIdBytes, privData);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte9) {
        return bytes.push(_byte9);
      });
    });
    return bytes;
  }
  function rvadFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    var bitsvolume = values.bitsvolume || 0x10;
    var limit = Math.ceil(bitsvolume / 8);
    var incdec = 0;
    if (values.incdec) {
      if (values.incdec.right) incdec = setBit(incdec, 0);
      if (values.incdec.left) incdec = setBit(incdec, 1);
      if (values.incdec.rightback) incdec = setBit(incdec, 2);
      if (values.incdec.leftback) incdec = setBit(incdec, 3);
      if (values.incdec.center) incdec = setBit(incdec, 4);
      if (values.incdec.bass) incdec = setBit(incdec, 5);
    }
    bytes.push(incdec);
    bytes.push(bitsvolume);
    var volumechange = values.volumechange || {};
    var peakvolume = values.peakvolume || {};
    var rightChangeBlock = dataBlock(volumechange.right, limit);
    var leftChangeBlock = dataBlock(volumechange.left, limit);
    var rightPeakBlock = dataBlock(peakvolume.right, limit);
    var leftPeakBlock = dataBlock(peakvolume.left, limit);
    rightChangeBlock.forEach(function (_byte10) {
      return bytes.push(_byte10);
    });
    leftChangeBlock.forEach(function (_byte11) {
      return bytes.push(_byte11);
    });
    rightPeakBlock.forEach(function (_byte12) {
      return bytes.push(_byte12);
    });
    leftPeakBlock.forEach(function (_byte13) {
      return bytes.push(_byte13);
    });
    if (volumechange.rightback || volumechange.leftback || peakvolume.rightback || peakvolume.leftback || volumechange.center || peakvolume.center || volumechange.bass || peakvolume.bass) {
      var rightBackChangeBlock = dataBlock(volumechange.rightback, limit);
      var leftBackChangeBlock = dataBlock(volumechange.leftback, limit);
      var rightBackPeakBlock = dataBlock(peakvolume.rightback, limit);
      var leftBackPeakBlock = dataBlock(peakvolume.leftback, limit);
      rightBackChangeBlock.forEach(function (_byte14) {
        return bytes.push(_byte14);
      });
      leftBackChangeBlock.forEach(function (_byte15) {
        return bytes.push(_byte15);
      });
      rightBackPeakBlock.forEach(function (_byte16) {
        return bytes.push(_byte16);
      });
      leftBackPeakBlock.forEach(function (_byte17) {
        return bytes.push(_byte17);
      });
    }
    if (volumechange.center || peakvolume.center || volumechange.bass || peakvolume.bass) {
      var centerChangeBlock = dataBlock(volumechange.center, limit);
      var centerPeakBlock = dataBlock(peakvolume.center, limit);
      centerChangeBlock.forEach(function (_byte18) {
        return bytes.push(_byte18);
      });
      centerPeakBlock.forEach(function (_byte19) {
        return bytes.push(_byte19);
      });
    }
    if (volumechange.bass || peakvolume.bass) {
      var bassChangeBlock = dataBlock(volumechange.bass, limit);
      var bassPeakBlock = dataBlock(peakvolume.bass, limit);
      bassChangeBlock.forEach(function (_byte20) {
        return bytes.push(_byte20);
      });
      bassPeakBlock.forEach(function (_byte21) {
        return bytes.push(_byte21);
      });
    }
    var data = unsynch ? unsynchData(bytes) : bytes;
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function rva2Frame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (value) {
      var identification = encodeString(value.identification + '\0');
      var data = identification;
      for (var i = 0; i < value.channels.length; i++) {
        var channel = value.channels[i];
        var type = channel.type;
        var volumeadjust = new Int16Array([channel.volumeadjust]);
        var volumeadjust8 = new Uint8Array(volumeadjust.buffer);
        var bitspeak = channel.bitspeak;
        var limit = Math.ceil(bitspeak / 8);
        var peakvolume = dataBlock(channel.peakvolume, limit);
        data = mergeBytes(data, type, volumeadjust8, bitspeak, peakvolume);
      }
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte22) {
        return bytes.push(_byte22);
      });
    });
    return bytes;
  }
  function signFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (sign) {
      var signature = new Uint8Array(sign.signature);
      var data = mergeBytes(sign.group, signature);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte23) {
        return bytes.push(_byte23);
      });
    });
    return bytes;
  }
  function timeBytes(time) {
    var timeBytes = new BufferView(4);
    timeBytes.setUint32(0, time);
    return timeBytes.getUint8(0, 4);
  }
  function parseLyrics(lyrics, encodingString) {
    var regex = /^\[(\d{1,}):(\d{2})\.(\d{3})\] ?(.*)/;
    var lyricsBytes = [];
    lyrics.replace(/\r\n/g, '\n').split('\n').forEach(function (line) {
      if (line !== '') {
        var result = regex.exec(line);
        var time = parseInt(result[1]) * 60000 + parseInt(result[2]) * 1000 + parseInt(result[3]);
        var string = encodeString((result[4] || '') + '\0', encodingString);
        lyricsBytes = mergeBytes(lyricsBytes, string, timeBytes(time));
      }
    });
    return lyricsBytes;
  }
  function syltFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var bytes = [];
    values.forEach(function (sylt) {
      var langBytes = encodeString(sylt.language);
      var descBytes = encodeString(sylt.descriptor + '\0', encoding);
      var dataBytes = [];
      if (sylt.data) {
        sylt.data.forEach(function (_ref) {
          var time = _ref.time,
            line = _ref.line;
          var string = encodeString(line + '\0', encoding);
          dataBytes = mergeBytes(dataBytes, string, timeBytes(time));
        });
      } else if (sylt.lyrics) {
        dataBytes = parseLyrics(sylt.lyrics, encoding);
      }
      var data = mergeBytes(encodingIndex, langBytes, sylt.format, sylt.type, descBytes, dataBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte24) {
        return bytes.push(_byte24);
      });
    });
    return bytes;
  }
  function mcdiFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    if (unsynch) value.data = unsynchData(value.data, version);
    var header = getHeaderBytes(id, value.data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, value.data);
  }
  function sytcFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var array = value.data.flatMap(function (_ref2) {
      var bpm = _ref2.bpm,
        time = _ref2.time;
      return bpm >= 255 ? [255, bpm - 255].concat(_toConsumableArray(timeBytes(time))) : [bpm].concat(_toConsumableArray(timeBytes(time)));
    });
    var data = mergeBytes(value.format, array);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function etcoFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var array = value.data.flatMap(function (_ref3) {
      var event = _ref3.event,
        time = _ref3.time;
      return [event].concat(_toConsumableArray(timeBytes(time)));
    });
    var data = mergeBytes(value.format, array);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function pcntFrame(value, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var count = parseInt(value);
    var data = longToBytes(count);
    while (data.length < 4) data.unshift(0);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
  }
  function popmFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (popm) {
      var emailBytes = encodeString(popm.email + '\0');
      var counterBytes = longToBytes(popm.counter);
      while (counterBytes.length < 4) counterBytes.unshift(0);
      var data = mergeBytes(emailBytes, popm.rating, counterBytes);
      if (unsynch) data = unsynchData(data, version);
      var header = getHeaderBytes(id, data.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, data);
      merged.forEach(function (_byte25) {
        return bytes.push(_byte25);
      });
    });
    return bytes;
  }
  function unsupportedFrame(values, options) {
    var id = options.id,
      version = options.version,
      unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (value) {
      var header = getHeaderBytes(id, value.length, version, {
        unsynchronisation: unsynch,
        dataLengthIndicator: unsynch
      });
      var merged = mergeBytes(header, value);
      merged.forEach(function (_byte26) {
        return bytes.push(_byte26);
      });
    });
    return bytes;
  }

  var APIC = {
    parse: apicFrame$2,
    validate: apicFrame$1,
    write: apicFrame,
    version: [3, 4]
  };
  var COMM = {
    parse: langDescFrame$2,
    validate: langDescFrame$1,
    write: langDescFrame,
    version: [3, 4]
  };
  var ETCO = {
    parse: etcoFrame$2,
    validate: etcoFrame$1,
    write: etcoFrame,
    version: [3, 4]
  };
  var GEOB = {
    parse: geobFrame$2,
    validate: geobFrame$1,
    write: geobFrame,
    version: [3, 4]
  };
  var IPLS = {
    parse: iplsFrame$1,
    validate: textFrame$1,
    write: iplsFrame,
    version: [3]
  };
  var MCDI = {
    parse: mcdiFrame$2,
    validate: mcdiFrame$1,
    write: mcdiFrame,
    version: [3, 4]
  };
  var OWNE = {
    parse: owneFrame$2,
    validate: owneFrame$1,
    write: owneFrame,
    version: [3, 4]
  };
  var PCNT = {
    parse: pcntFrame$2,
    validate: pcntFrame$1,
    write: pcntFrame,
    version: [3, 4]
  };
  var POPM = {
    parse: popmFrame$2,
    validate: popmFrame$1,
    write: popmFrame,
    version: [3, 4]
  };
  var PRIV = {
    parse: privFrame$2,
    validate: privFrame$1,
    write: privFrame,
    version: [3, 4]
  };
  var RVAD = {
    parse: rvadFrame$2,
    validate: rvadFrame$1,
    write: rvadFrame,
    version: [3]
  };
  var RVA2 = {
    parse: rva2Frame$2,
    validate: rva2Frame$1,
    write: rva2Frame,
    version: [4]
  };
  var SEEK = {
    parse: seekFrame
  };
  var SIGN = {
    parse: signFrame$2,
    validate: signFrame$1,
    write: signFrame,
    version: [4]
  };
  var SYLT = {
    parse: syltFrame$2,
    validate: syltFrame$1,
    write: syltFrame,
    version: [3, 4]
  };
  var SYTC = {
    parse: sytcFrame$2,
    validate: sytcFrame$1,
    write: sytcFrame,
    version: [3, 4]
  };
  var TALB = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TBPM = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [3, 4]
  };
  var TCOM = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TCON = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TCOP = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TDAT = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [3]
  };
  var TDEN = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [4]
  };
  var TDLY = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [3]
  };
  var TDOR = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [4]
  };
  var TDRC = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [4]
  };
  var TDRL = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [4]
  };
  var TDTG = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [4]
  };
  var TENC = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TEXT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TFLT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TIME = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [3]
  };
  var TIPL = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TIT1 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TIT2 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TIT3 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TKEY = {
    parse: textFrame$2,
    validate: tkeyFrame,
    write: win1251Frame,
    version: [3, 4]
  };
  var TLAN = {
    parse: textFrame$2,
    validate: tlanFrame,
    write: win1251Frame,
    version: [3, 4]
  };
  var TLEN = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [3, 4]
  };
  var TMCL = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TMED = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TMOO = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TOAL = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TOFN = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TOLY = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TOPE = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TORY = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [3]
  };
  var TOWN = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TPE1 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TPE2 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TPE3 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TPE4 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TPOS = {
    parse: setFrame$2,
    validate: setFrame$1,
    write: setFrame,
    version: [3, 4]
  };
  var TPRO = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TPUB = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TRCK = {
    parse: setFrame$2,
    validate: setFrame$1,
    write: setFrame,
    version: [3, 4]
  };
  var TRDA = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3]
  };
  var TRSN = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TRSO = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TSIZ = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [3]
  };
  var TSOA = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TSOC = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TSOP = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TSOT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TSRC = {
    parse: textFrame$2,
    validate: tsrcFrame,
    write: win1251Frame,
    version: [3, 4]
  };
  var TSSE = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };
  var TSST = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [4]
  };
  var TYER = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [3]
  };
  var TXXX = {
    parse: txxxFrame$2,
    validate: txxxFrame$1,
    write: txxxFrame,
    version: [3, 4]
  };
  var UFID = {
    parse: ufidFrame$2,
    validate: ufidFrame$1,
    write: ufidFrame,
    version: [3, 4]
  };
  var USER = {
    parse: userFrame$2,
    validate: userFrame$1,
    write: userFrame,
    version: [3, 4]
  };
  var USLT = {
    parse: langDescFrame$2,
    validate: langDescFrame$1,
    write: langDescFrame,
    version: [3, 4]
  };
  var WCOM = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WCOP = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WOAF = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WOAR = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WOAS = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WORS = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WPAY = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WPUB = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [3, 4]
  };
  var WXXX = {
    parse: wxxxFrame$2,
    validate: wxxxFrame$1,
    write: wxxxFrame,
    version: [3, 4]
  };

  /**
   *  Non-standard frames
   */
  var WFED = {
    parse: win1251Frame$1,
    validate: urlFrame$1,
    write: win1251Frame,
    version: [3, 4]
  };
  var TGID = {
    parse: win1251Frame$1,
    validate: urlFrame$1,
    write: win1251Frame,
    version: [3, 4]
  };
  var TSO2 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [3, 4]
  };

  /**
   *  ID3v2.2 Tags
   */
  var TT1 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TT2 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TT3 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TP1 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TP2 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TP3 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TP4 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TCM = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TXT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TLA = {
    parse: textFrame$2,
    validate: tlanFrame,
    write: win1251Frame,
    version: [2]
  };
  var TCO = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TAL = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TPA = {
    parse: setFrame$2,
    validate: setFrame$1,
    write: setFrame,
    version: [2]
  };
  var TRK = {
    parse: setFrame$2,
    validate: setFrame$1,
    write: setFrame,
    version: [2]
  };
  var TRC = {
    parse: textFrame$2,
    validate: tsrcFrame,
    write: win1251Frame,
    version: [2]
  };
  var TYE = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [2]
  };
  var TDA = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [2]
  };
  var TIM = {
    parse: textFrame$2,
    validate: timeFrame,
    write: win1251Frame,
    version: [2]
  };
  var TRD = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [2]
  };
  var TMT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TFT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TBP = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [2]
  };
  var TCR = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TPB = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TEN = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TSS = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TOF = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TLE = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [2]
  };
  var TSI = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [2]
  };
  var TDY = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [2]
  };
  var TKE = {
    parse: textFrame$2,
    validate: tkeyFrame,
    write: win1251Frame,
    version: [2]
  };
  var TOT = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TOA = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var TOR = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: win1251Frame,
    version: [2]
  };
  var TXX = {
    parse: txxxFrame$2,
    validate: txxxFrame$1,
    write: txxxFrame,
    version: [2]
  };
  var WAF = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [2]
  };
  var WAR = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [2]
  };
  var WAS = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [2]
  };
  var WCM = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [2]
  };
  var WCP = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [2]
  };
  var WPB = {
    parse: urlFrame$2,
    validate: urlFrame$1,
    write: urlFrame,
    version: [2]
  };
  var WXX = {
    parse: wxxxFrame$2,
    validate: wxxxFrame$1,
    write: wxxxFrame,
    version: [2]
  };
  var IPL = {
    parse: iplsFrame$1,
    validate: textFrame$1,
    write: iplsFrame,
    version: [2]
  };
  var MCI = {
    parse: mcdiFrame$2,
    validate: mcdiFrame$1,
    write: mcdiFrame,
    version: [2]
  };
  var ETC = {
    parse: etcoFrame$2,
    validate: etcoFrame$1,
    write: etcoFrame,
    version: [2]
  };
  var STC = {
    parse: sytcFrame$2,
    validate: sytcFrame$1,
    write: sytcFrame,
    version: [2]
  };
  var ULT = {
    parse: langDescFrame$2,
    validate: langDescFrame$1,
    write: langDescFrame,
    version: [2]
  };
  var SLT = {
    parse: syltFrame$2,
    validate: syltFrame$1,
    write: syltFrame,
    version: [2]
  };
  var COM = {
    parse: langDescFrame$2,
    validate: langDescFrame$1,
    write: langDescFrame,
    version: [2]
  };
  var RVA = {
    parse: rvadFrame$2,
    validate: rvadFrame$1,
    write: rvadFrame,
    version: [2]
  };
  var PIC = {
    parse: apicFrame$2,
    validate: apicFrame$1,
    write: apicFrame,
    version: [2]
  };
  var GEO = {
    parse: geobFrame$2,
    validate: geobFrame$1,
    write: geobFrame,
    version: [2]
  };
  var CNT = {
    parse: pcntFrame$2,
    validate: pcntFrame$1,
    write: pcntFrame,
    version: [2]
  };
  var POP = {
    parse: popmFrame$2,
    validate: popmFrame$1,
    write: popmFrame,
    version: [2]
  };

  /**
   *  Non-standard ID3v2.2 frames
   */
  var GP1 = {
    parse: textFrame$2,
    validate: textFrame$1,
    write: textFrame,
    version: [2]
  };
  var unsupported = {
    validate: unsupportedFrame$1,
    write: unsupportedFrame
  };

  var frames = /*#__PURE__*/Object.freeze({
    __proto__: null,
    APIC: APIC,
    COMM: COMM,
    ETCO: ETCO,
    GEOB: GEOB,
    IPLS: IPLS,
    MCDI: MCDI,
    OWNE: OWNE,
    PCNT: PCNT,
    POPM: POPM,
    PRIV: PRIV,
    RVAD: RVAD,
    RVA2: RVA2,
    SEEK: SEEK,
    SIGN: SIGN,
    SYLT: SYLT,
    SYTC: SYTC,
    TALB: TALB,
    TBPM: TBPM,
    TCOM: TCOM,
    TCON: TCON,
    TCOP: TCOP,
    TDAT: TDAT,
    TDEN: TDEN,
    TDLY: TDLY,
    TDOR: TDOR,
    TDRC: TDRC,
    TDRL: TDRL,
    TDTG: TDTG,
    TENC: TENC,
    TEXT: TEXT,
    TFLT: TFLT,
    TIME: TIME,
    TIPL: TIPL,
    TIT1: TIT1,
    TIT2: TIT2,
    TIT3: TIT3,
    TKEY: TKEY,
    TLAN: TLAN,
    TLEN: TLEN,
    TMCL: TMCL,
    TMED: TMED,
    TMOO: TMOO,
    TOAL: TOAL,
    TOFN: TOFN,
    TOLY: TOLY,
    TOPE: TOPE,
    TORY: TORY,
    TOWN: TOWN,
    TPE1: TPE1,
    TPE2: TPE2,
    TPE3: TPE3,
    TPE4: TPE4,
    TPOS: TPOS,
    TPRO: TPRO,
    TPUB: TPUB,
    TRCK: TRCK,
    TRDA: TRDA,
    TRSN: TRSN,
    TRSO: TRSO,
    TSIZ: TSIZ,
    TSOA: TSOA,
    TSOC: TSOC,
    TSOP: TSOP,
    TSOT: TSOT,
    TSRC: TSRC,
    TSSE: TSSE,
    TSST: TSST,
    TYER: TYER,
    TXXX: TXXX,
    UFID: UFID,
    USER: USER,
    USLT: USLT,
    WCOM: WCOM,
    WCOP: WCOP,
    WOAF: WOAF,
    WOAR: WOAR,
    WOAS: WOAS,
    WORS: WORS,
    WPAY: WPAY,
    WPUB: WPUB,
    WXXX: WXXX,
    WFED: WFED,
    TGID: TGID,
    TSO2: TSO2,
    TT1: TT1,
    TT2: TT2,
    TT3: TT3,
    TP1: TP1,
    TP2: TP2,
    TP3: TP3,
    TP4: TP4,
    TCM: TCM,
    TXT: TXT,
    TLA: TLA,
    TCO: TCO,
    TAL: TAL,
    TPA: TPA,
    TRK: TRK,
    TRC: TRC,
    TYE: TYE,
    TDA: TDA,
    TIM: TIM,
    TRD: TRD,
    TMT: TMT,
    TFT: TFT,
    TBP: TBP,
    TCR: TCR,
    TPB: TPB,
    TEN: TEN,
    TSS: TSS,
    TOF: TOF,
    TLE: TLE,
    TSI: TSI,
    TDY: TDY,
    TKE: TKE,
    TOT: TOT,
    TOA: TOA,
    TOR: TOR,
    TXX: TXX,
    WAF: WAF,
    WAR: WAR,
    WAS: WAS,
    WCM: WCM,
    WCP: WCP,
    WPB: WPB,
    WXX: WXX,
    IPL: IPL,
    MCI: MCI,
    ETC: ETC,
    STC: STC,
    ULT: ULT,
    SLT: SLT,
    COM: COM,
    RVA: RVA,
    PIC: PIC,
    GEO: GEO,
    CNT: CNT,
    POP: POP,
    GP1: GP1,
    unsupported: unsupported
  });

  function hasID3v2(buffer) {
    var view = new BufferView(buffer);
    return view.getString(0, 3).string === 'ID3';
  }
  function decode(buffer, tagOffset, parseUnsupported) {
    var view = new BufferView(buffer, tagOffset);
    var version = view.getUint8(3, 2);
    var size = decodeSynch(view.getUint32(6));
    var flags = getHeaderFlags(view.getUint8(5), version[0]);
    var details = {
      version: version,
      flags: flags,
      size: size
    };
    var tags = {};
    if (version[0] !== 2 && version[0] !== 3 && version[0] !== 4) {
      throw new Error('Unknown ID3v2 major version');
    }
    var frameHeaderSize = version[0] === 2 ? 6 : 10;
    var offset = 10;
    var limit = size;
    var pushTag = function pushTag(tag) {
      var singleFrame = ['OWNE', 'MCDI', 'RVAD', 'SYTC', 'ETCO', 'PCNT'];
      switch (_typeof(tag.value)) {
        case 'number':
        case 'string':
          tag.value = tag.value.toString();
          if (tags[tag.id] && !singleFrame.includes(tag.id)) {
            tags[tag.id] += '\\\\' + tag.value;
          } else {
            tags[tag.id] = tag.value;
          }
          break;
        case 'object':
          if (singleFrame.includes(tag.id)) tags[tag.id] = tag.value;else {
            if (tags[tag.id]) tags[tag.id].push(tag.value);else tags[tag.id] = [tag.value];
          }
          break;
      }
    };
    while (offset < size) {
      var frameBytes = view.getUint8(offset, limit);
      var frame = decodeFrame(frameBytes, {
        version: version,
        flags: flags,
        parseUnsupported: parseUnsupported
      });
      if (!frame) break;
      offset += frame.size + frameHeaderSize;
      limit -= frame.size + frameHeaderSize;
      if (frame.id === 'SEEK') {
        var seekedTags = decode(buffer, offset + frame.value, parseUnsupported);
        for (var id in seekedTags) pushTag({
          id: id,
          value: seekedTags[id]
        });
      } else pushTag({
        id: frame.id,
        value: frame.value
      });
    }
    return {
      tags: tags,
      details: details
    };
  }
  function decodeFrame(bytes, options) {
    var view = new BufferView(bytes);
    if (view.getUint8(0) === 0x00) return false;
    var frame = {};
    var version = options.version,
      flags = options.flags,
      parseUnsupported = options.parseUnsupported;
    var sizeByte = version[0] === 2 ? view.getUint24(3) : view.getUint32(4);
    frame.id = view.getUint8String(0, version[0] === 2 ? 3 : 4);
    frame.flags = version[0] === 2 ? {} : getFrameFlags(view.getUint8(8, 2), version[0]);
    frame.size = version[0] === 4 ? decodeSynch(sizeByte) : sizeByte;
    var frameSpec = frames[frame.id];
    if (!frameSpec && !parseUnsupported) return;
    var offset = version[0] === 2 ? 6 : 10;
    var actualSize = frame.size;
    var dataLength = frame.size;
    var contents;
    if (frame.flags.dataLengthIndicator) {
      actualSize = decodeSynch(view.getUint32(offset));
      offset += 4;
      dataLength -= 4;
    }
    var unsynchedData = flags.unsynchronisation;
    if (version === 4) unsynchedData = frame.flags.unsynchronisation;
    if (unsynchedData) {
      var uint8 = view.getUint8(offset, dataLength);
      var unsynched = synch(Array.isArray(uint8) ? uint8 : [uint8]);
      contents = new Uint8Array(unsynched);
    } else {
      var _uint = view.getUint8(offset, actualSize);
      contents = new Uint8Array(Array.isArray(_uint) ? _uint : [_uint]);
    }
    if (!frameSpec && parseUnsupported) {
      frame.value = Array.from(contents);
      return frame;
    }
    frame.value = frameSpec.parse(contents.buffer, version[0]);
    return frame;
  }
  function validate(tags, strict, options) {
    var version = options.version,
      unsupported$1 = options.unsupported,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    if (version !== 2 && version !== 3 && version !== 4) {
      throw new Error('Unknown provided version');
    }
    if (encodingIndex < 0) {
      throw new Error("Unknown provided encoding: ".concat(encoding));
    }
    for (var id in tags) {
      var frameSpec = frames[id];
      var isSupported = frameSpec && frameSpec.version.includes(version);
      if (strict && !isSupported && unsupported$1) {
        throw new Error("".concat(id, " is not supported in ID3v2.").concat(version));
      }
      try {
        if (isSupported || frameSpec) frameSpec.validate(tags[id], version, strict);else if (unsupported$1) unsupported.validate(tags[id], version, strict);
      } catch (error) {
        throw new Error("".concat(error.message, " at ").concat(id));
      }
    }
    return true;
  }
  function encode(tags, options) {
    var version = options.version,
      padding = options.padding,
      unsynch = options.unsynch,
      unsupported$1 = options.unsupported,
      encoding = options.encoding,
      encodingIndex = options.encodingIndex;
    var headerBytes = [0x49, 0x44, 0x33, version, 0];
    var flagsByte = 0;
    var sizeView = new BufferView(4);
    var paddingBytes = new Uint8Array(padding);
    var framesBytes = [];
    for (var id in tags) {
      var frameSpec = frames[id];
      var isSupported = frameSpec && frameSpec.version.includes(version);
      if (!isSupported && !unsupported$1) continue;
      var writeOptions = {
        id: id,
        version: version,
        unsynch: unsynch,
        encoding: encoding,
        encodingIndex: encodingIndex
      };
      var bytes = !isSupported && unsupported$1 ? unsupported.write(tags[id], writeOptions) : frameSpec.write(tags[id], writeOptions);
      bytes.forEach(function (_byte) {
        return framesBytes.push(_byte);
      });
    }
    if (unsynch) flagsByte = setBit(flagsByte, 7);
    sizeView.setUint32(0, encodeSynch(framesBytes.length));
    return mergeBytes(headerBytes, flagsByte, sizeView.getUint8(0, 4), framesBytes, paddingBytes).buffer;
  }

  var MP3Tag = /*#__PURE__*/function () {
    function MP3Tag(buffer) {
      var verbose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      _classCallCheck(this, MP3Tag);
      if (!isBuffer(buffer)) {
        throw new TypeError('buffer is not ArrayBuffer/Buffer');
      }
      this.verbose = verbose;
      this.buffer = buffer;
      this.tags = {};
      this.error = '';
    }
    _createClass(MP3Tag, [{
      key: "name",
      get: function get() {
        return 'MP3Tag';
      },
      set: function set(value) {
        throw new Error('Unable to set this property');
      }
    }, {
      key: "version",
      get: function get() {
        return '3.11.2';
      },
      set: function set(value) {
        throw new Error('Unable to set this property');
      }
    }, {
      key: "read",
      value: function read() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.tags = {};
        this.error = '';
        try {
          this.tags = MP3Tag.readBuffer(this.buffer, options, this.verbose);
        } catch (error) {
          this.error = error.message;
        }
        return this.tags;
      }
    }, {
      key: "save",
      value: function save() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.error = '';
        var buffer = this.buffer;
        try {
          buffer = MP3Tag.writeBuffer(this.buffer, this.tags, options, this.verbose);
        } catch (error) {
          this.error = error.message;
        }
        if (this.error === '') this.buffer = buffer;
        return this.buffer;
      }
    }, {
      key: "remove",
      value: function remove() {
        this.tags = {};
        this.error = '';
        this.buffer = this.getAudio();
        return true;
      }
    }, {
      key: "getAudio",
      value: function getAudio() {
        return MP3Tag.getAudioBuffer(this.buffer);
      }
    }], [{
      key: "readBuffer",
      value: function readBuffer(buffer) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var verbose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!isBuffer(buffer)) {
          throw new TypeError('buffer is not ArrayBuffer/Buffer');
        }
        var tags = {};
        options = overwriteDefault(options, {
          id3v1: true,
          id3v2: true,
          unsupported: false
        });
        if (options.id3v1 && hasID3v1(buffer)) {
          if (verbose) console.log('ID3v1 found, reading...');
          var _ID3v1$decode = decode$1(buffer),
            v1Tags = _ID3v1$decode.tags,
            details = _ID3v1$decode.details;
          if (verbose) console.log('ID3v1 reading finished');
          tags.v1 = _objectSpread2({}, v1Tags);
          tags.v1Details = details;
        }
        if (options.id3v2 && hasID3v2(buffer)) {
          if (verbose) console.log('ID3v2 found, reading...');
          var _options = options,
            unsupported = _options.unsupported;
          var _ID3v2$decode = decode(buffer, 0, unsupported),
            v2Tags = _ID3v2$decode.tags,
            _details = _ID3v2$decode.details;
          if (verbose) console.log('ID3v2 reading finished');
          tags.v2 = _objectSpread2({}, v2Tags);
          tags.v2Details = _details;
        }
        Object.defineProperties(tags, {
          title: {
            get: function get() {
              return this.v2 && (this.v2.TIT2 || this.v2.TT2) || this.v1 && this.v1.title || '';
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                this.v2[version === 2 ? 'TT2' : 'TIT2'] = value;
              }
              if (this.v1) this.v1.title = value;
            }
          },
          artist: {
            get: function get() {
              return this.v2 && (this.v2.TPE1 || this.v2.TP1) || this.v1 && this.v1.artist || '';
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                this.v2[version === 2 ? 'TP1' : 'TPE1'] = value;
              }
              if (this.v1) this.v1.artist = value;
            }
          },
          album: {
            get: function get() {
              return this.v2 && (this.v2.TALB || this.v2.TAL) || this.v1 && this.v1.album || '';
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                this.v2[version === 2 ? 'TAL' : 'TALB'] = value;
              }
              if (this.v1) this.v1.album = value;
            }
          },
          year: {
            get: function get() {
              return this.v2 && (this.v2.TYER || this.v2.TDRC || this.v2.TYE) || this.v1 && this.v1.year || '';
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                if (version === 2) this.v2.TYE = value;else if (version === 3) this.v2.TYER = value;else if (version === 4) this.v2.TDRC = value;
              }
              if (this.v1) this.v1.year = value;
            }
          },
          comment: {
            get: function get() {
              var text = '';
              if (this.v2 && (this.v2.COMM || this.v2.COM)) {
                var comm = this.v2.COMM || this.v2.COM;
                if (Array.isArray(comm) && comm.length > 0) text = comm[0].text;
              } else if (this.v1 && this.v1.comment) text = this.v1.comment;
              return text;
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                this.v2[version === 2 ? 'COM' : 'COMM'] = [{
                  language: 'eng',
                  descriptor: '',
                  text: value
                }];
              }
              if (this.v1) this.v1.comment = value;
            }
          },
          track: {
            get: function get() {
              return this.v2 && (this.v2.TRCK && this.v2.TRCK.split('/')[0] || this.v2.TRK && this.v2.TRK.split('/')[0]) || this.v1 && this.v1.track || '';
            },
            set: function set(value) {
              if (this.v2 && value !== '') {
                var version = this.v2Details.version[0];
                this.v2[version === 2 ? 'TRK' : 'TRCK'] = value;
              }
              if (this.v1) this.v1.track = value;
            }
          },
          genre: {
            get: function get() {
              return this.v2 && (this.v2.TCON || this.v2.TCO) || this.v1 && this.v1.genre || '';
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                this.v2[version === 2 ? 'TCO' : 'TCON'] = value;
              }
              if (this.v1) this.v1.genre = value;
            }
          }
        });
        return tags;
      }
    }, {
      key: "writeBuffer",
      value: function writeBuffer(buffer, tags) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var verbose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var defaultVersion = tags.v2Details ? tags.v2Details.version[0] : 3;
        var defaultEncoding = 'utf-8';
        var audio = new Uint8Array(MP3Tag.getAudioBuffer(buffer));
        options = overwriteDefault(options, {
          strict: false,
          encoding: defaultEncoding,
          id3v1: {
            include: false,
            encoding: typeof options.id3v1 !== 'undefined' ? options.id3v1.encoding : defaultEncoding
          },
          id3v2: {
            include: true,
            unsynch: false,
            version: defaultVersion,
            padding: 2048,
            unsupported: false,
            encoding: typeof options.id3v2 !== 'undefined' ? options.id3v2.encoding : defaultEncoding
          }
        });
        if (options.id3v1.include) {
          if (verbose) console.log('Validating ID3v1...');
          validate$1(tags.v1, options.strict);
          if (verbose) console.log('Writing ID3v1...');
          var encoding = options.id3v1.encoding || options.encoding;
          var encoded = encode$1(tags.v1, encoding);
          var tagBytes = new Uint8Array(encoded);
          audio = mergeBytes(audio, tagBytes);
        }
        if (options.id3v2.include) {
          if (verbose) console.log('Validating ID3v2...');
          options.id3v2.encoding = options.id3v2.encoding || options.encoding;
          options.id3v2.encodingIndex = encoding2Index(options.id3v2.encoding);
          validate(tags.v2, options.strict, options.id3v2);
          if (verbose) console.log('Writing ID3v2...');
          var _encoded = encode(tags.v2, options.id3v2);
          var _tagBytes = new Uint8Array(_encoded);
          audio = mergeBytes(_tagBytes, audio);
        }
        return typeof Buffer !== 'undefined' ? Buffer.from(audio.buffer) : audio.buffer;
      }
    }, {
      key: "getAudioBuffer",
      value: function getAudioBuffer(buffer) {
        if (!isBuffer(buffer)) {
          throw new TypeError('buffer is not ArrayBuffer/Buffer');
        }
        if (hasID3v1(buffer)) {
          buffer = buffer.slice(0, buffer.byteLength - 128);
        }
        var i = 0;
        if (hasID3v2(buffer)) {
          var _ID3v2$decode2 = decode(buffer),
            details = _ID3v2$decode2.details;
          var size = details.size;
          i = size;
        }
        var view = new BufferView(buffer);
        var start = 0;
        while (i < view.byteLength) {
          if (view.getUint8(i) === 0xff && view.getUint8(i + 1) >= 0xf0) {
            start = i;
            break;
          } else i++;
        }
        var sliced = buffer.slice(start);
        return typeof Buffer !== 'undefined' ? Buffer.from(sliced) : sliced;
      }
    }]);
    return MP3Tag;
  }();

  return MP3Tag;

}));
