    import { useState, useEffect,  useContext, CSSProperties  } from 'react';
    import toast, { Toaster } from "react-hot-toast";
    import { fetchMovieReviews } from "../FetchInfo/FetchInfo";
    import Loader from "../Loader/Loader";
    import ErrorMessage from "../ErrorMessage/ErrorMessage";
    import css from "./MovieReviews.module.css";
    import { NavLink, Outlet, useParams } from 'react-router';
    
    export default function MovieReviews() {
        const [error, setError] = useState(false);
        const { moviesId} = useParams();
        const [reviews, setReviews] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
    
      useEffect(() => {
        const fetchReviewsFilms = async () => {
          try {
            setIsLoading(true);
            setError(false);
            const data = await fetchMovieReviews ( moviesId);
            setReviews(data.results);
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
    
        fetchReviewsFilms();
        
    }, [moviesId]);
    
return (
    <div>
      {isLoading && <b>Loading...</b>}
      {error && <b>Error...</b>}
      { ! reviews && <p>  Not have reviews </p>}
      {reviews && (
        <ul className={css.reviews}>
             {reviews.map((review, index) => (
                <li className={css.reviewsLi} key={review.id}>
                    <div>
                        <p className={css.autor}> Autor -  {review.author} </p>
                        <p className={css.textReview}>  {review.content} </p>
                    </div>
                </li>
            ))}
        </ul>
         )  }
       
        </div>
    )
    }