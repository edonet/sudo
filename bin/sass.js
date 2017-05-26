#!/usr/bin/env node
'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('fs'),
    sass = require('node-sass'),
    postcss = require('postcss'),
    postcssOptions = require('../postcss.conf'),
    std = require('../utils/std'),
    thunkify = require('../utils/thunkify');


/*
 *************************************************
 * 定义命令运行函数
 *************************************************
 */
async function start() {

    // 获取指定的输入文件
    let src = process.argv[2],
        dist, res;


    // 未指定文件时退出
    if (!src) {
        return false;
    }

    // 获取输出文件路径
    dist = process.argv[3] || src.replace(/\.scss$/, '.css');

    // 打印信息
    std.log('-', 'Sass and autoprefixer', '-');
    std.log(`source: ${src}`);
    std.log(`output: ${dist}`);

    try {
        std.silent();

        // 编译【sass】文件
        res = await thunkify(sass.render)({ file: src, outputStyle: 'compressed' });

        // 添加兼容前缀
        res = await postcss(postcssOptions).process(res.css);

        // 写入文件
        await thunkify(fs.writeFile)(dist, res.css);

        // 输出警告信息
        std.silent(stdout => {
            stdout.warn.forEach(args => std.warn('warn:', ...args));
        });

        // 编译成功
        std.log(`size: ${res.css.length}`);
        std.log('sass compiled successfully!');
        std.log();
    } catch (err) {
        return console.error(err), false;
    }

    return true;
}


/*
 *************************************************
 * 抛出回调接口
 *************************************************
 */
module.exports = start();

