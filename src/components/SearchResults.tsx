import React, { useState } from "react";
import { Article } from "../constants/types";
import { Empty, List } from "antd";
import Thumbnail from "./Thumbnail";
import { useHistory } from "react-router-dom";

interface SearchResults {
    data: Article[]
}

const SearchResults: React.FC<SearchResults> = ({ data }: SearchResults): JSX.Element => {

    const [ selectedArticle, setSelectedArticle ] = useState<Article | null>(null);
    const history = useHistory();

    const selectNewArticle = (article: Article) => {
        setSelectedArticle(article);
        history.push({
            pathname: '/news',
            state: { 'article': article }
        });
    };

    const emptyListStyle = {
        emptyText: (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={ {
                    height: 60,
                } }
                description={
                    <span>
                    No Data
                </span>
                }/>
        )
    };

    return (
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
            locale={ emptyListStyle }
            dataSource={ data }
            renderItem={ item => (
                <List.Item>
                    <Thumbnail
                        article={ item }
                        selectArticle={ selectNewArticle }
                    />
                </List.Item>
            ) }
        />
    );
};

export default SearchResults;