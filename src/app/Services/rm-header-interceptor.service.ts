/**
 * /*
 *
 * @format
 * @CreateTime: Sep 6, 2018 4:45 PM
 * @Author: Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 6, 2019 12:16 PM
 * @Description: Http Intercepter to modify passing http request
 */

import { Injectable } from '@angular/core';

import {
    HttpRequest,
    HttpInterceptor,
    HttpHandler,
    HttpEvent,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { tap, catchError, finalize } from 'rxjs/operators';
import {
    createSpinner,
    showSpinner,
    hideSpinner,
} from '@syncfusion/ej2-popups';

@Injectable()
export class RmHeaderInterceptorService implements HttpInterceptor {
    constructor(private location: ActivatedRoute) {
        /*   createSpinner({
      // Specify the target for the spinner to show
      target: document.getElementById("spinner-container")
    }); */
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // showSpinner(document.getElementById("spinner-container"));
        const requestUrl = request.url;
        const started = Date.now();
        const modifiedRequest = request.clone({
            url: `http://${window.location.hostname}:5000/api/${requestUrl}`,
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
            },
        });
        return next.handle(modifiedRequest).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.status === 201) {
                } else if (
                    event instanceof HttpResponse &&
                    event.status === 204
                ) {
                }
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status !== 401) {
                    // 401 handled in auth.interceptor
                    console.error(error.message);
                }
                return throwError(error);
            }),
            finalize(() => {
                // hideSpinner(document.getElementById("spinner-container"));
                const elapsed = Date.now() - started;
                const msg = `${request.method} "${
                    request.urlWithParams
                }" in ${elapsed} ms.`;
            })
        );
    }
}
