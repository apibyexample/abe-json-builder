var colors = require('colours'),
    fs = require('fs'),
    glob = require('glob'),
    lodash = require('lodash-node'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    util = require('util'),
    errors = {
        'NOT_ABE': 'This file is an invalid ABE JSON format'
    },
    opt = {
        'verbose': false,
        'location': './',
        'build': 'tmp/'
    };

exports.jsonBuilder = function (options, callback) {
    lodash.merge(opt, options);
    var folderPath = path.join(process.cwd(), opt.build);

    if (!fs.existsSync(folderPath)) {
        mkdirp.sync(folderPath);
    }

    glob
        .sync(opt.location + '.json', {
            mark: true
        })
        .forEach(function (match) {
            var json = require(path.join(process.cwd(), match));

            // Check that the JSON passed to the function has examples / matches
            // ABE Spec
            if (!lodash.has(json, 'examples')) {
                return errors.NOT_ABE;
            }

            var folderArr = path.dirname(match).split('/'),
                buildName = folderArr[folderArr.length - 1] + '-',
                baseName = path.basename(match, '.json');

            // Loop through each example within the JSON to create it's own
            // JSON file
            lodash.forEach(json.examples, function (obj, key) {
                var data = JSON.stringify(json
                        .examples[key].response.body, null, 4)
                    file = buildName + baseName + '-' + key + '.json',
                    filePath = path.join(folderPath, file);

                fs.writeFileSync(filePath, data);
            });

        });

    if (lodash.isFunction(callback)) {
        callback();
    }
};
