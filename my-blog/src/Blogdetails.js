import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Usefetch from "./fetch";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";


const Blogdetails = () => {
    const history=useHistory();
    const { id } = useParams();
    const Details = Usefetch('http://localhost:8000/blogs/' + id)
    
    const handleclick = () => {
        

        fetch('http://localhost:8000/blogs/'+ id,{
            method:"DELETE"
        }).then(()=>{
            history.push('/');
        })
    
    }

    
     
   


    return (
        <div className="blog-details">


            {
                Details && (

                    <div className="Details">
                        
                        <div className="background">
                            <h2 className="text-white ml-5">{Details.title}</h2>
                        </div>
                        
                        <div className="container mt-5">
                           
                            <div className="border-bottom border-2">
                            <h5 className="text-start fw-bold">{Details.title}</h5>
                            </div>
                         
                            <p className="text-start mt-4">{Details.body}</p>
                            <div className="text-start">
                            <button className="btn btn-secondary text-start" style={{"width":"fit-content"}} onClick={handleclick} >Delete</button>
                            </div>
                        </div>

                        
                       
                    </div>

                )

            }
            
        </div>
    );
}


export default Blogdetails;