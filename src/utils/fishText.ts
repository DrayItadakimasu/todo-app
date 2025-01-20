import { fishText } from 'fish-text/fish-text.js';


export function generateText(options: Record<string, unknown>): string {
    return fishText.getRandomRangeWords({
        lang: 'rus',
        ...options,
    });
}