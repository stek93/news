import React, { useState } from "react";
import { Button, List, PageHeader } from "antd";
import { Article, CategoriesType, CategoryArticles } from "../constants/types";
import Thumbnail from "./Thumbnail";
import { useHistory } from "react-router-dom";

interface CategoryList {
    data: CategoryArticles
}

const CategoryList: React.FC<CategoryList> = ({ data }: CategoryList): JSX.Element => {

    const [ selectedArticle, setSelectedArticle ] = useState<Article | null>(null);
    const history = useHistory();

    const onCategoryLinkClickHandler = (cat: string) => {
        history.push(`/categories/${ cat }`);
    };

    const selectNewArticle = (article: Article) => {
        setSelectedArticle(article);
        history.push({
            pathname: '/news',
            state: { 'article': article }
        });
    };

    let content: JSX.Element[] = [];
    Object.keys(data).forEach((key, index) => {
        let headline = (
            <Button
                type="link"
                style={ { fontSize: '1.2em' } }
                onClick={ () => onCategoryLinkClickHandler(key) }>
                { `${ key[0].toUpperCase() }${ key.slice(1) }` }
            </Button>);
        content.push(
            <PageHeader
                key={ index }
                title={ headline }>
                <br/>
                <List
                    grid={ {
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 3,
                        lg: 3,
                        xl: 3,
                        xxl: 4,
                    } }
                    pagination={ {
                        pageSize: 4,
                    } }
                    itemLayout="horizontal"
                    dataSource={ data[key as CategoriesType] }
                    renderItem={ item => (
                        <List.Item>
                            <Thumbnail
                                article={ item }
                                selectArticle={ selectNewArticle }
                            />
                        </List.Item>
                    ) }
                />
            </PageHeader>
        );
    });

    return (
        <>
            { content }
        </>
    );
};

export default CategoryList;