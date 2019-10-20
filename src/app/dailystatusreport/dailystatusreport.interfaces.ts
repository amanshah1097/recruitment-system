export interface ITimesheetListController {
	timesheetList: ITimesheet[];
	filterList: Array<Object>;
	filterData: Array<Object>;
	selectedFilter: Object;
	filterValue: string;
	currentYear: number;
	isWeekFilter: boolean;
	isMonthFilter: boolean;
}

export interface IManageTimesheetController {
	timesheetData: ITimesheet;
	weekNumberList: number[];
	hours: number;
	selectedWeekNumber: number;
	currentYear: number;
	changeModuleList();
	saveTimesheet(isReload: boolean);
}

export interface IYearTimesheet {
	initialYear: number;
	displayName: number;
}

export interface IClient {
	clientId?: number;
	companyName?: string;
	clientName?: string;
	emailAddress?: string;
	contactNumber?: string;
	billingAddress?: string;
	isActive?: boolean;
}

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

export interface IProject {
	projectId?: number;
	projectName?: string;
	clientReference?: number;
	clientName?: string;
	projectLead?: number;
	projectLeadName?: string;
	startDate?: Date;
	endDate?: Date;
	lastBilledAmount?: number;
	isActive?: boolean;
	lastBillingDate?: Date;
	moduleList?: IModule[];
	projectStatusId?: number;
	description?: string;
	statusCode?: string;
	estimatedHours?: number;
	isPms?: boolean;
}

export interface IModule {
	moduleId?: number;
	moduleName?: string;
	projectName?: string;
	projectId?: number;
	projectTypeId?: number;
	projectTypeName?: string;
	invoiceTypeId?: number;
	invoiceTypeName?: string;
	startDate?: Date;
	endDate?: Date;
	isDeleted?: string;
	isActive?: boolean;
	estimatedHours?: number;
}

export interface ITimesheetStateParams {
	timesheetId: number;
}

export interface IFilter {
	filterId?: number;
	filterName?: string;
}

export interface IFilterData {
	filterDataId?: number;
	filterDataValue?: string;
	isActive?: boolean;
}

export interface ITimesheet {
	timesheetId?: number;
	projectId?: number;
	projectName?: string;
	moduleId?: number;
	moduleName?: string;
	employeeId?: number;
	employeeName?: string;
	weekNumber?: number;
	year?: number;
	billableHours?: number;
	createdDate?: Date;
	isApproved?: boolean;
	description?: string;
	isDeleted?: boolean;
	isModuleDeleted?: boolean;
	isProjectDeleted?: boolean;
	isEmployeeDeleted?: boolean;
	isJiraLog?: boolean;
	issueId?: string;
	WorkLogDate?: Date;
}