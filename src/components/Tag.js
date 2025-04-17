import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./Spinner";
const Tag = () => {
  const giphy_api_key = process.env.REACT_APP_API_KEY;
  
  const [TagImage, setTagImage] = useState("");
  const [name, setName] = useState("car");
  const [isDataLoading, setIsDataLoading] = useState(false)


  const fetchData = async () => {
    try {
      setIsDataLoading(true)
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${giphy_api_key}&tag=${name}`;
      const response = await axios.get(url);
      const output = response.data.data.images.downsized_large.url;
      setTagImage(output);
      setIsDataLoading(false)
    } catch (error) {
      console.error("Error fetching GIF:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function clickHandler() {
    fetchData();
  }
  function changeHandler(event) {
    return setName(event.target.value);
  }
  return (
    <div className="w-1/2 mb-10 bg-blue-500 mx-auto rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]">
      <h1 className="text-3xl uppercase underline font-bold">random {name} gif</h1>
      {isDataLoading ? <Spinner /> : <img src={TagImage} alt="" />}
      <input type="text" className="w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center" onChange={changeHandler} value={name} />
      <button onClick={clickHandler} className="w-10/12 bg-white text-xl py-2 rounded-lg font-bold mb-8 btn">Generate</button>
    </div>
  );
};

export default Tag;
