import React, { Fragment } from 'react';
import { Layout, Menu, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import { Link } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import { Route, Switch } from '../../node_modules/dva/router';
import { getRoutes } from '../utils/utils';
import NotFound from '../routes/Exception/404';
import Authorized from '../utils/Authorized';

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;
const { AuthorizedRoute } = Authorized;

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

@connect(({ menuList, loading }) => ({
  menuList,
  loading: loading.models.data,
}))
export default class LibraryLayout extends React.PureComponent {
  state = {
    isMobile,
    redirectData: [],
  };

  componentWillMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });

    const { dispatch } = this.props;
    dispatch({
      type: 'menuList/fetchMenuList',
    });
  }

  componentDidUpdate(nextProps) {
    const { menuList } = this.props;
    if (nextProps.menuList.data !== menuList.data) {
      this.startUpdateComponent();
    }
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = 'kfcoding-新一代交互式学习平台';
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - Ant Design Pro`;
    }
    return title;
  }

  startUpdateComponent() {
    const { menuList } = this.props;
    this.setState({ redirectData: menuList.data });
  }

  render() {
    const { currentUser, collapsed, fetchingNotices, notices, routerData, match } = this.props;
    const { redirectData } = this.state;
    const { isMobile: mb } = this.state;
    const siderBar = redirectData.map(Tag => {
      const linkTo = `/Library/${Tag.title}`;
      return (
        <Menu.Item key={Tag.id}>
          <Link to={linkTo}>{Tag.name}</Link>
        </Menu.Item>
      );
    });
    const layout = (
      <Layout>
        <GlobalHeader
          // logo={logo}
          currentUser={currentUser}
          fetchingNotices={fetchingNotices}
          notices={notices}
          collapsed={collapsed}
          isMobile={mb}
          onNoticeClear={this.handleNoticeClear}
          onCollapse={this.handleMenuCollapse}
          onMenuClick={this.handleMenuClick}
          onNoticeVisibleChange={this.handleNoticeVisibleChange}
        />
        <Layout>
          <Sider
            width={269.5}
            collapsed={false}
            defaultCollapsed={false}
            style={{ background: '#fff', borderRight: '1px solid #e8e8e8' }}
          >
            <Menu
              mode="inline"
              defaultOpenKeys={['library']}
              defaultSelectedKeys={['allbooks']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="library"
                title={
                  <span>
                    <Icon type="Library" />
                    <strong>功夫秘籍</strong>
                  </span>
                }
              >
                <Menu.Item key="allbooks">
                  <Link to="/library/allBooks">所有功夫秘籍</Link>
                </Menu.Item>
                {siderBar}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '10 ' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <Switch>
                {getRoutes(match.path, routerData).map(item => (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="/exception/403"
                  />
                ))}
                <Route render={NotFound} />
              </Switch>
            </Content>
            <Footer style={{ padding: 0 }}>
              <GlobalFooter
                copyright={
                  <Fragment>
                    Copyright <Icon type="copyright" />
                  </Fragment>
                }
              />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div>{layout}</div>
      </DocumentTitle>
    );
  }
}
