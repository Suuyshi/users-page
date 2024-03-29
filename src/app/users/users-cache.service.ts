import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  private cache: { [key: number]: any } = {};

  constructor() {}

  setUserListData(response: any, page: number): void {
    this.cache[page] = response;
  }

  getUserListData(page: number): any {
    return this.cache[page] || null;
  }

  clearCache(): void {
    this.cache = {};
  }
}
