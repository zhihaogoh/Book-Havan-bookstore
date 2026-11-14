import { Button, Card, Col, Row } from "react-bootstrap";
import { MdAddCircle, MdPhone } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router";
import { readAddresses } from "../../routes/address_storage";
import PropTypes from "prop-types";
import { deleteAddress } from "../../auth/auth";
import DeleteStatus from "../Modal/delete_success";
import { useState } from "react";
import ConfrimMessage from "../Modal/confrimMessage";

export default function AddressList({ addresses = [] }) {
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [confrim, setConfrim] = useState(false);
  const [message, setMessage] = useState("");
  let savedAddresses = [];
  let storageError = false;
  // 储存不可用时仍显示原有地址，并提供明确提示。
  try {
    savedAddresses = readAddresses();
  } catch {
    storageError = true;
  }
  const address_bill = [...addresses, ...savedAddresses];
  const navigate = useNavigate();
  const toEditAddress = (AddressId) => {
    navigate(`/address/new/${AddressId}`);
  };

  const toDeleteAddress = async (AddressId) => {
    // Implement delete functionality here
    try {
      const response = await deleteAddress(AddressId);
      if (response) {
        setMessage(response.message);
        setModal(true);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <>
      <div className="address_list">
        <div className="title">
          <h3>Address Book</h3>
          {location.state?.addressSaved && (
            <p role="status" className="text-success">
              Address saved in this browser.
            </p>
          )}
          {storageError && (
            <p role="alert">
              Saved addresses could not be loaded from this browser.
            </p>
          )}
          <div className="content ">
            <Row>
              <Col className="mb-3" md={7}>
                <span>
                  Manage your shipping and billing addresses for a seamless
                  checkout experience.
                </span>
              </Col>
              <Col md={5}>
                <Button as={Link} to="/address/new">
                  + Add New Address
                </Button>
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
                    <span>
                      {item.recipient_name ?? item.recipent_name ?? item.Name}
                    </span>
                    <strong className="text-success px-3">
                      {item.status ? "Active" : ""}
                    </strong>
                    <strong>{item.type}</strong>
                  </div>
                  <div className="address">
                    <span>{item.address_1 ?? item.Address},</span>
                    {(item.address_2 ?? item.unit) && (
                      <span>{item.address_2 ?? item.unit},</span>
                    )}
                    <span>
                      {item.postal_code ?? item.post_code ?? item.postcode},{" "}
                      {item.city}, {item.state},
                    </span>
                    <span>{item.country}</span>
                  </div>
                  <div className="phone_number">
                    <span>
                      <MdPhone /> {item.recipent_phone ?? item.phone_number}
                    </span>
                  </div>
                  <div className="button_group">
                    <Button
                      className="edit"
                      onClick={() => toEditAddress(item.id)}
                    >
                      Edit
                    </Button>
                    <Button className="delete" onClick={() => setConfrim(true)}>
                      Delete
                    </Button>
                    <ConfrimMessage
                      message={"Are you delete this address"}
                      show={confrim}
                      submit={() => {
                        setConfrim(false);
                        toDeleteAddress(item.id);
                      }}
                      onHide={() => {
                        setConfrim(false);
                      }}
                    />
                  </div>
                </Card>
              </Col>
            ))}
            <Col className="my-3" md={6}>
              <Card
                as={Link}
                to="/address/new"
                className="new_address"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MdAddCircle className="icon" />
                <h3>Add New Address</h3>
                <span>
                  Click here to add another shipping or billing location to your
                  account.
                </span>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      <DeleteStatus
        message={message}
        show={modal}
        onHide={() => {
          setModal(false);
        }}
      />
    </>
  );
}

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      recipient_name: PropTypes.string,
      recipent_phone: PropTypes.string.isRequired,
      address_1: PropTypes.string.isRequired,
      address_2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal_code: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      status: PropTypes.bool,
    }),
  ),
};
