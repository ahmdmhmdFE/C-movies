import { useEffect, useState } from "react";
import { baseImgUrl } from "../../utils/axios.instance";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { Pagination } from "flowbite-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFav,
  removeFromFav,
} from "../../services/redux/slices/favListSlice";
import { moviesAcion } from "../../services/redux/slices/movies";

export default function Movies() {
  const mList = useSelector((state) => state.moviesList.mList);
  const [currentPage, setCurrentPage] = useState(1);
  const favList = useSelector((state) => state.favList.value);
  const favIdList = favList.map((f) => f.id);
  const dispatch = useDispatch();
  const onPageChange = (page) => setCurrentPage(Number(page));
  const isFav = (id) => {
    if (favIdList.includes(id)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    dispatch(moviesAcion(currentPage));
  }, [currentPage]);

  

  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-2 mx-7 my-5">
          {mList.map((item) => (
            <>
              <Card
                className="h-auto max-w-sm"
                imgSrc={`${baseImgUrl}${item["poster_path"]}`}
              >
                <h6 className="font-bold tracking-tight text-sm text-gray-90 dark:text-white flex justify-center ">
                  {item.title}
                </h6>
                <div className="flex flex-col items-center justify-between">
                  {isFav(item.id) ? (
                    <button
                      className="my-2"
                      onClick={() => {
                        dispatch(removeFromFav(item));
                      }}
                    >
                      <FaHeart className="w-5 h-5 text-red-700" />
                    </button>
                  ) : (
                    <button
                      className="my-2"
                      onClick={() => {
                        dispatch(addToFav(item));
                      }}
                    >
                      <FaRegHeart className="w-5 h-5 text-red-700" />
                    </button>
                  )}
                  <Link to={`/details/${item.id}`}>
                    Show Daitels About Film
                  </Link>
                </div>
              </Card>
            </>
          ))}
        </div>
        <div className="flex sm:justify-center pt-3 pb-10">
          <Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </>
  );
}
