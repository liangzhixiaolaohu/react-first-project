import React, { Component } from 'react';
import { connect } from 'dva';
import BasicLayout from '../../components/Layout/BasicLayout';


class Show extends Component {
  state = {}
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchUser',
    });
  }
  render() {
    const user = this.props;
    console.log(user)
    return (
      <BasicLayout>
        <div>
          <span>123</span>
          <span>{user.user.item.nickname}</span>
        </div>
      </BasicLayout>
    );
  }
}

export default connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))(Show);
