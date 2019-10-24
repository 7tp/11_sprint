const webpack = require('webpack');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].[chunkhash].js'
    },
    module: {
        rules: [
        {
            test: /\.js$/, // ищет все js файлы
            use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules
        },
        {
            test: /\.css$/i, // применять это правило только к CSS-файлам
            use: [//если собирается в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно
                (isDev ? 'style-loader' : {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                    publicPath: '../'
                    }
                }),
                'css-loader',
                'postcss-loader'
            ]
        },  
        {
            test: /\.(png|jpe?g|gif|ico|svg)$/, //для работы с изображениями и их оптимизации
            use: [
                 'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                 {
                     loader: 'image-webpack-loader',
                     options: {
                        name(file) {
                            if (process.env.NODE_ENV === 'development') {
                              return '[path][name].[ext]';
                            }
                            return '[contenthash].[ext]';
                        }
                     }    
                 },
            ],
        },
        {
            test: /\.(eot|ttf|woff|woff2)$/, // для подгрузки шрифтов
            loader: 'file-loader?name=./vendor/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
       }),
       new HtmlWebpackPlugin({
        inject: false, // стили НЕ нужно прописывать внутри тегов
        hash: true,
        template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
        filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
       }),
       new WebpackMd5Hash()
    ]
}