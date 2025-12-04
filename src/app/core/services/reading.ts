import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Level } from '../models/reading.model';

@Injectable({
    providedIn: 'root'
})
export class ReadingService {
    private dataUrl = '/data/reading_data.json';

    constructor(private http: HttpClient) { }

    getLevels(): Observable<Level[]> {
        return this.http.get<{ levels: Level[] }>(this.dataUrl).pipe(
            map(data => data.levels)
        );
    }

    getLevelById(id: string): Observable<Level | undefined> {
        return this.getLevels().pipe(
            map(levels => levels.find(l => l.id === id))
        );
    }
}
