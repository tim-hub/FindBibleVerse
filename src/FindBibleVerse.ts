import { VerseLocation } from './VerseLocation';
import { BibleQueryAdapter, LocalBibleQueryAdapter } from './LocalBibleQueryAdapter';

interface IFindVersesOptions {
  verseStart: VerseLocation;
  version?: BibleVersion;
  verseEnd?: VerseLocation;
}

export interface IVerse {
  book: number;
  chapter: number;
  verse: number; //todo make version optional to search the whole chapter
}

export interface IFindOptions {
  version?: BibleVersion;
  start: IVerse;
  end?: IVerse;
}

export enum BibleSourceProvider {
  Local,
  //Remote, //todo
}

export enum BibleVersion {
  ASV='asv',
  //KJV='kjv', //todo
}

export class FindBibleVerse{

  private readonly bibleQueryAdapter:BibleQueryAdapter;

  constructor(private version = BibleVersion.ASV, private provider?: BibleSourceProvider, ){
    if (!provider || provider === BibleSourceProvider.Local) {
      this.bibleQueryAdapter = new LocalBibleQueryAdapter(version)
    }
  }

  private findVerses({version, verseStart, verseEnd}: IFindVersesOptions ): string[] {
    // change query adapter version
    this.bibleQueryAdapter.changeVersion(version?? BibleVersion.ASV);
    // get verses from adapter
    return this.bibleQueryAdapter.getVerses(verseStart, verseEnd);
  }

  public find({version, start, end}: IFindOptions): string[] {
    // get verses from adapter
    return this.findVerses({
      version: version?? undefined,
      verseStart: new VerseLocation(start.book, start.chapter, start.verse),
      verseEnd: end?new VerseLocation(end.book, end.chapter, end.verse): undefined
    });
  }
}
