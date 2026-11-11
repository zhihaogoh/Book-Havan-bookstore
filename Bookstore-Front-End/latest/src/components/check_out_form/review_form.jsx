import PropTypes from "prop-types";
import FormReview from "../form/form_review";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import { storeOrder } from "../../auth/auth";
import DeleteStatus from "../Modal/orderSuccess";

export default function ReviewForm({
  setStep,
  carts,
  address,
  total,
  subtotal,
  shippingFee,
  taxTotal,
}) {
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const addressId = Number(address?.id);
  const handleBackToHome = async () => {
    if (submitting || orderPlaced) return;
    if (!Number.isInteger(addressId) || addressId <= 0 || carts.length === 0) {
      setMessage(
        "Please select a shipping address and add items to your cart.",
      );
      return;
    }
    setMessage("");
    setSubmitting(true);
    try {
      const items = carts.map((cart, index) => ({
        book_id: Number(cart.book?.id),
        quantity: Number(cart.quantity),
        title_book: cart.book?.book_name,
        SKU: String(cart.book?.book_isbn ?? ""),
        price_per_unit: Number(cart.book?.book_price),
        discount_amount: Number(
          (
            (Number(cart.book?.book_price) *
              Number(cart.quantity) *
              Number(cart.book?.discount_percentage ?? 0)) /
            100
          ).toFixed(2),
        ),
        // The API sums line taxes when recalculating the order total.
        tax_amount: index === 0 ? Number(taxTotal.toFixed(2)) : 0,
      }));
      const cartIds = carts.map((cart) => cart.id);
      const response = await storeOrder(
        {
          address_id: addressId,
          currency: "MYR",
          status: "pending",
          grand_total: Number(total.toFixed(2)),
          subtotal: Number(subtotal.toFixed(2)),
          shipping_total: shippingFee,
          tax_total: Number(taxTotal.toFixed(2)),
          items,
        },
        cartIds,
      );
      setOrderPlaced(true);
      if (response.failedCartIds.length > 0) {
        setMessage(
          "Your order was placed, but some purchased items could not be removed from your cart. Remove them before your next purchase.",
        );
        return;
      }
      setMessage(response.message);
      setModal(true);
    } catch (error) {
      setMessage(
        Object.values(error.errors ?? {})
          .flat()
          .join(" ") ||
          error.message ||
          "Unable to place your order.",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className="check_out_form">
        <div className="title">
          <h3>Review Information</h3>
        </div>
        {message && (
          <Alert variant={orderPlaced ? "warning" : "danger"}>{message}</Alert>
        )}
        <FormReview carts={carts} address={address ?? {}} />
      </div>
      <div className="btn_group">
        <Row>
          <Col md={12} lg={6}>
            <Button
              className="btn-light "
              onClick={() => {
                setStep(2);
              }}
            >
              Back to Shopping Cart
            </Button>
          </Col>
          <Col md={12} lg={6} className="text-end pt-3">
            <Button
              variant="primary"
              type="submit"
              disabled={submitting || orderPlaced}
              onClick={() => {
                handleBackToHome();
              }}
            >
              {orderPlaced
                ? "Order Placed"
                : submitting
                  ? "Placing Order..."
                  : "Place Order"}
            </Button>
          </Col>
        </Row>
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

ReviewForm.propTypes = {
  setStep: PropTypes.func.isRequired,
  carts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        book_name: PropTypes.string.isRequired,
        book_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        discount_percentage: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        book_quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        book_isbn: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
      }),
    }),
  ).isRequired,
  address: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    recipient_name: PropTypes.string,
    recipent_phone: PropTypes.string.isRequired,
    address_1: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    status: PropTypes.bool,
  }),
  subtotal: PropTypes.number.isRequired,
  shippingFee: PropTypes.number.isRequired,
  taxTotal: PropTypes.number.isRequired,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};
