// libs
import React, {PropTypes} from "react"
import { Provider } from "react-redux"
import { Route, Switch, Redirect } from "react-router-dom"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import { DragDropContextProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

// src
import styles from "./App.scss"
import './styles/css/bootstrap.scss'
// custom
import './styles/css/layout.scss'
import './styles/css/theme.scss'
import './styles/css/ui.scss'
import './styles/css/app.scss'
import MUITheme from "../config/theme"
import {
  Header,
  Page404,
    PageErrorView,
    PageDashboard,
    PageCurrentStatus,
    PageHistory,
    PublicRoute,
    PrivateRoute,
    PageLogin,
    PageLogout,
    PageRegister,
    PageAdminDashboard,
    PageManageUser,
    PageManageAccount,
    PageManageHome,
    PageManageFloor,
    PageManagePalace,
    PageManageAppliance,
    PageDeleteUser,
    PageEditUser,
    TestComponent

} from "./components"

export default class App extends React.Component {
  static propTypes = {
    userAgent: PropTypes.string,
    store: PropTypes.object,
    // Router: React.PropTypes.element,
    // routerProps: React.PropTypes.routerProps
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props)
  }
  getChildContext() {
    const { userAgent } = this.props
    const theme = userAgent ? Object.assign({ userAgent }, MUITheme) : MUITheme

    return {
      muiTheme: getMuiTheme(theme)
    }
  }
  render() {
    const { store, Router, routerProps } = this.props

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Router {...routerProps}>
            <div className={styles.root}>
              <Header />
              <div className={styles.layout}>
                <div className={styles.primaryColumn}>

                  <div className={`container-fluid`}>
                    <Switch>
                      <PublicRoute path="/test" component={TestComponent} />
                      <PublicRoute path="/login" component={PageLogin} />
                      <Route path="/logout" component={PageLogout} />
                      <PrivateRoute path="/register" component={PageRegister} />
                    {/*  <PublicRoute path="/dashboard" component={PageDashboard} />*/}
                      {/*<PublicRoute path="/adminDashboard" component={PageAdminDashboard} />*/}
                      <PrivateRoute path="/manageUser" component={PageManageUser} />
                      <PrivateRoute path="/manageAccount" component={PageManageAccount} />
                      <PrivateRoute path="/manageFloor" component={PageManageFloor} />
                      <PrivateRoute path="/managePalace" component={PageManagePalace} />
                      <PrivateRoute path="/manageAppliance" component={PageManageAppliance} />
                      <PrivateRoute path="/manageHome" component={PageManageHome} />
                      <PrivateRoute path="/deleteUser" component={PageDeleteUser} />
                      <PrivateRoute path="/editUser" component={PageEditUser} />
                      {/*<PublicRoute path="/currentStatus" component={PageCurrentStatus} />*/}
                    {/*  <PublicRoute path="/history" component={PageHistory} />*/}
                      <Route exact path="/errors" component={PageErrorView} />
                      <PrivateRoute
                          exact
                          path="/"
                          render={() => <Redirect to="/dashboard" />}
                      />
                      <PrivateRoute
                          exact
                          path="/dashboard"
                          component={PageDashboard}
                      />
                      <PrivateRoute
                          exact
                          path="/adminDashboard"
                          component={PageAdminDashboard}
                      />
                      <PrivateRoute
                          exact
                          path="/currentStatus"
                          component={PageCurrentStatus}
                      />
                      <PrivateRoute
                          exact
                          path="/history"
                          component={PageHistory}
                      />
                      <Route component={Page404} />
                    </Switch>
                  </div>

                </div>
              </div>
            </div>
          </Router>
        </Provider>
      </DragDropContextProvider>
    )
  }
}
