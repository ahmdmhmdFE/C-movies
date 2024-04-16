import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";
import { MdLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import moviesLogo from "../../assets/logo.png";
import { signMeOut } from "../../services/firebase/auth";
import { Toaster } from "react-hot-toast";
import { userContext } from "../../contexts/user";
import { useContext } from "react";
import blankProfilePic from "../../assets/blank.png";

export default function NavBar() {
  const { user, setUser } = useContext(userContext);
  return (
    <>
      <Navbar fluid>
        <Navbar.Brand href="#">
          <img src={moviesLogo} className="mr-2 h-12" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Cmovies
          </span>
          <DarkThemeToggle className="mx-3" />
        </Navbar.Brand>
        {user.token && (
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar img={blankProfilePic} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.username ?? "Not Signed in"}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  setUser({});
                  signMeOut();
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        )}
        <Navbar.Collapse>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="search">Search</Link>
          </div>
          <div icon={MdLocalMovies}>
            <Link to="movies">Movies</Link>
          </div>
          <div>
            <Link to="fav">Favorites</Link>
          </div>
          {!user.token ? (
            <>
              <div>
                <Link to="signup">Sign up</Link>
              </div>
              <div>
                <Link to="signin">Sign in</Link>
              </div>
            </>
          ) : (
            <div>
              <Link
                onClick={() => {
                  setUser({});
                  signMeOut();
                }}
              >
                Sign Out
              </Link>
            </div>
          )}
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Toaster />
      </div>
    </>
  );
}
