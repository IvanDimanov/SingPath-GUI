// This file is responsible for all html ng-apps variables used in <html ng-app="-app-module-">

// Create a route module
var pageApp = angular.module('pageApp', ['ngResource'], function($routeProvider) {
  
  // Create a routes only for index.html page
  if ((/index.html$/).test(window.location.href)) {
    $routeProvider.when('', {template: 'includes/index_partial.html', controller: LoadPageCtrl});
  }
});


// Indicate whenever is a need to create a face http backend
var SET_HTTP_BACKEND = true;


// Check if there's a need to create a face http backend
if (SET_HTTP_BACKEND) {
  
  // Configure the page app to use $httpBackend
  pageApp.config(function($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  });

  // Define mock http backend after the page app is running
  pageApp.run(function($httpBackend) {
    
    // Let all gae_bingo tests to be executed in the server
    $httpBackend.whenPOST(/\/gae_bingo/).passThrough();
    
    
    // Common loads for all pages
    $httpBackend.whenGET(/jsonapi\//).passThrough();
    $httpBackend.whenGET(/includes\//).passThrough();
    
    
    // Return positive response on every log access record
    $httpBackend.whenPOST('../jsonapi/log_access').respond(200);
    
    
    // Return a positive response for every save profile attempt
    $httpBackend.whenPOST('../jsonapi/player').respond(function (method, url, dataStr) {
      
      // Get the user input tags and save them in the tags array
      var data = angular.fromJson(dataStr);
      data.tags = data.tagsAsText.split(/\s*,\s/);
      
      // Set the professional status to what was choosen by the user
      data.professional = data.professionalOption;
      
      return [200, data];
    });
  });
}