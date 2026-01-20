export interface ApiSelectDataResponse<T> {
    content: T[],
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            unsorted: boolean,
            sorted: boolean,
            empty: boolean
        },
        offset: number,
        unpaged: boolean,
        paged: boolean
    },
    totalPages: number,
    last: boolean,
    totalElements: number,
    first: boolean,
    numberOfElements: number,
    size: number,
    number: number,
    sort: {
        unsorted: boolean,
        sorted: boolean,
        empty: boolean
    },
    empty: boolean
}