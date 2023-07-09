import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Carousel = (props) => {
    //STATE VARIABLES:-
    const [searchText, setSearchText] = useState("");

    //FUNCTIONS:-
    function handleSubmit(e){
        e.preventDefault();
        props.Search(searchText);
    }

    function handleChange(e){
        setSearchText(e.target.value);
    }



    return (
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id="carousel">
                <div className="carousel-caption " style={{"zIndex":"10"}}>
                    <form onSubmit={handleSubmit} className="d-flex" role="search">
                        <input value={searchText} onChange={handleChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit"><SearchIcon></SearchIcon></button>
                    </form>
                </div>
                <div className="carousel-item active">
                    <img src="https://source.unsplash.com/random/900x700/?pizza" style={{"filter":"brightness(37%)"}} className="d-block w-100" alt="pizza" />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x700/?taco" style={{"filter":"brightness(37%)"}} className="d-block w-100" alt="taco" />
                </div>
                <div className="carousel-item">
                    <img src="https://source.unsplash.com/random/900x700/?shakes" style={{"filter":"brightness(37%)"}} className="d-block w-100" alt="milk-shake" />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>





        //     <div>
        //     <div id="carouselExampleControls" classNameName="carousel slide" data-ride="carousel">
        //     <div classNameName="carousel-inner">
        //       <div classNameName="carousel-item active">
        //         <img classNameName="d-block w-100" src="https://source.unsplash.com/random/900x700/?pizzaps://source.unsplash.com/random/300x300/?pizza" alt="First slide"/>
        //       </div>
        //       <div classNameName="carousel-item">
        //         <img classNameName="d-block w-100" src="https://source.unsplash.com/random/900x700/?pizzaps://source.unsplash.com/random/300x300/?pasta" alt="Second slide"/>
        //       </div>
        //       <div classNameName="carousel-item">
        //         <img classNameName="d-block w-100" src="https://source.unsplash.com/random/900x700/?pizzaps://source.unsplash.com/random/300x300/?mocktails" alt="Third slide"/>
        //       </div>
        //     </div>
        //     <a classNameName="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
        //       <span classNameName="carousel-control-prev-icon" aria-hidden="true"></span>
        //       <span classNameName="sr-only">Previous</span>
        //     </a>
        //     <a classNameName="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
        //       <span classNameName="carousel-control-next-icon" aria-hidden="true"></span>
        //       <span classNameName="sr-only">Next</span>
        //     </a>
        //   </div></div>
    )
}

export default Carousel