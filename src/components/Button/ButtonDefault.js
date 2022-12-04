import { Button } from "@mui/material";

export const ButtonDefault = ({ children, ...props }) => {
    return (
        <Button
            sx={{
                width: "100%", bgcolor: '#212b36', color: '#fff', textDecoration: 'none',
                fontWeight: 700,
                height: 48,
                p: "8px 22px",
                fonSize: 15,
                mt: "0 !important",
                "&:hover": {
                    bgcolor: "#212b36"
                },
                textTransform: "capitalize"
            }}
            {...props}
        >
            {children}
        </Button>
    );
}