import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Table,
  Box,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Collapse,
  SxProps,
  Theme,
} from '@mui/material';
import { get } from 'lodash';
import ListHead from './components/ListHead';
import SearchNotFound from '../SearchNotFound';

// ----------------------------------------------------------------------

GridMain.defaultProps = {
  data: [],
  settings: {},
  tableProps: {},
  TableContainerProps: {},
  isLoading: false,
  rowsPerPageInitial: 25,
  filterString: '',
  emptyDataMessage: 'Nada registrado.',
  withoutPagination: false,
};

GridMain.propTypes = {
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])),
  settings: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.shape({
      fields: PropTypes.arrayOf(PropTypes.string),
      orderByInitial: PropTypes.string,
    }),
  }),
  tableProps: PropTypes.object,
  TableContainerProps: PropTypes.object,
  isLoading: PropTypes.bool,
  filterString: PropTypes.string,
  emptyDataMessage: PropTypes.string,
  rowsPerPageInitial: PropTypes.number,
  withoutPagination: PropTypes.bool,
};
export type GridMainColumns<T> = Array<{
  id: string | number,
  label?: string,
  cellSx?: SxProps<Theme>,
  cellFunction?: (value: any, row: T) => React.ReactNode;
  cellAlign?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}>;

type GridMainSettings<T> = {
  columns: GridMainColumns<T>;
  search: {
    fields: Array<string>;
    orderByInitial: string;
  }
};

type GridMain<T> = {
  data: Array<T>;
  isLoading: boolean;
  settings: GridMainSettings<T>;
  tableProps: any;
  rowsPerPageInitial: number;
  TableContainerProps: any;
  emptyDataMessage: string;
  filterString: string;
  withoutPagination: boolean;
};

export default function GridMain<T>({
  data,
  isLoading,
  settings,
  tableProps,
  rowsPerPageInitial,
  TableContainerProps,
  emptyDataMessage,
  filterString,
  withoutPagination,
}: GridMain<T>) {
  const theme = useTheme();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(settings.search?.orderByInitial ?? '');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(withoutPagination ? Number.MAX_SAFE_INTEGER : rowsPerPageInitial);
  const [rows, setRows] = useState<Array<T>>([]);
  const [filtered, setfiltered] = useState<Array<T>>([]);

  useEffect(() => {
    let isMounted = true;
    if (settings.search?.fields) {
      const newData = data.map((row) => {
        const searchHere = settings.search.fields
          .map((field) => get(row, field))
          .join(' ')
          .toLowerCase();
        return { ...row, searchHere };
      });
      if (isMounted) setRows(newData);
    } else if (isMounted) setRows(data);

    return () => {
      isMounted = false;
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isMounted = true;

    if (isMounted) setfiltered(applySortFilter(rows, getComparator(order, orderBy), filterString));
    if (isMounted) setPage(0);

    return () => {
      isMounted = false;
    };
  }, [filterString, rows]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let isMounted = true;

    if (isMounted) setfiltered(applySortFilter(filtered, getComparator(order, orderBy)));
    if (isMounted) setPage(0);

    return () => {
      isMounted = false;
    };
  }, [order, orderBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRequestSort = (event: HTMLDivElement, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filtered.length) : 0;
  const emptyData = data.length === 0 && isLoading === false;
  const isNotFound = !filtered.length && emptyData === false && Boolean(filterString);

  return (
    <>
      <TableContainer sx={{ minWidth: 800, ...TableContainerProps?.sx }}>
        <Table {...tableProps}>
          <ListHead order={order} orderBy={orderBy} headLabel={settings.columns} onRequestSort={handleRequestSort} />
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <TableRow
                key={row._id ?? rowIndex}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    borderRadius: 0,
                    td: {
                      backgroundColor: theme.palette.action.hover,
                    },
                    'td:first-of-type': {
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                      boxShadow: `inset 8px 0 0 ${theme.palette.background.paper}`,
                    },
                    'td:last-of-type': {
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                      boxShadow: `inset -8px 0 ${theme.palette.background.paper}`,
                    },
                  },
                }}
              >
                {settings.columns.map((cellColumn, cellIndex) => (
                  <TableCell
                    key={`cell_${row._id ?? rowIndex}_${cellIndex}_${cellColumn.id ?? ''}`}
                    align={cellColumn.cellAlign || 'left'}
                    {...(cellColumn.cellSx && { sx: cellColumn.cellSx })}
                  >
                    {cellColumn.cellFunction === undefined
                      ? get(row, cellColumn.id)
                      : cellColumn.cellFunction(get(row, cellColumn.id), row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 72 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          {isNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery={filterString} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          {emptyData && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <Typography variant="body2">{emptyDataMessage}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Collapse in={isLoading}>
        <Box m={3} textAlign="center">
          <CircularProgress size={40} />
        </Box>
      </Collapse>
      {!withoutPagination && (
        <Collapse in={!isLoading}>
          <TablePagination
            component="div"
            count={filtered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, pageChange) => setPage(pageChange)}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Registros por página"
          />
        </Collapse>
      )}
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (typeof a[orderBy] === 'string') {
    return b[orderBy].localeCompare(a[orderBy]);
  }

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order: 'asc' | 'desc', orderBy: string) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any, comparator: any, query?: any) {
  const stabilizedThis = array.map((el: string, index: number) => [el, index]);
  stabilizedThis.sort((a: string | number, b: string | number) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  const response = stabilizedThis.map((el) => el[0]);
  if (query) {
    return response.filter((_row) => _row.searchHere.indexOf(query.toLowerCase()) !== -1);
  }
  return response;
}
