'use strict';


/*
 *************************************
 * 设置【CSS】预处理参数
 *************************************
 */
const
    autoprefixerOptions = {
        browsers: [
            'ie >= 8',
            'Chrome >= 20',
            'ff >= 15',
            'iOS >= 6',
            'Android >= 4.0'
        ]
    },
    plugins = [
        require('autoprefixer')(autoprefixerOptions)
    ];


/*
 *************************************
 * 处理参数配置
 *************************************
 */
process.argv.slice(4).forEach(argv => {

    // 添加【cssnano】压缩工具
    argv === '--cssnano' && plugins.push(require('cssnano')());
});


/*
 *************************************
 * 输出【CSS】预处理配置
 *************************************
 */
module.exports = plugins;
