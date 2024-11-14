/* eslint-disable react/prop-types */
import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { AccountService } from "@/services";
import { ErrorMessage } from "@/components";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function AccountForm
({ accountID }) {
  const navigate = useNavigate();
  const [acccount, setAcccount] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: acccount,
  });

  const onSubmit = async (data) => {
    if (!accountID) {
      setIsUpdate(true);
      toast.promise(
        AccountService.createAccount(data),
        {
          loading: 'Loading...',
          success: <span>Account saved!</span>,
          error: error => (<span>Could not save
            <br />
            <span className='capitalize'>{error.message}</span>
          </span>)
        }
      );
      setIsUpdate(false);
    }
    else {
      console.log(data);
      setIsUpdate(true);
      toast.promise(
        AccountService.updateAccount(data),
        {
          loading: 'Loading...',
          success: <span>Account saved!</span>,
          error: error => (<span>Could not save
            <br />
            <span className='capitalize'>{error.message}</span>
          </span>)
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
        <div className="grid grid-cols gap-6">
          <div>
            {/* User ID */}
            <div className="mb-3 flex flex-col gap-6" >
              <Typography variant="small" color="blue-gray"
                className="-mb-5 font-medium">
                User ID
              </Typography>
              <Input  {...register('userId', {
                required: 'Please enter category name',
              })} disabled
                placeholder="Category Name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.name && <ErrorMessage mess={errors.name.message} />}
            </div>

            <div className="mb-1 flex flex-col gap-6 mt-4">
              <Typography variant="small" color="blue-gray"
                className="-mb-5 font-medium">
                Balance
              </Typography>
              <Input {...register('balance')}
                type="number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>

        </div>

        <Button className="mt-6 w-fit ml-auto" fullWidth type="submit" disabled={isUpdate}>
          {accountID ? "Update Account" : "Add Account"}
        </Button>
      </form>

    </div>
  )
}
