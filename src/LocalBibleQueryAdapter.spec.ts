/**
 * Test LocalBibleQueryAdapter
 */
import { LocalBibleQueryAdapter } from './LocalBibleQueryAdapter';
import { VerseLocation } from './VerseLocation';
import { BibleVersion } from './FindBibleVerse';

/**
 * Test getVerses from LocalBibleQueryAdapter
 */
describe('BibleQueryAdapter', () => {

  // define query adapter instance
  let adapter: LocalBibleQueryAdapter = new LocalBibleQueryAdapter(BibleVersion.ASV);

  it('should get one verse', () => {
    const verses = adapter.getVerses(new VerseLocation(1, 1, 1))
    expect(verses.length).toBe(1);
    expect(verses).toEqual([{
      id: 1001001,
      b: 1,
      c: 1,
      v: 1,
      t: 'In the beginning God created the heavens and the earth.'
    }]);
  });

  it('should get two verses', () => {
    const verses = adapter.getVerses(new VerseLocation(1, 1, 1), new VerseLocation(1, 1, 2))
    expect(verses.length).toBe(2);
  });
});
