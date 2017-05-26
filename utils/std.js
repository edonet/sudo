'use strict';

const
    stdout = {
        log: console.log.bind(console),
        warn: console.warn.bind(console),
        error: console.error.bind(console)
    },
    message = { error: [], warn: [], log: [] };


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = {
    silent: flag => {
        let keys = ['log', 'warn', 'error'];

        // 结束静默模式
        if (typeof flag === 'function') {
            flag(message);
            keys.forEach(key => message[key] = []);
            flag = false;
        }

        // 是否开启
        flag === false ?
            keys.forEach(key => console[key] = stdout[key]) :
            keys.forEach(key => console[key] = (...args) => message[key].push(args));
    },
    error: err => stdout.error(err),
    warn: (...args) => {

        if (args.length) {
            return stdout.warn(...args);
        }

        let len = message.warn.length;

        while(len --) {
            stdout.log('warn:', ...message.warn.shift());
        }
    },
    log: (...args) => {
        let len = args.length,
            reg = /^\-+$/;

        len !== 1 && stdout.log();
        args.forEach(msg => {
            stdout.log(reg.test(msg) ? '-'.repeat(80) : msg);
        });
    }
};
