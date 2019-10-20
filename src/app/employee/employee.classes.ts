export class EmployeeDetail {
  id: number;
  firstName: string;
  lastName: String;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  emailAddress: string;
  mobileNumber: number;
  dateOfBirth:Date;
  genderId:number;
  maritalStatusId:number;
  permanentAddressId:number;
  designationId:number;
  companyId:number;
}

export class WorkExperiance {
  id:number;
  employeeId: number
  companyId: string;
  companyName:string;
  designationId: number;
  designationName: string
  workStartOn: Date;
  workEndOn: Date;
  
}
export class Education {
  id:number;
  employeeId: number
  specilization: string;
  institute: string;
  score: String;
  degreeId: number;
  degreeName: string;
  startOn: Date;
  endOn: Date;
}
export class Skills {
  id:number;
  employeeId: number
  skillId: number;
  skill: string;
  yearOfExperience: number;
  comment: string;
}
export class Language {
  id:number;
  employeeId: number
  languageId: number;
  languageName: string;
  fluencyName: string
  competencyName: string;
  fluencyId:number;
  competencyId:number;

}
export class EmployeeTeamStructureData
{
  lineManagerName:string;
  employeeName:String;

}

export class RefDataForEmployeeTechnicalInfo {
  competency: entityValue.classes.EntityValue[];
  fluency: entityValue.classes.EntityValue[];
  language: entityValue.classes.EntityValue[];
  skills: entityValue.classes.EntityValue[];
  degree: entityValue.classes.EntityValue[];
  designation: entityValue.classes.EntityValue[];

  constructor() {
    this.competency = [];
    this.fluency = [];
    this.language = [];
    this.skills = [];
    this.degree = [];
    this.designation = [];

  }
}
export class RefDataForEmployeeBasicDetail {
  country: entityValue.classes.EntityValue[];
  maritalStatus: entityValue.classes.EntityValue[];
  gender: entityValue.classes.EntityValue[];


  constructor() {
    this.country = [];
    this.maritalStatus = [];
    this.gender = [];

  }
}
export class IdEntityValueServiceModel {
  public id?: number;
  public entityValue?: string;
}
