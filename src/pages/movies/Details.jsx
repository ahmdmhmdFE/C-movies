import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axInstance, baseImgUrl } from "../../utils/axios.instance";
import { Card } from "flowbite-react";

export default function Details() {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    axInstance
      .get(`movie/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <>
      {error ? (
        <div className="error-message">Error: {error.message}</div>
      ) : (
        <>
          {movie ? (
            <>
              <Card
                className="w-4/6 h-full my-7"
                imgSrc={`${baseImgUrl}${movie["backdrop_path"]}`}
              >
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {movie.overview}
                </p>
                <div className="flex justify-between">
                  <p>{movie.tagline}</p>
                  <h3>✩ {movie["vote_average"]}</h3>
                </div>
              </Card>
            </>
          ) : (
            <p>Wait for loading...</p>
          )}
        </>
      )}
    </>
  );
}
