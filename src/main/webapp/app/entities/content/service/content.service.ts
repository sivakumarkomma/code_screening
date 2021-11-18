import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContent, getContentIdentifier } from '../content.model';

export type EntityResponseType = HttpResponse<IContent>;
export type EntityArrayResponseType = HttpResponse<IContent[]>;

@Injectable({ providedIn: 'root' })
export class ContentService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/contents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(content: IContent): Observable<EntityResponseType> {
    return this.http.post<IContent>(this.resourceUrl, content, { observe: 'response' });
  }

  update(content: IContent): Observable<EntityResponseType> {
    return this.http.put<IContent>(`${this.resourceUrl}/${getContentIdentifier(content) as number}`, content, { observe: 'response' });
  }

  partialUpdate(content: IContent): Observable<EntityResponseType> {
    return this.http.patch<IContent>(`${this.resourceUrl}/${getContentIdentifier(content) as number}`, content, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addContentToCollectionIfMissing(contentCollection: IContent[], ...contentsToCheck: (IContent | null | undefined)[]): IContent[] {
    const contents: IContent[] = contentsToCheck.filter(isPresent);
    if (contents.length > 0) {
      const contentCollectionIdentifiers = contentCollection.map(contentItem => getContentIdentifier(contentItem)!);
      const contentsToAdd = contents.filter(contentItem => {
        const contentIdentifier = getContentIdentifier(contentItem);
        if (contentIdentifier == null || contentCollectionIdentifiers.includes(contentIdentifier)) {
          return false;
        }
        contentCollectionIdentifiers.push(contentIdentifier);
        return true;
      });
      return [...contentsToAdd, ...contentCollection];
    }
    return contentCollection;
  }
}
