## JS重要概念
1. 基础数据类型和引用数据类型
2. 内存空间
3. 垃圾回收机制
4. 执行上下文
5. 变量对象和活动对象
## 执行上下文
### 执行上下文的生命周期
一个执行上下文的生命周期可以分为两个阶段
- 创建阶段
在这个阶段，执行上下文会做 创建对象，建立作用域链，以及确定this的指向
- 代码执行阶段
在这个阶段 就会开始执行代码 包括 变量赋值，函数引用以及执行其他代码

## 变量对象
### 变量对象创建步骤
变量对象的创建步骤如下：
1. 建立arguments对象。检查当前上下文中的参数，建立该对象下的属性和属性值。
2. 检查当前上下文的函数声明，也就是使用function关键字声明的函数。在变量对象中，以函数名建立一个属性，属性值指向该函数所在内存地址的引用。如果函数名的属性名已经存在，那么该属性会被新的引用所覆盖。
3. 检查当前上下文中的变量声明。每找到一个变量声明，就在变量对象中以变量名创建一个属性，属性值为undefined。如果该变量名的属性已经存在，为了防止同名的函数被修改为undefined，则会直接跳过，原属性值不会被改变。
未进入执行阶段之前，变量对象中的属性都不能访问。但是进入执行阶段之后，变量对象转变为了活动对象，然后开始进行执行阶段的操作。
### 全局上下文的变量对象
以浏览器为例，全局对象为window
全局上下文有一个特殊的地方，它的变量对象，就是window对象。

**变量对象/活动对象的区别**：都是同一个对象，只不过处于执行上下文的不同生命周期。不过只有处于函数调用栈栈顶的执行上下文中的变量对象才会变成活动对象。
**变量提升**：
## 作用域
- 概念：可以将作用域定义为一套规则，这套规则用来管理引擎如何在当前作用域以及嵌套的子作用域中根据标识符名称进行变量查找。
- 分类：js中只有全局作用域以及函数作用域。
- 作用域与执行上下文是完全不同的两个概念。
> JS代码的整个执行过程中，分为两个阶段。代码编译阶段与代码执行阶段。编译阶段由编译器完成，将代码翻译成可执行代码。这个阶段作用域规则会确定。执行阶段由引擎完成，主要任务是执行可执行代码，执行上下文会在这个阶段创建。


## 作用域链
- 概念：作用域链是由当前环境与上层环境的一系列变量组成，保证了当前执行环境对符合访问权限的变量和函数的有效访问。
- 可以用一个数组来保存来表示作用域链。数组的第一项为作用域链的最前端，而数组的最后一项，为作用域链的最末端，所有的最末端都是全局变量对象。
- 作用域链 以最前端为起点 最末端为终点的单方向通道。可以在这个单方向通道中，查询变量对象的标识符，这样就可以访问到上一层作用域链中的变量了。
**如何访问函数外部变量**：
可以在作用域链这个单方向通道中，查询变量对象的标识符，这样就可以访问到上一层作用域链中的变量了。
```
var a = 20;

function test() {
    var b = a + 10;

    function innerTest() {
        var c = 10;
        return b + c;
    }

    return innerTest();
}

test();
```
在上面的例子中,全局,函数test,函数innerTest的执行上下文先后被创建.设定他们的变量对象分别为VO(global),VO(test),VO(innerTest) 而innerTest的作用域链分别为[VO(innerTest),VO(test),VO(global)]



## 闭包
### 概念
**闭包是一种特殊的对象**
**它由两部分组成.执行上下文A,以及在该执行上下文中创建的函数B**
**当B执行时,访问了A中变量对象中的值,那么闭包就会产生**
在Chrome中,**以执行上下文中的函数名来代指闭包**
一个闭包对象中,由A,B共同组成
```
function foo() {
    var a = 20;
    var b = 30;

    function bar() {
        return a + b;
    }

    return bar;
}

var bar = foo();
bar();
// bar为闭包
```
```
var fn = null;
function foo() {
    var a = 2;
    function innnerFoo() {
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar() {
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar(); // 2
// 函数foo为闭包
```
### 应用
通过闭包可以在其他的执行上下文中,访问到函数的内部变量.
应用场景:
- 函数柯里化
- 模块
## 参考链接
[前端基础进阶系列 - 简书](https://www.jianshu.com/p/cd3fee40ef59)









