import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Create = () => {
    const [title,settitle]=useState('');
    const[date,setdate]=useState('');
    const [body,setbody]=useState('');
    const history=useHistory();


    const handlesubmit = (e) => {
        e.preventDefault();
        const blog={title,date,body};
       
        fetch('http://localhost:8000/blogs',{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(blog)
        }).then(()=>{
            history.push('/');
        })


        
    }
     
    return ( 
          
       


       
        <div>
       
        <section id="contact">
        <div class="container-lg">
            <div class="text-center">
                <h2>Add a New Blog</h2>
                
            </div>

            <div class="row justify-content-center my-5" style={{"width":"100vw"}}>

                <div class="col-lg-6">
                    <form action="" onSubmit={handlesubmit}>

                        <label for="Title" class="form-label">Title:</label>
                        <input type="Title" id="date" class="form-control" placeholder="eg.Day6" required value={title}
                        onChange={(e)=> settitle(e.target.value)}/>
                            

                        <label for="Text" class="form-label">Date:</label>
                      <input type="Text" id="Name" class="form-control" placeholder="eg.July 24,2023" required value={date}
                      onChange={(e)=> setdate(e.target.value)}/>
                            
                      

                        <div class="form-floating mt-5 mb-4">
                            <textarea id="query" class="form-control" style={{"height": "140px"}} required value={body}
                            onChange={(e)=> setbody(e.target.value)}>

                            </textarea>
                            <label class="form-label">Blog body..</label>
                        </div>


                        <div class="text-center mb-4">
                            <button class="btn btn-secondary">Add Blog</button>
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>
    </section>






        </div>




     );
}
 
export default Create;