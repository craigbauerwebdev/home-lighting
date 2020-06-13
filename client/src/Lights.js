import React, { Fragment } from 'react';
import Light from './Light';

class Lights extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {

    }
  } */

  getLights(light) {
    const { client, discoverBridge, getAllLights } = this.props;
    if(light.reachable) {
      return <Light id={light.id} key={`light=${light.id}`} modelId={light.modelId} name={light.name} productId={light.productId} attributes={light.state.attributes} client={client} discoverBridge={discoverBridge} getAllLights={getAllLights} />;
    }
    return null;
  }

  render() {
    console.log('reloaded');
    const { lights } = this.props;
    return (
      <Fragment>
        {lights.map((light) => {
          //console.log(light.id);
          return <div key={light.id} className="light-section">{this.getLights(light)}</div>;
        })}
      </Fragment>
    );
  }
}

export default Lights;