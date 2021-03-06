/* jasmine-like end2end tests go here */

function log(message) {
  console.log(message);
}

describe('kit', function() {
  pauseAll = false;
  
  it('Testing home.html', function() {
      browser().navigateTo('../../home.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/home.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });

  it('Testing aboutUs.html', function() {
      browser().navigateTo('../../aboutUs.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/aboutUs.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
 
  it('Testing contactUs.html', function() {
      browser().navigateTo('../../contactUs.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/contactUs.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
  });

  it('Testing tournament.html', function() {
      browser().navigateTo('../../tournament.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/tournament.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });

  it('Testing challengeBoard.html', function() {
      browser().navigateTo('../../challengeBoard.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/challengeBoard.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
  it('Testing badges.html', function() {
      browser().navigateTo('../../badges.html');
      expect(browser().location().hash()).toBe('');
      //expect(browser().location().path()).toBe('/badges.html');
      //expect(element('#footer a:nth-child(1)').text()).toBe('home');
      if (pauseAll) pause();
      //pause();
  });
  
    describe('Extra Home-specific tests', function() {

        beforeEach(function() {
            browser().navigateTo('../../home.html');
        });

        it('Testing home.html', function() {
            browser().navigateTo('../../home.html');
            expect(browser().location().hash()).toBe('');
            //expect(browser().location().path()).toBe('/home.html');
            //expect(element('#footer a:nth-child(1)').text()).toBe('home');
            //expect(element('div:eq(0)').text()).toEqual('something');
            expect(element('#userMenu .nickname').text()).toBe('Mark Zuckerberg');
            
            // To be Angularized
            // expect(element('#levels_tr_10030 td:nth-child(2)').text()).toBe('123/257');
            element('.rolls').click();

            //expect(element('#editProfileName name').text()).toBe('Testing');
            //<input type="editbox" class="editProfile" id="editProfileName" name="name">
            //pause();
        });
        
    });
});


describe('Tests From SergeyGalenko', function() {

  it('Testing tournament.html', function() {
      browser().navigateTo('../../tournament.html');
      element('#viewRanking .viewRankingButton').click();
      //This click is not working
      //expect(element('#tourHeadingTextTitle').text()).toBe('PyCon 2012'); // on tournamentRanking.html?tournamentID=11288841 page?
  });
  
  it('Testing tournamentRanking.html?tournamentID=11288841', function(){
    browser().navigateTo('../../tournamentRanking.html?tournamentID=11288841');
    expect(element('#levMBText').text()).toBe('PyCon 2012 Results'); 

  });
  
});
