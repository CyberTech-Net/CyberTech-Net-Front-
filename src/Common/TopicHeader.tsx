import React from 'react'
import { Typography } from 'antd';
import { Divider } from 'antd';

const { Title } = Typography;


function TopicHeader(props: { pageTitle: string }) {
    return (
        <>
            <Divider orientation="left">
                <Title level={2}>{props.pageTitle}</Title>
            </Divider>
        </>
    )
}

export default TopicHeader;
