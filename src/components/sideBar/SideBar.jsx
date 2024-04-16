import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { PiSignInBold } from "react-icons/pi";
import { useSelector } from "react-redux";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useContext } from "react";
import { userContext } from "../../contexts/user";

export default function SideBar() {
  const count = useSelector((state) => state.favList.value.length);
  const { user } = useContext(userContext);

  return (
    <Sidebar className="flex-none h-screen rounded-none">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={FaHome}>
            <Link to="/">Home</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight}>
            <Link to="signin">Sign In</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={PiSignInBold}>
            <Link to="signup">Sign Up</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={MdLocalMovies}>
            <Link to="movies">Movies</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={FaSearch}>
            <Link to="search">Search</Link>
          </Sidebar.Item>
          <Sidebar.Item icon={FaHeart} label={count}>
            <Link to="fav">Favorites</Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            {user.username ?? "No User"}
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
