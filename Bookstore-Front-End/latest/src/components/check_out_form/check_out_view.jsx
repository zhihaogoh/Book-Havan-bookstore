import PropTypes from "prop-types";

export default function CheckOutView({step}) {
  return (
    <>
      <div className="check_out_process">
        <div className="process">

          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Shipping</p>
          </div>
        </div>

        <div className="step-line"></div>
        
        <div className="process">
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Payment</p>
          </div>
        </div>

        <div className="step-line"></div>
        
        <div className="process">
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Review Order</p>
          </div>
        </div>
      </div>
    </>
  );
}

CheckOutView.propTypes ={
  step: PropTypes.number.isRequired
}