(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.MP3Tag = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, {
	    get: function () {
	      return 7;
	    }
	  })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
	  1: 2
	}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;
	var objectPropertyIsEnumerable = {
	  f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string

	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () {
	      return 7;
	    }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) {
	    /* empty */
	  }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};
	var objectGetOwnPropertyDescriptor = {
	  f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  }

	  return it;
	};

	var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) {
	    /* empty */
	  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	var objectDefineProperty = {
	  f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  }

	  return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});
	var sharedStore = store;

	var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;
	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	  (module.exports = function (key, value) {
	    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	  })('versions', []).push({
	    version: '3.6.4',
	    mode:  'global',
	    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	  });
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;

	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    }

	    return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };

	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;

	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };

	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };

	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	  var getInternalState = internalState.get;
	  var enforceInternalState = internalState.enforce;
	  var TEMPLATE = String(String).split('String');
	  (module.exports = function (O, key, value, options) {
	    var unsafe = options ? !!options.unsafe : false;
	    var simple = options ? !!options.enumerable : false;
	    var noTargetGet = options ? !!options.noTargetGet : false;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }

	    if (O === global_1) {
	      if (simple) O[key] = value;else setGlobal(key, value);
	      return;
	    } else if (!unsafe) {
	      delete O[key];
	    } else if (!noTargetGet && O[key]) {
	      simple = true;
	    }

	    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, 'toString', function toString() {
	    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	  });
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor; // `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger

	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min; // `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength

	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min; // Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value; // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare

	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++]; // eslint-disable-next-line no-self-compare

	      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    }
	    return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;

	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }

	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
	  f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;
	var objectGetOwnPropertySymbols = {
	  f: f$4
	};

	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';
	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
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
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }

	  if (target) for (key in source) {
	    sourceProperty = source[key];

	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];

	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    } // add a flag to not completely full polyfills


	    if (options.sham || targetProperty && targetProperty.sham) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    } // extend global


	    redefine(target, key, sourceProperty, options);
	  }
	};

	var arrayBufferNative = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined';

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);

	  return target;
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-toindex

	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity = 1 / 0;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$1 = Math.floor;
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
	  number = abs(number); // eslint-disable-next-line no-self-compare

	  if (number != number || number === Infinity) {
	    // eslint-disable-next-line no-self-compare
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$1(log(number) / LN2);

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

	// https://tc39.github.io/ecma262/#sec-toobject

	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() {
	    /* empty */
	  }

	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  }

	  return it;
	};

	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.

	/* eslint-disable no-proto */

	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;

	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {
	    /* empty */
	  }

	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	// https://tc39.github.io/ecma262/#sec-array.prototype.fill


	var arrayFill = function fill(value
	/* , start = 0, end = @length */
	) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

	  while (endPos > index) O[index++] = value;

	  return O;
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol // eslint-disable-next-line no-undef
	&& !Symbol.sham // eslint-disable-next-line no-undef
	&& typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  }

	  return WellKnownSymbolsStore[name];
	};

	var defineProperty = objectDefineProperty.f;
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, {
	      configurable: true,
	      value: TAG
	    });
	  }
	};

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var defineProperty$1 = objectDefineProperty.f;
	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var $DataViewPrototype = $DataView && $DataView[PROTOTYPE];
	var ObjectPrototype$1 = Object.prototype;
	var RangeError$1 = global_1.RangeError;
	var packIEEE754 = ieee754.pack;
	var unpackIEEE754 = ieee754.unpack;

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

	var addGetter = function (Constructor, key) {
	  defineProperty$1(Constructor[PROTOTYPE], key, {
	    get: function () {
	      return getInternalState(this)[key];
	    }
	  });
	};

	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};

	var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);

	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!arrayBufferNative) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });

	    if (!descriptors) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  if (descriptors) {
	    addGetter($ArrayBuffer, 'byteLength');
	    addGetter($DataView, 'buffer');
	    addGetter($DataView, 'byteLength');
	    addGetter($DataView, 'byteOffset');
	  }

	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset
	    /* , littleEndian */
	    ) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset
	    /* , littleEndian */
	    ) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset
	    /* , littleEndian */
	    ) {
	      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value
	    /* , littleEndian */
	    ) {
	      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1); // eslint-disable-line no-new
	  }) || fails(function () {
	    new NativeArrayBuffer(); // eslint-disable-line no-new

	    new NativeArrayBuffer(1.5); // eslint-disable-line no-new

	    new NativeArrayBuffer(NaN); // eslint-disable-line no-new

	    return NativeArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new NativeArrayBuffer(toIndex(length));
	    };

	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];

	    for (var keys$1 = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys$1.length > j;) {
	      if (!((key = keys$1[j++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
	      }
	    }

	    ArrayBufferPrototype.constructor = $ArrayBuffer;
	  } // WebKit bug - the same parent prototype for typed arrays and data view


	  if (objectSetPrototypeOf && objectGetPrototypeOf($DataViewPrototype) !== ObjectPrototype$1) {
	    objectSetPrototypeOf($DataViewPrototype, ObjectPrototype$1);
	  } // iOS Safari 7.x bug


	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataViewPrototype.setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataViewPrototype, {
	    setInt8: function setInt8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, {
	    unsafe: true
	  });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
	};

	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var ArrayBuffer$1 = arrayBuffer[ARRAY_BUFFER$1];
	var NativeArrayBuffer$1 = global_1[ARRAY_BUFFER$1]; // `ArrayBuffer` constructor
	// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor

	_export({
	  global: true,
	  forced: NativeArrayBuffer$1 !== ArrayBuffer$1
	}, {
	  ArrayBuffer: ArrayBuffer$1
	});
	setSpecies(ARRAY_BUFFER$1);

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var SPECIES$1 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var ArrayBuffer$2 = arrayBuffer.ArrayBuffer;
	var DataView$1 = arrayBuffer.DataView;
	var nativeArrayBufferSlice = ArrayBuffer$2.prototype.slice;
	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer$2(2).slice(1, undefined).byteLength;
	}); // `ArrayBuffer.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-arraybuffer.prototype.slice

	_export({
	  target: 'ArrayBuffer',
	  proto: true,
	  unsafe: true,
	  forced: INCORRECT_SLICE
	}, {
	  slice: function slice(start, end) {
	    if (nativeArrayBufferSlice !== undefined && end === undefined) {
	      return nativeArrayBufferSlice.call(anObject(this), start); // FF fix
	    }

	    var length = anObject(this).byteLength;
	    var first = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    var result = new (speciesConstructor(this, ArrayBuffer$2))(toLength(fin - first));
	    var viewSource = new DataView$1(this);
	    var viewTarget = new DataView$1(result);
	    var index = 0;

	    while (first < fin) {
	      viewTarget.setUint8(index++, viewSource.getUint8(first++));
	    }

	    return result;
	  }
	});

	var defineProperty$2 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name'; // Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name

	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$2(FunctionPrototype, NAME, {
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

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};
	test[TO_STRING_TAG$1] = 'z';
	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag'); // ES3 wrong here

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


	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
	  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag // builtinTag case
	  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
	  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, {
	    unsafe: true
	  });
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
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
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
	  return function () {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (_isNativeReflectConstruct()) {
	      var NewTarget = _getPrototypeOf(this).constructor;

	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
	};

	var SPECIES$2 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);

	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var SPECIES$3 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES$3] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679

	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});
	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED
	}, {
	  concat: function concat(arg) {
	    // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;

	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];

	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
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

	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
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

	  return function ()
	  /* ...args */
	  {
	    return fn.apply(that, arguments);
	  };
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
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
	          } else if (IS_EVERY) return false; // every
	      }
	    }

	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var defineProperty$3 = Object.defineProperty;
	var cache = {};

	var thrower = function (it) {
	  throw it;
	};

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;
	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = {
	      length: -1
	    };
	    if (ACCESSORS) defineProperty$3(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var $filter = arrayIteration.filter;
	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

	var USES_TO_LENGTH = arrayMethodUsesToLength('filter'); // `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
	}, {
	  filter: function filter(callbackfn
	  /* , thisArg */
	  ) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;
	var STRICT_METHOD = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD || !USES_TO_LENGTH$1 ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


	_export({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != arrayForEach
	}, {
	  forEach: arrayForEach
	});

	// https://tc39.github.io/ecma262/#sec-object.keys

	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;

	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

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
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {
	    /* ignore */
	  }

	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;

	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO$1] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();

	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	} // add a key to Array.prototype[@@unscopables]


	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $includes = arrayIncludes.includes;
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !USES_TO_LENGTH$2
	}, {
	  includes: function includes(el
	  /* , fromIndex = 0 */
	  ) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('includes');

	// https://tc39.github.io/ecma262/#sec-array.isarray

	_export({
	  target: 'Array',
	  stat: true
	}, {
	  isArray: isArray
	});

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () {
	  return this;
	}; // `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var returnThis$1 = function () {
	  return this;
	};

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
	    next: createPropertyDescriptor(1, next)
	  });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () {
	  return this;
	};

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

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
	  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY; // fix native

	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      } // Set @@toStringTag to native iterators


	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  } // fix Array#{values, @@iterator}.name in V8 / FF


	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;

	    defaultIterator = function values() {
	      return nativeIterator.call(this);
	    };
	  } // define iterator


	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  iterators[NAME] = defaultIterator; // export additional methods

	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({
	      target: NAME,
	      proto: true,
	      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
	    }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator

	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
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
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

	iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$4 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3
	}, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

	    var Constructor, result, n;

	    if (isArray(O)) {
	      Constructor = O.constructor; // cross-realm fallback

	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$4];
	        if (Constructor === null) Constructor = undefined;
	      }

	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }

	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

	    result.length = n;
	    return result;
	  }
	});

	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags


	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// so we use an intermediate function.


	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});
	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});
	var regexpStickyHelpers = {
	  UNSUPPORTED_Y: UNSUPPORTED_Y,
	  BROKEN_CARET: BROKEN_CARET
	};

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y; // `RegExp.prototype.flags` getter
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

	if (descriptors && (/./g.flags != 'g' || UNSUPPORTED_Y$1)) {
	  objectDefineProperty.f(RegExp.prototype, 'flags', {
	    configurable: true,
	    get: regexpFlags
	  });
	}

	var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  }

	  return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;

	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) {
	      /* empty */
	    }
	  }

	  return false;
	};

	// https://tc39.github.io/ecma262/#sec-string.prototype.includes


	_export({
	  target: 'String',
	  proto: true,
	  forced: !correctIsRegexpLogic('includes')
	}, {
	  includes: function includes(searchString
	  /* , position = 0 */
	  ) {
	    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var ITERATOR$2 = wellKnownSymbol('iterator');
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

	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  }; // eslint-disable-next-line no-throw-literal


	  Array.from(iteratorWithReturn, function () {
	    throw 2;
	  });
	} catch (error) {
	  /* empty */
	}

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;

	  try {
	    var object = {};

	    object[ITERATOR$2] = function () {
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

	var defineProperty$4 = objectDefineProperty.f;
	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$2 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$2.isPrototypeOf;
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG'); // Fixing native typed arrays in Opera Presto crashes the browser, see #595

	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferNative && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME$1;
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

	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};

	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME$1)) {
	    var TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  }

	  throw TypeError('Target is not a typed array constructor');
	};

	var exportTypedArrayMethod = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }

	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;

	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];

	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }

	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) {
	        /* empty */
	      }
	    } else return;
	  }

	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];

	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME$1 in TypedArrayConstructorsList) {
	  if (!global_1[NAME$1]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	} // WebKit bug - typed arrays constructors prototype is Object.prototype


	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };

	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$2) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME$1 in TypedArrayConstructorsList) {
	    if (global_1[NAME$1]) objectSetPrototypeOf(global_1[NAME$1].prototype, TypedArrayPrototype);
	  }
	} // WebKit bug - one more object in Uint8ClampedArray prototype chain


	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$3)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$4(TypedArrayPrototype, TO_STRING_TAG$3, {
	    get: function () {
	      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	    }
	  });

	  for (NAME$1 in TypedArrayConstructorsList) if (global_1[NAME$1]) {
	    createNonEnumerableProperty(global_1[NAME$1], TYPED_ARRAY_TAG, NAME$1);
	  }
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	/* eslint-disable no-new */

	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var ArrayBuffer$3 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;
	var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$2(new ArrayBuffer$3(2), 1, undefined).length !== 1;
	});

	var toPositiveInteger = function (it) {
	  var result = toInteger(it);
	  if (result < 0) throw RangeError("The argument can't be less than 0");
	  return result;
	};

	var toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$4] === it);
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom = function from(source
	/* , mapfn, thisArg */
	) {
	  var O = toObject(source);
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
	    mapfn = functionBindContext(mapfn, arguments[2], 2);
	  }

	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);

	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }

	  return result;
	};

	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if ( // it can work only with native `setPrototypeOf`
	  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {

	  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	  var forEach = arrayIteration.forEach;
	  var getInternalState = internalState.get;
	  var setInternalState = internalState.set;
	  var nativeDefineProperty = objectDefineProperty.f;
	  var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  var round = Math.round;
	  var RangeError = global_1.RangeError;
	  var ArrayBuffer = arrayBuffer.ArrayBuffer;
	  var DataView = arrayBuffer.DataView;
	  var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	  var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	  var TypedArray = arrayBufferViewCore.TypedArray;
	  var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	  var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	  var isTypedArray = arrayBufferViewCore.isTypedArray;
	  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	  var WRONG_LENGTH = 'Wrong length';

	  var fromList = function (C, list) {
	    var index = 0;
	    var length = list.length;
	    var result = new (aTypedArrayConstructor(C))(length);

	    while (length > index) result[index] = list[index++];

	    return result;
	  };

	  var addGetter = function (it, key) {
	    nativeDefineProperty(it, key, {
	      get: function () {
	        return getInternalState(this)[key];
	      }
	    });
	  };

	  var isArrayBuffer = function (it) {
	    var klass;
	    return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	  };

	  var isTypedArrayIndex = function (target, key) {
	    return isTypedArray(target) && typeof key != 'symbol' && key in target && String(+key) == String(key);
	  };

	  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	    return isTypedArrayIndex(target, key = toPrimitive(key, true)) ? createPropertyDescriptor(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
	  };

	  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	    if (isTypedArrayIndex(target, key = toPrimitive(key, true)) && isObject(descriptor) && has(descriptor, 'value') && !has(descriptor, 'get') && !has(descriptor, 'set') // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable && (!has(descriptor, 'writable') || descriptor.writable) && (!has(descriptor, 'enumerable') || descriptor.enumerable)) {
	      target[key] = descriptor.value;
	      return target;
	    }

	    return nativeDefineProperty(target, key, descriptor);
	  };

	  if (descriptors) {
	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	      objectDefineProperty.f = wrappedDefineProperty;
	      addGetter(TypedArrayPrototype, 'buffer');
	      addGetter(TypedArrayPrototype, 'byteOffset');
	      addGetter(TypedArrayPrototype, 'byteLength');
	      addGetter(TypedArrayPrototype, 'length');
	    }

	    _export({
	      target: 'Object',
	      stat: true,
	      forced: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, {
	      getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	      defineProperty: wrappedDefineProperty
	    });

	    module.exports = function (TYPE, wrapper, CLAMPED) {
	      var BYTES = TYPE.match(/\d+$/)[0] / 8;
	      var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	      var GETTER = 'get' + TYPE;
	      var SETTER = 'set' + TYPE;
	      var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	      var TypedArrayConstructor = NativeTypedArrayConstructor;
	      var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	      var exported = {};

	      var getter = function (that, index) {
	        var data = getInternalState(that);
	        return data.view[GETTER](index * BYTES + data.byteOffset, true);
	      };

	      var setter = function (that, index, value) {
	        var data = getInternalState(that);
	        if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	        data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	      };

	      var addElement = function (that, index) {
	        nativeDefineProperty(that, index, {
	          get: function () {
	            return getter(this, index);
	          },
	          set: function (value) {
	            return setter(this, index, value);
	          },
	          enumerable: true
	        });
	      };

	      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	        TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	          anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	          var index = 0;
	          var byteOffset = 0;
	          var buffer, byteLength, length;

	          if (!isObject(data)) {
	            length = toIndex(data);
	            byteLength = length * BYTES;
	            buffer = new ArrayBuffer(byteLength);
	          } else if (isArrayBuffer(data)) {
	            buffer = data;
	            byteOffset = toOffset(offset, BYTES);
	            var $len = data.byteLength;

	            if ($length === undefined) {
	              if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	              byteLength = $len - byteOffset;
	              if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	            } else {
	              byteLength = toLength($length) * BYTES;
	              if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	            }

	            length = byteLength / BYTES;
	          } else if (isTypedArray(data)) {
	            return fromList(TypedArrayConstructor, data);
	          } else {
	            return typedArrayFrom.call(TypedArrayConstructor, data);
	          }

	          setInternalState(that, {
	            buffer: buffer,
	            byteOffset: byteOffset,
	            byteLength: byteLength,
	            length: length,
	            view: new DataView(buffer)
	          });

	          while (index < length) addElement(that, index++);
	        });
	        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	        TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	      } else if (typedArrayConstructorsRequireWrappers) {
	        TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	          anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
	          return inheritIfRequired(function () {
	            if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	            if (isArrayBuffer(data)) return $length !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length) : typedArrayOffset !== undefined ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data);
	            if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	            return typedArrayFrom.call(TypedArrayConstructor, data);
	          }(), dummy, TypedArrayConstructor);
	        });
	        if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	        forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	          if (!(key in TypedArrayConstructor)) {
	            createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	          }
	        });
	        TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	      }

	      if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	        createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	      }

	      if (TYPED_ARRAY_TAG) {
	        createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	      }

	      exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
	      _export({
	        global: true,
	        forced: TypedArrayConstructor != NativeTypedArrayConstructor,
	        sham: !NATIVE_ARRAY_BUFFER_VIEWS
	      }, exported);

	      if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	        createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	      }

	      if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	        createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	      }

	      setSpecies(CONSTRUCTOR_NAME);
	    };
	  } else module.exports = function () {
	    /* empty */
	  };
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var min$2 = Math.min; // `Array.prototype.copyWithin` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin

	var arrayCopyWithin = [].copyWithin || function copyWithin(target
	/* = 0 */
	, start
	/* = 0, end = @length */
	) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$2((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
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

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.copyWithin` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin

	exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start
	/* , end */
	) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var $every = arrayIteration.every;
	var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every

	exportTypedArrayMethod$2('every', function every(callbackfn
	/* , thisArg */
	) {
	  return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
	// eslint-disable-next-line no-unused-vars

	exportTypedArrayMethod$3('fill', function fill(value
	/* , start, end */
	) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var $filter$1 = arrayIteration.filter;
	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter

	exportTypedArrayMethod$4('filter', function filter(callbackfn
	/* , thisArg */
	) {
	  var list = $filter$1(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);

	  while (length > index) result[index] = list[index++];

	  return result;
	});

	var $find = arrayIteration.find;
	var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find

	exportTypedArrayMethod$5('find', function find(predicate
	/* , thisArg */
	) {
	  return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $findIndex = arrayIteration.findIndex;
	var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex

	exportTypedArrayMethod$6('findIndex', function findIndex(predicate
	/* , thisArg */
	) {
	  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $forEach$1 = arrayIteration.forEach;
	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach

	exportTypedArrayMethod$7('forEach', function forEach(callbackfn
	/* , thisArg */
	) {
	  $forEach$1(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes$1 = arrayIncludes.includes;
	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes

	exportTypedArrayMethod$8('includes', function includes(searchElement
	/* , fromIndex */
	) {
	  return $includes$1(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $indexOf = arrayIncludes.indexOf;
	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof

	exportTypedArrayMethod$9('indexOf', function indexOf(searchElement
	/* , fromIndex */
	) {
	  return $indexOf(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var Uint8Array$1 = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
	var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$5];
	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	}; // `%TypedArray%.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries


	exportTypedArrayMethod$a('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	}); // `%TypedArray%.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys

	exportTypedArrayMethod$a('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	}); // `%TypedArray%.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values

	exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME); // `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator

	exportTypedArrayMethod$a(ITERATOR$5, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
	var $join = [].join; // `%TypedArray%.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
	// eslint-disable-next-line no-unused-vars

	exportTypedArrayMethod$b('join', function join(separator) {
	  return $join.apply(aTypedArray$b(this), arguments);
	});

	var min$3 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD$1 = arrayMethodIsStrict('lastIndexOf'); // For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method

	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	});
	var FORCED$1 = NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$4; // `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

	var arrayLastIndexOf = FORCED$1 ? function lastIndexOf(searchElement
	/* , fromIndex = @[*-1] */
	) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$3(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;

	  for (; index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;

	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
	// eslint-disable-next-line no-unused-vars

	exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement
	/* , fromIndex */
	) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var $map = arrayIteration.map;
	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map

	exportTypedArrayMethod$d('map', function map(mapfn
	/* , thisArg */
	) {
	  return $map(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	  });
	});

	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
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
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var $reduce = arrayReduce.left;
	var aTypedArray$e = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce

	exportTypedArrayMethod$e('reduce', function reduce(callbackfn
	/* , initialValue */
	) {
	  return $reduce(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $reduceRight = arrayReduce.right;
	var aTypedArray$f = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright

	exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn
	/* , initialValue */
	) {
	  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
	var floor$2 = Math.floor; // `%TypedArray%.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse

	exportTypedArrayMethod$g('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
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

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;
	var FORCED$2 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).set({});
	}); // `%TypedArray%.prototype.set` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set

	exportTypedArrayMethod$h('set', function set(arrayLike
	/* , offset */
	) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');

	  while (index < len) this[offset + index] = src[index++];
	}, FORCED$2);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;
	var FORCED$3 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).slice();
	}); // `%TypedArray%.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice

	exportTypedArrayMethod$i('slice', function slice(start, end) {
	  var list = $slice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);

	  while (length > index) result[index] = list[index++];

	  return result;
	}, FORCED$3);

	var $some = arrayIteration.some;
	var aTypedArray$j = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some

	exportTypedArrayMethod$j('some', function some(callbackfn
	/* , thisArg */
	) {
	  return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
	var $sort = [].sort; // `%TypedArray%.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort

	exportTypedArrayMethod$k('sort', function sort(comparefn) {
	  return $sort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.subarray` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray

	exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(O.buffer, O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex));
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var $slice$1 = [].slice; // iOS Safari 6.x fails here

	var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
	  $toLocaleString.call(new Int8Array$3(1));
	});
	var FORCED$4 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	}); // `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring

	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$4);

	var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;
	var Uint8Array$2 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype || {};
	var arrayToString = [].toString;
	var arrayJoin = [].join;

	if (fails(function () {
	  arrayToString.call({});
	})) {
	  arrayToString = function toString() {
	    return arrayJoin.call(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString; // `%TypedArray%.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring

	exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

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

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	}

	function isBitSet(_byte, bit) {
	  return (_byte & 1 << bit) > 0;
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
	    if (param.forEach) param.forEach(function (_byte2) {
	      return merged.push(_byte2);
	    });else merged.push(param);
	  });
	  return new Uint8Array(merged);
	}
	function unsynch(array) {
	  var bytes = [];
	  var i = 0;

	  while (i < array.length) {
	    bytes.push(array[i]);
	    if (array[i] === 0xff && array[i + 1] === 0x00) i++;
	    i++;
	  }

	  return bytes;
	}

	var E_CODES = {
	  0: 'Unknown error',
	  1: 'This format is not yet supported',
	  // 100 - Reserved for ID3v1
	  200: 'This file is not an ID3v2',
	  201: 'Unsupported ID3v2 major version',
	  202: 'Unsupported frame',
	  203: 'Frame validation failed',
	  204: 'Frame is not supported in this version of ID3v2'
	};

	var TagError = /*#__PURE__*/function (_Error) {
	  _inherits(TagError, _Error);

	  var _super = _createSuper(TagError);

	  function TagError(code) {
	    var _this;

	    _classCallCheck(this, TagError);

	    _this = _super.call(this, E_CODES[code]);
	    _this.name = 'TagError';
	    _this.code = code;
	    _this.errorId = arguments.length <= 1 ? undefined : arguments[1];
	    _this.message = _this.parseMessage();
	    return _this;
	  }

	  _createClass(TagError, [{
	    key: "parseMessage",
	    value: function parseMessage() {
	      var string = '';

	      switch (this.code) {
	        case 200:
	          string = "ID3v2 Error: ".concat(E_CODES[this.code]);
	          break;

	        case 201:
	        case 202:
	        case 203:
	        case 204:
	          string = "ID3v2 Error: ".concat(E_CODES[this.code], " \"").concat(this.errorId, "\"");
	          break;

	        default:
	          string = "".concat(E_CODES[this.code]);
	      }

	      return string;
	    }
	  }]);

	  return TagError;
	}( /*#__PURE__*/_wrapNativeSuper(Error));

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

	    default:
	      throw new TagError(201, version);
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

	    default:
	      throw new TagError(201, version);
	  }

	  return flags;
	}

	var $map$1 = arrayIteration.map;
	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map'); // FF49- issue

	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('map'); // `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$5
	}, {
	  map: function map(callbackfn
	  /* , thisArg */
	  ) {
	    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = DatePrototype[TO_STRING];
	var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

	if (new Date(NaN) + '' != INVALID_DATE) {
	  redefine(DatePrototype, TO_STRING, function toString() {
	    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

	    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
	  });
	}

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var trim = stringTrim.trim;
	var $parseInt = global_1.parseInt;
	var hex = /^[+-]?0[Xx]/;
	var FORCED$5 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22; // `parseInt` method
	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	var numberParseInt = FORCED$5 ? function parseInt(string, radix) {
	  var S = trim(String(string));
	  return $parseInt(S, radix >>> 0 || (hex.test(S) ? 16 : 10));
	} : $parseInt;

	// https://tc39.github.io/ecma262/#sec-parseint-string-radix

	_export({
	  global: true,
	  forced: parseInt != numberParseInt
	}, {
	  parseInt: numberParseInt
	});

	var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.

	var nativeReplace = String.prototype.replace;
	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	}();

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
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

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: /./.exec !== regexpExec
	}, {
	  exec: regexpExec
	});

	var TO_STRING$1 = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING$1];
	var NOT_GENERIC = fails(function () {
	  return nativeToString.call({
	    source: 'a',
	    flags: 'b'
	  }) != '/a/b';
	}); // FF44- RegExp#toString has a wrong name

	var INCORRECT_NAME = nativeToString.name != TO_STRING$1; // `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING$1, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, {
	    unsafe: true
	  });
	}

	var SPECIES$5 = wellKnownSymbol('species');
	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;

	  re.exec = function () {
	    var result = [];
	    result.groups = {
	      a: '7'
	    };
	    return result;
	  };

	  return ''.replace(re, '$<a>') !== '7';
	}); // IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0

	var REPLACE_KEEPS_$0 = function () {
	  return 'a'.replace(/./, '$0') === '$0';
	}();

	var REPLACE = wellKnownSymbol('replace'); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string

	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
	  if (/./[REPLACE]) {
	    return /./[REPLACE]('a', '$0') === '';
	  }

	  return false;
	}(); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper


	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;

	  re.exec = function () {
	    return originalExec.apply(this, arguments);
	  };

	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);
	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};

	    O[SYMBOL] = function () {
	      return 7;
	    };

	    return ''[KEY](O) != 7;
	  });
	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
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

	  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
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
	    }, {
	      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
	      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
	    });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];
	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	    ? function (string, arg) {
	      return regexMethod.call(string, this, arg);
	    } // 21.2.5.6 RegExp.prototype[@@match](string)
	    // 21.2.5.9 RegExp.prototype[@@search](string)
	    : function (string) {
	      return regexMethod.call(string, this);
	    });
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var createMethod$4 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$4(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$4(true)
	};

	var charAt = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex

	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt(S, index).length : 1);
	};

	// https://tc39.github.io/ecma262/#sec-regexpexec

	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;

	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);

	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }

	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [// `String.prototype.match` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.match
	  function match(regexp) {
	    var O = requireObjectCoercible(this);
	    var matcher = regexp == undefined ? undefined : regexp[MATCH];
	    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, // `RegExp.prototype[@@match]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	  function (regexp) {
	    var res = maybeCallNative(nativeMatch, regexp, this);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    if (!rx.global) return regexpExecAbstract(rx, S);
	    var fullUnicode = rx.unicode;
	    rx.lastIndex = 0;
	    var A = [];
	    var n = 0;
	    var result;

	    while ((result = regexpExecAbstract(rx, S)) !== null) {
	      var matchStr = String(result[0]);
	      A[n] = matchStr;
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	      n++;
	    }

	    return n === 0 ? null : A;
	  }];
	});

	var arrayPush = [].push;
	var min$4 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

	var SUPPORTS_Y = !fails(function () {
	  return !RegExp(MAX_UINT32, 'y');
	}); // @@split logic

	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;

	  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

	      if (!isRegexp(separator)) {
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
	  // https://tc39.github.io/ecma262/#sec-string.prototype.split
	  function split(separator, limit) {
	    var O = requireObjectCoercible(this);
	    var splitter = separator == undefined ? undefined : separator[SPLIT];
	    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
	  }, // `RegExp.prototype[@@split]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	  //
	  // NOTE: This cannot be properly polyfilled in engines that don't support
	  // the 'y' flag.
	  function (regexp, limit) {
	    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	    if (res.done) return res.value;
	    var rx = anObject(regexp);
	    var S = String(this);
	    var C = speciesConstructor(rx, RegExp);
	    var unicodeMatching = rx.unicode;
	    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
	    // simulate the 'y' flag.

	    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	    if (lim === 0) return [];
	    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	    var p = 0;
	    var q = 0;
	    var A = [];

	    while (q < S.length) {
	      splitter.lastIndex = SUPPORTS_Y ? q : 0;
	      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	      var e;

	      if (z === null || (e = min$4(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
	        q = advanceStringIndex(S, q, unicodeMatching);
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
	}, !SUPPORTS_Y);

	var NATIVE_ARRAY_BUFFER_VIEWS$2 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS; // `ArrayBuffer.isView` method
	// https://tc39.github.io/ecma262/#sec-arraybuffer.isview

	_export({
	  target: 'ArrayBuffer',
	  stat: true,
	  forced: !NATIVE_ARRAY_BUFFER_VIEWS$2
	}, {
	  isView: arrayBufferViewCore.isView
	});

	// https://tc39.github.io/ecma262/#sec-dataview-constructor

	_export({
	  global: true,
	  forced: !arrayBufferNative
	}, {
	  DataView: arrayBuffer.DataView
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

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
	function encodeString(string, format) {
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

	    default:
	      for (var _i = 0; _i < string.length; _i++) {
	        bytes.push(string.charCodeAt(_i));
	      }

	  }

	  return bytes;
	}

	var BufferView = /*#__PURE__*/function (_DataView) {
	  _inherits(BufferView, _DataView);

	  var _super = _createSuper(BufferView);

	  function BufferView() {
	    _classCallCheck(this, BufferView);

	    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
	      params[_key] = arguments[_key];
	    }

	    if (typeof params[0] === 'number') {
	      params[0] = new Uint8Array(params[0]);
	    }

	    if (Array.isArray(params[0])) {
	      params[0] = new Uint8Array(params[0]);
	    }

	    if (ArrayBuffer.isView(params[0])) {
	      params[0] = params[0].buffer;
	    }

	    return _super.call.apply(_super, [this].concat(params));
	  }

	  _createClass(BufferView, [{
	    key: "getString",
	    value: function getString(offset, maxlength, format) {
	      var bytes = this.getUint8(offset, maxlength);
	      if (!Array.isArray(bytes)) bytes = [bytes];
	      var string = '';

	      switch (format) {
	        case 'utf-8':
	          string = decodeUTF8(bytes);
	          break;

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

	        default:
	          string = this.getUint8String(offset, maxlength);
	      }

	      return {
	        string: string[string.length - 1] === '\0' ? string.substr(0, string.length - 1) : string,
	        length: bytes.length
	      };
	    }
	  }, {
	    key: "getCString",
	    value: function getCString(offset, format) {
	      var bytes, bytesPerChar;
	      var limit = this.byteLength - offset;

	      switch (format) {
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
	  }]);

	  return BufferView;
	}( /*#__PURE__*/_wrapNativeSuper(DataView));

	var ENCODINGS = ['ascii', 'utf-16', 'utf-16be', 'utf-8'];
	/**
	 *  Frame Parsers
	 *  @param {BufferView} view - View of the frame excluding the header
	 *  @param {number} version - Frame will be parsed according to this version
	 */

	function textFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var value;

	  switch (version) {
	    case 3:
	      value = view.getCString(1, encoding).string.split('/');
	      break;

	    case 4:
	      value = view.getString(1, view.byteLength - 1, encoding).string.split('\0');
	      break;

	    default:
	      throw new TagError(201, version);
	  }

	  return value.length === 1 ? value[0] : value;
	}
	function numberFrame(view, version) {
	  var value = textFrame(view, version);

	  var toNumber = function toNumber(string) {
	    return string.match(/^(\d+)$/) !== null ? parseInt(string) : string;
	  };

	  value = Array.isArray(value) ? value.map(function (elem) {
	    return toNumber(elem);
	  }) : toNumber(value);
	  return value;
	}
	function setFrame(view, version) {
	  var value = textFrame(view, version);
	  var array = [];
	  if (!Array.isArray(value)) value = [value];

	  for (var i = 0; i < value.length; i += 2) {
	    var set = {};
	    if (value[i]) set.position = parseInt(value[i]);
	    if (value[i + 1]) set.total = parseInt(value[i + 1]);
	    array.push(set);
	  }

	  return array.length === 1 ? array[0] : array;
	}
	function urlFrame(view, version) {
	  return view.getCString(0, 'ascii').string;
	}
	function txxxFrame(view, version) {
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
	function wxxxFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var description = view.getCString(1, encoding);
	  var urlOffset = description.length + 1;
	  var urlLength = view.byteLength - urlOffset;
	  var url = view.getString(urlOffset, urlLength, 'ascii');
	  return {
	    description: description.string,
	    url: url.string
	  };
	}
	function iplsFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var people = [];
	  var length = 1;

	  while (length < view.byteLength) {
	    var person = view.getCString(length, encoding);
	    people.push(person.string);
	    length += person.length;
	  }

	  return people;
	}
	function langDescFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var descriptor = view.getCString(4, encoding);
	  var textOffset = descriptor.length + 4;
	  var textLength = view.byteLength - textOffset;
	  var text = view.getString(textOffset, textLength, encoding);
	  return {
	    language: view.getString(1, 3, 'ascii').string,
	    descriptor: descriptor.string,
	    text: text.string
	  };
	}
	function apicFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var mime = view.getCString(1, 'ascii');
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
	function geobFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var mime = view.getCString(1, 'ascii');
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
	function ufidFrame(view, version) {
	  var ownerId = view.getCString(0, 'ascii');
	  var id = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
	  return {
	    ownerId: ownerId.string,
	    id: id
	  };
	}
	function userFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var text = view.getString(4, view.byteLength - 4, encoding);
	  return {
	    language: view.getString(1, 3, 'ascii').string,
	    text: text.string
	  };
	}
	function owneFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var currencyCode = view.getString(1, 3, 'ascii');
	  var currency = view.getCString(4, 'ascii');
	  var date = view.getString(currency.length + 4, 8, 'ascii');
	  var sellerOffset = currency.length + date.length + 4;
	  var sellerLength = view.byteLength - sellerOffset;
	  var seller = view.getString(sellerOffset, sellerLength, encoding);
	  return {
	    currency: {
	      code: currencyCode.string,
	      price: currency.string
	    },
	    date: date.string,
	    seller: seller.string
	  };
	}
	function privFrame(view, version) {
	  var ownerId = view.getCString(0, 'ascii');
	  var data = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
	  return {
	    ownerId: ownerId.string,
	    data: data
	  };
	}
	function signFrame(view, version) {
	  var group = view.getUint8(0);
	  var signature = view.getUint8(1, view.byteLength - 1);
	  return {
	    group: group,
	    signature: signature
	  };
	}
	function seekFrame(view, version) {
	  return view.getUint32(0);
	}
	function syltFrame(view, version) {
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var language = view.getString(1, 3, 'ascii').string;
	  var format = view.getUint8(4);
	  var type = view.getUint8(5);
	  var descriptor = view.getCString(6, encoding);
	  var lyricsOffset = descriptor.length + 6;
	  var lyricsLength = view.byteLength - lyricsOffset;
	  var lyrics = view.getUint8(lyricsOffset, lyricsLength);
	  var text = '';

	  for (var i = 0; i < lyrics.length; i += 4) {
	    var lyricsView = new BufferView(lyrics);
	    var line = lyricsView.getCString(i, 'ascii');
	    var time = lyricsView.getUint32(i + line.length);
	    var minutes = Math.floor(time / 60000).toString();
	    var seconds = Math.floor(time % 60000 / 1000).toString();
	    seconds = seconds.length === 1 ? '0' + seconds.length : seconds;
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
	function mcdiFrame(view, version) {
	  return view.getUint8(0, view.byteLength);
	}

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
	var toString$1 = {}.toString;
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


	var f$5 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
	  f: f$5
	};

	var f$6 = wellKnownSymbol;
	var wellKnownSymbolWrapped = {
	  f: f$6
	};

	var defineProperty$5 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
	    value: wellKnownSymbolWrapped.f(NAME)
	  });
	};

	var $forEach$2 = arrayIteration.forEach;
	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$2 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$3 = Object[PROTOTYPE$2];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

	var USE_SETTER = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () {
	      return nativeDefineProperty$1(this, 'a', {
	        value: 7
	      }).a;
	    }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$3, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$3[P];
	  nativeDefineProperty$1(O, P, Attributes);

	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$3) {
	    nativeDefineProperty$1(ObjectPrototype$3, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$2]);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$3) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);

	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, {
	        enumerable: createPropertyDescriptor(0, false)
	      });
	    }

	    return setSymbolDescriptor(O, key, Attributes);
	  }

	  return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$2(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$3 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$3 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }

	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$3;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$3, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	}; // `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor


	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);

	    var setter = function (value) {
	      if (this === ObjectPrototype$3) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };

	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$3, tag, {
	      configurable: true,
	      set: setter
	    });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });
	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });
	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wellKnownSymbolWrapped.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$2], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });

	    {
	      redefine(ObjectPrototype$3, 'propertyIsEnumerable', $propertyIsEnumerable, {
	        unsafe: true
	      });
	    }
	  }
	}

	_export({
	  global: true,
	  wrap: true,
	  forced: !nativeSymbol,
	  sham: !nativeSymbol
	}, {
	  Symbol: $Symbol
	});
	$forEach$2(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});
	_export({
	  target: SYMBOL,
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () {
	    USE_SETTER = true;
	  },
	  useSimple: function () {
	    USE_SETTER = false;
	  }
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol,
	  sham: !descriptors
	}, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});
	_export({
	  target: 'Object',
	  stat: true,
	  forced: !nativeSymbol
	}, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443

	_export({
	  target: 'Object',
	  stat: true,
	  forced: fails(function () {
	    objectGetOwnPropertySymbols.f(1);
	  })
	}, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	}); // `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify

	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

	    return $stringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
	    || $stringify({
	      a: symbol
	    }) != '{}' // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	  });
	  _export({
	    target: 'JSON',
	    stat: true,
	    forced: FORCED_JSON_STRINGIFY
	  }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;

	      while (arguments.length > index) args.push(arguments[index++]);

	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	} // `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive


	if (!$Symbol[PROTOTYPE$2][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	} // `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


	setToStringTag($Symbol, SYMBOL);
	hiddenKeys[HIDDEN] = true;

	var defineProperty$6 = objectDefineProperty.f;
	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
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
	  defineProperty$6(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });
	  _export({
	    global: true,
	    forced: true
	  }, {
	    Symbol: SymbolWrapper
	  });
	}

	var $every$1 = arrayIteration.every;
	var STRICT_METHOD$2 = arrayMethodIsStrict('every');
	var USES_TO_LENGTH$6 = arrayMethodUsesToLength('every'); // `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$6
	}, {
	  every: function every(callbackfn
	  /* , thisArg */
	  ) {
	    return $every$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var defineProperty$7 = objectDefineProperty.f;
	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var setInternalState$3 = internalState.set;
	var MATCH$2 = wellKnownSymbol('match');
	var NativeRegExp = global_1.RegExp;
	var RegExpPrototype$1 = NativeRegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g; // "new" should create a new object, old webkit bug

	var CORRECT_NEW = new NativeRegExp(re1) !== re1;
	var UNSUPPORTED_Y$3 = regexpStickyHelpers.UNSUPPORTED_Y;
	var FORCED$6 = descriptors && isForced_1('RegExp', !CORRECT_NEW || UNSUPPORTED_Y$3 || fails(function () {
	  re2[MATCH$2] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

	  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
	})); // `RegExp` constructor
	// https://tc39.github.io/ecma262/#sec-regexp-constructor

	if (FORCED$6) {
	  var RegExpWrapper = function RegExp(pattern, flags) {
	    var thisIsRegExp = this instanceof RegExpWrapper;
	    var patternIsRegExp = isRegexp(pattern);
	    var flagsAreUndefined = flags === undefined;
	    var sticky;

	    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
	      return pattern;
	    }

	    if (CORRECT_NEW) {
	      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
	    } else if (pattern instanceof RegExpWrapper) {
	      if (flagsAreUndefined) flags = regexpFlags.call(pattern);
	      pattern = pattern.source;
	    }

	    if (UNSUPPORTED_Y$3) {
	      sticky = !!flags && flags.indexOf('y') > -1;
	      if (sticky) flags = flags.replace(/y/g, '');
	    }

	    var result = inheritIfRequired(CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);
	    if (UNSUPPORTED_Y$3 && sticky) setInternalState$3(result, {
	      sticky: sticky
	    });
	    return result;
	  };

	  var proxy = function (key) {
	    key in RegExpWrapper || defineProperty$7(RegExpWrapper, key, {
	      configurable: true,
	      get: function () {
	        return NativeRegExp[key];
	      },
	      set: function (it) {
	        NativeRegExp[key] = it;
	      }
	    });
	  };

	  var keys$2 = getOwnPropertyNames$1(NativeRegExp);
	  var index = 0;

	  while (keys$2.length > index) proxy(keys$2[index++]);

	  RegExpPrototype$1.constructor = RegExpWrapper;
	  RegExpWrapper.prototype = RegExpPrototype$1;
	  redefine(global_1, 'RegExp', RegExpWrapper);
	} // https://tc39.github.io/ecma262/#sec-get-regexp-@@species


	setSpecies('RegExp');

	function includes(array, object) {
	  var included = false;
	  var i = 0;

	  while (i < array.length && !included) {
	    if (objectEqual(array[i], object)) {
	      included = true;
	      break;
	    }

	    i++;
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

	var urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/;
	var langRegex = /^([a-z]{3}|XXX)$/;
	var stringRegex = /^(.*)$/;
	var year = '(\\d{4})';
	var month = '(0[1-9]|1[0-2])';
	var day = '(0[1-9]|1\\d|2\\d|3[0-1])';
	var hour = '(0\\d|1\\d|2[0-3])';
	var minute = '(0\\d|1\\d|2\\d|3\\d|4\\d|5\\d)';
	var second = minute;
	var timeRegex = new RegExp("^(".concat(year, "(-").concat(month, "(-").concat(day, "(T").concat(hour, "(:").concat(minute, "(:").concat(second, ")?)?)?)?)?)$"));
	function validateID(id) {
	  if (!id.match(/^([A-Z0-9]{4})$/)) {
	    throw new TagError(203, 'ID is invalid');
	  }

	  return true;
	}
	/**
	 *  Validators
	 *  @param {any[]} values - Array of frame values
	 *  @param {number} version - Frame will be validated according to this version
	 */

	function textFrame$1(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    if (typeof value !== 'string') {
	      throw new TagError(203, 'Value is not a string');
	    }

	    if (!value.match(stringRegex)) {
	      throw new TagError(203, 'Newlines are not allowed');
	    }
	  });
	  return true;
	}
	function numberFrame$1(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    if (typeof value !== 'number') {
	      throw new TagError(203, 'Value is not a number');
	    }
	  });
	  return true;
	}
	function setFrame$1(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    if (typeof value.position !== 'number') {
	      throw new TagError(203, 'Position is not a number');
	    }

	    if (value.total && typeof value.total !== 'number') {
	      throw new TagError(203, 'Total is not a number');
	    }

	    if (value.total && value.position > value.total) {
	      throw new TagError(203, 'Position is greater than total');
	    }
	  });
	  return true;
	}
	function timeFrame(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    switch (version) {
	      case 3:
	        if (!value.toString().match(/^(\d{4})$/)) {
	          throw new TagError(203, 'Value is not 4 numeric characters');
	        }

	        break;

	      case 4:
	        if (typeof value !== 'string') {
	          throw new TagError(203, 'Value is not a string');
	        }

	        if (!value.match(timeRegex)) {
	          throw new TagError(203, 'Time frames should follow ISO 8601');
	        }

	        break;
	    }
	  });
	  return true;
	}
	function urlFrame$1(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `W???` frames are not allowed');
	  }

	  values.forEach(function (value) {
	    if (typeof value !== 'string') {
	      throw new TagError(203, 'URL is not a string');
	    }

	    if (!value.match(urlRegex)) {
	      throw new TagError(203, 'URL is not a valid URL');
	    }
	  });
	  return true;
	}
	function txxxFrame$1(values, verion) {
	  var descriptions = [];
	  values.forEach(function (value) {
	    if (typeof value.description !== 'string' || typeof value.text !== 'string') {
	      throw new TagError(203, 'Text/description is not a string');
	    }

	    if (!value.description.match(stringRegex) || !value.text.match(stringRegex)) {
	      throw new TagError('Newlines are not allowed');
	    }

	    if (descriptions.includes(value.description)) {
	      throw new TagError(203, 'Description should not duplicate');
	    } else {
	      descriptions.push(value.description);
	    }
	  });
	  return true;
	}
	function wxxxFrame$1(values, version) {
	  var descriptions = [];
	  values.forEach(function (value) {
	    if (typeof value.description !== 'string' || typeof value.url !== 'string') {
	      throw new TagError(203, 'Text/URL is not a string');
	    }

	    if (!value.description.match(stringRegex)) {
	      throw new TagError(203, 'Newlines are not allowed');
	    }

	    if (!value.url.match(urlRegex)) {
	      throw new TagError(203, 'URL is an invalid URL');
	    }

	    if (descriptions.includes(value.description)) {
	      throw new TagError(203, 'Description should not duplicate');
	    } else {
	      descriptions.push(value.description);
	    }
	  });
	  return true;
	}
	function tkeyFrame(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    if (typeof value !== 'string') {
	      throw new TagError(203, 'Value is not a string');
	    }

	    if (!value.match(/^([A-Gb#mo]{3})$/)) {
	      throw new TagError(203, 'Invalid TKEY Format (e.g. Cbm)');
	    }
	  });
	  return true;
	}
	function tlanFrame(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    if (typeof value !== 'string') {
	      throw new TagError(203, 'Value is not a string');
	    }

	    if (!value.match(langRegex)) {
	      throw new TagError(203, 'Language does not follow ISO 639-2');
	    }
	  });
	  return true;
	}
	function tsrcFrame(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `T???` frames are not allowed');
	  }

	  values = Array.isArray(values[0]) ? values[0] : [values[0]];
	  values.forEach(function (value) {
	    if (typeof value !== 'string') {
	      throw new TagError(203, 'Value is not a string');
	    }

	    if (!value.match(/^([A-Z0-9]{12})$/)) {
	      throw new TagError(203, 'Invalid ISRC format');
	    }
	  });
	  return true;
	}
	function langDescFrame$1(values, version) {
	  var langDescs = [];
	  values.forEach(function (value) {
	    if (_typeof(value) !== 'object') {
	      throw new TagError(203, 'Value is not an object');
	    }

	    value.language = value.language || 'eng';
	    value.descriptor = value.descriptor || '';

	    if (typeof value.language !== 'string' || typeof value.descriptor !== 'string' || typeof value.text !== 'string') {
	      throw new TagError(203, 'Language/descriptor/text is not a string');
	    }

	    if (!value.language.match(langRegex)) {
	      throw new TagError(203, 'Language does not follow ISO 639-2');
	    }

	    if (!value.descriptor.match(stringRegex)) {
	      throw new TagError(203, 'Newlines are not allowed');
	    }

	    var checkObj = {
	      language: value.language,
	      descriptor: value.descriptor
	    };

	    if (includes(langDescs, checkObj)) {
	      throw new TagError(203, 'Language and descriptor should not duplicate');
	    } else {
	      langDescs.push(checkObj);
	    }
	  });
	  return true;
	}
	function apicFrame$1(values, version) {
	  var descriptions = [];
	  values.forEach(function (value) {
	    value.type = value.type || 3;

	    if (typeof value.format !== 'string' || typeof value.description !== 'string' || typeof value.type !== 'number') {
	      throw new TagError(203, 'Format/type/description is invalid');
	    }

	    if (!(value.data instanceof ArrayBuffer) && !Array.isArray(value.data) && !ArrayBuffer.isView(value.data)) {
	      throw new TagError(203, 'Image data should be ArrayBuffer or an array');
	    }

	    if (!value.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
	      throw new TagError(203, 'Format should be an image');
	    }

	    if (value.type > 21 || value.type < 0) {
	      throw new TagError(203, 'Type should be in the range of 0 - 21');
	    }

	    if (value.description.length > 64) {
	      throw new TagError(203, 'Description should not exceed 64');
	    }

	    if (descriptions.includes(value.description)) {
	      throw new TagError(203, 'Cover description should not duplicate');
	    } else {
	      descriptions.push(value.description);
	    }
	  });
	  return true;
	}
	function geobFrame$1(values, version) {
	  var descriptions = [];
	  values.forEach(function (value) {
	    if (typeof value.format !== 'string' || typeof value.filename !== 'string' || typeof value.description !== 'string') {
	      throw new TagError(203, 'Format/filename/description is not a string');
	    }

	    if (!(value.object instanceof ArrayBuffer) && !Array.isArray(value.object) && !ArrayBuffer.isView(value.object)) {
	      throw new TagError(203, 'Object data should be ArrayBuffer or an array');
	    }

	    if (descriptions.includes(value.description)) {
	      throw new TagError(203, 'GEOB description should not duplicate');
	    } else {
	      descriptions.push(value.description);
	    }
	  });
	  return true;
	}
	function ufidFrame$1(values, version) {
	  var ownerIds = [];
	  values.forEach(function (value) {
	    if (typeof value.ownerId !== 'string') {
	      throw new TagError(203, 'ownerId is not a string');
	    }

	    if (value.ownerId === '') {
	      throw new TagError(203, 'ownerId should not be blank');
	    }

	    if (!(value.id instanceof ArrayBuffer) && !Array.isArray(value.id) && !ArrayBuffer.isView(value.id)) {
	      throw new TagError(203, 'id should be ArrayBuffer or an array');
	    }

	    var idLength = value.id.byteLength || value.id.length || 0;

	    if (idLength > 64) {
	      throw new TagError(203, 'id should not exceed 64 bytes');
	    }

	    if (ownerIds.includes(value.ownerId)) {
	      throw new TagError(203, 'ownerId should not duplicate');
	    } else {
	      ownerIds.push(value.ownerId);
	    }
	  });
	  return true;
	}
	function userFrame$1(values, version) {
	  values.forEach(function (value) {
	    if (_typeof(value) !== 'object') {
	      throw new TagError(203, 'Value is not an object');
	    }

	    value.language = value.language || 'eng';

	    if (typeof value.language !== 'string' || typeof value.text !== 'string') {
	      throw new TagError(203, 'Language/text is not a string');
	    }

	    if (!value.language.match(langRegex)) {
	      throw new TagError(203, 'Language does not follow ISO 639-2');
	    }
	  });
	  return true;
	}
	function owneFrame$1(values, version) {
	  if (values.length > 1) {
	    throw new TagError('Multiple `OWNE` frames are not allowed');
	  }

	  values.forEach(function (value) {
	    if (_typeof(value) !== 'object') {
	      throw new TagError(203, 'Value is not an object');
	    }

	    if (_typeof(value.currency) !== 'object' || typeof value.date !== 'string' || typeof value.seller !== 'string') {
	      throw new TagError(203, 'Value is not valid');
	    }

	    if (typeof value.currency.code !== 'string' || typeof value.currency.price !== 'string') {
	      throw new TagError(203, 'Currency values are not valid');
	    }

	    if (!value.currency.code.match(/^([A-Z]{3})$/)) {
	      throw new TagError(203, 'Currency code is not valid');
	    }

	    if (!value.currency.price.match(/^(\d*)\.(\d+)$/)) {
	      throw new TagError(203, 'Currency price is not valid');
	    }

	    if (!value.date.match("".concat(year).concat(month).concat(day))) {
	      throw new TagError(203, 'Date must follow this format: YYYYMMDD');
	    }
	  });
	  return true;
	}
	function privFrame$1(values, version) {
	  var contents = [];
	  values.forEach(function (value) {
	    if (typeof value.ownerId !== 'string') {
	      throw new TagError(203, 'ownerId is not a string');
	    }

	    if (!value.ownerId.match(urlRegex)) {
	      throw new TagError(203, 'ownerId is an invalid URL');
	    }

	    if (!(value.data instanceof ArrayBuffer) && !Array.isArray(value.data) && !ArrayBuffer.isView(value.data)) {
	      throw new TagError(203, 'Data should be an ArrayBuffer or array');
	    }

	    if (includes(contents, value.data)) {
	      throw new TagError(203, 'Data should not duplicate');
	    } else {
	      contents.push(value.data);
	    }
	  });
	  return true;
	}
	function signFrame$1(values, version) {
	  var signs = [];
	  values.forEach(function (value) {
	    if (typeof value.group !== 'number') {
	      throw new TagError(203, 'Group ID is not a number');
	    }

	    if (value.group < 0 || value.group > 255) {
	      throw new TagError(203, 'Group ID should be in the range of 0 - 255');
	    }

	    if (!(value.signature instanceof ArrayBuffer) && !Array.isArray(value.signature) && !ArrayBuffer.isView(value.signature)) {
	      throw new TagError(203, 'Signature should be an ArrayBuffer or array');
	    }

	    if (includes(signs, value)) {
	      throw new TagError(203, 'SIGN contents should be identical to others');
	    } else {
	      signs.push(value);
	    }
	  });
	  return true;
	}
	function syltFrame$1(values, version) {
	  var sylts = [];
	  values.forEach(function (value) {
	    if (_typeof(value) !== 'object') {
	      throw new TagError('Value is not an object');
	    }

	    value.language = value.language || 'eng';
	    value.descriptor = value.descriptor || '';
	    value.type = value.type || 1;

	    if (typeof value.language !== 'string' || typeof value.type !== 'number' || typeof value.descriptor !== 'string' || typeof value.lyrics !== 'string') {
	      throw new TagError('Language/Type/Descriptor is invalid');
	    }

	    if (!value.language.match(langRegex)) {
	      throw new TagError(203, 'Language does not follow ISO 639-2');
	    }

	    var regex = /^((\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)|)/;
	    var valid = value.lyrics.split('\n').every(function (entry) {
	      return regex.test(entry);
	    });

	    if (!valid) {
	      throw new TagError(203, 'Lyrics do not follow format: [mm:ss.xxx] string');
	    }

	    var checkObj = {
	      language: value.language,
	      descriptor: value.descriptor
	    };

	    if (includes(sylts, checkObj)) {
	      throw new TagError('1 SYLT with the same language and descriptor only');
	    } else {
	      sylts.push(checkObj);
	    }
	  });
	  return true;
	}
	function mcdiFrame$1(values, version) {
	  if (values.length > 1) {
	    throw new TagError(203, 'Multiple `MCDI` frame are not allowed');
	  }

	  values.forEach(function (value) {
	    if (!(value instanceof ArrayBuffer) && !Array.isArray(value) && !ArrayBuffer.isView(value)) {
	      throw new TagError(203, 'Value should be an ArrayBuffer or array');
	    }
	  });
	  return true;
	}

	var nativeJoin = [].join;
	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$3 = arrayMethodIsStrict('join', ','); // `Array.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.join

	_export({
	  target: 'Array',
	  proto: true,
	  forced: ES3_STRINGS || !STRICT_METHOD$3
	}, {
	  join: function join(separator) {
	    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var max$2 = Math.max;
	var min$5 = Math.min;
	var floor$3 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	}; // @@replace logic


	fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
	  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
	  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
	  return [// `String.prototype.replace` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	  function replace(searchValue, replaceValue) {
	    var O = requireObjectCoercible(this);
	    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
	  }, // `RegExp.prototype[@@replace]` method
	  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	  function (regexp, replaceValue) {
	    if (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0 || typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1) {
	      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
	      if (res.done) return res.value;
	    }

	    var rx = anObject(regexp);
	    var S = String(this);
	    var functionalReplace = typeof replaceValue === 'function';
	    if (!functionalReplace) replaceValue = String(replaceValue);
	    var global = rx.global;

	    if (global) {
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	    }

	    var results = [];

	    while (true) {
	      var result = regexpExecAbstract(rx, S);
	      if (result === null) break;
	      results.push(result);
	      if (!global) break;
	      var matchStr = String(result[0]);
	      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	    }

	    var accumulatedResult = '';
	    var nextSourcePosition = 0;

	    for (var i = 0; i < results.length; i++) {
	      result = results[i];
	      var matched = String(result[0]);
	      var position = max$2(min$5(toInteger(result.index), S.length), 0);
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
	  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

	    if (namedCaptures !== undefined) {
	      namedCaptures = toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }

	    return nativeReplace.call(replacement, symbols, function (match, ch) {
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
	            var f = floor$3(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }

	          capture = captures[n - 1];
	      }

	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	function getHeaderBytes(id, size, version) {
	  var idBytes = encodeString(id, 'ascii');
	  var sizeView = new BufferView(4);

	  switch (version) {
	    case 3:
	      sizeView.setUint32(0, size);
	      break;

	    case 4:
	      sizeView.setUint32(0, encodeSynch(size));
	      break;
	  }

	  return mergeBytes(idBytes, sizeView.getUint8(0, 4), 0, 0);
	}
	/**
	 *  Frames writers
	 *  @param {any[]} values - Validated frame of values array
	 *  @param {number} version - Frame will be written according to this version
	 */


	function textFrame$2(values, id, version) {
	  var encoding = 0;
	  var strBytes = [];
	  values = Array.isArray(values[0]) ? values[0] : [values[0]];

	  switch (version) {
	    case 3:
	      encoding = 1;
	      strBytes = encodeString(values.join('/') + '\0', 'utf-16');
	      break;

	    case 4:
	      encoding = 3;
	      strBytes = encodeString(values.join('\0') + '\0', 'utf-8');
	      break;
	  }

	  var header = getHeaderBytes(id, strBytes.length + 1, version);
	  return mergeBytes(header, encoding, strBytes);
	}
	function asciiFrame(values, id, version) {
	  var strBytes = [];
	  values = Array.isArray(values[0]) ? values[0] : [values[0]];

	  switch (version) {
	    case 3:
	      strBytes = encodeString(values.join('/') + '\0', 'ascii');
	      break;

	    case 4:
	      strBytes = encodeString(values.join('\0') + '\0', 'ascii');
	      break;
	  }

	  var header = getHeaderBytes(id, strBytes.length + 1, version);
	  return mergeBytes(header, 0, strBytes);
	}
	function setFrame$2(values, id, version) {
	  var strings = [];
	  values.forEach(function (value) {
	    var string = value.position.toString();
	    if (value.total) string += '/' + value.total.toString();
	    strings.push(string);
	  });
	  return asciiFrame(strings, id, version);
	}
	function urlFrame$2(values, id, version) {
	  var strBytes = encodeString(values[0] + '\0', 'ascii');
	  var header = getHeaderBytes(id, strBytes.length, version);
	  return mergeBytes(header, strBytes);
	}
	function txxxFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var encoding = 0;
	    var descBytes, strBytes;

	    switch (version) {
	      case 3:
	        encoding = 1;
	        descBytes = encodeString(value.description + '\0', 'utf-16');
	        strBytes = encodeString(value.text + '\0', 'utf-16');
	        break;

	      case 4:
	        encoding = 3;
	        descBytes = encodeString(values.description + '\0', 'utf-8');
	        strBytes = encodeString(values.text + '\0', 'utf-8');
	        break;
	    }

	    var size = descBytes.length + strBytes.length + 1;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, descBytes, strBytes);
	    merged.forEach(function (_byte) {
	      return bytes.push(_byte);
	    });
	  });
	  return bytes;
	}
	function wxxxFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var encoding = 0;
	    var descBytes, strBytes;

	    switch (version) {
	      case 3:
	        encoding = 1;
	        descBytes = encodeString(value.description + '\0', 'utf-16');
	        strBytes = encodeString(value.url + '\0', 'ascii');
	        break;

	      case 4:
	        encoding = 3;
	        descBytes = encodeString(value.description + '\0', 'utf-8');
	        strBytes = encodeString(value.url + '\0', 'ascii');
	        break;
	    }

	    var size = descBytes.length + strBytes.length + 1;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, descBytes, strBytes);
	    merged.forEach(function (_byte2) {
	      return bytes.push(_byte2);
	    });
	  });
	  return bytes;
	}
	function iplsFrame$1(values, id, version) {
	  return textFrame$2(values, id, 4);
	}
	function langDescFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    value.language = value.language || 'eng';
	    value.descriptor = value.descriptor || '';
	    var encoding = 0;
	    var langBytes = encodeString(value.language, 'ascii');
	    var descBytes, textBytes;

	    switch (version) {
	      case 3:
	        encoding = 1;
	        descBytes = encodeString(value.descriptor + '\0', 'utf-16');
	        textBytes = encodeString(value.text + '\0', 'utf-16');
	        break;

	      case 4:
	        encoding = 3;
	        descBytes = encodeString(value.descriptor + '\0', 'utf-8');
	        textBytes = encodeString(value.text + '\0', 'utf-8');
	        break;
	    }

	    var size = descBytes.length + textBytes.length + 4;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, langBytes, descBytes, textBytes);
	    merged.forEach(function (_byte3) {
	      return bytes.push(_byte3);
	    });
	  });
	  return bytes;
	}
	function apicFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    value.type = value.type || 3;
	    var encoding = 0;
	    var mimeBytes = encodeString(value.format + '\0', 'ascii');
	    var imageBytes = new Uint8Array(value.data);
	    var strBytes = [];

	    switch (version) {
	      case 3:
	        encoding = 1;
	        strBytes = encodeString(value.description + '\0', 'utf-16');
	        break;

	      case 4:
	        encoding = 3;
	        strBytes = encodeString(value.description + '\0', 'utf-8');
	        break;
	    }

	    var size = mimeBytes.length + strBytes.length + imageBytes.length + 2;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, mimeBytes, value.type, strBytes, imageBytes);
	    merged.forEach(function (_byte4) {
	      return bytes.push(_byte4);
	    });
	  });
	  return bytes;
	}
	function geobFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var mime = encodeString(value.format + '\0', 'ascii');
	    var object = new Uint8Array(value.object);
	    var encoding, filename, description;

	    switch (version) {
	      case 3:
	        encoding = 1;
	        filename = encodeString(value.filename + '\0', 'utf-16');
	        description = encodeString(value.description + '\0', 'utf-16');
	        break;

	      case 4:
	        encoding = 3;
	        filename = encodeString(value.filename + '\0', 'utf-8');
	        description = encodeString(value.description + '\0', 'utf-8');
	        break;
	    }

	    var size = mime.length + filename.length + description.length + object.length + 1;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, mime, filename, description, object);
	    merged.forEach(function (_byte5) {
	      return bytes.push(_byte5);
	    });
	  });
	  return bytes;
	}
	function ufidFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var ownerBytes = encodeString(value.ownerId + '\0', 'ascii');
	    var idBytes = new Uint8Array(value.id);
	    var size = ownerBytes.length + idBytes.length;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, ownerBytes, idBytes);
	    merged.forEach(function (_byte6) {
	      return bytes.push(_byte6);
	    });
	  });
	  return bytes;
	}
	function userFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    value.language = value.language || 'eng';
	    var encoding = 0;
	    var langBytes = encodeString(value.language, 'ascii');
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

	    var header = getHeaderBytes(id, textBytes.length + 4, version);
	    var merged = mergeBytes(header, encoding, langBytes, textBytes);
	    merged.forEach(function (_byte7) {
	      return bytes.push(_byte7);
	    });
	  });
	  return bytes;
	}
	function owneFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var encoding = 0;
	    var codeBytes = encodeString(value.currency.code, 'ascii');
	    var priceBytes = encodeString(value.currency.price + '\0', 'ascii');
	    var dateBytes = encodeString(value.date, 'ascii');
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

	    var size = priceBytes.length + sellerBytes.length + 12;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, codeBytes, priceBytes, dateBytes, sellerBytes);
	    merged.forEach(function (_byte8) {
	      return bytes.push(_byte8);
	    });
	  });
	  return bytes;
	}
	function privFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var ownerIdBytes = encodeString(value.ownerId, 'ascii');
	    var data = new Uint8Array(value.data);
	    var size = ownerIdBytes.length + data.length;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, ownerIdBytes, data);
	    merged.forEach(function (_byte9) {
	      return bytes.push(_byte9);
	    });
	  });
	  return bytes;
	}
	function signFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var signature = new Uint8Array(value.signature);
	    var size = signature.length + 1;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, value.group, signature);
	    merged.forEach(function (_byte10) {
	      return bytes.push(_byte10);
	    });
	  });
	  return bytes;
	}
	function syltFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    value.language = value.language || 'eng';
	    value.descriptor = value.descriptor || '';
	    value.type = value.type || 1;
	    var encoding = 0;
	    var langBytes = encodeString(value.language, 'ascii');
	    var descBytes = [];

	    switch (version) {
	      case 3:
	        encoding = 1;
	        descBytes = encodeString(value.descriptor + '\0', 'utf-16');
	        break;

	      case 4:
	        encoding = 3;
	        descBytes = encodeString(value.descriptor + '\0', 'utf-8');
	        break;
	    }

	    var regex = /^(\[\d{1,}:\d{2}\.\d{3}\]) ?(.*)/;
	    var lyricsBytes = [];
	    value.lyrics.replace(/\r\n/, '\n').split('\n').forEach(function (line) {
	      if (line !== '') {
	        var result = regex.exec(line);
	        var time = parseInt(result[1].replace(/[^0-9]/g, ''));
	        var string = encodeString((result[2] || '') + '\n\0', 'ascii');
	        var timeBytes = new BufferView(4);
	        timeBytes.setUint32(0, time);
	        lyricsBytes = mergeBytes(lyricsBytes, string, timeBytes.getUint8(0, 4));
	      }
	    });
	    var size = descBytes.length + lyricsBytes.length + 6;
	    var header = getHeaderBytes(id, size, version);
	    var merged = mergeBytes(header, encoding, langBytes, value.format, value.type, descBytes, lyricsBytes);
	    merged.forEach(function (_byte11) {
	      return bytes.push(_byte11);
	    });
	  });
	  return bytes;
	}
	function mcdiFrame$2(values, id, version) {
	  var bytes = [];
	  values.forEach(function (value) {
	    var header = getHeaderBytes(id, value.length, version);
	    var merged = mergeBytes(header, value);
	    merged.forEach(function (_byte12) {
	      return bytes.push(_byte12);
	    });
	  });
	  return bytes;
	}

	function validateID$1(id) {
	  return validateID(id);
	}
	var APIC = {
	  parse: apicFrame,
	  validate: apicFrame$1,
	  write: apicFrame$2,
	  version: [3, 4]
	};
	var COMM = {
	  parse: langDescFrame,
	  validate: langDescFrame$1,
	  write: langDescFrame$2,
	  version: [3, 4]
	};
	var GEOB = {
	  parse: geobFrame,
	  validate: geobFrame$1,
	  write: geobFrame$2,
	  version: [3, 4]
	};
	var IPLS = {
	  parse: iplsFrame,
	  validate: textFrame$1,
	  write: iplsFrame$1,
	  version: [3]
	};
	var MCDI = {
	  parse: mcdiFrame,
	  validate: mcdiFrame$1,
	  write: mcdiFrame$2,
	  version: [3, 4]
	};
	var OWNE = {
	  parse: owneFrame,
	  validate: owneFrame$1,
	  write: owneFrame$2,
	  version: [3, 4]
	};
	var PRIV = {
	  parse: privFrame,
	  validate: privFrame$1,
	  write: privFrame$2,
	  version: [3, 4]
	};
	var SEEK = {
	  parse: seekFrame
	};
	var SIGN = {
	  parse: signFrame,
	  validate: signFrame$1,
	  write: signFrame$2,
	  version: [4]
	};
	var SYLT = {
	  parse: syltFrame,
	  validate: syltFrame$1,
	  write: syltFrame$2,
	  version: [3, 4]
	};
	var TALB = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TBPM = {
	  parse: numberFrame,
	  validate: numberFrame$1,
	  write: asciiFrame,
	  version: [3, 4]
	};
	var TCOM = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TCON = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TCOP = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TDAT = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [3]
	};
	var TDEN = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [4]
	};
	var TDLY = {
	  parse: numberFrame,
	  validate: numberFrame$1,
	  write: asciiFrame,
	  version: [3]
	};
	var TDOR = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [4]
	};
	var TDRC = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [4]
	};
	var TDRL = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [4]
	};
	var TDTG = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [4]
	};
	var TENC = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TEXT = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TFLT = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TIME = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [3]
	};
	var TIPL = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TIT1 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TIT2 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TIT3 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TKEY = {
	  parse: textFrame,
	  validate: tkeyFrame,
	  write: asciiFrame,
	  version: [3, 4]
	};
	var TLAN = {
	  parse: textFrame,
	  validate: tlanFrame,
	  write: asciiFrame,
	  version: [3, 4]
	};
	var TLEN = {
	  parse: numberFrame,
	  validate: numberFrame$1,
	  write: asciiFrame,
	  version: [3, 4]
	};
	var TMCL = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TMED = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TMOO = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TOAL = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TOFN = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TOLY = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TOPE = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TORY = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [3]
	};
	var TOWN = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TPE1 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TPE2 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TPE3 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TPE4 = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TPOS = {
	  parse: setFrame,
	  validate: setFrame$1,
	  write: setFrame$2,
	  version: [3, 4]
	};
	var TPRO = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TPUB = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TRCK = {
	  parse: setFrame,
	  validate: setFrame$1,
	  write: setFrame$2,
	  version: [3, 4]
	};
	var TRDA = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3]
	};
	var TRSN = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TRSO = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TSIZ = {
	  parse: numberFrame,
	  validate: numberFrame$1,
	  write: asciiFrame,
	  version: [3]
	};
	var TSOA = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TSOC = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TSOP = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TSOT = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TSRC = {
	  parse: textFrame,
	  validate: tsrcFrame,
	  write: asciiFrame,
	  version: [3, 4]
	};
	var TSSE = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TSST = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [4]
	};
	var TYER = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: asciiFrame,
	  version: [3]
	};
	var TXXX = {
	  parse: txxxFrame,
	  validate: txxxFrame$1,
	  write: txxxFrame$2,
	  version: [3, 4]
	};
	var UFID = {
	  parse: ufidFrame,
	  validate: ufidFrame$1,
	  write: ufidFrame$2,
	  version: [3, 4]
	};
	var USER = {
	  parse: userFrame,
	  validate: userFrame$1,
	  write: userFrame$2,
	  version: [3, 4]
	};
	var USLT = {
	  parse: langDescFrame,
	  validate: langDescFrame$1,
	  write: langDescFrame$2,
	  version: [3, 4]
	};
	var WCOM = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WCOP = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WOAF = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WOAR = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WOAS = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WORS = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WPAY = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WPUB = {
	  parse: urlFrame,
	  validate: urlFrame$1,
	  write: urlFrame$2,
	  version: [3, 4]
	};
	var WXXX = {
	  parse: wxxxFrame,
	  validate: wxxxFrame$1,
	  write: wxxxFrame$2,
	  version: [3, 4]
	};

	var frames = /*#__PURE__*/Object.freeze({
		__proto__: null,
		validateID: validateID$1,
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

	var ID3v2 = /*#__PURE__*/function () {
	  _createClass(ID3v2, null, [{
	    key: "isID3v2",
	    value: function isID3v2(buffer) {
	      var view = new BufferView(buffer);
	      return view.getString(0, 3, 'ascii').string === 'ID3';
	    }
	  }]);

	  function ID3v2(buffer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, ID3v2);

	    this.buffer = buffer;
	    this.options = {
	      padding: options.padding !== undefined ? options.padding : 4096,
	      version: options.version !== undefined ? options.version : false
	    };
	    this.frames = [];
	  }

	  _createClass(ID3v2, [{
	    key: "read",
	    value: function read() {
	      var tagOffset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var mediaView = new BufferView(this.buffer, tagOffset);
	      if (mediaView.getUint8String(0, 3) !== 'ID3') throw new TagError(200);
	      var version = mediaView.getUint8(3, 2);

	      switch (version[0]) {
	        case 3:
	        case 4:
	          this.major = version[0];
	          this.minor = version[1];
	          break;

	        default:
	          throw new TagError(201, version[0]);
	      }

	      this.size = decodeSynch(mediaView.getUint32(6));
	      this.flags = getHeaderFlags(mediaView.getUint8(5), this.major);
	      this.frames = [];
	      var offset = 10;
	      var limit = this.size;

	      while (offset < this.size) {
	        var frameBytes = mediaView.getUint8(offset, limit);
	        var frame = decodeFrame.call(this, frameBytes);

	        if (frame) {
	          offset += frame.size + 10;
	          limit -= frame.size + 10;

	          if (frame.id === 'SEEK') {
	            this.read(offset + frame.value);
	          } else {
	            this.frames.push(frame);
	          }
	        } else break;
	      }

	      return this.frames;
	    }
	  }, {
	    key: "validate",
	    value: function validate() {
	      if (this.major !== 3 && this.major !== 4) {
	        throw new TagError(201, this.major);
	      }

	      var framesObj = this.getFrames();

	      for (var id in framesObj) {
	        var frameDesc = frames[id];

	        if (frameDesc) {
	          if (frameDesc.version.includes(this.major)) {
	            validateID$1(id);

	            try {
	              frameDesc.validate(framesObj[id], this.major);
	            } catch (e) {
	              throw new TagError(203, "ID: ".concat(id, ", Message: ").concat(e.message));
	            }
	          } else {
	            throw new TagError(204, id);
	          }
	        } else {
	          throw new TagError(202, id);
	        }
	      }

	      return true;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      if (this.frames.length === 0) return this.getAudio().buffer;
	      this.major = this.options.version || this.major || 3;
	      this.minor = 0;
	      if (!this.validate()) return false;
	      var framesObj = this.getFrames();
	      var headerBytes = [0x49, 0x44, 0x33, this.major, this.minor, 0];
	      var sizeView = new BufferView(4);
	      var paddingBytes = new Uint8Array(this.options.padding);
	      var audioBytes = this.getAudio();
	      var framesBytes = [];

	      for (var id in framesObj) {
	        var frameDesc = frames[id];
	        var bytes = frameDesc.write(framesObj[id], id, this.major);
	        bytes.forEach(function (_byte) {
	          return framesBytes.push(_byte);
	        });
	      }

	      sizeView.setUint32(0, encodeSynch(framesBytes.length + paddingBytes.length));
	      this.buffer = mergeBytes(headerBytes, sizeView.getUint8(0, 4), framesBytes, paddingBytes, audioBytes).buffer;
	      this.read();
	      return this.buffer;
	    }
	  }, {
	    key: "getFrames",
	    value: function getFrames() {
	      var object = {};
	      this.frames.forEach(function (frame) {
	        if (typeof object[frame.id] !== 'undefined') {
	          object[frame.id].push(frame.value);
	        } else {
	          object[frame.id] = [frame.value];
	        }
	      });
	      return object;
	    }
	  }, {
	    key: "addFrame",
	    value: function addFrame(id, value) {
	      this.frames.push({
	        id: id,
	        value: value
	      });
	    }
	  }, {
	    key: "removeFrame",
	    value: function removeFrame(id, index) {
	      var array = this.frames;
	      var counts = 0;
	      this.frames.forEach(function (frame, i) {
	        if (frame.id === id) {
	          if (index === null) array[i] = undefined;else {
	            if (counts === index) array[i] = undefined;
	            counts++;
	          }
	        }
	      });
	      array = array.filter(function (elem) {
	        return elem !== undefined;
	      });
	      this.frames = array;
	    }
	  }, {
	    key: "editFrame",
	    value: function editFrame(id, value, index, replace) {
	      var array = this.frames;
	      var counts = 0;
	      this.frames.forEach(function (frame, i) {
	        if (frame.id === id) {
	          if (counts === index) {
	            if (Array.isArray(array[i])) array[i].push(value);else if (replace) array[i] = {
	              id: id,
	              value: value
	            };
	          }

	          counts++;
	        }
	      });
	      this.frames = array;
	    }
	  }, {
	    key: "existsFrame",
	    value: function existsFrame(id) {
	      var found = false;
	      this.frames.forEach(function (frame) {
	        if (frame.id === id) found = true;
	      });
	      return found;
	    }
	  }, {
	    key: "getAudio",
	    value: function getAudio() {
	      var audioData = new Uint8Array(this.buffer);
	      var i = 0;

	      while (i < audioData.length) {
	        if (audioData[i] === 0xff && audioData[i + 1] === 0xfb) {
	          return new Uint8Array(this.buffer.slice(i));
	        } else i++;
	      }

	      return new Uint8Array(0);
	    }
	  }]);

	  return ID3v2;
	}();

	function decodeFrame(bytes) {
	  var frameView = new BufferView(bytes);
	  if (frameView.getUint8(0) === 0x00) return false;
	  var frame = {};
	  frame.id = frameView.getUint8String(0, 4);

	  switch (this.major) {
	    case 3:
	      frame.size = frameView.getUint32(4);
	      break;

	    case 4:
	      frame.size = decodeSynch(frameView.getUint32(4));
	      break;

	    default:
	      throw new TagError(201, this.major);
	  }

	  frame.flags = getFrameFlags(frameView.getUint8(8, 2), this.major);
	  var frameDesc = frames[frame.id];
	  var offset = 10;
	  var actualSize = frame.size;
	  var dataLength = frame.size;
	  var contentBuffer = [];

	  if (!frameDesc) {
	    console.warn("Skipping unsupported frame: ".concat(frame.id));
	    return frame;
	  }

	  if (frame.flags.dataLengthIndicator) {
	    actualSize = decodeSynch(frameView.getUint32(offset));
	    offset += 4;
	    dataLength -= 4;
	  }

	  if (this.major === 3 && this.flags.unsynchronisation || this.major === 4 && (this.flags.unsynchronisation || frame.flags.unsynchronisation)) {
	    var uint8 = frameView.getUint8(offset, dataLength);
	    var unsynched = unsynch(uint8);
	    contentBuffer = new Uint8Array(unsynched);
	  } else {
	    contentBuffer = frameView.getUint8(offset, actualSize);
	  }

	  frame.value = frameDesc.parse(new BufferView(contentBuffer), this.major);
	  return frame;
	}

	var MP3Tag = /*#__PURE__*/function () {
	  _createClass(MP3Tag, [{
	    key: "frames",
	    get: function get() {
	      return this.tagger.frames;
	    },
	    set: function set(value) {
	      this.tagger.frames = value;
	    }
	  }]);

	  function MP3Tag(buffer) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, MP3Tag);

	    if (!(buffer instanceof ArrayBuffer) && (typeof Buffer !== 'undefined' ? !(buffer instanceof Buffer) : true)) {
	      throw new TypeError('buffer is not an instance of ArrayBuffer or Buffer');
	    }

	    this.name = 'MP3Tag';
	    this.version = '1.1.0';
	    this.buffer = buffer;
	    this.options = options;
	    this.tagger = {};
	  }

	  _createClass(MP3Tag, [{
	    key: "read",
	    value: function read() {
	      if (ID3v2.isID3v2(this.buffer)) {
	        this.tagger = new ID3v2(this.buffer, this.options);
	        this.tagger.read();
	      } else {
	        // Default to id3v2 and get the raw audio data for writing
	        this.tagger = new ID3v2(this.buffer, this.options);
	        if (this.tagger.getAudio().length > 0) this.save();else throw new TagError(1);
	      }
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      var old = this.buffer;
	      this.buffer = this.tagger.save();
	      return old;
	    }
	  }, {
	    key: "getFrames",
	    value: function getFrames() {
	      return this.tagger.getFrames();
	    }
	  }, {
	    key: "addFrame",
	    value: function addFrame(id, value) {
	      return this.tagger.addFrame(id, value);
	    }
	  }, {
	    key: "removeFrame",
	    value: function removeFrame(id) {
	      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      return this.tagger.removeFrame(id, index);
	    }
	  }, {
	    key: "editFrame",
	    value: function editFrame(id, value) {
	      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var replace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	      return this.tagger.editFrame(id, value, index, replace);
	    }
	  }, {
	    key: "existsFrame",
	    value: function existsFrame(id) {
	      return this.tagger.existsFrame(id);
	    }
	  }, {
	    key: "getBlob",
	    value: function getBlob() {
	      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'audio/mpeg';
	      return new Blob([this.buffer], {
	        type: type
	      });
	    }
	  }]);

	  return MP3Tag;
	}();

	return MP3Tag;

})));
