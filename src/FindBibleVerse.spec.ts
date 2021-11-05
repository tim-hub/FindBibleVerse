import { BibleSourceProvider, BibleVersion, FindBibleVerse } from './FindBibleVerse';
import { LocalBibleQueryAdapter } from './LocalBibleQueryAdapter';
/**
 * Test FindBibleVerse.
 * Define a LocalBibleQueryAdapter firstly and inject to FindBibleVerse instance
 */

describe('test find bible verse', () => {
  let findBibleVerse: FindBibleVerse;
  let localBibleQueryAdapter: LocalBibleQueryAdapter;

  beforeEach(() => {
    localBibleQueryAdapter = new LocalBibleQueryAdapter();
    findBibleVerse = new FindBibleVerse(BibleVersion.ASV, BibleSourceProvider.Local);
  });

  it('should find bible verse', async () => {
    const result = findBibleVerse.find({start: {book: 1, chapter: 1, verse: 1}});
    expect(result).toBeTruthy();
    expect(result.length).toBe(1);
  });

  // test to find two verses
  it('should find two verses', async () => {
    const result = findBibleVerse.find({start: {book: 1, chapter: 1, verse: 1}, end: {book: 1, chapter: 1, verse: 2}});
    expect(result).toBeTruthy();
    expect(result.length).toBe(2);
  });
});
