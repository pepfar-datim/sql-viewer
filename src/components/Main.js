import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import ConfigProvider from './ConfigProvider'
import UserInfoProvider from './UserInfoProvider'
import ViewData from './Data/ViewData'
import Layout from './Layout'
import SelectQuery from './Selection/SelectQuery'
import '../locales'

const Main = () => {
    return (
        <ConfigProvider>
            <UserInfoProvider>
                <Router>
                    <Switch>
                        <Route
                            exact
                            path="/view/:id"
                            render={props => (
                                <Layout>
                                    <ViewData {...props} />
                                </Layout>
                            )}
                        />
                        <Route path="/">
                            <Layout>
                                <SelectQuery />
                            </Layout>
                        </Route>
                    </Switch>
                </Router>
            </UserInfoProvider>
        </ConfigProvider>
    )
}

export default Main
