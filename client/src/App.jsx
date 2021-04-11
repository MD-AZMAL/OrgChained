import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

// style
import "./App.scss";

const App = () => {
  return (
    <Container className="p-4">
      <Row>
        <Col>
          <h1 className="display">Display</h1>
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>

          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A adipisci
            dolores molestiae aut eveniet, ad recusandae. Illo cum iure
            dignissimos eius suscipit voluptas incidunt cumque laborum repellat,
            labore totam ex.
          </p>
        </Col>

        <Col>
          <h1 className="display uppercase">Display</h1>
          <h1 className="uppercase">Heading 1</h1>
          <h2 className="uppercase">Heading 2</h2>
          <h3 className="uppercase">Heading 3</h3>
          <h4 className="uppercase">Heading 4</h4>
          <h5 className="uppercase">Heading 5</h5>
          <h6 className="uppercase">Heading 6</h6>

          <p className="mt-4 uppercase">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A adipisci
            dolores molestiae aut eveniet, ad recusandae. Illo cum iure
            dignissimos eius suscipit voluptas incidunt cumque laborum repellat,
            labore totam ex.
          </p>
        </Col>
      </Row>
      <div className="mt-4">
        <Row>
          <Col md="6" className="mb-4">
            <Button variant="color-major" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-minor" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-gray" size="lg" className="mr-2">
              Button
            </Button>
          </Col>
          <Col md="7">
            <Button variant="outline-color-major" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-minor" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-gray" size="lg" className="mr-2">
              Button
            </Button>
          </Col>
        </Row>
      </div>
      <div className="mt-4">
        <Row>
          <Col md="6" className="mb-4">
            <Button variant="color-major" className="mr-2">
              Button
            </Button>
            <Button variant="color-minor" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent" className="mr-2">
              Button
            </Button>
            <Button variant="color-gray" className="mr-2">
              Button
            </Button>
          </Col>
          <Col md="7">
            <Button variant="outline-color-major" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-minor" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-gray" className="mr-2">
              Button
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default App;
