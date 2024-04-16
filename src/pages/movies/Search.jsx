import { useEffect, useState } from "react";
import { axInstance, baseImgUrl } from "../../utils/axios.instance";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Search() {
  const [mList, setList] = useState([]);
  const [query, setQuery] = useState("");
  const { register, handleSubmit, getValues } = useForm({
    mode: "all",
  });

  useEffect(() => {
    axInstance
      .get("search/movie", {
        params: {
          query: query,
        },
      })
      .then((res) => {
        setList(res.data.results.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log(mList);
      });
  }, [query]);
  return (
    <>
      <div className="flex flex-col w-96 ">
        <form
          className="flex flex-col max-w-md gap-4"
          onSubmit={handleSubmit(() => {
            setQuery(getValues("search"));
          })}
        >
          <div>
            <div className="block mb-2">
              <Label htmlFor="search" value="Search" />
            </div>
            <TextInput
              id="search"
              type="text"
              placeholder="Search for your favourite movies...."
              onChange={() => {
                setQuery();
              }}
              {...register("search")}
            />
          </div>

          <Button type="submit">Search</Button>
        </form>

        {mList.length > 0 && (
          <Card className="max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Movies
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {mList.map((item) => {
                  return (
                    <li key={item.id} className="py-3 sm:py-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            alt="Neil image"
                            height="32"
                            src={`${baseImgUrl}${item["poster_path"]}`}
                            width="32"
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.release_date}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <Link to={`/details/${item.id}`}>Details</Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
