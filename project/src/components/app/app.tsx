import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import MyListPage from '../../pages/my-list-page/my-list-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReviewPage from '../../pages/add-review-page/add-review-page';
import PlayerPage from '../../pages/player-page/player-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks/index';
import Loader from '../loader/loader';
import HsitoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';

const App: FC = () => {
  const { isDataLoaded, films, authorizationStatus } = useAppSelector((state) => state);

  if (!isDataLoaded){
    return <Loader />;
  }

  const promoFilm = films[0];

  return (
    <HsitoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage promoFilm={promoFilm} />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <MyListPage films={films} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.Film} element={<MoviePage />} />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <AddReviewPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Player} element={<PlayerPage film={films[0]} />} />
        <Route path={AppRoute.Default} element={<NotFoundPage />} />
      </Routes>
    </HsitoryRouter>
  );
};

export default App;
