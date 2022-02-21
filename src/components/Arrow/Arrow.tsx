import React from 'react'
import {ReactComponent as ArrowIcon} from './arrow.svg'
import {ArrowProps} from './Arrow.props'
import cn from 'classnames'
import styles from './Arrow.module.scss'

export const Arrow = ({arrow, className, ...props}: ArrowProps) => {
    return (
        <div className={cn(styles.arrow, className)} {...props}>
            <ArrowIcon className={cn(styles.arrowIcon, {
                [styles.down]: arrow == 'down',
                [styles.up]: arrow == 'up',
                [styles.left]: arrow == 'left',
            })}/>
        </div>
    )
}