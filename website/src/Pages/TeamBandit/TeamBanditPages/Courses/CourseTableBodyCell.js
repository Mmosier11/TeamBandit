import React, { useState } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';

import CoursePage from './CoursePage';

const CourseTableBodyCell = ({courseInfo, setCoursesChange}) => {

  const [title, setTitle] = useState(courseInfo.course_title);
  const [semester, setSemester] = useState(courseInfo.course_semester);
  const [description, setDescription] = useState(courseInfo.course_description);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTitle(courseInfo.course_title);
    setSemester(courseInfo.course_semester);
    setDescription(courseInfo.course_description);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle(courseInfo.course_title);
    setSemester(courseInfo.course_semester);
    setDescription(courseInfo.course_description);
  };

  const updateCourse = async e => {
    e.preventDefault();
    if (!title) {
      alert("Please add a Course Name");
      return;
    }
    try {
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("token", localStorage.token);


      const body = { title, semester, description };
      await fetch(
        `http://localhost:5000/courses/courses/${courseInfo.course_id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body)
        }
      );
      
      setTitle(courseInfo.course_title);
      setSemester(courseInfo.course_semester);
      setDescription(courseInfo.course_description);
      setCoursesChange(true);
      toast.success("Course edited successfully!");
      handleClose();

    } catch (err) {
      console.error(err.message);
      toast.error("Failed to update course!");
    }
  };

  async function deleteCourse(id) {
    try {
        await fetch(`http://localhost:5000/courses/courses/${id}`, {
          method: "DELETE",
          headers: { token: localStorage.token }
      });
  
      setCoursesChange(true);
      toast.success("Course was deleted!");
    } catch (err) {
      console.error(err.message);
      toast.error("Course failed to delete!");
      }
  }

  return (
    <TableRow
      key={courseInfo.course_id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <CoursePage courseInfo={courseInfo} setCoursesChange={setCoursesChange}/>
      </TableCell>
      <TableCell>
      {courseInfo.organizer_fname + " " + courseInfo.organizer_lname}
      </TableCell>
      <TableCell>
      {courseInfo.course_semester}
      </TableCell>
      <TableCell>
      {courseInfo.course_description}
      </TableCell>
    </TableRow>
  )
}

export default CourseTableBodyCell