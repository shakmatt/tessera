// Generated on 2014-12-06 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Configurable paths for the application
	var appconfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist',
		deployFolder: 'angularTemplate',
		imagesToCopy: '{webp}',
		domain: 'domain.me'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		yeoman: appconfig,

		// Renames files for browser caching purposes
		rev: {
			dist: {
				src: [
					'<%= yeoman.dist %>/scripts/{,*/}*.js',
					'<%= yeoman.dist %>/styles/{,*/}*.css',
					'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					'<%= yeoman.dist %>/styles/fonts/*'
				]
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: ['<%= yeoman.app %>/scripts/{,*/}*.js']
		},

		watch: {
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js', '<%= yeoman.app %>/version.json'],
				tasks: ['newer:jshint:all'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['<%= yeoman.app %>/styles/**/*.less'],
				tasks: ['less:development']
			},
			bower: {
				files: ['<%= yeoman.app %>/bower_components/**/*'],
				tasks: ['bowerInstall'],
				options: {
					livereload: true
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['newer:jshint:test', 'karma']
			},
			styles: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
				tasks: ['newer:copy:styles', 'autoprefixer']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		less: {
			development: {
				files: {
					'<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/**/*.less'
				}
			},
			production: {
				options: {
					cleancss: true
				},
				files:{
					'<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/styles/**/*.less'
				}
			}
		},

		connect: {
			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: '127.0.0.1',
				livereload: 35729
			},
			livereload: {
				options: {
					open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>',
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
		},

		uglify: {
			generated: {
				options: {
					sourceMap: true
				}
			}
		},

		bowerInstall: {
			target: {
				src: ['<%= yeoman.app %>/index.html']
			}
		},

		bumpup: {
			files: ['package.json', 'bower.json', '<%= yeoman.app %>/version.json']
		},

		'sftp-deploy': {
			dev: {
				auth: {
					host: 'dev.<%= yeoman.domain %>',
					port: 22,
					authKey: 'devKey'
				},
				src: '<%= yeoman.dist %>',
				dest: '/cdn/<%= yeoman.deployFolder %>',
				exclusions: ['<%= yeoman.dist %>/bower_components/**/*'],
				server_sep: '/'
			},
			test: {
				auth: {
					host: 'test.<%= yeoman.domain %>',
					port: 22,
					authKey: 'testKey'
				},
				src: '<%= yeoman.dist %>',
				dest: '/cdn/<%= yeoman.deployFolder %>',
				exclusions: ['<%= yeoman.dist %>/bower_components/**/*'],
				server_sep: '/'
			},
			prod: {
				auth: {
					host: 'prod.<%= yeoman.domain %>',
					port: 22,
					authKey: 'stageKey'
				},
				src: '<%= yeoman.dist %>',
				dest: '/cdn/<%= yeoman.deployFolder %>',
				exclusions: ['<%= yeoman.dist %>/bower_components/**/*']
			}
		},

		open : {
			test : {
				path: 'http://test.<%= yeoman.domain %>/<%= yeoman.deployFolder %>'
			},
			dev : {
				path: 'http://dev.<%= yeoman.domain %>/<%= yeoman.deployFolder %>'
			},
			prod : {
				path: 'http://prod.<%= yeoman.domain %>/<%= yeoman.deployFolder %>'
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		autoprefixer: {
			options: {
				browsers: ['last 1 version']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/styles/',
					src: '{,*/}*.css',
					dest: '.tmp/styles/'
				}]
			}
		},

		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		concat: {
			options: {
				sourceMap:true
			}
		},

		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html', 'views/**/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'*.html',
						'*.json',
						'views/{,*/}*.html',
						'bower_components/**/*',
						'images/{,*/}*.<%= yeoman.imagesToCopy %>',
						'fonts/*',
						'bower-components/bootstrap-css-only/css/bootstrap.min.css'
					]
				},{
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}, {
					expand: true,
					flatten: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>/fonts',
					src: ['bower_components/components-font-awesome/fonts/*.*']
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		concurrent: {
			server: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		}

	});


	grunt.registerTask('serve', 'Compile then start web server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'bowerInstall',
			'less:development',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'bowerInstall',
		'less:development',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'ngmin',
		'copy:dist',
		'cssmin',
		'uglify',
		'rev',
		'usemin',
		'htmlmin'
	]);

	grunt.registerTask('default', [
		'newer:jshint:all',
		'build'
	]);

	grunt.registerTask('deploy:dev', ['default', 'sftp-deploy:dev']);
	grunt.registerTask('deploy:test', ['default', 'sftp-deploy:test']);
	grunt.registerTask('deploy:prod', ['default', 'sftp-deploy:prod']);
	grunt.registerTask('deployopen:dev', ['default', 'sftp-deploy:dev', 'open:dev']);
	grunt.registerTask('deployopen:test', ['default', 'sftp-deploy:test', 'open:test']);
	grunt.registerTask('deployopen:prod', ['default', 'sftp-deploy:prod', 'open:prod', 'sftp-deploy:test', 'open:test']);
	grunt.registerTask('bump:pre', ['bumpup:prerelease']);
	grunt.registerTask('bump:bug', ['bumpup:patch']);
	grunt.registerTask('bump:minor', ['bumpup:minor']);
	grunt.registerTask('bump:major', ['bumpup:major']);

};
