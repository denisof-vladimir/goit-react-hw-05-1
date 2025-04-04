import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ApiKey ="c85e828b49d07a3c8e345413b2775532";
const ApiReadAccessToken="Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODVlODI4YjQ5ZDA3YTNjOGUzNDU0MTNiMjc3NTUzMiIsIm5iZiI6MTc0MjU0NDM5Mi4yNTEwMDAyLCJzdWIiOiI2N2RkMWUwODI5OTIzNzg0OTM3YTYyYjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.jIPKzmWWor-HF4iha77LXUvYY8SjhMONZ5yzbkeXwD4";
// const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
// const url = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
    headers: {
        accept: 'application/json',
    // Замість api_read_access_token вставте свій токен
        Authorization: ApiReadAccessToken               
    }
    };
  
  export const fetchTrending = async (page) => {
    const resp = await axios(`trending/movie/week?page=${page}`, options);
    return resp.data;
  };
  
  export const fetchMovieDetails = async (moviesId) => {
    const resp = await axios(`movie/${moviesId}`, options);
    return resp.data;
  };
  
  export const fetchMovieCredits = async (moviesId) => {
    const resp = await axios(`movie/${moviesId}/credits`, options);
    return resp.data;
  };
  
  export const fetchMovieReviews = async (moviesId) => {
    const resp = await axios(`movie/${moviesId}/reviews`, options);
    return resp.data;
  };
  
  export const fetchSearchMovie = async (query, page) => {
    const resp = await axios("search/movie", {
      ...options,
      params: { query },
    });
    return resp.data;
  };


