import React from 'react'
import { Container, Nav, Navbar ,Carousel} from 'react-bootstrap'
import logo from '../assets/logo.jpeg'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} alt='image1' className='imagelogo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to='/login' className='bg-dark text-white p-3 fs-6 m-5 text-decoration-none'>Login</Link>
             <Link to='/register'  className='bg-dark text-white  p-3 fs-6 m-5 text-decoration-none'>Register</Link>
            {/* <Nav.Link href="#" className='bg-dark text-white p-3 fs-6 m-5'>Login</Nav.Link>
            <Nav.Link href="#"  className='bg-dark text-white  p-3 fs-6 m-5'>Register</Nav.Link> */}
            
          </Nav>
        </Navbar.Collapse>
      </Container >
    </Navbar>
    <h1 className='text-center text-dark my-5'>WELCOME TO DISHA MOMO RESTAURNT APP</h1>
    <p className='text-danger mb-5 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam quidem iure soluta molestiae sed minus quae debitis alias doloremque corporis, animi ullam laudantium ut et veniam placeat nisi corrupti quibusdam.
    Explicabo commodi vitae aliquam animi expedita tempore placeat omnis, amet similique reiciendis delectus labore rerum velit. Voluptas nihil optio nam neque nostrum commodi? Aspernatur sed voluptatum porro ullam quibusdam laborum?
    Aut quae rerum veritatis mollitia esse dolorum ratione itaque sapiente quasi odit nostrum dignissimos maiores illum minima eius atque sequi necessitatibus optio, quo, exercitationem ut eos incidunt? Deleniti, cumque porro.</p>
     <Carousel className='carousel1'>
      <Carousel.Item>
        <img src="https://i.postimg.cc/VLXQ554v/image1.jpg" className='img-fluid' alt='image1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/8sQ2tVkT/image2.jpg"  className='img-fluid'alt='image1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/xdpTgqwY/image3.jpg" className='img-fluid' alt='image1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img src="https://i.postimg.cc/g2dJ2Cy9/image4.jpg"  className='img-fluid' alt='image1'/>
      </Carousel.Item>
    </Carousel>
    </>
  )
}
