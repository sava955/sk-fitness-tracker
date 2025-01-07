import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, ExerciseParams } from './exercise.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  readonly url = environment.beUrl + '/exercises';
  readonly httpClient = inject(HttpClient);

  constructor() { }

  getExercises(params: ExerciseParams): Observable<Exercise[]> {
    const httpParams = new HttpParams({fromObject: {...params}});
    return this.httpClient.get<Exercise[]>(this.url, {params: httpParams});
  }
}
