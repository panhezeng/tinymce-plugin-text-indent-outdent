!function(t){var n={};function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)e.d(r,o,function(n){return t[n]}.bind(null,o));return r},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=3)}([function(t,n){t.exports=tinymce},function(t,n){t.exports=React},function(t,n){t.exports=ReactDOM},function(t,n,e){"use strict";e.r(n);var r=e(1),o=e.n(r),u=e(2),i=e.n(u),c=e(0),a=e.n(c);function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,n){return!n||"object"!==l(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,n){return(m=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}a.a.PluginManager.add("text-indent-outdent",(function(t,n){var e,r,o,u,i,c=function(){},a=function(t){return function(){return t}},l=a(!1),d=a(!0),s=function(){return p},p=(e=function(t){return t.isNone()},u={fold:function(t,n){return t()},is:l,isSome:l,isNone:d,getOr:o=function(t){return t},getOrThunk:r=function(t){return t()},getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:a(null),getOrUndefined:a(void 0),or:o,orThunk:r,map:s,each:c,bind:s,exists:l,forall:d,filter:s,equals:e,equals_:e,toArray:function(){return[]},toString:a("none()")},Object.freeze&&Object.freeze(u),u),m=function t(n){var e=a(n),r=function(){return u},o=function(t){return t(n)},u={fold:function(t,e){return e(n)},is:function(t){return n===t},isSome:d,isNone:l,getOr:e,getOrThunk:e,getOrDie:e,getOrNull:e,getOrUndefined:e,or:r,orThunk:r,map:function(e){return t(e(n))},each:function(t){t(n)},bind:o,exists:o,forall:o,filter:function(t){return t(n)?u:p},toArray:function(){return[n]},toString:function(){return"some("+n+")"},equals:function(t){return t.is(n)},equals_:function(t,e){return t.fold(l,(function(t){return e(n,t)}))}};return u},y={some:m,none:s,from:function(t){return null==t?p:m(t)}},v=(i="function",function(t){return function(t){if(null===t)return"null";var n=f(t);return"object"===n&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"===n&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":n}(t)===i}),g=function(t,n){for(var e=0,r=t.length;e<r;e++){n(t[e],e)}},b=function(t){return function(n){return!!n&&n.nodeType===t}}(1),h=function(t){return function(n){if(b(n)){if(n.contentEditable===t)return!0;if(n.getAttribute("data-mce-contenteditable")===t)return!0}return!1}},x={isContentEditableTrue:h("true"),isContentEditableFalse:h("false")},O=function(t){if(null==t)throw new Error("Node cannot be null or undefined");return{dom:a(t)}},S=function(t){var n;return function(e){return(n=n||function(t,n){for(var e={},r=0,o=t.length;r<o;r++){var u=t[r];e[String(u)]=n(u,r)}return e}(t,a(!0))).hasOwnProperty(e.dom().nodeName.toLowerCase())}},w=S(["ul","ol","dl"]),_=S(["li","dd","dt"]);var P=function(t,n,e){for(var r=t.dom(),o=v(e)?e:a(!1);r.parentNode;){r=r.parentNode;var u=O(r);if(n(u))return y.some(u);if(o(u))break}return y.none()},j=function(t,n,e){return function(t,n,e,r,o){return t(e,r)?y.some(e):v(o)&&o(e)?y.none():n(e,r,o)}((function(t,n){return n(t)}),P,t,n,e)},z=function(t){if(t.getParam("force_p_newlines",!1))return"p";var n=t.getParam("forced_root_block","p");return!1===n?"":!0===n?"p":n},N=function(t){return w(t)||_(t)},E=function(t){return(n=t,y.from(n.dom().parentNode).map(O)).map(N).getOr(!1);var n},T=function(t){return function(t,n){for(var e=[],r=0,o=t.length;r<o;r++){var u=t[r];n(u,r)&&e.push(u)}return e}(function(t,n){for(var e=t.length,r=new Array(e),o=0;o<e;o++){var u=t[o];r[o]=n(u,o)}return r}(t.selection.getSelectedBlocks(),O),(function(t){return!N(t)&&!E(t)&&j(t,(function(t){return x.isContentEditableTrue(t.dom())||x.isContentEditableFalse(t.dom())})).exists((function(t){return x.isContentEditableTrue(t.dom())}))}))},k=function(t){var n=parseInt(t,10);return isNaN(n)?0:n},M=function(t,n,e,r,o){if("outdent"===n){var u=Math.max(0,k(o.style["text-indent"])-e);t.setStyle(o,"text-indent",u?u+r:"")}else{var i=k(o.style["text-indent"])+e+r;t.setStyle(o,"text-indent",i)}},C=2,H="px",I=t.getParam("pluginTextIndentOutdent");return I&&(H=/[a-z%]+$/i.exec(I)[0],C=parseInt(I,10)),t.ui.registry.addIcon("text-indent",'<svg t="1575356818205" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4743" width="24" height="24"><path d="M253.41656 255.809641H0v-85.351983h253.41656V0.176293l301.385713 191.8341-301.385713 191.8341V255.809641z m429.415564 85.358235h768.189108V170.457658H682.832124v170.710218zM426.768671 511.873094h1024.252561v-85.351984H426.768671v85.351984z m0 170.710219h1024.252561v-85.356985H426.768671v85.356985z m0 170.706468h1024.252561V767.936547H426.768671v85.353234z m0 170.710219h768.189108v-85.353234H426.768671v85.353234z" fill="#000000" p-id="4744"></path></svg>'),t.ui.registry.addButton("text-indent",{tooltip:"text indent",icon:"text-indent",onAction:function(){t.hasFocus()||t.focus();var n=t.dom,e=t.selection,r=t.formatter,o=z(t);t.queryCommandState("InsertUnorderedList")||t.queryCommandState("InsertOrderedList")||""!==o||n.getParent(e.getNode(),n.isBlock)||r.apply("div"),g(T(t),(function(t){M(n,"indent",C,H,t.dom())}))}}),t.ui.registry.addIcon("text-outdent",'<svg t="1575356896146" class="icon" viewBox="0 0 1451 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4967" width="24" height="24"><path d="M301.385713 255.809641h253.41656v-85.351983H301.385713V0.176293L0 192.010393l301.385713 191.8341V255.809641z m381.446411 85.358235h768.189108V170.457658H682.832124v170.710218zM426.768671 511.873094h1024.252561v-85.351984H426.768671v85.351984z m0 170.710219h1024.252561v-85.356985H426.768671v85.356985z m0 170.706468h1024.252561V767.936547H426.768671v85.353234z m0 170.710219h768.189108v-85.353234H426.768671v85.353234z" fill="#000000" p-id="4968"></path></svg>'),t.ui.registry.addButton("text-outdent",{tooltip:"text outdent",icon:"text-outdent",onAction:function(){t.hasFocus()||t.focus();var n=t.dom,e=t.selection,r=t.formatter,o=z(t);t.queryCommandState("InsertUnorderedList")||t.queryCommandState("InsertOrderedList")||""!==o||n.getParent(e.getNode(),n.isBlock)||r.apply("div"),g(T(t),(function(t){M(n,"outdent",C,H,t.dom())}))}}),{getMetadata:function(){return{name:"text-indent-outdent",url:"https://github.com/panhezeng/tinymce-plugin-text-indent-outdent#readme"}}}}));var y=function(t){function n(t){return function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),s(this,p(n).call(this,t))}var e,r,u;return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&m(t,n)}(n,t),e=n,(r=[{key:"componentDidMount",value:function(){a.a.init({selector:"textarea.tinymce",plugins:"code text-indent-outdent",toolbar:"text-indent | text-outdent | indent | outdent | code",pluginTextIndentOutdent:"30px"})}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){return o.a.createElement("textarea",{className:"tinymce",defaultValue:"<p>test1</p><p>test2</p>"})}}])&&d(e.prototype,r),u&&d(e,u),n}(o.a.Component);i.a.render(o.a.createElement(y,null),document.getElementById("app"))}]);