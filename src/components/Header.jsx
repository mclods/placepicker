import logo from '../assets/logo.png';

function Header() {
  return (
    <header
      className="mt-8 flex flex-col items-center gap-y-4"
      data-testid="header"
    >
      <img
        src={logo}
        className="w-20 h-20 object-contain drop-shadow-lg"
        alt="Stylized Globe"
        data-testid="company-logo"
      />
      <p
        className="font-extrabold text-6xl tracking-[1rem] uppercase"
        data-testid="company-title"
      >
        Placepicker
      </p>
      <p
        className="w-[40ch] text-lg text-center"
        data-testid="company-subtitle"
      >
        Create your personal collection of places you would like to visit or you
        have visited.
      </p>
    </header>
  );
}

export default Header;
