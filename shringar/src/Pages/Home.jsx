
import Displaycard from "../Components/Displaycard";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";

const Home = () => {



    return (
        <div>
            <Navbar></Navbar>
            <Slider></Slider>
            {/* <Categories></Categories> */}
            <Displaycard></Displaycard>
            <Footer></Footer>
        </div>
    );
};

export default Home;