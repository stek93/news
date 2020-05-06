import React, { useEffect, useState } from "react";
import { CategoriesType, CategoryArticles, Filters } from "../constants/types";
import { getTopNewsForAllCategories } from "../services";
import { AxiosResponse } from "axios";
import { message, PageHeader, Row, Spin } from 'antd';
import CategoryList from "../components/CategoryList";
import { LoadingOutlined } from '@ant-design/icons';


const Categories: React.FC<Filters> = ({ country }: Filters): JSX.Element => {

    const countryFullName: string = country === 'us' ? 'United States' : 'Great Britain';
    const categories: CategoriesType[] = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ];

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ articleCategories, setArticleCategories ] = useState<CategoryArticles>({});

    useEffect(() => {
        getTopNewsForAllCategories(country, categories).then(response => {
            let topCategories: CategoryArticles = {};

            response.forEach(({ data }: AxiosResponse, index) => {
                topCategories[categories[index]] = data.articles;
            });
            setLoading(false);
            setArticleCategories(topCategories);
        }).catch(error => {
            console.log(error);
            message.error('Something went wrong');
        });
    }, [ country ]);

    const spinner = (
        <Row align="middle" justify="center">
            <Spin tip="Loading" indicator={
                <LoadingOutlined style={ { fontSize: 48 } } spin/> }
            />
        </Row>);

    let content = (
        <PageHeader
            title={ `Top news from ${ countryFullName }:` }>
            <br/>
            <CategoryList data={ articleCategories }/>
        </PageHeader>);

    return (
        <>
            { loading ? spinner : content }
        </>
    );
};

export default Categories;