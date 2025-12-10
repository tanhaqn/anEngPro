import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { GrammarData, GrammarCategory, GrammarRule } from '../models/grammar.model';
import grammarData from '../data/grammar_data_v2.json';

@Injectable({
    providedIn: 'root'
})
export class GrammarService {

    constructor(private http: HttpClient) { }

    getGrammarData(): Observable<GrammarData> {
        return of(grammarData as unknown as GrammarData);
    }

    // Helper to get a flat list of rules if needed for detail view or search
    getAllRules(): Observable<GrammarRule[]> {
        return this.getGrammarData().pipe(
            map(data => {
                const rules: GrammarRule[] = [];
                data.categories.forEach(category => {
                    if (category.topics) {
                        category.topics.forEach(topic => {
                            if (topic.rules) {
                                topic.rules.forEach(rule => {
                                    rules.push(rule);
                                });
                            }
                        });
                    }
                });
                return rules;
            })
        );
    }

    // Method to get a rule by ID
    getRuleById(id: number): Observable<GrammarRule | undefined> {
        return this.getAllRules().pipe(
            map(rules => rules.find(r => r.id === id))
        );
    }
}
