'use strict';


/*
 *************************************************
 * 定义依赖
 *************************************************
 */
const
    std = {
        log: console.log.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console)
    },
    cache = { log: [], warn: [], error: [] };


/*
 *************************************************
 * 拦截控制台输出
 *************************************************
 */
function silent(handler) {
    let keys = ['log', 'warn', 'error'];

    if (typeof handler === 'function') {
        keys.forEach(key => {
            console[key] = (...args) => handler(key, args);
        });
        return true;
    }

    handler === false ?
        keys.forEach(key => console[key] = std[key]) :
        keys.forEach(key => console[key] = (...args) => cache[key].push(args));
}


/*
 *************************************************
 * 恢复控制台输出
 *************************************************
 */
function restore(handler) {
    let keys = ['log', 'warn', 'error'];

    // 处理缓存数据
    if (typeof handler === 'function') {
        keys.forEach(key => {
            let data = cache[key],
                len = data.length;

            while (len --) {
                handler(key, data.shift());
            }

            console[key] = std[key];
        });

        return true;
    }

    // 清空缓存数据
    keys.forEach(key => {
        cache[key] = [];
        console[key] = std[key];
    });
}


/*
 *************************************************
 * 输出块内容
 *************************************************
 */
function block(...args) {
    let sep = '-'.repeat(80);

    args.length ?
        std.log(['', sep, ...args, sep].join('\n')) :
        std.log(sep);
}


/*
 *************************************************
 * 输出调试信息
 *************************************************
 */
function debug(type, ...args) {
    console[type](...args);
}

/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = Object.assign({
    silent, restore, block, debug
}, std);
