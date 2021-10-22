import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CategoriesComponent } from './categories.component'

describe('HomeComponent', () => {
  let component: CategoriesComponent
  let fixture: ComponentFixture<CategoriesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})