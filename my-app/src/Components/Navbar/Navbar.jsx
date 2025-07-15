import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarStyle from './Navbar.module.css';
import { Link } from 'react-scroll';
import sabelImg from '../../assets/imgs/sabeelLogoPng.png';
import { NavLink } from 'react-router-dom';



function CollapsibleExample(props) {

    return (
        <Navbar className={`d-flex ${NavbarStyle.navBar}`} collapseOnSelect expand="lg">
            <Container>
                <div className='d-flex align-items-center w-25'>
                    <img src={sabelImg} alt='logo' className={NavbarStyle.sabelImg} />
                </div>

                <div className={`d-flex`}>

                    <Navbar.Toggle
                        className={`${NavbarStyle.navbarToggler} ${NavbarStyle.navbarTogglerIcon}`}
                        aria-controls="responsive-navbar-nav">
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `${NavbarStyle.li} ${isActive ? NavbarStyle.active : ''}`
                            }
                        >
                            الواجهة الرئيسية
                        </NavLink>

                        <NavLink
                            to="/registrationForm"
                            state={{ student: null }}
                            className={({ isActive }) =>
                                `${NavbarStyle.li} ${isActive ? NavbarStyle.active : ''}`
                            }
                        >
                            تسجيل طالب
                        </NavLink>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;
