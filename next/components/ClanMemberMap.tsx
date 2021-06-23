

export const ClanMemberMap = ({ ml, clan }) => {

    let c = clan[ml]




    return (
        <div className="clan_memberlist">
            <span className="clan_memberlist_h">
                <p> Members </p>
                <p> XP </p>
                <br />
                <br />
            </span>
            {
                c.map(member => {
                    return (
                        <span className="clan_memberlist_member">
                            <span className="clan_memberlist_member_id">
                                {
                                    member._id
                                }
                            </span>
                            {
                                member.role
                                    ?
                                    <span className="member-role-tag">
                                        {
                                            member.role
                                        }
                                    </span>
                                    : null
                            }
                            <span className="clan_memberlist_member_xp">
                                {
                                    member.xp
                                }
                            </span>
                            <br />
                        </span>

                    )
                })
            }
        </div>
    )
}