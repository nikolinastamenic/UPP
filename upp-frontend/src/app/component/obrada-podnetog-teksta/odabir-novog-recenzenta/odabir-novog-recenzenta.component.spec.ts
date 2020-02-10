import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdabirNovogRecenzentaComponent } from './odabir-novog-recenzenta.component';

describe('OdabirNovogRecenzentaComponent', () => {
  let component: OdabirNovogRecenzentaComponent;
  let fixture: ComponentFixture<OdabirNovogRecenzentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdabirNovogRecenzentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdabirNovogRecenzentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
