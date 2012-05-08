/* Controllers used in home.html */
(function () {
  "use strict";
  
  // Shared resources between controllers and common loading badge function
  var sharedScope = {
    "header"  : null,
    "popUp"   : null,
    "resource": null,
    "badges"  : null
  },
  // Keep track for the shown badges from the badges array
  badgeNumber;
  
  
  /**
   * Common loading badge function
   * Loads each badge till it shown all new badges from the /jsonapi/newbadges
   * @param number indicate which badge from the common array is needed to be loaded
   */
  function loadBadge(number) {
    var badge;
    
    // Secure a badge number
    badgeNumber = number * 1 || 1;
    
    // Check if we've load all new badges
    if (!sharedScope.badges) {
      
      // Load all new Badges
      sharedScope.badges = sharedScope.resource('../jsonapi/newbadges').query(function(newBadges) {
        // Cache new badges
        sharedScope.badges = newBadges;
        
        // Call the loading badges function again since we have all the badges loaded
        loadBadge(badgeNumber);
      });
    
    } else {
      
      // Load badge regarding the income number
      badge = sharedScope.badges[badgeNumber-1];
      
      // Chech if there's any not shown badges left
      if (badge) {
        // Loads all headed page meta data
        sharedScope.header.metaData = {
          "title"      : "Congratulations on your "+ badge.header,
          "description": badge.description,
          "image"      : badge.image
        };
        
        // Loads all popUp body data
        sharedScope.popUp.popUp = {
          // This name is used for switching between all popUps in the common_pop_up.html include
          "name": "newBadge",
          
          // General popUp display class
          "class": "show",
          
          // The CSS class of the popUp middle content
          "contentClass": "newBadge",
          
          // Shown on the top-left
          "label": "Badge Information",
          
          // Image attributes
          "image": {
            "src": badge.image,
            "alt": badge.header
          },
          
          // Left column header
          "header": clampString(badge.header, 20),
          
          // Left column badge explanation
          "explanation": clampString(badge.explanation, 190),
          
          // Right column description
          "description": clampString(badge.description, 150),
          
          // Continue Playing btn details
          "btns": [
            {
              "label": "Continue Playing",
              "title": "Continue Playing",
              
              // Manage btn visibility
              "show" : function() { return true; }
            }
          ],
          
          // Execute when the popUp is been closed/hidded
          "onClose": function() {
            loadBadge(++number);
          }
        };
      }
    }
  }


  // Handles the page meta data
  window.newBadgeHeaderCtrl = function ($scope, $resource) {
    // Create an event handler to seek for any badge URL request
    onHash('#/new-badge/*', loadBadge);
    
    // Share the page header scope and $resource module
    sharedScope.header   = $scope;
    sharedScope.resource = $resource;
  };


  // Handles the shown popUp
  window.newBadgePopUpCtrl = function ($scope) {
    // Share the popUp body scope
    sharedScope.popUp = $scope;
  };
  
  
  // Load the initial badge when the page is fully loaded
  window.onload = function () {
    loadBadge();
  };
  
}())