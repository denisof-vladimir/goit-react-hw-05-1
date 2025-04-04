import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css"; 

export default function MovieList({films, page}) {
    const numberLast = 20*(page-1);
    const location = useLocation();
    const backLinkRef = useRef(location.state);    
    return (
        <ul className={css.list}>
             {films.map((film, index) => (
                <li className={css.iteams} key={film.id}>
                    <Link
                        to={`/movies/${film.id}`}
                        state={location}
                        className={css.iteam}>
                    {index + 1 + numberLast} {film.title} {film.id}
                    </Link>
                </li>
            ))}
        </ul>
    )}
   