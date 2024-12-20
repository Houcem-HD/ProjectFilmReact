import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link
// Import components
import Breadcrumbs from "../../components/Common/Breadcrumb";
import TableContainer from "../../components/Common/TableContainer";
import axiosIns from "../../plugins/axios";

const DatatableTables = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data using Axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosIns.get("Film");  // Adjusted to the correct endpoint
        setData(response.data); // Assuming the API returns an array of Film objects
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Perform delete request
      const response = await axiosIns.delete(`Film/${id}`);

      if (response.status === 204) {
        // Remove the deleted item from the state
        setData((prevData) => prevData.filter((item) => item.filmID !== id));  // Adjusted field name
      }
    } catch (error) {
      console.error("Error deleting Film:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Film ID",
        accessorKey: "filmID",  // Adjusted to match the FilmID field from backend
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Nom",
        accessorKey: "nom",  // Adjusted to match the 'Nom' field from backend
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Description",
        accessorKey: "description",  // Adjusted to match the 'Description' field from backend
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Date Created",
        accessorKey: "dateCreated",  // Adjusted to match the 'DateCreated' field from backend
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Duree (minutes)",
        accessorKey: "duree",  // Adjusted to match the 'Duree' field from backend
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Poster",
        accessorKey: "poster",  // Adjusted to match the 'Poster' field from backend
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => (
          <div>
            {/* Edit Button */}
            <Link
              to={`/filmsEdit/${row.original.filmID}`}  // Adjusted to match 'filmID' field
              className="btn btn-primary mr-2 bx bx-edit"
            ></Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(row.original.filmID)}  // Adjusted to match 'filmID' field
              className="btn btn-danger bx bx-trash"
              title="Delete"
            ></button>
          </div>
        ),
      },
    ],
    []
  );

  // Meta title
  document.title = "List Films";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />

        {/* Add Button Link */}
        <div className="mb-4">
          <Link to="/filmsAdd" className="btn btn-primary">
            Add Film
          </Link>
        </div>

        {loading ? (
          <p>Loading data...</p>
        ) : (
          <TableContainer
            columns={columns}
            data={data || []}
            isGlobalFilter={true}
            isPagination={true}
            SearchPlaceholder="Search records..."
            pagination="pagination"
            paginationWrapper="dataTables_paginate paging_simple_numbers"
            tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
          />
        )}
      </div>
    </div>
  );
};

DatatableTables.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default DatatableTables;
