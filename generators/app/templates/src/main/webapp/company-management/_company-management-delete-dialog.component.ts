import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>PopupService } from './<%= tenantNameLowerFirst %>-popup.service';
import { <%= tenantNameUpperFirst %>Service } from './<%= tenantNameLowerFirst %>.service';

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-mgmt-delete-dialog',
    templateUrl: './<%= tenantNameLowerFirst %>-management-delete-dialog.component.html'
})
export class <%= tenantNameUpperFirst %>MgmtDeleteDialogComponent {

    <%= tenantNameLowerFirst %>: <%= tenantNameUpperFirst %>;

    constructor(
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.<%= tenantNameLowerFirst %>Service.delete(id).subscribe((response) => {
            this.eventManager.broadcast({ name: '<%= tenantNameLowerFirst %>ListModification',
                content: 'Deleted a <%= tenantNameLowerFirst %>'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-delete-dialog',
    template: ''
})
export class <%= tenantNameUpperFirst %>DeleteDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private <%= tenantNameLowerFirst %>PopupService: <%= tenantNameUpperFirst %>PopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.<%= tenantNameLowerFirst %>PopupService.open(<%= tenantNameUpperFirst %>MgmtDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
