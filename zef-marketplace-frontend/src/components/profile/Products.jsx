import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Image, Row, Table } from 'react-bootstrap'
import { useDeleteProductBySellerMutation, useGetAllProductsLoggedSellerQuery } from '../../redux/slices/productsApiSlice';
import Loader from '../Loader';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [showProductForm, setshowProductForm] = useState(false);
  const [showEditProductForm, setshowEditProductForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const {data : products , refetch : refetchAllProducts ,  isLoading ,error} = useGetAllProductsLoggedSellerQuery();
  const [deleteProductBySeller] = useDeleteProductBySellerMutation();

  const showEditProduct = (id) => {
    setProductId(id)
  setshowEditProductForm(true);
  
  }

  const deleteProductHandle = async(productId) => {
try {

  swal({
    title: "Are you sure you want delete this product?",
    // text: "if you delete this products",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then(async(willDelete) => {
    if (willDelete) {
      const res = await deleteProductBySeller(productId).unwrap();
      if (res === "product deleted successfully") {
        toast.success("product deleted successfully");
        refetchAllProducts();
      }
      }
  });




} catch (error) {
  // toast.error()
}
    }

  return (
  <>
    <Row className='mt-2'>
<Col className='d-flex justify-content-md-end'>
  <Button type="button" style={{backgroundColor : "#250d46" , borderColor : "#250d46"}}
   onClick={() => setshowProductForm(true)}>Add Product</Button>
   <AddProductModal refetchAllProducts={refetchAllProducts} showProductForm={showProductForm} setshowProductForm={setshowProductForm}/>
   <EditProductModal refetchAllProducts={refetchAllProducts} showEditProductForm={showEditProductForm}
       setshowEditProductForm={setshowEditProductForm} productId={productId} />
</Col>
    </Row>
    <Row className='mt-2'>
<Col>
<Table striped bordered responsive className='strabed'>
  <thead>
    <tr>
      <th>SN</th>
      <th>Name</th>
      <th>Description</th>
      <th>Price</th>
      <th>Category</th>
      <th>Age</th>
      <th>Status</th>
      <th>added at</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
{
  
isLoading ?<Loader/> : error ? <Alert>{error?.data?.message}</Alert> :
products?.map((product , index) => 
  <tr key={product?._id}>
      <td>{index + 1}</td>
      <td onClick={() => navigate(`/products/${product?._id}`)} style={{cursor : "pointer"}}>
      {product?.name} {" "}<Image src={product?.images[0]?.url} fluid width={30} height={30}/> </td>
      <td>{product?.description}</td>
      <td>$ {product?.price}</td>
      <td>{product?.category?.name}</td>
      <td>{product?.age}</td>
      <td>{product?.status}</td>
      <td>{product?.createdAt?.substring(0,10)}</td>
      <td>
      <i onClick={() => deleteProductHandle(product?._id)} className="bi bi-trash3-fill text-danger fs-5" style={{cursor : "pointer"}}></i> {" "} - {" "}
    
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