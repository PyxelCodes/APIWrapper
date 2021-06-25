import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';

export function Footer({ alignToBottom }) {

    let style = {}

    if (alignToBottom) {
        style = {
            position: 'fixed',
            width: '100%'
        }
    }

    return (
        <div id="footer" style={{ position: alignToBottom ? 'fixed' : 'relative', bottom: alignToBottom ? 0 : '', width: alignToBottom ? '100%' : '' }}>
            <span id="footer-links">
                <a href="https://reefraid.com/discord">
                    Get Support
                </a>
                <a href="https://top.gg/bot/623545336484462593">
                    Vote
                </a>
                <a href="https://reefraid.com/rules">
                    Rules
                </a>
                <a href="mailto:hello@reefraid.com">
                    Email
                </a>
            </span>
            <span id="footer-logo">
                <a href="https://quartz.gg">
                    <img
                        loading="lazy"
                        alt="Quartz"
                        title="Quartz"
                        height="auto"
                        width="auto"
                        sizes="(max-width: 429px) 100vw, 429px"
                        srcSet="https://i0.wp.com/reefraid.com/wp-content/uploads/2021/05/Quartzicon.png?w=429&amp;ssl=1 429w, https://i0.wp.com/reefraid.com/wp-content/uploads/2021/05/Quartzicon.png?resize=290%2C300&amp;ssl=1 290w"
                        src="https://reefraid.com/wp-content/uploads/2021/05/Quartzicon.png"
                    />
                </a>
            </span>
            <span id="footer-socials">
                <a href="https://twitter.com/reefraid">
                    <TwitterIcon />
                </a>
                <a href="https://instagram.com/reefraid_">
                    <InstagramIcon />
                </a>
                <a href="https://www.youtube.com/channel/UCdaEhu-5N3nsKjxoGTpTUlA">
                    <YouTubeIcon />
                </a>
            </span>
        </div>
    )
}
