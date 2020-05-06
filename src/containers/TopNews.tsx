import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getTopNewsForCountry } from "../services";
import { AxiosResponse } from "axios";
import { Article, Filters } from "../constants/types";
import ThumbnailList from "../components/ThumbnailList";
import { message, Row, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

export const TopNews: React.FC<Filters> = ({ country }: Filters): JSX.Element => {

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ articles, setArticles ] = useState<Article[]>([]);
    const [ selectedArticle, setSelectedArticle ] = useState<Article | null>(null);
    const [ customMessage, setCustomMessage ] = useState<string>('');
    const history = useHistory();

    const selectNewArticle = (article: Article) => {
        setSelectedArticle(article);
        history.push({
            pathname: '/news',
            state: { 'article': article }
        });
    };

    useEffect(() => {
        getTopNewsForCountry(country)
            .then(({ data }: AxiosResponse) => {
                setLoading(false);
                setArticles(data.articles);
            }).catch(error => {
            console.log(error);
            message.error('Something went wrong');
        });

        const countryFullName: string = country === 'us' ? 'United States' : 'Great Britain';
        setCustomMessage(`Top news from ${ countryFullName }:`);
    }, [ country ]);

    const content = (
        <ThumbnailList
            country={ country }
            articles={ articles }
            customMessage={ customMessage }
            setSelectedArticle={ selectNewArticle }/>);

    const spinner = (
        <Row align="middle" justify="center">
            <Spin tip="Loading" indicator={
                <LoadingOutlined style={ { fontSize: 48 } } spin/> }
            />
        </Row>);

    return (
        <>
            { loading ? spinner : content }
        </>
    );

};