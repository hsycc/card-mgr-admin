import {
  CreateUser,
  DeleteUser,
  QueryAllUsers,
  UpdateUserRole,
  UpdateUserStatus,
} from '@/services/swagger/user';

import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal } from 'antd';
import type { PaginationConfig } from 'antd/lib/pagination';
import React, { useEffect, useRef, useState } from 'react';
// import { PaginationConfig } from 'antd/lib/pagination';

const handleRemove = async (param: API.DeleteUserParams) => {
  if (!param.id) return;
  const hide = message.loading('正在删除');
  try {
    await DeleteUser(param);
    hide();
    message.success('删除用户成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleAdd = async (createUserDto: API.CreateUserDto) => {
  const hide = message.loading('正在创建用户');
  try {
    await CreateUser(createUserDto);
    hide();
    message.success('创建用户成功');
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleUpdateRole = async (param: API.UpdateUserRoleParams) => {
  if (!param.id) return;
  const hide = message.loading('正在设置用户类型');
  try {
    await UpdateUserRole(param);
    hide();
    message.success('修改类型成功');
    return true;
  } catch (error) {
    console.log(error);

    hide();
    return false;
  }
};

const handleUpdateStatus = async (param: API.UpdateUserStatusParams) => {
  if (!param.id) return;
  const hide = message.loading('正在设置用户状态');
  try {
    await UpdateUserStatus(param);
    hide();
    message.success('修改状态成功');
    return true;
  } catch (error) {
    console.log(error);

    hide();
    return false;
  }
};

const User: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

  const [search, setSearch] = useState<string>('');

  const columns: ProColumns<API.UserEntity>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      render: (dom) => {
        return <a>{dom}</a>;
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '角色类型',
      dataIndex: 'role',
      initialValue: 2,
      filters: true,
      onFilter: true,

      valueEnum: {
        1: {
          text: '超级用户',
        },
        2: {
          text: '普通用户',
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '停用',
          status: 'Default',
        },
        1: {
          text: '启用',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="role"
          onClick={async () => {
            try {
              await handleUpdateStatus({ id: record.id });
              if (actionRef.current) {
                actionRef.current.reload();
              }
            } catch (error) {}
          }}
        >
          {record.status === 1 ? '禁用' : '启用'}
        </a>,

        <a
          key="del"
          onClick={async () => {
            Modal.confirm({
              icon: <ExclamationCircleOutlined />,
              content: '确认删除',
              async onOk() {
                try {
                  await handleRemove({ id: record.id });
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                } catch (error) {}
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}
        >
          删除
        </a>,
        <a
          key="role"
          onClick={async () => {
            try {
              await handleUpdateRole({ id: record.id });
              if (actionRef.current) {
                actionRef.current.reload();
              }
            } catch (error) {}
          }}
        >
          {record.role === 1 ? '设为普通用户' : record.role === 2 ? '设为超级用户' : '数据错误'}
        </a>,
      ],
    },
  ];

  const fetch = async (payload?: any & PaginationConfig) => {
    const query = {
      ...payload,
      search: search,
    } as API.QueryAllUsersParams;
    try {
      const { data } = await QueryAllUsers(query);
      return {
        data: data?.results || [],
        total: data?.pagination?.total,
        success: true,
      };
    } catch (error: any) {
      message.error(error?.msg || error?.message);
      return {
        data: [],
      };
    }
  };

  useEffect(() => {
    if (typeof actionRef.current !== 'undefined' && actionRef?.current?.reset) {
      /* 重置所有项 , 回到第一页 */
      actionRef?.current?.reset();
    }
  }, [search]);
  return (
    <PageContainer>
      <ProTable<API.UserEntity, API.QueryAllUsersParams>
        headerTitle={'用户列表'}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={{
          size: 'default',
          defaultPageSize: 20,
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true,
        }}
        toolbar={{
          search: {
            style: { width: 210 },
            placeholder: '模糊查询用户',
            allowClear: true,
            onSearch: (val) => {
              setSearch(val);
            },
          },
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={fetch}
        columns={columns}
      />
      <ModalForm
        title={'新建用户'}
        width="400px"
        modalProps={{
          destroyOnClose: true,
        }}
        open={createModalVisible}
        onOpenChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.CreateUserDto);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          label="用户名"
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="username"
        />
        <ProFormSelect
          options={[
            {
              value: 1,
              label: '超级用户',
            },
            {
              value: 2,
              label: '普通用户',
            },
          ]}
          rules={[
            {
              required: true,
            },
          ]}
          width="md"
          name="role"
          label={`用户角色`}
        />
        <ProFormText
          rules={[
            {
              required: true,
            },
          ]}
          label="密码"
          width="md"
          name="password"
        />
        <ProFormText
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
          width="md"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default User;
