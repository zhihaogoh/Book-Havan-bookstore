import { Card, Col, Row } from "react-bootstrap";

export default function Pillar() {
  return (
    <>
      <div className="pillar">
        <div className="title">
          <h2>Pillars of the Library</h2>
        </div>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <Card className="bg-success text-white">
              <Card.Body >
                <div className="card-title">
                  <h3>Our Mission</h3>
                </div>
                <div className="card-text">
                  <p>
                    To preserve the physical experience of reading in a digital
                    age, curating only the most meaningful works in editions
                    that are built to last generations.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <Card>
              <Card.Body>
                <div className="card-title">
                  <h3>Our Vision</h3>
                </div>
                <div className="card-text">
                  <p>
                    Becoming the global standard for the Slow Reading
                    movement, where every home houses a curated shelf of quiet
                    brilliance.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Card className="bg-success text-white">
              <Card.Body>
                <div className="card-title ">
                  <h3>Integrity</h3>
                </div>
                <div className="card-text">
                  <ul>
                    <li>Sustainable Sourcing</li>
                    <li>Traditional Craf</li>
                    <li>Human Curation</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
