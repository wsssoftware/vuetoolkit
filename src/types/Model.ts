type Image = {
    alt?: string;
    url: string;
};

export type OnlyValuesUserPermissions = {
    [key: string]: boolean;
} | null;

export interface SEOEntity {
    title?: string;
    description?: string;
    canonical?: string;
    robots?: string;
    open_graph?: {
        type: string;
        title: string;
        description?: string;
        url?: string;
        image?: Image;
    };
    twitter_card?: {
        card: string;
        site?: string;
        creator?: string;
        title: string;
        description?: string;
        image?: Image;
    };
}

export type Paginator<T> = {
    page_name: string;
    current_page: number;
    data: T[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export type UserPermissions = {
    id: string;
    policy_column: string;
    policy_name: string;
    policy_description: null | string;
    rule_key: string;
    rule_name: string;
    rule_description: null | string;
    rule_deny_status: null | number;
    rule_value: boolean;
}[];
