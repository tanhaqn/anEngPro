import { Injectable } from '@angular/core';
import elsaData from '../data/ELSA_FULL.json';
import { Course, Word, GrammarAnalysis } from '../models/vocabulary.model';

// Re-export models for consumers
export * from '../models/vocabulary.model';

@Injectable({
  providedIn: 'root',
})
export class VocabularyService {
  private courses: Course[] = [];

  constructor() {
    this.initializeCourses();
  }

  private initializeCourses() {
    // Map data from ELSA_FULL.json to Course structure
    // We will use the existing thumbnails for the first few courses if possible, or generic ones
    const thumbnails = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAsrHYDdUnF0obV4y5h3zduiP2LXPF0W67pwQolfYGQ8oXfEO3-iSAsbKlbgHnqQQQy6xbf5XufaDEF1J8KrJ13OBMMDmD_1XAbdpTAYOVxeVNArB0H1WJl3yhURi6-tYyJQ1xT-MSPkxRhz5Owa-Ngl__R5NjgajP5IcdK34AN8PqQVeGw0RcYhF_AUoYsCCCayirNH7955p6cFXbiE8xdqXxT1-2LpXYZDrVziii0L7Irha_6R6QsJh4p7gdxLqJl48B4P_nawqEh',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlLEIrf3PzxER1o5EBr9Zq2h9yaIV36hUIFdUts4UCZm6YdQCKZENaLvqTQ5w6BAF74yVhAEBpB7iiRqFjcrMCPjEAsvCnUD0JGrQVnCi8qg7PJsoe6Qp4ByCrsCy-571377ktOgPaHQWINSta-tYolfBzmCOGUwXeQ3ZyvF8HntuPhuAUgO50KDYkIofjtn0LCDlXtTjxJ7ujqwFGB-nU8Yz5Ls141L5STzLlgVfq89QQg5xIsx0XEtVwli32AuGLOFt2ETngHqMz',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOWYWd38ejD-OX7JPTpt9WGm9cUNtP_YPRihbE28q_4XXrQpfFmIJVTiB4_1HK1qFSNbvmoJF0RTo0fXinqiJTos6KzipK_lMoJVmfsGg8MciNG-F6gJZrtc0ifaikZIIl_8Z7RJcjCipfIoeo3AClyOa2aaz-kyAKSqvkwewfWCW1Un1-UYUUD2KZ46hdZOqzodCDKAcEyVU-yEASMZTzvnrGqPAtMm88GhDm96whtFl6zs81oRzqxAQNR6rTO2_Ifyu4S1_46yOO',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGv0jLghH1HODTiJqHgTV3-7XfGnU3Al_sebYoVth52G2YfNTi3CBQOqh6kf--KTRyj82lYT90zyJu6HPVJb8e7AHPxC_em-SGv704GvtqAX40KtM_YAZJ2m10OERCZ022vdQduFP7ua_61-TcxahY5Dx1MSdUCnrWqLy2IS5470fyaEO7eoQUwD3_InbkD5zZxs4RyqZ47WKFj6okv1oSTo-DtIVFDsXMDZz1cAltGH3uoaz9MASItRYYLNAa9iod7J15BfYvov8g',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2CtIXTT9GZfHUG7TXPgb6d2pEv7-_AI_7bkptKPY8LiF7UfJpVwgat3fDUKH7aBvBYiGqbetwzhTyxTh-oZt8pHWjZOYbiaAjnHkdoEy47q4xpnsB3xLbjL7QTjuReKlWn58_7jfQqz_cOXfOeFkzvy1o7oJxOcw_vatJnvKYW6dxoH4tuFurAuQaiPyjx_WMOcdN3p-r49ikRb_OU0OoGzb5F53a0byz9pNJVppHTIfEB8fMl_aFcSsnjBDe4_1Wo2-pner2gGW8',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwP-ZIlBehLlQ-hzGFgmBcSbroXFn6S_imNHXMYC_1uhoYPqgqv2IlYiK_5Sd57ESKv0kok0fXbGag8g0s8UaBGrtiWrZFkFkJg8F_3LZvVZT50oZZLWNDx89jqREHna60mRnSD9SqPzO3KXpmwOMyK0ziBgHVyWSIcQeif5JdT4-BlpabKjV5O78xa_PN83ryO6LJAljJz7UYLS39fP1v5AsRtaotPGdppNKuXnx3fqu-1WCxPB383Wk-FdTD3-Z6tzXE6XxWiq--'
    ];

    this.courses = (elsaData as any[]).map((topic, index) => {
      return {
        id: topic.topic_id.toString(),
        title: topic.topic_name,
        description: `Học từ vựng về chủ đề ${topic.topic_name}`,
        level: 'Intermediate', // Default level
        thumbnail: thumbnails[index % thumbnails.length],
        words: topic.words.map((w: any, wIndex: number) => ({
          id: `${topic.topic_id}-${wIndex}`,
          term: w.word,
          definition: w.english_definition,
          pronunciation: w.ipa,
          example: w.example_sentence,
          partOfSpeech: w.part_of_speech,
          meaning: w.vietnamese_meaning,
          exampleTranslation: w.example_translation,
          grammarAnalysis: w.grammar_analysis,
          collocations: w.collocations,
          notes: w.notes,
          imageKeyword: w.image_keyword,
          synonyms: w.synonyms,
          antonyms: w.antonyms,
          wordFamily: w.word_family,
          commonMistakes: w.common_mistakes,
          mnemonic: w.mnemonic
        }))
      };
    });
  }

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  getWordById(id: string): Word | undefined {
    for (const course of this.courses) {
      const word = course.words.find(w => w.id === id);
      if (word) return word;
    }
    return undefined;
  }
}
