import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { NotFoundComponent } from './pages/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./tasks/task.routes').then((m) => m.TASK_ROUTES),
  },
  { path: '**', component: NotFoundComponent },
];
