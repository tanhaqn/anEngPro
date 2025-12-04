export interface GrammarAnalysis {
    grammar_id: number;
    structure: string;
    explanation: string;
}

export interface Word {
    id: string;
    term: string;
    definition: string; // English definition
    pronunciation: string;
    example: string; // Example sentence
    image?: string;

    // New fields from ELSA_FULL.json
    part_of_speech?: string;
    vietnamese_meaning?: string;
    example_translation?: string;
    grammar_analysis?: GrammarAnalysis;
    collocations?: string[];
    notes?: string;
    image_keyword?: string;
    synonyms?: string[];
    antonyms?: string[];
    word_family?: string[];
    common_mistakes?: string;
    mnemonic?: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    level: string; // Changed to string for more flexibility (A1, A2, B1, etc.)
    words: Word[];
    thumbnail?: string;
    // Added properties to match the new UI
    category?: string;
    lessons?: number;
    hours?: number;
    progress?: number;
}

export interface WordStatus {
    wordId: string;
    strength: number; // 0 to 5 (or higher)
    nextReviewDate: string; // ISO date string
    lastReviewed: string; // ISO date string
}
