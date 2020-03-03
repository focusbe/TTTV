const {
    resolve
} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
const museUiThemePath = path.join(
    __dirname,
    'node_modules',
    'muse-ui',
    'src/styles/themes/variables/default.less'
)
//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';
console.log("当前运行环境：", isPro ?
    'production' :
    'development');


module.exports = {
    target: 'electron-renderer',
    devtool: 'eval',
    entry: {
        app: [
            //'webpack-dev-server/client?http://localhost:3000',
            './main.js'
        ],
        // 将 第三方依赖 单独打包
        vendor: [
            'jquery'
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: isPro?'./':'http://localhost:3000/'
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ]
    },
    context: resolve(__dirname, 'src'),
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/',
        port: '3000'
    },

    module: {
        //module.noParse 配置哪些文件可以脱离webpack的解析
        noParse: /node_modules\/(jquey\.js)/,
        rules: [
            //html
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            // {
            //     test: /muse-ui.src.*?js$/,
            //     loader: 'babel-loader'
            // },
            
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        
                    }
                }
            },
            
            {
                test: /\.(css)$/,
                use:isPro? ExtractTextPlugin.extract({
                    publicPath:"../",
                    fallback: "style-loader",
                    use: "css-loader"
                }):["style-loader","css-loader"],
                // exclude: /node_modules/,
                // include: /src/
            },
            {
                test: /\.(scss)$/,
                use: isPro? ExtractTextPlugin.extract({
                    publicPath:"../",
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        {
                            loader:'sass-loader'
                        }
                    ]
                }):["style-loader","css-loader",'sass-loader'],
                // exclude: /node_modules/,
                // include: /src/
            },
            {
                test: /\.(less)$/,
                use:isPro? ExtractTextPlugin.extract({
                    publicPath:"../",
                    fallback: "vue-style-loader",
                    use: [
                        'css-loader',
                        {
                            loader: 'less-loader'
                        }
                    ]
                }):[
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader'
                    }
                ]
                ,
                // exclude: /node_modules/,
                // include: /src/
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                        loader: "url-loader",
                        query: {
                            name: 'images/[name].[ext]?v=[hash:5]',
                            limit: 20000
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                pngquant: {
                                    quality: "10-20",
                                    speed: 4
                                },
                                svgo: {
                                    plugins: [{
                                        removeViewBox: false
                                    }, {
                                        removeEmptyAttrs: false
                                    }]
                                },
                                gifsicle: {
                                    optimizationLevel: 7,
                                    interlaced: false
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                    interlaced: false
                                }
                            }
                        }
                    }

                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader?limit=8192&name=svg/[name].[ext]'
                }]

            }, {
                test: /\.(mp3|mp4|ogg)$/,
                use: [{
                    loader: "file-loader?name=media/[name].[ext]"
                }]
            }, {
                test: /\.json$/,
                use: [{
                    loader: "json-loader"
                }]
            }
        ]
    },
    plugins: [
        //热更新
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // new CopyWebpackPlugin([{
        //     from: __dirname + '/src/embed',
        //     to:'embed'
        // }]),
        //html模板
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: 'index.html',
            inject: 'body',
            // excludeChunks: ['app']
        }),

        //zepto
        //new webpack.ProvidePlugin({"$": "zepto-webpack"}),
        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].js'
        }),
        // css 后缀
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [require('autoprefixer')];
                }
            }
        }),
        new ExtractTextPlugin({
            "filename":"css/styles.css"
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'muse-components': 'muse-ui/src',
            'bin': path.resolve(__dirname, './bin/'),
            'lib': path.resolve(__dirname, './bin/'+process.platform),
            'plugins': path.resolve(__dirname, './plugins/')
        }
    }
}