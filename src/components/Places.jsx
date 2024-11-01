import './Places.css';

function Places({ title, places, fallbackText }) {
  return (
    <section className="mx-28 my-8 px-8 py-4  rounded-md border-2 border-slate-950">
      <p className="p-4 font-bold tracking-wider text-3xl text-center">
        {title}
      </p>
      {places && places.length > 0 ? (
        <ul className="grid gridCols gap-4 my-8 max-w-7xl">
          {places.map((place) => (
            <li
              key={place.id}
              className="relative placeCardStyle rounded-md bg-red-700"
            >
              <button className="w-full h-full">
                <img
                  src={place.image.src}
                  alt={place.image.alt}
                  className="w-full h-full rounded-md"
                />
                <p className="absolute bottom-0 right-4 my-4 px-1 text-sm font-light rounded-md placeNameShadow bg-yellow-400">
                  {place.title}
                </p>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">{fallbackText ?? ''}</p>
      )}
    </section>
  );
}

export default Places;
