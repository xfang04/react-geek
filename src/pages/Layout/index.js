import { Layout, Menu, Popconfirm } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUserInfo, fetchUserInfo } from "@/store/modules/user";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/home",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onMenuClick = (route) => {
    navigate(route.key);
  };
  let selectedKey = location.pathname;
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.userInfo.name);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const onConfirm = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            onClick={onMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
