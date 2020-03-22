import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';
import defaultMenu from './config';

const { Item, SubMenu } = Menu;

const BlogMenu = ({
  location: {
    pathname
  }
}) => {
  console.log('pathname:', pathname)
  const renderMenuItem = (data) => {
    return data && Array.isArray(data) && data.map(item => {
      if (item.children && Array.isArray(item.children) && item.children.length) {
        return data.map((item) => (
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
          <Link style={{ display: 'inline-block' }} to={item.key}>
            <span>{item.label}</span>
          </Link>
        </Item>
      )
    })
  }
  return (
    <Fragment>
      <Menu
        mode="inline"
        theme="dark"
        styleName="menu"
        selectedKeys={pathname}
      >
        {renderMenuItem(defaultMenu)}
      </Menu>
    </Fragment>
  )
}
export default CSSModules(BlogMenu, styles)