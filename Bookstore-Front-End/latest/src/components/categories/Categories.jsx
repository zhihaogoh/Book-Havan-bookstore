import { Row } from "react-bootstrap";

export default function Categories() {
  return (
    <>
      <div className="categories container">
        <div className="title">
          <h2>Shop by Categories</h2>
          <a href="#" className="view-all">
            View All Categories{" "}
          </a>
        </div>
        <div className="categories_list">
          <Row xs={2} md={4} lg={6} className="g-4">
         
          </Row>
        </div>
      </div>
    </>
  );
}
