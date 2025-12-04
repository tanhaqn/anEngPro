import { Injectable } from '@angular/core';
import { translate } from 'google-translate-api-browser';

@Injectable({
    providedIn: 'root'
})
export class TranslationService {

    constructor() { }

    async translate(text: string, targetLang: string = 'vi'): Promise<string> {
        try {
            const result = await translate(text, { to: targetLang });
            return result.text;
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    }
}
