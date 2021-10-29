import Image from 'next/image'

export const HomeFrontLogo = () => {
  return (
    <div className="banner-container">
      <div className="banner" />
      <div className="rr-logo-big">
        <Image
          loading="eager"
          src="https://i1.wp.com/reefraid.com/wp-content/uploads/2020/08/reefraid.png"
          alt=""
          width="789"
          height="562"
        />
      </div>
    </div>
  )
}
