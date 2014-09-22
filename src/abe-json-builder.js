var colors = require('colours'),
    glob = require('glob'),
    path = require('path'),
    util = require('util'),
    lodash = require('lodash-node'),
    fs = require('fs'),
    errors = {
        'NOT_ABE': 'This file isn\'t valid ABE JSON format'
    },
    opt = {
        'verbose': false,
        'location': './',
        'build': 'tmp/'
    };

exports.jsonBuilder = function (options) {
    lodash.merge(opt, options);

    glob
        .sync(opt.location + '.json', {
            mark: true
        })
        .forEach(function (match) {
            var json = require(process.cwd() + '/' + match);

            // Check that the JSON passed to the function has examples / matches
            // ABE Spec
            if (!lodash.has(json, 'examples')) {
                return errors.NOT_ABE;
            }

            var folderArr = path.dirname(match).split('/'),
                filePath = process.cwd() + '/' + opt.build,
                buildName = folderArr[folderArr.length - 1] + '-',
                baseName = path.basename(match, '.json');

            if (!fs.existsSync(filePath)) {
                fs.mkdir(filePath, function (err) {
                    if (err) {
                        console.log(err.red);
                    } else if (opt.verbose) {
                        console.log(opt.build.yellow, ' created.');
                    }
                });
            }

            // Loop through each example within the JSON to create it's own
            // JSON file
            lodash.forEach(json.examples, function (obj, key) {
                var bodyData = json.examples[key].response.body,
                    fileData = JSON.stringify(bodyData, null, 4),
                    file = buildName + baseName + '-' + key + '.json';

                fs.writeFile(filePath + file, fileData, function (err) {
                    if (err) {
                        console.log(err.red);
                    } else if (opt.verbose) {
                        console.log(file.green, ' file was saved.');
                    }
                });
            });

        });
};
