import {useState} from "react";
import {useForm} from "react-hook-form"
import { toast } from "react-hot-toast";
import { changePassword } from "@/services";
import { useAuth} from "@/context/auth-context";
import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Input,
} from "@material-tailwind/react"; 
import { ErrorMessage } from "@/components";

// eslint-disable-next-line react/prop-types
export function ChangePassDialog({open, setOpen}) {
	const {register, handleSubmit} = useForm();
	const [err, setErr] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const {dispatch} = useAuth();

	const handleOpen = () => setOpen((cur) => !cur);
	
	const onSubmit = async (data) => {
		setIsUpdate(true);
		const res = await changePassword(data);
		if(res.status === 'success'){
			setOpen(false);
			toast.success('Change password successfully');
            localStorage.setItem('token', res.token);
            dispatch({type: "SIGNIN", payload: res.data});
		}else {
			setErr(true);
			setIsUpdate(false);
		}
	}

	return (
		<>
			<Dialog
				size="xs"
				open={open}
				handler={handleOpen}
				className="bg-transparent shadow-none"
			>
				<Card className="mx-auto w-full max-w-[24rem]">
					<form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
						<CardBody className="flex flex-col gap-4">
							<Typography variant="h4" color="blue-gray">
								Change Password
							</Typography>
							
							<Typography className="-mb-2" variant="h6">
								Current Password
							</Typography>
							<Input type="password" size="lg" {...register('currentPassword',{
								required: 'Please enter current password'
							})} onFocus={() => setErr(false)}/>
							
							
							<Typography className="-mb-2" variant="h6">
								New Password
							</Typography>
							<Input type="password" size="lg" {...register('password',{
								required: 'Please enter new password'
							})} onFocus={() => setErr(false)}/>
							
							
							<Typography className="-mb-2" variant="h6">
								Confirm Password
							</Typography>
							<Input type="password" className="mb-1" size="lg" {...register('confirmPassword',{
								required: 'Please enter confirm password'
							})} onFocus={() => setErr(false)}/>
							<div className="mt-4">
								{err && <ErrorMessage mess="*The change password operation failed"/>}
							</div>
						</CardBody>
						<CardFooter className="pt-0">
							<Button variant="gradient" type="submit" fullWidth disabled={isUpdate}>
								Submit
							</Button>
						</CardFooter>
					</form>
				</Card>
			</Dialog>
		</>
	);
}