import { Tab, Tabs } from "react-bootstrap"
import AdminProducts from "../components/admin/AdminProducts"
import AdminUsers from "../components/admin/AdminUsers"


const Admin = () => {
  return (
<Tabs
    defaultActiveKey="Products"
    id="uncontrolled-tab-example"
    className="mb-3 fw-bold fs-5"
  >
    <Tab eventKey="Products" title="Products" className="mb-3 fw-semibold">
    <AdminProducts/>
    </Tab>
    <Tab eventKey="Users" title="Users" className="mb-3 fw-semibold">
    <AdminUsers/>
    </Tab>
  </Tabs>
  )
}

export default Admin