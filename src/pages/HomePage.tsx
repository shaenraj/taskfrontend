import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { User } from "./../interfaces/user";
import { useAppDispatch } from "./../store";
import { getUsers } from "./../store/features/userSlice";
import { createSearchParams, useSearchParams } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { deleteUser } from "../api";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import SortSet from "../components/SortSet";
import UserItem from '../components/UserItem';

const parameterList = [
  "id",
  "birthDate",
  "firstName",
  "lastName",
  "gender",
  "created",
];
const sortList = ["asc", "desc"];

const HomePage = () => {
  const { users, total, loading, errors } = useSelector(
    (state: RootState) => state.user
  );

  const [routeParams, setRouteParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [parameter, setParameter] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const pageCount = size ? Math.ceil(total / size) : 0;

  const [_deleteUser, deleteLoading, , deleteUserError, deleteUserStatus] =
    useRequest(deleteUser);

  useEffect(() => {
    const pageInfo = routeParams.get("page");
    const sizeInfo = routeParams.get("size");
    const sortQueryInfo = routeParams.get("sort");

    if (pageInfo && /\d/.test(pageInfo)) {
      setPage(Number(pageInfo));
    } else {
      setPage(0);
    }

    if (sizeInfo && /\d/.test(sizeInfo)) {
      setSize(Number(sizeInfo));
    } else {
      setSize(20);
    }

    if (sortQueryInfo !== null) {
      const parameterInfo = sortQueryInfo.split(",")[0];
      const sortInfo = sortQueryInfo.split(",")[1];
      if (parameterList.includes(parameterInfo)) {
        setParameter(parameterInfo);
      } else {
        setParameter("id");
      }
      if (sortList.includes(sortInfo)) {
        setSort(sortInfo);
      } else {
        setSort("asc");
      }
    } else {
      setParameter("id");
      setSort("asc");
    }
  }, [routeParams]);

  useEffect(() => {
    if (page !== null && size !== null && parameter !== null && sort !== null) {
      dispatch(
        getUsers({ page: page, size: size, sortQuery: `${parameter},${sort}` })
      );
    }
  }, [dispatch, page, size, parameter, sort]);

  useEffect(() => {
    if (deleteUserError) {
      toast.error(deleteUserError.message || "Something went wrong");
    }
  }, [deleteUserError]);

  useEffect(() => {
    if (!deleteLoading) {
      if (deleteUserStatus === 204) {
        toast.success("User deletion successful");
      }
      if (
        page !== null &&
        size !== null &&
        parameter !== null &&
        sort !== null
      ) {
        dispatch(
          getUsers({
            page: page,
            size: size,
            sortQuery: `${parameter},${sort}`,
          })
        );
      }
    }
  }, [deleteUserStatus, deleteLoading]);

  useEffect(() => {
    if (errors) {
      toast.error(errors);
    }
  }, [errors]);

  const handleDeleteUser = (id: number) => {
    _deleteUser(id);
  };

  const handlePageClick = (e: any) => {
    setRouteParams(
      createSearchParams({
        page: e.selected,
        size: `${size}`,
        sort: `${parameter},${sort}`,
      })
    );
  };

  return (
    <div className="w-5/6 mx-auto">
      <Oval
        height={80}
        width={80}
        color="#64748B"
        wrapperStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          WebkitTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass=""
        visible={loading}
        ariaLabel="oval-loading"
        secondaryColor="#94A3B8"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
      {page !== null &&
        size !== null &&
        parameter !== null &&
        sort !== null && (
          <>
            <SortSet
              page={page}
              size={size}
              parameter={parameter}
              sort={sort}
              setRouteParams={setRouteParams}
            />
            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              forcePage={page}
              previousLabel="previous"
              containerClassName="h-20 flex items-center justify-center"
              previousLinkClassName="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
              pageLinkClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800"
              activeLinkClassName="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
              nextLinkClassName="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
              breakLinkClassName="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            />
          </>
        )}

      {users &&
        users.map((user: User, index: number) => (
          <UserItem user={user} key={index} handleDeleteUser={handleDeleteUser} />
        ))}
    </div>
  );
};

export default HomePage;
