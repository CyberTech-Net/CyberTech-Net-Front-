export  interface News {
    id: number
    title: string
    description: string
    date: string
    url: string,
    source: string
}


export interface NewsList {
    news: News[]
}