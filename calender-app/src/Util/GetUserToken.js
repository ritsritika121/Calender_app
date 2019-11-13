export default function() {
    let token = localStorage.getItem("JWTcalenderToken");
    // if (!token) {
    //     token = sessionStorage.getItem("JWTcalenderToken");
    // }
    return token;
}