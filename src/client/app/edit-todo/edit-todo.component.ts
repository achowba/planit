import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { Todo } from './../../models/todo.model';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

	todoId:string
	todos: Todo[];

	constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute) {}

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.todoId = this.route.snapshot.paramMap.get('id');
			console.log(this.todoId);

			this.api.get(`todos/${this.todoId}`).subscribe((data) => {
				this.todos = data.todos;
				console.log(data.todo);
			});
		}
	}

}
