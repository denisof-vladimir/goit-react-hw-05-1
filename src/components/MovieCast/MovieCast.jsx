import { useState, useEffect,  useContext, CSSProperties  } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { fetchMovieCredits } from "../FetchInfo/FetchInfo";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";
import { NavLink, Outlet, useParams } from 'react-router';

export default function MovieCast() {
    const [error, setError] = useState(false);
    const { moviesId} = useParams();
    const [cast, setCast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);     

  useEffect(() => {
    const fetchCreditsFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCredits ( moviesId);
        setCast(data.cast);
       
        }
    catch {
        setError(true);
        toast.error("Error! Please, reload page!");
         } 
    finally {
        setIsLoading(false);
      }
    };
    if ( ! moviesId){return;};

    fetchCreditsFilms();
    
}, [moviesId]);

return (
  <div>
    {isLoading && <b>Loading...</b>}
    {error && <b>Error...</b>}
    {cast && (
        <ul className={css.movieCast}>
             {cast.map((castAkting) => (
                <li className={css.akting} key={castAkting.id}>
                    <div>
                        <p className={css.name}> {castAkting.name} </p>
                        <img
                             src={`https://image.tmdb.org/t/p/w500/${castAkting.profile_path}`}
                             width={150}
                             alt={castAkting.name}
                        />
                        <p className={css.name}> Character - {castAkting.character} </p>
                    </div>
                </li>
            ))}
        </ul>
         )  }
    </div>
);
}