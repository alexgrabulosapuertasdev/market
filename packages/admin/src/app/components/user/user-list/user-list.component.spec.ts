import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { UserListComponent } from "./user-list.component";
import { UserService } from '../../../services/user.service';
import { USER_ROLE } from '../../../shared/enum/user-role.enum';
import { UserResponse } from '../../../shared/interfaces/user/user-response.interface';

describe('UserListComponent', () => {
  let component: UserListComponent; 
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  const mockUsers: UserResponse[] = [
    {
      id: crypto.randomUUID(),
      name: crypto.randomUUID(),
      surnames: crypto.randomUUID(),
      email: `${crypto.randomUUID()}@gmail.com`,
      role: USER_ROLE.ADMIN,
    },
    {
      id: crypto.randomUUID(),
      name: crypto.randomUUID(),
      surnames: crypto.randomUUID(),
      email: `${crypto.randomUUID()}@gmail.com`,
      role: USER_ROLE.ADMIN,
    },
  ];

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['findAll']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    
    TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  }));

  describe('ngOnInit', () => {
    it('should fetch users on init', () => {
      userServiceSpy.findAll.and.returnValue(of(mockUsers));

      component.ngOnInit();

      expect(component.users).toEqual(mockUsers);
    });
  });

  describe('fetchUsers', () => {
    it('should save the users in the array', () => {
      userServiceSpy.findAll.and.returnValue(of(mockUsers));

      component.fetchUsers();

      expect(component.users).toEqual(mockUsers);
      expect(userServiceSpy.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
