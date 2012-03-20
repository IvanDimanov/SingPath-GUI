describe('Additinal test from Matias', function() {
	  /*it('Testing kit/news.html', function() {
	    browser().navigateTo('../../news.html');
	    expect(element('#menuOptionsText > .menuSelected').text()).toMatch('News');
	    expect(element('#contributorsInfoBoxText > p').text()).toMatch('News');
	    
      // Ivan, Note: Full contributors test coverage is available in ivan_static_scenarios.js
      
	    // Test the content of the contributors right menu
	    expect(element('#contributorsAboutBoxText > a > img').count()).toBe(5);
	    expect(repeater('#contributorsAboutBoxText > a > img'))
	    
	    // To be organized as repeater when same been used
	    expect(element('#contributorsAboutBoxText > a > img:eq(0)').attr('alt')).toBe('Contributor Danny');
	    expect(element('#contributorsAboutBoxText > a > img:eq(1)').attr('alt')).toBe('Contributor Chris Meyers');
	    expect(element('#contributorsAboutBoxText > a > img:eq(2)').attr('alt')).toBe('Contributor Allen Downey');
	    expect(element('#contributorsAboutBoxText > a > img:eq(3)').attr('alt')).toBe('Contributor Chris Boesch');
	    expect(element('#contributorsAboutBoxText > a > img:eq(4)').attr('alt')).toBe('Contributor Jeffery');
      
	  });*/
	  //badges.html
	  it('Testing kit/badges.html', function() {
		    browser().navigateTo('../../badges.html');
        
        // Ivan, Note: Full user coverage is available in ivan_static_scenarios.js
        // expect(element('#logIndetailsNameText').text()).toBe('Mark Zuckerberg');
		    
        //yourbadgesBoxTop
		    expect(element('#yourBadgesBoxTop > img').count()).toBe(20);
		    expect(element("#yourBadgesBoxTop > img:eq(0)").attr('title')).toBe("5 Python Contributions Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(1)").attr('title')).toBe("Beginner Python Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(2)").attr('title')).toBe("Beginner Python Contribution Badge (2)");
		    expect(element("#yourBadgesBoxTop > img:eq(3)").attr('title')).toBe("Beginner Python Contribution Badge (5)");
		    expect(element("#yourBadgesBoxTop > img:eq(4)").attr('title')).toBe("Challenge Creator Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(5)").attr('title')).toBe("GAE Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(6)").attr('title')).toBe("GAE Contribution Badge (2)");
		    expect(element("#yourBadgesBoxTop > img:eq(7)").attr('title')).toBe("Java Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(8)").attr('title')).toBe("Javascript Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(9)").attr('title')).toBe("Level Creator Badge (10) - Created a level with 10 problems");
		    expect(element("#yourBadgesBoxTop > img:eq(10)").attr('title')).toBe("Level Creator Badge (5) - Create a level with 5 problems");
		    expect(element("#yourBadgesBoxTop > img:eq(11)").attr('title')).toBe("Obj-C Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(12)").attr('title')).toBe("Problem Creator Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(13)").attr('title')).toBe("Python Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(14)").attr('title')).toBe("Ruby Contribution Badge");
		    expect(element("#yourBadgesBoxTop > img:eq(15)").attr('title')).toBe("Teacher Badge (10) - 10 people solved all the problems in one of your levels");
		    expect(element("#yourBadgesBoxTop > img:eq(16)").attr('title')).toBe("Teacher Badge (100) - 100 people solved all the problems in one of your levels");
		    expect(element("#yourBadgesBoxTop > img:eq(17)").attr('title')).toBe("Teacher Badge (25) - 25 people solved all the problems in one of your levels");
		    expect(element("#yourBadgesBoxTop > img:eq(18)").attr('title')).toBe("Teacher Badge (5) - 5 people solved all the problems in one of your levels");
		    expect(element("#yourBadgesBoxTop > img:eq(19)").attr('title')).toBe("Teacher Badge (50) - 50 people solved all the problems in one of your levels");
		    
		    //yourCountryBadgesBoxTop
		    expect(element('#yourCountryBadgesBoxTop > img').count()).toBe(80);
		    expect(element("#yourCountryBadgesBoxTop > img:eq(0)").attr('title')).toBe("Argentina Unlock Badge");
		    expect(element("#yourCountryBadgesBoxTop > img:eq(1)").attr('title')).toBe("Asia/Pacific Region Unlock Badge");
		    expect(element("#yourCountryBadgesBoxTop > img:eq(2)").attr('title')).toBe("Australia Unlock Badge");
		    expect(element("#yourCountryBadgesBoxTop > img:eq(3)").attr('title')).toBe("Austria Unlock Badge");
		    expect(element("#yourCountryBadgesBoxTop > img:eq(77)").attr('title')).toBe("Uruguay Unlock Badge");
		    expect(element("#yourCountryBadgesBoxTop > img:eq(78)").attr('title')).toBe("Venezuela Unlock Badge");
		    expect(element("#yourCountryBadgesBoxTop > img:last").attr('title')).toBe("Vietnam Unlock Badge");
		    
		    //yourPathBadgesBox
		    expect(element("#yourPathBadgesBox > img:eq(0)").attr('title')).toBe("Beginner Python Level 1 Badge");
		    expect(element("#yourPathBadgesBox > img:eq(1)").attr('title')).toBe("Beginner Python Level 10 Badge");
		    expect(element("#yourPathBadgesBox > img:eq(2)").attr('title')).toBe("Beginner Python Level 2 Badge");
		    expect(element("#yourPathBadgesBox > img:eq(2)").attr('src')).toBe("../static/badges/mobilepaths/pythonMobile/mobilePythonBadge02.png");
		    expect(element("#yourPathBadgesBox > img:eq(3)").attr('title')).toBe("Beginner Python Level 3 Badge");
		    expect(element("#yourPathBadgesBox > img:eq(3)").attr('src')).toBe("../static/badges/mobilepaths/pythonMobile/mobilePythonBadge03.png");
		    expect(element("#yourPathBadgesBox > img:eq(4)").attr('title')).toBe("Beginner Python Level 4 Badge");
		    expect(element("#yourPathBadgesBox > img:eq(4)").attr('src')).toBe("../static/badges/mobilepaths/pythonMobile/mobilePythonBadge04.png");
		    expect(element("#yourPathBadgesBox > img:last").attr('title')).toBe("Ruby Level 9 Badge");
		    expect(element("#yourPathBadgesBox > img:last").attr('src')).toBe("../static/badges/ruby/r009_off.png");
	  });
	  
	  it('Testing kit/ranking.html', function() {
	      browser().navigateTo('../../ranking.html');
	      expect(browser().location().hash()).toBe('');
	      
	      expect(element('#nameBox').text()).toBe('Mark Zuckerberg');
	      expect(element("#infoBarRanking>a:first>img").attr('alt')).toBe("move to previous paths");
	      expect(element("#infoBarRanking>a:eq(1)>img").attr('alt')).toBe("select all paths");
	      expect(element("#infoBarRanking>a:eq(6)>img").attr('alt')).toBe("Python Beginner Ranking");
	      expect(element("#infoBarRanking>a:last>img").attr('alt')).toBe("move to next paths");
	      expect(element("#infoBarRanking>a").count()).toBe(8);
	      
	      element('#tourInfoBoxTitleTopAll #firstMiddleSlice').click(); //Singapore
	      expect(element('#rankingList>div>div[id$="Solved"]').count()).toBe(12);
	      
	      //
	      expect(element('#rankingList>div>div[id$="Solved"]:first>span').text()).toBe("243"); //#solved of first in ranking
	      //expect(element('#rankingList>div>div[id$="Details"]:first>span').text()).toBe("Danny"); //#nickname of first in ranking
	      
	      //
	      expect(element('#rankingList>div>div[id$="Solved"]:last>span').text()).toBe("182"); //#solved of last in ranking
	      //expect(element('#rankingList>div>div[id$="Details"]:last>span').text()).toBe("Zach"); //#nickname of first in ranking
	      
	      expect(element("#rankingList>div").count()).toBe(12);
	      element('#tourInfoBoxTitleTopAll #secondMiddleSlice').click(); //WorldWide
	      expect(element("#rankingList>div").count()).toBe(25);
	      expect(element('#rankingList>div>div[id$="Solved"]:first>span').text()).toBe("243"); //#solved of first in ranking
	      expect(element('#rankingList>div>div[id$="Solved"]:last>span').text()).toBe("44"); //#solved of last in ranking

	      
	      expect(element('#rankCtryList > div').count()).toBe(79);
	      
	      expect(element('#rankCtryList>div>div[id$="Flag01"]:first>img').attr('alt')).toBe('Singapore');
	      expect(element('#rankCtryList>div>div[id$="NumPeople01"]:first').text()).toBe('1828');
	      expect(element('#rankCtryList>div>div[id$="Flag01"]:last>img').attr('alt')).toBe('Uruguay');
	      expect(element('#rankCtryList>div>div[id$="NumPeople01"]:last').text()).toBe('1');
	      
	      
	      element('#tourInfoBoxTitleTopAll #firstMiddleSlice').click(); //Singapore
	      expect(element('#rankingList > div:last').attr('id')).toBe('raBox20');
	      
	      element('#tourInfoBoxTitleTopAll #secondMiddleSlice').click(); //WorldWide
	      expect(element('#rankingList > div:last').attr('id')).toBe('raBoxUR');
	      
	  });
	  
	  
	  
	});