
/***
// controller
function MyController($scope, $http) {
  $http.get('/auth.py').success(function(data) {
    $scope.user = data;
  });
 
  this.saveMessage = function(message) {
    $scope.status = 'Saving...';
    $http.post('/add-msg.py', message).success(function(response) {
      $scope.status = '';
    }).error(function() {
      $scope.status = 'ERROR!';
    });
  };
}
 
// testing controller
describe('test suite', function () {
  var $http;
   
  beforeEach(function() {
    $httpBackend = angular.injector(['ngMock']).get('$httpBackend');  // angular-mocks
   
    // backend definition common for all tests
    $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});
  });
   
   
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
   
   
  it('should fetch authentication token', function() {
    $httpBackend.expectGET('/auth.py');
    var controller = scope.$new(MyController);
    $httpBackend.flush();
  });
});

***/

/***/

function testCtrl($resource, $http) {
  $resource.get('/auth.py').success(function (data) {
    $rootScope.user = data;
  });
  
  this.saveMessage = function (message) {
    $rootScope.status = 'Saving...';
    
    $resource.post('/add-msg.py', message).success(function (response) {
      $rootScope.status = '';
    }).error(function() {
      $rootScope.status = 'ERROR!';
    });
  };
}


describe('test suite', function () {
  var $httpBackend;
  
  beforeEach(function() {
    // $httpBackend = angular.injector(['ng']    ).get('$httpBackend');  // angular-scenario
    $httpBackend = angular.injector(['ngMock']).get('$httpBackend');  // angular-mocks
    
    // backend definition common for all tests
    $httpBackend.when('GET', '/auth.py').respond({userId: 'userX'}, {'A-Token': 'xxx'});
  });
  
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });  
  
  
  it('test testCtrl(), should fetch authentication token', function() {
    $httpBackend.expectGET('/auth.py');
    
    var $controller  = angular.injector(['ng']).get('$controller');
    var newTestCtrl = $controller(testCtrl);
    
    $httpBackend.flush();
  });
  
  
  it('test httpbackend_test.html', function () {
    browser().navigateTo('../../httpbackend_test.html');
    expect(element('body').count()).toBe(1);
    
    element('#get_pass').click();
    expect(element('#pass_responce').html()).toBe('new-pass')
  });
});

/***/
