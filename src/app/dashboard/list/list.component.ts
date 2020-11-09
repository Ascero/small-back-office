import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public dataColumn: string[];
  public loading = false;

  dataToList$ = this.route.params
    .pipe(
      tap(() => this.loading = true),
      map((params: Params) => {
        this.displayColumn(params[`action`]);
        return params[`action`];
      }),
      switchMap(param => this.dashboardService.getData(param)),
      tap(() => this.loading = false),
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dashboardService: DashboardService,
  ) {
  }

  showDetails(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  // Columns that  will be displayed depending on the requested data type
  // E.G: transactions or customers
  private displayColumn(requestedData: string): void {
    switch (requestedData) {
      case 'customers': {
        this.dataColumn = [
          'userName',
          'id',
          'details'
        ];
        break;
      }
      case 'transactions': {
        this.dataColumn = [
          'user',
          'date',
          'baseAmount',
          'targetAmount',
          'review'
        ];
        break;
      }
    }
  }
}
