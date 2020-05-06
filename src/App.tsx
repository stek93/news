import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { Layout, Menu, Radio } from 'antd';
import { TopNews } from "./containers/TopNews";
import { AppRoutePaths } from "./constants/AppRoutes";
import Categories from "./containers/Categories";
import Search from "./containers/Search";
import News from "./components/News";
import CategoryNews from "./components/CategoryNews";

const { Header, Content } = Layout;

const App = (props: any) => {

    const [ selectedCountry, setSelectedCountry ] = useState<string>('us');
    const [ countrySelectionDisable, setCountrySelectionDisable ] = useState<boolean>(false);

    return (
        <Router>
            <Layout className="layout" style={ { minHeight: '200vh' } }>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ [ '1' ] }>
                        <Menu.Item key="1">
                            <Link to={ AppRoutePaths.TopNews }>Top News</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={ AppRoutePaths.Categories }>Categories</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to={ AppRoutePaths.Search }>Search</Link>
                        </Menu.Item>
                    </Menu>
                    <Radio.Group
                        style={ { float: "right" } }
                        disabled={ countrySelectionDisable }
                        onChange={ (e) => setSelectedCountry(e.target.value) }
                        buttonStyle="solid" defaultValue="us">
                        <Radio.Button value="gb">GB</Radio.Button>
                        <Radio.Button value="us">US</Radio.Button>
                    </Radio.Group>
                </Header>
                <Content style={ { padding: '50px 50px' } }>
                    <div className="site-layout-content">
                        <Switch>
                            <Route exact path={ AppRoutePaths.TopNews } render={ () =>
                                <TopNews
                                    country={ selectedCountry }
                                    { ...props } /> }
                            />
                            <Route path={ AppRoutePaths.News } render={ () =>
                                <News
                                    disableCountrySelection={(param: boolean) => setCountrySelectionDisable(param)}
                                /> }
                            />
                            <Route path={ AppRoutePaths.CategoryNews } render={ () =>
                                <CategoryNews
                                    country={ selectedCountry }
                                    { ...props } /> }
                            />
                            <Route path={ AppRoutePaths.Categories } render={ () =>
                                <Categories country={ selectedCountry } { ...props } /> }
                            />
                            <Route path={ AppRoutePaths.Search } render={ () =>
                                <Search country={ selectedCountry } { ...props } /> }
                            />
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
