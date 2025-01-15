import { Col, Container, Row } from "reactstrap";
import Image from "next/image";
import Link from "next/link";

import logo from "../public/assets/images/logo/logo-dark.png";

export default function Home() {
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <Link className="logo" href="/login">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh", // Para centrar verticalmente en toda la pantalla
              }}
            >
              <Image
                width={400}
                className="img-fluid"
                src={logo}
                alt="login page"
                priority
              />
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
