## JS零散知识(持续更新...)
### 顶层对象
顶层对象，在浏览器中指的是window对象，在Node指的是global对象。ES5之前，顶层对象的属性与全局变量是等价的。
```
window.a = 1;
a // 1

a= 2;
window.a //2
```
上面，顶层对象的属性赋值与全局变量的赋值是一致的。
ES6为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量仍然是顶层对象的属性；另一方面也规定，let，const，class声明的全局变量，不属于顶层对象的属性。

### globalThis对象
Javascript语言存在一个顶层对象，提供全局作用域，所有的代码都是在这个环境中运行的，但是顶层对象在各种实现里面是不统一的。
- 浏览器 顶层对象是window，Node和Web worker没有window
- 浏览器和web worker里面，self也指向顶层对象，但是Node没有self
- Node里面，顶层对象是global，但是其他环境中没有global

同一段代码为了能够在各种环境下，都能取到顶层对象，现在一般是使用this对象，但是有局限性。
- 全局环境下，this会返回顶层对象。但是Node和ES6模块中，返回的是当前模块。
- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向全局对象。但是严格模式下，会返回this会返回undefined。

**解决方案**

```
//保证this返回的都是顶层对象
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
```
this is a joke
bad day
嗯嗯

### 参考链接
[ECMAScript 6入门](https://es6.ruanyifeng.com/#docs/let)