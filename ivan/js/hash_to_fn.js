/**
 * Listen for any hash change in the browser address bar.
 * If any hash appears, checkHash() function invoke triggerHash(), if needed,
 * which looks for any associated functions for the respected hash
 */
(function () {
  "use strict";
  
  // Global hash change callback register
  window.hashes = {};
  
  
  // Add a callback function to a specific hash
  window.onHash = function (hash, callback) {
    // if this is the first instance for this hash we'll create a ready-to-use arrays to be filled with callback functions
    if (!window.hashes[hash]) {
      window.hashes[hash] = [];
    }
    
    // Push the income callback function to its specific hash key
    window.hashes[hash].push(callback);
  };
  
  
  /**
  * Run all callback functions (if any) for a specific hash
  * A parameter hash functionality is added
  * Example:
  *    if we want to run a specific event for a strict hash we use
  *    onHash('#/load-home-page', function () { loadHomePage(); ... })
  *    the function will be triggered when the hash became '#/load-home-page'
  *
  *    if we want to keep track for a specific parameter after the hash string we use
  *    onHash('#/load-page-*', function (pageNumber) { loadPage(pageNumber); ... })
  *    the function will be triggered when the hash became '#/load-page-1', '#/load-page-2', ... '#/load-page-n'
  *    and all after the string '#/load-page-' will be send as a parameter
  */
  window.triggerHash = function (hash) {
    var savedHash, callbacks, parameterHash, isParameterHash, parameter, totalCallbacks, i;
    
    // Search for a match through all saved hashes
    for (savedHash in window.hashes) {
      // Getting all callback functions
      callbacks = window.hashes[savedHash];
      
      // Chech if there's a parameter hash match
      parameterHash   = savedHash.split('*');
      isParameterHash = !hash.indexOf(parameterHash[0]) && parameterHash.length == 2 && parameterHash[1] == '';
      parameter       = isParameterHash ? hash.replace(parameterHash[0], '') : undefined;
      
      // Run all callback functions only if there's a perfect match or a parameter hash match
      if (hash == savedHash || isParameterHash) {
        // Run all callback functions for the specific hash key
        // Cache the number of all callback functions for maximum loop performance
        for (i=0, totalCallbacks = callbacks.length; i<totalCallbacks; i++) {
          callbacks[i].call(window, parameter);
        }
      }
    }
  };
  
  
  /**
  * Create an alternative to jQuery onhashchange event
  * if there's a change in the page address hash
  * well remove the hash from the address and trigger a global event with the hash key
  */
  function checkHash() {
    // Get the window hash key
    var hash = window.location.hash;
    
    // Check if there was a hash at all
    if (hash) {
      // Remove the hash from the address bar
      window.location.hash = '';
      
      // Trigger a global hash event
      window.triggerHash(hash);
    }
  }
  
  
  // As soon as the page load the file
  // we'll strart scanning for any page address change
  addEvent(window, 'load', function () {
    setInterval(checkHash, 100);
  });
  
}())