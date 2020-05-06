import React from "react";
import { Button, Card } from "antd";
import { Article } from "../constants/types";

const { Meta } = Card;

interface Thumbnail {
    article: Article;
    selectArticle: Function;
}

const Thumbnail: React.FC<Thumbnail> = ({ article, selectArticle }: Thumbnail): JSX.Element => (
    <Card
        cover={
            <img
                alt="newsArticle"
                src={ article.urlToImage }
            />
        }
        actions={ [
            <Button key="link" type="link" onClick={ () => selectArticle(article) }>Read More</Button>,
        ] }
    >
        <Meta
            title={ article.title }
            description={ article.description }
        />
    </Card>
);

export default Thumbnail;