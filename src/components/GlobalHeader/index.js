import React, { PureComponent } from 'react';
import { Menu, Icon, Tag, Tooltip, Button } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export default class GlobalHeader extends PureComponent {
  // componentWillUnmount() {
  //   this.triggerResizeEvent.cancel();
  // }

  getNoticeData() {
    const { notices } = this.props;
    if (notices == null || notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  render() {
    const { currentUser = {}, fetchingNotices, onNoticeVisibleChange, onNoticeClear } = this.props;
    // const menu = (
    //   <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
    //     <Menu.Item disabled>
    //       <Icon type="user" />个人中心
    //     </Menu.Item>
    //     <Menu.Item disabled>
    //       <Icon type="setting" />设置
    //     </Menu.Item>
    //     <Menu.Item key="triggerError">
    //       <Icon type="close-circle" />触发报错
    //     </Menu.Item>
    //     <Menu.Divider />
    //     <Menu.Item key="logout">
    //       <Icon type="logout" />退出登录
    //     </Menu.Item>
    //   </Menu>
    // );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img src="//static.cloudwarehub.com/logo-min.png?x-oss-process=style/logo" alt="" />
            功夫编程
          </Link>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['']}
          style={{ lineHeight: '64px', float: 'left' }}
        >
          <Menu.Item key="1">
            <Link to="/library/allBooks">
              <strong>功夫图书馆</strong>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/courses">
              <strong>高校版</strong>
            </Link>
          </Menu.Item>
        </Menu>

        <div className={styles.right}>
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title="使用文档">
            <a
              target="_blank"
              href="http://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          {currentUser.name ? (
            <NoticeIcon
              className={styles.action}
              count={currentUser.notifyCount}
              onItemClick={(item, tabProps) => {
                console.log(item, tabProps); // eslint-disable-line
              }}
              onClear={onNoticeClear}
              onPopupVisibleChange={onNoticeVisibleChange}
              loading={fetchingNotices}
              popupAlign={{ offset: [20, -16] }}
            >
              <NoticeIcon.Tab
                list={noticeData['通知']}
                title="通知"
                emptyText="你已查看所有通知"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
              />
              <NoticeIcon.Tab
                list={noticeData['消息']}
                title="消息"
                emptyText="您已读完所有消息"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
              />
              <NoticeIcon.Tab
                list={noticeData['待办']}
                title="待办"
                emptyText="你已完成所有待办"
                emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
              />
            </NoticeIcon>
          ) : (
            //   { currentUser.name ? (
            //   <Dropdown overlay={menu}>
            //   <span className={`${styles.action} ${styles.account}`}>
            //     <Avatar size="small" className={styles.avatar} src={currentUser.avatar}/>
            //     <span className={styles.name}>{currentUser.name}</span>
            //   </span>
            //   </Dropdown>
            // ) : (
            //   <Spin size="small" style={{ marginLeft: 8 }}/>
            // )}
            <span className={styles.action}>
              <Button type="primary" icon="github" size="large">
                登录
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}
