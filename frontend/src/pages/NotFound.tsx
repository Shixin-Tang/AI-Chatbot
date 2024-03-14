import { Box } from "@mui/material";
import { TypeAnimation } from "react-type-animation";

const NotFound = () => {
    return (
        <Box width={"100%"} height={"100%"}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    mx: "auto",
                    mt: 3,
                }}>
                <Box>
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            "Sorry, Page Not Found",
                            3000,
                            "404",
                            3000,
                            "Please go back to the home page",
                            3000,
                        ]}
                        speed={50}
                        style={{
                            fontSize: "50px",
                            color: "white",
                            display: "inline-block",
                            textShadow: "1px 1px 20px #000",
                        }}
                        repeat={Infinity}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default NotFound;
