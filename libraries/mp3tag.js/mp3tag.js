(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MP3Tag = factory());
}(this, (function () { 'use strict';

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
    var imgOffset = mime.length + desc.length + 2;
    var imgLength = view.byteLength - imgOffset;
    var img = view.getUint8(imgOffset, imgLength);
    return {
      format: mime.string,
      type: type,
      description: desc.string,
      data: img
    };
  }
  function geobFrame(view, version) {
    var encoding = ENCODINGS[view.getUint8(0)];
    var mime = view.getCString(1, 'ascii');
    var fname = view.getCString(mime.length + 1, encoding);
    var desc = view.getCString(fname.length + mime.length + 1, encoding);
    var binOffset = mime.length + fname.length + desc.length + 1;
    var binLength = view.byteLength - binOffset;
    var binObject = view.getUint8(binOffset, binLength);
    return {
      format: mime.string,
      filename: fname.string,
      description: desc.string,
      object: binObject
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
    var groupId = view.getUint8(0);
    var sign = view.getUint8(1, view.byteLength - 1);
    return {
      group: groupId,
      signature: sign
    };
  }
  function seekFrame(view, version) {
    var offset = view.getUint32(0);
    return offset;
  }

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
  var stringRegex = /^(.+)$/;
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
      if (typeof value.format !== 'string' || typeof value.description !== 'string' || typeof value.type !== 'number') {
        throw new TagError(203, 'Format/type/description is invalid');
      }

      if (!(value.data instanceof ArrayBuffer) && !Array.isArray(value.data) && !ArrayBuffer.isView(value.data)) {
        throw new TagError(203, 'Image data should be ArrayBuffer or an array');
      }

      if (!value.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
        throw new TagError(203, 'Format should be an image');
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
    var encoding = 1;
    var strBytes = [];
    values = Array.isArray(values[0]) ? values[0] : [values[0]];
    values.forEach(function (value) {
      var encoded = encodeString(value + '\0', 'utf-16');
      encoded.forEach(function (_byte3) {
        return strBytes.push(_byte3);
      });
    });
    var size = strBytes.length + 1;
    var header = getHeaderBytes(id, size, version);
    return mergeBytes(header, encoding, strBytes);
  }
  function langDescFrame$2(values, id, version) {
    var bytes = [];
    values.forEach(function (value) {
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
      merged.forEach(function (_byte4) {
        return bytes.push(_byte4);
      });
    });
    return bytes;
  }
  function apicFrame$2(values, id, version) {
    var bytes = [];
    values.forEach(function (value) {
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
      merged.forEach(function (_byte5) {
        return bytes.push(_byte5);
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
      merged.forEach(function (_byte6) {
        return bytes.push(_byte6);
      });
    });
    return bytes;
  }
  function ufidFrame$2(values, id, version) {
    var bytes = [];
    values.forEach(function (value) {
      var ownerBytes = encodeString(value.ownerId + '\0', 'ascii');
      var idBytes = new Uint8Array(value.id);
      var header = getHeaderBytes(id, ownerBytes.length + idBytes.length, version);
      var merged = mergeBytes(header, ownerBytes, idBytes);
      merged.forEach(function (_byte7) {
        return bytes.push(_byte7);
      });
    });
    return bytes;
  }
  function userFrame$2(values, id, version) {
    var bytes = [];
    values.forEach(function (value) {
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
      merged.forEach(function (_byte8) {
        return bytes.push(_byte8);
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
      merged.forEach(function (_byte9) {
        return bytes.push(_byte9);
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
      merged.forEach(function (_byte10) {
        return bytes.push(_byte10);
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
      merged.forEach(function (_byte11) {
        return bytes.push(_byte11);
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
    OWNE: OWNE,
    PRIV: PRIV,
    SEEK: SEEK,
    SIGN: SIGN,
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
      this.version = '1.0.0';
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
