function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full px-40 py-12 bg-slate-100">
      <p>&#169; {currentYear} Placepicker</p>
    </footer>
  );
}

export default Footer;
