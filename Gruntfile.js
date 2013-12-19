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
        },

        handlebars: {
            options: {
                namespace: 'Call4Paperz.Templates',
                processName: function(filePath) {
                    return filePath.replace(/.*templates\//, '').replace(/\.hbs$/, '');
                }
            },
            all: {
                files: {
                    '<%= call4paperz.dist %>/scripts/templates.js': ['<%= call4paperz.app %>/templates/**/*.hbs']
                }
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= call4paperz.dist %>/{scripts,styles}/*.{js,css,jpg,png}'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= call4paperz.app %>',
                    dest: '<%= call4paperz.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.png',
                        'manifest.webapp'
                    ]
                }]
            }
        }
    });


    grunt.registerTask('build', [
        'clean:dist',
        'handlebars',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'htmlmin',
        'copy:dist',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
