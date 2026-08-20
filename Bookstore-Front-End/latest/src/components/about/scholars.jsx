import { Col, Row } from "react-bootstrap";

export default function Scholars() {
  return (
    <>
      <div className="container scholars">
        <div className="title">
          <h3>A Collective of Bibliophiles, Scholars, and Dreamers</h3>
        </div>
        <Row className="content flex-row justify-content-center">
          <Col xs={12} md={3} lg={3}>
            <img
              src="../src/assets/Image/About/Scholars1.jpg"
              alt="scholar"
              className="img-fluid mb-3"
            />
            <h3>Eleanor Thorne</h3>
            <p className="position">Head Curator</p>
            <p className="description">
                &quot;The best books are the ones that wait for you to find them.&quot;
            </p>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <img
              src="../src/assets/Image/About/Scholars2.jpg"
              alt="scholar"
              className="img-fluid mb-3"
            />
            <h3>Julian Vane</h3>
            <p className="position">Classic Archivist</p>
            <p className="description">&quot;History is just a story told by those who dared to write.&quot;</p>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <img
              src="../src/assets/Image/About/Scholars3.jpg"
              alt="scholar"
              className="img-fluid mb-3"
            />
            <h3>Clara Mistry</h3>
            <p className="position">Contemporary Arts</p>
            <p className="description">&quot;New voices deserve the oldest and finest papers.&quot;</p>
          </Col>
          <Col xs={12} md={3} lg={3}>
            <img
              src="../src/assets/Image/About/Scholars4.jpg"
              alt="scholar"
              className="img-fluid mb-3"
            />
            <h3>Soren Kjell</h3>
            <p className="position">Aesthetic Lead</p>
            <p className="description">&quot;A library should be as beautiful as the thoughts it inspires.&quot;</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
