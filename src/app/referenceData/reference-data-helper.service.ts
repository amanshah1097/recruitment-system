import { CoreHelperService } from "../core/core-helper.service";

import { Injectable } from "@angular/core";
import * as _ from 'lodash'
import { CoreLocalStorageService } from "../core/core-storage/core-local-storage.service";
import { CoreModule } from "../core/core.module";
import { EntityService } from "./entityService";
import { GLOBAL_SET_STORAGE } from "../core/core-storage/core-storage.factory";
import { Inject } from "@angular/core";
import { ICoreStorageService } from "../core/core-storage/core-storage.service";

@Injectable()
export class ReferenceDataManipulatorService {
    constructor(
        private coreHelperService: CoreHelperService,
        private entityService: EntityService,
        @Inject(GLOBAL_SET_STORAGE) private storage: ICoreStorageService,
    ) { }
    private getRefDataFromLocalStorage(): any {
        let promise = new Promise((resolve, reject) => {
            let refData = <entity.classes.EntityWithValue[]>this.storage.get('RefData');
            if (this.coreHelperService.isNullOrUndefined(refData)) {
                this.init().then(response => {
                    refData = <entity.classes.EntityWithValue[]>this.storage.get('RefData');
                    resolve(refData);
                });
            }
            else
            {
                resolve(refData);    
            }
        });
        return promise;
    }
    public init(): any {
        let promise = new Promise((resolve, reject) => {
            if (!this.checkIfRefDataIsStored()) {
                this.entityService.getAllEntityWithValues().toPromise().then(response => {
                    let refData = response;
                    this.setRefDataToLocalStorage(refData);
                });
                resolve();
            }
        });
        return promise;
    }
    private checkIfRefDataIsStored(): boolean {
        let refData = <entity.classes.EntityWithValue[]>this.storage.get('RefData');
        return !this.coreHelperService.isNullOrUndefined(refData);
    }
    private setRefDataToLocalStorage(refData: entity.classes.EntityWithValue[]): void {
        this.storage.set('RefData', refData);
    }
    public getReferenceDataForEntity<T>(entityData: T): any {

        let props = Object.keys(entityData);
        return this.getRefDataFromLocalStorage().then(response => {
            let refData = response;
            for (let propIndex in props) {
                let property = props[propIndex];
                let entityWithValues = _.find(refData, refDataItem => {
                    return refDataItem.entityName.toLowerCase() === property.toLowerCase();
                });
                if (this.coreHelperService.isNullOrUndefined(entityWithValues)) {
                    return console.error("No entity with the specified name '" + property + "' was found!!");
                }
                entityData[property] = entityWithValues.referenceDataValues;
            }
            return entityData;
        });
    }
}