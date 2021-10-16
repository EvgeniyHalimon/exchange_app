import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CurrencyCourse from './components/CurrencyCourse';
import Chart from './components/Chart';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
          <Switch>
            <Route path="/" exact component={CurrencyCourse}/>
            <Route path="/chart" component={Chart}/>
          </Switch>
    </BrowserRouter>
  )
}

export default App;
