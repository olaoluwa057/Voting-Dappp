import {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Nav from './component/Nav';
import Index from './component/index';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './component/Dashboard';

import { render } from '@testing-library/react';
import contractABI  from './component/election.json'
//import FooterPage from './components/footer';





class App extends Component{

  
  
state={

  contractDetails:{

    contractAddress: "0x38e2c3070f219340E74F6FD684d33FF3e360Ae0A",
   
  },


  currentState: "landing page"
}

SetWeb3=async(web3)=> {
  this.setState({
    web3
  })
  console.log(this.state.web3, 'web3');
 
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];
  //instantiate contract
  const contractInstance = new this.state.web3.eth.Contract(contractABI, this.state.contractDetails.contractAddress);
  this.setState({
   contractDetails:{
      ...this.state.contractDetails,
      account,
      contractInstance
  }
  })

console.log(this.state.contractDetails, 'contract details in state');

}

changePage = (page) =>{
  this.setState({
    currentState: page
  })
   
}
  



 
  render(){
   
    
    
    let currentPage;
    if(this.state.currentState=="landing page"){
      currentPage = <Index />
    }
    
    if(this.state.currentState=="dashboard"){
      currentPage = <Dashboard
      web3Instance={this.state.web3} 
      />
    }

   
  return (
   <>
   <Nav changePage={this.changePage}
   setWeb3={this.SetWeb3}/>
    {currentPage}
  {// <FooterPage/>
  }

   </>
  )
  
  
  }
  
  
  }
  


export default App;
