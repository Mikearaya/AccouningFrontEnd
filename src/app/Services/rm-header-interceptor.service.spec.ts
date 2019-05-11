/*
 * @CreateTime: Sep 6, 2018 4:48 PM
 * @Author:  Mikael Araya
 * @Contact: MikaelAraya12@gmail.com
 * @Last Modified By: Naol
 * @Last Modified Time: May 6, 2019 4:20 PM
 * @Description: Modify Here, Please
 */
import { TestBed, inject } from "@angular/core/testing";

import { RmHeaderInterceptorService } from "./rm-header-interceptor.service";
import { ActivatedRoute } from "@angular/router";

describe("RmHeaderInterceptorService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RmHeaderInterceptorService,
        {
          provide: ActivatedRoute
        }
      ]
    });
  });

  it("Should be created", inject(
    [RmHeaderInterceptorService],
    (service: RmHeaderInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
