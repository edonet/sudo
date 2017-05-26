'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    stat = require('./stat'),
    thunkify = require('./thunkify');


/*
 *************************************************
 * 定义创建文件夹方法
 *************************************************
 */
async function mkdir(src) {

    // 获取当前路径信息
    let stats = await stat(src),
        parentDir;

    // 如果存在文件夹，直接返回文件平信息
    if (stats) {
        return stats;
    }

    // 获取文件夹父路径
    parentDir = path.dirname(src);

    // 如果没有父路径了，直接返回False
    if (src === parentDir) {
        return false;
    }

    // 创建路径
    return await mkdir(parentDir) ? thunkify(fs.mkdir)(src) : false;
}


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = mkdir;
