import React from 'react';
// import styles from './BasicLayout.css';

export default class BasicLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div>BasicLayout Head</div>
        <div>{children}</div>
        <div>BasicLayout foot</div>
      </div>
    );
  }
}
