import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { DatePicker } from '@material-ui/pickers';
import { PaginationParams, Params } from 'models';
import queryString from 'query-string';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export interface CustomTableProps {
  headers: React.ReactElement;
  body: React.ReactElement;
  paginations: PaginationParams;
  search: (params: Params) => void;
  filters?: Params;
}

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  filter: {},
  table: {
    marginBottom: theme.spacing(2),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}));

export default function CustomTable({ headers, body, paginations, filters, search }: CustomTableProps) {
  const classes = useStyle();
  const [totalPages, setTotalPages] = useState(0);
  const [pageChanged, setPageChanged] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  const handleOnchange = (event: any, value: number) => {
    setPage(value);
    setPageChanged(value);
  };

  useEffect(() => {
    if (!pageChanged) return;
    onSearch();
  }, [pageChanged]);

  const onSearch = () => {
    let params = {
      _limit: limit,
      _page: page,
    };

    history.push({
      pathname: location.pathname,
      search: queryString.stringify(params),
    });

    search(params);
  };

  useEffect(() => {
    const totalRows = Math.ceil(paginations._totalRows / paginations._limit);
    setTotalPages(totalRows);
  }, [paginations]);

  useEffect(() => {
    setData();
  }, []);

  const setData = () => {
    const queryParams = queryString.parse(location.search);
    setLimit(Number(queryParams._limit) || filters?._limit || limit);
    setPage(Number(queryParams._page) || filters?._page || page);

    if (Object.keys(queryParams).length) {
      const params = {
        ...queryParams,
        _limit: limit,
        _page: page,
      };
      search(params);
    } else {
      onSearch();
    }
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <Paper className={classes.root}>
      {/* filters */}
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={3}>
            <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </Box>
      <Box mb={2} display="flex" justifyContent="flex-end" alignContent="cenmter">
        <Box>
          <Button color="primary" variant="outlined" onClick={onSearch}>
            Search
          </Button>
        </Box>
        <Box ml={2}>
          <Button color="primary" variant="outlined" onClick={onSearch}>
            Add new
          </Button>
        </Box>
      </Box>

      {/* table */}
      <TableContainer className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>{headers}</TableHead>
          <TableBody>{body}</TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.pagination}>
        <Pagination count={totalPages} color="primary" page={page} onChange={handleOnchange} />
      </Box>
    </Paper>
  );
}
