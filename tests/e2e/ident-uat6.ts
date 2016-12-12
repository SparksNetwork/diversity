import { NightWatchBrowser } from 'nightwatch';

export = {
  'IDENT UAT 6: Sign in with facebook': function (browser: NightWatchBrowser) {
    (browser.page as any).signin()
      .navigate()
      .waitForElementVisible('#page', 1000) // wait for the page to display

    browser.end();
  },
};
