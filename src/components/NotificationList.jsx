import React from "react";

const NotificationList = ({ notifications,  markAsRead,  selectedType,
  setSelectedType }) => {

  const getBadgeColor = (type) => {
    switch (type) {
      case "COURSE_ENROLLED":
        return "badge-info";

      case "ASSIGNMENT_DUE":
        return "badge-warning";

      case "CERTIFICATE_ISSUED":
        return "badge-success";

      case "SYSTEM_ALERT":
        return "badge-error";

      default:
        return "badge-neutral";
    }
  };

  if (!notifications?.length) {
    return (
      <h1 className="text-center mt-5">No Notifications Found</h1>
    );
  }

  return (
    <div>
      
 <div className="overflow-x-auto mt-6">    

      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Message</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

          {notifications.map((notification) => (

            <tr key={notification.id}>
              <td className={notification.read ? "font-normal" : "font-bold"}>
                {notification.title}
              </td>



              <td>

                <span className={`badge ${getBadgeColor(notification.type)}`}>

                  {notification.type}

                </span>

              </td>

              <td>
                {notification.message}
              </td>

              <td>

                {new Date(notification.createdAt).toLocaleString()}

              </td>

              <td>
                {!notification.read && (

                  <button className="btn btn-soft btn-info"
                    onClick={() =>
                      markAsRead(notification.id)
                    }
                  >

                    Mark as Read

                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>
      
    </div>

    </div>
    
   

  );
};

export default NotificationList;