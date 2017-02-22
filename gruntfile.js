
module.exports = function(grunt){

    grunt.initConfig({
        watch:{
            jade:{
                files:['app/views/**/*.jade'],
                options:{
                    livereload:true
                }
            },
            js:{
                files:['public/js/**/*.js','app/**/*.js'],
                //tasks:['jshint'],
                options:{
                    livereload:true
                }
            }
        },
        nodemon: {
            dev: {
                options: {
                    file: "app.js",
                    args: [],
                    ingoredFiles: ["README.md", "node_modules/**", ".DS_Store"],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent:{
            tasks:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    });
    grunt.option('force',true);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');



    grunt.registerTask('default',['concurrent']);
}
