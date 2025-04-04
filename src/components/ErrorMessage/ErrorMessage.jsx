// import toast, { Toaster } from "react-hot-toast";
import  { Toaster } from "react-hot-toast";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage({ error }) {
  return (
    <div className={css.errorMessageStyle}>
      <Toaster />
      <p>{error}</p>
    </div>
  );
}