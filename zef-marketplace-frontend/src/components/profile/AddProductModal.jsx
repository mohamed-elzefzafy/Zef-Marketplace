import { useState } from "react";
import { Alert, Button, Col, Form , FormGroup, Image, Modal, Row } from "react-bootstrap";
import { useAddProductMutation, useGetAllProductsQuery } from "../../redux/slices/productsApiSlice";
import Loader from '../Loader';
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "../../redux/slices/categoryApiSlice";

const AddProductModal = ({refetchAllProducts , showProductForm, setshowProductForm }) => {
const {data : categories} = useGetCategoriesQuery();

  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [imageErrorMessage, setImageErrorMessage] = useState("");

const [addProduct , {isLoading , error}] = useAddProductMutation();

  const deleteImage = (index) => {
setImages(images => images.filter((image) => image !== images[index]));
  }
  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      return setImageErrorMessage("images number must be three or less");
    }
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    e.stopPropagation();


    const form = e.currentTarget.elements;

    const name = form.name.value;
    const description = form.description.value;
    const price = form.price.value;
    const category = form.category.value;
    const age = form.age.value;
    const billAvailable = form.billAvailable.checked;
    const warrantyAvailable = form.warrantyAvailable.checked;
    const accessoriesAvailable = form.accessoriesAvailable.checked;
    const boxAvailable = form.boxAvailable.checked;

    if (
      e.currentTarget.checkValidity() === true &&
      name && description &&  price && category && age ) {
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
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
  
      try {
 const res = await addProduct(formData).unwrap();
 if (res.status ===  "success") {
  toast.success("product created successfully");
  refetchAllProducts();
  setshowProductForm(false);
 }
      } catch (error) {
        toast.error(error?.data?.message)
      }
    }

    setValidated(true);
  };

  return (
    <Modal
    style={{padding : "50px"}}
      show={showProductForm}
      className="p-5 fs-xs-7 fs-md-5 fw-md-bold text-primary"
      size="xl"
    >
      <Modal.Header className="p-3 d-flex justify-content-between">
        <Modal.Title>
          {" "}
          <div className="fs-3">Add product</div>{" "}
        </Modal.Title>
      <i className="bi bi-x-circle text-danger fs-3" style={{cursor : "pointer"}} onClick={()=>setshowProductForm(false)}></i>
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
                  required
                  minLength={2}
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
                  required
                  as="textarea"
                  rows={3}
                  minLength={2}
                  style={{ resize: "none" }}
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
                  required
                  minLength={2}
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
                  required
                  minLength={2}
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

            {images?.length > 0 && (
        <div  className="d-flex flex-row">
          {images?.map((image, index) => (
        <div key={index} className="position-relative " style={{width : "fit-content"}}>
              <i onClick={() => deleteImage(index)} 
              className="bi bi-x fs-2 text-danger position-absolute" style={{top : -8 , right : -2}}></i>
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
      )}

      <FormGroup>
        <Form.Label>Images</Form.Label>
        <Form.Control
          type="file"
          className="my-2"
          name="images"
          multiple
          onChange={handleImageChange}
        />
      </FormGroup>
    
{ imageErrorMessage !== "" &&  <Alert variant="danger">{imageErrorMessage}</Alert>}
            </Col>
          </Row>

          <Row className="my-3">
            <Col md={6}>
              <Form.Check
                type="checkbox"
                id={`Bil Availaible`}
                label={`Bil Availaible`}
                name="billAvailable"
                defaultChecked={false}
              />
            </Col>
            <Col md={6}>
            <Form.Check
                type="checkbox"
                id={`Warranty Availaible`}
                label={`Warranty Availaible`}
                name="warrantyAvailable"
                defaultChecked={false}
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
                defaultChecked={false}
              />
            </Col>
            <Col md={6}>
            <Form.Check
                type="checkbox"
                id={`accessories Availaible`}
                label={`accessories Availaible`}
                name="accessoriesAvailable"
                defaultChecked={false}
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
<Button onClick={() => setshowProductForm(false)}>Cancel</Button>
<Button type="submit">save</Button>
            </Col>
          </Row>
    </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
