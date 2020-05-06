import React, { useState } from "react";
import { Article, Filters } from "../constants/types";
import { getNewsForSpecificKeywords } from "../services";
import { AxiosResponse } from "axios";
import { Col, Input, message, PageHeader, Row } from "antd";
import SearchResults from "../components/SearchResults";

const { Search: SearchField } = Input;

const Search: React.FC<Filters> = ({ country }: Filters): JSX.Element => {

    const countryFullName: string = country === 'us' ? 'United States' : 'Great Britain';

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ articles, setArticles ] = useState<Article[]>([]);

    const searchForKeywords = (keyword: string) => {
        setLoading(true);
        getNewsForSpecificKeywords(country, keyword)
            .then(({ data }: AxiosResponse) => {
                setLoading(false);
                setArticles(data.articles);
            }).catch(error => {
            console.log(error);
            message.error('Something went wrong');
        });
    };

    return (
        <>
            <Row justify="center" gutter={ [ 16, 32 ] }>
                <Col span={ 18 }>
                    <PageHeader
                        title={ `Search top news from ${ countryFullName } by term:` }>
                        <br/>
                        <SearchField
                            placeholder="Search term"
                            loading={ loading }
                            enterButton
                            onChange={ ({ target: { value } }) => searchForKeywords(value) }/>
                    </PageHeader>
                </Col>
            </Row>
            <Row>
                <Col span={ 24 }>
                    <SearchResults data={ articles }/>
                </Col>
            </Row>
        </>
    );
};

export default Search;