import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { LookupService } from "./lookup.service";
import { LookupView, Lookup } from "../../features/lookups/lookups";
import { AccountCategory } from "../../features/account-catagory/account-catagory-domain";
import { RouterTestingModule } from "@angular/router/testing";
import { CoreModule } from "../core.module";
import { AccountingApiService } from "src/app/Services/accounting-api.service";

describe("Lookup service", () => {
  let lookupApi: LookupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule, RouterTestingModule],
      providers: [LookupService, AccountingApiService]
    });

    // inject the service
    lookupApi = TestBed.get(LookupService);
    httpMock = TestBed.get(HttpTestingController);
  });
  // expecting the correct(but faked) result: propery 'Name' with value 'Account1'
  it("Should get lookup successfull", () => {
    const returnedSingleLookup: LookupView = {
      Id: 1,
      Type: "type",
      Value: "value"
    };

    lookupApi.getLookupId(1).subscribe((data: any) => {
      expect(data.Id).toBe(1);
      expect(data.Type).toBe("type");
      expect(data.Value).toBe("value");
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:5000/system-lookups/1",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(returnedSingleLookup);

    httpMock.verify();
  });
  it("Should get all lookups successfull", () => {
    const returnedLookups: LookupView[] = [
      {
        Id: 1,
        Type: "type",
        Value: "value"
      },
      {
        Id: 2,
        Type: "type",
        Value: "value"
      }
    ];
    lookupApi.getLookups().subscribe((data: any) => {
      expect(data).toEqual(returnedLookups);
    });
    // telling the httmock what kind of request we expect and toward which url
    const req = httpMock.expectOne(
      "http://localhost:5000/system-lookups?",
      "call to api"
    );
    expect(req.request.method).toBe("GET");

    // fire the request with its data we really expect

    req.flush(returnedLookups);

    httpMock.verify();
  });
  it("Should create lookup", () => {
    const newLookup: Lookup = {
      Id: 1,
      Type: "type",
      Value: "value"
    };
    lookupApi.createLookup(newLookup).subscribe((data: any) => {
      expect(data.Id).toBe(1);
      expect(data.Type).toBe("type");
      expect(data.Value).toBe("value");
    });
    const req = httpMock.expectOne(
      "http://localhost:5000/system-lookups",
      "post to api"
    );
    expect(req.request.method).toBe("POST");
    req.flush(newLookup);
    httpMock.verify();
  });
  it("Should update lookup", () => {
    const updatedLookup: Lookup = {
      Id: 1,
      Type: "type",
      Value: "value"
    };
    lookupApi.updateLookup(updatedLookup).subscribe((data: any) => {
      expect(data.Id).toBe(1);
      expect(data.Type).toBe("type");
      expect(data.Value).toBe("value");
    });
    const req = httpMock.expectOne(
      "http://localhost:5000/system-lookups",
      "put to api"
    );
    expect(req.request.method).toBe("PUT");

    req.flush(updatedLookup);

    httpMock.verify();
  });
  it("Should delete lookups", () => {
    lookupApi.deleteLookup(2).subscribe((data: any) => {
      expect(data).toBe(2);
    });

    const req = httpMock.expectOne(
      "http://localhost:5000/system-lookups/2",
      "delete to api"
    );
    expect(req.request.method).toBe("DELETE");

    req.flush(2);

    httpMock.verify();
  });
});
