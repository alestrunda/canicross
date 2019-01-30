import React from "react";
import { USER_TYPE } from "../settings";
import ProfileOwner from "./ProfileOwner";
import ProfileWalker from "./ProfileWalker";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Profile = props => {
  if (!props.userID) return <Redirect to={"/"} />;

  const user = props.users[props.userID];
  if (user.userType === USER_TYPE.OWNER) return <ProfileOwner {...props} />;
  if (user.userType === USER_TYPE.WALKER) return <ProfileWalker {...props} />;
};

const mapStateToProps = state => ({
  userID: state.app.currentUserID,
  users: state.users
});

export default connect(mapStateToProps)(Profile);
