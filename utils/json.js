'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('fs'),
    stat = require('./stat'),
    thunkify = require('./thunkify');


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = async (src, data) => {

    // 读取数据
    if (data === undefined) {

        // 获取文件信息
        if (await stat(src)) {
            try {
                return JSON.parse(await thunkify(fs.readFile)(src));
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    // 写入数据
    try {
        await thunkify(fs.writeFile)(src, JSON.stringify(data));
        return true;
    } catch (e) {
        return false;
    }
};
