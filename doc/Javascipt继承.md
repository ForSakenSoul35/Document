# 继承和原型链

当谈到继承的时候，Javascript只有一种结构：对象<br />每个实例对象都有一个私有属性，称之为__proto__，指向它的构造函数的原型对象。<br />该原型对象也有一个自己的原型对象，层层向上直到一个对象的原型对象等于null。根据定义，null没有原型，并作为这个原型链的最后一个环节。

几乎所有Javascript中的对象都是位于原型链顶端的Object对象的实例对象。

访问对象的属性时，不仅仅会在对象本身搜寻，还会搜寻该对象的原型，以及该对象的原型对象的原型。

_ _proto__ 不是js的标准，而是很多浏览器的实现。<br />从ES6开始，对象可以通过 Object.getPrototypeOf(obj) 来获取 对象的原型。







构造函数的原型对象 用处？ <br />在构造函数中 定义的属性和方法 可以理解为 私有属性和私有方法。每个实例对象 可能由于参数的不同，最后的值也一样<br />在构造函数的原型对象上定义的属性和方法，称为共有属性和共有方法。这样就能使每个实例对象拿到的属性和方法都是一致的。

<a name="wliuD"></a>
#### 继承方法
Javascript并没有其他基于类的语言所定义的方法，在js中，任何函数都可以添加到对象上，作为对象的属性。<br />函数的继承和其他的属性继承没有区别。<br />当继承的函数被调用时，this指向的是当前继承的对象，而不是继承的函数所在的原型对象。



<a name="hSVb6"></a>
### 六种继承方法
<a name="Dqj64"></a>
#### 原型链继承
方法 关键在于： 子类型的原型为夫类型的一个实例对象

```javascript
 function Person(name, age) {
           this.name = name,
           this.age = age
       }
       Person.prototype.setAge = function () {
           console.log("111")
       }
       function Student(price) {
           this.price = price
           this.setScore = function () { }
       }
       // Student.prototype.sayHello = function () { }//在这里写子类的原型方法和属性是无效的，
      //因为会改变原型的指向，所以应该放到重新指定之后
       Student.prototype = new Person()
       Student.prototype.sayHello = function () { }
       var s1 = new Student(15000)
       console.log(s1)
```

**特点**

- 父类新增原型方法 / 原型属性，子类都可以访问到
- 简单，易于实现

**缺点**

- 无法实现多继承
- 来自原型对象的所有属性都被所有实例共享（私有属性被共享）
- 创建子类实例时 无法向父类构造函数传参
- 要想为子类新增属性和方法，必须要在`Student.prototype = new Person()` 之后执行，不能放到构造器中

<a name="JUXDI"></a>
#### 构造函数继承
这种方法关键在于： 在子类构造函数中 将父类构造函数实现一遍，使用call

```javascript
function Person(name, age) {
    this.name = name,
    this.age = age,
    this.setName = function () {}
  }
  Person.prototype.setAge = function () {}
  function Student(name, age, price) {
    Person.call(this, name, age)  // 相当于: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    this.price = price
  }
  var s1 = new Student('Tom', 20, 15000)
```

这种方式只是实现部分的继承，如果父类的原型还有方法和属性，子类是拿不到这些方法和属性的。<br />**只能继承父类的属性和方法，不能继承父类的原型的属性和方法。**<br />**<br />**特点**

- 解决了原型链继承中子类实例共享父类引用属性的问题
- 创建子类实例时，可以向父类传递参数
- 可以i实现多继承（继承多个父类对象，多个父类对象调用call）

**缺点**

- 实例并不是父类的实例，只是子类的实例
- 只能继承父类的实例属性和方法，不能继承原型属性和方法
- 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能

<a name="LQChJ"></a>
#### 原型链+借用构造函数的组合继承
关键在于： 通过调用父类构造，继承父类的属性并保留传参的优点，然后通过父类实例作为子类原型，实现函数复用

```javascript
function Person(name, age) {
            this.name = name
            this.age = age
            
}
Person.prototype.setAge = function () {
    console.log("111")
}
function Student(name, age, price) {
    Person.call(this,name,age) // 调用父类构造函数，使子类构造函数能够获取到父类的属性和方法 
    this.price = price
    this.setScore = function () { }
}
// 将子类的原型对象 指定 为父类的一个实例对象
// 原型链 student -> Student -> person ->Person 
// 这样子类的实例对象 就能获取到 父类在原型上定义的方法和属性
Student.prototype = new Person() 
// 组合继承  需要修复构造函数指向


Student.prototype.constructor = Student

Student.prototype.sayHello = function (){}

```


**Student.prototype.constructor = Student**<br />这句话的意思，相当于完全删除了prototype对象原先的值，然后给他赋给了一个新的值

任何一个原型对象都有一个constructor属性，指向它的构造函数<br />构造函数  Student <br />构造函数的原型对象Student.prototype<br />Student.prototype有一个constructor属性，<br />即<br />Student.prototype.constructor == Student<br />每一个实例对象也都有一个constructor属性，默认调用它的原型的constructor属性的值<br />let student = new Student()<br />student 实例对象<br />student.constructor == Student

这次方式融合原型链继承和构造函数继承的优点，是js中最常用的继承模式。



做：

1. 修改子类的原型对象为父类对象的实例
1. 修正子类的constructor属性 为子类的构造函数

优点：

- 可以继承实例属性/方法 也可以继承原型属性和方法
- 不存在引用属性共享问题
- 可传参
- 函数复用

缺点：<br />无论在什么情况下，都会调用两次构造函数，一次在创建子类原型的时候 另一个在子类构造函数的内部（call）。生成了两份实例。<br />调用了两次 父类构造函数 <br />需要创建父类的实例 

<a name="hjGn8"></a>
#### 组合继承 优化1
这种方式通过父类原型和子类原型指向父类的原型，子类可以继承到父类的公有方法当作自己的公有方法，而且不会初始化两次实例方法和属性，避免组合继承的缺点

```javascript
function Person(name, age) {
            this.name = name
                this.age = age
        }
        Person.prototype.setAge = function () {
            console.log("111")
        }
        function Student(name, age, price) {
            Person.call(this, name, age)
            this.price = price
            this.setScore = function () { }
        }
	// 将子类的原型指向父类的原型
        Student.prototype = Person.prototype
	// 修改constructor指向
				Student.prototype.constructor = Student
        Student.prototype.sayHello = function () { }
        var s1 = new Student('Tom', 20, 15000)
        console.log(s1)
```

```javascript
Student.prototype.constructor = Student
/*
这样写 其实是有问题的，因为这样写 实际把Person.prototype.constrcutor的属性值也改成Student了
因为在上一步  Student.prototype = Person.prototype , Student.prototype和Person.prototype 
指向的就是用一个对象了，任何对这个对象的修改 都会反映。
所以当修改过后：
	Person.prototype.constructor = Student
*/
```


<a name="IBh6H"></a>
#### 组合继承优化2
由于直接继承父类的prototype属性存在缺点，所以就有第四种方法，利用一个空对象作为中介

```javascript
// 这是一个新的构造函数
var F = function(){}
// 将父类的原型对象的引用 赋值给 F的原型对象
F.prototype = Person.prototype
// 将F的实例对象 作为子类的原型对象
// 现在原型链为  student -> Student (F的实例对象)-> F.prototype == Person.prototype
Student.prototype = new F()
// 修正constructor属性指向
Student.prototype.constructor = Student
// F是空对象几乎不占内存，这时修改Student的原型对象，就不会影响到Person.prototype对象

```

将上面的方法封装成一个函数,便于使用

```javascript
function extends(Child,Parent){
	var F = function(){}
  F.prototype = Parent.prototype
  Child.prototype = new F();
  Child.prototype.constructor = Child;
  //这句话的意思是为子对象设置一个属性，这个属性直接指向父对象的prototype属性
  // uber 意思是向上，上一层
  // 这等于在子对象上打开一个通道，可以直接调用父对象的方法。
  // 这一行放在这里，只是为了实现继承的完备性，备用性质。
  Child.uber = Parent.prototype
}
// 使用的时候
extends(Student,Person)
```


<a name="ng6Id"></a>
#### 使用 Object.create()
借助原型 可以基于已有的对象来创建对象<br />var B = Object.create(A) 以对象A为原型，生成了B对象。B对象继承了A对象的所有方法和属性

```javascript
function Person(name, age) {
    this.name = name,
    this.age = age
}
Person.prototype.setAge = function () {
    console.log("111")
}
function Student(name, age, price) {
    Person.call(this, name, age)
    this.price = price
    this.setScore = function () {}
}	
// 核心代码
// 以父类的原型为父对象，生成一个子对象，子对象继承A对象的所有方法和属性
// 又将这个子对象设置为Student的原型 
Student.prototype = Object.create(Person.prototype)
// 修正constructor属性
Student.prototype.constructor = Student
```

这是目前来说最完美的继承方法。

<a name="1tNVh"></a>
#### Class 继承
ES6 引入了class关键字，class可以通过extends关键字 实现继承，还可以通过static关键字 定义类的静态方法，这比ES5的通过修改原型链实现继承，要清晰和方便<br />ES5继承的，实质上是先创建子类的实例对象 this 然后再将父类的方法通过 call添加到子类的方法上。<br />ES6 的继承机制完全不同，实质是将父类实例对象的属性和方法，加到this上，所以必须先调用super方法，然后再用子类的构造函数修改this。<br />Class关键字只是原型的语法糖，继承仍然是基于原型实现的。

```javascript
class Point {
}

class ColorPoint extends Point {
  // constructo属性  指向构造函数的引用
  // constructor() 相当于重新调用构造函数
  constructor(x,y,color){
  	super(x,y);// 调用父类的构造函数 
    this.color = color
    // 重写toString
    toString() {
    	return this.color + ''+ super.toString()// 调用父类的toString
    }
  }
}

// super 表示父类的构造函数，用来新建父类的this对象

```

子类必须 在constuctor方法中调用super方法，否则新建实例时会报错。<br />这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到于父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法，如果不调用super方法。子类就拿不到this对象。

ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上（Parent.apply(this)）<br />ES6的继承机制完全不同，实质上是先将父类 实例对象的属性和方法 添加到this上（所以必须先调用super方法）<br />再用子类的构造函数 修改this<br />如果子类没有定义constructor方法，这个方法会默认添加，也就是说任何一个子类都有constructor方法<br />在子类的构造函数中，只有调用super之后，才可以使用this关键字。否则会报错。<br />这是因为子类实例的创建，依赖于父类实例。只有super方法能够调用父类实例。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
```


<a name="keC9D"></a>
#### 拷贝继承
上面是采用prototype对象，实现继承，纯粹采用拷贝方法，实现继承。<br />简单说，把父对象的所有属性和方法，拷贝进子对象，<br />将操作封装为一个函数

```javascript
function extend2(Child,Parent) {
	var p = Parent.prototype
  var c = Child.prototype
  for( var i in p) {
  	c[i] = p[i]
  }
  c.uber = p
}
// 使用的时候
extend2(Student,Person)
```


<a name="gXNZu"></a>
### 非构造函数的继承
两个对象都是普通对象，而不是构造函数

```javascript
var Chinese = {
　　　　nation:'中国'
};
var Doctor ={
　　　　career:'医生'
}
```

<a name="xxHx9"></a>
#### object方法

```javascript
function object(o){
  // 这个函数 实际上 只做了一件事情，就是将子对象的prototype指向父对象
  // 从而将父对象和子对象连接再一起
	function F() {}
  F.prototype = o
  return new F()
}
// 使用的时候 先在父对象的基础上，生成子对象
var Doctor = object(Chinese
// 然后再加上 子对象本身的属性
Doctor.career = '医生';            
```

