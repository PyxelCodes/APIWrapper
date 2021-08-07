import React from 'react'
import { useHistory } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';
import axios from 'axios';
import { isEmpty } from 'lodash'
import { Custom404 } from '../errors/404';

export const ColoredNumber = ({ n }: { n: number }) => {
    return (
        <p
            style={{
                color: '#fff',
                backgroundColor: '#0074D9',
                width: '22px',
                padding: '1px',
                textAlign: 'center',
                borderRadius: '50px',
                fontSize: '20px'
            }}
        >
            {
                n
            }
        </p>
    )
}

export const OverviewTitle = ({ n, text }: { n: number, text: string }) => {
    return (
        <div className="overview-title" style={{ display: 'flex' }}>
            <ColoredNumber n={n} />
            <p style={{ color: '#fff', marginLeft: '4px', fontSize: '20px' }}> {text} </p>
        </div>
    )
}

export const Databox = ({ title, value, hyperlink }: { title: string, value: any, hyperlink?: string | null }) => {
    let history = useHistory();
    return (
        <div className="view-databox" style={{ color: '#fff' }}>
            <p> {title} </p>
            <div className="view-databox-box" onClick={() => { if (hyperlink) history.push(hyperlink) }} style={{ cursor: hyperlink ? 'pointer' : 'default', justifyContent: 'space-between', border: '1px solid #2e323b', width: hyperlink ? '237px' : '250px', height: '40px', paddingLeft: '13px', paddingRight: hyperlink ? '13px' : '', display: 'flex', alignItems: 'center', borderRadius: '7px', marginTop: '-5px' }}>
                <p style={{ color: typeof value == 'number' ? '#7765c2' : '#d37b4c' }}> {value} </p>
                {
                    hyperlink
                        ? <LaunchIcon />
                        : null
                }
            </div>
        </div>
    )
}

export const MainButton = ({ to, content, history }: { to: string, content: any, history: any }) => {
    return (
        <button className="button-discord-theme" onClick={() => { history.push(to) }} >
            {
                content
            }
        </button>
    )
}

function formatDate(number: number) {
    if (number === 0) return 'Never';
    return new Date(number).toUTCString()
}

function Overview({ userData, setUserData, history }: any) {

    let [loading, setLoading] = React.useState(true);
    let [isValid, setIsValid] = React.useState(true);


    React.useEffect(() => {
        if (!isEmpty(userData)) return;
        axios.get(`https://api.reefraid.com/v1/users/${history.location.pathname.split('/')[2]}`, { headers: (window as any).X_REQ_HEADERS })
            .then(({ data }) => {
                setUserData(data);
                setLoading(false);
            })
            .catch(x => setIsValid(false))
    })


    if (!isValid) return <Custom404 content={'user'} />
    if (loading) return <p> loading </p>



    let d = userData;

    let joinedAt = new Date(d.joined);
    let joinedAtFormatted = `${joinedAt.toUTCString()}`



    return (<>
        <div className="view-overview" style={{ display: 'grid', gridAutoFlow: 'column', columnGap: '20px', gridTemplateColumns: '300px 300px' }}>
            <div className="row-item" >
                <OverviewTitle n={1} text={'Overall statistics'} />
                <div className="view-overview-box" style={{ display: 'grid' }}>
                    <Databox title="cum" value={d.gold} />
                    <Databox title="Vault" value={d.vault} />
                    <Databox title="Commands executed" value={d.commandsExecuted} />
                    <Databox title="Joined" value={joinedAtFormatted} />
                </div>
            </div>
            <div className="row-item">
                <OverviewTitle n={2} text={'Misc'} />
                <div className="view-overview-box" style={{ display: 'grid' }}>
                    <Databox title="Attack" value={d.attack} />
                    <Databox title="Defense" value={d.defense} />
                    <Databox title="Clan" value={d.clan || 'None'} hyperlink={d.clan ? `/view/clans/${d.clan}/overview` : null} />
                    <Databox title="API Visibility" value={d.apiVisibility.toString()} />
                    {
                        userData.apiVisibility
                            ?
                            <>
                                <Databox title="Accepting gifts" value={d.acceptingGifts.toString()} />
                                <Databox title="Farm level" value={d.farmLvl} />
                                <Databox title="Free streak" value={d.freeStreak || 0} />
                                <Databox title="Skin" value={d?.skin?.active || 'default'} />
                            </>
                            : null
                    }
                </div>
            </div>

            {
                userData.apiVisibility
                    ?
                    <div className="row-item">
                        <OverviewTitle n={3} text={'Events'} />
                        <div className="view-overview-box" style={{ display: 'grid' }}>
                            <Databox title="Command" value={formatDate(d.lastEvents.command)} />
                            <Databox title="Daily" value={formatDate(d.lastEvents.daily)} />
                            <Databox title="Fish" value={formatDate(d.lastEvents.fish)} />
                            <Databox title="Forage" value={formatDate(d.lastEvents.forage)} />
                            <Databox title="free" value={formatDate(d.lastEvents.free)} />
                            <Databox title="raided" value={formatDate(d.lastEvents.raided)} />
                            <Databox title="voted" value={formatDate(d.lastEvents.voted)} />
                            <Databox title="weekly" value={formatDate(d.lastEvents.weekly)} />

                        </div>
                    </div>
                    : null
            }



        </div>
        <div id="view-overview-buttonview" style={{ margin: '20px 0px' }}>
            {
                userData.apiVisibility && userData.farm && !isEmpty(userData.farm)
                    ?
                    <MainButton to={`/view/${d._id}/farm`} content="Farm" history={history} />
                    : null
            }
            <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(userData)); }} className="button-discord-theme"> Copy JSON </button>
        </div>
    </>
    )


}


export {
    Overview
};
