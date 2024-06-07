import { Injectable } from '@nestjs/common';
import * as levenshtein from 'levenshtein';

@Injectable()
export class AppService {
  private calculateLevenshteinDistance(query: string, target: string): number {
    return levenshtein(query, target);
  }
  getHello() {
    return this.calculateLevenshteinDistance('how', 'how to make a cake');
  }
}
