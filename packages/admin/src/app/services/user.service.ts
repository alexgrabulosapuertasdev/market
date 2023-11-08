import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { API_URL } from "../shared/enum/api-url.enum";
import { User } from "../shared/interfaces/user/user.model";

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  findAll(): Observable<User[]> {
    return this.get<User[]>(API_URL.USER);
  }
}
