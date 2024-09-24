import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = '/api/workouts/'; 

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addWorkout(workout: any): Observable<any> {
    return this.http.post(this.apiUrl, workout);
  }

  deleteWorkout(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
