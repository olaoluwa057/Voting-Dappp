pragma solidity ^0.8.0;
// written for Solidity version 0.4.18 and above that doesnt break functionality

contract Election {
    // an event that is called whenever a Candidate is added so the frontend could
    // appropriately display the candidate with the right element id (it is used
    // to vote for the candidate, since it is one of arguments for the function "vote")
    event AddedCandidate(uint candidateID);

    // describes a Voter, which has an id and the ID of the candidate they voted for
    address owner;
   
   
    // describes a Candidate
    struct Candidate {
        string  name;
        string  party; 
        uint vote;
        // "bool doesExist" is to check if this Struct exists
        // This is so we can keep track of the candidates 
        bool doesExist; 
    }

    // These state variables are used keep track of the number of Candidates/Voters 
    // and used to as a way to index them     
    uint numCandidates = 0; // declares a state variable - number Of Candidates
    uint numVoters;

    
    // Think of these as a hash table, with the key as a uint and value of 
    // the struct Candidate/Voter. These mappings will be used in the majority
    // of our transactions/calls
    // These mappings will hold all the candidates and Voters respectively
    mapping (uint => Candidate) candidates;
    mapping(address => bool) newAdmin;
    mapping(address => mapping(uint => bool)) hasVotedFor;
    
    constructor () public {
        owner = msg.sender;
        newAdmin[msg.sender] = true;
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
function addAdmin (address _newOwner) public {
     require(msg.sender == owner, 'only owner can call this function'); 
    newAdmin[_newOwner] = true;
    
}

   function addCandidate(string memory name, string memory party)  public returns(uint) {
         require(newAdmin[msg.sender] == true, 'only authorized address can call this function'); 
        // candidateID is the return variable
         numCandidates = numCandidates + 1;
        uint candidateID = numCandidates;
        
        // Create new Candidate Struct with name and saves it to storage.
        candidates[candidateID] = Candidate(name,party,0,true);
      emit  AddedCandidate(candidateID);
       return candidateID;
    }

function vote(uint candidateID) public {
        // checks if the struct exists for that candidate
        require (candidates[candidateID].doesExist == true, 'candidate does not exist') ;
        require (hasVotedFor[msg.sender][candidateID] == false, 'You can not vote for a candidate twice');
            candidates[candidateID] =Candidate( candidates[candidateID].name,candidates[candidateID].party,candidates[candidateID].vote + 1,candidates[candidateID].doesExist);
            hasVotedFor[msg.sender][candidateID] = true;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * 
     *  Getter Functions, marked by the key word "view" *
     * * * * * * * * * * * * * * * * * * * * * * * * * */
    

    // finds the total amount of votes for a specific candidate by looping
    // through voters 
    function totalVotes(uint candidateID) view public returns (uint) {
       require (candidates[candidateID].doesExist == true, 'candidate does not exist') ;
       return candidates[candidateID].vote;
    }

    function getNumOfCandidates() public view returns(uint) {
        return numCandidates;
    }

    
    // returns candidate information, including its ID, name, and party
    function getCandidate(uint candidateID) public view returns (uint, string memory, string memory) {
        return (candidateID,candidates[candidateID].name,candidates[candidateID].party);
    }
}