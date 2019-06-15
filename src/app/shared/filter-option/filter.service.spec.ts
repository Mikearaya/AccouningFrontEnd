import { TestBed } from "@angular/core/testing";

import { FilterService } from "./filter.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { CoreModule } from "src/app/core/core.module";
import { RouterTestingModule } from "@angular/router/testing";
import { LookupIndexView, YearIndexView } from "./filter";

describe("Filter service", () => {
  let filterService: FilterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
      providers: [FilterService]
    });

    // inject the service
    filterService = TestBed.get(FilterService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("Should get lookups successfull", () => {
    const response: LookupIndexView[] = [
      {
        Id: 1,
        Name: "lookup1"
      },
      {
        Id: 2,
        Name: "lookup2"
      }
    ];
    filterService.getLookups().subscribe((data: any) => {
      expect(data).toEqual(response);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(request => {
      console.log("url: ", request.url);
      return true;
    });
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(response);

    httpMock.verify();
  });
  it("Should get yearlist successfull", () => {
    const response: YearIndexView[] = [
      {
        Id: 1,
        Year: "2018"
      },
      {
        Id: 2,
        Year: "2019"
      }
    ];
    filterService.getYearList().subscribe((data: any) => {
      expect(data).toEqual(response);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(request => {
      console.log("url: ", request.url);
      return true;
    });
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(response);

    httpMock.verify();
  });
});
