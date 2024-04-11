import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
// import './Homepage.css';

const HomePage = () => {
    const [homepageData, setHomepageData] = useState({});


    return (
        //     // <Container className="homepage-container mt-5">
        //         {/* <Row className="homepage-navigation">
        //             <Col>
        //                 <h3>Navigation</h3>
        //                 <ul className="list-unstyled">
        //                     <li><Link to="/homepage" className="text-decoration-none">Home</Link></li>
        //                     <li><Link to="/products" className="text-decoration-none">Products</Link></li>
        //                     <li><Link to="/categories" className="text-decoration-none">Categories</Link></li>
        //                 </ul>
        //             </Col> */}
        //         {/* </Row> */}
        //         {/* <Row className="homepage-logout-button">
        //             <Col>
        //                 <Button variant="primary">Logout</Button>
        //             </Col>
        //         </Row> */}
        //         <>
        //         <ul class="nav nav-underline">
        //             <li class="nav-item">
        //                 <a class="nav-link active" aria-current="page" href="#">Active</a>
        //             </li>
        //             <li class="nav-item">
        //                 <a class="nav-link" href="#">Link</a>
        //             </li>
        //             <li class="nav-item">
        //                 <a class="nav-link" href="#">Link</a>
        //             </li>
        //             <li class="nav-item">
        //                 <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        //             </li>
        //         </ul>
        //         <Row>
        //             <Col md={6} className="mb-4">
        //                 <h1 className="homepage-title">Welcome </h1>
        //                 <p className="homepage-description">{homepageData.description}</p>
        //                 <div className="homepage-buttons">
        //                 </div>
        //             </Col>
        //             <Col md={6}>
        //                 <img src={homepageData.imageUrl} alt="Description of image" className="homepage-image" />
        //             </Col>
        //         </Row>
        //         </>
        //     // </Container>
        <div>
        <ul class="nav nav-underline justify-content-end">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/homepage">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/products">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/categories">Categories</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/login">Logout</a>
            </li>
        </ul>

<Row>
<Col md={6} className="mb-4">
                 <h1 className="homepage-title">Welcome </h1>
                 <p className="homepage-description">{homepageData.description}</p>
                 <div className="homepage-buttons">
                 </div>
             </Col>
             <Col md={6}>
                 <img src={homepageData.imageUrl} alt="Description of image" className="homepage-image" />
             </Col>
         </Row>
         </div>
    );
};

export default HomePage;
