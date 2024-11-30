import { Table } from '@/components'
import { deleteCategory, getCategories } from '@/services'

export function Category() {
    const tableHeader = ["#", "Name", "Description", "Action"];
    const properties = ["id", "categoryName", "description"];
    
    return (
        <Table
            name="Category"
            tableHead={tableHeader}
            properties={properties}
            deleteData={deleteCategory}
            getData={getCategories}
        />
    )
}

