import React from 'react';
import { PageHeader, Button, Descriptions } from 'antd';
const HeaderLayout = ({ children, button, title, subtitle, notStyle, noBack }) => {
    return (
        <div className="site-page-header-ghost-wrapper">
            <PageHeader
                ghost={false}
                onBack={notStyle || noBack ? false : () => window.history.back()}
                className={notStyle ? 'pb-0 pt-2' : 'shadow-md rounded-3xl'}
                title={title}
                subTitle={subtitle ? subtitle : ''}
                extra={button}
            >
                {children}
            </PageHeader>
        </div>
    );
};

export default HeaderLayout;
