import React, { Component} from 'react';
import { Button } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import BlogMenu from '../../components/BlogMenu'

@CSSModules(styles)
class Blog extends Component {
  render() {
    return (
      <div styleName="wrap">
        <div styleName="menu">
          <BlogMenu {...this.props} />
        </div>
        <div styleName="content">
          {/* {this.renderContent()} */}
        </div>
      </div>
    )
  }
}
export default Blog;