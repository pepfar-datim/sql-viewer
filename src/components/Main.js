import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import ViewData from './Data/ViewData'
import Layout from './Layout'
import SelectQuery from './Selection/SelectQuery'
import '../locales'

const Main = () => {
    return (
        <>
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
        </>
    )
}

export default Main
