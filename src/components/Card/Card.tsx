import { CardProps } from './Card.props'
import cn from 'classnames'
import styles from './Card.module.scss'


export const Card = ({ children, className, ...props }: CardProps): JSX.Element => {
    return (
        <div className={cn(styles.card, className)} { ...props }
        >
            { children }
        </div>
    )
}