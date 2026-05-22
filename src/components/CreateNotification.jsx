import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const CreateNotification = ({
  fetchStats,
  fetchNotifications,
  closeForm
}) => {

  const [form, setForm] = useState({

    userId: "",
    title: "",
    message: "",
    type: ""

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setForm({ ...form,[e.target.name]: e.target.value});

  };

  const validate = () => {

    let newErrors = {};

    if (!form.userId.trim()) {

      newErrors.userId =
      "User Id required";

    }

    if (!form.title.trim()) {

      newErrors.title =
      "Title required";

    }

    if (!form.message.trim()) {

      newErrors.message =
      "Message required";

    }

    if (!form.type) {

      newErrors.type =
      "Type required";

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      await axios.post(BASE_URL,form);

      await fetchStats();

      await fetchNotifications();

      setForm({userId: "",title: "", message: "",type: ""});

      setErrors({});

      closeForm();

    }

    catch(error){

      console.log(error);

    }

  };

  return (

    <form onSubmit={handleSubmit} className="card bg-base-100 p-6 shadow">

      {/* inputs */}

      <input type="text" name="userId" placeholder="User Id" value={form.userId} onChange={handleChange} className="input input-bordered mb-2" />

    {   
        errors.userId && ( 
        <p className="text-red-500"> {errors.userId}</p>

)

}

    <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="input input-bordered mb-2" />

    {

    errors.title && (
    <p className="text-red-500">{errors.title}</p>

    )

    }

    <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} className="textarea textarea-bordered mb-2" />

{

    errors.message && (
    <p className="text-red-500">{errors.message}</p>)

}

    <select name="type" value={form.type} onChange={handleChange} className="select select-bordered mb-2">

        <option value=""> Select Type </option>

        <option value="COURSE_ENROLLED">Course Enrolled</option>

        <option value="ASSIGNMENT_DUE">Assignment Due</option>

        <option value="CERTIFICATE_ISSUED">Certificate Issued</option>

        <option value="SYSTEM_ALERT">System Alert   </option>

    </select>

{

    errors.type && (
    <p className="text-red-500">{errors.type}</p>)

}

    <button type="submit" className="btn btn-soft btn-info w-auto">submit</button>

    </form>

  );

};

export default CreateNotification;