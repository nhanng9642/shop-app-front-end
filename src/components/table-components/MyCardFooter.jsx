import { IconButton, Typography, CardFooter } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

// eslint-disable-next-line react/prop-types
export function MyCardFooter({ totalPages = 10, page, updatePage }) {
  const next = () => {
    if (page === totalPages) return;
    updatePage(page + 1);
  };

  const prev = () => {
    if (page === 1) return;
    updatePage(page - 1);
  };

  return (
    <CardFooter className='mx-auto -mt-4'>
        <div className="flex items-center gap-8">
            <IconButton
                size="sm"
                variant="outlined"
                onClick={prev}
                disabled={page === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        
            <Typography color="gray" className="font-normal">
                Page <strong className="text-gray-900">{page}</strong> of{" "}
                <strong className="text-gray-900">{totalPages}</strong>
            </Typography>
        
            <IconButton
                size="sm"
                variant="outlined"
                onClick={next}
                disabled={page === totalPages}
            >
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        </div>
    </CardFooter>)
}