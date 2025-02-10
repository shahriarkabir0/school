import Header from "./Header";
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="flex-grow bg-gray-100 p-6">{children}</main>
        <Footer />
      </div>
    );
  };
  
  export default Layout;