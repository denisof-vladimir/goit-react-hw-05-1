import { useState, useEffect,  useContext, CSSProperties  } from 'react';
import { Link } from 'react-router';
import css from "./ListFilms.module.css";
     

export default function ListFilms({films, page}) {
    const numberLast = 20*(page-1);
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
   