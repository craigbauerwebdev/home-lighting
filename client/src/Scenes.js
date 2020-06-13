import React, { Fragment } from 'react';

class Scenes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }


  render() {
    //const { id, attributes } = this.props;
    return (
        <Fragment>
           {/*  <div>{this.getLight(id)}</div> */}
           <h1>Scenes Route</h1>
        </Fragment>
    );
  }
}

export default Scenes;