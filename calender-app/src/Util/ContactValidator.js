export default function (contact) {
    
    if (!contact) {
        return {isValid: false, errMsg: "Please enter your contact number." };
    }
    if (contact) {
        if (!contact.match(/^[0-9]{8,14}$/)) {
            return {isValid: false, errMsg: "Please enter a valid contact number."};
        } 
    }
    return { isValid: true };
}