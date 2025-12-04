import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { CourseList } from './features/vocabulary/course-list/course-list';
import { LessonDetail } from './features/vocabulary/lesson-detail/lesson-detail';
import { LessonExercisesComponent } from './features/vocabulary/exercises/lesson-exercises/lesson-exercises';
import { MatchingComponent } from './features/vocabulary/exercises/matching/matching';
import { Quiz } from './features/vocabulary/exercises/quiz/quiz';
import { FillInBlank } from './features/vocabulary/exercises/fill-in-blank/fill-in-blank';
import { ListenWrite } from './features/vocabulary/exercises/listen-write/listen-write';
import { GrammarList } from './features/grammar/grammar-list/grammar-list';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

import { ReadingComponent } from './features/reading/reading/reading';
import { Review } from './features/review/review';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'vocabulary', component: CourseList },
    { path: 'vocabulary/:id', component: LessonDetail },
    { path: 'vocabulary/:id/exercises', component: LessonExercisesComponent },
    { path: 'vocabulary/:id/exercises/matching', component: MatchingComponent },
    { path: 'vocabulary/:id/exercises/quiz', component: Quiz },
    { path: 'vocabulary/:id/exercises/fill-in-blank', component: FillInBlank },
    { path: 'vocabulary/:id/exercises/listen-write', component: ListenWrite },
    { path: 'grammar', component: GrammarList },
    { path: 'reading', component: ReadingComponent },
    { path: 'dashboard', component: Dashboard },
    { path: 'review', component: Review },
    { path: '**', redirectTo: '' }
];
