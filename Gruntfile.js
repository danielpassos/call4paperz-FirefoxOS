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
        },

        useminPrepare: {
            options: {
                dest: '<%= call4paperz.dist %>'
            },
            html: '<%= call4paperz.app %>/index.html'
        },

        usemin: {
            options: {
                assetsDirs: ['<%= call4paperz.dist %>']
            },
            html: ['<%= call4paperz.dist %>/**/*.html'],
            css: ['<%= call4paperz.dist %>/**/.css']
        },

        htmlmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= call4paperz.app %>',
                    src: '*.html',
                    dest: '<%= call4paperz.dist %>'
                }]
            }
        }
    });


    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concat',
        'uglify',
        'htmlmin',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
