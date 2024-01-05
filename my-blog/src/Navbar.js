
import {Link} from 'react-router-dom';


const Navbar = () => {
   return (


      <nav class="navbar navbar-expand-md navbar-light nav" >
         <div class="container-xxl">


            <a href="#" class="navbar-brand">
               <span class="fw-bold text-white">
                  Aman
               </span>
            </a>


            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav"
               aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
            </button>


        
            <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
               <ul class="navbar-nav ">
                  <li class="nav-item text-start">
                     <Link class="nav-link m-0  text-white" to="/">Home</Link>
                  </li>
                  <li class="nav-item text-start">
                     <Link class="nav-link m-0 text-white" to="/aboutme">About me</Link>
                  </li>
                  <li class="nav-item text-start">
                     <Link class="nav-link m-0 text-white" to="/create">New blog</Link>
                  </li>
               
                


               </ul>
            </div>

         </div>
      </nav>


   )
}

export default Navbar;