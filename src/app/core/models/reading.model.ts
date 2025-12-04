export interface Sentence {
    en: string;
    vi: string;
}

export interface Conversation {
    id: string;
    title: string;
    sentences: Sentence[];
}

export interface Topic {
    id: string;
    name: string;
    conversations: Conversation[];
}

export interface Level {
    id: string;
    name: string;
    description: string;
    topics: Topic[];
}
