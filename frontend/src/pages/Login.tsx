import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput.tsx";
import { IoIosLogIn } from "react-icons/io";

const Login = () => {
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        console.log(email, password);
    };
    return (
        <Box width={"100%"} height={"100%"} display="flex" flex={1}>
            <Box
                padding={5}
                mt={5}
                display={{ md: "flex", sm: "none", xs: "none" }}>
                <img
                    src="/robot4.jpeg"
                    alt="robot"
                    style={{
                        width: "400px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                    }}
                />
            </Box>
            <Box
                display={"flex"}
                flex={{ xs: 1, md: 0.5 }}
                justifyContent={"center"}
                alignItems={"center"}
                padding={2}
                ml={"auto"}
                mt={5}>
                <form
                    onSubmit={handleLogin}
                    style={{
                        margin: "auto",
                        padding: "30px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                        border: "none",
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            justifyContent: "center",
                        }}>
                        <Typography
                            variant="h4"
                            textAlign="center"
                            padding={3}
                            fontWeight={600}>
                            Login
                        </Typography>
                        <CustomizedInput
                            type="email"
                            name="email"
                            label="Email"
                        />
                        <CustomizedInput
                            type="password"
                            name="password"
                            label="Password"
                        />
                        <Button
                            type="submit"
                            sx={{
                                px: 2,
                                py: 1,
                                mt: 2,
                                width: "400px",
                                borderRadius: 2,
                                bgcolor: "#00fffc",
                                ":hover": {
                                    bgcolor: "white",
                                    color: "black",
                                },
                                fontSize: 16,
                            }}
                            endIcon={<IoIosLogIn />}>
                            LOGIN
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
