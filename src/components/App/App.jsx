import { useState } from 'react'

import { Route, Routes } from 'react-router';
import Navigation from '../Navigation/Navigation';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import MoviesPage from '../../pages/MoviesPage';
import HomePage from '../../pages/HomePage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../../pages/NotFoundPage';
import css from './App.module.css';
// 


export default function App() {
  return (
    <div className={css.container}>
      <Navigation/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="review" element={<MovieReviews />} />
        </Route> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

