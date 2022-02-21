import React, {useEffect, useRef, useState} from 'react'
import {SelectProps} from './Select.props'
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux'
import {setSelectedCategory, setSortBy} from '../../redux/actions/apiAction'
import {Arrow} from '../Arrow/Arrow'
import cn from 'classnames'
import styles from './Select.module.scss'

export const Select = ({className,appearance, categoryArr, sortByArr, ...props}: SelectProps): JSX.Element => {
    const [selectCategoryArray, setSelectCategoryArray] = useState<JSX.Element[]>(new Array(5).fill(<></>))
    const selectRef = useRef<null>(null)
    const [modal, setModal] = useState<boolean>(false)
    const [index, setIndex] = useState(0)
    const category = useAppSelector(state => state.api.category)
    const sortBy = useAppSelector(state => state.api.sortBy)
    const dispatch = useAppDispatch()

    useEffect(() => {
        constructCategory()
    }, [modal])

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)
    }, [modal])

    const onHandleClick = (item: string, index: number) => {
        if (appearance === 'category') {
            dispatch(setSelectedCategory(item))
        } else {
            dispatch(setSortBy(item))
        }
        setIndex(index)
        const timer = setTimeout(() => {
            setModal(false)
        },100)
        return () => clearTimeout(timer)
    }

    const handleOutsideClick = (e: any) => {
        const path = e.path || (e.composedPath && e.composedPath())
        if (!path.includes(selectRef.current)) {
            setModal(false)
        }
    }

    const constructCategory = () => {
        if (appearance === 'category') {
            const updatedArray = categoryArr!.map((item: string, index: number) => {
                return (
                    <li
                        key={index}
                        onClick={() => onHandleClick(item, index)}
                    >
                        {item}
                    </li>
                )
            })
            setSelectCategoryArray(updatedArray)
        } else {
            const updatedArray = sortByArr!.map((item: string, index: number) => {
                return (
                    <li
                        key={index}
                        onClick={() => onHandleClick(item, index)}
                    >
                        {item}
                    </li>
                )
            })
            setSelectCategoryArray(updatedArray)
        }
    }

    return (
        <div className={styles.select} {...props} ref={selectRef}>
            <div onClick={() => setModal(!modal)} className={styles.selectedItem}>
                {appearance === 'category' ? category : sortBy}
                <Arrow arrow={modal ? 'up' : 'down'} className={styles.arrow}/>
            </div>
            <ul key={index} className={modal ? cn(styles.itemBlock, styles.openModal) : styles.itemBlock}>
                {selectCategoryArray.map((item, i) => <span className={cn(styles.item, className, {
                    [styles.active]: index === i,
                })} key={i}>{item}</span>)}
            </ul>
        </div>
    )
}

