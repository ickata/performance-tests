/** 
 * @class Test
 *
 * A very simple constructor object which makes a dummy "API" call
 * Used for testing performance test utility
**/
function Test( options ) {
   this.options = options;
}

Test.prototype = {
   constructor : Test,
   execute     : function () {
      setTimeout( function () {
         alert('Test API complete.');
      }, 200 + ( Math.random() * 500) );
   }
};