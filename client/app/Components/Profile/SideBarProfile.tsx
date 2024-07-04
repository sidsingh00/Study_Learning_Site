import React, { FC } from 'react';
import Image from 'next/image';
import avatarDefault from '../../../public/assests/avatar.png';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';
type Props = {
	user: any;
	active: number;
	avatar: string | null;
	setActive: (active: number) => void;
	logOuthandler: any;
};

const SideBarProfile: FC<Props> = ({
	user,
	active,
	setActive,
	avatar,
	logOuthandler,
}) => {
	const isSocialAuth = !user?.isSocialAuth;

	return (
		<div className="w-full">
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-t-[5px] ${
					active === 1 ? 'dark:bg-slate-800 bg-[#f2eded]' : 'bg-transparent'
				}`}
				onClick={() => setActive(1)}
			>
				<Image
					src={
						user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
					}
					alt="avatar"
					width={20}
					height={20}
					className="w-[20px] h-[20px 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
				/>
				<h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
					My Account
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
					active === 2 && isSocialAuth
						? 'dark:bg-slate-800 bg-[#f2eded]'
						: !isSocialAuth
						? 'line-through'
						: "'bg-transparent'"
				}`}
				onClick={() => {
					isSocialAuth && setActive(2);
				}}
			>
				<RiLockPasswordLine
					className="text-black dark:text-white"
					size={20}
				/>
				<h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
					Change Password
				</h5>
			</div>
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
					active === 3 ? 'dark:bg-slate-800 bg-[#f2eded]' : 'bg-transparent'
				}`}
				onClick={() => setActive(3)}
			>
				<SiCoursera
					className="text-black dark:text-white"
					size={20}
				/>
				<h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
					Enrolled Courses
				</h5>
			</div>
			{user.role === 'admin' && (
				<Link
					className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
						active === 6 ? 'dark:bg-slate-800 bg-[#f2eded]' : 'bg-transparent'
					}`}
					href={'/admin'}
				>
					<MdOutlineAdminPanelSettings
						className="text-black dark:text-white"
						size={20}
					/>
					<h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
						Admin Dashboard
					</h5>
				</Link>
			)}
			<div
				className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
					active === 4 ? 'dark:bg-slate-800 bg-[#f2eded]' : 'bg-transparent'
				}`}
				onClick={() => logOuthandler()}
			>
				<AiOutlineLogout
					className="text-black dark:text-white"
					size={20}
				/>
				<h5 className="pl-2 800px:block hidden font-Poppins text-black dark:text-white">
					Log Out
				</h5>
			</div>
		</div>
	);
};

export default SideBarProfile;
