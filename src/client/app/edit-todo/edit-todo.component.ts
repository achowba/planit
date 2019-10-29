import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-edit-todo',
	templateUrl: './edit-todo.component.html',
	styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

	todoId:string
	todo:any = [];

	constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.toastr.info("Please Wait", "Fetching todo", {
				progressAnimation: "decreasing"
			});
			this.todoId = this.route.snapshot.paramMap.get('id');

			this.api.get(`todos/${this.todoId}`).subscribe((data) => {
				this.toastr.clear();
				this.todo = data.todo;
				return this.todo;
			});
		}
	}

	updateTodo(form: NgForm) {
		const values = form.value;

		const payload = {
			title: values.title,
			description: values.description
		}

		this.toastr.info("Updating todo");
		this.api.patch(`todos/${this.todoId}`, payload).subscribe((data) => {
			if (data.status === 'success') {
				form.reset();
				this.toastr.clear();
				this.toastr.success("Todo Updated Successfully", "Added");
				this.router.navigate(['/home']);
			} else {
				this.toastr.error("Failed to Update Todo.", "An Error Occured")
			}
		});
	}

}
