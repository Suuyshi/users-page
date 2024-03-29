import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() search = new EventEmitter<string>();

  searchUser(input: any): void {
    this.search.emit(input.target.value);
  }
}
