pragma solidity ^0.4.17;

contract Lottery {
    address public host;
    address[] public contestants;
    
    function Lottery() public {
        host = msg.sender;
    }
    function enter() public payable {
        require(msg.value > .01 ether);
        contestants.push(msg.sender);
    }
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, contestants));
    }
    
    function pickWinner() public {
        require(msg.sender == host);
        
        uint index = random() % contestants.length;
        contestants[index].transfer(this.balance);
        contestants= new address[](0);
    }
}   