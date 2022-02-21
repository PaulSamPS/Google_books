import {
    SET_BOOK,
    SET_BOOKS,
    SET_CATEGORY,
    SET_CLEAR,
    SET_LOADING,
    SET_SEARCH,
    SET_SORT_BY,
    SET_START_INDEX
} from '../constants'
import {IResponseBooks} from '../../interfaces/Books.interface'

interface IRedux {
    books: IResponseBooks
    isLoading: boolean
    book: IResponseBooks[]
    category: string
    search: string
    sortBy: string
    currentPage: number
    perPageItems: number
    startIndex: number
}

const initialState: IRedux = {
    books: {
        items: [],
        kind: '',
        totalItems: 0
    },
    isLoading: false,
    book: [],
    category: 'all',
    search: '',
    sortBy: 'relevance',
    currentPage: 1,
    perPageItems: 30,
    startIndex: 0
}

const apiReducer = (state = initialState,action: any) => {
    switch (action.type) {
        case SET_BOOKS:
            return {
                ...state,
                books: {
                    items: state.books.items.concat(action.payload.items),
                    kind: action.payload.kind,
                    totalItems: action.payload.totalItems
                }
            }
        case SET_BOOK:
            return {
                ...state,
                book: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: action.payload
            }
        case SET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case SET_START_INDEX:
            return {
                ...state,
                startIndex: action.payload,
                currentPage: state.currentPage + 1
            }
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload
            }
        case SET_CLEAR:
            return {
                ...state,
                books: {
                    items: [],
                    kind: '',
                    totalItems: 0
                }
            }
        default:
            return state
    }
}

export default apiReducer