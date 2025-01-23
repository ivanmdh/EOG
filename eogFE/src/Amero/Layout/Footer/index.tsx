import { Col, Container, Row } from "reactstrap"

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="6" className="footer-copyright">
            <p className="mb-0">In Focus Tech 2025.</p>
          </Col>
          <Col md="6">
            <p className="float-end mb-0">
              Construcciones EOG
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
