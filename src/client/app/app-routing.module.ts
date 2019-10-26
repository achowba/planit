import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth.guard';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { LostComponent } from './lost/lost.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'new',
		component: AddTodoComponent,
	},
	{
		path: 'lost',
		component: LostComponent,
	},
	{
		path: '**',
		redirectTo: 'lost'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
