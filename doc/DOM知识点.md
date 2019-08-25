# DOM知识点

JS最初是为Web浏览器创建的
<a name="vGM3D"></a>
### 文档对象模型  DOM
document对象可以访问页面内容，可以使用它在页面上更改或者创建任何内容<br />DOM标准1，2，3
<a name="vn8YO"></a>
### BOM  浏览器对象模型 （HTML规范的一部分）

- navigator对象提供有关浏览器和操作系统的背景信息

navigator有很多属性，用的比较多的是 navigator.useAgent 关于当前浏览器 和 navigator.paltform 区分操作系统平台

- location对象  允许我们读取当前URL并且将当前浏览器重定向到新的URL


<a name="kvn2b"></a>
### DOM树
HTML文档的骨干是标签<br />根据文档对象模型，每个HTML标签都是一个对象。嵌套标签都称为 闭合标签的子标签<br />标签内的文本也是一个对象。<br />HTML中的所有内容甚至于注释都成为DOM的一部分

<a name="NPfKN"></a>
### 遍历DOM
getElementBy*返回的是live集合，这类集合总是可以反映出文档的当前状态而且在文档发生变化时，可以自动更新

```javascript
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 2
</script>
```

querySelector*返回一个static集合，就像是一个固定的元素数字

```javascript
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
  alert(divs.length); // 1
</script>
```

<a name="i1oof"></a>
### 搜索DOM
共有6种常用方法

- getElementById
- getElementByName
- getElementByTagName
- getElementByClassName
- querySelector
- querySelectorAll
<a name="gOM9M"></a>
#### 注意
getElementById和getElementByName方法只能使用document对象调用，如果是elem调用 会报错。<br />其他方法可以在document和elem上调用


<a name="7xCNV"></a>
### DOM节点
DOM节点因为它们的类而具有不同的属性。<br />每个节点都有与之对应的内置类。

层次的根节点是EventTarget，它继承自Node，而且其他DOM节点也继承自它

- EventTarget 是根的抽象类，该类的对象从未被创建，作为一个基础，为了让所有的DOM节点，都支持所谓的事件。
- Node 也是一个抽象类，充当DOM节点的基础，提供了树的核心功能 parentNode,nextSibling,childNodes等，Node类的对象从未被创建，但是一些具体的节点类却继承于它。例如 Text表示文本节点，Element表示元素节点，以及更多外来的类
- Element 是DOM元素的基类，提供了元素级的导航。比如 nextElementSibling，children以及向getElementByTagName,querySelector这样的搜索方法。 浏览器种不仅 有HTML，还会有XML以及SVG文档。Element充当以下更具体类的基类： HTMLElement，SVGElement，XMLElement
- HTMLElement 最终会成为所有HTML元素的基类。由各种HTML元素继承
  - HTMLInputElement input 元素的类
  - HTMLBodyElement body元素的类

例如 <input> 元素的DOM对象，它属于HTMLInputElement类，它的属性和方法为以下内容的叠加

- HTMLInputElement  该类提供特定于输入的属性，而且可以继承
- HTMLElement 提供了通用HTML元素方法  getter和setter ，而且可以继承自其他属性
- Element 提供泛型元素方法
- Node 提供通用DOM节点属性
- EventTarget 为事件提供支持
- Object  

DOM节点是规则的JS对象，使用基于原型的类来继承
<a name="Yo71h"></a>
#### nodeType属性
nodeType属性提供了一个获取DOM节点类型的旧方法

- elem.nodeType == 1 是元素节点
- elem.nodeType == 3 是文本节点
- elem.nodeType == 9 是document对象

nodeType属性只读，不可修改
<a name="uci7N"></a>
#### nodeName和tagName
给定一个DOM节点，可以从nodeName或者tagName属性中读取它的标记名<br />区别：<br />tagName 属性 只能用在Element节点<br />nodeName属性可以用在任意的节点<br />如果只处理元素 使用tagName，如果其他，使用nodeName
<a name="ffL8l"></a>
#### innerHTML
innerHTML属性允许 将元素中的HTML字符串作为字符串来获取<br />也可以修改它。这是改变页面的最有效方式之一。<br />如果尝试插入无效的HTML，浏览器会修复错误
<a name="qfe0L"></a>
#### outerHTML 元素的完整HTML
outerHTML属性包含完整的HTML，就像是innerHTML包含元素本身<br />outerHTML赋值时不会修改DOM元素，而是从外部上下文中提取它，并插入一个新的HTML片段来替代它。<br />可以写入outerHTML但是不会改变我们所写的元素。会在其位置上创建新内容
<a name="IwzIv"></a>
#### nodeValue/data 文本节点内容
innerHTML属性仅仅对元素节点有效。<br />其他节点类型具有它们的对应项，nodeValue,data属性。这两个在实际开发中作用几乎相同，建议使用data。
<a name="we3wy"></a>
#### textContent
提供对元素中的text的访问权限，只提供文本，去掉所有的tags<br />写入textContent显然有用得多，因为它允许 以 安全方式 编辑文本<br />与innerHTML对比 ，innerHTML会转义HTML标签，而textContent不会
<a name="kTuur"></a>
#### hidden属性
hidden属性 可以指定元素是否可见<br />elem.hidden = true  // 表示隐藏元素
<a name="7C5o4"></a>
### DOM属性
<a name="gaR8M"></a>
#### 操作属性的方法

- elem.hasAttribute(name) 判断是否存在这个特性
- elem.getAttribute(name)  获取这个特性 
- elem.setAttribute(name，value)   把这个特性设置为name值
- elem.removeAttribute(name)  移除这个特性
- elem.attributes 所有特性的集合
<a name="VeDgo"></a>
#### datasetzai
所有以" data-"开头的特性值，可以给编程人员正常使用，同时它是dataset合法值<br />如果一个elem有一个键名是"data-about"的特性，那么可以通过 elem.dataset.about 取到这个合法的值。<br />大多数情况下，DOM属性已经可以给以很好的支持，应当在DOM属性实在无法满足开发需求的情况下才使用特性：<br />需要一个非标准化的特性，但是如果用 data- 来设置值，那么需要使用dataset来获取属性值

<a name="sUcuJ"></a>
### 修改文档内容
<a name="HhQIM"></a>
#### 生成一个元素 document.createElement(tag)
document.createElement(tag) 用给定的标签生成一个新元素节点

```javascript
let div = document.createElement('div')
```
 
<a name="M3Ri8"></a>
#### 生成一个文本节点 document.createTextNode(text)

```javascript
let textNode = document.createTextNode("here i am")
```

<a name="m9qni"></a>
#### 插入元素

1. 插入到父节点中  parentElem.appendChild（node）  将node作为parentElem的最后一个元素
1. 在节点之前插入  paerent.insertBefore（node,nextSibling）  在parent的nextSibling前插入node
1. 替换节点  parentElem.replaceChild(node,oldChild) 将oldChild替换成node

上面方法是旧的方法
<a name="sM52e"></a>
#### 在开头插入/末尾插入/前面插入/后面插入

- node.append( node或者string ) 
- node.perpend( node或者string )
- node.before( node或者string)
- node.after( node或者string)
- node.replaceWith( node或者string )

所有方法都可以接受DOM节点或者文本字符串作为参数，如果给定的是一个字符串，那么它将以文本节点的形式插入。
<a name="28nfZ"></a>
#### 克隆节点
elem.cloneNode(true) 方法 用来对一个元素进行 深克隆 包括所有特性以及子元素<br />elem.cloneNode(false) 方法  用来对一个元素进行 浅克隆  不对子元素进行克隆
<a name="XW6d4"></a>
#### 移除
想要移除节点，可以通过以下方法<br />parentElem.removeChild(node)   从parentElem移除子元素node<br />node.remove() 从当前位置 移除node
