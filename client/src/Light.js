import React from 'react';
import huejay from 'huejay';
import light from './Light';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
   
  }

 

  deconstruct(light, index) {
    var keys = Object.keys(light.state.attributes);
    return keys;
  }

  render() {
    if(this.state.client && this.state.lights) {
      //console.log(this.state.client);
      return (
        <div className="App">
          <header className="App-header">
            <h1>Foxwood Home Lighting</h1>
            {/* <h2>{this.state.lights[4].state.attributes.bri}</h2> */}
          </header>
          
          {this.state.lights.map((light, index) => {
            //console.log(light);
            <h2>Light Title</h2>
            this.deconstruct(light, index);
            return "";
          })}
          <footer>
            <p>Footer Stuff</p>
          </footer>
        </div>
      );
    } else {
      return <p>Getting client...</p>
    }
  }
}

export default App;