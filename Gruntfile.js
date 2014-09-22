module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        jscs: {
            src: [
                '**/*.js',
                '!node_modules/**'
            ]
        },
        jshint: {
            src: [
                '**/*.js',
                '!node_modules/**'
            ]
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', [
        'jshint:src',
        'jscs:src'
    ]);

    grunt.registerTask('test', ['lint']);
};
