import React from 'react'
import {Search} from '../components/Search/Search'
import { Outlet } from 'react-router-dom'
import styles from '../App.module.scss'

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Search/>
            <Outlet />
        </div>
    )
}