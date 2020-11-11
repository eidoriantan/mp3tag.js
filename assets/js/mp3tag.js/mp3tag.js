(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MP3Tag = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


	var global_1 = // eslint-disable-next-line no-undef
	check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
	function () {
	  return this;
	}() || Function('return this')();

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
	    version: '3.7.0',
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
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;

	  set = function (it, metadata) {
	    metadata.facade = it;
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
	    metadata.facade = it;
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
	    var state;

	    if (typeof value == 'function') {
	      if (typeof key == 'string' && !has(value, 'name')) {
	        createNonEnumerableProperty(value, 'name', key);
	      }

	      state = enforceInternalState(value);

	      if (!state.source) {
	        state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	      }
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

	// https://tc39.github.io/ecma262/#sec-isarray

	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// https://tc39.github.io/ecma262/#sec-array.isarray

	_export({
	  target: 'Array',
	  stat: true
	}, {
	  isArray: isArray
	});

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
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

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

	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true; // `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create

	var objectCreate = Object.create || function create(O, Properties) {
	  var result;

	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

	    result[IE_PROTO] = O;
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

	var iterators = {};

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

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof

	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }

	  return O instanceof Object ? ObjectPrototype : null;
	};

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
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
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
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    // target
	    index: 0,
	    // next index
	    kind: kind // kind

	  }); // `%ArrayIteratorPrototype%.next` method
	  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
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

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
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

	var SPECIES = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};

	    constructor[SPECIES] = function () {
	      return {
	        foo: 1
	      };
	    };

	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var defineProperty$1 = Object.defineProperty;
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
	    if (ACCESSORS) defineProperty$1(O, 1, {
	      enumerable: true,
	      get: thrower
	    });else O[1] = 1;
	    method.call(O, argument0, argument1);
	  });
	};

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH = arrayMethodUsesToLength('slice', {
	  ACCESSORS: true,
	  0: 0,
	  1: 2
	});
	var SPECIES$1 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max; // `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
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
	        Constructor = Constructor[SPECIES$1];
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

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var defineProperty$2 = objectDefineProperty.f;
	var getInternalState$1 = internalState.get;
	var setInternalState$1 = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var $DataViewPrototype = $DataView && $DataView[PROTOTYPE$1];
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
	  defineProperty$2(Constructor[PROTOTYPE$1], key, {
	    get: function () {
	      return getInternalState$1(this)[key];
	    }
	  });
	};

	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$1(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$1(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};

	var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$1(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$1(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);

	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!arrayBufferNative) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState$1(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState$1(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState$1(this, {
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

	  redefineAll($DataView[PROTOTYPE$1], {
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

	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$1] = NativeArrayBuffer[PROTOTYPE$1];

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

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  }

	  return it;
	};

	var SPECIES$2 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor

	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var ArrayBuffer$1 = arrayBuffer.ArrayBuffer;
	var DataView$1 = arrayBuffer.DataView;
	var nativeArrayBufferSlice = ArrayBuffer$1.prototype.slice;
	var INCORRECT_SLICE = fails(function () {
	  return !new ArrayBuffer$1(2).slice(1, undefined).byteLength;
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
	    var result = new (speciesConstructor(this, ArrayBuffer$1))(toLength(fin - first));
	    var viewSource = new DataView$1(this);
	    var viewTarget = new DataView$1(result);
	    var index = 0;

	    while (first < fin) {
	      viewTarget.setUint8(index++, viewSource.getUint8(first++));
	    }

	    return result;
	  }
	});

	var defineProperty$3 = objectDefineProperty.f;
	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name'; // Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name

	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$3(FunctionPrototype, NAME, {
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

	// https://tc39.github.io/ecma262/#sec-object.defineproperties

	_export({
	  target: 'Object',
	  stat: true,
	  forced: !descriptors,
	  sham: !descriptors
	}, {
	  defineProperties: objectDefineProperties
	});

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

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
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

	var SPECIES$3 = wellKnownSymbol('species');
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

	      re.constructor[SPECIES$3] = function () {
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

	var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp

	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var createMethod$1 = function (CONVERT_TO_STRING) {
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
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
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

	var arrayPush = [].push;
	var min$2 = Math.min;
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

	      if (z === null || (e = min$2(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
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
	var ArrayBuffer$2 = global_1.ArrayBuffer;
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
	  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
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

	var SPECIES$4 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

	var arraySpeciesCreate = function (originalArray, length) {
	  var C;

	  if (isArray(originalArray)) {
	    C = originalArray.constructor; // cross-realm fallback

	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
	      C = C[SPECIES$4];
	      if (C === null) C = undefined;
	    }
	  }

	  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

	var createMethod$2 = function (TYPE) {
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
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6)
	};

	var SPECIES$5 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$5]) {
	    defineProperty(Constructor, SPECIES$5, {
	      configurable: true,
	      get: function () {
	        return this;
	      }
	    });
	  }
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

	var min$3 = Math.min; // `Array.prototype.copyWithin` method implementation
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
	  var count = min$3((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
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

	var $filter = arrayIteration.filter;
	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter

	exportTypedArrayMethod$4('filter', function filter(callbackfn
	/* , thisArg */
	) {
	  var list = $filter(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
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

	var $forEach = arrayIteration.forEach;
	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach

	exportTypedArrayMethod$7('forEach', function forEach(callbackfn
	/* , thisArg */
	) {
	  $forEach(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes = arrayIncludes.includes;
	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod; // `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes

	exportTypedArrayMethod$8('includes', function includes(searchElement
	/* , fromIndex */
	) {
	  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
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

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () {
	      throw 1;
	    }, 1);
	  });
	};

	var min$4 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf'); // For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method

	var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	});
	var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$1; // `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

	var arrayLastIndexOf = FORCED ? function lastIndexOf(searchElement
	/* , fromIndex = @[*-1] */
	) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$4(index, toInteger(arguments[1]));
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

	var createMethod$3 = function (IS_RIGHT) {
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
	  left: createMethod$3(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$3(true)
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
	var FORCED$1 = fails(function () {
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
	}, FORCED$1);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;
	var FORCED$2 = fails(function () {
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
	}, FORCED$2);

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
	var FORCED$3 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	}); // `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring

	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$3);

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

	function ownKeys$1(object, enumerableOnly) {
	  var keys = Object.keys(object);

	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    if (enumerableOnly) symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    });
	    keys.push.apply(keys, symbols);
	  }

	  return keys;
	}

	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};

	    if (i % 2) {
	      ownKeys$1(Object(source), true).forEach(function (key) {
	        _defineProperty(target, key, source[key]);
	      });
	    } else if (Object.getOwnPropertyDescriptors) {
	      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	    } else {
	      ownKeys$1(Object(source)).forEach(function (key) {
	        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	      });
	    }
	  }

	  return target;
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
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

	var FORCED$4 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species

	_export({
	  target: 'Array',
	  proto: true,
	  forced: FORCED$4
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

	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var ArrayBuffer$3 = arrayBuffer[ARRAY_BUFFER$1];
	var NativeArrayBuffer$1 = global_1[ARRAY_BUFFER$1]; // `ArrayBuffer` constructor
	// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor

	_export({
	  global: true,
	  forced: NativeArrayBuffer$1 !== ArrayBuffer$3
	}, {
	  ArrayBuffer: ArrayBuffer$3
	});
	setSpecies(ARRAY_BUFFER$1);

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

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var nativeEndsWith = ''.endsWith;
	var min$5 = Math.min;
	var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('endsWith'); // https://github.com/zloirock/core-js/pull/702

	var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
	  var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'endsWith');
	  return descriptor && !descriptor.writable;
	}(); // `String.prototype.endsWith` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.endswith

	_export({
	  target: 'String',
	  proto: true,
	  forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC
	}, {
	  endsWith: function endsWith(searchString
	  /* , endPosition = @length */
	  ) {
	    var that = String(requireObjectCoercible(this));
	    notARegexp(searchString);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = toLength(that.length);
	    var end = endPosition === undefined ? len : min$5(toLength(endPosition), len);
	    var search = String(searchString);
	    return nativeEndsWith ? nativeEndsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
	  }
	});

	var $forEach$1 = arrayIteration.forEach;
	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
	var USES_TO_LENGTH$2 = arrayMethodUsesToLength('forEach'); // `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

	var arrayForEach = !STRICT_METHOD$1 || !USES_TO_LENGTH$2 ? function forEach(callbackfn
	/* , thisArg */
	) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


	_export({
	  target: 'Array',
	  proto: true,
	  forced: [].forEach != arrayForEach
	}, {
	  forEach: arrayForEach
	});

	// https://tc39.github.io/ecma262/#sec-typedarray-objects

	typedArrayConstructor('Uint16', function (init) {
	  return function Uint16Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
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

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
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

	  _createClass(BufferView, null, [{
	    key: "isViewable",
	    value: function isViewable(param) {
	      if (isBuffer(param) || Array.isArray(param) || ArrayBuffer.isView(param)) {
	        return true;
	      }

	      return false;
	    }
	  }]);

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
	  }]);

	  return BufferView;
	}( /*#__PURE__*/_wrapNativeSuper(DataView));

	var $includes$1 = arrayIncludes.includes;
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !USES_TO_LENGTH$3
	}, {
	  includes: function includes(el
	  /* , fromIndex = 0 */
	  ) {
	    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

	addToUnscopables('includes');

	var $indexOf$1 = arrayIncludes.indexOf;
	var nativeIndexOf = [].indexOf;
	var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
	var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', {
	  ACCESSORS: true,
	  1: 0
	}); // `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

	_export({
	  target: 'Array',
	  proto: true,
	  forced: NEGATIVE_ZERO$1 || !STRICT_METHOD$2 || !USES_TO_LENGTH$4
	}, {
	  indexOf: function indexOf(searchElement
	  /* , fromIndex = 0 */
	  ) {
	    return NEGATIVE_ZERO$1 // convert -0 to +0
	    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf$1(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
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

	var createMethod$4 = function (TYPE) {
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
	  start: createMethod$4(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$4(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$4(3)
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

	var max$2 = Math.max;
	var min$6 = Math.min;
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
	      var position = max$2(min$6(toInteger(result.index), S.length), 0);
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
	function decode(buffer) {
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
	function validate(tags, strict) {
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
	function encode(tags) {
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

	var FAILS_ON_PRIMITIVES = fails(function () {
	  objectKeys(1);
	}); // `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys

	_export({
	  target: 'Object',
	  stat: true,
	  forced: FAILS_ON_PRIMITIVES
	}, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y; // `RegExp.prototype.flags` getter
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

	if (descriptors && (/./g.flags != 'g' || UNSUPPORTED_Y$2)) {
	  objectDefineProperty.f(RegExp.prototype, 'flags', {
	    configurable: true,
	    get: regexpFlags
	  });
	}

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
	function textFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var len = view.byteLength - 1;
	  return version === 3 ? view.getCString(1, encoding).string.replace(/\//g, '\\\\') : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
	}
	function setFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var len = view.byteLength - 1;
	  return version === 3 ? view.getCString(1, encoding).string : view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
	}
	function iplsFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  var encoding = ENCODINGS[view.getUint8(0)];
	  var len = view.byteLength - 1;
	  return view.getString(1, len, encoding).string.replace(/\0/g, '\\\\');
	}
	function urlFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  return view.getCString(0).string;
	}
	function txxxFrame(buffer, version) {
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
	function wxxxFrame(buffer, version) {
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
	function langDescFrame(buffer, version) {
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
	function apicFrame(buffer, version) {
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
	function geobFrame(buffer, version) {
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
	function ufidFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  var ownerId = view.getCString(0);
	  var id = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
	  return {
	    ownerId: ownerId.string,
	    id: id
	  };
	}
	function userFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  var encoding = ENCODINGS[view.getUint8(0)];
	  return {
	    language: view.getString(1, 3).string,
	    text: view.getString(4, view.byteLength - 4, encoding).string
	  };
	}
	function owneFrame(buffer, version) {
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
	function privFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  var ownerId = view.getCString(0);
	  var data = view.getUint8(ownerId.length, view.byteLength - ownerId.length);
	  return {
	    ownerId: ownerId.string,
	    data: data
	  };
	}
	function signFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  return {
	    group: view.getUint8,
	    signature: view.getUint8(1, view.byteLength - 1)
	  };
	}
	function seekFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  return view.getUint32(0);
	}
	function syltFrame(buffer, version) {
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
	function mcdiFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  return {
	    data: view.getUint8(0, view.byteLength)
	  };
	}
	function sytcFrame(buffer, version) {
	  var view = new BufferView(buffer);
	  return {
	    format: view.getUint8(0),
	    data: view.getUint8(1, view.byteLength - 1)
	  };
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
	var STRICT_METHOD$3 = arrayMethodIsStrict('every');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('every'); // `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every

	_export({
	  target: 'Array',
	  proto: true,
	  forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$5
	}, {
	  every: function every(callbackfn
	  /* , thisArg */
	  ) {
	    return $every$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

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

	function textFrame$2(value, options) {
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
	function setFrame$2(value, options) {
	  var version = options.version;
	  if (version === 3) value = value.toString().split('\\\\')[0];else if (version === 4) value = value.toString().replace('\\\\', '\0');
	  return win1251Frame(value, options);
	}
	function urlFrame$2(value, options) {
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
	function txxxFrame$2(values, options) {
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
	function wxxxFrame$2(values, options) {
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
	function iplsFrame$1(value, options) {
	  options.version = 4;
	  return textFrame$2(value, options);
	}
	function langDescFrame$2(values, options) {
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
	function apicFrame$2(values, options) {
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
	function geobFrame$2(values, options) {
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
	function ufidFrame$2(values, options) {
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
	function userFrame$2(value, options) {
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
	function owneFrame$2(value, options) {
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
	function privFrame$2(values, options) {
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
	function signFrame$2(values, options) {
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
	function syltFrame$2(values, options) {
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
	function mcdiFrame$2(value, options) {
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
	function sytcFrame$2(value, options) {
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
	var SYTC = {
	  parse: sytcFrame,
	  validate: sytcFrame$1,
	  write: sytcFrame$2,
	  version: [3, 4]
	};
	var TALB = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: textFrame$2,
	  version: [3, 4]
	};
	var TBPM = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: win1251Frame,
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
	  write: win1251Frame,
	  version: [3]
	};
	var TDEN = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: win1251Frame,
	  version: [4]
	};
	var TDLY = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: win1251Frame,
	  version: [3]
	};
	var TDOR = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: win1251Frame,
	  version: [4]
	};
	var TDRC = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: win1251Frame,
	  version: [4]
	};
	var TDRL = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: win1251Frame,
	  version: [4]
	};
	var TDTG = {
	  parse: textFrame,
	  validate: timeFrame,
	  write: win1251Frame,
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
	  write: win1251Frame,
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
	  write: win1251Frame,
	  version: [3, 4]
	};
	var TLAN = {
	  parse: textFrame,
	  validate: tlanFrame,
	  write: win1251Frame,
	  version: [3, 4]
	};
	var TLEN = {
	  parse: textFrame,
	  validate: textFrame$1,
	  write: win1251Frame,
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
	  write: win1251Frame,
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
	  parse: textFrame,
	  validate: textFrame$1,
	  write: win1251Frame,
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
	  write: win1251Frame,
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
	  write: win1251Frame,
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
	function decode$1(buffer) {
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
	      var seekedTags = decode$1(buffer, offset + frame.value);

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

	function validate$1(tags, strict, options) {
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
	function encode$1(tags, options) {
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
	    this.version = '3.0.0';
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

	        var _ID3v1$decode = decode(buffer),
	            v1Tags = _ID3v1$decode.tags,
	            details = _ID3v1$decode.details;

	        if (verbose) console.log('ID3v1 reading finished');
	        tags.v1 = _objectSpread2({}, v1Tags);
	        tags.v1Details = details;
	      }

	      if (options.id3v2 && hasID3v2(buffer)) {
	        if (verbose) console.log('ID3v2 found, reading...');

	        var _ID3v2$decode = decode$1(buffer),
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
	        validate(tags.v1, options.strict);
	        if (verbose) console.log('Writing ID3v1...');
	        var encoded = encode(tags.v1);
	        var tagBytes = new Uint8Array(encoded);
	        audio = mergeBytes(audio, tagBytes);
	      }

	      if (options.id3v2.include) {
	        if (verbose) console.log('Validating ID3v2...');
	        validate$1(tags.v2, options.strict, options.id3v2);
	        if (verbose) console.log('Writing ID3v2...');

	        var _encoded = encode$1(tags.v2, options.id3v2);

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
