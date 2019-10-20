export class EntityComment {
    id: number;
    entityName: string;
    entityPrimaryId: number;
    createdBy: number;
    createdOn: string;
    comment: string;
    isDeleted: boolean;
    updatedBy: number;
    lastUpdatedTime: string;
    updatedOn: string;
    createdByName: string;
    IsEditPermission: boolean;
}
export class CommentParameter {
    entityPrimaryId: number;
    entityName: string;
    startValue: number;
    endValue: number;
}