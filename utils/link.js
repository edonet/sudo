'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    sh = require('./sh'),
    rm = require('./rm'),
    std = require('./std');


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = async (src, dist) => {

    // 移除目标文件
    await rm(dist);

    // 添加软链接
    try {
        await sh.exec(`ln -s ${src} ${dist}`);
    } catch (err) {
        return std.error(err), false;
    }

    // 输出结果
    std.log(`system link: ${src} -> ${dist}`);
    return true;
};

