import './App.css';
import Modal from './components/common/Modal';
import DeleteConfirmationDialog from './components/DeleteConfirmationDialog';
import Footer from './components/Footer';
import Header from './components/Header';
import Places from './components/Places';
import { AVAILABLE_PLACES } from './utils/data';
import { useEffect, useRef, useState, useCallback } from 'react';
import { sortPlacesByDistance } from './utils/loc';

const storedPlaces = JSON.parse(localStorage.getItem('selectedPlaces')) || [];

function App() {
  const [openModal, setOpenModal] = useState(false);
  const selectedPlaceForDeletionRef = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
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

      return [...prevPickedPlaces];
    });

    // Add place to browser storage
    const storedPlaces =
      JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const existingPlace = storedPlaces.some(
      (place) => place.id === newPlace.id
    );
    if (!existingPlace) {
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([...storedPlaces, newPlace])
      );
    }
  }

  function handleRemoveFromPickedPlaces(place) {
    const selectedPlace = {
      ...place,
      images: {
        ...place.image,
      },
    };

    selectedPlaceForDeletionRef.current = selectedPlace;
    setOpenModal(true);
  }

  const removeSelectedPlace = useCallback(function () {
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

    // Remove place from local storage
    const storedPlaces =
      JSON.parse(localStorage.getItem('selectedPlaces')) || [];
    const placeIndex = storedPlaces.findIndex(
      (place) => place.id === selectedPlace.id
    );
    if (placeIndex !== -1) {
      storedPlaces.splice(placeIndex, 1);
      localStorage.setItem('selectedPlaces', JSON.stringify([...storedPlaces]));
    }

    setOpenModal(false);
  }, []);

  function cancelDeletion() {
    selectedPlaceForDeletionRef.current.ref = undefined;
    setOpenModal(false);
  }

  return (
    <>
      <Modal openModal={openModal} onClose={cancelDeletion}>
        <DeleteConfirmationDialog
          onCancel={cancelDeletion}
          onConfirm={removeSelectedPlace}
        />
      </Modal>
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
