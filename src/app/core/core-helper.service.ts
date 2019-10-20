import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { Func1, IdNameModel } from './core.classes';

@Injectable()
export class CoreHelperService {
    constructor(
        private toast: ToastrService,
    ) { }

    isNullOrUndefined = <T>(tObj: T) => {
        return tObj === null || tObj === undefined;
    }

    isStringNullOrEmpty = (text: string) => {
        return this.isNullOrUndefined(text) || text === '';
    }

    isStringNullOrWhitespace = (text: string) => {
        return this.isStringNullOrEmpty(text) || text.trim() === '';
    }

    isArrayEmpty = <T>(tArray: T[]) => {
        return this.isNullOrUndefined(tArray) || tArray.length <= 0;
    }

    isListEmpty = <T extends { length: number }>(list: T) => {
        return this.isNullOrUndefined(list) || list.length <= 0;
    }

    isMapEmpty<T1, T2>(tArray: Map<T1, T2>) {
        return this.isNullOrUndefined(tArray) || tArray.size <= 0;
    }

    unsubscribe(...subscriptions: Subscription[]) {
        for (let index = 0; index < subscriptions.length; index++) {
            const subscription = subscriptions[index];
            if (!!subscription) {
                subscription.unsubscribe();
            }
        }
    }

    showCreatedMessage(moduleName: string) {
        this.toast.success(moduleName + ' created successfully');
    }

    showUpdatedMessage(moduleName: string) {
        this.toast.success(moduleName + ' updated successfully');
    }

    showDeletedMessage(moduleName: string) {
        this.toast.success(moduleName + ' removed successfully');
    }

    showCustomErrorMessage(moduleName: string) {
        this.toast.error(moduleName);
    }

    showCustomSuccessMessage(moduleName: string) {
        this.toast.success(moduleName);
    }

    selectMany<T, K>(list: T[], fn: Func1<T, K[]>) {
        const mappedList = list.map(m => fn(m));
        if (this.isArrayEmpty(mappedList)) {
            return [];
        }
        return mappedList.reduce((a, b) => a.concat(b));
    }

    jsonSerialize<T>(data: T, includeNeverObjects: boolean = false) {
        const dataItem: Partial<T> = {};
        for (const key in data) {
            if (!!key) {
                if (data.hasOwnProperty(key) && (!this.isNullOrUndefined(data[key]) || includeNeverObjects)) {
                    dataItem[key] = data[key];
                }
            }
        }
        return JSON.stringify(dataItem);
    }

    jsonDeserialize<T>(jsonString: string) {
        try {
            return JSON.parse(jsonString) as T;
        } catch (ex) {
            console.error('JSON string: ', jsonString, 'Error: ', ex);
            return null;
        }
    }

    camelCaseToSentenceCase = (value: string) => {
        const result = value.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    snakeCaseToSentenceCase = (value: string) => {
        const result = this.snakeCaseToCamelCase(value);
        return this.camelCaseToSentenceCase(result);
    }

    snakeCaseToCamelCase = (value: string) => {
        return value.replace(/(\_\w)/g, (m) => m[1].toUpperCase());
    }
    getListOfMonths(): Array<number> {
        let monthNumbers = new Array<number>();
        for (let i = 1; i <= 12; i++) {
            monthNumbers.push(i);
        }
        return monthNumbers;
    }
    getCurrentMonth(): number {
        let currentDate = new Date();
        return currentDate.getMonth() + 1;
    }
    getTaxYearsInIdName(startYear: number = 2017) {
        let years: Array<IdNameModel> = [];
        let currentYear: number = new Date().getUTCFullYear();
        let startingYear: number = startYear;
        if (startingYear <= currentYear) {
            for (let i = startingYear; i <= currentYear; i++) {
                years.push({ id: i, name: i.toString() });
            }
        }
        return years;
    }
}
