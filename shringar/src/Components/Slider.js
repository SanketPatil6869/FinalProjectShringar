
import React from 'react'
import { Carousel } from 'react-bootstrap';



function Slider() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 backImg me-0 ms-0"
                        //src="holder.js/800x400?text=First slide&bg=373940"
                        src={require("../Images/Slider1.jpg")}
                        //style={{height:"80vh",objectFit:"cover" }}
                        alt="First slide"
                        height={"600vh"}
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 backImg"
                        src={require("../Images/Slider2.jpg")}
                        alt="Second slide"
                        height={"600vh"}
                    />


                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 backImg"
                        src={require("../Images/Slider3.jpg")}
                        alt="Third slide"
                        height={"600vh"}
                    />

                </Carousel.Item>
            </Carousel>

        </div>
    )
}

export default Slider