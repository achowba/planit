import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
	/* {
		path: '',
		redirectTo: 'contacts',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: 'contacts'
	} */
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
