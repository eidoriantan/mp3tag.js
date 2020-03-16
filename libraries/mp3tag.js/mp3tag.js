(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.MP3Tag = factory());
}(this, (function () { 'use strict';

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

  function isNativeReflectConstruct() {
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
    if (isNativeReflectConstruct()) {
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

    function BufferView() {
      _classCallCheck(this, BufferView);

      return _possibleConstructorReturn(this, _getPrototypeOf(BufferView).apply(this, arguments));
    }

    _createClass(BufferView, [{
      key: "getString",
      value: function getString(offset, maxlength, format) {
        var bytes = this.getUint8(offset, maxlength);
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

              string = this.getUint16String(offset, maxlength, le);
              break;
            }

          default:
            string = this.getUint8String(offset, maxlength);
        }

        if (string.match(/^[\s\S]+(\0)$/)) {
          string = string.substr(0, string.length - 1);
        }

        return string;
      }
    }, {
      key: "getCString",
      value: function getCString(offset, format) {
        var terminated = [];
        var bytes = [];
        var bytesPerChar = 1;

        if (format === 'utf-16' || format === 'utf-16be') {
          bytes = this.getUint16(offset, this.byteLength - offset);
        } else {
          bytes = this.getUint8(offset, this.byteLength - offset);
        }

        for (var i = 0; i < bytes.length; i++) {
          if (bytes[i] !== 0x00) terminated.push(bytes[i]);else break;
        }

        bytesPerChar = bytes.BYTES_PER_ELEMENT;
        var length = terminated.length * bytesPerChar;
        var string = this.getString(offset, length, format);
        return {
          string: string,
          length: length + bytesPerChar
        };
      }
    }, {
      key: "getUint8String",
      value: function getUint8String(offset, length) {
        var bytes = this.getUint8(offset, length);
        var string = '';

        if (!ArrayBuffer.isView(bytes)) {
          bytes = [bytes];
        }

        for (var i = 0; i < bytes.length; i++) {
          var character = String.fromCharCode(bytes[i]);
          string += character;
        }

        return string;
      }
    }, {
      key: "getUint8CString",
      value: function getUint8CString(offset) {
        var bytes = this.getUint8(offset, this.byteLength - offset);
        var string = '';

        if (!ArrayBuffer.isView(bytes)) {
          bytes = [bytes];
        }

        for (var i = 0; i < bytes.length; i++) {
          var _byte = bytes[i];

          if (_byte !== 0x00) {
            var character = String.fromCharCode(_byte);
            string += character;
          } else break;
        }

        return string;
      }
    }, {
      key: "getUint16String",
      value: function getUint16String(offset, length) {
        var le = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var bytes = this.getUint16(offset, length, le);
        var string = '';

        for (var i = 0; i < bytes.length; i++) {
          var character = String.fromCharCode(bytes[i]);
          string += character;
        }

        return string;
      }
    }, {
      key: "getUint16CString",
      value: function getUint16CString(offset) {
        var le = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var bytes = this.getUint16(offset, this.byteLength - offset, le);
        var string = '';

        for (var i = 0; i < bytes.length; i++) {
          var _byte2 = bytes[i];

          if (_byte2 !== 0x0000) {
            var character = String.fromCharCode(_byte2);
            string += character;
          } else break;
        }

        return string;
      }
    }, {
      key: "getUint8",
      value: function getUint8(offset) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var end = offset + length;
        var bytes = new Uint8Array(length);
        var i = 0;

        while (offset < this.byteLength && offset < end) {
          bytes[i] = DataView.prototype.getUint8.call(this, offset++);
          i++;
        }

        return length === 1 ? bytes[0] : bytes;
      }
    }, {
      key: "getUint16",
      value: function getUint16(offset) {
        var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var le = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var end = offset + length;
        var bytes = new Uint16Array(length / 2);
        var i = 0;

        while (offset < this.byteLength && offset < end) {
          bytes[i] = DataView.prototype.getUint16.call(this, offset, le);
          offset += 2;
          i++;
        }

        return length === 1 ? bytes[0] : bytes;
      }
    }]);

    return BufferView;
  }( /*#__PURE__*/_wrapNativeSuper(DataView));

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
    203: 'Frame validation',
    204: 'Frame is not supported in this version of ID3v2'
  };

  var TagError = /*#__PURE__*/function (_Error) {
    _inherits(TagError, _Error);

    function TagError(code) {
      var _this;

      _classCallCheck(this, TagError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(TagError).call(this, E_CODES[code]));
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

  function getHeaderFlags(version, _byte) {
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
  function getFrameFlags(version, bytes) {
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

  function mergeAsArray() {
    var array = [];

    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    params.forEach(function (param) {
      if (Array.isArray(param)) param.forEach(function (elem) {
        return array.push(elem);
      });else array.push(param);
    });
    return array;
  }

  var ENCODINGS = ['ascii', 'utf-16', 'utf-16be', 'utf-8'];
  /**
   *  @see http://id3.org/id3v2.3.0
   */

  /**
   *  Frame Parsers
   *  @param {BufferView} view - View of the entire frame excluding the header
   *  @param {number} version - Frame will be parsed with this version
   */

  function textFrame(view, version) {
    /**
     *  Text encoding   $xx
     *  Information     <text string according to encoding>
     */
    var encoding = ENCODINGS[view.getUint8(0)];
    var value;

    switch (version) {
      case 3:
        value = view.getCString(1, encoding).string;
        break;

      case 4:
        value = view.getString(1, view.byteLength - 1, encoding).split('\0');
        if (value.length === 1) value = value[0];
        break;

      default:
        throw new TagError(201, version);
    }

    return value;
  }
  function arrayFrame(view, version) {
    // Multiple-value text frames
    var text = textFrame(view, version);
    var value = [];

    switch (version) {
      case 3:
        value = text.split('/');
        break;

      case 4:
        if (!Array.isArray(text)) value = [text];else value = text;
        break;

      default:
        throw new TagError(201, version);
    }

    return value;
  }
  function numberFrame(view, version) {
    // Text numerical string frames
    var text = textFrame(view, version);
    return text.match(/^(\d+)$/) ? parseInt(text) : text;
  }
  function setFrame(view, version) {
    // Set frames (e.g. "1/2")
    var text = textFrame(view, version);
    var array = mergeAsArray(text);
    var value = [];
    array.forEach(function (elem) {
      var splitted = elem.split('/');
      value.push(elem.match(/^(\d+)\/(\d+)/) ? {
        position: parseInt(splitted[0]),
        total: parseInt(splitted[1])
      } : elem);
    });
    return value.length === 1 ? value[0] : value;
  }
  function urlFrame(view, version) {
    // URL   <text string>
    return view.getCString(0, 'ascii').string;
  }
  function txxxFrame(view, version) {
    /**
     *  Text encoding   $xx
     *  Description     <text string according to encoding> $00 (00)
     *  Value           <text string according to encoding>
     */
    var encoding = ENCODINGS[view.getUint8(0)];
    var description = view.getCString(1, encoding);
    var valueLength = view.byteLength - description.length - 1;
    var value = view.getString(description.length + 1, valueLength, encoding);
    return {
      description: description.string,
      text: value
    };
  }
  function wxxxFrame(view) {
    /**
     *  Text encoding   $xx
     *  Description     <text string according to encoding> $00 (00)
     *  URL             <text string>
     */
    var encoding = ENCODINGS[view.getUint8(0)];
    var description = view.getCString(1, encoding);
    var urlLength = view.byteLength - description.length - 1;
    var url = view.getString(description.length + 1, urlLength, 'ascii');
    return {
      description: description.string,
      url: url
    };
  }
  function langDescFrame(view) {
    /**
     *  Text encoding           $xx
     *  Language                $xx xx xx
     *  Short content descrip.  <text string according to encoding> $00 (00)
     *  The actual text         <full text string according to encoding>
     */
    var encoding = ENCODINGS[view.getUint8(0)];
    var description = view.getCString(4, encoding);
    var textLength = view.byteLength - description.length - 4;
    var text = view.getString(description.length + 4, textLength, encoding);
    return {
      language: view.getString(1, 3, 'ascii'),
      descriptor: description.string,
      text: text
    };
  }
  function apicFrame(view) {
    /**
     *  Text encoding   $xx
     *  MIME type       <text string> $00
     *  Picture type    $xx
     *  Description     <text string according to encoding> $00 (00)
     *  Picture data    <binary data>
     */
    var encoding = ENCODINGS[view.getUint8(0)];
    var mime = view.getCString(1, 'ascii');
    var type = view.getUint8(mime.length + 1);
    var desc = view.getCString(mime.length + 2, encoding);
    var imgLength = view.byteLength - mime.length - desc.length - 2;
    var img = view.getUint8(mime.length + desc.length + 2, imgLength);
    return {
      format: mime.string,
      type: type,
      description: desc.string,
      data: img
    };
  }

  var urlRegex = /^(https?):\/\/[^\s/$.?#]+\.[^\s]*/;
  var langRegex = /^([a-z]{3})$/;

  function validateID(id) {
    if (!id.match(/^([a-zA-Z0-9]{4})$/)) {
      throw new TagError(203, 'ID is invalid');
    }

    return true;
  }
  /**
   *  Validators
   *  @param {Object} frame - Frame to be validated
   *  @param {number} version - Frame will be validated with this version
   */


  function textFrame$1(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      if (typeof elem !== 'string') {
        throw new TagError(203, "".concat(frame.id, " value is not a string"));
      }
    });
    return true;
  }
  function arrayFrame$1(frame, version) {
    validateID(frame.id);

    if (!Array.isArray(frame.value)) {
      throw new TagError(203, "".concat(frame.id, " value is not an array"));
    }

    frame.value.forEach(function (text) {
      if (typeof text !== 'string') {
        throw new TagError(203, "".concat(frame.id, " value is not a string"));
      }
    });
    return true;
  }
  function numberFrame$1(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      if (typeof elem !== 'number') {
        throw new TagError(203, "".concat(frame.id, " value is not a number"));
      }
    });
    return true;
  }
  function setFrame$1(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      if (typeof elem.position !== 'number' || typeof elem.total !== 'number') {
        throw new TagError(203, "".concat(frame.id, " position/total is not a number"));
      }

      if (elem.position > elem.total) {
        throw new TagError(203, "".concat(frame.id, " position is greater than total"));
      }
    });
    return true;
  }
  function timeFrame(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      switch (version) {
        case 3:
          if (!elem.toString().match(/^([0-9]{4})$/)) {
            throw new TagError(203, "".concat(frame.id, " is not 4 numeric characters"));
          }

          break;

        case 4:
          if (typeof elem !== 'string') {
            throw new TagError(203, "".concat(frame.id, " value is not a string"));
          }
          /**
           *  @TODO Improve regex matching the format
           */


          if (!elem.match(/^([0-9]{8})T([0-9]{6})$/)) {
            throw new TagError(203, 'Time Frames should follow this format: YYYYMMDD\\THHMMSS');
          }

          break;

        default:
          throw new TagError(201, version);
      }
    });
    return true;
  }
  function urlFrame$1(frame, version) {
    validateID(frame.id);

    if (typeof frame.value !== 'string') {
      throw new TagError(203, "".concat(frame.id, " value is not a string"));
    }

    if (!frame.value.match(urlRegex)) {
      throw new TagError(203, 'URL is not a valid URL');
    }

    return true;
  }
  function txxxFrame$1(frame) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    var descriptions = [];
    array.forEach(function (elem) {
      if (typeof elem.description !== 'string' || typeof elem.text !== 'string') {
        throw new TagError(203, 'User-defined text/description is not a string');
      }

      if (descriptions.includes(elem.description)) {
        throw new TagError(203, 'User-defined description should not duplicate');
      } else {
        descriptions.push(elem.description);
      }
    });
    return true;
  }
  function wxxxFrame$1(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    var descriptions = [];
    array.forEach(function (elem) {
      if (typeof elem.description !== 'string' || typeof elem.url !== 'string') {
        throw new TagError(203, 'User-defined text/description is not a string');
      }

      if (!elem.url.match(urlRegex)) {
        throw new TagError(203, 'User-defined URL is an invalid URL');
      }

      if (descriptions.includes(elem.description)) {
        throw new TagError(203, 'User-defined description should not duplicate');
      } else {
        descriptions.push(elem.description);
      }
    });
    return true;
  }
  function tkeyFrame(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      if (typeof elem !== 'string') {
        throw new TagError(203, 'TKEY is not a string');
      }

      if (!elem.match(/^([A-Gb#mo]{3})$/)) {
        throw new TagError(203, 'Invalid TKEY Format (e.g. Cbm)');
      }
    });
    return true;
  }
  function tlanFrame(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      if (typeof elem !== 'string') {
        throw new TagError(203, 'TLAN is not a string');
      }

      if (!elem.match(langRegex)) {
        throw new TagError(203, 'Language does not follow ISO 639-2');
      }
    });
    return true;
  }
  function tsrcFrame(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      if (typeof elem !== 'string') {
        throw new TagError(203, 'TSRC is not a string');
      }

      if (!elem.match(/^([a-zA-Z0-9]{12})$/)) {
        throw new TagError(203, 'Invalid ISRC format');
      }
    });
    return true;
  }
  function langDescFrame$1(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    var descriptors = [];
    array.forEach(function (elem) {
      if (typeof elem.language !== 'string' || typeof elem.descriptor !== 'string' || typeof elem.text !== 'string') {
        throw new TagError(203, 'Language/descriptor/text is not a string');
      }

      if (!elem.language.match(langRegex)) {
        throw new TagError(203, 'Language does not follow ISO 639-2');
      }

      if (descriptors.includes(elem.descriptor)) {
        throw new TagError(203, 'Language/descriptor/text should not duplicate');
      } else {
        descriptors.push(elem.descriptor);
      }
    });
    return true;
  }
  function apicFrame$1(frame, version) {
    validateID(frame.id);
    var array = mergeAsArray(frame.value);
    var descriptions = [];
    array.forEach(function (elem) {
      if (typeof elem.format !== 'string' || typeof elem.description !== 'string' || typeof elem.type !== 'number') {
        throw new TagError(203, 'MIME, type, or description is invalid');
      }

      if (!(elem.data instanceof ArrayBuffer) && !Array.isArray(elem.data) && !ArrayBuffer.isView(elem.data)) {
        throw new TagError(203, 'Image data should be ArrayBuffer or an array');
      }

      if (descriptions.includes(elem.description)) {
        throw new TagError(203, 'Cover description should not duplicate');
      } else {
        descriptions.push(elem.description);
      }

      if (elem.description.length > 64) {
        throw new TagError(203, 'Description should not exceed 64');
      }

      if (!elem.format.match(/(image\/[a-z0-9!#$&.+\-^_]+){0,129}/)) {
        throw new TagError(203, 'MIME type should be an image');
      }
    });
    return true;
  }

  /**
   *  @see http://id3.org/id3v2.3.0
   */

  function getHeaderBytes(id, size, version) {
    var idBytes = encodeString(id, 'ascii');
    var sizeView = new BufferView(new ArrayBuffer(4));

    switch (version) {
      case 3:
        sizeView.setUint32(0, size);
        break;

      case 4:
        sizeView.setUint32(0, encodeSynch(size));
        break;

      default:
        throw new TagError(201, version);
    }

    return mergeBytes(idBytes, sizeView.getUint8(0, 4), 0, 0);
  }
  /**
   *  Frames writers
   *  @param {Object} frame - Frame id and its value
   *  @param {number} version - Frame will be written with this version
   */


  function textFrame$2(frame, version) {
    var encoding = 0;
    var strBytes = [];

    switch (version) {
      case 3:
        encoding = 1;
        strBytes = encodeString(frame.value + '\0', 'utf-16');
        break;

      case 4:
        if (Array.isArray(frame.value)) frame.value = frame.value.join('\0');
        encoding = 3;
        strBytes = encodeString(frame.value + '\0', 'utf-8');
        break;

      default:
        throw new TagError(201, version);
    }

    var header = getHeaderBytes(frame.id, strBytes.length + 1, version);
    return mergeBytes(header, encoding, strBytes);
  }
  function arrayFrame$2(frame, version) {
    switch (version) {
      case 3:
        frame.value = frame.value.join('/');
        break;

      case 4:
        frame.value = frame.value.join('\0');
        break;

      default:
        throw new TagError(201, version);
    }

    return textFrame$2(frame, version);
  }
  function asciiFrame(frame, version) {
    var strBytes = encodeString(frame.value.toString() + '\0', 'ascii');
    var header = getHeaderBytes(frame.id, strBytes.length + 1, version);
    return mergeBytes(header, 0, strBytes);
  }
  function setFrame$2(frame, version) {
    switch (version) {
      case 3:
        frame.value = frame.value.position + '/' + frame.value.total;
        break;

      case 4:
        {
          var array = mergeAsArray(frame.value);
          var value = [];
          array.forEach(function (elem) {
            value.push(elem.position + '/' + elem.total);
          });
          frame.value = value.join('\0');
          break;
        }
    }

    return asciiFrame(frame, version);
  }
  function urlFrame$2(frame, version) {
    var strBytes = encodeString(frame.value + '\0', 'ascii');
    var header = getHeaderBytes(frame.id, strBytes.length, version);
    return mergeBytes(header, strBytes);
  }
  function txxxFrame$2(frame, version) {
    var bytes = [];
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      var encoding = 0;
      var descBytes = [];
      var strBytes = [];

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(elem.description + '\0', 'utf-16');
          strBytes = encodeString(elem.text + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(elem.description + '\0', 'utf-8');
          strBytes = encodeString(elem.text + '\0', 'utf-8');
          break;

        default:
          throw new TagError(201, version);
      }

      var size = descBytes.length + strBytes.length + 1;
      var header = getHeaderBytes(frame.id, size, version);
      var merged = mergeBytes(header, encoding, descBytes, strBytes);
      merged.forEach(function (_byte) {
        return bytes.push(_byte);
      });
    });
    return bytes;
  }
  function wxxxFrame$2(frame, version) {
    var bytes = [];
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      var encoding = 0;
      var descBytes = [];
      var strBytes = [];

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(elem.description + '\0', 'utf-16');
          strBytes = encodeString(elem.url, 'ascii');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(elem.description + '\0', 'utf-8');
          strBytes = encodeString(elem.url, 'ascii');
          break;

        default:
          throw new TagError(201, version);
      }

      var size = descBytes.length + strBytes.length + 1;
      var header = getHeaderBytes(frame.id, size, version);
      var merged = mergeBytes(header, encoding, descBytes, strBytes);
      merged.forEach(function (_byte2) {
        return bytes.push(_byte2);
      });
    });
    return bytes;
  }
  function langDescFrame$2(frame, version) {
    var bytes = [];
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      var encoding = 0;
      var langBytes = encodeString(elem.language, 'ascii');
      var descBytes = [];
      var textBytes = [];

      switch (version) {
        case 3:
          encoding = 1;
          descBytes = encodeString(elem.descriptor + '\0', 'utf-16');
          textBytes = encodeString(elem.text, 'utf-16');
          break;

        case 4:
          encoding = 3;
          descBytes = encodeString(elem.descriptor + '\0', 'utf-8');
          textBytes = encodeString(elem.text, 'utf-8');
          break;

        default:
          throw new TagError(201, version);
      }

      var size = descBytes.length + textBytes.length + 4;
      var header = getHeaderBytes(frame.id, size, version);
      var merged = mergeBytes(header, encoding, langBytes, descBytes, textBytes);
      merged.forEach(function (_byte3) {
        return bytes.push(_byte3);
      });
    });
    return bytes;
  }
  function apicFrame$2(frame, version) {
    var bytes = [];
    var array = mergeAsArray(frame.value);
    array.forEach(function (elem) {
      var encoding = 0;
      var mimeBytes = encodeString(elem.format + '\0', 'ascii');
      var imageBytes = new Uint8Array(elem.data);
      var strBytes = [];

      switch (version) {
        case 3:
          encoding = 1;
          strBytes = encodeString(elem.description + '\0', 'utf-16');
          break;

        case 4:
          encoding = 3;
          strBytes = encodeString(elem.description + '\0', 'utf-8');
          break;

        default:
          throw new TagError(201, version);
      }

      var size = mimeBytes.length + strBytes.length + imageBytes.length + 2;
      var header = getHeaderBytes(frame.id, size, version);
      var merged = mergeBytes(header, encoding, mimeBytes, elem.type, strBytes, imageBytes);
      merged.forEach(function (_byte4) {
        return bytes.push(_byte4);
      });
    });
    return bytes;
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
    parse: arrayFrame,
    validate: arrayFrame$1,
    write: arrayFrame$2,
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
    parse: numberFrame,
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
    write: textFrame$2,
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
    write: textFrame$2,
    version: [4]
  };
  var TENC = {
    parse: textFrame,
    validate: textFrame$1,
    write: textFrame$2,
    version: [3, 4]
  };
  var TEXT = {
    parse: arrayFrame,
    validate: arrayFrame$1,
    write: arrayFrame$2,
    version: [3, 4]
  };
  var TFLT = {
    parse: textFrame,
    validate: textFrame$1,
    write: textFrame$2,
    version: [3, 4]
  };
  var TIME = {
    parse: numberFrame,
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
    parse: arrayFrame,
    validate: arrayFrame$1,
    write: arrayFrame$2,
    version: [3, 4]
  };
  var TOPE = {
    parse: arrayFrame,
    validate: arrayFrame$1,
    write: arrayFrame$2,
    version: [3, 4]
  };
  var TORY = {
    parse: numberFrame,
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
    parse: arrayFrame,
    validate: arrayFrame$1,
    write: arrayFrame$2,
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
    parse: numberFrame,
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
        var mediaView = new BufferView(this.buffer);
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
        this.flags = getHeaderFlags(this.major, mediaView.getUint8(5));
        this.frames = [];
        var offset = 10;

        while (offset < this.size) {
          var frameView = mediaView.getUint8(offset, this.size);
          var frame = decodeFrame.call(this, frameView);

          if (frame) {
            this.frames.push(frame);
            offset += frame.size + 10;
          } else break;
        }

        return this.frames;
      }
    }, {
      key: "validate",
      value: function validate() {
        var framesObj = this.parse();
        var frameDesc;
        var frame;

        for (var id in framesObj) {
          frameDesc = frames[id];
          frame = {
            id: id,
            value: framesObj[id]
          };
          if (frameDesc) frameDesc.validate(frame, this.major);else throw new TagError(202, id);
        }

        return true;
      }
    }, {
      key: "save",
      value: function save() {
        if (this.frames.length === 0) return this.getAudio().buffer;
        if (!this.validate()) return false;
        this.major = this.options.version || this.major || 3;
        this.minor = 0;
        var framesObj = this.parse();
        var headerBytes = [0x49, 0x44, 0x33, this.major, this.minor, 32];
        var sizeView = new BufferView(new ArrayBuffer(4));
        var paddingBytes = new Uint8Array(this.options.padding);
        var audioBytes = this.getAudio();
        var framesBytes = [];
        var frameDesc;
        var frame;

        for (var id in framesObj) {
          frameDesc = frames[id];
          frame = {
            id: id,
            value: framesObj[id]
          };

          if (!frameDesc.version.includes(this.major)) {
            throw new TagError(204, id);
          }

          var bytes = frameDesc.write(frame, this.major);
          bytes.forEach(function (_byte) {
            return framesBytes.push(_byte);
          });
        }

        sizeView.setUint32(0, encodeSynch(framesBytes.length + paddingBytes.length));
        var resultBytes = mergeBytes(headerBytes, sizeView.getUint8(0, 4), framesBytes, paddingBytes, audioBytes);
        this.buffer = resultBytes.buffer;
        this.read();
        return this.buffer;
      }
    }, {
      key: "parse",
      value: function parse() {
        var framesObj = {};
        this.frames.forEach(function (frame) {
          if (framesObj[frame.id]) {
            if (Array.isArray(framesObj[frame.id])) {
              framesObj[frame.id].push(frame.value);
            } else {
              framesObj[frame.id] = [framesObj[frame.id], frame.value];
            }
          } else {
            framesObj[frame.id] = frame.value;
          }
        });
        return framesObj;
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
    var frameView = new BufferView(bytes.buffer);
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

    frame.flags = getFrameFlags(this.major, frameView.getUint8(8, 2));
    var frameDesc = frames[frame.id];
    var offset = 10;
    var actualSize = frame.size;
    var dataLength = frame.size;
    var contentBytes = [];

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
      contentBytes = new ArrayBuffer(actualSize);
      new Uint8Array(contentBytes).set(unsynched);
    } else {
      contentBytes = frameView.buffer.slice(offset, offset + actualSize);
    }

    frame.value = frameDesc.parse(new BufferView(contentBytes), this.major);
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

    function MP3Tag(buffer, options) {
      _classCallCheck(this, MP3Tag);

      if (buffer instanceof ArrayBuffer === false) {
        throw new TypeError('buffer is not an instance of ArrayBuffer');
      }

      this.buffer = buffer;
      this.tagger = {};
      this.options = options;
    }

    _createClass(MP3Tag, [{
      key: "read",
      value: function read() {
        var mediaView = new BufferView(this.buffer);

        if (mediaView.getUint8String(0, 3) === 'ID3') {
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
        this.buffer = this.tagger.save();
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
