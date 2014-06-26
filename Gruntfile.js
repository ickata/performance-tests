module.exports = function ( grunt ) {
   
   // load grunt tasks
   [
      'grunt-run',
      'grunt-open',
      'grunt-contrib-watch',
      'grunt-contrib-connect'
   ].forEach( grunt.loadNpmTasks.bind( grunt ) );
   
   // configure
   grunt.initConfig({
      // connect (serve) module
      connect : {
         // This is the sub-task which will start a "regular" serving,
         // e.g. w/o performance test debugging lines.
         regular  : {
            options  : {
               port        : 9000,
               middleware  : function ( connect ) {
                  return [
                     connect.static( require('path').resolve('web') )   // return the "web" directory as root
                  ];
               }
            }
         },
         // This is the sub-task which will start a "perftest" serving,
         // e.g. with performance test debugging lines.
         perftest : {
            options  : {
               port        : 9000,
               middleware  : function ( connect ) {
                  var path = require('path');
                  return [
                     connect.static( path.resolve('Tests') ),           // serve files from "Tests" directory with priority
                     connect.static( path.resolve('web') )
                  ];
               }
            }
         }
      },
      // configuration for "open" module
      open     : {
         server   : {
            path     : 'http://localhost:9000'
         }
      },
      watch    : {
         // this is just to prevent server from dying
      },
      run      : {
         options  : {
            cwd      : './'               // current working directory
         },
         perftest : {
            args     : ['Tests/test.js']  // the default cmd is `node`
         }
      }
   });
   
   // Start a "regular" server
   grunt.registerTask( 'start:regular', 'Serve regular resources', [
      'connect:regular',   // start a regular server
      'open',              // open the project in the browser
      'watch'              // don't kill the server yet...
   ]);
   // Start a server that will serve files with performance tests in them
   grunt.registerTask( 'start:perftest', 'Serve resources with performance tests', [
      'run',               // generate the files with performance debuggers
      'connect:perftest',  // start the server, which will serve the above static files
      'open',              // open the project in the browser
      'watch'              // don't kill the server yet...
   ]);
   
};