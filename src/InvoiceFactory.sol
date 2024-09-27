// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";

contract InvoiceFactory is Ownable {
    struct Invoice {
        uint256 id;
        address payable issuer;
        address payer;
        uint256 amount;
        bool paid;
        address token; // Address(0) indicates native token (e.g., ETH or MATIC)
        uint256 dueDate; // Unix timestamp of the due date
        bool canceled;
    }

    uint256 public invoiceCount;
    mapping(uint256 => Invoice) public invoices;
    mapping(address => uint256[]) public userInvoices; // Track user invoices
    mapping(address => uint256[]) public receivedInvoices; // Track received invoices
    mapping(address => bool) public approvedTokens; // Whitelisted tokens

    event InvoiceCreated(uint256 id, address issuer, address payer, uint256 amount, address token, uint256 dueDate);
    event InvoicePaid(uint256 id);
    event InvoiceCanceled(uint256 id);
    event TokenApproved(address token);

    constructor(address initialOwner) Ownable(initialOwner) {
        // Initially approve USDT on Ethereum and Polygon (replace with actual addresses)
        approvedTokens[0xdAC17F958D2ee523a2206206994597C13D831ec7] = true; // Ethereum USDT
        approvedTokens[0x3813e82e6f7098b9583FC0F33a962D02018B6803] = true; // Polygon USDT
    }

    function addApprovedToken(address _token) external onlyOwner {
        approvedTokens[_token] = true;
        emit TokenApproved(_token);
    }

    function createInvoice(address payable _issuer, address _payer, uint256 _amount, address _token, uint256 _dueDate) public onlyOwner {
        require(_token == address(0) || approvedTokens[_token], "Token not approved");
        invoiceCount++;
        invoices[invoiceCount] = Invoice(invoiceCount, _issuer, _payer, _amount, false, _token, _dueDate, false);
        userInvoices[_issuer].push(invoiceCount);
        receivedInvoices[_payer].push(invoiceCount);
        emit InvoiceCreated(invoiceCount, _issuer, _payer, _amount, _token, _dueDate);
    }

    function payInvoice(uint256 _id) external payable {
        Invoice storage invoice = invoices[_id];
        require(msg.sender == invoice.payer, "Only the specified payer can pay this invoice");
        require(!invoice.paid, "Invoice already paid");
        require(!invoice.canceled, "Invoice has been canceled");
        require(block.timestamp <= invoice.dueDate, "Invoice is overdue");

        if (invoice.token == address(0)) {
            // Handle native token payment
            require(msg.value == invoice.amount, "Incorrect amount sent");
            invoice.issuer.transfer(invoice.amount);
        } else {
            // Handle ERC20 token payment
            require(IERC20(invoice.token).balanceOf(msg.sender) >= invoice.amount, "Insufficient balance");
            require(IERC20(invoice.token).allowance(msg.sender, address(this)) >= invoice.amount, "Insufficient allowance");
            IERC20(invoice.token).transferFrom(msg.sender, invoice.issuer, invoice.amount);
        }

        invoice.paid = true;
        emit InvoicePaid(_id);
    }

    function cancelInvoice(uint256 _id) public onlyOwner {
        Invoice storage invoice = invoices[_id];
        require(!invoice.paid, "Invoice already paid");
        require(!invoice.canceled, "Invoice already canceled");
        require(block.timestamp > invoice.dueDate, "Invoice is not overdue yet");

        invoice.canceled = true;
        emit InvoiceCanceled(_id);
    }

    function getInvoicesByUser(address user) external view returns (uint256[] memory) {
        return userInvoices[user];
    }

    function getReceivedInvoicesByUser(address user) external view returns (uint256[] memory) {
        return receivedInvoices[user];
    }

    // Functions for Chainlink Automation
    function checkInvoices() public view returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = false;
        for (uint256 i = 1; i <= invoiceCount; i++) {
            if (!invoices[i].paid && !invoices[i].canceled && block.timestamp > invoices[i].dueDate) {
                upkeepNeeded = true;
                performData = abi.encode(i);
                break;
            }
        }
    }

    function processInvoice(uint256 _id) public {
        Invoice storage invoice = invoices[_id];
        require(!invoice.paid, "Invoice already paid");
        require(!invoice.canceled, "Invoice already canceled");
        require(block.timestamp > invoice.dueDate, "Invoice is not overdue yet");

        invoice.canceled = true;
        emit InvoiceCanceled(_id);
    }
}
