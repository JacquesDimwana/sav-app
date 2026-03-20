import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Navibar } from './navibar';

describe('Navibar', () => {
  let component: Navibar;
  let fixture: ComponentFixture<Navibar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navibar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Navibar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
