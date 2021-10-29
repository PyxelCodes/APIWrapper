import { useRouter } from 'next/router'
import { Container, Navbar } from 'react-bootstrap'
import Link from 'next/link'

const Item = (props) => {
  return (
    <li className={`nav-item`}>
      <Link passHref href={props.href}>
        <a
          className="nav-link px-3 ripple"
          style={{ color: props.active ? '#fff' : 'rgba(255, 255, 255, 0.55)' }}
        >
          {props.children}
        </a>
      </Link>
    </li>
  )
}

export const Header = () => {
  let router = useRouter()
  let active = router.asPath.replace('/', '')
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="lg"
      className="fixed-top"
      variant="dark"
    >
      <Container className="pt-2 pb-2">
        <Navbar.Brand href="/" className="p-0">
          ReefRaid
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarText"
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
        />
        <Navbar.Collapse id="navbarText">
          <div className="d-block d-lg-none">
            <div
              className="border-bottom mb-3 mt-3"
              style={{ opacity: 0.25 }}
            ></div>
          </div>
          <ul
            className="navbar-nav mr-auto ml-auto text-left"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <Item href="/" active={active == ''}>
              Home
            </Item>
            <Item href="/status" active={active == 'status'}>
              Status
            </Item>
            <Item href="/players" active={active == 'players'}>
              Players
            </Item>
            <Item href="/clans" active={active == 'clans'}>
              Clans
            </Item>
            <Item href="/market" active={active == 'market'}>
              Market
            </Item>
          </ul>
          <div className="d-block d-lg-none">
            <div className="pt4" />
          </div>
          <ul className="navbar-nav">
            <li className="navbar-nav">
              <a
                href="https://invite.reefraid.com"
                className="btn btn-sm btn-primary btn-rounded px-3 font-weight-500"
              >
                Invite
              </a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
