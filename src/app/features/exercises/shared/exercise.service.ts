import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, ExerciseGroup, ExerciseParams } from './exercise.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  readonly url = environment.beUrl + '/exercises';
  readonly httpClient = inject(HttpClient);

  getExercises(params: ExerciseParams): Observable<Exercise[]> {
    const httpParams = new HttpParams({fromObject: {...params}});
    return this.httpClient.get<Exercise[]>(this.url, {params: httpParams});
  }

  getExercise(id: string): Observable<Exercise> {
    return this.httpClient.get<Exercise>(this.url + `/${id}`);
  }

  addExercises(exerciseGrpup: ExerciseGroup[]): Observable<ExerciseGroup[]> {
    const observable = new Observable<ExerciseGroup[]>((subscriber) => {
      subscriber.next(exerciseGrpup);
      subscriber.complete();
    });

    return observable;
  }
}
