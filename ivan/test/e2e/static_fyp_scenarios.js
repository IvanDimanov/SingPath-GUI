// test for display name 'Mark zuckerberg'

describe('FYP', function() {
	pauseAll = false;	
	
	  it('Testing fyp/charts/descriptive_2.htm', function() {
		  
		browser().navigateTo('../../fyp/charts/descriptive_2.htm');
	  	expect(browser().location().hash()).toBe('');
	  	expect(browser().location().path()).toBe('fyp/charts/descriptive_2.htm');
		
		expect(element('#class="ng-directive ng-binding').text()).toBe('Mark Zuckerbergg');
	
});

     });