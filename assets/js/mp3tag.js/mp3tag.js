(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MP3Tag = factory());
}(this, (function () { 'use strict';

  function ownKeys$2(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$2(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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

  var fails$t = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var fails$s = fails$t; // Detect IE8's incomplete defineProperty implementation

  var descriptors = !fails$s(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1] != 7;
  });

  var objectDefineProperty = {};

  var check = function (it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global$q = // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function () {
    return this;
  }() || Function('return this')();

  var isObject$e = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var global$p = global$q;
  var isObject$d = isObject$e;
  var document$1 = global$p.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject$d(document$1) && isObject$d(document$1.createElement);

  var documentCreateElement$1 = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var DESCRIPTORS$e = descriptors;
  var fails$r = fails$t;
  var createElement = documentCreateElement$1; // Thank's IE8 for his funny defineProperty

  var ie8DomDefine = !DESCRIPTORS$e && !fails$r(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
    return Object.defineProperty(createElement('div'), 'a', {
      get: function () {
        return 7;
      }
    }).a != 7;
  });

  var isObject$c = isObject$e;

  var anObject$d = function (it) {
    if (!isObject$c(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var isObject$b = isObject$e; // `ToPrimitive` abstract operation
  // https://tc39.es/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string

  var toPrimitive$5 = function (input, PREFERRED_STRING) {
    if (!isObject$b(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject$b(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$b(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var DESCRIPTORS$d = descriptors;
  var IE8_DOM_DEFINE$1 = ie8DomDefine;
  var anObject$c = anObject$d;
  var toPrimitive$4 = toPrimitive$5; // eslint-disable-next-line es/no-object-defineproperty -- safe

  var $defineProperty$1 = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty

  objectDefineProperty.f = DESCRIPTORS$d ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
    anObject$c(O);
    P = toPrimitive$4(P, true);
    anObject$c(Attributes);
    if (IE8_DOM_DEFINE$1) try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var DESCRIPTORS$c = descriptors;
  var defineProperty$6 = objectDefineProperty.f;
  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = 'name'; // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name

  if (DESCRIPTORS$c && !(NAME$1 in FunctionPrototype)) {
    defineProperty$6(FunctionPrototype, NAME$1, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
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

  var toString$2 = {}.toString;

  var classofRaw$1 = function (it) {
    return toString$2.call(it).slice(8, -1);
  };

  var fails$q = fails$t;
  var classof$8 = classofRaw$1;
  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails$q(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classof$8(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // https://tc39.es/ecma262/#sec-requireobjectcoercible

  var requireObjectCoercible$9 = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var IndexedObject$2 = indexedObject;
  var requireObjectCoercible$8 = requireObjectCoercible$9;

  var toIndexedObject$8 = function (it) {
    return IndexedObject$2(requireObjectCoercible$8(it));
  };

  var requireObjectCoercible$7 = requireObjectCoercible$9; // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject

  var toObject$c = function (argument) {
    return Object(requireObjectCoercible$7(argument));
  };

  var toObject$b = toObject$c;
  var hasOwnProperty = {}.hasOwnProperty;

  var has$f = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty.call(toObject$b(it), key);
  };

  var DESCRIPTORS$b = descriptors;
  var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
  var createPropertyDescriptor$5 = createPropertyDescriptor$6;
  var toIndexedObject$7 = toIndexedObject$8;
  var toPrimitive$3 = toPrimitive$5;
  var has$e = has$f;
  var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

  var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

  objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$7(O);
    P = toPrimitive$3(P, true);
    if (IE8_DOM_DEFINE) try {
      return $getOwnPropertyDescriptor$1(O, P);
    } catch (error) {
      /* empty */
    }
    if (has$e(O, P)) return createPropertyDescriptor$5(!propertyIsEnumerableModule$1.f.call(O, P), O[P]);
  };

  var DESCRIPTORS$a = descriptors;
  var definePropertyModule$7 = objectDefineProperty;
  var createPropertyDescriptor$4 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$d = DESCRIPTORS$a ? function (object, key, value) {
    return definePropertyModule$7.f(object, key, createPropertyDescriptor$4(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var redefine$a = {exports: {}};

  var global$o = global$q;
  var createNonEnumerableProperty$c = createNonEnumerableProperty$d;

  var setGlobal$3 = function (key, value) {
    try {
      createNonEnumerableProperty$c(global$o, key, value);
    } catch (error) {
      global$o[key] = value;
    }

    return value;
  };

  var global$n = global$q;
  var setGlobal$2 = setGlobal$3;
  var SHARED = '__core-js_shared__';
  var store$3 = global$n[SHARED] || setGlobal$2(SHARED, {});
  var sharedStore = store$3;

  var store$2 = sharedStore;
  var functionToString = Function.toString; // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

  if (typeof store$2.inspectSource != 'function') {
    store$2.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource$2 = store$2.inspectSource;

  var global$m = global$q;
  var inspectSource$1 = inspectSource$2;
  var WeakMap$1 = global$m.WeakMap;
  var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

  var shared$5 = {exports: {}};

  var store$1 = sharedStore;
  (shared$5.exports = function (key, value) {
    return store$1[key] || (store$1[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.15.2',
    mode: 'global',
    copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
  });

  var id = 0;
  var postfix = Math.random();

  var uid$4 = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var shared$4 = shared$5.exports;
  var uid$3 = uid$4;
  var keys$2 = shared$4('keys');

  var sharedKey$4 = function (key) {
    return keys$2[key] || (keys$2[key] = uid$3(key));
  };

  var hiddenKeys$5 = {};

  var NATIVE_WEAK_MAP = nativeWeakMap;
  var global$l = global$q;
  var isObject$a = isObject$e;
  var createNonEnumerableProperty$b = createNonEnumerableProperty$d;
  var objectHas = has$f;
  var shared$3 = sharedStore;
  var sharedKey$3 = sharedKey$4;
  var hiddenKeys$4 = hiddenKeys$5;
  var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  var WeakMap = global$l.WeakMap;
  var set$1, get$1, has$d;

  var enforce = function (it) {
    return has$d(it) ? get$1(it) : set$1(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;

      if (!isObject$a(it) || (state = get$1(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (NATIVE_WEAK_MAP || shared$3.state) {
    var store = shared$3.state || (shared$3.state = new WeakMap());
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;

    set$1 = function (it, metadata) {
      if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      wmset.call(store, it, metadata);
      return metadata;
    };

    get$1 = function (it) {
      return wmget.call(store, it) || {};
    };

    has$d = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey$3('state');
    hiddenKeys$4[STATE] = true;

    set$1 = function (it, metadata) {
      if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
      metadata.facade = it;
      createNonEnumerableProperty$b(it, STATE, metadata);
      return metadata;
    };

    get$1 = function (it) {
      return objectHas(it, STATE) ? it[STATE] : {};
    };

    has$d = function (it) {
      return objectHas(it, STATE);
    };
  }

  var internalState = {
    set: set$1,
    get: get$1,
    has: has$d,
    enforce: enforce,
    getterFor: getterFor
  };

  var global$k = global$q;
  var createNonEnumerableProperty$a = createNonEnumerableProperty$d;
  var has$c = has$f;
  var setGlobal$1 = setGlobal$3;
  var inspectSource = inspectSource$2;
  var InternalStateModule$4 = internalState;
  var getInternalState$5 = InternalStateModule$4.get;
  var enforceInternalState$1 = InternalStateModule$4.enforce;
  var TEMPLATE = String(String).split('String');
  (redefine$a.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    var state;

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has$c(value, 'name')) {
        createNonEnumerableProperty$a(value, 'name', key);
      }

      state = enforceInternalState$1(value);

      if (!state.source) {
        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }
    }

    if (O === global$k) {
      if (simple) O[key] = value;else setGlobal$1(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty$a(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState$5(this).source || inspectSource(this);
  });

  var global$j = global$q;
  var path$2 = global$j;

  var path$1 = path$2;
  var global$i = global$q;

  var aFunction$5 = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn$5 = function (namespace, method) {
    return arguments.length < 2 ? aFunction$5(path$1[namespace]) || aFunction$5(global$i[namespace]) : path$1[namespace] && path$1[namespace][method] || global$i[namespace] && global$i[namespace][method];
  };

  var objectGetOwnPropertyNames = {};

  var ceil = Math.ceil;
  var floor$4 = Math.floor; // `ToInteger` abstract operation
  // https://tc39.es/ecma262/#sec-tointeger

  var toInteger$8 = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor$4 : ceil)(argument);
  };

  var toInteger$7 = toInteger$8;
  var min$6 = Math.min; // `ToLength` abstract operation
  // https://tc39.es/ecma262/#sec-tolength

  var toLength$k = function (argument) {
    return argument > 0 ? min$6(toInteger$7(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var toInteger$6 = toInteger$8;
  var max$2 = Math.max;
  var min$5 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

  var toAbsoluteIndex$6 = function (index, length) {
    var integer = toInteger$6(index);
    return integer < 0 ? max$2(integer + length, 0) : min$5(integer, length);
  };

  var toIndexedObject$6 = toIndexedObject$8;
  var toLength$j = toLength$k;
  var toAbsoluteIndex$5 = toAbsoluteIndex$6; // `Array.prototype.{ indexOf, includes }` methods implementation

  var createMethod$4 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject$6($this);
      var length = toLength$j(O.length);
      var index = toAbsoluteIndex$5(fromIndex, length);
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

  var has$b = has$f;
  var toIndexedObject$5 = toIndexedObject$8;
  var indexOf = arrayIncludes.indexOf;
  var hiddenKeys$3 = hiddenKeys$5;

  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject$5(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) !has$b(hiddenKeys$3, key) && has$b(O, key) && result.push(key); // Don't enum bug & hidden keys


    while (names.length > i) if (has$b(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
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

  var getBuiltIn$4 = getBuiltIn$5;
  var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
  var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
  var anObject$b = anObject$d; // all object keys, includes non-enumerable and symbols

  var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = getOwnPropertyNamesModule$1.f(anObject$b(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var has$a = has$f;
  var ownKeys = ownKeys$1;
  var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
  var definePropertyModule$6 = objectDefineProperty;

  var copyConstructorProperties$2 = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = definePropertyModule$6.f;
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule$2.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has$a(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var fails$p = fails$t;
  var replacement = /#|\.prototype\./;

  var isForced$2 = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails$p(detection) : !!detection;
  };

  var normalize = isForced$2.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced$2.data = {};
  var NATIVE = isForced$2.NATIVE = 'N';
  var POLYFILL = isForced$2.POLYFILL = 'P';
  var isForced_1 = isForced$2;

  var global$h = global$q;
  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var createNonEnumerableProperty$9 = createNonEnumerableProperty$d;
  var redefine$9 = redefine$a.exports;
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
  */

  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global$h;
    } else if (STATIC) {
      target = global$h[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global$h[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties$1(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$9(sourceProperty, 'sham', true);
      } // extend global


      redefine$9(target, key, sourceProperty, options);
    }
  };

  var internalObjectKeys = objectKeysInternal;
  var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe

  var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys(O, enumBugKeys$1);
  };

  var DESCRIPTORS$9 = descriptors;
  var definePropertyModule$5 = objectDefineProperty;
  var anObject$a = anObject$d;
  var objectKeys$1 = objectKeys$2; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  // eslint-disable-next-line es/no-object-defineproperties -- safe

  var objectDefineProperties = DESCRIPTORS$9 ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$a(O);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;

    while (length > index) definePropertyModule$5.f(O, key = keys[index++], Properties[key]);

    return O;
  };

  var $$k = _export;
  var DESCRIPTORS$8 = descriptors;
  var defineProperties$1 = objectDefineProperties; // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties

  $$k({
    target: 'Object',
    stat: true,
    forced: !DESCRIPTORS$8,
    sham: !DESCRIPTORS$8
  }, {
    defineProperties: defineProperties$1
  });

  var classof$7 = classofRaw$1; // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe

  var isArray$5 = Array.isArray || function isArray(arg) {
    return classof$7(arg) == 'Array';
  };

  var $$j = _export;
  var isArray$4 = isArray$5; // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray

  $$j({
    target: 'Array',
    stat: true
  }, {
    isArray: isArray$4
  });

  var anObject$9 = anObject$d; // `RegExp.prototype.flags` getter implementation
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

  var regexpFlags$1 = function () {
    var that = anObject$9(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var regexpStickyHelpers = {};

  var fails$o = fails$t; // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,

  var RE = function (s, f) {
    return RegExp(s, f);
  };

  regexpStickyHelpers.UNSUPPORTED_Y = fails$o(function () {
    var re = RE('a', 'y');
    re.lastIndex = 2;
    return re.exec('abcd') != null;
  });
  regexpStickyHelpers.BROKEN_CARET = fails$o(function () {
    // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
    var re = RE('^r', 'gy');
    re.lastIndex = 2;
    return re.exec('str') != null;
  });

  var getBuiltIn$3 = getBuiltIn$5;
  var html$1 = getBuiltIn$3('document', 'documentElement');

  var anObject$8 = anObject$d;
  var defineProperties = objectDefineProperties;
  var enumBugKeys = enumBugKeys$3;
  var hiddenKeys$1 = hiddenKeys$5;
  var html = html$1;
  var documentCreateElement = documentCreateElement$1;
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
    var iframe = documentCreateElement('iframe');
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
      /* global ActiveXObject -- old IE */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) {
      /* ignore */
    }

    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;

    while (length--) delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];

    return NullProtoObject();
  };

  hiddenKeys$1[IE_PROTO$1] = true; // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create

  var objectCreate = Object.create || function create(O, Properties) {
    var result;

    if (O !== null) {
      EmptyConstructor[PROTOTYPE$2] = anObject$8(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE$2] = null; // add "__proto__" for Object.getPrototypeOf polyfill

      result[IE_PROTO$1] = O;
    } else result = NullProtoObject();

    return Properties === undefined ? result : defineProperties(result, Properties);
  };

  var fails$n = fails$t;
  var regexpUnsupportedDotAll = fails$n(function () {
    // babel-minify transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
    var re = RegExp('.', (typeof '').charAt(0));
    return !(re.dotAll && re.exec('\n') && re.flags === 's');
  });

  var fails$m = fails$t;
  var regexpUnsupportedNcg = fails$m(function () {
    // babel-minify transpiles RegExp('.', 'g') -> /./g and it causes SyntaxError
    var re = RegExp('(?<a>b)', (typeof '').charAt(5));
    return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
  });

  /* eslint-disable regexp/no-assertion-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

  /* eslint-disable regexp/no-useless-quantifier -- testing */


  var regexpFlags = regexpFlags$1;
  var stickyHelpers$2 = regexpStickyHelpers;
  var shared$2 = shared$5.exports;
  var create$3 = objectCreate;
  var getInternalState$4 = internalState.get;
  var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = shared$2('native-string-replace', String.prototype.replace);
  var patchedExec = nativeExec;

  var UPDATES_LAST_INDEX_WRONG = function () {
    var re1 = /a/;
    var re2 = /b*/g;
    nativeExec.call(re1, 'a');
    nativeExec.call(re2, 'a');
    return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  }();

  var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y || stickyHelpers$2.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

  var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG$1;

  if (PATCH) {
    // eslint-disable-next-line max-statements -- TODO
    patchedExec = function exec(str) {
      var re = this;
      var state = getInternalState$4(re);
      var raw = state.raw;
      var result, reCopy, lastIndex, match, i, object, group;

      if (raw) {
        raw.lastIndex = re.lastIndex;
        result = patchedExec.call(raw, str);
        re.lastIndex = raw.lastIndex;
        return result;
      }

      var groups = state.groups;
      var sticky = UNSUPPORTED_Y$2 && re.sticky;
      var flags = regexpFlags.call(re);
      var source = re.source;
      var charsAdded = 0;
      var strCopy = str;

      if (sticky) {
        flags = flags.replace('y', '');

        if (flags.indexOf('g') === -1) {
          flags += 'g';
        }

        strCopy = String(str).slice(re.lastIndex); // Support anchored sticky behavior.

        if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
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
      match = nativeExec.call(sticky ? reCopy : re, strCopy);

      if (sticky) {
        if (match) {
          match.input = match.input.slice(charsAdded);
          match[0] = match[0].slice(charsAdded);
          match.index = re.lastIndex;
          re.lastIndex += match[0].length;
        } else re.lastIndex = 0;
      } else if (UPDATES_LAST_INDEX_WRONG && match) {
        re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
      }

      if (NPCG_INCLUDED && match && match.length > 1) {
        // Fix browsers whose `exec` methods don't consistently return `undefined`
        // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
        nativeReplace.call(match[0], reCopy, function () {
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

  var $$i = _export;
  var exec = regexpExec$3; // `RegExp.prototype.exec` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.exec

  $$i({
    target: 'RegExp',
    proto: true,
    forced: /./.exec !== exec
  }, {
    exec: exec
  });

  var getBuiltIn$2 = getBuiltIn$5;
  var engineUserAgent = getBuiltIn$2('navigator', 'userAgent') || '';

  var global$g = global$q;
  var userAgent$2 = engineUserAgent;
  var process = global$g.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] < 4 ? 1 : match[0] + match[1];
  } else if (userAgent$2) {
    match = userAgent$2.match(/Edge\/(\d+)/);

    if (!match || match[1] >= 74) {
      match = userAgent$2.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  /* eslint-disable es/no-symbol -- required for testing */
  var V8_VERSION$2 = engineV8Version;
  var fails$l = fails$t; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$l(function () {
    var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

    return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
  });

  /* eslint-disable es/no-symbol -- required for testing */
  var NATIVE_SYMBOL$2 = nativeSymbol;
  var useSymbolAsUid = NATIVE_SYMBOL$2 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

  var global$f = global$q;
  var shared$1 = shared$5.exports;
  var has$9 = has$f;
  var uid$2 = uid$4;
  var NATIVE_SYMBOL$1 = nativeSymbol;
  var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
  var WellKnownSymbolsStore$1 = shared$1('wks');
  var Symbol$1 = global$f.Symbol;
  var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$2;

  var wellKnownSymbol$o = function (name) {
    if (!has$9(WellKnownSymbolsStore$1, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore$1[name] == 'string')) {
      if (NATIVE_SYMBOL$1 && has$9(Symbol$1, name)) {
        WellKnownSymbolsStore$1[name] = Symbol$1[name];
      } else {
        WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
      }
    }

    return WellKnownSymbolsStore$1[name];
  };

  var redefine$8 = redefine$a.exports;
  var regexpExec$2 = regexpExec$3;
  var fails$k = fails$t;
  var wellKnownSymbol$n = wellKnownSymbol$o;
  var createNonEnumerableProperty$8 = createNonEnumerableProperty$d;
  var SPECIES$5 = wellKnownSymbol$n('species');
  var RegExpPrototype$2 = RegExp.prototype;

  var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
    var SYMBOL = wellKnownSymbol$n(KEY);
    var DELEGATES_TO_SYMBOL = !fails$k(function () {
      // String methods call symbol-named RegEp methods
      var O = {};

      O[SYMBOL] = function () {
        return 7;
      };

      return ''[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$k(function () {
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
      var nativeRegExpMethod = /./[SYMBOL];
      var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
        var $exec = regexp.exec;

        if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return {
              done: true,
              value: nativeRegExpMethod.call(regexp, str, arg2)
            };
          }

          return {
            done: true,
            value: nativeMethod.call(str, regexp, arg2)
          };
        }

        return {
          done: false
        };
      });
      redefine$8(String.prototype, KEY, methods[0]);
      redefine$8(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty$8(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  var isObject$9 = isObject$e;
  var classof$6 = classofRaw$1;
  var wellKnownSymbol$m = wellKnownSymbol$o;
  var MATCH$2 = wellKnownSymbol$m('match'); // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp

  var isRegexp = function (it) {
    var isRegExp;
    return isObject$9(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$6(it) == 'RegExp');
  };

  var aFunction$4 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    }

    return it;
  };

  var anObject$7 = anObject$d;
  var aFunction$3 = aFunction$4;
  var wellKnownSymbol$l = wellKnownSymbol$o;
  var SPECIES$4 = wellKnownSymbol$l('species'); // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor

  var speciesConstructor$6 = function (O, defaultConstructor) {
    var C = anObject$7(O).constructor;
    var S;
    return C === undefined || (S = anObject$7(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction$3(S);
  };

  var toInteger$5 = toInteger$8;
  var requireObjectCoercible$6 = requireObjectCoercible$9; // `String.prototype.{ codePointAt, at }` methods implementation

  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible$6($this));
      var position = toInteger$5(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
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

  var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex

  var advanceStringIndex$3 = function (S, index, unicode) {
    return index + (unicode ? charAt(S, index).length : 1);
  };

  var classof$5 = classofRaw$1;
  var regexpExec$1 = regexpExec$3; // `RegExpExec` abstract operation
  // https://tc39.es/ecma262/#sec-regexpexec

  var regexpExecAbstract = function (R, S) {
    var exec = R.exec;

    if (typeof exec === 'function') {
      var result = exec.call(R, S);

      if (typeof result !== 'object') {
        throw TypeError('RegExp exec method returned something other than an Object or null');
      }

      return result;
    }

    if (classof$5(R) !== 'RegExp') {
      throw TypeError('RegExp#exec called on incompatible receiver');
    }

    return regexpExec$1.call(R, S);
  };

  var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
  var isRegExp$2 = isRegexp;
  var anObject$6 = anObject$d;
  var requireObjectCoercible$5 = requireObjectCoercible$9;
  var speciesConstructor$5 = speciesConstructor$6;
  var advanceStringIndex$2 = advanceStringIndex$3;
  var toLength$i = toLength$k;
  var callRegExpExec = regexpExecAbstract;
  var regexpExec = regexpExec$3;
  var stickyHelpers$1 = regexpStickyHelpers;
  var fails$j = fails$t;
  var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
  var arrayPush = [].push;
  var min$4 = Math.min;
  var MAX_UINT32 = 0xFFFFFFFF; // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper

  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$j(function () {
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
    'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-assertion-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible$5(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

        if (!isRegExp$2(separator)) {
          return nativeSplit.call(string, separator, lim);
        }

        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
        var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;

        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;

          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }

          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }

        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));

        return output.length > lim ? output.slice(0, lim) : output;
      }; // Chakra, V8

    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [// `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$5(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
    }, // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var res = maybeCallNative(internalSplit, this, string, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;
      var rx = anObject$6(this);
      var S = String(string);
      var C = speciesConstructor$5(rx, RegExp);
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
        var z = callRegExpExec(splitter, UNSUPPORTED_Y$1 ? S.slice(q) : S);
        var e;

        if (z === null || (e = min$4(toLength$i(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p) {
          q = advanceStringIndex$2(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;

          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }

          q = p = e;
        }
      }

      A.push(S.slice(p));
      return A;
    }];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

  var wellKnownSymbol$k = wellKnownSymbol$o;
  var create$2 = objectCreate;
  var definePropertyModule$4 = objectDefineProperty;
  var UNSCOPABLES = wellKnownSymbol$k('unscopables');
  var ArrayPrototype$1 = Array.prototype; // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    definePropertyModule$4.f(ArrayPrototype$1, UNSCOPABLES, {
      configurable: true,
      value: create$2(null)
    });
  } // add a key to Array.prototype[@@unscopables]


  var addToUnscopables$2 = function (key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
  };

  var iterators = {};

  var fails$i = fails$t;
  var correctPrototypeGetter = !fails$i(function () {
    function F() {
      /* empty */
    }

    F.prototype.constructor = null; // eslint-disable-next-line es/no-object-getprototypeof -- required for testing

    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var has$8 = has$f;
  var toObject$a = toObject$c;
  var sharedKey$1 = sharedKey$4;
  var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
  var IE_PROTO = sharedKey$1('IE_PROTO');
  var ObjectPrototype$3 = Object.prototype; // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe

  var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
    O = toObject$a(O);
    if (has$8(O, IE_PROTO)) return O[IE_PROTO];

    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    }

    return O instanceof Object ? ObjectPrototype$3 : null;
  };

  var fails$h = fails$t;
  var getPrototypeOf$3 = objectGetPrototypeOf;
  var createNonEnumerableProperty$7 = createNonEnumerableProperty$d;
  var has$7 = has$f;
  var wellKnownSymbol$j = wellKnownSymbol$o;
  var ITERATOR$5 = wellKnownSymbol$j('iterator');
  var BUGGY_SAFARI_ITERATORS$1 = false;

  var returnThis$2 = function () {
    return this;
  }; // `%IteratorPrototype%` object
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

  var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$h(function () {
    var test = {}; // FF44- legacy iterators case

    return IteratorPrototype$2[ITERATOR$5].call(test) !== test;
  });
  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {}; // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator

  if (!has$7(IteratorPrototype$2, ITERATOR$5)) {
    createNonEnumerableProperty$7(IteratorPrototype$2, ITERATOR$5, returnThis$2);
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
  };

  var defineProperty$5 = objectDefineProperty.f;
  var has$6 = has$f;
  var wellKnownSymbol$i = wellKnownSymbol$o;
  var TO_STRING_TAG$3 = wellKnownSymbol$i('toStringTag');

  var setToStringTag$4 = function (it, TAG, STATIC) {
    if (it && !has$6(it = STATIC ? it : it.prototype, TO_STRING_TAG$3)) {
      defineProperty$5(it, TO_STRING_TAG$3, {
        configurable: true,
        value: TAG
      });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
  var create$1 = objectCreate;
  var createPropertyDescriptor$3 = createPropertyDescriptor$6;
  var setToStringTag$3 = setToStringTag$4;
  var Iterators$4 = iterators;

  var returnThis$1 = function () {
    return this;
  };

  var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
      next: createPropertyDescriptor$3(1, next)
    });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
    Iterators$4[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var isObject$8 = isObject$e;

  var aPossiblePrototype$1 = function (it) {
    if (!isObject$8(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    }

    return it;
  };

  /* eslint-disable no-proto -- safe */
  var anObject$5 = anObject$d;
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
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) {
      /* empty */
    }

    return function setPrototypeOf(O, proto) {
      anObject$5(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var $$h = _export;
  var createIteratorConstructor = createIteratorConstructor$1;
  var getPrototypeOf$2 = objectGetPrototypeOf;
  var setPrototypeOf$4 = objectSetPrototypeOf;
  var setToStringTag$2 = setToStringTag$4;
  var createNonEnumerableProperty$6 = createNonEnumerableProperty$d;
  var redefine$7 = redefine$a.exports;
  var wellKnownSymbol$h = wellKnownSymbol$o;
  var Iterators$3 = iterators;
  var IteratorsCore = iteratorsCore;
  var IteratorPrototype = IteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol$h('iterator');
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
    var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY; // fix native

    if (anyNativeIterator) {
      CurrentIteratorPrototype = getPrototypeOf$2(anyNativeIterator.call(new Iterable()));

      if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if (getPrototypeOf$2(CurrentIteratorPrototype) !== IteratorPrototype) {
          if (setPrototypeOf$4) {
            setPrototypeOf$4(CurrentIteratorPrototype, IteratorPrototype);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
            createNonEnumerableProperty$6(CurrentIteratorPrototype, ITERATOR$4, returnThis);
          }
        } // Set @@toStringTag to native iterators


        setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    } // fix Array.prototype.{ values, @@iterator }.name in V8 / FF


    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;

      defaultIterator = function values() {
        return nativeIterator.call(this);
      };
    } // define iterator


    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
      createNonEnumerableProperty$6(IterablePrototype, ITERATOR$4, defaultIterator);
    }

    Iterators$3[NAME] = defaultIterator; // export additional methods

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
      } else $$h({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
      }, methods);
    }

    return methods;
  };

  var toIndexedObject$4 = toIndexedObject$8;
  var addToUnscopables$1 = addToUnscopables$2;
  var Iterators$2 = iterators;
  var InternalStateModule$3 = internalState;
  var defineIterator = defineIterator$1;
  var ARRAY_ITERATOR = 'Array Iterator';
  var setInternalState$3 = InternalStateModule$3.set;
  var getInternalState$3 = InternalStateModule$3.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
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
      target: toIndexedObject$4(iterated),
      // target
      index: 0,
      // next index
      kind: kind // kind

    }); // `%ArrayIteratorPrototype%.next` method
    // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  }, function () {
    var state = getInternalState$3(this);
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

  Iterators$2.Arguments = Iterators$2.Array; // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

  addToUnscopables$1('keys');
  addToUnscopables$1('values');
  addToUnscopables$1('entries');

  var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

  var redefine$6 = redefine$a.exports;

  var redefineAll$1 = function (target, src, options) {
    for (var key in src) redefine$6(target, key, src[key], options);

    return target;
  };

  var anInstance$2 = function (it, Constructor, name) {
    if (!(it instanceof Constructor)) {
      throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
    }

    return it;
  };

  var toInteger$4 = toInteger$8;
  var toLength$h = toLength$k; // `ToIndex` abstract operation
  // https://tc39.es/ecma262/#sec-toindex

  var toIndex$2 = function (it) {
    if (it === undefined) return 0;
    var number = toInteger$4(it);
    var length = toLength$h(number);
    if (number !== length) throw RangeError('Wrong length or index');
    return length;
  };

  var abs = Math.abs;
  var pow = Math.pow;
  var floor$3 = Math.floor;
  var log = Math.log;
  var LN2 = Math.LN2;

  var pack = function (number, mantissaLength, bytes) {
    var buffer = new Array(bytes);
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
      exponent = floor$3(log(number) / LN2);

      if (number * (c = pow(2, -exponent)) < 1) {
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

    for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);

    exponent = exponent << mantissaLength | mantissa;
    exponentLength += mantissaLength;

    for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);

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

    for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);

    mantissa = exponent & (1 << -nBits) - 1;
    exponent >>= -nBits;
    nBits += mantissaLength;

    for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);

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

  var toObject$9 = toObject$c;
  var toAbsoluteIndex$4 = toAbsoluteIndex$6;
  var toLength$g = toLength$k; // `Array.prototype.fill` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.fill

  var arrayFill$1 = function fill(value
  /* , start = 0, end = @length */
  ) {
    var O = toObject$9(this);
    var length = toLength$g(O.length);
    var argumentsLength = arguments.length;
    var index = toAbsoluteIndex$4(argumentsLength > 1 ? arguments[1] : undefined, length);
    var end = argumentsLength > 2 ? arguments[2] : undefined;
    var endPos = end === undefined ? length : toAbsoluteIndex$4(end, length);

    while (endPos > index) O[index++] = value;

    return O;
  };

  var global$e = global$q;
  var DESCRIPTORS$7 = descriptors;
  var NATIVE_ARRAY_BUFFER$2 = arrayBufferNative;
  var createNonEnumerableProperty$5 = createNonEnumerableProperty$d;
  var redefineAll = redefineAll$1;
  var fails$g = fails$t;
  var anInstance$1 = anInstance$2;
  var toInteger$3 = toInteger$8;
  var toLength$f = toLength$k;
  var toIndex$1 = toIndex$2;
  var IEEE754 = ieee754;
  var getPrototypeOf$1 = objectGetPrototypeOf;
  var setPrototypeOf$3 = objectSetPrototypeOf;
  var getOwnPropertyNames$2 = objectGetOwnPropertyNames.f;
  var defineProperty$4 = objectDefineProperty.f;
  var arrayFill = arrayFill$1;
  var setToStringTag$1 = setToStringTag$4;
  var InternalStateModule$2 = internalState;
  var getInternalState$2 = InternalStateModule$2.get;
  var setInternalState$2 = InternalStateModule$2.set;
  var ARRAY_BUFFER$1 = 'ArrayBuffer';
  var DATA_VIEW = 'DataView';
  var PROTOTYPE$1 = 'prototype';
  var WRONG_LENGTH$1 = 'Wrong length';
  var WRONG_INDEX = 'Wrong index';
  var NativeArrayBuffer$1 = global$e[ARRAY_BUFFER$1];
  var $ArrayBuffer = NativeArrayBuffer$1;
  var $DataView = global$e[DATA_VIEW];
  var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$1];
  var ObjectPrototype$2 = Object.prototype;
  var RangeError$2 = global$e.RangeError;
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
    defineProperty$4(Constructor[PROTOTYPE$1], key, {
      get: function () {
        return getInternalState$2(this)[key];
      }
    });
  };

  var get = function (view, count, index, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$2(view);
    if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
    var bytes = getInternalState$2(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = bytes.slice(start, start + count);
    return isLittleEndian ? pack : pack.reverse();
  };

  var set = function (view, count, index, conversion, value, isLittleEndian) {
    var intIndex = toIndex$1(index);
    var store = getInternalState$2(view);
    if (intIndex + count > store.byteLength) throw RangeError$2(WRONG_INDEX);
    var bytes = getInternalState$2(store.buffer).bytes;
    var start = intIndex + store.byteOffset;
    var pack = conversion(+value);

    for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
  };

  if (!NATIVE_ARRAY_BUFFER$2) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance$1(this, $ArrayBuffer, ARRAY_BUFFER$1);
      var byteLength = toIndex$1(length);
      setInternalState$2(this, {
        bytes: arrayFill.call(new Array(byteLength), 0),
        byteLength: byteLength
      });
      if (!DESCRIPTORS$7) this.byteLength = byteLength;
    };

    $DataView = function DataView(buffer, byteOffset, byteLength) {
      anInstance$1(this, $DataView, DATA_VIEW);
      anInstance$1(buffer, $ArrayBuffer, DATA_VIEW);
      var bufferLength = getInternalState$2(buffer).byteLength;
      var offset = toInteger$3(byteOffset);
      if (offset < 0 || offset > bufferLength) throw RangeError$2('Wrong offset');
      byteLength = byteLength === undefined ? bufferLength - offset : toLength$f(byteLength);
      if (offset + byteLength > bufferLength) throw RangeError$2(WRONG_LENGTH$1);
      setInternalState$2(this, {
        buffer: buffer,
        byteLength: byteLength,
        byteOffset: offset
      });

      if (!DESCRIPTORS$7) {
        this.buffer = buffer;
        this.byteLength = byteLength;
        this.byteOffset = offset;
      }
    };

    if (DESCRIPTORS$7) {
      addGetter$1($ArrayBuffer, 'byteLength');
      addGetter$1($DataView, 'buffer');
      addGetter$1($DataView, 'byteLength');
      addGetter$1($DataView, 'byteOffset');
    }

    redefineAll($DataView[PROTOTYPE$1], {
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
    /* eslint-disable no-new -- required for testing */
    if (!fails$g(function () {
      NativeArrayBuffer$1(1);
    }) || !fails$g(function () {
      new NativeArrayBuffer$1(-1);
    }) || fails$g(function () {
      new NativeArrayBuffer$1();
      new NativeArrayBuffer$1(1.5);
      new NativeArrayBuffer$1(NaN);
      return NativeArrayBuffer$1.name != ARRAY_BUFFER$1;
    })) {
      /* eslint-enable no-new -- required for testing */
      $ArrayBuffer = function ArrayBuffer(length) {
        anInstance$1(this, $ArrayBuffer);
        return new NativeArrayBuffer$1(toIndex$1(length));
      };

      var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$1] = NativeArrayBuffer$1[PROTOTYPE$1];

      for (var keys$1 = getOwnPropertyNames$2(NativeArrayBuffer$1), j = 0, key; keys$1.length > j;) {
        if (!((key = keys$1[j++]) in $ArrayBuffer)) {
          createNonEnumerableProperty$5($ArrayBuffer, key, NativeArrayBuffer$1[key]);
        }
      }

      ArrayBufferPrototype.constructor = $ArrayBuffer;
    } // WebKit bug - the same parent prototype for typed arrays and data view


    if (setPrototypeOf$3 && getPrototypeOf$1($DataViewPrototype) !== ObjectPrototype$2) {
      setPrototypeOf$3($DataViewPrototype, ObjectPrototype$2);
    } // iOS Safari 7.x bug


    var testView = new $DataView(new $ArrayBuffer(2));
    var $setInt8 = $DataViewPrototype.setInt8;
    testView.setInt8(0, 2147483648);
    testView.setInt8(1, 2147483649);
    if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8.call(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint8(byteOffset, value) {
        $setInt8.call(this, byteOffset, value << 24 >> 24);
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

  var $$g = _export;
  var fails$f = fails$t;
  var ArrayBufferModule$2 = arrayBuffer;
  var anObject$4 = anObject$d;
  var toAbsoluteIndex$3 = toAbsoluteIndex$6;
  var toLength$e = toLength$k;
  var speciesConstructor$4 = speciesConstructor$6;
  var ArrayBuffer$4 = ArrayBufferModule$2.ArrayBuffer;
  var DataView$2 = ArrayBufferModule$2.DataView;
  var nativeArrayBufferSlice = ArrayBuffer$4.prototype.slice;
  var INCORRECT_SLICE = fails$f(function () {
    return !new ArrayBuffer$4(2).slice(1, undefined).byteLength;
  }); // `ArrayBuffer.prototype.slice` method
  // https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice

  $$g({
    target: 'ArrayBuffer',
    proto: true,
    unsafe: true,
    forced: INCORRECT_SLICE
  }, {
    slice: function slice(start, end) {
      if (nativeArrayBufferSlice !== undefined && end === undefined) {
        return nativeArrayBufferSlice.call(anObject$4(this), start); // FF fix
      }

      var length = anObject$4(this).byteLength;
      var first = toAbsoluteIndex$3(start, length);
      var fin = toAbsoluteIndex$3(end === undefined ? length : end, length);
      var result = new (speciesConstructor$4(this, ArrayBuffer$4))(toLength$e(fin - first));
      var viewSource = new DataView$2(this);
      var viewTarget = new DataView$2(result);
      var index = 0;

      while (first < fin) {
        viewTarget.setUint8(index++, viewSource.getUint8(first++));
      }

      return result;
    }
  });

  var wellKnownSymbol$g = wellKnownSymbol$o;
  var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');
  var test = {};
  test[TO_STRING_TAG$2] = 'z';
  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
  var classofRaw = classofRaw$1;
  var wellKnownSymbol$f = wellKnownSymbol$o;
  var TO_STRING_TAG$1 = wellKnownSymbol$f('toStringTag'); // ES3 wrong here

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


  var classof$4 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
  var classof$3 = classof$4; // `Object.prototype.toString` method implementation
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
    return '[object ' + classof$3(this) + ']';
  };

  var TO_STRING_TAG_SUPPORT = toStringTagSupport;
  var redefine$5 = redefine$a.exports;
  var toString$1 = objectToString; // `Object.prototype.toString` method
  // https://tc39.es/ecma262/#sec-object.prototype.tostring

  if (!TO_STRING_TAG_SUPPORT) {
    redefine$5(Object.prototype, 'toString', toString$1, {
      unsafe: true
    });
  }

  var typedArrayConstructor = {exports: {}};

  var wellKnownSymbol$e = wellKnownSymbol$o;
  var ITERATOR$3 = wellKnownSymbol$e('iterator');
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

    iteratorWithReturn[ITERATOR$3] = function () {
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

      object[ITERATOR$3] = function () {
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
  var DESCRIPTORS$6 = descriptors;
  var global$d = global$q;
  var isObject$7 = isObject$e;
  var has$5 = has$f;
  var classof$2 = classof$4;
  var createNonEnumerableProperty$4 = createNonEnumerableProperty$d;
  var redefine$4 = redefine$a.exports;
  var defineProperty$3 = objectDefineProperty.f;
  var getPrototypeOf = objectGetPrototypeOf;
  var setPrototypeOf$2 = objectSetPrototypeOf;
  var wellKnownSymbol$d = wellKnownSymbol$o;
  var uid$1 = uid$4;
  var Int8Array$3 = global$d.Int8Array;
  var Int8ArrayPrototype = Int8Array$3 && Int8Array$3.prototype;
  var Uint8ClampedArray = global$d.Uint8ClampedArray;
  var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
  var TypedArray$1 = Int8Array$3 && getPrototypeOf(Int8Array$3);
  var TypedArrayPrototype$1 = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
  var ObjectPrototype$1 = Object.prototype;
  var isPrototypeOf = ObjectPrototype$1.isPrototypeOf;
  var TO_STRING_TAG = wellKnownSymbol$d('toStringTag');
  var TYPED_ARRAY_TAG$1 = uid$1('TYPED_ARRAY_TAG'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

  var NATIVE_ARRAY_BUFFER_VIEWS$3 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$2 && classof$2(global$d.opera) !== 'Opera';
  var TYPED_ARRAY_TAG_REQIRED = false;
  var NAME;
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
    var klass = classof$2(it);
    return klass === 'DataView' || has$5(TypedArrayConstructorsList, klass) || has$5(BigIntArrayConstructorsList, klass);
  };

  var isTypedArray$1 = function (it) {
    if (!isObject$7(it)) return false;
    var klass = classof$2(it);
    return has$5(TypedArrayConstructorsList, klass) || has$5(BigIntArrayConstructorsList, klass);
  };

  var aTypedArray$m = function (it) {
    if (isTypedArray$1(it)) return it;
    throw TypeError('Target is not a typed array');
  };

  var aTypedArrayConstructor$5 = function (C) {
    if (setPrototypeOf$2) {
      if (isPrototypeOf.call(TypedArray$1, C)) return C;
    } else for (var ARRAY in TypedArrayConstructorsList) if (has$5(TypedArrayConstructorsList, NAME)) {
      var TypedArrayConstructor = global$d[ARRAY];

      if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
        return C;
      }
    }

    throw TypeError('Target is not a typed array constructor');
  };

  var exportTypedArrayMethod$n = function (KEY, property, forced) {
    if (!DESCRIPTORS$6) return;
    if (forced) for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global$d[ARRAY];
      if (TypedArrayConstructor && has$5(TypedArrayConstructor.prototype, KEY)) try {
        delete TypedArrayConstructor.prototype[KEY];
      } catch (error) {
        /* empty */
      }
    }

    if (!TypedArrayPrototype$1[KEY] || forced) {
      redefine$4(TypedArrayPrototype$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && Int8ArrayPrototype[KEY] || property);
    }
  };

  var exportTypedArrayStaticMethod = function (KEY, property, forced) {
    var ARRAY, TypedArrayConstructor;
    if (!DESCRIPTORS$6) return;

    if (setPrototypeOf$2) {
      if (forced) for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global$d[ARRAY];
        if (TypedArrayConstructor && has$5(TypedArrayConstructor, KEY)) try {
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
      TypedArrayConstructor = global$d[ARRAY];

      if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
        redefine$4(TypedArrayConstructor, KEY, property);
      }
    }
  };

  for (NAME in TypedArrayConstructorsList) {
    if (!global$d[NAME]) NATIVE_ARRAY_BUFFER_VIEWS$3 = false;
  } // WebKit bug - typed arrays constructors prototype is Object.prototype


  if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || typeof TypedArray$1 != 'function' || TypedArray$1 === Function.prototype) {
    // eslint-disable-next-line no-shadow -- safe
    TypedArray$1 = function TypedArray() {
      throw TypeError('Incorrect invocation');
    };

    if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME in TypedArrayConstructorsList) {
      if (global$d[NAME]) setPrototypeOf$2(global$d[NAME], TypedArray$1);
    }
  }

  if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !TypedArrayPrototype$1 || TypedArrayPrototype$1 === ObjectPrototype$1) {
    TypedArrayPrototype$1 = TypedArray$1.prototype;
    if (NATIVE_ARRAY_BUFFER_VIEWS$3) for (NAME in TypedArrayConstructorsList) {
      if (global$d[NAME]) setPrototypeOf$2(global$d[NAME].prototype, TypedArrayPrototype$1);
    }
  } // WebKit bug - one more object in Uint8ClampedArray prototype chain


  if (NATIVE_ARRAY_BUFFER_VIEWS$3 && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$1) {
    setPrototypeOf$2(Uint8ClampedArrayPrototype, TypedArrayPrototype$1);
  }

  if (DESCRIPTORS$6 && !has$5(TypedArrayPrototype$1, TO_STRING_TAG)) {
    TYPED_ARRAY_TAG_REQIRED = true;
    defineProperty$3(TypedArrayPrototype$1, TO_STRING_TAG, {
      get: function () {
        return isObject$7(this) ? this[TYPED_ARRAY_TAG$1] : undefined;
      }
    });

    for (NAME in TypedArrayConstructorsList) if (global$d[NAME]) {
      createNonEnumerableProperty$4(global$d[NAME], TYPED_ARRAY_TAG$1, NAME);
    }
  }

  var arrayBufferViewCore = {
    NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$3,
    TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG$1,
    aTypedArray: aTypedArray$m,
    aTypedArrayConstructor: aTypedArrayConstructor$5,
    exportTypedArrayMethod: exportTypedArrayMethod$n,
    exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
    isView: isView,
    isTypedArray: isTypedArray$1,
    TypedArray: TypedArray$1,
    TypedArrayPrototype: TypedArrayPrototype$1
  };

  /* eslint-disable no-new -- required for testing */
  var global$c = global$q;
  var fails$e = fails$t;
  var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
  var NATIVE_ARRAY_BUFFER_VIEWS$2 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var ArrayBuffer$3 = global$c.ArrayBuffer;
  var Int8Array$2 = global$c.Int8Array;
  var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$2 || !fails$e(function () {
    Int8Array$2(1);
  }) || !fails$e(function () {
    new Int8Array$2(-1);
  }) || !checkCorrectnessOfIteration(function (iterable) {
    new Int8Array$2();
    new Int8Array$2(null);
    new Int8Array$2(1.5);
    new Int8Array$2(iterable);
  }, true) || fails$e(function () {
    // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
    return new Int8Array$2(new ArrayBuffer$3(2), 1, undefined).length !== 1;
  });

  var toInteger$2 = toInteger$8;

  var toPositiveInteger$1 = function (it) {
    var result = toInteger$2(it);
    if (result < 0) throw RangeError("The argument can't be less than 0");
    return result;
  };

  var toPositiveInteger = toPositiveInteger$1;

  var toOffset$2 = function (it, BYTES) {
    var offset = toPositiveInteger(it);
    if (offset % BYTES) throw RangeError('Wrong offset');
    return offset;
  };

  var classof$1 = classof$4;
  var Iterators$1 = iterators;
  var wellKnownSymbol$c = wellKnownSymbol$o;
  var ITERATOR$2 = wellKnownSymbol$c('iterator');

  var getIteratorMethod$1 = function (it) {
    if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || Iterators$1[classof$1(it)];
  };

  var wellKnownSymbol$b = wellKnownSymbol$o;
  var Iterators = iterators;
  var ITERATOR$1 = wellKnownSymbol$b('iterator');
  var ArrayPrototype = Array.prototype; // check on default Array iterator

  var isArrayIteratorMethod$1 = function (it) {
    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR$1] === it);
  };

  var aFunction$2 = aFunction$4; // optional / simple context binding

  var functionBindContext = function (fn, that, length) {
    aFunction$2(fn);
    if (that === undefined) return fn;

    switch (length) {
      case 0:
        return function () {
          return fn.call(that);
        };

      case 1:
        return function (a) {
          return fn.call(that, a);
        };

      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };

      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }

    return function () {
      return fn.apply(that, arguments);
    };
  };

  var toObject$8 = toObject$c;
  var toLength$d = toLength$k;
  var getIteratorMethod = getIteratorMethod$1;
  var isArrayIteratorMethod = isArrayIteratorMethod$1;
  var bind$1 = functionBindContext;
  var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;

  var typedArrayFrom$1 = function from(source
  /* , mapfn, thisArg */
  ) {
    var O = toObject$8(source);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iteratorMethod = getIteratorMethod(O);
    var i, length, result, step, iterator, next;

    if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
      iterator = iteratorMethod.call(O);
      next = iterator.next;
      O = [];

      while (!(step = next.call(iterator)).done) {
        O.push(step.value);
      }
    }

    if (mapping && argumentsLength > 2) {
      mapfn = bind$1(mapfn, arguments[2], 2);
    }

    length = toLength$d(O.length);
    result = new (aTypedArrayConstructor$4(this))(length);

    for (i = 0; length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }

    return result;
  };

  var isObject$6 = isObject$e;
  var isArray$3 = isArray$5;
  var wellKnownSymbol$a = wellKnownSymbol$o;
  var SPECIES$3 = wellKnownSymbol$a('species'); // `ArraySpeciesCreate` abstract operation
  // https://tc39.es/ecma262/#sec-arrayspeciescreate

  var arraySpeciesCreate$2 = function (originalArray, length) {
    var C;

    if (isArray$3(originalArray)) {
      C = originalArray.constructor; // cross-realm fallback

      if (typeof C == 'function' && (C === Array || isArray$3(C.prototype))) C = undefined;else if (isObject$6(C)) {
        C = C[SPECIES$3];
        if (C === null) C = undefined;
      }
    }

    return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var bind = functionBindContext;
  var IndexedObject$1 = indexedObject;
  var toObject$7 = toObject$c;
  var toLength$c = toLength$k;
  var arraySpeciesCreate$1 = arraySpeciesCreate$2;
  var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation

  var createMethod$2 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var IS_FILTER_OUT = TYPE == 7;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject$7($this);
      var self = IndexedObject$1(O);
      var boundFunction = bind(callbackfn, that, 3);
      var length = toLength$c(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate$1;
      var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
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
              push.call(target, value);
            // filter
          } else switch (TYPE) {
            case 4:
              return false;
            // every

            case 7:
              push.call(target, value);
            // filterOut
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
    // `Array.prototype.filterOut` method
    // https://github.com/tc39/proposal-array-filtering
    filterOut: createMethod$2(7)
  };

  var getBuiltIn$1 = getBuiltIn$5;
  var definePropertyModule$3 = objectDefineProperty;
  var wellKnownSymbol$9 = wellKnownSymbol$o;
  var DESCRIPTORS$5 = descriptors;
  var SPECIES$2 = wellKnownSymbol$9('species');

  var setSpecies$3 = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
    var defineProperty = definePropertyModule$3.f;

    if (DESCRIPTORS$5 && Constructor && !Constructor[SPECIES$2]) {
      defineProperty(Constructor, SPECIES$2, {
        configurable: true,
        get: function () {
          return this;
        }
      });
    }
  };

  var isObject$5 = isObject$e;
  var setPrototypeOf$1 = objectSetPrototypeOf; // makes subclassing work correct for wrapped built-ins

  var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
    var NewTarget, NewTargetPrototype;
    if ( // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject$5(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf$1($this, NewTargetPrototype);
    return $this;
  };

  var $$f = _export;
  var global$b = global$q;
  var DESCRIPTORS$4 = descriptors;
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
  var ArrayBufferViewCore$n = arrayBufferViewCore;
  var ArrayBufferModule$1 = arrayBuffer;
  var anInstance = anInstance$2;
  var createPropertyDescriptor$2 = createPropertyDescriptor$6;
  var createNonEnumerableProperty$3 = createNonEnumerableProperty$d;
  var toLength$b = toLength$k;
  var toIndex = toIndex$2;
  var toOffset$1 = toOffset$2;
  var toPrimitive$2 = toPrimitive$5;
  var has$4 = has$f;
  var classof = classof$4;
  var isObject$4 = isObject$e;
  var create = objectCreate;
  var setPrototypeOf = objectSetPrototypeOf;
  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var typedArrayFrom = typedArrayFrom$1;
  var forEach$2 = arrayIteration.forEach;
  var setSpecies$2 = setSpecies$3;
  var definePropertyModule$2 = objectDefineProperty;
  var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
  var InternalStateModule$1 = internalState;
  var inheritIfRequired$1 = inheritIfRequired$2;
  var getInternalState$1 = InternalStateModule$1.get;
  var setInternalState$1 = InternalStateModule$1.set;
  var nativeDefineProperty$1 = definePropertyModule$2.f;
  var nativeGetOwnPropertyDescriptor$1 = getOwnPropertyDescriptorModule$1.f;
  var round = Math.round;
  var RangeError$1 = global$b.RangeError;
  var ArrayBuffer$2 = ArrayBufferModule$1.ArrayBuffer;
  var DataView$1 = ArrayBufferModule$1.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS$1 = ArrayBufferViewCore$n.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore$n.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore$n.TypedArray;
  var TypedArrayPrototype = ArrayBufferViewCore$n.TypedArrayPrototype;
  var aTypedArrayConstructor$3 = ArrayBufferViewCore$n.aTypedArrayConstructor;
  var isTypedArray = ArrayBufferViewCore$n.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor$3(C))(length);

    while (length > index) result[index] = list[index++];

    return result;
  };

  var addGetter = function (it, key) {
    nativeDefineProperty$1(it, key, {
      get: function () {
        return getInternalState$1(this)[key];
      }
    });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return it instanceof ArrayBuffer$2 || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target) && typeof key != 'symbol' && key in target && String(+key) == String(key);
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    return isTypedArrayIndex(target, key = toPrimitive$2(key, true)) ? createPropertyDescriptor$2(2, target[key]) : nativeGetOwnPropertyDescriptor$1(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    if (isTypedArrayIndex(target, key = toPrimitive$2(key, true)) && isObject$4(descriptor) && has$4(descriptor, 'value') && !has$4(descriptor, 'get') && !has$4(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
    && !descriptor.configurable && (!has$4(descriptor, 'writable') || descriptor.writable) && (!has$4(descriptor, 'enumerable') || descriptor.enumerable)) {
      target[key] = descriptor.value;
      return target;
    }

    return nativeDefineProperty$1(target, key, descriptor);
  };

  if (DESCRIPTORS$4) {
    if (!NATIVE_ARRAY_BUFFER_VIEWS$1) {
      getOwnPropertyDescriptorModule$1.f = wrappedGetOwnPropertyDescriptor;
      definePropertyModule$2.f = wrappedDefineProperty;
      addGetter(TypedArrayPrototype, 'buffer');
      addGetter(TypedArrayPrototype, 'byteOffset');
      addGetter(TypedArrayPrototype, 'byteLength');
      addGetter(TypedArrayPrototype, 'length');
    }

    $$f({
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
      var NativeTypedArrayConstructor = global$b[CONSTRUCTOR_NAME];
      var TypedArrayConstructor = NativeTypedArrayConstructor;
      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
      var exported = {};

      var getter = function (that, index) {
        var data = getInternalState$1(that);
        return data.view[GETTER](index * BYTES + data.byteOffset, true);
      };

      var setter = function (that, index, value) {
        var data = getInternalState$1(that);
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
          anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
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
              byteLength = toLength$b($length) * BYTES;
              if (byteLength + byteOffset > $len) throw RangeError$1(WRONG_LENGTH);
            }

            length = byteLength / BYTES;
          } else if (isTypedArray(data)) {
            return fromList(TypedArrayConstructor, data);
          } else {
            return typedArrayFrom.call(TypedArrayConstructor, data);
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
        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
      } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
          anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
          return inheritIfRequired$1(function () {
            if (!isObject$4(data)) return new NativeTypedArrayConstructor(toIndex(data));
            if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset$1(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
            return typedArrayFrom.call(TypedArrayConstructor, data);
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

      if (TYPED_ARRAY_TAG) {
        createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
      }

      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
      $$f({
        global: true,
        forced: TypedArrayConstructor != NativeTypedArrayConstructor,
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
  } else typedArrayConstructor.exports = function () {
    /* empty */
  };

  var createTypedArrayConstructor$1 = typedArrayConstructor.exports; // `Uint8Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects

  createTypedArrayConstructor$1('Uint8', function (init) {
    return function Uint8Array(data, byteOffset, length) {
      return init(this, data, byteOffset, length);
    };
  });

  var toObject$6 = toObject$c;
  var toAbsoluteIndex$2 = toAbsoluteIndex$6;
  var toLength$a = toLength$k;
  var min$3 = Math.min; // `Array.prototype.copyWithin` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.copywithin
  // eslint-disable-next-line es/no-array-prototype-copywithin -- safe

  var arrayCopyWithin = [].copyWithin || function copyWithin(target
  /* = 0 */
  , start
  /* = 0, end = @length */
  ) {
    var O = toObject$6(this);
    var len = toLength$a(O.length);
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

  var ArrayBufferViewCore$m = arrayBufferViewCore;
  var $copyWithin = arrayCopyWithin;
  var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
  var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod; // `%TypedArray%.prototype.copyWithin` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin

  exportTypedArrayMethod$m('copyWithin', function copyWithin(target, start
  /* , end */
  ) {
    return $copyWithin.call(aTypedArray$l(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
  });

  var ArrayBufferViewCore$l = arrayBufferViewCore;
  var $every$1 = arrayIteration.every;
  var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
  var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod; // `%TypedArray%.prototype.every` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every

  exportTypedArrayMethod$l('every', function every(callbackfn
  /* , thisArg */
  ) {
    return $every$1(aTypedArray$k(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$k = arrayBufferViewCore;
  var $fill = arrayFill$1;
  var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
  var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod; // `%TypedArray%.prototype.fill` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
  // eslint-disable-next-line no-unused-vars -- required for `.length`

  exportTypedArrayMethod$k('fill', function fill(value
  /* , start, end */
  ) {
    return $fill.apply(aTypedArray$j(this), arguments);
  });

  var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
  var speciesConstructor$3 = speciesConstructor$6;

  var typedArrayFromSpeciesAndList = function (instance, list) {
    var C = speciesConstructor$3(instance, instance.constructor);
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor$2(C))(length);

    while (length > index) result[index] = list[index++];

    return result;
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
  var $indexOf$1 = arrayIncludes.indexOf;
  var aTypedArray$d = ArrayBufferViewCore$e.aTypedArray;
  var exportTypedArrayMethod$e = ArrayBufferViewCore$e.exportTypedArrayMethod; // `%TypedArray%.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof

  exportTypedArrayMethod$e('indexOf', function indexOf(searchElement
  /* , fromIndex */
  ) {
    return $indexOf$1(aTypedArray$d(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
  });

  var global$a = global$q;
  var ArrayBufferViewCore$d = arrayBufferViewCore;
  var ArrayIterators = es_array_iterator;
  var wellKnownSymbol$8 = wellKnownSymbol$o;
  var ITERATOR = wellKnownSymbol$8('iterator');
  var Uint8Array$2 = global$a.Uint8Array;
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var aTypedArray$c = ArrayBufferViewCore$d.aTypedArray;
  var exportTypedArrayMethod$d = ArrayBufferViewCore$d.exportTypedArrayMethod;
  var nativeTypedArrayIterator = Uint8Array$2 && Uint8Array$2.prototype[ITERATOR];
  var CORRECT_ITER_NAME = !!nativeTypedArrayIterator && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

  var typedArrayValues = function values() {
    return arrayValues.call(aTypedArray$c(this));
  }; // `%TypedArray%.prototype.entries` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries


  exportTypedArrayMethod$d('entries', function entries() {
    return arrayEntries.call(aTypedArray$c(this));
  }); // `%TypedArray%.prototype.keys` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys

  exportTypedArrayMethod$d('keys', function keys() {
    return arrayKeys.call(aTypedArray$c(this));
  }); // `%TypedArray%.prototype.values` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values

  exportTypedArrayMethod$d('values', typedArrayValues, !CORRECT_ITER_NAME); // `%TypedArray%.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator

  exportTypedArrayMethod$d(ITERATOR, typedArrayValues, !CORRECT_ITER_NAME);

  var ArrayBufferViewCore$c = arrayBufferViewCore;
  var aTypedArray$b = ArrayBufferViewCore$c.aTypedArray;
  var exportTypedArrayMethod$c = ArrayBufferViewCore$c.exportTypedArrayMethod;
  var $join = [].join; // `%TypedArray%.prototype.join` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
  // eslint-disable-next-line no-unused-vars -- required for `.length`

  exportTypedArrayMethod$c('join', function join(separator) {
    return $join.apply(aTypedArray$b(this), arguments);
  });

  var fails$d = fails$t;

  var arrayMethodIsStrict$4 = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails$d(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
      method.call(null, argument || function () {
        throw 1;
      }, 1);
    });
  };

  /* eslint-disable es/no-array-prototype-lastindexof -- safe */


  var toIndexedObject$3 = toIndexedObject$8;
  var toInteger$1 = toInteger$8;
  var toLength$9 = toLength$k;
  var arrayMethodIsStrict$3 = arrayMethodIsStrict$4;
  var min$2 = Math.min;
  var $lastIndexOf$1 = [].lastIndexOf;
  var NEGATIVE_ZERO$1 = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
  var STRICT_METHOD$3 = arrayMethodIsStrict$3('lastIndexOf');
  var FORCED$6 = NEGATIVE_ZERO$1 || !STRICT_METHOD$3; // `Array.prototype.lastIndexOf` method implementation
  // https://tc39.es/ecma262/#sec-array.prototype.lastindexof

  var arrayLastIndexOf = FORCED$6 ? function lastIndexOf(searchElement
  /* , fromIndex = @[*-1] */
  ) {
    // convert -0 to +0
    if (NEGATIVE_ZERO$1) return $lastIndexOf$1.apply(this, arguments) || 0;
    var O = toIndexedObject$3(this);
    var length = toLength$9(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = min$2(index, toInteger$1(arguments[1]));
    if (index < 0) index = length + index;

    for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;

    return -1;
  } : $lastIndexOf$1;

  var ArrayBufferViewCore$b = arrayBufferViewCore;
  var $lastIndexOf = arrayLastIndexOf;
  var aTypedArray$a = ArrayBufferViewCore$b.aTypedArray;
  var exportTypedArrayMethod$b = ArrayBufferViewCore$b.exportTypedArrayMethod; // `%TypedArray%.prototype.lastIndexOf` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
  // eslint-disable-next-line no-unused-vars -- required for `.length`

  exportTypedArrayMethod$b('lastIndexOf', function lastIndexOf(searchElement
  /* , fromIndex */
  ) {
    return $lastIndexOf.apply(aTypedArray$a(this), arguments);
  });

  var ArrayBufferViewCore$a = arrayBufferViewCore;
  var $map = arrayIteration.map;
  var speciesConstructor$2 = speciesConstructor$6;
  var aTypedArray$9 = ArrayBufferViewCore$a.aTypedArray;
  var aTypedArrayConstructor$1 = ArrayBufferViewCore$a.aTypedArrayConstructor;
  var exportTypedArrayMethod$a = ArrayBufferViewCore$a.exportTypedArrayMethod; // `%TypedArray%.prototype.map` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map

  exportTypedArrayMethod$a('map', function map(mapfn
  /* , thisArg */
  ) {
    return $map(aTypedArray$9(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
      return new (aTypedArrayConstructor$1(speciesConstructor$2(O, O.constructor)))(length);
    });
  });

  var aFunction$1 = aFunction$4;
  var toObject$5 = toObject$c;
  var IndexedObject = indexedObject;
  var toLength$8 = toLength$k; // `Array.prototype.{ reduce, reduceRight }` methods implementation

  var createMethod$1 = function (IS_RIGHT) {
    return function (that, callbackfn, argumentsLength, memo) {
      aFunction$1(callbackfn);
      var O = toObject$5(that);
      var self = IndexedObject(O);
      var length = toLength$8(O.length);
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
          throw TypeError('Reduce of empty array with no initial value');
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
    return $reduce(aTypedArray$8(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  });

  var ArrayBufferViewCore$8 = arrayBufferViewCore;
  var $reduceRight = arrayReduce.right;
  var aTypedArray$7 = ArrayBufferViewCore$8.aTypedArray;
  var exportTypedArrayMethod$8 = ArrayBufferViewCore$8.exportTypedArrayMethod; // `%TypedArray%.prototype.reduceRicht` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright

  exportTypedArrayMethod$8('reduceRight', function reduceRight(callbackfn
  /* , initialValue */
  ) {
    return $reduceRight(aTypedArray$7(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
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

  var ArrayBufferViewCore$6 = arrayBufferViewCore;
  var toLength$7 = toLength$k;
  var toOffset = toOffset$2;
  var toObject$4 = toObject$c;
  var fails$c = fails$t;
  var aTypedArray$5 = ArrayBufferViewCore$6.aTypedArray;
  var exportTypedArrayMethod$6 = ArrayBufferViewCore$6.exportTypedArrayMethod;
  var FORCED$5 = fails$c(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).set({});
  }); // `%TypedArray%.prototype.set` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set

  exportTypedArrayMethod$6('set', function set(arrayLike
  /* , offset */
  ) {
    aTypedArray$5(this);
    var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
    var length = this.length;
    var src = toObject$4(arrayLike);
    var len = toLength$7(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError('Wrong length');

    while (index < len) this[offset + index] = src[index++];
  }, FORCED$5);

  var ArrayBufferViewCore$5 = arrayBufferViewCore;
  var speciesConstructor$1 = speciesConstructor$6;
  var fails$b = fails$t;
  var aTypedArray$4 = ArrayBufferViewCore$5.aTypedArray;
  var aTypedArrayConstructor = ArrayBufferViewCore$5.aTypedArrayConstructor;
  var exportTypedArrayMethod$5 = ArrayBufferViewCore$5.exportTypedArrayMethod;
  var $slice$1 = [].slice;
  var FORCED$4 = fails$b(function () {
    // eslint-disable-next-line es/no-typed-arrays -- required for testing
    new Int8Array(1).slice();
  }); // `%TypedArray%.prototype.slice` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice

  exportTypedArrayMethod$5('slice', function slice(start, end) {
    var list = $slice$1.call(aTypedArray$4(this), start, end);
    var C = speciesConstructor$1(this, this.constructor);
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor(C))(length);

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

  var floor$1 = Math.floor;

  var mergeSort = function (array, comparefn) {
    var length = array.length;
    var middle = floor$1(length / 2);
    return length < 8 ? insertionSort(array, comparefn) : merge(mergeSort(array.slice(0, middle), comparefn), mergeSort(array.slice(middle), comparefn), comparefn);
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

  var merge = function (left, right, comparefn) {
    var llength = left.length;
    var rlength = right.length;
    var lindex = 0;
    var rindex = 0;
    var result = [];

    while (lindex < llength || rindex < rlength) {
      if (lindex < llength && rindex < rlength) {
        result.push(comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]);
      } else {
        result.push(lindex < llength ? left[lindex++] : right[rindex++]);
      }
    }

    return result;
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

  var ArrayBufferViewCore$3 = arrayBufferViewCore;
  var global$9 = global$q;
  var fails$a = fails$t;
  var aFunction = aFunction$4;
  var toLength$6 = toLength$k;
  var internalSort = arraySort;
  var FF = engineFfVersion;
  var IE_OR_EDGE = engineIsIeOrEdge;
  var V8 = engineV8Version;
  var WEBKIT = engineWebkitVersion;
  var aTypedArray$2 = ArrayBufferViewCore$3.aTypedArray;
  var exportTypedArrayMethod$3 = ArrayBufferViewCore$3.exportTypedArrayMethod;
  var Uint16Array$1 = global$9.Uint16Array;
  var nativeSort = Uint16Array$1 && Uint16Array$1.prototype.sort; // WebKit

  var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !fails$a(function () {
    var array = new Uint16Array$1(2);
    array.sort(null);
    array.sort({});
  });
  var STABLE_SORT = !!nativeSort && !fails$a(function () {
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

    array.sort(function (a, b) {
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
    var array = this;
    if (comparefn !== undefined) aFunction(comparefn);
    if (STABLE_SORT) return nativeSort.call(array, comparefn);
    aTypedArray$2(array);
    var arrayLength = toLength$6(array.length);
    var items = Array(arrayLength);
    var index;

    for (index = 0; index < arrayLength; index++) {
      items[index] = array[index];
    }

    items = internalSort(array, getSortCompare(comparefn));

    for (index = 0; index < arrayLength; index++) {
      array[index] = items[index];
    }

    return array;
  }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);

  var ArrayBufferViewCore$2 = arrayBufferViewCore;
  var toLength$5 = toLength$k;
  var toAbsoluteIndex$1 = toAbsoluteIndex$6;
  var speciesConstructor = speciesConstructor$6;
  var aTypedArray$1 = ArrayBufferViewCore$2.aTypedArray;
  var exportTypedArrayMethod$2 = ArrayBufferViewCore$2.exportTypedArrayMethod; // `%TypedArray%.prototype.subarray` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray

  exportTypedArrayMethod$2('subarray', function subarray(begin, end) {
    var O = aTypedArray$1(this);
    var length = O.length;
    var beginIndex = toAbsoluteIndex$1(begin, length);
    return new (speciesConstructor(O, O.constructor))(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength$5((end === undefined ? length : toAbsoluteIndex$1(end, length)) - beginIndex));
  });

  var global$8 = global$q;
  var ArrayBufferViewCore$1 = arrayBufferViewCore;
  var fails$9 = fails$t;
  var Int8Array$1 = global$8.Int8Array;
  var aTypedArray = ArrayBufferViewCore$1.aTypedArray;
  var exportTypedArrayMethod$1 = ArrayBufferViewCore$1.exportTypedArrayMethod;
  var $toLocaleString = [].toLocaleString;
  var $slice = [].slice; // iOS Safari 6.x fails here

  var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$9(function () {
    $toLocaleString.call(new Int8Array$1(1));
  });
  var FORCED$3 = fails$9(function () {
    return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
  }) || !fails$9(function () {
    Int8Array$1.prototype.toLocaleString.call([1, 2]);
  }); // `%TypedArray%.prototype.toLocaleString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring

  exportTypedArrayMethod$1('toLocaleString', function toLocaleString() {
    return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice.call(aTypedArray(this)) : aTypedArray(this), arguments);
  }, FORCED$3);

  var exportTypedArrayMethod = arrayBufferViewCore.exportTypedArrayMethod;
  var fails$8 = fails$t;
  var global$7 = global$q;
  var Uint8Array$1 = global$7.Uint8Array;
  var Uint8ArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype || {};
  var arrayToString = [].toString;
  var arrayJoin = [].join;

  if (fails$8(function () {
    arrayToString.call({});
  })) {
    arrayToString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString; // `%TypedArray%.prototype.toString` method
  // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring

  exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD);

  var toPrimitive$1 = toPrimitive$5;
  var definePropertyModule$1 = objectDefineProperty;
  var createPropertyDescriptor$1 = createPropertyDescriptor$6;

  var createProperty$2 = function (object, key, value) {
    var propertyKey = toPrimitive$1(key);
    if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor$1(0, value));else object[propertyKey] = value;
  };

  var fails$7 = fails$t;
  var wellKnownSymbol$7 = wellKnownSymbol$o;
  var V8_VERSION$1 = engineV8Version;
  var SPECIES$1 = wellKnownSymbol$7('species');

  var arrayMethodHasSpeciesSupport$2 = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return V8_VERSION$1 >= 51 || !fails$7(function () {
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

  var $$e = _export;
  var isObject$3 = isObject$e;
  var isArray$2 = isArray$5;
  var toAbsoluteIndex = toAbsoluteIndex$6;
  var toLength$4 = toLength$k;
  var toIndexedObject$2 = toIndexedObject$8;
  var createProperty$1 = createProperty$2;
  var wellKnownSymbol$6 = wellKnownSymbol$o;
  var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$2;
  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');
  var SPECIES = wellKnownSymbol$6('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max; // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects

  $$e({
    target: 'Array',
    proto: true,
    forced: !HAS_SPECIES_SUPPORT
  }, {
    slice: function slice(start, end) {
      var O = toIndexedObject$2(this);
      var length = toLength$4(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

      var Constructor, result, n;

      if (isArray$2(O)) {
        Constructor = O.constructor; // cross-realm fallback

        if (typeof Constructor == 'function' && (Constructor === Array || isArray$2(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject$3(Constructor)) {
          Constructor = Constructor[SPECIES];
          if (Constructor === null) Constructor = undefined;
        }

        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }

      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

      for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);

      result.length = n;
      return result;
    }
  });

  var $$d = _export;
  var ArrayBufferViewCore = arrayBufferViewCore;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS; // `ArrayBuffer.isView` method
  // https://tc39.es/ecma262/#sec-arraybuffer.isview

  $$d({
    target: 'ArrayBuffer',
    stat: true,
    forced: !NATIVE_ARRAY_BUFFER_VIEWS
  }, {
    isView: ArrayBufferViewCore.isView
  });

  var $$c = _export;
  var global$6 = global$q;
  var arrayBufferModule = arrayBuffer;
  var setSpecies$1 = setSpecies$3;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var ArrayBuffer$1 = arrayBufferModule[ARRAY_BUFFER];
  var NativeArrayBuffer = global$6[ARRAY_BUFFER]; // `ArrayBuffer` constructor
  // https://tc39.es/ecma262/#sec-arraybuffer-constructor

  $$c({
    global: true,
    forced: NativeArrayBuffer !== ArrayBuffer$1
  }, {
    ArrayBuffer: ArrayBuffer$1
  });
  setSpecies$1(ARRAY_BUFFER);

  var $$b = _export;
  var fails$6 = fails$t;
  var isArray$1 = isArray$5;
  var isObject$2 = isObject$e;
  var toObject$3 = toObject$c;
  var toLength$3 = toLength$k;
  var createProperty = createProperty$2;
  var arraySpeciesCreate = arraySpeciesCreate$2;
  var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$2;
  var wellKnownSymbol$5 = wellKnownSymbol$o;
  var V8_VERSION = engineV8Version;
  var IS_CONCAT_SPREADABLE = wellKnownSymbol$5('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679

  var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$6(function () {
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

  $$b({
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
          len = toLength$3(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }

      A.length = n;
      return A;
    }
  });

  var isRegExp$1 = isRegexp;

  var notARegexp = function (it) {
    if (isRegExp$1(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    }

    return it;
  };

  var wellKnownSymbol$4 = wellKnownSymbol$o;
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

  var $$a = _export;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  var toLength$2 = toLength$k;
  var notARegExp$1 = notARegexp;
  var requireObjectCoercible$4 = requireObjectCoercible$9;
  var correctIsRegExpLogic$1 = correctIsRegexpLogic;

  var $endsWith = ''.endsWith;
  var min$1 = Math.min;
  var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('endsWith'); // https://github.com/zloirock/core-js/pull/702

  var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith');
    return descriptor && !descriptor.writable;
  }(); // `String.prototype.endsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.endswith

  $$a({
    target: 'String',
    proto: true,
    forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
  }, {
    endsWith: function endsWith(searchString
    /* , endPosition = @length */
    ) {
      var that = String(requireObjectCoercible$4(this));
      notARegExp$1(searchString);
      var endPosition = arguments.length > 1 ? arguments[1] : undefined;
      var len = toLength$2(that.length);
      var end = endPosition === undefined ? len : min$1(toLength$2(endPosition), len);
      var search = String(searchString);
      return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
    }
  });

  var $$9 = _export;
  var ArrayBufferModule = arrayBuffer;
  var NATIVE_ARRAY_BUFFER = arrayBufferNative; // `DataView` constructor
  // https://tc39.es/ecma262/#sec-dataview-constructor

  $$9({
    global: true,
    forced: !NATIVE_ARRAY_BUFFER
  }, {
    DataView: ArrayBufferModule.DataView
  });

  var createTypedArrayConstructor = typedArrayConstructor.exports; // `Uint16Array` constructor
  // https://tc39.es/ecma262/#sec-typedarray-objects

  createTypedArrayConstructor('Uint16', function (init) {
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

  var $$8 = _export;
  var forEach$1 = arrayForEach; // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  // eslint-disable-next-line es/no-array-prototype-foreach -- safe

  $$8({
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

  var global$5 = global$q;
  var DOMIterables = domIterables;
  var forEach = arrayForEach;
  var createNonEnumerableProperty$2 = createNonEnumerableProperty$d;

  for (var COLLECTION_NAME in DOMIterables) {
    var Collection = global$5[COLLECTION_NAME];
    var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

    if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
      createNonEnumerableProperty$2(CollectionPrototype, 'forEach', forEach);
    } catch (error) {
      CollectionPrototype.forEach = forEach;
    }
  }

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

  var toObject$2 = toObject$c;
  var floor = Math.floor;
  var replace = ''.replace;
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

    return replace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  };

  var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
  var fails$5 = fails$t;
  var anObject$3 = anObject$d;
  var toLength$1 = toLength$k;
  var toInteger = toInteger$8;
  var requireObjectCoercible$3 = requireObjectCoercible$9;
  var advanceStringIndex$1 = advanceStringIndex$3;
  var getSubstitution = getSubstitution$1;
  var regExpExec$1 = regexpExecAbstract;
  var wellKnownSymbol$3 = wellKnownSymbol$o;
  var REPLACE = wellKnownSymbol$3('replace');
  var max = Math.max;
  var min = Math.min;

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

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$5(function () {
    var re = /./;

    re.exec = function () {
      var result = [];
      result.groups = {
        a: '7'
      };
      return result;
    };

    return ''.replace(re, '$<a>') !== '7';
  }); // @@replace logic

  fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
    return [// `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$3(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
    }, // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      if (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1 && replaceValue.indexOf('$<') === -1) {
        var res = maybeCallNative(nativeReplace, this, string, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject$3(this);
      var S = String(string);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;

      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }

      var results = [];

      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;

      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = []; // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

        var namedCaptures = result.groups;

        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }

        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }

      return accumulatedResult + S.slice(nextSourcePosition);
    }];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var redefine$3 = redefine$a.exports;
  var DatePrototype = Date.prototype;
  var INVALID_DATE = 'Invalid Date';
  var TO_STRING$1 = 'toString';
  var nativeDateToString = DatePrototype[TO_STRING$1];
  var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
  // https://tc39.es/ecma262/#sec-date.prototype.tostring

  if (new Date(NaN) + '' != INVALID_DATE) {
    redefine$3(DatePrototype, TO_STRING$1, function toString() {
      var value = getTime.call(this); // eslint-disable-next-line no-self-compare -- NaN check

      return value === value ? nativeDateToString.call(this) : INVALID_DATE;
    });
  }

  var redefine$2 = redefine$a.exports;
  var anObject$2 = anObject$d;
  var fails$4 = fails$t;
  var flags = regexpFlags$1;
  var TO_STRING = 'toString';
  var RegExpPrototype$1 = RegExp.prototype;
  var nativeToString = RegExpPrototype$1[TO_STRING];
  var NOT_GENERIC = fails$4(function () {
    return nativeToString.call({
      source: 'a',
      flags: 'b'
    }) != '/a/b';
  }); // FF44- RegExp#toString has a wrong name

  var INCORRECT_NAME = nativeToString.name != TO_STRING; // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring

  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine$2(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject$2(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype$1) ? flags.call(R) : rf);
      return '/' + p + '/' + f;
    }, {
      unsafe: true
    });
  }

  var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var requireObjectCoercible$2 = requireObjectCoercible$9;
  var whitespaces$1 = whitespaces$2;
  var whitespace = '[' + whitespaces$1 + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

  var createMethod = function (TYPE) {
    return function ($this) {
      var string = String(requireObjectCoercible$2($this));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
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

  var global$4 = global$q;
  var trim = stringTrim.trim;
  var whitespaces = whitespaces$2;
  var $parseInt = global$4.parseInt;
  var hex = /^[+-]?0[Xx]/;
  var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix

  var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
    var S = trim(String(string));
    return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
  } : $parseInt;

  var $$7 = _export;
  var parseIntImplementation = numberParseInt; // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix

  $$7({
    global: true,
    forced: parseInt != parseIntImplementation
  }, {
    parseInt: parseIntImplementation
  });

  var $$6 = _export;
  var $includes = arrayIncludes.includes;
  var addToUnscopables = addToUnscopables$2; // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes

  $$6({
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


  var $$5 = _export;
  var $indexOf = arrayIncludes.indexOf;
  var arrayMethodIsStrict$1 = arrayMethodIsStrict$4;
  var nativeIndexOf = [].indexOf;
  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict$1('indexOf'); // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof

  $$5({
    target: 'Array',
    proto: true,
    forced: NEGATIVE_ZERO || !STRICT_METHOD$1
  }, {
    indexOf: function indexOf(searchElement
    /* , fromIndex = 0 */
    ) {
      return NEGATIVE_ZERO // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
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

  var DESCRIPTORS$3 = descriptors;
  var objectDefinePropertyModule = objectDefineProperty;
  var regExpFlags = regexpFlags$1;
  var fails$3 = fails$t;
  var FORCED = DESCRIPTORS$3 && fails$3(function () {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call({
      dotAll: true,
      sticky: true
    }) !== 'sy';
  }); // `RegExp.prototype.flags` getter
  // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

  if (FORCED) objectDefinePropertyModule.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: regExpFlags
  });

  var $$4 = _export;
  var notARegExp = notARegexp;
  var requireObjectCoercible$1 = requireObjectCoercible$9;
  var correctIsRegExpLogic = correctIsRegexpLogic; // `String.prototype.includes` method
  // https://tc39.es/ecma262/#sec-string.prototype.includes

  $$4({
    target: 'String',
    proto: true,
    forced: !correctIsRegExpLogic('includes')
  }, {
    includes: function includes(searchString
    /* , position = 0 */
    ) {
      return !!~String(requireObjectCoercible$1(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $$3 = _export;
  var toObject$1 = toObject$c;
  var nativeKeys = objectKeys$2;
  var fails$2 = fails$t;
  var FAILS_ON_PRIMITIVES = fails$2(function () {
    nativeKeys(1);
  }); // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys

  $$3({
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

  var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
  var anObject$1 = anObject$d;
  var toLength = toLength$k;
  var requireObjectCoercible = requireObjectCoercible$9;
  var advanceStringIndex = advanceStringIndex$3;
  var regExpExec = regexpExecAbstract; // @@match logic

  fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [// `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }, // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var res = maybeCallNative(nativeMatch, this, string);
      if (res.done) return res.value;
      var rx = anObject$1(this);
      var S = String(string);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;

      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }

      return n === 0 ? null : A;
    }];
  });

  var objectGetOwnPropertyNamesExternal = {};

  /* eslint-disable es/no-object-getownpropertynames -- safe */
  var toIndexedObject$1 = toIndexedObject$8;
  var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
  var toString = {}.toString;
  var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

  var getWindowNames = function (it) {
    try {
      return $getOwnPropertyNames$1(it);
    } catch (error) {
      return windowNames.slice();
    }
  }; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


  objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
    return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$1(it));
  };

  var wellKnownSymbolWrapped = {};

  var wellKnownSymbol$2 = wellKnownSymbol$o;
  wellKnownSymbolWrapped.f = wellKnownSymbol$2;

  var path = path$2;
  var has$3 = has$f;
  var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
  var defineProperty$2 = objectDefineProperty.f;

  var defineWellKnownSymbol$1 = function (NAME) {
    var Symbol = path.Symbol || (path.Symbol = {});
    if (!has$3(Symbol, NAME)) defineProperty$2(Symbol, NAME, {
      value: wrappedWellKnownSymbolModule$1.f(NAME)
    });
  };

  var $$2 = _export;
  var global$3 = global$q;
  var getBuiltIn = getBuiltIn$5;
  var DESCRIPTORS$2 = descriptors;
  var NATIVE_SYMBOL = nativeSymbol;
  var USE_SYMBOL_AS_UID = useSymbolAsUid;
  var fails$1 = fails$t;
  var has$2 = has$f;
  var isArray = isArray$5;
  var isObject$1 = isObject$e;
  var anObject = anObject$d;
  var toObject = toObject$c;
  var toIndexedObject = toIndexedObject$8;
  var toPrimitive = toPrimitive$5;
  var createPropertyDescriptor = createPropertyDescriptor$6;
  var nativeObjectCreate = objectCreate;
  var objectKeys = objectKeys$2;
  var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
  var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
  var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
  var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
  var definePropertyModule = objectDefineProperty;
  var propertyIsEnumerableModule = objectPropertyIsEnumerable;
  var createNonEnumerableProperty$1 = createNonEnumerableProperty$d;
  var redefine$1 = redefine$a.exports;
  var shared = shared$5.exports;
  var sharedKey = sharedKey$4;
  var hiddenKeys = hiddenKeys$5;
  var uid = uid$4;
  var wellKnownSymbol$1 = wellKnownSymbol$o;
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
  var getInternalState = InternalStateModule.getterFor(SYMBOL);
  var ObjectPrototype = Object[PROTOTYPE];
  var $Symbol = global$3.Symbol;
  var $stringify = getBuiltIn('JSON', 'stringify');
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
  var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
  var AllSymbols = shared('symbols');
  var ObjectPrototypeSymbols = shared('op-symbols');
  var StringToSymbolRegistry = shared('string-to-symbol-registry');
  var SymbolToStringRegistry = shared('symbol-to-string-registry');
  var WellKnownSymbolsStore = shared('wks');
  var QObject = global$3.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

  var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

  var setSymbolDescriptor = DESCRIPTORS$2 && fails$1(function () {
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
    var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
    setInternalState(symbol, {
      type: SYMBOL,
      tag: tag,
      description: description
    });
    if (!DESCRIPTORS$2) symbol.description = description;
    return symbol;
  };

  var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    return Object(it) instanceof $Symbol;
  };

  var $defineProperty = function defineProperty(O, P, Attributes) {
    if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
    anObject(O);
    var key = toPrimitive(P, true);
    anObject(Attributes);

    if (has$2(AllSymbols, key)) {
      if (!Attributes.enumerable) {
        if (!has$2(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
        O[HIDDEN][key] = true;
      } else {
        if (has$2(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
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
      if (!DESCRIPTORS$2 || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
    });
    return O;
  };

  var $create = function create(O, Properties) {
    return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
  };

  var $propertyIsEnumerable = function propertyIsEnumerable(V) {
    var P = toPrimitive(V, true);
    var enumerable = nativePropertyIsEnumerable.call(this, P);
    if (this === ObjectPrototype && has$2(AllSymbols, P) && !has$2(ObjectPrototypeSymbols, P)) return false;
    return enumerable || !has$2(this, P) || !has$2(AllSymbols, P) || has$2(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
  };

  var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
    var it = toIndexedObject(O);
    var key = toPrimitive(P, true);
    if (it === ObjectPrototype && has$2(AllSymbols, key) && !has$2(ObjectPrototypeSymbols, key)) return;
    var descriptor = nativeGetOwnPropertyDescriptor(it, key);

    if (descriptor && has$2(AllSymbols, key) && !(has$2(it, HIDDEN) && it[HIDDEN][key])) {
      descriptor.enumerable = true;
    }

    return descriptor;
  };

  var $getOwnPropertyNames = function getOwnPropertyNames(O) {
    var names = nativeGetOwnPropertyNames(toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (!has$2(AllSymbols, key) && !has$2(hiddenKeys, key)) result.push(key);
    });
    return result;
  };

  var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
    var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
    var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
    var result = [];
    $forEach(names, function (key) {
      if (has$2(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$2(ObjectPrototype, key))) {
        result.push(AllSymbols[key]);
      }
    });
    return result;
  }; // `Symbol` constructor
  // https://tc39.es/ecma262/#sec-symbol-constructor


  if (!NATIVE_SYMBOL) {
    $Symbol = function Symbol() {
      if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
      var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
      var tag = uid(description);

      var setter = function (value) {
        if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
        if (has$2(this, HIDDEN) && has$2(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
        setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
      };

      if (DESCRIPTORS$2 && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
        configurable: true,
        set: setter
      });
      return wrap(tag, description);
    };

    redefine$1($Symbol[PROTOTYPE], 'toString', function toString() {
      return getInternalState(this).tag;
    });
    redefine$1($Symbol, 'withoutSetter', function (description) {
      return wrap(uid(description), description);
    });
    propertyIsEnumerableModule.f = $propertyIsEnumerable;
    definePropertyModule.f = $defineProperty;
    getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
    getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
    getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

    wrappedWellKnownSymbolModule.f = function (name) {
      return wrap(wellKnownSymbol$1(name), name);
    };

    if (DESCRIPTORS$2) {
      // https://github.com/tc39/proposal-Symbol-description
      nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
        configurable: true,
        get: function description() {
          return getInternalState(this).description;
        }
      });

      {
        redefine$1(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
          unsafe: true
        });
      }
    }
  }

  $$2({
    global: true,
    wrap: true,
    forced: !NATIVE_SYMBOL,
    sham: !NATIVE_SYMBOL
  }, {
    Symbol: $Symbol
  });
  $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
    defineWellKnownSymbol(name);
  });
  $$2({
    target: SYMBOL,
    stat: true,
    forced: !NATIVE_SYMBOL
  }, {
    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    'for': function (key) {
      var string = String(key);
      if (has$2(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
      var symbol = $Symbol(string);
      StringToSymbolRegistry[string] = symbol;
      SymbolToStringRegistry[symbol] = string;
      return symbol;
    },
    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    keyFor: function keyFor(sym) {
      if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
      if (has$2(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
    },
    useSetter: function () {
      USE_SETTER = true;
    },
    useSimple: function () {
      USE_SETTER = false;
    }
  });
  $$2({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL,
    sham: !DESCRIPTORS$2
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
  $$2({
    target: 'Object',
    stat: true,
    forced: !NATIVE_SYMBOL
  }, {
    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    getOwnPropertyNames: $getOwnPropertyNames,
    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    getOwnPropertySymbols: $getOwnPropertySymbols
  }); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
  // https://bugs.chromium.org/p/v8/issues/detail?id=3443

  $$2({
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
    var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails$1(function () {
      var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

      return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
      || $stringify({
        a: symbol
      }) != '{}' // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
    });
    $$2({
      target: 'JSON',
      stat: true,
      forced: FORCED_JSON_STRINGIFY
    }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      stringify: function stringify(it, replacer, space) {
        var args = [it];
        var index = 1;
        var $replacer;

        while (arguments.length > index) args.push(arguments[index++]);

        $replacer = replacer;
        if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

        if (!isArray(replacer)) replacer = function (key, value) {
          if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
          if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return $stringify.apply(null, args);
      }
    });
  } // `Symbol.prototype[@@toPrimitive]` method
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive


  if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
    createNonEnumerableProperty$1($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
  } // `Symbol.prototype[@@toStringTag]` property
  // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag


  setToStringTag($Symbol, SYMBOL);
  hiddenKeys[HIDDEN] = true;

  var $$1 = _export;
  var DESCRIPTORS$1 = descriptors;
  var global$2 = global$q;
  var has$1 = has$f;
  var isObject = isObject$e;
  var defineProperty$1 = objectDefineProperty.f;
  var copyConstructorProperties = copyConstructorProperties$2;
  var NativeSymbol = global$2.Symbol;

  if (DESCRIPTORS$1 && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
  NativeSymbol().description !== undefined)) {
    var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

    var SymbolWrapper = function Symbol() {
      var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
      var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
      if (description === '') EmptyStringDescriptionStore[result] = true;
      return result;
    };

    copyConstructorProperties(SymbolWrapper, NativeSymbol);
    var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
    symbolPrototype.constructor = SymbolWrapper;
    var symbolToString = symbolPrototype.toString;
    var native = String(NativeSymbol('test')) == 'Symbol(test)';
    var regexp = /^Symbol\((.*)\)[^)]+$/;
    defineProperty$1(symbolPrototype, 'description', {
      configurable: true,
      get: function description() {
        var symbol = isObject(this) ? this.valueOf() : this;
        var string = symbolToString.call(symbol);
        if (has$1(EmptyStringDescriptionStore, symbol)) return '';
        var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
        return desc === '' ? undefined : desc;
      }
    });
    $$1({
      global: true,
      forced: true
    }, {
      Symbol: SymbolWrapper
    });
  }

  var $ = _export;
  var $every = arrayIteration.every;
  var arrayMethodIsStrict = arrayMethodIsStrict$4;
  var STRICT_METHOD = arrayMethodIsStrict('every'); // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every

  $({
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

  var DESCRIPTORS = descriptors;
  var global$1 = global$q;
  var isForced = isForced_1;
  var inheritIfRequired = inheritIfRequired$2;
  var createNonEnumerableProperty = createNonEnumerableProperty$d;
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var isRegExp = isRegexp;
  var getFlags = regexpFlags$1;
  var stickyHelpers = regexpStickyHelpers;
  var redefine = redefine$a.exports;
  var fails = fails$t;
  var has = has$f;
  var enforceInternalState = internalState.enforce;
  var setSpecies = setSpecies$3;
  var wellKnownSymbol = wellKnownSymbol$o;
  var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
  var UNSUPPORTED_NCG = regexpUnsupportedNcg;
  var MATCH = wellKnownSymbol('match');
  var NativeRegExp = global$1.RegExp;
  var RegExpPrototype = NativeRegExp.prototype; // TODO: Use only propper RegExpIdentifierName

  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g; // "new" should create a new object, old webkit bug

  var CORRECT_NEW = new NativeRegExp(re1) !== re1;
  var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
  var BASE_FORCED = DESCRIPTORS && (!CORRECT_NEW || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
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
      chr = string.charAt(index);

      if (chr === '\\') {
        result += chr + string.charAt(++index);
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
      chr = string.charAt(index);

      if (chr === '\\') {
        chr = chr + string.charAt(++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;

        case chr === '(':
          if (IS_NCG.test(string.slice(index + 1))) {
            index += 2;
            ncg = true;
          }

          result += chr;
          groupid++;
          continue;

        case chr === '>' && ncg:
          if (groupname === '' || has(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }

          names[groupname] = true;
          named.push([groupname, groupid]);
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
      var thisIsRegExp = this instanceof RegExpWrapper;
      var patternIsRegExp = isRegExp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || pattern instanceof RegExpWrapper) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags.call(rawPattern);
      }

      pattern = pattern === undefined ? '' : String(pattern);
      flags = flags === undefined ? '' : String(flags);
      rawPattern = pattern;

      if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
        dotAll = !!flags && flags.indexOf('s') > -1;
        if (dotAll) flags = flags.replace(/s/g, '');
      }

      rawFlags = flags;

      if (UNSUPPORTED_Y && 'sticky' in re1) {
        sticky = !!flags && flags.indexOf('y') > -1;
        if (sticky) flags = flags.replace(/y/g, '');
      }

      if (UNSUPPORTED_NCG) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);

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
      key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
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

    RegExpPrototype.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype;
    redefine(global$1, 'RegExp', RegExpWrapper);
  } // https://tc39.es/ecma262/#sec-get-regexp-@@species


  setSpecies('RegExp');

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
      merged.forEach(function (_byte10) {
        return bytes.push(_byte10);
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
      merged.forEach(function (_byte11) {
        return bytes.push(_byte11);
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

  var frames = /*#__PURE__*/Object.freeze({
    __proto__: null,
    APIC: APIC,
    COMM: COMM,
    GEOB: GEOB,
    IPLS: IPLS,
    MCDI: MCDI,
    OWNE: OWNE,
    PRIV: PRIV,
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
      var singleFrame = ['USER', 'OWNE', 'MCDI', 'SYTC'];

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
      this.version = '3.1.2';
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

})));
