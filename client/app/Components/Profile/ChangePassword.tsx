/* eslint-disable jsx-a11y/role-supports-aria-props */

import React, { FC, useEffect, useState } from 'react';
import { styles } from '../../Style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
type Props = {};

const ChangePassword: FC<Props> = () => {
	const [newPassword, setNewPassword] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

	const passworChangeHandler = async (e: any) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error('Password do not match 🐒');
		} else {
			await updatePassword({ oldPassword, newPassword });
			setConfirmPassword("")
			setNewPassword("")
			setOldPassword("")
		}
	};

    useEffect(() => {
        if(isSuccess){
            toast.success("Password Changed Successfully!! 👍")
        }
        if(error){
            if("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [error, isSuccess])
    

	return (
		<div className="w-full pl-7 px-2 800px:pl-0">
			<h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500]  dark:text-[#fff] text-black pb-2">
				{' '}
				Change Password{' '}
			</h1>
			<div className="w-full">
				<form
					aria-required
					onSubmit={passworChangeHandler}
					className="flex flex-col items-center"
				>
					<div className="w-[100%] 800px:w-[60%] mt-5">
						<label className="block pb-2 text-black dark:text-[#fff]">
							Enter Your old Password
						</label>
						<input
							type="password"
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
						/>
					</div>
					<div className="w-[100%] 800px:w-[60%] mt-2">
						<label className="block pb-2 text-black dark:text-[#fff]">
							Enter Your New Password
						</label>
						<input
							type="password"
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</div>
					<div className="w-[100%] 800px:w-[60%] mt-2">
						<label className="block pb-2 text-black dark:text-[#fff]">
							Confirm Your New Password
						</label>
						<input
							type="password"
							className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
							required
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<input
							type="submit"
							className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer hover:bg-[#37a39a]  hover:text-white`}
							required
							value="Update"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
