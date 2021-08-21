import { Navbar, Container, Col, Row, Card, Button  } from 'react-bootstrap';
import Typical from 'react-typical'
import Aos from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';




const Home= () => {

    useEffect(() => {
      Aos.init({duration: 2000 });
    })


    return (

        <div >
<Container className='mt-5' >
  <Row>
    <Col sm={7} className="view" >
    <div className="header pt-5">
    <p className="font display-1 animate__animated animate__slideInLeft"  >Decentralized Election</p>
    <p className='display-4  font2 animate__animated animate__slideInLeft'> Vote your preferred candidate and be sure of <Typical 
        loop={Infinity}
        wrapper='b'
        steps={[
            'Transparency',
            1000,
            'Security',
            1000,
            'Fairness',
            1000,
            
        ]}

        />
             </p>
    </div>
    </Col>
    <Col sm={5}>
         <div className="">
            <div className="">
              <img className="w-100 animate__animated animate__bounce BgLogo pt-5" data-aos='fade-right' src="/images/img.png" alt="eth logo"/>
            </div>
    </div>
        </Col> 
  </Row>
  </Container>

  
        </div>
    )
}

export default Home;