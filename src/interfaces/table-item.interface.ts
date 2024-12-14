export interface TableItem {
    id: number;
    status: string;
    truck: {
        licensePlate: string;
    };
    customer: {
        businessName: string;
    };
    alarmStatus: {
        state: string;
    };
    receptionDate: string;
    estimatedDate: string;
}


export interface ItemResponse {
    items: TableItem[];
    pagination: {
        totalElements: number;
        currentPage: number;
        totalPages: number;
    };
}