import React from 'react';
import { Menu } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

const { Item } = Menu;
const renderMenuItem = (data) => {
  return data.map(item => {
    return <Item key={item.blogId}>{item.blogTitle}</Item>
  })
}

const BlogMenu = (props) => {
  return (
    <Menu styleName="menu" onSelect={props.onSelect}>
      {renderMenuItem(props.blogList)}
    </Menu>
  )
}
export default CSSModules(BlogMenu, styles)