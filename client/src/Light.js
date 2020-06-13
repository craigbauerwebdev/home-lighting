import React, { Fragment } from 'react';
import LightImg from './LightImg';

class Light extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        brightness: null,
        hue: null,
        saturation: null,
        ct: null,
        changing: null

    }
  }

  componentDidMount() {
    //console.log('mounted');
    const { attributes } = this.props;
    this.setState({
        on: attributes.on,
        brightness: attributes.bri,
        hue: attributes.hue,
        saturation: attributes.sat,
        ct: attributes.ct

    });
  }

  getLight = (id) => {
    const { modelId, name, productId, attributes } = this.props;
    //console.log(attributes);
    const currentLight = <div className="light-wrap clearfix">
        <div className="light-top clearfix">
            <LightImg key={id} modelId={modelId} />
            <div className="light-meta">
                <h2>{name}</h2>
                <p><b>Model: {modelId}</b></p>
                {/* <p><b>{productId}</b></p> */}
                {/* {Object.entries(attributes).map((entry, index) => {
                return (
                    <div>
                    <span>{entry[0]}</span> : <span>{entry[1].toString()}</span>
                    </div>
                );
                })} */}
            </div>
            {!attributes.on &&
                <span onClick={(e) => this.updateLightState(e, id, true)} name="on" className="material-icons toggle">toggle_off</span>
            }
            {attributes.on &&
                <span onClick={(e) => this.updateLightState(e, id, false)} name="off" className="material-icons toggle">toggle_on</span>
            }
        </div>
        <div className="controls">
           {/*  {!attributes.on &&
                <span onClick={(e) => this.updateLightState(e, id, true)} name="on" className="material-icons toggle">toggle_off</span>
            }
            {attributes.on &&
                <span onClick={(e) => this.updateLightState(e, id, false)} name="off" className="material-icons toggle">toggle_on</span>
            } */}
            <div className="slidecontainer">
                <p>Brightness</p>
                <input type="range" onChange={(e) => this.handleSlide(e, id)} min="1" max="254" value={this.state.brightness || ""} className="slider" name="brightness" id="brightness" />
            </div>
            {attributes.hue &&
                <div className="slidecontainer">
                    <p>Color</p>
                    <input type="range" onChange={(e) => this.handleSlideHue(e, id)} min="1" max="65535" value={this.state.hue || ""} className="slider" name="hue" id="hue" />
                </div>
            }
            {attributes.sat &&
                <div className="slidecontainer">
                    <p>Saturation</p>
                    <input type="range" onChange={(e) => this.handleSlideSat(e, id)} min="1" max="254" value={this.state.saturation || ""} className="slider" name="saturation" id="saturation" />
                </div>
            }
            {attributes.colormode === "ct" &&
                <div className="slidecontainer">
                    <p>Color Temperature</p>
                    <input type="range" onChange={(e) => this.handleSlideCT(e, id)} min="153" max="500" value={this.state.ct || ""} className="slider" name="ct" id="ct" />
                </div>
            }
        </div>
    </div>;
    return currentLight;
  }

  handleSlide = (e, id) => {
        e.persist();
        let obj = {};
        //console.log(e.target.name, e.target.value);
        obj[e.target.name] = e.target.value;
        this.setState(obj); //update state every time && then use state to update hue each second or 2
        if (!this.state.changing) {
            this.setState({ changing: true });
            setTimeout(() => {
                this.props.client.lights.getById(id)
                    .then(light => {
                        light.brightness = this.state.brightness;
                        return this.props.client.lights.save(light);
                    })
                    .then(light => {
                        console.log(`Updated light [${light.id}]`);
                        //this.props.discoverBridge();
                        this.props.getAllLights();
                    })
                    .catch(error => {
                        console.log('Something went wrong');
                        console.log(error.stack);
                    });
                this.setState({ changing: false });  
            }, 1000);
        }
    }
    handleSlideHue = (e, id) => {
        e.persist();
        let obj = {};
        //console.log(e.target.name, e.target.value);
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        if (!this.state.changing) {
            this.setState({ changing: true });
            setTimeout(() => {
                this.props.client.lights.getById(id)
                    .then(light => {
                        //if(e.target.value === 0) {
                            //e.target.value = 1;
                        //}
                        light.hue = this.state.hue;//e.target.value
                        return this.props.client.lights.save(light);
                    })
                    .then(light => {
                        console.log(`Updated light [${light.id}]`);
                        //this.props.discoverBridge();
                        this.props.getAllLights();
                    })
                    .catch(error => {
                        console.log('Something went wrong');
                        console.log(error.stack);
                    });
                this.setState({ changing: false });
            }, 1000);
        }
    }
    handleSlideSat = (e, id) => {            
        e.persist();
        let obj = {};
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        if (!this.state.changing) {
            this.setState({ changing: true });
            setTimeout(() => {
                this.props.client.lights.getById(id)
                    .then(light => {
                        light.saturation = e.target.value
                        return this.props.client.lights.save(light);
                    })
                    .then(light => {
                        console.log(`Updated light [${light.id}]`);
                        //this.props.discoverBridge();
                        this.props.getAllLights();
                    })
                    .catch(error => {
                        console.log('Something went wrong');
                        console.log(error.stack);
                    });
                this.setState({ changing: false });
            }, 1000);
        }
    }

    handleSlideCT = (e, id) => {
        e.persist();
        let obj = {};
        //console.log(e.target.name, e.target.value);
        obj[e.target.name] = e.target.value;
        this.setState(obj);
        if (!this.state.changing) {
            this.setState({ changing: true });
            setTimeout(() => {
                this.props.client.lights.getById(id)
                    .then(light => {
                        light.colorTemp = e.target.value
                        return this.props.client.lights.save(light);
                    })
                    .then(light => {
                        console.log(`Updated light [${light.id}]`);
                        //this.props.discoverBridge();
                        this.props.getAllLights();
                    })
                    .catch(error => {
                        console.log('Something went wrong');
                        console.log(error.stack);
                    });
                this.setState({ changing: false });
            }, 1000);
        }
    }

    updateLightState = (e, id, lightState) => {
        e.persist();
        //console.log(e.target.value);
        this.props.client.lights.getById(id)
            .then(light => {
                light.on = lightState;
              return this.props.client.lights.save(light);
          })
          .then(light => {
              console.log(`Updated light [${light.id}]`);
              //this.props.discoverBridge();
              this.props.getAllLights();
          })
          .catch(error => {
              console.log('Something went wrong');
              console.log(error.stack);
          });
  }

  render() {
    const { id, attributes } = this.props;
    return (
        <Fragment>
            <div>{this.getLight(id)}</div>
        </Fragment>
    );
  }
}

export default Light;