import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { <%= tenantNameUpperFirst %> } from './<%= tenantNameLowerFirst %>.model';
import { <%= tenantNameUpperFirst %>Service } from './<%= tenantNameLowerFirst %>.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: '<%=jhiPrefix%>-<%= tenantNameLowerFirst %>-mgmt',
    templateUrl: './<%= tenantNameLowerFirst %>-management.component.html'
})
export class <%= tenantNameUpperFirst %>MgmtComponent implements OnInit, OnDestroy {
    <%= tenantNamePluralLowerFirst %>: <%= tenantNameUpperFirst %>[];
    currentAccount: any;
    eventSubscriber: Subscription;
    <%_ if (databaseType !== 'cassandra') { _%>
    itemsPerPage: any;
    page: any;
    previousPage: any;
    routeData: any;
    reverse: any;
    predicate: any;
    totalItems: any;
    queryCount: any;
    <%_ } _%>

    constructor(
        private <%= tenantNameLowerFirst %>Service: <%= tenantNameUpperFirst %>Service,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        <%_ if (databaseType !== 'cassandra') { _%>
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        <%_ } _%>
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        <%_ if (databaseType !== 'cassandra') { _%>
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        <%_ } _%>
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
            this.registerChangeIn<%= tenantNamePluralUpperFirst %>();
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadAll() {
        this.<%= tenantNameLowerFirst %>Service.query(<% if (databaseType !== 'cassandra') { %>{
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()}<% } %>).subscribe(
            (res: ResponseWrapper) => {
                this.<%= tenantNamePluralLowerFirst %> = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/<%= tenantNameLowerFirst %>-management'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    <%_ if (databaseType !== 'cassandra') { _%>
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    <%_ } _%>

    trackId(index: number, item: <%= tenantNameUpperFirst %>) {
        return item.id;
    }

    registerChangeIn<%= tenantNamePluralUpperFirst %>() {
        this.eventSubscriber = this.eventManager.subscribe('<%= tenantNameLowerFirst %>ListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
