import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth.guard';

// import component
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { LostComponent } from './lost/lost.component';
import { SignupComponent } from './signup/signup.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard] // auth guard to prevent access to pages without logging in
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'signup',
		component: SignupComponent,
	},
	{
		path: 'new',
		component: AddTodoComponent,
		canActivate: [AuthGuard] // auth guard to prevent access to pages without logging in
	},
	{
		path: 'todo/:id',
		component: EditTodoComponent
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
