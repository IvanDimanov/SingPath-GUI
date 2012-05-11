// Common tests

// Testing element cloak removal from the element selector
function testCloak(selector) {
  expect(element(selector).attr('ng-cloak')).not().toBeDefined();
}


// Test the image base and hover URLs
function testImageBaseAndHover(imageSelector, imagesUrl) {
  // Test image base URL
  expect(element(imageSelector).css('background-image')).toMatch('^url\\("?http(.)+'+ imagesUrl +'_off.png"?\\)$');
  
  // Get image current class
  expect(element(imageSelector).attr('class')).value(function(currentClass) {
    // Set image respective hover class
    hoverClass = currentClass ? currentClass+' hover' : 'hover';
    element(imageSelector).attr('class', hoverClass);
    
    // Update main image selector with the hover class
    imageSelector = currentClass ? imageSelector.replace(currentClass, hoverClass.replace(' ', '.')) : imageSelector+'.hover';
    
    // Test image hover URL
    expect(element(imageSelector).css('background-image')).toMatch('^url\\("?http(.)+'+ imagesUrl +'_on.png"?\\)$');
  });
}


// Test all options from a given resource in a respected element from a given container selector
function testMenuOptions(options, containerSelector, selectedOptionClass) {
  // General test options function
  function test(windowPath) {
    windowHref = selectedOptionClass ? windowPath.substr(windowPath.lastIndexOf('/')+1) : '';
    
    // Test all options
    for(i in options) {
      option = options[i];
      
      // Test selected menu option if needed
      if(windowHref == option["href"] && selectedOptionClass) {
        expect(element(containerSelector + ' > a:eq('+ i +')').attr("class")).toMatch(selectedOptionClass);
      }
      
      // Test all the rest option properties
      $link = element(containerSelector + ' > a:eq('+ i +')');
      
      expect($link.text()).toBe(option["text"]);
      expect($link.attr("href")  ).toBe(option["href"]);
      expect($link.attr("target")).toBe(option["target"]);
      expect($link.attr("title") ).toBe(option["title"]);
    }
  }
  
  // Getting window path if needed
  if (selectedOptionClass) {
    browser().window().path().execute(function(data, windowPath) { test(windowPath) });
  } else {
    test();
  }
}


// Test all Page Head Elements
function testPageHead() {
  testSiteLogo();
  testUserLoginMenu();
  testHeadMenuOptions();
}


// Test the site top left logo
function testSiteLogo() {
  logoSelector = '#logo';
  $logo        = element(logoSelector);
  
  // Test link properties
  expect($logo.attr('href' )).toBe('index.html');
  expect($logo.attr('title')).toBe('SingPath Logo');
  
  // Test the logo base and hover URLs
  testImageBaseAndHover(logoSelector, '/static/_images/landing_pages/landing_page_buttons/singpath_logo');
}


// Test the user login info or login menu elements
function testUserLoginMenu() {
  player = {
    "player_id": 57733,
    // "player_id": "NA",
    "gravatar" : "http://www.gravatar.com/avatar/ff255e745f42e8617e7d19e69cccd2f5/?default=&amp;s=80",
    "nickname" : "Mark Zuckerberg"
  }
  
  // Simulation of setting the Global USER var
  USER_loggedIn = getUserLoggedInStatus(player);
  
  // If the user is logged in we'll perform a test over his main info in the user top menu
  if(USER_loggedIn) {
    userMenuSelector = '#userMenu';
    
    // Testing user home btn properties and images
    homeBtnSelector = userMenuSelector + ' > .homeBtn';
    $homeBtn        = element(homeBtnSelector);
    expect($homeBtn.attr('href' )).toBe('home.html');
    expect($homeBtn.attr('title')).toBe('Return to Your Home page');
    
    testImageBaseAndHover(homeBtnSelector, '/static/_images/landing_pages/landing_page_buttons/house_profile');
    
    
    // Testing user main info
    expect(element(userMenuSelector + ' > .gravatar').attr('src')).toBe(player.gravatar);
    expect(element(userMenuSelector + ' > .nickname').text()     ).toBe(player.nickname);
    
    // Testing user shop btn properties and images
    shopBtnSelector = userMenuSelector + ' > .shopBtn';
    $shopBtn        = element(shopBtnSelector);
    
    expect($shopBtn.attr('href' )).toBe('shop.html');
    expect($shopBtn.attr('title')).toBe('Go to the SingPath Shop');
    
    testImageBaseAndHover(shopBtnSelector, '/static/_images/landing_pages/landing_page_buttons/shopping_trolley');
    
    // Test sign out btn visibility
    $signOutBtn = element('#menuFooterTop > [ng-switch=""] > a');
    expect($signOutBtn.attr('href' )).toBe('sign_out');
    expect($signOutBtn.attr('title')).toBe('Sign out from Your Profile');
    expect($signOutBtn.text()       ).toMatch('sign out');
    
  } else {
    // if the user isn't logged in we'll perform test over the log in elements
    
    logInBoxSelector = '#logInBox';
    
    // Test message box greetings text
    expect(element(logInBoxSelector + ' > .messageBox').text()).toMatch('Welcome, please sign in to your account');
    
    // Test commonBtn properties
    commonBtnSelector = logInBoxSelector + ' > .commonBtn';
    expect(element(commonBtnSelector).attr('title')).toBe('Sign in to SingPath');
    expect(element(commonBtnSelector + ' > .middle').text()).toMatch('Sign In');
    
    // Test sign out btn visibility
    expect(element('#menuFooterTop > [ng-switch=""] > a')).not().toBeDefined();
  }
}


// Testing all Head Menu options
function testHeadMenuOptions() {
  // Loading window path
  expect(browser().window().path()).value(function(path) {
    // Note: It's important to load the options after the execution of expect(...).value()
    //       coz otherwise testMenuOptions() could mix vars with other testMenuOptions() calls
    options = [
      {"text": "Play"        , "href": "home.html"        , "target": "", "class": "", "title": "SingPath - The Most Fun Way to Practice Software"},
      {"text": "Splash"      , "href": "index.html"       , "target": "", "class": "", "title": "Splash"},
      {"text": "About Us"    , "href": "aboutUs.html"     , "target": "", "class": "", "title": "About Us"},
      {"text": "How to Use"  , "href": "howToUse.html"    , "target": "", "class": "", "title": "How to Use"},
      {"text": "Contribution", "href": "contribution.html", "target": "", "class": "", "title": "Contribution"},
      {"text": "Tournament"  , "href": "tournament.html"  , "target": "", "class": "", "title": "Tournament"},
      {"text": "Ranking"     , "href": "ranking.html"     , "target": "", "class": "", "title": "Ranking"}
    ];
    
    // Test all Head Menu options from the given resouce
    testMenuOptions(options, '#menuOptionsText', 'menuSelected');
  });
}


// Common function to test all elements loaded in the left profile menu with the sent resource
function testCommonLeftMenu(resource, containerSelector) {
  menuSelector  = containerSelector + ' > .textContainer > [ng-switch=""] > [ng-include=""] > .text';
  expectedCount = resource.length;
  
  // Test the removing of the cloak over the left menu
  testCloak(menuSelector);
  
  profiles = using(menuSelector).repeater('.profile');
  expect(profiles.count()).toBe(expectedCount);
  
  profileImgSrcPart = '../static/_images/landing_pages/contribution_page/profiles/';
  
  for(i=0; i<expectedCount; i++) {
    profile = resource[i];
    
    // Testing profile name and title
    expect(profiles.row(i)).toEqual([profile["name"], profile["title"]]);
    
    // Testing profile image source
    expect(element(menuSelector + ' > .profile > img:eq('+ i +')').attr('src')).toBe(profileImgSrcPart+ profile["src"] +'.png');
  }
}


// Test the content of the staff left menu
function testStaffMenu() {
  // Test the content of the contributors right menu
  staff = [
    {"name": "Sandra Boesch, PhD(ABD)", "title": "Editor in Chief"            , "src": "Sandra"},
    {"name": "Chris Boesch"           , "title": "Editor in Chief"            , "src": "Chris"},
    {"name": "Shane Williams"         , "title": "Designer, Gr8ph1cs Creative", "src": "Shane"}
  ];
  
  // Use a common function to test all loaded elements with the staff resource
  testCommonLeftMenu(staff, '.staffContainer');
}


// Test the contribution menu form the common function
function testContributionMenu() {
  // Test the content of the contributors right menu
  contributors = [
    {"name": "Danny"          , "title": "Professor, Singapore", "src": "Danny"},
    {"name": "Chris Meyers"   , "title": "Specialist"          , "src": "ChrisMeyers"},
    {"name": "Allen B. Downey", "title": "Writer"              , "src": "AllenDowney"},
    {"name": "Chris Boesch"   , "title": "Editor in Chief"     , "src": "Chris"},
    {"name": "Jeffery Elkner" , "title": "Writer"              , "src": "Jeffery"}
  ];
  
  // Use a common function to test all loaded elements with the contributors resource
  testCommonLeftMenu(contributors, '.contributorsContainer');
}


// Test all Page Footer Elements
function testPageFooter() {
  testFooterMenuOptions();
  testCopyright();
  testCompanyLogo();
}


// Test Footer Menu Options
function testFooterMenuOptions() {
  options = [
    {"text": "home"        , "href": "index.html"                         , "target": "",       "class": "", "title": "Return to Your Home page"},
    {"text": "about us"    , "href": "aboutUs.html"                       , "target": "",       "class": "", "title": "about us"},
    {"text": "how to use"  , "href": "howToUse.html"                      , "target": "",       "class": "", "title": "how to use"},
    {"text": "terms of use", "href": "termsOfUse.html"                    , "target": "",       "class": "", "title": "terms of use"},
    {"text": "contribution", "href": "contributions.html"                 , "target": "",       "class": "", "title": "contribution"},
    {"text": "feedback"    , "href": "http://getsatisfaction.com/singpath", "target": "_blank", "class": "", "title": "feedback"},
    {"text": "contact us"  , "href": "contactUs.html"                     , "target": "",       "class": "", "title": "contact us"},
    {"text": "shop"        , "href": "shop.html"                          , "target": "",       "class": "", "title": "shop"}
  ];
  
  // Test all Footer Menu options from the given resouce
  testMenuOptions(options, '#menuFooterTop');
}


// Test Copyright elements
function testCopyright() {
  // Test the Copyright year
  expect(element('#menuFooterBottom > span:first').text()).toMatch('SingPath '+ new Date().getFullYear() +'$');
}


// Test The visibility of the company logo
function testCompanyLogo() {
  // Test link properties
  logoSelector = '#gr8ph1csLogo';
  $logo        = element(logoSelector);
  expect($logo.attr('href'  )).toBe('http://www.Gr8ph1cs.com');
  expect($logo.attr('target')).toBe('_blank');
  expect($logo.attr('title' )).toBe('Designed by gr8ph1cs Creative');
  
  // Test logo base and hover URLs
  testImageBaseAndHover(logoSelector, '/static/_images/landing_pages/landing_page_buttons/gr8ph1cs_logo');
}


// Test common Panel properties
function testPanel(panelLabel, panelController, btnLable, btnTitle, btnHref) {
  // Test panel existance
  var panelSelector = '.ng-scope[ng-controller=' + panelController + ']';
  expect(element(panelSelector).count()).toBe(1);
  
  
  // Test panel main label
  var $labelContainer = element(panelSelector + ' > [ng-class=containerClass] > .labelContainer > .label.ng-binding');
  expect($labelContainer.count()).toBe(1);
  expect($labelContainer.text()).toMatch('^(\n)?(\\s)*' + panelLabel + '(\n)?(\\s)*$');
  
  
  // Test panel top-left btn
  var btnSelector = panelSelector + ' a.commonBtn.big',
      $btn        = element(btnSelector);
  expect($btn.count()).toBe(1);
  expect($btn.attr('title')).toBe(btnTitle);
  expect($btn.attr('href' )).toBe(btnHref);
  
  var btnLabelSelector = btnSelector + ' .middle',
      $btnLabel        = element(btnLabelSelector);
  expect($btnLabel.count()).toBe(1);
  expect($btnLabel.text()).toMatch('^(\n)?(\\s)*' + btnLable + '(\n)?(\\s)*$');
}


// Test all popUp common attributes
function testPopUp(popUpSelector, showPopUpBtnSelector, topLeftLabel, btns) {
  var $showPopUpBtn = element(showPopUpBtnSelector),
      $popUp        = element(popUpSelector);
  
  // Secure a btns array
  btns = btns ? btns : [];
  
  
  /*** Testing Visibility ***/
  
  // Common expression to expect the poppUp to be visible
  function expectVisible() {
    expect($popUp.attr('class')).toBe('popUp show');
  }
  
  // Common expression to expect the poppUp to be hidden
  function expectHidden() {
    expect($popUp.attr('class')).toBe('popUp hide');
  }
  
  // Test popUp Show event
  function testShowPopUp() {
    expectHidden();
    $showPopUpBtn.click();
    expectVisible();
  }
  
  
  // Test popUp Hide event
  function testHidePopUp(selector) {
    expectVisible();
    element(popUpSelector + ' ' + selector).click()
    expectHidden();
  }
  
  // Test and Set a visible popUp
  testShowPopUp();
  
  // Test Close (X) btn
  testHidePopUp('.closeBtn');
  
  // Test and Set a visible popUp
  testShowPopUp();
  
  // Test Click outside event
  testHidePopUp('.container');
  
  // Test and Set a visible popUp
  testShowPopUp();
  
  /*** End Testing Visibility ***/
  
  
  // Test PopUp top-left label
  var $label = element(popUpSelector + ' > .container > .mainContent > .labelContainer > .label.ng-binding');
  expect($label.count()).toBe(1);
  expect($label.text()).toMatch('^(\n)?(\\s)*' + topLeftLabel + '(\n)?(\\s)*$');
  
  
  // Test Bottom btns
  if (btns.length) {
    var btnsContainerSelector = popUpSelector + ' [on=popUp.btns.length] > .labelBottomContainer'
    i      = 0,
    length = btns.length,
    btn    = btns[i],
    $btn   = null;
    
    // Test Btns existance
    expect(element(btnsContainerSelector).count()).toBe(1);
    
    // Test each bottom btn
    for (; i < length; btn = btns[++i]) {
      $btn = element(btnsContainerSelector + ' > .label > a.btn:eq(' + i +')');
      
      expect($btn.attr('href') ).toBe(btn.href);
      expect($btn.attr('title')).toBe(btn.title);
      expect($btn.text()       ).toBe(btn.label);
    }
  }
  
  // Hide the popUp as an initial state
  testHidePopUp('.closeBtn');
}


// Test all common Profile panel info
function testCommonProfilePanel(mainContentSelector, player) {
  
  // Test panel background image
  var professionalStatus = player.professional*1 ? 'professional' : 'student',
      $mainContainer     = element(mainContentSelector);
  
  expect($mainContainer.count()).toBe(1);
  expect($mainContainer.attr('class')).toMatch(professionalStatus + '$');
  
  // Test the middle text container existance
  var textContainerSelector = mainContentSelector + ' > .textContainer';
  expect(element(textContainerSelector).count()).toBe(1);
  
  
  /*** Test Player Images ***/
  
  var imgContainerSelector = textContainerSelector + ' .imgWrapper';
  
  // Test the player top-center name
  expect(element(textContainerSelector + ' .profileName').text()).toBe(player.name);
  
  // Test player gravatar
  expect(element(imgContainerSelector + ' .gravatar').attr('src')).toBe(player.gravatar);
  
  // Test player country flag
  expect(element(imgContainerSelector + ' .country').attr('src')).toBe(player.playerCountryFlagURL);
  
  // Test player gender image
  expect(element(imgContainerSelector + ' .gender').attr('src')).toBe('../static/_images/common_buttons/gender_icon_' + player.gender + '_off.png');
  
  
  /*** Test Player profile details ***/
  
  var datailsSelector = textContainerSelector + ' .detailsWrapper';
  
  // Test player top-center professional status label
  expect(element(datailsSelector + ' [ng-bind="profilePanel.professionalLabel"]').text()).toBe(professionalStatus);
  
  // test player location
  expect(element(datailsSelector + ' [ng-bind="profilePanel.locationClamp"]').text()).toBe(player.location);
  
  // Test Player tags
  var allTags     = player.tags,
      visibleTags = clampArrayByStringLength(allTags, 30),
      i           = 0
      length      = visibleTags.length,
      tag         = visibleTags[i],
      $tag        = null;
  
  // Test each and all tag attributes
  for (; i < length; tag = visibleTags[++i]) {
    $tag = element(datailsSelector + ' [ng-bind="tag"]:eq(' + i + ')');
    
    expect($tag.text()       ).toBe(tag);
    expect($tag.attr('src'  )).toBe('/ranking.html?tag=' + tag);
    expect($tag.attr('title')).toBe('Ranking tag: ' + tag);
  }
  
  // Test for if there were more tags than the one shown
  if (allTags.length != visibleTags.length) {
    // Test if the more tags mark is been displayed
    expect(element(datailsSelector + ' .moreTagsMark').count()).toBe(1);
  }
  
  // Test Player About info
  expect(element(datailsSelector + ' [ng-bind="profilePanel.aboutClapm"]').text()).toBe(clampString(player.about, 140));
}



describe('Additinal tests from Ivan', function() {
  it('Testing index.html', function() {
    // Load page
    browser().navigateTo('../../index.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    
    // Test TV field
    fieldSelector = '#landingImageTVIcon';
    
    // Test TV icon
    TVIconSelector = fieldSelector + ' > .tvIcon';
    expect(element(TVIconSelector).attr('title')).toBe('Watch the SingPath videos');
    testImageBaseAndHover(TVIconSelector, '/static/_images/landing_pages/landing_page_buttons/television');
    
    // Test TV text
    expect(element(fieldSelector + ' > .text').text()).toBe('Coming Soon!!');
    
    
    // Test the removing of the cloak over the stats menu
    testCloak('#rankStatsBoxText');
    
    
    // Testing all stats in the #statsTextBoxtext
    statsSelector = '#rankStatsBoxText > p > .ng-binding:eq';
    statsResource = {
      "num_players"      : "4306",
      "num_badges"       : "21,014",
      "most_popular_lang": "Python", 
      "last_player"      : "Secret Agent",
      "last_country"     : "Nigeria",
      "last_badge_earner": "John",
      "last_badge"       : "Python Level 5"
    }
    
    i=0;
    for(key in statsResource) {
      expect(element(statsSelector +'('+ i++ +')').text()).toBe(statsResource[key]);
    }
    
    
    playersSelector     = '#friendsTextBoxtext'
    playersFullSelector = playersSelector     + ' > span:eq';
    numPlayresSelector  = playersFullSelector + '(0)';
    
    // Test the removing of the cloak over the total number of current players
    testCloak(numPlayresSelector);
    
    // Test the total number of current players
    expect(element(numPlayresSelector).text()).toBe("12");
    
    
    // Testing the Players content menu
    playersResources = [
      {"playerid": 58546, "nickname": "Danny", "rank": 1, "gravatar": "http://www.gravatar.com/avatar/cff81e54497e85d41ac0997f37e38416/?default=&amp;s=80"}, 
      {"playerid": 6618736, "nickname": "Lindroos", "rank": 2, "gravatar": "http://www.gravatar.com/avatar/700cc42121c63a4ae6dc074cca78b9e9/?default=&amp;s=80"}, 
      {"playerid": 6936456, "nickname": "cablin", "rank": 3, "gravatar": "http://www.gravatar.com/avatar/64add95e501623a59eff526cc433e288/?default=&amp;s=80"}, 
      {"playerid": 8232339, "nickname": "UnforgetaBill", "rank": 4, "gravatar": "http://www.gravatar.com/avatar/f2dc5584e417ac484f2047a71f8ede74/?default=&amp;s=80"}, 
      {"playerid": 6646408, "nickname": "Pythonista Supra", "rank": 5, "gravatar": "http://www.gravatar.com/avatar/d4f342130d55ed01e9a597f0525533dd/?default=&amp;s=80"},
      {"playerid": 58546, "nickname": "Danny", "rank": 1, "gravatar": "http://www.gravatar.com/avatar/cff81e54497e85d41ac0997f37e38416/?default=&amp;s=80"}, 
      {"playerid": 6618736, "nickname": "Lindroos", "rank": 2, "gravatar": "http://www.gravatar.com/avatar/700cc42121c63a4ae6dc074cca78b9e9/?default=&amp;s=80"}, 
      {"playerid": 6936456, "nickname": "cablin", "rank": 3, "gravatar": "http://www.gravatar.com/avatar/64add95e501623a59eff526cc433e288/?default=&amp;s=80"}, 
      {"playerid": 8232339, "nickname": "UnforgetaBill", "rank": 4, "gravatar": "http://www.gravatar.com/avatar/f2dc5584e417ac484f2047a71f8ede74/?default=&amp;s=80"}, 
      {"playerid": 6646408, "nickname": "Pythonista Supra", "rank": 5, "gravatar": "http://www.gravatar.com/avatar/d4f342130d55ed01e9a597f0525533dd/?default=&amp;s=80"},
      {"playerid": 8232339, "nickname": "UnforgetaBill", "rank": 4, "gravatar": "http://www.gravatar.com/avatar/f2dc5584e417ac484f2047a71f8ede74/?default=&amp;s=80"}, 
      {"playerid": 6646408, "nickname": "Pythonista Supra", "rank": 5, "gravatar": "http://www.gravatar.com/avatar/d4f342130d55ed01e9a597f0525533dd/?default=&amp;s=80"}
    ];
    
    players              = using(playersSelector).repeater('.player');
    expectedPlayersCount = playersResources.length;
    expect(players.count()).toBe(expectedPlayersCount);
    
    // Test each player cloak removal and avatar properties
    for(key in playersResources) {
      playerResource = playersResources[key];
      playerSelector = playersFullSelector +'('+ (key*1+1) +')';
      
      // Test cloak
      testCloak(playerSelector);
      
      // Test avatar properties
      expect(element(playerSelector + ' > img').attr('src')).toBe(playerResource["gravatar"]);
      expect(element(playerSelector + ' > img').attr('alt')).toBe(playerResource["nickname"]);
    }
    
    
    // Test social network field
    fieldselector = '#friendsTextBoxtextSocial';
    
    // Test text
    expect(element(fieldselector + ' > .text').text()).toBe('follow us on');
    
    // Test Facebook logo
    facebookLogoSelector = fieldselector + ' > .facebook';
    $facebookLogo        = element(facebookLogoSelector);
    expect($facebookLogo.attr('href'  )).toBe('http://www.facebook.com/apps/application.php?id=100409776687538');
    expect($facebookLogo.attr('target')).toBe('_blank');
    expect($facebookLogo.attr('title' )).toBe('follow us on Facebook');
    
    // Test Facebook hover images
    testImageBaseAndHover(facebookLogoSelector, '/static/_images/landing_pages/landing_page_buttons/social_buttons_facebook');
    
    
    // Test Twitter logo
    twitterLogoSelector = fieldselector + ' > .twitter';
    $twitterLogo        = element(twitterLogoSelector);
    expect($twitterLogo.attr('href'  )).toBe('http://twitter.com/#!/singpath');
    expect($twitterLogo.attr('target')).toBe('_blank');
    expect($twitterLogo.attr('title' )).toBe('follow us on Twitter');
    
    // Test Twitter hover images
    testImageBaseAndHover(twitterLogoSelector, '/static/_images/landing_pages/landing_page_buttons/social_buttons_twitter');
  });
  
  
  it('Testing home.html', function() {
    // Load page
    browser().navigateTo('../../home.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    
    // Test Page content
    
    
    // Test Player Profile
    var player = {
      "gravatar": "http://www.gravatar.com/avatar/ff255e745f42e8617e7d19e69cccd2f5/?default=&amp;s=80",
      "playerCountryFlagURL": "../static/flags/us_on.png",
      "gender": "male",
      "name": "Mark Zuckerberg",
      "location": "Singapore",
      "tags": ["SMU"],
      "professional": "0",
      "about": "I like to program."
    }
    
    // Test all common output in the Player Profile Panel
    testCommonProfilePanel('[ng-controller=ProfilePanelCtrl] > .ng-scope.profileContainer', player);
    
    
    // Test Badges
    testPanel('Badges', 'BadgesPanelCtrl', 'View Badges', 'View Badges', 'badges.html');
    
    // Test badge main content existance
    var badgeContainerSelecter = '.ng-scope[ng-switch-when=badgesContainer] .text.ng-scope';
    expect(element(badgeContainerSelecter).count()).toBe(1);
    
    // All test user badges
    var badgesResource = [
      {
        "description": "Problem Creator Badge",
        "imageURL"   : "/static/badges/badge001.png"
      },
      {
        "description": "Python Level 1 Badge",
        "imageURL"   : "/static/badges/python/p001_on.png"
      },
      {
        "description": "Ruby Level 1",
        "imageURL"   : "/static/badges/ruby/r001_on.png"
      },
      {
        "description": "Javascript Level 1 Badge",
        "imageURL"   : "/static/badges/javascript/js001_on.png"
      },
      {
        "description": "Beginner Python Level 1 Badge",
        "imageURL"   : "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge01.png"
      },
      {
        "description": "Beginner Python Level 2 Badge",
        "imageURL"   : "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge02.png"
      }
    ],
    i      = 0,
    length = badgesResource.length,
    badge  = badgesResource[i],
    img;
    
    
    // Test each badge properties
    for (; i < length; badge = badgesResource[++i]) {
      $img = element(badgeContainerSelecter + ' img:eq(' + i +')');
      
      expect($img.count()        ).toBe(1);
      expect($img.attr('src'    )).toBe(badge.imageURL);
      expect($img.attr('title'  )).toBe(badge.description);
      expect($img.attr('alt'    )).toBe(badge.description);
      expect($img.attr('onclick')).toBe("alert('" + badge.description + "')");
      
      // Check if the first badge gets the special first class
      if (!i) {
        expect($img.attr('class')).toBe('ng-scope first');
      }
    }
    
    
    // Test Rankings
    var rankings = {
      "path_name": "Beginner Python",
      "path_id": 6920762,
      "players": [
        {
          "name": "Nitin",
          "playerid": 9227576,
          "gender": "male",
          "professional": "1",
          "location": "Location 1",
          "tags": ["tag 11"],
          "about": "About Ranked player 1",
          "highestBadge": {
            "url": "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge08.png",
            "description": "Beginner Python Level 8 Badge",
            "awardOrder": 8,
            "class": [
              "Badge",
              "Level_Badge"
            ],
            "name": "Level 8"
          },
          "rank": 1,
          "playerCountryFlagURL": "/static/flags/in_on.png",
          "gravatar": "http://www.gravatar.com/avatar/b9977b0bc73f652a527b5f2213f1a264/?default=&amp;s=80",
          "solved_num": 102,
          "badgeURL": "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge08.png"
        },
        
        {
          "name": "Sei",
          "playerid": 2420017,
          "gender": "female",
          "professional": "1",
          "location": "Location 2",
          "tags": ["tag 21"],
          "about": "About Ranked player 2",
          "highestBadge": {
            "url": "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge08.png",
            "description": "Beginner Python Level 8 Badge",
            "awardOrder": 8,
            "class": [
              "Badge",
              "Level_Badge"
            ],
            "name": "Level 8"
          },
          "rank": 2,
          "playerCountryFlagURL": "/static/flags/sg_on.png",
          "gravatar": "http://www.gravatar.com/avatar/dfdcedba3fec427a68dc95ecaccb9de8/?default=&amp;s=80",
          "solved_num": 101,
          "badgeURL": "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge08.png"
        },
        
        {
          "name": "Aint Myat Noe @ Michelle",
          "playerid": 5445164,
          "gender": "female",
          "professional": "0",
          "location": "Location 3",
          "tags": ["tag 13"],
          "about": "About Ranked player 3",
          "highestBadge": {
            "url": "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge08.png",
            "description": "Beginner Python Level 8 Badge",
            "awardOrder": 8,
            "class": [
              "Badge",
              "Level_Badge"
            ],
            "name": "Level 8"
          },
          "rank": 3,
          "playerCountryFlagURL": "/static/flags/sg_on.png",
          "gravatar": "http://www.gravatar.com/avatar/302b796a8e90553ebfa9e934b55d7634/?default=&amp;s=80",
          "solved_num": 101,
          "badgeURL": "/static/badges/mobilepaths/pythonMobile/mobilePythonBadge08.png"
        }
      ],
      "path_description": "Beginner Python",
      "maxRank": 3,
      "type": "ranking"
    },
    i       = 0,
    players = rankings.players,
    length  = players.length,
    player  = players[i],
    
    playerSelector = ''
    $rankImg       = null,
    $gravatar      = null,
    $badge         = null;
    
    // Test panel main components
    testPanel(rankings.path_name + ' Rankings', 'RankingPanelCtrl', 'View Rankings', 'View Rankings', 'ranking.html?path_id=' + rankings.path_id);
    
    var mainPanelSelector   = '.ng-scope[ng-switch-when=rankingContainer]',
        mainContentSelector = mainPanelSelector + ' > .text.ng-scope';
    expect(element(mainContentSelector).count()).toBe(1);
    
    for (; i < length; player = players[++i]) {
      playerSelector = mainContentSelector + ' .player.ng-scope:eq(' + i + ')';
      
      // Test Player Rank
      $rankImg = element(playerSelector + ' img.rank');
      expect($rankImg.attr('src')).toBe('_images/commonButtons/numbers/number0' + (i+1) + '.png');
      expect($rankImg.attr('alt')).toBe('Rank ' + player.rank);
      
      // Test Player Gravatar
      $gravatar = element(playerSelector + ' .popUpLink img.gravatar');
      expect($gravatar.attr('src')).toBe(player.gravatar);
      expect($gravatar.attr('alt')).toBe(player.name + "'s gravatar");
      
      // Test Player Name
      expect(element(playerSelector + ' .popUpLink .name.ng-binding').text()).toBe(clampString(player.name, 20));
      
      // Test Player solved number cases
      expect(element(playerSelector + ' .solvedNum.ng-binding').text()).toBe(player.solved_num + '');
      
      // Test Player country flag
      expect(element(playerSelector + ' img.flag').attr('src')).toBe(player.playerCountryFlagURL);
      
      // Test player highest badge
      $badge = element(playerSelector + ' img.highestBadge');
      expect($badge.attr('src'    )).toBe(player.highestBadge.url);
      expect($badge.attr('alt'    )).toBe(player.highestBadge.description);
      expect($badge.attr('title'  )).toBe(player.highestBadge.description);
      expect($badge.attr('onclick')).toBe("alert('" + player.highestBadge.description + "')");
      
      
      // Test Player Profile popUp
      var showPopUpBtnSelector = playerSelector + ' .popUpLink',
          popUpSelector        = mainPanelSelector + ' .popUp',
          topLeftLabel         = 'Profile';
      
      testPopUp(popUpSelector, showPopUpBtnSelector, topLeftLabel);
      
      
      // Test each Profile popUp data
      // Show the popUp
      element(showPopUpBtnSelector).click();
      
      // Test Profile data
      testCommonProfilePanel(popUpSelector + ' .mainContent', player);
      
      // Hide the popUp
      element(popUpSelector + ' .closeBtn').click();
    }
    
    
    // Test Challenge Board
    testPanel('Challenges', 'ChallengesPanelCtrl', 'Challenge Board', 'Challenge Board', 'challengeBoard.html');
    
    
    // Test all page footer elements
    testPageFooter();
  });
  
  
  it('Testing howToUse.html', function() {
    // Load page
    browser().navigateTo('../../howToUse.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    // Test Page content
    expect(element('#contributorsInfoBoxText > p').text()).toBe('How to Use');
    
    // Test the contribution menu form the common function
    testContributionMenu();
    
    // Test all page footer elements
    testPageFooter();
  });
  
  
  it('Testing aboutUs.html', function() {
    // Load page
    browser().navigateTo('../../aboutUs.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    
    // TODO: Test Page content
    
    
    // Test the contribution menu form the common function
    testStaffMenu();
    
    // Test all page footer elements
    testPageFooter();
  });
  
  
  it('Testing contribution.html', function() {
    // Load page
    browser().navigateTo('../../contribution.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    
    // TODO: Test Page content
    
    
    // Test the contribution menu form the common function
    testContributionMenu();
    
    // Test all page footer elements
    testPageFooter();
  });
  
  
  it('Testing news.html', function() {
    // Load page
    browser().navigateTo('../../news.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    // Test Page content
    expect(element('#contributorsInfoBoxText > p').text()).toBe('News');
    
    // Test the contribution menu form the common function
    testContributionMenu();
    
    // Test all page footer elements
    testPageFooter();
  });
  
  
  it('Testing shop.html', function() {
    // Load page
    browser().navigateTo('../../shop.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    
    // TODO: Test Page content
    
    
    // Test all page footer elements
    testPageFooter();
  });  
  
  
  it('Testing badges.html', function() {
    // Load page
    browser().navigateTo('../../badges.html');
    
    // Test all Page Head Elements from the common function
    testPageHead();
    
    
    // TODO: Test Page content
    
    
    // Test all page footer elements
    testPageFooter();
  });
});
