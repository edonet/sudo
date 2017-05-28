'use strict';


/*
 *************************************************
 * 加载依赖
 *************************************************
 */
const
    fs = require('fs'),
    path = require('path'),
    thunkify = require('./thunkify'),
    settings = {
        error: true,
        mkdir: true,
        rmdir: true,
        readFile: true,
        writeFile: true,
        appendFile: true,
        rename: true,
        copy: true,
        symlink: true
    };


/*
 *************************************************
 * 设置调试信息
 *************************************************
 */
function debug(options) {
    return Object.assign(settings, options);
}

/*
 *************************************************
 * 设置调试输出函数
 *************************************************
 */
function stdout(label, ...args) {
    if (settings[label]) {
        label !== 'error' ? console.log(`${label}:`, ...args) : console.error(...args);
    }
}


/*
 *************************************************
 * 获取文件信息
 *************************************************
 */
async function stat(src) {
    try {
        return await thunkify(fs.stat)(src);
    } catch (ex) {
        return null;
    }
}


/*
 *************************************************
 * 获取文件信息
 *************************************************
 */
async function lstat(src) {
    try {
        return await thunkify(fs.lstat)(src);
    } catch (ex) {
        return null;
    }
}


/*
 *************************************************
 * 获取文件夹内容
 *************************************************
 */
async function readdir(src) {
    try {
        return await thunkify(fs.readdir)(src);
    } catch (ex) {
        stdout('error', ex);
        return null;
    }
}


/*
 *************************************************
 * 生成文件夹
 *************************************************
 */
async function mkdir(src, mode) {
    try {
        let stats = await stat(src);

        // 已经存在目录
        if (stats) {
            return stats.isDirectory();
        }

        let supdir = path.dirname(src);

        // 找不到上级目录
        if (!supdir || supdir === src) {
            return false;
        }

        // 创建目录
        if (await mkdir(supdir, mode)) {
            await thunkify(fs.mkdir)(src, mode);
            stdout('mkdir', src);
            return true;
        }

        return false;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 移除文件夹
 *************************************************
 */
async function rmdir(src) {

    // 获取绝对路径
    src = path.resolve(src);

    // 禁止移除三级以内的目录
    if (src.split(path.sep) < 4) {
        return false;
    }

    try {
        let stats = await lstat(src);

        // 目录存在
        if (stats) {

            // 移除文件
            if (!stats.isDirectory()) {
                return await unlink(src);
            }

            let files = await readdir(src);

            // 移除子文件内容
            if (files && files.length) {
                await Promise.all(files.map(file => rmdir(path.resolve(src, file))));
            }

            // 移除文件夹
            await thunkify(fs.rmdir)(src);
            stdout('rmdir', src);
            return true;
        }

        return true;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 移除文件
 *************************************************
 */
async function unlink(src) {
    try {
        await thunkify(fs.unlink)(src);
        stdout('rmdir', src);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 读取文件
 *************************************************
 */
async function readFile(src, encoding) {
    try {
        return await thunkify(fs.readFile)(src, encoding);
    } catch (ex) {
        stdout('error', ex);
        return null;
    }
}


/*
 *************************************************
 * 写入文件内容
 *************************************************
 */
async function writeFile(src, data, encoding) {
    try {
        await thunkify(fs.writeFile)(src, data, encoding);
        stdout('writeFile', src);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return null;
    }
}


/*
 *************************************************
 * 追加文件内容
 *************************************************
 */
async function appendFile(src, data, encoding) {
    try {
        await thunkify(fs.appendFile)(src, data, encoding);
        stdout('appendFile', src);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return null;
    }
}


/*
 *************************************************
 * 重命名文件
 *************************************************
 */
async function rename(src, dist) {
    try {
        await thunkify(fs.rename)(src, dist);
        stdout('rename', src, dist);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 重命名文件
 *************************************************
 */
async function copy(src, dist) {
    let stats = await stat(src);

    // 源文件不存在或不是文件
    if (!stats || stats.isDirectory()) {
        return false;
    }

    try {
        let rs = fs.createReadStream(src),
            ws = fs.createWriteStream(dist);

        // 开始传输内容
        rs.pipe(ws);

        // 监听文件流结束
        await new Promise((resolve, reject) => {
            rs.on('error', reject);
            ws.on('error', reject);
            ws.on('close', resolve);
        });

        stdout('copy', src, '->', dist);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 生成软链接
 *************************************************
 */
async function symlink(src, dist) {

    // 过滤系统文件
    if (path.basename(src) === '.DS_Store') {
        return false;
    }

    // 移除目录文件
    if (!await rmdir(dist)) {
        return false;
    }

    // 生成文件链接
    try {
        await thunkify(fs.symlink)(src, dist);
        stdout('symlink', src, '->', dist);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 获取读入流
 *************************************************
 */
async function readStream(src) {

    let stats = await stat(src);

    // 源文件不存在或不是文件
    if (!stats || stats.isDirectory()) {
        return false;
    }

    // 创建读入流
    try {
        return fs.createReadStream(src);
    } catch (ex) {
        stdout('error', ex);
        return null;
    }
}


/*
 *************************************************
 * 创建写入流
 *************************************************
 */
async function writeStream(src) {

    let stats = await stat(src);

    // 源文件不存在或不是文件
    if (stats && stats.isDirectory()) {
        return false;
    }

    // 创建读入流
    try {
        return fs.createWriteStream(src);
    } catch (ex) {
        stdout('error', ex);
        return null;
    }
}


/*
 *************************************************
 * 读取、写入【JSON】文件
 *************************************************
 */
async function json(src, data) {

    // 读取文件
    if (data === undefined) {
        try {
            return JSON.parse(await thunkify(fs.readFile)(src));
        } catch (ex) {
            stdout('error', ex);
            return null;
        }
    }

    try {
        data = JSON.stringify(data, undefined, 4);
        await thunkify(fs.writeFile)(src, data);
        return true;
    } catch (ex) {
        stdout('error', ex);
        return false;
    }
}


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = {
    stat, lstat,
    readdir, mkdir, rmdir,
    readFile, writeFile, appendFile,
    rename, copy, symlink,
    readStream, writeStream,
    json, debug
};
