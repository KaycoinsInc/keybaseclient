// @flow
import {connect} from '../../util/container'
import TabBar from '.'
import type {Tab} from '../../constants/tabs'
import * as ProfileGen from '../../actions/profile-gen'
import * as RouteTreeGen from '../../actions/route-tree-gen'

type OwnProps = {|
  selectedTab: Tab,
|}

const mapStateToProps = state => ({
  _badgeNumbers: state.notifications.get('navBadges'),
  isWalletsNew: state.chat2.isWalletsNew,
  username: state.config.username,
})

const mapDispatchToProps = dispatch => ({
  _onProfileClick: username => dispatch(ProfileGen.createShowUserProfile({username})),
  _onTabClick: tab => {
    dispatch(RouteTreeGen.createNavigateAppend({path: [tab]}))
  },
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  badgeNumbers: stateProps._badgeNumbers.toObject(),
  isNew: {
    // [walletsTab]: stateProps.isWalletsNew,
  },
  onProfileClick: () => dispatchProps._onProfileClick(stateProps.username),
  onTabClick: (tab: Tab) => dispatchProps._onTabClick(tab),
  selectedTab: ownProps.selectedTab,
  username: stateProps.username,
})

export default connect<OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TabBar)
