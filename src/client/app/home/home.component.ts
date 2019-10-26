import { Component, OnInit, Input, HostBinding } from '@angular/core';

import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Todo } from './../../models/todo.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

	// @Input() todo: Todo; //
	// @HostBinding('class') columnClass = 'four wide column';

	todos: Todo[]
	constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.api.get('todos').subscribe(data => {
				console.log(data.todos)
				this.todos = data.todos;
			});
		}
	}

}
