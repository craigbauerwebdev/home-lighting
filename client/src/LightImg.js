import React from 'react';

class LightImg extends React.Component {

  render() {
    const {modelId} = this.props;
    return (
        <div className="light-img-wrap" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/huelights/${modelId}.jpg)`}}>
            {/* <img className="light-img" src={`${process.env.PUBLIC_URL}/img/huelights/${modelId}.jpg`} width="100%" /> */}
        </div>
    );
  }
}

export default LightImg;