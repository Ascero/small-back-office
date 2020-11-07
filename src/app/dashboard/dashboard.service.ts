import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ITransaction } from './transaction.model';
import { IUser } from '../user/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private currentDataSubject = new BehaviorSubject<string>('');

  public get currentDataValue(): string {
    return this.currentDataSubject.value;
  }

  constructor(
    private http: HttpClient,
  ) {
  }

  getData(data: string): Observable<ITransaction[] | IUser[]> {
    this.currentDataSubject.next(data);

    return this.http.get<any>(`${environment.apiUrl}/api/${data}`)
      .pipe(
        first(),
      );
  }
}
