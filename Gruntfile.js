modules.exports = function(grunt) {
    require('time-grunt');
    require('load-grunt-tasks');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
    });
    bower: {
        install: {
            option: {
                targetDir: 'client/requires',
                layout: 'byComponent'
            }
        }
    },
    clean: { 
        build: ['build'],
        dev: {
            src: ['build/app.js'],
                'build/<=%pkg.name%>.js'],
                'build/<=%pkg.name%>.css']
            },
        prod: ['dist']
    },
    browerify: {
        vendor: {
            src: ['client/requires/**/*.js'],
            dest: 'build/vendor.js',
            options: {
                shim: {
                    jquery: {
                        path: 'client/requires/jquery/js/jquery.js',
                        exports: '$'
                    }
                    underscore: {
                        path: 'client/requires/underscore/js/underscore.js',
                        exports: '_'
                    }
                    backbone: {
                        path: 'client/requires/backbone/js/backbone.js',
                        exports: 'Backbone' 
                        depends: {
                            underscore: 'underscore'
                        }
                    }
                    'backbone.narionette': {
                        path: 'client/requires/backbone.marionette/js/backbone.marionette.js',
                        exports: 'Marionette'
                        depends: {
                            jquery: '$',
                            backbone: 'Backbone',
                            underscore: '_',
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
    concat: {
        'build/<%=pkg.name=%>.js': ['build/vendor.js','build.app.js']
    },     
    copy: {
        dev: {
            files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'server/public/js<%= pgn.name %>.js'
                },
                    src: 'build/<%= pkg.name %>.css',
                    dest: 'server/public/img/'
                },
                    src: 'client/img/*',
                    dest: 'server/public/img/'
                }]
            },
            prod: {
                files: [{
                    src: ['client/img/*',
                    dest: 'dist/img/'
            },
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
                compress: true;
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
        }
    },
    nodemon: {
        dev: {
            options: {
                file: 'server/server.js',
                nodeArgs: ['--debug'],
                watchedFolders: ['server/controllers','server/app']
                env: {
                    PORT: '3000'
                }
            }
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
        all: ['Gruntfile.js', 'client/src/**/*.js', 'test/*.js']
        dev: ['client/src/**/js'],
        test: ['test/*.js']
    }
    grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);
    
    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app', 'browserify:test', 'jshint:dev',
        'concat', 'copy:dev']);
        
    grunt.registerTask('build:prod', ['clean:prod', 'browserify:vendor', 'browserify:app', 'jshint:all',
        'concat', 'cssmin', 'uglify', 'copy:prod']);
    
    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
    
    
}