import { IconButton } from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/solid'
import { ConfirmDeleteModal } from './CofirmDeleteModal'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export function Action({route, _id, onDelete, deleteRow}) {
    return (
        <div className="flex items-center gap-3">
            <Link to={`${route}${_id}`}>
                <IconButton size="md" color='blue' >
                    <PencilIcon className="w-5 h-5" />
                </IconButton>
            </Link>

            <ConfirmDeleteModal id={_id} forceUpdate={onDelete} deleteRow={deleteRow}/>
        </div>
    )
}
