import React from 'react';
import huejay from 'huejay';
import Lights from './Lights';

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
    this.setState({
      client: client
    });
    client.lights.getAll()
      .then(lights => {
        //console.log(lights);
        this.setState({ lights: lights });
        //console.log(this.state.lights);
      });
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

    this.state.client.groups.getAll()
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
          <header className="App-header clearfix">
            <h1 className="left">Foxwood Home Lighting</h1>
            <span onClick={this.discoverBridge} className="material-icons right reload">refresh</span>
            <span onClick={this.discoverBridge} className="material-icons right reload">emoji_objects</span>
            <span onClick={this.discoverBridge} className="material-icons right reload">group_work</span>
            <span onClick={this.discoverBridge} className="material-icons right reload">settings_brightness</span>

            {/* <h2>{this.state.lights[4].state.attributes.bri}</h2> */}
          </header>
          <Lights lights={this.state.lights} client={this.state.client} discoverBridge={this.discoverBridge} />
          {/* Routes */}
          <footer>
            <p>Footer Stuff</p>
          </footer>
        </div>
      );
    } else {
      return <p>loading</p>
    }
  }
}

export default App;