module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        bower: {
            install: {
                options: {
                    targetDir: 'client/requires',
                    layout: 'byComponent'
                }
            }
        },
        clean: { 
            build: ['build'],
            requires: ['client/requires'],
            pub: ['public'],
            dev: {
                src: ['build/app.js',
                    'build/<=%pkg.name%>.css',
                    'build/<=%pkg.name%>.js']
                },
            prod: ['dist']
        },
        browserify: {
            vendor: {
                src: ['client/requires/**/*.js'],
                dest: 'build/vendor.js',
                options: {
                    shim: {
                        jquery: {
                            path: 'client/requires/jquery/js/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'client/requires/underscore/js/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'client/requires/backbone/js/backbone.js',
                            exports: 'Backbone', 
                            depends: {
                                underscore: 'underscore'
                            }
                        },
                        'backbone.narionette': {
                            path: 'client/requires/backbone.marionette/js/backbone.marionette.js',
                            exports: 'Marionette',
                            depends: {
                                jquery: '$',
                                backbone: 'Backbone',
                                underscore: '_'
                            }
                        }
                    }
                }
                        
            },
            app: {
                files: {
                    'build/app.js': ['client/src/main.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
                }
            }
        },
        less: {
            transpile: {
                files: {
                    'build/<%= pkg.name %>.css': [
                        'client/styles/reset.css',
                        'client/requires/*/css/*',
                        'client/styles/less/main.less'
                    ]
                }
            }
        },

        concat: {
            'build/<%= pkg.name %>.js': ['build/vendor.js','build.app.js']
        },     
        copy: {
            dev: {
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'public/js/<%= pkg.name %>.js'
                }, {
                    src: 'build/<%= pkg.name %>.css',
                    dest: 'public/css/<%= pkg.name %>.css'
                }, {
                    src: 'client/img/*',
                    dest: 'public/img/'
                }]
            },
            prod: {
                files: [{
                    src: ['client/img/*'],
                    dest: 'dist/img/'
                }]
            }
        },
        cssmin: {
            minify: {
                src: ['build/<<%= pkg.name %>.css'],
                dest: 'dist/css/<%= pkg.name %>.css'
            }
        },
        uglify: {
            compile: {
                options: {
                    compress: true,
                    verbose: true
                },
                files: [{
                    src: 'buid/<%= pkg.name %>.js',
                    dest: 'dist/js<%= pkg.name %>'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['client/templates/*.hbs', 'client/src/**/*.js'],
                tasks: [ 'clean:dev', 'browserify:app', 'concat', 'copy:dev']
            },
            less: {
                files: ['client/styles/**/*.less'],
                tasks: ['less:transpile', 'copy:dev']
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    watchedFolders: ['controllers','app'],
                    env: {
                        PORT: '3000'
                    }
                }
            }
        },
        // server tests
        simplemocha: {
            options: {
                reporter: 'nyan'
            },

            server: {
                src: ['test/*.js']
            }
        },
        shell: {
            mongo: {
                comand: 'mongod',
                options: {
                    async: true
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'shell:mongo', 'watch:scripts'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },    
        jshint: {
            all: ['Gruntfile.js', 'client/src/**/*.js', 'test/*.js'],
            dev: ['client/src/**/*.js'],
            test: ['test/*.js']
        }
    });
    grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);
    
    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 
        'jshint:dev', 'less:transpile', 'concat', 
        'copy:dev']);
        
    grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 
        'browserify:app', 'jshint:all', 'less:transpile', 'concat', 'cssmin', 
        'uglify', 'copy:prod']);
        
    grunt.registerTask('test:server', ['simplemocha:server']);
    
    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
    
    grunt.registerTask('test', ['test:server']);
    
};