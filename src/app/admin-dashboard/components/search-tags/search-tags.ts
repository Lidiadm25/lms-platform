import { UserService } from './../../../auth/services/userService';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  selector: 'app-search-tags',
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './search-tags.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTags {
  projectId = input.required<string>();
  search = signal<string>('');
  userService = inject(UserService);
  searchResult = signal<User[]>([]);
  theresValues = signal<boolean>(false);
  onSearch() {
    console.log(this.search());
    this.userService.getUsersEmails(this.search(), this.projectId()).subscribe((users) => this.searchResult.set(users));
    console.log(this.searchResult());
  }

  namesAsArr: Array<string> = [];
  users = signal<string[]>([]);

  @Output() onUsersPicked = new EventEmitter<any>();

  constructor() {
    effect(() => {
      console.log('Valor de la señal: ' + this.theresValues());
      if (this.theresValues() == false) {
        let btn = document.getElementById('myBtn') as HTMLButtonElement;
        if (btn) btn.disabled = true;
      } else {
        console.log('entra a qui');
        let btn = document.getElementById('myBtn') as HTMLButtonElement;
        if (btn) {
          btn.disabled = false;
          console.log('entra en el ult if');
        }
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.namesAsArr.push(value);
      this.users.set(this.namesAsArr);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.theresValues() == false) {
      this.theresValues.set(true);
    }

    if (!this.namesAsArr.includes(event.option.viewValue)) {
      this.namesAsArr.push(event.option.viewValue);
      this.users.set(this.namesAsArr);
    }
    event.option.deselect();
  }

  remove(name: string): void {
    const index = this.namesAsArr.indexOf(name);
    if (index > -1) {
      this.namesAsArr.splice(index, 1);
      this.users.set(this.namesAsArr);
    }

    if (this.namesAsArr.length == 0) {
      this.theresValues.set(false);
    }
  }

  OnSaveUsers() {
    this.onUsersPicked.emit(this.users());
  }
}
