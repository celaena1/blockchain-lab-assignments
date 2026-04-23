// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleDAO {
    struct Proposal {
        uint256 id;
        string description;
        uint256 voteCount;
        uint256 deadline;
        bool executed;
    }

    address public admin;
    uint256 public proposalCount;

    mapping(address => bool) public members;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event MemberAdded(address indexed member);
    event ProposalCreated(uint256 indexed proposalId, string description, uint256 deadline);
    event Voted(uint256 indexed proposalId, address indexed voter);
    event ProposalExecuted(uint256 indexed proposalId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "Only DAO members can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        members[msg.sender] = true;
        emit MemberAdded(msg.sender);
    }

    function addMember(address member) external onlyAdmin {
        require(member != address(0), "Invalid address");
        require(!members[member], "Member already exists");
        members[member] = true;
        emit MemberAdded(member);
    }

    function createProposal(string memory description, uint256 durationInSeconds)
        external
        onlyMember
    {
        require(bytes(description).length > 0, "Description required");
        require(durationInSeconds > 0, "Duration must be greater than zero");

        proposalCount++;

        proposals[proposalCount] = Proposal({
            id: proposalCount,
            description: description,
            voteCount: 0,
            deadline: block.timestamp + durationInSeconds,
            executed: false
        });

        emit ProposalCreated(proposalCount, description, block.timestamp + durationInSeconds);
    }

    function vote(uint256 proposalId) external onlyMember {
        Proposal storage proposal = proposals[proposalId];

        require(proposal.id != 0, "Proposal does not exist");
        require(block.timestamp <= proposal.deadline, "Voting deadline passed");
        require(!hasVoted[proposalId][msg.sender], "Member already voted");

        hasVoted[proposalId][msg.sender] = true;
        proposal.voteCount++;

        emit Voted(proposalId, msg.sender);
    }

    function executeProposal(uint256 proposalId) external onlyAdmin {
        Proposal storage proposal = proposals[proposalId];

        require(proposal.id != 0, "Proposal does not exist");
        require(block.timestamp > proposal.deadline, "Voting still active");
        require(!proposal.executed, "Proposal already executed");

        proposal.executed = true;

        emit ProposalExecuted(proposalId);
    }

    function getProposal(uint256 proposalId)
        external
        view
        returns (
            uint256 id,
            string memory description,
            uint256 voteCount,
            uint256 deadline,
            bool executed
        )
    {
        Proposal memory proposal = proposals[proposalId];
        return (proposal.id, proposal.description, proposal.voteCount, proposal.deadline, proposal.executed);
    }
}
