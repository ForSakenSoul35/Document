# webpack中的loader和plugin

webpack是一个模块打包器，提供了一个核心，核心提供了很多开箱即用的功能，可以通过plugin和loader来扩展。
<a name="BLnCh"></a>
## webpack常用配置项

- entry
- output
- devtool
- resolve
- plugin
- loader
- externals
<a name="JMVyr"></a>
## loader
<a name="YyQZi"></a>
### 使用loader的三种方式

1. 在配置文件中webpack.config.js配置

```javascript
module.exports ={
	module:{
  	rules:[ // 数组 可能有多个数组 匹配不同的文件
      {
      	test:/\.txt$/, // 正则表达式
        use:[ // 数组 
          { 
          // 如果只有loader选项 直接这么写 use:'raw-loader'
      		loader: 'raw-loader',// 字符串
        	options:{ sourceMap: true} // 对象
          }
        ]
      }
    ]
  }
}
```

2.  通过命令行参数 形式

```javascript
webpack -- module-bind 'txt = raw-loader'
```

3. 通过内联使用

```javascript
import txt  from 'raw-loader!./file.txt';
```
<a name="XTjfE"></a>
### webpack常见loader

- 样式 
  - style-loader 创建一个style标签将css文件嵌入到html中
  - css-loader 处理其中的import语句以及url（）
  - less-loader 处理less文件
  - sass-loader 处理sass文件
- 文件
  - raw-loader 将文件以字符串的形式返回
  - file-loader  可以处理资源，复制和放置资源位置，并可以制定文件名模板，用hash命名可以更好利用缓存
  - url-loader 可以将小于配置limit大小的文件转化为Data Url的方式 减少请求
  - imports-laoder  可以向模块注入变量
  - exports-loader 可以提供导出模块功能
  - expose-loader 暴露对象为全局变量
- 编译
  - babel-loader
  - coffee-loader
  - ts-loader
- 校验测试
  - mocha-loader
  - jshint-loader
  - eslint-loader
<a name="0cAl0"></a>
## plugin
<a name="7v3Gd"></a>
### webpack内置plugin
webpack内置UglifyJsPlugin，用于压缩和混淆代码<br />内置CommonChunkPlugin,提供打包效率，将第三方库和业务代码分开打包。<br />提供ProvidePlugin，自动加载模块，代替require和import
<a name="mgrXg"></a>
### webpack常用plugin
<a name="aEu70"></a>
#### html-webpack-plugin
可以根据模板自动生成html代码，并且自动引用css文件和js文件
<a name="ZRn5T"></a>
#### extract-text-webpack-plugin
将js文件中引用的样式单独抽离成css文件
<a name="6JY5F"></a>
#### DefinePlugin
编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用

<a name="KEfAE"></a>
## loader和plugin的区别

- loader用于对模块的源代码进行转换。loader可以使你在 import 或者加载模块时预处理文件。并且提供了处理前端构建步骤的强大方法。可以将不同的语言转化为js
- pliugin是用来扩展webpack功能的，通过在构建过程中注入钩子实现。给webpack带来了很大的灵活性。

loader可以理解成是一个转换器，负责把某种文件格式的内容换成weback可以支持打包的模块。

