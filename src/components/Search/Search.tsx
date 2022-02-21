import React from 'react'
import { SearchProps } from './Search.props'
import {ReactComponent as GlassIcon} from './glass.svg'
import {Input} from '../Input/Input'
import {Button} from '../Button/Button'
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux'
import {getBooks,setClear, setSearch} from '../../redux/actions/apiAction'
import {useNavigate} from 'react-router-dom'
import {Select} from '../Select/Select'
import cn from 'classnames'
import styles from './Search.module.scss'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const categories = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
    const sort = ['relevance', 'newest']
    const category = useAppSelector(state => state.api.category)
    const sortBy = useAppSelector(state => state.api.sortBy)
    const perPage = useAppSelector(state => state.api.perPageItems)
    const startIndex = useAppSelector(state => state.api.startIndex)
    const search = useAppSelector(state => state.api.search)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const goToSearch = () => {
        const obj = {
            search,
            category: category !== 'all' ? category : '',
            sortBy,
            perPage,
            startIndex
        }
        dispatch(setClear({}))
        dispatch(getBooks(obj))
        navigate(`books`)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key == 'Enter') {
            goToSearch()
        }
    }

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input
                className={styles.input}
                placeholder='Поиск...'
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                onKeyDown={handleKeyDown}
            />
            <Button
                appearance='primary'
                className={styles.button}
                onClick={goToSearch}
                aria-label='Поиск по сайту'
                disabled={search === ''}
            >
                <GlassIcon/>
            </Button>
            <div className={styles.selectWrapper}>
                <div className={styles.select}>
                    <span className={styles.name}>Categories</span>
                    <Select appearance='category' categoryArr={categories}/>
                </div>
                <div className={styles.select}>
                    <span className={styles.name}>SortBy</span>
                    <Select sortByArr={sort}/>
                </div>
            </div>
        </div>
    )
}