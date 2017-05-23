'use strict';


/*
 *************************************************
 * 抛出接口
 *************************************************
 */
module.exports = {
    error: err => console.error(err),
    log: (...args) => {
        let len = args.length,
            reg = /^\-+$/;

        len !== 1 && console.log();
        args.forEach(msg => {
            console.log(reg.test(msg) ? '-'.repeat(80) : msg);
        });
    }
};
