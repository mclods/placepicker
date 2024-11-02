import './App.css';
import Modal from './components/common/Modal';
import DeleteConfirmationDialogButtons from './components/DeleteConfirmationDialogButtons';
import Footer from './components/Footer';
import Header from './components/Header';
import Places from './components/Places';
import { AVAILABLE_PLACES } from './utils/data';
import { useEffect, useRef, useState } from 'react';
import { sortPlacesByDistance } from './utils/loc';

function App() {
  const modalRef = useRef();
  const selectedPlaceForDeletionRef = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedPlaces = sortPlacesByDistance(
          AVAILABLE_PLACES,
          position.coords.latitude,
          position.coords.longitude
        );
        setAvailablePlaces(sortedPlaces);
      },
      () => {
        setAvailablePlaces(AVAILABLE_PLACES);
      }
    );
  }, []);

  function handleAddToPickedPlaces(place) {
    const newPlace = {
      ...place,
      image: {
        ...place.image,
      },
    };

    setPickedPlaces((prevPickedPlaces) => {
      const existingPlace = prevPickedPlaces.some(
        (place) => place.id === newPlace.id
      );

      if (!existingPlace) {
        return [...prevPickedPlaces, newPlace];
      }
    });
  }

  function handleRemoveFromPickedPlaces(place) {
    const selectedPlace = {
      ...place,
      images: {
        ...place.image,
      },
    };

    modalRef.current.open();
    selectedPlaceForDeletionRef.current = selectedPlace;
  }

  function removeSelectedPlace() {
    const selectedPlace = selectedPlaceForDeletionRef.current;

    setPickedPlaces((prevPickedPlaces) => {
      const currentPlaces = [...prevPickedPlaces];

      const placeIndex = prevPickedPlaces.findIndex(
        (place) => place.id === selectedPlace.id
      );
      if (placeIndex !== -1) {
        currentPlaces.splice(placeIndex, 1);
      }

      return currentPlaces;
    });
  }

  function cancelDeletion() {
    selectedPlaceForDeletionRef.current.ref = undefined;
  }

  return (
    <>
      <Modal
        title="Delete Place"
        message="Are you sure you want to delete this place ?"
        ref={modalRef}
        dialogButtons={
          <DeleteConfirmationDialogButtons
            onCancel={cancelDeletion}
            onConfirm={removeSelectedPlace}
          />
        }
      />
      <Header />
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onPlaceClick={handleRemoveFromPickedPlaces}
        />
        <Places
          title="Available Places"
          fallbackText="Sorting places by distance..."
          places={availablePlaces}
          onPlaceClick={handleAddToPickedPlaces}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
