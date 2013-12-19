'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({

        call4paperz: {
            app: 'app',
            dist: 'dist'
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= call4paperz.dist %>/*',
                        '!<%= call4paperz.dist %>/.git*'
                    ]
                }]
            }
        },

        'bower-install': {
            app: {
                html: '<%= call4paperz.app %>/index.html',
                ignorePath: '<%= call4paperz.app %>/'
            }
        }
    });


    grunt.registerTask('build', [
        'clean:dist'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
