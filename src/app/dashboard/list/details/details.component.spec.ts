import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DashboardService } from '../../dashboard.service';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(),
          },
        },
        {
          provide: Location,
          useValue: {
            back: () => {},
          },
        },
        {
          provide: DashboardService,
          useValue: {
            editCurrency: () => of(),
          }
        }
      ],
      declarations: [ DetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.goBack()', () => {
    it('should call location back`',
    inject([Location], (ngLocation: Location) => {
      spyOn(ngLocation, 'back');

      component.goBack();
      expect(ngLocation.back).toHaveBeenCalled();
    }));
  });
});
