import * as path from 'path';
import { VerseLocation } from './VerseLocation';
import DatabaseConstructor, { Database } from 'better-sqlite3';
import { BibleVersion } from './FindBibleVerse';

const localSqliteDBPath = path.join(__dirname, './bible_databases/bible-sqlite.db');



export abstract class BibleQueryAdapter {
  protected version: BibleVersion= BibleVersion.ASV;

  protected constructor(version:BibleVersion = BibleVersion.ASV) {
    this.version = version;
  }

  /**
   * Change version
   * @param version
   */
  public changeVersion(version: BibleVersion) {
    this.version = version;
  }
  public abstract getVerses(verseLocationStart: VerseLocation, verseLocationEnd?: VerseLocation): string[];
}

/**
 * LocalBibleQueryAdapter (from path `bible_databases/bible-sqlite.db`)
 */
export class LocalBibleQueryAdapter extends BibleQueryAdapter{
  private db: Database;

  /**
   * @param version - version of the bible to use
   * @param dbPath
   */
  constructor(version:BibleVersion = BibleVersion.ASV, private readonly dbPath:string = localSqliteDBPath) {
    super(version);
    this.dbPath = dbPath;
    this.buildDB();
  }

  /**
   * Build db from db path
   */
  private buildDB(): void {
    this.db = new DatabaseConstructor(this.dbPath, {verbose: console.debug});
  }

  /**
   * get verse from VerseLocation
   */
  public getVerses(verseLocationStart: VerseLocation, verseLocationEnd?: VerseLocation): string[] {
    return this.db.prepare(`SELECT * FROM t_${this.version} WHERE id BETWEEN ? AND ?`)
      .all(verseLocationStart.toString(), verseLocationEnd ? verseLocationEnd.toString() : verseLocationStart.toString());
  }
}
