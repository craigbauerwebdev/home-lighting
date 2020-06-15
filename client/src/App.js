import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import huejay from 'huejay';
import Lights from './Lights';
import Groups from './Groups';
import Scenes from './Scenes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null
    }
  }

  componentDidMount = () => {
    this.discoverBridge();

    
   /*  client.users.getAll()
      .then(users => {
        for (let user of users) {
          console.log(`Username: ${user.username}`);
          console.log('Device type:', user.deviceType);
          console.log('Create date:', user.created);
          console.log('Last use date:', user.lastUsed);
          console.log('-----------------------------');
        }
      }); */
   /*  
    this.state.client.groups.getAll()
      .then(groups => {
        for (let group of groups) {
          console.log(`Group [${group.id}]: ${group.name}`);
          console.log(`  Type: ${group.type}`);
          console.log(`  Class: ${group.class}`);
          console.log('  Light Ids: ' + group.lightIds.join(', '));
          console.log('  State:');
          console.log(`    Any on:     ${group.anyOn}`);
          console.log(`    All on:     ${group.allOn}`);
          console.log('  Action:');
          console.log(`    On:         ${group.on}`);
          console.log(`    Brightness: ${group.brightness}`);
          console.log(`    Color mode: ${group.colorMode}`);
          console.log(`    Hue:        ${group.hue}`);
          console.log(`    Saturation: ${group.saturation}`);
          //console.log(`    X/Y:        ${group.xy[0]}, ${group.xy[1]}`);
          console.log(`    Color Temp: ${group.colorTemp}`);
          console.log(`    Alert:      ${group.alert}`);
          console.log(`    Effect:     ${group.effect}`);

          if (group.modelId !== undefined) {
            console.log(`  Model Id: ${group.modelId}`);
            console.log(`  Unique Id: ${group.uniqueId}`);
            console.log('  Model:');
            console.log(`    Id:           ${group.model.id}`);
            console.log(`    Manufacturer: ${group.model.manufacturer}`);
            console.log(`    Name:         ${group.model.name}`);
            console.log(`    Type:         ${group.model.type}`);
          }

          console.log();
        }
      });
      */
/*
    client.scenes.getAll()
      .then(scenes => {
        for (let scene of scenes) {
          console.log(`Scene [${scene.id}]: ${scene.name}`);
          console.log('  Lights:', scene.lightIds.join(', '));
          console.log();
        }
      });
      */
  }

  discoverBridge = () => {
    huejay.discover({ strategy: 'nupnp' })
      .then(bridges => {
        this.createClient(process.env.REACT_APP_HUE_USER, bridges[0].ip);
      });
  }

  createClient = (user, ip) => {
    let client = new huejay.Client({
      host: ip,
      username: user
    });
    //call action creator to client to store
    this.setState({
      client: client
    });

    // create functions for each group
    /* client.lights.getAll()
      .then(lights => {
        //console.log(lights);
        this.setState({ lights: lights });
        //console.log(this.state.lights);
      }); */

    this.getAllLights();

    client.users.getAll()
      .then(users => {
        console.log(users);
      });
    client.scenes.getAll()
      .then(scenes => {
        this.setState({
          scenes: scenes
        });
        for (let scene of scenes) {
          console.log(`Scene [${scene.id}]: ${scene.name}`);
          console.log('  Lights:', scene.lightIds.join(', '));
          console.log('-----------------');
        }
      });

    client.groups.getAll()
      .then(groups => {
        this.setState({
          groups: groups
        });
        for (let group of groups) {
          console.log(`Group [${group.id}]: ${group.name}`);
          console.log(`  Type: ${group.type}`);
          console.log(`  Class: ${group.class}`);
          console.log('  Light Ids: ' + group.lightIds.join(', '));
          console.log('  State:');
          console.log(`    Any on:     ${group.anyOn}`);
          console.log(`    All on:     ${group.allOn}`);
          console.log('  Action:');
          console.log(`    On:         ${group.on}`);
          console.log(`    Brightness: ${group.brightness}`);
          console.log(`    Color mode: ${group.colorMode}`);
          console.log(`    Hue:        ${group.hue}`);
          console.log(`    Saturation: ${group.saturation}`);
          //console.log(`    X/Y:        ${group.xy[0]}, ${group.xy[1]}`);
          console.log(`    Color Temp: ${group.colorTemp}`);
          console.log(`    Alert:      ${group.alert}`);
          console.log(`    Effect:     ${group.effect}`);

          if (group.modelId !== undefined) {
            console.log(`  Model Id: ${group.modelId}`);
            console.log(`  Unique Id: ${group.uniqueId}`);
            console.log('  Model:');
            console.log(`    Id:           ${group.model.id}`);
            console.log(`    Manufacturer: ${group.model.manufacturer}`);
            console.log(`    Name:         ${group.model.name}`);
            console.log(`    Type:         ${group.model.type}`);
          }

          console.log();
        }
      });
  }

  getAllLights = () => {
    //call action creator to add lights to store
    this.state.client.lights.getAll()
      .then(lights => {
        this.setState({ lights: lights });
      });
  }

  getUserByName(client, user) {
    client.users.getByUsername(user)
      .then(user => {
        const prefix = user.attributes.attributes;
        console.log(user);
        console.log(prefix.name);
        console.log(`Current User: ${user.username}`);
      })
      .catch(error => {
        console.log(error.stack);
      });
  }

  render() {
    if(this.state.client && this.state.lights) {
      //console.log(this.state.client);
      return (
        <div className="App">
          <Router>
            <header className="App-header clearfix">
              <img src="./img/fw-logo.png" height="60" />
              <div className="navigation">
                <span onClick={this.getAllLights} className="material-icons right reload">refresh</span>
                <Link to="/lights">
                  <span className="material-icons right">emoji_objects</span>
                </Link>
                <Link to="/groups">
                  <span className="material-icons right">group_work</span>
                </Link>
                <Link to="/scenes">
                  <span className="material-icons right">settings_brightness</span>
                </Link>
                <Link to="/">
                  <span className="material-icons right">home</span>
                </Link>
              </div>
              {/* <h2>{this.state.lights[4].state.attributes.bri}</h2> */}
            </header>
            <Switch>
              <Route exact path="/">
                <h1>Home Route</h1>
              </Route>
              <Route path="/lights">
                <Lights lights={this.state.lights} client={this.state.client} discoverBridge={this.discoverBridge} getAllLights={this.getAllLights} />
              </Route>
              <Route path="/groups">
                <Groups />
              </Route>
              <Route path="/scenes">
                <Scenes />
              </Route>
            </Switch>
            {/* Routes */}
            <footer>
              <p>Footer Stuff</p>
            </footer>
          </Router>
        </div>
      );
    } else {
      return(
        <div className="splash-page">
          <div className="logo-lg-wrap">
            <img src="./img/fw-logo-lg.png" />
            <div className="loader-wrap center">
              <div className="loader"></div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App;