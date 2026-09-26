import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonStepflowComponent } from './json-stepflow.component';

describe('JsonStepflowComponent', () => {
  let component: JsonStepflowComponent;
  let fixture: ComponentFixture<JsonStepflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonStepflowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonStepflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
