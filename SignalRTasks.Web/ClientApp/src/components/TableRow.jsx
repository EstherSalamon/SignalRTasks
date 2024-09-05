

const TableRow = (TaskItem) => {
    const { id, title, status } = this.props.TaskItem;

    const onStatusClick = async status => {

        await axios.post('/api/task/updatestatus', { id, status });
    }

    return (
        <tr key={id}>
            <td>{title}</td>
            <td>
                {status === 'Available' && <button className='btn btn-outline-success w-100' onClick={() => onStatusClick('WorkingOn')}>Let me try this one out...</button>}
                {status === 'WorkingOn' && <button className='btn btn-outline-info w-100' disabled>Some guy is doing this already</button>}
                {status === 'Done' && <button className='btn btn-outline-primary w-100' onClick={() => onStatusClick('Done')}>I'm done! Finally!</button>}
            </td>
        </tr>
    )
}

export default TableRow;