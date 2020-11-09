import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => { },
          },
        },
      ],
      declarations: [ ListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.showDetails()', () => {
    it('should navigate with id',
      fakeAsync(inject([Router], (router: Router) => {
        const id = 'user-001';
        const spy = spyOn(router, 'navigate');
        component.showDetails(id);
        fixture.detectChanges();

        const navArgs = spy.calls.first().args[0];
        expect(navArgs).toEqual([id]);
      })),
    );
  });
});
