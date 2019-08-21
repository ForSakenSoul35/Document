# 函数与对象

<a name="pJPrq"></a>
### 构造函数
<a name="dD2uC"></a>
#### 本质
构造函数上，本质上也是常规函数，只不过有两个规定。

1. 函数首字母大写
1. 只能使用 new 操作符来执行

```javascript
function User(name) {
	this.name = name
  this.isAdmin = false
}
let user = new User("Jack")
alert(user.name) // Jack
```

<a name="XoHg2"></a>
#### 执行步骤
当一个函数以 new User（）的形式  执行时，执行了以下步骤：

1. 一个新的空的对象 被创建，并且分配给this
1. 函数体执行，通常它会修改this，为其添加新的属性
1. 返回this的值

<a name="OZBlk"></a>
#### 主要目的
实现可重用的对象创建代码

<a name="t72Ax"></a>
### 实现一个new操作符

```javascript
// 定义一个构造函数
// 和普通函数其实是一样的 但是 首字母规定大写 并且只能用new操作符运行
let Person = function (name,age) {
	this.name = name
  this.age = age
  this.getName = function(){
  	return this.name
  }
}
// 现在自己来实现 new操作符
 
/*
	new 操作符 做的事情 
  1. 接受一个构造函数 fun 作为参数 返回一个对象
  2. 声明一个中间对象，并且最终返回这个对象
 	3. 将实例对象的原型属性指向构造函数的原型对象
*/
function New(fun) {
	let res = {}
  if( fun.prototype !== null ) {
  	res.__proto__ = fun.prototype
  }
  // ret 为构造函数执行的结果，这里通过apply，将构造函数内部的this 
  // 指向修改为指向res，即实例对象
  let ret = func.apply(res,Array.prototype.slice.call(arguments,1))
	// 如果在构造函数中明确指定了返回对象时，那么new的执行结果就是该返回对象
  if( typeof ret === "object" || typeof ret === "function" && ret !== null) {
  	return ret
  } 
  // 如果明确指定返回对象，则默认返回res 
  // res 就是实例对象
  return res
}
let p1 = New(Person,'tom',20) 
// js内部再通过其他的处理 
// 将 let p1 = New(Person,'tom',20)  等效于 let p1 = new Person('tom', 20);
```

1. 构造函数 不需要显示的返回值
1. 使用new操作符创建对象 如果return的是非对象（数字，字符串，布尔类型）就会忽略返回值 如果return的是对象，则返回该对象
```javascript
  let ret = func.apply(res,Array.prototype.slice.call(arguments,1))
  // 注意这个写法 Array.prototype.slice.call(arguments,1)
  // 由于arguments不是数组，故不能直接调用slice方法
  // arguments对象 是类数组对象 
  // 其实可以通过 Array.from() 将其转化为真正的数组
  // 这里直接使用call方法，让arguments对象能直接调用slice方法
```

__proto__<br />每个对象都会在其内部初始化一个属性，就是_ _proto__ ,当我们访问一个对象的属性时，如果对象内部不存在这个属性，那么就会去对象的__proto__里面去找这个属性，这个__proto__指的是构造函数的原型对象，既然是个对象就会有它自己的__proto__属性，于是就会一直找下去，直到__proto__== null的时候。


<a name="E7e3G"></a>
### 构造函数，原型对象与实例对象的关系

```javascript
//声明一个构造函数
let Person = function (name,age) {
	this.name = name
  this.age = age
}

// 利用prototype属性，将方法挂载到构造函数的原型对象上
Person.prototype.getName = functin(){
	return this.name
}
// 利用构造函数创建一个实例对象
let p1 = new Person("Tom",20)
let p2 = new Person("Tom",20)
p1.getName === p2.getName // true

```

构造函数的prototype属性和实例对象的__proto__属性都指向原型对象。<br />而原型对象 的constructor属性 指向构造函数<br />通过this声明的属性和方法称为私有属性和方法<br />被当前实例对象所独有，而通过原型对象声明的属性和方法，称为共有属性与方法。

当我们访问实例对象中的属性和方法，会优先访问实例对象自身的属性和方法。<br />可以通过in操作符 判断一个对象是否有某个属性或者方法，无论是在实例对象还是原型对象

```javascript
function Person() {}

Person.prototype = {
    constructor: Person,
    getName: function() {},
    getAge: function() {},
    sayHello: function() {}
}
```


这种字面量的写法看上去简单很多，但是 有一个特别需要注意的地方，Person.prototype ={} 实际上是创建了一个对象并赋值给Person.prototype,这里的对象并不是最初创建的那个原型对象，为了保证正确性，必须在新创建的对象中显式的设置construvtor的指向。


<a name="wqKJI"></a>
### 创建对象之优化
创建对象有好几种方式。各有优缺点。
<a name="jd2WQ"></a>
#### 对象字面量的方式
<a name="1A4gY"></a>
#### 工厂模式创建对象
<a name="XlzvU"></a>
#### 构造函数创建对象
<a name="0QFV0"></a>
#### 使用原型改造构造函数创建对象

<a name="qBuhO"></a>
### Object.prototype.constructor
返回创建实例对象的Object构造函数的引用。注意，此属性的值对于函数本身的引用，而不是一个包含函数名称跟的字符串。<br />所有对象都会从它的原型上继承一个constructor属性。 属性值是，对应构造函数 的引用。

```javascript
var o = {};
o.constructor === Object; // true
var a = [];
a.constructor === Array; // true
var a = new Array;
a.constructor === Array // true
var n = new Number(3);
n.constructor === Number; // true
```

<a name="ZoJwT"></a>
#### 改变函数的constructor
大多数情况下，此属性用于定义一个构造函数，并使用new和继承原型链进一步调用它。

```javascript
function Parent() {}
// 在父类的原型对象上挂载方法
Parent.prototype.parentMethod = function parentMethod(){}
function Child() {}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child


```

