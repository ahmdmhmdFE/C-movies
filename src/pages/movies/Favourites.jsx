import { baseImgUrl } from "../../utils/axios.instance";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav } from "../../services/redux/slices/favListSlice";

export default function Favourites() {
  const favList = useSelector((state) => state.favList.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="grid grid-cols-4 gap-2 mx-5 my-1 h-1/3">
        {favList.map((item) => (
          <>
            <Card
              className="h-auto max-w-sm"
              imgSrc={`${baseImgUrl}${item["poster_path"]}`}
            >
              <h6 className="font-bold tracking-tight text-md text-gray-90 dark:text-white flex justify-center">
                {item.title}
              </h6>
              <div className="flex flex-col items-center justify-between">
                <button
                  className="my-2"
                  onClick={() => {
                    dispatch(removeFromFav(item));
                  }}
                >
                  <IoHeartDislikeSharp className="w-7 h-7 text-red-700" />
                </button>
                <Link to={`/details/${item.id}`}>Show Daitels About Film</Link>
              </div>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
