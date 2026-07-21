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
            <div className="categories_item">
              <img
                src="../src/assets/image/categories_1.png"
                alt="categories_1"
              />
              <h5>Fiction</h5>
              <p className="categories_item_count">12,345 items</p>
            </div>
            <div className="categories_item">
              <img
                src="../src/assets/image/categories_2.png"
                alt="categories_2"
              />
              <h5>Non-Fiction</h5>
              <p className="categories_item_count">12,345 items</p>
            </div>
            <div className="categories_item">
              <img
                src="../src/assets/image/categories_2.png"
                alt="More"
              />
              <h5>More</h5>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
}
