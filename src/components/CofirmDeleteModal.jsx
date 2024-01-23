import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";
import { ProductService } from "../utils/ProductService";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function ConfirmDeleteModal({id, forceUpdate}) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleOpen = () => setOpen(!open);

    const handleConfirm = async () => {
        console.log(id)
        setOpen(false);
        toast.promise(
            ProductService.deleteProduct(id),
            {
                loading: 'Deleting...',
                success: (data) => {
                    forceUpdate();
                    return 'Deleted successfully';
                },
                error: (err) => {
                    console.log(err);
                    return 'Something went wrong';
                }
            },
            {
                style: {
                    minWidth: '250px',
                }
            }
        );
    }

    return (
        <>
            <IconButton size="md" color='red' onClick={handleOpen} >
                <TrashIcon className="w-5 h-5"/>
            </IconButton>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleConfirm}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
