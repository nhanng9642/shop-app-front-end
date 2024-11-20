import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
} from "@material-tailwind/react";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

// eslint-disable-next-line react/prop-types
export function ConfirmDeleteModal({ id, forceUpdate, deleteRow }) {
    const [open, setOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        if (open) {
            setIsDisabled(true);
            setTimeout(() => {
                setIsDisabled(false);
            }, 1500);
        }
    }, [open])

    const handleConfirm = async () => {
        setOpen(false);
        toast.promise(
            deleteRow(id),
            {
                loading: 'Deleting...',
                success: (data) => {
                    forceUpdate(id);
                    return data.message;
                },
                error: (err) => {
                    return err.message;
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
                <TrashIcon className="w-5 h-5" />
            </IconButton>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Delete this item</DialogHeader>

                <DialogBody>
                    Are you sure you want to delete this item?
                    This action cannot be reversed.
                </DialogBody>

                <DialogFooter>
                    <Button variant="gradient" color="red"
                        disabled={isDisabled}
                        onClick={handleConfirm}>
                        <span>Delete</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="black"
                        onClick={handleOpen}
                        className="ml-2"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
