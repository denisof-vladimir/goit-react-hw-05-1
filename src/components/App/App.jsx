import { lazy, Suspense, useState } from "react";
import { Route, Routes } from 'react-router';
import Navigation from '../Navigation/Navigation';
const MovieDetailsPage = lazy(() =>  import("../pages/MovieDetailsPage/MovieDetailsPage"));
const MoviePage = lazy(() => import("../pages/MoviePage/MoviePage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
import NotFoundPage from '../../pages/NotFoundPage';
import css from './App.module.css';

export default function App() {
  return (
    <div className={css.container}>
      <Navigation/>
      <Suspense fallback={"Loadimg page..."}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movies/:moviesId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="review" element={<MovieReviews />} />
        </Route> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

