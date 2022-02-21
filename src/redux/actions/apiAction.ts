import {Dispatch} from 'redux'
import axios from 'axios'
import {IResponseBooks} from '../../interfaces/Books.interface'
import {
    API_KEY,
    API_URL,
    SET_BOOK,
    SET_BOOKS,
    SET_CATEGORY, SET_CURRENT_PAGE,
    SET_LOADING, SET_PER_PAGE_ITEMS, SET_SEARCH,
    SET_SORT_BY,
    SET_START_INDEX
} from '../constants'

interface IObj {
    search?: string
    category?: string
    sortBy?: string
    perPage?: number
    startIndex?: number
}

export const getBooks = (obj?: IObj) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        try {
            await axios.get<IResponseBooks>(
                `${API_URL}?q=
            ${obj?.search}+subject:${obj?.category}
            &maxResults=${obj?.perPage}&startIndex=${obj?.startIndex}&orderBy=${obj?.sortBy}&key=${API_KEY}`)
                .then(res => {
                    dispatch(setBooks(res.data))
                    dispatch(setIsLoading(false))
                }
            )
        } catch (e) {
            console.log(e)
            dispatch(setIsLoading(false))
        }
    }
}

export const getBook = (id?: string) => {
    return async (dispatch: Dispatch) => {
       try {
           await axios.get<IResponseBooks>(
               `${API_URL}/${id}?key=${API_KEY}`)
               .then(res => {
                   dispatch(setBook(res.data))
                   dispatch(setIsLoading(false))
               }
           )
       } catch (e) {
           console.log(e)
           dispatch(setIsLoading(false))
       }
    }
}

export const setBooks = (books: IResponseBooks) => ({type: SET_BOOKS, payload: books})
export const setBook = (book: IResponseBooks) => ({type: SET_BOOK, payload: book})
export const setIsLoading = (loading: boolean) => ({type: SET_LOADING, payload: loading})
export const setSelectedCategory = (category: string) => ({type: SET_CATEGORY, payload: category})
export const setSortBy = (sortBy: string) => ({type: SET_SORT_BY, payload: sortBy})
export const setPerPageItems = (perPageItems: number) => ({type: SET_PER_PAGE_ITEMS, payload: perPageItems})
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, payload: currentPage})
export const setStartIndex = (startIndex: number) => ({type: SET_START_INDEX, payload: startIndex})
export const setClear = (clear: {}) => ({type: 'SET_CLEAR', payload: clear})
export const setSearch = (search: string) => ({type: SET_SEARCH, payload: search})
