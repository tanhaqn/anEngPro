import { Injectable } from '@angular/core';
import { VocabularyDataService } from './vocabulary-data.service';
import { Course, Word } from '../models/vocabulary.model';

@Injectable({
    providedIn: 'root',
})
export class VocabularyService {
    private courses: Course[] = [];

    constructor(private dataService: VocabularyDataService) {
        this.processData();
    }

    private processData() {
        const rawData = this.dataService.getRawData();
        this.courses = rawData.map(topic => {
            const course: Course = {
                id: topic.topic_id.toString(),
                title: topic.topic_name,
                description: `Học các từ vựng cơ bản và nâng cao về chủ đề ${topic.topic_name}.`,
                level: this.determineLevel(topic.words.length), // Simple logic to determine level
                words: topic.words.map((wordData: any) => {
                    const word: Word = {
                        id: `${topic.topic_id}-${wordData.word}`,
                        term: wordData.word,
                        definition: wordData.english_definition,
                        pronunciation: wordData.ipa,
                        example: wordData.example_sentence,
                        part_of_speech: wordData.part_of_speech,
                        vietnamese_meaning: wordData.vietnamese_meaning,
                        example_translation: wordData.example_translation,
                        grammar_analysis: wordData.grammar_analysis,
                        collocations: wordData.collocations,
                        notes: wordData.notes,
                        image_keyword: wordData.image_keyword,
                        synonyms: wordData.synonyms,
                        antonyms: wordData.antonyms,
                        word_family: wordData.word_family,
                        common_mistakes: wordData.common_mistakes,
                        mnemonic: wordData.mnemonic
                    };
                    return word;
                }),
                thumbnail: this.generateThumbnail(topic.topic_name) // Generate a placeholder thumbnail
            };
            return course;
        });
    }

    private determineLevel(wordCount: number): 'Beginner' | 'Intermediate' | 'Advanced' {
        if (wordCount < 20) return 'Beginner';
        if (wordCount < 40) return 'Intermediate';
        return 'Advanced';
    }

    private generateThumbnail(topicName: string): string {
        // Simple hash function to get a color
        let hash = 0;
        for (let i = 0; i < topicName.length; i++) {
            hash = topicName.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        const bgColor = "00000".substring(0, 6 - color.length) + color;
        return `https://via.placeholder.com/400x240/${bgColor}/FFFFFF?text=${encodeURIComponent(topicName)}`;
    }

    getCourses(): Course[] {
        return this.courses;
    }

    getCourseById(id: string): Course | undefined {
        return this.courses.find(course => course.id === id);
    }

    getWordById(id: string): Word | undefined {
        for (const course of this.courses) {
            const word = course.words.find(w => w.id === id);
            if (word) return word;
        }
        return undefined;
    }
}
