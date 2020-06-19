import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllGroups } from './redux/actions';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // set initial state here
    this.props.getAllGroups(this.props.storeClient);
  }

  componentDidUpdate(prevProps) {
    // update state when store is updated
    if (prevProps.groups !== this.props.groups) {
      this.setState({ groups: this.props.groups })
    }
  }

  log(group) {
    console.log(group);
  }

  // in group component - 
  //   onChange /sec update state
  //   get group by id - update attribute and save group
  //   call action creator to update group

  render() {
    //const { id, attributes } = this.props;
    return (
        <Fragment>
           {/*  <div>{this.getLight(id)}</div> */}
           <h1>Groups Route</h1>
           {/* Loop through groups */}
           {this.props.groups &&
            this.props.groups.map((group) => {
              this.log(group);
              return <p key={group}>group!!!_!!!</p>;
              /* Create Group route and pass in info like lights */
            })
           }
           
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storeClient: state.client,
    groups: state.allGroups
  }
}

export default connect(
  mapStateToProps,
  { getAllGroups }
)(Groups);