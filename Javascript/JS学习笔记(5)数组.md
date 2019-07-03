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
#### 添加 push()
#### 数组末尾删除 pop()
#### 数组开头添加 
#### 数组开头删除
#### 截取字符串
#### 在数组中添加或删除一些元素
#### 拼接多个数组
#### 转化为字符串
#### 倒置数组元素
#### 从数组左侧开始查找指定的字符
#### 从数组右侧开始查找指定的字符
















