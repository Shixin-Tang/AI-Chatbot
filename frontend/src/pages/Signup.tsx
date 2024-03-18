import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput.tsx";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            toast.loading("Signing Up ...", { id: "signup" });
            await auth?.signup(name, email, password);
            toast.success("Signed Up Successfully", { id: "signup" });
        } catch (error) {
            console.log(error);
            toast.error("Signing Up Failed", { id: "signup" });
        }
    };

    useEffect(() => {
        if (auth?.user) {
            return navigate("/chat");
        }
    }, [auth, navigate]);

    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}>
            <Box
                padding={5}
                display={{ md: "flex", sm: "none", xs: "none" }}
                justifyContent="center">
                <img
                    src="/robot4.jpeg"
                    alt="robot"
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "500px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                    }}
                />
            </Box>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                padding={2}
                width={{ md: "50%", xs: "100%" }}>
                <form
                    onSubmit={handleSignup}
                    style={{
                        width: "100%", // Use 100% of the Box width
                        maxWidth: "500px", // Set a max width for larger screens
                        padding: "30px",
                        boxShadow: "10px 10px 20px #000",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}>
                    <Typography
                        variant="h4"
                        textAlign="center"
                        padding={3}
                        fontWeight={600}>
                        Signup
                    </Typography>
                    <CustomizedInput type="text" name="name" label="Name" />
                    <CustomizedInput type="email" name="email" label="Email" />
                    <CustomizedInput
                        type="password"
                        name="password"
                        label="Password"
                    />
                    <Button
                        type="submit"
                        sx={{
                            mt: 2,
                            borderRadius: 2,
                            bgcolor: "#00fffc",
                            ":hover": {
                                bgcolor: "white",
                                color: "black",
                            },
                            fontSize: 16,
                        }}
                        fullWidth
                        endIcon={<IoIosLogIn />}>
                        Sigup
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Signup;
