import { VerseLocation } from './VerseLocation';

// test VerseLocation
describe('VerseLocation', () => {
  it('should create an instance', () => {
    expect(new VerseLocation(1,1,1)).toBeTruthy();
  });

  it('should have 01001001 when book 1, chapter 1 and verse 1', () => {
    expect(new VerseLocation(1,1,1).toString()).toBe('01001001');
  });
});
