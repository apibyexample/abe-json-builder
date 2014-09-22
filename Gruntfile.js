module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-contrib-jshint');
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
    grunt.registerTask('lint', [
        'jshint:src',
        'jscs:src'
    ]);
    grunt.registerTask('test', ['lint']);
};