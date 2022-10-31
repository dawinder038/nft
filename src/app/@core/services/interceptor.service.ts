import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private commonService: CommonService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req;
    if (!req.headers.get("skip")) {
      modifiedReq = req.clone({
        headers: this.GetHeaders(),
      });
    }
    return next.handle(modifiedReq)
      .pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error)),
      );
  }
  handleError(errorResponse: HttpErrorResponse) {
    console.log('HttpErrorResponse', errorResponse);

    if (errorResponse.status == 401) {
      this.commonService.unauthorized();
    }
    else if (
      errorResponse.status == 500 ||
      errorResponse.status == 501 ||
      errorResponse.status == 502 ||
      errorResponse.status == 503 ||
      errorResponse.status == 504 ||
      errorResponse.status == 505
    ) {
      this.commonService.showError('Server Side Error', 'Something Went Wrong on Server');
    } else if (errorResponse.status == 404) {
      this.commonService.showError('Not Found', 'Data Missing');
    }
    else if (errorResponse.status == 403) {
      this.commonService.showError('Not Allowed', 'Not Authorized to access this Page');
    }else{
      if (errorResponse.error instanceof ErrorEvent) {
        if (errorResponse.error.message) {
          this.commonService.showError(errorResponse.error.message ? errorResponse.error.message : "Something went wrong", '');
        }
      } else {
        let errorMsg = errorResponse.error.error_description ? errorResponse.error.error_description : errorResponse.error.message
        this.commonService.showError(errorMsg ? errorMsg : "Something went wrong", '');
      }
    }
    return throwError(() => errorResponse);
  }


  GetHeaders() {
    const headers = new HttpHeaders()
      .set("Authorization", this.GetAccessToken())
      .set("Content-Type", "application/json");
    return headers
  }

  GetAccessToken() {
    let authData=localStorage.getItem("user-session")
    if(authData){
      let authToken = authData;
      return authToken;
    }
    return ""
  }
}
