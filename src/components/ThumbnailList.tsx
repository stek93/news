import React from "react";
import { List, PageHeader } from "antd";
import Thumbnail from "./Thumbnail";
import { Article } from "../constants/types";

interface ThumbnailList {
    country: string;
    articles: Article[];
    customMessage: string;

    setSelectedArticle(article: Article): void;
}

const ThumbnailList: React.FC<ThumbnailList> = ({ articles, setSelectedArticle, country, customMessage }: ThumbnailList): JSX.Element => {

    return (
        <>
            <PageHeader
                title={ customMessage }>
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
                    dataSource={ articles }
                    renderItem={ item => (
                        <List.Item>
                            <Thumbnail
                                article={ item }
                                selectArticle={ setSelectedArticle }
                            />
                        </List.Item>
                    ) }
                />
            </PageHeader>
        </>
    );
};

export default ThumbnailList;