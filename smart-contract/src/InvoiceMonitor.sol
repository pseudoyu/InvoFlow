// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../lib/chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "./InvoiceFactory.sol";

contract InvoiceMonitor is AutomationCompatibleInterface {
    InvoiceFactory public invoiceFactory;

    constructor(address _invoiceFactory) {
        invoiceFactory = InvoiceFactory(_invoiceFactory);
    }

    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory performData) {
        // Check if there are any invoices that need processing
        (upkeepNeeded, performData) = invoiceFactory.checkInvoices();
    }

    function performUpkeep(bytes calldata performData) external override {
        // Decode the invoice ID from the performData
        uint256 invoiceId = abi.decode(performData, (uint256));
        // Process the invoice
        invoiceFactory.processInvoice(invoiceId);
    }
}
