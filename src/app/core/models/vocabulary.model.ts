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
    ipa?: string; // Added to match API
    audioUrl?: string; // New field
    example: string; // Example sentence
    image?: string;

    // New fields from ELSA_FULL.json -> formatted to camelCase
    partOfSpeech?: string; // part_of_speech
    meaning?: string; // vietnamese_meaning
    exampleTranslation?: string; // example_translation
    grammarAnalysis?: GrammarAnalysis; // grammar_analysis
    collocations?: string[];
    notes?: string;
    imageKeyword?: string; // image_keyword
    synonyms?: string[];
    antonyms?: string[];
    wordFamily?: string[]; // word_family
    commonMistakes?: string; // common_mistakes
    mnemonic?: string;

    // Progress fields
    isCompleted?: boolean;
    progress?: number;
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
