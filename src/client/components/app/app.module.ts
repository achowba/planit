import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../../services/auth.guard';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent
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
