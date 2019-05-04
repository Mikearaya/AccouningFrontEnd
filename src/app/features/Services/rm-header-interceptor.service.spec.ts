/*
 * @CreateTime: Sep 6, 2018 4:48 PM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By:  Mikael Araya
 * @Last Modified Time: Sep 6, 2018 4:48 PM
 * @Description: Modify Here, Please
 */
import { TestBed, inject } from '@angular/core/testing';

import { RmHeaderInterceptorService } from './rm-header-interceptor.service';

describe('RmHeaderInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RmHeaderInterceptorService]
    });
  });

  it('should be created', inject(
    [RmHeaderInterceptorService],
    (service: RmHeaderInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
