import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttpService } from '../core/core-http.service';
import { WorkExperiance, Skills, Education, Language, EmployeeDetail } from './employee.classes';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    baseUrl: string = 'http://localhost:54115/Api/Employee/';
    constructor(private corehttpservice: CoreHttpService) {
    }
   
    getAllEmployee() {
        let id = 11;
        return this.corehttpservice.getRequest(this.baseUrl + 'GetAllEmployee');
    }
    getEmployeeById() {
        let id = 11;
        return this.corehttpservice.getRequest(this.baseUrl + 'GetEmployeeById?id='+id);
    }
    
    updateEmployeeDetail(employeeData:EmployeeDetail) {
        let id = 11;
        return this.corehttpservice.postRequest(this.baseUrl + 'UpdateEmployeeDetail',employeeData);
    }
    addWorkExperiance(workExperianceData : WorkExperiance) {
        return this.corehttpservice.postRequest(this.baseUrl + 'AddWorkExperiance',workExperianceData);
    }
    addSkills(skillsData : Skills) {
        return this.corehttpservice.postRequest(this.baseUrl + 'AddSkills',skillsData);
    }
    addEducation(educationData : Education) {
        return this.corehttpservice.postRequest(this.baseUrl + 'AddEducation',educationData);
    }
    addLanguage(languageData : Language) {
        return this.corehttpservice.postRequest(this.baseUrl + 'AddLanguage',languageData);
    }
    getAllEmployeeTechnicalInformation() {
        let id = 11;
        return this.corehttpservice.getRequest(this.baseUrl + 'GetAllTechnicalInfoData?id='+id);
    }
    
    deleteWorkExperianceById(id: number) {
        return this.corehttpservice.getRequest(this.baseUrl + 'DeleteWorkExperianceById?id=' + id);
    }
    deleteEducationDetailById(id: number) {
        return this.corehttpservice.getRequest(this.baseUrl + 'DeleteEducationDetailById?id=' + id);
    }
    deleteLanguageDetailById(id: number) {
        return this.corehttpservice.getRequest(this.baseUrl + 'DeleteLanguageDetailById?id=' + id);
    }
    deleteSkillDetailById(id: number) {
        return this.corehttpservice.getRequest(this.baseUrl + 'DeleteSkillDetailById?id=' + id);
    }
    getEmployeeTeamStructureData() {
        let id = 11;
        return this.corehttpservice.getRequest(this.baseUrl + 'GetEmployeeTeamData?id='+id);
    }
}