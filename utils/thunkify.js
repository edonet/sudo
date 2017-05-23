'use strict';


/*
 *************************************************
 * 定义柯理化方法
 *************************************************
 */
function thunkify(handler) {
    return function (...args) {
        return new Promise((resolve, reject) => {

            // 添加回调参数
            args.push((err, ...data) => {
                err ? reject(err) : data.length > 1 ? resolve(data) : resolve(data[0]);
            });

            // 执行方法
            handler.apply(this, args);
        });
    };
}


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = thunkify;
