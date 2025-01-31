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
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.scss',
})
export class ExercisesComponent implements OnInit {
  private params!: ExerciseParams;
  private _start = 0;
  private _limit = 18;
  exercises: Exercise[] = [];
  loading$ = new BehaviorSubject<boolean>(false);
  loadingMore = false;

  searchControl = new FormControl<string>('');

  private readonly destroyRef = inject(DestroyRef);
  private readonly exerciseService = inject(ExerciseService);

  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.resetParams();
    this.searchExercises();
  }

  private setLoading(state: boolean): void {
    this.loading$.next(state);
  }

  private resetParams(): void {
    this._start = 0;
    this._limit = 18;
    this.setParams();
  }

  private setParams(extraParams: Partial<ExerciseParams> = {}): void {
    this.params = {
      _start: this._start,
      _limit: this._limit,
      ...extraParams,
    };
  }

  private getExercises(
    extraParams: Partial<ExerciseParams> = {}
  ): Observable<Exercise[]> {
    this.setParams(extraParams);
    return this.exerciseService.getExercises(this.params);
  }

  private searchExercises(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.setLoading(true)),
        switchMap((value) => {
          return this.getExercises({ specific_activities_like: value! }).pipe(
            catchError((error) => {
              console.error('Failed to load exercises', error);
              const errorData = {
                title: 'Error',
                message: 'Failed to load exercises'
              }
              this.openDialog(errorData);
              return of([]);
            }),
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

  private openDialog(data: any): void {
    this.dialog.open(DialogComponent, {
      data: {
       ...data
      },
      width: '300px',
    });
  }

}
