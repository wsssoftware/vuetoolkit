type Image = {
    alt?: string,
    url: string
}

export interface SEOEntity {
    title?: string,
    description?: string,
    canonical?: string,
    robots?: string,
    open_graph?: {
        type: string,
        title: string,
        description?: string,
        url?: string,
        image?: Image,
    },
    twitter_card?: {
        card: string,
        site?: string,
        creator?: string,
        title: string,
        description?: string,
        image?: Image,
    }
}