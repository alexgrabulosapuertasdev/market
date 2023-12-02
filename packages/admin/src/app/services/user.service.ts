import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { API_URL } from "../shared/enum/api-url.enum";
import { UserResponse } from "../shared/interfaces/user/user-response.interface";

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  findAll(): Observable<UserResponse[]> {
    return this.get<UserResponse[]>(API_URL.USER);
  }
}
