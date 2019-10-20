import { Injectable } from '@angular/core';

@Injectable()
export class CoreConfigurationService {
    readonly gridPageSize = 20;
    readonly successfulCreationMessage = 'created successfully.'
    readonly successfullUpdationMessage = 'updated successfully.'
    readonly successfullDeletionMessage = 'deleted successfully.'
    readonly secondaryGridPageSize = 10;
    readonly totalGridPagesToDisplay = 3;
}
