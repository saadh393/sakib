import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import img from '../../../img/b3.jpg'

import './ReadMore.css';

const ReadMore = () => {
   const {service} =useParams()
   console.log(service.id)
   
    return (
        <>
        <div className="readmore-container mb-5">
            <div className="background-color">
                <h2>This is about</h2>
            </div>
        </div>
        <Container>
            <Row>
            <Col xxl={8} xl={8} lg={8} md={8} xm={12} xs={12} className="m-auto">
                 <div className="readMore-content ">
                      <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Image src={img} className="img-fluid readmore-img"/>
                          </Col>
                      <h1>This is title </h1>
                      <p>This is description</p>
                      
                 </div>
            </Col>
            </Row>
        </Container>
        </>
    );
};

export default ReadMore;