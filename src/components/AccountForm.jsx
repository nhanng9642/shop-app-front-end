/* eslint-disable react/prop-types */
import {
  Button,
  Typography,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { AccountService } from "@/services";
import { TextInput } from "@/components";

export function AccountForm
({ accountID }) {
  const navigate = useNavigate();
  const [acccount, setAcccount] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: acccount,
  });

  const onSubmit = async (data) => {
    if (!accountID) {
      return toast.error("Account ID is required");
    }
    else {
      setIsUpdate(true);
      toast.promise(
        AccountService.updateAccount(data),
        {
          loading: 'Loading...',
          success: res => res.message,
          error: res => res.message,
        }
      );
      setIsUpdate(false);
    }
  }

  useEffect(() => {
    const fetchProduct = async (id) => {
      const data = await AccountService.getAccount(id);
      if (!data)
        navigate("/page-not-found");
      setAcccount(data);    
      reset({ ...data });
    }

    if (accountID) {
      fetchProduct(accountID);
    }
  }, [accountID, navigate, reset])

  return (
    <div className='min-h-[400px]'>
      <Typography variant="h4">
        {accountID ? "Edit Account" : "Add Account"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"
        className="mt-4 mb-2 mx-auto w-2/5">
            <TextInput 
                label="User ID"
                register={register}
                name="id"
                disabled
            />

            <TextInput
                label="First name"
                register={register}
                name="firstName"
                disabled
            />

            <TextInput
                label="Last name"
                register={register}
                name="lastName"
                disabled
            />

            <TextInput 
                label="Username"
                register={register}
                name="username"
                disabled
            />

            <TextInput 
                label="Email"
                register={register}
                name="email"
                disabled
            />

            <TextInput
                label="Role"
                register={register}
                name="role"
                disabled
            />


        <Button className="mt-6 w-fit ml-auto" fullWidth type="submit" disabled={isUpdate}>
          {accountID ? "Update Account" : "Add Account"}
        </Button>
      </form>

    </div>
  )
}
