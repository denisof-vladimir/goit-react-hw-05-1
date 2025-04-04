import { Suspense, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { fetchMovieDetails } from "../components/FetchInfo/FetchInfo";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
// import FilmInfo from "../components/FilmInfo/FilmInfo";
import { NavLink, Outlet, useParams } from 'react-router';
import { Link, useLocation } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [error, setError] = useState(false);
  const { moviesId} = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state);    

  useEffect(() => {
    const fetchInfoFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieDetails ( moviesId);
        setFilm(data);
        }
    catch {
        setError(true);
        toast.error("Error! Please, reload page!");
         } 
    finally {
        setIsLoading(false);
      }
    };
    fetchInfoFilms(); 
}, [moviesId]);

return (
  <div>
    {isLoading && <b>Loading...</b>}
    {error && <ErrorMessage error={"Error! Please, reload page!"}/>} 
    {film && (
      <>
      <Link to={backLinkRef.current}>Go back</Link>
      <div className={css.moviePost}>
           <img   src = {`https://image.tmdb.org/t/p/w500/${film.poster_path}`} 
                  alt="Poster film" width="250" height="250" />   
           <div>
              <h2 className={css.headFilm}> {film.title} </h2>
              <h3 className={css.headOverview}>  Overview  </h3>
              <p  className={css.overviewFilm}> {film.overview}</p> 
              <h4 className={css.headGenres}>  Genres  </h4>
              <ul className={css.genres}>
                {film.genres.map((genr) => {
                      return (
                          <li className={css.genresLi} key={genr.id}> 
                              {genr.name}                           
                          </li>
                       )}) }
              </ul>

          </div> 
      </div>
      <ul>
          <li>
              <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
              <NavLink to="review">Review</NavLink>
          </li>
          <Outlet />
    </ul>

    </> ) }

  </div>
);
}