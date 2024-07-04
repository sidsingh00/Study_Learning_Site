'use client';
import React, { FC, useState } from 'react';
import SideBarProfile from './SideBarProfile';
import { useLogoutQuery } from '../../../redux/features/Auth/authApi';
import { signOut } from 'next-auth/react';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword'

type Props = {
	user: any;
};

const Profile: FC<Props> = ({ user }) => {
	const [scroll, setScroll] = useState(false);
	const [avatar, setAvatar] = useState(null);
	const [logout, setLogout] = useState(false);
	const {} = useLogoutQuery(undefined, {
		skip: !logout ? true : false,
	});

	console.log("user", user)
	const [active, setActive] = useState(1);

	const logOutHandler = async () => {
		setLogout(true);
		await signOut();
	};

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 85) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		});
	}

	return (
		<div className="w-[85%] flex mx-auto">
			<div
				className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#ffffff16] rounded-[5px] dark:shadow-sm shadow-xl mt-[80px] mb-[80px] sticky ${
					scroll ? 'top-[120px] ' : 'top-[30px]'
				} left-30`}
			>
				<SideBarProfile
					user={user}
					active={active}
					avatar={avatar}
					setActive={setActive}
					logOuthandler={logOutHandler}
				/>
			</div>
			{active === 1 && (
				<div className="w-full h-full bg-transparent mt-[80px]">
					<ProfileInfo
						avatar={avatar}
						user={user}
					/>
				</div>
			)}
			{active === 2 && !user?.isSocialAuth && (
				<div className="w-full h-full bg-transparent mt-[80px]">
					<ChangePassword />
				</div>
			)}
		</div>
	);
};

export default Profile;
