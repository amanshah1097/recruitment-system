import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpService } from '../core/core-http.service';
import { WorkExperiance, Skills, Education, Language } from '../employee/employee.classes';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EntityService {
    baseUrl: string = 'http://localhost:54115/Api/ReferenceDataEntities/';
    constructor(private httpclient:HttpClient) {
    }

    getAllEntityWithValues() : Observable<any>{
        let url: string = this.baseUrl + 'GetAllEntitiesWithValue';
        return this.httpclient.get(url);
    }
}