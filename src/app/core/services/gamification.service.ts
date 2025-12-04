import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PersistenceService } from './persistence.service';
import { WordStatus } from '../models/vocabulary.model';

export interface UserProgress {
    xp: number;
    level: number;
    hearts: number;
    maxHearts: number;
    streak: number;
    lastLoginDate: string; // ISO date string YYYY-MM-DD
    gems: number;
    wordProgress: Record<string, WordStatus>;
}

@Injectable({
    providedIn: 'root'
})
export class GamificationService {
    private readonly STORAGE_KEY = 'user_progress';
    private readonly DEFAULT_PROGRESS: UserProgress = {
        xp: 0,
        level: 1,
        hearts: 5,
        maxHearts: 5,
        streak: 0,
        lastLoginDate: '',
        gems: 0,
        wordProgress: {}
    };

    private progressSubject = new BehaviorSubject<UserProgress>(this.DEFAULT_PROGRESS);
    public progress$ = this.progressSubject.asObservable();

    constructor(private persistenceService: PersistenceService) {
        this.loadProgress();
        this.checkStreak();
    }

    private loadProgress() {
        const saved = this.persistenceService.getItem<UserProgress>(this.STORAGE_KEY);
        if (saved) {
            this.progressSubject.next(saved);
        } else {
            this.progressSubject.next({ ...this.DEFAULT_PROGRESS });
        }
    }

    private saveProgress() {
        this.persistenceService.setItem(this.STORAGE_KEY, this.progressSubject.value);
    }

    get currentProgress(): UserProgress {
        return this.progressSubject.value;
    }

    addXp(amount: number) {
        const current = this.currentProgress;
        const newXp = current.xp + amount;
        // Simple level up logic: Level up every 100 XP * current level
        let newLevel = current.level;
        const xpForNextLevel = current.level * 100;

        if (newXp >= xpForNextLevel) {
            newLevel++;
            // Bonus gems for leveling up
            this.addGems(10);
        }

        this.updateProgress({ xp: newXp, level: newLevel });
    }

    loseHeart() {
        const current = this.currentProgress;
        if (current.hearts > 0) {
            this.updateProgress({ hearts: current.hearts - 1 });
        }
    }

    refillHearts() {
        const current = this.currentProgress;
        // Cost 50 gems to refill
        if (current.gems >= 50) {
            this.updateProgress({
                hearts: current.maxHearts,
                gems: current.gems - 50
            });
            return true;
        }
        return false;
    }

    // Free refill (e.g. daily or ad-watch simulation)
    restoreHeart() {
        const current = this.currentProgress;
        if (current.hearts < current.maxHearts) {
            this.updateProgress({ hearts: current.hearts + 1 });
        }
    }

    addGems(amount: number) {
        const current = this.currentProgress;
        this.updateProgress({ gems: current.gems + amount });
    }

    spendGems(amount: number): boolean {
        const current = this.currentProgress;
        if (current.gems >= amount) {
            this.updateProgress({ gems: current.gems - amount });
            return true;
        }
        return false;
    }

    private checkStreak() {
        const current = this.currentProgress;
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = current.lastLoginDate;

        if (lastLogin === today) {
            return; // Already logged in today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        let newStreak = current.streak;
        if (lastLogin === yesterdayString) {
            newStreak++;
        } else if (lastLogin !== today) {
            // Streak broken if last login was not yesterday and not today
            // But if it's a new user (lastLogin is empty), streak starts at 1
            if (lastLogin === '') {
                newStreak = 1;
            } else {
                newStreak = 1; // Reset streak
            }
        }

        this.updateProgress({
            streak: newStreak,
            lastLoginDate: today
        });
    }

    private updateProgress(update: Partial<UserProgress>) {
        const next = { ...this.currentProgress, ...update };
        this.progressSubject.next(next);
        this.saveProgress();
    }

    // Spaced Repetition Logic (Simplified SM-2)
    updateWordStatus(wordId: string, quality: number) { // quality: 0-5
        const current = this.currentProgress;
        const now = new Date();
        let status = current.wordProgress[wordId];

        if (!status) {
            status = {
                wordId,
                strength: 0,
                nextReviewDate: now.toISOString(),
                lastReviewed: now.toISOString()
            };
        }

        // Simple algorithm:
        // If quality >= 3, strength increases. Else resets.
        // Interval = 2^strength days (approx)

        if (quality >= 3) {
            status.strength += 1;
        } else {
            status.strength = 0;
        }

        // Calculate next review date
        const daysToAdd = Math.pow(2, status.strength);
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + daysToAdd);

        status.nextReviewDate = nextDate.toISOString();
        status.lastReviewed = now.toISOString();

        const newWordProgress = { ...current.wordProgress, [wordId]: status };
        this.updateProgress({ wordProgress: newWordProgress });
    }

    getWordStatus(wordId: string): WordStatus | undefined {
        return this.currentProgress.wordProgress[wordId];
    }

    getDueWords(): string[] {
        const current = this.currentProgress;
        const now = new Date();
        const dueWords: string[] = [];

        for (const wordId in current.wordProgress) {
            const status = current.wordProgress[wordId];
            if (new Date(status.nextReviewDate) <= now) {
                dueWords.push(wordId);
            }
        }
        return dueWords;
    }
}
