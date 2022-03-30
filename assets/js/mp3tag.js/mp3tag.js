(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MP3Tag = factory());
})(this, (function () { 'use strict';

  function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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
      Object.defineProperty(target, descriptor.key, descriptor);
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
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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
      _construct = Reflect.construct;
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var fails$y = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$x = fails$y; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$x(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var fails$w = fails$y;
  var functionBindNative = !fails$w(function () {
    var test = function () {
      /* empty */
    }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


    return typeof test != 'function' || test.hasOwnProperty('prototype');
  });

  var NATIVE_BIND$3 = functionBindNative;
  var FunctionPrototype$3 = Function.prototype;
  var bind$3 = FunctionPrototype$3.bind;
  var call$i = FunctionPrototype$3.call;
  var uncurryThis$D = NATIVE_BIND$3 && bind$3.bind(call$i, call$i);
  var functionUncurryThis = NATIVE_BIND$3 ? function (fn) {
    return fn && uncurryThis$D(fn);
  } : function (fn) {
    return fn && function () {
      return call$i.apply(fn, arguments);
    };
  };

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$Y = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var global$X = global$Y;
  var TypeError$i = global$X.TypeError; // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$9 = function (it) {
    if (it == undefined) throw TypeError$i("Can't call method on " + it);
    return it;
  };

  var global$W = global$Y;
  var requireObjectCoercible$8 = requireObjectCoercible$9;
  var Object$5 = global$W.Object; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$b = function (argument) {
    return Object$5(requireObjectCoercible$8(argument));
  };

  var uncurryThis$C = functionUncurryThis;
  var toObject$a = toObject$b;
  var hasOwnProperty = uncurryThis$C({}.hasOwnProperty); // `HasOwnProperty` abstract operation
  // https://tc39.es/ecma262/#sec-hasownproperty

  var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$a(it), key);
  };

  var DESCRIPTORS$i = descriptors;
  var hasOwn$e = hasOwnProperty_1;
  var FunctionPrototype$2 = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getDescriptor = DESCRIPTORS$i && Object.getOwnPropertyDescriptor;
  var EXISTS$1 = hasOwn$e(FunctionPrototype$2, 'name'); // additional protection from minified / mangled / dropped function names

  var PROPER = EXISTS$1 && function something() {
    /* empty */
  }.name === 'something';

  var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$i || DESCRIPTORS$i && getDescriptor(FunctionPrototype$2, 'name').configurable);
  var functionName = {
    EXISTS: EXISTS$1,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE$1
  };

  var objectDefineProperty = {};

  // https://tc39.es/ecma262/#sec-iscallable

  var isCallable$m = function (argument) {
    return typeof argument == 'function';
  };

  var isCallable$l = isCallable$m;

  var isObject$f = function (it) {
    return typeof it == 'object' ? it !== null : isCallable$l(it);
  };

  var global$V = global$Y;
  var isObject$e = isObject$f;
  var document$1 = global$V.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject$e(document$1) && isObject$e(document$1.createElement);

  var documentCreateElement$2 = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$h = descriptors;
  var fails$v = fails$y;
  var createElement = documentCreateElement$2; // Thanks to IE8 for its funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$h && !fails$v(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var DESCRIPTORS$g = descriptors;
  var fails$u = fails$y; // V8 ~ Chrome 36-
  // https://bugs.chromium.org/p/v8/issues/detail?id=3334

  var v8PrototypeDefineBug = DESCRIPTORS$g && fails$u(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty(function () {
      /* empty */
    }, 'prototype', {
      value: 42,
      writable: false
    }).prototype != 42;
  });

  var global$U = global$Y;
  var isObject$d = isObject$f;
  var String$4 = global$U.String;
  var TypeError$h = global$U.TypeError; // `Assert: Type(argument) is Object`

  var anObject$f = function (argument) {
    if (isObject$d(argument)) return argument;
    throw TypeError$h(String$4(argument) + ' is not an object');
  };

  var NATIVE_BIND$2 = functionBindNative;
  var call$h = Function.prototype.call;
  var functionCall = NATIVE_BIND$2 ? call$h.bind(call$h) : function () {
    return call$h.apply(call$h, arguments);
  };

  var global$T = global$Y;
  var isCallable$k = isCallable$m;

  var aFunction = function (argument) {
    return isCallable$k(argument) ? argument : undefined;
  };

  var getBuiltIn$7 = function (namespace, method) {
    return arguments.length < 2 ? aFunction(global$T[namespace]) : global$T[namespace] && global$T[namespace][method];
  };

  var uncurryThis$B = functionUncurryThis;
  var objectIsPrototypeOf = uncurryThis$B({}.isPrototypeOf);

  var getBuiltIn$6 = getBuiltIn$7;
  var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || '';

  var global$S = global$Y;
  var userAgent$2 = engineUserAgent;
  var process = global$S.process;
  var Deno = global$S.Deno;
  var versions = process && process.versions || Deno && Deno.version;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
    // but their correct versions are not interesting for us

    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  } // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
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
  var fails$t = fails$y; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$t(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$3 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$3 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$R = global$Y;
  var getBuiltIn$5 = getBuiltIn$7;
  var isCallable$j = isCallable$m;
  var isPrototypeOf$7 = objectIsPrototypeOf;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var Object$4 = global$R.Object;
  var isSymbol$4 = USE_SYMBOL_AS_UID$1 ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn$5('Symbol');
    return isCallable$j($Symbol) && isPrototypeOf$7($Symbol.prototype, Object$4(it));
  };

  var global$Q = global$Y;
  var String$3 = global$Q.String;

  var tryToString$4 = function (argument) {
    try {
      return String$3(argument);
    } catch (error) {
      return 'Object';
    }
  };

  var global$P = global$Y;
  var isCallable$i = isCallable$m;
  var tryToString$3 = tryToString$4;
  var TypeError$g = global$P.TypeError; // `Assert: IsCallable(argument) is true`

  var aCallable$5 = function (argument) {
    if (isCallable$i(argument)) return argument;
    throw TypeError$g(tryToString$3(argument) + ' is not a function');
  };

  var aCallable$4 = aCallable$5; // `GetMethod` abstract operation
  // https://tc39.es/ecma262/#sec-getmethod

  var getMethod$5 = function (V, P) {
    var func = V[P];
    return func == null ? undefined : aCallable$4(func);
  };

  var global$O = global$Y;
  var call$g = functionCall;
  var isCallable$h = isCallable$m;
  var isObject$c = isObject$f;
  var TypeError$f = global$O.TypeError; // `OrdinaryToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-ordinarytoprimitive

  var ordinaryToPrimitive$1 = function (input, pref) {
    var fn, val;
    if (pref === 'string' && isCallable$h(fn = input.toString) && !isObject$c(val = call$g(fn, input))) return val;
    if (isCallable$h(fn = input.valueOf) && !isObject$c(val = call$g(fn, input))) return val;
    if (pref !== 'string' && isCallable$h(fn = input.toString) && !isObject$c(val = call$g(fn, input))) return val;
    throw TypeError$f("Can't convert object to primitive value");
  };

  var shared$5 = {exports: {}};

  var global$N = global$Y; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var defineProperty$9 = Object.defineProperty;

  var setGlobal$3 = function (key, value) {
    try {
      defineProperty$9(global$N, key, {
        value: value,
        configurable: true,
        writable: true
      });
    } catch (error) {
      global$N[key] = value;
    }

    return value;
  };

  var global$M = global$Y;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$M[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  (shared$5.exports = function (key, value) {
    return store$2[key] || (store$2[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.21.1',
    mode: 'global',
    copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
    license: 'https://github.com/zloirock/core-js/blob/v3.21.1/LICENSE',
    source: 'https://github.com/zloirock/core-js'
  });

  var uncurryThis$A = functionUncurryThis;
  var id = 0;
  var postfix = Math.random();
  var toString$e = uncurryThis$A(1.0.toString);

  var uid$4 = function (key) {
    return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$e(++id + postfix, 36);
  };

  var global$L = global$Y;
  var shared$4 = shared$5.exports;
  var hasOwn$d = hasOwnProperty_1;
  var uid$3 = uid$4;
  var NATIVE_SYMBOL$2 = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var WellKnownSymbolsStore$1 = shared$4('wks');
  var Symbol$2 = global$L.Symbol;
  var symbolFor = Symbol$2 && Symbol$2['for'];
  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$2 : Symbol$2 && Symbol$2.withoutSetter || uid$3;

  var wellKnownSymbol$p = function (name) {
    if (!hasOwn$d(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$2 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      var description = 'Symbol.' + name;

      if (NATIVE_SYMBOL$2 && hasOwn$d(Symbol$2, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$2[name];
      } else if (USE_SYMBOL_AS_UID && symbolFor) {
        WellKnownSymbolsStore$1[name] = symbolFor(description);
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol(description);
      }
    }

    return WellKnownSymbolsStore$1[name];
  };

  var global$K = global$Y;
  var call$f = functionCall;
  var isObject$b = isObject$f;
  var isSymbol$3 = isSymbol$4;
  var getMethod$4 = getMethod$5;
  var ordinaryToPrimitive = ordinaryToPrimitive$1;
  var wellKnownSymbol$o = wellKnownSymbol$p;
  var TypeError$e = global$K.TypeError;
  var TO_PRIMITIVE$1 = wellKnownSymbol$o('toPrimitive'); // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive

  var toPrimitive$1 = function (input, pref) {
    if (!isObject$b(input) || isSymbol$3(input)) return input;
    var exoticToPrim = getMethod$4(input, TO_PRIMITIVE$1);
    var result;

    if (exoticToPrim) {
      if (pref === undefined) pref = 'default';
      result = call$f(exoticToPrim, input, pref);
      if (!isObject$b(result) || isSymbol$3(result)) return result;
      throw TypeError$e("Can't convert object to primitive value");
    }

    if (pref === undefined) pref = 'number';
    return ordinaryToPrimitive(input, pref);
  };

  var toPrimitive = toPrimitive$1;
  var isSymbol$2 = isSymbol$4; // `ToPropertyKey` abstract operation
  // https://tc39.es/ecma262/#sec-topropertykey

  var toPropertyKey$5 = function (argument) {
    var key = toPrimitive(argument, 'string');
    return isSymbol$2(key) ? key : key + '';
  };

  var global$J = global$Y;
  var DESCRIPTORS$f = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
  var anObject$e = anObject$f;
  var toPropertyKey$4 = toPropertyKey$5;
  var TypeError$d = global$J.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty$1 = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;
  var ENUMERABLE = 'enumerable';
  var CONFIGURABLE = 'configurable';
  var WRITABLE = 'writable'; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$f ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$4(P);
    anObject$e(Attributes);

    if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
      var current = $getOwnPropertyDescriptor$2(O, P);

      if (current && current[WRITABLE]) {
        O[P] = Attributes.value;
        Attributes = {
          configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
          enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
          writable: false
        };
      }
    }

    return $defineProperty$1(O, P, Attributes);
  } : $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$e(O);
    P = toPropertyKey$4(P);
    anObject$e(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError$d('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$e = descriptors;
  var FUNCTION_NAME_EXISTS = functionName.EXISTS;
  var uncurryThis$z = functionUncurryThis;
  var defineProperty$8 = objectDefineProperty.f;
  var FunctionPrototype$1 = Function.prototype;
  var functionToString$1 = uncurryThis$z(FunctionPrototype$1.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec$2 = uncurryThis$z(nameRE.exec);
  var NAME$1 = 'name'; // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name

  if (DESCRIPTORS$e && !FUNCTION_NAME_EXISTS) {
    defineProperty$8(FunctionPrototype$1, NAME$1, {
      configurable: true,
      get: function () {
        try {
          return regExpExec$2(nameRE, functionToString$1(this))[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  var $propertyIsEnumerable$1 = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$1.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
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

  var uncurryThis$y = functionUncurryThis;
  var toString$d = uncurryThis$y({}.toString);
  var stringSlice$7 = uncurryThis$y(''.slice);

  var classofRaw$1 = function (it) {
    return stringSlice$7(toString$d(it), 8, -1);
  };

  var global$I = global$Y;
  var uncurryThis$x = functionUncurryThis;
  var fails$s = fails$y;
  var classof$c = classofRaw$1;
  var Object$3 = global$I.Object;
  var split = uncurryThis$x(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$s(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object$3('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$c(it) == 'String' ? split(it, '') : Object$3(it);
  } : Object$3;

  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$7 = requireObjectCoercible$9;

  var toIndexedObject$a = function (it) {
    return IndexedObject$2(requireObjectCoercible$7(it));
  };

  var DESCRIPTORS$d = descriptors;
  var call$e = functionCall;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$5 = createPropertyDescriptor$6;
  var toIndexedObject$9 = toIndexedObject$a;
  var toPropertyKey$3 = toPropertyKey$5;
  var hasOwn$c = hasOwnProperty_1;
  var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$d ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$9(O);
    P = toPropertyKey$3(P);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
      /* empty */
    }
    if (hasOwn$c(O, P)) return createPropertyDescriptor$5(!call$e(propertyIsEnumerableModule$1.f, O, P), O[P]);
  };

  var DESCRIPTORS$c = descriptors;
  var definePropertyModule$7 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$a = DESCRIPTORS$c ? function (object, key, value) {
    return definePropertyModule$7.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$b = {exports: {}};

  var uncurryThis$w = functionUncurryThis;
  var isCallable$g = isCallable$m;
  var store$1 = sharedStore;
  var functionToString = uncurryThis$w(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (!isCallable$g(store$1.inspectSource)) {
    store$1.inspectSource = function (it) {
      return functionToString(it);
    };
  }

  var inspectSource$3 = store$1.inspectSource;

  var global$H = global$Y;
  var isCallable$f = isCallable$m;
  var inspectSource$2 = inspectSource$3;
  var WeakMap$1 = global$H.WeakMap;
  var nativeWeakMap = isCallable$f(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

  var shared$3 = shared$5.exports;
  var uid$2 = uid$4;
  var keys$2 = shared$3('keys');

  var sharedKey$4 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$2(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$G = global$Y;
  var uncurryThis$v = functionUncurryThis;
  var isObject$a = isObject$f;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$a;
  var hasOwn$b = hasOwnProperty_1;
  var shared$2 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$4 = hiddenKeys$5;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var TypeError$c = global$G.TypeError;
  var WeakMap = global$G.WeakMap;
  var set$1, get$1, has;

  var enforce = function (it) {
    return has(it) ? get$1(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$a(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError$c('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$2.state) {
    var store = shared$2.state || (shared$2.state = new WeakMap());
    var wmget = uncurryThis$v(store.get);
    var wmhas = uncurryThis$v(store.has);
    var wmset = uncurryThis$v(store.set);

    set$1 = function (it, metadata) {
      if (wmhas(store, it)) throw new TypeError$c(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset(store, it, metadata);
      return metadata;
    };

    get$1 = function (it) {
      return wmget(store, it) || {};
    };

    has = function (it) {
      return wmhas(store, it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$4[STATE] = true;

    set$1 = function (it, metadata) {
      if (hasOwn$b(it, STATE)) throw new TypeError$c(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$9(it, STATE, metadata);
      return metadata;
    };

    get$1 = function (it) {
      return hasOwn$b(it, STATE) ? it[STATE] : {};
    };

    has = function (it) {
      return hasOwn$b(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get$1,
    has: has,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$F = global$Y;
  var isCallable$e = isCallable$m;
  var hasOwn$a = hasOwnProperty_1;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$a;
  var setGlobal$1 = setGlobal$3;
  var inspectSource$1 = inspectSource$3;
  var InternalStateModule$4 = internalState;
  var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
  var getInternalState$6 = InternalStateModule$4.get;
  var enforceInternalState$1 = InternalStateModule$4.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$b.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var name = options && options.name !== undefined ? options.name : key;
    var state;

    if (isCallable$e(value)) {
      if (String(name).slice(0, 7) === 'Symbol(') {
        name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
      }

      if (!hasOwn$a(value, 'name') || CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name) {
        createNonEnumerableProperty$8(value, 'name', name);
      }

      state = enforceInternalState$1(value);

      if (!state.source) {
        state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
      }
    }

    if (O === global$F) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty$8(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return isCallable$e(this) && getInternalState$6(this).source || inspectSource$1(this);
  });

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$5 = Math.floor; // `ToIntegerOrInfinity` abstract operation
  // https://tc39.es/ecma262/#sec-tointegerorinfinity

  var toIntegerOrInfinity$8 = function (argument) {
    var number = +argument; // eslint-disable-next-line no-self-compare -- safe

    return number !== number || number === 0 ? 0 : (number > 0 ? floor$5 : ceil)(number);
  };

  var toIntegerOrInfinity$7 = toIntegerOrInfinity$8;
  var max$3 = Math.max;
  var min$6 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$7 = function (index, length) {
    var integer = toIntegerOrInfinity$7(index);
    return integer < 0 ? max$3(integer + length, 0) : min$6(integer, length);
  };

  var toIntegerOrInfinity$6 = toIntegerOrInfinity$8;
  var min$5 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$a = function (argument) {
    return argument > 0 ? min$5(toIntegerOrInfinity$6(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toLength$9 = toLength$a; // `LengthOfArrayLike` abstract operation
  // https://tc39.es/ecma262/#sec-lengthofarraylike

  var lengthOfArrayLike$c = function (obj) {
    return toLength$9(obj.length);
  };

  var toIndexedObject$8 = toIndexedObject$a;
  var toAbsoluteIndex$6 = toAbsoluteIndex$7;
  var lengthOfArrayLike$b = lengthOfArrayLike$c; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$4 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$8($this);
      var length = lengthOfArrayLike$b(O);
      var index = toAbsoluteIndex$6(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare -- NaN check

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
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

  var uncurryThis$u = functionUncurryThis;
  var hasOwn$9 = hasOwnProperty_1;
  var toIndexedObject$7 = toIndexedObject$a;
  var indexOf$1 = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;
  var push$4 = uncurryThis$u([].push);

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$7(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !hasOwn$9(hiddenKeys$3, key) && hasOwn$9(O, key) && push$4(result, key); // Don't enum bug & hidden keys


    while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
      ~indexOf$1(result, key) || push$4(result, key);
    }

    return result;
  };

  var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var internalObjectKeys$1 = objectKeysInternal;
  var enumBugKeys$2 = enumBugKeys$3;
  var hiddenKeys$2 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  // eslint-disable-next-line es/no-object-getownpropertynames -- safe

  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys$1(O, hiddenKeys$2);
  };

  var objectGetOwnPropertySymbols = {};

  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

  var getBuiltIn$4 = getBuiltIn$7;
  var uncurryThis$t = functionUncurryThis;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$d = anObject$f;
  var concat$1 = uncurryThis$t([].concat); // all object keys, includes non-enumerable and symbols

  var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$d(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
  };

  var hasOwn$8 = hasOwnProperty_1;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$6 = objectDefineProperty;

  var copyConstructorProperties$2 = function (target, source, exceptions) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$6.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (!hasOwn$8(target, key) && !(exceptions && hasOwn$8(exceptions, key))) {
        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
      }
    }
  };

  var fails$r = fails$y;
  var isCallable$d = isCallable$m;
  var replacement = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : isCallable$d(detection) ? fails$r(detection) : !!detection;
  };

  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';
  var isForced_1 = isForced$2;

  var global$E = global$Y;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$a;
  var redefine$a = redefine$b.exports;
  var setGlobal = setGlobal$3;
  var copyConstructorProperties$1 = copyConstructorProperties$2;
  var isForced$1 = isForced_1;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
    options.name        - the .name of the function if it does not match the key
  */

  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global$E;
    } else if (STATIC) {
      target = global$E[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$E[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty == typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$7(sourceProperty, 'sham', true);
      } // extend global


      redefine$a(target, key, sourceProperty, options);
    }
  };

  var objectDefineProperties = {};

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$b = descriptors;
  var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
  var definePropertyModule$5 = objectDefineProperty;
  var anObject$c = anObject$f;
  var toIndexedObject$6 = toIndexedObject$a;
  var objectKeys$1 = objectKeys$2; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  objectDefineProperties.f = DESCRIPTORS$b && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$c(O);
    var props = toIndexedObject$6(Properties);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) definePropertyModule$5.f(O, key = keys[index++], props[key]);

    return O;
  };

  var $$l = _export;
  var DESCRIPTORS$a = descriptors;
  var defineProperties = objectDefineProperties.f; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  $$l({
    target: 'Object',
    stat: true,
    forced: Object.defineProperties !== defineProperties,
    sham: !DESCRIPTORS$a
  }, {
    defineProperties: defineProperties
  });

  var classof$b = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$5 = Array.isArray || function isArray(argument) {
    return classof$b(argument) == 'Array';
  };

  var $$k = _export;
  var isArray$4 = isArray$5; // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray

  $$k({
    target: 'Array',
    stat: true
  }, {
    isArray: isArray$4
  });

  var wellKnownSymbol$n = wellKnownSymbol$p;
  var TO_STRING_TAG$3 = wellKnownSymbol$n('toStringTag');
  var test = {};
  test[TO_STRING_TAG$3] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var global$D = global$Y;
  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var isCallable$c = isCallable$m;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$m = wellKnownSymbol$p;
  var TO_STRING_TAG$2 = wellKnownSymbol$m('toStringTag');
  var Object$2 = global$D.Object; // ES3 wrong here

  var CORRECT_ARGUMENTS = classofRaw(function () {
    return arguments;
  }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) {
      /* empty */
    }
  }; // getting tag from ES6+ `Object.prototype.toString`


  var classof$a = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object$2(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$c(O.callee) ? 'Arguments' : result;
  };

  var global$C = global$Y;
  var classof$9 = classof$a;
  var String$2 = global$C.String;

  var toString$c = function (argument) {
    if (classof$9(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return String$2(argument);
  };

  var anObject$b = anObject$f; // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

  var regexpFlags$1 = function () {
    var that = anObject$b(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var fails$q = fails$y;
  var global$B = global$Y; // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

  var $RegExp$2 = global$B.RegExp;
  var UNSUPPORTED_Y$3 = fails$q(function () {
    var re = $RegExp$2('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  }); // UC Browser bug
  // https://github.com/zloirock/core-js/issues/1008

  var MISSED_STICKY$2 = UNSUPPORTED_Y$3 || fails$q(function () {
    return !$RegExp$2('a', 'y').sticky;
  });
  var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$q(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = $RegExp$2('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });
  var regexpStickyHelpers = {
    BROKEN_CARET: BROKEN_CARET,
    MISSED_STICKY: MISSED_STICKY$2,
    UNSUPPORTED_Y: UNSUPPORTED_Y$3
  };

  var getBuiltIn$3 = getBuiltIn$7;
  var html$1 = getBuiltIn$3('document', 'documentElement');

  /* global ActiveXObject -- old IE, WSH */
  var anObject$a = anObject$f;
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

  var EmptyConstructor = function () {
    /* empty */
  };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  }; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak

    return temp;
  }; // Create object with fake `null` prototype: use iframe Object with cleared prototype


  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement$1('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  }; // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug


  var activeXDocument;

  var NullProtoObject = function () {
    try {
      activeXDocument = new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

    var length = enumBugKeys.length;

    while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];

    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE$2] = anObject$a(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$2] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();

    return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
  };

  var fails$p = fails$y;
  var global$A = global$Y; // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

  var $RegExp$1 = global$A.RegExp;
  var regexpUnsupportedDotAll = fails$p(function () {
    var re = $RegExp$1('.', 's');
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$o = fails$y;
  var global$z = global$Y; // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

  var $RegExp = global$z.RegExp;
  var regexpUnsupportedNcg = fails$o(function () {
    var re = $RegExp('(?<a>b)', 'g');
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

  /* eslint-disable regexp/no-useless-quantifier -- testing */


  var call$d = functionCall;
  var uncurryThis$s = functionUncurryThis;
  var toString$b = toString$c;
  var regexpFlags = regexpFlags$1;
  var stickyHelpers$2 = regexpStickyHelpers;
  var shared$1 = shared$5.exports;
  var create$3 = objectCreate;
  var getInternalState$5 = internalState.get;
  var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
  var nativeReplace = shared$1('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$4 = uncurryThis$s(''.charAt);
  var indexOf = uncurryThis$s(''.indexOf);
  var replace$4 = uncurryThis$s(''.replace);
  var stringSlice$6 = uncurryThis$s(''.slice);

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/;
    var re2 = /b*/g;
    call$d(nativeExec, re1, 'a');
    call$d(nativeExec, re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();

  var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

  if (PATCH) {
    patchedExec = function exec(string) {
      var re = this;
      var state = getInternalState$5(re);
      var str = toString$b(string);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = call$d(patchedExec, raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = call$d(regexpFlags, re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = replace$4(flags, 'y', '');

        if (indexOf(flags, 'g') === -1) {
          flags += 'g';
        }

        strCopy = stringSlice$6(str, re.lastIndex); // Support anchored sticky behavior.

        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$4(str, re.lastIndex - 1) !== '\n')) {
          source = '(?: ' + source + ')';
          strCopy = ' ' + strCopy;
          charsAdded++;
        } // ^(? + rx + ) is needed, in combination with some str slicing, to
        // simulate the 'y' flag.


        reCopy = new RegExp('^(?:' + source + ')', flags);
      }

      if (NPCG_INCLUDED) {
        reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
      }

      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
      match = call$d(nativeExec, sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = stringSlice$6(match.input, charsAdded);
          match[0] = stringSlice$6(match[0], charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        call$d(nativeReplace, match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }

      if (match && groups) {
        match.groups = object = create$3(null);

        for (i = 0; i < groups.length; i++) {
          group = groups[i];
          object[group[0]] = match[group[1]];
        }
      }

      return match;
    };
  }

  var regexpExec$3 = patchedExec;

  var $$j = _export;
  var exec$4 = regexpExec$3; // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec

  $$j({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec$4
  }, {
    exec: exec$4
  });

  var NATIVE_BIND$1 = functionBindNative;
  var FunctionPrototype = Function.prototype;
  var apply$6 = FunctionPrototype.apply;
  var call$c = FunctionPrototype.call; // eslint-disable-next-line es/no-reflect -- safe

  var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$c.bind(apply$6) : function () {
    return call$c.apply(apply$6, arguments);
  });

  var uncurryThis$r = functionUncurryThis;
  var redefine$9 = redefine$b.exports;
  var regexpExec$2 = regexpExec$3;
  var fails$n = fails$y;
  var wellKnownSymbol$l = wellKnownSymbol$p;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$a;
  var SPECIES$5 = wellKnownSymbol$l('species');
  var RegExpPrototype$4 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$l(KEY);
    var DELEGATES_TO_SYMBOL = !fails$n(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$n(function () {
      // Symbol-named RegExp methods call .exec
      var execCalled = false;
      var re = /a/;

      if (KEY === 'split') {
        // We can't use real regex here since it causes deoptimization
        // and serious performance degradation in V8
        // https://github.com/zloirock/core-js/issues/306
        re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
        // a new one. We need to return the patched regex when creating the new one.

        re.constructor = {};

        re.constructor[SPECIES$5] = function () {
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
      var uncurriedNativeRegExpMethod = uncurryThis$r(/./[SYMBOL]);
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var uncurriedNativeMethod = uncurryThis$r(nativeMethod);
        var $exec = regexp.exec;

        if ($exec === regexpExec$2 || $exec === RegExpPrototype$4.exec) {
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
      redefine$9(String.prototype, KEY, methods[0]);
      redefine$9(RegExpPrototype$4, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$6(RegExpPrototype$4[SYMBOL], 'sham', true);
  };

  var isObject$9 = isObject$f;
  var classof$8 = classofRaw$1;
  var wellKnownSymbol$k = wellKnownSymbol$p;
  var MATCH$2 = wellKnownSymbol$k('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp

  var isRegexp = function (it) {
    var isRegExp;
    return isObject$9(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$8(it) == 'RegExp');
  };

  var uncurryThis$q = functionUncurryThis;
  var fails$m = fails$y;
  var isCallable$b = isCallable$m;
  var classof$7 = classof$a;
  var getBuiltIn$2 = getBuiltIn$7;
  var inspectSource = inspectSource$3;

  var noop = function () {
    /* empty */
  };

  var empty = [];
  var construct = getBuiltIn$2('Reflect', 'construct');
  var constructorRegExp = /^\s*(?:class|function)\b/;
  var exec$3 = uncurryThis$q(constructorRegExp.exec);
  var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

  var isConstructorModern = function isConstructor(argument) {
    if (!isCallable$b(argument)) return false;

    try {
      construct(noop, empty, argument);
      return true;
    } catch (error) {
      return false;
    }
  };

  var isConstructorLegacy = function isConstructor(argument) {
    if (!isCallable$b(argument)) return false;

    switch (classof$7(argument)) {
      case 'AsyncFunction':
      case 'GeneratorFunction':
      case 'AsyncGeneratorFunction':
        return false;
    }

    try {
      // we can't check .prototype since constructors produced by .bind haven't it
      // `Function#toString` throws on some built-it function in some legacy engines
      // (for example, `DOMQuad` and similar in FF41-)
      return INCORRECT_TO_STRING || !!exec$3(constructorRegExp, inspectSource(argument));
    } catch (error) {
      return true;
    }
  };

  isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-isconstructor

  var isConstructor$3 = !construct || fails$m(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
      called = true;
    }) || called;
  }) ? isConstructorLegacy : isConstructorModern;

  var global$y = global$Y;
  var isConstructor$2 = isConstructor$3;
  var tryToString$2 = tryToString$4;
  var TypeError$b = global$y.TypeError; // `Assert: IsConstructor(argument) is true`

  var aConstructor$2 = function (argument) {
    if (isConstructor$2(argument)) return argument;
    throw TypeError$b(tryToString$2(argument) + ' is not a constructor');
  };

  var anObject$9 = anObject$f;
  var aConstructor$1 = aConstructor$2;
  var wellKnownSymbol$j = wellKnownSymbol$p;
  var SPECIES$4 = wellKnownSymbol$j('species'); // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor

  var speciesConstructor$3 = function (O, defaultConstructor) {
    var C = anObject$9(O).constructor;
    var S;
    return C === undefined || (S = anObject$9(C)[SPECIES$4]) == undefined ? defaultConstructor : aConstructor$1(S);
  };

  var uncurryThis$p = functionUncurryThis;
  var toIntegerOrInfinity$5 = toIntegerOrInfinity$8;
  var toString$a = toString$c;
  var requireObjectCoercible$6 = requireObjectCoercible$9;
  var charAt$3 = uncurryThis$p(''.charAt);
  var charCodeAt = uncurryThis$p(''.charCodeAt);
  var stringSlice$5 = uncurryThis$p(''.slice);

  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString$a(requireObjectCoercible$6($this));
      var position = toIntegerOrInfinity$5(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$3(S, position) : first : CONVERT_TO_STRING ? stringSlice$5(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
  };

  var charAt$2 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex

  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt$2(S, index).length : 1);
  };

  var toPropertyKey$2 = toPropertyKey$5;
  var definePropertyModule$4 = objectDefineProperty;
  var createPropertyDescriptor$3 = createPropertyDescriptor$6;

  var createProperty$3 = function (object, key, value) {
    var propertyKey = toPropertyKey$2(key);
    if (propertyKey in object) definePropertyModule$4.f(object, propertyKey, createPropertyDescriptor$3(0, value));else object[propertyKey] = value;
  };

  var global$x = global$Y;
  var toAbsoluteIndex$5 = toAbsoluteIndex$7;
  var lengthOfArrayLike$a = lengthOfArrayLike$c;
  var createProperty$2 = createProperty$3;
  var Array$6 = global$x.Array;
  var max$2 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike$a(O);
    var k = toAbsoluteIndex$5(start, length);
    var fin = toAbsoluteIndex$5(end === undefined ? length : end, length);
    var result = Array$6(max$2(fin - k, 0));

    for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);

    result.length = n;
    return result;
  };

  var global$w = global$Y;
  var call$b = functionCall;
  var anObject$8 = anObject$f;
  var isCallable$a = isCallable$m;
  var classof$6 = classofRaw$1;
  var regexpExec$1 = regexpExec$3;
  var TypeError$a = global$w.TypeError; // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec

  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;

    if (isCallable$a(exec)) {
      var result = call$b(exec, R, S);
      if (result !== null) anObject$8(result);
      return result;
    }

    if (classof$6(R) === 'RegExp') return call$b(regexpExec$1, R, S);
    throw TypeError$a('RegExp#exec called on incompatible receiver');
  };

  var apply$5 = functionApply;
  var call$a = functionCall;
  var uncurryThis$o = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var isRegExp$2 = isRegexp;
  var anObject$7 = anObject$f;
  var requireObjectCoercible$5 = requireObjectCoercible$9;
  var speciesConstructor$2 = speciesConstructor$3;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var toLength$8 = toLength$a;
  var toString$9 = toString$c;
  var getMethod$3 = getMethod$5;
  var arraySlice$7 = arraySliceSimple;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers$1 = regexpStickyHelpers;
  var fails$l = fails$y;
  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$4 = Math.min;
  var $push = [].push;
  var exec$2 = uncurryThis$o(/./.exec);
  var push$3 = uncurryThis$o($push);
  var stringSlice$4 = uncurryThis$o(''.slice); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$l(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;

    re.exec = function () {
      return originalExec.apply(this, arguments);
    };

    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  }); // @@split logic

  fixRegExpWellKnownSymbolLogic$2('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;

    if ('abbc'.split(/(b)*/)[1] == 'c' || // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString$9(requireObjectCoercible$5(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

        if (!isRegExp$2(separator)) {
          return call$a(nativeSplit, string, separator, lim);
        }

        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;

        while (match = call$a(regexpExec, separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;

          if (lastIndex > lastLastIndex) {
            push$3(output, stringSlice$4(string, lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) apply$5($push, output, arraySlice$7(match, 1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }

          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }

        if (lastLastIndex === string.length) {
          if (lastLength || !exec$2(separatorCopy, '')) push$3(output, '');
        } else push$3(output, stringSlice$4(string, lastLastIndex));

        return output.length > lim ? arraySlice$7(output, 0, lim) : output;
      }; // Chakra, V8

    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : call$a(nativeSplit, this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [// `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$5(this);
      var splitter = separator == undefined ? undefined : getMethod$3(separator, SPLIT);
      return splitter ? call$a(splitter, separator, O, limit) : call$a(internalSplit, toString$9(O), separator, limit);
    }, // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject$7(this);
      var S = toString$9(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;
      var C = speciesConstructor$2(rx, RegExp);
      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (UNSUPPORTED_Y$1 ? 'g' : 'y'); // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.

      var splitter = new C(UNSUPPORTED_Y$1 ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];

      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y$1 ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y$1 ? stringSlice$4(S, q) : S);
        var e;

        if (z === null || (e = min$4(toLength$8(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p) {
          q = advanceStringIndex$2(S, q, unicodeMatching);
        } else {
          push$3(A, stringSlice$4(S, p, q));
          if (A.length === lim) return A;

          for (var i = 1; i <= z.length - 1; i++) {
            push$3(A, z[i]);
            if (A.length === lim) return A;
          }

          q = p = e;
        }
      }

      push$3(A, stringSlice$4(S, p));
      return A;
    }];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

  var wellKnownSymbol$i = wellKnownSymbol$p;
  var create$2 = objectCreate;
  var definePropertyModule$3 = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$i('unscopables');
  var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    definePropertyModule$3.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  } // add a key to Array.prototype[@@unscopables]


  var addToUnscopables$2 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$k = fails$y;
  var correctPrototypeGetter = !fails$k(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var global$v = global$Y;
  var hasOwn$7 = hasOwnProperty_1;
  var isCallable$9 = isCallable$m;
  var toObject$9 = toObject$b;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey$1('IE_PROTO');
  var Object$1 = global$v.Object;
  var ObjectPrototype$3 = Object$1.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof

  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object$1.getPrototypeOf : function (O) {
    var object = toObject$9(O);
    if (hasOwn$7(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;

    if (isCallable$9(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }

    return object instanceof Object$1 ? ObjectPrototype$3 : null;
  };

  var fails$j = fails$y;
  var isCallable$8 = isCallable$m;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var redefine$8 = redefine$b.exports;
  var wellKnownSymbol$h = wellKnownSymbol$p;
  var ITERATOR$6 = wellKnownSymbol$h('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false; // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object

  var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
  /* eslint-disable es/no-array-prototype-keys -- safe */

  if ([].keys) {
    arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;else {
      PrototypeOfArrayIteratorPrototype = getPrototypeOf$3(getPrototypeOf$3(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$j(function () {
    var test = {}; // FF44- legacy iterators case

    return IteratorPrototype$2[ITERATOR$6].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (!isCallable$8(IteratorPrototype$2[ITERATOR$6])) {
    redefine$8(IteratorPrototype$2, ITERATOR$6, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$7 = objectDefineProperty.f;
  var hasOwn$6 = hasOwnProperty_1;
  var wellKnownSymbol$g = wellKnownSymbol$p;
  var TO_STRING_TAG$1 = wellKnownSymbol$g('toStringTag');

  var setToStringTag$4 = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;

    if (target && !hasOwn$6(target, TO_STRING_TAG$1)) {
      defineProperty$7(target, TO_STRING_TAG$1, {
        configurable: true,
        value: TAG
      });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor$2 = createPropertyDescriptor$6;
  var setToStringTag$3 = setToStringTag$4;
  var Iterators$4 = iterators;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
      next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next)
    });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var global$u = global$Y;
  var isCallable$7 = isCallable$m;
  var String$1 = global$u.String;
  var TypeError$9 = global$u.TypeError;

  var aPossiblePrototype$1 = function (argument) {
    if (typeof argument == 'object' || isCallable$7(argument)) return argument;
    throw TypeError$9("Can't set " + String$1(argument) + ' as a prototype');
  };

  /* eslint-disable no-proto -- safe */
  var uncurryThis$n = functionUncurryThis;
  var anObject$6 = anObject$f;
  var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  // eslint-disable-next-line es/no-object-setprototypeof -- safe

  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;

    try {
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      setter = uncurryThis$n(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
      setter(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject$6(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$i = _export;
  var call$9 = functionCall;
  var FunctionName$1 = functionName;
  var isCallable$6 = isCallable$m;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var setPrototypeOf$4 = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$4;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$a;
  var redefine$7 = redefine$b.exports;
  var wellKnownSymbol$f = wellKnownSymbol$p;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;
  var PROPER_FUNCTION_NAME$2 = FunctionName$1.PROPER;
  var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$5 = wellKnownSymbol$f('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis = function () {
    return this;
  };

  var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

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
    var nativeIterator = IterablePrototype[ITERATOR$5] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));

      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$4) {
            setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype);
          } else if (!isCallable$6(CurrentIteratorPrototype[ITERATOR$5])) {
            redefine$7(CurrentIteratorPrototype, ITERATOR$5, returnThis);
          }
        } // Set @@toStringTag to native iterators


        setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


    if (PROPER_FUNCTION_NAME$2 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if (CONFIGURABLE_FUNCTION_NAME$1) {
        createNonEnumerableProperty$5(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;

        defaultIterator = function values() {
          return call$9(nativeIterator, this);
        };
      }
    } // export additional methods


    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine$7(IterablePrototype, KEY, methods[KEY]);
        }
      } else $$i({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    } // define iterator


    if (IterablePrototype[ITERATOR$5] !== defaultIterator) {
      redefine$7(IterablePrototype, ITERATOR$5, defaultIterator, {
        name: DEFAULT
      });
    }

    Iterators$3[NAME] = defaultIterator;
    return methods;
  };

  var toIndexedObject$5 = toIndexedObject$a;
  var addToUnscopables$1 = addToUnscopables$2;
  var Iterators$2 = iterators;
  var InternalStateModule$3 = internalState;
  var defineProperty$6 = objectDefineProperty.f;
  var defineIterator = defineIterator$1;
  var DESCRIPTORS$9 = descriptors;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$4 = InternalStateModule$3.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
  // https://tc39.es/ecma262/#sec-array.prototype.entries
  // `Array.prototype.keys` method
  // https://tc39.es/ecma262/#sec-array.prototype.keys
  // `Array.prototype.values` method
  // https://tc39.es/ecma262/#sec-array.prototype.values
  // `Array.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  // `CreateArrayIterator` internal method
  // https://tc39.es/ecma262/#sec-createarrayiterator

  var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
    setInternalState$3(this, {
      type: ARRAY_ITERATOR,
      target: toIndexedObject$5(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$4(this);
    var target = state.target;
    var kind = state.kind;
    var index = state.index++;

    if (!target || index >= target.length) {
      state.target = undefined;
      return {
        value: undefined,
        done: true
      };
    }

    if (kind == 'keys') return {
      value: index,
      done: false
    };
    if (kind == 'values') return {
      value: target[index],
      done: false
    };
    return {
      value: [index, target[index]],
      done: false
    };
  }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
  // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  // https://tc39.es/ecma262/#sec-createmappedargumentsobject

  var values = Iterators$2.Arguments = Iterators$2.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  addToUnscopables$1('keys');
  addToUnscopables$1('values');
  addToUnscopables$1('entries'); // V8 ~ Chrome 45- bug

  if (DESCRIPTORS$9 && values.name !== 'values') try {
    defineProperty$6(values, 'name', {
      value: 'values'
    });
  } catch (error) {
    /* empty */
  }

  var arrayBufferNative = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';

  var redefine$6 = redefine$b.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$6(target, key, src[key], options);

    return target;
  };

  var global$t = global$Y;
  var isPrototypeOf$6 = objectIsPrototypeOf;
  var TypeError$8 = global$t.TypeError;

  var anInstance$2 = function (it, Prototype) {
    if (isPrototypeOf$6(Prototype, it)) return it;
    throw TypeError$8('Incorrect invocation');
  };

  var global$s = global$Y;
  var toIntegerOrInfinity$4 = toIntegerOrInfinity$8;
  var toLength$7 = toLength$a;
  var RangeError$5 = global$s.RangeError; // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex

  var toIndex$2 = function (it) {
    if (it === undefined) return 0;
    var number = toIntegerOrInfinity$4(it);
    var length = toLength$7(number);
    if (number !== length) throw RangeError$5('Wrong length or index');
    return length;
  };

  var global$r = global$Y;
  var Array$5 = global$r.Array;
  var abs = Math.abs;
  var pow = Math.pow;
  var floor$4 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = Array$5(bytes);
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
    var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
    var index = 0;
    var exponent, mantissa, c;
    number = abs(number); // eslint-disable-next-line no-self-compare -- NaN check

    if (number != number || number === Infinity) {
      // eslint-disable-next-line no-self-compare -- NaN check
      mantissa = number != number ? 1 : 0;
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
        mantissa = (number * c - 1) * pow(2, mantissaLength);
        exponent = exponent + eBias;
      } else {
        mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
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

    buffer[--index] |= sign * 128;
    return buffer;
  };

  var unpack = function (buffer, mantissaLength) {
    var bytes = buffer.length;
    var exponentLength = bytes * 8 - mantissaLength - 1;
    var eMax = (1 << exponentLength) - 1;
    var eBias = eMax >> 1;
    var nBits = exponentLength - 7;
    var index = bytes - 1;
    var sign = buffer[index--];
    var exponent = sign & 127;
    var mantissa;
    sign >>= 7;

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
      return mantissa ? NaN : sign ? -Infinity : Infinity;
    } else {
      mantissa = mantissa + pow(2, mantissaLength);
      exponent = exponent - eBias;
    }

    return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
  };

  var ieee754 = {
    pack: pack,
    unpack: unpack
  };

  var toObject$8 = toObject$b;
  var toAbsoluteIndex$4 = toAbsoluteIndex$7;
  var lengthOfArrayLike$9 = lengthOfArrayLike$c; // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill

  var arrayFill$1 = function fill(value
  /* , start = 0, end = @length */
  ) {
    var O = toObject$8(this);
    var length = lengthOfArrayLike$9(O);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$4(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$4(end, length);

    while (endPos > index) O[index++] = value;

    return O;
  };

  var global$q = global$Y;
  var uncurryThis$m = functionUncurryThis;
  var DESCRIPTORS$8 = descriptors;
  var NATIVE_ARRAY_BUFFER$2 = arrayBufferNative;
  var FunctionName = functionName;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$a;
  var redefineAll = redefineAll$1;
  var fails$i = fails$y;
  var anInstance$1 = anInstance$2;
  var toIntegerOrInfinity$3 = toIntegerOrInfinity$8;
  var toLength$6 = toLength$a;
  var toIndex$1 = toIndex$2;
  var IEEE754 = ieee754;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var setPrototypeOf$3 = objectSetPrototypeOf;
  var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
  var defineProperty$5 = objectDefineProperty.f;
  var arrayFill = arrayFill$1;
  var arraySlice$6 = arraySliceSimple;
  var setToStringTag$1 = setToStringTag$4;
  var InternalStateModule$2 = internalState;
  var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  var getInternalState$3 = InternalStateModule$2.get;
  var setInternalState$2 = InternalStateModule$2.set;
  var ARRAY_BUFFER$1 = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE$1 = 'prototype';
  var WRONG_LENGTH$1 = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var NativeArrayBuffer$1 = global$q[ARRAY_BUFFER$1];
  var $ArrayBuffer = NativeArrayBuffer$1;
  var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE$1];
  var $DataView = global$q[DATA_VIEW];
  var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE$1];
  var ObjectPrototype$2 = Object.prototype;
  var Array$4 = global$q.Array;
  var RangeError$4 = global$q.RangeError;
  var fill = uncurryThis$m(arrayFill);
  var reverse = uncurryThis$m([].reverse);
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

  var addGetter$1 = function (Constructor, key) {
    defineProperty$5(Constructor[PROTOTYPE$1], key, {
      get: function () {
        return getInternalState$3(this)[key];
      }
    });
  };

  var get = function (view, count, index, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$3(view);
    if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
    var bytes = getInternalState$3(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = arraySlice$6(bytes, start, start + count);
    return isLittleEndian ? pack : reverse(pack);
  };

  var set = function (view, count, index, conversion, value, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$3(view);
    if (intIndex + count > store.byteLength) throw RangeError$4(WRONG_INDEX);
    var bytes = getInternalState$3(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = conversion(+value);

    for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
  };

  if (!NATIVE_ARRAY_BUFFER$2) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$1(this, ArrayBufferPrototype$1);
      var byteLength = toIndex$1(length);
      setInternalState$2(this, {
        bytes: fill(Array$4(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS$8) this.byteLength = byteLength;
    };

    ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE$1];

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance$1(this, DataViewPrototype$1);
      anInstance$1(buffer, ArrayBufferPrototype$1);
      var bufferLength = getInternalState$3(buffer).byteLength;
      var offset = toIntegerOrInfinity$3(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError$4('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength$6(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError$4(WRONG_LENGTH$1);
      setInternalState$2(this, {
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset
      });

      if (!DESCRIPTORS$8) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    DataViewPrototype$1 = $DataView[PROTOTYPE$1];

    if (DESCRIPTORS$8) {
      addGetter$1($ArrayBuffer, 'byteLength');
      addGetter$1($DataView, 'buffer');
      addGetter$1($DataView, 'byteLength');
      addGetter$1($DataView, 'byteOffset');
    }

    redefineAll(DataViewPrototype$1, {
      getInt8: function getInt8(byteOffset) {
        return get(this, 1, byteOffset)[0] << 24 >> 24;
      },
      getUint8: function getUint8(byteOffset) {
        return get(this, 1, byteOffset)[0];
      },
      getInt16: function getInt16(byteOffset
      /* , littleEndian */
      ) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
      },
      getUint16: function getUint16(byteOffset
      /* , littleEndian */
      ) {
        var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
        return bytes[1] << 8 | bytes[0];
      },
      getInt32: function getInt32(byteOffset
      /* , littleEndian */
      ) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
      },
      getUint32: function getUint32(byteOffset
      /* , littleEndian */
      ) {
        return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
      },
      getFloat32: function getFloat32(byteOffset
      /* , littleEndian */
      ) {
        return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
      },
      getFloat64: function getFloat64(byteOffset
      /* , littleEndian */
      ) {
        return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
      },
      setInt8: function setInt8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setUint8: function setUint8(byteOffset, value) {
        set(this, 1, byteOffset, packInt8, value);
      },
      setInt16: function setInt16(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint16: function setUint16(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setInt32: function setInt32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setUint32: function setUint32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat32: function setFloat32(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
      },
      setFloat64: function setFloat64(byteOffset, value
      /* , littleEndian */
      ) {
        set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
      }
    });
  } else {
    var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$1 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
    /* eslint-disable no-new -- required for testing */

    if (!fails$i(function () {
      NativeArrayBuffer$1(1);
    }) || !fails$i(function () {
      new NativeArrayBuffer$1(-1);
    }) || fails$i(function () {
      new NativeArrayBuffer$1();
      new NativeArrayBuffer$1(1.5);
      new NativeArrayBuffer$1(NaN);
      return INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
    })) {
      /* eslint-enable no-new -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance$1(this, ArrayBufferPrototype$1);
        return new NativeArrayBuffer$1(toIndex$1(length));
      };

      $ArrayBuffer[PROTOTYPE$1] = ArrayBufferPrototype$1;

      for (var keys$1 = getOwnPropertyNames$2(NativeArrayBuffer$1), j = 0, key; keys$1.length > j;) {
        if (!((key = keys$1[j++]) in $ArrayBuffer)) {
          createNonEnumerableProperty$4($ArrayBuffer, key, NativeArrayBuffer$1[key]);
        }
      }

      ArrayBufferPrototype$1.constructor = $ArrayBuffer;
    } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$4(NativeArrayBuffer$1, 'name', ARRAY_BUFFER$1);
    } // WebKit bug - the same parent prototype for typed arrays and data view


    if (setPrototypeOf$3 && getPrototypeOf$1(DataViewPrototype$1) !== ObjectPrototype$2) {
      setPrototypeOf$3(DataViewPrototype$1, ObjectPrototype$2);
    } // iOS Safari 7.x bug


    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = uncurryThis$m(DataViewPrototype$1.setInt8);
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll(DataViewPrototype$1, {
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

  var $$h = _export;
  var uncurryThis$l = functionUncurryThis;
  var fails$h = fails$y;
  var ArrayBufferModule$2 = arrayBuffer;
  var anObject$5 = anObject$f;
  var toAbsoluteIndex$3 = toAbsoluteIndex$7;
  var toLength$5 = toLength$a;
  var speciesConstructor$1 = speciesConstructor$3;
  var ArrayBuffer$4 = ArrayBufferModule$2.ArrayBuffer;
  var DataView$2 = ArrayBufferModule$2.DataView;
  var DataViewPrototype = DataView$2.prototype;
  var un$ArrayBufferSlice = uncurryThis$l(ArrayBuffer$4.prototype.slice);
  var getUint8 = uncurryThis$l(DataViewPrototype.getUint8);
  var setUint8 = uncurryThis$l(DataViewPrototype.setUint8);
  var INCORRECT_SLICE = fails$h(function () {
    return !new ArrayBuffer$4(2).slice(1, undefined).byteLength;
  }); // `ArrayBuffer.prototype.slice` method
  // https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice

  $$h({
    target: 'ArrayBuffer',
    proto: true,
    unsafe: true,
    forced: INCORRECT_SLICE
  }, {
    slice: function slice(start, end) {
      if (un$ArrayBufferSlice && end === undefined) {
        return un$ArrayBufferSlice(anObject$5(this), start); // FF fix
      }

      var length = anObject$5(this).byteLength;
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
  var classof$5 = classof$a; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$5(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$5 = redefine$b.exports;
  var toString$8 = objectToString; // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  if (!TO_STRING_TAG_SUPPORT) {
    redefine$5(Object.prototype, 'toString', toString$8, {
      unsafe: true
    });
  }

  var typedArrayConstructor = {exports: {}};

  var wellKnownSymbol$e = wellKnownSymbol$p;
  var ITERATOR$4 = wellKnownSymbol$e('iterator');
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

    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    }; // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing


    Array.from(iteratorWithReturn, function () {
      throw 2;
    });
  } catch (error) {
    /* empty */
  }

  var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;

    try {
      var object = {};

      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return {
              done: ITERATION_SUPPORT = true
            };
          }
        };
      };

      exec(object);
    } catch (error) {
      /* empty */
    }

    return ITERATION_SUPPORT;
  };

  var NATIVE_ARRAY_BUFFER$1 = arrayBufferNative;
  var DESCRIPTORS$7 = descriptors;
  var global$p = global$Y;
  var isCallable$5 = isCallable$m;
  var isObject$8 = isObject$f;
  var hasOwn$5 = hasOwnProperty_1;
  var classof$4 = classof$a;
  var tryToString$1 = tryToString$4;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$a;
  var redefine$4 = redefine$b.exports;
  var defineProperty$4 = objectDefineProperty.f;
  var isPrototypeOf$5 = objectIsPrototypeOf;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var wellKnownSymbol$d = wellKnownSymbol$p;
  var uid$1 = uid$4;
  var Int8Array$4 = global$p.Int8Array;
  var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
  var Uint8ClampedArray$1 = global$p.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
  var TypedArray$1 = Int8Array$4 && getPrototypeOf(Int8Array$4);
  var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf(Int8ArrayPrototype$1);
  var ObjectPrototype$1 = Object.prototype;
  var TypeError$7 = global$p.TypeError;
  var TO_STRING_TAG = wellKnownSymbol$d('toStringTag');
  var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG');
  var TYPED_ARRAY_CONSTRUCTOR$2 = uid$1('TYPED_ARRAY_CONSTRUCTOR'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

  var NATIVE_ARRAY_BUFFER_VIEWS$3 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$2 && classof$4(global$p.opera) !== 'Opera';
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
    if (!isObject$8(it)) return false;
    var klass = classof$4(it);
    return klass === 'DataView' || hasOwn$5(TypedArrayConstructorsList, klass) || hasOwn$5(BigIntArrayConstructorsList, klass);
  };

  var isTypedArray$1 = function (it) {
    if (!isObject$8(it)) return false;
    var klass = classof$4(it);
    return hasOwn$5(TypedArrayConstructorsList, klass) || hasOwn$5(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray$m = function (it) {
    if (isTypedArray$1(it)) return it;
    throw TypeError$7('Target is not a typed array');
  };

  var aTypedArrayConstructor$3 = function (C) {
    if (isCallable$5(C) && (!setPrototypeOf$2 || isPrototypeOf$5(TypedArray$1, C))) return C;
    throw TypeError$7(tryToString$1(C) + ' is not a typed array constructor');
  };

  var exportTypedArrayMethod$n = function (KEY, property, forced, options) {
    if (!DESCRIPTORS$7) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global$p[ARRAY];
      if (TypedArrayConstructor && hasOwn$5(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        // old WebKit bug - some methods are non-configurable
        try {
          TypedArrayConstructor.prototype[KEY] = property;
        } catch (error2) {
          /* empty */
        }
      }
    }

    if (!TypedArrayPrototype$2[KEY] || forced) {
      redefine$4(TypedArrayPrototype$2, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && Int8ArrayPrototype$1[KEY] || property, options);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS$7) return;

    if (setPrototypeOf$2) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global$p[ARRAY];
        if (TypedArrayConstructor && hasOwn$5(TypedArrayConstructor, KEY)) try {
          delete TypedArrayConstructor[KEY];
        } catch (error) {
          /* empty */
        }
      }

      if (!TypedArray$1[KEY] || forced) {
        // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
        try {
          return redefine$4(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && TypedArray$1[KEY] || property);
        } catch (error) {
          /* empty */
        }
      } else return;
    }

    for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global$p[ARRAY];

      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        redefine$4(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME in TypedArrayConstructorsList) {
    Constructor = global$p[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty$3(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);else NATIVE_ARRAY_BUFFER_VIEWS$3 = false;
  }

  for (NAME in BigIntArrayConstructorsList) {
    Constructor = global$p[NAME];
    Prototype = Constructor && Constructor.prototype;
    if (Prototype) createNonEnumerableProperty$3(Prototype, TYPED_ARRAY_CONSTRUCTOR$2, Constructor);
  } // WebKit bug - typed arrays constructors prototype is Object.prototype


  if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !isCallable$5(TypedArray$1) || TypedArray$1 === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray$1 = function TypedArray() {
      throw TypeError$7('Incorrect invocation');
    };

    if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME in TypedArrayConstructorsList) {
      if (global$p[NAME]) setPrototypeOf$2(global$p[NAME], TypedArray$1);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$1) {
    TypedArrayPrototype$2 = TypedArray$1.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME in TypedArrayConstructorsList) {
      if (global$p[NAME]) setPrototypeOf$2(global$p[NAME].prototype, TypedArrayPrototype$2);
    }
  } // WebKit bug - one more object in Uint8ClampedArray prototype chain


  if (NATIVE_ARRAY_BUFFER_VIEWS$3 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
    setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
  }

  if (DESCRIPTORS$7 && !hasOwn$5(TypedArrayPrototype$2, TO_STRING_TAG)) {
    TYPED_ARRAY_TAG_REQUIRED = true;
    defineProperty$4(TypedArrayPrototype$2, TO_STRING_TAG, {
      get: function () {
        return isObject$8(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
      }
    });

    for (NAME in TypedArrayConstructorsList) if (global$p[NAME]) {
      createNonEnumerableProperty$3(global$p[NAME], TYPED_ARRAY_TAG$1, NAME);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$3,
    TYPED_ARRAY_CONSTRUCTOR: TYPED_ARRAY_CONSTRUCTOR$2,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
    aTypedArray: aTypedArray$m,
    aTypedArrayConstructor: aTypedArrayConstructor$3,
    exportTypedArrayMethod: exportTypedArrayMethod$n,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    isView: isView,
    isTypedArray: isTypedArray$1,
    TypedArray: TypedArray$1,
    TypedArrayPrototype: TypedArrayPrototype$2
  };

  /* eslint-disable no-new -- required for testing */
  var global$o = global$Y;
  var fails$g = fails$y;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var NATIVE_ARRAY_BUFFER_VIEWS$2 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var ArrayBuffer$3 = global$o.ArrayBuffer;
  var Int8Array$3 = global$o.Int8Array;
  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$2 || !fails$g(function () {
    Int8Array$3(1);
  }) || !fails$g(function () {
    new Int8Array$3(-1);
  }) || !checkCorrectnessOfIteration(function (iterable) {
    new Int8Array$3();
    new Int8Array$3(null);
    new Int8Array$3(1.5);
    new Int8Array$3(iterable);
  }, true) || fails$g(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$3(new ArrayBuffer$3(2), 1, undefined).length !== 1;
  });

  var isObject$7 = isObject$f;
  var floor$3 = Math.floor; // `IsIntegralNumber` abstract operation
  // https://tc39.es/ecma262/#sec-isintegralnumber
  // eslint-disable-next-line es/no-number-isinteger -- safe

  var isIntegralNumber$1 = Number.isInteger || function isInteger(it) {
    return !isObject$7(it) && isFinite(it) && floor$3(it) === it;
  };

  var global$n = global$Y;
  var toIntegerOrInfinity$2 = toIntegerOrInfinity$8;
  var RangeError$3 = global$n.RangeError;

  var toPositiveInteger$1 = function (it) {
    var result = toIntegerOrInfinity$2(it);
    if (result < 0) throw RangeError$3("The argument can't be less than 0");
    return result;
  };

  var global$m = global$Y;
  var toPositiveInteger = toPositiveInteger$1;
  var RangeError$2 = global$m.RangeError;

  var toOffset$2 = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw RangeError$2('Wrong offset');
    return offset;
  };

  var uncurryThis$k = functionUncurryThis;
  var aCallable$3 = aCallable$5;
  var NATIVE_BIND = functionBindNative;
  var bind$2 = uncurryThis$k(uncurryThis$k.bind); // optional / simple context binding

  var functionBindContext = function (fn, that) {
    aCallable$3(fn);
    return that === undefined ? fn : NATIVE_BIND ? bind$2(fn, that) : function
      /* ...args */
    () {
      return fn.apply(that, arguments);
    };
  };

  var classof$3 = classof$a;
  var getMethod$2 = getMethod$5;
  var Iterators$1 = iterators;
  var wellKnownSymbol$c = wellKnownSymbol$p;
  var ITERATOR$3 = wellKnownSymbol$c('iterator');

  var getIteratorMethod$2 = function (it) {
    if (it != undefined) return getMethod$2(it, ITERATOR$3) || getMethod$2(it, '@@iterator') || Iterators$1[classof$3(it)];
  };

  var global$l = global$Y;
  var call$8 = functionCall;
  var aCallable$2 = aCallable$5;
  var anObject$4 = anObject$f;
  var tryToString = tryToString$4;
  var getIteratorMethod$1 = getIteratorMethod$2;
  var TypeError$6 = global$l.TypeError;

  var getIterator$1 = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$1(argument) : usingIterator;
    if (aCallable$2(iteratorMethod)) return anObject$4(call$8(iteratorMethod, argument));
    throw TypeError$6(tryToString(argument) + ' is not iterable');
  };

  var wellKnownSymbol$b = wellKnownSymbol$p;
  var Iterators = iterators;
  var ITERATOR$2 = wellKnownSymbol$b('iterator');
  var ArrayPrototype = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var bind$1 = functionBindContext;
  var call$7 = functionCall;
  var aConstructor = aConstructor$2;
  var toObject$7 = toObject$b;
  var lengthOfArrayLike$8 = lengthOfArrayLike$c;
  var getIterator = getIterator$1;
  var getIteratorMethod = getIteratorMethod$2;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;

  var typedArrayFrom$1 = function from(source
  /* , mapfn, thisArg */
  ) {
    var C = aConstructor(this);
    var O = toObject$7(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var i, length, result, step, iterator, next;

    if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      O = [];

      while (!(step = call$7(next, iterator)).done) {
        O.push(step.value);
      }
    }

    if (mapping && argumentsLength > 2) {
      mapfn = bind$1(mapfn, arguments[2]);
    }

    length = lengthOfArrayLike$8(O);
    result = new (aTypedArrayConstructor$2(C))(length);

    for (i = 0; length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }

    return result;
  };

  var global$k = global$Y;
  var isArray$3 = isArray$5;
  var isConstructor$1 = isConstructor$3;
  var isObject$6 = isObject$f;
  var wellKnownSymbol$a = wellKnownSymbol$p;
  var SPECIES$3 = wellKnownSymbol$a('species');
  var Array$3 = global$k.Array; // a part of `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesConstructor$1 = function (originalArray) {
    var C;

    if (isArray$3(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (isConstructor$1(C) && (C === Array$3 || isArray$3(C.prototype))) C = undefined;else if (isObject$6(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    }

    return C === undefined ? Array$3 : C;
  };

  var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function (originalArray, length) {
    return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  };

  var bind = functionBindContext;
  var uncurryThis$j = functionUncurryThis;
  var IndexedObject$1 = indexedObject;
  var toObject$6 = toObject$b;
  var lengthOfArrayLike$7 = lengthOfArrayLike$c;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var push$2 = uncurryThis$j([].push); // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation

  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_REJECT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$6($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind(callbackfn, that);
      var length = lengthOfArrayLike$7(self);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
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
              push$2(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push$2(target, value);
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
    forEach: createMethod$2(0),
    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    map: createMethod$2(1),
    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    filter: createMethod$2(2),
    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    some: createMethod$2(3),
    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    every: createMethod$2(4),
    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    find: createMethod$2(5),
    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$2(6),
    // `Array.prototype.filterReject` method
    // https://github.com/tc39/proposal-array-filtering
    filterReject: createMethod$2(7)
  };

  var getBuiltIn$1 = getBuiltIn$7;
  var definePropertyModule$2 = objectDefineProperty;
  var wellKnownSymbol$9 = wellKnownSymbol$p;
  var DESCRIPTORS$6 = descriptors;
  var SPECIES$2 = wellKnownSymbol$9('species');

  var setSpecies$3 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$2.f;

    if (DESCRIPTORS$6 && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var isCallable$4 = isCallable$m;
  var isObject$5 = isObject$f;
  var setPrototypeOf$1 = objectSetPrototypeOf; // makes subclassing work correct for wrapped built-ins

  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if ( // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$4(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$5(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };

  var $$g = _export;
  var global$j = global$Y;
  var call$6 = functionCall;
  var DESCRIPTORS$5 = descriptors;
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
  var ArrayBufferViewCore$o = arrayBufferViewCore;
  var ArrayBufferModule$1 = arrayBuffer;
  var anInstance = anInstance$2;
  var createPropertyDescriptor$1 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$a;
  var isIntegralNumber = isIntegralNumber$1;
  var toLength$4 = toLength$a;
  var toIndex = toIndex$2;
  var toOffset$1 = toOffset$2;
  var toPropertyKey$1 = toPropertyKey$5;
  var hasOwn$4 = hasOwnProperty_1;
  var classof$2 = classof$a;
  var isObject$4 = isObject$f;
  var isSymbol$1 = isSymbol$4;
  var create = objectCreate;
  var isPrototypeOf$4 = objectIsPrototypeOf;
  var setPrototypeOf = objectSetPrototypeOf;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var typedArrayFrom = typedArrayFrom$1;
  var forEach$2 = arrayIteration.forEach;
  var setSpecies$2 = setSpecies$3;
  var definePropertyModule$1 = objectDefineProperty;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var InternalStateModule$1 = internalState;
  var inheritIfRequired$1 = inheritIfRequired$2;
  var getInternalState$2 = InternalStateModule$1.get;
  var setInternalState$1 = InternalStateModule$1.set;
  var nativeDefineProperty$1 = definePropertyModule$1.f;
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var round = Math.round;
  var RangeError$1 = global$j.RangeError;
  var ArrayBuffer$2 = ArrayBufferModule$1.ArrayBuffer;
  var ArrayBufferPrototype = ArrayBuffer$2.prototype;
  var DataView$1 = ArrayBufferModule$1.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = ArrayBufferViewCore$o.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_CONSTRUCTOR$1 = ArrayBufferViewCore$o.TYPED_ARRAY_CONSTRUCTOR;
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
    nativeDefineProperty$1(it, key, {
      get: function () {
        return getInternalState$2(this)[key];
      }
    });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return isPrototypeOf$4(ArrayBufferPrototype, it) || (klass = classof$2(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target) && !isSymbol$1(key) && key in target && isIntegralNumber(+key) && key >= 0;
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    key = toPropertyKey$1(key);
    return isTypedArrayIndex(target, key) ? createPropertyDescriptor$1(2, target[key]) : nativeGetOwnPropertyDescriptor$1(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    key = toPropertyKey$1(key);

    if (isTypedArrayIndex(target, key) && isObject$4(descriptor) && hasOwn$4(descriptor, 'value') && !hasOwn$4(descriptor, 'get') && !hasOwn$4(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable && (!hasOwn$4(descriptor, 'writable') || descriptor.writable) && (!hasOwn$4(descriptor, 'enumerable') || descriptor.enumerable)) {
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

    $$g({
      target: 'Object',
      stat: true,
      forced: !NATIVE_ARRAY_BUFFER_VIEWS$1
    }, {
      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
      defineProperty: wrappedDefineProperty
    });

    typedArrayConstructor.exports = function (TYPE, wrapper, CLAMPED) {
      var BYTES = TYPE.match(/\d+$/)[0] / 8;
      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
      var GETTER = 'get' + TYPE;
      var SETTER = 'set' + TYPE;
      var NativeTypedArrayConstructor = global$j[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState$2(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState$2(that);
        if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
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

          if (!isObject$4(data)) {
            length = toIndex(data);
            byteLength = length * BYTES;
            buffer = new ArrayBuffer$2(byteLength);
          } else if (isArrayBuffer(data)) {
            buffer = data;
            byteOffset = toOffset$1(offset, BYTES);
            var $len = data.byteLength;

            if ($length === undefined) {
              if ($len % BYTES) throw RangeError$1(WRONG_LENGTH);
              byteLength = $len - byteOffset;
              if (byteLength < 0) throw RangeError$1(WRONG_LENGTH);
            } else {
              byteLength = toLength$4($length) * BYTES;
              if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
            }

            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return fromList(TypedArrayConstructor, data);
          } else {
            return call$6(typedArrayFrom, TypedArrayConstructor, data);
          }

          setInternalState$1(that, {
            buffer: buffer,
            byteOffset: byteOffset,
            byteLength: byteLength,
            length: length,
            view: new DataView$1(buffer)
          });

          while (index < length) addElement(that, index++);
        });
        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype$1);
      } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance(dummy, TypedArrayConstructorPrototype);
          return inheritIfRequired$1(function () {
            if (!isObject$4(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
            return call$6(typedArrayFrom, TypedArrayConstructor, data);
          }(), dummy, TypedArrayConstructor);
        });
        if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
        forEach$2(getOwnPropertyNames$1(NativeTypedArrayConstructor), function (key) {
          if (!(key in TypedArrayConstructor)) {
            createNonEnumerableProperty$2(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
          }
        });
        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
      }

      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
        createNonEnumerableProperty$2(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
      }

      createNonEnumerableProperty$2(TypedArrayConstructorPrototype, TYPED_ARRAY_CONSTRUCTOR$1, TypedArrayConstructor);

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty$2(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
      $$g({
        global: true,
        forced: TypedArrayConstructor != NativeTypedArrayConstructor,
        sham: !NATIVE_ARRAY_BUFFER_VIEWS$1
      }, exported);

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
        createNonEnumerableProperty$2(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
      }

      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
        createNonEnumerableProperty$2(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
      }

      setSpecies$2(CONSTRUCTOR_NAME);
    };
  } else typedArrayConstructor.exports = function () {
    /* empty */
  };

  var createTypedArrayConstructor$2 = typedArrayConstructor.exports; // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects

  createTypedArrayConstructor$2('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var toObject$5 = toObject$b;
  var toAbsoluteIndex$2 = toAbsoluteIndex$7;
  var lengthOfArrayLike$6 = lengthOfArrayLike$c;
  var min$3 = Math.min; // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es/no-array-prototype-copywithin -- safe

  var arrayCopyWithin = [].copyWithin || function copyWithin(target
  /* = 0 */
  , start
  /* = 0, end = @length */
  ) {
    var O = toObject$5(this);
    var len = lengthOfArrayLike$6(O);
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
      if (from in O) O[to] = O[from];else delete O[to];
      to += inc;
      from += inc;
    }

    return O;
  };

  var uncurryThis$i = functionUncurryThis;
  var ArrayBufferViewCore$n = arrayBufferViewCore;
  var $ArrayCopyWithin = arrayCopyWithin;
  var u$ArrayCopyWithin = uncurryThis$i($ArrayCopyWithin);
  var aTypedArray$l = ArrayBufferViewCore$n.aTypedArray;
  var exportTypedArrayMethod$m = ArrayBufferViewCore$n.exportTypedArrayMethod; // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin

  exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start
  /* , end */
  ) {
    return u$ArrayCopyWithin(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var ArrayBufferViewCore$m = arrayBufferViewCore;
  var $every$1 = arrayIteration.every;
  var aTypedArray$k = ArrayBufferViewCore$m.aTypedArray;
  var exportTypedArrayMethod$l = ArrayBufferViewCore$m.exportTypedArrayMethod; // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every

  exportTypedArrayMethod$l('every', function every(callbackfn
  /* , thisArg */
  ) {
    return $every$1(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$l = arrayBufferViewCore;
  var call$5 = functionCall;
  var $fill = arrayFill$1;
  var aTypedArray$j = ArrayBufferViewCore$l.aTypedArray;
  var exportTypedArrayMethod$k = ArrayBufferViewCore$l.exportTypedArrayMethod; // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill

  exportTypedArrayMethod$k('fill', function fill(value
  /* , start, end */
  ) {
    var length = arguments.length;
    return call$5($fill, aTypedArray$j(this), value, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined);
  });

  var lengthOfArrayLike$5 = lengthOfArrayLike$c;

  var arrayFromConstructorAndList$1 = function (Constructor, list) {
    var index = 0;
    var length = lengthOfArrayLike$5(list);
    var result = new Constructor(length);

    while (length > index) result[index] = list[index++];

    return result;
  };

  var ArrayBufferViewCore$k = arrayBufferViewCore;
  var speciesConstructor = speciesConstructor$3;
  var TYPED_ARRAY_CONSTRUCTOR = ArrayBufferViewCore$k.TYPED_ARRAY_CONSTRUCTOR;
  var aTypedArrayConstructor = ArrayBufferViewCore$k.aTypedArrayConstructor; // a part of `TypedArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#typedarray-species-create

  var typedArraySpeciesConstructor$4 = function (originalArray) {
    return aTypedArrayConstructor(speciesConstructor(originalArray, originalArray[TYPED_ARRAY_CONSTRUCTOR]));
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
  var exportTypedArrayMethod$j = ArrayBufferViewCore$j.exportTypedArrayMethod; // `%TypedArray%.prototype.filter` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter

  exportTypedArrayMethod$j('filter', function filter(callbackfn
  /* , thisArg */
  ) {
    var list = $filter(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return fromSpeciesAndList(this, list);
  });

  var ArrayBufferViewCore$i = arrayBufferViewCore;
  var $find = arrayIteration.find;
  var aTypedArray$h = ArrayBufferViewCore$i.aTypedArray;
  var exportTypedArrayMethod$i = ArrayBufferViewCore$i.exportTypedArrayMethod; // `%TypedArray%.prototype.find` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find

  exportTypedArrayMethod$i('find', function find(predicate
  /* , thisArg */
  ) {
    return $find(aTypedArray$h(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$h = arrayBufferViewCore;
  var $findIndex = arrayIteration.findIndex;
  var aTypedArray$g = ArrayBufferViewCore$h.aTypedArray;
  var exportTypedArrayMethod$h = ArrayBufferViewCore$h.exportTypedArrayMethod; // `%TypedArray%.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex

  exportTypedArrayMethod$h('findIndex', function findIndex(predicate
  /* , thisArg */
  ) {
    return $findIndex(aTypedArray$g(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$g = arrayBufferViewCore;
  var $forEach$2 = arrayIteration.forEach;
  var aTypedArray$f = ArrayBufferViewCore$g.aTypedArray;
  var exportTypedArrayMethod$g = ArrayBufferViewCore$g.exportTypedArrayMethod; // `%TypedArray%.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach

  exportTypedArrayMethod$g('forEach', function forEach(callbackfn
  /* , thisArg */
  ) {
    $forEach$2(aTypedArray$f(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$f = arrayBufferViewCore;
  var $includes$1 = arrayIncludes.includes;
  var aTypedArray$e = ArrayBufferViewCore$f.aTypedArray;
  var exportTypedArrayMethod$f = ArrayBufferViewCore$f.exportTypedArrayMethod; // `%TypedArray%.prototype.includes` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes

  exportTypedArrayMethod$f('includes', function includes(searchElement
  /* , fromIndex */
  ) {
    return $includes$1(aTypedArray$e(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$e = arrayBufferViewCore;
  var $indexOf = arrayIncludes.indexOf;
  var aTypedArray$d = ArrayBufferViewCore$e.aTypedArray;
  var exportTypedArrayMethod$e = ArrayBufferViewCore$e.exportTypedArrayMethod; // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof

  exportTypedArrayMethod$e('indexOf', function indexOf(searchElement
  /* , fromIndex */
  ) {
    return $indexOf(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var global$i = global$Y;
  var fails$f = fails$y;
  var uncurryThis$h = functionUncurryThis;
  var ArrayBufferViewCore$d = arrayBufferViewCore;
  var ArrayIterators = es_array_iterator;
  var wellKnownSymbol$8 = wellKnownSymbol$p;
  var ITERATOR$1 = wellKnownSymbol$8('iterator');
  var Uint8Array$2 = global$i.Uint8Array;
  var arrayValues = uncurryThis$h(ArrayIterators.values);
  var arrayKeys = uncurryThis$h(ArrayIterators.keys);
  var arrayEntries = uncurryThis$h(ArrayIterators.entries);
  var aTypedArray$c = ArrayBufferViewCore$d.aTypedArray;
  var exportTypedArrayMethod$d = ArrayBufferViewCore$d.exportTypedArrayMethod;
  var TypedArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype;
  var GENERIC = !fails$f(function () {
    TypedArrayPrototype[ITERATOR$1].call([1]);
  });
  var ITERATOR_IS_VALUES = !!TypedArrayPrototype && TypedArrayPrototype.values && TypedArrayPrototype[ITERATOR$1] === TypedArrayPrototype.values && TypedArrayPrototype.values.name === 'values';

  var typedArrayValues = function values() {
    return arrayValues(aTypedArray$c(this));
  }; // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries


  exportTypedArrayMethod$d('entries', function entries() {
    return arrayEntries(aTypedArray$c(this));
  }, GENERIC); // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys

  exportTypedArrayMethod$d('keys', function keys() {
    return arrayKeys(aTypedArray$c(this));
  }, GENERIC); // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values

  exportTypedArrayMethod$d('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, {
    name: 'values'
  }); // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator

  exportTypedArrayMethod$d(ITERATOR$1, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, {
    name: 'values'
  });

  var ArrayBufferViewCore$c = arrayBufferViewCore;
  var uncurryThis$g = functionUncurryThis;
  var aTypedArray$b = ArrayBufferViewCore$c.aTypedArray;
  var exportTypedArrayMethod$c = ArrayBufferViewCore$c.exportTypedArrayMethod;
  var $join = uncurryThis$g([].join); // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join

  exportTypedArrayMethod$c('join', function join(separator) {
    return $join(aTypedArray$b(this), separator);
  });

  var fails$e = fails$y;

  var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$e(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () {
        return 1;
      }, 1);
    });
  };

  /* eslint-disable es/no-array-prototype-lastindexof -- safe */


  var apply$4 = functionApply;
  var toIndexedObject$4 = toIndexedObject$a;
  var toIntegerOrInfinity$1 = toIntegerOrInfinity$8;
  var lengthOfArrayLike$4 = lengthOfArrayLike$c;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;
  var min$2 = Math.min;
  var $lastIndexOf$1 = [].lastIndexOf;
  var NEGATIVE_ZERO$1 = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$3 = arrayMethodIsStrict$3('lastIndexOf');
  var FORCED$5 = NEGATIVE_ZERO$1 || !STRICT_METHOD$3; // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof

  var arrayLastIndexOf = FORCED$5 ? function lastIndexOf(searchElement
  /* , fromIndex = @[*-1] */
  ) {
    // convert -0 to +0
    if (NEGATIVE_ZERO$1) return apply$4($lastIndexOf$1, this, arguments) || 0;
    var O = toIndexedObject$4(this);
    var length = lengthOfArrayLike$4(O);
    var index = length - 1;
    if (arguments.length > 1) index = min$2(index, toIntegerOrInfinity$1(arguments[1]));
    if (index < 0) index = length + index;

    for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;

    return -1;
  } : $lastIndexOf$1;

  var ArrayBufferViewCore$b = arrayBufferViewCore;
  var apply$3 = functionApply;
  var $lastIndexOf = arrayLastIndexOf;
  var aTypedArray$a = ArrayBufferViewCore$b.aTypedArray;
  var exportTypedArrayMethod$b = ArrayBufferViewCore$b.exportTypedArrayMethod; // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof

  exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement
  /* , fromIndex */
  ) {
    var length = arguments.length;
    return apply$3($lastIndexOf, aTypedArray$a(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
  });

  var ArrayBufferViewCore$a = arrayBufferViewCore;
  var $map = arrayIteration.map;
  var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;
  var aTypedArray$9 = ArrayBufferViewCore$a.aTypedArray;
  var exportTypedArrayMethod$a = ArrayBufferViewCore$a.exportTypedArrayMethod; // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map

  exportTypedArrayMethod$a('map', function map(mapfn
  /* , thisArg */
  ) {
    return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (typedArraySpeciesConstructor$2(O))(length);
    });
  });

  var global$h = global$Y;
  var aCallable$1 = aCallable$5;
  var toObject$4 = toObject$b;
  var IndexedObject = indexedObject;
  var lengthOfArrayLike$3 = lengthOfArrayLike$c;
  var TypeError$5 = global$h.TypeError; // `Array.prototype.{ reduce, reduceRight }` methods implementation

  var createMethod$1 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aCallable$1(callbackfn);
      var O = toObject$4(that);
      var self = IndexedObject(O);
      var length = lengthOfArrayLike$3(O);
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
          throw TypeError$5('Reduce of empty array with no initial value');
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
    left: createMethod$1(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$1(true)
  };

  var ArrayBufferViewCore$9 = arrayBufferViewCore;
  var $reduce = arrayReduce.left;
  var aTypedArray$8 = ArrayBufferViewCore$9.aTypedArray;
  var exportTypedArrayMethod$9 = ArrayBufferViewCore$9.exportTypedArrayMethod; // `%TypedArray%.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce

  exportTypedArrayMethod$9('reduce', function reduce(callbackfn
  /* , initialValue */
  ) {
    var length = arguments.length;
    return $reduce(aTypedArray$8(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$8 = arrayBufferViewCore;
  var $reduceRight = arrayReduce.right;
  var aTypedArray$7 = ArrayBufferViewCore$8.aTypedArray;
  var exportTypedArrayMethod$8 = ArrayBufferViewCore$8.exportTypedArrayMethod; // `%TypedArray%.prototype.reduceRicht` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright

  exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn
  /* , initialValue */
  ) {
    var length = arguments.length;
    return $reduceRight(aTypedArray$7(this), callbackfn, length, length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$7 = arrayBufferViewCore;
  var aTypedArray$6 = ArrayBufferViewCore$7.aTypedArray;
  var exportTypedArrayMethod$7 = ArrayBufferViewCore$7.exportTypedArrayMethod;
  var floor$2 = Math.floor; // `%TypedArray%.prototype.reverse` method
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

  var global$g = global$Y;
  var call$4 = functionCall;
  var ArrayBufferViewCore$6 = arrayBufferViewCore;
  var lengthOfArrayLike$2 = lengthOfArrayLike$c;
  var toOffset = toOffset$2;
  var toIndexedObject$3 = toObject$b;
  var fails$d = fails$y;
  var RangeError = global$g.RangeError;
  var Int8Array$2 = global$g.Int8Array;
  var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
  var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
  var aTypedArray$5 = ArrayBufferViewCore$6.aTypedArray;
  var exportTypedArrayMethod$6 = ArrayBufferViewCore$6.exportTypedArrayMethod;
  var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails$d(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    var array = new Uint8ClampedArray(2);
    call$4($set, array, {
      length: 1,
      0: 3
    }, 1);
    return array[1] !== 3;
  }); // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other

  var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$6.NATIVE_ARRAY_BUFFER_VIEWS && fails$d(function () {
    var array = new Int8Array$2(2);
    array.set(1);
    array.set('2', 1);
    return array[0] !== 0 || array[1] !== 2;
  }); // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set

  exportTypedArrayMethod$6('set', function set(arrayLike
  /* , offset */
  ) {
    aTypedArray$5(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var src = toIndexedObject$3(arrayLike);
    if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call$4($set, this, src, offset);
    var length = this.length;
    var len = lengthOfArrayLike$2(src);
    var index = 0;
    if (len + offset > length) throw RangeError('Wrong length');

    while (index < len) this[offset + index] = src[index++];
  }, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);

  var uncurryThis$f = functionUncurryThis;
  var arraySlice$5 = uncurryThis$f([].slice);

  var ArrayBufferViewCore$5 = arrayBufferViewCore;
  var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
  var fails$c = fails$y;
  var arraySlice$4 = arraySlice$5;
  var aTypedArray$4 = ArrayBufferViewCore$5.aTypedArray;
  var exportTypedArrayMethod$5 = ArrayBufferViewCore$5.exportTypedArrayMethod;
  var FORCED$4 = fails$c(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  }); // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice

  exportTypedArrayMethod$5('slice', function slice(start, end) {
    var list = arraySlice$4(aTypedArray$4(this), start, end);
    var C = typedArraySpeciesConstructor$1(this);
    var index = 0;
    var length = list.length;
    var result = new C(length);

    while (length > index) result[index] = list[index++];

    return result;
  }, FORCED$4);

  var ArrayBufferViewCore$4 = arrayBufferViewCore;
  var $some = arrayIteration.some;
  var aTypedArray$3 = ArrayBufferViewCore$4.aTypedArray;
  var exportTypedArrayMethod$4 = ArrayBufferViewCore$4.exportTypedArrayMethod; // `%TypedArray%.prototype.some` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some

  exportTypedArrayMethod$4('some', function some(callbackfn
  /* , thisArg */
  ) {
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

  var global$f = global$Y;
  var uncurryThis$e = functionUncurryThis;
  var fails$b = fails$y;
  var aCallable = aCallable$5;
  var internalSort = arraySort;
  var ArrayBufferViewCore$3 = arrayBufferViewCore;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;
  var Array$2 = global$f.Array;
  var aTypedArray$2 = ArrayBufferViewCore$3.aTypedArray;
  var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;
  var Uint16Array$1 = global$f.Uint16Array;
  var un$Sort = Uint16Array$1 && uncurryThis$e(Uint16Array$1.prototype.sort); // WebKit

  var ACCEPT_INCORRECT_ARGUMENTS = !!un$Sort && !(fails$b(function () {
    un$Sort(new Uint16Array$1(2), null);
  }) && fails$b(function () {
    un$Sort(new Uint16Array$1(2), {});
  }));
  var STABLE_SORT = !!un$Sort && !fails$b(function () {
    // feature detection can be too slow, so check engines versions
    if (V8) return V8 < 74;
    if (FF) return FF < 67;
    if (IE_OR_EDGE) return true;
    if (WEBKIT) return WEBKIT < 602;
    var array = new Uint16Array$1(516);
    var expected = Array$2(516);
    var index, mod;

    for (index = 0; index < 516; index++) {
      mod = index % 4;
      array[index] = 515 - index;
      expected[index] = index - 2 * mod + 3;
    }

    un$Sort(array, function (a, b) {
      return (a / 4 | 0) - (b / 4 | 0);
    });

    for (index = 0; index < 516; index++) {
      if (array[index] !== expected[index]) return true;
    }
  });

  var getSortCompare = function (comparefn) {
    return function (x, y) {
      if (comparefn !== undefined) return +comparefn(x, y) || 0; // eslint-disable-next-line no-self-compare -- NaN check

      if (y !== y) return -1; // eslint-disable-next-line no-self-compare -- NaN check

      if (x !== x) return 1;
      if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
      return x > y;
    };
  }; // `%TypedArray%.prototype.sort` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort


  exportTypedArrayMethod$3('sort', function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);
    if (STABLE_SORT) return un$Sort(this, comparefn);
    return internalSort(aTypedArray$2(this), getSortCompare(comparefn));
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var ArrayBufferViewCore$2 = arrayBufferViewCore;
  var toLength$3 = toLength$a;
  var toAbsoluteIndex$1 = toAbsoluteIndex$7;
  var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;
  var aTypedArray$1 = ArrayBufferViewCore$2.aTypedArray;
  var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod; // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray

  exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
    var O = aTypedArray$1(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex$1(begin, length);
    var C = typedArraySpeciesConstructor(O);
    return new C(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength$3((end === undefined ? length : toAbsoluteIndex$1(end, length)) - beginIndex));
  });

  var global$e = global$Y;
  var apply$2 = functionApply;
  var ArrayBufferViewCore$1 = arrayBufferViewCore;
  var fails$a = fails$y;
  var arraySlice$2 = arraySlice$5;
  var Int8Array$1 = global$e.Int8Array;
  var aTypedArray = ArrayBufferViewCore$1.aTypedArray;
  var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString; // iOS Safari 6.x fails here

  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$a(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });
  var FORCED$3 = fails$a(function () {
    return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails$a(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  }); // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring

  exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
    return apply$2($toLocaleString, TO_LOCALE_STRING_BUG ? arraySlice$2(aTypedArray(this)) : aTypedArray(this), arraySlice$2(arguments));
  }, FORCED$3);

  var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
  var fails$9 = fails$y;
  var global$d = global$Y;
  var uncurryThis$d = functionUncurryThis;
  var Uint8Array$1 = global$d.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var join = uncurryThis$d([].join);

  if (fails$9(function () {
    arrayToString.call({});
  })) {
    arrayToString = function toString() {
      return join(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString; // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring

  exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var fails$8 = fails$y;
  var wellKnownSymbol$7 = wellKnownSymbol$p;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$1 = wellKnownSymbol$7('species');

  var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$8(function () {
      var array = [];
      var constructor = array.constructor = {};

      constructor[SPECIES$1] = function () {
        return {
          foo: 1
        };
      };

      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var $$f = _export;
  var global$c = global$Y;
  var isArray$2 = isArray$5;
  var isConstructor = isConstructor$3;
  var isObject$3 = isObject$f;
  var toAbsoluteIndex = toAbsoluteIndex$7;
  var lengthOfArrayLike$1 = lengthOfArrayLike$c;
  var toIndexedObject$2 = toIndexedObject$a;
  var createProperty$1 = createProperty$3;
  var wellKnownSymbol$6 = wellKnownSymbol$p;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
  var un$Slice = arraySlice$5;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');
  var SPECIES = wellKnownSymbol$6('species');
  var Array$1 = global$c.Array;
  var max$1 = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects

  $$f({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$2(this);
      var length = lengthOfArrayLike$1(O);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray$2(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (isConstructor(Constructor) && (Constructor === Array$1 || isArray$2(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$3(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array$1 || Constructor === undefined) {
          return un$Slice(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array$1 : Constructor)(max$1(fin - k, 0));

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);

      result.length = n;
      return result;
    }
  });

  var $$e = _export;
  var ArrayBufferViewCore = arrayBufferViewCore;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS; // `ArrayBuffer.isView` method
  // https://tc39.es/ecma262/#sec-arraybuffer.isview

  $$e({
    target: 'ArrayBuffer',
    stat: true,
    forced: !NATIVE_ARRAY_BUFFER_VIEWS
  }, {
    isView: ArrayBufferViewCore.isView
  });

  var $$d = _export;
  var global$b = global$Y;
  var arrayBufferModule = arrayBuffer;
  var setSpecies$1 = setSpecies$3;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
  var NativeArrayBuffer = global$b[ARRAY_BUFFER]; // `ArrayBuffer` constructor
  // https://tc39.es/ecma262/#sec-arraybuffer-constructor

  $$d({
    global: true,
    forced: NativeArrayBuffer !== ArrayBuffer$1
  }, {
    ArrayBuffer: ArrayBuffer$1
  });
  setSpecies$1(ARRAY_BUFFER);

  var $$c = _export;
  var global$a = global$Y;
  var fails$7 = fails$y;
  var isArray$1 = isArray$5;
  var isObject$2 = isObject$f;
  var toObject$3 = toObject$b;
  var lengthOfArrayLike = lengthOfArrayLike$c;
  var createProperty = createProperty$3;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
  var wellKnownSymbol$5 = wellKnownSymbol$p;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
  var TypeError$4 = global$a.TypeError; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$7(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });
  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject$2(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray$1(O);
  };

  var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
  // https://tc39.es/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species

  $$c({
    target: 'Array',
    proto: true,
    forced: FORCED$2
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    concat: function concat(arg) {
      var O = toObject$3(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;

      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];

        if (isConcatSpreadable(E)) {
          len = lengthOfArrayLike(E);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError$4(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError$4(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var global$9 = global$Y;
  var isRegExp$1 = isRegexp;
  var TypeError$3 = global$9.TypeError;

  var notARegexp = function (it) {
    if (isRegExp$1(it)) {
      throw TypeError$3("The method doesn't accept regular expressions");
    }

    return it;
  };

  var wellKnownSymbol$4 = wellKnownSymbol$p;
  var MATCH$1 = wellKnownSymbol$4('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;

    try {
      '/./'[METHOD_NAME](regexp);
    } catch (error1) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (error2) {
        /* empty */
      }
    }

    return false;
  };

  var $$b = _export;
  var uncurryThis$c = functionUncurryThis;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength$2 = toLength$a;
  var toString$7 = toString$c;
  var notARegExp$1 = notARegexp;
  var requireObjectCoercible$4 = requireObjectCoercible$9;
  var correctIsRegExpLogic$1 = correctIsRegexpLogic;

  var un$EndsWith = uncurryThis$c(''.endsWith);
  var slice = uncurryThis$c(''.slice);
  var min$1 = Math.min;
  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('endsWith'); // https://github.com/zloirock/core-js/pull/702

  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
  }(); // `String.prototype.endsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.endswith

  $$b({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
  }, {
    endsWith: function endsWith(searchString
    /* , endPosition = @length */
    ) {
      var that = toString$7(requireObjectCoercible$4(this));
      notARegExp$1(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = that.length;
      var end = endPosition === undefined ? len : min$1(toLength$2(endPosition), len);
      var search = toString$7(searchString);
      return un$EndsWith ? un$EndsWith(that, search, end) : slice(that, end - search.length, end) === search;
    }
  });

  var $$a = _export;
  var ArrayBufferModule = arrayBuffer;
  var NATIVE_ARRAY_BUFFER = arrayBufferNative; // `DataView` constructor
  // https://tc39.es/ecma262/#sec-dataview-constructor

  $$a({
    global: true,
    forced: !NATIVE_ARRAY_BUFFER
  }, {
    DataView: ArrayBufferModule.DataView
  });

  var createTypedArrayConstructor$1 = typedArrayConstructor.exports; // `Uint16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects

  createTypedArrayConstructor$1('Uint16', function (init) {
    return function Uint16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var $forEach$1 = arrayIteration.forEach;
  var arrayMethodIsStrict$2 = arrayMethodIsStrict$4;
  var STRICT_METHOD$2 = arrayMethodIsStrict$2('forEach'); // `Array.prototype.forEach` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.foreach

  var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn
  /* , thisArg */
  ) {
    return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined); // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  } : [].forEach;

  var $$9 = _export;
  var forEach$1 = arrayForEach; // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe

  $$9({
    target: 'Array',
    proto: true,
    forced: [].forEach != forEach$1
  }, {
    forEach: forEach$1
  });

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

  var documentCreateElement = documentCreateElement$2;
  var classList = documentCreateElement('span').classList;
  var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
  var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

  var global$8 = global$Y;
  var DOMIterables = domIterables;
  var DOMTokenListPrototype = domTokenListPrototype;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$a;

  var handlePrototype = function (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$1(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  };

  for (var COLLECTION_NAME in DOMIterables) {
    if (DOMIterables[COLLECTION_NAME]) {
      handlePrototype(global$8[COLLECTION_NAME] && global$8[COLLECTION_NAME].prototype);
    }
  }

  handlePrototype(DOMTokenListPrototype);

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
      case 'utf-8':
        bytes = encodeUTF8(string);
        break;

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
      default:
        for (var _i = 0; _i < string.length; _i++) {
          bytes.push(string.charCodeAt(_i));
        }

    }

    return bytes;
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
          string: string.endsWith('\0') ? string.substr(0, string.length - 1) : string,
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
        if (length % 2 !== 0) length -= 1;
        var limit = offset + length;
        var bytes = [];
        if (this.byteLength - limit < 0) return false;

        for (var i = offset; i < limit; i += 2) {
          var _byte2 = DataView.prototype.getUint16.call(this, i, le);

          bytes.push(_byte2);
        }

        return bytes.length === 1 ? bytes[0] : bytes;
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

  var uncurryThis$b = functionUncurryThis;
  var toObject$2 = toObject$b;
  var floor = Math.floor;
  var charAt$1 = uncurryThis$b(''.charAt);
  var replace$3 = uncurryThis$b(''.replace);
  var stringSlice$3 = uncurryThis$b(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution

  var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject$2(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return replace$3(replacement, symbols, function (match, ch) {
      var capture;

      switch (charAt$1(ch, 0)) {
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
            if (f <= m) return captures[f - 1] === undefined ? charAt$1(ch, 1) : captures[f - 1] + charAt$1(ch, 1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  };

  var apply$1 = functionApply;
  var call$3 = functionCall;
  var uncurryThis$a = functionUncurryThis;
  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$6 = fails$y;
  var anObject$3 = anObject$f;
  var isCallable$3 = isCallable$m;
  var toIntegerOrInfinity = toIntegerOrInfinity$8;
  var toLength$1 = toLength$a;
  var toString$6 = toString$c;
  var requireObjectCoercible$3 = requireObjectCoercible$9;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var getMethod$1 = getMethod$5;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol$3 = wellKnownSymbol$p;
  var REPLACE = wellKnownSymbol$3('replace');
  var max = Math.max;
  var min = Math.min;
  var concat = uncurryThis$a([].concat);
  var push$1 = uncurryThis$a([].push);
  var stringIndexOf$2 = uncurryThis$a(''.indexOf);
  var stringSlice$2 = uncurryThis$a(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  }; // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0


  var REPLACE_KEEPS_$0 = function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  }(); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string


  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }

    return false;
  }();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$6(function () {
    var re = /./;

    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    }; // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive


    return ''.replace(re, '$<a>') !== '7';
  }); // @@replace logic

  fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
    return [// `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$3(this);
      var replacer = searchValue == undefined ? undefined : getMethod$1(searchValue, REPLACE);
      return replacer ? call$3(replacer, searchValue, O, replaceValue) : call$3(nativeReplace, toString$6(O), searchValue, replaceValue);
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$3(this);
      var S = toString$6(string);

      if (typeof replaceValue == 'string' && stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$2(replaceValue, '$<') === -1) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable$3(replaceValue);
      if (!functionalReplace) replaceValue = toString$6(replaceValue);
      var global = rx.global;

      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];

      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;
        push$1(results, result);
        if (!global) break;
        var matchStr = toString$6(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;

      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$6(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = []; // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

        for (var j = 1; j < result.length; j++) push$1(captures, maybeToString(result[j]));

        var namedCaptures = result.groups;

        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$1(replacerArgs, namedCaptures);
          var replacement = toString$6(apply$1(replaceValue, undefined, replacerArgs));
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

  var uncurryThis$9 = functionUncurryThis;
  var redefine$3 = redefine$b.exports;
  var DatePrototype = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING$1 = 'toString';
  var un$DateToString = uncurryThis$9(DatePrototype[TO_STRING$1]);
  var getTime = uncurryThis$9(DatePrototype.getTime); // `Date.prototype.toString` method
  // https://tc39.es/ecma262/#sec-date.prototype.tostring

  if (String(new Date(NaN)) != INVALID_DATE) {
    redefine$3(DatePrototype, TO_STRING$1, function toString() {
      var value = getTime(this); // eslint-disable-next-line no-self-compare -- NaN check

      return value === value ? un$DateToString(this) : INVALID_DATE;
    });
  }

  var uncurryThis$8 = functionUncurryThis;
  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var redefine$2 = redefine$b.exports;
  var anObject$2 = anObject$f;
  var isPrototypeOf$3 = objectIsPrototypeOf;
  var $toString$1 = toString$c;
  var fails$5 = fails$y;
  var regExpFlags$2 = regexpFlags$1;
  var TO_STRING = 'toString';
  var RegExpPrototype$3 = RegExp.prototype;
  var n$ToString = RegExpPrototype$3[TO_STRING];
  var getFlags$1 = uncurryThis$8(regExpFlags$2);
  var NOT_GENERIC = fails$5(function () {
    return n$ToString.call({
      source: 'a',
      flags: 'b'
    }) != '/a/b';
  }); // FF44- RegExp#toString has a wrong name

  var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING; // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring

  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$2(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$2(this);
      var p = $toString$1(R.source);
      var rf = R.flags;
      var f = $toString$1(rf === undefined && isPrototypeOf$3(RegExpPrototype$3, R) && !('flags' in RegExpPrototype$3) ? getFlags$1(R) : rf);
      return '/' + p + '/' + f;
    }, {
      unsafe: true
    });
  }

  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var uncurryThis$7 = functionUncurryThis;
  var requireObjectCoercible$2 = requireObjectCoercible$9;
  var toString$5 = toString$c;
  var whitespaces$1 = whitespaces$2;
  var replace$2 = uncurryThis$7(''.replace);
  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

  var createMethod = function (TYPE) {
    return function ($this) {
      var string = toString$5(requireObjectCoercible$2($this));
      if (TYPE & 1) string = replace$2(string, ltrim, '');
      if (TYPE & 2) string = replace$2(string, rtrim, '');
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

  var global$7 = global$Y;
  var fails$4 = fails$y;
  var uncurryThis$6 = functionUncurryThis;
  var toString$4 = toString$c;
  var trim = stringTrim.trim;
  var whitespaces = whitespaces$2;
  var $parseInt$1 = global$7.parseInt;
  var Symbol$1 = global$7.Symbol;
  var ITERATOR = Symbol$1 && Symbol$1.iterator;
  var hex = /^[+-]?0x/i;
  var exec$1 = uncurryThis$6(hex.exec);
  var FORCED$1 = $parseInt$1(whitespaces + '08') !== 8 || $parseInt$1(whitespaces + '0x16') !== 22 // MS Edge 18- broken with boxed symbols
  || ITERATOR && !fails$4(function () {
    $parseInt$1(Object(ITERATOR));
  }); // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix

  var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
    var S = trim(toString$4(string));
    return $parseInt$1(S, radix >>> 0 || (exec$1(hex, S) ? 16 : 10));
  } : $parseInt$1;

  var $$8 = _export;
  var $parseInt = numberParseInt; // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix

  $$8({
    global: true,
    forced: parseInt != $parseInt
  }, {
    parseInt: $parseInt
  });

  var $$7 = _export;
  var $includes = arrayIncludes.includes;
  var addToUnscopables = addToUnscopables$2; // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes

  $$7({
    target: 'Array',
    proto: true
  }, {
    includes: function includes(el
    /* , fromIndex = 0 */
    ) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  }); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  addToUnscopables('includes');

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */


  var $$6 = _export;
  var uncurryThis$5 = functionUncurryThis;
  var $IndexOf = arrayIncludes.indexOf;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
  var un$IndexOf = uncurryThis$5([].indexOf);
  var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('indexOf'); // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof

  $$6({
    target: 'Array',
    proto: true,
    forced: NEGATIVE_ZERO || !STRICT_METHOD$1
  }, {
    indexOf: function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0 : $IndexOf(this, searchElement, fromIndex);
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

    for (var i = 0; i < offset; i++) {
      bytes.push(0);
    }

    for (var _i = 0; _i < length; _i++) {
      bytes.push(data[_i]);
    }

    return bytes;
  }

  var GENRES = ['Blues', 'Classic Rock', 'Country', 'Dance', 'Disco', 'Funk', 'Grunge', 'Hip-Hop', 'Jazz', 'Metal', 'New Age', 'Oldies', 'Other', 'Pop', 'R&B', 'Reggae', 'Rock', 'Techno', 'Industrial', 'Alternative', 'Ska', 'Death Metal', 'Pranks', 'Soundtrack', 'Euro-Techno', 'Ambient', 'Trip-Hop', 'Vocal', 'Jazz+Funk', 'Fusion', 'Trance', 'Classical', 'Instrumental', 'Acid', 'House', 'Game', 'Sound Clip', 'Gospel', 'Noise', 'Alt. Rock', 'Bass', 'Soul', 'Punk', 'Space', 'Meditative', 'Instrumental Pop', 'Instrumental Rock', 'Ethnic', 'Gothic', 'Darkwave', 'Techno-Industrial', 'Electronic', 'Pop-Folk', 'Eurodance', 'Dream', 'Southern Rock', 'Comedy', 'Cult', 'Gangsta Rap', 'Top 40', 'Christian Rap', 'Pop/Funk', 'Jungle', 'Native American', 'Cabaret', 'New Wave', 'Psychedelic', 'Rave', 'Showtunes', 'Trailer', 'Lo-Fi', 'Tribal', 'Acid Punk', 'Acid Jazz', 'Polka', 'Retro', 'Musical', 'Rock & Roll', 'Hard Rock', 'Folk', 'Folk-Rock', 'National Folk', 'Swing', 'Fast-Fusion', 'Bebop', 'Latin', 'Revival', 'Celtic', 'Bluegrass', 'Avantgarde', 'Gothic Rock', 'Progressive Rock', 'Psychedelic Rock', 'Symphonic Rock', 'Slow Rock', 'Big Band', 'Chorus', 'Easy Listening', 'Acoustic', 'Humour', 'Speech', 'Chanson', 'Opera', 'Chamber Music', 'Sonata', 'Symphony', 'Booty Bass', 'Primus', 'Porn Groove', 'Satire', 'Slow Jam', 'Club', 'Tango', 'Samba', 'Folklore', 'Ballad', 'Power Ballad', 'Rhythmic Soul', 'Freestyle', 'Duet', 'Punk Rock', 'Drum Solo', 'A Cappella', 'Euro-House', 'Dance Hall', 'Goa', 'Drum & Bass', 'Club-House', 'Hardcore', 'Terror', 'Indie', 'BritPop', 'Afro-Punk', 'Polsk Punk', 'Beat', 'Christian Gangsta Rap', 'Heavy Metal', 'Black Metal', 'Crossover', 'Contemporary Christian', 'Christian Rock', 'Merengue', 'Salsa', 'Thrash Metal', 'Anime', 'JPop', 'Synthpop', 'Abstract', 'Art Rock', 'Baroque', 'Bhangra', 'Big Beat', 'Breakbeat', 'Chillout', 'Downtempo', 'Dub', 'EBM', 'Eclectic', 'Electro', 'Electroclash', 'Emo', 'Experimental', 'Garage', 'Global', 'IDM', 'Illbient', 'Industro-Goth', 'Jam Band', 'Krautrock', 'Leftfield', 'Lounge', 'Math Rock', 'New Romantic', 'Nu-Breakz', 'Post-Punk', 'Post-Rock', 'Psytrance', 'Shoegaze', 'Space Rock', 'Trop Rock', 'World Music', 'Neoclassical', 'Audiobook', 'Audio Theatre', 'Neue Deutsche Welle', 'Podcast', 'Indie Rock', 'G-Funk', 'Dubstep', 'Garage Rock', 'Psybient'];
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
    var title = tags.title,
        artist = tags.artist,
        album = tags.album,
        year = tags.year,
        comment = tags.comment,
        track = tags.track,
        genre = tags.genre;
    title = encodeString(title, 'utf-8');
    artist = encodeString(artist, 'utf-8');
    album = encodeString(album, 'utf-8');
    year = encodeString(year, 'utf-8');
    comment = encodeString(comment, 'utf-8');
    genre = GENRES.indexOf(genre);

    while (title.length < 30) {
      title.push(0);
    }

    while (artist.length < 30) {
      artist.push(0);
    }

    while (album.length < 30) {
      album.push(0);
    }

    while (year.length < 4) {
      year.push(0);
    }

    if (track !== '') {
      while (comment.length < 28) {
        comment.push(0);
      }

      comment.push(0, parseInt(track));
    } else {
      while (comment.length < 30) {
        comment.push(0);
      }
    }

    return mergeBytes(0x54, 0x41, 0x47, title, artist, album, year, comment, genre > -1 ? genre : 12).buffer;
  }

  var DESCRIPTORS$4 = descriptors;
  var objectDefinePropertyModule = objectDefineProperty;
  var regExpFlags$1 = regexpFlags$1;
  var fails$3 = fails$y;
  var RegExpPrototype$2 = RegExp.prototype;
  var FORCED = DESCRIPTORS$4 && fails$3(function () {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return Object.getOwnPropertyDescriptor(RegExpPrototype$2, 'flags').get.call({
      dotAll: true,
      sticky: true
    }) !== 'sy';
  }); // `RegExp.prototype.flags` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

  if (FORCED) objectDefinePropertyModule.f(RegExpPrototype$2, 'flags', {
    configurable: true,
    get: regExpFlags$1
  });

  var $$5 = _export;
  var uncurryThis$4 = functionUncurryThis;
  var notARegExp = notARegexp;
  var requireObjectCoercible$1 = requireObjectCoercible$9;
  var toString$3 = toString$c;
  var correctIsRegExpLogic = correctIsRegexpLogic;
  var stringIndexOf$1 = uncurryThis$4(''.indexOf); // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes

  $$5({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~stringIndexOf$1(toString$3(requireObjectCoercible$1(this)), toString$3(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$4 = _export;
  var toObject$1 = toObject$b;
  var nativeKeys = objectKeys$2;
  var fails$2 = fails$y;
  var FAILS_ON_PRIMITIVES = fails$2(function () {
    nativeKeys(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  $$4({
    target: 'Object',
    stat: true,
    forced: FAILS_ON_PRIMITIVES
  }, {
    keys: function keys(it) {
      return nativeKeys(toObject$1(it));
    }
  });

  function getHeaderFlags(_byte, version) {
    var flags = {};

    switch (version) {
      case 3:
        flags.unsynchronisation = isBitSet(_byte, 7);
        flags.extendedHeader = isBitSet(_byte, 6);
        flags.experimentalIndicator = isBitSet(_byte, 5);
        break;

      case 4:
        flags.unsynchronisation = isBitSet(_byte, 7);
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

  var ENCODINGS = ['windows1251', 'utf-16', 'utf-16be', 'utf-8'];
  function textFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var len = view.byteLength - 1;
    return version === 3 ? view.getCString(1, encoding).string.replace(/\//g, '\\\\') : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
  }
  function setFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var len = view.byteLength - 1;
    return version === 3 ? view.getCString(1, encoding).string : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
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
  function apicFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var mime = view.getCString(1);
    var type = view.getUint8(mime.length + 1);
    var desc = view.getCString(mime.length + 2, encoding);
    var dataOffset = mime.length + desc.length + 2;
    var dataLength = view.byteLength - dataOffset;
    var data = view.getUint8(dataOffset, dataLength);
    return {
      format: mime.string,
      type: type,
      description: desc.string,
      data: data
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
    return {
      format: mime.string,
      filename: fname.string,
      description: desc.string,
      object: object
    };
  }
  function ufidFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var ownerId = view.getCString(0);
    var id = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
    return {
      ownerId: ownerId.string,
      id: id
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
    return {
      ownerId: ownerId.string,
      data: data
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
    return {
      group: view.getUint8(0),
      signature: view.getUint8(1, view.byteLength - 1)
    };
  }
  function seekFrame(buffer, version) {
    var view = new BufferView(buffer);
    return view.getUint32(0);
  }
  function syltFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var language = view.getString(1, 3).string;
    var format = view.getUint8(4);
    var type = view.getUint8(5);
    var descriptor = view.getCString(6, encoding);
    var lyricsOffset = descriptor.length + 6;
    var lyricsLength = view.byteLength - lyricsOffset;
    var lyrics = view.getUint8(lyricsOffset, lyricsLength);
    var text = '';

    for (var i = 0; i < lyrics.length; i += 4) {
      var lyricsView = new BufferView(lyrics);
      var line = lyricsView.getCString(i);
      var time = lyricsView.getUint32(i + line.length);
      var minutes = Math.floor(time / 60000).toString();
      var seconds = Math.floor(time % 60000 / 1000).toString();
      seconds = seconds.length === 1 ? '0' + seconds : seconds;
      var ms = (time % 1000).toString();

      while (ms.length < 3) {
        ms = '0' + ms;
      }

      text += "[".concat(minutes, ":").concat(seconds, ".").concat(ms, "] ").concat(line.string);
      i += line.length;
    }

    return {
      language: language,
      format: format,
      type: type,
      descriptor: descriptor.string,
      lyrics: text
    };
  }
  function mcdiFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    return {
      data: view.getUint8(0, view.byteLength)
    };
  }
  function sytcFrame$2(buffer, version) {
    var view = new BufferView(buffer);
    return {
      format: view.getUint8(0),
      data: view.getUint8(1, view.byteLength - 1)
    };
  }
  function win1251Frame$1(buffer, version) {
    var view = new BufferView(buffer);
    var encoding = ENCODINGS[view.getUint8(0)];
    var length = view.byteLength - 1;
    return view.getString(1, length, encoding).string;
  }

  var call$2 = functionCall;
  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject$1 = anObject$f;
  var toLength = toLength$a;
  var toString$2 = toString$c;
  var requireObjectCoercible = requireObjectCoercible$9;
  var getMethod = getMethod$5;
  var advanceStringIndex = advanceStringIndex$3;
  var regExpExec = regexpExecAbstract; // @@match logic

  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call$2(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$2(O));
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$1(this);
      var S = toString$2(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done) return res.value;
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;

      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString$2(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }

      return n === 0 ? null : A;
    }];
  });

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var classof$1 = classofRaw$1;
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
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && classof$1(it) == 'Window' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$1(it));
  };

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$2 = wellKnownSymbol$p;
  wellKnownSymbolWrapped.f = wellKnownSymbol$2;

  var global$6 = global$Y;
  var path$1 = global$6;

  var path = path$1;
  var hasOwn$3 = hasOwnProperty_1;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$3 = objectDefineProperty.f;

  var defineWellKnownSymbol$1 = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!hasOwn$3(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var $$3 = _export;
  var global$5 = global$Y;
  var getBuiltIn = getBuiltIn$7;
  var apply = functionApply;
  var call$1 = functionCall;
  var uncurryThis$3 = functionUncurryThis;
  var DESCRIPTORS$3 = descriptors;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var fails$1 = fails$y;
  var hasOwn$2 = hasOwnProperty_1;
  var isArray = isArray$5;
  var isCallable$2 = isCallable$m;
  var isObject$1 = isObject$f;
  var isPrototypeOf$2 = objectIsPrototypeOf;
  var isSymbol = isSymbol$4;
  var anObject = anObject$f;
  var toObject = toObject$b;
  var toIndexedObject = toIndexedObject$a;
  var toPropertyKey = toPropertyKey$5;
  var $toString = toString$c;
  var createPropertyDescriptor = createPropertyDescriptor$6;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule = objectDefineProperty;
  var definePropertiesModule = objectDefineProperties;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var arraySlice = arraySlice$5;
  var redefine$1 = redefine$b.exports;
  var shared = shared$5.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys = hiddenKeys$5;
  var uid = uid$4;
  var wellKnownSymbol$1 = wellKnownSymbol$p;
  var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
  var defineWellKnownSymbol = defineWellKnownSymbol$1;
  var setToStringTag = setToStringTag$4;
  var InternalStateModule = internalState;
  var $forEach = arrayIteration.forEach;
  var HIDDEN = sharedKey('hidden');
  var SYMBOL = 'Symbol';
  var PROTOTYPE = 'prototype';
  var TO_PRIMITIVE = wellKnownSymbol$1('toPrimitive');
  var setInternalState = InternalStateModule.set;
  var getInternalState$1 = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$5.Symbol;
  var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE];
  var TypeError$2 = global$5.TypeError;
  var QObject = global$5.QObject;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var push = uncurryThis$3([].push);
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks'); // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDescriptor = DESCRIPTORS$3 && fails$1(function () {
    return nativeObjectCreate(nativeDefineProperty({}, 'a', {
      get: function () {
        return nativeDefineProperty(this, 'a', {
          value: 7
        }).a;
      }
    })).a != 7;
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
    anObject(O);
    var key = toPropertyKey(P);
    anObject(Attributes);

    if (hasOwn$2(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!hasOwn$2(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (hasOwn$2(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
        Attributes = nativeObjectCreate(Attributes, {
          enumerable: createPropertyDescriptor(0, false)
        });
      }

      return setSymbolDescriptor(O, key, Attributes);
    }

    return nativeDefineProperty(O, key, Attributes);
  };

  var $defineProperties = function defineProperties(O, Properties) {
    anObject(O);
    var properties = toIndexedObject(Properties);
    var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
    $forEach(keys, function (key) {
      if (!DESCRIPTORS$3 || call$1($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPropertyKey(V);
    var enumerable = call$1(nativePropertyIsEnumerable, this, P);
    if (this === ObjectPrototype && hasOwn$2(AllSymbols, P) && !hasOwn$2(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !hasOwn$2(this, P) || !hasOwn$2(AllSymbols, P) || hasOwn$2(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPropertyKey(P);
    if (it === ObjectPrototype && hasOwn$2(AllSymbols, key) && !hasOwn$2(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);

    if (descriptor && hasOwn$2(AllSymbols, key) && !(hasOwn$2(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }

    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!hasOwn$2(AllSymbols, key) && !hasOwn$2(hiddenKeys, key)) push(result, key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (hasOwn$2(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$2(ObjectPrototype, key))) {
        push(result, AllSymbols[key]);
      }
    });
    return result;
  }; // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor


  if (!NATIVE_SYMBOL$1) {
    $Symbol = function Symbol() {
      if (isPrototypeOf$2(SymbolPrototype$1, this)) throw TypeError$2('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
      var tag = uid(description);

      var setter = function (value) {
        if (this === ObjectPrototype) call$1(setter, ObjectPrototypeSymbols, value);
        if (hasOwn$2(this, HIDDEN) && hasOwn$2(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };

      if (DESCRIPTORS$3 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
        configurable: true,
        set: setter
      });
      return wrap(tag, description);
    };

    SymbolPrototype$1 = $Symbol[PROTOTYPE];
    redefine$1(SymbolPrototype$1, 'toString', function toString() {
      return getInternalState$1(this).tag;
    });
    redefine$1($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });
    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule.f = $defineProperty;
    definePropertiesModule.f = $defineProperties;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$1(name), name);
    };

    if (DESCRIPTORS$3) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty(SymbolPrototype$1, 'description', {
        configurable: true,
        get: function description() {
          return getInternalState$1(this).description;
        }
      });

      {
        redefine$1(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
          unsafe: true
        });
      }
    }
  }

  $$3({
    global: true,
    wrap: true,
    forced: !NATIVE_SYMBOL$1,
    sham: !NATIVE_SYMBOL$1
  }, {
    Symbol: $Symbol
  });
  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });
  $$3({
    target: SYMBOL,
    stat: true,
    forced: !NATIVE_SYMBOL$1
  }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = $toString(key);
      if (hasOwn$2(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError$2(sym + ' is not a symbol');
      if (hasOwn$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () {
      USE_SETTER = true;
    },
    useSimple: function () {
      USE_SETTER = false;
    }
  });
  $$3({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL$1,
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
  $$3({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL$1
  }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443

  $$3({
    target: 'Object',
    stat: true,
    forced: fails$1(function () {
      getOwnPropertySymbolsModule.f(1);
    })
  }, {
    getOwnPropertySymbols: function getOwnPropertySymbols(it) {
      return getOwnPropertySymbolsModule.f(toObject(it));
    }
  }); // `JSON.stringify` method behavior with symbols
  // https://tc39.es/ecma262/#sec-json.stringify

  if ($stringify) {
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL$1 || fails$1(function () {
      var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

      return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
      || $stringify({
        a: symbol
      }) != '{}' // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
    });
    $$3({
      target: 'JSON',
      stat: true,
      forced: FORCED_JSON_STRINGIFY
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = arraySlice(arguments);
        var $replacer = replacer;
        if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

        if (!isArray(replacer)) replacer = function (key, value) {
          if (isCallable$2($replacer)) value = call$1($replacer, this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return apply($stringify, null, args);
      }
    });
  } // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


  if (!SymbolPrototype$1[TO_PRIMITIVE]) {
    var valueOf = SymbolPrototype$1.valueOf; // eslint-disable-next-line no-unused-vars -- required for .length

    redefine$1(SymbolPrototype$1, TO_PRIMITIVE, function (hint) {
      // TODO: improve hint logic
      return call$1(valueOf, this);
    });
  } // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


  setToStringTag($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  var $$2 = _export;
  var DESCRIPTORS$2 = descriptors;
  var global$4 = global$Y;
  var uncurryThis$2 = functionUncurryThis;
  var hasOwn$1 = hasOwnProperty_1;
  var isCallable$1 = isCallable$m;
  var isPrototypeOf$1 = objectIsPrototypeOf;
  var toString$1 = toString$c;
  var defineProperty$2 = objectDefineProperty.f;
  var copyConstructorProperties = copyConstructorProperties$2;
  var NativeSymbol = global$4.Symbol;
  var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;

  if (DESCRIPTORS$2 && isCallable$1(NativeSymbol) && (!('description' in SymbolPrototype) || // Safari 12 bug
  NativeSymbol().description !== undefined)) {
    var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString$1(arguments[0]);
      var result = isPrototypeOf$1(SymbolPrototype, this) ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };

    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    SymbolWrapper.prototype = SymbolPrototype;
    SymbolPrototype.constructor = SymbolWrapper;
    var NATIVE_SYMBOL = String(NativeSymbol('test')) == 'Symbol(test)';
    var symbolToString = uncurryThis$2(SymbolPrototype.toString);
    var symbolValueOf = uncurryThis$2(SymbolPrototype.valueOf);
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    var replace$1 = uncurryThis$2(''.replace);
    var stringSlice$1 = uncurryThis$2(''.slice);
    defineProperty$2(SymbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = symbolValueOf(this);
        var string = symbolToString(symbol);
        if (hasOwn$1(EmptyStringDescriptionStore, symbol)) return '';
        var desc = NATIVE_SYMBOL ? stringSlice$1(string, 7, -1) : replace$1(string, regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });
    $$2({
      global: true,
      forced: true
    }, {
      Symbol: SymbolWrapper
    });
  }

  var $$1 = _export;
  var $every = arrayIteration.every;
  var arrayMethodIsStrict = arrayMethodIsStrict$4;
  var STRICT_METHOD = arrayMethodIsStrict('every'); // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every

  $$1({
    target: 'Array',
    proto: true,
    forced: !STRICT_METHOD
  }, {
    every: function every(callbackfn
    /* , thisArg */
    ) {
      return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $ = _export;
  var global$3 = global$Y;
  var call = functionCall;
  var uncurryThis$1 = functionUncurryThis;
  var isCallable = isCallable$m;
  var isObject = isObject$f;

  var DELEGATES_TO_EXEC = function () {
    var execCalled = false;
    var re = /[ac]/;

    re.exec = function () {
      execCalled = true;
      return /./.exec.apply(this, arguments);
    };

    return re.test('abc') === true && execCalled;
  }();

  var Error$1 = global$3.Error;
  var un$Test = uncurryThis$1(/./.test); // `RegExp.prototype.test` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.test

  $({
    target: 'RegExp',
    proto: true,
    forced: !DELEGATES_TO_EXEC
  }, {
    test: function (str) {
      var exec = this.exec;
      if (!isCallable(exec)) return un$Test(this, str);
      var result = call(exec, this, str);

      if (result !== null && !isObject(result)) {
        throw new Error$1('RegExp exec method returned something other than an Object or null');
      }

      return !!result;
    }
  });

  var DESCRIPTORS$1 = descriptors;
  var global$2 = global$Y;
  var uncurryThis = functionUncurryThis;
  var isForced = isForced_1;
  var inheritIfRequired = inheritIfRequired$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$a;
  var defineProperty$1 = objectDefineProperty.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var isPrototypeOf = objectIsPrototypeOf;
  var isRegExp = isRegexp;
  var toString = toString$c;
  var regExpFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var redefine = redefine$b.exports;
  var fails = fails$y;
  var hasOwn = hasOwnProperty_1;
  var enforceInternalState = internalState.enforce;
  var setSpecies = setSpecies$3;
  var wellKnownSymbol = wellKnownSymbol$p;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var MATCH = wellKnownSymbol('match');
  var NativeRegExp = global$2.RegExp;
  var RegExpPrototype$1 = NativeRegExp.prototype;
  var SyntaxError = global$2.SyntaxError;
  var getFlags = uncurryThis(regExpFlags);
  var exec = uncurryThis(RegExpPrototype$1.exec);
  var charAt = uncurryThis(''.charAt);
  var replace = uncurryThis(''.replace);
  var stringIndexOf = uncurryThis(''.indexOf);
  var stringSlice = uncurryThis(''.slice); // TODO: Use only propper RegExpIdentifierName

  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g; // "new" should create a new object, old webkit bug

  var CORRECT_NEW = new NativeRegExp(re1) !== re1;
  var MISSED_STICKY$1 = stickyHelpers.MISSED_STICKY;
  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var BASE_FORCED = DESCRIPTORS$1 && (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
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
        chr = chr + charAt(string, ++index);
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
  }; // `RegExp` constructor
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
        if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags(rawPattern);
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
      } catch (error) {
        /* empty */
      }
      return result;
    };

    var proxy = function (key) {
      key in RegExpWrapper || defineProperty$1(RegExpWrapper, key, {
        configurable: true,
        get: function () {
          return NativeRegExp[key];
        },
        set: function (it) {
          NativeRegExp[key] = it;
        }
      });
    };

    for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
      proxy(keys[index++]);
    }

    RegExpPrototype$1.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$1;
    redefine(global$2, 'RegExp', RegExpWrapper);
  } // https://tc39.es/ecma262/#sec-get-regexp-@@species


  setSpecies('RegExp');

  var global$1 = global$Y;
  var DESCRIPTORS = descriptors;
  var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
  var classof = classofRaw$1;
  var defineProperty = objectDefineProperty.f;
  var getInternalState = internalState.get;
  var RegExpPrototype = RegExp.prototype;
  var TypeError$1 = global$1.TypeError; // `RegExp.prototype.sticky` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky

  if (DESCRIPTORS && MISSED_STICKY) {
    defineProperty(RegExpPrototype, 'sticky', {
      configurable: true,
      get: function () {
        if (this === RegExpPrototype) return undefined; // We can't use InternalStateModule.getterFor because
        // we don't add metadata for regexps created by a literal.

        if (classof(this) === 'RegExp') {
          return !!getInternalState(this).sticky;
        }

        throw TypeError$1('Incompatible receiver, RegExp required');
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
  var syltRegex = /^((\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)|)/;
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
    if (version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (set) {
      textFrame$1(set, version, strict);

      if (typeof set !== 'string' && typeof set !== 'number') {
        throw new Error('Value is not a string/number');
      }

      var match = set.match(setRegex);

      if (strict && typeof set === 'string') {
        if (match === null) throw new Error('Invalid format (eg. 1/2)');
        var position = parseInt(match[1]);
        var total = match[2] ? parseInt(match[2].substr(1)) : null;

        if (total !== null && position > total) {
          throw new Error('Position is greater then total');
        }
      }
    });
    return true;
  }
  function timeFrame(value, version, strict) {
    if (version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
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
    if (version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (tkey) {
      textFrame$1(tkey, version, strict);

      if (strict && !tkey.match(/^([A-Gb#mo]{1,3})$/)) {
        throw new Error('Invalid TKEY Format (eg Cbm)');
      }
    });
    return true;
  }
  function tlanFrame(value, version, strict) {
    if (version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
    value.forEach(function (tlan) {
      textFrame$1(tlan, version, strict);

      if (strict && !tlan.match(langRegex)) {
        throw new Error('Language must follow ISO 639-2');
      }
    });
    return true;
  }
  function tsrcFrame(value, version, strict) {
    if (version === 3) value = [value];else if (version === 4) value = value.split('\\\\');
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
    values.forEach(function (sylt) {
      textFrame$1(sylt.language, version, strict);
      textFrame$1(sylt.descriptor, version, strict);

      if (typeof sylt.lyrics !== 'string') {
        throw new Error('Lyrics is not a string');
      }

      if (typeof sylt.type !== 'number') {
        throw new Error('Type is not a number');
      } else if (sylt.type > 255 || sylt.type < 0) {
        throw new Error('Type should be in range of 0 - 255');
      }

      if (typeof sylt.format !== 'number') {
        throw new Error('Format is not a number');
      } else if (sylt.format > 255 || sylt.format < 0) {
        throw new Error('Format should be in range of 0 - 255');
      }

      if (strict) {
        if (!sylt.language.match(langRegex)) {
          throw new Error('Language must follow ISO 639-2');
        }

        if (sylt.type > 6 || sylt.type < 0) {
          throw new Error('Type should be in range of 0 - 6');
        }

        if (sylt.format > 2 || sylt.format < 1) {
          throw new Error('Format should be either 1 or 2');
        }

        if (sylt.lyrics.split('\n').every(function (entry) {
          return syltRegex.test(entry);
        })) {
          throw new Error('Lyrics must follow this format: [mm:ss.xxx]');
        }

        var checkObj = {
          language: sylt.language,
          descriptor: sylt.descriptor
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
    if (!BufferView.isViewable(value.data)) {
      throw new Error('Data should be viewable');
    }

    if (typeof value.format !== 'number') {
      throw new Error('Format is not a number');
    } else if (value.format > 255 || value.format < 0) {
      throw new Error('Format should be in range of 0 - 255');
    }

    if (strict && (value.format > 2 || value.format < 1)) {
      throw new Error('Invalid timestamp');
    }

    return true;
  }

  var createTypedArrayConstructor = typedArrayConstructor.exports; // `Int16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects

  createTypedArrayConstructor('Int16', function (init) {
    return function Int16Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  function getHeaderBytes(id, size, version, flags) {
    var idBytes = encodeString(id);
    var sizeView = new BufferView(4);
    sizeView.setUint32(0, version === 3 ? size : encodeSynch(size));
    var flagsBytes = [0, 0];

    if (version === 4 && flags.unsynchronisation) {
      flagsBytes[1] = setBit(flagsBytes[1], 1);
    }

    if (version === 4 && flags.dataLengthIndicator) {
      flagsBytes[1] = setBit(flagsBytes[1], 0);
    }

    return mergeBytes(idBytes, sizeView.getUint8(0, 4), flagsBytes);
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
        unsynch = options.unsynch;
    var encoding = 0;
    var strBytes = [];

    switch (version) {
      case 3:
        encoding = 1;
        strBytes = encodeString(value.replace('\\\\', '/') + '\0', 'utf-16');
        break;

      case 4:
        encoding = 3;
        strBytes = encodeString(value.replace('\\\\', '\0') + '\0', 'utf-8');
        break;
    }

    var data = mergeBytes(encoding, strBytes);
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
      case 3:
        strBytes = encodeString(value.replace('\\\\', '/') + '\0');
        break;

      case 4:
        strBytes = encodeString(value.replace('\\\\', '\0') + '\0');
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
    if (version === 3) value = value.toString().split('\\\\')[0];else if (version === 4) value = value.toString().replace('\\\\', '\0');
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
        unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (txxx) {
      var encoding = 0;
      var descBytes, strBytes;

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(txxx.description + '\0', 'utf-16');
          strBytes = encodeString(txxx.text + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(txxx.description + '\0', 'utf-8');
          strBytes = encodeString(txxx.text + '\0', 'utf-8');
          break;
      }

      var data = mergeBytes(encoding, descBytes, strBytes);
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
        unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (wxxx) {
      var encoding = 0;
      var descBytes, strBytes;

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(wxxx.description + '\0', 'utf-16');
          strBytes = encodeString(wxxx.url + '\0');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(wxxx.description + '\0', 'utf-8');
          strBytes = encodeString(wxxx.url + '\0');
          break;
      }

      var data = mergeBytes(encoding, descBytes, strBytes);
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
        unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (langDesc) {
      var encoding = 0;
      var langBytes = encodeString(langDesc.language);
      var descBytes, textBytes;

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(langDesc.descriptor + '\0', 'utf-16');
          textBytes = encodeString(langDesc.text + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(langDesc.descriptor + '\0', 'utf-8');
          textBytes = encodeString(langDesc.text + '\0', 'utf-8');
          break;
      }

      var data = mergeBytes(encoding, langBytes, descBytes, textBytes);
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
        unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (apic) {
      var encoding = 0;
      var mimeBytes = encodeString(apic.format + '\0');
      var imageBytes = new Uint8Array(apic.data);
      var strBytes = [];

      switch (version) {
        case 3:
          encoding = 1;
          strBytes = encodeString(apic.description + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          strBytes = encodeString(apic.description + '\0', 'utf-8');
          break;
      }

      var data = mergeBytes(encoding, mimeBytes, apic.type, strBytes, imageBytes);
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
        unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (geob) {
      var mime = encodeString(geob.format + '\0');
      var object = new Uint8Array(geob.object);
      var encoding, filename, description;

      switch (version) {
        case 3:
          encoding = 1;
          filename = encodeString(geob.filename + '\0', 'utf-16');
          description = encodeString(geob.description + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          filename = encodeString(geob.filename + '\0', 'utf-8');
          description = encodeString(geob.description + '\0', 'utf-8');
          break;
      }

      var data = mergeBytes(encoding, mime, filename, description, object);
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
        unsynch = options.unsynch;
    var bytes = [];
    var encoding = 0;
    var langBytes = encodeString(value.language);
    var textBytes;

    switch (version) {
      case 3:
        encoding = 1;
        textBytes = encodeString(value.text + '\0', 'utf-16');
        break;

      case 4:
        encoding = 3;
        textBytes = encodeString(value.text + '\0', 'utf-8');
        break;
    }

    var data = mergeBytes(encoding, langBytes, textBytes);
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
        unsynch = options.unsynch;
    var encoding = 0;
    var codeBytes = encodeString(value.currencyCode);
    var priceBytes = encodeString(value.currencyPrice + '\0');
    var dateBytes = encodeString(value.date);
    var sellerBytes;

    switch (version) {
      case 3:
        encoding = 1;
        sellerBytes = encodeString(value.seller, 'utf-16');
        break;

      case 4:
        encoding = 3;
        sellerBytes = encodeString(value.seller, 'utf-8');
        break;
    }

    var data = mergeBytes(encoding, codeBytes, priceBytes, dateBytes, sellerBytes);
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
  function syltFrame(values, options) {
    var id = options.id,
        version = options.version,
        unsynch = options.unsynch;
    var bytes = [];
    values.forEach(function (sylt) {
      var encoding = 0;
      var langBytes = encodeString(sylt.language);
      var descBytes = [];

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(sylt.descriptor + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(sylt.descriptor + '\0', 'utf-8');
          break;
      }

      var regex = /^(\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)/;
      var lyricsBytes = [];
      sylt.lyrics.replace(/\r\n/, '\n').split('\n').forEach(function (line) {
        if (line !== '') {
          var result = regex.exec(line);
          var time = parseInt(result[1].replace(/[^0-9]/g, ''));
          var string = encodeString((result[2] || '') + '\n\0');
          var timeBytes = new BufferView(4);
          timeBytes.setUint32(0, time);
          lyricsBytes = mergeBytes(lyricsBytes, string, timeBytes.getUint8(0, 4));
        }
      });
      var data = mergeBytes(encoding, langBytes, sylt.format, sylt.type, descBytes, lyricsBytes);
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
    var data = mergeBytes(value.format, value.data);
    if (unsynch) data = unsynchData(data, version);
    var header = getHeaderBytes(id, data.length, version, {
      unsynchronisation: unsynch,
      dataLengthIndicator: unsynch
    });
    return mergeBytes(header, data);
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
  /**
   *  WFED and TGID is not a standard and undocumented frame used by Apple iTunes
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

  var frames = /*#__PURE__*/Object.freeze({
    __proto__: null,
    APIC: APIC,
    COMM: COMM,
    GEOB: GEOB,
    IPLS: IPLS,
    MCDI: MCDI,
    OWNE: OWNE,
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
    WFED: WFED,
    TGID: TGID,
    WOAF: WOAF,
    WOAR: WOAR,
    WOAS: WOAS,
    WORS: WORS,
    WPAY: WPAY,
    WPUB: WPUB,
    WXXX: WXXX
  });

  function hasID3v2(buffer) {
    var view = new BufferView(buffer);
    return view.getString(0, 3).string === 'ID3';
  }
  function decode(buffer) {
    var tagOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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

    if (version[0] !== 3 && version[0] !== 4) {
      throw new Error('Unknown ID3v2 major version');
    }

    var offset = 10;
    var limit = size;

    var pushTag = function pushTag(tag) {
      var singleFrame = ['USER', 'OWNE', 'MCDI', 'RVAD', 'SYTC'];

      switch (_typeof(tag.value)) {
        case 'number':
        case 'string':
          tag.value = tag.value.toString();
          if (tags[tag.id]) tags[tag.id] += '\\\\' + tag.value;else tags[tag.id] = tag.value;
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
        flags: flags
      });
      if (!frame) break;
      offset += frame.size + 10;
      limit -= frame.size + 10;

      if (frame.id === 'SEEK') {
        var seekedTags = decode(buffer, offset + frame.value);

        for (var id in seekedTags) {
          pushTag({
            id: id,
            value: seekedTags[id]
          });
        }
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
        flags = options.flags;
    var sizeByte = view.getUint32(4);
    frame.id = view.getUint8String(0, 4);
    frame.flags = getFrameFlags(view.getUint8(8, 2), version[0]);
    frame.size = version[0] === 4 ? decodeSynch(sizeByte) : sizeByte;
    var frameSpec = frames[frame.id];
    var offset = 10;
    var actualSize = frame.size;
    var dataLength = frame.size;
    var contents;

    if (!frameSpec) {
      console.warn("Skipping unsupported frame: ".concat(frame.id));
      return frame;
    }

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

    frame.value = frameSpec.parse(contents.buffer, version[0]);
    return frame;
  }

  function validate(tags, strict, options) {
    var version = options.version;

    if (version !== 3 && version !== 4) {
      throw new Error('Unknown provided version');
    }

    for (var id in tags) {
      if (!Object.keys(frames).includes(id)) continue;
      var frameSpec = frames[id];

      if (strict && !frameSpec.version.includes(version)) {
        throw new Error("".concat(id, " is not supported in ID3v2.").concat(version));
      }

      try {
        frameSpec.validate(tags[id], version, strict);
      } catch (error) {
        throw new Error("".concat(error.message, " at ").concat(id));
      }
    }

    return true;
  }
  function encode(tags, options) {
    var version = options.version,
        padding = options.padding,
        unsynch = options.unsynch;
    var headerBytes = [0x49, 0x44, 0x33, version, 0];
    var flagsByte = 0;
    var sizeView = new BufferView(4);
    var paddingBytes = new Uint8Array(padding);
    var framesBytes = [];

    for (var id in tags) {
      var frameSpec = frames[id];
      var bytes = frameSpec.write(tags[id], {
        id: id,
        version: version,
        unsynch: unsynch
      });
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

      this.name = 'MP3Tag';
      this.version = '3.3.0';
      this.verbose = verbose;
      this.buffer = buffer;
      this.tags = {};
      this.error = '';
    }

    _createClass(MP3Tag, [{
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
          id3v2: true
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

          var _ID3v2$decode = decode(buffer),
              v2Tags = _ID3v2$decode.tags,
              _details = _ID3v2$decode.details;

          if (verbose) console.log('ID3v2 reading finished');
          tags.v2 = _objectSpread2({}, v2Tags);
          tags.v2Details = _details;
        }

        Object.defineProperties(tags, {
          title: {
            get: function get() {
              return this.v2 && this.v2.TIT2 || this.v1 && this.v1.title || '';
            },
            set: function set(value) {
              if (this.v2) this.v2.TIT2 = value;
              if (this.v1) this.v1.title = value;
            }
          },
          artist: {
            get: function get() {
              return this.v2 && this.v2.TPE1 || this.v1 && this.v1.artist || '';
            },
            set: function set(value) {
              if (this.v2) this.v2.TPE1 = value;
              if (this.v1) this.v1.artist = value;
            }
          },
          album: {
            get: function get() {
              return this.v2 && this.v2.TALB || this.v1 && this.v1.album || '';
            },
            set: function set(value) {
              if (this.v2) this.v2.TALB = value;
              if (this.v1) this.v1.album = value;
            }
          },
          year: {
            get: function get() {
              return this.v2 && (this.v2.TYER || this.v2.TDRC) || this.v1 && this.v1.year || '';
            },
            set: function set(value) {
              if (this.v2) {
                var version = this.v2Details.version[0];
                if (version === 3) this.v2.TYER = value;else if (version === 4) this.v2.TDRC = value;
              }

              if (this.v1) this.v1.year = value;
            }
          },
          comment: {
            get: function get() {
              var text = '';

              if (this.v2 && this.v2.COMM) {
                var comm = this.v2.COMM;
                if (Array.isArray(comm) && comm.length > 0) text = comm[0].text;
              } else if (this.v1 && this.v1.comment) text = this.v1.comment;

              return text;
            },
            set: function set(value) {
              if (this.v2) {
                this.v2.COMM = [{
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
              return this.v2 && this.v2.TRCK && this.v2.TRCK.split('/')[0] || this.v1 && this.v1.track || '';
            },
            set: function set(value) {
              if (this.v2) this.v2.TRCK = value;
              if (this.v1) this.v1.track = value;
            }
          },
          genre: {
            get: function get() {
              return this.v2 && this.v2.TCON || this.v1 && this.v1.genre || '';
            },
            set: function set(value) {
              if (this.v2) this.v2.TCON = value;
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
        var audio = new Uint8Array(MP3Tag.getAudioBuffer(buffer));
        options = overwriteDefault(options, {
          strict: false,
          id3v1: {
            include: false
          },
          id3v2: {
            include: true,
            unsynch: false,
            version: defaultVersion,
            padding: 2048
          }
        });

        if (options.id3v1.include) {
          if (verbose) console.log('Validating ID3v1...');
          validate$1(tags.v1, options.strict);
          if (verbose) console.log('Writing ID3v1...');
          var encoded = encode$1(tags.v1);
          var tagBytes = new Uint8Array(encoded);
          audio = mergeBytes(audio, tagBytes);
        }

        if (options.id3v2.include) {
          if (verbose) console.log('Validating ID3v2...');
          validate(tags.v2, options.strict, options.id3v2);
          if (verbose) console.log('Writing ID3v2...');

          var _encoded = encode(tags.v2, options.id3v2);

          var _tagBytes = new Uint8Array(_encoded);

          audio = mergeBytes(_tagBytes, audio);
        }

        return audio.buffer;
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

        var view = new BufferView(buffer);
        var start = 0;
        var i = 0;

        while (i < view.byteLength) {
          if (view.getUint8(i) === 0xff && view.getUint8(i + 1) === 0xfb) {
            start = i;
            break;
          } else i++;
        }

        return buffer.slice(start);
      }
    }]);

    return MP3Tag;
  }();

  return MP3Tag;

}));
