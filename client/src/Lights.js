import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllLights77 } from './redux/actions';
import Light from './Light';

class Lights extends React.Component {
  componentDidMount = () => {
    this.props.getAllLights77(this.props.client); // get them directly from store. Rewire App & Lights component 
  }

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

const mapStateToProps = (state) => {
  return {
    allLights: state.allLights
  }
}

export default connect(
  mapStateToProps,
  { getAllLights77 }
)(Lights);