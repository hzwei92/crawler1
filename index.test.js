const { main } = require('./index.js');

jest.setTimeout(10000);
test('should crawl', async () => {
  const urls = await main(3, 'https://www.reddit.com/',);
  expect(urls).toContain('https://www.reddit.com/')
});