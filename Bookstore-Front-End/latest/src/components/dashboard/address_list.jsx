import { Button, Card, Col, Row } from "react-bootstrap";
import { address } from "../../data/products";
import { MdAddCircle, MdPhone } from "react-icons/md";
import { Link, useLocation } from "react-router";
import { readAddresses } from "../../data/address_storage";

export default function AddressList() {
  const location = useLocation();
  let savedAddresses = [];
  let storageError = false;
  // 储存不可用时仍显示原有地址，并提供明确提示。
  try { savedAddresses = readAddresses(); } catch { storageError = true; }
  const address_bill = [...address, ...savedAddresses];
  return (
    <>
      <div className="address_list">
        <div className="title">
          <h3>Address Book</h3>
          {location.state?.addressSaved && <p role="status" className="text-success">Address saved in this browser.</p>}
          {storageError && <p role="alert">Saved addresses could not be loaded from this browser.</p>}
          <div className="content ">
            <Row>
              <Col className="mb-3" md={8}>
                <span>
                  Manage your shipping and billing addresses for a seamless
                  checkout experience.
                </span>
              </Col>
              <Col md={4}>
                <Button as={Link} to="/address/new">+ Add New Address</Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="listing">
          <Row>
            {address_bill.map((item, index) => (
                <Col className="my-3" md={6} key={item.id || index}>
                  <Card>
                    <div className="type_address">
                      <h3>{item.type}</h3>
                      {item.isDefault && <small>Default shipping address</small>}
                    </div>
                    <div className="name">
                      <span>{item.Name}</span>
                    </div>
                    <div className="address">
                      <span>{item.Address}</span>
                      {item.unit && <span>{item.unit}</span>}
                      <span>
                        {item.postcode}, {item.city}, {item.state}
                      </span>
                      <span>{item.country}</span>
                    </div>
                    <div className="phone_number">
                      <span>
                        <MdPhone /> {item.phone_number}
                      </span>
                    </div>
                    <div className="button_group">
                      <Button className="edit">Edit</Button>
                      <Button className="delete">Delete</Button>
                    </div>
                  </Card>
                </Col>
            ))}
            <Col md={6}>
              <Card as={Link} to="/address/new" className="new_address" style={{ textDecoration: "none", color: "inherit" }}>
                  <MdAddCircle className="icon" />
                  <h3>Add New Address</h3>
                  <span>Click here to add another shipping or billing location to your account.</span>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
