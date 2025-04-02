import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation, Outlet  } from 'react-router';
import css from "./FilmInfo.module.css";

export default function FilmInfo({film}) {
    const urlImage = "https://image.tmdb.org/t/p/w500/"+film.poster_path;
    const location = useLocation();
    const backLinkRef = useRef(location.state);    
    return (
    <>
        <Link to={backLinkRef.current}>Go back</Link>
        <div className={css.moviePost}>
             <img src={urlImage} alt="Poster film" width="250" height="250" />   
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

    </>
    );
}