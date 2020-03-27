const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin= require('optimize-css-assets-webpack-plugin' );
const mode="development";
process.env.NODE_ENV=mode;
let styleLoader=null;
if(mode==="development"){
    styleLoader="style-loader"
}else{
    styleLoader=MiniCssExtractPlugin.loader;
}
let styleArr=[ styleLoader,
    'css-loader',
    { loader: 'postcss-loader', options: { ident: 'postcss', plugins: () => [ require('postcss-preset-env')()  ] } }]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: './build.[contenthash:10].js',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [{
            test: /\.css$/,// 匹配哪些文件
            use: styleArr,
            
        },{
            test:/\.scss$/,
            use:[...styleArr,"sass-loader"]
        },{ 
            test: /\.js$/, 
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: { // 预设：指示 babel 做怎么样的兼容性处理 
                cacheDirectory: true,
                presets: [ [ '@babel/preset-env', { 
                    // 按需加载 
                    useBuiltIns: 'usage', 
                    // 指定 core-js 版本 
                    corejs: { version: 3 },
                    // 指定兼容性做到哪个版本浏览器 
                    targets: { 
                        chrome: '60',
                         firefox: '60',
                          ie: '9', 
                          safari: '10',
                           edge: '17' } 
                        } 
                    ] 
                ]
           }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', minify: { collapseWhitespace: true, removeComments: true }
        }),
        new MiniCssExtractPlugin({
            filename:"css/index.css"
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    optimization: { splitChunks: { chunks: 'all' } },
    mode: mode,
    devtool: 'source-map',
    devServer: { contentBase: resolve(__dirname, 'build'), compress: true, port: 3000, open: true,hot: true}
};