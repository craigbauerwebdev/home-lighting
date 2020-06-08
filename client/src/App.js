import React from 'react';
import huejay from 'huejay';
import LightImg from './LightImg';
//import light from './Light';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null
    }
  }

  componentDidMount() {
    this.discoverBridge();
    /* huejay.discover({ strategy: 'nupnp' })
    .then(bridges => {
      console.log(bridges);
    });

    let client = new huejay.Client({
      host: '192.168.1.151',
      username: 'VXrzD-qFmUjuquQjgzX91EA2yIQFJiZYg0wSV5gN'
    });
    this.setState({
      client: client
    }); */
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
    /* this.getUserByName(client, 'VXrzD-qFmUjuquQjgzX91EA2yIQFJiZYg0wSV5gN');
    client.lights.getAll()
      .then(lights => {
        //console.log(lights);
        this.setState({ lights: lights });
        console.log(this.state.lights);
      });

    client.groups.getAll()
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

    client.scenes.getAll()
      .then(scenes => {
        for (let scene of scenes) {
          console.log(`Scene [${scene.id}]: ${scene.name}`);
          console.log('  Lights:', scene.lightIds.join(', '));
          console.log();
        }
      }); */
  }

  discoverBridge = () => {
    huejay.discover({ strategy: 'nupnp' })
      .then(bridges => {
        console.log(bridges);
        console.log(bridges[0].id, bridges[0].ip);
        this.createClient("VXrzD-qFmUjuquQjgzX91EA2yIQFJiZYg0wSV5gN", bridges[0].ip)
        /* this.setState({
          id: bridges[0].id,
          ip: bridges[0].ip
        }); */
        //this.createClient(bridges[0].id, bridges[0].ip)
        /* client.users.getAll()
          .then(users => {
            const user = users[0].username;
            this.createClient(user, bridges[0].ip)
          });  */
      });
  }

  createClient = (user, ip) => {
    let client = new huejay.Client({
      host: ip,//'192.168.1.151',
      username: user
    });
    this.setState({
      client: client
    });
    client.lights.getAll()
      .then(lights => {
        //console.log(lights);
        this.setState({ lights: lights });
        console.log(this.state.lights);
      });
    client.users.getAll()
      .then(users => {
        console.log(users);
      });
  }

  getUserByName(client, user) {
    /* Logs the user in the config file */
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

  getLights(light, index) {
    //make a component for light attributes
    const currentLight = <div className="light-wrap clearfix">
      <LightImg modelId={light.modelId} />
      <div className="light-meta">
        <h2>{light.attributes.attributes.name}</h2>
        <p><b>{light.modelId}</b></p>
        <p><b>{light.productId}</b></p>
        {Object.entries(light.state.attributes).map((entry, index) => {
          console.log(entry);
          return (
            <div>
              <span>{entry[0]}</span> : <span>{entry[1].toString()}</span>
            </div>
          );
        })}
      </div>
    </div>;
    /*

      map through the state entries and return each one with m,arkiup
      <div>{Object.entries(light.state.attributes)}<br /></div>
    </div>;
    console.log(Object.entries(light.state.attributes)); */
      
    return currentLight;
  }

  render() {
    if(this.state.client && this.state.lights) {
      //console.log(this.state.client);
      return (
        <div className="App">
          <header className="App-header clearfix">
            <h1 className="left">Foxwood Home Lighting</h1>
            <span onClick={this.discoverBridge} class="material-icons right reload">refresh</span>
            {/* <h2>{this.state.lights[4].state.attributes.bri}</h2> */}
          </header>
          
          {/* Routes */}
          {/* Move Lights to Lights Component */}
          {this.state.lights.map((light, index) => {
            console.log(light);
            return <div className="light-section">{this.getLights(light, index)}</div>;
          })}
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