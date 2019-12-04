declare const tinymce: any;

const setup = (editor, url) => {
  // tslint:disable-next-line:no-empty
  const noop = function () {};
  const constant = function (value) {
    return function () {
      return value;
    };
  };
  const never = constant(false);
  const always = constant(true);
  const none = function () {
    return NONE;
  };
  const NONE = (function () {
    const eq = function (o) {
      return o.isNone();
    };
    const call = function (thunk) {
      return thunk();
    };
    const id = function (n) {
      return n;
    };
    const me = {
      fold(n, s) {
        return n();
      },
      is: never,
      isSome: never,
      isNone: always,
      getOr: id,
      getOrThunk: call,
      getOrDie(msg) {
        throw new Error(msg || 'error: getOrDie called on none.');
      },
      getOrNull: constant(null),
      getOrUndefined: constant(undefined),
      or: id,
      orThunk: call,
      map: none,
      each: noop,
      bind: none,
      exists: never,
      forall: always,
      filter: none,
      equals: eq,
      equals_: eq,
      toArray() {
        return [];
      },
      toString: constant('none()')
    };
    if (Object.freeze) {
      Object.freeze(me);
    }
    return me;
  })();
  const some = function (a) {
    // tslint:disable-next-line:variable-name
    const constant_a = constant(a);
    const self = function () {
      return me;
    };
    const bind = function (f) {
      return f(a);
    };
    const me = {
      fold(n, s) {
        return s(a);
      },
      is(v) {
        return a === v;
      },
      isSome: always,
      isNone: never,
      getOr: constant_a,
      getOrThunk: constant_a,
      getOrDie: constant_a,
      getOrNull: constant_a,
      getOrUndefined: constant_a,
      or: self,
      orThunk: self,
      map(f) {
        return some(f(a));
      },
      each(f) {
        f(a);
      },
      bind,
      exists: bind,
      forall: bind,
      filter(f) {
        return f(a) ? me : NONE;
      },
      toArray() {
        return [a];
      },
      toString() {
        return 'some(' + a + ')';
      },
      equals(o) {
        return o.is(a);
      },
      equals_(o, elementEq) {
        return o.fold(never, function (b) {
          return elementEq(a, b);
        });
      }
    };
    return me;
  };
  const from = function (value) {
    return value === null || value === undefined ? NONE : some(value);
  };
  // tslint:disable-next-line:variable-name
  const Option = {
    some,
    none,
    from
  };
  const typeOf = function (x) {
    if (x === null) {
      return 'null';
    }
    const t = typeof x;
    if (
      t === 'object' &&
      (Array.prototype.isPrototypeOf(x) ||
        (x.constructor && x.constructor.name === 'Array'))
    ) {
      return 'array';
    }
    if (
      t === 'object' &&
      (String.prototype.isPrototypeOf(x) ||
        (x.constructor && x.constructor.name === 'String'))
    ) {
      return 'string';
    }
    return t;
  };
  const isType = function (type) {
    return function (value) {
      return typeOf(value) === type;
    };
  };
  const isFunction = isType('function');
  const map = function (xs, f) {
    const len = xs.length;
    const r = new Array(len);
    for (let i = 0; i < len; i++) {
      const x = xs[i];
      r[i] = f(x, i);
    }
    return r;
  };
  const each = function (xs, f) {
    // tslint:disable-next-line:one-variable-per-declaration
    for (let i = 0, len = xs.length; i < len; i++) {
      const x = xs[i];
      f(x, i);
    }
  };
  const filter = function (xs, pred) {
    const r = [];
    // tslint:disable-next-line:one-variable-per-declaration
    for (let i = 0, len = xs.length; i < len; i++) {
      const x = xs[i];
      if (pred(x, i)) {
        r.push(x);
      }
    }
    return r;
  };
  const mapToObject = function (xs, f) {
    const r = {};
    // tslint:disable-next-line:one-variable-per-declaration
    for (let i = 0, len = xs.length; i < len; i++) {
      const x = xs[i];
      r[String(x)] = f(x, i);
    }
    return r;
  };
  const isNodeType = function (type) {
    return function (node) {
      return !!node && node.nodeType === type;
    };
  };
  const isElement = isNodeType(1);
  const hasContentEditableState = function (value) {
    return function (node) {
      if (isElement(node)) {
        if (node.contentEditable === value) {
          return true;
        }
        if (node.getAttribute('data-mce-contenteditable') === value) {
          return true;
        }
      }
      return false;
    };
  };
  const isContentEditableTrue = hasContentEditableState('true');
  const isContentEditableFalse = hasContentEditableState('false');
  // tslint:disable-next-line:variable-name
  const NodeType = {
    isContentEditableTrue,
    isContentEditableFalse
  };
  const fromDom = function (node) {
    if (node === null || node === undefined) {
      throw new Error('Node cannot be null or undefined');
    }
    return { dom: constant(node) };
  };
  // tslint:disable-next-line:variable-name
  const Element = {
    fromDom
  };
  const name = function (element) {
    const r = element.dom().nodeName;
    return r.toLowerCase();
  };
  const parent = function (element) {
    return Option.from(element.dom().parentNode).map(Element.fromDom);
  };
  const listItems = ['li', 'dd', 'dt'];
  const lists = ['ul', 'ol', 'dl'];
  const lazyLookup = function (items) {
    let lookup;
    return function (node) {
      lookup = lookup ? lookup : mapToObject(items, constant(true));
      return lookup.hasOwnProperty(name(node));
    };
  };
  const isList = lazyLookup(lists);
  const isListItem = lazyLookup(listItems);
  // tslint:disable-next-line:no-shadowed-variable
  function ClosestOrAncestor(is, ancestor, scope, a, isRoot) {
    return is(scope, a)
      ? Option.some(scope)
      : isFunction(isRoot) && isRoot(scope)
      ? Option.none()
      : ancestor(scope, a, isRoot);
  }
  const ancestor = function (scope, predicate, isRoot) {
    let element = scope.dom();
    const stop = isFunction(isRoot) ? isRoot : constant(false);
    while (element.parentNode) {
      element = element.parentNode;
      const el = Element.fromDom(element);
      if (predicate(el)) {
        return Option.some(el);
      } else if (stop(el)) {
        break;
      }
    }
    return Option.none();
  };
  const closest = function (scope, predicate, isRoot) {
    const is = function (s, test) {
      return test(s);
    };
    return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
  };

  // tslint:disable-next-line:no-shadowed-variable
  const getForcedRootBlock = function (editor) {
    if (editor.getParam('force_p_newlines', false)) {
      return 'p';
    }
    const block = editor.getParam('forced_root_block', 'p');
    if (block === false) {
      return '';
    } else if (block === true) {
      return 'p';
    } else {
      return block;
    }
  };

  // tslint:disable-next-line:variable-name
  const Settings = {
    getForcedRootBlock
  };

  const isEditable$1 = function (target) {
    // @ts-ignore
    return closest(target, function (elm) {
      return (
        NodeType.isContentEditableTrue(elm.dom()) ||
        NodeType.isContentEditableFalse(elm.dom())
      );
    }).exists(function (elm) {
      return NodeType.isContentEditableTrue(elm.dom());
    });
  };

  const isListComponent = function (el) {
    return isList(el) || isListItem(el);
  };
  const parentIsListComponent = function (el) {
    return parent(el)
      .map(isListComponent)
      .getOr(false);
  };
  // tslint:disable-next-line:no-shadowed-variable
  const getBlocksToIndent = function (editor) {
    return filter(
      map(editor.selection.getSelectedBlocks(), Element.fromDom),
      function (el) {
        return (
          !isListComponent(el) && !parentIsListComponent(el) && isEditable$1(el)
        );
      }
    );
  };

  const parseIndentValue = function (value) {
    const number = parseInt(value, 10);
    return isNaN(number) ? 0 : number;
  };
  // tslint:disable-next-line:no-shadowed-variable
  const indentElement = function (dom, command, value, unit, element) {
    const indentStyleName = 'text-indent';
    if (command === 'outdent') {
      const styleValue = Math.max(
        0,
        parseIndentValue(element.style[indentStyleName]) - value
      );
      dom.setStyle(
        element,
        indentStyleName,
        styleValue ? styleValue + unit : ''
      );
    } else {
      const styleValue =
        parseIndentValue(element.style[indentStyleName]) + value + unit;
      dom.setStyle(element, indentStyleName, styleValue);
    }
  };

  let indentValue = 2;
  let indentUnit = 'px';

  const pluginTextIndentOutdent = editor.getParam('pluginTextIndentOutdent');
  if (pluginTextIndentOutdent) {
    indentUnit = /[a-z%]+$/i.exec(pluginTextIndentOutdent)[0];
    indentValue = parseInt(pluginTextIndentOutdent, 10);
  }

  editor.ui.registry.addIcon(
    'text-indent',
    `<svg t="1575356818205" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4743" width="24" height="24"><path d="M253.41656 255.809641H0v-85.351983h253.41656V0.176293l301.385713 191.8341-301.385713 191.8341V255.809641z m429.415564 85.358235h768.189108V170.457658H682.832124v170.710218zM426.768671 511.873094h1024.252561v-85.351984H426.768671v85.351984z m0 170.710219h1024.252561v-85.356985H426.768671v85.356985z m0 170.706468h1024.252561V767.936547H426.768671v85.353234z m0 170.710219h768.189108v-85.353234H426.768671v85.353234z" fill="#000000" p-id="4744"></path></svg>`
  );
  editor.ui.registry.addButton('text-indent', {
    tooltip: 'text indent',
    icon: 'text-indent',
    onAction: () => {
      if (!editor.hasFocus()) {
        editor.focus();
      }

      const dom = editor.dom;
      const selection = editor.selection;
      const formatter = editor.formatter;
      const forcedRootBlock = Settings.getForcedRootBlock(editor);
      if (
        !editor.queryCommandState('InsertUnorderedList') &&
        !editor.queryCommandState('InsertOrderedList')
      ) {
        if (
          forcedRootBlock === '' &&
          !dom.getParent(selection.getNode(), dom.isBlock)
        ) {
          formatter.apply('div');
        }
      }
      // tslint:disable-next-line:no-console
      console.log(getBlocksToIndent(editor));
      each(getBlocksToIndent(editor), function (block) {
        indentElement(dom, 'indent', indentValue, indentUnit, block.dom());
      });
    }
  });

  editor.ui.registry.addIcon(
    'text-outdent',
    `<svg t="1575356896146" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4967" width="24" height="24"><path d="M301.385713 255.809641h253.41656v-85.351983H301.385713V0.176293L0 192.010393l301.385713 191.8341V255.809641z m381.446411 85.358235h768.189108V170.457658H682.832124v170.710218zM426.768671 511.873094h1024.252561v-85.351984H426.768671v85.351984z m0 170.710219h1024.252561v-85.356985H426.768671v85.356985z m0 170.706468h1024.252561V767.936547H426.768671v85.353234z m0 170.710219h768.189108v-85.353234H426.768671v85.353234z" fill="#000000" p-id="4968"></path></svg>`
  );
  editor.ui.registry.addButton('text-outdent', {
    tooltip: 'text outdent',
    icon: 'text-outdent',
    onAction: () => {
      if (!editor.hasFocus()) {
        editor.focus();
      }

      const dom = editor.dom;
      const selection = editor.selection;
      const formatter = editor.formatter;
      const forcedRootBlock = Settings.getForcedRootBlock(editor);
      if (
        !editor.queryCommandState('InsertUnorderedList') &&
        !editor.queryCommandState('InsertOrderedList')
      ) {
        if (
          forcedRootBlock === '' &&
          !dom.getParent(selection.getNode(), dom.isBlock)
        ) {
          formatter.apply('div');
        }
      }
      each(getBlocksToIndent(editor), function (block) {
        indentElement(dom, 'outdent', indentValue, indentUnit, block.dom());
      });
    }
  });
};

export default () => {
  tinymce.PluginManager.add('text-indent-outdent', setup);
};
