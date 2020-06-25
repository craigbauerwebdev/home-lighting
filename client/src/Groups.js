import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllGroups } from './redux/actions';
import Group from './Group';

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
    console.log("groups updated");
    // update state when store is updated
    if (prevProps.groups !== this.props.groups) {
      this.setState({ groups: this.props.groups });
      //this.props.getAllGroups(this.props.storeClient);
    }
  }

  getAllGroupsAction() {
    console.log('calling action creator');
    this.props.getAllGroups(this.props.storeClient);
  }

  getGroups = (group) => {
    //console.log(group);
    const currentGroup =
      <Group id={group.id} client={this.props.storeClient} attributes={group.action.attributes} groupName={group.name} getAllGroupsAction={this.getAllGroupsAction} />;
    return currentGroup;
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
           <h1>Groups</h1>
           {/* Loop through groups */}
           {this.state.groups &&
            this.state.groups.map((group) => {
              return <div key={group.id} className="group-section">{this.getGroups(group)}</div>;
              /* Create Group route and pass in info like lights */
            })
           }
           
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    storeClient: state.client,
    groups: state.allGroups
  }
}

export default connect(
  mapStateToProps,
  { getAllGroups }
)(Groups);