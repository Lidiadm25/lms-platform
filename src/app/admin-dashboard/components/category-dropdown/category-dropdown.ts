import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { CategoryService } from '../../../auth/services/CategoryService';
import { Category } from '../../../projects/interfaces/project.interface';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-dropdown',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './category-dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDropdown { 
  categoryService = inject(CategoryService)
  categories = signal<Category[]>([]);
  chosenCategory = signal<string>('Select a category');

  control = input.required<FormControl>();
  
 
  constructor(){
    this.categoryService.getCategories().subscribe((result)=>this.categories.set(result));
  }

  
}
