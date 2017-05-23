#!/usr/bin/env node
'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    cwd = process.cwd(),
    args = process.argv.slice(2),
    path = require('path'),
    rm = require('../utils/rm'),
    std = require('../utils/std'),
    link = require('../utils/link'),
    json = require('../utils/json'),
    dist = path.resolve(__dirname, '../.bin');


/*
 *************************************************
 * 定义脚本运行入口
 *************************************************
 */
async function start() {

    // 获取项目配置信息
    let data = await json(path.resolve(cwd, './package.json')),
        cmds = data ? data.bin : null;

    // 未定义脚本时退出
    if (!cmds) {
        return false;
    }


    if (args[0] === '-d') {

        // 去除第一个参数
        args.shift();

        // 移除命令脚本
        args.length ?
            await removeCommand(args.filter(arg => arg in cmds)) :
            await removeCommand(Object.keys(cmds));

    } else {

        // 添加命令
        args.length ?
            await addCommand(cmds, args.filter(arg => arg in cmds)) :
            await addCommand(cmds, Object.keys(cmds));
    }

    return true;
}


/*
 *************************************************
 * 定义添加脚本方法
 *************************************************
 */
async function addCommand(cmds, keys) {

    // 添加脚本链接
    if (keys.length) {
        std.log('-', 'Add command link', '-');
        await Promise.all(
            keys.map(key => link(path.resolve(cwd, cmds[key]), path.resolve(dist, key)))
        );
        std.log();
    }

    return true;
}


/*
 *************************************************
 * 定义移除脚本方法
 *************************************************
 */
async function removeCommand(keys) {

    // 添加脚本链接
    if (keys.length) {
        std.log('-', 'Remove command link', '-');
        await Promise.all(
            keys.map(key => rm(path.resolve(dist, key)).then(src => std.log(`remove: ${src}`)))
        );
        std.log();
    }

    return true;
}


/*
 *************************************************
 * 输出回调
 *************************************************
 */
module.exports = start();
