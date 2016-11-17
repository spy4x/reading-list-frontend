import { ReadingListPage } from './app.po';

describe('reading-list App', function() {
  let page: ReadingListPage;

  beforeEach(() => {
    page = new ReadingListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
