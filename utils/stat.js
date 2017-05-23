'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('fs'),
    thunkify = require('./thunkify');


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = async src => {
    try {
        return await thunkify(fs.stat)(src);
    } catch (e) {
        return null;
    }
};
