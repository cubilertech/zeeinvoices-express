exports.incrementInvoiceId = (invoiceId) => {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Valid characters
    const base = charset.length;
    
    // Convert invoice ID into an array for easier manipulation
    let invoiceArray = invoiceId.split('');
    
    // Start from the last character and work backwards
    for (let i = invoiceArray.length - 1; i >= 0; i--) {
        const currentChar = invoiceArray[i];
        const currentIndex = charset.indexOf(currentChar);
        
        // If current char is found in the charset, increment it
        if (currentIndex !== -1) {
            const nextIndex = (currentIndex + 1) % base;
            invoiceArray[i] = charset[nextIndex];

            // If we don't need to carry over, stop here
            if (nextIndex !== 0) {
                break;
            }
        }
    }

    // Join the array back into a string and return the new invoice ID
    return invoiceArray.join('');
}