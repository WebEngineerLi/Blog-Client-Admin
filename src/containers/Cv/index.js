import React from 'react';
import { Form } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

const Cv = (props) => {
  return (
    <div styleName="wrap">
      <Form>
        <Form.Item label="个人信息" />
        <Form.Item label="个">

        </Form.Item>
      </Form>
    </div>
  )
}

export default CSSModules(Cv, styles);