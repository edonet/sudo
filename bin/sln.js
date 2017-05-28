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
    args = process.argv.slice(2);


/*
 *************************************************
 * 定义命令运行函数
 *************************************************
 */
async function start() {

    // 配置调试信息
    fs.debug({ mkdir: false, rmdir: false });

    if (args[0] === '-f') {

        // 移除参数
        args.shift();

        // 参数不足
        if (args.length < 2) {
            return false;
        }

        // 获取目录文件
        let src = os.usedir(args[0]),
            dist = os.usedir(args[1]),
            files = await fs.readdir(src());


        if (files && files.length) {

            // 生成软链接
            std.block('Create System Link');
            await fs.mkdir(dist());
            await Promise.all(files.map(file => fs.symlink(src(file), dist(file))));

            // 输出结果信息
            std.log('\nOo, Command has finished!\n');
        }

        return true;
    }


    if (args.length > 1) {

        // 输出信息
        std.block('Create System Link');
        await fs.symlink(os.cwd(args[0]), os.cwd(args[1]));

        // 输出结果信息
        std.log('\nOo, Command has finished!\n');
        return true;
    }
}


/*
 *************************************************
 * 抛出回调接口
 *************************************************
 */
module.exports = start();
