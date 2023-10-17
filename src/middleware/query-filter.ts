

export type PaginationQueryType = {
    sortBy: string
    sortDirection: 'desc' | 'asc'
    pageNumber: number
    pageSize: number
}
export type BlogsPaginationQueryType = PaginationQueryType & {
    searchNameTerm: string
}


export function queryFilter(query: any): PaginationQueryType {
    const defaultFilter: PaginationQueryType = {
        sortBy: 'createdAt',
        sortDirection: 'desc',
        pageNumber: 1,
        pageSize: 10
    }

    if(query.sortBy){
        defaultFilter.sortBy = query.sortBy
    }
    if(query.sortDirection && query.sortDirection === 'asc'){
        defaultFilter.sortDirection = query.sortDirection
    }
    if(query.pageSize && !isNaN(Number(query.pageSize)) && Number(query.pageSize) > 0){
        defaultFilter.pageSize = Number(query.pageSize)
    }
    if(query.pageNumber && !isNaN(Number(query.pageNumber)) && Number(query.pageNumber) > 0){
        defaultFilter.pageNumber = Number(query.pageNumber)
    }

    return defaultFilter
}