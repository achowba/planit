import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { LostComponent } from './lost/lost.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { SignupComponent } from './signup/signup.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		NavComponent,
		TodoItemComponent,
		LostComponent,
		AddTodoComponent,
		SignupComponent,
		EditTodoComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule
	],
	providers: [ApiService, AuthService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
