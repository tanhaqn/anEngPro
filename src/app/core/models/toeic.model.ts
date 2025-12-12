/**
 * TOEIC Practice Module - Data Models
 * 
 * Flow:
 * ────────────────────────────────────────────────────────────
 *  TOEIC Home → Part 5 List → Part 5 Practice (Quiz)
 *            → Part 7 List → Part 7 Reading (Passage + Questions)
 * ────────────────────────────────────────────────────────────
 */

// ============================================================
// PART 5 - GRAMMAR MODELS
// ============================================================

/**
 * Part 5 Question - Một câu hỏi ngữ pháp trắc nghiệm
 */
export interface ToeicPart5Question {
    id: string;
    sentence: string;           // Câu có chỗ trống: "The manager _____ the report yesterday."
    options: string[];          // 4 đáp án: ["submitted", "submits", "submitting", "submit"]
    correctAnswer: number;      // Index của đáp án đúng: 0
    explanation: string;        // Giải thích: "Dùng V2 vì có 'yesterday' -> quá khứ đơn"
    grammarPoint: string;       // Điểm ngữ pháp: "Past Simple Tense"
}

/**
 * Part 5 Topic - Một chủ đề ngữ pháp (ví dụ: Danh từ, Động từ, Tính từ...)
 */
export interface ToeicPart5Topic {
    id: string;
    name_vi: string;            // "Danh từ"
    name_en: string;            // "Nouns"
    icon: string;               // Material icon: "description"
    description: string;        // Mô tả ngắn
    lessons: ToeicPart5Lesson[];
}

/**
 * Part 5 Lesson - Bài học trong một chủ đề
 */
export interface ToeicPart5Lesson {
    id: string;
    title: string;              // "Danh từ đếm được & không đếm được"
    content: string;            // Nội dung lý thuyết
    examples: {
        sentence: string;
        translation: string;
    }[];
    questions: ToeicPart5Question[];
}

// ============================================================
// PART 7 - READING MODELS
// ============================================================

/**
 * Part 7 Question - Một câu hỏi đọc hiểu
 */
export interface ToeicPart7Question {
    id: string;
    question: string;           // "What time does the lunch break end?"
    options: string[];          // 4 đáp án
    correctAnswer: number;      // Index đáp án đúng
    explanation?: string;       // Giải thích (optional)
}

/**
 * Part 7 Passage - Một bài đọc hiểu
 */
export interface ToeicPart7Passage {
    id: string;
    title: string;              // "Lunch Break Policy"
    type: string;               // "notice" | "email" | "memo" | "article" | "advertisement"
    content: string;            // Nội dung bài đọc
    questions: ToeicPart7Question[];
    difficulty: 'basic' | 'intermediate' | 'advanced';
}

/**
 * Part 7 Set - Một bộ bài đọc (như Set 1, Set 2...)
 */
export interface ToeicPart7Set {
    id: string;
    name: string;               // "Cơ bản 1"
    description: string;
    passages: ToeicPart7Passage[];
}

// ============================================================
// ROOT DATA STRUCTURE
// ============================================================

/**
 * TOEIC Data - Dữ liệu gốc cho toàn bộ module
 */
export interface ToeicData {
    part5: {
        title: string;
        description: string;
        topics: ToeicPart5Topic[];
    };
    part7: {
        title: string;
        description: string;
        sets: ToeicPart7Set[];
    };
}

// ============================================================
// USER PROGRESS MODELS (for future use)
// ============================================================

export interface ToeicProgress {
    userId: string;
    part5Progress: {
        topicId: string;
        completedLessons: string[];
        score: number;
    }[];
    part7Progress: {
        setId: string;
        completedPassages: string[];
        score: number;
    }[];
}
