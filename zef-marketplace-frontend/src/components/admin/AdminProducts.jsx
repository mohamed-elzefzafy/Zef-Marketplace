import  { useState } from 'react'
import { Alert, Button, Col, Image, Row, Table } from 'react-bootstrap'
import { useAdminUpdateProductStatusMutation, useDeleteProductMutation, useGetAllProductsByAdminQuery, useGetAllProductsQuery } from '../../redux/slices/productsApiSlice';
import Loader from '../Loader';
import toast from 'react-hot-toast';
import swal from 'sweetalert';

const AdminProducts = () => {
  const [showProductForm, setshowProductForm] = useState(false);
  const [showEditProductForm, setshowEditProductForm] = useState(false);
  const [productId, setProductId] = useState(null)
  const {data : products , refetch : refetchAllProducts ,  isLoading ,error} = useGetAllProductsByAdminQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const showEditProduct = (id) => {
    setProductId(id)
  setshowEditProductForm(true);
  
  }

  const [adminUpdateProductStatus] = useAdminUpdateProductStatusMutation();
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
      const res = await deleteProduct(productId).unwrap();
      if (res === "product deleted successfully") {
        toast.success("product deleted successfully");
        refetchAllProducts();
      }
      }
  });




} catch (error) {
  // toast.error()
  console.log(error);
}
    }

    const updateProductStatus = async (id) => {
try {
  await adminUpdateProductStatus(id).unwrap();
  refetchAllProducts();
} catch (error) {
  console.log(error);
}
    }

  return (
  <>
    <Row className='mt-2'>
<Col className='d-flex justify-content-md-end'>
  <Button type="button" style={{backgroundColor : "#250d46" , borderColor : "#250d46"}}
   onClick={() => setshowProductForm(true)}>Add Product</Button>
</Col>
    </Row>
    <Row className='mt-2'>
<Col>
<Table striped bordered responsive className='strabed'>
  <thead>
    <tr>
      <th>SN</th>
      <th>Product Name</th>
      <th>Seller</th>
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
      <td>{product?.name} {" "}<Image src={product?.images[0]?.url} fluid width={30} height={30}/> </td>
      <td>{product?.seller?.name}</td>
      <td>$ {product?.price}</td>
      <td>{product?.category?.name}</td>
      <td>{product?.age}</td>
      <td>{product?.status}</td>
      <td>{product?.createdAt?.substring(0,10)}</td>
      <td>
      {product?.status === "pending" ? <Button size='sm' onClick={() => updateProductStatus(product?._id)}>Approve</Button> : 
      <Button onClick={() => updateProductStatus(product?._id)} variant="warning" size='sm'>Block</Button>  }
      {" "} - {" "}
      <i onClick={() => deleteProductHandle(product?._id)} className="bi bi-trash3-fill text-danger fs-5" style={{cursor : "pointer"}}></i>

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

export default AdminProducts;