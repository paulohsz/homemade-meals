// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Box,
//   Grid,
//   Icon,
//   IconButton,
//   Tooltip,
//   makeStyles,
//   Collapse,
//   CircularProgress,
//   useTheme,
// } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   row: {
//     transition: theme.transitions.create(['background', 'background-color'], {
//       duration: theme.transitions.duration.shortest,
//     }),
//     '&:hover': {
//       backgroundColor: transparentize(0.96, theme.palette.primary.main),
//     },
//   },
// }));

// const BaseButton = (type, title, { onClick }) => (
//   <Tooltip title={title} placement="top">
//     <IconButton color="primary" size="small" onClick={(e) => onClick(e)}>
//       <Icon>{type}</Icon>
//     </IconButton>
//   </Tooltip>
// );

// export const ViewButton = (e) => BaseButton('visibility', 'View', e);
// export const DownloadButton = (e) => BaseButton('download', 'Download', e);

// const GridHM = ({
//   data, columnDefs, loadingData, noRows, overlayNoRowsTemplate,
// }) => {
//   const classes = useStyles();
//   const { palette } = useTheme();
//   return (
//     <>
//       <Grid container>
//         <Box
//           component={Grid}
//           bgcolor={transparentize(0.92, palette.primary.main)}
//           borderBottom={`1px solid ${transparentize(0.90, palette.primary.main)}`}
//           alignItems="center"
//           fontSize={12}
//           fontWeight={600}
//           borderRadius={12}
//           xs={12}
//           container
//           item
//         >
//           {columnDefs.columns.map((cellHeader) => (
//             <Box
//               key={`grid_header_${cellHeader.field}`}
//               component={Grid}
//               py={2}
//               px={{ xs: 1, sm: 2 }}
//               item
//               {...cellHeader.propsCell}
//             >
//               {cellHeader.headerName}
//             </Box>
//           ))}
//         </Box>
//       </Grid>

//       <Collapse in={loadingData}>
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           p={4}
//         >
//           <CircularProgress size={30} style={{ marginRight: 12 }} />
//           Loading...
//         </Box>
//       </Collapse>
//       <Collapse in={!loadingData}>
//         {noRows && (
//         <Box
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           p={4}
//         >
//             {overlayNoRowsTemplate}
//         </Box>
//         )}
//         <Grid container>
//           {data.map((item) => (
//             <Box
//               component={Grid}
//               alignItems="center"
//               key={`grid_statemant_${item.id}`}
//               borderBottom={`1px solid ${transparentize(0.90, palette.primary.main)}`}
//               borderRadius={12}
//               className={classes.row}
//               fontSize={12}
//               xs={12}
//               container
//               item
//             >
//               {columnDefs.columns.map((cellHeader) => (
//                 <Box
//                   key={`grid_statemant_${item.id}_${cellHeader.field}`}
//                   component={Grid}
//                   py={2}
//                   px={{ xs: 1, sm: 2 }}
//                   item
//                   {...cellHeader.propsCell}
//                 >
//                   {cellHeader.cellFunction === undefined
//                     ? item[cellHeader.field]
//                     : cellHeader.cellFunction(item)}
//                 </Box>
//               ))}
//             </Box>
//           ))}
//         </Grid>
//       </Collapse>
//     </>
//   );
// };
// GridHM.defaultProps = {
//   data: [],
//   columnDefs: {},
//   overlayNoRowsTemplate: 'No data is available to show',
//   noRows: false,
//   defaultColDef: {
//     columns: [],
//   },
//   loadingData: false,
// };
// GridHM.propTypes = {
//   data: PropTypes.array,
//   columnDefs: PropTypes.object,
//   overlayNoRowsTemplate: PropTypes.string,
//   defaultColDef: PropTypes.object,
//   loadingData: PropTypes.bool,
// };

// export default GridHM;
