import React, { useState, useEffect } from "react";

// MUI Imports
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

// Datagrid
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";

import AddScheduleWeek from "./AddScheduleWeek";

function ScheduleList({courseInfo}) {
    const [rows, setRows] = useState([]);
    const [rowChange, setRowChange] = useState(false);
    const [assignments, setAssignments] = useState([]);

    const assignmentPage = (params) => {
        // 1 week = 604800000 milliseconds

        var millisecondsOfWeek = new Date(params.row.schedule_week).getTime();

        return (
            <div>
                {assignments.map((assignment) => (
                    Math.abs((Date.parse(assignment.assignment_due_date.split('T')[0]) - millisecondsOfWeek)) < 604800000 && (Date.parse(assignment.assignment_due_date.split('T')[0]) - millisecondsOfWeek) >= 0 &&
                    <Link target="_blank" to={`/assignment/${assignment.assignment_name}-${assignment.assignment_id}`}>
                        <p>{assignment.assignment_name}</p>
                    </Link>
                ))}
            </div>
        );
    };

    const getProperWeekFormat = (params) => {
        const week = params.row.schedule_week;
        var weekArray = week.split('-');
        var newWeek = weekArray[1] + '/' + weekArray[2].split('T')[0];
        return (
            <div>
                {newWeek}
            </div>
        );
    };

    const getAssignments = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASEURL}/assignments/`,
                { method: "GET", headers: { token: localStorage.token } }
            );
            const jsonData = await response.json();

            setAssignments(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAssignments();
    }, []);

    const columns = [
      {
          field: "schedule_week",
          headerName: "Week",
          renderCell: getProperWeekFormat,
          flex: 2,
      },
      {
          field: "schedule_description",
          headerName: "Topics and Assignments",
          sortable: false,
          flex: 2,
      },
      {
          field: "schedule_deliverables",
          headerName: "Deliverables",
          renderCell: assignmentPage,
          sortable: false,
          flex: 2,
      },
  ];

  const CustomToolbar = () => {
      return (
          
              <GridToolbarContainer style={{ backgroundColor: "#FAC01A" }} >
                  <Typography sx={{ m: 1 }} variant="h4">
                      Assignments
                  </Typography>
                  <GridToolbarExport sx={{ m: 1 }} />
                  <AddScheduleWeek
                      courseInfo={courseInfo}
                      rows={rows}
                      setRowChange={setRowChange}
                  />
              </GridToolbarContainer>
      );
  };

  const getSchedule = async () => {
      try {
          const response = await fetch(
              `${process.env.REACT_APP_BASEURL}/schedule/${courseInfo.course_id}`,
              { method: "GET", headers: { token: localStorage.token } }
          );
          const jsonData = await response.json();

          setRows(jsonData);
      } catch (err) {
          console.error(err.message);
      }
  };

    useEffect(() => {
        getSchedule();
        setRowChange(false);
    }, [rowChange]);

    return (
        <>
            <div
                style={{
                    padding: "25px",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                }}
            >
                <DataGrid
                    rows={rows}
                    //rows={[{ schedule_week_id: 1, schedule_week: '3/06', schedule_description: 'Description', schedule_deliverables: 'Assignment', assignment_id: 15, assignment_name: "m" }]}
                    columns={columns}
                    rowHeight={150}
                    getRowId={(rows) => rows.schedule_week_id}
                    components={{ Toolbar: CustomToolbar }}
                    disableSelectionOnClick
                    disableColumnSelector
                />
            </div>
        </>
    );
}
export default ScheduleList;
