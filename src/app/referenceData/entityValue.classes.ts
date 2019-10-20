module entityValue.classes {

	export class EntityValue {
		constructor(
			public id?: number,
			public entityId?: number,
			public entityValue?: string,
			public isDefault?: boolean,
			public valueColumnName?: string,
			public lastUpdatedOn?: string,
			public createdBy?: number,
			public createdOn?: Date,
			public updatedBy?: number,
            public updatedOn?: Date,
            public entityDisplayValue?: string) {
		}
	}
}