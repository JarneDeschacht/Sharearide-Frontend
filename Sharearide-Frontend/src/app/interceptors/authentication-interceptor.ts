import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
import { SharearideDataService } from '../dataservice/sharearide-data.service';
  
  @Injectable()
  export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private _dataService: SharearideDataService) {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (this._dataService.token.length) {
        const clonedRequest = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${this._dataService.token}`
          )
        });
        return next.handle(clonedRequest);
      }
      return next.handle(req);
    }
  }