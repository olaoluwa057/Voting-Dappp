# Decentralized election

An Election Dapp.

## Introduction 

Decentralizes election is a voting Dapp built on Ethereum were user can vote for election candidate. 

### `Functions`

#### wallet Connection

Users can connect to this Dapp by using a web3 enabled browser. This Dapp also support web3modal  which gives users options when it comes to connecting top the Dapp. 

### Add Candidate Function

This function takes in two Parameter, the candidate name and Party. Upon the function call a candidate Id is generated which is equivalent to the number the candidate falls, that is the first candidate that was added will have a candidate Id of one.

### addAdmin function

This Function allows the msg.sender to permit an address to act likewise, this function allows the set address call the addCandidate function.  

### vote

This function allows user to vote for there favoured candidate using the candidate Id. Note that each address can only call this function once for each candidate. 

### totalVotes

This function allows to view the total votes for each candidate.

### getNumOfCandidates

This function allows user to get the total number of candidate in an election. 

### getCandidate

This function allows user to get details of each candidates

