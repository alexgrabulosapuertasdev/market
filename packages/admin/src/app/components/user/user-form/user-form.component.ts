import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { SelectButtonModule } from "primeng/selectbutton";
import { ToastModule } from 'primeng/toast';
import { UserService } from "../../../services/user.service";
import { USER_ROLE } from "../../../shared/enum/user-role.enum";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [ButtonModule, CommonModule, DialogModule, InputTextModule, ReactiveFormsModule, SelectButtonModule, ToastModule],
})
export class UserFormComponent implements OnInit {
  @Input() isVisible = true;
  formGroup: FormGroup = new FormGroup({});
  userRoleOptions = [
    { label: 'Administrador', value: USER_ROLE.ADMIN },
    { label: 'Trabajador', value: USER_ROLE.EMPLOYEE },
  ];
  isSubmitted = false;
  @Output() closeModalEvent = new EventEmitter();

  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {}

  ngOnInit(): void {
    this.createFormGroupToAddUser();
  }

  submit(): void {
    this.isSubmitted = true;
    if (this.formGroup.invalid) {
      return;
    }

    this.userService.create(this.formGroup.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Se ha añadido el usuario con éxito',
          summary: 'Añadir usuario',
        });
        this.formGroup.reset();
        this.isSubmitted = false;
        this.closeModal();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          detail: 'Error al intentar añadir al usuario',
          summary: 'Añadir usuario',
        });
      }
    });

  }

  private createFormGroupToAddUser(): void {
    this.formGroup.addControl('name', new FormControl(undefined, [Validators.required]));
    this.formGroup.addControl('surnames', new FormControl(undefined, [Validators.required]));
    this.formGroup.addControl('email', new FormControl(undefined, [Validators.required]));
    this.formGroup.addControl('password', new FormControl(undefined, [Validators.required]));
    this.formGroup.addControl('role', new FormControl(USER_ROLE.EMPLOYEE, [Validators.required]));
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
