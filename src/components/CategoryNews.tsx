import React, { useEffect, useState } from "react";
import { Article, Filters } from "../constants/types";
import { getNewsForSpecificCategory } from "../services";
import { useHistory, useParams } from "react-router-dom";
import ThumbnailList from "./ThumbnailList";
import { message, Row, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const CategoryNews: React.FC<Filters> = ({ country }: Filters): JSX.Element => {

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ articles, setArticles ] = useState<Article[]>([]);
    const [ selectedArticle, setSelectedArticle ] = useState<Article | null>(null);
    const { category } = useParams();
    const history = useHistory();
    const [ customMessage, setCustomMessage ] = useState<string>('');

    const selectNewArticle = (article: Article) => {
        setSelectedArticle(article);
        history.push({
            pathname: '/news',
            state: { 'article': article }
        });
    };

    useEffect(() => {
        getNewsForSpecificCategory(country, category)
            .then(response => {
                setArticles(response.data.articles);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                message.error('Something went wrong');
            });

        const countryFullName: string = country === 'us' ? 'United States' : 'Great Britain';
        setCustomMessage(`Top ${ category } news from ${ countryFullName }:`);

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

export default CategoryNews;