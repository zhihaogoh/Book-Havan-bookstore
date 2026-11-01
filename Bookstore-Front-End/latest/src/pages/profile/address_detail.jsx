import { Col, Row } from "react-bootstrap";
import Listing from "../../components/dashboard/listing";
import AddressForm from "../../components/dashboard/address_form";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAddress } from "../../auth/auth";

export default function AddressDetail() {
  // 沿用账户页布局，保持导航一致。
  const {AddressId} = useParams();
  const [loaded, setLoaded] = useState(null);
  useEffect(() => {
    if (!AddressId) return;
    let active = true;
    getAddress().then((response) => {
      const address = response.addresses.find((item) => String(item.id) === AddressId);
      if (active) setLoaded({ id: AddressId, address, error: address ? "" : "Address not found." });
    }).catch(() => {
      if (active) setLoaded({ id: AddressId, error: "Unable to load this address. Please reload to try again." });
    });
    return () => { active = false; };
  }, [AddressId]);
  const addressDetial = AddressId && loaded?.id === AddressId ? loaded.address : null;
  return (
    <>
      <div className="container">
        <Row>
          <Col md={4} lg={3} className="d-none d-md-block">
            <Listing />
          </Col>
          <Col md={8} lg={9}>
            {AddressId && loaded?.id !== AddressId ? (
              <p role="status">Loading address...</p>
            ) : AddressId && loaded?.error ? (
              <p role="alert">{loaded.error}</p>
            ) : <AddressForm
              key={AddressId ?? "new"}
              addressId={AddressId}
              initialDefault={Boolean(addressDetial?.status)}
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
                  value: addressDetial?.recipient_name ?? ""
                },
                {
                  name: "phone_number",
                  label: "Contact telephone",
                  autoComplete: "tel",
                  type: "tel",
                  hint: "Include your country code for delivery updates.",
                  placeholder: "e.g. +60 12-345 6789",
                  width: "half",
                   value: addressDetial?.recipent_phone ?? ""
                },
                {
                  name: "address",
                  label: "Street address",
                  autoComplete: "address-line1",
                  hint: "Include your house or building number and street name.",
                  placeholder: "e.g. 128 Hill House Lane",
                  width: "street",
                   value: addressDetial?.address_1 ?? ""
                },
                {
                  name: "unit",
                  label: "Apartment, suite, unit",
                  autoComplete: "address-line2",
                  hint: "Enter your area, building, floor or unit number.",
                  placeholder: "e.g. Apt 4B",
                  optional: false,
                   value: addressDetial?.address_2 ?? ""

                },
                {
                  name: "city",
                  label: "City / Municipality",
                  autoComplete: "address-level2",
                  placeholder: "e.g. Kuala Lumpur",
                   value: addressDetial?.city ?? ""
                },
                {
                  name: "state",
                  label: "State / Province",
                  autoComplete: "address-level1",
                  placeholder: "e.g. Kuala Lumpur",
                   value: addressDetial?.state ?? ""
                },
                {
                  name: "postcode",
                  label: "Postal / ZIP code",
                  autoComplete: "postal-code",
                  placeholder: "e.g. 50450",
                  hint: "No postal code in your country? Enter N/A.",
                   value: addressDetial?.postal_code ?? ""
                },
                {
                  name: "country",
                  label: "Country / Territory",
                  autoComplete: "country-name",
                  placeholder: "e.g. Malaysia",
                   value: addressDetial?.country ?? ""
                },
              ]}
            />}
          </Col>
        </Row>
      </div>
    </>
  );
}
