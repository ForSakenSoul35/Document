# webpack配置项

<a name="6bMUm"></a>
### 出口文件配置

```javascript
let path = require('path')
module.exports ={
	output:{
  	filename:'bundle.js',
    // filename:'bundle.[hash:8].js',  配置生成的文件带有哈希戳 默认是16位,可以设置位数
    path: path.resolve(__dirname,'dist')// 这里必须是一个绝对路径  可以使用node中的path模块帮助转化
  }
}
```

<a name="ABu0t"></a>
### 生产/开发模式 配置

```javascript
module.export ={
	mode:'development' // 'prodution'
}
```

<a name="HUphx"></a>
### 配置 webpack-dev-server

1. 安装 webpack-dev-server
1. 执行npx webpack-dev-server
1. 配置开发服务器

```javascript
module.export = {
	devServer:{
  	port:3000 // 设置端口号
    progress:true  // 添加打包进度条
    contentBase:'./build' // 设置指定目录
  }
}
```

<a name="pkgPh"></a>
### 配置HTML模板

1. 安装  yarn add -D  html-webapck-plugin
1. 使用
```javascript
let htmlWebpackPlugin = require('html-webapck-plugin')
module.exports= {
	....
  plugins:[
  	// plugins是 数组类型 
  	new htmlWebpackPlugin({
			template:'./src/index.html',// 设置html模板
  		fliename:'index.html'// 设置输出文件的名称
		})
  ]
}
```

3. 压缩html
```javascript
let htmlWebpackPlugin = require('html-webapck-plugin')
module.exports= {
	....
  plugins:[
  	// plugins是 数组类型 
  	new htmlWebpackPlugin({
			template:'./src/index.html',// 设置html模板
  		fliename:'index.html'// 设置输出文件的名称
  		// 压缩html的配置项
  		minify:{
  			removeAttributes:true,// 删除 双引号
  			collapseWhitespace:true // 一行显示
			},
		})
  ]
}
```

<a name="p0gyI"></a>
### 配置样式处理样式文件

1. css引入  html通过link标签引入是不可行的，只能通过require的方式 在js中引入  把css也当成一种模块使用

index.html 是模板 会原封不动的打包到build目录下  不会去引入，所以只能在js中引入

2. webpack不支持 css文件，只能通过合适的loader进行转换
2. 安装 css-loader,style-loader等loader
2. 使用

```javascript
module.exports ={
	....
  module:{
		rules: [
  	{
			test:/\.css$/, // 通过正则匹配文件  这里是匹配以css结尾的文件
  		use: ['style-loader','css-loader' ]
      use:[ 
      	{
        	loader:'style-loader',
          options:{
          	insert:'top' // 当有多个style标签时 配置顺序
          }
        },
        {
        	loader:'css-loader',
        },
        {
        	loader:'less-loader' // 可以用来处理less文件 转换成css文件
        }
        
			]
      //配置使用的loader，这里使用的是css-loader，style-loader
			// loader 用法  使用一个loader  单个字符串， 多个loader 数组
      // loader还可以使用对象形式表示  用于配置更多的内容
      // 执行顺序 默认从右向左执行 
      // css-loader  负责处理@import，url() 这种语法
      // style-loader  用来将css以style标签的形式插入到html中
		}
  ]
	}
}
```
<a name="SJr7T"></a>
### 抽离css文件

1. 安装插件 yarn add -D mini-css-extract-plugin
```javascript
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  module:{
  	rules:[
      {
      	test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,// 处理完css文件之后，使用css文件分离插件，
          {
          	loader:'css-loader'
          },
        ]
      }
    ]
  }
	plugins:[
  	new MiniCssExtractPlugin({
    	filename:'main.css',
    })
  ]
}
```


<a name="fZHuT"></a>
### css样式 自动添加浏览器前缀

1. 安装  yarn add -D postcss-loader autoprefixer 
1. 使用

要使用postcss-loader 需要对应的配置文件 postcss.config.js

```javascript
// 这是 postcss.config.js
module.exports ={
	plugins:[{require('autoprefixer')}]
}
```

```javascript
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  module:{
  	rules:[
      {
      	test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,// 处理完css文件之后，使用css文件分离插件，
          {
          	loader:'css-loader'
          },
          {
          	loader:'postcss-loader' // 先处理这个 再处理css
          }
        ]
      }
    ]
  }
	plugins:[
  	new MiniCssExtractPlugin({
    	filename:'main.css',
    })
  ]
}
```
<a name="CdFMb"></a>
### 压缩css文件

1. 需要添加配置项 在使用mini-css-extract-plugin插件的同时
1. 安装配置项对应的插件 yarn add -D optimize-css-assets-webpack-plugin

```javascript
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let  optimizeCssPlugin= require('optimize-css-assets-webpack-plugin')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // 优化项
  optimization:{
  	minimizer:[
      new UglifyJsPlugin({
      	 cache:true,// 是否生成缓存
         parallel: true,// 是否 并发压缩 一起压缩多个
         sourMap: true，
      }),
    	new optimizeCssPlugin() // 使用这个的时候 也必须引入uglifyjs-webpack-plugin
    ]
  }
  
  module:{
  	rules:[
      {
      	test:/\.css$/,
        use:[
          MiniCssExtractPlugin.loader,// 处理完css文件之后，使用css文件分离插件，
          {
          	loader:'css-loader'
          },
          {
          	loader:'postcss-loader' // 先处理这个 再处理css
          }
        ]
      }
    ]
  }
	plugins:[
  	new MiniCssExtractPlugin({
    	filename:'main.css',
    })
  ]
}
```

<a name="WVest"></a>
### 处理ES6+语法

1. 安装babel-loader和babel  <br />
```javascript
 yarn add babel-loader @babel/core @babel/preset-env -D
//  @babel/core 是babel的核心模块
// @babel/preset-env 用来将高级语法转化为低级语法
```

2. 使用

```javascript
module.exports ={
	module: {
  	rules:[{
    	test:/\.js$/,
      use:{
      	loader:'babel-loader',
        options:{// 需要将es6转化为es5
        	presets:[
            // 表示预设
            '@babel/preset-env'
          ]
          
        }
      }
    }]
  }
}
```

3. 处理ES6+ 的语法 需要另外的插件

```javascript
yarn add -D @babel/plugin-proposal-class-properties // 处理class语法
```

4. 使用

```javascript
let path = require(path)
module.exports ={
	module: {
  	rules:[{
    	test:/\.js$/,
      use:{
      	loader:'babel-loader',
        options:{// 需要将es6转化为es5
        	presets:[
            // 表示预设
            '@babel/preset-env',
          ],
          plugins:[
          	'@bebel/plugin-proposal-class-properties'
          ]
          
        }
      },
      include:path.resolve(_dirname,'src'),//包含哪些文件
      exclude:/node_modules/// 排除哪些文件
      
    }]
  }
}
```

<a name="Z9Yf2"></a>
### 处理JS校验

1. 安装

```javascript
yarn add -D eslint eslint-loader
```

2. 添加eslint 配置文件
2. 使用

```javascript
let path = require(path)
module.exports ={
	module: {
  	rules:[ // loader 默认是从右向左执行，从下到上执行
      // 配置loader执行顺序
      {
      	test:/\.js$/,
        use: {
        	loader:'eslint-loader',
          
        },
        options:{
        	enforce:'pre' // previous normal post三种取值 
        }
        exclude:/node_modules/// 排除哪些文件
      },
      {
    	test:/\.js$/,
      use:{
      	loader:'babel-loader',
        options:{// 需要将es6转化为es5
        	presets:[
            // 表示预设
            '@babel/preset-env',
          ],
          plugins:[
          	'@bebel/plugin-proposal-class-properties'
          ]
          
        }
      },
      include:path.resolve(_dirname,'src'),//包含哪些文件
      exclude:/node_modules/// 排除哪些文件
      
    }]
  }
}
```

