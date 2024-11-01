import './Places.css';

function Places({ title, places, fallbackText, onPlaceClick }) {
  function handleOnPlaceClick(place) {
    const selectedPlace = {
      ...place,
      image: {
        src: place.image.src,
        alt: place.image.alt,
      },
    };
    onPlaceClick(selectedPlace);
  }

  return (
    <section
      className="mx-28 my-8 px-8 py-4  rounded-md border-2 border-slate-950"
      data-testid="places-section"
    >
      <p
        className="p-4 font-bold tracking-wider text-3xl text-center"
        data-testid="places-section-title"
      >
        {title}
      </p>
      {places && places.length > 0 ? (
        <ul
          className="grid gridCols gap-4 my-8 max-w-7xl"
          data-testid="places-list-container"
        >
          {places.map((place) => (
            <li
              key={place.id}
              className="relative placeCardStyle rounded-md bg-red-700"
              data-testid="place-list-item"
            >
              <button
                className="w-full h-full"
                data-testid="place-list-card-btn"
                onClick={() => handleOnPlaceClick(place)}
              >
                <img
                  src={place.image.src}
                  alt={place.image.alt}
                  className="w-full h-full rounded-md"
                  data-testid="place-list-card-image"
                />
                <p
                  className="absolute bottom-0 right-4 my-4 px-1 text-sm font-light rounded-md placeNameShadow bg-yellow-400"
                  data-testid="place-list-card-title"
                >
                  {place.title}
                </p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center" data-testid="places-fallback-text">
          {fallbackText ?? ''}
        </p>
      )}
    </section>
  );
}

export default Places;
