import PropTypes, { shape } from "prop-types";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FiSave } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import { useNavigate } from "react-router";

export default function AddressForm({ address_type, address_field }) {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState((address_type.id = 1));
  const [value, setValue] = useState(() =>
    Object.fromEntries(address_field.map((item) => [item.name, ""])),
  );
  const [error, setErrors] = useState({});
  const [isDefault, setIsDefault] = useState(false);
  // const [saveError, setSaveError] = useState("");

  function handleSubmit(event) {
    console.log(value)
    event.preventDefault();

    const cleaned = Object.fromEntries(
      Object.entries(value).map(([key, value]) => [key, value.trim()]),
    );
    const nextError = {};
    address_field.forEach((item) => {
      if (!item.optional && !cleaned[item.name])
        nextError[item.name] = `Please enter ${item.label.toLowerCase()}`;
    });
    if (
      cleaned.phone_number &&
      (!/^[+\d\s().-]+$/.test(cleaned.phone_number) ||
        !/^\d{7,15}$/.test(cleaned.phone_number.replace(/\D/g, "")))
    )
      nextError.phone_number = "Enter a valid phone number with 7–15 digits.";
    setErrors(nextError);
    console.log(error);
    if (Object.keys(nextError).length) {
      event.currentTarget.elements.namedItem(Object.keys(nextError)[0]).focus();
      return;
    }
  }

  return (
    <>
      <div className="customer-address" aria-label="address-heading">
        <div className="title">
          <h3>Manage Delivery Addresses</h3>
          <p>
            Add or edit your shipping and billing locations for seamless book
            deliveries, archival slipcasing, and private press subscriptions.
          </p>
        </div>
        <Card className="customer_record">
          <Form onSubmit={handleSubmit}>
            <fieldset className="customer_address_purpose">
              <div className="purpose">
                <legend>Address purpose</legend>
                <p>Choose how you would like to use this address.</p>
              </div>
              <div className="customer_address_choice">
                {address_type.map((item, index) => (
                  <label key={index}>
                    <Form.Check
                      type="radio"
                      name="purpose"
                      value={item.id}
                      checked={purpose === item.id}
                      onChange={() => setPurpose(item.id)}
                    />
                    {item.option}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="customer_address_grid">
              {address_field.map((item, index) => (
                <div
                  key={index}
                  className={`customer_address_field ${item.width ? `customer_address_field_${item.width}` : ""}`}
                >
                  <Form.Label htmlFor={`address-${item.name}`}>
                    {item.label}
                    {!item.optional && <span className="required">*</span>}
                  </Form.Label>
                  <Form.Control
                    id={`address-${item.name}`}
                    name={item.name}
                    type={item.type}
                    autoComplete={item.autoComplete}
                   
                    maxLength={item.name === "address" ? 200 : 100}
                    placeholder={item.placeholder}
                    value={value[item.name]}
                    aria-invalid={Boolean(error[item.name])}
                    aria-describedby={
                      [
                        item.hint && `${item.name}-hint`,
                        error[item.name] && `${item.name}-error`,
                      ]
                        .filter(Boolean)
                        .join("") || undefined
                    }
                    onChange={(event) => {
                      setValue({ ...value, [item.name]: event.target.value });
                      setErrors({ ...error, [item.name]: undefined });
                    }}
                  />
                  {item.hint && (
                    <small id={`${item.name}-hint`}>{item.hint}</small>
                  )}
                  {error[item.name] && (
                    <small
                      className="customer_address_error"
                      id={`${item.name}-error`}
                      role="alert"
                    >
                      {error[item.name]}
                    </small>
                  )}
                </div>
              ))}
            </div>
            {address_type.id === 1 && (
              <label className="customer_address_default">
                <MdBookmarkBorder className="icon" aria-hidden="true" />
                <span>
                  <strong>Set as default shipping address</strong>
                  <small>
                    Mark this as your preferref delivery address in your address
                    book.
                  </small>
                </span>
                <Form.Check
                  type="switch"
                  role="switch"
                  checked={isDefault}
                  onChange={(event) => setIsDefault(event.target.checked)}
                />
              </label>
            )}
            <Card className="product_action my-3">
              <span>
                All required reader details have been verified and are ready to
                save.
              </span>
              <Button
                type="button"
                className="edit_cancel"
                onClick={() => navigate("/profile")}
              >
                Discard Changes
              </Button>
              <Button type="submit" className="submit">
                <FiSave aria-hidden="true" />
                Save Changes
              </Button>
            </Card>
          </Form>
        </Card>
      </div>
    </>
  );
}

AddressForm.propTypes = {
  address_type: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      option: PropTypes.string.isRequired,
    }),
  ),
  address_field: PropTypes.arrayOf(
    shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      autoComplete: PropTypes.string.isRequired,
      hint: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
      width: PropTypes.string.isRequired,
      optional: PropTypes.bool.isRequired,
    }),
  ),
};
