/** @format */

import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpResponse,
} from '@angular/common/http';
import { SystemCacheService } from './system-cache.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SystemCacheInterceptorService implements HttpInterceptor {
    constructor(private systemCache: SystemCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRequestCachable(req)) {
            return next.handle(req);
        }

        const cachedResponse = this.systemCache.get(req);

        if (cachedResponse !== null) {
            console.log('found');

            return of(cachedResponse);
        }
        return next.handle(req).pipe(
            tap((event) => {
                if (event instanceof HttpResponse) {
                    console.log('cached');
                    this.systemCache.put(req, event);
                }
            })
        );
    }
    private isRequestCachable(req: HttpRequest<any>) {
        return req.method === 'GET';
    }
}
