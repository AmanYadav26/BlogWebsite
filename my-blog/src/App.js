
import './App.css';
import Navbar from './Navbar';
import Aboutme from './aboutme';
import Home from './Home ';
import Create from './create';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Blogdetails from './Blogdetails';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";


function App() {

  return (
     <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/aboutme">
               <Aboutme/>
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <Blogdetails />
            </Route>
          </Switch>
        </div>
      </div>
     </Router>
  );

}

export default App;
