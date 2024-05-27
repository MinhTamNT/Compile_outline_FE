import React, { useState } from "react";

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    username: "dthanh123",
    avatarUser:
      "https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/47262838_2138678889505178_8494951695191638016_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HM54JaB5WLIQ7kNvgFWw27A&_nc_ht=scontent.fsgn8-4.fna&oh=00_AYATUeqOQ5-34JKnN1f4svJ057EJQgSTqpng13XOGILekA&oe=667BE682",
    email: "dhthanh123@gmai.com",
    phone: "+8434567890",
    address: "123 Main St, City, Country",
    role: "Giao Vien",
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const infoFields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "text" },
    { label: "Address", name: "address", type: "text" },
  ];

  return (
    <div className="container mt-10 mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full lg:w-2/3 mx-auto">
        <div className="p-8 lg:flex">
          <div className="lg:w-1/3 text-center lg:py-12 lg:border-r">
            <img
              src={userInfo.avatarUser}
              alt="avatar-user"
              className="rounded-full w-32 h-32 mx-auto mb-4 lg:mb-0 lg:w-48 lg:h-48 object-cover"
            />
          </div>
          <div className="lg:w-2/3 p-4">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            {infoFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block font-semibold mb-2"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={userInfo[field.name]}
                  readOnly={!isEditing}
                  className="w-full bg-gray-100 border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            ))}
            <div className="flex justify-center lg:justify-start mt-6">
              <button
                className={`py-2 px-4 rounded-md focus:outline-none ${
                  isEditing
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                } hover:bg-blue-600 hover:text-white`}
                onClick={toggleEdit}
              >
                {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
