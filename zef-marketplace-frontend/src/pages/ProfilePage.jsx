import { Tab, Tabs } from "react-bootstrap"
import Products from "../components/profile/Products"


const ProfilePage = () => {
  return (
<section className="mt-5">
<Tabs
    defaultActiveKey="Products"
    id="uncontrolled-tab-example"
    className="mb-3 fw-bold fs-5"
  >
    <Tab eventKey="Products" title="Products" className="mb-3 fw-semibold">
    <Products/>
    </Tab>
    <Tab eventKey="Bids" title="Bids" className="mb-3 fw-semibold">
      Tab content for Profile
    </Tab>
    <Tab eventKey="General" title="General" className="mb-3 fw-semibold">
    </Tab>
  </Tabs>
</section>
  )
}

export default ProfilePage