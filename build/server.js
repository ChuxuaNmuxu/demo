module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _app = __webpack_require__(10);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _app2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_TODO = exports.ADD_TODO = 'add_todo';
var TOGGLE_TODO = exports.TOGGLE_TODO = 'toggle_todo';

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _about = __webpack_require__(23);

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _about2.default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _app = __webpack_require__(2);

var _app2 = _interopRequireDefault(_app);

var _about = __webpack_require__(5);

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var routes = [{
    path: '/',
    component: _app2.default
}, {
    path: '/about',
    component: _about2.default
}];

exports.default = routes;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var initialState = {
    todos: [{
        text: '拯救大兵',
        completed: false
    }]
};

exports.default = initialState;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _home = __webpack_require__(9);

var _home2 = _interopRequireDefault(_home);

var _routes = __webpack_require__(6);

var _routes2 = _interopRequireDefault(_routes);

var _reactRedux = __webpack_require__(3);

var _store = __webpack_require__(24);

var _store2 = _interopRequireDefault(_store);

var _initialState = __webpack_require__(7);

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * 服务端静态路由
 * @param {object} config 路由参数 @https://reacttraining.com/react-router/web/api/StaticRouter
 */
var serverAppConstructor = function serverAppConstructor(config) {
    // load data
    // matchPath 相当于渲染之外的route,可以匹配路由，参数和route一致，（route是组件，所以只能在渲染的时候去匹配）,可以用来预加载数据等
    // matchPath 第二个参数与第一个参数竞争匹配（好像是更严格的限制条件）
    var location = config.location;

    var promises = [];
    _routes2.default.some(function (route) {
        var match = (0, _reactRouterDom.matchPath)(location, route);
        if (match) {
            var fetchData = route.loadData ? route.loadData(match) : Promise.resolve('');
            promises.push(fetchData);
        }
    });

    // 服务器端路由只需要接受客户端请求的地址，而不需要监听浏览器location的变化，所以使用静态路由
    // BroserRouter会接受浏览器的api（history，dom...），用在服务端会报错
    return Promise.all(promises).then(function (data) {
        // initialState logic
        var preloadedState = data.reduce(function (accu, value) {
            return Object.assign(accu, value);
        }, Object.assign({}, _initialState2.default));

        // store of redux
        var store = (0, _store2.default)(preloadedState);

        return {
            Root: _react2.default.createElement(_reactRedux.Provider, { store: store }, _react2.default.createElement(_reactRouterDom.StaticRouter, config, _react2.default.createElement(_home2.default, null))),
            preloadedState: preloadedState
        };
    });
};

exports.default = serverAppConstructor;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(1);

var _app = __webpack_require__(2);

var _app2 = _interopRequireDefault(_app);

var _about = __webpack_require__(5);

var _about2 = _interopRequireDefault(_about);

var _routes = __webpack_require__(6);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var Home = function Home() {
    return _react2.default.createElement('div', null, _react2.default.createElement('ul', null, _react2.default.createElement('li', null, _react2.default.createElement(_reactRouterDom.Link, { to: '/' }, 'Home')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouterDom.Link, { to: '/about' }, 'About')), _react2.default.createElement('li', null, _react2.default.createElement(_reactRouterDom.Link, { to: '/previte' }, 'previte'))), _react2.default.createElement('hr', null), _routes2.default.map(function (_ref) {
        var component = _ref.component,
            path = _ref.path;
        return _react2.default.createElement(_reactRouterDom.Route, { component: component, path: path, key: path });
    }));
};

exports.default = Home;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(11);

var _regenerator2 = _interopRequireDefault2(_regenerator);

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(12);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _reactRedux = __webpack_require__(3);

var _app = __webpack_require__(13);

var _app2 = _interopRequireDefault(_app);

var _action = __webpack_require__(19);

var _fetch = __webpack_require__(20);

var _fetch2 = _interopRequireDefault(_fetch);

var _util = __webpack_require__(22);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);var value = info.value;
                } catch (error) {
                    reject(error);return;
                }if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }return step("next");
        });
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof2(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
// import PropTypes from 'prop-types';


var App = function (_Component) {
    _inherits(App, _Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.state = {
            data: {
                message: 'right'
            }
        };

        _this._handleClick = _this._handleClick.bind(_this);
        _this.handleAddTodo = _this.handleAddTodo.bind(_this);
        return _this;
    }

    _createClass(App, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log('root 生命周期 willMount 触发了！');
        }
    }, {
        key: 'componentDidMount',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var response, data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;

                                console.log('fetch: ', _fetch2.default);
                                _context.next = 4;
                                return (0, _fetch2.default)('/api/test');

                            case 4:
                                response = _context.sent;
                                _context.next = 7;
                                return response.text();

                            case 7:
                                data = _context.sent;

                                console.log('response: ', typeof data === 'undefined' ? 'undefined' : _typeof(data));
                                this.setState({
                                    data: (0, _util.isString)(data) ? JSON.parse(data) : data
                                });
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](0);

                                this.setState({ data: 'Error ' + _context.t0.message });

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 12]]);
            }));

            function componentDidMount() {
                return _ref.apply(this, arguments);
            }

            return componentDidMount;
        }()
    }, {
        key: '_handleClick',
        value: function _handleClick() {
            alert('yf超帅的！');
        }
    }, {
        key: 'handleAddTodo',
        value: function handleAddTodo() {
            var addTodo = this.props.addTodo;

            addTodo({
                text: 'another todo',
                completed: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var todos = this.props.todos;

            return _react2.default.createElement('div', { className: 'app', styleName: 'app' }, this.state.data.message, _react2.default.createElement('div', { className: 'container', onClick: this._handleClick }, 'App demo'), _react2.default.createElement('div', { onClick: this.handleAddTodo }, todos.map(function (_ref2) {
                var text = _ref2.text,
                    completed = _ref2.completed,
                    index = _ref2.index;
                return _react2.default.createElement('div', { key: text + '-' + index }, _react2.default.createElement('span', null, text), _react2.default.createElement('span', null, '\xA0\xA0'), _react2.default.createElement('span', null, completed ? 'done' : 'todo'));
            })));
        }
    }]);

    return App;
}(_react.Component);

// App.propTypes = {

// };

var mapStateToState = function mapStateToState(state) {
    var todos = state.todos;

    return {
        todos: todos
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        addTodo: function addTodo(data) {
            return dispatch((0, _action.addTodo)(data));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToState, mapDispatchToProps)((0, _reactCssModules2.default)(App, _app2.default));

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("react-css-modules");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(14);
    var insertCss = __webpack_require__(16);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../../../node_modules/css-loader/index.js??ref--2-1!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js!./app.scss", function() {
        content = require("!!../../../../node_modules/css-loader/index.js??ref--2-1!../../../../node_modules/postcss-loader/lib/index.js!../../../../node_modules/sass-loader/lib/loader.js!./app.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(true);
// imports


// module
exports.push([module.i, ".app__app___3MFEG {\n  color: red; }\n  .app__app___3MFEG .container {\n    background-color: orange; }\n", "", {"version":3,"sources":["E:/Documents/04repo/demos/demo/src/view/page/app/app.scss"],"names":[],"mappings":"AAAA;EACE,WAAW,EAAE;EACb;IACE,yBAAyB,EAAE","file":"app.scss","sourcesContent":[".app {\n  color: red; }\n  .app :global .container {\n    background-color: orange; }\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"app": "app__app___3MFEG"
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(17);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(18);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addTodo = undefined;

var _actionType = __webpack_require__(4);

var actionType = _interopRequireWildcard(_actionType);

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

var addTodo = exports.addTodo = function addTodo(data) {
    return {
        type: actionType.ADD_TODO,
        data: data
    };
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = exports.Headers = exports.Request = exports.default = undefined;

var _nodeFetch = __webpack_require__(21);

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function localFetch(url, options) {
  return (0, _nodeFetch2.default)(url.startsWith('http') ? url : 'http://localhost:3099' + url, options);
}

exports.default = localFetch;
exports.Request = _nodeFetch.Request;
exports.Headers = _nodeFetch.Headers;
exports.Response = _nodeFetch.Response;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var About = function About() {
    return _react2.default.createElement('div', null, 'react-router 4\u7684staticRouter\u548CbrowserRouter\u6709\u4EC0\u4E48\u533A\u522B');
};

exports.default = About;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(25);

var _reducers = __webpack_require__(26);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var create = function create(initialState) {
    return (0, _redux.createStore)(_reducers2.default, initialState);
};

exports.default = create;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionType = __webpack_require__(4);

var constant = _interopRequireWildcard(_actionType);

var _initialState = __webpack_require__(7);

var _initialState2 = _interopRequireDefault(_initialState);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }newObj.default = obj;return newObj;
    }
}

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }return arr2;
    } else {
        return Array.from(arr);
    }
}

var reducers = function reducers() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState2.default;
    var action = arguments[1];

    switch (action.type) {
        case constant.ADD_TODO:
            return Object.assign({}, state, {
                todos: [].concat(_toConsumableArray(state.todos), [{
                    text: action.data.text,
                    completed: action.data.completed
                }])
            });
            break;
        default:
            return state;
    }
};

exports.default = reducers;

/***/ })
/******/ ]);