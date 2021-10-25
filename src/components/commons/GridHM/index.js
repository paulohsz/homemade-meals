import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Collapse,
  CircularProgress,
} from '@mui/material';
import { alpha } from '@mui/system';
import { Edit, Delete } from '@mui/icons-material';

const BaseButton = (type, title, { onClick }) => (
  <Tooltip title={title} placement="top">
    <IconButton size="small" aria-label={title} onClick={(e) => onClick(e)}>
      {type}
    </IconButton>
  </Tooltip>
);

export const ViewButton = (e) => BaseButton(<Edit />, 'View', e);
export const DeleteButton = (e) => BaseButton(<Delete />, 'Delete', e);

const GridHM = ({
  data, columnDefs, loadingData, noRows, overlayNoRowsTemplate,
}) => (
  <>
    <Grid
      sx={{
        px: 2,
        pb: 1,
        alignItems: 'center',
        fontWeight: 500,
      }}
      container
    >
      {columnDefs.columns.map((cellHeader) => (
        <Grid
          key={`gh_${cellHeader.field}`}
          item
          {...cellHeader.propsCell}
        >
          {cellHeader.headerName}
        </Grid>
      ))}
    </Grid>

    <Collapse in={loadingData}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <CircularProgress size={30} style={{ marginRight: 12 }} />
        Loading...
      </Box>
    </Collapse>
    <Collapse in={!loadingData}>
      {noRows && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={4}
        >
            {overlayNoRowsTemplate}
        </Box>
      )}
    </Collapse>
    {data.map((item) => (
      <Collapse
        key={`gd_${item._id}`}
        in={item.delete === undefined && item.filter}
      >
        <Grid
          sx={{
            px: 2,
            py: 1,
            alignItems: 'center',
            borderRadius: 2,
            transition: (theme) => theme.transitions.create(['background-color'], {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }),
            '&:hover': {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.13),
              transition: (theme) => theme.transitions.create(['background-color'], {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeIn,
              }),
            },
          }}
          container
        >
          {columnDefs.columns.map((cellHeader) => (
            <Box
              component={Grid}
              key={`grid_statemant_${item._id}_${cellHeader.field}`}
              item
              {...cellHeader.propsCell}
            >
              {cellHeader.cellFunction === undefined
                ? item[cellHeader.field]
                : cellHeader.cellFunction(item)}
            </Box>
          ))}
        </Grid>
      </Collapse>
    ))}
  </>
);
GridHM.defaultProps = {
  data: [],
  columnDefs: {},
  overlayNoRowsTemplate: 'No data is available to show',
  noRows: false,
  loadingData: false,
};
GridHM.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columnDefs: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.object),
  }),
  overlayNoRowsTemplate: PropTypes.string,
  loadingData: PropTypes.bool,
  noRows: PropTypes.bool,
};

export default GridHM;
