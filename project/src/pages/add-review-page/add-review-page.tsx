import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Film } from '../../types/film';
import { ReviewData } from '../../types/review-data';
import { useAppDispatch } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { api } from '../../services/api';
import AddReviewForm from '../../components/add-review/add-review';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';

const AddReviewPage: FC = () => {
  const [film, setFilm] = useState<null | Film>(null);
  const [formDisabled, setFormDisabled] = useState(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleReviewSubmit = (reviewData: ReviewData) => {
    const addReview = async () => {
      setFormDisabled(true);
      const url = `/comments/${id ? id : -1}`;
      await api.post(url, {comment: reviewData.reviewText, rating: reviewData.rating});
    };

    addReview()
      .then(() => {
        const redirectUrl = `/films/${id ? id : -1}`;
        setFormDisabled(false);
        dispatch(redirectToRoute(redirectUrl));
      })
      .catch((err: AxiosError) => {
        setFormDisabled(false);
        toast.warn(err.message);
      });
  };

  useEffect(() => {
    const fetchFilm = async () => {
      const { data: filmInfo } = await api.get<Film>(`/films/${id || -1}`);
      setFilm(filmInfo);
    };

    fetchFilm()
      .catch((err: AxiosError) => {
        toast.warn(err.message);
      });
  }, [id]);

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.backgroundImage} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href={id ? `/films/${id}` : '#'} className="breadcrumbs__link">{film?.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm disabled={formDisabled} onSubmit={handleReviewSubmit} />
    </section>
  );
};

export default AddReviewPage;
