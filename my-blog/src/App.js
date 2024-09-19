import "./App.css";
import Navbar from "./Navbar";
// import Aboutme from './aboutme';
import Home from "./Home ";
// import Create from './create';
import CreateBlog from "./createblog.js";
import Main from "./main.js";
import Blogdetails from "./Blogdetails";
import Register from "./register.js";
import EditPost from "./EditPost.js";
import Aboutus from "./about.js";
import Login from "./Login.js";
import Logout from "./Logout.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/about">
              <Aboutus/>
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/editpost">
             <EditPost/>
            </Route>
            <Route exact path="/create">
              <CreateBlog />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route path="/posts/:id">
              <Blogdetails />
            </Route>
            <Route exact path="/Home">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
