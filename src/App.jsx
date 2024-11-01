import './App.css';
import Modal from './components/common/Modal';
import Footer from './components/Footer';
import Header from './components/Header';
import Places from './components/Places';
import { AVAILABLE_PLACES } from './utils/data';
import { useRef, useState } from 'react';

function App() {
  const modalRef = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);

  function handleAddToPickedPlaces({ id, image, title }) {
    setPickedPlaces((prevPickedPlaces) => {
      const existingPlace = prevPickedPlaces.some((place) => place.id === id);

      if (!existingPlace) {
        return [...prevPickedPlaces, { id, image, title }];
      }
    });
  }

  return (
    <>
      <Modal
        title="Delete Place"
        message="Are you sure you want to delete this place ?"
        ref={modalRef}
      />
      <Header />
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onPlaceClick={handleAddToPickedPlaces}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
