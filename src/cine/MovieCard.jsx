import { useContext, useState } from "react";
import { MovieContext } from "../context/index.js";
import { getImgUrl } from "../utils/cine-utility.js";
import MovieDetailsModal from "./MovieDetailsModal.jsx";
import Rating from "./Rating.jsx";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { cartData, setCartData } = useContext(MovieContext);

  function handleAddToCart(event, movie) {
    event.stopPropagation();
    console.log(cartData);

    const found = cartData.find((item) => {
      return item.id === movie.id;
    });

    if (!found) {
      setCartData([...cartData, movie]);
      setErrorMessage(null);
    } else {
      const message = `The movie ${movie.title} has been added to the cart already`;
      // console.error(message);
      setErrorMessage(message);

      // Clear error message
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }

  function handleModalClose() {
    setSelectedMovie(null);
    setShowModal(false);
  }

  function handleMovieSelection(movie) {
    setSelectedMovie(movie);
    setShowModal(true);
  }

  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleModalClose}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleMovieSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <a
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </a>
            {/* Error message display */}
            {errorMessage && (
              <div className="mt-2 text-center">
                <p className="text-red-500 text-sm font-medium">
                  ⚠️ {errorMessage}
                </p>
              </div>
            )}
          </figcaption>
        </a>
      </figure>
    </>
  );
}
