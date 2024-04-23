import { Alert, Col, Row, Table } from "react-bootstrap"
import { useDeleteBidMutation, useGetBuyerBidsQuery } from "../../redux/slices/bidApiSlice";
import Loader from "../Loader";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Bids = () => {
  const navigate = useNavigate();
  const {data : buyerBids, isLoading ,refetch ,error} = useGetBuyerBidsQuery();
  const [deleteBid] = useDeleteBidMutation();

  const deleteBidHandle = async(bidId) => {
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
          const res = await deleteBid(bidId).unwrap();
          if (res === "bid deleted successfully") {
            toast.success(res);
            refetch();
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
<Col>
<Table striped bordered responsive className='strabed'>
  <thead>
    <tr>
      <th>SN</th>
      <th>Product</th>
      <th>Bid Date</th>
      <th>Seller</th>
      <th>offered Price</th>
      <th>bid amount</th>
      <th>message</th>
      <th>contact details</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
{
  
isLoading ?<Loader/> : error ? <Alert>{error?.data?.message}</Alert> :
buyerBids?.map((bid , index) => 
  <tr key={bid?._id}>
      <td>{index + 1}</td>
      <td style={{cursor : "pointer"}} className="text-primary"
       onClick={() => navigate(`/products/${bid?.product?._id}`)}>
      {bid?.product?.name}</td>
      <td>{bid?.createdAt.substring(0 , 10)}</td>
      <td>{bid?.seller?.name}</td>
      <td>{bid?.product?.price}</td>
      <td>{bid?.bidAmount}</td>
      <td>{bid?.message}</td>
      <td>
      {/* <Row>
        <Col>{bid?.mobile}</Col>
      </Row>
      <Row>
        <Col>{bid?.buyer.email}</Col>
      </Row> */}
      <p>{bid?.mobile}</p>
      <p>{bid?.buyer?.email}</p>

      </td>

      <td>
      <i onClick={() => deleteBidHandle(bid?._id)} className="bi bi-trash3-fill text-danger fs-5" style={{cursor : "pointer"}}></i> 
    
       {/* {" "} - {" "} <i className="bi bi-pencil-fill text-primary fs-5" style={{cursor : "pointer"}}
       onClick={() => showEditProduct(product._id)}></i> */}
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

export default Bids;