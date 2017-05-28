'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('../lib/fs'),
    os = require('../lib/os'),
    std = require('../lib/stdout'),
    dir = os.usedir(__dirname),
    settings = dir('../settings');


/*
 *************************************************
 * 定义初始化函数
 *************************************************
 */
async function start() {

    // 设置输出日志
    fs.debug({ rmdir: false });

    // 创建【.bin】文件夹
    await fs.mkdir(dir('../.bin'));


    /* 添加用户自定义命令 */
    std.block('User bin');
    await fs.symlink(dir('../.bin'), os.homedir('.bin'));


    /* 添加用户【node】全局模块命令 */
    std.block('Node modules');
    await fs.symlink(dir('../node_modules/.bin'), os.homedir('.node_modules'));


    /* 添加用户自定义配置 */
    let files = await fs.readdir(settings);

    if (files && files.length) {

        // 打印配置信息
        std.block('Settings');

        // 添加配置软链接
        await Promise.all(files.map(file => {
            return fs.symlink(dir(settings, file), os.homedir(file));
        }));

        // 输出空行
        std.log();
    }

    return true;
}


/*
 *************************************************
 * 输出配置回调
 *************************************************
 */
module.exports = start();







