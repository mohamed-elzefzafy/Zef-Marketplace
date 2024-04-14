import { Button, Card } from 'react-bootstrap'
import PaginationComponent from '../../utils/PaginationComponent'
import { Link } from 'react-router-dom'

const HomeProducts = ({products , pages , page}) => {
  return (
<>
<div className='d-flex gap-3 mb-5 flex-wrap justify-content-center justify-content-md-start'>
{products?.map((product) =>
  <Card key={product?._id} className="p-4 mb-3">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product?.images[0]?.url} variant="top" width="200px" height="200px" style={{objectFit : "contain"}}/>
      </Link>
      <Card.Body>
      <Link to={`/products/${product?._id}`}>
      <Card.Title as="div" className="product-title">
      <strong>{product?.name}</strong>
      </Card.Title>
      </Link>

<Card.Text as="div"  className="mt-3 d-flex justify-content-between">
<Card.Text as="h5" className="mt-3">
         ${product?.price}
      </Card.Text>
      <Card.Text as="h6" className="mt-3">
         {product?.category?.name}
      </Card.Text>
</Card.Text>

      </Card.Body>
    </Card>
)}
    </div>
  {pages > 1 &&   <PaginationComponent pages={pages} page={page}/>}
</>
  )
}

export default HomeProducts