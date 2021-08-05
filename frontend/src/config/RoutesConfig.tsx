import {
    Route,
    Switch,
    useHistory
} from "react-router-dom";
import Home from "../modules/Home";
import { Header } from "../modules/Header";
import { CurrentView } from '../modules/CurrentView'
import { Overview as UserOverview } from '../modules/view/user/Overview'
import { useState } from "react";
import { UserFarmView } from '../modules/view/user/Farm'
import { Custom404 } from '../modules/view/errors/404'

const RouteView = ({ Route, userData, setUserData }: { Route: any, userData: any, setUserData: any }) => {
    const history = useHistory();
    return (<>
        <Header history={history} userData={userData} setUserData={setUserData} />

        <div id="app" style={{ marginLeft: '10px', marginTop: '20px' }}>
            <div className="currentview-container" style={{ marginBottom: '15px', color: '#91919f' }}>
                <CurrentView />
            </div>


            <Route history={history} userData={userData} setUserData={setUserData} />
        </div>
    </>
    )
}

const Routes = () => {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#2f3541'
    const [userData, setUserData] = useState<any>({});
    return (
        <Switch>
            <Route exact path="/">
                <RouteView Route={Home} userData={userData} setUserData={setUserData} />
            </Route>
            <Route path="/view/:id/overview">
                <RouteView Route={UserOverview} userData={userData} setUserData={setUserData} />
            </Route>
            <Route path="/view/:id/farm">
                <RouteView Route={UserFarmView} userData={userData} setUserData={setUserData} />
            </Route>
            <Route path="*">
                <Custom404 content={'page'} />
            </Route>
        </Switch>
    )
}

export default Routes;
