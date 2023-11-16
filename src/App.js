import { BrowserRouter, Switch, Route } from 'react-router-dom';

// page component
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Recipe from './pages/recipe/Recipe'
import Search from './pages/search/Search'

// style component
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/create" exact>
            <Create />
          </Route>
          <Route path="/create/:id" exact>
            <Create />
          </Route>
          <Route path="/search" exact>
            <Search />
          </Route>
          <Route path="/recipe/:id" exact>
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
