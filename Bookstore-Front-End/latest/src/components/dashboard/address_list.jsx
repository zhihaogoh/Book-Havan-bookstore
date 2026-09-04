import { Button, Card, Col, Row } from "react-bootstrap";
import { address } from "../../data/products";
import { MdAddCircle, MdPhone } from "react-icons/md";

export default function AddressList() {
  const address_bill = address;
  console.log(address_bill);
  return (
    <>
      <div className="address_list">
        <div className="title">
          <h3>Address Book</h3>
          <div className="content ">
            <Row>
              <Col className="mb-3" md={8}>
                <span>
                  Manage your shipping and billing addresses for a seamless
                  checkout experience.
                </span>
              </Col>
              <Col md={4}>
                <Button>+ Add New Address</Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="listing">
          <Row>
            {address_bill.map((item, index) => (
              <>
                <Col className="my-3" md={6} key={index}>
                  <Card>
                    <div className="type_address">
                      <h3>{item.type}</h3>
                    </div>
                    <div className="name">
                      <span>{item.Name}</span>
                    </div>
                    <div className="address">
                      <span>{item.Address}</span>
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
              </>
            ))}
            <Col md={6}>
              <Card className="new_address">
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
