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
    std = require('../lib/std'),
    thunkify = require('../lib/thunkify');


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
    std.block('Sass and Autoprefixer');
    std.log(`source: ${src}`);
    std.log(`output: ${dist}`);

    try {

        // 拦截输出
        std.silent((key, args) => key !== 'log' && std[key](...args));

        // 编译【sass】文件
        res = await thunkify(sass.render)({ file: src, outputStyle: 'compressed' });

        // 添加兼容前缀
        res = await postcss(postcssOptions).process(res.css, { from: src, to: dist });

        // 写入文件
        await thunkify(fs.writeFile)(dist, res.css);

        // 编译成功
        std.log(`size: ${res.css.length}`);
        std.log('sass compiled successfully!\n');
    } catch (err) {
        return std.error(err), false;
    }

    return true;
}


/*
 *************************************************
 * 抛出回调接口
 *************************************************
 */
module.exports = start();
