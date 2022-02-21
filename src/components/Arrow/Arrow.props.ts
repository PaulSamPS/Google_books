import { DetailedHTMLProps, HTMLAttributes} from 'react'

export interface ArrowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    arrow: 'left' | 'down' | 'up'
}