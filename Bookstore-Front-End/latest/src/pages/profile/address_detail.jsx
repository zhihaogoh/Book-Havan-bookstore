import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import Listing from "../../components/dashboard/listing";
import AddressForm from "../../components/dashboard/address_form";

export default function AddressDetail() {
  // 沿用账户页布局，保持导航一致。
  return (
    <Layout>
      <div className="container">
        <Row>
          <Col md={4} lg={3} className="d-none d-md-block">
            <Listing />
          </Col>
          <Col md={8} lg={9}>
            <AddressForm
              address_type={[
                {
                  id: 1,
                  option: "Shipping destination",
                },
                {
                  id: 2,
                  option: "Billing only",
                },
              ]}
              address_field={[
                {
                  name: "name",
                  label: "Full recipient name",
                  autoComplete: "name",
                  hint: "The name your delivery driver should ask for.",
                  placeholder: "e.g. Eleanor Vance",
                  width: "half",
                },
                {
                  name: "phone_number",
                  label: "Contact telephone",
                  autoComplete: "tel",
                  type: "tel",
                  hint: "Include your country code for delivery updates.",
                  placeholder: "e.g. +60 12-345 6789",
                  width: "half",
                },
                {
                  name: "address",
                  label: "Street address",
                  autoComplete: "address-line1",
                  hint: "Include your house or building number and street name.",
                  placeholder: "e.g. 128 Hill House Lane",
                  width: "street",
                },
                {
                  name: "unit",
                  label: "Apartment, suite, unit",
                  autoComplete: "address-line2",
                  hint: "Optional — floor or unit number.",
                  placeholder: "e.g. Apt 4B",
                  optional: true,
                },
                {
                  name: "city",
                  label: "City / Municipality",
                  autoComplete: "address-level2",
                  placeholder: "e.g. Kuala Lumpur",
                },
                {
                  name: "state",
                  label: "State / Province",
                  autoComplete: "address-level1",
                  placeholder: "e.g. Kuala Lumpur",
                },
                {
                  name: "postcode",
                  label: "Postal / ZIP code",
                  autoComplete: "postal-code",
                  placeholder: "e.g. 50450",
                  hint: "No postal code in your country? Enter N/A.",
                },
                {
                  name: "country",
                  label: "Country / Territory",
                  autoComplete: "country-name",
                  placeholder: "e.g. Malaysia",
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}
