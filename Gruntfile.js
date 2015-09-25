module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    releasePath: 'release/<%= pkg.name %>-<%= pkg.version %>',
    modulesStaticPath: '<%= pkg.modulesStaticPath %>', 
    
    clean: {
    	dist: {
	    	src: ['<%= releasePath %>', '<%= releasePath %>.zip']
    	},
    	module: {
	    	options: {force: true},
	    	src: ['<%= modulesStaticPath %>/<%= pkg.name %>']
	  	}
    },
    
    auto_install: {
      local: {}
    },
    
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      scripts: {
        files: ['debug.html', 'src/main/javascript/**/*.js'],
        tasks: ['jshint:js'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js',
        options: {
            node: true,
            es3: true
        }
      },
      js: {
        src: ['src/main/javascript/**/*.js'],
        options: {
            browser: true,
            es3: true,
            '-W069': false, // do not require dot notation
            '-W065': false, // do not require parseInt radix
            '-W030': false, // allow bla && func() expressions
            // TODO: enable these to be even stricter about source code linting
            /*curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: true,
            boss: true,
            eqnull: true,*/
            globals: {
                'Ext': true,
                'OpenLayers': true,
                'GeoExt': true,
                'AdmClient': true,
				'OpenEMap': true
            }
        }
      }
    },
    
    sencha: {
      release: {
        command: [
            '-sdk bower_components/ext-4.2.1',
            'compile',
            '--classpath=src/main/javascript,bower_components/geoext2/src,bower_components/OpenEMap/src/main/javascript',
            'exclude -all', 'and',
            'include -namespace AdmClient', 'and',
            'concat --closure <%= releasePath %>/<%= pkg.name %>-<%= pkg.version %>-min.js']
      },
      debug: {
        command: [
            '-sdk bower_components/ext-4.2.1',
            'compile',
            '--classpath=src/main/javascript,bower_components/geoext2/src,bower_components/OpenEMap/src/main/javascript',
            'exclude -all', 'and',
            'include -namespace AdmClient', 'and',
            'concat <%= releasePath %>/<%= pkg.name %>-<%= pkg.version %>-debug.js']
      },
      geoext_release: {
        command: [
            '-sdk bower_components/ext-4.2.1',
            'compile',
            '--classpath=bower_components/geoext2/src',
            'exclude -all', 'and',
            'include -namespace GeoExt', 'and',
            'concat --closure bower_components/geoext2/release/geoext-all.js']
      },
      geoext_debug: {
        command: [
            '-sdk bower_components/ext-4.2.1',
            'compile',
            '--classpath=bower_components/geoext2/src',
            'exclude -all', 'and',
            'include -namespace GeoExt', 'and',
            'concat bower_components/geoext2/release/geoext-debug.js']
      },
      openemap_release: {
        command: [
            '-sdk bower_components/ext-4.2.1',
            'compile',
            '--classpath=bower_components/OpenEMap/src/main/javascript,bower_components/geoext2/src',
            'exclude -all', 'and',
            'include -namespace OpenEMap', 'and',
            'concat --closure bower_components/OpenEMap/release/OpenEMap-min.js']
      },
      openemap_debug: {
        command: [
            '-sdk bower_components/ext-4.2.1',
            'compile',
            '--classpath=bower_components/OpenEMap/src/main/javascript,bower_components/geoext2/src',
            'exclude -all', 'and',
            'include -namespace OpenEMap', 'and',
            'concat bower_components/OpenEMap/release/OpenEMap-debug.js']
      }
    },
    
    copy: {
        dist: {
            files: [
            { expand: true, cwd: 'resources/images/', src: ['**'], dest: '<%= releasePath %>/resources/images/' },
            { expand: true, cwd: 'resources/font-awesome/black/png/16/', src: ['**'], dest: '<%= releasePath %>/resources/font-awesome/black/png/16/' },
            { expand: true, cwd: 'resources/font-awesome/black/png/22/', src: ['**'], dest: '<%= releasePath %>/resources/font-awesome/black/png/22/' },
            { expand: true, cwd: 'bower_components/ext-4.2.1/resources/ext-theme-neptune/', src: ['**'], dest: '<%= releasePath %>/lib/ext/resources/ext-theme-neptune/' },
            { expand: false, src: ['bower_components/ext-4.2.1/ext-all.js'], dest: '<%= releasePath %>/lib/ext/ext-all.js' },
            { expand: false, src: ['bower_components/ext-4.2.1/ext-all-debug.js'], dest: '<%= releasePath %>/lib/ext/ext-all-debug.js' },
            { expand: false, src: ['bower_components/ext-4.2.1/ext-theme-neptune.js'], dest: '<%= releasePath %>/lib/ext/ext-theme-neptune.js' },
            { expand: false, src: ['bower_components/ext-4.2.1/locale/ext-lang-sv_SE.js'], dest: '<%= releasePath %>/lib/ext/locale/ext-lang-sv_SE.js' },
            { expand: false, src: ['bower_components/OpenLayers-2.13.1/OpenLayers.js'], dest: '<%= releasePath %>/lib/OpenLayers/OpenLayers.js' },
            { expand: false, src: ['bower_components/OpenLayers-2.13.1/OpenLayers.debug.js'], dest: '<%= releasePath %>/lib/OpenLayers/OpenLayers.debug.js' },
            { expand: true, cwd: 'bower_components/OpenLayers-2.13.1/', src: ['theme/**'], dest: '<%= releasePath %>/lib/OpenLayers/'},
            { expand: false, src: ['bower_components/geoext2/release/geoext-all.js'], dest: '<%= releasePath %>/lib/geoext/geoext-all.js'},
            { expand: false, src: ['bower_components/geoext2/release/geoext-debug.js'], dest: '<%= releasePath %>/lib/geoext/geoext-debug.js'},
            { expand: false, src: ['bower_components/OpenEMap/release/OpenEMap-min.js'], dest: '<%= releasePath %>/lib/OpenEMap/OpenEMap-min.js'},
            { expand: false, src: ['bower_components/OpenEMap/release/OpenEMap-debug.js'], dest: '<%= releasePath %>/lib/OpenEMap/OpenEMap-debug.js'},
            { expand: false, src: ['<%= releasePath %>/<%= pkg.name %>-<%= pkg.version %>-min.js'], dest: '<%= releasePath %>/<%= pkg.name %>-min.js' },
            { expand: false, src: ['<%= releasePath %>/<%= pkg.name %>-<%= pkg.version %>-debug.js'], dest: '<%= releasePath %>/<%= pkg.name %>-debug.js' },
            { expand: false, src: ['src/main/javascript/<%= pkg.name %>.js'], dest: '<%= releasePath %>/<%= pkg.name %>.js' },
            { expand: false, src: ['oeadmin.css'], dest: '<%= releasePath %>/' },
            { expand: false, src: ['debug_factory.html'], dest: '<%= releasePath %>/' },
            { expand: false, src: ['admin.json'], dest: '<%= releasePath %>/' },
            { expand: false, src: ['src/main/javascript/OpenEMapAdmin.js'], dest: '<%= releasePath %>/OpenEMapAdmin.js' }
            ]        
        },
        module: {
            files: [
          		{ expand: true, cwd: '<%= releasePath %>/', src: ['**'], dest: '<%= modulesStaticPath %>/<%= pkg.name %>' }
          	]
        }
    },
    
    connect: {
        options: {
            base: ['./'],
            middleware: function (connect, options) {
             var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
             return [
                proxy,
                connect['static'](options.base[0]),
                connect.directory(options.base[0])
             ];
          }
        },
        proxies: [{
            context: '/search/lm',
            host: 'kartatest.e-tjansteportalen.se',
            https: true,
            port: 443
        }, {
            context: '/search/es',
            host: 'kartatest.e-tjansteportalen.se',
            https: true,
            port: 443
        }, {
            context: '/geoserver/wfs?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=SundsvallsKommun:Busslinje_linje',
            host: 'localhost',
            https	: false,
            port: 8000,
            rewrite: {
            	'^/geoserver/wfs?service=wfs&request=DescribeFeatureType&version=1.0.0&typeName=SundsvallsKommun:Busslinje_linje': '	/Busslinje_linje.xml'
            }
        }, {
            context: '/geoserver/wms',
            host: 'extmaptest.sundsvall.se',
            https: true,
            port: 443
        }, {
            context: '/print',
            host: 'localhost',
            https: false,
            port: 8080
        }, {
            context: '/openemapadmin',
            host: 'localhost',
            https: false,
            port: 80
        }, {
            context: '/openemapadmin-1.6.1',
            host: 'kartatest.e-tjansteportalen.se',
            https: true,
            port: 443
        }, {
            context: '/cgi-bin/proxy.py?url=',
            host: 'kartatest.e-tjansteportalen.se',
            https: true,
            protocol: 'https',
            port: 443
        }]
    },
    
    compress: {
      main: {
        options: {
          archive: 'release/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          { expand: true, cwd: '<%= releasePath %>', src: ['**'] }
        ]
      }
    }
  });

//  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-sencha-build');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['default', 'sencha:release', 'sencha:debug'] );
  grunt.registerTask('buildall', ['default', 'sencha:release', 'sencha:debug', 'sencha:geoext_release', 'sencha:geoext_debug', 'sencha:openemap_release', 'sencha:openemap_debug'] );
  grunt.registerTask('distcopy', ['copy:dist', 'compress']);
  grunt.registerTask('dist', ['clean:dist', 'build', 'copy:dist', 'compress']);
  grunt.registerTask('copytomodule', ['clean:module', 'copy:module']);
  grunt.registerTask('devserver', ['default', 'configureProxies', 'connect', 'watch']);
};
