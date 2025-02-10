import React from "react";

const Header = () => {
  return (
    <header
      className="bg-cover bg-center h-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 shadow-lg backdrop-blur-sm"
      style={{ backgroundImage: "url('/gonosvmc.webp')" }}
    >
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <img
          src="/logo.jpg" // Replace with the actual logo file in your public folder
          alt="College Logo"
          className="h-20 w-20 object-contain rounded-full border-4 border-white shadow-md"
        />

        {/* College Name */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg tracking-wide">
          Gonoshasthaya Samaj Vittik Medical College
        </h1>
      </div>

      {/* Additional Decorative Element */}
      <div className="hidden sm:block text-white text-sm sm:text-base md:text-lg font-medium italic">
        "A Commitment to Quality Education and Service"
      </div>
    </header>
  );
};

export default Header;
