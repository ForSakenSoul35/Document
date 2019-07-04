## 数组

### 创建数组
#### 构造函数创建数组
```
// 创建一个空数组
var arr = new Array()
// 创建确定容量的数组
var arr = new Array(10)
// 创建拥有一些数据的数组
var arr= new Array(1,2,'Tom',true)
```
**new操作符**
在堆内存中开辟内存空间来存储对象
返回堆内存中对象的引用
```
var arr = new Array()
```
#### 字面量创建数组
```
// 创建一个空数组
var  arr = []
// 创建一个拥有一些数据的数组
var arr = [1,2,3,4]
```
## 数组的访问
通过数组的下标访问数组元素，从0开始，可以对数组进行取值与赋值。

## 数组的遍历
- 快速遍历 for in
```
var arr= [1,2,3,4,5]
for(var i in arr ) {
  consol.log(i)
  console.log(array[i])
}
// i 代表数组的下标
```
- for循环遍历
for循环按顺序遍历
 ```
 var arr= [1,2,3,4,5]
 for(var i=0;i< arr.length;i++){
  consol.log(i) // 01234
  console.log(array[i])//12345
 }
 ```
- forEach遍历
ES5中新增的方法，低版本IE不支持
forEach()方法用于调用数组的每个元素，并将元素传递给回调函数
```
 var arr= [1,2,3,4,5]
 arr.forEach(function(item,index){
  console.log(item)//12345
 })
```
### array.length用法
- 获取数组的长度
```
var arr = [1,2,3,4,5]
arr.length // 5
```
- 增加数组的长度
```
var arr = [1,2,3]
arr.length = 5
console.log(arr)
// [1,2,3,undefined,undefined]
```
- 减少数组的长度
```
var arr = [1,2,3,4,5]
arr.length = 3
console.log(arr)
// [1,2,3]
```
- 添加数组元素
```
var arr = [1,2,3,]
arr[2] = 10 // 下标小于等于数组的长度 会直接替换掉原来的元素
console.log(arr)
// [1,10,3]
arr[5]=20 // 下标大于数组的长度 则数组长度自动补齐，默认元素为undefined
console.log(arr)
// [1,10,3,undefined,20]
```

### 数组的常用方法
#### 数组末尾添加 push()
- 功能 在数组的末尾添加一个或者多个元素
- 参数 要添加的元素
- 返回值 添加后数组的长度
- **会改变原来的数组**
```
var arr = [1,2,3]
var len = arr.push(4,5)
console.log(len) //5
console.log(arr)//[1,2,3,4,5]
```
#### 数组末尾删除 pop()
- 功能 数组末尾删除一个元素
- 参数 无
- 返回值 被删除的元素
```
var arr = [1,2,3]
var ele  = arr.pop()
console.log(ele) // 3 返回删除的元素 
console.log(arr)//[1,2] 原数组被修改
```
#### 数组开头添加 unshift()
- 功能 在数组的开头添加一个或多个元素
- 参数 要添加的元素
- 返回值 添加数据后的数组长度
```
var arr = [1,2,3]
var len = arr.unshift('a','b')
console.log(len)//5
console.log(arr)//a,b,1,2,3
```
#### 数组开头删除 shift()
- 功能 在数组的开头删除一个元素
- 参数 无
- 返回值 被删除的元素
```
var arr = [1,2,3]
var ele = arr.shift()
console.log(ele) // 1 返回删除的元素
console.log(arr) // [2,3]原数组已经被修改
```
#### 截取字符串 slice(startindex,endindex)
- 功能 在数组中 从startindex开始截取直到endindex之前，**不包括endindex**
- 参数 开始下标 结束下标
- 返回值 截取的数据 数组
- **不会改变原来的数组**
```
var arr = [1,2,3,4]
var newarr = arr.slice(0,3) 
console.log(newarr)// [1,2,3] 返回截取的字符串
console.log(arr) // [1,2,3,4] 不会修改原来的数组
```
#### 在数组中添加或删除一些元素 splice(下标，个数，item1，item2)
- 功能 在数组的中间添加或者删除一些元素 
- 参数
  - 下标 必需 规定从何处开始添加/删除元素  必须是数字
  - 个数 可选 规定应该删除多少元素，必须是数字 可以是0 如果未规定此参数，则删除从index开始到原数组结尾的所有元素
  - item  可选 要添加到数组的新元素
- 返回值 含有被删除元素的数组
- **会改变原数组**
```
// 删除
var arr= [1,2,3,4,5]
var newArr = arr.splice(1,2) // 下标为1 个数为2
console.log(newArr) // [2,3]  返回删除元素的数组 
console.log(arr)//[1,4,5] // 原数组已被修改
// 添加
// 添加的时候 第二个参数 个数设置为0 表示不删除元素 
var arr= [1,2,3,4,5]
var newArr = arr.splice(1,0,'a','b')
console.log(arr) // [1,'a','b',3,4,5] 原数组已经被修改
console.log(newArr)// [] 返回被删除元素的数组
```
#### 拼接多个数组 concat() 
- 功能 将多个数组拼接成一个数组
- 参数 一个或者多个数组或者元素
- 返回值 拼接之后的数组
- **注意 拼接后数组的元素将按照传入参数的顺序排列**
- **不会修改原来的数组**
```
var arr=[1,2,3]
var arr1 =[4,5]
var newArr = arr.concat(arr1)
console.log(newArr) // [1,2,3,4,5]
console.log(arr)// [1,2,3]
```
#### 转化为字符串 join(str)
- 功能 将数组的元素用参数字符串拼接成一个新的字符串
- 参数 分隔符字符串
- 返回值 拼接的结果 
- **不会改变原来的数组**
```
var arr =[1,2,3]
var newArr = arr.join("-")
console.log(newArr)// 1-2-3
console.log(arr) // [1,2,3]
```
#### 倒置数组元素 reverse()
- 功能 导致数组元素
- 参数 无
- 返回值 倒置以后的数组 
- **会改变原来的数组** 
#### 从数组左侧开始查找指定的字符 indexOf(item)
- 功能 从数组的左侧开始查找对应第一次出现的参数元素的下标
- 参数 要查找的元素值
- 返回值 如果找到了对应元素的则返回该元素的下标值，否则返回-1
#### 从数组右侧开始查找指定的字符 lastIndexOf(item)
- 功能 从数组的右侧开始查找对应第一次出现的参数元素的下标
- 参数 要查找的元素值
- 返回值 如果找到了对应元素的则返回该元素的下标值，否则返回-1
















