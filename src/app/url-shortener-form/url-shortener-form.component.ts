import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-url-shortener-form',
  templateUrl: './url-shortener-form.component.html',
  styleUrls: ['./url-shortener-form.component.css']
})


export class UrlShortenerFormComponent {
  url = '';
  shortenedUrl='';
  errorMessage='';

  constructor(private http: HttpClient) {}

  shortenUrl(): void {
    this.http.post<any>('http://localhost:3000/api/shorten', { url: this.url })
      .subscribe({
        next: response => {
          this.shortenedUrl = response.shortUrl;
          this.errorMessage = '';
        },
        error: error => {
          this.shortenedUrl = '';
          this.errorMessage = error.error.message || 'An error occurred';
        }
      });
  }
}
