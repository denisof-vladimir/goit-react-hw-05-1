import { useState, useEffect,  useContext, CSSProperties  } from 'react';
import { useSearchParams } from 'react-router';
import { useDebounce } from 'use-debounce';
import * as Yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import { fetchSearchMovie  }  from "../components/FetchInfo/FetchInfo";
import  ListFilms from "./ListFilms";
import css from "./MoviesPage.module.css";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
  
export default function MoviesPage() {
    const [error, setError] = useState(false);
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(false);   
    const [isLoadLess, setIsLoadLess] = useState(false);   
    // const [query, setQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const [debouncedQuery] = useDebounce(query, 2000); 

    const changeSearchText = (event) => {
      setFilms([]);
      const nextParams = new URLSearchParams(searchParams);
      if (event.target.value !== '') {
        nextParams.set('query', event.target.value);
      } else {
        nextParams.delete('query');
      }
      setSearchParams(nextParams);
    };    

function nextBtn()  {
    setIsLoadMore(false);
    setIsLoadLess(false);
    setPage(page+1);
    };

function predBtn()  {
    setIsLoadLess(false);
    setIsLoadMore(false);
    setPage(page-1);
    };

function LoadMoreBtn({nextBtn}) {
    return (
      <div>
          <button  onClick={nextBtn} className={css.buttonMore} type="submit">
            More 
          </button>   
      </div>  )};
      
function LoadLessBtn({predBtn}) {
    return (
      <div>
          <button  className={css.buttonMore} onClick={predBtn} type="submit">
            Less 
          </button>   
      </div>  )};     

  useEffect(() => {
    const fetchSearchFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const images = await fetchSearchMovie (debouncedQuery, page);
        if (images.results.length === 0) {
          toast.error("No films found!");
          return;
        }
        setIsLoadMore(images.total_pages > page);
        setIsLoadLess(page>1);
        setFilms( images.results ); 
        }
    catch {
        setError(true);
        toast.error("Error MoviePage! Please, reload page!");
         } 
    finally {
        setIsLoading(false);
      }
    };
    fetchSearchFilms();
    }, [ page, debouncedQuery]);

    return (
      <>  
          <input type="text" value={query} onChange={changeSearchText} />
          {isLoading && <Loader />}
          {error && <ErrorMessage />} 
          {films.length > 0 && <ListFilms films={films} page={page} />} 
          {isLoadMore && <LoadMoreBtn nextBtn={nextBtn} />}
          {isLoadLess && <LoadLessBtn predBtn={predBtn}/>}
        </>
      );
    }