import { useState } from 'react'

import { Route, Routes } from 'react-router';
import Navigation from '../Navigation/Navigation';
import MovieDetailsPage from '../../pages/MovieDetailsPage';

import MoviesPage from '../../pages/MoviesPage';
// import UserTodos from '../UserTodos/UserTodos';
import HomePage from '../../pages/HomePage';
// import UsersPage from '../../pages/UsersPage';
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


          {/* <Route path="posts" element={<UserPosts />} />
          <Route path="todos" element={<UserTodos />} /> */}

        </Route> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
// export default App
