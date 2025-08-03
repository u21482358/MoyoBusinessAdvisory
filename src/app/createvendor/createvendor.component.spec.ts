import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevendorComponent } from './createvendor.component';

describe('CreatevendorComponent', () => {
  let component: CreatevendorComponent;
  let fixture: ComponentFixture<CreatevendorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatevendorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatevendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
