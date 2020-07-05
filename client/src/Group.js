import React, { Fragment } from 'react';
//import { connect } from 'react-redux';
//import LightImg from './LightImg';
import { getAllGroups } from './redux/actions';

class Group extends React.Component {
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
    componentDidUpdate(prevProps) {
        //console.log("group updated");
        //console.log(prevProps, this.props);
        // update state when store is updated
        if (prevProps.attributes.on !== this.props.attributes.on) {
            this.setState({ groups: this.props.attributes.on })
        } else {
            console.log('props were the same');
        }
    }

  getGroup(id) {
      const { attributes, groupName } = this.props;
      const currentGroup = <div className="light-wrap clearfix">
          <div className="light-top clearfix">
             {/*  <LightImg key={id} modelId={modelId} /> */}
              <div className="light-meta">
                  <h2>{groupName}</h2>
                  {/* <p><b>{productId}</b></p> */}
                  {/* {Object.entries(attributes).map((entry, index) => {
                return (
                    <div>
                    <span>{entry[0]}</span> : <span>{entry[1].toString()}</span>
                    </div>
                );
                })} */}
              </div>
              {!this.state.on &&
                  <span onClick={(e) => this.updateGroupState(e, id, true)} name="on" className="material-icons toggle">toggle_off</span>
              }
              {this.state.on &&
                  <span onClick={(e) => this.updateGroupState(e, id, false)} name="off" className="material-icons toggle">toggle_on</span>
              }
          </div>
        </div>;
      return currentGroup;//currentLight;
      
    }

    updateGroupState = (e, id, groupState) => {
        e.persist();
        //console.log(e.target.value);
        this.props.client.groups.getById(id)
            .then(group => {
                console.log('success');
                group.on = groupState;
                return this.props.client.groups.save(group);
            })
            .then(() => {
                getAllGroups();
                this.setState({
                    on: groupState
                });
            })

            .catch(error => {
                console.log('Something went wrong');
                console.log(error.stack);
            });
    }
  /* handleSlide = (e, id) => {
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
  } */

  render() {
    const { id } = this.props;
    //console.log('Group Re-Rendered');
    return (
        <Fragment>
            <div className="group-section"><h1>{id}</h1>{this.getGroup(id)}</div>
        </Fragment>
    );
  }
}

/* const mapStateToProps = (state) => {
    console.log(state);
    return {
        storeClient: state.client,
        groups: state.allGroups
    }
} */

export default Group;
/* connect(
    mapStateToProps,
    { getAllGroups }
)(Group); */