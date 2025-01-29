import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddExerciseFormComponent } from './add-exercise-form/add-exercise-form.component';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../shared/exercise.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Exercise } from '../shared/exercise.interface';

@Component({
  selector: 'app-add-exercise',
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddExerciseComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly route = inject(ActivatedRoute);
  readonly exerciseService = inject(ExerciseService);
  readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    
    this.exerciseService.getExercise(id).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((response: Exercise) => {
      this.openDialog(response);
    });
  }

  openDialog(exercise: Exercise): void {
    this.dialog.open(AddExerciseFormComponent, {
      data: {
       ...exercise 
      },
      width: '600px',
    });
  }

}
