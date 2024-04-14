import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import Loader from '../Loader';
import toast from 'react-hot-toast';
import { useDeleteProductMutation, useGetOneProductQuery, useUpdateProductMutation } from '../../redux/slices/productsApiSlice';
import request from './../../utils/request';
import { useGetCategoriesQuery } from '../../redux/slices/categoryApiSlice';

const EditProductModal = ({refetchAllProducts ,showEditProductForm , setshowEditProductForm , productId }) => {
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);

  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const {data : categories} = useGetCategoriesQuery();
  const [updateProduct , {isLoading , error}] = useUpdateProductMutation();
const {data : oneProduct , refetch : refetchOneProduct} = useGetOneProductQuery(productId);
const [deleteProduct] = useDeleteProductMutation();

const [currentimages, setCurrentImages] = useState(oneProduct?.images);

const [name, setName] = useState(oneProduct?.name);
const [description, setDescription] = useState(oneProduct?.description);
const [price, setPrice] = useState(oneProduct?.price);
const [category, setCategory] = useState(oneProduct?.category);
const [age, setAge] = useState(oneProduct?.age);
const [billAvailable, setBillAvailable] = useState(oneProduct?.billAvailable);
const [warrantyAvailable, setWarrantyAvailable] = useState(oneProduct?.warrantyAvailable);
const [accessoriesAvailable, setAccessoriesAvailable] = useState(oneProduct?.accessoriesAvailable);
const [boxAvailable, setBoxAvailable] = useState(oneProduct?.boxAvailable);

const [ProdId, setProdId] = useState(oneProduct?._id)
useEffect(()=>{
  setName(oneProduct?.name);
  setDescription(oneProduct?.description);
  setPrice(oneProduct?.price);
  setCategory(oneProduct?.category);
  setAge(oneProduct?.age);
  setBillAvailable(oneProduct?.billAvailable);
  setWarrantyAvailable(oneProduct?.warrantyAvailable);
  setAccessoriesAvailable(oneProduct?.accessoriesAvailable);
  setBoxAvailable(oneProduct?.boxAvailable);
  setCurrentImages(oneProduct?.images);
  setProdId(oneProduct?._id)
},[productId , oneProduct])


// useEffect(() => {
//   refetchOneProduct();
// },[productId , showEditProductForm , oneProduct])

  const deleteImage = (index) => {
setImages(images => images.filter((image) => image !== images[index]));
  }

//   const deleteCurrentImage = (currentImage) => {
//     setCurrentImages(oneProduct.images?.filter(image => image?.public_id !== currentImage.public_id))
//     refetchOneProduct();
//  }

  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      return setImageErrorMessage("images number must be three or less");
    }
    setImages(Array.from(e.target.files));
  };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     e.stopPropagation();


//     const form = e.currentTarget.elements;

//     const name = form.name.value;
//     const description = form.description.value;
//     const price = form.price.value;
//     const category = form.category.value;
//     const age = form.age.value;
//     const billAvailable = form.billAvailable.checked;
//     const warrantyAvailable = form.warrantyAvailable.checked;
//     const accessoriesAvailable = form.accessoriesAvailable.checked;
//     const boxAvailable = form.boxAvailable.checked;

// console.log(name , description ,  price , category , age , 
//   billAvailable , warrantyAvailable , accessoriesAvailable , boxAvailable);


//     if (
//       e.currentTarget.checkValidity() === true  ) {
//         console.log("from f");
//       const formData = new FormData();
//       formData.append("name" , name);
//       formData.append("description" , description);
//       formData.append("price" , price);
//       formData.append("category" , category);
//       formData.append("age" , age);
//       formData.append("billAvailable" , billAvailable);
//       formData.append("warrantyAvailable" , warrantyAvailable);
//       formData.append("accessoriesAvailable" , accessoriesAvailable);
//       formData.append("boxAvailable" , boxAvailable);
//       for (let i = 0; i < images.length; i++) {
//         formData.append("images", images[i]);
//       }
  
//       try {
//  const res = await updateProduct(formData).unwrap();
//  console.log(res);
//  if (res.status ===  "success") {
//   toast.success("product updated successfully");
//   setshowEditProductForm(false);
//  }
//       } catch (error) {
//         toast.error(error?.data?.message)
//       }
//     }

//     setValidated(true);
//   };


const handleSubmit = async(e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name" , name);
  formData.append("description" , description);
  formData.append("price" , price);
  formData.append("category" , category);
  formData.append("age" , age);
  formData.append("billAvailable" , billAvailable);
  formData.append("warrantyAvailable" , warrantyAvailable);
  formData.append("accessoriesAvailable" , accessoriesAvailable);
  formData.append("boxAvailable" , boxAvailable);
  if (images.length > 0 ) {
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

  } 
  // else if(currentimages?.length < oneProduct?.images?.length) {
  //   for (let i = 0; i < currentimages.length; i++) {
  //     formData.append("images", currentimages[i]);
  //   }
  // }
// const props = {
//   formData,
//   productId

// }
  try {
  // const res =  await updateProduct({productId, formData}).unwrap();
  const res = await request.put(`/api/v1/products/update-product/${productId}` , formData);
 refetchAllProducts();
  console.log(res);
  if (res?.data?.status === "success") {
    toast.success("product updated successfully");
    setshowEditProductForm(false);
   }
  console.log(productId);
  } catch (error) {
    console.log(error);
  }
console.log(name , description , price , age , billAvailable , warrantyAvailable , accessoriesAvailable , boxAvailable);

}


const deleteProductOneImageHandler = async (productId , publicId) => {
  try {
    await request.put(`/api/v1/products/removeimage/${productId}` , {publicId});
    refetchOneProduct();
  } catch (error) {
    console.log(error);
  }
  };


  return (
    <Modal
    style={{padding : "50px"}}
      show={showEditProductForm}
      className="p-5 fs-xs-7 fs-md-5 fw-md-bold text-primary"
      size="xl"
    >
      <Modal.Header className="p-3 d-flex justify-content-between">
        <Modal.Title>
          {" "}
          <div className="fs-3">Update product</div>{" "}
        </Modal.Title>
      <i className="bi bi-x-circle text-danger fs-3" style={{cursor : "pointer"}} onClick={()=>setshowEditProductForm(false)}></i>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  defaultValue={oneProduct?._id === productId ? name : null}
                  onChange={(e)=> setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter product name
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  as="textarea"
                  rows={3}
                  style={{ resize: "none" }}
                  defaultValue={oneProduct?._id === productId ? description : null}
                  onChange={(e)=> setDescription(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter product description
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  defaultValue={oneProduct?._id === productId ? price : null}
                  onChange={(e)=> setPrice(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please the Price
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product age"
                  name="age"
                  defaultValue={oneProduct?._id === productId ? age : null}
                  onChange={(e)=> setAge(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the age
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4}>
              <p>Category</p>
              <Form.Select 
              name="category"
              value={oneProduct?._id === productId ? category : null}
              onChange={(e)=> setCategory(e.target.value)}
               style={{ marginTop: -6 }}>
                <option value="">Select</option> 
                {categories?.map(category => 
                       <option value={category?._id}>{category.name}</option> )
                       }
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>

            {images?.length > 0 ? (
        <div  className="d-flex flex-row">
          {images?.map((image, index) => (
        <div key={index} className="position-relative " style={{width : "fit-content"}}>
              <i 
              onClick={() => deleteImage(index)} 
              className="bi bi-x fs-2 text-danger position-absolute" style={{top : -8 , right : -2 , cursor : "pointer"}}></i>
              <Image
                key={index}
                src={URL.createObjectURL(image)}
                fluid
                width="100px"
                height="100px"
              />
        </div>
          ))}
        </div>
      ) :
      (
        (
        <div  className="d-flex flex-row">
          {currentimages?.map((image, index) => (
        <div key={index} className="position-relative " style={{width : "fit-content"}}>
            <i  onClick={() => deleteProductOneImageHandler(oneProduct?._id , image?.public_id)}
              className="bi bi-x fs-2 text-danger position-absolute" style={{top : -8 , right : -2 , cursor : "pointer"}}></i> 
              <Image
                key={index}
                src={image?.url}
                fluid
                width="100px"
                height="100px"
              />
        </div>
          ))}
        </div>
      )
      )
      
      }

      <Form.Group>
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          className="my-2"
          name="images"
          multiple
          onChange={handleImageChange}
        />
      </Form.Group>
    
{ imageErrorMessage !== "" &&  <Alert variant="danger">{imageErrorMessage}</Alert>}
            </Col>
          </Row>

          <Row className="my-3">
            <Col md={6}>
              <Form.Check
                type="checkbox"
                id={`billAvailable`}
                label={`billAvailable`}
                name="billAvailable"
                defaultChecked={oneProduct?._id === productId ? billAvailable : null}
                onChange={(e)=> setBillAvailable(e.target.checked)}
              />
            </Col>
            <Col md={6}>
            <Form.Check
                type="checkbox"
                id={`Warranty Availaible`}
                label={`Warranty Availaible`}
                name="warrantyAvailable"
                defaultChecked={oneProduct?._id === productId ? warrantyAvailable : null}
                onChange={(e)=> setWarrantyAvailable(e.target.checked)}
              />
            </Col>
            </Row>
            <Row className="my-3">
            <Col md={6}>
            <Form.Check
                type="checkbox"
                id={`Box Availaible`}
                label={`Box Availaible`}
                name="boxAvailable"
                defaultChecked={oneProduct?._id === productId ? boxAvailable : null}
                onChange={(e)=> setBoxAvailable(e.target.checked)}
              />
            </Col>
            <Col md={6}>
            <Form.Check
                type="checkbox"
                id={`accessories Availaible`}
                label={`accessories Availaible`}
                name="accessoriesAvailable"
                defaultChecked={oneProduct?._id === productId ? accessoriesAvailable : null}
                onChange={(e)=> setAccessoriesAvailable(e.target.checked)}
              />
            </Col>
          </Row>
      
    <Modal.Footer>
    <Row className="d-flex justify-content-between w-100">
    <Col md={6}>
    {/* <h6>ssss</h6> */}
{isLoading ? (<Loader height="50px" width="50px"/>) : error ? <Alert>{error.message}</Alert> : null}
    </Col>
            <Col md={6} className="d-flex justify-content-end gap-2">
<Button onClick={() => setshowEditProductForm(false)}>Cancel</Button>
<Button type="submit">save</Button>
            </Col>
          </Row>
    </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditProductModal