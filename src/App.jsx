import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Places from './components/Places';
import { AVAILABLE_PLACES } from './utils/data';

function App() {
  return (
    <>
      <Header />
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
        />
        <Places title="Available Places" places={AVAILABLE_PLACES} />
      </main>
      <Footer />
    </>
  );
}

export default App;
