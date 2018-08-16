import React from 'react';
import { Layout } from 'antd';
const { Footer } = Layout;

class GlobalFooter extends React.Component {
  render() {
    return (
      <Footer style={{background: '#f3f3f3', clear: 'both', textAlign: 'center'}}>
        功夫编程 KFCoding.com 2018
      </Footer>
    )
  }
}

export default GlobalFooter;
