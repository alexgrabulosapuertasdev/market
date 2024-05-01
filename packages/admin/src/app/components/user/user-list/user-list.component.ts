import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { UserResponse } from "../../../shared/interfaces/user/user-response.interface";
import { MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { UserFormComponent } from "../user-form/user-form.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  providers: [MessageService],
  imports: [ButtonModule, CardModule, CommonModule, TableModule, UserFormComponent],
})
export class UserListComponent implements OnInit {
  users: UserResponse[] = [];
  modalUserFormIsOpened = false;

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.findAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener los usuarios',
        });
      },
    });
  }

  openModalAddUser(): void {
    this.modalUserFormIsOpened = true;
  }

  closeModalAddUser(): void {
    this.modalUserFormIsOpened = false;
  }
}
