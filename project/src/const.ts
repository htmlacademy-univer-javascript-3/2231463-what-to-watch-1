export enum AppRoute {
    Main = '/',
    SignIn = '/login',
    MyList = '/mylist',
    Film = '/films/:id',
    AddReview = '/films/:id/review',
    Player = '/player/:id',
    NotFound = '/404-not-found',
    Default = '*'
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}

export const ALL_GENRES = 'All genres';

export enum APIRoute {
    Films = '/films',
    Login = '/login',
    Logout = '/logout'
}
