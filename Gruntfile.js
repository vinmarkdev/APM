module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
        
        /** minific all js files */
		uglify: {
			options: {
				compress: true,
				mangle: true
			},
			app: {
				src: './public/dist/app.js',
				dest: './public/dist/app.js'
			},
			libs: {
				src: './public/dist/libs.js',
				dest: './public/dist/libs.js'
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: './public/dist',
					src: ['*.css', '!libs.css'],
					dest: './public/dist',
					ext: '.min.css'
				}]
			}
		},
        
        /** remove files from folder */
        clean: {
			app: ['./public/dist/app.js'],
			libs: ['./public/dist/libs.js', './public/dist/libs.css'],
			style: ['./public/dist/app.css', './public/dist/app.min.css']
		},
        
        /** concat libs files */
		concat: {
			libs: {
				src: [

                    './node_modules/jquery/dist/jquery.js',

                    './node_modules/angular/angular.js',
                    './node_modules/angular-ui-router/release/angular-ui-router.js',

					'./node_modules/angular-messages/angular-messages.js',
					'./node_modules/angular-cookies/angular-cookies.js',

					'./node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
					'./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',

				],
				dest: './public/dist/libs.js'
			},
		},
        
        
        /** for browser */
		browserify: {
			app: {
				options: {
					browserifyOptions: {
						debug: true
					},
					plugin: [
                        [
                            'remapify', [
                            	{
									src: '**/*.js',
									expose: 'controllers',
									cwd: './app/controllers'
								},
								{
                                    src: '**/*.js',
                                    expose: 'models',
                                    cwd: './app/models'
                                },
								{
                                	src: '**/*.js',
                                	expose: 'directives',
                                	cwd: './app/directives'
                                },
								{
									src: '**/*.js',
									expose: 'factory',
									cwd: './app/factory'
								},
								{
									src: '**/*.js',
									expose: 'services',
									cwd: './app/services'
								},
                                {
                                    src: '**/*.js',
                                    expose: 'modals',
                                    cwd: './app/modals'
                                }
                            ]
                        ]
					]
				},
				files: {
					'./public/dist/app.js': './app/**/*.js'
				}
			}
		},
        
        
        /** looking for changes */
		watch: {
			options: {
				spawn: true,
				livereload: true
			},
			noProcess: {
				files: [
                    './app/views/**/*.html',
                    './*.html'
				]
			},
			scripts: {
				files: [
				    './app/**/*.js'
				],
				tasks: ['compile']
			},
			css: {
				files: ['./app/styles/**/*.scss'],
				tasks: ['sass']
			}
		},
        
        /** compile scss files */
        sass: {
	        dist: {
	            sourceMap: true,
	            files: {
	                './public/dist/app.css': './app/styles/compile.scss'
	            }
	        }
	    },
        
        /** concat lib css */
		concat_css: {
			options: {
				// Task-specific options go here.
			},
			libs: {
				src: [
					"./other_modules/bootstrap/dist/css/bootstrap.min.css",
					"./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
					"./other_modules/font-awesome/css/font-awesome.min.css"
					],
				dest: "./public/dist/libs.css"
			},
		},
	});

	/** concat all needed css files */
	grunt.loadNpmTasks('grunt-concat-css');

	/** concat all needed js files */
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	/** for set mapping for files */
	grunt.loadNpmTasks('grunt-browserify');

	/** minific files */
	grunt.loadNpmTasks('grunt-contrib-uglify');

	/** Need for look if something changes */
	grunt.loadNpmTasks('grunt-contrib-watch');

	/** Need to sass task */
	grunt.loadNpmTasks('grunt-contrib-sassjs');

	/** Need to remove files before compile */
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-contrib-cssmin');


	/** tascks */
	grunt.registerTask('default', ['app', 'libs', 'watch']);

	grunt.registerTask('compile', ['clean:app', 'browserify:app']);
	grunt.registerTask('app', ['compile', 'sass']);

	grunt.registerTask('libs', ['clean:libs', 'concat:libs', 'concat_css:libs']);

	grunt.registerTask('release', ['libs', 'app', 'uglify', 'cssmin']);
};