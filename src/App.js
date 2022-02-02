import './App.css';
import {
  BrowserRouter as Router, Route, Switch
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import Register from './Component/Register';
import CustomerEdit from './Component/CustomerEdit';
import Login from './Component/Login';
import CustomerView from './Component/CustomerView';
import ListCustomer from './Component/ListCustomer';
import Welcome from './Component/Welcome';
import Home from './Component/Home';
import Product from './Component/Product';
import ProductView from './Component/ProductView';
import UplodProductDetails from './Component/UploadProductDetails';
import AdminNavbar from './Layout/AdminNavbar';
import AdminHome from './Component/AdminHome';
import AddCategory from './Component/AddCategory';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <AdminNavbar /> */}
        <Switch>

          <Route exact={true} path="/" component={Home}></Route>

          <Route exact={true} path="/login" component={Login}></Route>

          <Route exact={true} path="/api" component={Register}></Route>

          <Route exact={true} path="/admin/home" component={AdminHome}></Route>

          <Route exact={true} path="/userlist" component={ListCustomer}></Route>

          <Route exact={true} path="/api/get/:id" component={CustomerView}></Route>

          <Route exact={true} path='/api/update/:id' component={CustomerEdit}></Route>

          <Route exact={true} path="/product" component={Product}></Route>

          <Route exact={true} path="/products/:id" component={ProductView}></Route>

          <Route exact={true} path="/admin/uploadproduct" component={UplodProductDetails}></Route>

          <Route exact={true} path="/admin/addcategory" component={AddCategory}></Route>

          <Route path="/welcome" component={Welcome}></Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;