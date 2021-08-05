import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div style={{ color: '#fff' }}>
            <h2> I have no clue what should go here </h2>
            <p> like actually this page would be kinda useless.. you could always leave recommendations in <a href="https://discord.com/channels/688140065041678438/745329390916993034" style={{ color: '#af0000' }}> #suggest-something </a> </p>

            <br />
            <br />

            <p> Check out Hoss and Pyxel!</p>

            <Link to={'/view/399049916757966848/overview'} className="link"> Hoss </Link>
            <br />
            <br />
            <Link to={'/view/477095216327950347/overview'} className="link"> Pyxel </Link>
        </div>
    )
}

export default Home;
