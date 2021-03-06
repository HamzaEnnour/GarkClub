import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  readonly TITLE_POSTFIX = ' | YAHUF';
  readonly MAX_PART_LENGTH = 30;

  constructor(private title: Title) {
  }

  getTitle(): string {
    return this.title.getTitle();
  }

  setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }

  setTitleCut(input: string[]): void {
    let out = '';

    input.forEach((string) => {
      if (typeof string !== 'undefined') {
        out += (
          string.length > this.MAX_PART_LENGTH ?
            string.substr(0, 27) + String.fromCharCode(8230)
            : string
        );
      }
    });

    this.setTitle(out);
  }
}