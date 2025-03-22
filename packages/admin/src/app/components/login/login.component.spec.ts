import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        MessageService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('you should initialize the form with empty values', () => {
    expect(component.formGroup.value).toEqual({ email: null, password: null });
  });

  it('should mark isSubmitted as true when trying to log in', () => {
    component.login();
    expect(component.isSubmitted).toBeTrue();
  });

  it('you should not call AuthService.login if the form is invalid', () => {
    component.formGroup.setValue({ email: '', password: '' });
    component.login();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  });

  it('you should call AuthService.login with valid credentials', () => {
    component.formGroup.setValue({
      email: 'test@example.com',
      password: '123456',
    });

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456',
    });
  });
});
