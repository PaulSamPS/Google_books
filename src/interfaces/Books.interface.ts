export interface IndustryIdentifier {
    type: string
    identifier: string
}

export interface ReadingModes {
    text: boolean
    image: boolean
}

export interface ImageLinks {
    smallThumbnail: string
    thumbnail: string
    small: string
    medium: string
    large: string
    extraLarge: string
}

export interface IBooks {
    title: string
    authors: string[]
    publisher: string
    publishedDate: string
    description: string
    industryIdentifiers: IndustryIdentifier[]
    readingModes: ReadingModes
    pageCount: number
    printType: string
    categories: string[]
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    imageLinks: ImageLinks
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
}


export interface IDataBooks{
    kind: string
    id: string
    etag: string
    selfLink: string,
    volumeInfo: IBooks
}

export interface IResponseBooks {
    items: IDataBooks[]
    kind: string
    totalItems: number
}

