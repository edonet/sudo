#!/usr/bin/env node
'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    os = require('../lib/os'),
    fs = require('../lib/fs'),
    std = require('../lib/std'),
    dir = os.usedir(__dirname, '../.bin'),
    args = process.argv.slice(2);


/*
 *************************************************
 * 定义命令运行函数
 *************************************************
 */
async function start() {
    let settings = await fs.json(os.cwd('./package.json')),
        cmds = settings ? settings.bin : null;

    // 没有配置命令
    if (!cmds) {
        return false;
    }

    if (args[0] === '-d') {

        // 移除参数
        args.shift();

        // 移除软链接
        std.block('Remove Package Command');
        args.length ?
            await Promise.all(args.map(arg => arg in cmds && fs.rmdir(dir(arg)))) :
            await Promise.all(Object.keys(cmds).map(key => fs.rmdir(dir(key))));

        // 输出结果信息
        std.log('\nOo, Command has finished!\n');
        return true;
    }

    // 设置调试信息
    fs.debug({ rmdir: false });

    // 生成软链接
    std.block('Create Package Command');
    args.length ?
        await Promise.all(args.map(arg => arg in cmds && fs.symlink(os.cwd(cmds[arg], dir(arg))))) :
        await Promise.all(Object.keys(cmds).map(key => fs.symlink(os.cwd(cmds[key]), dir(key))));

    // 输出结果信息
    std.log('\nOo, Command has finished!\n');
    return true;
}


/*
 *************************************************
 * 抛出回调接口
 *************************************************
 */
module.exports = start();
