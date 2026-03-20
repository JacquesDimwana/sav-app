import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalNoticePages } from './legal-notice-pages';

describe('LegalNoticePages', () => {
  let component: LegalNoticePages;
  let fixture: ComponentFixture<LegalNoticePages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegalNoticePages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegalNoticePages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
