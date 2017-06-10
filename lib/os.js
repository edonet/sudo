'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    os = require('os'),
    path = require('path'),
    cwdDir = process.cwd(),
    osHomeDir = os.homedir(),
    osTmpDir = os.tmpdir();


/*
 *************************************************
 * 生成目录
 *************************************************
 */
function usedir(...args) {
    let src = path.resolve(...args);
    return (...args) => args.length ? path.resolve(src, ...args) : src;
}


/*
 *************************************************
 * 生成目录
 *************************************************
 */
function cwd(...args) {
    return args.length ? path.resolve(cwdDir, ...args) : cwdDir;
}


/*
 *************************************************
 * 获取用户文件目录
 *************************************************
 */
function homedir(...args) {
    return args.length ? path.resolve(osHomeDir, ...args) : osHomeDir;
}


/*
 *************************************************
 * 获取临时文件目录
 *************************************************
 */
function tempdir(...args) {
    return args.length ? path.resolve(osTmpDir, ...args) : osTmpDir;
}


/*
 *************************************************
 * 获取【ip】地址列表
 *************************************************
 */
function ip() {
    let network = os.networkInterfaces(),
        keys = Object.keys(network),
        regexp = /^[0:]+$/,
        ips = [];

    for (let key of keys) {
        network[key].forEach(ip => {
            ip.family === 'IPv4' && !regexp.test(ip.mac) && ips.push(ip.address);
        });
    }

    return ips;
}


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = {
    ip,
    cwd,
    usedir,
    tempdir,
    homedir
};

