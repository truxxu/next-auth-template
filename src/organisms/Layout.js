import React from "react";
import Container from "react-bootstrap/Container";

import { NavigationBar } from "./NavigationBar";

const Layout = (props) => {
  return (
    <>
      <NavigationBar />
      <main>
        <Container className="p-5">{props.children}</Container>
      </main>
    </>
  );
};

export { Layout };
