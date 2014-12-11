#!/usr/bin/env node
var prerender = require('./lib')
    , util = require('./lib/util.js')
    , _ = require('lodash');

var server = prerender({
    workers: process.env.PHANTOM_CLUSTER_NUM_WORKERS,
    iterations: process.env.PHANTOM_WORKER_ITERATIONS || 10,
    phantomBasePort: process.env.PHANTOM_CLUSTER_BASE_PORT || 12300,
    messageTimeout: process.env.PHANTOM_CLUSTER_MESSAGE_TIMEOUT
});


var plugins = process.env.PRERENDER_PLUGINS || 'blacklist,removeScriptTags,httpHeaders';

_.forEach(plugins.split(','), function (plugin) {
    plugin = plugin.trim()  // Trim extra spaces

    util.log({
        message: ['...Initialising plugin', plugin]
    })

    server.use(prerender[plugin]());
});

server.start();
