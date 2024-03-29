import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  currentUser: any = {};
  isLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('userId');
      // Use userId to fetch user details or perform other actions
      const url = `https://reqres.in/api/users/${userId}`;
      this.http.get<any>(url).subscribe((response) => {
        this.currentUser = response.data;
        this.isLoading = false;
      });
    });
  }

  goBack(): void {
    // Construct the URL with necessary query parameters
    const url = this.router
      .createUrlTree(['/users'], { queryParamsHandling: 'merge' })
      .toString();
    // Navigate back to the constructed URL
    this.router.navigateByUrl(url);
  }
}
