import React, {useEffect, useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from 'axios';
import { useAuthentication } from '../AuthContext';
import { HubConnectionBuilder } from '@microsoft/signalr';

const Home = () => {

    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const { user } = useAuthentication();
    const connectionRef = useRef();

    useEffect(() => {

        const hubConnection = async () => {
            const connection = new HubConnectionBuilder().withUrl("/api/task").build();
            await connection.start();
            connectionRef.current = connection;

            connection.on("refresh", _ => {
                loadStuff();
            });
        };

        hubConnection();
        loadStuff();

    }, []);

    const loadStuff = async () => {
        const { data } = await axios.get('/api/task/get');
        setItems(data);
    }

    const onUpdateClick = async num => {
        await axios.post('/api/task/updatestatus', { Id: num });
        connectionRef.current.invoke('taskUpdate');
        loadStuff();
    }

    const onAddClick = async e => {
        e.preventDefault();
        setTitle('');
        const item = {
            title,
            status: 0
        };
        await axios.post('/api/task/additem', { Task: item });
        connectionRef.current.invoke('taskUpdate');
        loadStuff();
    }

    const getText = task => {
        if (task.status === 'Available') {
            return "I'll do it!";
        } else if (task.status === 'WorkingOn') {
            if (task.userId === user.id) {
                return 'Done';
            } else {
                return `${task.user.name} is doing it`;
            }
        }
    }

    const getButtonClass = task => {
        if (task.status === 'Available') {
            return "btn-primary";
        } else if (task.status === 'WorkingOn') {
            if (task.userId === user.id) {
                return 'btn-success';
            } else {
                return "btn-warning";
            }
        }
    }

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <h1>This is today's to do list. Good luck!</h1>
            <hr/>
            <div name='add task'>
                <form onSubmit={onAddClick}>
                <div className='row'>
                    <div className='col-md-4 offset-6'>
                        <input type='text' name='title' placeholder='Title' className='form-control' value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='col-md-2'>
                            <button className='btn btn-outline-danger w-100' disabled={!title }>Add</button>
                    </div>
                    </div>  
                </form>
            </div>
            <br/>
            <div name='data'>
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(i => 
                            <tr key={i.id}>
                                <td>
                                    <h5>{i.title}</h5>
                                </td>
                                <td>
                                    <button className={`btn ${getButtonClass(i)} w-100`} disabled={!(i.status === 'Available' || i.userId === user.id)} onClick={() => onUpdateClick(i.id)}>{getText(i)}</button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;