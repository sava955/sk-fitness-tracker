import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ExerciseService } from './shared/exercise.service';
import { Exercise, ExerciseParams } from './shared/exercise.interface';
import { DsInfiniteScrollDirective } from '../../core/ds-infinite-scroll.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Activity } from './shared/activity.interface';

@Component({
  selector: 'app-exercises',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DsInfiniteScrollDirective,
    MatProgressSpinnerModule,
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent implements OnInit {
  params!: ExerciseParams;
  _start = 0;
  _limit = 18;
  exercises: Exercise[] = [];
  loading$ = new BehaviorSubject<boolean>(false);
  loadingMore = false;

  activities!: Activity[];

  met!: number;
  weight!: number; // kg
  duration!: number; // hours

  caloriesBurned = this.met * this.weight * this.duration;
  searchControl = new FormControl<string>('');

  readonly destroyRef = inject(DestroyRef);
  readonly exerciseService = inject(ExerciseService);

  ngOnInit(): void {
    this.resetParams();
    this.searchExercises();
  }

  setLoading(state: boolean): void {
    this.loading$.next(state);
  }

  resetParams(): void {
    this._start = 0;
    this._limit = 18;
    this.setParams();
  }

  setParams(extraParams: Partial<ExerciseParams> = {}): void {
    this.params = {
      _start: this._start,
      _limit: this._limit,
      ...extraParams,
    };
  }

  getExercises(
    extraParams: Partial<ExerciseParams> = {}
  ): Observable<Exercise[]> {
    this.setParams(extraParams);
    return this.exerciseService.getExercises(this.params).pipe(
      catchError((error) => {
        console.error('Failed to load exercises', error);
        return of([]);
      })
    );
  }

  searchExercises(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.setLoading(true)),
        switchMap((value) => {
          return this.getExercises({ specific_activities_like: value! }).pipe(
            finalize(() => this.setLoading(false))
          );
        })
      )
      .subscribe((res) => {
        this.exercises = res;
      });
  }

  loadMore(scrolled: boolean): void {
    if (!scrolled) {
      return;
    }

    this.loadingMore = true;
    this._start = this.exercises.length;

    this.setParams();
    this.getExercises()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.loadingMore = false))
      )
      .subscribe((res) => {
        this.exercises = [...this.exercises, ...res];
      });
  }
}