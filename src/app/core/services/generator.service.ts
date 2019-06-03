import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {
  private chars: string[] = [];

  constructor() {
    this.initChars();
  }

  getSequence(length: number): string {
    let sequence = '';
    const charsLength = this.chars.length;

    for (let i = 0; i < length; i++) {
      sequence += this.chars[
        Math.floor(Math.random() * 100) % charsLength
      ];
    }

    return sequence;
  }

  private initChars() {
    this.chars = this.generateSequence('A', 'Z');

    this.chars = this.chars.concat(
      ...this.generateSequence('a', 'z')
    );

    this.chars = this.chars.concat(
      ...this.generateSequence('0', '9')
    );
  }

  private generateSequence(start: string, end: string): string[] {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    const sequence: string[] = [];

    for (let i = startCode; i <= endCode; i++) {
      sequence.push(String.fromCharCode(i));
    }

    return sequence;
  }
}
