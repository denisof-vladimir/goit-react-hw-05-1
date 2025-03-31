import { RingLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = ({ loading, size = 60, color = "#9b0780" }) => {
  return (
    <div className={css.loaderContainer}>
      <RingLoader size={size} color={color} loading={loading} />
    </div>
  );
};

export default Loader;