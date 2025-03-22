import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { AuthService } from "../../services/auth.service";
import { LoginCredentials } from "../../shared/interfaces/login/login-credentials.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ToastModule],
})
export class LoginComponent {
  formGroup = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [Validators.required]),
  });
  isSubmitted = false;

  constructor(
    private readonly authService: AuthService,
  ) {}

  login(): void {
    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      return;
    }

    const { email, password } = this.formGroup.value;

    const credentials: LoginCredentials = {
      email: email!,
      password: password!
    };

    this.authService.login(credentials);
  }
}
