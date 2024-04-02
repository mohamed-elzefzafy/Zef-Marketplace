import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Row, Table } from 'react-bootstrap'
import { useGetAllProductsQuery } from '../../redux/slices/productsApiSlice';
import Loader from '../Loader';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const Products = () => {
  const [showProductForm, setshowProductForm] = useState(false);
  const [showEditProductForm, setshowEditProductForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const {data : products ,  isLoading ,error} = useGetAllProductsQuery();


  const showEditProduct = (id) => {
    setProductId(id)
  setshowEditProductForm(true);
  
  }



  return (
  <>
    <Row className='mt-2'>
<Col className='d-flex justify-content-md-end'>
  <Button type="button" style={{backgroundColor : "#250d46" , borderColor : "#250d46"}}
   onClick={() => setshowProductForm(true)}>Add Product</Button>
   <AddProductModal showProductForm={showProductForm} setshowProductForm={setshowProductForm}/>
</Col>
    </Row>
    <Row className='mt-2'>
<Col>
<Table striped bordered responsive className='strabed'>
  <thead>
    <tr>
      <th>SN</th>
      <th>Name</th>
      <th>Price</th>
      <th>Description</th>
      <th>Age</th>
      <th>Category</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
{
  
isLoading ?<Loader/> : error ? <Alert>{error?.data?.message}</Alert> :
products?.map((product , index) => 
  <tr key={product?._id}>
      <td>{index + 1}</td>
      <td>{product?.name}</td>
      <td>$ {product?.price}</td>
      <td>{product?.description}</td>
      <td>{product?.age}</td>
      <td>{product?.category}</td>
      <td>{product?.status}</td>
      <td>
      <i className="bi bi-trash3-fill text-danger fs-5" style={{cursor : "pointer"}}></i> {" "} - {" "}
      <EditProductModal showEditProductForm={showEditProductForm}
       setshowEditProductForm={setshowEditProductForm} productId={productId} />
       <i className="bi bi-pencil-fill text-primary fs-5" style={{cursor : "pointer"}}
       onClick={() => showEditProduct(product._id)}></i>
      </td>
    </tr>
)
}
  </tbody>
</Table>
</Col>
    </Row>
  </>
  )
}

export default Products