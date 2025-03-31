import { useState, useEffect,  useContext, CSSProperties  } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from "react-hot-toast";
import { fetchSearchMovie  }  from "../components/FetchInfo/FetchInfo";
import  ListFilms from "./ListFilms";
// import LoadMoreBtn from "./ListFilms";
// import  LoadLessBtn  from "./ListFilms";
import css from "./MoviesPage.module.css";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

// export default function MoviesPage() {
//     return (
//         <div>
//             <h1>Movies for <menu type="context"></menu></h1>
//             <p>
//                 text movies
//             </p>
//         </div>
//     );
// }

const UserSchema = Yup.object().shape({
    searchFilms: Yup.string()
      .min(2, 'Must be min 2 chars')
      .required('This field is required'),
  });
  
export default function MoviesPage() {
    const [error, setError] = useState(false);
    
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(false);   
    const [isLoadLess, setIsLoadLess] = useState(false);   
    const [searchFilms, setSearchFilms] = useState("");

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

const handleSubmit = (values, actions) => {
    console.log("handleSubmit-", values);
    const mySearch=values.searchFilms.trim();
    if (mySearch === "") {
      alert("Please enter search term!");
      return;
    }
    actions.resetForm();
    setSearchFilms(mySearch);
    };

  useEffect(() => {
    const fetchSearchFilms = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const images = await fetchSearchMovie (searchFilms, page);
        console.log("after fetchSearchMovie-",images);
        if (images.results.length === 0) {
            console.log("13-",images.results.length);  
          toast.error("No films found!");
          return;
        }
        console.log("23-", images.total_pages, "/", page);
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

    if (searchFilms.length > 0) {
        fetchSearchFilms();
        }
    
    }, [ page, searchFilms ]);
    console.log("After Fetch Search-",films);
    return (
        <>  
            <Formik
                initialValues={{
                    searchFilms: ''
                    }}
                validationSchema={UserSchema}
                onSubmit={handleSubmit}
                >
                <Form className={css.formSearch}>
                    <div >
                    <label > Input name(parts of name)  Films : </label>
                    <Field  type="text" name="searchFilms" />
                    <ErrorMessage
                    
                        name="searchFilms"
                        component="span"
                    />
                    </div>   
                    <button className={css.buttonSearch} type="submit">
                    Search film
                    </button>
                </Form>
            </Formik>

            {isLoading && <Loader />}
            {/* {error && <ErrorMessage />}  */}
            {films.length > 0 && <ListFilms films={films} page={page} />} 
            {isLoadMore && <LoadMoreBtn nextBtn={nextBtn} />}
            {isLoadLess && <LoadLessBtn predBtn={predBtn}/>}
        </>
      );
    }