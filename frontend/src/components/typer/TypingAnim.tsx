import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                "Chat With Your OWN AI",
                3000,
                "Built With OpenAI 🤖",
                3000,
                "Your Own Customized ChatGPT 💻",
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
    );
};

export default TypingAnim;
