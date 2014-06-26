function Test(options) {
   this.options = options;
}

Test.prototype = {
   constructor: Test,

   execute: function() {
      console.time("execute");

      setTimeout(function() {
         console.timeEnd("execute");
         alert("Test API complete.");
      }, 200 + Math.random() * 500);
   }
};