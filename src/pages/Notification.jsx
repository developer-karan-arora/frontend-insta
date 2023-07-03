import React from 'react'
import { useSelector } from 'react-redux';
import RequireLogin from '../Container/RequireLogin';

function Notification() {
    let globalAuth = useSelector((store) => store.globalAuth);
    console.log(!globalAuth)
    if (!globalAuth) return <RequireLogin />;
  return (
    <div>Notification</div>
  )
}

export default Notification