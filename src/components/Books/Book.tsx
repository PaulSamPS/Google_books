import {Card} from '../Card/Card'
import {BookProps} from './Book.props'
import cn from 'classnames'
import styles from './Book.module.scss'

export const Book = ({book , className}: BookProps): JSX.Element => {
    return (
            <Card color={"white"} className={cn(styles.book, className)}>
                <div className={styles.imageCenter}>
                    <img className={styles.image} src={book.imageLinks?.thumbnail} alt={book.title}/>
                </div>
                <div className={styles.categories}>{book.categories && book.categories[0]}</div>
                <div className={styles.title}>{book.title}</div>
                <div className={styles.authors}>
                    {book.authors && book.authors.map((a) => <div key={a}>{a} </div>)}
                </div>
            </Card>
    )
}