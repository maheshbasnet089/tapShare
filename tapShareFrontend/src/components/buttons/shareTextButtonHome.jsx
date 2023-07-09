import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
export default function ShareTextButtonHome() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        bottom: { xs: "110px", md: "80px" },
        left: "50%",
        transform: "translateX(-50%)",
        padding: "0 0px 0 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          backgroundColor: "transparent",
          border: "1px solid white",
        }}
        onClick={() => navigate("/code")}
        type="button"
        className="btn-add-code text-white hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        <span style={{ width: "20px", marginRight: "10px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
        Share Text
      </button>
    </Box>
  );
}
