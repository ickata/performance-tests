/** 
 * "Test" performance test
 *
 * The script will generate a program filled with time debug lines out of a source file.
**/

// load Node modules
['recast', 'fs', 'path'].forEach( function ( module ) {
   this[ module ] = require( module );
});

// The file we're going to use as source, parse, traverse, insert debug lines,
// and finally generate new file containing the performance test debug lines.
var file_name  = '/test.js';

// read the original file
fs.readFile( path.resolve(__dirname, '../web/Scripts') + file_name, 'utf8', function ( error, content ) {
   if ( error ) {
      console.log( 'Error reading file' );
      return;
   }
   
   var parsed  = recast.parse( content );
   // we're now going to modify the `execute` method & will insert debug lines
   var execute = parsed.program.body[1].expression.right.properties[1].value.body;
   // print a debug line (time start) at the top of the method
   execute.body.unshift( recast.parse( "console.time('execute');" ).program.body[0] );
   // print a debug line (time end) after the API call is complete
   execute.body[1].expression.arguments[0].body.body.unshift(
      recast.parse( "console.timeEnd('execute');" ).program.body[0]
   );
   // generate the new output
   var output = recast.prettyPrint( parsed, { tabWidth: 3 }).code;
   // Put the output into a new file. This file will be served if we have
   // started our server with performance testing in mind. 
   // Otherwise the regular static file will be served.
   fs.writeFile( path.resolve(__dirname, 'Scripts') + file_name, output );
});