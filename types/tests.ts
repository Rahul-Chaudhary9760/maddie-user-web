export type TestCategory =
    | 'Blood'
    | 'Urine'
    | 'Radiology'
    | 'Full Body'
    | 'Diabetes'
    | 'Thyroid'
    | 'Heart'
    | 'Women Health'
    | 'Senior Health';

export interface TestDetailSection {
    title: string;
    testsCount?: number;
    icon?: string;
    items: string[];
}

export interface Test {
    _id: string;
    slug?: string;              // single tests may not have one
    name: string;
    description: string;
    price: number;
    originalPrice?: number;     // only packages
    discountedPrice?: number;   // only packages
    badge?: string;
    testsCount?: number;
    popular: boolean;
    category: TestCategory;
    fastingRequired: boolean;
    highlights: string[];
    details?: TestDetailSection[]; // only in the detail endpoint
    isAvailable: boolean;
    reportTime: string;
    createdAt: string;
    updatedAt: string;
}

export interface TestListParams {
    category?: TestCategory;
    popular?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PaginationMeta;
}