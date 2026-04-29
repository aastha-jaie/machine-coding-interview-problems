import { useEffect, useRef, useState } from "react";
import Posts from "./Posts";

const url = "https://picsum.photos/v2/list";

const InfiniteScroll = () => {
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const callImageApi = () => {
    fetch(`${url}?page=${pageNo}&limit=3`)
      .then((res) => res.json())
      .then((val) => setImages((oldImages) => [...oldImages, ...val]));
  };
  useEffect(() => {
    callImageApi(pageNo);
  }, [pageNo]);

  return <Posts images={images} setPageNo={setPageNo} />;
};

export default InfiniteScroll;
