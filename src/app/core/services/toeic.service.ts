import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    ToeicData,
    ToeicPart5Topic,
    ToeicPart5Lesson,
    ToeicPart7Set,
    ToeicPart7Passage
} from '../models/toeic.model';

// Import JSON data
import * as toeicData from '../data/toeic_data.json';

/**
 * TOEIC Service
 * 
 * Flow:
 * ────────────────────────────────────────────────────────────
 *  ToeicHome       → getPart5Topics() → Part5List
 *                  → getPart7Sets()   → Part7List
 *  
 *  Part5List       → getPart5TopicById(id) → Part5Practice
 *  Part7List       → getPart7PassageById(id) → Part7Reading
 * ────────────────────────────────────────────────────────────
 */
@Injectable({
    providedIn: 'root'
})
export class ToeicService {

    private data: ToeicData = toeicData as unknown as ToeicData;

    constructor() { }

    // ============================================================
    // PART 5 - GRAMMAR METHODS
    // ============================================================

    /**
     * Lấy tất cả chủ đề Part 5
     */
    getPart5Topics(): Observable<ToeicPart5Topic[]> {
        return of(this.data.part5.topics);
    }

    /**
     * Lấy chi tiết một chủ đề theo ID
     */
    getPart5TopicById(id: string): Observable<ToeicPart5Topic | undefined> {
        const topic = this.data.part5.topics.find(t => t.id === id);
        return of(topic);
    }

    /**
     * Lấy một bài học cụ thể
     */
    getPart5LessonById(topicId: string, lessonId: string): Observable<ToeicPart5Lesson | undefined> {
        const topic = this.data.part5.topics.find(t => t.id === topicId);
        if (topic) {
            const lesson = topic.lessons.find(l => l.id === lessonId);
            return of(lesson);
        }
        return of(undefined);
    }

    /**
     * Đếm tổng số câu hỏi trong một topic
     */
    getQuestionCountByTopic(topicId: string): number {
        const topic = this.data.part5.topics.find(t => t.id === topicId);
        if (topic) {
            return topic.lessons.reduce((total, lesson) => total + lesson.questions.length, 0);
        }
        return 0;
    }

    // ============================================================
    // PART 7 - READING METHODS
    // ============================================================

    /**
     * Lấy tất cả bộ bài đọc Part 7
     */
    getPart7Sets(): Observable<ToeicPart7Set[]> {
        return of(this.data.part7.sets);
    }

    /**
     * Lấy chi tiết một bộ bài đọc
     */
    getPart7SetById(id: string): Observable<ToeicPart7Set | undefined> {
        const set = this.data.part7.sets.find(s => s.id === id);
        return of(set);
    }

    /**
     * Lấy một bài đọc cụ thể
     */
    getPart7PassageById(passageId: string): Observable<ToeicPart7Passage | undefined> {
        for (const set of this.data.part7.sets) {
            const passage = set.passages.find(p => p.id === passageId);
            if (passage) {
                return of(passage);
            }
        }
        return of(undefined);
    }

    /**
     * Lấy tất cả passages từ tất cả sets
     */
    getAllPart7Passages(): Observable<ToeicPart7Passage[]> {
        const allPassages: ToeicPart7Passage[] = [];
        this.data.part7.sets.forEach(set => {
            allPassages.push(...set.passages);
        });
        return of(allPassages);
    }

    // ============================================================
    // METADATA METHODS
    // ============================================================

    /**
     * Lấy thông tin tổng quan Part 5
     */
    getPart5Info(): Observable<{ title: string; description: string; topicCount: number }> {
        return of({
            title: this.data.part5.title,
            description: this.data.part5.description,
            topicCount: this.data.part5.topics.length
        });
    }

    /**
     * Lấy thông tin tổng quan Part 7
     */
    getPart7Info(): Observable<{ title: string; description: string; passageCount: number }> {
        let passageCount = 0;
        this.data.part7.sets.forEach(set => {
            passageCount += set.passages.length;
        });
        return of({
            title: this.data.part7.title,
            description: this.data.part7.description,
            passageCount
        });
    }
}
