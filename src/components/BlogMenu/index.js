import React, { Fragment, useState } from 'react';
import { Menu, Icon, Button } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import defaultMenu from './config';

const { Item, SubMenu } = Menu;

const BlogMenu = (props) => {

  const { blogList } = props;
  defaultMenu[0].children = blogList;

  const renderMenuItem = (data) => {
    return data && Array.isArray(data) && data.map(item => {
      if (item.children && Array.isArray(item.children) && item.children.length) {
        return data.map(item => (
          <SubMenu
            key={item.key}
            icon={item.icon}
            title={
              <span>
                <Icon type="file-markdown" />
                <span>{item.label}</span>
              </span>
            }
          >
            {renderMenuItem(item.children)}
          </SubMenu>
        ))
      }
      return (
        <Item key={item.key} icon={item.icon}>
          {item.icon}
          <span>{item.label}</span>
        </Item>
      )
    })
  }
  console.log('defaultMenu:', defaultMenu);
  
  return (
    <Fragment>
      <Menu
        mode="inline"
        theme="dark"
        styleName="menu"
        onSelect={props.onSelect}
        selectedKeys={props.selectedKeys}
        // inlineCollapsed={collapsed}
      >
        {renderMenuItem(defaultMenu)}
      </Menu>
    </Fragment>
  )
}
export default CSSModules(BlogMenu, styles)