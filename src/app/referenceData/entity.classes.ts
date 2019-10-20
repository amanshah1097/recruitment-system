module entity.classes {

	export class Entity {
		constructor(
			public id?: number,
			public entityName?: string,
			public valueColumnName?: string,
			public createdBy?: number,
			public createdOn?: Date,
			public updatedBy?: number,
			public updatedOn?: Date) {
		}
	}

	export class EntityWithValue {
		public id?: number;
		public entityName?: string;
		public valueColumnName?: string;
		public createdBy?: number;
		public createdOn?: Date;
		public updatedBy?: number;
		public updatedOn?: Date;
		public referenceDataValues?: entityValue.classes.EntityValue[];
	}
}