import { Box, Paper, Stack } from '@mui/material';

export const BoxContainer = (props) => (
    <Paper
        elevation={1}
        sx={{
            height: 'auto',
            py: 2,
            // pt: 6,
            px: 4,
            maxWidth: 1200,
            width: '100%',
            margin: '0 auto',
            minHeight: '100vh',
        }}
    >
        {props.children}
    </Paper>
);

export const BoxProblems = (props) => (
    <Box
        sx={{
            height: 'auto',
            minHeight: 'calc(100vh - 220px)',
            py: 2,
            px: 4,
            maxWidth: 1200,
            width: '100%',
            margin: '0 auto',
            backgroundColor: '#fff',
            boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: 1,
        }}
    >
        {props.children}
    </Box>
);

export const BoxProblemsStack = (props) => (
    <Stack
        direction='row'
        sx={{
            py: { xs: 1, md: 0 },
            pt: { xs: 3, md: 2 },
            px: 0,
            justifyContent: {
                xs: "center",
                sm: "space-between",
                md: "space-between",
                lg: "space-between",
            },
            alignItems: {
                xs: "space-between",
                sm: "center",
                md: "center",
                lg: "center",
            },
            flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
            },
        }}
    >
        {props.children}
    </Stack>
);

export const BoxTitle = (props) => (
    <Box
        sx={{
            // height: 300,
            width: '100%',
            '& .super-app-theme--header': {
                // backgroundColor: '#ececec',
            },
            '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
                fontWeight: '600',
            }
        }}
    >
        {props.children}
    </Box>
);

export const BoxStack = (props) => (
    <Stack
        direction='row'
        sx={{
            py: { xs: 1, md: 3 },
            pt: { xs: 3, md: 2 },
            px: 0,
            justifyContent: {
                xs: "center",
                sm: "space-between",
                md: "space-between",
                lg: "space-between",
            },
            alignItems: {
                xs: "space-between",
                sm: "center",
                md: "center",
                lg: "center",
            },
            flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
            },
        }}
    >
        {props.children}
    </Stack>
);