
import React, { useEffect } from "react";
import useRequest from "./../hooks/useRequest";
import { createUser, getLastId } from "./../api";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  birthDate: Yup.date().required("birth date is required"),
  gender: Yup.string().required("gender is required"),
});

type UserSubmitForm = {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
};

const AddUserForm = () => {
  const [_createUser, , createUserRes] = useRequest(createUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<UserSubmitForm> = (data: UserSubmitForm) => {
    getLastId()
      .then((res) => {
        _createUser({
          id: res.data.items[0].id + 1,
          birthDate: data.birthDate.toISOString().split("T")[0],
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          created: new Date().toISOString().split("T")[0],
        });
      })
      .catch((err) => {
        toast.error(err.message || "Something went wrong");
      });
  };

  useEffect(() => {
    if (createUserRes) {
      reset();
      toast.success("User addition success");
    }
  }, [createUserRes, reset]);

  return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="text-red-500 text-xs italic">
            {errors.firstName?.message}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="text-red-500 text-xs italic">
            {errors.lastName?.message}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            {...register("birthDate", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="text-red-500 text-xs italic">
            {errors.birthDate?.message}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender
          </label>
          <select
            {...register("gender")}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <div>{errors.gender?.message}</div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
  )
}

export default AddUserForm