import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';

interface Workout{
  _id: string,
  title: string,
  reps: number,
  load:number,
  createdAt: string,
  updatedAt: string
}

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})

export class WorkoutComponent implements OnInit{

  workouts: Workout[] = [];
  newWorkout: Workout = { _id: '', title: '', reps: 0, load: 0, createdAt: '', updatedAt: '' };

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.getWorkouts();
  }

  getWorkouts() {
    this.workoutService.getWorkouts().subscribe({
      next: (data: Workout[]) => {
        this.workouts = data;
      },
      error: (error) => {
        console.error('Error fetching workouts:', error);
      }
    });
  }

  addWorkout() {
    this.workoutService.addWorkout(this.newWorkout).subscribe({
      next: (workout: Workout) => {
        this.workouts.push(workout);
        this.newWorkout = { _id: '', title: '', reps: 0, load: 0, createdAt: '', updatedAt: '' };
      },
      error: (error) => {
        console.error('Error adding workout:', error);
      }
    });
  }

  deleteWorkout(id: string) {
    this.workoutService.deleteWorkout(id).subscribe({
      next: () => {
        this.workouts = this.workouts.filter(w => w._id !== id);
      },
      error: (error) => {
        console.error('Error deleting workout:', error);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

}
