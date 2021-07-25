import { Box, LinearProgress, makeStyles, TableCell, TableRow } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { capitalize, upperCase } from 'lodash-es';
import { Params, Student } from 'models';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import CustomTable from 'shared/components/common/CustomTable';
import { useAppDispatch, useAppSelector } from 'shared/hooks';
import { studentActions } from '../store/slice';

export interface StudentHeaderTable {
  name: string;
  align: "left"|"right"|"center"|"inherit"|"justify";
  class?: string;
}

const useStyle = makeStyles(theme => (
  {
    root: {
      position: 'relative',
    },
    actions: {
      width: "7%"
    },
    actionRows: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    icon: {
      cursor: "pointer",
    },
    loading: {
      position: 'absolute',
      top: theme.spacing(-1),
      width: '100%',
    },
  }
))

export default function StudentsManagement () {

  const dispatch = useAppDispatch()
  const students = useAppSelector(state => state.student.students)
  const pagination = useAppSelector(state => state.student.pagination)
  const loading = useAppSelector(state => state.student.loading)
  const classes = useStyle()
  const history = useHistory()

  const headers: StudentHeaderTable[] = [
    {
      name: "#",
      align: "center",
    },
    {
      name: "Name",
      align: "left"
    },
    {
      name: "Age",
      align: "left"
    },
    {
      name: "Gender",
      align: "left"
    },
    {
      name: "Mark",
      align: "left"
    },
    {
      name: "City",
      align: "left"
    },
    {
      name: "Created At",
      align: "left"
    },
    {
      name: "Updated At",
      align: "left"
    },
    {
      name: "Actions",
      align: "center",
      class: classes.actions
    },
  ]

  const onEdit = (student: Student) => {
    history.push(`/students/${student.id}`)
  }

  const onDelete = (student: Student) => {
    console.log("delete", student);
    
  }

  const convertDate = (date: number|undefined) => {
    if (!date) return null
    return new Date(date).toDateString()
  }

  const handleSearch = (params: Params) => {
    dispatch(studentActions.GET_STUDENTS(params))
  }



  return (
    <Box className={classes.root}>
      {/* loading */}

      {loading && <LinearProgress  className={classes.loading}/>}

      {/* student table */}
      <CustomTable
        paginations={pagination}
        search={handleSearch}
        headers={
          <TableRow>
            {
              headers.map((header, idx) => (
                <TableCell key={idx} align={header.align} className={header.class}>{header.name}</TableCell>
              ))
            }
          </TableRow>
        }
        body={
          <>
            {
              students.map((student, idx) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row" align="center">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="left">{student.name}</TableCell>
                  <TableCell align="left">{student.age}</TableCell>
                  <TableCell align="left">{capitalize(student.gender)}</TableCell>
                  <TableCell align="left">{student.mark}</TableCell>
                  <TableCell align="left">{upperCase(student.city)}</TableCell>
                  <TableCell align="left">{convertDate(student.createdAt)}</TableCell>
                  <TableCell align="left">{convertDate(student.updatedAt)}</TableCell>
                  <TableCell align="center">
                    <Box className={classes.actionRows}>
                      <div onClick={() => onEdit(student)}>
                        <EditRoundedIcon className={classes.icon} />
                      </div>
                      <div onClick={() => onDelete(student)}>
                        <DeleteRoundedIcon className={classes.icon} />
                      </div>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            }
          </>
        }
       />
      {/* pagination */}
    </Box>
  );
}
