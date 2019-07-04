import React from 'react';
import { Menu } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

const { Item } = Menu;
const renderMenuItem = (data) => {
  return data.map(item => {
    return <Item key={item.blogId}>{item.blogName}</Item>
  })
}

const BlogMenu = (props) => {
  const menuData = [{
    blogId: '122',
    blogName: '博客1'
  }, {
    blogId: '3434',
    blogName: '博客2'
  }, {
    blogId: '655',
    blogName: '博客3'
  }, {
    blogId: '505',
    blogName: '博客4'
  }, {
    blogId: '545',
    blogName: '博客5'
  }, {
    blogId: '542',
    blogName: '博客6'
  }, {
    blogId: '326',
    blogName: '博客7'
  }]
  return (
    <Menu styleName="menu">
      {renderMenuItem(menuData)}
    </Menu>
  )
}
export default CSSModules(BlogMenu, styles)