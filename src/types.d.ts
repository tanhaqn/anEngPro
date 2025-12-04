declare module 'google-translate-api-browser' {
    export function translate(text: string, options?: { from?: string; to?: string }): Promise<{ text: string; from: { language: { iso: string } } }>;
}
