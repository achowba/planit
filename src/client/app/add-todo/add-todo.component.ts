import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-add-todo',
	templateUrl: './add-todo.component.html',
	styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

	// inject dependencies in the constructor
	constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

	id: string;

	ngOnInit() {
	}

	addTodo(form: NgForm) {
		const values = form.value;

		const payload = {
			title: values.title,
			description: values.description
		}

		this.api.post('todos', payload).subscribe((data) => {
			form.reset();
			// this.router.navigate(['/home']);
		});
	}

}
