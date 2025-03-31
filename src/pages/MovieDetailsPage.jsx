import { useState, useEffect,  useContext, CSSProperties  } from 'react';
import toast, { Toaster } from "react-hot-toast";

import { fetchMovieDetails } from "../components/FetchInfo/FetchInfo";
// import css from "./fetchMovieDetails.module.css";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import FilmInfo from "../components/FilmInfo/FilmInfo";

import { NavLink, Outlet, useParams } from 'react-router';

// import UserInfo from '../components/UserInfo/UserInfo';


export default function MovieDetailsPage() {
    const [error, setError] = useState(false);
    const params = useParams();
  console.log("params-", params);
    const [film, setFilm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [page, setPage] = useState(1);
    // const [isLoadMore, setIsLoadMore] = useState(false);   
    // const [isLoadLess, setIsLoadLess] = useState(false);   
     

  useEffect(() => {
    const fetchInfoFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieDetails ( page);
        console.log("12-",data);
      
        setFilm(data);
        
        // console.log("22-", images.total_pages, "/", page);
       
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
    
}, [userId]);

return (
  <div>
    <h1> params- {params};

    </h1>
    {isLoading && <b>Loading...</b>}
    {error && <b>Error...</b>}
    {film && <FilmInfo film={film} />}

    {/* <ul>
      <li>
        <NavLink to="cast">Cast</NavLink>
      </li>
      <li>
        <NavLink to="reviews">Reviews</NavLink>
      </li>
    </ul>

    <Outlet /> */}
  </div>
);
}