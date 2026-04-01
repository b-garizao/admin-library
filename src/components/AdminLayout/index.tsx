import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: MenuItem[];
}

interface AdminLayoutProps {
  menu: MenuItem[];
  onLogout: () => void;
  children: ReactNode;
  onMenuClick?: (key: string, path?: string) => void;
}

interface AdminLayoutContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const AdminLayoutContext = createContext<AdminLayoutContextType>({
  collapsed: false,
  setCollapsed: () => {},
});

export const useAdminLayout = () => useContext(AdminLayoutContext);

const AdminLayout: React.FC<AdminLayoutProps> = ({
  menu,
  onLogout,
  children,
  onMenuClick,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSelectedKeys = () => {
    const path = location.pathname;
    for (const item of menu) {
      if (item.path === path) return [item.key];
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return [child.key];
        }
      }
    }
    return ['dashboard'];
  };

  const getOpenKeys = () => {
    const path = location.pathname;
    for (const item of menu) {
      if (item.children) {
        for (const child of item.children) {
          if (child.path === path) return [item.key];
        }
      }
    }
    return [];
  };

  const menuItems: MenuProps['items'] = menu.map((item) => {
    if (item.children) {
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
        children: item.children.map((child) => ({
          key: child.key,
          icon: child.icon,
          label: child.label,
        })),
      };
    }
    return {
      key: item.key,
      icon: item.icon,
      label: item.label,
    };
  });

  const findMenuItem = (items: MenuItem[], key: string): MenuItem | undefined => {
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children) {
        const found = findMenuItem(item.children, key);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleMenuClick: MenuProps['onClick'] = (info) => {
    const clickedItem = findMenuItem(menu, info.key);
    if (clickedItem?.path) {
      navigate(clickedItem.path);
    }
    if (onMenuClick) {
      onMenuClick(info.key, clickedItem?.path);
    }
  };

  const siderWidth = collapsed ? 80 : 260;
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AdminLayoutContext.Provider value={{ collapsed, setCollapsed }}>
      <Layout style={{ minHeight: '100vh' }} className="admin-layout">
        <style>{`
          .admin-layout {
            overflow-x: hidden;
          }
          .admin-layout * {
            max-width: 100%;
          }
          .admin-layout .ant-card {
            overflow: hidden;
          }
          .media-preview-container {
            max-width: 300px;
            max-height: 250px;
            overflow: hidden;
            border-radius: 4px;
          }
          .media-preview-responsive {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
          }
          
          /* Tabs responsive */
          .admin-layout .ant-tabs-nav {
            flex-wrap: nowrap;
            overflow-x: auto;
          }
          .admin-layout .ant-tabs-nav::-webkit-scrollbar {
            display: none;
          }
          .admin-layout .ant-tabs-tab {
            padding: 8px 12px !important;
            font-size: 12px;
            white-space: nowrap;
            flex-shrink: 0;
          }
          .admin-layout .ant-tabs-content-holder {
            overflow-x: auto;
          }
          
          /* Form responsive */
          .admin-layout .ant-form-item-label {
            padding-bottom: 4px;
          }
          .admin-layout .ant-form-item-label > label {
            font-size: 12px;
          }
          .admin-layout .ant-input,
          .admin-layout .ant-input-textarea textarea,
          .admin-layout .ant-select-selector {
            font-size: 14px;
          }
          
          /* Cards */
          .admin-layout .ant-card-head {
            padding: 12px 16px;
            min-height: auto;
          }
          .admin-layout .ant-card-head-title {
            font-size: 14px;
          }
          .admin-layout .ant-card-body {
            padding: 16px;
          }
          
          @media (max-width: 768px) {
            .admin-layout .ant-tabs-nav {
              flex-wrap: nowrap !important;
              overflow-x: auto !important;
              overflow-y: hidden;
              display: flex !important;
              width: 100%;
            }
            .admin-layout .ant-tabs-nav .ant-tabs-nav-list {
              display: flex;
              flex-wrap: nowrap;
            }
            .admin-layout .ant-tabs-nav .ant-tabs-nav-wrap {
              overflow: visible;
            }
            .admin-layout .ant-tabs-tab {
              flex-shrink: 0 !important;
            }
            .admin-layout .ant-form-item {
              margin-bottom: 12px;
            }
            .admin-layout .ant-modal-content {
              margin: 8px;
              width: calc(100% - 16px) !important;
            }
            .admin-layout .ant-modal-body {
              padding: 12px;
              max-height: 70vh;
              overflow-y: auto;
            }
            .admin-layout .ant-tabs-content {
              overflow-x: auto;
            }
            .admin-layout .ant-form-inline {
              display: flex;
              flex-direction: column;
            }
            .admin-layout .ant-form-inline .ant-form-item {
              margin-bottom: 8px;
            }
          }
          
          @media (max-width: 576px) {
            .admin-layout .ant-tabs-nav {
              flex-wrap: nowrap !important;
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch;
            }
            .admin-layout .ant-tabs-tab {
              padding: 6px 10px !important;
              font-size: 11px;
            }
            .admin-layout .ant-tabs-tab .ant-tabs-tab-btn {
              font-size: 11px;
            }
            .admin-layout .ant-card {
              margin-left: -8px;
              margin-right: -8px;
              border-radius: 0;
            }
            .admin-layout .ant-card-body {
              padding: 12px 8px;
            }
            .admin-layout .ant-space {
              flex-wrap: wrap;
            }
            .admin-layout .ant-switch {
              transform: scale(0.8);
            }
          }
        `}</style>
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          width={260}
          collapsedWidth={80}
          style={{ 
            background: '#ffffff',
            borderRight: '1px solid #f0f0f0',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? 0 : '0 24px',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
            }}>
              <div style={{
                width: 36,
                height: 36,
                background: '#000',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>S</span>
              </div>
              {!collapsed && (
                <span style={{ color: '#000', fontSize: 16, fontWeight: 600 }}>
                  Admin
                </span>
              )}
            </div>
          </div>
          <Menu
            style={{ 
              background: '#ffffff',
              borderRight: 'none',
              fontSize: 14,
            }}
            mode="inline"
            selectedKeys={getSelectedKeys()}
            defaultOpenKeys={getOpenKeys()}
            items={menuItems}
            onClick={handleMenuClick}
            inlineCollapsed={collapsed}
          />
        </Sider>
        <Layout style={{ 
          marginLeft: siderWidth, 
          transition: 'margin-left 0.2s', 
          background: '#fafafa',
          minHeight: '100vh',
        }}>
          <Header
            className="admin-header"
            style={{
              padding: '0 16px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #f0f0f0',
              position: 'sticky',
              top: 0,
              zIndex: 99,
            }}
          >
            <style>{`
              @media (max-width: 576px) {
                .admin-header {
                  padding: 0 8px !important;
                }
              }
            `}</style>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 16,
                width: 40,
                height: 40,
                color: '#000',
              }}
            />
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={onLogout}
              className="logout-btn"
              style={{
                fontSize: 14,
                height: 40,
                color: '#666',
              }}
            >
              <span className="logout-text" style={{ marginLeft: 8 }}>Logout</span>
              <style>{`
                @media (max-width: 576px) {
                  .logout-text {
                    display: none !important;
                  }
                  .logout-btn {
                    padding: 4px 8px !important;
                  }
                }
              `}</style>
            </Button>
          </Header>
          <Content
            style={{
              margin: '16px',
              padding: '16px',
              minHeight: 280,
              background: '#ffffff',
              borderRadius: 8,
              overflow: 'auto',
            }}
            className="admin-content"
          >
            <style>{`
              @media (max-width: 768px) {
                .admin-content {
                  margin: 8px !important;
                  padding: 12px !important;
                }
              }
              @media (max-width: 576px) {
                .admin-content {
                  margin: 4px !important;
                  padding: 8px !important;
                }
              }
            `}</style>
            {children}
          </Content>
        </Layout>
      </Layout>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;
