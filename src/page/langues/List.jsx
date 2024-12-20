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
        const response = await axiosIns.get("langues");
        setData(response.data); // Assuming the API returns an array of records
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (languesID) => {
    try {
      // Perform delete request
      const response = await axiosIns.delete(`langues/${languesID}`);

      if (response.status === 200) {
        // Remove the deleted item from the state
        setData((prevData) => prevData.filter((item) => item.languesID !== languesID));
      }
    } catch (error) {
      console.error("Error deleting Editor:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Langues ID",
        accessorKey: "languesID",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "langues",
        accessorKey: "langues",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "actions",
        accessorKey: "actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => (
          <div>
            {/* Edit Button */}
            <Link to={`/languesEdit/${row.original.languesID}`} className="btn btn-primary mr-2 bx bx-edit"></Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(row.original.languesID)}
              className="btn btn-danger bx bx-trash"
              title="Delete"
            >
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Meta title
  document.title = "List Langues";

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
        
        {/* Add Button Link */}
        <div className="mb-4">
          <Link to="/languesAdd" className="btn btn-primary">
            Add Language
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
