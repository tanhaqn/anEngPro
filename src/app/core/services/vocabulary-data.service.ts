import { Injectable } from '@angular/core';
import elsaData from '../data/ELSA_FULL.json';

@Injectable({
    providedIn: 'root',
})
export class VocabularyDataService {
    constructor() { }

    getRawData(): any[] {
        return elsaData as any[];
    }
}
