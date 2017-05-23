'use strict';

const
    rm = require('./rm');


(async () => {
    console.log(await rm(require('os').homedir() + ''));
})();
