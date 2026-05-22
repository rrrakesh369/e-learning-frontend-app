  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import NotificationList from "./NotificationList";
  import { BASE_URL } from "../utils/constants";
  import CreateNotification from "./CreateNotification";
import { Link } from "react-router-dom";

  const SummaryBar = () => {

    const [stats, setStats] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [selectedType, setSelectedType] = useState("ALL");
    const [showForm, setShowForm] =  useState(false);

    const userId = "user1";

    const fetchStats = async () => {
      try {

        const res = await axios.get(`${BASE_URL}/stats?userId=${userId}`);

        console.log(res.data);

        setStats(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };  

  const fetchNotifications = async () => {

    const res = await axios.get(`${BASE_URL}?userId=user1`);

    setNotifications(res.data.data);
  };


  useEffect(() => {
      fetchStats();
      fetchNotifications();
    }, []);

    const markAsRead = async (id) => {

    try {

      // backend call
      await axios.patch(`${BASE_URL}/${id}/read`);

      // update notification list immediately

      setNotifications((prev) =>
        prev.map((notification) =>

          notification.id === id? {
                ...notification,
                read: true
              }
            : notification
        )
      );

      // update summary counts immediately

      setStats((prev) => ({...prev,unread: prev.unread > 0? prev.unread - 1 : 0}));

      
    } catch (error) {

      console.log(error);

    }
  };

  const handleRefresh = async () => {

    try {

      await Promise.all([fetchStats(), fetchNotifications()]);

    } catch (error) {

      console.log(error);

    }

  };



  const filteredNotifications =selectedType === "ALL"

          ? notifications : notifications.filter((notification)=> notification.type === selectedType);

    if (!stats) return <h1>Loading...</h1>;

    return (       
      <div>

            {showForm && (
              <CreateNotification fetchStats= {fetchStats} fetchNotifications= {fetchNotifications}  closeForm={()=>
                  setShowForm(false)}/>
      )

      }

      <div className="stats shadow w-full rounded-none bg-base-200">

    <div className="stat">
      <div className="stat-title">
        UNREAD
      </div>

      <div className="stat-value text-primary">
        {stats.unread}
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">
        TOTAL
      </div>

      <div className="stat-value text-secondary">
        {stats.total}
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">
        SYSTEM_ALERT
      </div>

      <div className="stat-value">
        {stats.byType.SYSTEM_ALERT || 0}
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">
        COURSE_ENROLLED
      </div>

      <div className="stat-value">
        {stats.byType.COURSE_ENROLLED || 0}
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">
        CERTIFICATE_ISSUED
      </div>

      <div className="stat-value">
        {stats.byType.CERTIFICATE_ISSUED || 0}
      </div>
    </div>

    <div className="stat">
      <div className="stat-title">
        ASSIGNMENT_DUE
      </div>

      <div className="stat-value">
        {stats.byType.ASSIGNMENT_DUE || 0}
      </div>
    </div>

  </div>

  <div className="flex justify-between my-4">

  <button

  className="btn btn-soft btn-info" onClick={handleRefresh}>

  Refresh

  </button>
  <button className="btn btn-soft btn-info" onClick={()=> setShowForm(!showForm)}>

    {showForm ? "Close" : "Create"}

    </button>

  <select className="select select-sm select-bordered w-52" value={selectedType} onChange={(e)=> setSelectedType(e.target.value)}>

  <option value="ALL"> All </option>

  <option value="COURSE_ENROLLED"> Course Enrolled </option>

  <option value="ASSIGNMENT_DUE"> Assignment Due </option>

  <option value="CERTIFICATE_ISSUED"> Certificate Issued</option>

  <option value="SYSTEM_ALERT"> System Alert </option>

  </select>

  </div>
        <NotificationList notifications={filteredNotifications}  markAsRead={markAsRead}/>
      </div>

    );
  };

  export default SummaryBar;