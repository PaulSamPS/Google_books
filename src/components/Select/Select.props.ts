import { DetailedHTMLProps, HTMLAttributes } from "react"

export interface SelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    sortByArr?: string[]
    categoryArr?: string[]
    appearance?: 'category' | 'sortBy'
}