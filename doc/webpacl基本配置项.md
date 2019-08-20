# webpack基本配置项

<a name="ZrEcr"></a>
## 基本依赖
webpack升级到4.0版本之后，有两个基本的依赖是webpack和webpack-cli，这是webpack构建项目的前提。

```javascript
npm install --save-dev webpack webpack-cli
```
<a name="uDGud"></a>
## 运行webpack
webpack升级到4.0后，支持0配置，可以自动打包js文件。会以src目录下的index.js文件作为入口文件。<br />因为是0配置，因此可配置的项也很有局限。
<a name="BszG4"></a>
## 配置webpack
配置webpack需要 通过 webpack.config.js 文件 来配置。由于webpack是依赖node.js的，所以在编写webpack. config.js文件 能够使用node.js语法，并且可以使用node.js的API。

```javascript
// 使用nodeJS语法 导出webpack配置项
module.exports = {
  // webpack基本配置项
	// 1. 入口文件
  entry:'./src/index.js' // 指定入口文件
  // 2. 输出文件
  output: {
  //指定输出文件路径 必须是一个绝对路径 因此可以使用path.resolve() 方法 将相对路径转化为绝对路径
		path:path.resolve(__dirname,'dist') ,
   	filename:'bundle.js' ,// 指定输出文件名 
		// 输出文件名 可带hash值 语法为： bundle.[hash:8].js 数字代表几位哈希值
		publicPath:'static',// 输出解析文件的目录，url相对HTML页面 
    // 设置 publicPath之后，HTML中引用的url，会自动加上static 
	}
   mode:'development'|| 'production' //webapck 默认是 production
   chunkFileName：'...' // 指的是 未列入entry中，却有需要被打包出来的文件命名配置。
	 module:{},// 配置loader
   plugin:[] // 
}
```

