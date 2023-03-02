/* eslint-disable no-debugger */
import Footer from '@/components/Footer';
import { AUTH_TOKEN } from '@/constants';
import { Login } from '@/services/swagger/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useModel } from '@umijs/max';
import { message } from 'antd';
import { parse } from 'query-string';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => {
//   return (
//     <Alert
//       style={{
//         marginBottom: 24,
//       }}
//       message={content}
//       type="error"
//       showIcon
//     />
//   );
// };
const LoginFC: React.FC = () => {
  const [type] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };
  const handleSubmit = async (values: API.LocalAuthDto) => {
    // 登录
    const { data } = await Login({ ...values });

    const defaultLoginSuccessMessage = '登录成功！';
    message.success(defaultLoginSuccessMessage);
    localStorage.setItem(AUTH_TOKEN, data.access_token);
    /** 此方法会跳转到 redirect 参数所在的位置 */

    const query = parse(history.location.search);
    const { redirect } = query as {
      redirect: string;
    };
    await fetchUserInfo();

    history.push(redirect || '/');
    // return;
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'登录'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          // logo={<img alt="logo" src="/logo.svg" />}
          title={Settings.title}
          initialValues={{
            autoLogin: true,
            username: 'test@cuby',
            password: 'cuby123456',
          }}
          onFinish={async (values) => {
            console.log('handleSubmit');

            await handleSubmit(values as API.LocalAuthDto);
          }}
        >
          <div style={{ height: '100px' }} />

          {/* {typeof token === 'string' && type === 'account' && (
            <LoginMessage content={'错误的用户名和密码'} />
          )} */}

          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'用户名: test@cuby'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'密码: cuby123456'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          {/* <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div> */}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default LoginFC;
