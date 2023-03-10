import { useEffect, useState } from "react";

import WatchListButton from "../components/WatchListButton";

const Watchlist = () => {
  const [watchList, setWatchList] = useState([]);

  const DeleteWatchList = (e, movie) => {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
    localStorage.removeItem("film-buddy-favourites");
    // e.stopPropagation();
  };

  useEffect(() => {
    const storedData = localStorage.getItem("film-buddy-favourites");
    if (storedData) {
      const movieWatchList = JSON.parse(storedData);
      setWatchList(movieWatchList);
    }
  }, []);

  console.log(watchList);

  return (
    <>
      <h1 className="text-4xl font-bold my-8 text-center uppercase">
        Watchlist
      </h1>
      <div className="grid grid-cols-6 grid-rows-3 gap-5 min-h-screen mt-8">
        {watchList.map((item) => {
          let movieScore = (item.vote_average).toString().slice(0, 3);
          return (
            <div className="relative" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                alt={
                  item.original_title ? item.original_title : item.original_name
                }
                className="object-cover rounded-md"
              />
              <a
                href={`/${item.id}`}
                className="overlay absolute inset-0 h-full w-full opacity-0 bg-black hover:opacity-80 transition-opacity p-3"
              >
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">
                    {item.original_title
                      ? item.original_title
                      : item.original_name}
                  </span>
                  <span className="text-lg font-semibold">
                    {movieScore}
                  </span>
                </div>
                <WatchListButton
                  handleWatchListClick={DeleteWatchList}
                  data={item}
                  innerText={"Delete From List -"}
                />
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Watchlist;
