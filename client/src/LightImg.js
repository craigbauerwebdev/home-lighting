import React from 'react';

class LightImg extends React.Component {

  render() {
    const {modelId} = this.props;
    return <img className="light-img" src={`${process.env.PUBLIC_URL}/img/huelights/${modelId}.jpg`} width="100%" />;
  }
}

export default LightImg;