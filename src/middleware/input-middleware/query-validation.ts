import {query} from "express-validator";

export const QueryValidation = ()=>(
    [
        query('pagesCount')
            .trim()
            .isInt()
            .notEmpty(),
        query('page')
            .trim()
            .isInt()
            .notEmpty(),
        query('pageSize')
            .trim()
            .isInt()
            .notEmpty(),
        query('totalCount')
            .trim()
            .isInt()
            .notEmpty()
    ]
)