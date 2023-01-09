import React from 'react'
import { User } from '../interfaces/user';

interface Props {
  user: User;
  handleDeleteUser: (id: number) => void;
}

const UserItem = ({user, handleDeleteUser}: Props) => {
  return (
    <div
      className="w-full p-6 my-2 border bg-white border-gray-200 rounded-lg shadow-md"
    >
      <div className="flex items-center justify-between bg-white">
        <div className="mb-2 text-2xl font-bold tracking-tight bg-white text-gray-900">
          {user.firstName} {user.lastName}
          <span className="ml-4 text-xl font-light bg-white">
            (#{user.id})
          </span>
        </div>
        <button
          onClick={() => {
            handleDeleteUser(user.id);
          }}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center shadow-md text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Delete
        </button>
      </div>
      <div className="font-normal bg-white text-gray-700 ">
        Date of Birth: {user.birthDate} Gender:{" "}
        {user.gender === "M" ? "Male" : "Female"} Created: {user.created}
      </div>
    </div>
  )
}

export default UserItem