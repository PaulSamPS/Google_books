import React, {useState} from 'react'
import {IResponseBooks} from '../../interfaces/Books.interface'
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux'
import {getBooks,setIsLoading, setStartIndex} from '../../redux/actions/apiAction'
import {Spinner} from '../Spinner/Spinner'
import {Book} from '../Books/Book'
import {BooksListProps} from './BooksList.props'
import {Link, Navigate} from 'react-router-dom'
import {Button} from '../Button/Button'
import cn from 'classnames'
import styles from './BooksList.module.scss'

export const BooksList = ({className, ...props}: BooksListProps): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false)
    const books: IResponseBooks = useAppSelector(state => state.api.books)
    const totalItems: number = useAppSelector(state => state.api.books.totalItems)
    const loading: boolean = useAppSelector(state => state.api.isLoading)
    const perPage: number = useAppSelector(state => state.api.perPageItems)
    const currentPage: number = useAppSelector(state => state.api.currentPage)
    const startIndex: number = useAppSelector(state => state.api.startIndex)
    const search: string = useAppSelector(state => state.api.search)
    const category = useAppSelector(state => state.api.category)
    const sortBy = useAppSelector(state => state.api.sortBy)

    const dispatch = useAppDispatch()

    const loadMore = () => {
        const obj = {
            search,
            category: category !== 'all' ? category : '',
            sortBy,
            perPage,
            startIndex
        }
        const totalPages = Math.ceil(totalItems / perPage)
        console.log(totalPages)
        const page = currentPage * perPage
        if (currentPage <= totalPages) {
            dispatch(setStartIndex(page))
            dispatch(getBooks(obj))
        } else {
            setVisible(true)
        }
    }

    if (loading) {
        return <Spinner/>
    }

    if (totalItems === 0) {
       return <Navigate to='/' replace/>
    }

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            {books.totalItems <= 0 ? <h3>Not found.</h3> : <h3>Found {books.totalItems} {books.totalItems == 1 ? 'book' : 'books'}</h3>}
            <div className={styles.bookList}>
                {books.items && books.items.map((b) => <Link key={b.etag} to={`${b!.id}`} onClick={() => dispatch(setIsLoading(true))}><Book book={b.volumeInfo}/></Link>)}
            </div>
            {!visible &&
                <div className={styles.btn}>
                    <Button onClick={loadMore} appearance={"primary"}>Load More</Button>
                </div>
            }
        </div>
    )
}

