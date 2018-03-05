#!/usr/bin/env node
/**
 *****************************************
 * Created by lifx
 * Created on 2017-09-03 18:17:23
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const
    cp = require('child_process'),
    path = require('path'),
    src = path.resolve(__dirname, 'cgoban.jar');


/**
 *****************************************
 * 执行命令
 *****************************************
 */
cp.exec(`java -jar ${ src }`);