import { DetailedHTMLProps, HTMLAttributes} from 'react'
import {IBooks} from '../../interfaces/Books.interface'

export interface BookProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    book: IBooks
}