import { useAdminDeleteUserMutation, useAdminGetAllUsersQuery, useAdminToggleUpdateUserStatusMutation } from "../../redux/slices/userApiSlice";
import Loader from "../Loader"
import { Row, Col, Button, Table , Alert , Image} from 'react-bootstrap';


const AdminUsers = () => {

  const {data : users , refetch , isLoading , error} = useAdminGetAllUsersQuery();
  const [adminToggleUpdateUserStatus] = useAdminToggleUpdateUserStatusMutation();
  const [adminDeleteUser] = useAdminDeleteUserMutation();


  const handleToggleUpdateUserStatus = async(id) => {
    try {
      await adminToggleUpdateUserStatus(id);
      refetch();
    } catch (error) {
      
    }
  };

  const handleDeleteUser = async(id) => {
    try {
      await adminDeleteUser(id);
      refetch();
    } catch (error) {
      
    }
  };
  return (
    <>
    <Row className='mt-2'>
<Col>
<Table striped bordered responsive className='strabed'>
  <thead>
    <tr>
      <th>SN</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Created At</th>
      <th>Status</th>
      <th>Block - Delete</th>
    </tr>
  </thead>
  <tbody>
{
  
isLoading ?<Loader/> : error ? <Alert>{error?.data?.message}</Alert> :
users?.map((user , index) => 
  <tr key={user?._id}>
      <td>{index + 1}</td>
      <td>{user?.name} {" "}<Image src={user?.profilePhoto?.url} fluid width={30} height={30}/> </td>
      <td>{user?.email}</td>
      <td>{user?.role}</td>
      <td>{user?.createdAt.substring(0 , 10)}</td>
      <td>{user?.status}</td>
      <td>
      <i className="bi bi-ban text-primary" style={{cursor : "pointer"}} onClick={() => handleToggleUpdateUserStatus(user?._id)}></i>
      {" "} {" - "} {" "}
      <i className="bi bi-trash-fill text-danger fs-5" style={{cursor : "pointer"}} onClick={() => handleDeleteUser(user?._id)}></i>
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

export default AdminUsers