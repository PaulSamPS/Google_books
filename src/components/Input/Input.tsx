import { InputProps } from './Input.props'
import cn from 'classnames'
import styles from './Input.module.scss'


export const Input = ({ className, ...props }: InputProps): JSX.Element => {
    return (
        <div className={ cn(className, styles.inputWrapper) }>
            <input className={styles.input} { ...props } />
        </div>
    )
}