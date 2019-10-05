import React from 'react';
import CSSModules from 'react-css-modules';
import { Icon, Tooltip } from 'antd';
import styles from './index.scss';
import { OmitProps } from 'antd/lib/transfer/renderListBody';

const Header = (props) => (
  <div styleName="header">
    博客后台管理系统
    {/* {
      props.blogId && 
      <Tooltip title="点击撰写新博客" placement="top">
        <Icon type="edit" styleName="edit" onClick={props.onCreate} />
      </Tooltip>
    } */}
  </div>
)
export default CSSModules(Header, styles)