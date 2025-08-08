import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 sm:py-8 sm:px-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Recipe Book</h2>
          <p className="text-sm sm:text-base">© {new Date().getFullYear()} Recipe Book. All rights reserved.</p>
        </div>
        <div className="text-sm sm:text-base">
          <p>Email: info@recipebook.com</p>
          <p>Phone: +880 1234-567890</p>
        </div>
        <div className="flex space-x-3 sm:space-x-4 text-xl sm:text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-sky-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-500 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
