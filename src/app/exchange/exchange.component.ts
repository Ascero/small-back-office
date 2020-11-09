import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { ExchangeService } from './exchange.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent implements OnInit  {
  public exchangeForm: FormGroup;
  public loading = false;
  public error: string;
  public submitted: boolean;

  constructor(
    private authService: AuthService,
    private exchangeService: ExchangeService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.exchangeForm = this.formBuilder.group({
      currency: ['', Validators.required],
      amount: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      newCurrency: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = false;

    if (this.exchangeForm.invalid) {
      return;
    }

    this.loading = true;

    this.exchangeService.postTransaction(
      this.exchangeForm.controls.currency.value,
      this.exchangeForm.controls.amount.value,
      this.exchangeForm.controls.newCurrency.value,
    )
    .subscribe({
      next: transaction => {
        this.loading = false;
        this.error = '';
        this.submitted = true;
        return transaction;
      },
      error: (error) => {
        this.loading = false;
        this.error = error;
        this.submitted = false;
      },
    });
  }

  showFormAfterSubmit(): void {
    this.exchangeForm.reset();
    this.submitted = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
