/* Controllers used in home.html */

// 
function loadBadge($scope, badge) {
  /*
  setTimeout(function() {
    $scope.metaData = {
      "title"      : "2 Congratulations on "+ badge.header,
      "description": "2 "+ badge.description,
      "image"      : "2 "+ badge.image
    };
    
    log('Change 1');
  }, 3000);
  */
  
  
  onHash('#/new-badge/*', function (badgeNumber) {
    log('load badge '+ badgeNumber);
    
    log($scope.metaData.title);
    $scope.metaData.title = "New Page Title";
    
  });
  
  
  // 
  $scope.metaData = {
    "title"      : "Congratulations on "+ badge.header,
    "description": badge.description,
    "image"      : badge.image
  }
}


// Handles the page meta data
function newBadgeHeaderCtrl($scope, $resource) {
  // Load all new Badges
  $scope.newBadges = $resource('../jsonapi/newbadges').query(function(newBadges) {
    loadBadge($scope, newBadges[0]);
  });
}


// Handles the shown popUp
function newBadgePopUpCtrl($scope) {
  
  /*
  setTimeout(function() {
    
    log($scope.popUp.label);
    $scope.popUp.label = "2 Badge Information";
    
    document.body.click();
    // $('.popUp .container .mainContent').click()
    
    log('Change 2');
  }, 3000);
  */
  
  
  // Main content class
  $scope.contentClass = "newBadge";
  
  // Set popUp details
  $scope.popUp = {
    // This name is used for switching between all popUps in the common_pop_up.html include
    "name": "newBadge",
    
    // General popUp display class
    "class": "show",
    
    // Shown on the top-left
    "label": "Badge Information",
    
    // Continue Playing btn details
    "btns": [
      {
        "label": "Continue Playing",
        "title": "Continue Playing",
        
        // Manage btn visibility
        "show" : function() { return true }
      }
    ],
    
    // Execute when the popUp is been closed/hidded
    "onClose": function() {
      triggerHash('#/new-badge/1');
    }
  }
}
