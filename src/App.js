import logo from './logo.svg';
import './App.css';
import BasicTable from '../src/Componenets/tableUser'
import AddUser from '../src/Componenets/AddUser'
import User from '../src/Componenets/User'



import { Switch, Route, Link,BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
    Pagination-Search-Axios-React-Js By  Mansour 
    <BrowserRouter>
<Switch>
   <Route exact path={["/", "/tutorials"]} component={BasicTable} />
          <Route exact path={["/", "/tutorials"]} component={BasicTable} />
           <Route exact path="/add" component={AddUser} /> 
          <Route path="/users/:id" component={BasicTable} />
          <Route path="/user/:id" component={User} />
        
        </Switch>
       </BrowserRouter>
    </div>
  );
}

export default App;
