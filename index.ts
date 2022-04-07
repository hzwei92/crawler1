import { EventEmitter } from 'events';
import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

export async function main(stopAfter: number, startUrl?: string) {
  const queue: string[] = [startUrl || process.argv[2]];
  const visited: any = {};
  const crawlerMaxCount = 5;
  let crawlerCount = 0;
  const eventEmitter = new EventEmitter();

  eventEmitter.on('go', () => {
    while (crawlerCount < crawlerMaxCount && queue.length > crawlerCount) {
      crawl(crawlerCount)
      crawlerCount++;
    }
  })
  
  const crawl = async (cralwerIndex: number) => {
    while (queue.length) {
      if (stopAfter && Object.keys(visited).length >= stopAfter) {
        return Object.keys(visited);
      }
      const url = queue.shift();
      if (url && !visited[url]) {
        visited[url] = true;

        console.log(url)
        let html = ''
        try {
          html = await rp(url);
        }
        catch (e) {

        }

        const $ = cheerio.load(html);

        $('[href]').toArray().forEach(el => {
          const href = el.attribs['href'];
          if (href && typeof href === 'string' && href.match(/^http*/)) {
            console.log('  ' + href);
            queue.push(href);
          }
        })

        if (cralwerIndex === 0 && crawlerCount < crawlerMaxCount) {
          eventEmitter.emit('go')
        }
      }
    }
  }

  return crawl(0);
}

main(0);
