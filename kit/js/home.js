/* Controllers used in home.html */
(function () {
  "use strict";
  
  
  // Common function to get all player panel profile data
  function getPlayerPanelDate(profile) {
    var profilePanel = profile;
    
    // Set a maximum of visible chars for the panel variable
    profilePanel.locationClamp = clampString(profile.location, 35);
    
    // Sets a maximum of 30 total chars that the hole array elements cannot exceed
    profilePanel.visibleTags = clampArrayByStringLength(profile.tags, 30);
    
    // Set the panel top status label
    profilePanel.professionalLabel = profile.professional*1 ? 'professional' : 'student';
    
    // Country and Gender Flags
    profilePanel.countrySrc = profile.countrySrc || '../static/flags/'+ profile.countryCode.toLowerCase() +'_on.png';
    profilePanel.genderSrc  = '../kit/_images/commonButtons/genderIcon'+ profile.gender.capitalFirstLetter() +'_off.png';
    
    // About
    // Set a maximum of visible chars for the panel variable
    profilePanel.aboutClapm = clampString(profile.about, 140);
    
    return profilePanel;
  }
  
  
  window.ProfilePanelCtrl = function ($scope, $resource) {
    $scope.containerClass = "profileContainer";
    $scope.label          = "Profile";
    $scope.btn            = {
      "href" : "#/edit-profile",
      "title": "Edit Profile",
      "size" : "big",
      "label": "Edit Profile",
      "fn"   : function() {
        $scope.popUp.class = "show";
      }
    };
    $scope.gravatarBtn    = {
      "href"  : "http://www.gravatar.com",
      "size"  : "small",
      "target": "_blank",
      "title" : "Change Your Gravatar from www.gravatar.com",
      "label" : "Change Gravatar"
    };
    
    // Set popUp details
    $scope.popUp = {
      // This name is used for switching between all popUps in the common_pop_up.html include
      "name": "editDetails",
      
      // $scope object that could easily be accessed from all includes
      "form": {
        // Set a default form validation state
        "$valid": true
      },
      
      // General popUp display class
      "class": "hide",
      
      // The CSS class of the popUp middle content
      "contentClass": "profile",
      
      // Shown on the top-left
      "label": "Edit Profile",
      
      // Secure 1 click only on the Footer btn
      "saving": false,
      
      // Footer btns' details
      "btns": [
        // Save btn details
        {
          "label": "Save Details",
          "title": "Save Your Profile Details",
          "href" : "#save-details",
          
          // Manage btn visibility
          "show" : function() {
            return $scope.popUp.form.$valid;
          },
          
          // Btn click event handler
          "click": function() {
            // Check if the btn was already clicked
            if(!$scope.popUp.saving) {
              // Set a disabled view for the btn
              $scope.popUp.btns[0].label = 'Saving...';
              $scope.popUp.btns[0].class = 'on';
              
              // Saving is disabled coz so far the server cannot handle POST requests
              // $scope.profileResource.$save();

              $scope.popUp.btns[0].label = 'Save Details';
              $scope.popUp.btns[0].class = '';
              $scope.popUp.saving        = false;
            }
          }
        },
        
        // Invalid btn details
        {
          "label": "Invalid",
          "title": "Your edit form is Invalid. Please take a look at the fields in red",
          "class": "error",
          
          // Manage btn visibility
          "show" : function() {
            return !$scope.popUp.form.$valid;
          }
        }
      ]
    };
    
    
    // Load Player profile data
    $scope.profileResource = $resource('../jsonapi/player').get(function(profile) {
      var nicknameMinChars, nicknameMaxChars, locationMinChars, locationMaxChars, maxTags, aboutTextMax, professionalStatus;
      
      // Copy the original profile data so we could display it in the popUp
      $scope.profilePopUp = profile;
      
      // The logic behind having a profile clone for the panel is not to change any
      // of the data in the panel before the user save his own changes with the popUp 'Save Details' btn
      $scope.profilePanel = clone(getPlayerPanelDate(profile));
      
      
      // Setting a global user id
      window.USER.id = profile.player_id;
      
      
      // Setting profile data
      
      // Name
      // Set a range between nicknameMinChars and nicknameMaxChars chars for player's nickname
      nicknameMinChars        = 2;
      nicknameMaxChars        = 200;
      $scope.nicknameRegExp   = new RegExp('^.{'+ nicknameMinChars +','+ nicknameMaxChars +'}$');
      $scope.nicknameErrorMsg = 'Your name must be between '+ nicknameMinChars +' and '+ nicknameMaxChars +' characters';
      
      // Location 
      // Set a range between locationMinChars and locationMaxChars chars to descript the player's location
      locationMinChars        = 2;
      locationMaxChars        = 1000;
      $scope.locationRegExp   = new RegExp('^.{'+ locationMinChars +','+ locationMaxChars +'}$');
      $scope.locationErrorMsg = 'Your location must be described in between '+ locationMinChars +' and '+ locationMaxChars +' characters';
      
      
      // Gender options
      $scope.profilePopUp.genders = ['secret', 'male', 'female'];
      
      
      // Year of Birth
      // Validating a time frame between 1912 and 2002
      // or anyone between the age of 10 upto 100
      $scope.yearRegExp   = new RegExp(/^(19((1[2-9])|([2-9]\d)))|(200[0-2])$/);
      $scope.yearErrorMsg = 'Please enter a year between 1912 and 2002';
      
      
      // Tags
      // Gets all tags and set them in a single string
      $scope.profilePopUp.tagsAsText = $scope.profilePopUp.tags.join(', ');
      
      // Validates all tag's combinations and sets a limit of maxTags
      maxTags             = 50;
      $scope.tagsRegExp   = new RegExp('^([^,]{2,},[ ]+){0,'+ (maxTags-1) +'}([^,]{2,})?$');
      $scope.tagsErrorMsg = 'Please follow the syntax of "tag1, tag2, ..., tagN" for maximum of '+ maxTags +' tags';
      
      
      // Professional option and label 
      $scope.profilePopUp.professionalOption = profile.professional*1;
      professionalStatus                     = $scope.profilePopUp.professionalOption ? 'professional' : 'student';
      
      // Specify the panel background image regarding the professional status
      $scope.containerClass += " " + professionalStatus;
      
      
      // Any text above aboutTextMax chars will be invalid
      aboutTextMax         = 1000;
      $scope.aboutRegExp   = new RegExp('^.{0,'+ aboutTextMax +'}$');
      $scope.aboutErrorMsg = 'The message about yourself cannot exceed more than '+ aboutTextMax +' characters';
    });
  };


  window.BadgesPanelCtrl = function ($scope, $resource) {
    $scope.containerClass = "badgesContainer";
    $scope.label          = "Badges";
    $scope.btn            = {
      "href" : "badges.html",
      "title": "View Badges",
      "size" : "big",
      "label": "View Badges"
    };
    
    // Check if some controller have alreasy load the user id
    if(window.USER.id) {
      loadUserBadges(window.USER.id);
    } else {
      $resource('../jsonapi/player_test').get(function(profile) {
        // Setting a global user id
        window.USER.id = profile.player_id;
        
        loadUserBadges(window.USER.id);
      });
    }
    
    
    // Load all user badges regardin sent user id
    function loadUserBadges(id) {
      $scope.badgesResource = $resource('../jsonapi/badges_for_current_player/'+ id).get(function(badgesResource) {
        $scope.badgesResource = badgesResource;
        
        $scope.badges_type = $scope.badgesResource.type;
        $scope.badges      = $scope.badgesResource.badges;
      });
    }
  };


  window.ChallengesPanelCtrl = function ($scope) {
    $scope.containerClass = "challengesContainer";
    $scope.label          = "Challenges";
    $scope.btn            = {
      "href" : "challengeBoard.html",
      "title": "Challenge Board",
      "size" : "big",
      "label": "Challenge Board"
    };
  };


  window.RankingPanelCtrl = function ($scope, $resource) {
    $scope.containerClass = "rankingContainer";
    
    $resource('../jsonapi/fullRankingPlayers').get(function (ranking) {
      var i, player, rank;
      
      $scope.label = ranking.path_description + " Rankings";
      $scope.btn   = {
        "href" : "ranking.html?path_id="+ ranking.path_id,
        "title": "View Rankings",
        "size" : "big",
        "label": "View Rankings"
      };
      
      $scope.players = ranking.players;
      for(i in $scope.players) {
        player = $scope.players[i];
        
        // Setting rank image properties
        rank        = player.rank;
        player.rank = {
          "src": "_images/commonButtons/numbers/number0"+ rank +".png",
          "alt": "Rank "+ rank
        };
        
        // Setting rank image properties
        player.gravatar = {
          "src": player.gravatar,
          "alt": player.name +"'s gravatar"
        };
        
        // Setting the max chars per player name
        player.fullName = player.name;
        player.name     = clampString(player.fullName, 20);
      }
    });
    
    
    // Load the Ranked Player popUp with a player date indicated from the income index
    $scope.showRankedPlayer = function (index) {
      var player = clone($scope.players[index]);
      
      // Load popUp fields
      player.nickname   = player.fullName;
      player.gravatar   = player.gravatar.src;
      player.countrySrc = player.playerCountryFlagURL;
      
      // Get a comman usable profile data
      $scope.profilePanel = getPlayerPanelDate(player);
      
      // Show the loaded popUp
      $scope.popUp.class = 'show';
      
      // Set the popUp background
      $scope.popUp.contentClass = $scope.popUp.contentClassMain +" "+ $scope.profilePanel.professionalLabel.toLowerCase();
    }
    
    
    // Set popUp details
    $scope.popUp = {
      // This name is used for switching between all popUps in the common_pop_up.html include
      "name": "rankedPlayer",
      
      // The CSS class of the popUp middle content
      "contentClassMain": "rankedPlayerPopUp",
      
      // General popUp display class
      "class": "hide",
      
      // Shown on the top-left
      "label": "Profile",
      
      // Indicate no footer btns
      "btns": []
    };
  };
  
}())