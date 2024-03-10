import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
    return (
        <div
            style={{
                display: "flex",
                marginRight: "auto",
                alignItems: "center",
                gap: "10px",
            }}>
            <Link to="/">
                <img
                    src="../../../public/openai.png"
                    alt="OpenAI Logo"
                    className="image-inverted"
                    width={"30px"}
                    height={"30px"}
                />
            </Link>{" "}
            <Typography
                sx={{
                    display: { md: "block", sm: "none", xs: "none" },
                    mr: "auto",
                    fontweight: "800",
                    textShadow: "2px 2px 20px #000",
                }}>
                <span style={{ fontSize: "20px" }}>MERN</span>-AI ChatBot
            </Typography>
        </div>
    );
};

export default Logo;
