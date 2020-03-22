import React from 'react';
import CSSModules from 'react-css-modules';
import { Tooltip } from 'antd';
import { getCookie } from '@/utils/cookie';
import styles from './index.scss';

const Header = (props) => (
  <div styleName="header">
    博客后台管理系统
    <div className={styles.right}>
      <span>{JSON.parse(getCookie('userInfo')).name}</span>
     </div>
  </div>
)
export default CSSModules(Header, styles)