import { Row  , Col , Form} from 'react-bootstrap';
import Filters from '../components/home/Filters';
import HomeProducts from '../components/home/HomeProducts';
import { useGetCategoriesQuery } from '../redux/slices/categoryApiSlice';
import { useEffect, useState } from 'react';
import request from './../utils/request';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductWithFiltersMutation } from '../redux/slices/productsApiSlice';




const Homepage = () => {
  const {data : categories} = useGetCategoriesQuery();
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [ageFilter, setAgeFilter] = useState([]);
  const [keyWordSearch, setKeyWordSearch] = useState("");

  const [getProductWithFilters] = useGetProductWithFiltersMutation();
const {page} = useParams();


  
  useEffect(() => {
    ((
      async() => {
  try {
    const {data} = await getProductWithFilters({
      category : categoryFilter ,
     keyWord : keyWordSearch,
    age : ageFilter, 
    status : "approved",
    page 
    })
    setProducts(data);
  } catch (error) {
  }
      }
    )())
  },[page, categoryFilter, keyWordSearch, ageFilter, getProductWithFilters]);

  


  const onCategoryFilter = (categoryId) => {
    if (categoryFilter?.includes(categoryId)) {
setCategoryFilter(prev => prev.filter(c => c !== categoryId))
    }else {
      setCategoryFilter(prev => [...prev , categoryId]);
    }
  }


  const onAgeFilter = (age) => {
    if (ageFilter?.includes(age)) {
   setAgeFilter(prev => prev.filter(a => a !== age))
    }else {
      setAgeFilter(prev => [...prev , age]);
    }
  }


  const onSearcheProduct = (e) => {
setKeyWordSearch(e.target.value);
  }

  const onResetFilters = () => {
setCategoryFilter([]);
setAgeFilter([]);
setKeyWordSearch("");

  }
  return (
    <Row>
<Col md={2}>
<Filters categories={categories} categoryFilter={categoryFilter}
 onCategoryFilter={onCategoryFilter} ageFilter={ageFilter} onAgeFilter={onAgeFilter}
 onResetFilters={onResetFilters}/>


</Col>

<Col md={10}>
<Row className='mb-5'>
  <Form.Group>
    <Form.Control
    className='p-3'
      placeholder='Search products'
      onChange={onSearcheProduct}
      value={keyWordSearch}
    />
  </Form.Group>
</Row>

<Row>
<HomeProducts products={products?.products} pages={products?.pages} page={products?.page}/>


</Row>

</Col>
    </Row>
  )
}

export default Homepage;