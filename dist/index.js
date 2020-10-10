
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

  var umap = (function (_) {
    return {
      // About: get: _.get.bind(_)
      // It looks like WebKit/Safari didn't optimize bind at all,
      // so that using bind slows it down by 60%.
      // Firefox and Chrome are just fine in both cases,
      // so let's use the approach that works fast everywhere 👍
      get: function get(key) {
        return _.get(key);
      },
      set: function set(key, value) {
        return _.set(key, value), value;
      }
    };
  });

  var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
  var empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  var node = /<[a-z][^>]+$/i;
  var notNode = />[^<>]*$/;
  var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
  var trimEnd = /\s+$/;

  var isNode = function isNode(template, i) {
    return 0 < i-- && (node.test(template[i]) || !notNode.test(template[i]) && isNode(template, i));
  };

  var regular = function regular(original, name, extra) {
    return empty.test(name) ? original : "<".concat(name).concat(extra.replace(trimEnd, ''), "></").concat(name, ">");
  };

  var instrument = (function (template, prefix, svg) {
    var text = [];
    var length = template.length;

    var _loop = function _loop(i) {
      var chunk = template[i - 1];
      text.push(attr.test(chunk) && isNode(template, i) ? chunk.replace(attr, function (_, $1, $2) {
        return "".concat(prefix).concat(i - 1, "=").concat($2 || '"').concat($1).concat($2 ? '' : '"');
      }) : "".concat(chunk, "<!--").concat(prefix).concat(i - 1, "-->"));
    };

    for (var i = 1; i < length; i++) {
      _loop(i);
    }

    text.push(template[length - 1]);
    var output = text.join('').trim();
    return svg ? output : output.replace(selfClosing, regular);
  });

  var isArray = Array.isArray;
  var _ref = [],
      indexOf = _ref.indexOf,
      slice = _ref.slice;

  var ELEMENT_NODE = 1;
  var nodeType = 111;

  var remove = function remove(_ref) {
    var firstChild = _ref.firstChild,
        lastChild = _ref.lastChild;
    var range = document.createRange();
    range.setStartAfter(firstChild);
    range.setEndAfter(lastChild);
    range.deleteContents();
    return firstChild;
  };

  var diffable = function diffable(node, operation) {
    return node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
  };
  var persistent = function persistent(fragment) {
    var childNodes = fragment.childNodes;
    var length = childNodes.length;
    if (length < 2) return length ? childNodes[0] : fragment;
    var nodes = slice.call(childNodes, 0);
    var firstChild = nodes[0];
    var lastChild = nodes[length - 1];
    return {
      ELEMENT_NODE: ELEMENT_NODE,
      nodeType: nodeType,
      firstChild: firstChild,
      lastChild: lastChild,
      valueOf: function valueOf() {
        if (childNodes.length !== length) {
          var i = 0;

          while (i < length) {
            fragment.appendChild(nodes[i++]);
          }
        }

        return fragment;
      }
    };
  };

  /**
   * ISC License
   *
   * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
   *
   * Permission to use, copy, modify, and/or distribute this software for any
   * purpose with or without fee is hereby granted, provided that the above
   * copyright notice and this permission notice appear in all copies.
   *
   * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
   * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
   * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
   * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
   * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
   * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
   * PERFORMANCE OF THIS SOFTWARE.
   */

  /**
   * @param {Node} parentNode The container where children live
   * @param {Node[]} a The list of current/live children
   * @param {Node[]} b The list of future children
   * @param {(entry: Node, action: number) => Node} get
   * The callback invoked per each entry related DOM operation.
   * @param {Node} [before] The optional node used as anchor to insert before.
   * @returns {Node[]} The same list of future children.
   */
  var udomdiff = (function (parentNode, a, b, get, before) {
    var bLength = b.length;
    var aEnd = a.length;
    var bEnd = bLength;
    var aStart = 0;
    var bStart = 0;
    var map = null;

    while (aStart < aEnd || bStart < bEnd) {
      // append head, tail, or nodes in between: fast path
      if (aEnd === aStart) {
        // we could be in a situation where the rest of nodes that
        // need to be added are not at the end, and in such case
        // the node to `insertBefore`, if the index is more than 0
        // must be retrieved, otherwise it's gonna be the first item.
        var node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

        while (bStart < bEnd) {
          parentNode.insertBefore(get(b[bStart++], 1), node);
        }
      } // remove head or tail: fast path
      else if (bEnd === bStart) {
          while (aStart < aEnd) {
            // remove the node only if it's unknown or not live
            if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
            aStart++;
          }
        } // same node: fast path
        else if (a[aStart] === b[bStart]) {
            aStart++;
            bStart++;
          } // same tail: fast path
          else if (a[aEnd - 1] === b[bEnd - 1]) {
              aEnd--;
              bEnd--;
            } // The once here single last swap "fast path" has been removed in v1.1.0
            // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
            // reverse swap: also fast path
            else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
                // this is a "shrink" operation that could happen in these cases:
                // [1, 2, 3, 4, 5]
                // [1, 4, 3, 2, 5]
                // or asymmetric too
                // [1, 2, 3, 4, 5]
                // [1, 2, 3, 5, 6, 4]
                var _node = get(a[--aEnd], -1).nextSibling;
                parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
                parentNode.insertBefore(get(b[--bEnd], 1), _node); // mark the future index as identical (yeah, it's dirty, but cheap 👍)
                // The main reason to do this, is that when a[aEnd] will be reached,
                // the loop will likely be on the fast path, as identical to b[bEnd].
                // In the best case scenario, the next loop will skip the tail,
                // but in the worst one, this node will be considered as already
                // processed, bailing out pretty quickly from the map index check

                a[aEnd] = b[bEnd];
              } // map based fallback, "slow" path
              else {
                  // the map requires an O(bEnd - bStart) operation once
                  // to store all future nodes indexes for later purposes.
                  // In the worst case scenario, this is a full O(N) cost,
                  // and such scenario happens at least when all nodes are different,
                  // but also if both first and last items of the lists are different
                  if (!map) {
                    map = new Map();
                    var i = bStart;

                    while (i < bEnd) {
                      map.set(b[i], i++);
                    }
                  } // if it's a future node, hence it needs some handling


                  if (map.has(a[aStart])) {
                    // grab the index of such node, 'cause it might have been processed
                    var index = map.get(a[aStart]); // if it's not already processed, look on demand for the next LCS

                    if (bStart < index && index < bEnd) {
                      var _i = aStart; // counts the amount of nodes that are the same in the future

                      var sequence = 1;

                      while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === index + sequence) {
                        sequence++;
                      } // effort decision here: if the sequence is longer than replaces
                      // needed to reach such sequence, which would brings again this loop
                      // to the fast path, prepend the difference before a sequence,
                      // and move only the future list index forward, so that aStart
                      // and bStart will be aligned again, hence on the fast path.
                      // An example considering aStart and bStart are both 0:
                      // a: [1, 2, 3, 4]
                      // b: [7, 1, 2, 3, 6]
                      // this would place 7 before 1 and, from that time on, 1, 2, and 3
                      // will be processed at zero cost


                      if (sequence > index - bStart) {
                        var _node2 = get(a[aStart], 0);

                        while (bStart < index) {
                          parentNode.insertBefore(get(b[bStart++], 1), _node2);
                        }
                      } // if the effort wasn't good enough, fallback to a replace,
                      // moving both source and target indexes forward, hoping that some
                      // similar node will be found later on, to go back to the fast path
                      else {
                          parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
                        }
                    } // otherwise move the source forward, 'cause there's nothing to do
                    else aStart++;
                  } // this node has no meaning in the future list, so it's more than safe
                  // to remove it, and check the next live node out instead, meaning
                  // that only the live list index should be forwarded
                  else parentNode.removeChild(get(a[aStart++], -1));
                }
    }

    return b;
  });

  var aria = function aria(node) {
    return function (values) {
      for (var key in values) {
        var name = key === 'role' ? key : "aria-".concat(key);
        var value = values[key];
        if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
      }
    };
  };
  var attribute = function attribute(node, name) {
    var oldValue,
        orphan = true;
    var attributeNode = document.createAttributeNS(null, name);
    return function (newValue) {
      if (oldValue !== newValue) {
        oldValue = newValue;

        if (oldValue == null) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = newValue;

          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };
  var data = function data(_ref) {
    var dataset = _ref.dataset;
    return function (values) {
      for (var key in values) {
        var value = values[key];
        if (value == null) delete dataset[key];else dataset[key] = value;
      }
    };
  };
  var event = function event(node, name) {
    var oldValue,
        type = name.slice(2);
    if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
    return function (newValue) {
      var info = isArray(newValue) ? newValue : [newValue, false];

      if (oldValue !== info[0]) {
        if (oldValue) node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = function ref(node) {
    return function (value) {
      if (typeof value === 'function') value(node);else value.current = node;
    };
  };
  var setter = function setter(node, key) {
    return function (value) {
      node[key] = value;
    };
  };
  var text = function text(node) {
    var oldValue;
    return function (newValue) {
      if (oldValue != newValue) {
        oldValue = newValue;
        node.textContent = newValue == null ? '' : newValue;
      }
    };
  };

  /*! (c) Andrea Giammarchi - ISC */
  var createContent = function (document) {

    var FRAGMENT = 'fragment';
    var TEMPLATE = 'template';
    var HAS_CONTENT = ('content' in create(TEMPLATE));
    var createHTML = HAS_CONTENT ? function (html) {
      var template = create(TEMPLATE);
      template.innerHTML = html;
      return template.content;
    } : function (html) {
      var content = create(FRAGMENT);
      var template = create(TEMPLATE);
      var childNodes = null;

      if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
        var selector = RegExp.$1;
        template.innerHTML = '<table>' + html + '</table>';
        childNodes = template.querySelectorAll(selector);
      } else {
        template.innerHTML = html;
        childNodes = template.childNodes;
      }

      append(content, childNodes);
      return content;
    };
    return function createContent(markup, type) {
      return (type === 'svg' ? createSVG : createHTML)(markup);
    };

    function append(root, childNodes) {
      var length = childNodes.length;

      while (length--) {
        root.appendChild(childNodes[0]);
      }
    }

    function create(element) {
      return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
    } // it could use createElementNS when hasNode is there
    // but this fallback is equally fast and easier to maintain
    // it is also battle tested already in all IE


    function createSVG(svg) {
      var content = create(FRAGMENT);
      var template = create('div');
      template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
      append(content, template.firstChild.childNodes);
      return content;
    }
  }(document);

  var reducePath = function reducePath(_ref, i) {
    var childNodes = _ref.childNodes;
    return childNodes[i];
  }; // from a fragment container, create an array of indexes
  // related to its child nodes, so that it's possible
  // to retrieve later on exact node via reducePath

  var createPath = function createPath(node) {
    var path = [];
    var _node = node,
        parentNode = _node.parentNode;

    while (parentNode) {
      path.push(indexOf.call(parentNode.childNodes, node));
      node = parentNode;
      parentNode = node.parentNode;
    }

    return path;
  };
  var _document = document,
      createTreeWalker = _document.createTreeWalker,
      importNode = _document.importNode;

  var IE = importNode.length != 1; // IE11 and old Edge discard empty nodes when cloning, potentially
  // resulting in broken paths to find updates. The workaround here
  // is to import once, upfront, the fragment that will be cloned
  // later on, so that paths are retrieved from one already parsed,
  // hence without missing child nodes once re-cloned.

  var createFragment = IE ? function (text, type) {
    return importNode.call(document, createContent(text, type), true);
  } : createContent; // IE11 and old Edge have a different createTreeWalker signature that
  // has been deprecated in other browsers. This export is needed only
  // to guarantee the TreeWalker doesn't show warnings and, ultimately, works

  var createWalker = IE ? function (fragment) {
    return createTreeWalker.call(document, fragment, 1 | 128, null, false);
  } : function (fragment) {
    return createTreeWalker.call(document, fragment, 1 | 128);
  };

  var diff = function diff(comment, oldNodes, newNodes) {
    return udomdiff(comment.parentNode, // TODO: there is a possible edge case where a node has been
    //       removed manually, or it was a keyed one, attached
    //       to a shared reference between renders.
    //       In this case udomdiff might fail at removing such node
    //       as its parent won't be the expected one.
    //       The best way to avoid this issue is to filter oldNodes
    //       in search of those not live, or not in the current parent
    //       anymore, but this would require both a change to uwire,
    //       exposing a parentNode from the firstChild, as example,
    //       but also a filter per each diff that should exclude nodes
    //       that are not in there, penalizing performance quite a lot.
    //       As this has been also a potential issue with domdiff,
    //       and both lighterhtml and hyperHTML might fail with this
    //       very specific edge case, I might as well document this possible
    //       "diffing shenanigan" and call it a day.
    oldNodes, newNodes, diffable, comment);
  }; // if an interpolation represents a comment, the whole
  // diffing will be related to such comment.
  // This helper is in charge of understanding how the new
  // content for such interpolation/hole should be updated


  var handleAnything = function handleAnything(comment) {
    var oldValue,
        text,
        nodes = [];

    var anyContent = function anyContent(newValue) {
      switch (_typeof(newValue)) {
        // primitives are handled as text content
        case 'string':
        case 'number':
        case 'boolean':
          if (oldValue !== newValue) {
            oldValue = newValue;
            if (text) text.textContent = newValue;else text = document.createTextNode(newValue);
            nodes = diff(comment, nodes, [text]);
          }

          break;
        // null, and undefined are used to cleanup previous content

        case 'object':
        case 'undefined':
          if (newValue == null) {
            if (oldValue != newValue) {
              oldValue = newValue;
              nodes = diff(comment, nodes, []);
            }

            break;
          } // arrays and nodes have a special treatment


          if (isArray(newValue)) {
            oldValue = newValue; // arrays can be used to cleanup, if empty

            if (newValue.length === 0) nodes = diff(comment, nodes, []); // or diffed, if these contains nodes or "wires"
            else if (_typeof(newValue[0]) === 'object') nodes = diff(comment, nodes, newValue); // in all other cases the content is stringified as is
              else anyContent(String(newValue));
            break;
          } // if the new value is a DOM node, or a wire, and it's
          // different from the one already live, then it's diffed.
          // if the node is a fragment, it's appended once via its childNodes
          // There is no `else` here, meaning if the content
          // is not expected one, nothing happens, as easy as that.


          if ('ELEMENT_NODE' in newValue && oldValue !== newValue) {
            oldValue = newValue;
            nodes = diff(comment, nodes, newValue.nodeType === 11 ? slice.call(newValue.childNodes) : [newValue]);
          }

      }
    };

    return anyContent;
  }; // attributes can be:
  //  * ref=${...}      for hooks and other purposes
  //  * aria=${...}     for aria attributes
  //  * .dataset=${...} for dataset related attributes
  //  * .setter=${...}  for Custom Elements setters or nodes with setters
  //                    such as buttons, details, options, select, etc
  //  * onevent=${...}  to automatically handle event listeners
  //  * generic=${...}  to handle an attribute just like an attribute


  var handleAttribute = function handleAttribute(node, name
  /*, svg*/
  ) {
    if (name === 'ref') return ref(node);
    if (name === 'aria') return aria(node);
    if (name === '.dataset') return data(node);
    if (name.slice(0, 1) === '.') return setter(node, name.slice(1));
    if (name.slice(0, 2) === 'on') return event(node, name);
    return attribute(node, name
    /*, svg*/
    );
  }; // each mapped update carries the update type and its path
  // the type is either node, attribute, or text, while
  // the path is how to retrieve the related node to update.
  // In the attribute case, the attribute name is also carried along.


  function handlers(options) {
    var type = options.type,
        path = options.path;
    var node = path.reduceRight(reducePath, this);
    return type === 'node' ? handleAnything(node) : type === 'attr' ? handleAttribute(node, options.name
    /*, options.svg*/
    ) : text(node);
  }

  // that contain the related unique id. In the attribute cases
  // isµX="attribute-name" will be used to map current X update to that
  // attribute name, while comments will be like <!--isµX-->, to map
  // the update to that specific comment node, hence its parent.
  // style and textarea will have <!--isµX--> text content, and are handled
  // directly through text-only updates.

  var prefix = 'isµ'; // Template Literals are unique per scope and static, meaning a template
  // should be parsed once, and once only, as it will always represent the same
  // content, within the exact same amount of updates each time.
  // This cache relates each template to its unique content and updates.

  var cache = umap(new WeakMap());
  var createCache = function createCache() {
    return {
      stack: [],
      // each template gets a stack for each interpolation "hole"
      entry: null,
      // each entry contains details, such as:
      //  * the template that is representing
      //  * the type of node it represents (html or svg)
      //  * the content fragment with all nodes
      //  * the list of updates per each node (template holes)
      //  * the "wired" node or fragment that will get updates
      // if the template or type are different from the previous one
      // the entry gets re-created each time
      wire: null // each rendered node represent some wired content and
      // this reference to the latest one. If different, the node
      // will be cleaned up and the new "wire" will be appended

    };
  }; // the entry stored in the rendered node cache, and per each "hole"

  var createEntry = function createEntry(type, template) {
    var _mapUpdates = mapUpdates(type, template),
        content = _mapUpdates.content,
        updates = _mapUpdates.updates;

    return {
      type: type,
      template: template,
      content: content,
      updates: updates,
      wire: null
    };
  }; // a template is instrumented to be able to retrieve where updates are needed.
  // Each unique template becomes a fragment, cloned once per each other
  // operation based on the same template, i.e. data => html`<p>${data}</p>`


  var mapTemplate = function mapTemplate(type, template) {
    var text = instrument(template, prefix, type === 'svg');
    var content = createFragment(text, type); // once instrumented and reproduced as fragment, it's crawled
    // to find out where each update is in the fragment tree

    var tw = createWalker(content);
    var nodes = [];
    var length = template.length - 1;
    var i = 0; // updates are searched via unique names, linearly increased across the tree
    // <div isµ0="attr" isµ1="other"><!--isµ2--><style><!--isµ3--</style></div>

    var search = "".concat(prefix).concat(i);

    while (i < length) {
      var node = tw.nextNode(); // if not all updates are bound but there's nothing else to crawl
      // it means that there is something wrong with the template.

      if (!node) throw "bad template: ".concat(text); // if the current node is a comment, and it contains isµX
      // it means the update should take care of any content

      if (node.nodeType === 8) {
        // The only comments to be considered are those
        // which content is exactly the same as the searched one.
        if (node.textContent === search) {
          nodes.push({
            type: 'node',
            path: createPath(node)
          });
          search = "".concat(prefix).concat(++i);
        }
      } else {
        // if the node is not a comment, loop through all its attributes
        // named isµX and relate attribute updates to this node and the
        // attribute name, retrieved through node.getAttribute("isµX")
        // the isµX attribute will be removed as irrelevant for the layout
        // let svg = -1;
        while (node.hasAttribute(search)) {
          nodes.push({
            type: 'attr',
            path: createPath(node),
            name: node.getAttribute(search) //svg: svg < 0 ? (svg = ('ownerSVGElement' in node ? 1 : 0)) : svg

          });
          node.removeAttribute(search);
          search = "".concat(prefix).concat(++i);
        } // if the node was a style or a textarea one, check its content
        // and if it is <!--isµX--> then update tex-only this node


        if (/^(?:style|textarea)$/i.test(node.tagName) && node.textContent.trim() === "<!--".concat(search, "-->")) {
          nodes.push({
            type: 'text',
            path: createPath(node)
          });
          search = "".concat(prefix).concat(++i);
        }
      }
    } // once all nodes to update, or their attributes, are known, the content
    // will be cloned in the future to represent the template, and all updates
    // related to such content retrieved right away without needing to re-crawl
    // the exact same template, and its content, more than once.


    return {
      content: content,
      nodes: nodes
    };
  }; // if a template is unknown, perform the previous mapping, otherwise grab
  // its details such as the fragment with all nodes, and updates info.


  var mapUpdates = function mapUpdates(type, template) {
    var _ref = cache.get(template) || cache.set(template, mapTemplate(type, template)),
        content = _ref.content,
        nodes = _ref.nodes; // clone deeply the fragment


    var fragment = importNode.call(document, content, true); // and relate an update handler per each node that needs one

    var updates = nodes.map(handlers, fragment); // return the fragment and all updates to use within its nodes

    return {
      content: fragment,
      updates: updates
    };
  }; // as html and svg can be nested calls, but no parent node is known
  // until rendered somewhere, the unroll operation is needed to
  // discover what to do with each interpolation, which will result
  // into an update operation.


  var unroll = function unroll(info, _ref2) {
    var type = _ref2.type,
        template = _ref2.template,
        values = _ref2.values;
    var length = values.length; // interpolations can contain holes and arrays, so these need
    // to be recursively discovered

    unrollValues(info, values, length);
    var entry = info.entry; // if the cache entry is either null or different from the template
    // and the type this unroll should resolve, create a new entry
    // assigning a new content fragment and the list of updates.

    if (!entry || entry.template !== template || entry.type !== type) info.entry = entry = createEntry(type, template);
    var _entry = entry,
        content = _entry.content,
        updates = _entry.updates,
        wire = _entry.wire; // even if the fragment and its nodes is not live yet,
    // it is already possible to update via interpolations values.

    for (var i = 0; i < length; i++) {
      updates[i](values[i]);
    } // if the entry was new, or representing a different template or type,
    // create a new persistent entity to use during diffing.
    // This is simply a DOM node, when the template has a single container,
    // as in `<p></p>`, or a "wire" in `<p></p><p></p>` and similar cases.


    return wire || (entry.wire = persistent(content));
  }; // the stack retains, per each interpolation value, the cache
  // related to each interpolation value, or null, if the render
  // was conditional and the value is not special (Array or Hole)

  var unrollValues = function unrollValues(_ref3, values, length) {
    var stack = _ref3.stack;

    for (var i = 0; i < length; i++) {
      var hole = values[i]; // each Hole gets unrolled and re-assigned as value
      // so that domdiff will deal with a node/wire, not with a hole

      if (hole instanceof Hole) values[i] = unroll(stack[i] || (stack[i] = createCache()), hole); // arrays are recursively resolved so that each entry will contain
      // also a DOM node or a wire, hence it can be diffed if/when needed
      else if (isArray(hole)) unrollValues(stack[i] || (stack[i] = createCache()), hole, hole.length); // if the value is nothing special, the stack doesn't need to retain data
        // this is useful also to cleanup previously retained data, if the value
        // was a Hole, or an Array, but not anymore, i.e.:
        // const update = content => html`<div>${content}</div>`;
        // update(listOfItems); update(null); update(html`hole`)
        else stack[i] = null;
    }

    if (length < stack.length) stack.splice(length);
  };
  /**
   * Holds all details wrappers needed to render the content further on.
   * @constructor
   * @param {string} type The hole type, either `html` or `svg`.
   * @param {string[]} template The template literals used to the define the content.
   * @param {Array} values Zero, one, or more interpolated values to render.
   */


  function Hole(type, template, values) {
    this.type = type;
    this.template = template;
    this.values = values;
  }

  var create = Object.create,
      defineProperties = Object.defineProperties; // both `html` and `svg` template literal tags are polluted
  // with a `for(ref[, id])` and a `node` tag too

  var tag = function tag(type) {
    // both `html` and `svg` tags have their own cache
    var keyed = umap(new WeakMap()); // keyed operations always re-use the same cache and unroll
    // the template and its interpolations right away

    var fixed = function fixed(cache) {
      return function (template) {
        for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }

        return unroll(cache, {
          type: type,
          template: template,
          values: values
        });
      };
    };

    return defineProperties( // non keyed operations are recognized as instance of Hole
    // during the "unroll", recursively resolved and updated
    function (template) {
      for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }

      return new Hole(type, template, values);
    }, {
      for: {
        // keyed operations need a reference object, usually the parent node
        // which is showing keyed results, and optionally a unique id per each
        // related node, handy with JSON results and mutable list of objects
        // that usually carry a unique identifier
        value: function value(ref, id) {
          var memo = keyed.get(ref) || keyed.set(ref, create(null));
          return memo[id] || (memo[id] = fixed(createCache()));
        }
      },
      node: {
        // it is possible to create one-off content out of the box via node tag
        // this might return the single created node, or a fragment with all
        // nodes present at the root level and, of course, their child nodes
        value: function value(template) {
          for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            values[_key3 - 1] = arguments[_key3];
          }

          return unroll(createCache(), {
            type: type,
            template: template,
            values: values
          }).valueOf();
        }
      }
    });
  }; // each rendered node gets its own cache


  var cache$1 = umap(new WeakMap()); // rendering means understanding what `html` or `svg` tags returned
  // and it relates a specific node to its own unique cache.
  // Each time the content to render changes, the node is cleaned up
  // and the new new content is appended, and if such content is a Hole
  // then it's "unrolled" to resolve all its inner nodes.

  var render = function render(where, what) {
    var hole = typeof what === 'function' ? what() : what;
    var info = cache$1.get(where) || cache$1.set(where, createCache());
    var wire = hole instanceof Hole ? unroll(info, hole) : hole;

    if (wire !== info.wire) {
      info.wire = wire;
      where.textContent = ''; // valueOf() simply returns the node itself, but in case it was a "wire"
      // it will eventually re-append all nodes to its fragment so that such
      // fragment can be re-appended many times in a meaningful way
      // (wires are basically persistent fragments facades with special behavior)

      where.appendChild(wire.valueOf());
    }

    return where;
  };

  var html = tag('html');
  var svg = tag('svg');

  function css (t) {
    for (var s = t[0], i = 1, l = arguments.length; i < l; i++) {
      s += arguments[i] + t[i];
    }

    return s;
  }

  var defineProperties$1 = Object.defineProperties,
      keys = Object.keys;

  var accessor = function accessor(all, shallow, hook, value, update) {
    return {
      configurable: true,
      get: function get() {
        return value;
      },
      set: function set(_) {
        if (all || _ !== value || shallow && _typeof(_) === 'object' && _) {
          value = _;
          if (hook) update.call(this, value);else update.call(this);
        }
      }
    };
  };

  var loop = function loop(props, get, all, shallow, useState, update) {
    var desc = {};
    var hook = useState !== noop;
    var args = [all, shallow, hook];

    for (var ke = keys(props), y = 0; y < ke.length; y++) {
      var value = get(props, ke[y]);
      var extras = hook ? useState(value) : [value, useState];
      if (update) extras[1] = update;
      desc[ke[y]] = accessor.apply(null, args.concat(extras));
    }

    return desc;
  };
  var noop = function noop() {};

  var domHandler = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$all = _ref.all,
        all = _ref$all === void 0 ? false : _ref$all,
        _ref$shallow = _ref.shallow,
        shallow = _ref$shallow === void 0 ? true : _ref$shallow,
        _ref$useState = _ref.useState,
        useState = _ref$useState === void 0 ? noop : _ref$useState,
        _ref$getAttribute = _ref.getAttribute,
        getAttribute = _ref$getAttribute === void 0 ? function (element, key) {
      return element.getAttribute(key);
    } : _ref$getAttribute;

    return function (element, props, update) {
      var value = function value(props, key) {
        var result = props[key],
            type = _typeof(result);

        if (element.hasOwnProperty(key)) {
          result = element[key];
          delete element[key];
        } else if (element.hasAttribute(key)) {
          result = getAttribute(element, key);
          if (type == 'number') result = +result;else if (type == 'boolean') result = !/^(?:false|0|)$/.test(result);
        }

        return result;
      };

      var desc = loop(props, value, all, shallow, useState, update);
      return defineProperties$1(element, desc);
    };
  });

  var reactive = domHandler({
    dom: true
  });
  var CE = customElements;
  var defineCustomElement = CE.define;
  var create$1 = Object.create,
      defineProperties$2 = Object.defineProperties,
      getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
      keys$1 = Object.keys;
  var element = 'element';
  var constructors = umap(new Map([[element, {
    c: HTMLElement,
    e: element
  }]]));

  var el = function el(name) {
    return document.createElement(name);
  };

  var info = function info(e) {
    return constructors.get(e) || constructors.set(e, {
      c: el(e).constructor,
      e: e
    });
  };

  var define = function define(tagName, definition) {
    var attachShadow = definition.attachShadow,
        attributeChanged = definition.attributeChanged,
        bound = definition.bound,
        connected = definition.connected,
        disconnected = definition.disconnected,
        handleEvent = definition.handleEvent,
        init = definition.init,
        observedAttributes = definition.observedAttributes,
        props = definition.props,
        render = definition.render,
        style = definition.style;
    var initialized = new WeakMap();
    var statics = {};
    var proto = {};
    var listeners = [];
    var retype = create$1(null);

    var bootstrap = function bootstrap(element, key, value) {
      if (!initialized.has(element)) {
        initialized.set(element, 0);
        defineProperties$2(element, {
          html: {
            value: content.bind(attachShadow ? element.attachShadow(attachShadow) : element)
          }
        });

        for (var i = 0; i < length; i++) {
          var _listeners$i = listeners[i],
              type = _listeners$i.type,
              options = _listeners$i.options;
          element.addEventListener(type, element, options);
        }

        if (bound) bound.forEach(bind, element);
        if (props) reactive(element, props, render);
        if (init || render) (init || render).call(element);
        if (key) element[key] = value;
      }
    };

    for (var k = keys$1(definition), i = 0, _length = k.length; i < _length; i++) {
      var key = k[i];

      if (/^on./.test(key) && !/Options$/.test(key)) {
        var options = definition[key + 'Options'] || false;
        var lower = key.toLowerCase();
        var type = lower.slice(2);
        listeners.push({
          type: type,
          options: options
        });
        retype[type] = key;

        if (lower !== key) {
          type = lower.slice(2, 3) + key.slice(3);
          retype[type] = key;
          listeners.push({
            type: type,
            options: options
          });
        }
      }

      switch (key) {
        case 'attachShadow':
        case 'observedAttributes':
        case 'style':
          break;

        default:
          proto[key] = getOwnPropertyDescriptor(definition, key);
      }
    }

    var length = listeners.length;
    if (length && !handleEvent) proto.handleEvent = {
      value: function value(event) {
        this[retype[event.type]](event);
      }
    }; // [props]
    // this is useless code in uce-template

    if (props !== null) {
      if (props) {
        var _loop = function _loop(_k, _i) {
          var key = _k[_i];
          proto[key] = {
            get: function get() {
              bootstrap(this);
              return props[key];
            },
            set: function set(value) {
              bootstrap(this, key, value);
            }
          };
        };

        for (var _k = keys$1(props), _i = 0; _i < _k.length; _i++) {
          _loop(_k, _i);
        }
      } else {
        proto.props = {
          get: function get() {
            var props = {};

            for (var attributes = this.attributes, _length2 = attributes.length, _i2 = 0; _i2 < _length2; _i2++) {
              var _attributes$_i = attributes[_i2],
                  name = _attributes$_i.name,
                  value = _attributes$_i.value;
              props[name] = value;
            }

            return props;
          }
        };
      }
    } // [/props]


    if (observedAttributes) statics.observedAttributes = {
      value: observedAttributes
    };
    proto.attributeChangedCallback = {
      value: function value() {
        bootstrap(this);
        if (attributeChanged) attributeChanged.apply(this, arguments);
      }
    };
    proto.connectedCallback = {
      value: function value() {
        bootstrap(this);
        if (connected) connected.call(this);
      }
    };
    if (disconnected) proto.disconnectedCallback = {
      value: disconnected
    };

    var _info = info(definition.extends || element),
        c = _info.c,
        e = _info.e;

    var MicroElement = /*#__PURE__*/function (_c) {
      _inherits(MicroElement, _c);

      var _super = _createSuper(MicroElement);

      function MicroElement() {
        _classCallCheck(this, MicroElement);

        return _super.apply(this, arguments);
      }

      return MicroElement;
    }(c);
    defineProperties$2(MicroElement, statics);
    defineProperties$2(MicroElement.prototype, proto);
    var args = [tagName, MicroElement];
    if (e !== element) args.push({
      extends: e
    });
    defineCustomElement.apply(CE, args);
    constructors.set(tagName, {
      c: MicroElement,
      e: e
    });
    if (style) document.head.appendChild(el('style')).textContent = style(e === element ? tagName : e + '[is="' + tagName + '"]');
    return MicroElement;
  };
  /* istanbul ignore else */

  if (!CE.get('uce-lib')) // theoretically this could be just class { ... }
    // however, if there is for whatever reason a <uce-lib>
    // element on the page, it will break once the registry
    // will try to upgrade such element so ... HTMLElement it is.
    CE.define('uce-lib', /*#__PURE__*/function (_info$c) {
      _inherits(_class, _info$c);

      var _super2 = _createSuper(_class);

      function _class() {
        _classCallCheck(this, _class);

        return _super2.apply(this, arguments);
      }

      _createClass(_class, null, [{
        key: "define",
        get: function get() {
          return define;
        }
      }, {
        key: "render",
        get: function get() {
          return render;
        }
      }, {
        key: "html",
        get: function get() {
          return html;
        }
      }, {
        key: "svg",
        get: function get() {
          return svg;
        }
      }, {
        key: "css",
        get: function get() {
          return css;
        }
      }]);

      return _class;
    }(info(element).c));

  function bind(method) {
    this[method] = this[method].bind(this);
  }

  function content() {
    return render(this, html.apply(null, arguments));
  }

  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", {
        value: raw
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  }

  // import './styles.css';
  var TAG_NAME = 'my-counter';
  var MyCounter = {
      init: function () {
          var _this = this;
          this.count = this.props.count !== undefined ? this.props.count : 0;
          this.dec = function () {
              _this.count--;
              _this.render();
          };
          this.inc = function () {
              _this.count++;
              _this.render();
          };
          this.classList.add('my-prefix');
          this.render();
      },
      render: function () {
          this.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      <button onclick=\"", "\">-</button>\n      <span>", "</span>\n      <button onclick=\"", "\">+</button>\n    "], ["\n      <button onclick=\"", "\">-</button>\n      <span>", "</span>\n      <button onclick=\"", "\">+</button>\n    "])), this.dec, this.count, this.inc);
      },
      // Added Definition accessors:
      onClick: function (evt) { return console.log(evt); },
      onClickOptions: { once: true },
      get test() {
          return Math.random();
      },
      set test(value) {
          console.log(value);
      },
      method: function () { return 'some data'; },
  };
  var templateObject_1;

  define(TAG_NAME, MyCounter);

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy91bWFwL2VzbS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy91cGFyc2VyL2VzbS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy91YXJyYXkvZXNtL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3V3aXJlL2VzbS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy91ZG9tZGlmZi9lc20vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvdWhhbmRsZXJzL2VzbS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AdW5nYXAvY3JlYXRlLWNvbnRlbnQvZXNtL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3VodG1sL2VzbS9ub2RlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3VodG1sL2VzbS9oYW5kbGVycy5qcyIsIi4uL25vZGVfbW9kdWxlcy91aHRtbC9lc20vcmFiYml0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3VodG1sL2VzbS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9wbGFpbi10YWcvZXNtL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlYWN0aXZlLXByb3BzL2VzbS9vYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvcmVhY3RpdmUtcHJvcHMvZXNtL3V0aWxzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlYWN0aXZlLXByb3BzL2VzbS9kb20uanMiLCIuLi9ub2RlX21vZHVsZXMvdWNlL2VzbS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXyA9PiAoe1xuICAvLyBBYm91dDogZ2V0OiBfLmdldC5iaW5kKF8pXG4gIC8vIEl0IGxvb2tzIGxpa2UgV2ViS2l0L1NhZmFyaSBkaWRuJ3Qgb3B0aW1pemUgYmluZCBhdCBhbGwsXG4gIC8vIHNvIHRoYXQgdXNpbmcgYmluZCBzbG93cyBpdCBkb3duIGJ5IDYwJS5cbiAgLy8gRmlyZWZveCBhbmQgQ2hyb21lIGFyZSBqdXN0IGZpbmUgaW4gYm90aCBjYXNlcyxcbiAgLy8gc28gbGV0J3MgdXNlIHRoZSBhcHByb2FjaCB0aGF0IHdvcmtzIGZhc3QgZXZlcnl3aGVyZSDwn5GNXG4gIGdldDoga2V5ID0+IF8uZ2V0KGtleSksXG4gIHNldDogKGtleSwgdmFsdWUpID0+IChfLnNldChrZXksIHZhbHVlKSwgdmFsdWUpXG59KTtcbiIsImNvbnN0IGF0dHIgPSAvKFteXFxzXFxcXD5cIic9XSspXFxzKj1cXHMqKFsnXCJdPykkLztcbmNvbnN0IGVtcHR5ID0gL14oPzphcmVhfGJhc2V8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxrZXlnZW58bGlua3xtZW51aXRlbXxtZXRhfHBhcmFtfHNvdXJjZXx0cmFja3x3YnIpJC9pO1xuY29uc3Qgbm9kZSA9IC88W2Etel1bXj5dKyQvaTtcbmNvbnN0IG5vdE5vZGUgPSAvPltePD5dKiQvO1xuY29uc3Qgc2VsZkNsb3NpbmcgPSAvPChbYS16XStbYS16MC05Oi5fLV0qKShbXj5dKj8pKFxcLz4pL2lnO1xuY29uc3QgdHJpbUVuZCA9IC9cXHMrJC87XG5cbmNvbnN0IGlzTm9kZSA9ICh0ZW1wbGF0ZSwgaSkgPT4gKFxuICAgIDAgPCBpLS0gJiYgKFxuICAgIG5vZGUudGVzdCh0ZW1wbGF0ZVtpXSkgfHwgKFxuICAgICAgIW5vdE5vZGUudGVzdCh0ZW1wbGF0ZVtpXSkgJiYgaXNOb2RlKHRlbXBsYXRlLCBpKVxuICAgIClcbiAgKVxuKTtcblxuY29uc3QgcmVndWxhciA9IChvcmlnaW5hbCwgbmFtZSwgZXh0cmEpID0+IGVtcHR5LnRlc3QobmFtZSkgP1xuICAgICAgICAgICAgICAgICAgb3JpZ2luYWwgOiBgPCR7bmFtZX0ke2V4dHJhLnJlcGxhY2UodHJpbUVuZCwnJyl9PjwvJHtuYW1lfT5gO1xuXG5leHBvcnQgZGVmYXVsdCAodGVtcGxhdGUsIHByZWZpeCwgc3ZnKSA9PiB7XG4gIGNvbnN0IHRleHQgPSBbXTtcbiAgY29uc3Qge2xlbmd0aH0gPSB0ZW1wbGF0ZTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNodW5rID0gdGVtcGxhdGVbaSAtIDFdO1xuICAgIHRleHQucHVzaChhdHRyLnRlc3QoY2h1bmspICYmIGlzTm9kZSh0ZW1wbGF0ZSwgaSkgP1xuICAgICAgY2h1bmsucmVwbGFjZShcbiAgICAgICAgYXR0cixcbiAgICAgICAgKF8sICQxLCAkMikgPT4gYCR7cHJlZml4fSR7aSAtIDF9PSR7JDIgfHwgJ1wiJ30keyQxfSR7JDIgPyAnJyA6ICdcIid9YFxuICAgICAgKSA6XG4gICAgICBgJHtjaHVua308IS0tJHtwcmVmaXh9JHtpIC0gMX0tLT5gXG4gICAgKTtcbiAgfVxuICB0ZXh0LnB1c2godGVtcGxhdGVbbGVuZ3RoIC0gMV0pO1xuICBjb25zdCBvdXRwdXQgPSB0ZXh0LmpvaW4oJycpLnRyaW0oKTtcbiAgcmV0dXJuIHN2ZyA/IG91dHB1dCA6IG91dHB1dC5yZXBsYWNlKHNlbGZDbG9zaW5nLCByZWd1bGFyKTtcbn07XG4iLCJjb25zdCB7aXNBcnJheX0gPSBBcnJheTtcbmNvbnN0IHtpbmRleE9mLCBzbGljZX0gPSBbXTtcblxuZXhwb3J0IHtpc0FycmF5LCBpbmRleE9mLCBzbGljZX07XG4iLCJpbXBvcnQge3NsaWNlfSBmcm9tICd1YXJyYXknO1xuXG5jb25zdCBFTEVNRU5UX05PREUgPSAxO1xuY29uc3Qgbm9kZVR5cGUgPSAxMTE7XG5cbmNvbnN0IHJlbW92ZSA9ICh7Zmlyc3RDaGlsZCwgbGFzdENoaWxkfSkgPT4ge1xuICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0QWZ0ZXIoZmlyc3RDaGlsZCk7XG4gIHJhbmdlLnNldEVuZEFmdGVyKGxhc3RDaGlsZCk7XG4gIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gIHJldHVybiBmaXJzdENoaWxkO1xufTtcblxuZXhwb3J0IGNvbnN0IGRpZmZhYmxlID0gKG5vZGUsIG9wZXJhdGlvbikgPT4gbm9kZS5ub2RlVHlwZSA9PT0gbm9kZVR5cGUgP1xuICAoKDEgLyBvcGVyYXRpb24pIDwgMCA/XG4gICAgKG9wZXJhdGlvbiA/IHJlbW92ZShub2RlKSA6IG5vZGUubGFzdENoaWxkKSA6XG4gICAgKG9wZXJhdGlvbiA/IG5vZGUudmFsdWVPZigpIDogbm9kZS5maXJzdENoaWxkKSkgOlxuICBub2RlXG47XG5cbmV4cG9ydCBjb25zdCBwZXJzaXN0ZW50ID0gZnJhZ21lbnQgPT4ge1xuICBjb25zdCB7Y2hpbGROb2Rlc30gPSBmcmFnbWVudDtcbiAgY29uc3Qge2xlbmd0aH0gPSBjaGlsZE5vZGVzO1xuICBpZiAobGVuZ3RoIDwgMilcbiAgICByZXR1cm4gbGVuZ3RoID8gY2hpbGROb2Rlc1swXSA6IGZyYWdtZW50O1xuICBjb25zdCBub2RlcyA9IHNsaWNlLmNhbGwoY2hpbGROb2RlcywgMCk7XG4gIGNvbnN0IGZpcnN0Q2hpbGQgPSBub2Rlc1swXTtcbiAgY29uc3QgbGFzdENoaWxkID0gbm9kZXNbbGVuZ3RoIC0gMV07XG4gIHJldHVybiB7XG4gICAgRUxFTUVOVF9OT0RFLFxuICAgIG5vZGVUeXBlLFxuICAgIGZpcnN0Q2hpbGQsXG4gICAgbGFzdENoaWxkLFxuICAgIHZhbHVlT2YoKSB7XG4gICAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuZ3RoKVxuICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKG5vZGVzW2krK10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cbiAgfTtcbn07XG4iLCIvKipcbiAqIElTQyBMaWNlbnNlXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDIwLCBBbmRyZWEgR2lhbW1hcmNoaSwgQFdlYlJlZmxlY3Rpb25cbiAqXG4gKiBQZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbiAqIHB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZCwgcHJvdmlkZWQgdGhhdCB0aGUgYWJvdmVcbiAqIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2UgYXBwZWFyIGluIGFsbCBjb3BpZXMuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuICogUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG4gKiBBTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG4gKiBJTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbiAqIExPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFXG4gKiBPUiBPVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG4gKiBQRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuICovXG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBwYXJlbnROb2RlIFRoZSBjb250YWluZXIgd2hlcmUgY2hpbGRyZW4gbGl2ZVxuICogQHBhcmFtIHtOb2RlW119IGEgVGhlIGxpc3Qgb2YgY3VycmVudC9saXZlIGNoaWxkcmVuXG4gKiBAcGFyYW0ge05vZGVbXX0gYiBUaGUgbGlzdCBvZiBmdXR1cmUgY2hpbGRyZW5cbiAqIEBwYXJhbSB7KGVudHJ5OiBOb2RlLCBhY3Rpb246IG51bWJlcikgPT4gTm9kZX0gZ2V0XG4gKiBUaGUgY2FsbGJhY2sgaW52b2tlZCBwZXIgZWFjaCBlbnRyeSByZWxhdGVkIERPTSBvcGVyYXRpb24uXG4gKiBAcGFyYW0ge05vZGV9IFtiZWZvcmVdIFRoZSBvcHRpb25hbCBub2RlIHVzZWQgYXMgYW5jaG9yIHRvIGluc2VydCBiZWZvcmUuXG4gKiBAcmV0dXJucyB7Tm9kZVtdfSBUaGUgc2FtZSBsaXN0IG9mIGZ1dHVyZSBjaGlsZHJlbi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKHBhcmVudE5vZGUsIGEsIGIsIGdldCwgYmVmb3JlKSA9PiB7XG4gIGNvbnN0IGJMZW5ndGggPSBiLmxlbmd0aDtcbiAgbGV0IGFFbmQgPSBhLmxlbmd0aDtcbiAgbGV0IGJFbmQgPSBiTGVuZ3RoO1xuICBsZXQgYVN0YXJ0ID0gMDtcbiAgbGV0IGJTdGFydCA9IDA7XG4gIGxldCBtYXAgPSBudWxsO1xuICB3aGlsZSAoYVN0YXJ0IDwgYUVuZCB8fCBiU3RhcnQgPCBiRW5kKSB7XG4gICAgLy8gYXBwZW5kIGhlYWQsIHRhaWwsIG9yIG5vZGVzIGluIGJldHdlZW46IGZhc3QgcGF0aFxuICAgIGlmIChhRW5kID09PSBhU3RhcnQpIHtcbiAgICAgIC8vIHdlIGNvdWxkIGJlIGluIGEgc2l0dWF0aW9uIHdoZXJlIHRoZSByZXN0IG9mIG5vZGVzIHRoYXRcbiAgICAgIC8vIG5lZWQgdG8gYmUgYWRkZWQgYXJlIG5vdCBhdCB0aGUgZW5kLCBhbmQgaW4gc3VjaCBjYXNlXG4gICAgICAvLyB0aGUgbm9kZSB0byBgaW5zZXJ0QmVmb3JlYCwgaWYgdGhlIGluZGV4IGlzIG1vcmUgdGhhbiAwXG4gICAgICAvLyBtdXN0IGJlIHJldHJpZXZlZCwgb3RoZXJ3aXNlIGl0J3MgZ29ubmEgYmUgdGhlIGZpcnN0IGl0ZW0uXG4gICAgICBjb25zdCBub2RlID0gYkVuZCA8IGJMZW5ndGggP1xuICAgICAgICAoYlN0YXJ0ID9cbiAgICAgICAgICAoZ2V0KGJbYlN0YXJ0IC0gMV0sIC0wKS5uZXh0U2libGluZykgOlxuICAgICAgICAgIGdldChiW2JFbmQgLSBiU3RhcnRdLCAwKSkgOlxuICAgICAgICBiZWZvcmU7XG4gICAgICB3aGlsZSAoYlN0YXJ0IDwgYkVuZClcbiAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2V0KGJbYlN0YXJ0KytdLCAxKSwgbm9kZSk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSBoZWFkIG9yIHRhaWw6IGZhc3QgcGF0aFxuICAgIGVsc2UgaWYgKGJFbmQgPT09IGJTdGFydCkge1xuICAgICAgd2hpbGUgKGFTdGFydCA8IGFFbmQpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBub2RlIG9ubHkgaWYgaXQncyB1bmtub3duIG9yIG5vdCBsaXZlXG4gICAgICAgIGlmICghbWFwIHx8ICFtYXAuaGFzKGFbYVN0YXJ0XSkpXG4gICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnZXQoYVthU3RhcnRdLCAtMSkpO1xuICAgICAgICBhU3RhcnQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gc2FtZSBub2RlOiBmYXN0IHBhdGhcbiAgICBlbHNlIGlmIChhW2FTdGFydF0gPT09IGJbYlN0YXJ0XSkge1xuICAgICAgYVN0YXJ0Kys7XG4gICAgICBiU3RhcnQrKztcbiAgICB9XG4gICAgLy8gc2FtZSB0YWlsOiBmYXN0IHBhdGhcbiAgICBlbHNlIGlmIChhW2FFbmQgLSAxXSA9PT0gYltiRW5kIC0gMV0pIHtcbiAgICAgIGFFbmQtLTtcbiAgICAgIGJFbmQtLTtcbiAgICB9XG4gICAgLy8gVGhlIG9uY2UgaGVyZSBzaW5nbGUgbGFzdCBzd2FwIFwiZmFzdCBwYXRoXCIgaGFzIGJlZW4gcmVtb3ZlZCBpbiB2MS4xLjBcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi91ZG9tZGlmZi9ibG9iL3NpbmdsZS1maW5hbC1zd2FwL2VzbS9pbmRleC5qcyNMNjktTDg1XG4gICAgLy8gcmV2ZXJzZSBzd2FwOiBhbHNvIGZhc3QgcGF0aFxuICAgIGVsc2UgaWYgKFxuICAgICAgYVthU3RhcnRdID09PSBiW2JFbmQgLSAxXSAmJlxuICAgICAgYltiU3RhcnRdID09PSBhW2FFbmQgLSAxXVxuICAgICkge1xuICAgICAgLy8gdGhpcyBpcyBhIFwic2hyaW5rXCIgb3BlcmF0aW9uIHRoYXQgY291bGQgaGFwcGVuIGluIHRoZXNlIGNhc2VzOlxuICAgICAgLy8gWzEsIDIsIDMsIDQsIDVdXG4gICAgICAvLyBbMSwgNCwgMywgMiwgNV1cbiAgICAgIC8vIG9yIGFzeW1tZXRyaWMgdG9vXG4gICAgICAvLyBbMSwgMiwgMywgNCwgNV1cbiAgICAgIC8vIFsxLCAyLCAzLCA1LCA2LCA0XVxuICAgICAgY29uc3Qgbm9kZSA9IGdldChhWy0tYUVuZF0sIC0xKS5uZXh0U2libGluZztcbiAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgICAgICBnZXQoYltiU3RhcnQrK10sIDEpLFxuICAgICAgICBnZXQoYVthU3RhcnQrK10sIC0xKS5uZXh0U2libGluZ1xuICAgICAgKTtcbiAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGdldChiWy0tYkVuZF0sIDEpLCBub2RlKTtcbiAgICAgIC8vIG1hcmsgdGhlIGZ1dHVyZSBpbmRleCBhcyBpZGVudGljYWwgKHllYWgsIGl0J3MgZGlydHksIGJ1dCBjaGVhcCDwn5GNKVxuICAgICAgLy8gVGhlIG1haW4gcmVhc29uIHRvIGRvIHRoaXMsIGlzIHRoYXQgd2hlbiBhW2FFbmRdIHdpbGwgYmUgcmVhY2hlZCxcbiAgICAgIC8vIHRoZSBsb29wIHdpbGwgbGlrZWx5IGJlIG9uIHRoZSBmYXN0IHBhdGgsIGFzIGlkZW50aWNhbCB0byBiW2JFbmRdLlxuICAgICAgLy8gSW4gdGhlIGJlc3QgY2FzZSBzY2VuYXJpbywgdGhlIG5leHQgbG9vcCB3aWxsIHNraXAgdGhlIHRhaWwsXG4gICAgICAvLyBidXQgaW4gdGhlIHdvcnN0IG9uZSwgdGhpcyBub2RlIHdpbGwgYmUgY29uc2lkZXJlZCBhcyBhbHJlYWR5XG4gICAgICAvLyBwcm9jZXNzZWQsIGJhaWxpbmcgb3V0IHByZXR0eSBxdWlja2x5IGZyb20gdGhlIG1hcCBpbmRleCBjaGVja1xuICAgICAgYVthRW5kXSA9IGJbYkVuZF07XG4gICAgfVxuICAgIC8vIG1hcCBiYXNlZCBmYWxsYmFjaywgXCJzbG93XCIgcGF0aFxuICAgIGVsc2Uge1xuICAgICAgLy8gdGhlIG1hcCByZXF1aXJlcyBhbiBPKGJFbmQgLSBiU3RhcnQpIG9wZXJhdGlvbiBvbmNlXG4gICAgICAvLyB0byBzdG9yZSBhbGwgZnV0dXJlIG5vZGVzIGluZGV4ZXMgZm9yIGxhdGVyIHB1cnBvc2VzLlxuICAgICAgLy8gSW4gdGhlIHdvcnN0IGNhc2Ugc2NlbmFyaW8sIHRoaXMgaXMgYSBmdWxsIE8oTikgY29zdCxcbiAgICAgIC8vIGFuZCBzdWNoIHNjZW5hcmlvIGhhcHBlbnMgYXQgbGVhc3Qgd2hlbiBhbGwgbm9kZXMgYXJlIGRpZmZlcmVudCxcbiAgICAgIC8vIGJ1dCBhbHNvIGlmIGJvdGggZmlyc3QgYW5kIGxhc3QgaXRlbXMgb2YgdGhlIGxpc3RzIGFyZSBkaWZmZXJlbnRcbiAgICAgIGlmICghbWFwKSB7XG4gICAgICAgIG1hcCA9IG5ldyBNYXA7XG4gICAgICAgIGxldCBpID0gYlN0YXJ0O1xuICAgICAgICB3aGlsZSAoaSA8IGJFbmQpXG4gICAgICAgICAgbWFwLnNldChiW2ldLCBpKyspO1xuICAgICAgfVxuICAgICAgLy8gaWYgaXQncyBhIGZ1dHVyZSBub2RlLCBoZW5jZSBpdCBuZWVkcyBzb21lIGhhbmRsaW5nXG4gICAgICBpZiAobWFwLmhhcyhhW2FTdGFydF0pKSB7XG4gICAgICAgIC8vIGdyYWIgdGhlIGluZGV4IG9mIHN1Y2ggbm9kZSwgJ2NhdXNlIGl0IG1pZ2h0IGhhdmUgYmVlbiBwcm9jZXNzZWRcbiAgICAgICAgY29uc3QgaW5kZXggPSBtYXAuZ2V0KGFbYVN0YXJ0XSk7XG4gICAgICAgIC8vIGlmIGl0J3Mgbm90IGFscmVhZHkgcHJvY2Vzc2VkLCBsb29rIG9uIGRlbWFuZCBmb3IgdGhlIG5leHQgTENTXG4gICAgICAgIGlmIChiU3RhcnQgPCBpbmRleCAmJiBpbmRleCA8IGJFbmQpIHtcbiAgICAgICAgICBsZXQgaSA9IGFTdGFydDtcbiAgICAgICAgICAvLyBjb3VudHMgdGhlIGFtb3VudCBvZiBub2RlcyB0aGF0IGFyZSB0aGUgc2FtZSBpbiB0aGUgZnV0dXJlXG4gICAgICAgICAgbGV0IHNlcXVlbmNlID0gMTtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgYUVuZCAmJiBpIDwgYkVuZCAmJiBtYXAuZ2V0KGFbaV0pID09PSAoaW5kZXggKyBzZXF1ZW5jZSkpXG4gICAgICAgICAgICBzZXF1ZW5jZSsrO1xuICAgICAgICAgIC8vIGVmZm9ydCBkZWNpc2lvbiBoZXJlOiBpZiB0aGUgc2VxdWVuY2UgaXMgbG9uZ2VyIHRoYW4gcmVwbGFjZXNcbiAgICAgICAgICAvLyBuZWVkZWQgdG8gcmVhY2ggc3VjaCBzZXF1ZW5jZSwgd2hpY2ggd291bGQgYnJpbmdzIGFnYWluIHRoaXMgbG9vcFxuICAgICAgICAgIC8vIHRvIHRoZSBmYXN0IHBhdGgsIHByZXBlbmQgdGhlIGRpZmZlcmVuY2UgYmVmb3JlIGEgc2VxdWVuY2UsXG4gICAgICAgICAgLy8gYW5kIG1vdmUgb25seSB0aGUgZnV0dXJlIGxpc3QgaW5kZXggZm9yd2FyZCwgc28gdGhhdCBhU3RhcnRcbiAgICAgICAgICAvLyBhbmQgYlN0YXJ0IHdpbGwgYmUgYWxpZ25lZCBhZ2FpbiwgaGVuY2Ugb24gdGhlIGZhc3QgcGF0aC5cbiAgICAgICAgICAvLyBBbiBleGFtcGxlIGNvbnNpZGVyaW5nIGFTdGFydCBhbmQgYlN0YXJ0IGFyZSBib3RoIDA6XG4gICAgICAgICAgLy8gYTogWzEsIDIsIDMsIDRdXG4gICAgICAgICAgLy8gYjogWzcsIDEsIDIsIDMsIDZdXG4gICAgICAgICAgLy8gdGhpcyB3b3VsZCBwbGFjZSA3IGJlZm9yZSAxIGFuZCwgZnJvbSB0aGF0IHRpbWUgb24sIDEsIDIsIGFuZCAzXG4gICAgICAgICAgLy8gd2lsbCBiZSBwcm9jZXNzZWQgYXQgemVybyBjb3N0XG4gICAgICAgICAgaWYgKHNlcXVlbmNlID4gKGluZGV4IC0gYlN0YXJ0KSkge1xuICAgICAgICAgICAgY29uc3Qgbm9kZSA9IGdldChhW2FTdGFydF0sIDApO1xuICAgICAgICAgICAgd2hpbGUgKGJTdGFydCA8IGluZGV4KVxuICAgICAgICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShnZXQoYltiU3RhcnQrK10sIDEpLCBub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gaWYgdGhlIGVmZm9ydCB3YXNuJ3QgZ29vZCBlbm91Z2gsIGZhbGxiYWNrIHRvIGEgcmVwbGFjZSxcbiAgICAgICAgICAvLyBtb3ZpbmcgYm90aCBzb3VyY2UgYW5kIHRhcmdldCBpbmRleGVzIGZvcndhcmQsIGhvcGluZyB0aGF0IHNvbWVcbiAgICAgICAgICAvLyBzaW1pbGFyIG5vZGUgd2lsbCBiZSBmb3VuZCBsYXRlciBvbiwgdG8gZ28gYmFjayB0byB0aGUgZmFzdCBwYXRoXG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlLnJlcGxhY2VDaGlsZChcbiAgICAgICAgICAgICAgZ2V0KGJbYlN0YXJ0KytdLCAxKSxcbiAgICAgICAgICAgICAgZ2V0KGFbYVN0YXJ0KytdLCAtMSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSBtb3ZlIHRoZSBzb3VyY2UgZm9yd2FyZCwgJ2NhdXNlIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuICAgICAgICBlbHNlXG4gICAgICAgICAgYVN0YXJ0Kys7XG4gICAgICB9XG4gICAgICAvLyB0aGlzIG5vZGUgaGFzIG5vIG1lYW5pbmcgaW4gdGhlIGZ1dHVyZSBsaXN0LCBzbyBpdCdzIG1vcmUgdGhhbiBzYWZlXG4gICAgICAvLyB0byByZW1vdmUgaXQsIGFuZCBjaGVjayB0aGUgbmV4dCBsaXZlIG5vZGUgb3V0IGluc3RlYWQsIG1lYW5pbmdcbiAgICAgIC8vIHRoYXQgb25seSB0aGUgbGl2ZSBsaXN0IGluZGV4IHNob3VsZCBiZSBmb3J3YXJkZWRcbiAgICAgIGVsc2VcbiAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnZXQoYVthU3RhcnQrK10sIC0xKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBiO1xufTtcbiIsImltcG9ydCB7aXNBcnJheX0gZnJvbSAndWFycmF5JztcblxuZXhwb3J0IGNvbnN0IGFyaWEgPSBub2RlID0+IHZhbHVlcyA9PiB7XG4gIGZvciAoY29uc3Qga2V5IGluIHZhbHVlcykge1xuICAgIGNvbnN0IG5hbWUgPSBrZXkgPT09ICdyb2xlJyA/IGtleSA6IGBhcmlhLSR7a2V5fWA7XG4gICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNba2V5XTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIGVsc2VcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGF0dHJpYnV0ZSA9IChub2RlLCBuYW1lKSA9PiB7XG4gIGxldCBvbGRWYWx1ZSwgb3JwaGFuID0gdHJ1ZTtcbiAgY29uc3QgYXR0cmlidXRlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUF0dHJpYnV0ZU5TKG51bGwsIG5hbWUpO1xuICByZXR1cm4gbmV3VmFsdWUgPT4ge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICBpZiAob2xkVmFsdWUgPT0gbnVsbCkge1xuICAgICAgICBpZiAoIW9ycGhhbikge1xuICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlTm9kZShhdHRyaWJ1dGVOb2RlKTtcbiAgICAgICAgICBvcnBoYW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXR0cmlidXRlTm9kZS52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBpZiAob3JwaGFuKSB7XG4gICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGVOb2RlTlMoYXR0cmlidXRlTm9kZSk7XG4gICAgICAgICAgb3JwaGFuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZGF0YSA9ICh7ZGF0YXNldH0pID0+IHZhbHVlcyA9PiB7XG4gIGZvciAoY29uc3Qga2V5IGluIHZhbHVlcykge1xuICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2tleV07XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICBkZWxldGUgZGF0YXNldFtrZXldO1xuICAgIGVsc2VcbiAgICAgIGRhdGFzZXRba2V5XSA9IHZhbHVlO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZXZlbnQgPSAobm9kZSwgbmFtZSkgPT4ge1xuICBsZXQgb2xkVmFsdWUsIHR5cGUgPSBuYW1lLnNsaWNlKDIpO1xuICBpZiAoIShuYW1lIGluIG5vZGUpICYmIG5hbWUudG9Mb3dlckNhc2UoKSBpbiBub2RlKVxuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBuZXdWYWx1ZSA9PiB7XG4gICAgY29uc3QgaW5mbyA9IGlzQXJyYXkobmV3VmFsdWUpID8gbmV3VmFsdWUgOiBbbmV3VmFsdWUsIGZhbHNlXTtcbiAgICBpZiAob2xkVmFsdWUgIT09IGluZm9bMF0pIHtcbiAgICAgIGlmIChvbGRWYWx1ZSlcbiAgICAgICAgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIG9sZFZhbHVlLCBpbmZvWzFdKTtcbiAgICAgIGlmIChvbGRWYWx1ZSA9IGluZm9bMF0pXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBvbGRWYWx1ZSwgaW5mb1sxXSk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlZiA9IG5vZGUgPT4gdmFsdWUgPT4ge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgIHZhbHVlKG5vZGUpO1xuICBlbHNlXG4gICAgdmFsdWUuY3VycmVudCA9IG5vZGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2V0dGVyID0gKG5vZGUsIGtleSkgPT4gdmFsdWUgPT4ge1xuICBub2RlW2tleV0gPSB2YWx1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCB0ZXh0ID0gbm9kZSA9PiB7XG4gIGxldCBvbGRWYWx1ZTtcbiAgcmV0dXJuIG5ld1ZhbHVlID0+IHtcbiAgICBpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUpIHtcbiAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICBub2RlLnRleHRDb250ZW50ID0gbmV3VmFsdWUgPT0gbnVsbCA/ICcnIDogbmV3VmFsdWU7XG4gICAgfVxuICB9O1xufTtcbiIsIi8qISAoYykgQW5kcmVhIEdpYW1tYXJjaGkgLSBJU0MgKi9cbnZhciBjcmVhdGVDb250ZW50ID0gKGZ1bmN0aW9uIChkb2N1bWVudCkgeyd1c2Ugc3RyaWN0JztcbiAgdmFyIEZSQUdNRU5UID0gJ2ZyYWdtZW50JztcbiAgdmFyIFRFTVBMQVRFID0gJ3RlbXBsYXRlJztcbiAgdmFyIEhBU19DT05URU5UID0gJ2NvbnRlbnQnIGluIGNyZWF0ZShURU1QTEFURSk7XG5cbiAgdmFyIGNyZWF0ZUhUTUwgPSBIQVNfQ09OVEVOVCA/XG4gICAgZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGNyZWF0ZShURU1QTEFURSk7XG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQ7XG4gICAgfSA6XG4gICAgZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3JlYXRlKEZSQUdNRU5UKTtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IGNyZWF0ZShURU1QTEFURSk7XG4gICAgICB2YXIgY2hpbGROb2RlcyA9IG51bGw7XG4gICAgICBpZiAoL15bXlxcU10qPzwoY29sKD86Z3JvdXApP3x0KD86aGVhZHxib2R5fGZvb3R8cnxkfGgpKS9pLnRlc3QoaHRtbCkpIHtcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gUmVnRXhwLiQxO1xuICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSAnPHRhYmxlPicgKyBodG1sICsgJzwvdGFibGU+JztcbiAgICAgICAgY2hpbGROb2RlcyA9IHRlbXBsYXRlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgY2hpbGROb2RlcyA9IHRlbXBsYXRlLmNoaWxkTm9kZXM7XG4gICAgICB9XG4gICAgICBhcHBlbmQoY29udGVudCwgY2hpbGROb2Rlcyk7XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVDb250ZW50KG1hcmt1cCwgdHlwZSkge1xuICAgIHJldHVybiAodHlwZSA9PT0gJ3N2ZycgPyBjcmVhdGVTVkcgOiBjcmVhdGVIVE1MKShtYXJrdXApO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGFwcGVuZChyb290LCBjaGlsZE5vZGVzKSB7XG4gICAgdmFyIGxlbmd0aCA9IGNoaWxkTm9kZXMubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSlcbiAgICAgIHJvb3QuYXBwZW5kQ2hpbGQoY2hpbGROb2Rlc1swXSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGUoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50ID09PSBGUkFHTUVOVCA/XG4gICAgICBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkgOlxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJywgZWxlbWVudCk7XG4gIH1cblxuICAvLyBpdCBjb3VsZCB1c2UgY3JlYXRlRWxlbWVudE5TIHdoZW4gaGFzTm9kZSBpcyB0aGVyZVxuICAvLyBidXQgdGhpcyBmYWxsYmFjayBpcyBlcXVhbGx5IGZhc3QgYW5kIGVhc2llciB0byBtYWludGFpblxuICAvLyBpdCBpcyBhbHNvIGJhdHRsZSB0ZXN0ZWQgYWxyZWFkeSBpbiBhbGwgSUVcbiAgZnVuY3Rpb24gY3JlYXRlU1ZHKHN2Zykge1xuICAgIHZhciBjb250ZW50ID0gY3JlYXRlKEZSQUdNRU5UKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBjcmVhdGUoJ2RpdicpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4nICsgc3ZnICsgJzwvc3ZnPic7XG4gICAgYXBwZW5kKGNvbnRlbnQsIHRlbXBsYXRlLmZpcnN0Q2hpbGQuY2hpbGROb2Rlcyk7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxufShkb2N1bWVudCkpO1xuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29udGVudDtcbiIsImltcG9ydCBjcmVhdGVDb250ZW50IGZyb20gJ0B1bmdhcC9jcmVhdGUtY29udGVudCc7XG5pbXBvcnQge2luZGV4T2Z9IGZyb20gJ3VhcnJheSc7XG5cbi8vIGZyb20gYSBnZW5lcmljIHBhdGgsIHJldHJpZXZlcyB0aGUgZXhhY3QgdGFyZ2V0ZWQgbm9kZVxuZXhwb3J0IGNvbnN0IHJlZHVjZVBhdGggPSAoe2NoaWxkTm9kZXN9LCBpKSA9PiBjaGlsZE5vZGVzW2ldO1xuXG4vLyBmcm9tIGEgZnJhZ21lbnQgY29udGFpbmVyLCBjcmVhdGUgYW4gYXJyYXkgb2YgaW5kZXhlc1xuLy8gcmVsYXRlZCB0byBpdHMgY2hpbGQgbm9kZXMsIHNvIHRoYXQgaXQncyBwb3NzaWJsZVxuLy8gdG8gcmV0cmlldmUgbGF0ZXIgb24gZXhhY3Qgbm9kZSB2aWEgcmVkdWNlUGF0aFxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBhdGggPSBub2RlID0+IHtcbiAgY29uc3QgcGF0aCA9IFtdO1xuICBsZXQge3BhcmVudE5vZGV9ID0gbm9kZTtcbiAgd2hpbGUgKHBhcmVudE5vZGUpIHtcbiAgICBwYXRoLnB1c2goaW5kZXhPZi5jYWxsKHBhcmVudE5vZGUuY2hpbGROb2Rlcywgbm9kZSkpO1xuICAgIG5vZGUgPSBwYXJlbnROb2RlO1xuICAgIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59O1xuXG5jb25zdCB7Y3JlYXRlVHJlZVdhbGtlciwgaW1wb3J0Tm9kZX0gPSBkb2N1bWVudDtcbmV4cG9ydCB7Y3JlYXRlVHJlZVdhbGtlciwgaW1wb3J0Tm9kZX07XG5cbi8vIHRoaXMgXCJoYWNrXCIgdGVsbHMgdGhlIGxpYnJhcnkgaWYgdGhlIGJyb3dzZXIgaXMgSUUxMSBvciBvbGQgRWRnZVxuY29uc3QgSUUgPSBpbXBvcnROb2RlLmxlbmd0aCAhPSAxO1xuXG4vLyBJRTExIGFuZCBvbGQgRWRnZSBkaXNjYXJkIGVtcHR5IG5vZGVzIHdoZW4gY2xvbmluZywgcG90ZW50aWFsbHlcbi8vIHJlc3VsdGluZyBpbiBicm9rZW4gcGF0aHMgdG8gZmluZCB1cGRhdGVzLiBUaGUgd29ya2Fyb3VuZCBoZXJlXG4vLyBpcyB0byBpbXBvcnQgb25jZSwgdXBmcm9udCwgdGhlIGZyYWdtZW50IHRoYXQgd2lsbCBiZSBjbG9uZWRcbi8vIGxhdGVyIG9uLCBzbyB0aGF0IHBhdGhzIGFyZSByZXRyaWV2ZWQgZnJvbSBvbmUgYWxyZWFkeSBwYXJzZWQsXG4vLyBoZW5jZSB3aXRob3V0IG1pc3NpbmcgY2hpbGQgbm9kZXMgb25jZSByZS1jbG9uZWQuXG5leHBvcnQgY29uc3QgY3JlYXRlRnJhZ21lbnQgPSBJRSA/XG4gICh0ZXh0LCB0eXBlKSA9PiBpbXBvcnROb2RlLmNhbGwoXG4gICAgZG9jdW1lbnQsXG4gICAgY3JlYXRlQ29udGVudCh0ZXh0LCB0eXBlKSxcbiAgICB0cnVlXG4gICkgOlxuICBjcmVhdGVDb250ZW50O1xuXG4vLyBJRTExIGFuZCBvbGQgRWRnZSBoYXZlIGEgZGlmZmVyZW50IGNyZWF0ZVRyZWVXYWxrZXIgc2lnbmF0dXJlIHRoYXRcbi8vIGhhcyBiZWVuIGRlcHJlY2F0ZWQgaW4gb3RoZXIgYnJvd3NlcnMuIFRoaXMgZXhwb3J0IGlzIG5lZWRlZCBvbmx5XG4vLyB0byBndWFyYW50ZWUgdGhlIFRyZWVXYWxrZXIgZG9lc24ndCBzaG93IHdhcm5pbmdzIGFuZCwgdWx0aW1hdGVseSwgd29ya3NcbmV4cG9ydCBjb25zdCBjcmVhdGVXYWxrZXIgPSBJRSA/XG4gIGZyYWdtZW50ID0+IGNyZWF0ZVRyZWVXYWxrZXIuY2FsbChkb2N1bWVudCwgZnJhZ21lbnQsIDEgfCAxMjgsIG51bGwsIGZhbHNlKSA6XG4gIGZyYWdtZW50ID0+IGNyZWF0ZVRyZWVXYWxrZXIuY2FsbChkb2N1bWVudCwgZnJhZ21lbnQsIDEgfCAxMjgpO1xuIiwiaW1wb3J0IHtpc0FycmF5LCBzbGljZX0gZnJvbSAndWFycmF5JztcbmltcG9ydCB1ZG9tZGlmZiBmcm9tICd1ZG9tZGlmZic7XG5pbXBvcnQge2FyaWEsIGF0dHJpYnV0ZSwgZGF0YSwgZXZlbnQsIHJlZiwgc2V0dGVyLCB0ZXh0fSBmcm9tICd1aGFuZGxlcnMnO1xuaW1wb3J0IHtkaWZmYWJsZX0gZnJvbSAndXdpcmUnO1xuXG5pbXBvcnQge3JlZHVjZVBhdGh9IGZyb20gJy4vbm9kZS5qcyc7XG5cbi8vIHRoaXMgaGVscGVyIGF2b2lkIGNvZGUgYmxvYXQgYXJvdW5kIGhhbmRsZUFueXRoaW5nKCkgY2FsbGJhY2tcbmNvbnN0IGRpZmYgPSAoY29tbWVudCwgb2xkTm9kZXMsIG5ld05vZGVzKSA9PiB1ZG9tZGlmZihcbiAgY29tbWVudC5wYXJlbnROb2RlLFxuICAvLyBUT0RPOiB0aGVyZSBpcyBhIHBvc3NpYmxlIGVkZ2UgY2FzZSB3aGVyZSBhIG5vZGUgaGFzIGJlZW5cbiAgLy8gICAgICAgcmVtb3ZlZCBtYW51YWxseSwgb3IgaXQgd2FzIGEga2V5ZWQgb25lLCBhdHRhY2hlZFxuICAvLyAgICAgICB0byBhIHNoYXJlZCByZWZlcmVuY2UgYmV0d2VlbiByZW5kZXJzLlxuICAvLyAgICAgICBJbiB0aGlzIGNhc2UgdWRvbWRpZmYgbWlnaHQgZmFpbCBhdCByZW1vdmluZyBzdWNoIG5vZGVcbiAgLy8gICAgICAgYXMgaXRzIHBhcmVudCB3b24ndCBiZSB0aGUgZXhwZWN0ZWQgb25lLlxuICAvLyAgICAgICBUaGUgYmVzdCB3YXkgdG8gYXZvaWQgdGhpcyBpc3N1ZSBpcyB0byBmaWx0ZXIgb2xkTm9kZXNcbiAgLy8gICAgICAgaW4gc2VhcmNoIG9mIHRob3NlIG5vdCBsaXZlLCBvciBub3QgaW4gdGhlIGN1cnJlbnQgcGFyZW50XG4gIC8vICAgICAgIGFueW1vcmUsIGJ1dCB0aGlzIHdvdWxkIHJlcXVpcmUgYm90aCBhIGNoYW5nZSB0byB1d2lyZSxcbiAgLy8gICAgICAgZXhwb3NpbmcgYSBwYXJlbnROb2RlIGZyb20gdGhlIGZpcnN0Q2hpbGQsIGFzIGV4YW1wbGUsXG4gIC8vICAgICAgIGJ1dCBhbHNvIGEgZmlsdGVyIHBlciBlYWNoIGRpZmYgdGhhdCBzaG91bGQgZXhjbHVkZSBub2Rlc1xuICAvLyAgICAgICB0aGF0IGFyZSBub3QgaW4gdGhlcmUsIHBlbmFsaXppbmcgcGVyZm9ybWFuY2UgcXVpdGUgYSBsb3QuXG4gIC8vICAgICAgIEFzIHRoaXMgaGFzIGJlZW4gYWxzbyBhIHBvdGVudGlhbCBpc3N1ZSB3aXRoIGRvbWRpZmYsXG4gIC8vICAgICAgIGFuZCBib3RoIGxpZ2h0ZXJodG1sIGFuZCBoeXBlckhUTUwgbWlnaHQgZmFpbCB3aXRoIHRoaXNcbiAgLy8gICAgICAgdmVyeSBzcGVjaWZpYyBlZGdlIGNhc2UsIEkgbWlnaHQgYXMgd2VsbCBkb2N1bWVudCB0aGlzIHBvc3NpYmxlXG4gIC8vICAgICAgIFwiZGlmZmluZyBzaGVuYW5pZ2FuXCIgYW5kIGNhbGwgaXQgYSBkYXkuXG4gIG9sZE5vZGVzLFxuICBuZXdOb2RlcyxcbiAgZGlmZmFibGUsXG4gIGNvbW1lbnRcbik7XG5cbi8vIGlmIGFuIGludGVycG9sYXRpb24gcmVwcmVzZW50cyBhIGNvbW1lbnQsIHRoZSB3aG9sZVxuLy8gZGlmZmluZyB3aWxsIGJlIHJlbGF0ZWQgdG8gc3VjaCBjb21tZW50LlxuLy8gVGhpcyBoZWxwZXIgaXMgaW4gY2hhcmdlIG9mIHVuZGVyc3RhbmRpbmcgaG93IHRoZSBuZXdcbi8vIGNvbnRlbnQgZm9yIHN1Y2ggaW50ZXJwb2xhdGlvbi9ob2xlIHNob3VsZCBiZSB1cGRhdGVkXG5jb25zdCBoYW5kbGVBbnl0aGluZyA9IGNvbW1lbnQgPT4ge1xuICBsZXQgb2xkVmFsdWUsIHRleHQsIG5vZGVzID0gW107XG4gIGNvbnN0IGFueUNvbnRlbnQgPSBuZXdWYWx1ZSA9PiB7XG4gICAgc3dpdGNoICh0eXBlb2YgbmV3VmFsdWUpIHtcbiAgICAgIC8vIHByaW1pdGl2ZXMgYXJlIGhhbmRsZWQgYXMgdGV4dCBjb250ZW50XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgb2xkVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBpZiAodGV4dClcbiAgICAgICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobmV3VmFsdWUpO1xuICAgICAgICAgIG5vZGVzID0gZGlmZihjb21tZW50LCBub2RlcywgW3RleHRdKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIC8vIG51bGwsIGFuZCB1bmRlZmluZWQgYXJlIHVzZWQgdG8gY2xlYW51cCBwcmV2aW91cyBjb250ZW50XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICBpZiAob2xkVmFsdWUgIT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgICBub2RlcyA9IGRpZmYoY29tbWVudCwgbm9kZXMsIFtdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXJyYXlzIGFuZCBub2RlcyBoYXZlIGEgc3BlY2lhbCB0cmVhdG1lbnRcbiAgICAgICAgaWYgKGlzQXJyYXkobmV3VmFsdWUpKSB7XG4gICAgICAgICAgb2xkVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAvLyBhcnJheXMgY2FuIGJlIHVzZWQgdG8gY2xlYW51cCwgaWYgZW1wdHlcbiAgICAgICAgICBpZiAobmV3VmFsdWUubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgbm9kZXMgPSBkaWZmKGNvbW1lbnQsIG5vZGVzLCBbXSk7XG4gICAgICAgICAgLy8gb3IgZGlmZmVkLCBpZiB0aGVzZSBjb250YWlucyBub2RlcyBvciBcIndpcmVzXCJcbiAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgbmV3VmFsdWVbMF0gPT09ICdvYmplY3QnKVxuICAgICAgICAgICAgbm9kZXMgPSBkaWZmKGNvbW1lbnQsIG5vZGVzLCBuZXdWYWx1ZSk7XG4gICAgICAgICAgLy8gaW4gYWxsIG90aGVyIGNhc2VzIHRoZSBjb250ZW50IGlzIHN0cmluZ2lmaWVkIGFzIGlzXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgYW55Q29udGVudChTdHJpbmcobmV3VmFsdWUpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGUgbmV3IHZhbHVlIGlzIGEgRE9NIG5vZGUsIG9yIGEgd2lyZSwgYW5kIGl0J3NcbiAgICAgICAgLy8gZGlmZmVyZW50IGZyb20gdGhlIG9uZSBhbHJlYWR5IGxpdmUsIHRoZW4gaXQncyBkaWZmZWQuXG4gICAgICAgIC8vIGlmIHRoZSBub2RlIGlzIGEgZnJhZ21lbnQsIGl0J3MgYXBwZW5kZWQgb25jZSB2aWEgaXRzIGNoaWxkTm9kZXNcbiAgICAgICAgLy8gVGhlcmUgaXMgbm8gYGVsc2VgIGhlcmUsIG1lYW5pbmcgaWYgdGhlIGNvbnRlbnRcbiAgICAgICAgLy8gaXMgbm90IGV4cGVjdGVkIG9uZSwgbm90aGluZyBoYXBwZW5zLCBhcyBlYXN5IGFzIHRoYXQuXG4gICAgICAgIGlmICgnRUxFTUVOVF9OT0RFJyBpbiBuZXdWYWx1ZSAmJiBvbGRWYWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICBvbGRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIG5vZGVzID0gZGlmZihcbiAgICAgICAgICAgIGNvbW1lbnQsXG4gICAgICAgICAgICBub2RlcyxcbiAgICAgICAgICAgIG5ld1ZhbHVlLm5vZGVUeXBlID09PSAxMSA/XG4gICAgICAgICAgICAgIHNsaWNlLmNhbGwobmV3VmFsdWUuY2hpbGROb2RlcykgOlxuICAgICAgICAgICAgICBbbmV3VmFsdWVdXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGFueUNvbnRlbnQ7XG59O1xuXG4vLyBhdHRyaWJ1dGVzIGNhbiBiZTpcbi8vICAqIHJlZj0key4uLn0gICAgICBmb3IgaG9va3MgYW5kIG90aGVyIHB1cnBvc2VzXG4vLyAgKiBhcmlhPSR7Li4ufSAgICAgZm9yIGFyaWEgYXR0cmlidXRlc1xuLy8gICogLmRhdGFzZXQ9JHsuLi59IGZvciBkYXRhc2V0IHJlbGF0ZWQgYXR0cmlidXRlc1xuLy8gICogLnNldHRlcj0key4uLn0gIGZvciBDdXN0b20gRWxlbWVudHMgc2V0dGVycyBvciBub2RlcyB3aXRoIHNldHRlcnNcbi8vICAgICAgICAgICAgICAgICAgICBzdWNoIGFzIGJ1dHRvbnMsIGRldGFpbHMsIG9wdGlvbnMsIHNlbGVjdCwgZXRjXG4vLyAgKiBvbmV2ZW50PSR7Li4ufSAgdG8gYXV0b21hdGljYWxseSBoYW5kbGUgZXZlbnQgbGlzdGVuZXJzXG4vLyAgKiBnZW5lcmljPSR7Li4ufSAgdG8gaGFuZGxlIGFuIGF0dHJpYnV0ZSBqdXN0IGxpa2UgYW4gYXR0cmlidXRlXG5jb25zdCBoYW5kbGVBdHRyaWJ1dGUgPSAobm9kZSwgbmFtZS8qLCBzdmcqLykgPT4ge1xuICBpZiAobmFtZSA9PT0gJ3JlZicpXG4gICAgcmV0dXJuIHJlZihub2RlKTtcblxuICBpZiAobmFtZSA9PT0gJ2FyaWEnKVxuICAgIHJldHVybiBhcmlhKG5vZGUpO1xuXG4gIGlmIChuYW1lID09PSAnLmRhdGFzZXQnKVxuICAgIHJldHVybiBkYXRhKG5vZGUpO1xuXG4gIGlmIChuYW1lLnNsaWNlKDAsIDEpID09PSAnLicpXG4gICAgcmV0dXJuIHNldHRlcihub2RlLCBuYW1lLnNsaWNlKDEpKTtcblxuICBpZiAobmFtZS5zbGljZSgwLCAyKSA9PT0gJ29uJylcbiAgICByZXR1cm4gZXZlbnQobm9kZSwgbmFtZSk7XG5cbiAgcmV0dXJuIGF0dHJpYnV0ZShub2RlLCBuYW1lLyosIHN2ZyovKTtcbn07XG5cbi8vIGVhY2ggbWFwcGVkIHVwZGF0ZSBjYXJyaWVzIHRoZSB1cGRhdGUgdHlwZSBhbmQgaXRzIHBhdGhcbi8vIHRoZSB0eXBlIGlzIGVpdGhlciBub2RlLCBhdHRyaWJ1dGUsIG9yIHRleHQsIHdoaWxlXG4vLyB0aGUgcGF0aCBpcyBob3cgdG8gcmV0cmlldmUgdGhlIHJlbGF0ZWQgbm9kZSB0byB1cGRhdGUuXG4vLyBJbiB0aGUgYXR0cmlidXRlIGNhc2UsIHRoZSBhdHRyaWJ1dGUgbmFtZSBpcyBhbHNvIGNhcnJpZWQgYWxvbmcuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlcnMob3B0aW9ucykge1xuICBjb25zdCB7dHlwZSwgcGF0aH0gPSBvcHRpb25zO1xuICBjb25zdCBub2RlID0gcGF0aC5yZWR1Y2VSaWdodChyZWR1Y2VQYXRoLCB0aGlzKTtcbiAgcmV0dXJuIHR5cGUgPT09ICdub2RlJyA/XG4gICAgaGFuZGxlQW55dGhpbmcobm9kZSkgOlxuICAgICh0eXBlID09PSAnYXR0cicgP1xuICAgICAgaGFuZGxlQXR0cmlidXRlKG5vZGUsIG9wdGlvbnMubmFtZS8qLCBvcHRpb25zLnN2ZyovKSA6XG4gICAgICB0ZXh0KG5vZGUpKTtcbn07XG4iLCJpbXBvcnQgdW1hcCBmcm9tICd1bWFwJztcbmltcG9ydCBpbnN0cnVtZW50IGZyb20gJ3VwYXJzZXInO1xuaW1wb3J0IHtpc0FycmF5fSBmcm9tICd1YXJyYXknO1xuaW1wb3J0IHtwZXJzaXN0ZW50fSBmcm9tICd1d2lyZSc7XG5cbmltcG9ydCB7aGFuZGxlcnN9IGZyb20gJy4vaGFuZGxlcnMuanMnO1xuaW1wb3J0IHtjcmVhdGVGcmFnbWVudCwgY3JlYXRlUGF0aCwgY3JlYXRlV2Fsa2VyLCBpbXBvcnROb2RlfSBmcm9tICcuL25vZGUuanMnO1xuXG4vLyB0aGUgcHJlZml4IGlzIHVzZWQgdG8gaWRlbnRpZnkgZWl0aGVyIGNvbW1lbnRzLCBhdHRyaWJ1dGVzLCBvciBub2Rlc1xuLy8gdGhhdCBjb250YWluIHRoZSByZWxhdGVkIHVuaXF1ZSBpZC4gSW4gdGhlIGF0dHJpYnV0ZSBjYXNlc1xuLy8gaXPCtVg9XCJhdHRyaWJ1dGUtbmFtZVwiIHdpbGwgYmUgdXNlZCB0byBtYXAgY3VycmVudCBYIHVwZGF0ZSB0byB0aGF0XG4vLyBhdHRyaWJ1dGUgbmFtZSwgd2hpbGUgY29tbWVudHMgd2lsbCBiZSBsaWtlIDwhLS1pc8K1WC0tPiwgdG8gbWFwXG4vLyB0aGUgdXBkYXRlIHRvIHRoYXQgc3BlY2lmaWMgY29tbWVudCBub2RlLCBoZW5jZSBpdHMgcGFyZW50LlxuLy8gc3R5bGUgYW5kIHRleHRhcmVhIHdpbGwgaGF2ZSA8IS0taXPCtVgtLT4gdGV4dCBjb250ZW50LCBhbmQgYXJlIGhhbmRsZWRcbi8vIGRpcmVjdGx5IHRocm91Z2ggdGV4dC1vbmx5IHVwZGF0ZXMuXG5jb25zdCBwcmVmaXggPSAnaXPCtSc7XG5cbi8vIFRlbXBsYXRlIExpdGVyYWxzIGFyZSB1bmlxdWUgcGVyIHNjb3BlIGFuZCBzdGF0aWMsIG1lYW5pbmcgYSB0ZW1wbGF0ZVxuLy8gc2hvdWxkIGJlIHBhcnNlZCBvbmNlLCBhbmQgb25jZSBvbmx5LCBhcyBpdCB3aWxsIGFsd2F5cyByZXByZXNlbnQgdGhlIHNhbWVcbi8vIGNvbnRlbnQsIHdpdGhpbiB0aGUgZXhhY3Qgc2FtZSBhbW91bnQgb2YgdXBkYXRlcyBlYWNoIHRpbWUuXG4vLyBUaGlzIGNhY2hlIHJlbGF0ZXMgZWFjaCB0ZW1wbGF0ZSB0byBpdHMgdW5pcXVlIGNvbnRlbnQgYW5kIHVwZGF0ZXMuXG5jb25zdCBjYWNoZSA9IHVtYXAobmV3IFdlYWtNYXApO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQ2FjaGUgPSAoKSA9PiAoe1xuICBzdGFjazogW10sICAgIC8vIGVhY2ggdGVtcGxhdGUgZ2V0cyBhIHN0YWNrIGZvciBlYWNoIGludGVycG9sYXRpb24gXCJob2xlXCJcblxuICBlbnRyeTogbnVsbCwgIC8vIGVhY2ggZW50cnkgY29udGFpbnMgZGV0YWlscywgc3VjaCBhczpcbiAgICAgICAgICAgICAgICAvLyAgKiB0aGUgdGVtcGxhdGUgdGhhdCBpcyByZXByZXNlbnRpbmdcbiAgICAgICAgICAgICAgICAvLyAgKiB0aGUgdHlwZSBvZiBub2RlIGl0IHJlcHJlc2VudHMgKGh0bWwgb3Igc3ZnKVxuICAgICAgICAgICAgICAgIC8vICAqIHRoZSBjb250ZW50IGZyYWdtZW50IHdpdGggYWxsIG5vZGVzXG4gICAgICAgICAgICAgICAgLy8gICogdGhlIGxpc3Qgb2YgdXBkYXRlcyBwZXIgZWFjaCBub2RlICh0ZW1wbGF0ZSBob2xlcylcbiAgICAgICAgICAgICAgICAvLyAgKiB0aGUgXCJ3aXJlZFwiIG5vZGUgb3IgZnJhZ21lbnQgdGhhdCB3aWxsIGdldCB1cGRhdGVzXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHRlbXBsYXRlIG9yIHR5cGUgYXJlIGRpZmZlcmVudCBmcm9tIHRoZSBwcmV2aW91cyBvbmVcbiAgICAgICAgICAgICAgICAvLyB0aGUgZW50cnkgZ2V0cyByZS1jcmVhdGVkIGVhY2ggdGltZVxuXG4gIHdpcmU6IG51bGwgICAgLy8gZWFjaCByZW5kZXJlZCBub2RlIHJlcHJlc2VudCBzb21lIHdpcmVkIGNvbnRlbnQgYW5kXG4gICAgICAgICAgICAgICAgLy8gdGhpcyByZWZlcmVuY2UgdG8gdGhlIGxhdGVzdCBvbmUuIElmIGRpZmZlcmVudCwgdGhlIG5vZGVcbiAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIGNsZWFuZWQgdXAgYW5kIHRoZSBuZXcgXCJ3aXJlXCIgd2lsbCBiZSBhcHBlbmRlZFxufSk7XG5cbi8vIHRoZSBlbnRyeSBzdG9yZWQgaW4gdGhlIHJlbmRlcmVkIG5vZGUgY2FjaGUsIGFuZCBwZXIgZWFjaCBcImhvbGVcIlxuY29uc3QgY3JlYXRlRW50cnkgPSAodHlwZSwgdGVtcGxhdGUpID0+IHtcbiAgY29uc3Qge2NvbnRlbnQsIHVwZGF0ZXN9ID0gbWFwVXBkYXRlcyh0eXBlLCB0ZW1wbGF0ZSk7XG4gIHJldHVybiB7dHlwZSwgdGVtcGxhdGUsIGNvbnRlbnQsIHVwZGF0ZXMsIHdpcmU6IG51bGx9O1xufTtcblxuLy8gYSB0ZW1wbGF0ZSBpcyBpbnN0cnVtZW50ZWQgdG8gYmUgYWJsZSB0byByZXRyaWV2ZSB3aGVyZSB1cGRhdGVzIGFyZSBuZWVkZWQuXG4vLyBFYWNoIHVuaXF1ZSB0ZW1wbGF0ZSBiZWNvbWVzIGEgZnJhZ21lbnQsIGNsb25lZCBvbmNlIHBlciBlYWNoIG90aGVyXG4vLyBvcGVyYXRpb24gYmFzZWQgb24gdGhlIHNhbWUgdGVtcGxhdGUsIGkuZS4gZGF0YSA9PiBodG1sYDxwPiR7ZGF0YX08L3A+YFxuY29uc3QgbWFwVGVtcGxhdGUgPSAodHlwZSwgdGVtcGxhdGUpID0+IHtcbiAgY29uc3QgdGV4dCA9IGluc3RydW1lbnQodGVtcGxhdGUsIHByZWZpeCwgdHlwZSA9PT0gJ3N2ZycpO1xuICBjb25zdCBjb250ZW50ID0gY3JlYXRlRnJhZ21lbnQodGV4dCwgdHlwZSk7XG4gIC8vIG9uY2UgaW5zdHJ1bWVudGVkIGFuZCByZXByb2R1Y2VkIGFzIGZyYWdtZW50LCBpdCdzIGNyYXdsZWRcbiAgLy8gdG8gZmluZCBvdXQgd2hlcmUgZWFjaCB1cGRhdGUgaXMgaW4gdGhlIGZyYWdtZW50IHRyZWVcbiAgY29uc3QgdHcgPSBjcmVhdGVXYWxrZXIoY29udGVudCk7XG4gIGNvbnN0IG5vZGVzID0gW107XG4gIGNvbnN0IGxlbmd0aCA9IHRlbXBsYXRlLmxlbmd0aCAtIDE7XG4gIGxldCBpID0gMDtcbiAgLy8gdXBkYXRlcyBhcmUgc2VhcmNoZWQgdmlhIHVuaXF1ZSBuYW1lcywgbGluZWFybHkgaW5jcmVhc2VkIGFjcm9zcyB0aGUgdHJlZVxuICAvLyA8ZGl2IGlzwrUwPVwiYXR0clwiIGlzwrUxPVwib3RoZXJcIj48IS0taXPCtTItLT48c3R5bGU+PCEtLWlzwrUzLS08L3N0eWxlPjwvZGl2PlxuICBsZXQgc2VhcmNoID0gYCR7cHJlZml4fSR7aX1gO1xuICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgIGNvbnN0IG5vZGUgPSB0dy5uZXh0Tm9kZSgpO1xuICAgIC8vIGlmIG5vdCBhbGwgdXBkYXRlcyBhcmUgYm91bmQgYnV0IHRoZXJlJ3Mgbm90aGluZyBlbHNlIHRvIGNyYXdsXG4gICAgLy8gaXQgbWVhbnMgdGhhdCB0aGVyZSBpcyBzb21ldGhpbmcgd3Jvbmcgd2l0aCB0aGUgdGVtcGxhdGUuXG4gICAgaWYgKCFub2RlKVxuICAgICAgdGhyb3cgYGJhZCB0ZW1wbGF0ZTogJHt0ZXh0fWA7XG4gICAgLy8gaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyBhIGNvbW1lbnQsIGFuZCBpdCBjb250YWlucyBpc8K1WFxuICAgIC8vIGl0IG1lYW5zIHRoZSB1cGRhdGUgc2hvdWxkIHRha2UgY2FyZSBvZiBhbnkgY29udGVudFxuICAgIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAvLyBUaGUgb25seSBjb21tZW50cyB0byBiZSBjb25zaWRlcmVkIGFyZSB0aG9zZVxuICAgICAgLy8gd2hpY2ggY29udGVudCBpcyBleGFjdGx5IHRoZSBzYW1lIGFzIHRoZSBzZWFyY2hlZCBvbmUuXG4gICAgICBpZiAobm9kZS50ZXh0Q29udGVudCA9PT0gc2VhcmNoKSB7XG4gICAgICAgIG5vZGVzLnB1c2goe3R5cGU6ICdub2RlJywgcGF0aDogY3JlYXRlUGF0aChub2RlKX0pO1xuICAgICAgICBzZWFyY2ggPSBgJHtwcmVmaXh9JHsrK2l9YDtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBpZiB0aGUgbm9kZSBpcyBub3QgYSBjb21tZW50LCBsb29wIHRocm91Z2ggYWxsIGl0cyBhdHRyaWJ1dGVzXG4gICAgICAvLyBuYW1lZCBpc8K1WCBhbmQgcmVsYXRlIGF0dHJpYnV0ZSB1cGRhdGVzIHRvIHRoaXMgbm9kZSBhbmQgdGhlXG4gICAgICAvLyBhdHRyaWJ1dGUgbmFtZSwgcmV0cmlldmVkIHRocm91Z2ggbm9kZS5nZXRBdHRyaWJ1dGUoXCJpc8K1WFwiKVxuICAgICAgLy8gdGhlIGlzwrVYIGF0dHJpYnV0ZSB3aWxsIGJlIHJlbW92ZWQgYXMgaXJyZWxldmFudCBmb3IgdGhlIGxheW91dFxuICAgICAgLy8gbGV0IHN2ZyA9IC0xO1xuICAgICAgd2hpbGUgKG5vZGUuaGFzQXR0cmlidXRlKHNlYXJjaCkpIHtcbiAgICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ2F0dHInLFxuICAgICAgICAgIHBhdGg6IGNyZWF0ZVBhdGgobm9kZSksXG4gICAgICAgICAgbmFtZTogbm9kZS5nZXRBdHRyaWJ1dGUoc2VhcmNoKSxcbiAgICAgICAgICAvL3N2Zzogc3ZnIDwgMCA/IChzdmcgPSAoJ293bmVyU1ZHRWxlbWVudCcgaW4gbm9kZSA/IDEgOiAwKSkgOiBzdmdcbiAgICAgICAgfSk7XG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKHNlYXJjaCk7XG4gICAgICAgIHNlYXJjaCA9IGAke3ByZWZpeH0keysraX1gO1xuICAgICAgfVxuICAgICAgLy8gaWYgdGhlIG5vZGUgd2FzIGEgc3R5bGUgb3IgYSB0ZXh0YXJlYSBvbmUsIGNoZWNrIGl0cyBjb250ZW50XG4gICAgICAvLyBhbmQgaWYgaXQgaXMgPCEtLWlzwrVYLS0+IHRoZW4gdXBkYXRlIHRleC1vbmx5IHRoaXMgbm9kZVxuICAgICAgaWYgKFxuICAgICAgICAvXig/OnN0eWxlfHRleHRhcmVhKSQvaS50ZXN0KG5vZGUudGFnTmFtZSkgJiZcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudC50cmltKCkgPT09IGA8IS0tJHtzZWFyY2h9LS0+YFxuICAgICAgKXtcbiAgICAgICAgbm9kZXMucHVzaCh7dHlwZTogJ3RleHQnLCBwYXRoOiBjcmVhdGVQYXRoKG5vZGUpfSk7XG4gICAgICAgIHNlYXJjaCA9IGAke3ByZWZpeH0keysraX1gO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBvbmNlIGFsbCBub2RlcyB0byB1cGRhdGUsIG9yIHRoZWlyIGF0dHJpYnV0ZXMsIGFyZSBrbm93biwgdGhlIGNvbnRlbnRcbiAgLy8gd2lsbCBiZSBjbG9uZWQgaW4gdGhlIGZ1dHVyZSB0byByZXByZXNlbnQgdGhlIHRlbXBsYXRlLCBhbmQgYWxsIHVwZGF0ZXNcbiAgLy8gcmVsYXRlZCB0byBzdWNoIGNvbnRlbnQgcmV0cmlldmVkIHJpZ2h0IGF3YXkgd2l0aG91dCBuZWVkaW5nIHRvIHJlLWNyYXdsXG4gIC8vIHRoZSBleGFjdCBzYW1lIHRlbXBsYXRlLCBhbmQgaXRzIGNvbnRlbnQsIG1vcmUgdGhhbiBvbmNlLlxuICByZXR1cm4ge2NvbnRlbnQsIG5vZGVzfTtcbn07XG5cbi8vIGlmIGEgdGVtcGxhdGUgaXMgdW5rbm93biwgcGVyZm9ybSB0aGUgcHJldmlvdXMgbWFwcGluZywgb3RoZXJ3aXNlIGdyYWJcbi8vIGl0cyBkZXRhaWxzIHN1Y2ggYXMgdGhlIGZyYWdtZW50IHdpdGggYWxsIG5vZGVzLCBhbmQgdXBkYXRlcyBpbmZvLlxuY29uc3QgbWFwVXBkYXRlcyA9ICh0eXBlLCB0ZW1wbGF0ZSkgPT4ge1xuICBjb25zdCB7Y29udGVudCwgbm9kZXN9ID0gKFxuICAgIGNhY2hlLmdldCh0ZW1wbGF0ZSkgfHxcbiAgICBjYWNoZS5zZXQodGVtcGxhdGUsIG1hcFRlbXBsYXRlKHR5cGUsIHRlbXBsYXRlKSlcbiAgKTtcbiAgLy8gY2xvbmUgZGVlcGx5IHRoZSBmcmFnbWVudFxuICBjb25zdCBmcmFnbWVudCA9IGltcG9ydE5vZGUuY2FsbChkb2N1bWVudCwgY29udGVudCwgdHJ1ZSk7XG4gIC8vIGFuZCByZWxhdGUgYW4gdXBkYXRlIGhhbmRsZXIgcGVyIGVhY2ggbm9kZSB0aGF0IG5lZWRzIG9uZVxuICBjb25zdCB1cGRhdGVzID0gbm9kZXMubWFwKGhhbmRsZXJzLCBmcmFnbWVudCk7XG4gIC8vIHJldHVybiB0aGUgZnJhZ21lbnQgYW5kIGFsbCB1cGRhdGVzIHRvIHVzZSB3aXRoaW4gaXRzIG5vZGVzXG4gIHJldHVybiB7Y29udGVudDogZnJhZ21lbnQsIHVwZGF0ZXN9O1xufTtcblxuLy8gYXMgaHRtbCBhbmQgc3ZnIGNhbiBiZSBuZXN0ZWQgY2FsbHMsIGJ1dCBubyBwYXJlbnQgbm9kZSBpcyBrbm93blxuLy8gdW50aWwgcmVuZGVyZWQgc29tZXdoZXJlLCB0aGUgdW5yb2xsIG9wZXJhdGlvbiBpcyBuZWVkZWQgdG9cbi8vIGRpc2NvdmVyIHdoYXQgdG8gZG8gd2l0aCBlYWNoIGludGVycG9sYXRpb24sIHdoaWNoIHdpbGwgcmVzdWx0XG4vLyBpbnRvIGFuIHVwZGF0ZSBvcGVyYXRpb24uXG5leHBvcnQgY29uc3QgdW5yb2xsID0gKGluZm8sIHt0eXBlLCB0ZW1wbGF0ZSwgdmFsdWVzfSkgPT4ge1xuICBjb25zdCB7bGVuZ3RofSA9IHZhbHVlcztcbiAgLy8gaW50ZXJwb2xhdGlvbnMgY2FuIGNvbnRhaW4gaG9sZXMgYW5kIGFycmF5cywgc28gdGhlc2UgbmVlZFxuICAvLyB0byBiZSByZWN1cnNpdmVseSBkaXNjb3ZlcmVkXG4gIHVucm9sbFZhbHVlcyhpbmZvLCB2YWx1ZXMsIGxlbmd0aCk7XG4gIGxldCB7ZW50cnl9ID0gaW5mbztcbiAgLy8gaWYgdGhlIGNhY2hlIGVudHJ5IGlzIGVpdGhlciBudWxsIG9yIGRpZmZlcmVudCBmcm9tIHRoZSB0ZW1wbGF0ZVxuICAvLyBhbmQgdGhlIHR5cGUgdGhpcyB1bnJvbGwgc2hvdWxkIHJlc29sdmUsIGNyZWF0ZSBhIG5ldyBlbnRyeVxuICAvLyBhc3NpZ25pbmcgYSBuZXcgY29udGVudCBmcmFnbWVudCBhbmQgdGhlIGxpc3Qgb2YgdXBkYXRlcy5cbiAgaWYgKCFlbnRyeSB8fCAoZW50cnkudGVtcGxhdGUgIT09IHRlbXBsYXRlIHx8IGVudHJ5LnR5cGUgIT09IHR5cGUpKVxuICAgIGluZm8uZW50cnkgPSAoZW50cnkgPSBjcmVhdGVFbnRyeSh0eXBlLCB0ZW1wbGF0ZSkpO1xuICBjb25zdCB7Y29udGVudCwgdXBkYXRlcywgd2lyZX0gPSBlbnRyeTtcbiAgLy8gZXZlbiBpZiB0aGUgZnJhZ21lbnQgYW5kIGl0cyBub2RlcyBpcyBub3QgbGl2ZSB5ZXQsXG4gIC8vIGl0IGlzIGFscmVhZHkgcG9zc2libGUgdG8gdXBkYXRlIHZpYSBpbnRlcnBvbGF0aW9ucyB2YWx1ZXMuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgdXBkYXRlc1tpXSh2YWx1ZXNbaV0pO1xuICAvLyBpZiB0aGUgZW50cnkgd2FzIG5ldywgb3IgcmVwcmVzZW50aW5nIGEgZGlmZmVyZW50IHRlbXBsYXRlIG9yIHR5cGUsXG4gIC8vIGNyZWF0ZSBhIG5ldyBwZXJzaXN0ZW50IGVudGl0eSB0byB1c2UgZHVyaW5nIGRpZmZpbmcuXG4gIC8vIFRoaXMgaXMgc2ltcGx5IGEgRE9NIG5vZGUsIHdoZW4gdGhlIHRlbXBsYXRlIGhhcyBhIHNpbmdsZSBjb250YWluZXIsXG4gIC8vIGFzIGluIGA8cD48L3A+YCwgb3IgYSBcIndpcmVcIiBpbiBgPHA+PC9wPjxwPjwvcD5gIGFuZCBzaW1pbGFyIGNhc2VzLlxuICByZXR1cm4gd2lyZSB8fCAoZW50cnkud2lyZSA9IHBlcnNpc3RlbnQoY29udGVudCkpO1xufTtcblxuLy8gdGhlIHN0YWNrIHJldGFpbnMsIHBlciBlYWNoIGludGVycG9sYXRpb24gdmFsdWUsIHRoZSBjYWNoZVxuLy8gcmVsYXRlZCB0byBlYWNoIGludGVycG9sYXRpb24gdmFsdWUsIG9yIG51bGwsIGlmIHRoZSByZW5kZXJcbi8vIHdhcyBjb25kaXRpb25hbCBhbmQgdGhlIHZhbHVlIGlzIG5vdCBzcGVjaWFsIChBcnJheSBvciBIb2xlKVxuY29uc3QgdW5yb2xsVmFsdWVzID0gKHtzdGFja30sIHZhbHVlcywgbGVuZ3RoKSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBob2xlID0gdmFsdWVzW2ldO1xuICAgIC8vIGVhY2ggSG9sZSBnZXRzIHVucm9sbGVkIGFuZCByZS1hc3NpZ25lZCBhcyB2YWx1ZVxuICAgIC8vIHNvIHRoYXQgZG9tZGlmZiB3aWxsIGRlYWwgd2l0aCBhIG5vZGUvd2lyZSwgbm90IHdpdGggYSBob2xlXG4gICAgaWYgKGhvbGUgaW5zdGFuY2VvZiBIb2xlKVxuICAgICAgdmFsdWVzW2ldID0gdW5yb2xsKFxuICAgICAgICBzdGFja1tpXSB8fCAoc3RhY2tbaV0gPSBjcmVhdGVDYWNoZSgpKSxcbiAgICAgICAgaG9sZVxuICAgICAgKTtcbiAgICAvLyBhcnJheXMgYXJlIHJlY3Vyc2l2ZWx5IHJlc29sdmVkIHNvIHRoYXQgZWFjaCBlbnRyeSB3aWxsIGNvbnRhaW5cbiAgICAvLyBhbHNvIGEgRE9NIG5vZGUgb3IgYSB3aXJlLCBoZW5jZSBpdCBjYW4gYmUgZGlmZmVkIGlmL3doZW4gbmVlZGVkXG4gICAgZWxzZSBpZiAoaXNBcnJheShob2xlKSlcbiAgICAgIHVucm9sbFZhbHVlcyhcbiAgICAgICAgc3RhY2tbaV0gfHwgKHN0YWNrW2ldID0gY3JlYXRlQ2FjaGUoKSksXG4gICAgICAgIGhvbGUsXG4gICAgICAgIGhvbGUubGVuZ3RoXG4gICAgICApO1xuICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBub3RoaW5nIHNwZWNpYWwsIHRoZSBzdGFjayBkb2Vzbid0IG5lZWQgdG8gcmV0YWluIGRhdGFcbiAgICAvLyB0aGlzIGlzIHVzZWZ1bCBhbHNvIHRvIGNsZWFudXAgcHJldmlvdXNseSByZXRhaW5lZCBkYXRhLCBpZiB0aGUgdmFsdWVcbiAgICAvLyB3YXMgYSBIb2xlLCBvciBhbiBBcnJheSwgYnV0IG5vdCBhbnltb3JlLCBpLmUuOlxuICAgIC8vIGNvbnN0IHVwZGF0ZSA9IGNvbnRlbnQgPT4gaHRtbGA8ZGl2PiR7Y29udGVudH08L2Rpdj5gO1xuICAgIC8vIHVwZGF0ZShsaXN0T2ZJdGVtcyk7IHVwZGF0ZShudWxsKTsgdXBkYXRlKGh0bWxgaG9sZWApXG4gICAgZWxzZVxuICAgICAgc3RhY2tbaV0gPSBudWxsO1xuICB9XG4gIGlmIChsZW5ndGggPCBzdGFjay5sZW5ndGgpXG4gICAgc3RhY2suc3BsaWNlKGxlbmd0aCk7XG59O1xuXG4vKipcbiAqIEhvbGRzIGFsbCBkZXRhaWxzIHdyYXBwZXJzIG5lZWRlZCB0byByZW5kZXIgdGhlIGNvbnRlbnQgZnVydGhlciBvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIGhvbGUgdHlwZSwgZWl0aGVyIGBodG1sYCBvciBgc3ZnYC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHRlbXBsYXRlIFRoZSB0ZW1wbGF0ZSBsaXRlcmFscyB1c2VkIHRvIHRoZSBkZWZpbmUgdGhlIGNvbnRlbnQuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgWmVybywgb25lLCBvciBtb3JlIGludGVycG9sYXRlZCB2YWx1ZXMgdG8gcmVuZGVyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gSG9sZSh0eXBlLCB0ZW1wbGF0ZSwgdmFsdWVzKSB7XG4gIHRoaXMudHlwZSA9IHR5cGU7XG4gIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgdGhpcy52YWx1ZXMgPSB2YWx1ZXM7XG59O1xuIiwiaW1wb3J0IHVtYXAgZnJvbSAndW1hcCc7XG5pbXBvcnQge0hvbGUsIGNyZWF0ZUNhY2hlLCB1bnJvbGx9IGZyb20gJy4vcmFiYml0LmpzJztcblxuY29uc3Qge2NyZWF0ZSwgZGVmaW5lUHJvcGVydGllc30gPSBPYmplY3Q7XG5cbi8vIGJvdGggYGh0bWxgIGFuZCBgc3ZnYCB0ZW1wbGF0ZSBsaXRlcmFsIHRhZ3MgYXJlIHBvbGx1dGVkXG4vLyB3aXRoIGEgYGZvcihyZWZbLCBpZF0pYCBhbmQgYSBgbm9kZWAgdGFnIHRvb1xuY29uc3QgdGFnID0gdHlwZSA9PiB7XG4gIC8vIGJvdGggYGh0bWxgIGFuZCBgc3ZnYCB0YWdzIGhhdmUgdGhlaXIgb3duIGNhY2hlXG4gIGNvbnN0IGtleWVkID0gdW1hcChuZXcgV2Vha01hcCk7XG4gIC8vIGtleWVkIG9wZXJhdGlvbnMgYWx3YXlzIHJlLXVzZSB0aGUgc2FtZSBjYWNoZSBhbmQgdW5yb2xsXG4gIC8vIHRoZSB0ZW1wbGF0ZSBhbmQgaXRzIGludGVycG9sYXRpb25zIHJpZ2h0IGF3YXlcbiAgY29uc3QgZml4ZWQgPSBjYWNoZSA9PiAodGVtcGxhdGUsIC4uLnZhbHVlcykgPT4gdW5yb2xsKFxuICAgIGNhY2hlLFxuICAgIHt0eXBlLCB0ZW1wbGF0ZSwgdmFsdWVzfVxuICApO1xuICByZXR1cm4gZGVmaW5lUHJvcGVydGllcyhcbiAgICAvLyBub24ga2V5ZWQgb3BlcmF0aW9ucyBhcmUgcmVjb2duaXplZCBhcyBpbnN0YW5jZSBvZiBIb2xlXG4gICAgLy8gZHVyaW5nIHRoZSBcInVucm9sbFwiLCByZWN1cnNpdmVseSByZXNvbHZlZCBhbmQgdXBkYXRlZFxuICAgICh0ZW1wbGF0ZSwgLi4udmFsdWVzKSA9PiBuZXcgSG9sZSh0eXBlLCB0ZW1wbGF0ZSwgdmFsdWVzKSxcbiAgICB7XG4gICAgICBmb3I6IHtcbiAgICAgICAgLy8ga2V5ZWQgb3BlcmF0aW9ucyBuZWVkIGEgcmVmZXJlbmNlIG9iamVjdCwgdXN1YWxseSB0aGUgcGFyZW50IG5vZGVcbiAgICAgICAgLy8gd2hpY2ggaXMgc2hvd2luZyBrZXllZCByZXN1bHRzLCBhbmQgb3B0aW9uYWxseSBhIHVuaXF1ZSBpZCBwZXIgZWFjaFxuICAgICAgICAvLyByZWxhdGVkIG5vZGUsIGhhbmR5IHdpdGggSlNPTiByZXN1bHRzIGFuZCBtdXRhYmxlIGxpc3Qgb2Ygb2JqZWN0c1xuICAgICAgICAvLyB0aGF0IHVzdWFsbHkgY2FycnkgYSB1bmlxdWUgaWRlbnRpZmllclxuICAgICAgICB2YWx1ZShyZWYsIGlkKSB7XG4gICAgICAgICAgY29uc3QgbWVtbyA9IGtleWVkLmdldChyZWYpIHx8IGtleWVkLnNldChyZWYsIGNyZWF0ZShudWxsKSk7XG4gICAgICAgICAgcmV0dXJuIG1lbW9baWRdIHx8IChtZW1vW2lkXSA9IGZpeGVkKGNyZWF0ZUNhY2hlKCkpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG5vZGU6IHtcbiAgICAgICAgLy8gaXQgaXMgcG9zc2libGUgdG8gY3JlYXRlIG9uZS1vZmYgY29udGVudCBvdXQgb2YgdGhlIGJveCB2aWEgbm9kZSB0YWdcbiAgICAgICAgLy8gdGhpcyBtaWdodCByZXR1cm4gdGhlIHNpbmdsZSBjcmVhdGVkIG5vZGUsIG9yIGEgZnJhZ21lbnQgd2l0aCBhbGxcbiAgICAgICAgLy8gbm9kZXMgcHJlc2VudCBhdCB0aGUgcm9vdCBsZXZlbCBhbmQsIG9mIGNvdXJzZSwgdGhlaXIgY2hpbGQgbm9kZXNcbiAgICAgICAgdmFsdWU6ICh0ZW1wbGF0ZSwgLi4udmFsdWVzKSA9PiB1bnJvbGwoXG4gICAgICAgICAgY3JlYXRlQ2FjaGUoKSxcbiAgICAgICAgICB7dHlwZSwgdGVtcGxhdGUsIHZhbHVlc31cbiAgICAgICAgKS52YWx1ZU9mKClcbiAgICAgIH1cbiAgICB9XG4gICk7XG59O1xuXG4vLyBlYWNoIHJlbmRlcmVkIG5vZGUgZ2V0cyBpdHMgb3duIGNhY2hlXG5jb25zdCBjYWNoZSA9IHVtYXAobmV3IFdlYWtNYXApO1xuXG4vLyByZW5kZXJpbmcgbWVhbnMgdW5kZXJzdGFuZGluZyB3aGF0IGBodG1sYCBvciBgc3ZnYCB0YWdzIHJldHVybmVkXG4vLyBhbmQgaXQgcmVsYXRlcyBhIHNwZWNpZmljIG5vZGUgdG8gaXRzIG93biB1bmlxdWUgY2FjaGUuXG4vLyBFYWNoIHRpbWUgdGhlIGNvbnRlbnQgdG8gcmVuZGVyIGNoYW5nZXMsIHRoZSBub2RlIGlzIGNsZWFuZWQgdXBcbi8vIGFuZCB0aGUgbmV3IG5ldyBjb250ZW50IGlzIGFwcGVuZGVkLCBhbmQgaWYgc3VjaCBjb250ZW50IGlzIGEgSG9sZVxuLy8gdGhlbiBpdCdzIFwidW5yb2xsZWRcIiB0byByZXNvbHZlIGFsbCBpdHMgaW5uZXIgbm9kZXMuXG5jb25zdCByZW5kZXIgPSAod2hlcmUsIHdoYXQpID0+IHtcbiAgY29uc3QgaG9sZSA9IHR5cGVvZiB3aGF0ID09PSAnZnVuY3Rpb24nID8gd2hhdCgpIDogd2hhdDtcbiAgY29uc3QgaW5mbyA9IGNhY2hlLmdldCh3aGVyZSkgfHwgY2FjaGUuc2V0KHdoZXJlLCBjcmVhdGVDYWNoZSgpKTtcbiAgY29uc3Qgd2lyZSA9IGhvbGUgaW5zdGFuY2VvZiBIb2xlID8gdW5yb2xsKGluZm8sIGhvbGUpIDogaG9sZTtcbiAgaWYgKHdpcmUgIT09IGluZm8ud2lyZSkge1xuICAgIGluZm8ud2lyZSA9IHdpcmU7XG4gICAgd2hlcmUudGV4dENvbnRlbnQgPSAnJztcbiAgICAvLyB2YWx1ZU9mKCkgc2ltcGx5IHJldHVybnMgdGhlIG5vZGUgaXRzZWxmLCBidXQgaW4gY2FzZSBpdCB3YXMgYSBcIndpcmVcIlxuICAgIC8vIGl0IHdpbGwgZXZlbnR1YWxseSByZS1hcHBlbmQgYWxsIG5vZGVzIHRvIGl0cyBmcmFnbWVudCBzbyB0aGF0IHN1Y2hcbiAgICAvLyBmcmFnbWVudCBjYW4gYmUgcmUtYXBwZW5kZWQgbWFueSB0aW1lcyBpbiBhIG1lYW5pbmdmdWwgd2F5XG4gICAgLy8gKHdpcmVzIGFyZSBiYXNpY2FsbHkgcGVyc2lzdGVudCBmcmFnbWVudHMgZmFjYWRlcyB3aXRoIHNwZWNpYWwgYmVoYXZpb3IpXG4gICAgd2hlcmUuYXBwZW5kQ2hpbGQod2lyZS52YWx1ZU9mKCkpO1xuICB9XG4gIHJldHVybiB3aGVyZTtcbn07XG5cbmNvbnN0IGh0bWwgPSB0YWcoJ2h0bWwnKTtcbmNvbnN0IHN2ZyA9IHRhZygnc3ZnJyk7XG5cbmV4cG9ydCB7SG9sZSwgcmVuZGVyLCBodG1sLCBzdmd9O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHQpIHtcbiAgZm9yICh2YXIgcyA9IHRbMF0sIGkgPSAxLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICBzICs9IGFyZ3VtZW50c1tpXSArIHRbaV07XG4gIHJldHVybiBzO1xufTtcbiIsImNvbnN0IHtkZWZpbmVQcm9wZXJ0aWVzLCBrZXlzfSA9IE9iamVjdDtcblxuZXhwb3J0IHtkZWZpbmVQcm9wZXJ0aWVzLCBrZXlzfTtcbiIsImltcG9ydCB7a2V5c30gZnJvbSAnLi9vYmplY3QuanMnO1xuXG5jb25zdCBhY2Nlc3NvciA9IChhbGwsIHNoYWxsb3csIGhvb2ssIHZhbHVlLCB1cGRhdGUpID0+ICh7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiAoKSA9PiB2YWx1ZSxcbiAgc2V0KF8pIHtcbiAgICBpZiAoYWxsIHx8IF8gIT09IHZhbHVlIHx8IChzaGFsbG93ICYmIHR5cGVvZiBfID09PSAnb2JqZWN0JyAmJiBfKSkge1xuICAgICAgdmFsdWUgPSBfO1xuICAgICAgaWYgKGhvb2spXG4gICAgICAgIHVwZGF0ZS5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgIGVsc2VcbiAgICAgICAgdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGxvb3AgPSAocHJvcHMsIGdldCwgYWxsLCBzaGFsbG93LCB1c2VTdGF0ZSwgdXBkYXRlKSA9PiB7XG4gIGNvbnN0IGRlc2MgPSB7fTtcbiAgY29uc3QgaG9vayA9IHVzZVN0YXRlICE9PSBub29wO1xuICBjb25zdCBhcmdzID0gW2FsbCwgc2hhbGxvdywgaG9va107XG4gIGZvciAobGV0IGtlID0ga2V5cyhwcm9wcyksIHkgPSAwOyB5IDwga2UubGVuZ3RoOyB5KyspIHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldChwcm9wcywga2VbeV0pO1xuICAgIGNvbnN0IGV4dHJhcyA9IGhvb2sgPyB1c2VTdGF0ZSh2YWx1ZSkgOiBbdmFsdWUsIHVzZVN0YXRlXTtcbiAgICBpZiAodXBkYXRlKVxuICAgICAgZXh0cmFzWzFdID0gdXBkYXRlO1xuICAgIGRlc2Nba2VbeV1dID0gYWNjZXNzb3IuYXBwbHkobnVsbCwgYXJncy5jb25jYXQoZXh0cmFzKSk7XG4gIH1cbiAgcmV0dXJuIGRlc2M7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuIiwiaW1wb3J0IHtkZWZpbmVQcm9wZXJ0aWVzfSBmcm9tICcuL29iamVjdC5qcyc7XG5pbXBvcnQge2xvb3AsIG5vb3B9IGZyb20gJy4vdXRpbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCAoe1xuICBhbGwgPSBmYWxzZSxcbiAgc2hhbGxvdyA9IHRydWUsXG4gIHVzZVN0YXRlID0gbm9vcCxcbiAgZ2V0QXR0cmlidXRlID0gKGVsZW1lbnQsIGtleSkgPT4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KVxufSA9IHt9KSA9PiAoZWxlbWVudCwgcHJvcHMsIHVwZGF0ZSkgPT4ge1xuICBjb25zdCB2YWx1ZSA9IChwcm9wcywga2V5KSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IHByb3BzW2tleV0sIHR5cGUgPSB0eXBlb2YgcmVzdWx0O1xuICAgIGlmIChlbGVtZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIHJlc3VsdCA9IGVsZW1lbnRba2V5XTtcbiAgICAgIGRlbGV0ZSBlbGVtZW50W2tleV07XG4gICAgfVxuICAgIGVsc2UgaWYgKGVsZW1lbnQuaGFzQXR0cmlidXRlKGtleSkpIHtcbiAgICAgIHJlc3VsdCA9IGdldEF0dHJpYnV0ZShlbGVtZW50LCBrZXkpO1xuICAgICAgaWYgKHR5cGUgPT0gJ251bWJlcicpXG4gICAgICAgIHJlc3VsdCA9ICtyZXN1bHQ7XG4gICAgICBlbHNlIGlmICh0eXBlID09ICdib29sZWFuJylcbiAgICAgICAgcmVzdWx0ID0gIS9eKD86ZmFsc2V8MHwpJC8udGVzdChyZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBjb25zdCBkZXNjID0gbG9vcChwcm9wcywgdmFsdWUsIGFsbCwgc2hhbGxvdywgdXNlU3RhdGUsIHVwZGF0ZSk7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0aWVzKGVsZW1lbnQsIGRlc2MpO1xufTtcbiIsImltcG9ydCB7cmVuZGVyLCBodG1sLCBzdmd9IGZyb20gJ3VodG1sJztcbmltcG9ydCB1bWFwIGZyb20gJ3VtYXAnO1xuaW1wb3J0IGNzcyBmcm9tICdwbGFpbi10YWcnO1xuXG5pbXBvcnQgZG9tSGFuZGxlciBmcm9tICdyZWFjdGl2ZS1wcm9wcy9lc20vZG9tLmpzJztcbmNvbnN0IHJlYWN0aXZlID0gZG9tSGFuZGxlcih7ZG9tOiB0cnVlfSk7XG5cbmNvbnN0IENFID0gY3VzdG9tRWxlbWVudHM7XG5jb25zdCB7ZGVmaW5lOiBkZWZpbmVDdXN0b21FbGVtZW50fSA9IENFO1xuY29uc3Qge2NyZWF0ZSwgZGVmaW5lUHJvcGVydGllcywgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLCBrZXlzfSA9IE9iamVjdDtcblxuY29uc3QgZWxlbWVudCA9ICdlbGVtZW50JztcbmNvbnN0IGNvbnN0cnVjdG9ycyA9IHVtYXAobmV3IE1hcChbW2VsZW1lbnQsIHtjOiBIVE1MRWxlbWVudCwgZTogZWxlbWVudH1dXSkpO1xuXG5jb25zdCBlbCA9IG5hbWUgPT4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKTtcblxuY29uc3QgaW5mbyA9IGUgPT4gY29uc3RydWN0b3JzLmdldChlKSB8fCBjb25zdHJ1Y3RvcnMuc2V0KGUsIHtcbiAgYzogZWwoZSkuY29uc3RydWN0b3IsXG4gIGVcbn0pO1xuXG5jb25zdCBkZWZpbmUgPSAodGFnTmFtZSwgZGVmaW5pdGlvbikgPT4ge1xuICBjb25zdCB7XG4gICAgYXR0YWNoU2hhZG93LFxuICAgIGF0dHJpYnV0ZUNoYW5nZWQsXG4gICAgYm91bmQsXG4gICAgY29ubmVjdGVkLFxuICAgIGRpc2Nvbm5lY3RlZCxcbiAgICBoYW5kbGVFdmVudCxcbiAgICBpbml0LFxuICAgIG9ic2VydmVkQXR0cmlidXRlcyxcbiAgICBwcm9wcyxcbiAgICByZW5kZXIsXG4gICAgc3R5bGVcbiAgfSA9IGRlZmluaXRpb247XG4gIGNvbnN0IGluaXRpYWxpemVkID0gbmV3IFdlYWtNYXA7XG4gIGNvbnN0IHN0YXRpY3MgPSB7fTtcbiAgY29uc3QgcHJvdG8gPSB7fTtcbiAgY29uc3QgbGlzdGVuZXJzID0gW107XG4gIGNvbnN0IHJldHlwZSA9IGNyZWF0ZShudWxsKTtcbiAgY29uc3QgYm9vdHN0cmFwID0gKGVsZW1lbnQsIGtleSwgdmFsdWUpID0+IHtcbiAgICBpZiAoIWluaXRpYWxpemVkLmhhcyhlbGVtZW50KSkge1xuICAgICAgaW5pdGlhbGl6ZWQuc2V0KGVsZW1lbnQsIDApO1xuICAgICAgZGVmaW5lUHJvcGVydGllcyhlbGVtZW50LCB7XG4gICAgICAgIGh0bWw6IHtcbiAgICAgICAgICB2YWx1ZTogY29udGVudC5iaW5kKFxuICAgICAgICAgICAgYXR0YWNoU2hhZG93ID8gZWxlbWVudC5hdHRhY2hTaGFkb3coYXR0YWNoU2hhZG93KSA6IGVsZW1lbnRcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB7dHlwZSwgb3B0aW9uc30gPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGlmIChib3VuZClcbiAgICAgICAgYm91bmQuZm9yRWFjaChiaW5kLCBlbGVtZW50KTtcbiAgICAgIGlmIChwcm9wcylcbiAgICAgICAgcmVhY3RpdmUoZWxlbWVudCwgcHJvcHMsIHJlbmRlcik7XG4gICAgICBpZiAoaW5pdCB8fCByZW5kZXIpXG4gICAgICAgIChpbml0IHx8IHJlbmRlcikuY2FsbChlbGVtZW50KTtcbiAgICAgIGlmIChrZXkpXG4gICAgICAgIGVsZW1lbnRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfTtcbiAgZm9yIChsZXQgayA9IGtleXMoZGVmaW5pdGlvbiksIGkgPSAwLCB7bGVuZ3RofSA9IGs7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGtbaV07XG4gICAgaWYgKC9eb24uLy50ZXN0KGtleSkgJiYgIS9PcHRpb25zJC8udGVzdChrZXkpKSB7XG4gICAgICBjb25zdCBvcHRpb25zID0gZGVmaW5pdGlvbltrZXkgKyAnT3B0aW9ucyddIHx8IGZhbHNlO1xuICAgICAgY29uc3QgbG93ZXIgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGxldCB0eXBlID0gbG93ZXIuc2xpY2UoMik7XG4gICAgICBsaXN0ZW5lcnMucHVzaCh7dHlwZSwgb3B0aW9uc30pO1xuICAgICAgcmV0eXBlW3R5cGVdID0ga2V5O1xuICAgICAgaWYgKGxvd2VyICE9PSBrZXkpIHtcbiAgICAgICAgdHlwZSA9IGxvd2VyLnNsaWNlKDIsIDMpICsga2V5LnNsaWNlKDMpO1xuICAgICAgICByZXR5cGVbdHlwZV0gPSBrZXk7XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKHt0eXBlLCBvcHRpb25zfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICBjYXNlICdhdHRhY2hTaGFkb3cnOlxuICAgICAgY2FzZSAnb2JzZXJ2ZWRBdHRyaWJ1dGVzJzpcbiAgICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwcm90b1trZXldID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRlZmluaXRpb24sIGtleSk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHtsZW5ndGh9ID0gbGlzdGVuZXJzO1xuICBpZiAobGVuZ3RoICYmICFoYW5kbGVFdmVudClcbiAgICBwcm90by5oYW5kbGVFdmVudCA9IHt2YWx1ZShldmVudCkge1xuICAgICAgdGhpc1tyZXR5cGVbZXZlbnQudHlwZV1dKGV2ZW50KTtcbiAgICB9fTtcblxuICAvLyBbcHJvcHNdXG4gIC8vIHRoaXMgaXMgdXNlbGVzcyBjb2RlIGluIHVjZS10ZW1wbGF0ZVxuICBpZiAocHJvcHMgIT09IG51bGwpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGZvciAobGV0IGsgPSBrZXlzKHByb3BzKSwgaSA9IDA7IGkgPCBrLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtbaV07XG4gICAgICAgIHByb3RvW2tleV0gPSB7XG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgYm9vdHN0cmFwKHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHByb3BzW2tleV07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgICAgICAgIGJvb3RzdHJhcCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcHJvdG8ucHJvcHMgPSB7Z2V0KCkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHt9O1xuICAgICAgICBmb3IgKGxldCB7YXR0cmlidXRlc30gPSB0aGlzLCB7bGVuZ3RofSA9IGF0dHJpYnV0ZXMsIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCB7bmFtZSwgdmFsdWV9ID0gYXR0cmlidXRlc1tpXTtcbiAgICAgICAgICBwcm9wc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wcztcbiAgICAgIH19O1xuICAgIH1cbiAgfVxuICAvLyBbL3Byb3BzXVxuXG4gIGlmIChvYnNlcnZlZEF0dHJpYnV0ZXMpXG4gICAgc3RhdGljcy5vYnNlcnZlZEF0dHJpYnV0ZXMgPSB7dmFsdWU6IG9ic2VydmVkQXR0cmlidXRlc307XG4gIHByb3RvLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9ICB7dmFsdWUoKSB7XG4gICAgYm9vdHN0cmFwKHRoaXMpO1xuICAgIGlmIChhdHRyaWJ1dGVDaGFuZ2VkKVxuICAgICAgYXR0cmlidXRlQ2hhbmdlZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9fTtcblxuICBwcm90by5jb25uZWN0ZWRDYWxsYmFjayA9IHt2YWx1ZSgpIHtcbiAgICBib290c3RyYXAodGhpcyk7XG4gICAgaWYgKGNvbm5lY3RlZClcbiAgICAgIGNvbm5lY3RlZC5jYWxsKHRoaXMpO1xuICB9fTtcblxuICBpZiAoZGlzY29ubmVjdGVkKVxuICAgIHByb3RvLmRpc2Nvbm5lY3RlZENhbGxiYWNrID0ge3ZhbHVlOiBkaXNjb25uZWN0ZWR9O1xuXG4gIGNvbnN0IHtjLCBlfSA9IGluZm8oZGVmaW5pdGlvbi5leHRlbmRzIHx8IGVsZW1lbnQpO1xuICBjbGFzcyBNaWNyb0VsZW1lbnQgZXh0ZW5kcyBjIHt9O1xuICBkZWZpbmVQcm9wZXJ0aWVzKE1pY3JvRWxlbWVudCwgc3RhdGljcyk7XG4gIGRlZmluZVByb3BlcnRpZXMoTWljcm9FbGVtZW50LnByb3RvdHlwZSwgcHJvdG8pO1xuICBjb25zdCBhcmdzID0gW3RhZ05hbWUsIE1pY3JvRWxlbWVudF07XG4gIGlmIChlICE9PSBlbGVtZW50KVxuICAgIGFyZ3MucHVzaCh7ZXh0ZW5kczogZX0pO1xuICBkZWZpbmVDdXN0b21FbGVtZW50LmFwcGx5KENFLCBhcmdzKTtcbiAgY29uc3RydWN0b3JzLnNldCh0YWdOYW1lLCB7YzogTWljcm9FbGVtZW50LCBlfSk7XG4gIGlmIChzdHlsZSlcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsKCdzdHlsZScpKS50ZXh0Q29udGVudCA9IHN0eWxlKFxuICAgICAgZSA9PT0gZWxlbWVudCA/IHRhZ05hbWUgOiAoZSArICdbaXM9XCInICsgdGFnTmFtZSArICdcIl0nKVxuICAgICk7XG4gIHJldHVybiBNaWNyb0VsZW1lbnQ7XG59O1xuXG5leHBvcnQge2RlZmluZSwgcmVuZGVyLCBodG1sLCBzdmcsIGNzc307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG5pZiAoIUNFLmdldCgndWNlLWxpYicpKVxuICAvLyB0aGVvcmV0aWNhbGx5IHRoaXMgY291bGQgYmUganVzdCBjbGFzcyB7IC4uLiB9XG4gIC8vIGhvd2V2ZXIsIGlmIHRoZXJlIGlzIGZvciB3aGF0ZXZlciByZWFzb24gYSA8dWNlLWxpYj5cbiAgLy8gZWxlbWVudCBvbiB0aGUgcGFnZSwgaXQgd2lsbCBicmVhayBvbmNlIHRoZSByZWdpc3RyeVxuICAvLyB3aWxsIHRyeSB0byB1cGdyYWRlIHN1Y2ggZWxlbWVudCBzbyAuLi4gSFRNTEVsZW1lbnQgaXQgaXMuXG4gIENFLmRlZmluZSgndWNlLWxpYicsIGNsYXNzIGV4dGVuZHMgaW5mbyhlbGVtZW50KS5jIHtcbiAgICBzdGF0aWMgZ2V0IGRlZmluZSgpIHsgcmV0dXJuIGRlZmluZTsgfVxuICAgIHN0YXRpYyBnZXQgcmVuZGVyKCkgeyByZXR1cm4gcmVuZGVyOyB9XG4gICAgc3RhdGljIGdldCBodG1sKCkgeyByZXR1cm4gaHRtbDsgfVxuICAgIHN0YXRpYyBnZXQgc3ZnKCkgeyByZXR1cm4gc3ZnOyB9XG4gICAgc3RhdGljIGdldCBjc3MoKSB7IHJldHVybiBjc3M7IH1cbiAgfSk7XG5cbmZ1bmN0aW9uIGJpbmQobWV0aG9kKSB7XG4gIHRoaXNbbWV0aG9kXSA9IHRoaXNbbWV0aG9kXS5iaW5kKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBjb250ZW50KCkge1xuICByZXR1cm4gcmVuZGVyKHRoaXMsIGh0bWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKSk7XG59XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jcmVhdGVCaW5kaW5nKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iXSwibmFtZXMiOlsiXyIsImdldCIsImtleSIsInNldCIsInZhbHVlIiwiYXR0ciIsImVtcHR5Iiwibm9kZSIsIm5vdE5vZGUiLCJzZWxmQ2xvc2luZyIsInRyaW1FbmQiLCJpc05vZGUiLCJ0ZW1wbGF0ZSIsImkiLCJ0ZXN0IiwicmVndWxhciIsIm9yaWdpbmFsIiwibmFtZSIsImV4dHJhIiwicmVwbGFjZSIsInByZWZpeCIsInN2ZyIsInRleHQiLCJsZW5ndGgiLCJjaHVuayIsInB1c2giLCIkMSIsIiQyIiwib3V0cHV0Iiwiam9pbiIsInRyaW0iLCJpc0FycmF5IiwiQXJyYXkiLCJpbmRleE9mIiwic2xpY2UiLCJFTEVNRU5UX05PREUiLCJub2RlVHlwZSIsInJlbW92ZSIsImZpcnN0Q2hpbGQiLCJsYXN0Q2hpbGQiLCJyYW5nZSIsImRvY3VtZW50IiwiY3JlYXRlUmFuZ2UiLCJzZXRTdGFydEFmdGVyIiwic2V0RW5kQWZ0ZXIiLCJkZWxldGVDb250ZW50cyIsImRpZmZhYmxlIiwib3BlcmF0aW9uIiwidmFsdWVPZiIsInBlcnNpc3RlbnQiLCJmcmFnbWVudCIsImNoaWxkTm9kZXMiLCJub2RlcyIsImNhbGwiLCJhcHBlbmRDaGlsZCIsInBhcmVudE5vZGUiLCJhIiwiYiIsImJlZm9yZSIsImJMZW5ndGgiLCJhRW5kIiwiYkVuZCIsImFTdGFydCIsImJTdGFydCIsIm1hcCIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwiaGFzIiwicmVtb3ZlQ2hpbGQiLCJNYXAiLCJpbmRleCIsInNlcXVlbmNlIiwicmVwbGFjZUNoaWxkIiwiYXJpYSIsInZhbHVlcyIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImF0dHJpYnV0ZSIsIm9sZFZhbHVlIiwib3JwaGFuIiwiYXR0cmlidXRlTm9kZSIsImNyZWF0ZUF0dHJpYnV0ZU5TIiwibmV3VmFsdWUiLCJyZW1vdmVBdHRyaWJ1dGVOb2RlIiwic2V0QXR0cmlidXRlTm9kZU5TIiwiZGF0YSIsImRhdGFzZXQiLCJldmVudCIsInR5cGUiLCJ0b0xvd2VyQ2FzZSIsImluZm8iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlZiIsImN1cnJlbnQiLCJzZXR0ZXIiLCJ0ZXh0Q29udGVudCIsImNyZWF0ZUNvbnRlbnQiLCJGUkFHTUVOVCIsIlRFTVBMQVRFIiwiSEFTX0NPTlRFTlQiLCJjcmVhdGUiLCJjcmVhdGVIVE1MIiwiaHRtbCIsImlubmVySFRNTCIsImNvbnRlbnQiLCJzZWxlY3RvciIsIlJlZ0V4cCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcHBlbmQiLCJtYXJrdXAiLCJjcmVhdGVTVkciLCJyb290IiwiZWxlbWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJyZWR1Y2VQYXRoIiwiY3JlYXRlUGF0aCIsInBhdGgiLCJjcmVhdGVUcmVlV2Fsa2VyIiwiaW1wb3J0Tm9kZSIsIklFIiwiY3JlYXRlRnJhZ21lbnQiLCJjcmVhdGVXYWxrZXIiLCJkaWZmIiwiY29tbWVudCIsIm9sZE5vZGVzIiwibmV3Tm9kZXMiLCJ1ZG9tZGlmZiIsImhhbmRsZUFueXRoaW5nIiwiYW55Q29udGVudCIsImNyZWF0ZVRleHROb2RlIiwiU3RyaW5nIiwiaGFuZGxlQXR0cmlidXRlIiwiaGFuZGxlcnMiLCJvcHRpb25zIiwicmVkdWNlUmlnaHQiLCJjYWNoZSIsInVtYXAiLCJXZWFrTWFwIiwiY3JlYXRlQ2FjaGUiLCJzdGFjayIsImVudHJ5Iiwid2lyZSIsImNyZWF0ZUVudHJ5IiwibWFwVXBkYXRlcyIsInVwZGF0ZXMiLCJtYXBUZW1wbGF0ZSIsImluc3RydW1lbnQiLCJ0dyIsInNlYXJjaCIsIm5leHROb2RlIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwidGFnTmFtZSIsInVucm9sbCIsInVucm9sbFZhbHVlcyIsImhvbGUiLCJIb2xlIiwic3BsaWNlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsInRhZyIsImtleWVkIiwiZml4ZWQiLCJmb3IiLCJpZCIsIm1lbW8iLCJyZW5kZXIiLCJ3aGVyZSIsIndoYXQiLCJ0IiwicyIsImwiLCJhcmd1bWVudHMiLCJrZXlzIiwiYWNjZXNzb3IiLCJhbGwiLCJzaGFsbG93IiwiaG9vayIsInVwZGF0ZSIsImNvbmZpZ3VyYWJsZSIsImxvb3AiLCJwcm9wcyIsInVzZVN0YXRlIiwiZGVzYyIsIm5vb3AiLCJhcmdzIiwia2UiLCJ5IiwiZXh0cmFzIiwiYXBwbHkiLCJjb25jYXQiLCJyZXN1bHQiLCJoYXNPd25Qcm9wZXJ0eSIsInJlYWN0aXZlIiwiZG9tSGFuZGxlciIsImRvbSIsIkNFIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmVDdXN0b21FbGVtZW50IiwiZGVmaW5lIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiY29uc3RydWN0b3JzIiwiYyIsIkhUTUxFbGVtZW50IiwiZSIsImVsIiwiY3JlYXRlRWxlbWVudCIsImNvbnN0cnVjdG9yIiwiZGVmaW5pdGlvbiIsImF0dGFjaFNoYWRvdyIsImF0dHJpYnV0ZUNoYW5nZWQiLCJib3VuZCIsImNvbm5lY3RlZCIsImRpc2Nvbm5lY3RlZCIsImhhbmRsZUV2ZW50IiwiaW5pdCIsIm9ic2VydmVkQXR0cmlidXRlcyIsInN0eWxlIiwiaW5pdGlhbGl6ZWQiLCJzdGF0aWNzIiwicHJvdG8iLCJsaXN0ZW5lcnMiLCJyZXR5cGUiLCJib290c3RyYXAiLCJiaW5kIiwiZm9yRWFjaCIsImsiLCJsb3dlciIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2siLCJjb25uZWN0ZWRDYWxsYmFjayIsImRpc2Nvbm5lY3RlZENhbGxiYWNrIiwiZXh0ZW5kcyIsIk1pY3JvRWxlbWVudCIsInByb3RvdHlwZSIsImhlYWQiLCJjc3MiLCJtZXRob2QiLCJfX21ha2VUZW1wbGF0ZU9iamVjdCIsImNvb2tlZCIsInJhdyIsImRlZmluZVByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsY0FBZSxVQUFBQSxDQUFDO0VBQUEsU0FBSztFQUNuQjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0FDLElBQUFBLEdBQUcs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
