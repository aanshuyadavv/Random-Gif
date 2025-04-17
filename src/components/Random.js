import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Spinner from "./Spinner";
const Random = () => {
  const [randomImage, setRandomImage] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);

  const giphy_api_key = process.env.REACT_APP_API_KEY;

  const fetchData = async () => {
    setIsDataLoading(true);
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_api_key}`;
    const data = await axios.get(url);
    const output = data.data.data.images.downsized_large.url;
    setRandomImage(output);
    setIsDataLoading(false);
    // const url = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=dog"
  };

  useEffect(() => {
    fetchData();
  }, []);

  function clickHandler() {
    fetchData();
  }
  return (
    <div className="w-1/2 bg-green-500 mx-auto rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]">
      <h1 className="text-3xl uppercase underline font-bold">A random gif</h1>
      {isDataLoading ? <Spinner /> : <img src={randomImage} alt="" />}

      <button
        onClick={clickHandler}
        className="w-10/12 bg-white text-xl py-2 rounded-lg font-bold mb-8 btn"
      >
        Generate
      </button>
    </div>
  );
};

export default Random;
