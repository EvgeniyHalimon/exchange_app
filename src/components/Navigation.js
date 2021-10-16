import React from "react";
import {Navbar, Container, Nav, NavItem} from 'react-bootstrap'
import { Link } from "react-router-dom";

function Navigation(){
    return(
        <Navbar bg="light" variant="light">
            <Container>
                <Nav className="me-auto">
                    <NavItem componentclass='span'>
                        <Link className="link" to="/">Currency course</Link>
                    </NavItem>
                    <NavItem componentclass='span'>
                        <Link className="link" to="/chart">Chart</Link>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    )
} 

export default Navigation