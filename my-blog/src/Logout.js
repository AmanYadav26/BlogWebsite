import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Logout = () => {
    const history=useHistory();
    localStorage.removeItem('jwtToken')
    history.push('/login');
}
 
export default Logout;