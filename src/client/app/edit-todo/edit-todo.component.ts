import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

	todoId:string
	todo:any = [];

	constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.todoId = this.route.snapshot.paramMap.get('id');

			this.api.get(`todos/${this.todoId}`).subscribe((data) => {
				this.todo = data.todo;
				console.log(this.todo);
				return this.todo
			});
		}
	}

	updateTodo(form: NgForm) {
		const values = form.value;

		const payload = {
			title: values.title,
			description: values.description
		}

		this.api.patch(`todos/${this.todoId}`, payload).subscribe((data) => {
			form.reset();
			this.router.navigate(['/home']);
		});
	}

}
