import React, {useEffect} from 'react'
import {BookInfoProps} from './BookInfo.props'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux'
import {getBook} from '../../redux/actions/apiAction'
import {IDataBooks} from '../../interfaces/Books.interface'
import {Spinner} from '../Spinner/Spinner'
import {Arrow} from '../Arrow/Arrow'
import cn from 'classnames'
import styles from './BookInfo.module.scss'

export const BookInfo = ({className, ...props}: BookInfoProps): JSX.Element => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const book: IDataBooks = useAppSelector(state => state.api.book)
    const loading = useAppSelector(state => state.api.isLoading)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getBook(id))
    },[id])

    if (loading) {
        return <Spinner/>
    }

    if (!book.id) {
        return <Navigate to='/' replace/>
    }

    return (
        <div className={cn(styles.wrapper, className)} {...props}>
            <div className={styles.back} onClick={() => navigate('/books')}>
                <Arrow className={styles.icon} arrow={"left"}/>
                <span className={styles.text}>Back</span>
            </div>
            <h2 className={styles.title}>{book.volumeInfo.title}</h2>
            <div >
                <img className={styles.image} src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/>
            </div>
            <div className={styles.info}>
                <span className={styles.categories}>{book.volumeInfo.categories}</span>
                <span className={styles.authors}>{book.volumeInfo.authors}</span>
                <span className={styles.desc} dangerouslySetInnerHTML={{__html: book.volumeInfo.description}}/>
            </div>
        </div>
    )
}