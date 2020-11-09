import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public detailsType: string;
  public loading: boolean;
  public changeCurrencyForm: FormGroup;
  public submitted: boolean;

  details$ = this.route.params
    .pipe(
      map((params: Params) => {
        this.detailsType = `${params[`action`]}`;
        return `${params[`action`]}/${params[`id`]}`;
      }),
      switchMap(param => this.dashboardService.getDetail(param)),
    );

  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.changeCurrencyForm = this.formBuilder.group({
      newCurrency: ['', Validators.required],
    });
  }

  onSubmit(id: string, baseAmount: string): void {
    this.submitted = false;

    if (this.changeCurrencyForm.invalid) {
      return;
    }

    this.dashboardService.editCurrency(
        { id, baseAmount },
        this.changeCurrencyForm.controls.newCurrency.value
      )
      .subscribe(() => this.submitted = true);
  }

  goBack(): void {
    this.location.back();
  }
}
