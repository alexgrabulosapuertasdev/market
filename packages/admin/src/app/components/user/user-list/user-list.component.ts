import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { UserResponse } from "../../../shared/interfaces/user/user-response.interface";
import { ConfirmationService, MessageService } from "primeng/api";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ButtonModule } from "primeng/button";
import { UserFormComponent } from "../user-form/user-form.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [ButtonModule, CardModule, CommonModule, ConfirmDialogModule, TableModule, UserFormComponent],
})
export class UserListComponent implements OnInit {
  users: UserResponse[] = [];
  modalUserFormIsOpened = false;

  constructor(
    private readonly confirmationService: ConfirmationService,
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
          summary: 'Obtener usuarios',
          detail: 'Error al obtener los usuarios',
        });
      },
    });
  }

  deleteUser({ id, name }: { id: string, name: string }): void {
    this.confirmationService.confirm({
      accept: () => {
        this.userService.delete(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Eliminar usuario',
              detail: `Se ha eliminado al usuario "${name}" con éxito`,
            });
            this.fetchUsers();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Eliminar usuario',
              detail: `Error al eliminar al usuario "${name}"`,
            });
          }
        });
      },
      header: `Eliminar al usuario ${name}`,
      message: `¿Estás seguro de que quieres eliminar al usuario "${name}"?`,
      acceptLabel: 'Sí',
      acceptButtonStyleClass: 'bg-green-500 border-green-500',
      rejectButtonStyleClass: 'bg-red-500 border-red-500',
    });
  }

  openModalAddUser(): void {
    this.modalUserFormIsOpened = true;
  }

  closeModalAddUser(): void {
    this.modalUserFormIsOpened = false;
  }
}
