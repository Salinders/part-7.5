import {useSelector} from 'react-redux'
const Notification = () => {
    const notification = useSelector(state=> state.notifications)

    return (
        <div className="error">
            {notification}
        </div>
    )
}
export default Notification

