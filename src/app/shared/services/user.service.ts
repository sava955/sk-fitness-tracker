import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = environment.beUrl + '/users';
  readonly httpClient = inject(HttpClient);

  getUser(id: number): Observable<any> {
    return this.httpClient.get<any>(this.url + `/${id}`);
  }
}
