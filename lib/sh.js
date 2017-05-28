'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    cp = require('child_process'),
    thunkify = require('./thunkify'),
    exec = thunkify(cp.exec),
    execFile = thunkify(cp.execFile),
    callback = ([stdout, stderr]) => {

        // 抛出错误信息
        if (stderr) {
            throw new Error(stderr);
        }

        // 返回输出信息
        return stdout;
    };


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = {
    exec: (cmd, options) => {
        return exec(cmd, options).then(callback);
    },
    execFile: (cmd, options) => {
        return execFile(cmd, options).then(callback);
    },
    spawn: (cmd, args, options) => {
        return cp.spawn(cmd, args, options);
    }
};
