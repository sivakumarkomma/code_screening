import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContent, Content } from '../content.model';

import { ContentService } from './content.service';

describe('Content Service', () => {
  let service: ContentService;
  let httpMock: HttpTestingController;
  let elemDefault: IContent;
  let expectedResult: IContent | IContent[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      header: 'AAAAAAA',
      footer: 'AAAAAAA',
      paragraph: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Content', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Content()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Content', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          header: 'BBBBBB',
          footer: 'BBBBBB',
          paragraph: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Content', () => {
      const patchObject = Object.assign(
        {
          header: 'BBBBBB',
          paragraph: 'BBBBBB',
        },
        new Content()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Content', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          header: 'BBBBBB',
          footer: 'BBBBBB',
          paragraph: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Content', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addContentToCollectionIfMissing', () => {
      it('should add a Content to an empty array', () => {
        const content: IContent = { id: 123 };
        expectedResult = service.addContentToCollectionIfMissing([], content);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(content);
      });

      it('should not add a Content to an array that contains it', () => {
        const content: IContent = { id: 123 };
        const contentCollection: IContent[] = [
          {
            ...content,
          },
          { id: 456 },
        ];
        expectedResult = service.addContentToCollectionIfMissing(contentCollection, content);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Content to an array that doesn't contain it", () => {
        const content: IContent = { id: 123 };
        const contentCollection: IContent[] = [{ id: 456 }];
        expectedResult = service.addContentToCollectionIfMissing(contentCollection, content);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(content);
      });

      it('should add only unique Content to an array', () => {
        const contentArray: IContent[] = [{ id: 123 }, { id: 456 }, { id: 53829 }];
        const contentCollection: IContent[] = [{ id: 123 }];
        expectedResult = service.addContentToCollectionIfMissing(contentCollection, ...contentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const content: IContent = { id: 123 };
        const content2: IContent = { id: 456 };
        expectedResult = service.addContentToCollectionIfMissing([], content, content2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(content);
        expect(expectedResult).toContain(content2);
      });

      it('should accept null and undefined values', () => {
        const content: IContent = { id: 123 };
        expectedResult = service.addContentToCollectionIfMissing([], null, content, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(content);
      });

      it('should return initial array if no Content is added', () => {
        const contentCollection: IContent[] = [{ id: 123 }];
        expectedResult = service.addContentToCollectionIfMissing(contentCollection, undefined, null);
        expect(expectedResult).toEqual(contentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
