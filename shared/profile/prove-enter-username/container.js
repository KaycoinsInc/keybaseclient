// @flow
import * as ProfileGen from '../../actions/profile-gen'
import React, {Component} from 'react'
import ProveEnterUsername from '.'
import {connect} from '../../util/container'

type OwnProps = {||}

type State = {
  username: ?string,
}

class ProveEnterUsernameContainer extends Component<any, State> {
  state = {
    username: null,
  }

  render() {
    return (
      <ProveEnterUsername
        {...this.props}
        onUsernameChange={username => this.setState({username})}
        onContinue={() => this.props.onContinue(this.state.username)}
      />
    )
  }
}

const mapStateToProps = state => {
  const profile = state.profile

  if (!profile.platform) {
    throw new Error('No platform passed to prove enter username')
  }

  return {
    canContinue: true,
    errorCode: profile.errorCode,
    errorText: profile.errorText,
    platform: profile.platform,
    title: 'Add Proof',
    username: profile.username,
  }
}

const mapDispatchToProps = dispatch => ({
  _onContinue: (username: string, platform: ?string) => {
    dispatch(ProfileGen.createUpdateUsername({username}))

    if (platform === 'btc') {
      dispatch(ProfileGen.createSubmitBTCAddress())
    } else if (platform === 'zcash') {
      dispatch(ProfileGen.createSubmitZcashAddress())
    } else {
      dispatch(ProfileGen.createSubmitUsername())
    }
  },
  onLeftAction: () => dispatch(ProfileGen.createCancelAddProof()),
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  leftAction: 'cancel',
  onContinue: (username: string) => dispatchProps._onContinue(username, stateProps.platform),
})

export default connect<OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ProveEnterUsernameContainer)
