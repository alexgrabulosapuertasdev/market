import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";

export interface FieldSetItem<T = string> {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'file' | 'textarea' | 'select';
  placeholder: string;
  size?: 'medium' | 'big';
  selectOptions?: Array<{
    value: T;
    description: string;
  }>;
  required?: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ToastModule,
  ],
})
export class FormComponent {
  @Input({ required: true }) isVisible = true;
  @Input({ required: true }) title = '';
  @Input({ required: true }) fieldsetList: FieldSetItem[] = [];
  @Input({ required: true }) formGroup: FormGroup = new FormGroup({});

  isSubmitted = false;
  imagePreview: string | null = null;

  @Output() submitEvent = new EventEmitter();
  @Output() closeModalEvent = new EventEmitter();

  triggerFileInput(id: string) {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event, name: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(file);
      this.formGroup.patchValue({ image: file });
      this.formGroup.get(name)?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;

    this.submitEvent.emit();
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }
}
