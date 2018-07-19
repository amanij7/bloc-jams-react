import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album'
import './index.css';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <nav className="nav-bar">
         <Link to='/' className="link">Landing</Link>
         <span> | </span>
         <Link to='/Library' className="link">Library</Link>
        </nav>
          <h1 className="title"> Bloc Jams</h1>
        </header>
        <p className="App-intro">
        </p>
          <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
          </main>
      </div>
    );
  }
}

export default App;
