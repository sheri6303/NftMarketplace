import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateItem from './components/CreateItem';
import Home from './components/Home';
import MyAssets from './components/MyAssets';
import Dashboard from './components/Dashboard'
import Images from './components/Images'
import Audio from './components/Audios';
import Video from './components/Videos';
import Search from './components/Search'
import Favourite from './components/Favourite'
import Details from './components/SoldItemDetails';
import CreateItemDetails from './components/CreateItemDetails';
import SoldItemDetails from './components/SoldItemDetails';
function App() {
  return (

    <div className="App">
      
      <BrowserRouter>
        <div>
          <div className="content">
            <Navbar /> 
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/create" component={CreateItem} /> 
              <Route exact path="/myassets" component={MyAssets} /> 
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/images" component ={Images} />
              <Route exact path="/audios" component={Audio} /> 
              <Route exact path="/videos" component={Video} />
              <Route path="/search/:id" component={Search} />
              <Route path="/favourite" component={Favourite} />
              <Route path="/details/:id" component={SoldItemDetails} />
              <Route path="/CreateItemDetails/:id" component={CreateItemDetails} />


               </Switch>
          </div>
          </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
