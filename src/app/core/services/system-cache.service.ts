/**
 * /*
 *
 * @format
 * @CreateTime: Jun 2, 2019 12:08 PM
 * @Author: Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By:  Mikael Araya
 * @Last Modified Time: Jun 2, 2019 1:53 PM
 * @Description: Modify Here, Please
 */

import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';

export const MAX_CACHE_AGE = 2000000; // in milliseconds

@Injectable()
export class SystemCacheService {
    cacheMap = new Map<string, CacheEntry>();
    get(req: HttpRequest<any>): HttpResponse<any> | null {
        const entry = this.cacheMap.get(req.urlWithParams);

        if (!entry) {
            return null;
        }

        const isExpired = Date.now() - entry.entryTime > MAX_CACHE_AGE;
        return isExpired ? null : entry.response;
    }
    put(req: HttpRequest<any>, res: HttpResponse<any>): void {
        const entry: CacheEntry = {
            url: req.urlWithParams,
            response: res,
            entryTime: Date.now(),
        };
        this.cacheMap.set(req.urlWithParams, entry);
        this.deleteExpiredCache();
    }
    private deleteExpiredCache() {
        this.cacheMap.forEach((entry) => {
            if (Date.now() - entry.entryTime > MAX_CACHE_AGE) {
                this.cacheMap.delete(entry.url);
            }
        });
    }
}

export interface CacheEntry {
    url: string;
    response: HttpResponse<any>;
    entryTime: number;
}
