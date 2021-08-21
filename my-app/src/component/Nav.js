import React, { useState } from 'react';
import { Navbar,Nav, Button} from 'react-bootstrap';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import Portis from "@portis/web3";



const providerOptions = {
  portis: {
    package: Portis, // required
    options: {
      id: "fe80483c-8da3-46f6-b5a2-92be1bc0fcb9",
      network: "mainnet"
    }
  },
  
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "8c7e5f2b4151492cb90848faa879264d" // required
    }
  },
  authereum: {
    package: Authereum // required
  }
  
};

let provider = null;
let web3 = null;
let accounts = null;


  

const NavBar=  (props) => {

  //const { activateBrowserWallet, account } = useEthers()
   

      const [isToggleOn, handleToggle ]=useState(false);
  

   const handleClick=() => {
      handleToggle (true)
    }

  async function showWeb3Modal() {
    if (!provider) {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
      });
      web3 = await connect(web3Modal);
      props.setWeb3(web3);
    }

   // providerOPtions.portis.showWeb3Modal();

    if (!accounts) {
      accounts = await web3.eth.getAccounts();
   //   print(`Wallet address: ${accounts[0].toLowerCase()}`);
    }
  }

  async function connect(web3Modal) {
    provider = await web3Modal.connect();
    return new Web3(provider);
  }

/*  function print(str) {
    const p = document.createElement("p");
    p.innerText = str;
    document.getElementById("userWalletAddress").appendChild(p);
  } */
 // const [page, setPage]= React.useState("dashboard");
  let page = "dashboard";

  const makePage = (displayPage)=> {
    displayPage = page;
    props.changePage(displayPage);
  }

  

async function displayBoth () {
  await showWeb3Modal();
  await handleClick()
  makePage();

  }


    return(
      
        <div>
    <Navbar bg=""  variant="light" expand="lg" className='w-100' collapseOnSelect>
    <Navbar.Brand href="#home">
      <img
        src="/images/img.png"
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="logo"
      />
    </Navbar.Brand>
   
    <Button variant="outline-dark animate__animated animate__pulse pulse" onClick={displayBoth}>
      {isToggleOn ? 'Connected' : 'Connect'}
      </Button>{' '}
    

    <pre id="userWalletAddress"></pre>
    <Navbar.Toggle aria-controls="responsive-navbar-nav"  className="ml-auto"/>
 
  </Navbar>
 
</div>
    )



}

export default NavBar;