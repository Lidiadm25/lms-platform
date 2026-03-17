export interface RESTProject {
    id:          string;
    title:       string;
    author:      User;
    description: string;
    duration:    number;
    units:       Unit[];
}

export interface User {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}

export interface Unit {
    id:          string;
    title:       string;
    description: string;
}
