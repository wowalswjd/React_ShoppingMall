import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';

function Navigation() {
  return(
    <Navbar bg="light" expand="lg">
    <Container>

    <Link to='/' style={{textDecoration:'none'}}>
      <Navbar.Brand>
        <img 
          src='/images/shoeshop로고_black.png'
          style={{width:'100px'}} 
          alt="shoeshop로고"
        />
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/detail">Detail</Nav.Link> 
              {/* as={Link} -> 이 HTML태그를 Link태그처럼 써라 */}
          <NavDropdown title="고객센터" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">공지사항</NavDropdown.Item>
            <NavDropdown.Item href="/event">이벤트</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">문의하기</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/login">로그인</Nav.Link>
        <Nav.Link as={Link} to="/join">회원가입</Nav.Link>
        <Nav.Link as={Link} to="/cart">장바구니</Nav.Link>
        <Nav.Link as={Link} to="/mypage">마이페이지</Nav.Link>
        <button>
          <img 
            src="/images/searchimg.png" 
            style={{width:'20px'}}
            alt="검색 버튼"
          />
        </button>
      </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  

  )

}

export default Navigation