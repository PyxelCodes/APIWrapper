import { QuartzLogo } from './QuartzLogo'
import { Instagram, YouTube, Twitter } from '@material-ui/icons'

export const Footer = () => {
  return (
    <div id="footer">
      <div id="links">
        <a href="https://reefraid.com/discord"> get support </a>
        <a href="https://reefraid.com/changelogs"> changelogs </a>
        <a href="https://top.gg/bot/623545336484462593">vote</a>
        <a href="https://reefraid.com/rules">rules</a>
      </div>

      <QuartzLogo />
      <div id="socials">
        <div
          className="socialcontainer"
        >
          <Twitter className="socialicon" />
        </div>
        <div
          className="socialcontainer"
        >
          <Instagram className="socialicon" />
        </div>
        <div
          className="socialcontainer"
        >
          <YouTube className="socialicon" />
        </div>
      </div>
    </div>
  )
}
