export interface GrammarRule {
    id: number;
    name_vi: string;
    name_en: string;
    structure?: string; // Kept for simple rules
    formulas?: {
        affirmative: string;
        negative: string;
        interrogative: string;
    };
    usage?: string; // Kept for simple rules
    usages?: {
        title: string;
        examples: {
            sentence: string;
            translation: string;
        }[];
    }[];
    examples?: { // Kept for simple rules
        sentence: string;
        translation: string;
    }[];
    signal_words?: string[];
    note?: string;
}

export interface GrammarTopic {
    id: string; // e.g., 'present_simple', 'noun_types'
    title: string;
    description?: string;
    image?: string;
    rules: GrammarRule[];
}

export interface GrammarCategory {
    id: string; // e.g., 'tenses', 'parts_of_speech'
    title: string;
    description?: string;
    topics: GrammarTopic[];
}

export interface GrammarData {
    categories: GrammarCategory[];
}
