import { UserService } from './../../../auth/services/userService';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
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
  search = signal<string>('');
  userService = inject(UserService);
  searchResult = signal<User[]>([]);
  onSearch() {
    console.log(this.search());
    this.userService.getUsers(this.search()).subscribe((users) => this.searchResult.set(users));
    console.log(this.searchResult());
  }

  namesAsArr: Array<string> = [];
  users = signal<string[]>([]);

  @Output() onUsersPicked = new EventEmitter<any>();

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.namesAsArr.push(value);
      this.users.set(this.namesAsArr);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
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
  }

  OnSaveUsers() {
    this.onUsersPicked.emit(this.users());
  }
}
