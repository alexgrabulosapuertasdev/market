import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { User } from "../../../shared/interfaces/user/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        alert('Error al obtener los usuarios');
      },
    });
  }
}
