import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageHeader, Row, Spin, Typography } from "antd";
import { INews } from "../constants/types";
import { LoadingOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const News: React.FC<INews> = ({ disableCountrySelection }: INews): JSX.Element => {
    const location = useLocation();
    let [ currentArticle, setCurrentArticle ] = useState<any>(null);


    useEffect(() => {
        // @ts-ignore
        setCurrentArticle(location.state.article);
        disableCountrySelection(true);
        return () => disableCountrySelection(false);
    }, []);

    let content;
    if (currentArticle !== null) {
        content = <PageHeader
            title={ currentArticle.title }>
            <div style={ { textAlign: 'center', marginTop: '5%' } }>
                <img
                    src={ currentArticle.urlToImage }
                    alt="content"
                    width="50%"
                />
            </div>
            <br/>
            <div style={ { marginTop: '5%' } }>
                <Paragraph>{ currentArticle.content }</Paragraph>
            </div>
        </PageHeader>
    } else {
        content = (<Row align="middle" justify="center">
            <Spin tip="Loading" indicator={
                <LoadingOutlined style={ { fontSize: 48 } } spin/> }
            />
        </Row>);
    }
    return (
        <>
            { content }
        </>
    );
};

export default News;