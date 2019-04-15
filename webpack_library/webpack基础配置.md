#### 简介

&emsp;&emsp;webpack 是一个模块打包机，它会从指定入口文件开始，递归的寻找 JavaScript 模块以及其他一些浏览器无法直接运行的扩展语言（Sass， TypeScript）等，将其打包成合适的格式以供浏览器使用。  
&emsp;&emsp;它的作用有代码转换（利用各种 loader 将浏览器无法识别的语言转换成合适的格式），文件优化（比如说打包时压缩体积），代码分割，模块合并，自动刷新（热更新），代码校验，自动发布。
引用了网上的一张图来大致看一下 webpack 的运行机制：
![](https://user-gold-cdn.xitu.io/2019/4/11/16a0b7b805f5a9c5?w=1250&h=884&f=png&s=138411)

#### webpack 的一些基本配置

&emsp;&emsp;首先是安装 webpack，在本地项目文件夹下 npm init 初始化之后，下载 webpack 以及 webpack-cli：

```
npm init
npm i webpack webpack-cli -D
```

&emsp;&emsp;此时在文件夹下建立一个 src 文件夹，用于放置项目代码。webpack 此时可以进行 0 配置打包，在命令行输入`npx webpack`可以打包出一个 dist 文件夹，下面又一个 main.js 就是打包后的文件。这个打包后的文件内容，就是使用递归的方式解析 src 中的 js 模块，递归的方法名为**webpack_require**，它支持我们在浏览器中使用 CommonJs 规范。
&emsp;&emsp;当然我们不可说直接就 0 配置打包一个项目，下面我总结一下 webpack 中常用的一些基本配置。

##### webpack.config.js

&emsp;&emsp;webpack 中默认的配置文件名为 webpack.config.js，在根目录下建立一个名为 webpack.config.js 的文件，就可以在这个文件中写配置项。当然 webpack 也提供给我们修改这个文件名的一些方法：  
&emsp;&emsp;（1）打包时输入命令`npx webpack --config webpack.config.my.js`。  
&emsp;&emsp;（2）为了不用每次都在命令行输出一串这么长的命令，在 package.json 中配置 scripts，`"build" : "webpack --config webpack.config.my.js"`。  
&emsp;&emsp;先在 webpack.config.my.js 进行一些基本的配置：

```
//webpack是用node写的
let path = require('path');
module.exports = {
    mode: 'development', //模式 生产环境production 开发模式development
    entry: './src/index.js', //入口
    output: { //出口
        filename: 'bundle.[hash:8].js', //打包后的文件名,[hash]每次打包生成新的文件
        //__dirname以当前目录解析成绝对路径
        path: path.resolve(__dirname, 'dist') ///路径必须是绝对路径，因此需要一个node模块来辅助配置 path.resolve把相对路径解析成绝对路径
    }
}
```

##### webpack-dev-server

&emsp;&emsp;用 webpack-dev-server 搭建一个服务器，使得我们不用真实的打包，而是在内存中打包，放置到 devSever 服务器上，以便我们在开发时调试测试整个项目。  
&emsp;&emsp;下载 webpack-dev-server：

```
npm i webpack-dev-server -D
```

&emsp;&emsp;之后，先在 package.json 中配置 scripts，`"dev" : "webpack-dev-server --config webpack.config.my.js"`。然后配置一下 devServer 中的一些配置项：

```
devServer: { //开发服务器的配置
    port: 8889, //端口号
    progress: true, //进度条
    contentBase: './dist', //指定了服务器资源的根目录，但是在开发过程不会真实打包，因此我们会用到HtmlWebpackPlugin插件
    compress: true //启用 gzip 压缩
},
```

##### HtmlWebpackPlugin 插件

&emsp;&emsp;定义一个 html 模版，可以在开发时和真实打包时都生成一个 html 文件，引用打包后的 js 文件。

```
let HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html', //模版文件的位置
        filename: 'index.html', //打包出来html文件的名称
        minify: {
            removeAttributeQuotes: true, // 去除双引号
            collapseWhitespace: true, //变成一行
        },
        hash: true //添加一个hash戳
    })
],
```

##### 样式设置（css-loader，style-loader，less-loader）

&emsp;&emsp;webpack 默认只支持 js 模块，如何解析 CSS 模块呢，我们会用到各种 loader。首先要知道在 html 文件中是不能用 link 直接引入 css 文件的，因为它只是一个模版文件，它会原封不动的打包到内存或 dist 文件夹中。我们在 JS 中通过 require 引入 css 文件，还可以在 css 中通过 import 其他的 css 文件。

```
module: {
    rules: [
        //css-loader 主要是解析css文件中的@import语法的
        //style-loader 把css插入到head的标签中
        //loader的特点 希望单一
        //loader的用法。字符串只用一个loader 多个loader需要用数组 loader的顺序 默认从右向左 从下往上执行
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
                options: {
                    insertAt: 'top'//插在最上面，让自己写在模版html<style>标签中的样式优先级较高
                }
            }, 'css-loader']
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader',
                options: {
                    insertAt: 'top'
                }
            }, 'css-loader', 'less-loader']
        }
    ]
}
```

&emsp;&emsp;如下图所示，head 标签下面的三个样式是分别在.css 和.less 文件中定义的样式，而/head 标签上面的一个样式是在模版 html 中自己设定的。
![](https://user-gold-cdn.xitu.io/2019/4/12/16a0f3f4c3d6fb3e?w=617&h=390&f=png&s=67153)  
&emsp;&emsp;当然此时还有一个问题，样式会以 style 的方式打包到 html 文件中。因此我们可以使用 MiniCssExtractPlugin 插件将这里边的样式抽离出来成一个 css 文件，以 link 的方式引入。还可以用一个 autoprefixer 包和一个 postcss-loader 自动添加浏览器前缀。

```
npm i mini-css-extract-plugin -D
new MiniCssExtractPlugin({
    filename: 'main.css'
})
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
            MiniCssExtractPlugin.loader, //把style-loader换成MiniCssExtractPlugin.loader
            'css-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader'
            ]
        }
    ]
}
```

```
npm i postcss-loader autoprefixer -D
//在根目录创建postcss.config.js文件
module.exports = {
    plugins: [require('autoprefixer')]
}
//并改变loader顺序
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
            ]
        },
        {
            test: /\.less$/,
            use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'less-loader',
            'postcss-loader'
            ]
        }
    ]
}
```

&emsp;&emsp;进行到这一步会发现，生产模式下打包出来的 main.css 也没有被压缩,是因为用了 MiniCssExtractPlugin 这个插件不会压缩 css，需要自己压缩。使用 OptimizeCSSAssetsPlugin 插件配置优化项，但是使用这个插件之后，css 确实压缩了，但 js 又不会压缩了，因此还要用到 UglifyJsPlugin 再来压缩 js。

```
npm i optimize-css-assets-webpack-plugin -D
npm i uglifyjs-webpack-plugin -D
optimization: {
    minimizer: [
        new UglifyJsPlugin({
            cache: true, //缓存
            parallel: true, //并发压缩
            sourceMap: true // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
    ]
}
```

##### 转换 es6 语法及校验

&emsp;&emsp;es6 语法转换成 es5 用到了 babel-loader：

```
npm i babel-loader @babel/core @babel/preset-env -D
{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ]
        }
    }
}
```

&emsp;&emsp;一些 es7 的提案如 class,则还需要用到@babel/plugin-proposal-class-properties，装饰器则需要用到@babel/plugin-proposal-decorators：

```
npm i @babel/plugin-proposal-class-properties -D
npm i @babel/plugin-proposal-decorators -D

{
    test: /\.js$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [
                '@babel/preset-env'
            ],
            plugins: [
                ['@babel/plugin-proposal-decorators', { "legacy": true }],
                ['@babel/plugin-proposal-class-properties', { "loose": true }],
                ['@babel/plugin-transform-runtime'] //generator
            ]
        }
    }
}
```

&emsp;&emsp;generator 函数使用的话，需要下载@babel/plugin-transform-runtime，还有一些 es7 的补丁需要下载：

```
npm i @babel/plugin-transform-runtime -D
npm i @babel/runtime -S
npm i @babel/polyfill -D
```

&emsp;&emsp;js 语法的校验用到了 eslint 以及 eslint-loader，他的官网为`https://eslint.org`，eslint 在使用时需要配置一个.eslint.json 的规则文件放在根目录，具体配置项见官网。

```
npm i eslint eslint-loader -D
{
    test: /\.js$/,
    use: {
        loader: 'eslint-loader',
        options: {
            enforce: 'pre' //在普通loader之前执行
        }
    },
}
```

##### 全局变量的引入

&emsp;&emsp;引入全局变量有三种方式，假如要在全局引入 jquery 库：

1. 使用内联 loader expose-loader 将 jquery 暴露到 window 属性上。

```
import $ from 'jquery'
require(expose-loader)
console.log(window.$)
```

2. 使用 webpack.providePlugin 插件将\$注入到每个模块。

```
new webpack.providePlugin(
    {$:'jquery'}
)
```

3. 引入 jquery 的 cdn。

##### 打包图片

&emsp;&emsp;图片引入有三种方式：

1. 在 js 中创建图片来引入，打包时要用到 file-loader 来解析图片地址加 hash 戳。

```
const logo = require('./01.jpg') //把图片引入，返回的结构是一个新的图片地址
const image = new Image();
console.log(logo); //用到file-loader 默认会在内部生成一张图片，到build目录下 把生成的图片的名字返回回来
image.src = logo;
document.body.appendChild(image)
```

2. 在 css 中添加图片，打包时 css-loader 会将 url('./01.jpg')解析为 url(require('./01.jpg'))。

```
body {
    background: red;
    background: url('./01.jpg')
}
```

3. 在 html 中通过图片的 img 标签引入图片，打包时需要用到 html-withimg-loader 来解析图片地址。

```
<img src="./01.jpg" alt="">
```

&emsp;&emsp;另外为了性能考虑，还可以使用 url-loader 将图片转化为 base64 编码，而不用生成 http 请求。当然生成 base64 编码的图片会使打包后的文件体积变大，因此两者性能需要权衡。

```
{
    test: /\.(png|jpg|gif)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 200 * 1024,//小于200k使用url-loader，大于200k使用file-loader
        }
    }
},
```

&emsp;&emsp;也可以做如下配置，使得打包时另外生成一个 img 文件夹。

```
{
    test: /\.(png|jpg|gif)$/,
    use: {
        loader: 'url-loader',
        options: {
            limit: 1,
            outputPath: '/img/'
        }
    }
},
```
