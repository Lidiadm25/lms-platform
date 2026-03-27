import { UserService } from './../../../auth/services/userService';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { User } from '../../../projects/interfaces/rest-project.interface';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-search-tags',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatSelectModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './search-tags.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SearchTags { 
  search = signal<string>('');
  userService = inject (UserService)
  searchResult = signal<User[]>([]);
  onSearch(){
    console.log(this.search())
    this.userService.getUsers(this.search()).subscribe((users) =>
    this.searchResult.set(users)
    
    );
    console.log(this.searchResult())
  }


  

  readonly addOnBlur = true;

  readonly users = signal<User[]>([]);

  namesAsArr: Array<string> = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.namesAsArr.push(value);
    }
  }

   selected(event: MatAutocompleteSelectedEvent): void {
    this.namesAsArr.push(event.option.viewValue);

    event.option.deselect();
  }

  remove(name:string): void {
    
   const index = this.namesAsArr.indexOf(name);
    if (index > -1) {
      this.namesAsArr.splice(index, 1);
    }
  }

 
}

