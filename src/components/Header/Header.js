import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css'
import { CartContext, UserContext } from '../../App';
import { Avatar } from '@material-ui/core';

const Header = () => {
    const [cart] = useContext(CartContext)
    const [loggingUser] = useContext(UserContext)
    const { email, photo, name } = loggingUser

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }))(Badge);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/"><Navbar.Brand>Tech Shop</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto align-items-center">
                        <Link to="/">Home</Link>
                        <Link to="/orders">Order</Link>
                        <Link to="/admin">Admin</Link>
                        <Link to="/deal">Deal</Link>
                        <Link to="/checkout">
                            <StyledBadge badgeContent={cart.length} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </Link>
                        <Link className="login-photo" to={email ? '/profile' : '/login'}> {email ? <Avatar alt={name} src={photo} /> : 'Login'}</Link>
                        <Link className="login-name" to={email ? '/profile' : '/login'}> {email ? <strong>{name}</strong> : 'Login'}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;