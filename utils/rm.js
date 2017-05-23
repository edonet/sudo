'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    path = require('path'),
    homedir = require('os').homedir(),
    sh = require('./sh'),
    stat = require('./stat');


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = async (...args) => {

    // 获取路径参数
    let src = args.pop();

    // 获取完整路径
    src = path.resolve(process.cwd(), src);

    // 判断是否有权限移除文件夹
    if (src.length <= homedir.length || src.indexOf(homedir) !== 0) {
        return false;
    }

    // 存在文件时，移除掉文件
    if (await stat(src)) {
        try {
            await sh.exec(['rm', ...args, src].join(' '));
            return src;
        } catch (e) {
            return false;
        }
    }

    // 不存在文件时，反回成功
    return src;
};
