import React, { useState } from 'react'
import { useGetOneProductQuery } from '../redux/slices/productsApiSlice'
import { useParams } from 'react-router-dom';
import { Button, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import moment from 'moment/moment';

const ProductDetails = () => {
  const {id} = useParams();
  const [imageIndex, setImageIndex] = useState(0)
  const {data : oneProduct} = useGetOneProductQuery(id);
  console.log(oneProduct);
  return (
    <>
      <Row>
        <Col md={5}>
<Row>
<Image src={oneProduct?.images[imageIndex]?.url}/>
</Row>
{ oneProduct?.images?.length > 1 &&
  <Row className='mt-5 d-flex  flex-md-row text-center '>
  {oneProduct?.images?.map((image , index) => 
  <Col xs={12 / oneProduct?.images?.length} md={12 / oneProduct?.images?.length } >
  <Image src={image?.url}  fluid width={100} onClick={()=> setImageIndex(index)} 
  style={{scale : imageIndex === index ? "1.3" : "1" , transition : "all 0.3s" , cursor : "pointer"}}/>
  </Col>
  )}
</Row>
}
        </Col>

        <Col md={7} className='mt-5'>
<ListGroup variant="flush" className='fs-5 '>
  <ListGroup.Item>
    <h4 className='text-danger fw-bold '>{oneProduct?.name}</h4>
    <p>{oneProduct?.description}</p>
  </ListGroup.Item>
  <ListGroup.Item>
  <h4 className='text-danger fw-bold '>Product Details</h4>
    <Row>
      <Col>Price : </Col>   <Col>$ {oneProduct?.price}</Col>
    </Row>
    <Row>
      <Col>Category : </Col>   <Col>{oneProduct?.category?.name}</Col>
    </Row>
    <Row>
      <Col>Bill Available : </Col>   <Col>{oneProduct?.billAvailable ? "Yes" : "No"}</Col>
    </Row>
    <Row>
      <Col>Box Available : </Col>   <Col>{oneProduct?.boxAvailable ? "Yes" : "No"}</Col>
    </Row>
    <Row>
      <Col>Accessories Available : </Col>   <Col>{oneProduct?.accessoriesAvailable ? "Yes" : "No"}</Col>
    </Row>
    <Row>
      <Col>Warranty Available : </Col>   <Col>{oneProduct?.warrantyAvailable ? "Yes" : "No"}</Col>
    </Row>
    <Row>
      <Col>Purchased Year : </Col>   <Col>  {moment().subtract(oneProduct?.age , 'years').format("YYYY")} ({oneProduct?.age} years ago)</Col>
    </Row>
    
    <Row>
      <Col>Added on : </Col>   <Col>  {moment().subtract(oneProduct?.age).format("DD-MM-YYYY")}</Col>
    </Row>
    
  </ListGroup.Item>
  <ListGroup.Item>
  <h4 className='text-danger fw-bold '>Seller Details</h4>
  <Row>
      <Col>Name : </Col>   <Col>{oneProduct?.seller?.name}</Col>
    </Row>
  <Row>
      <Col>Email : </Col>   <Col>{oneProduct?.seller?.email}</Col>
    </Row>
  </ListGroup.Item>
  <ListGroup.Item>
  <Row>
      <Col><h4 className='text-danger fw-bold '>Bids</h4></Col>   
      <Col>
    <Button type="button" variant="outline-secondary">New Bid</Button>
      </Col>
    </Row>
  </ListGroup.Item>
</ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductDetails