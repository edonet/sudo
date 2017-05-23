'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    std = require('../utils/std'),
    link = require('../utils/link'),
    dir = (...args) => path.resolve(__dirname, ...args),
    homedir = os.homedir(),
    settings = dir('../settings');


/*
 *************************************************
 * 定义初始化函数
 *************************************************
 */
async function start() {

    /* 添加用户自定义命令 */
    std.log('-', 'User bin', '-');
    await link(dir('../.bin'), dir(homedir, '.bin'));


    /* 添加用户【node】全局模块命令 */
    std.log('-', 'Node modules', '-');
    await link(dir('../node_modules/.bin'), dir(homedir, '.node_modules'));


    /* 添加用户自定义配置 */
    fs.readdir(settings, (err, files) => {

        // 抛出错误信息
        if (err) {
            throw err;
        }

        // 打印配置信息
        std.log('-', 'Settings', '-');

        // 添加配置软链接
        files.forEach(async file => {
            await link(dir(settings, file), dir(homedir, file));
        });
    });
}


/*
 *************************************************
 * 输出配置回调
 *************************************************
 */
module.exports = start();







