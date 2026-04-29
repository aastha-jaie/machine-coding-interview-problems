import { useEffect } from "react";

const Posts = ({ images, setPageNo }) => {
    //
  useEffect(() => {
    //as soon as element is visible on viewport or leave the viewport
    const observer = new IntersectionObserver((entries) => { 
      //observed element is visible on screen
      if (entries[0].isIntersecting) {
        observer.unobserve(lastImage[lastImage.length - 1]);
        setPageNo((page) => page + 1);
      }
    });
    const lastImage = document.querySelectorAll(".image-post"); //returns an array of images
    if (lastImage.length) { 
      observer.observe(lastImage[lastImage.length - 1]);
    }
  }, [images]);

  return (
    <div className="container">
      {images.map((image, idx) => (
        <img
          className="image-post"
          style={{ height: "333px" }}
          src={image.download_url}
          alt={image.author}
          key={image.id}
        />
      ))}
    </div>
  );
};
export default Posts;
