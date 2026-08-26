import { Form } from "react-bootstrap";

export default function ProductResult() {
  return (
    <>
      <div className="result_product">
        <div className="title">
          <h3>142 results for &quot;History&quot;</h3>
          <div className="sort">
            <span>Sort By : </span>
            <Form>
              <Form.Group  controlId="formGridState">
                  <Form.Select defaultValue="Most Popular">
                  <option>Most Popular</option>
                  <option>Default</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
