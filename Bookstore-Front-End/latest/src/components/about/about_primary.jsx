import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AboutPrimary() {
  return (
    <>
      <div className="about-primary">
        <div className="title">
          <h2>Our Legacy</h2>
          <h1>Where Every Page Holds the Book Havan</h1>
        </div>
        <div className="havan-story">
          <Row className="align-items-center">
            <Col xs={12} md={6} lg={6}>
              <div className="havan-story-content">
                <h1>A Haven for Stories, Ideas, and Imagination</h1>
                <p>
                  Havan Bookstore began with a simple belief: every book has the
                  power to open a new world. What started as a passion for
                  discovering meaningful stories has grown into a place where
                  readers can explore, learn, and find books that stay with them
                  long after the final page.
                </p>
                <p>
                  At Havan Bookstore, we believe books are more than words on
                  paper. They carry ideas, emotions, knowledge, and memories
                  from one reader to another.
                </p>
                <p>
                  Today, our mission remains simple: to create a welcoming space
                  for every kind of reader. From timeless classics and inspiring
                  non-fiction to contemporary stories and new discoveries, Havan
                  Bookstore brings together books worth reading and stories
                  worth remembering.
                </p>
                <p>Find your next story at Havan Bookstore.</p>
              </div>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <div className="havan-story-image">
                <img
                  className="image-overlay"
                  src="../src/assets/Image/About/Content.png"
                  alt="Havan Story"
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
