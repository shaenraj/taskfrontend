import React from 'react'
import { createSearchParams } from 'react-router-dom';

interface Props {
  page: number;
  size: number;
  parameter: string;
  sort: string;
  setRouteParams: (URLSearchParams: URLSearchParams) => void;
}

const SortSet = ({page, size, parameter, sort, setRouteParams}: Props) => {
  return (
    <div className="h-20 flex items-center justify-evenly">
      <label htmlFor="size">Size</label>
      <input
        type="number"
        id="size"
        value={size}
        min="1"
        max="30"
        onChange={(e) => {
          setRouteParams(
            createSearchParams({
              page: `${page}`,
              size: e.target.value,
              sort: `${parameter},${sort}`,
            })
          );
        }}
        className="border bg-white border-gray-300 rounded-sm"
      />
      <label htmlFor="parameter">Parameter</label>
      <select
        id="parameter"
        value={parameter}
        onChange={(e) => {
          setRouteParams(
            createSearchParams({
              page: `${page}`,
              size: `${size}`,
              sort: `${e.target.value},${sort}`,
            })
          );
        }}
        className="border bg-white border-gray-300 rounded-sm"
      >
        <option value="id">ID</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
        <option value="birthDate">Birth Date</option>
        <option value="gender">Gender</option>
        <option value="created">Created Date</option>
      </select>
      <label htmlFor="sort">Sort</label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => {
          setRouteParams(
            createSearchParams({
              page: `${page}`,
              size: `${size}`,
              sort: `${parameter},${e.target.value}`,
            })
          );
        }}
        className="border bg-white border-gray-300 rounded-sm"
      >
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  )
}

export default SortSet