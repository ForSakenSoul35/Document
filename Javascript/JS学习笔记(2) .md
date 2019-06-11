## JS数据类型
Javascript中的变量可以保存任何数据，是弱类型语言，或者称之为"动态类型"的编程语言。Javascript共有七种数据类型，具体如下。
### JS七种数据类型
#### 1. number
number类型用于正数和浮点数。除了常规的数字，一些特殊的数值也属于这种类型。比如：Infinity,-Infinity和NaN。
- Infinity代表数学概念中的无限大，是一个比任何数字都大的特殊值。可以通过除于0得到。或者直接在代码中 使用 Infinity表示无限大
```
alert(1/0)// Infinity
alert(Infinity)//Inifinity
```
- NaN 代表一个计算错误，是一个不对的或者一个未定义的数字操作得到的结果，表示一个非数字。
> 任何对NaN的进一步操作都会返回NaN

> 在JS中，数学运算是安全的，可以做任何操作：除以0，将非数字字符串视为数字，等等。脚本永远不会致命的错误。最坏的情况是返回NaN。

#### 2. string
JS中的字符串必须被包裹在引号中。
有三种包含字符串的方式：
1. 双引号 "hello"
2. 单引号 'hello'
3. 反引号 `hello` 反引号是功能扩展的引用，允许通过${},将变量和表达式嵌入到字符串中。
#### 3. boolean
只有两个值，true和false
#### 4. null
只有一个值，是null，表示无，空，或者值未知。
#### 5. undefined
只有一个值，含义是 未被赋值
如果变量被声明，而未被赋值，那么它的值就是undefined。
#### 6. Object
object类型是特殊的类型，属于复杂类型。
#### 7. Symbol
Symbol类型用于创建对象的唯一标识符。

### 类型转换
大多数情况下，运算符和函数会自动将值转换为正确的类型。
#### toString
alert会自动将任何值转换为字符串，也可以显式的调用`Stirng(value)`进行转换。
#### toNumber
在算术函数和表达式中，会自动进行number类型转换，也可以使用`Number(value)`进行转换。
**number类型转换规则:**
- undefined => NaN
- null => 0
- true/false => 1/0
- string => 去掉首尾空格后的纯数字字符串中含有的数字，如果字符串只由空格字符组成，返回0，如果字符串不是纯数字，则返回NaN
> 加号"+" 几乎所有的算术运算符都会将值转换为数字，加号是个例外，如果其中一个运算元是字符串，另外一个也会转换为字符串。

#### toBoolean
逻辑操作或者显式调用Boolean(value)都会触发boolean类型转换。
**转换规则：**
- 假值： 0 ，空的字符串，null，undefined，NaN转换为false
- 其他值转换为true

**注意：**
包含0的字符串"0" 会被转化为 true(非空字符串会被转化为true)
### 参考链接 
https://zh.javascript.info/





