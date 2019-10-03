import React from 'react';
import { Tabs } from 'antd';
import CSSModules from 'react-css-modules';
import styles from './index.scss';

const { TabPane } = Tabs;
const DynamicTabs = (props) => {
  const { tabs, activeKey } = props;
  const type = tabs.length > 1 ? 'editable-card' : 'card'
  const renderTab = (title) => (
    <div title={title} styleName="tab">{title}</div>
  )
  const handleEdit = (targetKey) => {
    let findIndex = 0;
    tabs.find((item, index) => {
      if (item.id === targetKey) {
        findIndex = index;
      }
    })
    tabs.splice(findIndex, 1);
    props.onDump({
      tabs,
    })
    findIndex -= 1;
    if (findIndex < 0) {
      findIndex = 0;
    } else if (tabs.length === 1) {
      findIndex = 0;
    }
    let selectedId = tabs[findIndex].id;
    if (targetKey !== activeKey) {
      selectedId = activeKey;
    }
    props.onChange(selectedId);
  }

  return (
    <div styleName="tabs-wrap">
      {tabs.length ? <Tabs 
        hideAdd={true}
        type={type}
        activeKey={activeKey}
        onChange={props.onChange}
        onEdit={handleEdit}
      >
        {tabs.map(tab => (
          <TabPane tab={renderTab(tab.title)} key={tab.id}>
            {/* {tab.title} */}
          </TabPane>
        ))}
      </Tabs> 
      :
      null
      }
    </div>
  )
}

export default CSSModules(DynamicTabs, styles)