/**
 * VerseLocation
 */
export class VerseLocation {
  private book: number;
  private chapter: number;
  private verse: number;

  constructor(book: number, chapter: number, verse: number) {
    // add validation for three parameters, larger than 0

    this.book = book;
    this.chapter = chapter;
    this.verse = verse;

  }

  /**
   * Create a new string
   * with the book number as a 2-digit string
   * and the chapter number as a 3-digit string
   * and the verse number as a 3-digit string
   */
  public toString(): string {
    return this.book.toString().padStart(2, '0') + this.chapter.toString().padStart(3, '0') + this.verse.toString().padStart(3, '0');
  }

  /**
   * parse toString to an unsigned integer
   */
  public toInt(): number {
    return parseInt(this.toString(), 10);
  }
}
