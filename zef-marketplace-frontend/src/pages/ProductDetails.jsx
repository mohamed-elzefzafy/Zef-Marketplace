import React, { useState } from 'react'
import { useGetOneProductQuery } from '../redux/slices/productsApiSlice'
import { useParams } from 'react-router-dom';
import { Alert, Button, Card, Col, Form, FormGroup, Image, ListGroup, ListGroupItem, Modal, Row, Spinner } from 'react-bootstrap';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import Loader from './../components/Loader';
import { useAddBidMutation, useGetProductBidsQuery } from '../redux/slices/bidApiSlice';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const {id} = useParams();
  const {userInfo} = useSelector(state => state.auth)
  const [imageIndex, setImageIndex] = useState(0)
  const {data : oneProduct , isLoading , error} = useGetOneProductQuery(id);
  const [showAddBidModel, setShowAddBidModel] = useState(false);
  const [validated, setValidated] = useState(false);
  

const {data : productBids  , refetch , isLoading : bidsLoading , error : bidsError} = useGetProductBidsQuery(id);
const [addBid ] = useAddBidMutation();
  const onCloseModel = () => {
    setShowAddBidModel(false);
  }
  const onShowModel = () => {
    setShowAddBidModel(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget.elements;

    const bidAmount = form.bidAmount.value;
    const message = form.message.value;
    const mobile = form.mobile.value;
    if (e.currentTarget.checkValidity() === true && bidAmount ) {
      try {
        const res = await addBid({bidAmount , message , mobile , id}).unwrap();
        if (res?.message === "bid added successfully") {
          refetch();
  toast.success(res?.message);
    onCloseModel();
        }
      } catch (error) {
        toast.error(error?.data?.message);
      }

    }

    setValidated(true);

  };

  return (
    <>
  {isLoading ?<Loader/> : error ? <Alert variant="danger">{error?.data?.message}</Alert> 
  : 
  <Row>
        <Col md={5}>
<Row>
<Image src={oneProduct?.images[imageIndex]?.url} fluid/>
</Row>
{ oneProduct?.images?.length > 1 &&
  <Row className='mt-5 d-flex  flex-md-row text-center '>
  {oneProduct?.images?.map((image , index) => 
  <Col key={image?.public_id} xs={12 / oneProduct?.images?.length} md={12 / oneProduct?.images?.length } >
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
      <Col>Added on : </Col>   <Col>  {moment(oneProduct?.createdAt).format("DD-MM-YYYY")}</Col>
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
      {userInfo?.email !== oneProduct?.seller?.email &&  
        <Button type="button" variant="danger" onClick={onShowModel}>New Bid</Button>
      }

      </Col>
    </Row>
    <br />
{bidsLoading ? <Loader width='100' height='100'/> : bidsError ? <Alert variant='danger'>{bidsError?.data?.message}</Alert>
:  
productBids?.map(bid => 
<Card style={{fontSize : 16}} className='my-3'>
<ListGroup>
        <ListGroup.Item>
        <Row>
      <Col>  Name</Col>   <Col> {bid?.buyer.name}</Col>
    </Row>
        <Row>
      <Col>  Bid Amount</Col>   <Col>$ {bid?.bidAmount}</Col>
    </Row>
    <Row>
      <Col> Placed on</Col>   <Col> {(bid?.createdAt).substring(0,10)}</Col>
    </Row>
        <Row>
        <Row>
        <Col> <strong>Message : </strong> </Col>   <Col></Col>
        </Row>
        <Row>
          <Col>{bid.message}</Col>
        </Row>
  
    </Row>

    
        </ListGroup.Item>


      
      </ListGroup>
</Card>
)}
    

  </ListGroup.Item>
</ListGroup>
        </Col>
      </Row>}

      <Modal show={showAddBidModel}  className=''>
        <Modal.Header className='mx-auto'>
          <h4 className='text-danger '>New Bid</h4>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='d-flex flex-column  gap-3 '>
            <FormGroup>
              <Form.Label>Bid A mount</Form.Label>
              <Form.Control
                type="number"
                required
                name="bidAmount"
              />
                  <Form.Control.Feedback type="invalid">
                Please enter the offer amount
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                name="message"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
              />
            </FormGroup>
            <div className='mt-2 d-flex  gap-3 justify-content-end p-3'>
        <Button variant='outline-danger' onClick={onCloseModel}>Cancel</Button>
          <Button type="submit"  variant='outline-danger'>Ok</Button>
        
        </div>
          </Form>
        </Modal.Body>
      </Modal>
    </> 
  )
}

export default ProductDetails