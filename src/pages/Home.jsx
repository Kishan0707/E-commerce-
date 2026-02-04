import Navbar from "../components/Navbar";
import Products from "./Products";
const Home = () => {
  return (
    <>
      <div>
        <div className="mb-20">{/* <Navbar /> */}</div>
        <div className="flex gap-5">
          {/* <div className="border border-r border-gray-300">
            <Sidebar />
          </div> */}
          <div className="mt-5 flex flex-col flex-1">
            <Products />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
