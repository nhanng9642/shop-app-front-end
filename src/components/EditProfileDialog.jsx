import {useRef, useState} from "react";
import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Input,
} from "@material-tailwind/react";
import { useGlobalContext,signin } from "../context";
import {useForm} from "react-hook-form";
import { userServices } from "../utils";
import {toast} from "react-hot-toast"
export function EditProfileDialog({open, setOpen}) {
	const {register, handleSubmit, formState: {errors}} = useForm();
	const [preview, setPreview] = useState(null);
	const [isUpdate, setIsUpdate] = useState(false)
	
	const imageInput = useRef(null);
	const {user, dispatch} = useGlobalContext();
	const handleOpen = () => setOpen((cur) => !cur);
	const handleChangeImage = (e) => {
		const file = e.target.files[0];
		if(file) {
			const link = URL.createObjectURL(file);
			if(preview){
				URL.revokeObjectURL(preview);
			}
			setPreview(link);
		}
	}
	const onSubmit = async(data) => {
		setIsUpdate(true);
		data.image = imageInput.current.files[0];
		if(!data.image) delete data.image;
		const res = await userServices.updateMe(data);
		if(res.status == "success"){
			setOpen(false);
			toast.success('Edit profile successfully');
			dispatch(signin(res.data));
		}
	}
	return (
		<Dialog
			size="xs"
			open={open}
			handler={handleOpen}
			className="bg-transparent shadow-none"
		>
			<Card className="mx-auto w-full max-w-[24rem] max-h-[450px] overflow-y-auto"
			>
				<form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
					<CardBody className="flex flex-col gap-4">
						<Typography variant="h4" color="blue-gray">
							Edit Profile
						</Typography>
						<Typography className="-mb-2" variant="h6">
							Name
						</Typography>
						<Input type="text" size="lg" {...register('name',{
							required: 'Please enter name'
						})} defaultValue={user.name}/>
						<Typography className="-mb-2" variant="h6">
							Email
						</Typography>
						<Input type="email" size="lg" {...register('email',{
							required: 'Please enter email'
						})} defaultValue={user.email}/>
						<label className="mb-2 mr-2 text-sm font-medium text-gray-900 border border-gray-300 
							rounded-lg p-2 cursor-pointer w-fit hover:bg-gray-100 "
							htmlFor="file_input">
							Upload image:
						</label>
						<input className="block w-full text-sm text-gray-900 border 
							border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden 
							focus:outline-none"
							onChange={handleChangeImage} ref={imageInput}
							id="file_input" type="file" />
						<img src={ preview || user.image}/>
					</CardBody>
					<CardFooter className="pt-0">
						<Button type="submit" variant="gradient" fullWidth disabled={isUpdate}>
							Submit
						</Button>
					</CardFooter>
				</form>
			</Card>
		</Dialog>
	);
}