import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCacheService } from './users-cache.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  userList: any[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  totalUsers: number = 0;
  isLoading: boolean = true;
  searchResult: any | null = null;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userCacheService: UserCacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.currentPage = +params['page'] || 1;
      this.fetchUsers(this.currentPage);
    });
  }

  ngAfterViewInit() {
    this.paginator.pageIndex = this.currentPage - 1;
  }

  fetchUsers(page: number): void {
    const cachedResponse = this.userCacheService.getUserListData(page);
    if (cachedResponse) {
      this.currentPage = cachedResponse.page;
      this.handleResponse(cachedResponse);
    } else {
      const url = `https://reqres.in/api/users?page=${page}`;
      this.http.get<any>(url).subscribe((response) => {
        this.currentPage = response.page;
        this.handleResponse(response);
        this.userCacheService.setUserListData(response, page);
      });
    }
  }

  private handleResponse(response: any): void {
    this.userList = response.data;
    this.pageSize = response.per_page;
    this.totalUsers = response.total;
    this.isLoading = false;
  }

  onPageChange(event: any): void {
    const nextPage = event.pageIndex + 1;
    this.updateQueryParams(nextPage);
    this.currentPage = nextPage;
    this.fetchUsers(nextPage);
  }

  private updateQueryParams(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  handleSearch(userId: string): void {
    this.searchUser(userId);
  }

  searchUser(userId: string): void {
    const user = this.userList.find((user) => user.id === +userId);
    this.searchResult = user ? user : null;
  }

  navigateToUserDetails(user: any): void {
    this.router.navigate(['/user-details', user.id], {
      queryParams: { page: this.currentPage },
    });
  }
}
