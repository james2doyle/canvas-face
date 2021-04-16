import {c as createCommonjsModule, a as commonjsGlobal} from "./common/_commonjsHelpers-798ad6a7.js";
var Global = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports._registerNode = exports._NODES_REGISTRY = exports.Konva = exports.glob = exports._parseUA = void 0;
  var PI_OVER_180 = Math.PI / 180;
  function detectBrowser() {
    return typeof window !== "undefined" && ({}.toString.call(window) === "[object Window]" || {}.toString.call(window) === "[object global]");
  }
  var _detectIE = function(ua) {
    var msie = ua.indexOf("msie ");
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
    }
    var trident = ua.indexOf("trident/");
    if (trident > 0) {
      var rv = ua.indexOf("rv:");
      return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
    }
    var edge = ua.indexOf("edge/");
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
    }
    return false;
  };
  var _parseUA = function(userAgent) {
    var ua = userAgent.toLowerCase(), match = /(chrome)[ /]([\w.]+)/.exec(ua) || /(webkit)[ /]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [], mobile = !!userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i), ieMobile = !!userAgent.match(/IEMobile/i);
    return {
      browser: match[1] || "",
      version: match[2] || "0",
      isIE: _detectIE(ua),
      mobile,
      ieMobile
    };
  };
  exports._parseUA = _parseUA;
  exports.glob = typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" ? self : {};
  exports.Konva = {
    _global: exports.glob,
    version: "7.2.5",
    isBrowser: detectBrowser(),
    isUnminified: /param/.test(function(param) {
    }.toString()),
    dblClickWindow: 400,
    getAngle: function(angle) {
      return exports.Konva.angleDeg ? angle * PI_OVER_180 : angle;
    },
    enableTrace: false,
    _pointerEventsEnabled: false,
    hitOnDragEnabled: false,
    captureTouchEventsEnabled: false,
    listenClickTap: false,
    inDblClickWindow: false,
    pixelRatio: void 0,
    dragDistance: 3,
    angleDeg: true,
    showWarnings: true,
    dragButtons: [0, 1],
    isDragging: function() {
      return exports.Konva["DD"].isDragging;
    },
    isDragReady: function() {
      return !!exports.Konva["DD"].node;
    },
    UA: exports._parseUA(exports.glob.navigator && exports.glob.navigator.userAgent || ""),
    document: exports.glob.document,
    _injectGlobal: function(Konva) {
      exports.glob.Konva = Konva;
    },
    _parseUA: exports._parseUA
  };
  exports._NODES_REGISTRY = {};
  var _registerNode = function(NodeClass) {
    exports._NODES_REGISTRY[NodeClass.prototype.getClassName()] = NodeClass;
    exports.Konva[NodeClass.prototype.getClassName()] = NodeClass;
  };
  exports._registerNode = _registerNode;
});
var Util = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Util = exports.Transform = exports.Collection = void 0;
  var Collection = function() {
    function Collection2() {
    }
    Collection2.toCollection = function(arr) {
      var collection = new Collection2(), len = arr.length, n;
      for (n = 0; n < len; n++) {
        collection.push(arr[n]);
      }
      return collection;
    };
    Collection2._mapMethod = function(methodName) {
      Collection2.prototype[methodName] = function() {
        var len = this.length, i;
        var args = [].slice.call(arguments);
        for (i = 0; i < len; i++) {
          this[i][methodName].apply(this[i], args);
        }
        return this;
      };
    };
    Collection2.mapMethods = function(constructor) {
      var prot = constructor.prototype;
      for (var methodName in prot) {
        Collection2._mapMethod(methodName);
      }
    };
    return Collection2;
  }();
  exports.Collection = Collection;
  Collection.prototype = [];
  Collection.prototype.each = function(func) {
    for (var n = 0; n < this.length; n++) {
      func(this[n], n);
    }
  };
  Collection.prototype.toArray = function() {
    var arr = [], len = this.length, n;
    for (n = 0; n < len; n++) {
      arr.push(this[n]);
    }
    return arr;
  };
  var Transform = function() {
    function Transform2(m) {
      if (m === void 0) {
        m = [1, 0, 0, 1, 0, 0];
      }
      this.dirty = false;
      this.m = m && m.slice() || [1, 0, 0, 1, 0, 0];
    }
    Transform2.prototype.reset = function() {
      this.m[0] = 1;
      this.m[1] = 0;
      this.m[2] = 0;
      this.m[3] = 1;
      this.m[4] = 0;
      this.m[5] = 0;
    };
    Transform2.prototype.copy = function() {
      return new Transform2(this.m);
    };
    Transform2.prototype.copyInto = function(tr) {
      tr.m[0] = this.m[0];
      tr.m[1] = this.m[1];
      tr.m[2] = this.m[2];
      tr.m[3] = this.m[3];
      tr.m[4] = this.m[4];
      tr.m[5] = this.m[5];
    };
    Transform2.prototype.point = function(point) {
      var m = this.m;
      return {
        x: m[0] * point.x + m[2] * point.y + m[4],
        y: m[1] * point.x + m[3] * point.y + m[5]
      };
    };
    Transform2.prototype.translate = function(x, y) {
      this.m[4] += this.m[0] * x + this.m[2] * y;
      this.m[5] += this.m[1] * x + this.m[3] * y;
      return this;
    };
    Transform2.prototype.scale = function(sx, sy) {
      this.m[0] *= sx;
      this.m[1] *= sx;
      this.m[2] *= sy;
      this.m[3] *= sy;
      return this;
    };
    Transform2.prototype.rotate = function(rad) {
      var c = Math.cos(rad);
      var s = Math.sin(rad);
      var m11 = this.m[0] * c + this.m[2] * s;
      var m12 = this.m[1] * c + this.m[3] * s;
      var m21 = this.m[0] * -s + this.m[2] * c;
      var m22 = this.m[1] * -s + this.m[3] * c;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      return this;
    };
    Transform2.prototype.getTranslation = function() {
      return {
        x: this.m[4],
        y: this.m[5]
      };
    };
    Transform2.prototype.skew = function(sx, sy) {
      var m11 = this.m[0] + this.m[2] * sy;
      var m12 = this.m[1] + this.m[3] * sy;
      var m21 = this.m[2] + this.m[0] * sx;
      var m22 = this.m[3] + this.m[1] * sx;
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      return this;
    };
    Transform2.prototype.multiply = function(matrix) {
      var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1];
      var m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1];
      var m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3];
      var m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3];
      var dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4];
      var dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];
      this.m[0] = m11;
      this.m[1] = m12;
      this.m[2] = m21;
      this.m[3] = m22;
      this.m[4] = dx;
      this.m[5] = dy;
      return this;
    };
    Transform2.prototype.invert = function() {
      var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]);
      var m0 = this.m[3] * d;
      var m1 = -this.m[1] * d;
      var m2 = -this.m[2] * d;
      var m3 = this.m[0] * d;
      var m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]);
      var m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      this.m[0] = m0;
      this.m[1] = m1;
      this.m[2] = m2;
      this.m[3] = m3;
      this.m[4] = m4;
      this.m[5] = m5;
      return this;
    };
    Transform2.prototype.getMatrix = function() {
      return this.m;
    };
    Transform2.prototype.setAbsolutePosition = function(x, y) {
      var m0 = this.m[0], m1 = this.m[1], m2 = this.m[2], m3 = this.m[3], m4 = this.m[4], m5 = this.m[5], yt = (m0 * (y - m5) - m1 * (x - m4)) / (m0 * m3 - m1 * m2), xt = (x - m4 - m2 * yt) / m0;
      return this.translate(xt, yt);
    };
    Transform2.prototype.decompose = function() {
      var a = this.m[0];
      var b = this.m[1];
      var c = this.m[2];
      var d = this.m[3];
      var e = this.m[4];
      var f = this.m[5];
      var delta = a * d - b * c;
      var result = {
        x: e,
        y: f,
        rotation: 0,
        scaleX: 0,
        scaleY: 0,
        skewX: 0,
        skewY: 0
      };
      if (a != 0 || b != 0) {
        var r = Math.sqrt(a * a + b * b);
        result.rotation = b > 0 ? Math.acos(a / r) : -Math.acos(a / r);
        result.scaleX = r;
        result.scaleY = delta / r;
        result.skewX = (a * c + b * d) / delta;
        result.skewY = 0;
      } else if (c != 0 || d != 0) {
        var s = Math.sqrt(c * c + d * d);
        result.rotation = Math.PI / 2 - (d > 0 ? Math.acos(-c / s) : -Math.acos(c / s));
        result.scaleX = delta / s;
        result.scaleY = s;
        result.skewX = 0;
        result.skewY = (a * c + b * d) / delta;
      } else
        ;
      result.rotation = exports.Util._getRotation(result.rotation);
      return result;
    };
    return Transform2;
  }();
  exports.Transform = Transform;
  var OBJECT_ARRAY = "[object Array]", OBJECT_NUMBER = "[object Number]", OBJECT_STRING = "[object String]", OBJECT_BOOLEAN = "[object Boolean]", PI_OVER_DEG180 = Math.PI / 180, DEG180_OVER_PI = 180 / Math.PI, HASH = "#", EMPTY_STRING = "", ZERO = "0", KONVA_WARNING = "Konva warning: ", KONVA_ERROR = "Konva error: ", RGB_PAREN = "rgb(", COLORS = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 132, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 255, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 203],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [119, 128, 144],
    slategrey: [119, 128, 144],
    snow: [255, 255, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    transparent: [255, 255, 255, 0],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 5]
  }, RGB_REGEX = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/, animQueue = [];
  exports.Util = {
    _isElement: function(obj) {
      return !!(obj && obj.nodeType == 1);
    },
    _isFunction: function(obj) {
      return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    _isPlainObject: function(obj) {
      return !!obj && obj.constructor === Object;
    },
    _isArray: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_ARRAY;
    },
    _isNumber: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_NUMBER && !isNaN(obj) && isFinite(obj);
    },
    _isString: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_STRING;
    },
    _isBoolean: function(obj) {
      return Object.prototype.toString.call(obj) === OBJECT_BOOLEAN;
    },
    isObject: function(val) {
      return val instanceof Object;
    },
    isValidSelector: function(selector) {
      if (typeof selector !== "string") {
        return false;
      }
      var firstChar = selector[0];
      return firstChar === "#" || firstChar === "." || firstChar === firstChar.toUpperCase();
    },
    _sign: function(number) {
      if (number === 0) {
        return 1;
      }
      if (number > 0) {
        return 1;
      } else {
        return -1;
      }
    },
    requestAnimFrame: function(callback) {
      animQueue.push(callback);
      if (animQueue.length === 1) {
        requestAnimationFrame(function() {
          var queue = animQueue;
          animQueue = [];
          queue.forEach(function(cb) {
            cb();
          });
        });
      }
    },
    createCanvasElement: function() {
      var canvas = document.createElement("canvas");
      try {
        canvas.style = canvas.style || {};
      } catch (e) {
      }
      return canvas;
    },
    createImageElement: function() {
      return document.createElement("img");
    },
    _isInDocument: function(el) {
      while (el = el.parentNode) {
        if (el == document) {
          return true;
        }
      }
      return false;
    },
    _simplifyArray: function(arr) {
      var retArr = [], len = arr.length, util = exports.Util, n, val;
      for (n = 0; n < len; n++) {
        val = arr[n];
        if (util._isNumber(val)) {
          val = Math.round(val * 1e3) / 1e3;
        } else if (!util._isString(val)) {
          val = val.toString();
        }
        retArr.push(val);
      }
      return retArr;
    },
    _urlToImage: function(url, callback) {
      var imageObj = new Global.glob.Image();
      imageObj.onload = function() {
        callback(imageObj);
      };
      imageObj.src = url;
    },
    _rgbToHex: function(r, g, b) {
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    },
    _hexToRgb: function(hex) {
      hex = hex.replace(HASH, EMPTY_STRING);
      var bigint = parseInt(hex, 16);
      return {
        r: bigint >> 16 & 255,
        g: bigint >> 8 & 255,
        b: bigint & 255
      };
    },
    getRandomColor: function() {
      var randColor = (Math.random() * 16777215 << 0).toString(16);
      while (randColor.length < 6) {
        randColor = ZERO + randColor;
      }
      return HASH + randColor;
    },
    get: function(val, def) {
      if (val === void 0) {
        return def;
      } else {
        return val;
      }
    },
    getRGB: function(color) {
      var rgb;
      if (color in COLORS) {
        rgb = COLORS[color];
        return {
          r: rgb[0],
          g: rgb[1],
          b: rgb[2]
        };
      } else if (color[0] === HASH) {
        return this._hexToRgb(color.substring(1));
      } else if (color.substr(0, 4) === RGB_PAREN) {
        rgb = RGB_REGEX.exec(color.replace(/ /g, ""));
        return {
          r: parseInt(rgb[1], 10),
          g: parseInt(rgb[2], 10),
          b: parseInt(rgb[3], 10)
        };
      } else {
        return {
          r: 0,
          g: 0,
          b: 0
        };
      }
    },
    colorToRGBA: function(str) {
      str = str || "black";
      return exports.Util._namedColorToRBA(str) || exports.Util._hex3ColorToRGBA(str) || exports.Util._hex6ColorToRGBA(str) || exports.Util._rgbColorToRGBA(str) || exports.Util._rgbaColorToRGBA(str) || exports.Util._hslColorToRGBA(str);
    },
    _namedColorToRBA: function(str) {
      var c = COLORS[str.toLowerCase()];
      if (!c) {
        return null;
      }
      return {
        r: c[0],
        g: c[1],
        b: c[2],
        a: 1
      };
    },
    _rgbColorToRGBA: function(str) {
      if (str.indexOf("rgb(") === 0) {
        str = str.match(/rgb\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: 1
        };
      }
    },
    _rgbaColorToRGBA: function(str) {
      if (str.indexOf("rgba(") === 0) {
        str = str.match(/rgba\(([^)]+)\)/)[1];
        var parts = str.split(/ *, */).map(Number);
        return {
          r: parts[0],
          g: parts[1],
          b: parts[2],
          a: parts[3]
        };
      }
    },
    _hex6ColorToRGBA: function(str) {
      if (str[0] === "#" && str.length === 7) {
        return {
          r: parseInt(str.slice(1, 3), 16),
          g: parseInt(str.slice(3, 5), 16),
          b: parseInt(str.slice(5, 7), 16),
          a: 1
        };
      }
    },
    _hex3ColorToRGBA: function(str) {
      if (str[0] === "#" && str.length === 4) {
        return {
          r: parseInt(str[1] + str[1], 16),
          g: parseInt(str[2] + str[2], 16),
          b: parseInt(str[3] + str[3], 16),
          a: 1
        };
      }
    },
    _hslColorToRGBA: function(str) {
      if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(str)) {
        var _a = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(str), _ = _a[0], hsl = _a.slice(1);
        var h = Number(hsl[0]) / 360;
        var s = Number(hsl[1]) / 100;
        var l = Number(hsl[2]) / 100;
        var t2 = void 0;
        var t3 = void 0;
        var val = void 0;
        if (s === 0) {
          val = l * 255;
          return {
            r: Math.round(val),
            g: Math.round(val),
            b: Math.round(val),
            a: 1
          };
        }
        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }
        var t1 = 2 * l - t2;
        var rgb = [0, 0, 0];
        for (var i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i] = val * 255;
        }
        return {
          r: Math.round(rgb[0]),
          g: Math.round(rgb[1]),
          b: Math.round(rgb[2]),
          a: 1
        };
      }
    },
    haveIntersection: function(r1, r2) {
      return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
    },
    cloneObject: function(obj) {
      var retObj = {};
      for (var key in obj) {
        if (this._isPlainObject(obj[key])) {
          retObj[key] = this.cloneObject(obj[key]);
        } else if (this._isArray(obj[key])) {
          retObj[key] = this.cloneArray(obj[key]);
        } else {
          retObj[key] = obj[key];
        }
      }
      return retObj;
    },
    cloneArray: function(arr) {
      return arr.slice(0);
    },
    _degToRad: function(deg) {
      return deg * PI_OVER_DEG180;
    },
    _radToDeg: function(rad) {
      return rad * DEG180_OVER_PI;
    },
    _getRotation: function(radians) {
      return Global.Konva.angleDeg ? exports.Util._radToDeg(radians) : radians;
    },
    _capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    throw: function(str) {
      throw new Error(KONVA_ERROR + str);
    },
    error: function(str) {
      console.error(KONVA_ERROR + str);
    },
    warn: function(str) {
      if (!Global.Konva.showWarnings) {
        return;
      }
      console.warn(KONVA_WARNING + str);
    },
    extend: function(child, parent) {
      function Ctor() {
        this.constructor = child;
      }
      Ctor.prototype = parent.prototype;
      var oldProto = child.prototype;
      child.prototype = new Ctor();
      for (var key in oldProto) {
        if (oldProto.hasOwnProperty(key)) {
          child.prototype[key] = oldProto[key];
        }
      }
      child.__super__ = parent.prototype;
      child.super = parent;
    },
    _getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
      var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2)), d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), fa = t * d01 / (d01 + d12), fb = t * d12 / (d01 + d12), p1x = x1 - fa * (x2 - x0), p1y = y1 - fa * (y2 - y0), p2x = x1 + fb * (x2 - x0), p2y = y1 + fb * (y2 - y0);
      return [p1x, p1y, p2x, p2y];
    },
    _expandPoints: function(p, tension) {
      var len = p.length, allPoints = [], n, cp;
      for (n = 2; n < len - 2; n += 2) {
        cp = exports.Util._getControlPoints(p[n - 2], p[n - 1], p[n], p[n + 1], p[n + 2], p[n + 3], tension);
        if (isNaN(cp[0])) {
          continue;
        }
        allPoints.push(cp[0]);
        allPoints.push(cp[1]);
        allPoints.push(p[n]);
        allPoints.push(p[n + 1]);
        allPoints.push(cp[2]);
        allPoints.push(cp[3]);
      }
      return allPoints;
    },
    each: function(obj, func) {
      for (var key in obj) {
        func(key, obj[key]);
      }
    },
    _inRange: function(val, left, right) {
      return left <= val && val < right;
    },
    _getProjectionToSegment: function(x1, y1, x2, y2, x3, y3) {
      var x, y, dist;
      var pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
      if (pd2 == 0) {
        x = x1;
        y = y1;
        dist = (x3 - x2) * (x3 - x2) + (y3 - y2) * (y3 - y2);
      } else {
        var u = ((x3 - x1) * (x2 - x1) + (y3 - y1) * (y2 - y1)) / pd2;
        if (u < 0) {
          x = x1;
          y = y1;
          dist = (x1 - x3) * (x1 - x3) + (y1 - y3) * (y1 - y3);
        } else if (u > 1) {
          x = x2;
          y = y2;
          dist = (x2 - x3) * (x2 - x3) + (y2 - y3) * (y2 - y3);
        } else {
          x = x1 + u * (x2 - x1);
          y = y1 + u * (y2 - y1);
          dist = (x - x3) * (x - x3) + (y - y3) * (y - y3);
        }
      }
      return [x, y, dist];
    },
    _getProjectionToLine: function(pt, line, isClosed) {
      var pc = exports.Util.cloneObject(pt);
      var dist = Number.MAX_VALUE;
      line.forEach(function(p1, i) {
        if (!isClosed && i === line.length - 1) {
          return;
        }
        var p2 = line[(i + 1) % line.length];
        var proj = exports.Util._getProjectionToSegment(p1.x, p1.y, p2.x, p2.y, pt.x, pt.y);
        var px = proj[0], py = proj[1], pdist = proj[2];
        if (pdist < dist) {
          pc.x = px;
          pc.y = py;
          dist = pdist;
        }
      });
      return pc;
    },
    _prepareArrayForTween: function(startArray, endArray, isClosed) {
      var n, start = [], end = [];
      if (startArray.length > endArray.length) {
        var temp = endArray;
        endArray = startArray;
        startArray = temp;
      }
      for (n = 0; n < startArray.length; n += 2) {
        start.push({
          x: startArray[n],
          y: startArray[n + 1]
        });
      }
      for (n = 0; n < endArray.length; n += 2) {
        end.push({
          x: endArray[n],
          y: endArray[n + 1]
        });
      }
      var newStart = [];
      end.forEach(function(point) {
        var pr = exports.Util._getProjectionToLine(point, start, isClosed);
        newStart.push(pr.x);
        newStart.push(pr.y);
      });
      return newStart;
    },
    _prepareToStringify: function(obj) {
      var desc;
      obj.visitedByCircularReferenceRemoval = true;
      for (var key in obj) {
        if (!(obj.hasOwnProperty(key) && obj[key] && typeof obj[key] == "object")) {
          continue;
        }
        desc = Object.getOwnPropertyDescriptor(obj, key);
        if (obj[key].visitedByCircularReferenceRemoval || exports.Util._isElement(obj[key])) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        } else if (exports.Util._prepareToStringify(obj[key]) === null) {
          if (desc.configurable) {
            delete obj[key];
          } else {
            return null;
          }
        }
      }
      delete obj.visitedByCircularReferenceRemoval;
      return obj;
    },
    _assign: function(target, source) {
      for (var key in source) {
        target[key] = source[key];
      }
      return target;
    },
    _getFirstPointerId: function(evt) {
      if (!evt.touches) {
        return 999;
      } else {
        return evt.changedTouches[0].identifier;
      }
    }
  };
});
var Validators = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.getComponentValidator = exports.getBooleanValidator = exports.getNumberArrayValidator = exports.getFunctionValidator = exports.getStringOrGradientValidator = exports.getStringValidator = exports.getNumberOrAutoValidator = exports.getNumberOrArrayOfNumbersValidator = exports.getNumberValidator = exports.alphaComponent = exports.RGBComponent = void 0;
  function _formatValue(val) {
    if (Util.Util._isString(val)) {
      return '"' + val + '"';
    }
    if (Object.prototype.toString.call(val) === "[object Number]") {
      return val;
    }
    if (Util.Util._isBoolean(val)) {
      return val;
    }
    return Object.prototype.toString.call(val);
  }
  function RGBComponent(val) {
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    }
    return Math.round(val);
  }
  exports.RGBComponent = RGBComponent;
  function alphaComponent(val) {
    if (val > 1) {
      return 1;
    } else if (val < 1e-4) {
      return 1e-4;
    }
    return val;
  }
  exports.alphaComponent = alphaComponent;
  function getNumberValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        if (!Util.Util._isNumber(val)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number.');
        }
        return val;
      };
    }
  }
  exports.getNumberValidator = getNumberValidator;
  function getNumberOrArrayOfNumbersValidator(noOfElements) {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        var isNumber = Util.Util._isNumber(val);
        var isValidArray = Util.Util._isArray(val) && val.length == noOfElements;
        if (!isNumber && !isValidArray) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or Array<number>(' + noOfElements + ")");
        }
        return val;
      };
    }
  }
  exports.getNumberOrArrayOfNumbersValidator = getNumberOrArrayOfNumbersValidator;
  function getNumberOrAutoValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        var isNumber = Util.Util._isNumber(val);
        var isAuto = val === "auto";
        if (!(isNumber || isAuto)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a number or "auto".');
        }
        return val;
      };
    }
  }
  exports.getNumberOrAutoValidator = getNumberOrAutoValidator;
  function getStringValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        if (!Util.Util._isString(val)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string.');
        }
        return val;
      };
    }
  }
  exports.getStringValidator = getStringValidator;
  function getStringOrGradientValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        var isString = Util.Util._isString(val);
        var isGradient = Object.prototype.toString.call(val) === "[object CanvasGradient]";
        if (!(isString || isGradient)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a string or a native gradient.');
        }
        return val;
      };
    }
  }
  exports.getStringOrGradientValidator = getStringOrGradientValidator;
  function getFunctionValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        if (!Util.Util._isFunction(val)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a function.');
        }
        return val;
      };
    }
  }
  exports.getFunctionValidator = getFunctionValidator;
  function getNumberArrayValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        if (!Util.Util._isArray(val)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a array of numbers.');
        } else {
          val.forEach(function(item) {
            if (!Util.Util._isNumber(item)) {
              Util.Util.warn('"' + attr + '" attribute has non numeric element ' + item + ". Make sure that all elements are numbers.");
            }
          });
        }
        return val;
      };
    }
  }
  exports.getNumberArrayValidator = getNumberArrayValidator;
  function getBooleanValidator() {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        var isBool = val === true || val === false;
        if (!isBool) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be a boolean.');
        }
        return val;
      };
    }
  }
  exports.getBooleanValidator = getBooleanValidator;
  function getComponentValidator(components) {
    if (Global.Konva.isUnminified) {
      return function(val, attr) {
        if (!Util.Util.isObject(val)) {
          Util.Util.warn(_formatValue(val) + ' is a not valid value for "' + attr + '" attribute. The value should be an object with properties ' + components);
        }
        return val;
      };
    }
  }
  exports.getComponentValidator = getComponentValidator;
});
var Factory = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Factory = void 0;
  var GET = "get", SET = "set";
  exports.Factory = {
    addGetterSetter: function(constructor, attr, def, validator, after) {
      exports.Factory.addGetter(constructor, attr, def);
      exports.Factory.addSetter(constructor, attr, validator, after);
      exports.Factory.addOverloadedGetterSetter(constructor, attr);
    },
    addGetter: function(constructor, attr, def) {
      var method = GET + Util.Util._capitalize(attr);
      constructor.prototype[method] = constructor.prototype[method] || function() {
        var val = this.attrs[attr];
        return val === void 0 ? def : val;
      };
    },
    addSetter: function(constructor, attr, validator, after) {
      var method = SET + Util.Util._capitalize(attr);
      if (!constructor.prototype[method]) {
        exports.Factory.overWriteSetter(constructor, attr, validator, after);
      }
    },
    overWriteSetter: function(constructor, attr, validator, after) {
      var method = SET + Util.Util._capitalize(attr);
      constructor.prototype[method] = function(val) {
        if (validator && val !== void 0 && val !== null) {
          val = validator.call(this, val, attr);
        }
        this._setAttr(attr, val);
        if (after) {
          after.call(this);
        }
        return this;
      };
    },
    addComponentsGetterSetter: function(constructor, attr, components, validator, after) {
      var len = components.length, capitalize = Util.Util._capitalize, getter = GET + capitalize(attr), setter = SET + capitalize(attr), n, component;
      constructor.prototype[getter] = function() {
        var ret = {};
        for (n = 0; n < len; n++) {
          component = components[n];
          ret[component] = this.getAttr(attr + capitalize(component));
        }
        return ret;
      };
      var basicValidator = Validators.getComponentValidator(components);
      constructor.prototype[setter] = function(val) {
        var oldVal = this.attrs[attr], key;
        if (validator) {
          val = validator.call(this, val);
        }
        if (basicValidator) {
          basicValidator.call(this, val, attr);
        }
        for (key in val) {
          if (!val.hasOwnProperty(key)) {
            continue;
          }
          this._setAttr(attr + capitalize(key), val[key]);
        }
        this._fireChangeEvent(attr, oldVal, val);
        if (after) {
          after.call(this);
        }
        return this;
      };
      exports.Factory.addOverloadedGetterSetter(constructor, attr);
    },
    addOverloadedGetterSetter: function(constructor, attr) {
      var capitalizedAttr = Util.Util._capitalize(attr), setter = SET + capitalizedAttr, getter = GET + capitalizedAttr;
      constructor.prototype[attr] = function() {
        if (arguments.length) {
          this[setter](arguments[0]);
          return this;
        }
        return this[getter]();
      };
    },
    addDeprecatedGetterSetter: function(constructor, attr, def, validator) {
      Util.Util.error("Adding deprecated " + attr);
      var method = GET + Util.Util._capitalize(attr);
      var message = attr + " property is deprecated and will be removed soon. Look at Konva change log for more information.";
      constructor.prototype[method] = function() {
        Util.Util.error(message);
        var val = this.attrs[attr];
        return val === void 0 ? def : val;
      };
      exports.Factory.addSetter(constructor, attr, validator, function() {
        Util.Util.error(message);
      });
      exports.Factory.addOverloadedGetterSetter(constructor, attr);
    },
    backCompat: function(constructor, methods) {
      Util.Util.each(methods, function(oldMethodName, newMethodName) {
        var method = constructor.prototype[newMethodName];
        var oldGetter = GET + Util.Util._capitalize(oldMethodName);
        var oldSetter = SET + Util.Util._capitalize(oldMethodName);
        function deprecated() {
          method.apply(this, arguments);
          Util.Util.error('"' + oldMethodName + '" method is deprecated and will be removed soon. Use ""' + newMethodName + '" instead.');
        }
        constructor.prototype[oldMethodName] = deprecated;
        constructor.prototype[oldGetter] = deprecated;
        constructor.prototype[oldSetter] = deprecated;
      });
    },
    afterSetFilter: function() {
      this._filterUpToDate = false;
    }
  };
});
var Context_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.HitContext = exports.SceneContext = exports.Context = void 0;
  var COMMA = ",", OPEN_PAREN = "(", CLOSE_PAREN = ")", OPEN_PAREN_BRACKET = "([", CLOSE_BRACKET_PAREN = "])", SEMICOLON = ";", DOUBLE_PAREN = "()", EQUALS = "=", CONTEXT_METHODS = [
    "arc",
    "arcTo",
    "beginPath",
    "bezierCurveTo",
    "clearRect",
    "clip",
    "closePath",
    "createLinearGradient",
    "createPattern",
    "createRadialGradient",
    "drawImage",
    "ellipse",
    "fill",
    "fillText",
    "getImageData",
    "createImageData",
    "lineTo",
    "moveTo",
    "putImageData",
    "quadraticCurveTo",
    "rect",
    "restore",
    "rotate",
    "save",
    "scale",
    "setLineDash",
    "setTransform",
    "stroke",
    "strokeText",
    "transform",
    "translate"
  ];
  var CONTEXT_PROPERTIES = [
    "fillStyle",
    "strokeStyle",
    "shadowColor",
    "shadowBlur",
    "shadowOffsetX",
    "shadowOffsetY",
    "lineCap",
    "lineDashOffset",
    "lineJoin",
    "lineWidth",
    "miterLimit",
    "font",
    "textAlign",
    "textBaseline",
    "globalAlpha",
    "globalCompositeOperation",
    "imageSmoothingEnabled"
  ];
  var traceArrMax = 100;
  var Context = function() {
    function Context2(canvas) {
      this.canvas = canvas;
      this._context = canvas._canvas.getContext("2d");
      if (Global.Konva.enableTrace) {
        this.traceArr = [];
        this._enableTrace();
      }
    }
    Context2.prototype.fillShape = function(shape) {
      if (shape.fillEnabled()) {
        this._fill(shape);
      }
    };
    Context2.prototype._fill = function(shape) {
    };
    Context2.prototype.strokeShape = function(shape) {
      if (shape.hasStroke()) {
        this._stroke(shape);
      }
    };
    Context2.prototype._stroke = function(shape) {
    };
    Context2.prototype.fillStrokeShape = function(shape) {
      if (shape.attrs.fillAfterStrokeEnabled) {
        this.strokeShape(shape);
        this.fillShape(shape);
      } else {
        this.fillShape(shape);
        this.strokeShape(shape);
      }
    };
    Context2.prototype.getTrace = function(relaxed) {
      var traceArr = this.traceArr, len = traceArr.length, str = "", n, trace, method, args;
      for (n = 0; n < len; n++) {
        trace = traceArr[n];
        method = trace.method;
        if (method) {
          args = trace.args;
          str += method;
          if (relaxed) {
            str += DOUBLE_PAREN;
          } else {
            if (Util.Util._isArray(args[0])) {
              str += OPEN_PAREN_BRACKET + args.join(COMMA) + CLOSE_BRACKET_PAREN;
            } else {
              str += OPEN_PAREN + args.join(COMMA) + CLOSE_PAREN;
            }
          }
        } else {
          str += trace.property;
          if (!relaxed) {
            str += EQUALS + trace.val;
          }
        }
        str += SEMICOLON;
      }
      return str;
    };
    Context2.prototype.clearTrace = function() {
      this.traceArr = [];
    };
    Context2.prototype._trace = function(str) {
      var traceArr = this.traceArr, len;
      traceArr.push(str);
      len = traceArr.length;
      if (len >= traceArrMax) {
        traceArr.shift();
      }
    };
    Context2.prototype.reset = function() {
      var pixelRatio = this.getCanvas().getPixelRatio();
      this.setTransform(1 * pixelRatio, 0, 0, 1 * pixelRatio, 0, 0);
    };
    Context2.prototype.getCanvas = function() {
      return this.canvas;
    };
    Context2.prototype.clear = function(bounds) {
      var canvas = this.getCanvas();
      if (bounds) {
        this.clearRect(bounds.x || 0, bounds.y || 0, bounds.width || 0, bounds.height || 0);
      } else {
        this.clearRect(0, 0, canvas.getWidth() / canvas.pixelRatio, canvas.getHeight() / canvas.pixelRatio);
      }
    };
    Context2.prototype._applyLineCap = function(shape) {
      var lineCap = shape.getLineCap();
      if (lineCap) {
        this.setAttr("lineCap", lineCap);
      }
    };
    Context2.prototype._applyOpacity = function(shape) {
      var absOpacity = shape.getAbsoluteOpacity();
      if (absOpacity !== 1) {
        this.setAttr("globalAlpha", absOpacity);
      }
    };
    Context2.prototype._applyLineJoin = function(shape) {
      var lineJoin = shape.attrs.lineJoin;
      if (lineJoin) {
        this.setAttr("lineJoin", lineJoin);
      }
    };
    Context2.prototype.setAttr = function(attr, val) {
      this._context[attr] = val;
    };
    Context2.prototype.arc = function(a0, a1, a2, a3, a4, a5) {
      this._context.arc(a0, a1, a2, a3, a4, a5);
    };
    Context2.prototype.arcTo = function(a0, a1, a2, a3, a4) {
      this._context.arcTo(a0, a1, a2, a3, a4);
    };
    Context2.prototype.beginPath = function() {
      this._context.beginPath();
    };
    Context2.prototype.bezierCurveTo = function(a0, a1, a2, a3, a4, a5) {
      this._context.bezierCurveTo(a0, a1, a2, a3, a4, a5);
    };
    Context2.prototype.clearRect = function(a0, a1, a2, a3) {
      this._context.clearRect(a0, a1, a2, a3);
    };
    Context2.prototype.clip = function() {
      this._context.clip();
    };
    Context2.prototype.closePath = function() {
      this._context.closePath();
    };
    Context2.prototype.createImageData = function(a0, a1) {
      var a = arguments;
      if (a.length === 2) {
        return this._context.createImageData(a0, a1);
      } else if (a.length === 1) {
        return this._context.createImageData(a0);
      }
    };
    Context2.prototype.createLinearGradient = function(a0, a1, a2, a3) {
      return this._context.createLinearGradient(a0, a1, a2, a3);
    };
    Context2.prototype.createPattern = function(a0, a1) {
      return this._context.createPattern(a0, a1);
    };
    Context2.prototype.createRadialGradient = function(a0, a1, a2, a3, a4, a5) {
      return this._context.createRadialGradient(a0, a1, a2, a3, a4, a5);
    };
    Context2.prototype.drawImage = function(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
      var a = arguments, _context = this._context;
      if (a.length === 3) {
        _context.drawImage(a0, a1, a2);
      } else if (a.length === 5) {
        _context.drawImage(a0, a1, a2, a3, a4);
      } else if (a.length === 9) {
        _context.drawImage(a0, a1, a2, a3, a4, a5, a6, a7, a8);
      }
    };
    Context2.prototype.ellipse = function(a0, a1, a2, a3, a4, a5, a6, a7) {
      this._context.ellipse(a0, a1, a2, a3, a4, a5, a6, a7);
    };
    Context2.prototype.isPointInPath = function(x, y) {
      return this._context.isPointInPath(x, y);
    };
    Context2.prototype.fill = function() {
      this._context.fill();
    };
    Context2.prototype.fillRect = function(x, y, width, height) {
      this._context.fillRect(x, y, width, height);
    };
    Context2.prototype.strokeRect = function(x, y, width, height) {
      this._context.strokeRect(x, y, width, height);
    };
    Context2.prototype.fillText = function(a0, a1, a2) {
      this._context.fillText(a0, a1, a2);
    };
    Context2.prototype.measureText = function(text) {
      return this._context.measureText(text);
    };
    Context2.prototype.getImageData = function(a0, a1, a2, a3) {
      return this._context.getImageData(a0, a1, a2, a3);
    };
    Context2.prototype.lineTo = function(a0, a1) {
      this._context.lineTo(a0, a1);
    };
    Context2.prototype.moveTo = function(a0, a1) {
      this._context.moveTo(a0, a1);
    };
    Context2.prototype.rect = function(a0, a1, a2, a3) {
      this._context.rect(a0, a1, a2, a3);
    };
    Context2.prototype.putImageData = function(a0, a1, a2) {
      this._context.putImageData(a0, a1, a2);
    };
    Context2.prototype.quadraticCurveTo = function(a0, a1, a2, a3) {
      this._context.quadraticCurveTo(a0, a1, a2, a3);
    };
    Context2.prototype.restore = function() {
      this._context.restore();
    };
    Context2.prototype.rotate = function(a0) {
      this._context.rotate(a0);
    };
    Context2.prototype.save = function() {
      this._context.save();
    };
    Context2.prototype.scale = function(a0, a1) {
      this._context.scale(a0, a1);
    };
    Context2.prototype.setLineDash = function(a0) {
      if (this._context.setLineDash) {
        this._context.setLineDash(a0);
      } else if ("mozDash" in this._context) {
        this._context["mozDash"] = a0;
      } else if ("webkitLineDash" in this._context) {
        this._context["webkitLineDash"] = a0;
      }
    };
    Context2.prototype.getLineDash = function() {
      return this._context.getLineDash();
    };
    Context2.prototype.setTransform = function(a0, a1, a2, a3, a4, a5) {
      this._context.setTransform(a0, a1, a2, a3, a4, a5);
    };
    Context2.prototype.stroke = function() {
      this._context.stroke();
    };
    Context2.prototype.strokeText = function(a0, a1, a2, a3) {
      this._context.strokeText(a0, a1, a2, a3);
    };
    Context2.prototype.transform = function(a0, a1, a2, a3, a4, a5) {
      this._context.transform(a0, a1, a2, a3, a4, a5);
    };
    Context2.prototype.translate = function(a0, a1) {
      this._context.translate(a0, a1);
    };
    Context2.prototype._enableTrace = function() {
      var that = this, len = CONTEXT_METHODS.length, _simplifyArray = Util.Util._simplifyArray, origSetter = this.setAttr, n, args;
      var func = function(methodName) {
        var origMethod = that[methodName], ret;
        that[methodName] = function() {
          args = _simplifyArray(Array.prototype.slice.call(arguments, 0));
          ret = origMethod.apply(that, arguments);
          that._trace({
            method: methodName,
            args
          });
          return ret;
        };
      };
      for (n = 0; n < len; n++) {
        func(CONTEXT_METHODS[n]);
      }
      that.setAttr = function() {
        origSetter.apply(that, arguments);
        var prop = arguments[0];
        var val = arguments[1];
        if (prop === "shadowOffsetX" || prop === "shadowOffsetY" || prop === "shadowBlur") {
          val = val / this.canvas.getPixelRatio();
        }
        that._trace({
          property: prop,
          val
        });
      };
    };
    Context2.prototype._applyGlobalCompositeOperation = function(node) {
      var globalCompositeOperation = node.getGlobalCompositeOperation();
      if (globalCompositeOperation !== "source-over") {
        this.setAttr("globalCompositeOperation", globalCompositeOperation);
      }
    };
    return Context2;
  }();
  exports.Context = Context;
  CONTEXT_PROPERTIES.forEach(function(prop) {
    Object.defineProperty(Context.prototype, prop, {
      get: function() {
        return this._context[prop];
      },
      set: function(val) {
        this._context[prop] = val;
      }
    });
  });
  var SceneContext = function(_super) {
    __extends(SceneContext2, _super);
    function SceneContext2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    SceneContext2.prototype._fillColor = function(shape) {
      var fill = shape.fill();
      this.setAttr("fillStyle", fill);
      shape._fillFunc(this);
    };
    SceneContext2.prototype._fillPattern = function(shape) {
      var fillPatternX = shape.getFillPatternX(), fillPatternY = shape.getFillPatternY(), fillPatternRotation = Global.Konva.getAngle(shape.getFillPatternRotation()), fillPatternOffsetX = shape.getFillPatternOffsetX(), fillPatternOffsetY = shape.getFillPatternOffsetY(), fillPatternScaleX = shape.getFillPatternScaleX(), fillPatternScaleY = shape.getFillPatternScaleY();
      if (fillPatternX || fillPatternY) {
        this.translate(fillPatternX || 0, fillPatternY || 0);
      }
      if (fillPatternRotation) {
        this.rotate(fillPatternRotation);
      }
      if (fillPatternOffsetX || fillPatternOffsetY) {
        this.translate(-1 * fillPatternOffsetX, -1 * fillPatternOffsetY);
      }
      this.setAttr("fillStyle", shape._getFillPattern());
      shape._fillFunc(this);
    };
    SceneContext2.prototype._fillLinearGradient = function(shape) {
      var grd = shape._getLinearGradient();
      if (grd) {
        this.setAttr("fillStyle", grd);
        shape._fillFunc(this);
      }
    };
    SceneContext2.prototype._fillRadialGradient = function(shape) {
      var grd = shape._getRadialGradient();
      if (grd) {
        this.setAttr("fillStyle", grd);
        shape._fillFunc(this);
      }
    };
    SceneContext2.prototype._fill = function(shape) {
      var hasColor = shape.fill(), fillPriority = shape.getFillPriority();
      if (hasColor && fillPriority === "color") {
        this._fillColor(shape);
        return;
      }
      var hasPattern = shape.getFillPatternImage();
      if (hasPattern && fillPriority === "pattern") {
        this._fillPattern(shape);
        return;
      }
      var hasLinearGradient = shape.getFillLinearGradientColorStops();
      if (hasLinearGradient && fillPriority === "linear-gradient") {
        this._fillLinearGradient(shape);
        return;
      }
      var hasRadialGradient = shape.getFillRadialGradientColorStops();
      if (hasRadialGradient && fillPriority === "radial-gradient") {
        this._fillRadialGradient(shape);
        return;
      }
      if (hasColor) {
        this._fillColor(shape);
      } else if (hasPattern) {
        this._fillPattern(shape);
      } else if (hasLinearGradient) {
        this._fillLinearGradient(shape);
      } else if (hasRadialGradient) {
        this._fillRadialGradient(shape);
      }
    };
    SceneContext2.prototype._strokeLinearGradient = function(shape) {
      var start = shape.getStrokeLinearGradientStartPoint(), end = shape.getStrokeLinearGradientEndPoint(), colorStops = shape.getStrokeLinearGradientColorStops(), grd = this.createLinearGradient(start.x, start.y, end.x, end.y);
      if (colorStops) {
        for (var n = 0; n < colorStops.length; n += 2) {
          grd.addColorStop(colorStops[n], colorStops[n + 1]);
        }
        this.setAttr("strokeStyle", grd);
      }
    };
    SceneContext2.prototype._stroke = function(shape) {
      var dash = shape.dash(), strokeScaleEnabled = shape.getStrokeScaleEnabled();
      if (shape.hasStroke()) {
        if (!strokeScaleEnabled) {
          this.save();
          var pixelRatio = this.getCanvas().getPixelRatio();
          this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        }
        this._applyLineCap(shape);
        if (dash && shape.dashEnabled()) {
          this.setLineDash(dash);
          this.setAttr("lineDashOffset", shape.dashOffset());
        }
        this.setAttr("lineWidth", shape.strokeWidth());
        if (!shape.getShadowForStrokeEnabled()) {
          this.setAttr("shadowColor", "rgba(0,0,0,0)");
        }
        var hasLinearGradient = shape.getStrokeLinearGradientColorStops();
        if (hasLinearGradient) {
          this._strokeLinearGradient(shape);
        } else {
          this.setAttr("strokeStyle", shape.stroke());
        }
        shape._strokeFunc(this);
        if (!strokeScaleEnabled) {
          this.restore();
        }
      }
    };
    SceneContext2.prototype._applyShadow = function(shape) {
      var util = Util.Util, color = util.get(shape.getShadowRGBA(), "black"), blur = util.get(shape.getShadowBlur(), 5), offset = util.get(shape.getShadowOffset(), {
        x: 0,
        y: 0
      }), scale = shape.getAbsoluteScale(), ratio = this.canvas.getPixelRatio(), scaleX = scale.x * ratio, scaleY = scale.y * ratio;
      this.setAttr("shadowColor", color);
      this.setAttr("shadowBlur", blur * Math.min(Math.abs(scaleX), Math.abs(scaleY)));
      this.setAttr("shadowOffsetX", offset.x * scaleX);
      this.setAttr("shadowOffsetY", offset.y * scaleY);
    };
    return SceneContext2;
  }(Context);
  exports.SceneContext = SceneContext;
  var HitContext = function(_super) {
    __extends(HitContext2, _super);
    function HitContext2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    HitContext2.prototype._fill = function(shape) {
      this.save();
      this.setAttr("fillStyle", shape.colorKey);
      shape._fillFuncHit(this);
      this.restore();
    };
    HitContext2.prototype.strokeShape = function(shape) {
      if (shape.hasHitStroke()) {
        this._stroke(shape);
      }
    };
    HitContext2.prototype._stroke = function(shape) {
      if (shape.hasHitStroke()) {
        var strokeScaleEnabled = shape.getStrokeScaleEnabled();
        if (!strokeScaleEnabled) {
          this.save();
          var pixelRatio = this.getCanvas().getPixelRatio();
          this.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        }
        this._applyLineCap(shape);
        var hitStrokeWidth = shape.hitStrokeWidth();
        var strokeWidth = hitStrokeWidth === "auto" ? shape.strokeWidth() : hitStrokeWidth;
        this.setAttr("lineWidth", strokeWidth);
        this.setAttr("strokeStyle", shape.colorKey);
        shape._strokeFuncHit(this);
        if (!strokeScaleEnabled) {
          this.restore();
        }
      }
    };
    return HitContext2;
  }(Context);
  exports.HitContext = HitContext;
});
var Canvas_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.HitCanvas = exports.SceneCanvas = exports.Canvas = void 0;
  var _pixelRatio;
  function getDevicePixelRatio() {
    if (_pixelRatio) {
      return _pixelRatio;
    }
    var canvas = Util.Util.createCanvasElement();
    var context = canvas.getContext("2d");
    _pixelRatio = function() {
      var devicePixelRatio = Global.Konva._global.devicePixelRatio || 1, backingStoreRatio = context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    }();
    return _pixelRatio;
  }
  var Canvas = function() {
    function Canvas2(config) {
      this.pixelRatio = 1;
      this.width = 0;
      this.height = 0;
      this.isCache = false;
      var conf = config || {};
      var pixelRatio = conf.pixelRatio || Global.Konva.pixelRatio || getDevicePixelRatio();
      this.pixelRatio = pixelRatio;
      this._canvas = Util.Util.createCanvasElement();
      this._canvas.style.padding = "0";
      this._canvas.style.margin = "0";
      this._canvas.style.border = "0";
      this._canvas.style.background = "transparent";
      this._canvas.style.position = "absolute";
      this._canvas.style.top = "0";
      this._canvas.style.left = "0";
    }
    Canvas2.prototype.getContext = function() {
      return this.context;
    };
    Canvas2.prototype.getPixelRatio = function() {
      return this.pixelRatio;
    };
    Canvas2.prototype.setPixelRatio = function(pixelRatio) {
      var previousRatio = this.pixelRatio;
      this.pixelRatio = pixelRatio;
      this.setSize(this.getWidth() / previousRatio, this.getHeight() / previousRatio);
    };
    Canvas2.prototype.setWidth = function(width) {
      this.width = this._canvas.width = width * this.pixelRatio;
      this._canvas.style.width = width + "px";
      var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
      _context.scale(pixelRatio, pixelRatio);
    };
    Canvas2.prototype.setHeight = function(height) {
      this.height = this._canvas.height = height * this.pixelRatio;
      this._canvas.style.height = height + "px";
      var pixelRatio = this.pixelRatio, _context = this.getContext()._context;
      _context.scale(pixelRatio, pixelRatio);
    };
    Canvas2.prototype.getWidth = function() {
      return this.width;
    };
    Canvas2.prototype.getHeight = function() {
      return this.height;
    };
    Canvas2.prototype.setSize = function(width, height) {
      this.setWidth(width || 0);
      this.setHeight(height || 0);
    };
    Canvas2.prototype.toDataURL = function(mimeType, quality) {
      try {
        return this._canvas.toDataURL(mimeType, quality);
      } catch (e) {
        try {
          return this._canvas.toDataURL();
        } catch (err) {
          Util.Util.error("Unable to get data URL. " + err.message + " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html.");
          return "";
        }
      }
    };
    return Canvas2;
  }();
  exports.Canvas = Canvas;
  Factory.Factory.addGetterSetter(Canvas, "pixelRatio", void 0, Validators.getNumberValidator());
  var SceneCanvas = function(_super) {
    __extends(SceneCanvas2, _super);
    function SceneCanvas2(config) {
      if (config === void 0) {
        config = {width: 0, height: 0};
      }
      var _this = _super.call(this, config) || this;
      _this.context = new Context_1.SceneContext(_this);
      _this.setSize(config.width, config.height);
      return _this;
    }
    return SceneCanvas2;
  }(Canvas);
  exports.SceneCanvas = SceneCanvas;
  var HitCanvas = function(_super) {
    __extends(HitCanvas2, _super);
    function HitCanvas2(config) {
      if (config === void 0) {
        config = {width: 0, height: 0};
      }
      var _this = _super.call(this, config) || this;
      _this.hitCanvas = true;
      _this.context = new Context_1.HitContext(_this);
      _this.setSize(config.width, config.height);
      return _this;
    }
    return HitCanvas2;
  }(Canvas);
  exports.HitCanvas = HitCanvas;
});
var DragAndDrop = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.DD = void 0;
  exports.DD = {
    get isDragging() {
      var flag = false;
      exports.DD._dragElements.forEach(function(elem) {
        if (elem.dragStatus === "dragging") {
          flag = true;
        }
      });
      return flag;
    },
    justDragged: false,
    get node() {
      var node;
      exports.DD._dragElements.forEach(function(elem) {
        node = elem.node;
      });
      return node;
    },
    _dragElements: new Map(),
    _drag: function(evt) {
      var nodesToFireEvents = [];
      exports.DD._dragElements.forEach(function(elem, key) {
        var node = elem.node;
        var stage = node.getStage();
        stage.setPointersPositions(evt);
        if (elem.pointerId === void 0) {
          elem.pointerId = Util.Util._getFirstPointerId(evt);
        }
        var pos = stage._changedPointerPositions.find(function(pos2) {
          return pos2.id === elem.pointerId;
        });
        if (!pos) {
          return;
        }
        if (elem.dragStatus !== "dragging") {
          var dragDistance = node.dragDistance();
          var distance = Math.max(Math.abs(pos.x - elem.startPointerPos.x), Math.abs(pos.y - elem.startPointerPos.y));
          if (distance < dragDistance) {
            return;
          }
          node.startDrag({evt});
          if (!node.isDragging()) {
            return;
          }
        }
        node._setDragPosition(evt, elem);
        nodesToFireEvents.push(node);
      });
      nodesToFireEvents.forEach(function(node) {
        node.fire("dragmove", {
          type: "dragmove",
          target: node,
          evt
        }, true);
      });
    },
    _endDragBefore: function(evt) {
      exports.DD._dragElements.forEach(function(elem, key) {
        var node = elem.node;
        var stage = node.getStage();
        if (evt) {
          stage.setPointersPositions(evt);
        }
        var pos = stage._changedPointerPositions.find(function(pos2) {
          return pos2.id === elem.pointerId;
        });
        if (!pos) {
          return;
        }
        if (elem.dragStatus === "dragging" || elem.dragStatus === "stopped") {
          exports.DD.justDragged = true;
          Global.Konva.listenClickTap = false;
          elem.dragStatus = "stopped";
        }
        var drawNode = elem.node.getLayer() || elem.node instanceof Global.Konva["Stage"] && elem.node;
        if (drawNode) {
          drawNode.batchDraw();
        }
      });
    },
    _endDragAfter: function(evt) {
      exports.DD._dragElements.forEach(function(elem, key) {
        if (elem.dragStatus === "stopped") {
          elem.node.fire("dragend", {
            type: "dragend",
            target: elem.node,
            evt
          }, true);
        }
        if (elem.dragStatus !== "dragging") {
          exports.DD._dragElements.delete(key);
        }
      });
    }
  };
  if (Global.Konva.isBrowser) {
    window.addEventListener("mouseup", exports.DD._endDragBefore, true);
    window.addEventListener("touchend", exports.DD._endDragBefore, true);
    window.addEventListener("mousemove", exports.DD._drag);
    window.addEventListener("touchmove", exports.DD._drag);
    window.addEventListener("mouseup", exports.DD._endDragAfter, false);
    window.addEventListener("touchend", exports.DD._endDragAfter, false);
  }
});
var Node_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Node = exports._removeName = exports._addName = exports._removeId = exports.names = exports.ids = void 0;
  exports.ids = {};
  exports.names = {};
  var _addId = function(node, id) {
    if (!id) {
      return;
    }
    exports.ids[id] = node;
  };
  var _removeId = function(id, node) {
    if (!id) {
      return;
    }
    if (exports.ids[id] !== node) {
      return;
    }
    delete exports.ids[id];
  };
  exports._removeId = _removeId;
  var _addName = function(node, name) {
    if (name) {
      if (!exports.names[name]) {
        exports.names[name] = [];
      }
      exports.names[name].push(node);
    }
  };
  exports._addName = _addName;
  var _removeName = function(name, _id) {
    if (!name) {
      return;
    }
    var nodes = exports.names[name];
    if (!nodes) {
      return;
    }
    for (var n = 0; n < nodes.length; n++) {
      var no = nodes[n];
      if (no._id === _id) {
        nodes.splice(n, 1);
      }
    }
    if (nodes.length === 0) {
      delete exports.names[name];
    }
  };
  exports._removeName = _removeName;
  var ABSOLUTE_OPACITY = "absoluteOpacity", ALL_LISTENERS = "allEventListeners", ABSOLUTE_TRANSFORM = "absoluteTransform", ABSOLUTE_SCALE = "absoluteScale", CANVAS = "canvas", CHANGE = "Change", CHILDREN = "children", KONVA = "konva", LISTENING = "listening", MOUSEENTER = "mouseenter", MOUSELEAVE = "mouseleave", NAME = "name", SET = "set", SHAPE = "Shape", SPACE = " ", STAGE = "stage", TRANSFORM = "transform", UPPER_STAGE = "Stage", VISIBLE = "visible", TRANSFORM_CHANGE_STR = [
    "xChange.konva",
    "yChange.konva",
    "scaleXChange.konva",
    "scaleYChange.konva",
    "skewXChange.konva",
    "skewYChange.konva",
    "rotationChange.konva",
    "offsetXChange.konva",
    "offsetYChange.konva",
    "transformsEnabledChange.konva"
  ].join(SPACE);
  var emptyChildren = new Util.Collection();
  var idCounter = 1;
  var Node = function() {
    function Node2(config) {
      this._id = idCounter++;
      this.eventListeners = {};
      this.attrs = {};
      this.index = 0;
      this._allEventListeners = null;
      this.parent = null;
      this._cache = new Map();
      this._attachedDepsListeners = new Map();
      this._lastPos = null;
      this._batchingTransformChange = false;
      this._needClearTransformCache = false;
      this._filterUpToDate = false;
      this._isUnderCache = false;
      this.children = emptyChildren;
      this._dragEventId = null;
      this._shouldFireChangeEvents = false;
      this.setAttrs(config);
      this._shouldFireChangeEvents = true;
    }
    Node2.prototype.hasChildren = function() {
      return false;
    };
    Node2.prototype.getChildren = function() {
      return emptyChildren;
    };
    Node2.prototype._clearCache = function(attr) {
      if ((attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM) && this._cache.get(attr)) {
        this._cache.get(attr).dirty = true;
      } else if (attr) {
        this._cache.delete(attr);
      } else {
        this._cache.clear();
      }
    };
    Node2.prototype._getCache = function(attr, privateGetter) {
      var cache = this._cache.get(attr);
      var isTransform = attr === TRANSFORM || attr === ABSOLUTE_TRANSFORM;
      var invalid = cache === void 0 || isTransform && cache.dirty === true;
      if (invalid) {
        cache = privateGetter.call(this);
        this._cache.set(attr, cache);
      }
      return cache;
    };
    Node2.prototype._calculate = function(name, deps, getter) {
      var _this = this;
      if (!this._attachedDepsListeners.get(name)) {
        var depsString = deps.map(function(dep) {
          return dep + "Change.konva";
        }).join(SPACE);
        this.on(depsString, function() {
          _this._clearCache(name);
        });
        this._attachedDepsListeners.set(name, true);
      }
      return this._getCache(name, getter);
    };
    Node2.prototype._getCanvasCache = function() {
      return this._cache.get(CANVAS);
    };
    Node2.prototype._clearSelfAndDescendantCache = function(attr, forceEvent) {
      this._clearCache(attr);
      if (forceEvent && attr === ABSOLUTE_TRANSFORM) {
        this.fire("_clearTransformCache");
      }
      if (this.isCached()) {
        return;
      }
      if (this.children) {
        this.children.each(function(node) {
          node._clearSelfAndDescendantCache(attr, true);
        });
      }
    };
    Node2.prototype.clearCache = function() {
      this._cache.delete(CANVAS);
      this._clearSelfAndDescendantCache();
      return this;
    };
    Node2.prototype.cache = function(config) {
      var conf = config || {};
      var rect = {};
      if (conf.x === void 0 || conf.y === void 0 || conf.width === void 0 || conf.height === void 0) {
        rect = this.getClientRect({
          skipTransform: true,
          relativeTo: this.getParent()
        });
      }
      var width = Math.ceil(conf.width || rect.width), height = Math.ceil(conf.height || rect.height), pixelRatio = conf.pixelRatio, x = conf.x === void 0 ? rect.x : conf.x, y = conf.y === void 0 ? rect.y : conf.y, offset = conf.offset || 0, drawBorder = conf.drawBorder || false;
      if (!width || !height) {
        Util.Util.error("Can not cache the node. Width or height of the node equals 0. Caching is skipped.");
        return;
      }
      width += offset * 2;
      height += offset * 2;
      x -= offset;
      y -= offset;
      var cachedSceneCanvas = new Canvas_1.SceneCanvas({
        pixelRatio,
        width,
        height
      }), cachedFilterCanvas = new Canvas_1.SceneCanvas({
        pixelRatio,
        width: 0,
        height: 0
      }), cachedHitCanvas = new Canvas_1.HitCanvas({
        pixelRatio: 1,
        width,
        height
      }), sceneContext = cachedSceneCanvas.getContext(), hitContext = cachedHitCanvas.getContext();
      cachedHitCanvas.isCache = true;
      cachedSceneCanvas.isCache = true;
      this._cache.delete("canvas");
      this._filterUpToDate = false;
      if (conf.imageSmoothingEnabled === false) {
        cachedSceneCanvas.getContext()._context.imageSmoothingEnabled = false;
        cachedFilterCanvas.getContext()._context.imageSmoothingEnabled = false;
      }
      sceneContext.save();
      hitContext.save();
      sceneContext.translate(-x, -y);
      hitContext.translate(-x, -y);
      this._isUnderCache = true;
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
      this.drawScene(cachedSceneCanvas, this);
      this.drawHit(cachedHitCanvas, this);
      this._isUnderCache = false;
      sceneContext.restore();
      hitContext.restore();
      if (drawBorder) {
        sceneContext.save();
        sceneContext.beginPath();
        sceneContext.rect(0, 0, width, height);
        sceneContext.closePath();
        sceneContext.setAttr("strokeStyle", "red");
        sceneContext.setAttr("lineWidth", 5);
        sceneContext.stroke();
        sceneContext.restore();
      }
      this._cache.set(CANVAS, {
        scene: cachedSceneCanvas,
        filter: cachedFilterCanvas,
        hit: cachedHitCanvas,
        x,
        y
      });
      return this;
    };
    Node2.prototype.isCached = function() {
      return this._cache.has("canvas");
    };
    Node2.prototype.getClientRect = function(config) {
      throw new Error('abstract "getClientRect" method call');
    };
    Node2.prototype._transformedRect = function(rect, top) {
      var points = [
        {x: rect.x, y: rect.y},
        {x: rect.x + rect.width, y: rect.y},
        {x: rect.x + rect.width, y: rect.y + rect.height},
        {x: rect.x, y: rect.y + rect.height}
      ];
      var minX, minY, maxX, maxY;
      var trans = this.getAbsoluteTransform(top);
      points.forEach(function(point) {
        var transformed = trans.point(point);
        if (minX === void 0) {
          minX = maxX = transformed.x;
          minY = maxY = transformed.y;
        }
        minX = Math.min(minX, transformed.x);
        minY = Math.min(minY, transformed.y);
        maxX = Math.max(maxX, transformed.x);
        maxY = Math.max(maxY, transformed.y);
      });
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    };
    Node2.prototype._drawCachedSceneCanvas = function(context) {
      context.save();
      context._applyOpacity(this);
      context._applyGlobalCompositeOperation(this);
      var canvasCache = this._getCanvasCache();
      context.translate(canvasCache.x, canvasCache.y);
      var cacheCanvas = this._getCachedSceneCanvas();
      var ratio = cacheCanvas.pixelRatio;
      context.drawImage(cacheCanvas._canvas, 0, 0, cacheCanvas.width / ratio, cacheCanvas.height / ratio);
      context.restore();
    };
    Node2.prototype._drawCachedHitCanvas = function(context) {
      var canvasCache = this._getCanvasCache(), hitCanvas = canvasCache.hit;
      context.save();
      context.translate(canvasCache.x, canvasCache.y);
      context.drawImage(hitCanvas._canvas, 0, 0);
      context.restore();
    };
    Node2.prototype._getCachedSceneCanvas = function() {
      var filters = this.filters(), cachedCanvas = this._getCanvasCache(), sceneCanvas = cachedCanvas.scene, filterCanvas = cachedCanvas.filter, filterContext = filterCanvas.getContext(), len, imageData, n, filter;
      if (filters) {
        if (!this._filterUpToDate) {
          var ratio = sceneCanvas.pixelRatio;
          filterCanvas.setSize(sceneCanvas.width / sceneCanvas.pixelRatio, sceneCanvas.height / sceneCanvas.pixelRatio);
          try {
            len = filters.length;
            filterContext.clear();
            filterContext.drawImage(sceneCanvas._canvas, 0, 0, sceneCanvas.getWidth() / ratio, sceneCanvas.getHeight() / ratio);
            imageData = filterContext.getImageData(0, 0, filterCanvas.getWidth(), filterCanvas.getHeight());
            for (n = 0; n < len; n++) {
              filter = filters[n];
              if (typeof filter !== "function") {
                Util.Util.error("Filter should be type of function, but got " + typeof filter + " instead. Please check correct filters");
                continue;
              }
              filter.call(this, imageData);
              filterContext.putImageData(imageData, 0, 0);
            }
          } catch (e) {
            Util.Util.error("Unable to apply filter. " + e.message + " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html.");
          }
          this._filterUpToDate = true;
        }
        return filterCanvas;
      }
      return sceneCanvas;
    };
    Node2.prototype.on = function(evtStr, handler) {
      this._cache && this._cache.delete(ALL_LISTENERS);
      if (arguments.length === 3) {
        return this._delegate.apply(this, arguments);
      }
      var events = evtStr.split(SPACE), len = events.length, n, event, parts, baseEvent, name;
      for (n = 0; n < len; n++) {
        event = events[n];
        parts = event.split(".");
        baseEvent = parts[0];
        name = parts[1] || "";
        if (!this.eventListeners[baseEvent]) {
          this.eventListeners[baseEvent] = [];
        }
        this.eventListeners[baseEvent].push({
          name,
          handler
        });
      }
      return this;
    };
    Node2.prototype.off = function(evtStr, callback) {
      var events = (evtStr || "").split(SPACE), len = events.length, n, t, event, parts, baseEvent, name;
      this._cache && this._cache.delete(ALL_LISTENERS);
      if (!evtStr) {
        for (t in this.eventListeners) {
          this._off(t);
        }
      }
      for (n = 0; n < len; n++) {
        event = events[n];
        parts = event.split(".");
        baseEvent = parts[0];
        name = parts[1];
        if (baseEvent) {
          if (this.eventListeners[baseEvent]) {
            this._off(baseEvent, name, callback);
          }
        } else {
          for (t in this.eventListeners) {
            this._off(t, name, callback);
          }
        }
      }
      return this;
    };
    Node2.prototype.dispatchEvent = function(evt) {
      var e = {
        target: this,
        type: evt.type,
        evt
      };
      this.fire(evt.type, e);
      return this;
    };
    Node2.prototype.addEventListener = function(type, handler) {
      this.on(type, function(evt) {
        handler.call(this, evt.evt);
      });
      return this;
    };
    Node2.prototype.removeEventListener = function(type) {
      this.off(type);
      return this;
    };
    Node2.prototype._delegate = function(event, selector, handler) {
      var stopNode = this;
      this.on(event, function(evt) {
        var targets = evt.target.findAncestors(selector, true, stopNode);
        for (var i = 0; i < targets.length; i++) {
          evt = Util.Util.cloneObject(evt);
          evt.currentTarget = targets[i];
          handler.call(targets[i], evt);
        }
      });
    };
    Node2.prototype.remove = function() {
      if (this.isDragging()) {
        this.stopDrag();
      }
      DragAndDrop.DD._dragElements.delete(this._id);
      this._remove();
      return this;
    };
    Node2.prototype._clearCaches = function() {
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
      this._clearSelfAndDescendantCache(ABSOLUTE_SCALE);
      this._clearSelfAndDescendantCache(STAGE);
      this._clearSelfAndDescendantCache(VISIBLE);
      this._clearSelfAndDescendantCache(LISTENING);
    };
    Node2.prototype._remove = function() {
      this._clearCaches();
      var parent = this.getParent();
      if (parent && parent.children) {
        parent.children.splice(this.index, 1);
        parent._setChildrenIndices();
        this.parent = null;
      }
    };
    Node2.prototype.destroy = function() {
      exports._removeId(this.id(), this);
      var names = (this.name() || "").split(/\s/g);
      for (var i = 0; i < names.length; i++) {
        var subname = names[i];
        exports._removeName(subname, this._id);
      }
      this.remove();
      return this;
    };
    Node2.prototype.getAttr = function(attr) {
      var method = "get" + Util.Util._capitalize(attr);
      if (Util.Util._isFunction(this[method])) {
        return this[method]();
      }
      return this.attrs[attr];
    };
    Node2.prototype.getAncestors = function() {
      var parent = this.getParent(), ancestors = new Util.Collection();
      while (parent) {
        ancestors.push(parent);
        parent = parent.getParent();
      }
      return ancestors;
    };
    Node2.prototype.getAttrs = function() {
      return this.attrs || {};
    };
    Node2.prototype.setAttrs = function(config) {
      var _this = this;
      this._batchTransformChanges(function() {
        var key, method;
        if (!config) {
          return _this;
        }
        for (key in config) {
          if (key === CHILDREN) {
            continue;
          }
          method = SET + Util.Util._capitalize(key);
          if (Util.Util._isFunction(_this[method])) {
            _this[method](config[key]);
          } else {
            _this._setAttr(key, config[key]);
          }
        }
      });
      return this;
    };
    Node2.prototype.isListening = function() {
      return this._getCache(LISTENING, this._isListening);
    };
    Node2.prototype._isListening = function(relativeTo) {
      var listening = this.listening();
      if (!listening) {
        return false;
      }
      var parent = this.getParent();
      if (parent && parent !== relativeTo && this !== relativeTo) {
        return parent._isListening(relativeTo);
      } else {
        return true;
      }
    };
    Node2.prototype.isVisible = function() {
      return this._getCache(VISIBLE, this._isVisible);
    };
    Node2.prototype._isVisible = function(relativeTo) {
      var visible = this.visible();
      if (!visible) {
        return false;
      }
      var parent = this.getParent();
      if (parent && parent !== relativeTo && this !== relativeTo) {
        return parent._isVisible(relativeTo);
      } else {
        return true;
      }
    };
    Node2.prototype.shouldDrawHit = function(top, skipDragCheck) {
      if (skipDragCheck === void 0) {
        skipDragCheck = false;
      }
      if (top) {
        return this._isVisible(top) && this._isListening(top);
      }
      var layer = this.getLayer();
      var layerUnderDrag = false;
      DragAndDrop.DD._dragElements.forEach(function(elem) {
        if (elem.dragStatus !== "dragging") {
          return;
        } else if (elem.node.nodeType === "Stage") {
          layerUnderDrag = true;
        } else if (elem.node.getLayer() === layer) {
          layerUnderDrag = true;
        }
      });
      var dragSkip = !skipDragCheck && !Global.Konva.hitOnDragEnabled && layerUnderDrag;
      return this.isListening() && this.isVisible() && !dragSkip;
    };
    Node2.prototype.show = function() {
      this.visible(true);
      return this;
    };
    Node2.prototype.hide = function() {
      this.visible(false);
      return this;
    };
    Node2.prototype.getZIndex = function() {
      return this.index || 0;
    };
    Node2.prototype.getAbsoluteZIndex = function() {
      var depth = this.getDepth(), that = this, index = 0, nodes, len, n, child;
      function addChildren(children) {
        nodes = [];
        len = children.length;
        for (n = 0; n < len; n++) {
          child = children[n];
          index++;
          if (child.nodeType !== SHAPE) {
            nodes = nodes.concat(child.getChildren().toArray());
          }
          if (child._id === that._id) {
            n = len;
          }
        }
        if (nodes.length > 0 && nodes[0].getDepth() <= depth) {
          addChildren(nodes);
        }
      }
      if (that.nodeType !== UPPER_STAGE) {
        addChildren(that.getStage().getChildren());
      }
      return index;
    };
    Node2.prototype.getDepth = function() {
      var depth = 0, parent = this.parent;
      while (parent) {
        depth++;
        parent = parent.parent;
      }
      return depth;
    };
    Node2.prototype._batchTransformChanges = function(func) {
      this._batchingTransformChange = true;
      func();
      this._batchingTransformChange = false;
      if (this._needClearTransformCache) {
        this._clearCache(TRANSFORM);
        this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM, true);
      }
      this._needClearTransformCache = false;
    };
    Node2.prototype.setPosition = function(pos) {
      var _this = this;
      this._batchTransformChanges(function() {
        _this.x(pos.x);
        _this.y(pos.y);
      });
      return this;
    };
    Node2.prototype.getPosition = function() {
      return {
        x: this.x(),
        y: this.y()
      };
    };
    Node2.prototype.getAbsolutePosition = function(top) {
      var haveCachedParent = false;
      var parent = this.parent;
      while (parent) {
        if (parent.isCached()) {
          haveCachedParent = true;
          break;
        }
        parent = parent.parent;
      }
      if (haveCachedParent && !top) {
        top = true;
      }
      var absoluteMatrix = this.getAbsoluteTransform(top).getMatrix(), absoluteTransform = new Util.Transform(), offset = this.offset();
      absoluteTransform.m = absoluteMatrix.slice();
      absoluteTransform.translate(offset.x, offset.y);
      return absoluteTransform.getTranslation();
    };
    Node2.prototype.setAbsolutePosition = function(pos) {
      var origTrans = this._clearTransform();
      this.attrs.x = origTrans.x;
      this.attrs.y = origTrans.y;
      delete origTrans.x;
      delete origTrans.y;
      this._clearCache(TRANSFORM);
      var it = this._getAbsoluteTransform().copy();
      it.invert();
      it.translate(pos.x, pos.y);
      pos = {
        x: this.attrs.x + it.getTranslation().x,
        y: this.attrs.y + it.getTranslation().y
      };
      this._setTransform(origTrans);
      this.setPosition({x: pos.x, y: pos.y});
      this._clearCache(TRANSFORM);
      this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
      return this;
    };
    Node2.prototype._setTransform = function(trans) {
      var key;
      for (key in trans) {
        this.attrs[key] = trans[key];
      }
    };
    Node2.prototype._clearTransform = function() {
      var trans = {
        x: this.x(),
        y: this.y(),
        rotation: this.rotation(),
        scaleX: this.scaleX(),
        scaleY: this.scaleY(),
        offsetX: this.offsetX(),
        offsetY: this.offsetY(),
        skewX: this.skewX(),
        skewY: this.skewY()
      };
      this.attrs.x = 0;
      this.attrs.y = 0;
      this.attrs.rotation = 0;
      this.attrs.scaleX = 1;
      this.attrs.scaleY = 1;
      this.attrs.offsetX = 0;
      this.attrs.offsetY = 0;
      this.attrs.skewX = 0;
      this.attrs.skewY = 0;
      return trans;
    };
    Node2.prototype.move = function(change) {
      var changeX = change.x, changeY = change.y, x = this.x(), y = this.y();
      if (changeX !== void 0) {
        x += changeX;
      }
      if (changeY !== void 0) {
        y += changeY;
      }
      this.setPosition({x, y});
      return this;
    };
    Node2.prototype._eachAncestorReverse = function(func, top) {
      var family = [], parent = this.getParent(), len, n;
      if (top && top._id === this._id) {
        return;
      }
      family.unshift(this);
      while (parent && (!top || parent._id !== top._id)) {
        family.unshift(parent);
        parent = parent.parent;
      }
      len = family.length;
      for (n = 0; n < len; n++) {
        func(family[n]);
      }
    };
    Node2.prototype.rotate = function(theta) {
      this.rotation(this.rotation() + theta);
      return this;
    };
    Node2.prototype.moveToTop = function() {
      if (!this.parent) {
        Util.Util.warn("Node has no parent. moveToTop function is ignored.");
        return false;
      }
      var index = this.index;
      this.parent.children.splice(index, 1);
      this.parent.children.push(this);
      this.parent._setChildrenIndices();
      return true;
    };
    Node2.prototype.moveUp = function() {
      if (!this.parent) {
        Util.Util.warn("Node has no parent. moveUp function is ignored.");
        return false;
      }
      var index = this.index, len = this.parent.getChildren().length;
      if (index < len - 1) {
        this.parent.children.splice(index, 1);
        this.parent.children.splice(index + 1, 0, this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    };
    Node2.prototype.moveDown = function() {
      if (!this.parent) {
        Util.Util.warn("Node has no parent. moveDown function is ignored.");
        return false;
      }
      var index = this.index;
      if (index > 0) {
        this.parent.children.splice(index, 1);
        this.parent.children.splice(index - 1, 0, this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    };
    Node2.prototype.moveToBottom = function() {
      if (!this.parent) {
        Util.Util.warn("Node has no parent. moveToBottom function is ignored.");
        return false;
      }
      var index = this.index;
      if (index > 0) {
        this.parent.children.splice(index, 1);
        this.parent.children.unshift(this);
        this.parent._setChildrenIndices();
        return true;
      }
      return false;
    };
    Node2.prototype.setZIndex = function(zIndex) {
      if (!this.parent) {
        Util.Util.warn("Node has no parent. zIndex parameter is ignored.");
        return this;
      }
      if (zIndex < 0 || zIndex >= this.parent.children.length) {
        Util.Util.warn("Unexpected value " + zIndex + " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " + (this.parent.children.length - 1) + ".");
      }
      var index = this.index;
      this.parent.children.splice(index, 1);
      this.parent.children.splice(zIndex, 0, this);
      this.parent._setChildrenIndices();
      return this;
    };
    Node2.prototype.getAbsoluteOpacity = function() {
      return this._getCache(ABSOLUTE_OPACITY, this._getAbsoluteOpacity);
    };
    Node2.prototype._getAbsoluteOpacity = function() {
      var absOpacity = this.opacity();
      var parent = this.getParent();
      if (parent && !parent._isUnderCache) {
        absOpacity *= parent.getAbsoluteOpacity();
      }
      return absOpacity;
    };
    Node2.prototype.moveTo = function(newContainer) {
      if (this.getParent() !== newContainer) {
        this._remove();
        newContainer.add(this);
      }
      return this;
    };
    Node2.prototype.toObject = function() {
      var obj = {}, attrs = this.getAttrs(), key, val, getter, defaultValue, nonPlainObject;
      obj.attrs = {};
      for (key in attrs) {
        val = attrs[key];
        nonPlainObject = Util.Util.isObject(val) && !Util.Util._isPlainObject(val) && !Util.Util._isArray(val);
        if (nonPlainObject) {
          continue;
        }
        getter = typeof this[key] === "function" && this[key];
        delete attrs[key];
        defaultValue = getter ? getter.call(this) : null;
        attrs[key] = val;
        if (defaultValue !== val) {
          obj.attrs[key] = val;
        }
      }
      obj.className = this.getClassName();
      return Util.Util._prepareToStringify(obj);
    };
    Node2.prototype.toJSON = function() {
      return JSON.stringify(this.toObject());
    };
    Node2.prototype.getParent = function() {
      return this.parent;
    };
    Node2.prototype.findAncestors = function(selector, includeSelf, stopNode) {
      var res = [];
      if (includeSelf && this._isMatch(selector)) {
        res.push(this);
      }
      var ancestor = this.parent;
      while (ancestor) {
        if (ancestor === stopNode) {
          return res;
        }
        if (ancestor._isMatch(selector)) {
          res.push(ancestor);
        }
        ancestor = ancestor.parent;
      }
      return res;
    };
    Node2.prototype.isAncestorOf = function(node) {
      return false;
    };
    Node2.prototype.findAncestor = function(selector, includeSelf, stopNode) {
      return this.findAncestors(selector, includeSelf, stopNode)[0];
    };
    Node2.prototype._isMatch = function(selector) {
      if (!selector) {
        return false;
      }
      if (typeof selector === "function") {
        return selector(this);
      }
      var selectorArr = selector.replace(/ /g, "").split(","), len = selectorArr.length, n, sel;
      for (n = 0; n < len; n++) {
        sel = selectorArr[n];
        if (!Util.Util.isValidSelector(sel)) {
          Util.Util.warn('Selector "' + sel + '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".');
          Util.Util.warn('If you have a custom shape with such className, please change it to start with upper letter like "Triangle".');
          Util.Util.warn("Konva is awesome, right?");
        }
        if (sel.charAt(0) === "#") {
          if (this.id() === sel.slice(1)) {
            return true;
          }
        } else if (sel.charAt(0) === ".") {
          if (this.hasName(sel.slice(1))) {
            return true;
          }
        } else if (this.className === sel || this.nodeType === sel) {
          return true;
        }
      }
      return false;
    };
    Node2.prototype.getLayer = function() {
      var parent = this.getParent();
      return parent ? parent.getLayer() : null;
    };
    Node2.prototype.getStage = function() {
      return this._getCache(STAGE, this._getStage);
    };
    Node2.prototype._getStage = function() {
      var parent = this.getParent();
      if (parent) {
        return parent.getStage();
      } else {
        return void 0;
      }
    };
    Node2.prototype.fire = function(eventType, evt, bubble) {
      if (evt === void 0) {
        evt = {};
      }
      evt.target = evt.target || this;
      if (bubble) {
        this._fireAndBubble(eventType, evt);
      } else {
        this._fire(eventType, evt);
      }
      return this;
    };
    Node2.prototype.getAbsoluteTransform = function(top) {
      if (top) {
        return this._getAbsoluteTransform(top);
      } else {
        return this._getCache(ABSOLUTE_TRANSFORM, this._getAbsoluteTransform);
      }
    };
    Node2.prototype._getAbsoluteTransform = function(top) {
      var at;
      if (top) {
        at = new Util.Transform();
        this._eachAncestorReverse(function(node) {
          var transformsEnabled2 = node.transformsEnabled();
          if (transformsEnabled2 === "all") {
            at.multiply(node.getTransform());
          } else if (transformsEnabled2 === "position") {
            at.translate(node.x() - node.offsetX(), node.y() - node.offsetY());
          }
        }, top);
        return at;
      } else {
        at = this._cache.get(ABSOLUTE_TRANSFORM) || new Util.Transform();
        if (this.parent) {
          this.parent.getAbsoluteTransform().copyInto(at);
        } else {
          at.reset();
        }
        var transformsEnabled = this.transformsEnabled();
        if (transformsEnabled === "all") {
          at.multiply(this.getTransform());
        } else if (transformsEnabled === "position") {
          var x = this.attrs.x || 0;
          var y = this.attrs.y || 0;
          var offsetX = this.attrs.offsetX || 0;
          var offsetY = this.attrs.offsetY || 0;
          at.translate(x - offsetX, y - offsetY);
        }
        at.dirty = false;
        return at;
      }
    };
    Node2.prototype.getAbsoluteScale = function(top) {
      var parent = this;
      while (parent) {
        if (parent._isUnderCache) {
          top = parent;
        }
        parent = parent.getParent();
      }
      var transform = this.getAbsoluteTransform(top);
      var attrs = transform.decompose();
      return {
        x: attrs.scaleX,
        y: attrs.scaleY
      };
    };
    Node2.prototype.getAbsoluteRotation = function() {
      return this.getAbsoluteTransform().decompose().rotation;
    };
    Node2.prototype.getTransform = function() {
      return this._getCache(TRANSFORM, this._getTransform);
    };
    Node2.prototype._getTransform = function() {
      var _a, _b;
      var m = this._cache.get(TRANSFORM) || new Util.Transform();
      m.reset();
      var x = this.x(), y = this.y(), rotation = Global.Konva.getAngle(this.rotation()), scaleX = (_a = this.attrs.scaleX) !== null && _a !== void 0 ? _a : 1, scaleY = (_b = this.attrs.scaleY) !== null && _b !== void 0 ? _b : 1, skewX = this.attrs.skewX || 0, skewY = this.attrs.skewY || 0, offsetX = this.attrs.offsetX || 0, offsetY = this.attrs.offsetY || 0;
      if (x !== 0 || y !== 0) {
        m.translate(x, y);
      }
      if (rotation !== 0) {
        m.rotate(rotation);
      }
      if (skewX !== 0 || skewY !== 0) {
        m.skew(skewX, skewY);
      }
      if (scaleX !== 1 || scaleY !== 1) {
        m.scale(scaleX, scaleY);
      }
      if (offsetX !== 0 || offsetY !== 0) {
        m.translate(-1 * offsetX, -1 * offsetY);
      }
      m.dirty = false;
      return m;
    };
    Node2.prototype.clone = function(obj) {
      var attrs = Util.Util.cloneObject(this.attrs), key, allListeners, len, n, listener;
      for (key in obj) {
        attrs[key] = obj[key];
      }
      var node = new this.constructor(attrs);
      for (key in this.eventListeners) {
        allListeners = this.eventListeners[key];
        len = allListeners.length;
        for (n = 0; n < len; n++) {
          listener = allListeners[n];
          if (listener.name.indexOf(KONVA) < 0) {
            if (!node.eventListeners[key]) {
              node.eventListeners[key] = [];
            }
            node.eventListeners[key].push(listener);
          }
        }
      }
      return node;
    };
    Node2.prototype._toKonvaCanvas = function(config) {
      config = config || {};
      var box = this.getClientRect();
      var stage = this.getStage(), x = config.x !== void 0 ? config.x : box.x, y = config.y !== void 0 ? config.y : box.y, pixelRatio = config.pixelRatio || 1, canvas = new Canvas_1.SceneCanvas({
        width: config.width || box.width || (stage ? stage.width() : 0),
        height: config.height || box.height || (stage ? stage.height() : 0),
        pixelRatio
      }), context = canvas.getContext();
      context.save();
      if (x || y) {
        context.translate(-1 * x, -1 * y);
      }
      this.drawScene(canvas);
      context.restore();
      return canvas;
    };
    Node2.prototype.toCanvas = function(config) {
      return this._toKonvaCanvas(config)._canvas;
    };
    Node2.prototype.toDataURL = function(config) {
      config = config || {};
      var mimeType = config.mimeType || null, quality = config.quality || null;
      var url = this._toKonvaCanvas(config).toDataURL(mimeType, quality);
      if (config.callback) {
        config.callback(url);
      }
      return url;
    };
    Node2.prototype.toImage = function(config) {
      if (!config || !config.callback) {
        throw "callback required for toImage method config argument";
      }
      var callback = config.callback;
      delete config.callback;
      Util.Util._urlToImage(this.toDataURL(config), function(img) {
        callback(img);
      });
    };
    Node2.prototype.setSize = function(size) {
      this.width(size.width);
      this.height(size.height);
      return this;
    };
    Node2.prototype.getSize = function() {
      return {
        width: this.width(),
        height: this.height()
      };
    };
    Node2.prototype.getClassName = function() {
      return this.className || this.nodeType;
    };
    Node2.prototype.getType = function() {
      return this.nodeType;
    };
    Node2.prototype.getDragDistance = function() {
      if (this.attrs.dragDistance !== void 0) {
        return this.attrs.dragDistance;
      } else if (this.parent) {
        return this.parent.getDragDistance();
      } else {
        return Global.Konva.dragDistance;
      }
    };
    Node2.prototype._off = function(type, name, callback) {
      var evtListeners = this.eventListeners[type], i, evtName, handler;
      for (i = 0; i < evtListeners.length; i++) {
        evtName = evtListeners[i].name;
        handler = evtListeners[i].handler;
        if ((evtName !== "konva" || name === "konva") && (!name || evtName === name) && (!callback || callback === handler)) {
          evtListeners.splice(i, 1);
          if (evtListeners.length === 0) {
            delete this.eventListeners[type];
            break;
          }
          i--;
        }
      }
    };
    Node2.prototype._fireChangeEvent = function(attr, oldVal, newVal) {
      this._fire(attr + CHANGE, {
        oldVal,
        newVal
      });
    };
    Node2.prototype.setId = function(id) {
      var oldId = this.id();
      exports._removeId(oldId, this);
      _addId(this, id);
      this._setAttr("id", id);
      return this;
    };
    Node2.prototype.setName = function(name) {
      var oldNames = (this.name() || "").split(/\s/g);
      var newNames = (name || "").split(/\s/g);
      var subname, i;
      for (i = 0; i < oldNames.length; i++) {
        subname = oldNames[i];
        if (newNames.indexOf(subname) === -1 && subname) {
          exports._removeName(subname, this._id);
        }
      }
      for (i = 0; i < newNames.length; i++) {
        subname = newNames[i];
        if (oldNames.indexOf(subname) === -1 && subname) {
          exports._addName(this, subname);
        }
      }
      this._setAttr(NAME, name);
      return this;
    };
    Node2.prototype.addName = function(name) {
      if (!this.hasName(name)) {
        var oldName = this.name();
        var newName = oldName ? oldName + " " + name : name;
        this.setName(newName);
      }
      return this;
    };
    Node2.prototype.hasName = function(name) {
      if (!name) {
        return false;
      }
      var fullName = this.name();
      if (!fullName) {
        return false;
      }
      var names = (fullName || "").split(/\s/g);
      return names.indexOf(name) !== -1;
    };
    Node2.prototype.removeName = function(name) {
      var names = (this.name() || "").split(/\s/g);
      var index = names.indexOf(name);
      if (index !== -1) {
        names.splice(index, 1);
        this.setName(names.join(" "));
      }
      return this;
    };
    Node2.prototype.setAttr = function(attr, val) {
      var func = this[SET + Util.Util._capitalize(attr)];
      if (Util.Util._isFunction(func)) {
        func.call(this, val);
      } else {
        this._setAttr(attr, val);
      }
      return this;
    };
    Node2.prototype._setAttr = function(key, val, skipFire) {
      var oldVal = this.attrs[key];
      if (oldVal === val && !Util.Util.isObject(val)) {
        return;
      }
      if (val === void 0 || val === null) {
        delete this.attrs[key];
      } else {
        this.attrs[key] = val;
      }
      if (this._shouldFireChangeEvents) {
        this._fireChangeEvent(key, oldVal, val);
      }
    };
    Node2.prototype._setComponentAttr = function(key, component, val) {
      var oldVal;
      if (val !== void 0) {
        oldVal = this.attrs[key];
        if (!oldVal) {
          this.attrs[key] = this.getAttr(key);
        }
        this.attrs[key][component] = val;
        this._fireChangeEvent(key, oldVal, val);
      }
    };
    Node2.prototype._fireAndBubble = function(eventType, evt, compareShape) {
      if (evt && this.nodeType === SHAPE) {
        evt.target = this;
      }
      var shouldStop = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && (compareShape && (this === compareShape || this.isAncestorOf && this.isAncestorOf(compareShape)) || this.nodeType === "Stage" && !compareShape);
      if (!shouldStop) {
        this._fire(eventType, evt);
        var stopBubble = (eventType === MOUSEENTER || eventType === MOUSELEAVE) && compareShape && compareShape.isAncestorOf && compareShape.isAncestorOf(this) && !compareShape.isAncestorOf(this.parent);
        if ((evt && !evt.cancelBubble || !evt) && this.parent && this.parent.isListening() && !stopBubble) {
          if (compareShape && compareShape.parent) {
            this._fireAndBubble.call(this.parent, eventType, evt, compareShape);
          } else {
            this._fireAndBubble.call(this.parent, eventType, evt);
          }
        }
      }
    };
    Node2.prototype._getProtoListeners = function(eventType) {
      var listeners = this._cache.get(ALL_LISTENERS);
      if (!listeners) {
        listeners = {};
        var obj = Object.getPrototypeOf(this);
        while (obj) {
          if (!obj.eventListeners) {
            obj = Object.getPrototypeOf(obj);
            continue;
          }
          for (var event in obj.eventListeners) {
            var newEvents = obj.eventListeners[event];
            var oldEvents = listeners[event] || [];
            listeners[event] = newEvents.concat(oldEvents);
          }
          obj = Object.getPrototypeOf(obj);
        }
        this._cache.set(ALL_LISTENERS, listeners);
      }
      return listeners[eventType];
    };
    Node2.prototype._fire = function(eventType, evt) {
      evt = evt || {};
      evt.currentTarget = this;
      evt.type = eventType;
      var topListeners = this._getProtoListeners(eventType);
      if (topListeners) {
        for (var i = 0; i < topListeners.length; i++) {
          topListeners[i].handler.call(this, evt);
        }
      }
      var selfListeners = this.eventListeners[eventType];
      if (selfListeners) {
        for (var i = 0; i < selfListeners.length; i++) {
          selfListeners[i].handler.call(this, evt);
        }
      }
    };
    Node2.prototype.draw = function() {
      this.drawScene();
      this.drawHit();
      return this;
    };
    Node2.prototype._createDragElement = function(evt) {
      var pointerId = evt ? evt.pointerId : void 0;
      var stage = this.getStage();
      var ap = this.getAbsolutePosition();
      var pos = stage._getPointerById(pointerId) || stage._changedPointerPositions[0] || ap;
      DragAndDrop.DD._dragElements.set(this._id, {
        node: this,
        startPointerPos: pos,
        offset: {
          x: pos.x - ap.x,
          y: pos.y - ap.y
        },
        dragStatus: "ready",
        pointerId
      });
    };
    Node2.prototype.startDrag = function(evt, bubbleEvent) {
      if (bubbleEvent === void 0) {
        bubbleEvent = true;
      }
      if (!DragAndDrop.DD._dragElements.has(this._id)) {
        this._createDragElement(evt);
      }
      var elem = DragAndDrop.DD._dragElements.get(this._id);
      elem.dragStatus = "dragging";
      this.fire("dragstart", {
        type: "dragstart",
        target: this,
        evt: evt && evt.evt
      }, bubbleEvent);
    };
    Node2.prototype._setDragPosition = function(evt, elem) {
      var pos = this.getStage()._getPointerById(elem.pointerId);
      if (!pos) {
        return;
      }
      var newNodePos = {
        x: pos.x - elem.offset.x,
        y: pos.y - elem.offset.y
      };
      var dbf = this.dragBoundFunc();
      if (dbf !== void 0) {
        var bounded = dbf.call(this, newNodePos, evt);
        if (!bounded) {
          Util.Util.warn("dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc.");
        } else {
          newNodePos = bounded;
        }
      }
      if (!this._lastPos || this._lastPos.x !== newNodePos.x || this._lastPos.y !== newNodePos.y) {
        this.setAbsolutePosition(newNodePos);
        if (this.getLayer()) {
          this.getLayer().batchDraw();
        } else if (this.getStage()) {
          this.getStage().batchDraw();
        }
      }
      this._lastPos = newNodePos;
    };
    Node2.prototype.stopDrag = function(evt) {
      var elem = DragAndDrop.DD._dragElements.get(this._id);
      if (elem) {
        elem.dragStatus = "stopped";
      }
      DragAndDrop.DD._endDragBefore(evt);
      DragAndDrop.DD._endDragAfter(evt);
    };
    Node2.prototype.setDraggable = function(draggable) {
      this._setAttr("draggable", draggable);
      this._dragChange();
    };
    Node2.prototype.isDragging = function() {
      var elem = DragAndDrop.DD._dragElements.get(this._id);
      return elem ? elem.dragStatus === "dragging" : false;
    };
    Node2.prototype._listenDrag = function() {
      this._dragCleanup();
      this.on("mousedown.konva touchstart.konva", function(evt) {
        var _this = this;
        var shouldCheckButton = evt.evt["button"] !== void 0;
        var canDrag = !shouldCheckButton || Global.Konva.dragButtons.indexOf(evt.evt["button"]) >= 0;
        if (!canDrag) {
          return;
        }
        if (this.isDragging()) {
          return;
        }
        var hasDraggingChild = false;
        DragAndDrop.DD._dragElements.forEach(function(elem) {
          if (_this.isAncestorOf(elem.node)) {
            hasDraggingChild = true;
          }
        });
        if (!hasDraggingChild) {
          this._createDragElement(evt);
        }
      });
    };
    Node2.prototype._dragChange = function() {
      if (this.attrs.draggable) {
        this._listenDrag();
      } else {
        this._dragCleanup();
        var stage = this.getStage();
        if (!stage) {
          return;
        }
        var dragElement = DragAndDrop.DD._dragElements.get(this._id);
        var isDragging = dragElement && dragElement.dragStatus === "dragging";
        var isReady = dragElement && dragElement.dragStatus === "ready";
        if (isDragging) {
          this.stopDrag();
        } else if (isReady) {
          DragAndDrop.DD._dragElements.delete(this._id);
        }
      }
    };
    Node2.prototype._dragCleanup = function() {
      this.off("mousedown.konva");
      this.off("touchstart.konva");
    };
    Node2.create = function(data, container) {
      if (Util.Util._isString(data)) {
        data = JSON.parse(data);
      }
      return this._createNode(data, container);
    };
    Node2._createNode = function(obj, container) {
      var className = Node2.prototype.getClassName.call(obj), children = obj.children, no, len, n;
      if (container) {
        obj.attrs.container = container;
      }
      if (!Global._NODES_REGISTRY[className]) {
        Util.Util.warn('Can not find a node with class name "' + className + '". Fallback to "Shape".');
        className = "Shape";
      }
      var Class = Global._NODES_REGISTRY[className];
      no = new Class(obj.attrs);
      if (children) {
        len = children.length;
        for (n = 0; n < len; n++) {
          no.add(Node2._createNode(children[n]));
        }
      }
      return no;
    };
    return Node2;
  }();
  exports.Node = Node;
  Node.prototype.nodeType = "Node";
  Node.prototype._attrsAffectingSize = [];
  Node.prototype.eventListeners = {};
  Node.prototype.on.call(Node.prototype, TRANSFORM_CHANGE_STR, function() {
    if (this._batchingTransformChange) {
      this._needClearTransformCache = true;
      return;
    }
    this._clearCache(TRANSFORM);
    this._clearSelfAndDescendantCache(ABSOLUTE_TRANSFORM);
  });
  Node.prototype.on.call(Node.prototype, "visibleChange.konva", function() {
    this._clearSelfAndDescendantCache(VISIBLE);
  });
  Node.prototype.on.call(Node.prototype, "listeningChange.konva", function() {
    this._clearSelfAndDescendantCache(LISTENING);
  });
  Node.prototype.on.call(Node.prototype, "opacityChange.konva", function() {
    this._clearSelfAndDescendantCache(ABSOLUTE_OPACITY);
  });
  var addGetterSetter = Factory.Factory.addGetterSetter;
  addGetterSetter(Node, "zIndex");
  addGetterSetter(Node, "absolutePosition");
  addGetterSetter(Node, "position");
  addGetterSetter(Node, "x", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "y", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "globalCompositeOperation", "source-over", Validators.getStringValidator());
  addGetterSetter(Node, "opacity", 1, Validators.getNumberValidator());
  addGetterSetter(Node, "name", "", Validators.getStringValidator());
  addGetterSetter(Node, "id", "", Validators.getStringValidator());
  addGetterSetter(Node, "rotation", 0, Validators.getNumberValidator());
  Factory.Factory.addComponentsGetterSetter(Node, "scale", ["x", "y"]);
  addGetterSetter(Node, "scaleX", 1, Validators.getNumberValidator());
  addGetterSetter(Node, "scaleY", 1, Validators.getNumberValidator());
  Factory.Factory.addComponentsGetterSetter(Node, "skew", ["x", "y"]);
  addGetterSetter(Node, "skewX", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "skewY", 0, Validators.getNumberValidator());
  Factory.Factory.addComponentsGetterSetter(Node, "offset", ["x", "y"]);
  addGetterSetter(Node, "offsetX", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "offsetY", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "dragDistance", null, Validators.getNumberValidator());
  addGetterSetter(Node, "width", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "height", 0, Validators.getNumberValidator());
  addGetterSetter(Node, "listening", true, Validators.getBooleanValidator());
  addGetterSetter(Node, "preventDefault", true, Validators.getBooleanValidator());
  addGetterSetter(Node, "filters", null, function(val) {
    this._filterUpToDate = false;
    return val;
  });
  addGetterSetter(Node, "visible", true, Validators.getBooleanValidator());
  addGetterSetter(Node, "transformsEnabled", "all", Validators.getStringValidator());
  addGetterSetter(Node, "size");
  addGetterSetter(Node, "dragBoundFunc");
  addGetterSetter(Node, "draggable", false, Validators.getBooleanValidator());
  Factory.Factory.backCompat(Node, {
    rotateDeg: "rotate",
    setRotationDeg: "setRotation",
    getRotationDeg: "getRotation"
  });
  Util.Collection.mapMethods(Node);
});
var Container_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Container = void 0;
  var Container = function(_super) {
    __extends(Container2, _super);
    function Container2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.children = new Util.Collection();
      return _this;
    }
    Container2.prototype.getChildren = function(filterFunc) {
      if (!filterFunc) {
        return this.children;
      }
      var results = new Util.Collection();
      this.children.each(function(child) {
        if (filterFunc(child)) {
          results.push(child);
        }
      });
      return results;
    };
    Container2.prototype.hasChildren = function() {
      return this.getChildren().length > 0;
    };
    Container2.prototype.removeChildren = function() {
      var child;
      for (var i = 0; i < this.children.length; i++) {
        child = this.children[i];
        child.parent = null;
        child.index = 0;
        child.remove();
      }
      this.children = new Util.Collection();
      return this;
    };
    Container2.prototype.destroyChildren = function() {
      var child;
      for (var i = 0; i < this.children.length; i++) {
        child = this.children[i];
        child.parent = null;
        child.index = 0;
        child.destroy();
      }
      this.children = new Util.Collection();
      return this;
    };
    Container2.prototype.add = function() {
      var children = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
      }
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }
        return this;
      }
      var child = children[0];
      if (child.getParent()) {
        child.moveTo(this);
        return this;
      }
      var _children = this.children;
      this._validateAdd(child);
      child._clearCaches();
      child.index = _children.length;
      child.parent = this;
      _children.push(child);
      this._fire("add", {
        child
      });
      return this;
    };
    Container2.prototype.destroy = function() {
      if (this.hasChildren()) {
        this.destroyChildren();
      }
      _super.prototype.destroy.call(this);
      return this;
    };
    Container2.prototype.find = function(selector) {
      return this._generalFind(selector, false);
    };
    Container2.prototype.get = function(selector) {
      Util.Util.warn("collection.get() method is deprecated. Please use collection.find() instead.");
      return this.find(selector);
    };
    Container2.prototype.findOne = function(selector) {
      var result = this._generalFind(selector, true);
      return result.length > 0 ? result[0] : void 0;
    };
    Container2.prototype._generalFind = function(selector, findOne) {
      var retArr = [];
      this._descendants(function(node) {
        var valid = node._isMatch(selector);
        if (valid) {
          retArr.push(node);
        }
        if (valid && findOne) {
          return true;
        }
        return false;
      });
      return Util.Collection.toCollection(retArr);
    };
    Container2.prototype._descendants = function(fn) {
      var shouldStop = false;
      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        shouldStop = fn(child);
        if (shouldStop) {
          return true;
        }
        if (!child.hasChildren()) {
          continue;
        }
        shouldStop = child._descendants(fn);
        if (shouldStop) {
          return true;
        }
      }
      return false;
    };
    Container2.prototype.toObject = function() {
      var obj = Node_1.Node.prototype.toObject.call(this);
      obj.children = [];
      var children = this.getChildren();
      var len = children.length;
      for (var n = 0; n < len; n++) {
        var child = children[n];
        obj.children.push(child.toObject());
      }
      return obj;
    };
    Container2.prototype.isAncestorOf = function(node) {
      var parent = node.getParent();
      while (parent) {
        if (parent._id === this._id) {
          return true;
        }
        parent = parent.getParent();
      }
      return false;
    };
    Container2.prototype.clone = function(obj) {
      var node = Node_1.Node.prototype.clone.call(this, obj);
      this.getChildren().each(function(no) {
        node.add(no.clone());
      });
      return node;
    };
    Container2.prototype.getAllIntersections = function(pos) {
      var arr = [];
      this.find("Shape").each(function(shape) {
        if (shape.isVisible() && shape.intersects(pos)) {
          arr.push(shape);
        }
      });
      return arr;
    };
    Container2.prototype._setChildrenIndices = function() {
      this.children.each(function(child, n) {
        child.index = n;
      });
    };
    Container2.prototype.drawScene = function(can, top) {
      var layer = this.getLayer(), canvas = can || layer && layer.getCanvas(), context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedSceneCanvas = cachedCanvas && cachedCanvas.scene;
      var caching = canvas && canvas.isCache;
      if (!this.isVisible() && !caching) {
        return this;
      }
      if (cachedSceneCanvas) {
        context.save();
        var m = this.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        this._drawCachedSceneCanvas(context);
        context.restore();
      } else {
        this._drawChildren("drawScene", canvas, top);
      }
      return this;
    };
    Container2.prototype.drawHit = function(can, top) {
      if (!this.shouldDrawHit(top)) {
        return this;
      }
      var layer = this.getLayer(), canvas = can || layer && layer.hitCanvas, context = canvas && canvas.getContext(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
      if (cachedHitCanvas) {
        context.save();
        var m = this.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        this._drawCachedHitCanvas(context);
        context.restore();
      } else {
        this._drawChildren("drawHit", canvas, top);
      }
      return this;
    };
    Container2.prototype._drawChildren = function(drawMethod, canvas, top) {
      var context = canvas && canvas.getContext(), clipWidth = this.clipWidth(), clipHeight = this.clipHeight(), clipFunc = this.clipFunc(), hasClip = clipWidth && clipHeight || clipFunc;
      var selfCache = top === this;
      if (hasClip) {
        context.save();
        var transform = this.getAbsoluteTransform(top);
        var m = transform.getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        context.beginPath();
        if (clipFunc) {
          clipFunc.call(this, context, this);
        } else {
          var clipX = this.clipX();
          var clipY = this.clipY();
          context.rect(clipX, clipY, clipWidth, clipHeight);
        }
        context.clip();
        m = transform.copy().invert().getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      }
      var hasComposition = !selfCache && this.globalCompositeOperation() !== "source-over" && drawMethod === "drawScene";
      if (hasComposition) {
        context.save();
        context._applyGlobalCompositeOperation(this);
      }
      this.children.each(function(child) {
        child[drawMethod](canvas, top);
      });
      if (hasComposition) {
        context.restore();
      }
      if (hasClip) {
        context.restore();
      }
    };
    Container2.prototype.getClientRect = function(config) {
      config = config || {};
      var skipTransform = config.skipTransform;
      var relativeTo = config.relativeTo;
      var minX, minY, maxX, maxY;
      var selfRect = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
      };
      var that = this;
      this.children.each(function(child) {
        if (!child.visible()) {
          return;
        }
        var rect = child.getClientRect({
          relativeTo: that,
          skipShadow: config.skipShadow,
          skipStroke: config.skipStroke
        });
        if (rect.width === 0 && rect.height === 0) {
          return;
        }
        if (minX === void 0) {
          minX = rect.x;
          minY = rect.y;
          maxX = rect.x + rect.width;
          maxY = rect.y + rect.height;
        } else {
          minX = Math.min(minX, rect.x);
          minY = Math.min(minY, rect.y);
          maxX = Math.max(maxX, rect.x + rect.width);
          maxY = Math.max(maxY, rect.y + rect.height);
        }
      });
      var shapes = this.find("Shape");
      var hasVisible = false;
      for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        if (shape._isVisible(this)) {
          hasVisible = true;
          break;
        }
      }
      if (hasVisible && minX !== void 0) {
        selfRect = {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      } else {
        selfRect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (!skipTransform) {
        return this._transformedRect(selfRect, relativeTo);
      }
      return selfRect;
    };
    return Container2;
  }(Node_1.Node);
  exports.Container = Container;
  Factory.Factory.addComponentsGetterSetter(Container, "clip", [
    "x",
    "y",
    "width",
    "height"
  ]);
  Factory.Factory.addGetterSetter(Container, "clipX", void 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Container, "clipY", void 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Container, "clipWidth", void 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Container, "clipHeight", void 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Container, "clipFunc");
  Util.Collection.mapMethods(Container);
});
var PointerEvents = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.releaseCapture = exports.setPointerCapture = exports.hasPointerCapture = exports.createEvent = exports.getCapturedShape = void 0;
  var Captures = new Map();
  var SUPPORT_POINTER_EVENTS = Global.Konva._global["PointerEvent"] !== void 0;
  function getCapturedShape(pointerId) {
    return Captures.get(pointerId);
  }
  exports.getCapturedShape = getCapturedShape;
  function createEvent(evt) {
    return {
      evt,
      pointerId: evt.pointerId
    };
  }
  exports.createEvent = createEvent;
  function hasPointerCapture(pointerId, shape) {
    return Captures.get(pointerId) === shape;
  }
  exports.hasPointerCapture = hasPointerCapture;
  function setPointerCapture(pointerId, shape) {
    releaseCapture(pointerId);
    var stage = shape.getStage();
    if (!stage)
      return;
    Captures.set(pointerId, shape);
    if (SUPPORT_POINTER_EVENTS) {
      shape._fire("gotpointercapture", createEvent(new PointerEvent("gotpointercapture")));
    }
  }
  exports.setPointerCapture = setPointerCapture;
  function releaseCapture(pointerId, target) {
    var shape = Captures.get(pointerId);
    if (!shape)
      return;
    var stage = shape.getStage();
    if (stage && stage.content)
      ;
    Captures.delete(pointerId);
    if (SUPPORT_POINTER_EVENTS) {
      shape._fire("lostpointercapture", createEvent(new PointerEvent("lostpointercapture")));
    }
  }
  exports.releaseCapture = releaseCapture;
});
var Stage_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Stage = exports.stages = void 0;
  var Global_2 = Global;
  var STAGE = "Stage", STRING = "string", PX = "px", MOUSEOUT = "mouseout", MOUSELEAVE = "mouseleave", MOUSEOVER = "mouseover", MOUSEENTER = "mouseenter", MOUSEMOVE = "mousemove", MOUSEDOWN = "mousedown", MOUSEUP = "mouseup", POINTERMOVE = "pointermove", POINTERDOWN = "pointerdown", POINTERUP = "pointerup", POINTERCANCEL = "pointercancel", LOSTPOINTERCAPTURE = "lostpointercapture", CONTEXTMENU = "contextmenu", CLICK = "click", DBL_CLICK = "dblclick", TOUCHSTART = "touchstart", TOUCHEND = "touchend", TAP = "tap", DBL_TAP = "dbltap", TOUCHMOVE = "touchmove", WHEEL = "wheel", CONTENT_MOUSEOUT = "contentMouseout", CONTENT_MOUSEOVER = "contentMouseover", CONTENT_MOUSEMOVE = "contentMousemove", CONTENT_MOUSEDOWN = "contentMousedown", CONTENT_MOUSEUP = "contentMouseup", CONTENT_CONTEXTMENU = "contentContextmenu", CONTENT_CLICK = "contentClick", CONTENT_DBL_CLICK = "contentDblclick", CONTENT_TOUCHSTART = "contentTouchstart", CONTENT_TOUCHEND = "contentTouchend", CONTENT_DBL_TAP = "contentDbltap", CONTENT_TAP = "contentTap", CONTENT_TOUCHMOVE = "contentTouchmove", CONTENT_WHEEL = "contentWheel", RELATIVE = "relative", KONVA_CONTENT = "konvajs-content", UNDERSCORE = "_", CONTAINER = "container", MAX_LAYERS_NUMBER = 5, EMPTY_STRING = "", EVENTS = [
    MOUSEENTER,
    MOUSEDOWN,
    MOUSEMOVE,
    MOUSEUP,
    MOUSELEAVE,
    TOUCHSTART,
    TOUCHMOVE,
    TOUCHEND,
    MOUSEOVER,
    WHEEL,
    CONTEXTMENU,
    POINTERDOWN,
    POINTERMOVE,
    POINTERUP,
    POINTERCANCEL,
    LOSTPOINTERCAPTURE
  ], eventsLength = EVENTS.length;
  function addEvent(ctx, eventName) {
    ctx.content.addEventListener(eventName, function(evt) {
      ctx[UNDERSCORE + eventName](evt);
    }, false);
  }
  var NO_POINTERS_MESSAGE = "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);";
  exports.stages = [];
  function checkNoClip(attrs) {
    if (attrs === void 0) {
      attrs = {};
    }
    if (attrs.clipFunc || attrs.clipWidth || attrs.clipHeight) {
      Util.Util.warn("Stage does not support clipping. Please use clip for Layers or Groups.");
    }
    return attrs;
  }
  var Stage = function(_super) {
    __extends(Stage2, _super);
    function Stage2(config) {
      var _this = _super.call(this, checkNoClip(config)) || this;
      _this._pointerPositions = [];
      _this._changedPointerPositions = [];
      _this._buildDOM();
      _this._bindContentEvents();
      exports.stages.push(_this);
      _this.on("widthChange.konva heightChange.konva", _this._resizeDOM);
      _this.on("visibleChange.konva", _this._checkVisibility);
      _this.on("clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva", function() {
        checkNoClip(_this.attrs);
      });
      _this._checkVisibility();
      return _this;
    }
    Stage2.prototype._validateAdd = function(child) {
      var isLayer = child.getType() === "Layer";
      var isFastLayer = child.getType() === "FastLayer";
      var valid = isLayer || isFastLayer;
      if (!valid) {
        Util.Util.throw("You may only add layers to the stage.");
      }
    };
    Stage2.prototype._checkVisibility = function() {
      if (!this.content) {
        return;
      }
      var style = this.visible() ? "" : "none";
      this.content.style.display = style;
    };
    Stage2.prototype.setContainer = function(container) {
      if (typeof container === STRING) {
        if (container.charAt(0) === ".") {
          var className = container.slice(1);
          container = document.getElementsByClassName(className)[0];
        } else {
          var id;
          if (container.charAt(0) !== "#") {
            id = container;
          } else {
            id = container.slice(1);
          }
          container = document.getElementById(id);
        }
        if (!container) {
          throw "Can not find container in document with id " + id;
        }
      }
      this._setAttr(CONTAINER, container);
      if (this.content) {
        if (this.content.parentElement) {
          this.content.parentElement.removeChild(this.content);
        }
        container.appendChild(this.content);
      }
      return this;
    };
    Stage2.prototype.shouldDrawHit = function() {
      return true;
    };
    Stage2.prototype.clear = function() {
      var layers = this.children, len = layers.length, n;
      for (n = 0; n < len; n++) {
        layers[n].clear();
      }
      return this;
    };
    Stage2.prototype.clone = function(obj) {
      if (!obj) {
        obj = {};
      }
      obj.container = document.createElement("div");
      return Container_1.Container.prototype.clone.call(this, obj);
    };
    Stage2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      var content = this.content;
      if (content && Util.Util._isInDocument(content)) {
        this.container().removeChild(content);
      }
      var index = exports.stages.indexOf(this);
      if (index > -1) {
        exports.stages.splice(index, 1);
      }
      return this;
    };
    Stage2.prototype.getPointerPosition = function() {
      var pos = this._pointerPositions[0] || this._changedPointerPositions[0];
      if (!pos) {
        Util.Util.warn(NO_POINTERS_MESSAGE);
        return null;
      }
      return {
        x: pos.x,
        y: pos.y
      };
    };
    Stage2.prototype._getPointerById = function(id) {
      return this._pointerPositions.find(function(p) {
        return p.id === id;
      });
    };
    Stage2.prototype.getPointersPositions = function() {
      return this._pointerPositions;
    };
    Stage2.prototype.getStage = function() {
      return this;
    };
    Stage2.prototype.getContent = function() {
      return this.content;
    };
    Stage2.prototype._toKonvaCanvas = function(config) {
      config = config || {};
      config.x = config.x || 0;
      config.y = config.y || 0;
      config.width = config.width || this.width();
      config.height = config.height || this.height();
      var canvas = new Canvas_1.SceneCanvas({
        width: config.width,
        height: config.height,
        pixelRatio: config.pixelRatio || 1
      });
      var _context = canvas.getContext()._context;
      var layers = this.children;
      if (config.x || config.y) {
        _context.translate(-1 * config.x, -1 * config.y);
      }
      layers.each(function(layer) {
        if (!layer.isVisible()) {
          return;
        }
        var layerCanvas = layer._toKonvaCanvas(config);
        _context.drawImage(layerCanvas._canvas, config.x, config.y, layerCanvas.getWidth() / layerCanvas.getPixelRatio(), layerCanvas.getHeight() / layerCanvas.getPixelRatio());
      });
      return canvas;
    };
    Stage2.prototype.getIntersection = function(pos, selector) {
      if (!pos) {
        return null;
      }
      var layers = this.children, len = layers.length, end = len - 1, n, shape;
      for (n = end; n >= 0; n--) {
        shape = layers[n].getIntersection(pos, selector);
        if (shape) {
          return shape;
        }
      }
      return null;
    };
    Stage2.prototype._resizeDOM = function() {
      var width = this.width();
      var height = this.height();
      if (this.content) {
        this.content.style.width = width + PX;
        this.content.style.height = height + PX;
      }
      this.bufferCanvas.setSize(width, height);
      this.bufferHitCanvas.setSize(width, height);
      this.children.each(function(layer) {
        layer.setSize({width, height});
        layer.draw();
      });
    };
    Stage2.prototype.add = function(layer) {
      if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
          this.add(arguments[i]);
        }
        return this;
      }
      _super.prototype.add.call(this, layer);
      var length = this.children.length;
      if (length > MAX_LAYERS_NUMBER) {
        Util.Util.warn("The stage has " + length + " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group.");
      }
      layer.setSize({width: this.width(), height: this.height()});
      layer.draw();
      if (Global.Konva.isBrowser) {
        this.content.appendChild(layer.canvas._canvas);
      }
      return this;
    };
    Stage2.prototype.getParent = function() {
      return null;
    };
    Stage2.prototype.getLayer = function() {
      return null;
    };
    Stage2.prototype.hasPointerCapture = function(pointerId) {
      return PointerEvents.hasPointerCapture(pointerId, this);
    };
    Stage2.prototype.setPointerCapture = function(pointerId) {
      PointerEvents.setPointerCapture(pointerId, this);
    };
    Stage2.prototype.releaseCapture = function(pointerId) {
      PointerEvents.releaseCapture(pointerId, this);
    };
    Stage2.prototype.getLayers = function() {
      return this.getChildren();
    };
    Stage2.prototype._bindContentEvents = function() {
      if (!Global.Konva.isBrowser) {
        return;
      }
      for (var n = 0; n < eventsLength; n++) {
        addEvent(this, EVENTS[n]);
      }
    };
    Stage2.prototype._mouseenter = function(evt) {
      this.setPointersPositions(evt);
      this._fire(MOUSEENTER, {evt, target: this, currentTarget: this});
    };
    Stage2.prototype._mouseover = function(evt) {
      this.setPointersPositions(evt);
      this._fire(CONTENT_MOUSEOVER, {evt});
      this._fire(MOUSEOVER, {evt, target: this, currentTarget: this});
    };
    Stage2.prototype._mouseleave = function(evt) {
      var _a;
      this.setPointersPositions(evt);
      var targetShape = ((_a = this.targetShape) === null || _a === void 0 ? void 0 : _a.getStage()) ? this.targetShape : null;
      var eventsEnabled = !DragAndDrop.DD.isDragging || Global.Konva.hitOnDragEnabled;
      if (targetShape && eventsEnabled) {
        targetShape._fireAndBubble(MOUSEOUT, {evt});
        targetShape._fireAndBubble(MOUSELEAVE, {evt});
        this._fire(MOUSELEAVE, {evt, target: this, currentTarget: this});
        this.targetShape = null;
      } else if (eventsEnabled) {
        this._fire(MOUSELEAVE, {
          evt,
          target: this,
          currentTarget: this
        });
        this._fire(MOUSEOUT, {
          evt,
          target: this,
          currentTarget: this
        });
      }
      this.pointerPos = void 0;
      this._pointerPositions = [];
      this._fire(CONTENT_MOUSEOUT, {evt});
    };
    Stage2.prototype._mousemove = function(evt) {
      var _a;
      if (Global.Konva.UA.ieMobile) {
        return this._touchmove(evt);
      }
      this.setPointersPositions(evt);
      var pointerId = Util.Util._getFirstPointerId(evt);
      var shape;
      var targetShape = ((_a = this.targetShape) === null || _a === void 0 ? void 0 : _a.getStage()) ? this.targetShape : null;
      var eventsEnabled = !DragAndDrop.DD.isDragging || Global.Konva.hitOnDragEnabled;
      if (eventsEnabled) {
        shape = this.getIntersection(this.getPointerPosition());
        if (shape && shape.isListening()) {
          var differentTarget = targetShape !== shape;
          if (eventsEnabled && differentTarget) {
            if (targetShape) {
              targetShape._fireAndBubble(MOUSEOUT, {evt, pointerId}, shape);
              targetShape._fireAndBubble(MOUSELEAVE, {evt, pointerId}, shape);
            }
            shape._fireAndBubble(MOUSEOVER, {evt, pointerId}, targetShape);
            shape._fireAndBubble(MOUSEENTER, {evt, pointerId}, targetShape);
            shape._fireAndBubble(MOUSEMOVE, {evt, pointerId});
            this.targetShape = shape;
          } else {
            shape._fireAndBubble(MOUSEMOVE, {evt, pointerId});
          }
        } else {
          if (targetShape && eventsEnabled) {
            targetShape._fireAndBubble(MOUSEOUT, {evt, pointerId});
            targetShape._fireAndBubble(MOUSELEAVE, {evt, pointerId});
            this._fire(MOUSEOVER, {
              evt,
              target: this,
              currentTarget: this,
              pointerId
            });
            this.targetShape = null;
          }
          this._fire(MOUSEMOVE, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
        this._fire(CONTENT_MOUSEMOVE, {evt});
      }
      if (evt.cancelable) {
        evt.preventDefault();
      }
    };
    Stage2.prototype._mousedown = function(evt) {
      if (Global.Konva.UA.ieMobile) {
        return this._touchstart(evt);
      }
      this.setPointersPositions(evt);
      var pointerId = Util.Util._getFirstPointerId(evt);
      var shape = this.getIntersection(this.getPointerPosition());
      DragAndDrop.DD.justDragged = false;
      Global.Konva.listenClickTap = true;
      if (shape && shape.isListening()) {
        this.clickStartShape = shape;
        shape._fireAndBubble(MOUSEDOWN, {evt, pointerId});
      } else {
        this._fire(MOUSEDOWN, {
          evt,
          target: this,
          currentTarget: this,
          pointerId
        });
      }
      this._fire(CONTENT_MOUSEDOWN, {evt});
    };
    Stage2.prototype._mouseup = function(evt) {
      if (Global.Konva.UA.ieMobile) {
        return this._touchend(evt);
      }
      this.setPointersPositions(evt);
      var pointerId = Util.Util._getFirstPointerId(evt);
      var shape = this.getIntersection(this.getPointerPosition()), clickStartShape = this.clickStartShape, clickEndShape = this.clickEndShape, fireDblClick = false;
      if (Global.Konva.inDblClickWindow) {
        fireDblClick = true;
        clearTimeout(this.dblTimeout);
      } else if (!DragAndDrop.DD.justDragged) {
        Global.Konva.inDblClickWindow = true;
        clearTimeout(this.dblTimeout);
      }
      this.dblTimeout = setTimeout(function() {
        Global.Konva.inDblClickWindow = false;
      }, Global.Konva.dblClickWindow);
      if (shape && shape.isListening()) {
        this.clickEndShape = shape;
        shape._fireAndBubble(MOUSEUP, {evt, pointerId});
        if (Global.Konva.listenClickTap && clickStartShape && clickStartShape._id === shape._id) {
          shape._fireAndBubble(CLICK, {evt, pointerId});
          if (fireDblClick && clickEndShape && clickEndShape === shape) {
            shape._fireAndBubble(DBL_CLICK, {evt, pointerId});
          }
        }
      } else {
        this.clickEndShape = null;
        this._fire(MOUSEUP, {
          evt,
          target: this,
          currentTarget: this,
          pointerId
        });
        if (Global.Konva.listenClickTap) {
          this._fire(CLICK, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
        if (fireDblClick) {
          this._fire(DBL_CLICK, {
            evt,
            target: this,
            currentTarget: this,
            pointerId
          });
        }
      }
      this._fire(CONTENT_MOUSEUP, {evt});
      if (Global.Konva.listenClickTap) {
        this._fire(CONTENT_CLICK, {evt});
        if (fireDblClick) {
          this._fire(CONTENT_DBL_CLICK, {evt});
        }
      }
      Global.Konva.listenClickTap = false;
      if (evt.cancelable) {
        evt.preventDefault();
      }
    };
    Stage2.prototype._contextmenu = function(evt) {
      this.setPointersPositions(evt);
      var shape = this.getIntersection(this.getPointerPosition());
      if (shape && shape.isListening()) {
        shape._fireAndBubble(CONTEXTMENU, {evt});
      } else {
        this._fire(CONTEXTMENU, {
          evt,
          target: this,
          currentTarget: this
        });
      }
      this._fire(CONTENT_CONTEXTMENU, {evt});
    };
    Stage2.prototype._touchstart = function(evt) {
      var _this = this;
      this.setPointersPositions(evt);
      var triggeredOnShape = false;
      this._changedPointerPositions.forEach(function(pos) {
        var shape = _this.getIntersection(pos);
        Global.Konva.listenClickTap = true;
        DragAndDrop.DD.justDragged = false;
        var hasShape = shape && shape.isListening();
        if (!hasShape) {
          return;
        }
        if (Global.Konva.captureTouchEventsEnabled) {
          shape.setPointerCapture(pos.id);
        }
        _this.tapStartShape = shape;
        shape._fireAndBubble(TOUCHSTART, {evt, pointerId: pos.id}, _this);
        triggeredOnShape = true;
        if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
      });
      if (!triggeredOnShape) {
        this._fire(TOUCHSTART, {
          evt,
          target: this,
          currentTarget: this,
          pointerId: this._changedPointerPositions[0].id
        });
      }
      this._fire(CONTENT_TOUCHSTART, {evt});
    };
    Stage2.prototype._touchmove = function(evt) {
      var _this = this;
      this.setPointersPositions(evt);
      var eventsEnabled = !DragAndDrop.DD.isDragging || Global.Konva.hitOnDragEnabled;
      if (eventsEnabled) {
        var triggeredOnShape = false;
        var processedShapesIds = {};
        this._changedPointerPositions.forEach(function(pos) {
          var shape = PointerEvents.getCapturedShape(pos.id) || _this.getIntersection(pos);
          var hasShape = shape && shape.isListening();
          if (!hasShape) {
            return;
          }
          if (processedShapesIds[shape._id]) {
            return;
          }
          processedShapesIds[shape._id] = true;
          shape._fireAndBubble(TOUCHMOVE, {evt, pointerId: pos.id});
          triggeredOnShape = true;
          if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
            evt.preventDefault();
          }
        });
        if (!triggeredOnShape) {
          this._fire(TOUCHMOVE, {
            evt,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id
          });
        }
        this._fire(CONTENT_TOUCHMOVE, {evt});
      }
      if (DragAndDrop.DD.isDragging && DragAndDrop.DD.node.preventDefault() && evt.cancelable) {
        evt.preventDefault();
      }
    };
    Stage2.prototype._touchend = function(evt) {
      var _this = this;
      this.setPointersPositions(evt);
      var tapEndShape = this.tapEndShape, fireDblClick = false;
      if (Global.Konva.inDblClickWindow) {
        fireDblClick = true;
        clearTimeout(this.dblTimeout);
      } else if (!DragAndDrop.DD.justDragged) {
        Global.Konva.inDblClickWindow = true;
        clearTimeout(this.dblTimeout);
      }
      this.dblTimeout = setTimeout(function() {
        Global.Konva.inDblClickWindow = false;
      }, Global.Konva.dblClickWindow);
      var triggeredOnShape = false;
      var processedShapesIds = {};
      var tapTriggered = false;
      var dblTapTriggered = false;
      this._changedPointerPositions.forEach(function(pos) {
        var shape = PointerEvents.getCapturedShape(pos.id) || _this.getIntersection(pos);
        if (shape) {
          shape.releaseCapture(pos.id);
        }
        var hasShape = shape && shape.isListening();
        if (!hasShape) {
          return;
        }
        if (processedShapesIds[shape._id]) {
          return;
        }
        processedShapesIds[shape._id] = true;
        _this.tapEndShape = shape;
        shape._fireAndBubble(TOUCHEND, {evt, pointerId: pos.id});
        triggeredOnShape = true;
        if (Global.Konva.listenClickTap && shape === _this.tapStartShape) {
          tapTriggered = true;
          shape._fireAndBubble(TAP, {evt, pointerId: pos.id});
          if (fireDblClick && tapEndShape && tapEndShape === shape) {
            dblTapTriggered = true;
            shape._fireAndBubble(DBL_TAP, {evt, pointerId: pos.id});
          }
        }
        if (shape.isListening() && shape.preventDefault() && evt.cancelable) {
          evt.preventDefault();
        }
      });
      if (!triggeredOnShape) {
        this._fire(TOUCHEND, {
          evt,
          target: this,
          currentTarget: this,
          pointerId: this._changedPointerPositions[0].id
        });
      }
      if (Global.Konva.listenClickTap && !tapTriggered) {
        this.tapEndShape = null;
        this._fire(TAP, {
          evt,
          target: this,
          currentTarget: this,
          pointerId: this._changedPointerPositions[0].id
        });
      }
      if (fireDblClick && !dblTapTriggered) {
        this._fire(DBL_TAP, {
          evt,
          target: this,
          currentTarget: this,
          pointerId: this._changedPointerPositions[0].id
        });
      }
      this._fire(CONTENT_TOUCHEND, {evt});
      if (Global.Konva.listenClickTap) {
        this._fire(CONTENT_TAP, {evt});
        if (fireDblClick) {
          this._fire(CONTENT_DBL_TAP, {evt});
        }
      }
      if (this.preventDefault() && evt.cancelable) {
        evt.preventDefault();
      }
      Global.Konva.listenClickTap = false;
    };
    Stage2.prototype._wheel = function(evt) {
      this.setPointersPositions(evt);
      var shape = this.getIntersection(this.getPointerPosition());
      if (shape && shape.isListening()) {
        shape._fireAndBubble(WHEEL, {evt});
      } else {
        this._fire(WHEEL, {
          evt,
          target: this,
          currentTarget: this
        });
      }
      this._fire(CONTENT_WHEEL, {evt});
    };
    Stage2.prototype._pointerdown = function(evt) {
      if (!Global.Konva._pointerEventsEnabled) {
        return;
      }
      this.setPointersPositions(evt);
      var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
      if (shape) {
        shape._fireAndBubble(POINTERDOWN, PointerEvents.createEvent(evt));
      }
    };
    Stage2.prototype._pointermove = function(evt) {
      if (!Global.Konva._pointerEventsEnabled) {
        return;
      }
      this.setPointersPositions(evt);
      var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
      if (shape) {
        shape._fireAndBubble(POINTERMOVE, PointerEvents.createEvent(evt));
      }
    };
    Stage2.prototype._pointerup = function(evt) {
      if (!Global.Konva._pointerEventsEnabled) {
        return;
      }
      this.setPointersPositions(evt);
      var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
      if (shape) {
        shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
      }
      PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage2.prototype._pointercancel = function(evt) {
      if (!Global.Konva._pointerEventsEnabled) {
        return;
      }
      this.setPointersPositions(evt);
      var shape = PointerEvents.getCapturedShape(evt.pointerId) || this.getIntersection(this.getPointerPosition());
      if (shape) {
        shape._fireAndBubble(POINTERUP, PointerEvents.createEvent(evt));
      }
      PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage2.prototype._lostpointercapture = function(evt) {
      PointerEvents.releaseCapture(evt.pointerId);
    };
    Stage2.prototype.setPointersPositions = function(evt) {
      var _this = this;
      var contentPosition = this._getContentPosition(), x = null, y = null;
      evt = evt ? evt : window.event;
      if (evt.touches !== void 0) {
        this._pointerPositions = [];
        this._changedPointerPositions = [];
        Util.Collection.prototype.each.call(evt.touches, function(touch) {
          _this._pointerPositions.push({
            id: touch.identifier,
            x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
            y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
          });
        });
        Util.Collection.prototype.each.call(evt.changedTouches || evt.touches, function(touch) {
          _this._changedPointerPositions.push({
            id: touch.identifier,
            x: (touch.clientX - contentPosition.left) / contentPosition.scaleX,
            y: (touch.clientY - contentPosition.top) / contentPosition.scaleY
          });
        });
      } else {
        x = (evt.clientX - contentPosition.left) / contentPosition.scaleX;
        y = (evt.clientY - contentPosition.top) / contentPosition.scaleY;
        this.pointerPos = {
          x,
          y
        };
        this._pointerPositions = [{x, y, id: Util.Util._getFirstPointerId(evt)}];
        this._changedPointerPositions = [
          {x, y, id: Util.Util._getFirstPointerId(evt)}
        ];
      }
    };
    Stage2.prototype._setPointerPosition = function(evt) {
      Util.Util.warn('Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.');
      this.setPointersPositions(evt);
    };
    Stage2.prototype._getContentPosition = function() {
      if (!this.content || !this.content.getBoundingClientRect) {
        return {
          top: 0,
          left: 0,
          scaleX: 1,
          scaleY: 1
        };
      }
      var rect = this.content.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        scaleX: rect.width / this.content.clientWidth || 1,
        scaleY: rect.height / this.content.clientHeight || 1
      };
    };
    Stage2.prototype._buildDOM = function() {
      this.bufferCanvas = new Canvas_1.SceneCanvas({
        width: this.width(),
        height: this.height()
      });
      this.bufferHitCanvas = new Canvas_1.HitCanvas({
        pixelRatio: 1,
        width: this.width(),
        height: this.height()
      });
      if (!Global.Konva.isBrowser) {
        return;
      }
      var container = this.container();
      if (!container) {
        throw "Stage has no container. A container is required.";
      }
      container.innerHTML = EMPTY_STRING;
      this.content = document.createElement("div");
      this.content.style.position = RELATIVE;
      this.content.style.userSelect = "none";
      this.content.className = KONVA_CONTENT;
      this.content.setAttribute("role", "presentation");
      container.appendChild(this.content);
      this._resizeDOM();
    };
    Stage2.prototype.cache = function() {
      Util.Util.warn("Cache function is not allowed for stage. You may use cache only for layers, groups and shapes.");
      return this;
    };
    Stage2.prototype.clearCache = function() {
      return this;
    };
    Stage2.prototype.batchDraw = function() {
      this.children.each(function(layer) {
        layer.batchDraw();
      });
      return this;
    };
    return Stage2;
  }(Container_1.Container);
  exports.Stage = Stage;
  Stage.prototype.nodeType = STAGE;
  Global_2._registerNode(Stage);
  Factory.Factory.addGetterSetter(Stage, "container");
});
var Shape_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Shape = exports.shapes = void 0;
  var HAS_SHADOW = "hasShadow";
  var SHADOW_RGBA = "shadowRGBA";
  var patternImage = "patternImage";
  var linearGradient = "linearGradient";
  var radialGradient = "radialGradient";
  var dummyContext;
  function getDummyContext() {
    if (dummyContext) {
      return dummyContext;
    }
    dummyContext = Util.Util.createCanvasElement().getContext("2d");
    return dummyContext;
  }
  exports.shapes = {};
  function _fillFunc(context) {
    context.fill();
  }
  function _strokeFunc(context) {
    context.stroke();
  }
  function _fillFuncHit(context) {
    context.fill();
  }
  function _strokeFuncHit(context) {
    context.stroke();
  }
  function _clearHasShadowCache() {
    this._clearCache(HAS_SHADOW);
  }
  function _clearGetShadowRGBACache() {
    this._clearCache(SHADOW_RGBA);
  }
  function _clearFillPatternCache() {
    this._clearCache(patternImage);
  }
  function _clearLinearGradientCache() {
    this._clearCache(linearGradient);
  }
  function _clearRadialGradientCache() {
    this._clearCache(radialGradient);
  }
  var Shape = function(_super) {
    __extends(Shape2, _super);
    function Shape2(config) {
      var _this = _super.call(this, config) || this;
      var key;
      while (true) {
        key = Util.Util.getRandomColor();
        if (key && !(key in exports.shapes)) {
          break;
        }
      }
      _this.colorKey = key;
      exports.shapes[key] = _this;
      return _this;
    }
    Shape2.prototype.getContext = function() {
      return this.getLayer().getContext();
    };
    Shape2.prototype.getCanvas = function() {
      return this.getLayer().getCanvas();
    };
    Shape2.prototype.getSceneFunc = function() {
      return this.attrs.sceneFunc || this["_sceneFunc"];
    };
    Shape2.prototype.getHitFunc = function() {
      return this.attrs.hitFunc || this["_hitFunc"];
    };
    Shape2.prototype.hasShadow = function() {
      return this._getCache(HAS_SHADOW, this._hasShadow);
    };
    Shape2.prototype._hasShadow = function() {
      return this.shadowEnabled() && this.shadowOpacity() !== 0 && !!(this.shadowColor() || this.shadowBlur() || this.shadowOffsetX() || this.shadowOffsetY());
    };
    Shape2.prototype._getFillPattern = function() {
      return this._getCache(patternImage, this.__getFillPattern);
    };
    Shape2.prototype.__getFillPattern = function() {
      if (this.fillPatternImage()) {
        var ctx = getDummyContext();
        var pattern = ctx.createPattern(this.fillPatternImage(), this.fillPatternRepeat() || "repeat");
        if (pattern && pattern.setTransform) {
          pattern.setTransform({
            a: this.fillPatternScaleX(),
            b: 0,
            c: 0,
            d: this.fillPatternScaleY(),
            e: 0,
            f: 0
          });
        }
        return pattern;
      }
    };
    Shape2.prototype._getLinearGradient = function() {
      return this._getCache(linearGradient, this.__getLinearGradient);
    };
    Shape2.prototype.__getLinearGradient = function() {
      var colorStops = this.fillLinearGradientColorStops();
      if (colorStops) {
        var ctx = getDummyContext();
        var start = this.fillLinearGradientStartPoint();
        var end = this.fillLinearGradientEndPoint();
        var grd = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
        for (var n = 0; n < colorStops.length; n += 2) {
          grd.addColorStop(colorStops[n], colorStops[n + 1]);
        }
        return grd;
      }
    };
    Shape2.prototype._getRadialGradient = function() {
      return this._getCache(radialGradient, this.__getRadialGradient);
    };
    Shape2.prototype.__getRadialGradient = function() {
      var colorStops = this.fillRadialGradientColorStops();
      if (colorStops) {
        var ctx = getDummyContext();
        var start = this.fillRadialGradientStartPoint();
        var end = this.fillRadialGradientEndPoint();
        var grd = ctx.createRadialGradient(start.x, start.y, this.fillRadialGradientStartRadius(), end.x, end.y, this.fillRadialGradientEndRadius());
        for (var n = 0; n < colorStops.length; n += 2) {
          grd.addColorStop(colorStops[n], colorStops[n + 1]);
        }
        return grd;
      }
    };
    Shape2.prototype.getShadowRGBA = function() {
      return this._getCache(SHADOW_RGBA, this._getShadowRGBA);
    };
    Shape2.prototype._getShadowRGBA = function() {
      if (this.hasShadow()) {
        var rgba = Util.Util.colorToRGBA(this.shadowColor());
        return "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a * (this.shadowOpacity() || 1) + ")";
      }
    };
    Shape2.prototype.hasFill = function() {
      var _this = this;
      return this._calculate("hasFill", [
        "fillEnabled",
        "fill",
        "fillPatternImage",
        "fillLinearGradientColorStops",
        "fillRadialGradientColorStops"
      ], function() {
        return _this.fillEnabled() && !!(_this.fill() || _this.fillPatternImage() || _this.fillLinearGradientColorStops() || _this.fillRadialGradientColorStops());
      });
    };
    Shape2.prototype.hasStroke = function() {
      var _this = this;
      return this._calculate("hasStroke", [
        "strokeEnabled",
        "strokeWidth",
        "stroke",
        "strokeLinearGradientColorStops"
      ], function() {
        return _this.strokeEnabled() && _this.strokeWidth() && !!(_this.stroke() || _this.strokeLinearGradientColorStops());
      });
    };
    Shape2.prototype.hasHitStroke = function() {
      var width = this.hitStrokeWidth();
      if (width === "auto") {
        return this.hasStroke();
      }
      return this.strokeEnabled() && !!width;
    };
    Shape2.prototype.intersects = function(point) {
      var stage = this.getStage(), bufferHitCanvas = stage.bufferHitCanvas, p;
      bufferHitCanvas.getContext().clear();
      this.drawHit(bufferHitCanvas, null, true);
      p = bufferHitCanvas.context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1).data;
      return p[3] > 0;
    };
    Shape2.prototype.destroy = function() {
      Node_1.Node.prototype.destroy.call(this);
      delete exports.shapes[this.colorKey];
      delete this.colorKey;
      return this;
    };
    Shape2.prototype._useBufferCanvas = function(forceFill) {
      var _a;
      if (!this.getStage()) {
        return false;
      }
      var perfectDrawEnabled = (_a = this.attrs.perfectDrawEnabled) !== null && _a !== void 0 ? _a : true;
      if (!perfectDrawEnabled) {
        return false;
      }
      var hasFill = forceFill || this.hasFill();
      var hasStroke = this.hasStroke();
      var isTransparent = this.getAbsoluteOpacity() !== 1;
      if (hasFill && hasStroke && isTransparent) {
        return true;
      }
      var hasShadow = this.hasShadow();
      var strokeForShadow = this.shadowForStrokeEnabled();
      if (hasFill && hasStroke && hasShadow && strokeForShadow) {
        return true;
      }
      return false;
    };
    Shape2.prototype.setStrokeHitEnabled = function(val) {
      Util.Util.warn("strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead.");
      if (val) {
        this.hitStrokeWidth("auto");
      } else {
        this.hitStrokeWidth(0);
      }
    };
    Shape2.prototype.getStrokeHitEnabled = function() {
      if (this.hitStrokeWidth() === 0) {
        return false;
      } else {
        return true;
      }
    };
    Shape2.prototype.getSelfRect = function() {
      var size = this.size();
      return {
        x: this._centroid ? -size.width / 2 : 0,
        y: this._centroid ? -size.height / 2 : 0,
        width: size.width,
        height: size.height
      };
    };
    Shape2.prototype.getClientRect = function(config) {
      if (config === void 0) {
        config = {};
      }
      var skipTransform = config.skipTransform;
      var relativeTo = config.relativeTo;
      var fillRect = this.getSelfRect();
      var applyStroke = !config.skipStroke && this.hasStroke();
      var strokeWidth = applyStroke && this.strokeWidth() || 0;
      var fillAndStrokeWidth = fillRect.width + strokeWidth;
      var fillAndStrokeHeight = fillRect.height + strokeWidth;
      var applyShadow = !config.skipShadow && this.hasShadow();
      var shadowOffsetX = applyShadow ? this.shadowOffsetX() : 0;
      var shadowOffsetY = applyShadow ? this.shadowOffsetY() : 0;
      var preWidth = fillAndStrokeWidth + Math.abs(shadowOffsetX);
      var preHeight = fillAndStrokeHeight + Math.abs(shadowOffsetY);
      var blurRadius = applyShadow && this.shadowBlur() || 0;
      var width = preWidth + blurRadius * 2;
      var height = preHeight + blurRadius * 2;
      var roundingOffset = 0;
      if (Math.round(strokeWidth / 2) !== strokeWidth / 2) {
        roundingOffset = 1;
      }
      var rect = {
        width: width + roundingOffset,
        height: height + roundingOffset,
        x: -Math.round(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetX, 0) + fillRect.x,
        y: -Math.round(strokeWidth / 2 + blurRadius) + Math.min(shadowOffsetY, 0) + fillRect.y
      };
      if (!skipTransform) {
        return this._transformedRect(rect, relativeTo);
      }
      return rect;
    };
    Shape2.prototype.drawScene = function(can, top) {
      var layer = this.getLayer(), canvas = can || layer.getCanvas(), context = canvas.getContext(), cachedCanvas = this._getCanvasCache(), drawFunc = this.getSceneFunc(), hasShadow = this.hasShadow(), stage, bufferCanvas, bufferContext;
      var caching = canvas.isCache;
      var skipBuffer = canvas.isCache;
      var cachingSelf = top === this;
      if (!this.isVisible() && !caching) {
        return this;
      }
      if (cachedCanvas) {
        context.save();
        var m = this.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        this._drawCachedSceneCanvas(context);
        context.restore();
        return this;
      }
      if (!drawFunc) {
        return this;
      }
      context.save();
      if (this._useBufferCanvas() && !skipBuffer) {
        stage = this.getStage();
        bufferCanvas = stage.bufferCanvas;
        bufferContext = bufferCanvas.getContext();
        bufferContext.clear();
        bufferContext.save();
        bufferContext._applyLineJoin(this);
        var o = this.getAbsoluteTransform(top).getMatrix();
        bufferContext.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
        drawFunc.call(this, bufferContext, this);
        bufferContext.restore();
        var ratio = bufferCanvas.pixelRatio;
        if (hasShadow) {
          context._applyShadow(this);
        }
        context._applyOpacity(this);
        context._applyGlobalCompositeOperation(this);
        context.drawImage(bufferCanvas._canvas, 0, 0, bufferCanvas.width / ratio, bufferCanvas.height / ratio);
      } else {
        context._applyLineJoin(this);
        if (!cachingSelf) {
          var o = this.getAbsoluteTransform(top).getMatrix();
          context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
          context._applyOpacity(this);
          context._applyGlobalCompositeOperation(this);
        }
        if (hasShadow) {
          context._applyShadow(this);
        }
        drawFunc.call(this, context, this);
      }
      context.restore();
      return this;
    };
    Shape2.prototype.drawHit = function(can, top, skipDragCheck) {
      if (skipDragCheck === void 0) {
        skipDragCheck = false;
      }
      if (!this.shouldDrawHit(top, skipDragCheck)) {
        return this;
      }
      var layer = this.getLayer(), canvas = can || layer.hitCanvas, context = canvas && canvas.getContext(), drawFunc = this.hitFunc() || this.sceneFunc(), cachedCanvas = this._getCanvasCache(), cachedHitCanvas = cachedCanvas && cachedCanvas.hit;
      if (!this.colorKey) {
        console.log(this);
        Util.Util.warn("Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. See the shape in logs above. If you want to reuse shape you should call remove() instead of destroy()");
      }
      if (cachedHitCanvas) {
        context.save();
        var m = this.getAbsoluteTransform(top).getMatrix();
        context.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        this._drawCachedHitCanvas(context);
        context.restore();
        return this;
      }
      if (!drawFunc) {
        return this;
      }
      context.save();
      context._applyLineJoin(this);
      var selfCache = this === top;
      if (!selfCache) {
        var o = this.getAbsoluteTransform(top).getMatrix();
        context.transform(o[0], o[1], o[2], o[3], o[4], o[5]);
      }
      drawFunc.call(this, context, this);
      context.restore();
      return this;
    };
    Shape2.prototype.drawHitFromCache = function(alphaThreshold) {
      if (alphaThreshold === void 0) {
        alphaThreshold = 0;
      }
      var cachedCanvas = this._getCanvasCache(), sceneCanvas = this._getCachedSceneCanvas(), hitCanvas = cachedCanvas.hit, hitContext = hitCanvas.getContext(), hitWidth = hitCanvas.getWidth(), hitHeight = hitCanvas.getHeight(), hitImageData, hitData, len, rgbColorKey, i, alpha;
      hitContext.clear();
      hitContext.drawImage(sceneCanvas._canvas, 0, 0, hitWidth, hitHeight);
      try {
        hitImageData = hitContext.getImageData(0, 0, hitWidth, hitHeight);
        hitData = hitImageData.data;
        len = hitData.length;
        rgbColorKey = Util.Util._hexToRgb(this.colorKey);
        for (i = 0; i < len; i += 4) {
          alpha = hitData[i + 3];
          if (alpha > alphaThreshold) {
            hitData[i] = rgbColorKey.r;
            hitData[i + 1] = rgbColorKey.g;
            hitData[i + 2] = rgbColorKey.b;
            hitData[i + 3] = 255;
          } else {
            hitData[i + 3] = 0;
          }
        }
        hitContext.putImageData(hitImageData, 0, 0);
      } catch (e) {
        Util.Util.error("Unable to draw hit graph from cached scene canvas. " + e.message);
      }
      return this;
    };
    Shape2.prototype.hasPointerCapture = function(pointerId) {
      return PointerEvents.hasPointerCapture(pointerId, this);
    };
    Shape2.prototype.setPointerCapture = function(pointerId) {
      PointerEvents.setPointerCapture(pointerId, this);
    };
    Shape2.prototype.releaseCapture = function(pointerId) {
      PointerEvents.releaseCapture(pointerId, this);
    };
    return Shape2;
  }(Node_1.Node);
  exports.Shape = Shape;
  Shape.prototype._fillFunc = _fillFunc;
  Shape.prototype._strokeFunc = _strokeFunc;
  Shape.prototype._fillFuncHit = _fillFuncHit;
  Shape.prototype._strokeFuncHit = _strokeFuncHit;
  Shape.prototype._centroid = false;
  Shape.prototype.nodeType = "Shape";
  Global._registerNode(Shape);
  Shape.prototype.eventListeners = {};
  Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearHasShadowCache);
  Shape.prototype.on.call(Shape.prototype, "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva", _clearGetShadowRGBACache);
  Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva", _clearFillPatternCache);
  Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva", _clearLinearGradientCache);
  Shape.prototype.on.call(Shape.prototype, "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva", _clearRadialGradientCache);
  Factory.Factory.addGetterSetter(Shape, "stroke", void 0, Validators.getStringOrGradientValidator());
  Factory.Factory.addGetterSetter(Shape, "strokeWidth", 2, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "fillAfterStrokeEnabled", false);
  Factory.Factory.addGetterSetter(Shape, "hitStrokeWidth", "auto", Validators.getNumberOrAutoValidator());
  Factory.Factory.addGetterSetter(Shape, "strokeHitEnabled", true, Validators.getBooleanValidator());
  Factory.Factory.addGetterSetter(Shape, "perfectDrawEnabled", true, Validators.getBooleanValidator());
  Factory.Factory.addGetterSetter(Shape, "shadowForStrokeEnabled", true, Validators.getBooleanValidator());
  Factory.Factory.addGetterSetter(Shape, "lineJoin");
  Factory.Factory.addGetterSetter(Shape, "lineCap");
  Factory.Factory.addGetterSetter(Shape, "sceneFunc");
  Factory.Factory.addGetterSetter(Shape, "hitFunc");
  Factory.Factory.addGetterSetter(Shape, "dash");
  Factory.Factory.addGetterSetter(Shape, "dashOffset", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "shadowColor", void 0, Validators.getStringValidator());
  Factory.Factory.addGetterSetter(Shape, "shadowBlur", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "shadowOpacity", 1, Validators.getNumberValidator());
  Factory.Factory.addComponentsGetterSetter(Shape, "shadowOffset", ["x", "y"]);
  Factory.Factory.addGetterSetter(Shape, "shadowOffsetX", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "shadowOffsetY", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "fillPatternImage");
  Factory.Factory.addGetterSetter(Shape, "fill", void 0, Validators.getStringOrGradientValidator());
  Factory.Factory.addGetterSetter(Shape, "fillPatternX", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "fillPatternY", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "fillLinearGradientColorStops");
  Factory.Factory.addGetterSetter(Shape, "strokeLinearGradientColorStops");
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientStartRadius", 0);
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientEndRadius", 0);
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientColorStops");
  Factory.Factory.addGetterSetter(Shape, "fillPatternRepeat", "repeat");
  Factory.Factory.addGetterSetter(Shape, "fillEnabled", true);
  Factory.Factory.addGetterSetter(Shape, "strokeEnabled", true);
  Factory.Factory.addGetterSetter(Shape, "shadowEnabled", true);
  Factory.Factory.addGetterSetter(Shape, "dashEnabled", true);
  Factory.Factory.addGetterSetter(Shape, "strokeScaleEnabled", true);
  Factory.Factory.addGetterSetter(Shape, "fillPriority", "color");
  Factory.Factory.addComponentsGetterSetter(Shape, "fillPatternOffset", ["x", "y"]);
  Factory.Factory.addGetterSetter(Shape, "fillPatternOffsetX", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "fillPatternOffsetY", 0, Validators.getNumberValidator());
  Factory.Factory.addComponentsGetterSetter(Shape, "fillPatternScale", ["x", "y"]);
  Factory.Factory.addGetterSetter(Shape, "fillPatternScaleX", 1, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Shape, "fillPatternScaleY", 1, Validators.getNumberValidator());
  Factory.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientStartPoint", [
    "x",
    "y"
  ]);
  Factory.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientStartPoint", [
    "x",
    "y"
  ]);
  Factory.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointX", 0);
  Factory.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointX", 0);
  Factory.Factory.addGetterSetter(Shape, "fillLinearGradientStartPointY", 0);
  Factory.Factory.addGetterSetter(Shape, "strokeLinearGradientStartPointY", 0);
  Factory.Factory.addComponentsGetterSetter(Shape, "fillLinearGradientEndPoint", [
    "x",
    "y"
  ]);
  Factory.Factory.addComponentsGetterSetter(Shape, "strokeLinearGradientEndPoint", [
    "x",
    "y"
  ]);
  Factory.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointX", 0);
  Factory.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointX", 0);
  Factory.Factory.addGetterSetter(Shape, "fillLinearGradientEndPointY", 0);
  Factory.Factory.addGetterSetter(Shape, "strokeLinearGradientEndPointY", 0);
  Factory.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientStartPoint", [
    "x",
    "y"
  ]);
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointX", 0);
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientStartPointY", 0);
  Factory.Factory.addComponentsGetterSetter(Shape, "fillRadialGradientEndPoint", [
    "x",
    "y"
  ]);
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointX", 0);
  Factory.Factory.addGetterSetter(Shape, "fillRadialGradientEndPointY", 0);
  Factory.Factory.addGetterSetter(Shape, "fillPatternRotation", 0);
  Factory.Factory.backCompat(Shape, {
    dashArray: "dash",
    getDashArray: "getDash",
    setDashArray: "getDash",
    drawFunc: "sceneFunc",
    getDrawFunc: "getSceneFunc",
    setDrawFunc: "setSceneFunc",
    drawHitFunc: "hitFunc",
    getDrawHitFunc: "getHitFunc",
    setDrawHitFunc: "setHitFunc"
  });
  Util.Collection.mapMethods(Shape);
});
var Layer_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Layer = void 0;
  var HASH = "#", BEFORE_DRAW = "beforeDraw", DRAW = "draw", INTERSECTION_OFFSETS = [
    {x: 0, y: 0},
    {x: -1, y: -1},
    {x: 1, y: -1},
    {x: 1, y: 1},
    {x: -1, y: 1}
  ], INTERSECTION_OFFSETS_LEN = INTERSECTION_OFFSETS.length;
  var Layer = function(_super) {
    __extends(Layer2, _super);
    function Layer2(config) {
      var _this = _super.call(this, config) || this;
      _this.canvas = new Canvas_1.SceneCanvas();
      _this.hitCanvas = new Canvas_1.HitCanvas({
        pixelRatio: 1
      });
      _this._waitingForDraw = false;
      _this.on("visibleChange.konva", _this._checkVisibility);
      _this._checkVisibility();
      _this.on("imageSmoothingEnabledChange.konva", _this._setSmoothEnabled);
      _this._setSmoothEnabled();
      return _this;
    }
    Layer2.prototype.createPNGStream = function() {
      var c = this.canvas._canvas;
      return c.createPNGStream();
    };
    Layer2.prototype.getCanvas = function() {
      return this.canvas;
    };
    Layer2.prototype.getHitCanvas = function() {
      return this.hitCanvas;
    };
    Layer2.prototype.getContext = function() {
      return this.getCanvas().getContext();
    };
    Layer2.prototype.clear = function(bounds) {
      this.getContext().clear(bounds);
      this.getHitCanvas().getContext().clear(bounds);
      return this;
    };
    Layer2.prototype.setZIndex = function(index) {
      _super.prototype.setZIndex.call(this, index);
      var stage = this.getStage();
      if (stage) {
        stage.content.removeChild(this.getCanvas()._canvas);
        if (index < stage.children.length - 1) {
          stage.content.insertBefore(this.getCanvas()._canvas, stage.children[index + 1].getCanvas()._canvas);
        } else {
          stage.content.appendChild(this.getCanvas()._canvas);
        }
      }
      return this;
    };
    Layer2.prototype.moveToTop = function() {
      Node_1.Node.prototype.moveToTop.call(this);
      var stage = this.getStage();
      if (stage) {
        stage.content.removeChild(this.getCanvas()._canvas);
        stage.content.appendChild(this.getCanvas()._canvas);
      }
      return true;
    };
    Layer2.prototype.moveUp = function() {
      var moved = Node_1.Node.prototype.moveUp.call(this);
      if (!moved) {
        return false;
      }
      var stage = this.getStage();
      if (!stage) {
        return false;
      }
      stage.content.removeChild(this.getCanvas()._canvas);
      if (this.index < stage.children.length - 1) {
        stage.content.insertBefore(this.getCanvas()._canvas, stage.children[this.index + 1].getCanvas()._canvas);
      } else {
        stage.content.appendChild(this.getCanvas()._canvas);
      }
      return true;
    };
    Layer2.prototype.moveDown = function() {
      if (Node_1.Node.prototype.moveDown.call(this)) {
        var stage = this.getStage();
        if (stage) {
          var children = stage.children;
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.insertBefore(this.getCanvas()._canvas, children[this.index + 1].getCanvas()._canvas);
        }
        return true;
      }
      return false;
    };
    Layer2.prototype.moveToBottom = function() {
      if (Node_1.Node.prototype.moveToBottom.call(this)) {
        var stage = this.getStage();
        if (stage) {
          var children = stage.children;
          stage.content.removeChild(this.getCanvas()._canvas);
          stage.content.insertBefore(this.getCanvas()._canvas, children[1].getCanvas()._canvas);
        }
        return true;
      }
      return false;
    };
    Layer2.prototype.getLayer = function() {
      return this;
    };
    Layer2.prototype.remove = function() {
      var _canvas = this.getCanvas()._canvas;
      Node_1.Node.prototype.remove.call(this);
      if (_canvas && _canvas.parentNode && Util.Util._isInDocument(_canvas)) {
        _canvas.parentNode.removeChild(_canvas);
      }
      return this;
    };
    Layer2.prototype.getStage = function() {
      return this.parent;
    };
    Layer2.prototype.setSize = function(_a) {
      var width = _a.width, height = _a.height;
      this.canvas.setSize(width, height);
      this.hitCanvas.setSize(width, height);
      this._setSmoothEnabled();
      return this;
    };
    Layer2.prototype._validateAdd = function(child) {
      var type = child.getType();
      if (type !== "Group" && type !== "Shape") {
        Util.Util.throw("You may only add groups and shapes to a layer.");
      }
    };
    Layer2.prototype._toKonvaCanvas = function(config) {
      config = config || {};
      config.width = config.width || this.getWidth();
      config.height = config.height || this.getHeight();
      config.x = config.x !== void 0 ? config.x : this.x();
      config.y = config.y !== void 0 ? config.y : this.y();
      return Node_1.Node.prototype._toKonvaCanvas.call(this, config);
    };
    Layer2.prototype._checkVisibility = function() {
      var visible = this.visible();
      if (visible) {
        this.canvas._canvas.style.display = "block";
      } else {
        this.canvas._canvas.style.display = "none";
      }
    };
    Layer2.prototype._setSmoothEnabled = function() {
      this.getContext()._context.imageSmoothingEnabled = this.imageSmoothingEnabled();
    };
    Layer2.prototype.getWidth = function() {
      if (this.parent) {
        return this.parent.width();
      }
    };
    Layer2.prototype.setWidth = function() {
      Util.Util.warn('Can not change width of layer. Use "stage.width(value)" function instead.');
    };
    Layer2.prototype.getHeight = function() {
      if (this.parent) {
        return this.parent.height();
      }
    };
    Layer2.prototype.setHeight = function() {
      Util.Util.warn('Can not change height of layer. Use "stage.height(value)" function instead.');
    };
    Layer2.prototype.batchDraw = function() {
      var _this = this;
      if (!this._waitingForDraw) {
        this._waitingForDraw = true;
        Util.Util.requestAnimFrame(function() {
          _this.draw();
          _this._waitingForDraw = false;
        });
      }
      return this;
    };
    Layer2.prototype.getIntersection = function(pos, selector) {
      if (!this.isListening() || !this.isVisible()) {
        return null;
      }
      var spiralSearchDistance = 1;
      var continueSearch = false;
      while (true) {
        for (var i = 0; i < INTERSECTION_OFFSETS_LEN; i++) {
          var intersectionOffset = INTERSECTION_OFFSETS[i];
          var obj = this._getIntersection({
            x: pos.x + intersectionOffset.x * spiralSearchDistance,
            y: pos.y + intersectionOffset.y * spiralSearchDistance
          });
          var shape = obj.shape;
          if (shape && selector) {
            return shape.findAncestor(selector, true);
          } else if (shape) {
            return shape;
          }
          continueSearch = !!obj.antialiased;
          if (!obj.antialiased) {
            break;
          }
        }
        if (continueSearch) {
          spiralSearchDistance += 1;
        } else {
          return null;
        }
      }
    };
    Layer2.prototype._getIntersection = function(pos) {
      var ratio = this.hitCanvas.pixelRatio;
      var p = this.hitCanvas.context.getImageData(Math.round(pos.x * ratio), Math.round(pos.y * ratio), 1, 1).data;
      var p3 = p[3];
      if (p3 === 255) {
        var colorKey = Util.Util._rgbToHex(p[0], p[1], p[2]);
        var shape = Shape_1.shapes[HASH + colorKey];
        if (shape) {
          return {
            shape
          };
        }
        return {
          antialiased: true
        };
      } else if (p3 > 0) {
        return {
          antialiased: true
        };
      }
      return {};
    };
    Layer2.prototype.drawScene = function(can, top) {
      var layer = this.getLayer(), canvas = can || layer && layer.getCanvas();
      this._fire(BEFORE_DRAW, {
        node: this
      });
      if (this.clearBeforeDraw()) {
        canvas.getContext().clear();
      }
      Container_1.Container.prototype.drawScene.call(this, canvas, top);
      this._fire(DRAW, {
        node: this
      });
      return this;
    };
    Layer2.prototype.drawHit = function(can, top) {
      var layer = this.getLayer(), canvas = can || layer && layer.hitCanvas;
      if (layer && layer.clearBeforeDraw()) {
        layer.getHitCanvas().getContext().clear();
      }
      Container_1.Container.prototype.drawHit.call(this, canvas, top);
      return this;
    };
    Layer2.prototype.enableHitGraph = function() {
      this.hitGraphEnabled(true);
      return this;
    };
    Layer2.prototype.disableHitGraph = function() {
      this.hitGraphEnabled(false);
      return this;
    };
    Layer2.prototype.setHitGraphEnabled = function(val) {
      Util.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
      this.listening(val);
    };
    Layer2.prototype.getHitGraphEnabled = function(val) {
      Util.Util.warn("hitGraphEnabled method is deprecated. Please use layer.listening() instead.");
      return this.listening();
    };
    Layer2.prototype.toggleHitCanvas = function() {
      if (!this.parent) {
        return;
      }
      var parent = this.parent;
      var added = !!this.hitCanvas._canvas.parentNode;
      if (added) {
        parent.content.removeChild(this.hitCanvas._canvas);
      } else {
        parent.content.appendChild(this.hitCanvas._canvas);
      }
    };
    return Layer2;
  }(Container_1.Container);
  exports.Layer = Layer;
  Layer.prototype.nodeType = "Layer";
  Global._registerNode(Layer);
  Factory.Factory.addGetterSetter(Layer, "imageSmoothingEnabled", true);
  Factory.Factory.addGetterSetter(Layer, "clearBeforeDraw", true);
  Factory.Factory.addGetterSetter(Layer, "hitGraphEnabled", true, Validators.getBooleanValidator());
  Util.Collection.mapMethods(Layer);
});
var FastLayer_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.FastLayer = void 0;
  var FastLayer = function(_super) {
    __extends(FastLayer2, _super);
    function FastLayer2(attrs) {
      var _this = _super.call(this, attrs) || this;
      _this.listening(false);
      Util.Util.warn('Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.');
      return _this;
    }
    return FastLayer2;
  }(Layer_1.Layer);
  exports.FastLayer = FastLayer;
  FastLayer.prototype.nodeType = "FastLayer";
  Global._registerNode(FastLayer);
  Util.Collection.mapMethods(FastLayer);
});
var Group_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Group = void 0;
  var Group = function(_super) {
    __extends(Group2, _super);
    function Group2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Group2.prototype._validateAdd = function(child) {
      var type = child.getType();
      if (type !== "Group" && type !== "Shape") {
        Util.Util.throw("You may only add groups and shapes to groups.");
      }
    };
    return Group2;
  }(Container_1.Container);
  exports.Group = Group;
  Group.prototype.nodeType = "Group";
  Global._registerNode(Group);
  Util.Collection.mapMethods(Group);
});
var Animation_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Animation = void 0;
  var now = function() {
    if (Global.glob.performance && Global.glob.performance.now) {
      return function() {
        return Global.glob.performance.now();
      };
    }
    return function() {
      return new Date().getTime();
    };
  }();
  var Animation = function() {
    function Animation2(func, layers) {
      this.id = Animation2.animIdCounter++;
      this.frame = {
        time: 0,
        timeDiff: 0,
        lastTime: now(),
        frameRate: 0
      };
      this.func = func;
      this.setLayers(layers);
    }
    Animation2.prototype.setLayers = function(layers) {
      var lays = [];
      if (!layers) {
        lays = [];
      } else if (layers.length > 0) {
        lays = layers;
      } else {
        lays = [layers];
      }
      this.layers = lays;
      return this;
    };
    Animation2.prototype.getLayers = function() {
      return this.layers;
    };
    Animation2.prototype.addLayer = function(layer) {
      var layers = this.layers, len = layers.length, n;
      for (n = 0; n < len; n++) {
        if (layers[n]._id === layer._id) {
          return false;
        }
      }
      this.layers.push(layer);
      return true;
    };
    Animation2.prototype.isRunning = function() {
      var a = Animation2, animations = a.animations, len = animations.length, n;
      for (n = 0; n < len; n++) {
        if (animations[n].id === this.id) {
          return true;
        }
      }
      return false;
    };
    Animation2.prototype.start = function() {
      this.stop();
      this.frame.timeDiff = 0;
      this.frame.lastTime = now();
      Animation2._addAnimation(this);
      return this;
    };
    Animation2.prototype.stop = function() {
      Animation2._removeAnimation(this);
      return this;
    };
    Animation2.prototype._updateFrameObject = function(time) {
      this.frame.timeDiff = time - this.frame.lastTime;
      this.frame.lastTime = time;
      this.frame.time += this.frame.timeDiff;
      this.frame.frameRate = 1e3 / this.frame.timeDiff;
    };
    Animation2._addAnimation = function(anim) {
      this.animations.push(anim);
      this._handleAnimation();
    };
    Animation2._removeAnimation = function(anim) {
      var id = anim.id, animations = this.animations, len = animations.length, n;
      for (n = 0; n < len; n++) {
        if (animations[n].id === id) {
          this.animations.splice(n, 1);
          break;
        }
      }
    };
    Animation2._runFrames = function() {
      var layerHash = {}, animations = this.animations, anim, layers, func, n, i, layersLen, layer, key, needRedraw;
      for (n = 0; n < animations.length; n++) {
        anim = animations[n];
        layers = anim.layers;
        func = anim.func;
        anim._updateFrameObject(now());
        layersLen = layers.length;
        if (func) {
          needRedraw = func.call(anim, anim.frame) !== false;
        } else {
          needRedraw = true;
        }
        if (!needRedraw) {
          continue;
        }
        for (i = 0; i < layersLen; i++) {
          layer = layers[i];
          if (layer._id !== void 0) {
            layerHash[layer._id] = layer;
          }
        }
      }
      for (key in layerHash) {
        if (!layerHash.hasOwnProperty(key)) {
          continue;
        }
        layerHash[key].draw();
      }
    };
    Animation2._animationLoop = function() {
      var Anim = Animation2;
      if (Anim.animations.length) {
        Anim._runFrames();
        requestAnimationFrame(Anim._animationLoop);
      } else {
        Anim.animRunning = false;
      }
    };
    Animation2._handleAnimation = function() {
      if (!this.animRunning) {
        this.animRunning = true;
        requestAnimationFrame(this._animationLoop);
      }
    };
    Animation2.animations = [];
    Animation2.animIdCounter = 0;
    Animation2.animRunning = false;
    return Animation2;
  }();
  exports.Animation = Animation;
});
var Tween_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Easings = exports.Tween = void 0;
  var blacklist = {
    node: 1,
    duration: 1,
    easing: 1,
    onFinish: 1,
    yoyo: 1
  }, PAUSED = 1, PLAYING = 2, REVERSING = 3, idCounter = 0, colorAttrs = ["fill", "stroke", "shadowColor"];
  var TweenEngine = function() {
    function TweenEngine2(prop, propFunc, func, begin, finish, duration, yoyo) {
      this.prop = prop;
      this.propFunc = propFunc;
      this.begin = begin;
      this._pos = begin;
      this.duration = duration;
      this._change = 0;
      this.prevPos = 0;
      this.yoyo = yoyo;
      this._time = 0;
      this._position = 0;
      this._startTime = 0;
      this._finish = 0;
      this.func = func;
      this._change = finish - this.begin;
      this.pause();
    }
    TweenEngine2.prototype.fire = function(str) {
      var handler = this[str];
      if (handler) {
        handler();
      }
    };
    TweenEngine2.prototype.setTime = function(t) {
      if (t > this.duration) {
        if (this.yoyo) {
          this._time = this.duration;
          this.reverse();
        } else {
          this.finish();
        }
      } else if (t < 0) {
        if (this.yoyo) {
          this._time = 0;
          this.play();
        } else {
          this.reset();
        }
      } else {
        this._time = t;
        this.update();
      }
    };
    TweenEngine2.prototype.getTime = function() {
      return this._time;
    };
    TweenEngine2.prototype.setPosition = function(p) {
      this.prevPos = this._pos;
      this.propFunc(p);
      this._pos = p;
    };
    TweenEngine2.prototype.getPosition = function(t) {
      if (t === void 0) {
        t = this._time;
      }
      return this.func(t, this.begin, this._change, this.duration);
    };
    TweenEngine2.prototype.play = function() {
      this.state = PLAYING;
      this._startTime = this.getTimer() - this._time;
      this.onEnterFrame();
      this.fire("onPlay");
    };
    TweenEngine2.prototype.reverse = function() {
      this.state = REVERSING;
      this._time = this.duration - this._time;
      this._startTime = this.getTimer() - this._time;
      this.onEnterFrame();
      this.fire("onReverse");
    };
    TweenEngine2.prototype.seek = function(t) {
      this.pause();
      this._time = t;
      this.update();
      this.fire("onSeek");
    };
    TweenEngine2.prototype.reset = function() {
      this.pause();
      this._time = 0;
      this.update();
      this.fire("onReset");
    };
    TweenEngine2.prototype.finish = function() {
      this.pause();
      this._time = this.duration;
      this.update();
      this.fire("onFinish");
    };
    TweenEngine2.prototype.update = function() {
      this.setPosition(this.getPosition(this._time));
      this.fire("onUpdate");
    };
    TweenEngine2.prototype.onEnterFrame = function() {
      var t = this.getTimer() - this._startTime;
      if (this.state === PLAYING) {
        this.setTime(t);
      } else if (this.state === REVERSING) {
        this.setTime(this.duration - t);
      }
    };
    TweenEngine2.prototype.pause = function() {
      this.state = PAUSED;
      this.fire("onPause");
    };
    TweenEngine2.prototype.getTimer = function() {
      return new Date().getTime();
    };
    return TweenEngine2;
  }();
  var Tween = function() {
    function Tween2(config) {
      var that = this, node = config.node, nodeId = node._id, duration, easing = config.easing || exports.Easings.Linear, yoyo = !!config.yoyo, key;
      if (typeof config.duration === "undefined") {
        duration = 0.3;
      } else if (config.duration === 0) {
        duration = 1e-3;
      } else {
        duration = config.duration;
      }
      this.node = node;
      this._id = idCounter++;
      var layers = node.getLayer() || (node instanceof Global.Konva["Stage"] ? node.getLayers() : null);
      if (!layers) {
        Util.Util.error("Tween constructor have `node` that is not in a layer. Please add node into layer first.");
      }
      this.anim = new Animation_1.Animation(function() {
        that.tween.onEnterFrame();
      }, layers);
      this.tween = new TweenEngine(key, function(i) {
        that._tweenFunc(i);
      }, easing, 0, 1, duration * 1e3, yoyo);
      this._addListeners();
      if (!Tween2.attrs[nodeId]) {
        Tween2.attrs[nodeId] = {};
      }
      if (!Tween2.attrs[nodeId][this._id]) {
        Tween2.attrs[nodeId][this._id] = {};
      }
      if (!Tween2.tweens[nodeId]) {
        Tween2.tweens[nodeId] = {};
      }
      for (key in config) {
        if (blacklist[key] === void 0) {
          this._addAttr(key, config[key]);
        }
      }
      this.reset();
      this.onFinish = config.onFinish;
      this.onReset = config.onReset;
      this.onUpdate = config.onUpdate;
    }
    Tween2.prototype._addAttr = function(key, end) {
      var node = this.node, nodeId = node._id, start, diff, tweenId, n, len, trueEnd, trueStart, endRGBA;
      tweenId = Tween2.tweens[nodeId][key];
      if (tweenId) {
        delete Tween2.attrs[nodeId][tweenId][key];
      }
      start = node.getAttr(key);
      if (Util.Util._isArray(end)) {
        diff = [];
        len = Math.max(end.length, start.length);
        if (key === "points" && end.length !== start.length) {
          if (end.length > start.length) {
            trueStart = start;
            start = Util.Util._prepareArrayForTween(start, end, node.closed());
          } else {
            trueEnd = end;
            end = Util.Util._prepareArrayForTween(end, start, node.closed());
          }
        }
        if (key.indexOf("fill") === 0) {
          for (n = 0; n < len; n++) {
            if (n % 2 === 0) {
              diff.push(end[n] - start[n]);
            } else {
              var startRGBA = Util.Util.colorToRGBA(start[n]);
              endRGBA = Util.Util.colorToRGBA(end[n]);
              start[n] = startRGBA;
              diff.push({
                r: endRGBA.r - startRGBA.r,
                g: endRGBA.g - startRGBA.g,
                b: endRGBA.b - startRGBA.b,
                a: endRGBA.a - startRGBA.a
              });
            }
          }
        } else {
          for (n = 0; n < len; n++) {
            diff.push(end[n] - start[n]);
          }
        }
      } else if (colorAttrs.indexOf(key) !== -1) {
        start = Util.Util.colorToRGBA(start);
        endRGBA = Util.Util.colorToRGBA(end);
        diff = {
          r: endRGBA.r - start.r,
          g: endRGBA.g - start.g,
          b: endRGBA.b - start.b,
          a: endRGBA.a - start.a
        };
      } else {
        diff = end - start;
      }
      Tween2.attrs[nodeId][this._id][key] = {
        start,
        diff,
        end,
        trueEnd,
        trueStart
      };
      Tween2.tweens[nodeId][key] = this._id;
    };
    Tween2.prototype._tweenFunc = function(i) {
      var node = this.node, attrs = Tween2.attrs[node._id][this._id], key, attr, start, diff, newVal, n, len, end;
      for (key in attrs) {
        attr = attrs[key];
        start = attr.start;
        diff = attr.diff;
        end = attr.end;
        if (Util.Util._isArray(start)) {
          newVal = [];
          len = Math.max(start.length, end.length);
          if (key.indexOf("fill") === 0) {
            for (n = 0; n < len; n++) {
              if (n % 2 === 0) {
                newVal.push((start[n] || 0) + diff[n] * i);
              } else {
                newVal.push("rgba(" + Math.round(start[n].r + diff[n].r * i) + "," + Math.round(start[n].g + diff[n].g * i) + "," + Math.round(start[n].b + diff[n].b * i) + "," + (start[n].a + diff[n].a * i) + ")");
              }
            }
          } else {
            for (n = 0; n < len; n++) {
              newVal.push((start[n] || 0) + diff[n] * i);
            }
          }
        } else if (colorAttrs.indexOf(key) !== -1) {
          newVal = "rgba(" + Math.round(start.r + diff.r * i) + "," + Math.round(start.g + diff.g * i) + "," + Math.round(start.b + diff.b * i) + "," + (start.a + diff.a * i) + ")";
        } else {
          newVal = start + diff * i;
        }
        node.setAttr(key, newVal);
      }
    };
    Tween2.prototype._addListeners = function() {
      var _this = this;
      this.tween.onPlay = function() {
        _this.anim.start();
      };
      this.tween.onReverse = function() {
        _this.anim.start();
      };
      this.tween.onPause = function() {
        _this.anim.stop();
      };
      this.tween.onFinish = function() {
        var node = _this.node;
        var attrs = Tween2.attrs[node._id][_this._id];
        if (attrs.points && attrs.points.trueEnd) {
          node.setAttr("points", attrs.points.trueEnd);
        }
        if (_this.onFinish) {
          _this.onFinish.call(_this);
        }
      };
      this.tween.onReset = function() {
        var node = _this.node;
        var attrs = Tween2.attrs[node._id][_this._id];
        if (attrs.points && attrs.points.trueStart) {
          node.points(attrs.points.trueStart);
        }
        if (_this.onReset) {
          _this.onReset();
        }
      };
      this.tween.onUpdate = function() {
        if (_this.onUpdate) {
          _this.onUpdate.call(_this);
        }
      };
    };
    Tween2.prototype.play = function() {
      this.tween.play();
      return this;
    };
    Tween2.prototype.reverse = function() {
      this.tween.reverse();
      return this;
    };
    Tween2.prototype.reset = function() {
      this.tween.reset();
      return this;
    };
    Tween2.prototype.seek = function(t) {
      this.tween.seek(t * 1e3);
      return this;
    };
    Tween2.prototype.pause = function() {
      this.tween.pause();
      return this;
    };
    Tween2.prototype.finish = function() {
      this.tween.finish();
      return this;
    };
    Tween2.prototype.destroy = function() {
      var nodeId = this.node._id, thisId = this._id, attrs = Tween2.tweens[nodeId], key;
      this.pause();
      for (key in attrs) {
        delete Tween2.tweens[nodeId][key];
      }
      delete Tween2.attrs[nodeId][thisId];
    };
    Tween2.attrs = {};
    Tween2.tweens = {};
    return Tween2;
  }();
  exports.Tween = Tween;
  Node_1.Node.prototype.to = function(params) {
    var onFinish = params.onFinish;
    params.node = this;
    params.onFinish = function() {
      this.destroy();
      if (onFinish) {
        onFinish();
      }
    };
    var tween = new Tween(params);
    tween.play();
  };
  exports.Easings = {
    BackEaseIn: function(t, b, c, d) {
      var s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    BackEaseOut: function(t, b, c, d) {
      var s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    BackEaseInOut: function(t, b, c, d) {
      var s = 1.70158;
      if ((t /= d / 2) < 1) {
        return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      }
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    ElasticEaseIn: function(t, b, c, d, a, p) {
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    ElasticEaseOut: function(t, b, c, d, a, p) {
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d) === 1) {
        return b + c;
      }
      if (!p) {
        p = d * 0.3;
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    ElasticEaseInOut: function(t, b, c, d, a, p) {
      var s = 0;
      if (t === 0) {
        return b;
      }
      if ((t /= d / 2) === 2) {
        return b + c;
      }
      if (!p) {
        p = d * (0.3 * 1.5);
      }
      if (!a || a < Math.abs(c)) {
        a = c;
        s = p / 4;
      } else {
        s = p / (2 * Math.PI) * Math.asin(c / a);
      }
      if (t < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      }
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    },
    BounceEaseOut: function(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      }
    },
    BounceEaseIn: function(t, b, c, d) {
      return c - exports.Easings.BounceEaseOut(d - t, 0, c, d) + b;
    },
    BounceEaseInOut: function(t, b, c, d) {
      if (t < d / 2) {
        return exports.Easings.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b;
      } else {
        return exports.Easings.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
      }
    },
    EaseIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    EaseOut: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    EaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
      }
      return -c / 2 * (--t * (t - 2) - 1) + b;
    },
    StrongEaseIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    StrongEaseOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    StrongEaseInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) {
        return c / 2 * t * t * t * t * t + b;
      }
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    Linear: function(t, b, c, d) {
      return c * t / d + b;
    }
  };
});
var _CoreInternals = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Konva = void 0;
  exports.Konva = Util.Util._assign(Global.Konva, {
    Collection: Util.Collection,
    Util: Util.Util,
    Transform: Util.Transform,
    Node: Node_1.Node,
    ids: Node_1.ids,
    names: Node_1.names,
    Container: Container_1.Container,
    Stage: Stage_1.Stage,
    stages: Stage_1.stages,
    Layer: Layer_1.Layer,
    FastLayer: FastLayer_1.FastLayer,
    Group: Group_1.Group,
    DD: DragAndDrop.DD,
    Shape: Shape_1.Shape,
    shapes: Shape_1.shapes,
    Animation: Animation_1.Animation,
    Tween: Tween_1.Tween,
    Easings: Tween_1.Easings,
    Context: Context_1.Context,
    Canvas: Canvas_1.Canvas
  });
});
var Arc_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Arc = void 0;
  var Global_2 = Global;
  var Arc = function(_super) {
    __extends(Arc2, _super);
    function Arc2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Arc2.prototype._sceneFunc = function(context) {
      var angle = Global.Konva.getAngle(this.angle()), clockwise = this.clockwise();
      context.beginPath();
      context.arc(0, 0, this.outerRadius(), 0, angle, clockwise);
      context.arc(0, 0, this.innerRadius(), angle, 0, !clockwise);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Arc2.prototype.getWidth = function() {
      return this.outerRadius() * 2;
    };
    Arc2.prototype.getHeight = function() {
      return this.outerRadius() * 2;
    };
    Arc2.prototype.setWidth = function(width) {
      this.outerRadius(width / 2);
    };
    Arc2.prototype.setHeight = function(height) {
      this.outerRadius(height / 2);
    };
    return Arc2;
  }(Shape_1.Shape);
  exports.Arc = Arc;
  Arc.prototype._centroid = true;
  Arc.prototype.className = "Arc";
  Arc.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
  Global_2._registerNode(Arc);
  Factory.Factory.addGetterSetter(Arc, "innerRadius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Arc, "outerRadius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Arc, "angle", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Arc, "clockwise", false, Validators.getBooleanValidator());
  Util.Collection.mapMethods(Arc);
});
var Line_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __spreadArrays = commonjsGlobal && commonjsGlobal.__spreadArrays || function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Line = void 0;
  var Line = function(_super) {
    __extends(Line2, _super);
    function Line2(config) {
      var _this = _super.call(this, config) || this;
      _this.on("pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva", function() {
        this._clearCache("tensionPoints");
      });
      return _this;
    }
    Line2.prototype._sceneFunc = function(context) {
      var points = this.points(), length = points.length, tension = this.tension(), closed = this.closed(), bezier = this.bezier(), tp, len, n;
      if (!length) {
        return;
      }
      context.beginPath();
      context.moveTo(points[0], points[1]);
      if (tension !== 0 && length > 4) {
        tp = this.getTensionPoints();
        len = tp.length;
        n = closed ? 0 : 4;
        if (!closed) {
          context.quadraticCurveTo(tp[0], tp[1], tp[2], tp[3]);
        }
        while (n < len - 2) {
          context.bezierCurveTo(tp[n++], tp[n++], tp[n++], tp[n++], tp[n++], tp[n++]);
        }
        if (!closed) {
          context.quadraticCurveTo(tp[len - 2], tp[len - 1], points[length - 2], points[length - 1]);
        }
      } else if (bezier) {
        n = 2;
        while (n < length) {
          context.bezierCurveTo(points[n++], points[n++], points[n++], points[n++], points[n++], points[n++]);
        }
      } else {
        for (n = 2; n < length; n += 2) {
          context.lineTo(points[n], points[n + 1]);
        }
      }
      if (closed) {
        context.closePath();
        context.fillStrokeShape(this);
      } else {
        context.strokeShape(this);
      }
    };
    Line2.prototype.getTensionPoints = function() {
      return this._getCache("tensionPoints", this._getTensionPoints);
    };
    Line2.prototype._getTensionPoints = function() {
      if (this.closed()) {
        return this._getTensionPointsClosed();
      } else {
        return Util.Util._expandPoints(this.points(), this.tension());
      }
    };
    Line2.prototype._getTensionPointsClosed = function() {
      var p = this.points(), len = p.length, tension = this.tension(), firstControlPoints = Util.Util._getControlPoints(p[len - 2], p[len - 1], p[0], p[1], p[2], p[3], tension), lastControlPoints = Util.Util._getControlPoints(p[len - 4], p[len - 3], p[len - 2], p[len - 1], p[0], p[1], tension), middle = Util.Util._expandPoints(p, tension), tp = [firstControlPoints[2], firstControlPoints[3]].concat(middle).concat([
        lastControlPoints[0],
        lastControlPoints[1],
        p[len - 2],
        p[len - 1],
        lastControlPoints[2],
        lastControlPoints[3],
        firstControlPoints[0],
        firstControlPoints[1],
        p[0],
        p[1]
      ]);
      return tp;
    };
    Line2.prototype.getWidth = function() {
      return this.getSelfRect().width;
    };
    Line2.prototype.getHeight = function() {
      return this.getSelfRect().height;
    };
    Line2.prototype.getSelfRect = function() {
      var points = this.points();
      if (points.length < 4) {
        return {
          x: points[0] || 0,
          y: points[1] || 0,
          width: 0,
          height: 0
        };
      }
      if (this.tension() !== 0) {
        points = __spreadArrays([
          points[0],
          points[1]
        ], this._getTensionPoints(), [
          points[points.length - 2],
          points[points.length - 1]
        ]);
      } else {
        points = this.points();
      }
      var minX = points[0];
      var maxX = points[0];
      var minY = points[1];
      var maxY = points[1];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    };
    return Line2;
  }(Shape_1.Shape);
  exports.Line = Line;
  Line.prototype.className = "Line";
  Line.prototype._attrsAffectingSize = ["points", "bezier", "tension"];
  Global._registerNode(Line);
  Factory.Factory.addGetterSetter(Line, "closed", false);
  Factory.Factory.addGetterSetter(Line, "bezier", false);
  Factory.Factory.addGetterSetter(Line, "tension", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Line, "points", [], Validators.getNumberArrayValidator());
  Util.Collection.mapMethods(Line);
});
var Arrow_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Arrow = void 0;
  var Arrow = function(_super) {
    __extends(Arrow2, _super);
    function Arrow2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Arrow2.prototype._sceneFunc = function(ctx) {
      _super.prototype._sceneFunc.call(this, ctx);
      var PI2 = Math.PI * 2;
      var points = this.points();
      var tp = points;
      var fromTension = this.tension() !== 0 && points.length > 4;
      if (fromTension) {
        tp = this.getTensionPoints();
      }
      var n = points.length;
      var dx, dy;
      if (fromTension) {
        dx = points[n - 2] - (tp[tp.length - 2] + tp[tp.length - 4]) / 2;
        dy = points[n - 1] - (tp[tp.length - 1] + tp[tp.length - 3]) / 2;
      } else {
        dx = points[n - 2] - points[n - 4];
        dy = points[n - 1] - points[n - 3];
      }
      var radians = (Math.atan2(dy, dx) + PI2) % PI2;
      var length = this.pointerLength();
      var width = this.pointerWidth();
      ctx.save();
      ctx.beginPath();
      ctx.translate(points[n - 2], points[n - 1]);
      ctx.rotate(radians);
      ctx.moveTo(0, 0);
      ctx.lineTo(-length, width / 2);
      ctx.lineTo(-length, -width / 2);
      ctx.closePath();
      ctx.restore();
      if (this.pointerAtBeginning()) {
        ctx.save();
        ctx.translate(points[0], points[1]);
        if (fromTension) {
          dx = (tp[0] + tp[2]) / 2 - points[0];
          dy = (tp[1] + tp[3]) / 2 - points[1];
        } else {
          dx = points[2] - points[0];
          dy = points[3] - points[1];
        }
        ctx.rotate((Math.atan2(-dy, -dx) + PI2) % PI2);
        ctx.moveTo(0, 0);
        ctx.lineTo(-length, width / 2);
        ctx.lineTo(-length, -width / 2);
        ctx.closePath();
        ctx.restore();
      }
      var isDashEnabled = this.dashEnabled();
      if (isDashEnabled) {
        this.attrs.dashEnabled = false;
        ctx.setLineDash([]);
      }
      ctx.fillStrokeShape(this);
      if (isDashEnabled) {
        this.attrs.dashEnabled = true;
      }
    };
    Arrow2.prototype.getSelfRect = function() {
      var lineRect = _super.prototype.getSelfRect.call(this);
      var offset = this.pointerWidth() / 2;
      return {
        x: lineRect.x - offset,
        y: lineRect.y - offset,
        width: lineRect.width + offset * 2,
        height: lineRect.height + offset * 2
      };
    };
    return Arrow2;
  }(Line_1.Line);
  exports.Arrow = Arrow;
  Arrow.prototype.className = "Arrow";
  Global._registerNode(Arrow);
  Factory.Factory.addGetterSetter(Arrow, "pointerLength", 10, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Arrow, "pointerWidth", 10, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Arrow, "pointerAtBeginning", false);
  Util.Collection.mapMethods(Arrow);
});
var Circle_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Circle = void 0;
  var Circle = function(_super) {
    __extends(Circle2, _super);
    function Circle2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle2.prototype._sceneFunc = function(context) {
      context.beginPath();
      context.arc(0, 0, this.attrs.radius || 0, 0, Math.PI * 2, false);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Circle2.prototype.getWidth = function() {
      return this.radius() * 2;
    };
    Circle2.prototype.getHeight = function() {
      return this.radius() * 2;
    };
    Circle2.prototype.setWidth = function(width) {
      if (this.radius() !== width / 2) {
        this.radius(width / 2);
      }
    };
    Circle2.prototype.setHeight = function(height) {
      if (this.radius() !== height / 2) {
        this.radius(height / 2);
      }
    };
    return Circle2;
  }(Shape_1.Shape);
  exports.Circle = Circle;
  Circle.prototype._centroid = true;
  Circle.prototype.className = "Circle";
  Circle.prototype._attrsAffectingSize = ["radius"];
  Global._registerNode(Circle);
  Factory.Factory.addGetterSetter(Circle, "radius", 0, Validators.getNumberValidator());
  Util.Collection.mapMethods(Circle);
});
var Ellipse_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Ellipse = void 0;
  var Ellipse = function(_super) {
    __extends(Ellipse2, _super);
    function Ellipse2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Ellipse2.prototype._sceneFunc = function(context) {
      var rx = this.radiusX(), ry = this.radiusY();
      context.beginPath();
      context.save();
      if (rx !== ry) {
        context.scale(1, ry / rx);
      }
      context.arc(0, 0, rx, 0, Math.PI * 2, false);
      context.restore();
      context.closePath();
      context.fillStrokeShape(this);
    };
    Ellipse2.prototype.getWidth = function() {
      return this.radiusX() * 2;
    };
    Ellipse2.prototype.getHeight = function() {
      return this.radiusY() * 2;
    };
    Ellipse2.prototype.setWidth = function(width) {
      this.radiusX(width / 2);
    };
    Ellipse2.prototype.setHeight = function(height) {
      this.radiusY(height / 2);
    };
    return Ellipse2;
  }(Shape_1.Shape);
  exports.Ellipse = Ellipse;
  Ellipse.prototype.className = "Ellipse";
  Ellipse.prototype._centroid = true;
  Ellipse.prototype._attrsAffectingSize = ["radiusX", "radiusY"];
  Global._registerNode(Ellipse);
  Factory.Factory.addComponentsGetterSetter(Ellipse, "radius", ["x", "y"]);
  Factory.Factory.addGetterSetter(Ellipse, "radiusX", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Ellipse, "radiusY", 0, Validators.getNumberValidator());
  Util.Collection.mapMethods(Ellipse);
});
var Image_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Image = void 0;
  var Image = function(_super) {
    __extends(Image2, _super);
    function Image2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Image2.prototype._useBufferCanvas = function() {
      return _super.prototype._useBufferCanvas.call(this, true);
    };
    Image2.prototype._sceneFunc = function(context) {
      var width = this.getWidth();
      var height = this.getHeight();
      var image = this.attrs.image;
      var params;
      if (image) {
        var cropWidth = this.attrs.cropWidth;
        var cropHeight = this.attrs.cropHeight;
        if (cropWidth && cropHeight) {
          params = [
            image,
            this.cropX(),
            this.cropY(),
            cropWidth,
            cropHeight,
            0,
            0,
            width,
            height
          ];
        } else {
          params = [image, 0, 0, width, height];
        }
      }
      if (this.hasFill() || this.hasStroke()) {
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }
      if (image) {
        context.drawImage.apply(context, params);
      }
    };
    Image2.prototype._hitFunc = function(context) {
      var width = this.width(), height = this.height();
      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Image2.prototype.getWidth = function() {
      var _a, _b;
      return (_a = this.attrs.width) !== null && _a !== void 0 ? _a : ((_b = this.image()) === null || _b === void 0 ? void 0 : _b.width) || 0;
    };
    Image2.prototype.getHeight = function() {
      var _a, _b;
      return (_a = this.attrs.height) !== null && _a !== void 0 ? _a : ((_b = this.image()) === null || _b === void 0 ? void 0 : _b.height) || 0;
    };
    Image2.fromURL = function(url, callback) {
      var img = Util.Util.createImageElement();
      img.onload = function() {
        var image = new Image2({
          image: img
        });
        callback(image);
      };
      img.crossOrigin = "Anonymous";
      img.src = url;
    };
    return Image2;
  }(Shape_1.Shape);
  exports.Image = Image;
  Image.prototype.className = "Image";
  Global._registerNode(Image);
  Factory.Factory.addGetterSetter(Image, "image");
  Factory.Factory.addComponentsGetterSetter(Image, "crop", ["x", "y", "width", "height"]);
  Factory.Factory.addGetterSetter(Image, "cropX", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Image, "cropY", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Image, "cropWidth", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Image, "cropHeight", 0, Validators.getNumberValidator());
  Util.Collection.mapMethods(Image);
});
var Label_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Tag = exports.Label = void 0;
  var ATTR_CHANGE_LIST = [
    "fontFamily",
    "fontSize",
    "fontStyle",
    "padding",
    "lineHeight",
    "text",
    "width",
    "height"
  ], CHANGE_KONVA = "Change.konva", NONE = "none", UP = "up", RIGHT = "right", DOWN = "down", LEFT = "left", attrChangeListLen = ATTR_CHANGE_LIST.length;
  var Label = function(_super) {
    __extends(Label2, _super);
    function Label2(config) {
      var _this = _super.call(this, config) || this;
      _this.on("add.konva", function(evt) {
        this._addListeners(evt.child);
        this._sync();
      });
      return _this;
    }
    Label2.prototype.getText = function() {
      return this.find("Text")[0];
    };
    Label2.prototype.getTag = function() {
      return this.find("Tag")[0];
    };
    Label2.prototype._addListeners = function(text) {
      var that = this, n;
      var func = function() {
        that._sync();
      };
      for (n = 0; n < attrChangeListLen; n++) {
        text.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, func);
      }
    };
    Label2.prototype.getWidth = function() {
      return this.getText().width();
    };
    Label2.prototype.getHeight = function() {
      return this.getText().height();
    };
    Label2.prototype._sync = function() {
      var text = this.getText(), tag = this.getTag(), width, height, pointerDirection, pointerWidth, x, y, pointerHeight;
      if (text && tag) {
        width = text.width();
        height = text.height();
        pointerDirection = tag.pointerDirection();
        pointerWidth = tag.pointerWidth();
        pointerHeight = tag.pointerHeight();
        x = 0;
        y = 0;
        switch (pointerDirection) {
          case UP:
            x = width / 2;
            y = -1 * pointerHeight;
            break;
          case RIGHT:
            x = width + pointerWidth;
            y = height / 2;
            break;
          case DOWN:
            x = width / 2;
            y = height + pointerHeight;
            break;
          case LEFT:
            x = -1 * pointerWidth;
            y = height / 2;
            break;
        }
        tag.setAttrs({
          x: -1 * x,
          y: -1 * y,
          width,
          height
        });
        text.setAttrs({
          x: -1 * x,
          y: -1 * y
        });
      }
    };
    return Label2;
  }(Group_1.Group);
  exports.Label = Label;
  Label.prototype.className = "Label";
  Global._registerNode(Label);
  Util.Collection.mapMethods(Label);
  var Tag = function(_super) {
    __extends(Tag2, _super);
    function Tag2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Tag2.prototype._sceneFunc = function(context) {
      var width = this.width(), height = this.height(), pointerDirection = this.pointerDirection(), pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), cornerRadius = this.cornerRadius();
      var topLeft = 0;
      var topRight = 0;
      var bottomLeft = 0;
      var bottomRight = 0;
      if (typeof cornerRadius === "number") {
        topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
      } else {
        topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
        topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
        bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
        bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
      }
      context.beginPath();
      context.moveTo(topLeft, 0);
      if (pointerDirection === UP) {
        context.lineTo((width - pointerWidth) / 2, 0);
        context.lineTo(width / 2, -1 * pointerHeight);
        context.lineTo((width + pointerWidth) / 2, 0);
      }
      context.lineTo(width - topRight, 0);
      context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
      if (pointerDirection === RIGHT) {
        context.lineTo(width, (height - pointerHeight) / 2);
        context.lineTo(width + pointerWidth, height / 2);
        context.lineTo(width, (height + pointerHeight) / 2);
      }
      context.lineTo(width, height - bottomRight);
      context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
      if (pointerDirection === DOWN) {
        context.lineTo((width + pointerWidth) / 2, height);
        context.lineTo(width / 2, height + pointerHeight);
        context.lineTo((width - pointerWidth) / 2, height);
      }
      context.lineTo(bottomLeft, height);
      context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
      if (pointerDirection === LEFT) {
        context.lineTo(0, (height + pointerHeight) / 2);
        context.lineTo(-1 * pointerWidth, height / 2);
        context.lineTo(0, (height - pointerHeight) / 2);
      }
      context.lineTo(0, topLeft);
      context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Tag2.prototype.getSelfRect = function() {
      var x = 0, y = 0, pointerWidth = this.pointerWidth(), pointerHeight = this.pointerHeight(), direction = this.pointerDirection(), width = this.width(), height = this.height();
      if (direction === UP) {
        y -= pointerHeight;
        height += pointerHeight;
      } else if (direction === DOWN) {
        height += pointerHeight;
      } else if (direction === LEFT) {
        x -= pointerWidth * 1.5;
        width += pointerWidth;
      } else if (direction === RIGHT) {
        width += pointerWidth * 1.5;
      }
      return {
        x,
        y,
        width,
        height
      };
    };
    return Tag2;
  }(Shape_1.Shape);
  exports.Tag = Tag;
  Tag.prototype.className = "Tag";
  Global._registerNode(Tag);
  Factory.Factory.addGetterSetter(Tag, "pointerDirection", NONE);
  Factory.Factory.addGetterSetter(Tag, "pointerWidth", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Tag, "pointerHeight", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Tag, "cornerRadius", 0, Validators.getNumberOrArrayOfNumbersValidator(4));
  Util.Collection.mapMethods(Tag);
});
var Path_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Path = void 0;
  var Path = function(_super) {
    __extends(Path2, _super);
    function Path2(config) {
      var _this = _super.call(this, config) || this;
      _this.dataArray = [];
      _this.pathLength = 0;
      _this.dataArray = Path2.parsePathData(_this.data());
      _this.pathLength = 0;
      for (var i = 0; i < _this.dataArray.length; ++i) {
        _this.pathLength += _this.dataArray[i].pathLength;
      }
      _this.on("dataChange.konva", function() {
        this.dataArray = Path2.parsePathData(this.data());
        this.pathLength = 0;
        for (var i2 = 0; i2 < this.dataArray.length; ++i2) {
          this.pathLength += this.dataArray[i2].pathLength;
        }
      });
      return _this;
    }
    Path2.prototype._sceneFunc = function(context) {
      var ca = this.dataArray;
      context.beginPath();
      var isClosed = false;
      for (var n = 0; n < ca.length; n++) {
        var c = ca[n].command;
        var p = ca[n].points;
        switch (c) {
          case "L":
            context.lineTo(p[0], p[1]);
            break;
          case "M":
            context.moveTo(p[0], p[1]);
            break;
          case "C":
            context.bezierCurveTo(p[0], p[1], p[2], p[3], p[4], p[5]);
            break;
          case "Q":
            context.quadraticCurveTo(p[0], p[1], p[2], p[3]);
            break;
          case "A":
            var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6], fs = p[7];
            var r = rx > ry ? rx : ry;
            var scaleX = rx > ry ? 1 : rx / ry;
            var scaleY = rx > ry ? ry / rx : 1;
            context.translate(cx, cy);
            context.rotate(psi);
            context.scale(scaleX, scaleY);
            context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
            context.scale(1 / scaleX, 1 / scaleY);
            context.rotate(-psi);
            context.translate(-cx, -cy);
            break;
          case "z":
            isClosed = true;
            context.closePath();
            break;
        }
      }
      if (!isClosed && !this.hasFill()) {
        context.strokeShape(this);
      } else {
        context.fillStrokeShape(this);
      }
    };
    Path2.prototype.getSelfRect = function() {
      var points = [];
      this.dataArray.forEach(function(data) {
        if (data.command === "A") {
          var start = data.points[4];
          var dTheta = data.points[5];
          var end = data.points[4] + dTheta;
          var inc = Math.PI / 180;
          if (Math.abs(start - end) < inc) {
            inc = Math.abs(start - end);
          }
          if (dTheta < 0) {
            for (var t = start - inc; t > end; t -= inc) {
              var point = Path2.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t, 0);
              points.push(point.x, point.y);
            }
          } else {
            for (var t = start + inc; t < end; t += inc) {
              var point = Path2.getPointOnEllipticalArc(data.points[0], data.points[1], data.points[2], data.points[3], t, 0);
              points.push(point.x, point.y);
            }
          }
        } else if (data.command === "C") {
          for (var t = 0; t <= 1; t += 0.01) {
            var point = Path2.getPointOnCubicBezier(t, data.start.x, data.start.y, data.points[0], data.points[1], data.points[2], data.points[3], data.points[4], data.points[5]);
            points.push(point.x, point.y);
          }
        } else {
          points = points.concat(data.points);
        }
      });
      var minX = points[0];
      var maxX = points[0];
      var minY = points[1];
      var maxY = points[1];
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        if (!isNaN(x)) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
        }
        if (!isNaN(y)) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      }
      return {
        x: Math.round(minX),
        y: Math.round(minY),
        width: Math.round(maxX - minX),
        height: Math.round(maxY - minY)
      };
    };
    Path2.prototype.getLength = function() {
      return this.pathLength;
    };
    Path2.prototype.getPointAtLength = function(length) {
      var point, i = 0, ii = this.dataArray.length;
      if (!ii) {
        return null;
      }
      while (i < ii && length > this.dataArray[i].pathLength) {
        length -= this.dataArray[i].pathLength;
        ++i;
      }
      if (i === ii) {
        point = this.dataArray[i - 1].points.slice(-2);
        return {
          x: point[0],
          y: point[1]
        };
      }
      if (length < 0.01) {
        point = this.dataArray[i].points.slice(0, 2);
        return {
          x: point[0],
          y: point[1]
        };
      }
      var cp = this.dataArray[i];
      var p = cp.points;
      switch (cp.command) {
        case "L":
          return Path2.getPointOnLine(length, cp.start.x, cp.start.y, p[0], p[1]);
        case "C":
          return Path2.getPointOnCubicBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3], p[4], p[5]);
        case "Q":
          return Path2.getPointOnQuadraticBezier(length / cp.pathLength, cp.start.x, cp.start.y, p[0], p[1], p[2], p[3]);
        case "A":
          var cx = p[0], cy = p[1], rx = p[2], ry = p[3], theta = p[4], dTheta = p[5], psi = p[6];
          theta += dTheta * length / cp.pathLength;
          return Path2.getPointOnEllipticalArc(cx, cy, rx, ry, theta, psi);
      }
      return null;
    };
    Path2.getLineLength = function(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    };
    Path2.getPointOnLine = function(dist, P1x, P1y, P2x, P2y, fromX, fromY) {
      if (fromX === void 0) {
        fromX = P1x;
      }
      if (fromY === void 0) {
        fromY = P1y;
      }
      var m = (P2y - P1y) / (P2x - P1x + 1e-8);
      var run = Math.sqrt(dist * dist / (1 + m * m));
      if (P2x < P1x) {
        run *= -1;
      }
      var rise = m * run;
      var pt;
      if (P2x === P1x) {
        pt = {
          x: fromX,
          y: fromY + rise
        };
      } else if ((fromY - P1y) / (fromX - P1x + 1e-8) === m) {
        pt = {
          x: fromX + run,
          y: fromY + rise
        };
      } else {
        var ix, iy;
        var len = this.getLineLength(P1x, P1y, P2x, P2y);
        var u = (fromX - P1x) * (P2x - P1x) + (fromY - P1y) * (P2y - P1y);
        u = u / (len * len);
        ix = P1x + u * (P2x - P1x);
        iy = P1y + u * (P2y - P1y);
        var pRise = this.getLineLength(fromX, fromY, ix, iy);
        var pRun = Math.sqrt(dist * dist - pRise * pRise);
        run = Math.sqrt(pRun * pRun / (1 + m * m));
        if (P2x < P1x) {
          run *= -1;
        }
        rise = m * run;
        pt = {
          x: ix + run,
          y: iy + rise
        };
      }
      return pt;
    };
    Path2.getPointOnCubicBezier = function(pct, P1x, P1y, P2x, P2y, P3x, P3y, P4x, P4y) {
      function CB1(t) {
        return t * t * t;
      }
      function CB2(t) {
        return 3 * t * t * (1 - t);
      }
      function CB3(t) {
        return 3 * t * (1 - t) * (1 - t);
      }
      function CB4(t) {
        return (1 - t) * (1 - t) * (1 - t);
      }
      var x = P4x * CB1(pct) + P3x * CB2(pct) + P2x * CB3(pct) + P1x * CB4(pct);
      var y = P4y * CB1(pct) + P3y * CB2(pct) + P2y * CB3(pct) + P1y * CB4(pct);
      return {
        x,
        y
      };
    };
    Path2.getPointOnQuadraticBezier = function(pct, P1x, P1y, P2x, P2y, P3x, P3y) {
      function QB1(t) {
        return t * t;
      }
      function QB2(t) {
        return 2 * t * (1 - t);
      }
      function QB3(t) {
        return (1 - t) * (1 - t);
      }
      var x = P3x * QB1(pct) + P2x * QB2(pct) + P1x * QB3(pct);
      var y = P3y * QB1(pct) + P2y * QB2(pct) + P1y * QB3(pct);
      return {
        x,
        y
      };
    };
    Path2.getPointOnEllipticalArc = function(cx, cy, rx, ry, theta, psi) {
      var cosPsi = Math.cos(psi), sinPsi = Math.sin(psi);
      var pt = {
        x: rx * Math.cos(theta),
        y: ry * Math.sin(theta)
      };
      return {
        x: cx + (pt.x * cosPsi - pt.y * sinPsi),
        y: cy + (pt.x * sinPsi + pt.y * cosPsi)
      };
    };
    Path2.parsePathData = function(data) {
      if (!data) {
        return [];
      }
      var cs = data;
      var cc = [
        "m",
        "M",
        "l",
        "L",
        "v",
        "V",
        "h",
        "H",
        "z",
        "Z",
        "c",
        "C",
        "q",
        "Q",
        "t",
        "T",
        "s",
        "S",
        "a",
        "A"
      ];
      cs = cs.replace(new RegExp(" ", "g"), ",");
      for (var n = 0; n < cc.length; n++) {
        cs = cs.replace(new RegExp(cc[n], "g"), "|" + cc[n]);
      }
      var arr = cs.split("|");
      var ca = [];
      var coords = [];
      var cpx = 0;
      var cpy = 0;
      var re = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
      var match;
      for (n = 1; n < arr.length; n++) {
        var str = arr[n];
        var c = str.charAt(0);
        str = str.slice(1);
        coords.length = 0;
        while (match = re.exec(str)) {
          coords.push(match[0]);
        }
        var p = [];
        for (var j = 0, jlen = coords.length; j < jlen; j++) {
          var parsed = parseFloat(coords[j]);
          if (!isNaN(parsed)) {
            p.push(parsed);
          } else {
            p.push(0);
          }
        }
        while (p.length > 0) {
          if (isNaN(p[0])) {
            break;
          }
          var cmd = null;
          var points = [];
          var startX = cpx, startY = cpy;
          var prevCmd, ctlPtx, ctlPty;
          var rx, ry, psi, fa, fs, x1, y1;
          switch (c) {
            case "l":
              cpx += p.shift();
              cpy += p.shift();
              cmd = "L";
              points.push(cpx, cpy);
              break;
            case "L":
              cpx = p.shift();
              cpy = p.shift();
              points.push(cpx, cpy);
              break;
            case "m":
              var dx = p.shift();
              var dy = p.shift();
              cpx += dx;
              cpy += dy;
              cmd = "M";
              if (ca.length > 2 && ca[ca.length - 1].command === "z") {
                for (var idx = ca.length - 2; idx >= 0; idx--) {
                  if (ca[idx].command === "M") {
                    cpx = ca[idx].points[0] + dx;
                    cpy = ca[idx].points[1] + dy;
                    break;
                  }
                }
              }
              points.push(cpx, cpy);
              c = "l";
              break;
            case "M":
              cpx = p.shift();
              cpy = p.shift();
              cmd = "M";
              points.push(cpx, cpy);
              c = "L";
              break;
            case "h":
              cpx += p.shift();
              cmd = "L";
              points.push(cpx, cpy);
              break;
            case "H":
              cpx = p.shift();
              cmd = "L";
              points.push(cpx, cpy);
              break;
            case "v":
              cpy += p.shift();
              cmd = "L";
              points.push(cpx, cpy);
              break;
            case "V":
              cpy = p.shift();
              cmd = "L";
              points.push(cpx, cpy);
              break;
            case "C":
              points.push(p.shift(), p.shift(), p.shift(), p.shift());
              cpx = p.shift();
              cpy = p.shift();
              points.push(cpx, cpy);
              break;
            case "c":
              points.push(cpx + p.shift(), cpy + p.shift(), cpx + p.shift(), cpy + p.shift());
              cpx += p.shift();
              cpy += p.shift();
              cmd = "C";
              points.push(cpx, cpy);
              break;
            case "S":
              ctlPtx = cpx;
              ctlPty = cpy;
              prevCmd = ca[ca.length - 1];
              if (prevCmd.command === "C") {
                ctlPtx = cpx + (cpx - prevCmd.points[2]);
                ctlPty = cpy + (cpy - prevCmd.points[3]);
              }
              points.push(ctlPtx, ctlPty, p.shift(), p.shift());
              cpx = p.shift();
              cpy = p.shift();
              cmd = "C";
              points.push(cpx, cpy);
              break;
            case "s":
              ctlPtx = cpx;
              ctlPty = cpy;
              prevCmd = ca[ca.length - 1];
              if (prevCmd.command === "C") {
                ctlPtx = cpx + (cpx - prevCmd.points[2]);
                ctlPty = cpy + (cpy - prevCmd.points[3]);
              }
              points.push(ctlPtx, ctlPty, cpx + p.shift(), cpy + p.shift());
              cpx += p.shift();
              cpy += p.shift();
              cmd = "C";
              points.push(cpx, cpy);
              break;
            case "Q":
              points.push(p.shift(), p.shift());
              cpx = p.shift();
              cpy = p.shift();
              points.push(cpx, cpy);
              break;
            case "q":
              points.push(cpx + p.shift(), cpy + p.shift());
              cpx += p.shift();
              cpy += p.shift();
              cmd = "Q";
              points.push(cpx, cpy);
              break;
            case "T":
              ctlPtx = cpx;
              ctlPty = cpy;
              prevCmd = ca[ca.length - 1];
              if (prevCmd.command === "Q") {
                ctlPtx = cpx + (cpx - prevCmd.points[0]);
                ctlPty = cpy + (cpy - prevCmd.points[1]);
              }
              cpx = p.shift();
              cpy = p.shift();
              cmd = "Q";
              points.push(ctlPtx, ctlPty, cpx, cpy);
              break;
            case "t":
              ctlPtx = cpx;
              ctlPty = cpy;
              prevCmd = ca[ca.length - 1];
              if (prevCmd.command === "Q") {
                ctlPtx = cpx + (cpx - prevCmd.points[0]);
                ctlPty = cpy + (cpy - prevCmd.points[1]);
              }
              cpx += p.shift();
              cpy += p.shift();
              cmd = "Q";
              points.push(ctlPtx, ctlPty, cpx, cpy);
              break;
            case "A":
              rx = p.shift();
              ry = p.shift();
              psi = p.shift();
              fa = p.shift();
              fs = p.shift();
              x1 = cpx;
              y1 = cpy;
              cpx = p.shift();
              cpy = p.shift();
              cmd = "A";
              points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
              break;
            case "a":
              rx = p.shift();
              ry = p.shift();
              psi = p.shift();
              fa = p.shift();
              fs = p.shift();
              x1 = cpx;
              y1 = cpy;
              cpx += p.shift();
              cpy += p.shift();
              cmd = "A";
              points = this.convertEndpointToCenterParameterization(x1, y1, cpx, cpy, fa, fs, rx, ry, psi);
              break;
          }
          ca.push({
            command: cmd || c,
            points,
            start: {
              x: startX,
              y: startY
            },
            pathLength: this.calcLength(startX, startY, cmd || c, points)
          });
        }
        if (c === "z" || c === "Z") {
          ca.push({
            command: "z",
            points: [],
            start: void 0,
            pathLength: 0
          });
        }
      }
      return ca;
    };
    Path2.calcLength = function(x, y, cmd, points) {
      var len, p1, p2, t;
      var path = Path2;
      switch (cmd) {
        case "L":
          return path.getLineLength(x, y, points[0], points[1]);
        case "C":
          len = 0;
          p1 = path.getPointOnCubicBezier(0, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
          for (t = 0.01; t <= 1; t += 0.01) {
            p2 = path.getPointOnCubicBezier(t, x, y, points[0], points[1], points[2], points[3], points[4], points[5]);
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
          return len;
        case "Q":
          len = 0;
          p1 = path.getPointOnQuadraticBezier(0, x, y, points[0], points[1], points[2], points[3]);
          for (t = 0.01; t <= 1; t += 0.01) {
            p2 = path.getPointOnQuadraticBezier(t, x, y, points[0], points[1], points[2], points[3]);
            len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
            p1 = p2;
          }
          return len;
        case "A":
          len = 0;
          var start = points[4];
          var dTheta = points[5];
          var end = points[4] + dTheta;
          var inc = Math.PI / 180;
          if (Math.abs(start - end) < inc) {
            inc = Math.abs(start - end);
          }
          p1 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], start, 0);
          if (dTheta < 0) {
            for (t = start - inc; t > end; t -= inc) {
              p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
              len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
          } else {
            for (t = start + inc; t < end; t += inc) {
              p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], t, 0);
              len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
              p1 = p2;
            }
          }
          p2 = path.getPointOnEllipticalArc(points[0], points[1], points[2], points[3], end, 0);
          len += path.getLineLength(p1.x, p1.y, p2.x, p2.y);
          return len;
      }
      return 0;
    };
    Path2.convertEndpointToCenterParameterization = function(x1, y1, x2, y2, fa, fs, rx, ry, psiDeg) {
      var psi = psiDeg * (Math.PI / 180);
      var xp = Math.cos(psi) * (x1 - x2) / 2 + Math.sin(psi) * (y1 - y2) / 2;
      var yp = -1 * Math.sin(psi) * (x1 - x2) / 2 + Math.cos(psi) * (y1 - y2) / 2;
      var lambda = xp * xp / (rx * rx) + yp * yp / (ry * ry);
      if (lambda > 1) {
        rx *= Math.sqrt(lambda);
        ry *= Math.sqrt(lambda);
      }
      var f = Math.sqrt((rx * rx * (ry * ry) - rx * rx * (yp * yp) - ry * ry * (xp * xp)) / (rx * rx * (yp * yp) + ry * ry * (xp * xp)));
      if (fa === fs) {
        f *= -1;
      }
      if (isNaN(f)) {
        f = 0;
      }
      var cxp = f * rx * yp / ry;
      var cyp = f * -ry * xp / rx;
      var cx = (x1 + x2) / 2 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
      var cy = (y1 + y2) / 2 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;
      var vMag = function(v2) {
        return Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1]);
      };
      var vRatio = function(u2, v2) {
        return (u2[0] * v2[0] + u2[1] * v2[1]) / (vMag(u2) * vMag(v2));
      };
      var vAngle = function(u2, v2) {
        return (u2[0] * v2[1] < u2[1] * v2[0] ? -1 : 1) * Math.acos(vRatio(u2, v2));
      };
      var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
      var u = [(xp - cxp) / rx, (yp - cyp) / ry];
      var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
      var dTheta = vAngle(u, v);
      if (vRatio(u, v) <= -1) {
        dTheta = Math.PI;
      }
      if (vRatio(u, v) >= 1) {
        dTheta = 0;
      }
      if (fs === 0 && dTheta > 0) {
        dTheta = dTheta - 2 * Math.PI;
      }
      if (fs === 1 && dTheta < 0) {
        dTheta = dTheta + 2 * Math.PI;
      }
      return [cx, cy, rx, ry, theta, dTheta, psi, fs];
    };
    return Path2;
  }(Shape_1.Shape);
  exports.Path = Path;
  Path.prototype.className = "Path";
  Path.prototype._attrsAffectingSize = ["data"];
  Global._registerNode(Path);
  Factory.Factory.addGetterSetter(Path, "data");
  Util.Collection.mapMethods(Path);
});
var Rect_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Rect = void 0;
  var Rect = function(_super) {
    __extends(Rect2, _super);
    function Rect2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Rect2.prototype._sceneFunc = function(context) {
      var cornerRadius = this.cornerRadius(), width = this.width(), height = this.height();
      context.beginPath();
      if (!cornerRadius) {
        context.rect(0, 0, width, height);
      } else {
        var topLeft = 0;
        var topRight = 0;
        var bottomLeft = 0;
        var bottomRight = 0;
        if (typeof cornerRadius === "number") {
          topLeft = topRight = bottomLeft = bottomRight = Math.min(cornerRadius, width / 2, height / 2);
        } else {
          topLeft = Math.min(cornerRadius[0] || 0, width / 2, height / 2);
          topRight = Math.min(cornerRadius[1] || 0, width / 2, height / 2);
          bottomRight = Math.min(cornerRadius[2] || 0, width / 2, height / 2);
          bottomLeft = Math.min(cornerRadius[3] || 0, width / 2, height / 2);
        }
        context.moveTo(topLeft, 0);
        context.lineTo(width - topRight, 0);
        context.arc(width - topRight, topRight, topRight, Math.PI * 3 / 2, 0, false);
        context.lineTo(width, height - bottomRight);
        context.arc(width - bottomRight, height - bottomRight, bottomRight, 0, Math.PI / 2, false);
        context.lineTo(bottomLeft, height);
        context.arc(bottomLeft, height - bottomLeft, bottomLeft, Math.PI / 2, Math.PI, false);
        context.lineTo(0, topLeft);
        context.arc(topLeft, topLeft, topLeft, Math.PI, Math.PI * 3 / 2, false);
      }
      context.closePath();
      context.fillStrokeShape(this);
    };
    return Rect2;
  }(Shape_1.Shape);
  exports.Rect = Rect;
  Rect.prototype.className = "Rect";
  Global._registerNode(Rect);
  Factory.Factory.addGetterSetter(Rect, "cornerRadius", 0, Validators.getNumberOrArrayOfNumbersValidator(4));
  Util.Collection.mapMethods(Rect);
});
var RegularPolygon_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RegularPolygon = void 0;
  var RegularPolygon = function(_super) {
    __extends(RegularPolygon2, _super);
    function RegularPolygon2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    RegularPolygon2.prototype._sceneFunc = function(context) {
      var points = this._getPoints();
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (var n = 1; n < points.length; n++) {
        context.lineTo(points[n].x, points[n].y);
      }
      context.closePath();
      context.fillStrokeShape(this);
    };
    RegularPolygon2.prototype._getPoints = function() {
      var sides = this.attrs.sides;
      var radius = this.attrs.radius || 0;
      var points = [];
      for (var n = 0; n < sides; n++) {
        points.push({
          x: radius * Math.sin(n * 2 * Math.PI / sides),
          y: -1 * radius * Math.cos(n * 2 * Math.PI / sides)
        });
      }
      return points;
    };
    RegularPolygon2.prototype.getSelfRect = function() {
      var points = this._getPoints();
      var minX = points[0].x;
      var maxX = points[0].y;
      var minY = points[0].x;
      var maxY = points[0].y;
      points.forEach(function(point) {
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      });
      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    };
    RegularPolygon2.prototype.getWidth = function() {
      return this.radius() * 2;
    };
    RegularPolygon2.prototype.getHeight = function() {
      return this.radius() * 2;
    };
    RegularPolygon2.prototype.setWidth = function(width) {
      this.radius(width / 2);
    };
    RegularPolygon2.prototype.setHeight = function(height) {
      this.radius(height / 2);
    };
    return RegularPolygon2;
  }(Shape_1.Shape);
  exports.RegularPolygon = RegularPolygon;
  RegularPolygon.prototype.className = "RegularPolygon";
  RegularPolygon.prototype._centroid = true;
  RegularPolygon.prototype._attrsAffectingSize = ["radius"];
  Global._registerNode(RegularPolygon);
  Factory.Factory.addGetterSetter(RegularPolygon, "radius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(RegularPolygon, "sides", 0, Validators.getNumberValidator());
  Util.Collection.mapMethods(RegularPolygon);
});
var Ring_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Ring = void 0;
  var PIx2 = Math.PI * 2;
  var Ring = function(_super) {
    __extends(Ring2, _super);
    function Ring2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Ring2.prototype._sceneFunc = function(context) {
      context.beginPath();
      context.arc(0, 0, this.innerRadius(), 0, PIx2, false);
      context.moveTo(this.outerRadius(), 0);
      context.arc(0, 0, this.outerRadius(), PIx2, 0, true);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Ring2.prototype.getWidth = function() {
      return this.outerRadius() * 2;
    };
    Ring2.prototype.getHeight = function() {
      return this.outerRadius() * 2;
    };
    Ring2.prototype.setWidth = function(width) {
      this.outerRadius(width / 2);
    };
    Ring2.prototype.setHeight = function(height) {
      this.outerRadius(height / 2);
    };
    return Ring2;
  }(Shape_1.Shape);
  exports.Ring = Ring;
  Ring.prototype.className = "Ring";
  Ring.prototype._centroid = true;
  Ring.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
  Global._registerNode(Ring);
  Factory.Factory.addGetterSetter(Ring, "innerRadius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Ring, "outerRadius", 0, Validators.getNumberValidator());
  Util.Collection.mapMethods(Ring);
});
var Sprite_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Sprite = void 0;
  var Sprite = function(_super) {
    __extends(Sprite2, _super);
    function Sprite2(config) {
      var _this = _super.call(this, config) || this;
      _this._updated = true;
      _this.anim = new Animation_1.Animation(function() {
        var updated = _this._updated;
        _this._updated = false;
        return updated;
      });
      _this.on("animationChange.konva", function() {
        this.frameIndex(0);
      });
      _this.on("frameIndexChange.konva", function() {
        this._updated = true;
      });
      _this.on("frameRateChange.konva", function() {
        if (!this.anim.isRunning()) {
          return;
        }
        clearInterval(this.interval);
        this._setInterval();
      });
      return _this;
    }
    Sprite2.prototype._sceneFunc = function(context) {
      var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), x = set[ix4 + 0], y = set[ix4 + 1], width = set[ix4 + 2], height = set[ix4 + 3], image = this.image();
      if (this.hasFill() || this.hasStroke()) {
        context.beginPath();
        context.rect(0, 0, width, height);
        context.closePath();
        context.fillStrokeShape(this);
      }
      if (image) {
        if (offsets) {
          var offset = offsets[anim], ix2 = index * 2;
          context.drawImage(image, x, y, width, height, offset[ix2 + 0], offset[ix2 + 1], width, height);
        } else {
          context.drawImage(image, x, y, width, height, 0, 0, width, height);
        }
      }
    };
    Sprite2.prototype._hitFunc = function(context) {
      var anim = this.animation(), index = this.frameIndex(), ix4 = index * 4, set = this.animations()[anim], offsets = this.frameOffsets(), width = set[ix4 + 2], height = set[ix4 + 3];
      context.beginPath();
      if (offsets) {
        var offset = offsets[anim];
        var ix2 = index * 2;
        context.rect(offset[ix2 + 0], offset[ix2 + 1], width, height);
      } else {
        context.rect(0, 0, width, height);
      }
      context.closePath();
      context.fillShape(this);
    };
    Sprite2.prototype._useBufferCanvas = function() {
      return _super.prototype._useBufferCanvas.call(this, true);
    };
    Sprite2.prototype._setInterval = function() {
      var that = this;
      this.interval = setInterval(function() {
        that._updateIndex();
      }, 1e3 / this.frameRate());
    };
    Sprite2.prototype.start = function() {
      if (this.isRunning()) {
        return;
      }
      var layer = this.getLayer();
      this.anim.setLayers(layer);
      this._setInterval();
      this.anim.start();
    };
    Sprite2.prototype.stop = function() {
      this.anim.stop();
      clearInterval(this.interval);
    };
    Sprite2.prototype.isRunning = function() {
      return this.anim.isRunning();
    };
    Sprite2.prototype._updateIndex = function() {
      var index = this.frameIndex(), animation = this.animation(), animations = this.animations(), anim = animations[animation], len = anim.length / 4;
      if (index < len - 1) {
        this.frameIndex(index + 1);
      } else {
        this.frameIndex(0);
      }
    };
    return Sprite2;
  }(Shape_1.Shape);
  exports.Sprite = Sprite;
  Sprite.prototype.className = "Sprite";
  Global._registerNode(Sprite);
  Factory.Factory.addGetterSetter(Sprite, "animation");
  Factory.Factory.addGetterSetter(Sprite, "animations");
  Factory.Factory.addGetterSetter(Sprite, "frameOffsets");
  Factory.Factory.addGetterSetter(Sprite, "image");
  Factory.Factory.addGetterSetter(Sprite, "frameIndex", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Sprite, "frameRate", 17, Validators.getNumberValidator());
  Factory.Factory.backCompat(Sprite, {
    index: "frameIndex",
    getIndex: "getFrameIndex",
    setIndex: "setFrameIndex"
  });
  Util.Collection.mapMethods(Sprite);
});
var Star_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Star = void 0;
  var Star = function(_super) {
    __extends(Star2, _super);
    function Star2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Star2.prototype._sceneFunc = function(context) {
      var innerRadius = this.innerRadius(), outerRadius = this.outerRadius(), numPoints = this.numPoints();
      context.beginPath();
      context.moveTo(0, 0 - outerRadius);
      for (var n = 1; n < numPoints * 2; n++) {
        var radius = n % 2 === 0 ? outerRadius : innerRadius;
        var x = radius * Math.sin(n * Math.PI / numPoints);
        var y = -1 * radius * Math.cos(n * Math.PI / numPoints);
        context.lineTo(x, y);
      }
      context.closePath();
      context.fillStrokeShape(this);
    };
    Star2.prototype.getWidth = function() {
      return this.outerRadius() * 2;
    };
    Star2.prototype.getHeight = function() {
      return this.outerRadius() * 2;
    };
    Star2.prototype.setWidth = function(width) {
      this.outerRadius(width / 2);
    };
    Star2.prototype.setHeight = function(height) {
      this.outerRadius(height / 2);
    };
    return Star2;
  }(Shape_1.Shape);
  exports.Star = Star;
  Star.prototype.className = "Star";
  Star.prototype._centroid = true;
  Star.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"];
  Global._registerNode(Star);
  Factory.Factory.addGetterSetter(Star, "numPoints", 5, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Star, "innerRadius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Star, "outerRadius", 0, Validators.getNumberValidator());
  Util.Collection.mapMethods(Star);
});
var Text_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Text = exports.stringToArray = void 0;
  var Global_2 = Global;
  function stringToArray(string) {
    return Array.from(string);
  }
  exports.stringToArray = stringToArray;
  var AUTO = "auto", CENTER = "center", JUSTIFY = "justify", CHANGE_KONVA = "Change.konva", CONTEXT_2D = "2d", DASH = "-", LEFT = "left", TEXT = "text", TEXT_UPPER = "Text", TOP = "top", BOTTOM = "bottom", MIDDLE = "middle", NORMAL = "normal", PX_SPACE = "px ", SPACE = " ", RIGHT = "right", WORD = "word", CHAR = "char", NONE = "none", ELLIPSIS = "…", ATTR_CHANGE_LIST = [
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontVariant",
    "padding",
    "align",
    "verticalAlign",
    "lineHeight",
    "text",
    "width",
    "height",
    "wrap",
    "ellipsis",
    "letterSpacing"
  ], attrChangeListLen = ATTR_CHANGE_LIST.length;
  function normalizeFontFamily(fontFamily) {
    return fontFamily.split(",").map(function(family) {
      family = family.trim();
      var hasSpace = family.indexOf(" ") >= 0;
      var hasQuotes = family.indexOf('"') >= 0 || family.indexOf("'") >= 0;
      if (hasSpace && !hasQuotes) {
        family = '"' + family + '"';
      }
      return family;
    }).join(", ");
  }
  var dummyContext;
  function getDummyContext() {
    if (dummyContext) {
      return dummyContext;
    }
    dummyContext = Util.Util.createCanvasElement().getContext(CONTEXT_2D);
    return dummyContext;
  }
  function _fillFunc(context) {
    context.fillText(this._partialText, this._partialTextX, this._partialTextY);
  }
  function _strokeFunc(context) {
    context.strokeText(this._partialText, this._partialTextX, this._partialTextY);
  }
  function checkDefaultFill(config) {
    config = config || {};
    if (!config.fillLinearGradientColorStops && !config.fillRadialGradientColorStops && !config.fillPatternImage) {
      config.fill = config.fill || "black";
    }
    return config;
  }
  var Text = function(_super) {
    __extends(Text2, _super);
    function Text2(config) {
      var _this = _super.call(this, checkDefaultFill(config)) || this;
      _this._partialTextX = 0;
      _this._partialTextY = 0;
      for (var n = 0; n < attrChangeListLen; n++) {
        _this.on(ATTR_CHANGE_LIST[n] + CHANGE_KONVA, _this._setTextData);
      }
      _this._setTextData();
      return _this;
    }
    Text2.prototype._sceneFunc = function(context) {
      var textArr = this.textArr, textArrLen = textArr.length;
      if (!this.text()) {
        return;
      }
      var padding = this.padding(), fontSize = this.fontSize(), lineHeightPx = this.lineHeight() * fontSize, verticalAlign = this.verticalAlign(), alignY = 0, align = this.align(), totalWidth = this.getWidth(), letterSpacing = this.letterSpacing(), fill = this.fill(), textDecoration = this.textDecoration(), shouldUnderline = textDecoration.indexOf("underline") !== -1, shouldLineThrough = textDecoration.indexOf("line-through") !== -1, n;
      var translateY = 0;
      var translateY = lineHeightPx / 2;
      var lineTranslateX = 0;
      var lineTranslateY = 0;
      context.setAttr("font", this._getContextFont());
      context.setAttr("textBaseline", MIDDLE);
      context.setAttr("textAlign", LEFT);
      if (verticalAlign === MIDDLE) {
        alignY = (this.getHeight() - textArrLen * lineHeightPx - padding * 2) / 2;
      } else if (verticalAlign === BOTTOM) {
        alignY = this.getHeight() - textArrLen * lineHeightPx - padding * 2;
      }
      context.translate(padding, alignY + padding);
      for (n = 0; n < textArrLen; n++) {
        var lineTranslateX = 0;
        var lineTranslateY = 0;
        var obj = textArr[n], text = obj.text, width = obj.width, lastLine = n !== textArrLen - 1, spacesNumber, oneWord, lineWidth;
        context.save();
        if (align === RIGHT) {
          lineTranslateX += totalWidth - width - padding * 2;
        } else if (align === CENTER) {
          lineTranslateX += (totalWidth - width - padding * 2) / 2;
        }
        if (shouldUnderline) {
          context.save();
          context.beginPath();
          context.moveTo(lineTranslateX, translateY + lineTranslateY + Math.round(fontSize / 2));
          spacesNumber = text.split(" ").length - 1;
          oneWord = spacesNumber === 0;
          lineWidth = align === JUSTIFY && lastLine && !oneWord ? totalWidth - padding * 2 : width;
          context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY + Math.round(fontSize / 2));
          context.lineWidth = fontSize / 15;
          context.strokeStyle = fill;
          context.stroke();
          context.restore();
        }
        if (shouldLineThrough) {
          context.save();
          context.beginPath();
          context.moveTo(lineTranslateX, translateY + lineTranslateY);
          spacesNumber = text.split(" ").length - 1;
          oneWord = spacesNumber === 0;
          lineWidth = align === JUSTIFY && lastLine && !oneWord ? totalWidth - padding * 2 : width;
          context.lineTo(lineTranslateX + Math.round(lineWidth), translateY + lineTranslateY);
          context.lineWidth = fontSize / 15;
          context.strokeStyle = fill;
          context.stroke();
          context.restore();
        }
        if (letterSpacing !== 0 || align === JUSTIFY) {
          spacesNumber = text.split(" ").length - 1;
          var array = stringToArray(text);
          for (var li = 0; li < array.length; li++) {
            var letter = array[li];
            if (letter === " " && n !== textArrLen - 1 && align === JUSTIFY) {
              lineTranslateX += (totalWidth - padding * 2 - width) / spacesNumber;
            }
            this._partialTextX = lineTranslateX;
            this._partialTextY = translateY + lineTranslateY;
            this._partialText = letter;
            context.fillStrokeShape(this);
            lineTranslateX += this.measureSize(letter).width + letterSpacing;
          }
        } else {
          this._partialTextX = lineTranslateX;
          this._partialTextY = translateY + lineTranslateY;
          this._partialText = text;
          context.fillStrokeShape(this);
        }
        context.restore();
        if (textArrLen > 1) {
          translateY += lineHeightPx;
        }
      }
    };
    Text2.prototype._hitFunc = function(context) {
      var width = this.getWidth(), height = this.getHeight();
      context.beginPath();
      context.rect(0, 0, width, height);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Text2.prototype.setText = function(text) {
      var str = Util.Util._isString(text) ? text : text === null || text === void 0 ? "" : text + "";
      this._setAttr(TEXT, str);
      return this;
    };
    Text2.prototype.getWidth = function() {
      var isAuto = this.attrs.width === AUTO || this.attrs.width === void 0;
      return isAuto ? this.getTextWidth() + this.padding() * 2 : this.attrs.width;
    };
    Text2.prototype.getHeight = function() {
      var isAuto = this.attrs.height === AUTO || this.attrs.height === void 0;
      return isAuto ? this.fontSize() * this.textArr.length * this.lineHeight() + this.padding() * 2 : this.attrs.height;
    };
    Text2.prototype.getTextWidth = function() {
      return this.textWidth;
    };
    Text2.prototype.getTextHeight = function() {
      Util.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
      return this.textHeight;
    };
    Text2.prototype.measureSize = function(text) {
      var _context = getDummyContext(), fontSize = this.fontSize(), metrics;
      _context.save();
      _context.font = this._getContextFont();
      metrics = _context.measureText(text);
      _context.restore();
      return {
        width: metrics.width,
        height: fontSize
      };
    };
    Text2.prototype._getContextFont = function() {
      if (Global.Konva.UA.isIE) {
        return this.fontStyle() + SPACE + this.fontSize() + PX_SPACE + this.fontFamily();
      }
      return this.fontStyle() + SPACE + this.fontVariant() + SPACE + (this.fontSize() + PX_SPACE) + normalizeFontFamily(this.fontFamily());
    };
    Text2.prototype._addTextLine = function(line) {
      if (this.align() === JUSTIFY) {
        line = line.trim();
      }
      var width = this._getTextWidth(line);
      return this.textArr.push({text: line, width});
    };
    Text2.prototype._getTextWidth = function(text) {
      var letterSpacing = this.letterSpacing();
      var length = text.length;
      return getDummyContext().measureText(text).width + (length ? letterSpacing * (length - 1) : 0);
    };
    Text2.prototype._setTextData = function() {
      var lines = this.text().split("\n"), fontSize = +this.fontSize(), textWidth = 0, lineHeightPx = this.lineHeight() * fontSize, width = this.attrs.width, height = this.attrs.height, fixedWidth = width !== AUTO && width !== void 0, fixedHeight = height !== AUTO && height !== void 0, padding = this.padding(), maxWidth = width - padding * 2, maxHeightPx = height - padding * 2, currentHeightPx = 0, wrap = this.wrap(), shouldWrap = wrap !== NONE, wrapAtWord = wrap !== CHAR && shouldWrap, shouldAddEllipsis = this.ellipsis();
      this.textArr = [];
      getDummyContext().font = this._getContextFont();
      var additionalWidth = shouldAddEllipsis ? this._getTextWidth(ELLIPSIS) : 0;
      for (var i = 0, max = lines.length; i < max; ++i) {
        var line = lines[i];
        var lineWidth = this._getTextWidth(line);
        if (fixedWidth && lineWidth > maxWidth) {
          while (line.length > 0) {
            var low = 0, high = line.length, match = "", matchWidth = 0;
            while (low < high) {
              var mid = low + high >>> 1, substr = line.slice(0, mid + 1), substrWidth = this._getTextWidth(substr) + additionalWidth;
              if (substrWidth <= maxWidth) {
                low = mid + 1;
                match = substr;
                matchWidth = substrWidth;
              } else {
                high = mid;
              }
            }
            if (match) {
              if (wrapAtWord) {
                var wrapIndex;
                var nextChar = line[match.length];
                var nextIsSpaceOrDash = nextChar === SPACE || nextChar === DASH;
                if (nextIsSpaceOrDash && matchWidth <= maxWidth) {
                  wrapIndex = match.length;
                } else {
                  wrapIndex = Math.max(match.lastIndexOf(SPACE), match.lastIndexOf(DASH)) + 1;
                }
                if (wrapIndex > 0) {
                  low = wrapIndex;
                  match = match.slice(0, low);
                  matchWidth = this._getTextWidth(match);
                }
              }
              match = match.trimRight();
              this._addTextLine(match);
              textWidth = Math.max(textWidth, matchWidth);
              currentHeightPx += lineHeightPx;
              if (!shouldWrap || fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
                var lastLine = this.textArr[this.textArr.length - 1];
                if (lastLine) {
                  if (shouldAddEllipsis) {
                    var haveSpace = this._getTextWidth(lastLine.text + ELLIPSIS) < maxWidth;
                    if (!haveSpace) {
                      lastLine.text = lastLine.text.slice(0, lastLine.text.length - 3);
                    }
                    this.textArr.splice(this.textArr.length - 1, 1);
                    this._addTextLine(lastLine.text + ELLIPSIS);
                  }
                }
                break;
              }
              line = line.slice(low);
              line = line.trimLeft();
              if (line.length > 0) {
                lineWidth = this._getTextWidth(line);
                if (lineWidth <= maxWidth) {
                  this._addTextLine(line);
                  currentHeightPx += lineHeightPx;
                  textWidth = Math.max(textWidth, lineWidth);
                  break;
                }
              }
            } else {
              break;
            }
          }
        } else {
          this._addTextLine(line);
          currentHeightPx += lineHeightPx;
          textWidth = Math.max(textWidth, lineWidth);
        }
        if (fixedHeight && currentHeightPx + lineHeightPx > maxHeightPx) {
          break;
        }
      }
      this.textHeight = fontSize;
      this.textWidth = textWidth;
    };
    Text2.prototype.getStrokeScaleEnabled = function() {
      return true;
    };
    return Text2;
  }(Shape_1.Shape);
  exports.Text = Text;
  Text.prototype._fillFunc = _fillFunc;
  Text.prototype._strokeFunc = _strokeFunc;
  Text.prototype.className = TEXT_UPPER;
  Text.prototype._attrsAffectingSize = [
    "text",
    "fontSize",
    "padding",
    "wrap",
    "lineHeight",
    "letterSpacing"
  ];
  Global_2._registerNode(Text);
  Factory.Factory.overWriteSetter(Text, "width", Validators.getNumberOrAutoValidator());
  Factory.Factory.overWriteSetter(Text, "height", Validators.getNumberOrAutoValidator());
  Factory.Factory.addGetterSetter(Text, "fontFamily", "Arial");
  Factory.Factory.addGetterSetter(Text, "fontSize", 12, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Text, "fontStyle", NORMAL);
  Factory.Factory.addGetterSetter(Text, "fontVariant", NORMAL);
  Factory.Factory.addGetterSetter(Text, "padding", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Text, "align", LEFT);
  Factory.Factory.addGetterSetter(Text, "verticalAlign", TOP);
  Factory.Factory.addGetterSetter(Text, "lineHeight", 1, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Text, "wrap", WORD);
  Factory.Factory.addGetterSetter(Text, "ellipsis", false, Validators.getBooleanValidator());
  Factory.Factory.addGetterSetter(Text, "letterSpacing", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Text, "text", "", Validators.getStringValidator());
  Factory.Factory.addGetterSetter(Text, "textDecoration", "");
  Util.Collection.mapMethods(Text);
});
var TextPath_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.TextPath = void 0;
  var EMPTY_STRING = "", NORMAL = "normal";
  function _fillFunc(context) {
    context.fillText(this.partialText, 0, 0);
  }
  function _strokeFunc(context) {
    context.strokeText(this.partialText, 0, 0);
  }
  var TextPath = function(_super) {
    __extends(TextPath2, _super);
    function TextPath2(config) {
      var _this = _super.call(this, config) || this;
      _this.dummyCanvas = Util.Util.createCanvasElement();
      _this.dataArray = [];
      _this.dataArray = Path_1.Path.parsePathData(_this.attrs.data);
      _this.on("dataChange.konva", function() {
        this.dataArray = Path_1.Path.parsePathData(this.attrs.data);
        this._setTextData();
      });
      _this.on("textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva", _this._setTextData);
      if (config && config["getKerning"]) {
        Util.Util.warn('getKerning TextPath API is deprecated. Please use "kerningFunc" instead.');
        _this.kerningFunc(config["getKerning"]);
      }
      _this._setTextData();
      return _this;
    }
    TextPath2.prototype._sceneFunc = function(context) {
      context.setAttr("font", this._getContextFont());
      context.setAttr("textBaseline", this.textBaseline());
      context.setAttr("textAlign", "left");
      context.save();
      var textDecoration = this.textDecoration();
      var fill = this.fill();
      var fontSize = this.fontSize();
      var glyphInfo = this.glyphInfo;
      if (textDecoration === "underline") {
        context.beginPath();
      }
      for (var i = 0; i < glyphInfo.length; i++) {
        context.save();
        var p0 = glyphInfo[i].p0;
        context.translate(p0.x, p0.y);
        context.rotate(glyphInfo[i].rotation);
        this.partialText = glyphInfo[i].text;
        context.fillStrokeShape(this);
        if (textDecoration === "underline") {
          if (i === 0) {
            context.moveTo(0, fontSize / 2 + 1);
          }
          context.lineTo(fontSize, fontSize / 2 + 1);
        }
        context.restore();
      }
      if (textDecoration === "underline") {
        context.strokeStyle = fill;
        context.lineWidth = fontSize / 20;
        context.stroke();
      }
      context.restore();
    };
    TextPath2.prototype._hitFunc = function(context) {
      context.beginPath();
      var glyphInfo = this.glyphInfo;
      if (glyphInfo.length >= 1) {
        var p0 = glyphInfo[0].p0;
        context.moveTo(p0.x, p0.y);
      }
      for (var i = 0; i < glyphInfo.length; i++) {
        var p1 = glyphInfo[i].p1;
        context.lineTo(p1.x, p1.y);
      }
      context.setAttr("lineWidth", this.fontSize());
      context.setAttr("strokeStyle", this.colorKey);
      context.stroke();
    };
    TextPath2.prototype.getTextWidth = function() {
      return this.textWidth;
    };
    TextPath2.prototype.getTextHeight = function() {
      Util.Util.warn("text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height.");
      return this.textHeight;
    };
    TextPath2.prototype.setText = function(text) {
      return Text_1.Text.prototype.setText.call(this, text);
    };
    TextPath2.prototype._getContextFont = function() {
      return Text_1.Text.prototype._getContextFont.call(this);
    };
    TextPath2.prototype._getTextSize = function(text) {
      var dummyCanvas = this.dummyCanvas;
      var _context = dummyCanvas.getContext("2d");
      _context.save();
      _context.font = this._getContextFont();
      var metrics = _context.measureText(text);
      _context.restore();
      return {
        width: metrics.width,
        height: parseInt(this.attrs.fontSize, 10)
      };
    };
    TextPath2.prototype._setTextData = function() {
      var that = this;
      var size = this._getTextSize(this.attrs.text);
      var letterSpacing = this.letterSpacing();
      var align = this.align();
      var kerningFunc = this.kerningFunc();
      this.textWidth = size.width;
      this.textHeight = size.height;
      var textFullWidth = Math.max(this.textWidth + ((this.attrs.text || "").length - 1) * letterSpacing, 0);
      this.glyphInfo = [];
      var fullPathWidth = 0;
      for (var l = 0; l < that.dataArray.length; l++) {
        if (that.dataArray[l].pathLength > 0) {
          fullPathWidth += that.dataArray[l].pathLength;
        }
      }
      var offset = 0;
      if (align === "center") {
        offset = Math.max(0, fullPathWidth / 2 - textFullWidth / 2);
      }
      if (align === "right") {
        offset = Math.max(0, fullPathWidth - textFullWidth);
      }
      var charArr = Text_1.stringToArray(this.text());
      var spacesNumber = this.text().split(" ").length - 1;
      var p0, p1, pathCmd;
      var pIndex = -1;
      var currentT = 0;
      var getNextPathSegment = function() {
        currentT = 0;
        var pathData = that.dataArray;
        for (var j = pIndex + 1; j < pathData.length; j++) {
          if (pathData[j].pathLength > 0) {
            pIndex = j;
            return pathData[j];
          } else if (pathData[j].command === "M") {
            p0 = {
              x: pathData[j].points[0],
              y: pathData[j].points[1]
            };
          }
        }
        return {};
      };
      var findSegmentToFitCharacter = function(c) {
        var glyphWidth2 = that._getTextSize(c).width + letterSpacing;
        if (c === " " && align === "justify") {
          glyphWidth2 += (fullPathWidth - textFullWidth) / spacesNumber;
        }
        var currLen = 0;
        var attempts = 0;
        p1 = void 0;
        while (Math.abs(glyphWidth2 - currLen) / glyphWidth2 > 0.01 && attempts < 20) {
          attempts++;
          var cumulativePathLength = currLen;
          while (pathCmd === void 0) {
            pathCmd = getNextPathSegment();
            if (pathCmd && cumulativePathLength + pathCmd.pathLength < glyphWidth2) {
              cumulativePathLength += pathCmd.pathLength;
              pathCmd = void 0;
            }
          }
          if (pathCmd === {} || p0 === void 0) {
            return void 0;
          }
          var needNewSegment = false;
          switch (pathCmd.command) {
            case "L":
              if (Path_1.Path.getLineLength(p0.x, p0.y, pathCmd.points[0], pathCmd.points[1]) > glyphWidth2) {
                p1 = Path_1.Path.getPointOnLine(glyphWidth2, p0.x, p0.y, pathCmd.points[0], pathCmd.points[1], p0.x, p0.y);
              } else {
                pathCmd = void 0;
              }
              break;
            case "A":
              var start = pathCmd.points[4];
              var dTheta = pathCmd.points[5];
              var end = pathCmd.points[4] + dTheta;
              if (currentT === 0) {
                currentT = start + 1e-8;
              } else if (glyphWidth2 > currLen) {
                currentT += Math.PI / 180 * dTheta / Math.abs(dTheta);
              } else {
                currentT -= Math.PI / 360 * dTheta / Math.abs(dTheta);
              }
              if (dTheta < 0 && currentT < end || dTheta >= 0 && currentT > end) {
                currentT = end;
                needNewSegment = true;
              }
              p1 = Path_1.Path.getPointOnEllipticalArc(pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], currentT, pathCmd.points[6]);
              break;
            case "C":
              if (currentT === 0) {
                if (glyphWidth2 > pathCmd.pathLength) {
                  currentT = 1e-8;
                } else {
                  currentT = glyphWidth2 / pathCmd.pathLength;
                }
              } else if (glyphWidth2 > currLen) {
                currentT += (glyphWidth2 - currLen) / pathCmd.pathLength / 2;
              } else {
                currentT = Math.max(currentT - (currLen - glyphWidth2) / pathCmd.pathLength / 2, 0);
              }
              if (currentT > 1) {
                currentT = 1;
                needNewSegment = true;
              }
              p1 = Path_1.Path.getPointOnCubicBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3], pathCmd.points[4], pathCmd.points[5]);
              break;
            case "Q":
              if (currentT === 0) {
                currentT = glyphWidth2 / pathCmd.pathLength;
              } else if (glyphWidth2 > currLen) {
                currentT += (glyphWidth2 - currLen) / pathCmd.pathLength;
              } else {
                currentT -= (currLen - glyphWidth2) / pathCmd.pathLength;
              }
              if (currentT > 1) {
                currentT = 1;
                needNewSegment = true;
              }
              p1 = Path_1.Path.getPointOnQuadraticBezier(currentT, pathCmd.start.x, pathCmd.start.y, pathCmd.points[0], pathCmd.points[1], pathCmd.points[2], pathCmd.points[3]);
              break;
          }
          if (p1 !== void 0) {
            currLen = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
          }
          if (needNewSegment) {
            needNewSegment = false;
            pathCmd = void 0;
          }
        }
      };
      var testChar = "C";
      var glyphWidth = that._getTextSize(testChar).width + letterSpacing;
      var lettersInOffset = offset / glyphWidth - 1;
      for (var k = 0; k < lettersInOffset; k++) {
        findSegmentToFitCharacter(testChar);
        if (p0 === void 0 || p1 === void 0) {
          break;
        }
        p0 = p1;
      }
      for (var i = 0; i < charArr.length; i++) {
        findSegmentToFitCharacter(charArr[i]);
        if (p0 === void 0 || p1 === void 0) {
          break;
        }
        var width = Path_1.Path.getLineLength(p0.x, p0.y, p1.x, p1.y);
        var kern = 0;
        if (kerningFunc) {
          try {
            kern = kerningFunc(charArr[i - 1], charArr[i]) * this.fontSize();
          } catch (e) {
            kern = 0;
          }
        }
        p0.x += kern;
        p1.x += kern;
        this.textWidth += kern;
        var midpoint = Path_1.Path.getPointOnLine(kern + width / 2, p0.x, p0.y, p1.x, p1.y);
        var rotation = Math.atan2(p1.y - p0.y, p1.x - p0.x);
        this.glyphInfo.push({
          transposeX: midpoint.x,
          transposeY: midpoint.y,
          text: charArr[i],
          rotation,
          p0,
          p1
        });
        p0 = p1;
      }
    };
    TextPath2.prototype.getSelfRect = function() {
      if (!this.glyphInfo.length) {
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      var points = [];
      this.glyphInfo.forEach(function(info) {
        points.push(info.p0.x);
        points.push(info.p0.y);
        points.push(info.p1.x);
        points.push(info.p1.y);
      });
      var minX = points[0] || 0;
      var maxX = points[0] || 0;
      var minY = points[1] || 0;
      var maxY = points[1] || 0;
      var x, y;
      for (var i = 0; i < points.length / 2; i++) {
        x = points[i * 2];
        y = points[i * 2 + 1];
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      var fontSize = this.fontSize();
      return {
        x: minX - fontSize / 2,
        y: minY - fontSize / 2,
        width: maxX - minX + fontSize,
        height: maxY - minY + fontSize
      };
    };
    return TextPath2;
  }(Shape_1.Shape);
  exports.TextPath = TextPath;
  TextPath.prototype._fillFunc = _fillFunc;
  TextPath.prototype._strokeFunc = _strokeFunc;
  TextPath.prototype._fillFuncHit = _fillFunc;
  TextPath.prototype._strokeFuncHit = _strokeFunc;
  TextPath.prototype.className = "TextPath";
  TextPath.prototype._attrsAffectingSize = ["text", "fontSize", "data"];
  Global._registerNode(TextPath);
  Factory.Factory.addGetterSetter(TextPath, "data");
  Factory.Factory.addGetterSetter(TextPath, "fontFamily", "Arial");
  Factory.Factory.addGetterSetter(TextPath, "fontSize", 12, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(TextPath, "fontStyle", NORMAL);
  Factory.Factory.addGetterSetter(TextPath, "align", "left");
  Factory.Factory.addGetterSetter(TextPath, "letterSpacing", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(TextPath, "textBaseline", "middle");
  Factory.Factory.addGetterSetter(TextPath, "fontVariant", NORMAL);
  Factory.Factory.addGetterSetter(TextPath, "text", EMPTY_STRING);
  Factory.Factory.addGetterSetter(TextPath, "textDecoration", null);
  Factory.Factory.addGetterSetter(TextPath, "kerningFunc", null);
  Util.Collection.mapMethods(TextPath);
});
var Transformer_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Transformer = void 0;
  var Global_2 = Global;
  var EVENTS_NAME = "tr-konva";
  var ATTR_CHANGE_LIST = [
    "resizeEnabledChange",
    "rotateAnchorOffsetChange",
    "rotateEnabledChange",
    "enabledAnchorsChange",
    "anchorSizeChange",
    "borderEnabledChange",
    "borderStrokeChange",
    "borderStrokeWidthChange",
    "borderDashChange",
    "anchorStrokeChange",
    "anchorStrokeWidthChange",
    "anchorFillChange",
    "anchorCornerRadiusChange",
    "ignoreStrokeChange"
  ].map(function(e) {
    return e + ("." + EVENTS_NAME);
  }).join(" ");
  var NODES_RECT = "nodesRect";
  var TRANSFORM_CHANGE_STR = [
    "widthChange",
    "heightChange",
    "scaleXChange",
    "scaleYChange",
    "skewXChange",
    "skewYChange",
    "rotationChange",
    "offsetXChange",
    "offsetYChange",
    "transformsEnabledChange",
    "strokeWidthChange"
  ].map(function(e) {
    return e + ("." + EVENTS_NAME);
  }).join(" ");
  var ANGLES = {
    "top-left": -45,
    "top-center": 0,
    "top-right": 45,
    "middle-right": -90,
    "middle-left": 90,
    "bottom-left": -135,
    "bottom-center": 180,
    "bottom-right": 135
  };
  var TOUCH_DEVICE = "ontouchstart" in Global.Konva._global;
  function getCursor(anchorName, rad) {
    if (anchorName === "rotater") {
      return "crosshair";
    }
    rad += Util.Util._degToRad(ANGLES[anchorName] || 0);
    var angle = (Util.Util._radToDeg(rad) % 360 + 360) % 360;
    if (Util.Util._inRange(angle, 315 + 22.5, 360) || Util.Util._inRange(angle, 0, 22.5)) {
      return "ns-resize";
    } else if (Util.Util._inRange(angle, 45 - 22.5, 45 + 22.5)) {
      return "nesw-resize";
    } else if (Util.Util._inRange(angle, 90 - 22.5, 90 + 22.5)) {
      return "ew-resize";
    } else if (Util.Util._inRange(angle, 135 - 22.5, 135 + 22.5)) {
      return "nwse-resize";
    } else if (Util.Util._inRange(angle, 180 - 22.5, 180 + 22.5)) {
      return "ns-resize";
    } else if (Util.Util._inRange(angle, 225 - 22.5, 225 + 22.5)) {
      return "nesw-resize";
    } else if (Util.Util._inRange(angle, 270 - 22.5, 270 + 22.5)) {
      return "ew-resize";
    } else if (Util.Util._inRange(angle, 315 - 22.5, 315 + 22.5)) {
      return "nwse-resize";
    } else {
      Util.Util.error("Transformer has unknown angle for cursor detection: " + angle);
      return "pointer";
    }
  }
  var ANCHORS_NAMES = [
    "top-left",
    "top-center",
    "top-right",
    "middle-right",
    "middle-left",
    "bottom-left",
    "bottom-center",
    "bottom-right"
  ];
  var MAX_SAFE_INTEGER = 1e8;
  function getCenter(shape) {
    return {
      x: shape.x + shape.width / 2 * Math.cos(shape.rotation) + shape.height / 2 * Math.sin(-shape.rotation),
      y: shape.y + shape.height / 2 * Math.cos(shape.rotation) + shape.width / 2 * Math.sin(shape.rotation)
    };
  }
  function rotateAroundPoint(shape, angleRad, point) {
    var x = point.x + (shape.x - point.x) * Math.cos(angleRad) - (shape.y - point.y) * Math.sin(angleRad);
    var y = point.y + (shape.x - point.x) * Math.sin(angleRad) + (shape.y - point.y) * Math.cos(angleRad);
    return __assign(__assign({}, shape), {
      rotation: shape.rotation + angleRad,
      x,
      y
    });
  }
  function rotateAroundCenter(shape, deltaRad) {
    var center = getCenter(shape);
    return rotateAroundPoint(shape, deltaRad, center);
  }
  function getSnap(snaps, newRotationRad, tol) {
    var snapped = newRotationRad;
    for (var i = 0; i < snaps.length; i++) {
      var angle = Global.Konva.getAngle(snaps[i]);
      var absDiff = Math.abs(angle - newRotationRad) % (Math.PI * 2);
      var dif = Math.min(absDiff, Math.PI * 2 - absDiff);
      if (dif < tol) {
        snapped = angle;
      }
    }
    return snapped;
  }
  var Transformer = function(_super) {
    __extends(Transformer2, _super);
    function Transformer2(config) {
      var _this = _super.call(this, config) || this;
      _this._transforming = false;
      _this._createElements();
      _this._handleMouseMove = _this._handleMouseMove.bind(_this);
      _this._handleMouseUp = _this._handleMouseUp.bind(_this);
      _this.update = _this.update.bind(_this);
      _this.on(ATTR_CHANGE_LIST, _this.update);
      if (_this.getNode()) {
        _this.update();
      }
      return _this;
    }
    Transformer2.prototype.attachTo = function(node) {
      this.setNode(node);
      return this;
    };
    Transformer2.prototype.setNode = function(node) {
      Util.Util.warn("tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead.");
      return this.setNodes([node]);
    };
    Transformer2.prototype.getNode = function() {
      return this._nodes && this._nodes[0];
    };
    Transformer2.prototype.setNodes = function(nodes) {
      var _this = this;
      if (nodes === void 0) {
        nodes = [];
      }
      if (this._nodes && this._nodes.length) {
        this.detach();
      }
      this._nodes = nodes;
      if (nodes.length === 1) {
        this.rotation(nodes[0].getAbsoluteRotation());
      } else {
        this.rotation(0);
      }
      this._nodes.forEach(function(node) {
        var additionalEvents = node._attrsAffectingSize.map(function(prop) {
          return prop + "Change." + EVENTS_NAME;
        }).join(" ");
        var onChange = function() {
          if (_this.nodes().length === 1) {
            _this.rotation(_this.nodes()[0].getAbsoluteRotation());
          }
          _this._resetTransformCache();
          if (!_this._transforming && !_this.isDragging()) {
            _this.update();
          }
        };
        node.on(additionalEvents, onChange);
        node.on(TRANSFORM_CHANGE_STR, onChange);
        node.on("_clearTransformCache." + EVENTS_NAME, onChange);
        node.on("xChange." + EVENTS_NAME + " yChange." + EVENTS_NAME, onChange);
        _this._proxyDrag(node);
      });
      this._resetTransformCache();
      var elementsCreated = !!this.findOne(".top-left");
      if (elementsCreated) {
        this.update();
      }
      return this;
    };
    Transformer2.prototype._proxyDrag = function(node) {
      var _this = this;
      var lastPos;
      node.on("dragstart." + EVENTS_NAME, function(e) {
        lastPos = node.getAbsolutePosition();
        if (!_this.isDragging() && node !== _this.findOne(".back")) {
          _this.startDrag(e, false);
        }
      });
      node.on("dragmove." + EVENTS_NAME, function(e) {
        if (!lastPos) {
          return;
        }
        var abs = node.getAbsolutePosition();
        var dx = abs.x - lastPos.x;
        var dy = abs.y - lastPos.y;
        _this.nodes().forEach(function(otherNode) {
          if (otherNode === node) {
            return;
          }
          if (otherNode.isDragging()) {
            return;
          }
          var otherAbs = otherNode.getAbsolutePosition();
          otherNode.setAbsolutePosition({
            x: otherAbs.x + dx,
            y: otherAbs.y + dy
          });
          otherNode.startDrag(e);
        });
        lastPos = null;
      });
    };
    Transformer2.prototype.getNodes = function() {
      return this._nodes || [];
    };
    Transformer2.prototype.getActiveAnchor = function() {
      return this._movingAnchorName;
    };
    Transformer2.prototype.detach = function() {
      if (this._nodes) {
        this._nodes.forEach(function(node) {
          node.off("." + EVENTS_NAME);
        });
      }
      this._nodes = [];
      this._resetTransformCache();
    };
    Transformer2.prototype._resetTransformCache = function() {
      this._clearCache(NODES_RECT);
      this._clearCache("transform");
      this._clearSelfAndDescendantCache("absoluteTransform");
    };
    Transformer2.prototype._getNodeRect = function() {
      return this._getCache(NODES_RECT, this.__getNodeRect);
    };
    Transformer2.prototype.__getNodeShape = function(node, rot, relative) {
      if (rot === void 0) {
        rot = this.rotation();
      }
      var rect = node.getClientRect({
        skipTransform: true,
        skipShadow: true,
        skipStroke: this.ignoreStroke()
      });
      var absScale = node.getAbsoluteScale(relative);
      var absPos = node.getAbsolutePosition(relative);
      var dx = rect.x * absScale.x - node.offsetX() * absScale.x;
      var dy = rect.y * absScale.y - node.offsetY() * absScale.y;
      var rotation = (Global.Konva.getAngle(node.getAbsoluteRotation()) + Math.PI * 2) % (Math.PI * 2);
      var box = {
        x: absPos.x + dx * Math.cos(rotation) + dy * Math.sin(-rotation),
        y: absPos.y + dy * Math.cos(rotation) + dx * Math.sin(rotation),
        width: rect.width * absScale.x,
        height: rect.height * absScale.y,
        rotation
      };
      return rotateAroundPoint(box, -Global.Konva.getAngle(rot), {
        x: 0,
        y: 0
      });
    };
    Transformer2.prototype.__getNodeRect = function() {
      var _this = this;
      var node = this.getNode();
      if (!node) {
        return {
          x: -MAX_SAFE_INTEGER,
          y: -MAX_SAFE_INTEGER,
          width: 0,
          height: 0,
          rotation: 0
        };
      }
      var totalPoints = [];
      this.nodes().map(function(node2) {
        var box = node2.getClientRect({
          skipTransform: true,
          skipShadow: true,
          skipStroke: _this.ignoreStroke()
        });
        var points = [
          {x: box.x, y: box.y},
          {x: box.x + box.width, y: box.y},
          {x: box.x + box.width, y: box.y + box.height},
          {x: box.x, y: box.y + box.height}
        ];
        var trans = node2.getAbsoluteTransform();
        points.forEach(function(point) {
          var transformed = trans.point(point);
          totalPoints.push(transformed);
        });
      });
      var tr = new Util.Transform();
      tr.rotate(-Global.Konva.getAngle(this.rotation()));
      var minX, minY, maxX, maxY;
      totalPoints.forEach(function(point) {
        var transformed = tr.point(point);
        if (minX === void 0) {
          minX = maxX = transformed.x;
          minY = maxY = transformed.y;
        }
        minX = Math.min(minX, transformed.x);
        minY = Math.min(minY, transformed.y);
        maxX = Math.max(maxX, transformed.x);
        maxY = Math.max(maxY, transformed.y);
      });
      tr.invert();
      var p = tr.point({x: minX, y: minY});
      return {
        x: p.x,
        y: p.y,
        width: maxX - minX,
        height: maxY - minY,
        rotation: Global.Konva.getAngle(this.rotation())
      };
    };
    Transformer2.prototype.getX = function() {
      return this._getNodeRect().x;
    };
    Transformer2.prototype.getY = function() {
      return this._getNodeRect().y;
    };
    Transformer2.prototype.getWidth = function() {
      return this._getNodeRect().width;
    };
    Transformer2.prototype.getHeight = function() {
      return this._getNodeRect().height;
    };
    Transformer2.prototype._createElements = function() {
      this._createBack();
      ANCHORS_NAMES.forEach(function(name) {
        this._createAnchor(name);
      }.bind(this));
      this._createAnchor("rotater");
    };
    Transformer2.prototype._createAnchor = function(name) {
      var _this = this;
      var anchor = new Rect_1.Rect({
        stroke: "rgb(0, 161, 255)",
        fill: "white",
        strokeWidth: 1,
        name: name + " _anchor",
        dragDistance: 0,
        draggable: true,
        hitStrokeWidth: TOUCH_DEVICE ? 10 : "auto"
      });
      var self2 = this;
      anchor.on("mousedown touchstart", function(e) {
        self2._handleMouseDown(e);
      });
      anchor.on("dragstart", function(e) {
        anchor.stopDrag();
        e.cancelBubble = true;
      });
      anchor.on("dragend", function(e) {
        e.cancelBubble = true;
      });
      anchor.on("mouseenter", function() {
        var rad = Global.Konva.getAngle(_this.rotation());
        var cursor = getCursor(name, rad);
        anchor.getStage().content.style.cursor = cursor;
        _this._cursorChange = true;
      });
      anchor.on("mouseout", function() {
        anchor.getStage().content.style.cursor = "";
        _this._cursorChange = false;
      });
      this.add(anchor);
    };
    Transformer2.prototype._createBack = function() {
      var _this = this;
      var back = new Shape_1.Shape({
        name: "back",
        width: 0,
        height: 0,
        draggable: true,
        sceneFunc: function(ctx) {
          var tr = this.getParent();
          var padding = tr.padding();
          ctx.beginPath();
          ctx.rect(-padding, -padding, this.width() + padding * 2, this.height() + padding * 2);
          ctx.moveTo(this.width() / 2, -padding);
          if (tr.rotateEnabled()) {
            ctx.lineTo(this.width() / 2, -tr.rotateAnchorOffset() * Util.Util._sign(this.height()) - padding);
          }
          ctx.fillStrokeShape(this);
        },
        hitFunc: function(ctx, shape) {
          if (!_this.shouldOverdrawWholeArea()) {
            return;
          }
          var padding = _this.padding();
          ctx.beginPath();
          ctx.rect(-padding, -padding, shape.width() + padding * 2, shape.height() + padding * 2);
          ctx.fillStrokeShape(shape);
        }
      });
      this.add(back);
      this._proxyDrag(back);
      back.on("dragstart", function(e) {
        e.cancelBubble = true;
      });
      back.on("dragmove", function(e) {
        e.cancelBubble = true;
      });
      back.on("dragend", function(e) {
        e.cancelBubble = true;
      });
    };
    Transformer2.prototype._handleMouseDown = function(e) {
      this._movingAnchorName = e.target.name().split(" ")[0];
      var attrs = this._getNodeRect();
      var width = attrs.width;
      var height = attrs.height;
      var hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      this.sin = Math.abs(height / hypotenuse);
      this.cos = Math.abs(width / hypotenuse);
      window.addEventListener("mousemove", this._handleMouseMove);
      window.addEventListener("touchmove", this._handleMouseMove);
      window.addEventListener("mouseup", this._handleMouseUp, true);
      window.addEventListener("touchend", this._handleMouseUp, true);
      this._transforming = true;
      var ap = e.target.getAbsolutePosition();
      var pos = e.target.getStage().getPointerPosition();
      this._anchorDragOffset = {
        x: pos.x - ap.x,
        y: pos.y - ap.y
      };
      this._fire("transformstart", {evt: e, target: this.getNode()});
      this._nodes.forEach(function(target) {
        target._fire("transformstart", {evt: e, target});
      });
    };
    Transformer2.prototype._handleMouseMove = function(e) {
      var x, y, newHypotenuse;
      var anchorNode = this.findOne("." + this._movingAnchorName);
      var stage = anchorNode.getStage();
      stage.setPointersPositions(e);
      var pp = stage.getPointerPosition();
      var newNodePos = {
        x: pp.x - this._anchorDragOffset.x,
        y: pp.y - this._anchorDragOffset.y
      };
      var oldAbs = anchorNode.getAbsolutePosition();
      anchorNode.setAbsolutePosition(newNodePos);
      var newAbs = anchorNode.getAbsolutePosition();
      if (oldAbs.x === newAbs.x && oldAbs.y === newAbs.y) {
        return;
      }
      if (this._movingAnchorName === "rotater") {
        var attrs = this._getNodeRect();
        x = anchorNode.x() - attrs.width / 2;
        y = -anchorNode.y() + attrs.height / 2;
        var delta = Math.atan2(-y, x) + Math.PI / 2;
        if (attrs.height < 0) {
          delta -= Math.PI;
        }
        var oldRotation = Global.Konva.getAngle(this.rotation());
        var newRotation = oldRotation + delta;
        var tol = Global.Konva.getAngle(this.rotationSnapTolerance());
        var snappedRot = getSnap(this.rotationSnaps(), newRotation, tol);
        var diff = snappedRot - attrs.rotation;
        var shape = rotateAroundCenter(attrs, diff);
        this._fitNodesInto(shape, e);
        return;
      }
      var keepProportion = this.keepRatio() || e.shiftKey;
      var centeredScaling = this.centeredScaling() || e.altKey;
      if (this._movingAnchorName === "top-left") {
        if (keepProportion) {
          var comparePoint = centeredScaling ? {
            x: this.width() / 2,
            y: this.height() / 2
          } : {
            x: this.findOne(".bottom-right").x(),
            y: this.findOne(".bottom-right").y()
          };
          newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
          var reverseX = this.findOne(".top-left").x() > comparePoint.x ? -1 : 1;
          var reverseY = this.findOne(".top-left").y() > comparePoint.y ? -1 : 1;
          x = newHypotenuse * this.cos * reverseX;
          y = newHypotenuse * this.sin * reverseY;
          this.findOne(".top-left").x(comparePoint.x - x);
          this.findOne(".top-left").y(comparePoint.y - y);
        }
      } else if (this._movingAnchorName === "top-center") {
        this.findOne(".top-left").y(anchorNode.y());
      } else if (this._movingAnchorName === "top-right") {
        if (keepProportion) {
          var comparePoint = centeredScaling ? {
            x: this.width() / 2,
            y: this.height() / 2
          } : {
            x: this.findOne(".bottom-left").x(),
            y: this.findOne(".bottom-left").y()
          };
          newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(comparePoint.y - anchorNode.y(), 2));
          var reverseX = this.findOne(".top-right").x() < comparePoint.x ? -1 : 1;
          var reverseY = this.findOne(".top-right").y() > comparePoint.y ? -1 : 1;
          x = newHypotenuse * this.cos * reverseX;
          y = newHypotenuse * this.sin * reverseY;
          this.findOne(".top-right").x(comparePoint.x + x);
          this.findOne(".top-right").y(comparePoint.y - y);
        }
        var pos = anchorNode.position();
        this.findOne(".top-left").y(pos.y);
        this.findOne(".bottom-right").x(pos.x);
      } else if (this._movingAnchorName === "middle-left") {
        this.findOne(".top-left").x(anchorNode.x());
      } else if (this._movingAnchorName === "middle-right") {
        this.findOne(".bottom-right").x(anchorNode.x());
      } else if (this._movingAnchorName === "bottom-left") {
        if (keepProportion) {
          var comparePoint = centeredScaling ? {
            x: this.width() / 2,
            y: this.height() / 2
          } : {
            x: this.findOne(".top-right").x(),
            y: this.findOne(".top-right").y()
          };
          newHypotenuse = Math.sqrt(Math.pow(comparePoint.x - anchorNode.x(), 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
          var reverseX = comparePoint.x < anchorNode.x() ? -1 : 1;
          var reverseY = anchorNode.y() < comparePoint.y ? -1 : 1;
          x = newHypotenuse * this.cos * reverseX;
          y = newHypotenuse * this.sin * reverseY;
          anchorNode.x(comparePoint.x - x);
          anchorNode.y(comparePoint.y + y);
        }
        pos = anchorNode.position();
        this.findOne(".top-left").x(pos.x);
        this.findOne(".bottom-right").y(pos.y);
      } else if (this._movingAnchorName === "bottom-center") {
        this.findOne(".bottom-right").y(anchorNode.y());
      } else if (this._movingAnchorName === "bottom-right") {
        if (keepProportion) {
          var comparePoint = centeredScaling ? {
            x: this.width() / 2,
            y: this.height() / 2
          } : {
            x: this.findOne(".top-left").x(),
            y: this.findOne(".top-left").y()
          };
          newHypotenuse = Math.sqrt(Math.pow(anchorNode.x() - comparePoint.x, 2) + Math.pow(anchorNode.y() - comparePoint.y, 2));
          var reverseX = this.findOne(".bottom-right").x() < comparePoint.x ? -1 : 1;
          var reverseY = this.findOne(".bottom-right").y() < comparePoint.y ? -1 : 1;
          x = newHypotenuse * this.cos * reverseX;
          y = newHypotenuse * this.sin * reverseY;
          this.findOne(".bottom-right").x(comparePoint.x + x);
          this.findOne(".bottom-right").y(comparePoint.y + y);
        }
      } else {
        console.error(new Error("Wrong position argument of selection resizer: " + this._movingAnchorName));
      }
      var centeredScaling = this.centeredScaling() || e.altKey;
      if (centeredScaling) {
        var topLeft = this.findOne(".top-left");
        var bottomRight = this.findOne(".bottom-right");
        var topOffsetX = topLeft.x();
        var topOffsetY = topLeft.y();
        var bottomOffsetX = this.getWidth() - bottomRight.x();
        var bottomOffsetY = this.getHeight() - bottomRight.y();
        bottomRight.move({
          x: -topOffsetX,
          y: -topOffsetY
        });
        topLeft.move({
          x: bottomOffsetX,
          y: bottomOffsetY
        });
      }
      var absPos = this.findOne(".top-left").getAbsolutePosition();
      x = absPos.x;
      y = absPos.y;
      var width = this.findOne(".bottom-right").x() - this.findOne(".top-left").x();
      var height = this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
      this._fitNodesInto({
        x,
        y,
        width,
        height,
        rotation: Global.Konva.getAngle(this.rotation())
      }, e);
    };
    Transformer2.prototype._handleMouseUp = function(e) {
      this._removeEvents(e);
    };
    Transformer2.prototype.getAbsoluteTransform = function() {
      return this.getTransform();
    };
    Transformer2.prototype._removeEvents = function(e) {
      if (this._transforming) {
        this._transforming = false;
        window.removeEventListener("mousemove", this._handleMouseMove);
        window.removeEventListener("touchmove", this._handleMouseMove);
        window.removeEventListener("mouseup", this._handleMouseUp, true);
        window.removeEventListener("touchend", this._handleMouseUp, true);
        var node = this.getNode();
        this._fire("transformend", {evt: e, target: node});
        if (node) {
          this._nodes.forEach(function(target) {
            target._fire("transformend", {evt: e, target});
          });
        }
        this._movingAnchorName = null;
      }
    };
    Transformer2.prototype._fitNodesInto = function(newAttrs, evt) {
      var _this = this;
      var oldAttrs = this._getNodeRect();
      var minSize = 1;
      if (Util.Util._inRange(newAttrs.width, -this.padding() * 2 - minSize, minSize)) {
        this.update();
        return;
      }
      if (Util.Util._inRange(newAttrs.height, -this.padding() * 2 - minSize, minSize)) {
        this.update();
        return;
      }
      var t = new Util.Transform();
      t.rotate(Global.Konva.getAngle(this.rotation()));
      if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("left") >= 0) {
        var offset = t.point({
          x: -this.padding() * 2,
          y: 0
        });
        newAttrs.x += offset.x;
        newAttrs.y += offset.y;
        newAttrs.width += this.padding() * 2;
        this._movingAnchorName = this._movingAnchorName.replace("left", "right");
        this._anchorDragOffset.x -= offset.x;
        this._anchorDragOffset.y -= offset.y;
      } else if (this._movingAnchorName && newAttrs.width < 0 && this._movingAnchorName.indexOf("right") >= 0) {
        var offset = t.point({
          x: this.padding() * 2,
          y: 0
        });
        this._movingAnchorName = this._movingAnchorName.replace("right", "left");
        this._anchorDragOffset.x -= offset.x;
        this._anchorDragOffset.y -= offset.y;
        newAttrs.width += this.padding() * 2;
      }
      if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("top") >= 0) {
        var offset = t.point({
          x: 0,
          y: -this.padding() * 2
        });
        newAttrs.x += offset.x;
        newAttrs.y += offset.y;
        this._movingAnchorName = this._movingAnchorName.replace("top", "bottom");
        this._anchorDragOffset.x -= offset.x;
        this._anchorDragOffset.y -= offset.y;
        newAttrs.height += this.padding() * 2;
      } else if (this._movingAnchorName && newAttrs.height < 0 && this._movingAnchorName.indexOf("bottom") >= 0) {
        var offset = t.point({
          x: 0,
          y: this.padding() * 2
        });
        this._movingAnchorName = this._movingAnchorName.replace("bottom", "top");
        this._anchorDragOffset.x -= offset.x;
        this._anchorDragOffset.y -= offset.y;
        newAttrs.height += this.padding() * 2;
      }
      if (this.boundBoxFunc()) {
        var bounded = this.boundBoxFunc()(oldAttrs, newAttrs);
        if (bounded) {
          newAttrs = bounded;
        } else {
          Util.Util.warn("boundBoxFunc returned falsy. You should return new bound rect from it!");
        }
      }
      var baseSize = 1e7;
      var oldTr = new Util.Transform();
      oldTr.translate(oldAttrs.x, oldAttrs.y);
      oldTr.rotate(oldAttrs.rotation);
      oldTr.scale(oldAttrs.width / baseSize, oldAttrs.height / baseSize);
      var newTr = new Util.Transform();
      newTr.translate(newAttrs.x, newAttrs.y);
      newTr.rotate(newAttrs.rotation);
      newTr.scale(newAttrs.width / baseSize, newAttrs.height / baseSize);
      var delta = newTr.multiply(oldTr.invert());
      this._nodes.forEach(function(node) {
        var _a;
        var parentTransform = node.getParent().getAbsoluteTransform();
        var localTransform = node.getTransform().copy();
        localTransform.translate(node.offsetX(), node.offsetY());
        var newLocalTransform = new Util.Transform();
        newLocalTransform.multiply(parentTransform.copy().invert()).multiply(delta).multiply(parentTransform).multiply(localTransform);
        var attrs = newLocalTransform.decompose();
        node.setAttrs(attrs);
        _this._fire("transform", {evt, target: node});
        node._fire("transform", {evt, target: node});
        (_a = node.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
      });
      this.rotation(Util.Util._getRotation(newAttrs.rotation));
      this._resetTransformCache();
      this.update();
      this.getLayer().batchDraw();
    };
    Transformer2.prototype.forceUpdate = function() {
      this._resetTransformCache();
      this.update();
    };
    Transformer2.prototype._batchChangeChild = function(selector, attrs) {
      var anchor = this.findOne(selector);
      anchor.setAttrs(attrs);
    };
    Transformer2.prototype.update = function() {
      var _this = this;
      var _a;
      var attrs = this._getNodeRect();
      this.rotation(Util.Util._getRotation(attrs.rotation));
      var width = attrs.width;
      var height = attrs.height;
      var enabledAnchors = this.enabledAnchors();
      var resizeEnabled = this.resizeEnabled();
      var padding = this.padding();
      var anchorSize = this.anchorSize();
      this.find("._anchor").each(function(node) {
        node.setAttrs({
          width: anchorSize,
          height: anchorSize,
          offsetX: anchorSize / 2,
          offsetY: anchorSize / 2,
          stroke: _this.anchorStroke(),
          strokeWidth: _this.anchorStrokeWidth(),
          fill: _this.anchorFill(),
          cornerRadius: _this.anchorCornerRadius()
        });
      });
      this._batchChangeChild(".top-left", {
        x: 0,
        y: 0,
        offsetX: anchorSize / 2 + padding,
        offsetY: anchorSize / 2 + padding,
        visible: resizeEnabled && enabledAnchors.indexOf("top-left") >= 0
      });
      this._batchChangeChild(".top-center", {
        x: width / 2,
        y: 0,
        offsetY: anchorSize / 2 + padding,
        visible: resizeEnabled && enabledAnchors.indexOf("top-center") >= 0
      });
      this._batchChangeChild(".top-right", {
        x: width,
        y: 0,
        offsetX: anchorSize / 2 - padding,
        offsetY: anchorSize / 2 + padding,
        visible: resizeEnabled && enabledAnchors.indexOf("top-right") >= 0
      });
      this._batchChangeChild(".middle-left", {
        x: 0,
        y: height / 2,
        offsetX: anchorSize / 2 + padding,
        visible: resizeEnabled && enabledAnchors.indexOf("middle-left") >= 0
      });
      this._batchChangeChild(".middle-right", {
        x: width,
        y: height / 2,
        offsetX: anchorSize / 2 - padding,
        visible: resizeEnabled && enabledAnchors.indexOf("middle-right") >= 0
      });
      this._batchChangeChild(".bottom-left", {
        x: 0,
        y: height,
        offsetX: anchorSize / 2 + padding,
        offsetY: anchorSize / 2 - padding,
        visible: resizeEnabled && enabledAnchors.indexOf("bottom-left") >= 0
      });
      this._batchChangeChild(".bottom-center", {
        x: width / 2,
        y: height,
        offsetY: anchorSize / 2 - padding,
        visible: resizeEnabled && enabledAnchors.indexOf("bottom-center") >= 0
      });
      this._batchChangeChild(".bottom-right", {
        x: width,
        y: height,
        offsetX: anchorSize / 2 - padding,
        offsetY: anchorSize / 2 - padding,
        visible: resizeEnabled && enabledAnchors.indexOf("bottom-right") >= 0
      });
      this._batchChangeChild(".rotater", {
        x: width / 2,
        y: -this.rotateAnchorOffset() * Util.Util._sign(height) - padding,
        visible: this.rotateEnabled()
      });
      this._batchChangeChild(".back", {
        width,
        height,
        visible: this.borderEnabled(),
        stroke: this.borderStroke(),
        strokeWidth: this.borderStrokeWidth(),
        dash: this.borderDash(),
        x: 0,
        y: 0
      });
      (_a = this.getLayer()) === null || _a === void 0 ? void 0 : _a.batchDraw();
    };
    Transformer2.prototype.isTransforming = function() {
      return this._transforming;
    };
    Transformer2.prototype.stopTransform = function() {
      if (this._transforming) {
        this._removeEvents();
        var anchorNode = this.findOne("." + this._movingAnchorName);
        if (anchorNode) {
          anchorNode.stopDrag();
        }
      }
    };
    Transformer2.prototype.destroy = function() {
      if (this.getStage() && this._cursorChange) {
        this.getStage().content.style.cursor = "";
      }
      Group_1.Group.prototype.destroy.call(this);
      this.detach();
      this._removeEvents();
      return this;
    };
    Transformer2.prototype.toObject = function() {
      return Node_1.Node.prototype.toObject.call(this);
    };
    return Transformer2;
  }(Group_1.Group);
  exports.Transformer = Transformer;
  function validateAnchors(val) {
    if (!(val instanceof Array)) {
      Util.Util.warn("enabledAnchors value should be an array");
    }
    if (val instanceof Array) {
      val.forEach(function(name) {
        if (ANCHORS_NAMES.indexOf(name) === -1) {
          Util.Util.warn("Unknown anchor name: " + name + ". Available names are: " + ANCHORS_NAMES.join(", "));
        }
      });
    }
    return val || [];
  }
  Transformer.prototype.className = "Transformer";
  Global_2._registerNode(Transformer);
  Factory.Factory.addGetterSetter(Transformer, "enabledAnchors", ANCHORS_NAMES, validateAnchors);
  Factory.Factory.addGetterSetter(Transformer, "resizeEnabled", true);
  Factory.Factory.addGetterSetter(Transformer, "anchorSize", 10, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "rotateEnabled", true);
  Factory.Factory.addGetterSetter(Transformer, "rotationSnaps", []);
  Factory.Factory.addGetterSetter(Transformer, "rotateAnchorOffset", 50, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "rotationSnapTolerance", 5, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "borderEnabled", true);
  Factory.Factory.addGetterSetter(Transformer, "anchorStroke", "rgb(0, 161, 255)");
  Factory.Factory.addGetterSetter(Transformer, "anchorStrokeWidth", 1, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "anchorFill", "white");
  Factory.Factory.addGetterSetter(Transformer, "anchorCornerRadius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "borderStroke", "rgb(0, 161, 255)");
  Factory.Factory.addGetterSetter(Transformer, "borderStrokeWidth", 1, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "borderDash");
  Factory.Factory.addGetterSetter(Transformer, "keepRatio", true);
  Factory.Factory.addGetterSetter(Transformer, "centeredScaling", false);
  Factory.Factory.addGetterSetter(Transformer, "ignoreStroke", false);
  Factory.Factory.addGetterSetter(Transformer, "padding", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Transformer, "node");
  Factory.Factory.addGetterSetter(Transformer, "nodes");
  Factory.Factory.addGetterSetter(Transformer, "boundBoxFunc");
  Factory.Factory.addGetterSetter(Transformer, "shouldOverdrawWholeArea", false);
  Factory.Factory.backCompat(Transformer, {
    lineEnabled: "borderEnabled",
    rotateHandlerOffset: "rotateAnchorOffset",
    enabledHandlers: "enabledAnchors"
  });
  Util.Collection.mapMethods(Transformer);
});
var Wedge_1 = createCommonjsModule(function(module, exports) {
  var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {__proto__: []} instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Wedge = void 0;
  var Global_2 = Global;
  var Wedge = function(_super) {
    __extends(Wedge2, _super);
    function Wedge2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    Wedge2.prototype._sceneFunc = function(context) {
      context.beginPath();
      context.arc(0, 0, this.radius(), 0, Global.Konva.getAngle(this.angle()), this.clockwise());
      context.lineTo(0, 0);
      context.closePath();
      context.fillStrokeShape(this);
    };
    Wedge2.prototype.getWidth = function() {
      return this.radius() * 2;
    };
    Wedge2.prototype.getHeight = function() {
      return this.radius() * 2;
    };
    Wedge2.prototype.setWidth = function(width) {
      this.radius(width / 2);
    };
    Wedge2.prototype.setHeight = function(height) {
      this.radius(height / 2);
    };
    return Wedge2;
  }(Shape_1.Shape);
  exports.Wedge = Wedge;
  Wedge.prototype.className = "Wedge";
  Wedge.prototype._centroid = true;
  Wedge.prototype._attrsAffectingSize = ["radius"];
  Global_2._registerNode(Wedge);
  Factory.Factory.addGetterSetter(Wedge, "radius", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Wedge, "angle", 0, Validators.getNumberValidator());
  Factory.Factory.addGetterSetter(Wedge, "clockwise", false);
  Factory.Factory.backCompat(Wedge, {
    angleDeg: "angle",
    getAngleDeg: "getAngle",
    setAngleDeg: "setAngle"
  });
  Util.Collection.mapMethods(Wedge);
});
var Blur_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Blur = void 0;
  function BlurStack() {
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
  }
  var mul_table = [
    512,
    512,
    456,
    512,
    328,
    456,
    335,
    512,
    405,
    328,
    271,
    456,
    388,
    335,
    292,
    512,
    454,
    405,
    364,
    328,
    298,
    271,
    496,
    456,
    420,
    388,
    360,
    335,
    312,
    292,
    273,
    512,
    482,
    454,
    428,
    405,
    383,
    364,
    345,
    328,
    312,
    298,
    284,
    271,
    259,
    496,
    475,
    456,
    437,
    420,
    404,
    388,
    374,
    360,
    347,
    335,
    323,
    312,
    302,
    292,
    282,
    273,
    265,
    512,
    497,
    482,
    468,
    454,
    441,
    428,
    417,
    405,
    394,
    383,
    373,
    364,
    354,
    345,
    337,
    328,
    320,
    312,
    305,
    298,
    291,
    284,
    278,
    271,
    265,
    259,
    507,
    496,
    485,
    475,
    465,
    456,
    446,
    437,
    428,
    420,
    412,
    404,
    396,
    388,
    381,
    374,
    367,
    360,
    354,
    347,
    341,
    335,
    329,
    323,
    318,
    312,
    307,
    302,
    297,
    292,
    287,
    282,
    278,
    273,
    269,
    265,
    261,
    512,
    505,
    497,
    489,
    482,
    475,
    468,
    461,
    454,
    447,
    441,
    435,
    428,
    422,
    417,
    411,
    405,
    399,
    394,
    389,
    383,
    378,
    373,
    368,
    364,
    359,
    354,
    350,
    345,
    341,
    337,
    332,
    328,
    324,
    320,
    316,
    312,
    309,
    305,
    301,
    298,
    294,
    291,
    287,
    284,
    281,
    278,
    274,
    271,
    268,
    265,
    262,
    259,
    257,
    507,
    501,
    496,
    491,
    485,
    480,
    475,
    470,
    465,
    460,
    456,
    451,
    446,
    442,
    437,
    433,
    428,
    424,
    420,
    416,
    412,
    408,
    404,
    400,
    396,
    392,
    388,
    385,
    381,
    377,
    374,
    370,
    367,
    363,
    360,
    357,
    354,
    350,
    347,
    344,
    341,
    338,
    335,
    332,
    329,
    326,
    323,
    320,
    318,
    315,
    312,
    310,
    307,
    304,
    302,
    299,
    297,
    294,
    292,
    289,
    287,
    285,
    282,
    280,
    278,
    275,
    273,
    271,
    269,
    267,
    265,
    263,
    261,
    259
  ];
  var shg_table = [
    9,
    11,
    12,
    13,
    13,
    14,
    14,
    15,
    15,
    15,
    15,
    16,
    16,
    16,
    16,
    17,
    17,
    17,
    17,
    17,
    17,
    17,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    18,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    19,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    20,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    21,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    22,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    23,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24,
    24
  ];
  function filterGaussBlurRGBA(imageData, radius) {
    var pixels = imageData.data, width = imageData.width, height = imageData.height;
    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;
    var div = radius + radius + 1, widthMinus1 = width - 1, heightMinus1 = height - 1, radiusPlus1 = radius + 1, sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2, stackStart = new BlurStack(), stackEnd = null, stack = stackStart, stackIn = null, stackOut = null, mul_sum = mul_table[radius], shg_sum = shg_table[radius];
    for (i = 1; i < div; i++) {
      stack = stack.next = new BlurStack();
      if (i === radiusPlus1) {
        stackEnd = stack;
      }
    }
    stack.next = stackStart;
    yw = yi = 0;
    for (y = 0; y < height; y++) {
      r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;
      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;
      stack = stackStart;
      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }
      for (i = 1; i < radiusPlus1; i++) {
        p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
        r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[p + 3]) * rbs;
        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;
        stack = stack.next;
      }
      stackIn = stackStart;
      stackOut = stackEnd;
      for (x = 0; x < width; x++) {
        pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
        if (pa !== 0) {
          pa = 255 / pa;
          pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
          pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
          pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
        } else {
          pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
        }
        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;
        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;
        p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
        r_in_sum += stackIn.r = pixels[p];
        g_in_sum += stackIn.g = pixels[p + 1];
        b_in_sum += stackIn.b = pixels[p + 2];
        a_in_sum += stackIn.a = pixels[p + 3];
        r_sum += r_in_sum;
        g_sum += g_in_sum;
        b_sum += b_in_sum;
        a_sum += a_in_sum;
        stackIn = stackIn.next;
        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;
        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;
        stackOut = stackOut.next;
        yi += 4;
      }
      yw += width;
    }
    for (x = 0; x < width; x++) {
      g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;
      yi = x << 2;
      r_out_sum = radiusPlus1 * (pr = pixels[yi]);
      g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
      b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
      a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);
      r_sum += sumFactor * pr;
      g_sum += sumFactor * pg;
      b_sum += sumFactor * pb;
      a_sum += sumFactor * pa;
      stack = stackStart;
      for (i = 0; i < radiusPlus1; i++) {
        stack.r = pr;
        stack.g = pg;
        stack.b = pb;
        stack.a = pa;
        stack = stack.next;
      }
      yp = width;
      for (i = 1; i <= radius; i++) {
        yi = yp + x << 2;
        r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
        g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
        b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
        a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;
        r_in_sum += pr;
        g_in_sum += pg;
        b_in_sum += pb;
        a_in_sum += pa;
        stack = stack.next;
        if (i < heightMinus1) {
          yp += width;
        }
      }
      yi = x;
      stackIn = stackStart;
      stackOut = stackEnd;
      for (y = 0; y < height; y++) {
        p = yi << 2;
        pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
        if (pa > 0) {
          pa = 255 / pa;
          pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
          pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
          pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
        } else {
          pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
        }
        r_sum -= r_out_sum;
        g_sum -= g_out_sum;
        b_sum -= b_out_sum;
        a_sum -= a_out_sum;
        r_out_sum -= stackIn.r;
        g_out_sum -= stackIn.g;
        b_out_sum -= stackIn.b;
        a_out_sum -= stackIn.a;
        p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
        r_sum += r_in_sum += stackIn.r = pixels[p];
        g_sum += g_in_sum += stackIn.g = pixels[p + 1];
        b_sum += b_in_sum += stackIn.b = pixels[p + 2];
        a_sum += a_in_sum += stackIn.a = pixels[p + 3];
        stackIn = stackIn.next;
        r_out_sum += pr = stackOut.r;
        g_out_sum += pg = stackOut.g;
        b_out_sum += pb = stackOut.b;
        a_out_sum += pa = stackOut.a;
        r_in_sum -= pr;
        g_in_sum -= pg;
        b_in_sum -= pb;
        a_in_sum -= pa;
        stackOut = stackOut.next;
        yi += width;
      }
    }
  }
  var Blur = function Blur2(imageData) {
    var radius = Math.round(this.blurRadius());
    if (radius > 0) {
      filterGaussBlurRGBA(imageData, radius);
    }
  };
  exports.Blur = Blur;
  Factory.Factory.addGetterSetter(Node_1.Node, "blurRadius", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Brighten_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Brighten = void 0;
  var Brighten = function(imageData) {
    var brightness = this.brightness() * 255, data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 4) {
      data[i] += brightness;
      data[i + 1] += brightness;
      data[i + 2] += brightness;
    }
  };
  exports.Brighten = Brighten;
  Factory.Factory.addGetterSetter(Node_1.Node, "brightness", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Contrast_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Contrast = void 0;
  var Contrast = function(imageData) {
    var adjust = Math.pow((this.contrast() + 100) / 100, 2);
    var data = imageData.data, nPixels = data.length, red = 150, green = 150, blue = 150, i;
    for (i = 0; i < nPixels; i += 4) {
      red = data[i];
      green = data[i + 1];
      blue = data[i + 2];
      red /= 255;
      red -= 0.5;
      red *= adjust;
      red += 0.5;
      red *= 255;
      green /= 255;
      green -= 0.5;
      green *= adjust;
      green += 0.5;
      green *= 255;
      blue /= 255;
      blue -= 0.5;
      blue *= adjust;
      blue += 0.5;
      blue *= 255;
      red = red < 0 ? 0 : red > 255 ? 255 : red;
      green = green < 0 ? 0 : green > 255 ? 255 : green;
      blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
    }
  };
  exports.Contrast = Contrast;
  Factory.Factory.addGetterSetter(Node_1.Node, "contrast", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Emboss_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Emboss = void 0;
  var Emboss = function(imageData) {
    var strength = this.embossStrength() * 10, greyLevel = this.embossWhiteLevel() * 255, direction = this.embossDirection(), blend = this.embossBlend(), dirY = 0, dirX = 0, data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
    switch (direction) {
      case "top-left":
        dirY = -1;
        dirX = -1;
        break;
      case "top":
        dirY = -1;
        dirX = 0;
        break;
      case "top-right":
        dirY = -1;
        dirX = 1;
        break;
      case "right":
        dirY = 0;
        dirX = 1;
        break;
      case "bottom-right":
        dirY = 1;
        dirX = 1;
        break;
      case "bottom":
        dirY = 1;
        dirX = 0;
        break;
      case "bottom-left":
        dirY = 1;
        dirX = -1;
        break;
      case "left":
        dirY = 0;
        dirX = -1;
        break;
      default:
        Util.Util.error("Unknown emboss direction: " + direction);
    }
    do {
      var offsetY = (y - 1) * w4;
      var otherY = dirY;
      if (y + otherY < 1) {
        otherY = 0;
      }
      if (y + otherY > h) {
        otherY = 0;
      }
      var offsetYOther = (y - 1 + otherY) * w * 4;
      var x = w;
      do {
        var offset = offsetY + (x - 1) * 4;
        var otherX = dirX;
        if (x + otherX < 1) {
          otherX = 0;
        }
        if (x + otherX > w) {
          otherX = 0;
        }
        var offsetOther = offsetYOther + (x - 1 + otherX) * 4;
        var dR = data[offset] - data[offsetOther];
        var dG = data[offset + 1] - data[offsetOther + 1];
        var dB = data[offset + 2] - data[offsetOther + 2];
        var dif = dR;
        var absDif = dif > 0 ? dif : -dif;
        var absG = dG > 0 ? dG : -dG;
        var absB = dB > 0 ? dB : -dB;
        if (absG > absDif) {
          dif = dG;
        }
        if (absB > absDif) {
          dif = dB;
        }
        dif *= strength;
        if (blend) {
          var r = data[offset] + dif;
          var g = data[offset + 1] + dif;
          var b = data[offset + 2] + dif;
          data[offset] = r > 255 ? 255 : r < 0 ? 0 : r;
          data[offset + 1] = g > 255 ? 255 : g < 0 ? 0 : g;
          data[offset + 2] = b > 255 ? 255 : b < 0 ? 0 : b;
        } else {
          var grey = greyLevel - dif;
          if (grey < 0) {
            grey = 0;
          } else if (grey > 255) {
            grey = 255;
          }
          data[offset] = data[offset + 1] = data[offset + 2] = grey;
        }
      } while (--x);
    } while (--y);
  };
  exports.Emboss = Emboss;
  Factory.Factory.addGetterSetter(Node_1.Node, "embossStrength", 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "embossWhiteLevel", 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "embossDirection", "top-left", null, Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "embossBlend", false, null, Factory.Factory.afterSetFilter);
});
var Enhance_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Enhance = void 0;
  function remap(fromValue, fromMin, fromMax, toMin, toMax) {
    var fromRange = fromMax - fromMin, toRange = toMax - toMin, toValue;
    if (fromRange === 0) {
      return toMin + toRange / 2;
    }
    if (toRange === 0) {
      return toMin;
    }
    toValue = (fromValue - fromMin) / fromRange;
    toValue = toRange * toValue + toMin;
    return toValue;
  }
  var Enhance = function(imageData) {
    var data = imageData.data, nSubPixels = data.length, rMin = data[0], rMax = rMin, r, gMin = data[1], gMax = gMin, g, bMin = data[2], bMax = bMin, b, i;
    var enhanceAmount = this.enhance();
    if (enhanceAmount === 0) {
      return;
    }
    for (i = 0; i < nSubPixels; i += 4) {
      r = data[i + 0];
      if (r < rMin) {
        rMin = r;
      } else if (r > rMax) {
        rMax = r;
      }
      g = data[i + 1];
      if (g < gMin) {
        gMin = g;
      } else if (g > gMax) {
        gMax = g;
      }
      b = data[i + 2];
      if (b < bMin) {
        bMin = b;
      } else if (b > bMax) {
        bMax = b;
      }
    }
    if (rMax === rMin) {
      rMax = 255;
      rMin = 0;
    }
    if (gMax === gMin) {
      gMax = 255;
      gMin = 0;
    }
    if (bMax === bMin) {
      bMax = 255;
      bMin = 0;
    }
    var rMid, rGoalMax, rGoalMin, gMid, gGoalMax, gGoalMin, bMid, bGoalMax, bGoalMin;
    if (enhanceAmount > 0) {
      rGoalMax = rMax + enhanceAmount * (255 - rMax);
      rGoalMin = rMin - enhanceAmount * (rMin - 0);
      gGoalMax = gMax + enhanceAmount * (255 - gMax);
      gGoalMin = gMin - enhanceAmount * (gMin - 0);
      bGoalMax = bMax + enhanceAmount * (255 - bMax);
      bGoalMin = bMin - enhanceAmount * (bMin - 0);
    } else {
      rMid = (rMax + rMin) * 0.5;
      rGoalMax = rMax + enhanceAmount * (rMax - rMid);
      rGoalMin = rMin + enhanceAmount * (rMin - rMid);
      gMid = (gMax + gMin) * 0.5;
      gGoalMax = gMax + enhanceAmount * (gMax - gMid);
      gGoalMin = gMin + enhanceAmount * (gMin - gMid);
      bMid = (bMax + bMin) * 0.5;
      bGoalMax = bMax + enhanceAmount * (bMax - bMid);
      bGoalMin = bMin + enhanceAmount * (bMin - bMid);
    }
    for (i = 0; i < nSubPixels; i += 4) {
      data[i + 0] = remap(data[i + 0], rMin, rMax, rGoalMin, rGoalMax);
      data[i + 1] = remap(data[i + 1], gMin, gMax, gGoalMin, gGoalMax);
      data[i + 2] = remap(data[i + 2], bMin, bMax, bGoalMin, bGoalMax);
    }
  };
  exports.Enhance = Enhance;
  Factory.Factory.addGetterSetter(Node_1.Node, "enhance", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Grayscale_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Grayscale = void 0;
  var Grayscale = function(imageData) {
    var data = imageData.data, len = data.length, i, brightness;
    for (i = 0; i < len; i += 4) {
      brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
    }
  };
  exports.Grayscale = Grayscale;
});
var HSL_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.HSL = void 0;
  Factory.Factory.addGetterSetter(Node_1.Node, "hue", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "saturation", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "luminance", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  var HSL = function(imageData) {
    var data = imageData.data, nPixels = data.length, v = 1, s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, l = this.luminance() * 127, i;
    var vsu = v * s * Math.cos(h * Math.PI / 180), vsw = v * s * Math.sin(h * Math.PI / 180);
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
    var r, g, b, a;
    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      a = data[i + 3];
      data[i + 0] = rr * r + rg * g + rb * b + l;
      data[i + 1] = gr * r + gg * g + gb * b + l;
      data[i + 2] = br * r + bg * g + bb * b + l;
      data[i + 3] = a;
    }
  };
  exports.HSL = HSL;
});
var HSV_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.HSV = void 0;
  var HSV = function(imageData) {
    var data = imageData.data, nPixels = data.length, v = Math.pow(2, this.value()), s = Math.pow(2, this.saturation()), h = Math.abs(this.hue() + 360) % 360, i;
    var vsu = v * s * Math.cos(h * Math.PI / 180), vsw = v * s * Math.sin(h * Math.PI / 180);
    var rr = 0.299 * v + 0.701 * vsu + 0.167 * vsw, rg = 0.587 * v - 0.587 * vsu + 0.33 * vsw, rb = 0.114 * v - 0.114 * vsu - 0.497 * vsw;
    var gr = 0.299 * v - 0.299 * vsu - 0.328 * vsw, gg = 0.587 * v + 0.413 * vsu + 0.035 * vsw, gb = 0.114 * v - 0.114 * vsu + 0.293 * vsw;
    var br = 0.299 * v - 0.3 * vsu + 1.25 * vsw, bg = 0.587 * v - 0.586 * vsu - 1.05 * vsw, bb = 0.114 * v + 0.886 * vsu - 0.2 * vsw;
    var r, g, b, a;
    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      a = data[i + 3];
      data[i + 0] = rr * r + rg * g + rb * b;
      data[i + 1] = gr * r + gg * g + gb * b;
      data[i + 2] = br * r + bg * g + bb * b;
      data[i + 3] = a;
    }
  };
  exports.HSV = HSV;
  Factory.Factory.addGetterSetter(Node_1.Node, "hue", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "saturation", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "value", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Invert_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Invert = void 0;
  var Invert = function(imageData) {
    var data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }
  };
  exports.Invert = Invert;
});
var Kaleidoscope_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Kaleidoscope = void 0;
  var ToPolar = function(src, dst, opt) {
    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, r = 0, g = 0, b = 0, a = 0;
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;
    var rSize = ySize, tSize = xSize, radius, theta;
    var conversion = 360 / tSize * Math.PI / 180, sin, cos;
    for (theta = 0; theta < tSize; theta += 1) {
      sin = Math.sin(theta * conversion);
      cos = Math.cos(theta * conversion);
      for (radius = 0; radius < rSize; radius += 1) {
        x = Math.floor(xMid + rMax * radius / rSize * cos);
        y = Math.floor(yMid + rMax * radius / rSize * sin);
        i = (y * xSize + x) * 4;
        r = srcPixels[i + 0];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];
        i = (theta + radius * xSize) * 4;
        dstPixels[i + 0] = r;
        dstPixels[i + 1] = g;
        dstPixels[i + 2] = b;
        dstPixels[i + 3] = a;
      }
    }
  };
  var FromPolar = function(src, dst, opt) {
    var srcPixels = src.data, dstPixels = dst.data, xSize = src.width, ySize = src.height, xMid = opt.polarCenterX || xSize / 2, yMid = opt.polarCenterY || ySize / 2, i, x, y, dx, dy, r = 0, g = 0, b = 0, a = 0;
    var rad, rMax = Math.sqrt(xMid * xMid + yMid * yMid);
    x = xSize - xMid;
    y = ySize - yMid;
    rad = Math.sqrt(x * x + y * y);
    rMax = rad > rMax ? rad : rMax;
    var rSize = ySize, tSize = xSize, radius, theta, phaseShift = opt.polarRotation || 0;
    var x1, y1;
    for (x = 0; x < xSize; x += 1) {
      for (y = 0; y < ySize; y += 1) {
        dx = x - xMid;
        dy = y - yMid;
        radius = Math.sqrt(dx * dx + dy * dy) * rSize / rMax;
        theta = (Math.atan2(dy, dx) * 180 / Math.PI + 360 + phaseShift) % 360;
        theta = theta * tSize / 360;
        x1 = Math.floor(theta);
        y1 = Math.floor(radius);
        i = (y1 * xSize + x1) * 4;
        r = srcPixels[i + 0];
        g = srcPixels[i + 1];
        b = srcPixels[i + 2];
        a = srcPixels[i + 3];
        i = (y * xSize + x) * 4;
        dstPixels[i + 0] = r;
        dstPixels[i + 1] = g;
        dstPixels[i + 2] = b;
        dstPixels[i + 3] = a;
      }
    }
  };
  var Kaleidoscope = function(imageData) {
    var xSize = imageData.width, ySize = imageData.height;
    var x, y, xoff, i, r, g, b, a, srcPos, dstPos;
    var power = Math.round(this.kaleidoscopePower());
    var angle = Math.round(this.kaleidoscopeAngle());
    var offset = Math.floor(xSize * (angle % 360) / 360);
    if (power < 1) {
      return;
    }
    var tempCanvas = Util.Util.createCanvasElement();
    tempCanvas.width = xSize;
    tempCanvas.height = ySize;
    var scratchData = tempCanvas.getContext("2d").getImageData(0, 0, xSize, ySize);
    ToPolar(imageData, scratchData, {
      polarCenterX: xSize / 2,
      polarCenterY: ySize / 2
    });
    var minSectionSize = xSize / Math.pow(2, power);
    while (minSectionSize <= 8) {
      minSectionSize = minSectionSize * 2;
      power -= 1;
    }
    minSectionSize = Math.ceil(minSectionSize);
    var sectionSize = minSectionSize;
    var xStart = 0, xEnd = sectionSize, xDelta = 1;
    if (offset + minSectionSize > xSize) {
      xStart = sectionSize;
      xEnd = 0;
      xDelta = -1;
    }
    for (y = 0; y < ySize; y += 1) {
      for (x = xStart; x !== xEnd; x += xDelta) {
        xoff = Math.round(x + offset) % xSize;
        srcPos = (xSize * y + xoff) * 4;
        r = scratchData.data[srcPos + 0];
        g = scratchData.data[srcPos + 1];
        b = scratchData.data[srcPos + 2];
        a = scratchData.data[srcPos + 3];
        dstPos = (xSize * y + x) * 4;
        scratchData.data[dstPos + 0] = r;
        scratchData.data[dstPos + 1] = g;
        scratchData.data[dstPos + 2] = b;
        scratchData.data[dstPos + 3] = a;
      }
    }
    for (y = 0; y < ySize; y += 1) {
      sectionSize = Math.floor(minSectionSize);
      for (i = 0; i < power; i += 1) {
        for (x = 0; x < sectionSize + 1; x += 1) {
          srcPos = (xSize * y + x) * 4;
          r = scratchData.data[srcPos + 0];
          g = scratchData.data[srcPos + 1];
          b = scratchData.data[srcPos + 2];
          a = scratchData.data[srcPos + 3];
          dstPos = (xSize * y + sectionSize * 2 - x - 1) * 4;
          scratchData.data[dstPos + 0] = r;
          scratchData.data[dstPos + 1] = g;
          scratchData.data[dstPos + 2] = b;
          scratchData.data[dstPos + 3] = a;
        }
        sectionSize *= 2;
      }
    }
    FromPolar(scratchData, imageData, {polarRotation: 0});
  };
  exports.Kaleidoscope = Kaleidoscope;
  Factory.Factory.addGetterSetter(Node_1.Node, "kaleidoscopePower", 2, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "kaleidoscopeAngle", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Mask_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Mask = void 0;
  function pixelAt(idata, x, y) {
    var idx = (y * idata.width + x) * 4;
    var d = [];
    d.push(idata.data[idx++], idata.data[idx++], idata.data[idx++], idata.data[idx++]);
    return d;
  }
  function rgbDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2) + Math.pow(p1[2] - p2[2], 2));
  }
  function rgbMean(pTab) {
    var m = [0, 0, 0];
    for (var i = 0; i < pTab.length; i++) {
      m[0] += pTab[i][0];
      m[1] += pTab[i][1];
      m[2] += pTab[i][2];
    }
    m[0] /= pTab.length;
    m[1] /= pTab.length;
    m[2] /= pTab.length;
    return m;
  }
  function backgroundMask(idata, threshold) {
    var rgbv_no = pixelAt(idata, 0, 0);
    var rgbv_ne = pixelAt(idata, idata.width - 1, 0);
    var rgbv_so = pixelAt(idata, 0, idata.height - 1);
    var rgbv_se = pixelAt(idata, idata.width - 1, idata.height - 1);
    var thres = threshold || 10;
    if (rgbDistance(rgbv_no, rgbv_ne) < thres && rgbDistance(rgbv_ne, rgbv_se) < thres && rgbDistance(rgbv_se, rgbv_so) < thres && rgbDistance(rgbv_so, rgbv_no) < thres) {
      var mean = rgbMean([rgbv_ne, rgbv_no, rgbv_se, rgbv_so]);
      var mask = [];
      for (var i = 0; i < idata.width * idata.height; i++) {
        var d = rgbDistance(mean, [
          idata.data[i * 4],
          idata.data[i * 4 + 1],
          idata.data[i * 4 + 2]
        ]);
        mask[i] = d < thres ? 0 : 255;
      }
      return mask;
    }
  }
  function applyMask(idata, mask) {
    for (var i = 0; i < idata.width * idata.height; i++) {
      idata.data[4 * i + 3] = mask[i];
    }
  }
  function erodeMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 0, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];
              a += mask[srcOff] * wt;
            }
          }
        }
        maskResult[so] = a === 255 * 8 ? 255 : 0;
      }
    }
    return maskResult;
  }
  function dilateMask(mask, sw, sh) {
    var weights = [1, 1, 1, 1, 1, 1, 1, 1, 1];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];
              a += mask[srcOff] * wt;
            }
          }
        }
        maskResult[so] = a >= 255 * 4 ? 255 : 0;
      }
    }
    return maskResult;
  }
  function smoothEdgeMask(mask, sw, sh) {
    var weights = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var maskResult = [];
    for (var y = 0; y < sh; y++) {
      for (var x = 0; x < sw; x++) {
        var so = y * sw + x;
        var a = 0;
        for (var cy = 0; cy < side; cy++) {
          for (var cx = 0; cx < side; cx++) {
            var scy = y + cy - halfSide;
            var scx = x + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = scy * sw + scx;
              var wt = weights[cy * side + cx];
              a += mask[srcOff] * wt;
            }
          }
        }
        maskResult[so] = a;
      }
    }
    return maskResult;
  }
  var Mask = function(imageData) {
    var threshold = this.threshold(), mask = backgroundMask(imageData, threshold);
    if (mask) {
      mask = erodeMask(mask, imageData.width, imageData.height);
      mask = dilateMask(mask, imageData.width, imageData.height);
      mask = smoothEdgeMask(mask, imageData.width, imageData.height);
      applyMask(imageData, mask);
    }
    return imageData;
  };
  exports.Mask = Mask;
  Factory.Factory.addGetterSetter(Node_1.Node, "threshold", 0, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Noise_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Noise = void 0;
  var Noise = function(imageData) {
    var amount = this.noise() * 255, data = imageData.data, nPixels = data.length, half = amount / 2, i;
    for (i = 0; i < nPixels; i += 4) {
      data[i + 0] += half - 2 * half * Math.random();
      data[i + 1] += half - 2 * half * Math.random();
      data[i + 2] += half - 2 * half * Math.random();
    }
  };
  exports.Noise = Noise;
  Factory.Factory.addGetterSetter(Node_1.Node, "noise", 0.2, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Pixelate_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Pixelate = void 0;
  var Pixelate = function(imageData) {
    var pixelSize = Math.ceil(this.pixelSize()), width = imageData.width, height = imageData.height, x, y, i, red, green, blue, alpha, nBinsX = Math.ceil(width / pixelSize), nBinsY = Math.ceil(height / pixelSize), xBinStart, xBinEnd, yBinStart, yBinEnd, xBin, yBin, pixelsInBin, data = imageData.data;
    if (pixelSize <= 0) {
      Util.Util.error("pixelSize value can not be <= 0");
      return;
    }
    for (xBin = 0; xBin < nBinsX; xBin += 1) {
      for (yBin = 0; yBin < nBinsY; yBin += 1) {
        red = 0;
        green = 0;
        blue = 0;
        alpha = 0;
        xBinStart = xBin * pixelSize;
        xBinEnd = xBinStart + pixelSize;
        yBinStart = yBin * pixelSize;
        yBinEnd = yBinStart + pixelSize;
        pixelsInBin = 0;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            red += data[i + 0];
            green += data[i + 1];
            blue += data[i + 2];
            alpha += data[i + 3];
            pixelsInBin += 1;
          }
        }
        red = red / pixelsInBin;
        green = green / pixelsInBin;
        blue = blue / pixelsInBin;
        alpha = alpha / pixelsInBin;
        for (x = xBinStart; x < xBinEnd; x += 1) {
          if (x >= width) {
            continue;
          }
          for (y = yBinStart; y < yBinEnd; y += 1) {
            if (y >= height) {
              continue;
            }
            i = (width * y + x) * 4;
            data[i + 0] = red;
            data[i + 1] = green;
            data[i + 2] = blue;
            data[i + 3] = alpha;
          }
        }
      }
    }
  };
  exports.Pixelate = Pixelate;
  Factory.Factory.addGetterSetter(Node_1.Node, "pixelSize", 8, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var Posterize_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Posterize = void 0;
  var Posterize = function(imageData) {
    var levels = Math.round(this.levels() * 254) + 1, data = imageData.data, len = data.length, scale = 255 / levels, i;
    for (i = 0; i < len; i += 1) {
      data[i] = Math.floor(data[i] / scale) * scale;
    }
  };
  exports.Posterize = Posterize;
  Factory.Factory.addGetterSetter(Node_1.Node, "levels", 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var RGB_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RGB = void 0;
  var RGB = function(imageData) {
    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), i, brightness;
    for (i = 0; i < nPixels; i += 4) {
      brightness = (0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2]) / 255;
      data[i] = brightness * red;
      data[i + 1] = brightness * green;
      data[i + 2] = brightness * blue;
      data[i + 3] = data[i + 3];
    }
  };
  exports.RGB = RGB;
  Factory.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  Factory.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  Factory.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators.RGBComponent, Factory.Factory.afterSetFilter);
});
var RGBA_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.RGBA = void 0;
  var RGBA = function(imageData) {
    var data = imageData.data, nPixels = data.length, red = this.red(), green = this.green(), blue = this.blue(), alpha = this.alpha(), i, ia;
    for (i = 0; i < nPixels; i += 4) {
      ia = 1 - alpha;
      data[i] = red * alpha + data[i] * ia;
      data[i + 1] = green * alpha + data[i + 1] * ia;
      data[i + 2] = blue * alpha + data[i + 2] * ia;
    }
  };
  exports.RGBA = RGBA;
  Factory.Factory.addGetterSetter(Node_1.Node, "red", 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  Factory.Factory.addGetterSetter(Node_1.Node, "green", 0, function(val) {
    this._filterUpToDate = false;
    if (val > 255) {
      return 255;
    } else if (val < 0) {
      return 0;
    } else {
      return Math.round(val);
    }
  });
  Factory.Factory.addGetterSetter(Node_1.Node, "blue", 0, Validators.RGBComponent, Factory.Factory.afterSetFilter);
  Factory.Factory.addGetterSetter(Node_1.Node, "alpha", 1, function(val) {
    this._filterUpToDate = false;
    if (val > 1) {
      return 1;
    } else if (val < 0) {
      return 0;
    } else {
      return val;
    }
  });
});
var Sepia_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Sepia = void 0;
  var Sepia = function(imageData) {
    var data = imageData.data, nPixels = data.length, i, r, g, b;
    for (i = 0; i < nPixels; i += 4) {
      r = data[i + 0];
      g = data[i + 1];
      b = data[i + 2];
      data[i + 0] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
      data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
      data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
    }
  };
  exports.Sepia = Sepia;
});
var Solarize_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Solarize = void 0;
  var Solarize = function(imageData) {
    var data = imageData.data, w = imageData.width, h = imageData.height, w4 = w * 4, y = h;
    do {
      var offsetY = (y - 1) * w4;
      var x = w;
      do {
        var offset = offsetY + (x - 1) * 4;
        var r = data[offset];
        var g = data[offset + 1];
        var b = data[offset + 2];
        if (r > 127) {
          r = 255 - r;
        }
        if (g > 127) {
          g = 255 - g;
        }
        if (b > 127) {
          b = 255 - b;
        }
        data[offset] = r;
        data[offset + 1] = g;
        data[offset + 2] = b;
      } while (--x);
    } while (--y);
  };
  exports.Solarize = Solarize;
});
var Threshold_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Threshold = void 0;
  var Threshold = function(imageData) {
    var level = this.threshold() * 255, data = imageData.data, len = data.length, i;
    for (i = 0; i < len; i += 1) {
      data[i] = data[i] < level ? 0 : 255;
    }
  };
  exports.Threshold = Threshold;
  Factory.Factory.addGetterSetter(Node_1.Node, "threshold", 0.5, Validators.getNumberValidator(), Factory.Factory.afterSetFilter);
});
var _FullInternals = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.Konva = void 0;
  exports.Konva = _CoreInternals.Konva.Util._assign(_CoreInternals.Konva, {
    Arc: Arc_1.Arc,
    Arrow: Arrow_1.Arrow,
    Circle: Circle_1.Circle,
    Ellipse: Ellipse_1.Ellipse,
    Image: Image_1.Image,
    Label: Label_1.Label,
    Tag: Label_1.Tag,
    Line: Line_1.Line,
    Path: Path_1.Path,
    Rect: Rect_1.Rect,
    RegularPolygon: RegularPolygon_1.RegularPolygon,
    Ring: Ring_1.Ring,
    Sprite: Sprite_1.Sprite,
    Star: Star_1.Star,
    Text: Text_1.Text,
    TextPath: TextPath_1.TextPath,
    Transformer: Transformer_1.Transformer,
    Wedge: Wedge_1.Wedge,
    Filters: {
      Blur: Blur_1.Blur,
      Brighten: Brighten_1.Brighten,
      Contrast: Contrast_1.Contrast,
      Emboss: Emboss_1.Emboss,
      Enhance: Enhance_1.Enhance,
      Grayscale: Grayscale_1.Grayscale,
      HSL: HSL_1.HSL,
      HSV: HSV_1.HSV,
      Invert: Invert_1.Invert,
      Kaleidoscope: Kaleidoscope_1.Kaleidoscope,
      Mask: Mask_1.Mask,
      Noise: Noise_1.Noise,
      Pixelate: Pixelate_1.Pixelate,
      Posterize: Posterize_1.Posterize,
      RGB: RGB_1.RGB,
      RGBA: RGBA_1.RGBA,
      Sepia: Sepia_1.Sepia,
      Solarize: Solarize_1.Solarize,
      Threshold: Threshold_1.Threshold
    }
  });
});
var lib = createCommonjsModule(function(module, exports) {
  var Konva = _FullInternals.Konva;
  Konva._injectGlobal(Konva);
  exports["default"] = Konva;
  module.exports = exports["default"];
});
export default lib;
