import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CustomHttpClient {
  httpOptionsJson = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  httpOptionsBlob = new HttpHeaders({
    responseType: 'blob',
    observe: 'response',
  });

  constructor(private http: HttpClient, private router: Router) {}

  get(url: string): any {
    return this.http
      .get(url, { headers: this.httpOptionsJson })
      .pipe(catchError(this.handleHttpErrors));
  }

  post(url: string, request: any): any {
    return this.http.post(url, request).pipe(catchError(this.handleHttpErrors));
  }

  delete(url: string): any {
    return this.http
      .delete(url, { headers: this.httpOptionsJson })
      .pipe(catchError(this.handleHttpErrors));
  }

  put(url: string, request: any): any {
    return this.http.put(url, request).pipe(catchError(this.handleHttpErrors));
  }

  getBlob(url: string): any {
    return this.http
      .get(url, { headers: this.httpOptionsBlob })
      .pipe(catchError(this.handleHttpErrors));
  }

  multipartPost(url: string, formData: FormData): any {
    return this.http
      .post(url, formData)
      .pipe(catchError(this.handleHttpErrors));
  }

  private handleHttpErrors(error: Response) {
    switch (error.status) {
      case 503 || 500:
        this.routeToErrorView();
        return throwError(error);
      case 401 || 403: // unauthorised
        this.routeToUnauthorisedView();
        return throwError(error);
      case 404:
        return throwError(error);
      default:
        break;
    }
  }

  routeToErrorView() {
    this.router.navigate(['/error']);
  }

  routeToUnauthorisedView() {
    this.router.navigate(['/unauthorised']);
  }
}
