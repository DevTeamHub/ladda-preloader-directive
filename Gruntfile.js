module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['dist'],
    uglify: {
      my_target: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/preloader-directive.min.js': ['src/preloader-directive.js']
        }
      }
    },
    copy: {
        main: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['preloader-directive.js'],
                dest: 'dist/'
            }]
        }
    }
  });

  grunt.registerTask('build', ['clean', 'uglify', 'copy']);

};