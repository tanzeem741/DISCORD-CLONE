import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import './Sidebar.css';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import { selectUser } from '../userSlice';
import db, { auth } from '../firebase';
import { setChannel } from '../channelSlice';

function Sidebar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection("channels").onSnapshot((snapshot) => {
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    channel: doc.data()
                }))
            )
        })
    }, []);

    const addChannel = () => {
        const channelName = prompt('Enter New Channel Name');

        if (channelName) {
            db.collection("channels").add({
                channelName: channelName,
            });
        }
    }
    console.log(channels);

    const setChannelName = (id,channelName) => {
        dispatch(setChannel({
            id: id,
            name:channelName
        }))
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h2>Academind</h2>
                <AddIcon fontSize="small" className="sidebar__icon" onClick={addChannel} />
                
            </div>
            <div className="sidebar__channels">
                {channels.map(({ id, channel}) => ( <p onClick={()=>setChannelName(id,channel.channelName)} key={id}><span className="sidebar__hash">#</span>
                    {channel.channelName}</p>
                ))}
                
            </div>
            <div className="sidebar__bottom sidebar__bottom--bg">
                <Avatar src={user.photo} onClick={() => (auth.signOut())}/>
                <div className="sidebar__user">
                    <h4>{user.displayName}</h4>
                    <p>#{user.uid.substring(0,4)}</p>
                </div>
                <div>
                    <MicIcon className="sidebar__icon"  />
                    <HeadsetIcon className="sidebar__icon" />
                    <SettingsIcon className="sidebar__icon"  />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
