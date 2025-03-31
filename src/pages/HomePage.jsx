import { useState, useEffect,  useContext, CSSProperties  } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { fetchTranding }  from "../components/FetchInfo/FetchInfo";
import  ListFilms from "./ListFilms";
// import LoadMoreBtn from "./ListFilms";
// import  LoadLessBtn  from "./ListFilms";
import css from "./HomePage.module.css";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
// import ImageModal from "../ImageModal/ImageModal";

export default function HomePage() {
    const [error, setError] = useState(false);
    
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(false);   
    const [isLoadLess, setIsLoadLess] = useState(false);   

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
    const fetchFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const images = await fetchTranding ( page);
        console.log("1-",images);
        if (images.results.length === 0) {
          toast.error("No images found!");
          return;
        }
        console.log("2-", images.total_pages, "/", page);
        setIsLoadMore(images.total_pages > page);
        setIsLoadLess(page>1);
       
        setFilms( images.results ); 
        }
    catch {
        setError(true);
        toast.error("Error in HomePage! Please, reload page!");
         } 
    finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
    console.log("After Fetch-",films);
    }, [ page ]);
 
    return (
        <>
          <div>
            
            {isLoading && <Loader />}
            {/* {error && <ErrorMessage />}  */}
            {films.length > 0 && <ListFilms films={films} page={page} />} 
            {isLoadMore && <LoadMoreBtn nextBtn={nextBtn} />}
            {isLoadLess && <LoadLessBtn predBtn={predBtn}/>}
          </div>  
          
        </>
      )
    }