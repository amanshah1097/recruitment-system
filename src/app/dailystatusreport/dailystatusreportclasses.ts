export class Employee {
    employeeId: number;
    employeeName: string;
    employeeCode: number;
    joiningDate: Date;
    emailAddress: string;
    employeeRate: number;
    currencyId: number;
    currencyCode: string;
    isActive: boolean;
    employeeTypeId: number;
    reporterId: number;
    constructor(initializer?: Partial<Employee>) {
        if (!!initializer) { Object.assign(this, initializer) };
    }
}
export class Dsr {
    id?: number;
    employeeId?: number;
    dsrDate?: string;
    dsrDetails?: string;
    isApproved?: boolean;
    approvedBy?: number;
}
export class DsrTaxWeekMonthMappingData {
    startDate :Date;
    endDate :Date;
    weekNumber:number;
}
export class DsrTaxYearModal {
   id:number;
   name:string;
   displayValue:string;
}
export class DsrFilterServiceModal {
    week?:number;
    year:number;
    month?:number;
    isWeekFilter:boolean;
 }
 