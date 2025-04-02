import { Suspense, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { fetchMovieDetails } from "../components/FetchInfo/FetchInfo";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import FilmInfo from "../components/FilmInfo/FilmInfo";
import { NavLink, Outlet, useParams } from 'react-router';
import { Link, useLocation } from "react-router-dom";

export default function MovieDetailsPage() {
  const [error, setError] = useState(false);
  const { moviesId} = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
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
    {error && <b>Error...</b>}
    {film && <FilmInfo film={film} />}

  </div>
);
}