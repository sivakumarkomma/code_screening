import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContent } from '../content.model';
import { ContentService } from '../service/content.service';
import { ContentDeleteDialogComponent } from '../delete/content-delete-dialog.component';

@Component({
  selector: 'jhi-content',
  templateUrl: './content.component.html',
})
export class ContentComponent implements OnInit {
  contents?: IContent[];
  isLoading = false;

  constructor(protected contentService: ContentService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.contentService.query().subscribe(
      (res: HttpResponse<IContent[]>) => {
        this.isLoading = false;
        this.contents = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IContent): number {
    return item.id!;
  }

  delete(content: IContent): void {
    const modalRef = this.modalService.open(ContentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.content = content;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
