import React from 'react';
import { Container, Col, Row, Card, Button, Modal,Form, InputGroup, FormControl } from 'react-bootstrap';
import {useState} from 'react';
import abi from "./election.json"

import ModalHeader from 'react-bootstrap/esm/ModalHeader';
///import {useContractFunction} from '@usedapp/core'
/// import { symbol } from 'prop-types';
///import Web3 from 'web3';


const initialValues = {
    candidateName: "",
    candidateParty: "",
    UID: "",
    candidateID: "",
    ID:"",
    newAdmin:"",
    amount:"",
    newOwner: ''
   
  };



const Dashboard = (props) => {

  
 
   
    ///const [busy,setBusy] = useState(false)
    
   
    const [values, setValues] = useState(initialValues);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [NumOfCandidates, setSupply] = useState('');
    const [NumVoter, setVoters] = useState('');
    const [Candidates, setCandidate] = useState('');
    const [votes, setVote] = useState('');
    const [display, setDisplay] = useState(false);


    const wethContractAddress = '0x38e2c3070f219340E74F6FD684d33FF3e360Ae0A';

    const contract =  new props.web3Instance.eth.Contract(abi, wethContractAddress);

    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      const handleInputChange = (e) => {
        
        const { name, value } = e.target;
    
        setValues({
          ...values,
          [name]: value,
        });
        console.log(values, 'values')
      };


// function to add candidate
      async function sendTransaction () {

        setLoading(true)
        const addresses = await props.web3Instance.eth.getAccounts();
               /// await send(values.tokenName, values.tokenSymbol, values.tokenDecimal, values.tokenAllowed 
              try{
                await contract.methods.addCandidate(values.candidateName, values.candidateParty).send({
                    from: addresses[0]
               });
                 }
                 catch{
                   alert('input the right parameters ')
                 }
                
              setLoading(false)
    }

    //function to vote a candidate, function can only be called once by an address
    async function Vote () {

        setLoading(true)
        const addresses = await props.web3Instance.eth.getAccounts();
               /// await send(values.tokenName, values.tokenSymbol, values.tokenDecimal, values.tokenAllowed 
              try{
                await contract.methods.vote(values.ID).send({
                    from: addresses[0]
               });
                 }
                 catch{
                   alert('You can not vote for a candidate more than once')
                 }
                
              setLoading(false)
    }
// function to add Admin
    async function Admin () {

        setLoading(true)
        const addresses = await props.web3Instance.eth.getAccounts();
               /// await send(values.tokenName, values.tokenSymbol, values.tokenDecimal, values.tokenAllowed 
              try{
                await contract.methods.addAdmin(values.newAdmin).send({
                    from: addresses[0]
               });
                 }
                 catch{
                   
                 }
                
              setLoading(false)
    }

    async function NumOfCandidate () {
        const address = await props.web3Instance.eth.getAccounts()
        
      const supply =   await  contract.methods.getNumOfCandidates().call({
          from: address[0]
        })
      
        setSupply(supply)
      }
      NumOfCandidate()

      async function NumOfVoters () {
        const address = await props.web3Instance.eth.getAccounts()
        
      const voter =   await  contract.methods.getNumOfVoters().call({
          from: address[0]
        })
      
        setVoters(voter)
      }
      NumOfVoters()

      async function getCandidate () {
        const address = await props.web3Instance.eth.getAccounts()
        
      const candidate =   await  contract.methods.getCandidate(values.candidateID).call({
          from: address[0]
        })
      
        setCandidate(candidate)
      }
      async function TotalVote () {
        const address = await props.web3Instance.eth.getAccounts()
        
      const totalVote =   await  contract.methods.totalVotes(values.candidateID).call({
          from: address[0]
        })
      
        setVote(totalVote)
      }

     async function callBoth () {

        try{
            await getCandidate();
            await TotalVote();
             setDisplay(true)
        }
        catch{
                alert('input the right parameter')
        }
        
      }
    

     



    

     
 

    return (
        <div >
        
            
<Container>
            <Form>
  <Row className="align-items-center">
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
        Candidate name 
      </Form.Label>
      <Col>
                        
                            <Form.Control  type="text" placeholder="Name of Candidate"  
                             value={values.candidateName}
                             onChange={handleInputChange}
                             name="candidateName"
                             label="candidateName"
                            />
                            
                            </Col>
    </Col>
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
        Party
      </Form.Label>
      <InputGroup>
        
        <Col>
                            <Form.Control type="text" placeholder=" Candidate Party " 
                             value={values.tokenSymbol}
                             onChange={handleInputChange}
                             name="candidateParty"
                             label="candidateParty"
                            />
                            </Col>
      </InputGroup>
    </Col>
    
    <Col xs="auto" className="my-1">
      <Button type="submit" onClick={sendTransaction} disabled={loading} type="submit">
      {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {loading && <span>Pending</span>}
                        {!loading && <span>Create</span>}
          </Button>
    </Col>
  </Row>


</Form>

<Form>
  <Row className="align-items-center">
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
        Add new Admin 
      </Form.Label>
      <Col>
                        
                            <Form.Control  type="text" placeholder="New admin address"  
                             value={values.newAdmin}
                             onChange={handleInputChange}
                             name="newAdmin"
                             label="newAdmin"
                            />
                            
                            </Col>
    </Col>
  
    
    <Col xs="auto" className="my-1">
      <Button type="submit" onClick={Admin} disabled={loading} type="submit">
      {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {loading && <span>Pending</span>}
                        {!loading && <span> Add Admin</span>}
          </Button>
    </Col>
  </Row>


</Form>

<div>Vote your Candidate </div>
<Form>
  <Row className="align-items-center">
   
    <Col sm={3} className="my-1">
      <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
        Candidate ID
      </Form.Label>
      <InputGroup>
        
        <Col>
                            <Form.Control type="text" placeholder=" Candidate ID " 
                            value={values.ID}
                             onChange={handleInputChange}
                             name="ID"
                             label="ID"
                            />
                            </Col>
      </InputGroup>
    </Col>

    
    <Col xs="auto" className="my-1">
      <Button type="submit" onClick={Vote} disabled={loading} type="submit">
      {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {loading && <span>Pending</span>}
                        {!loading && <span>Vote</span>}
          </Button>
    </Col>
  </Row>
</Form>

</Container>

<Container>
<Card.Body className='ml-auto'  style={{ Width: '3rem', float:'right', marginTop:'-5rem'}} >
      <Card.Title >Number of Candidate:</Card.Title>
      <Card.Text style={{float:"left", fontSize:'20px',marginLeft:"1rem"}}>
          <Card  className="text-dark text-center shadow-sm rounded" style={{ minWidth: '8rem',padding: '5px 3px 5px 3px',minHeight: '2rem'}}>
               {NumOfCandidates}
          </Card>
      </Card.Text>
      </Card.Body> 

</Container>

<Container className="pt-5"  >
<Col sm={3} className="my-1 ">
      <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
        Candidate ID
      </Form.Label>
      <InputGroup>
        
        <Col>
                            <Form.Control type="text" placeholder=" Candidate ID " 
                             value={values.candidateID}
                             onChange={handleInputChange}
                             name="candidateID"
                             label="candidateID"
                            />
                            </Col>
      </InputGroup>
    </Col>
    
    <Col xs="auto" className="my-1">
      <Button type="submit" onClick={callBoth} disabled={loading} type="submit">
      {loading && (
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                        {loading && <span>Pending</span>}
                        {!loading && <span>getCandidate</span>}
          </Button>
    </Col>

    <br/>
    <>
    {

  display?<Card className="shadow rounded"   style={{width:'40rem'}}  >     
    <Card.Header as="h5" style={{textAlign:'center'}} >
   
      <Card.Title  style={{display:'inline',float:"left",marginTop:'4px' }}>Candidate Name:</Card.Title>
      <Card.Text style={{float:"left", fontSize:'20px',marginLeft:"1rem"}}>
          <Card className='text-dark shadow-sm rounded' style={{ minWidth: '8rem',padding: '5px 3px 5px 3px' }}>
                {Candidates[1]}
          </Card>
      </Card.Text>
    </Card.Header>
    <Card.Body style={{marginBottom:'-20px'}}  className='bg-primary text-light' >
      <Card.Title  style={{display:'inline',float:"left",marginTop:'4px' }}>Candidate Address:</Card.Title>
      <Card.Text style={{float:"left", fontSize:'20px',marginLeft:"1rem"}}>
          <Card  className="text-dark text-center shadow-sm rounded" style={{ minWidth: '8rem',padding: '5px 3px 5px 3px' }}>
          {Candidates[2]}
          </Card>
      </Card.Text>
      </Card.Body> 
      <Card.Body style={{marginBottom:'-20px'}}  className='bg-primary text-light' >
      <Card.Title  style={{display:'inline',float:"left",marginTop:'4px' }}>Candidate ID:</Card.Title>
      <Card.Text style={{float:"left", fontSize:'20px',marginLeft:"1rem"}}>
          <Card  className="text-dark text-center shadow-sm rounded" style={{ minWidth: '8rem',padding: '5px 3px 5px 3px' }}>
          {Candidates[0]}
          </Card>
      </Card.Text>
      </Card.Body> 
     
      <Card.Body style={{marginBottom:'-20px'}} className='bg-primary text-light'> <hr style={{height:'2px',borderWidth:'0', color:'black',backgroundColor:'black', marginTop:'0px'}}/>
      <Card.Title  style={{display:'inline',float:"left",marginTop:'4px' }}>Total Vote:</Card.Title>
      <Card.Text style={{float:"left", fontSize:'20px',marginLeft:"1rem"}}>
          <Card className="text-dark text-center" style={{ minWidth: '8rem',padding: '5px 3px 5px 3px' }}>
          {votes}
          </Card>
      </Card.Text>
      </Card.Body> 
    
    
   
</Card>  :null

      
       
}
</>

</Container>
        </div>
    );
   

}

export default  Dashboard;