import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';
import { User } from '../types/user';
import { AuthorizationStatus, AppRoute } from '../const';

type Genre = string;

export const changeGenre = createAction<Genre>('changeGenre');
export const fillFilms = createAction<Film[]>('fillFilms');
export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');
export const changeAuthorizationStatus = createAction<AuthorizationStatus>('changeAuthorizationStatus');
export const setUser = createAction<User>('setUser');
export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');
