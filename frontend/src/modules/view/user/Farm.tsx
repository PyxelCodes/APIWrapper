import React from 'react';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { MainButton } from './Overview';
import { Custom404 } from '../errors/404';

function convertMs(s: number) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    if (hrs > 0) {
        if (mins === 0) {
            return `${hrs}hr`;
        } else {
            return `${hrs}hr ${mins}min`;
        }
    } else if (mins > 0) {
        if (secs === 0) {
            return `${mins}min`;
        } else {
            return `${mins}min ${secs}sec`;
        }
    } else {
        if (secs === 0) {
            return `${Math.round((ms / 1000) * 10) / 10}sec`;
        } else {
            return `${secs}sec`;
        }
    }
}

function displayHarvestTime(timePlanted: number, duration: number) {
    if (Date.now() > timePlanted + duration) {
        if (Date.now() > timePlanted + duration * 7) {
            return 'Withered';
        } else return 'Ready!';
    } else {
        return `${convertMs(
            timePlanted + duration - Date.now()
        )}`;
    }
}

export const UserFarmView = ({ userData, setUserData, history }: any) => {



    let [loading, setLoading] = React.useState(true);
    let [items, setItems] = React.useState<any>({});
    let [isValid, setIsValid] = React.useState(true);


    React.useEffect(() => {
        if (!isEmpty(userData)) return;
        axios.get(`https://api.reefraid.com/v1/users/${history.location.pathname.split('/')[2]}`, { headers: (window as any).X_REQ_HEADERS })
            .then(async ({ data }) => {
                if(!data._id) return setIsValid(false);
                axios.get(`https://api.reefraid.com/v1/items/all`, { headers: (window as any).X_REQ_HEADERS })
                    .then((out) => {
                        let fetchedCrops: any = {};
                        for (let x in out.data) {
                            let c = out.data[x];
                            fetchedCrops[c.itemId] = c;
                        }
                        console.log(data);
                        setItems(fetchedCrops)
                        setUserData(data);
                        setLoading(false);
                    })

            })
            .catch(x => {
                setIsValid(false);
                setLoading(false)
            })
    })

    if(!isValid) return <Custom404 content={'user'}/>

    if (loading) return <p> loading </p>

    return (
        <div id="user-farmview">
            <table className="user-farmview-table" cellSpacing={0}>
                <tr className="table-head">
                    <th className="txtalign-left"> Crop Name </th>
                    <th className="txtalign-center"> Buy price </th>
                    <th className="txtalign-center"> Value </th>
                    <th className="txtalign-center"> Potential value </th>
                    <th className="txtalign-center"> Completion time </th>
                </tr>

                {
                    Object.keys(userData.farm).map((x, i) => {
                        let crop = userData.farm[x];

                        return (
                            <tr className={`table-row-${i % 2 === 0 ? 'even' : 'odd'}`}>
                                <td> {items[crop].name} </td>
                                <td className="txtalign-center"> {items[crop].buy} </td>
                                <td className="txtalign-center"> {items[crop].sell * items[crop].quantity} </td>
                                <td className="txtalign-center"> soon™ </td>
                                <td className="txtalign-center"> {displayHarvestTime(Number(x), Number(items[crop].duration))} </td>
                            </tr>
                        )
                    })
                }

            </table>

            <br /> { /** im so lazy i aint even gonna use margin */}

            <MainButton to={`/view/${userData._id}/overview`} content={<> Back </>} history={history} />
        </div>
    )
}
