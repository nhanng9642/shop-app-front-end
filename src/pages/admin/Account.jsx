import { Table } from '@/components'
import { AccountService } from '@/services'

export function Account() {
    const {getAccounts, deleteAccount} = AccountService;
    const tableHeader = ['ID', 'Username', 'Email', 'Role', 'Action'];
    const properties = ['id', 'username', 'email', 'role'];
    return (
        <Table
            name={'Account'}
            getData={getAccounts}
            deleteData={deleteAccount}
            tableHead={tableHeader}
            properties={properties}
        />
    )
}
