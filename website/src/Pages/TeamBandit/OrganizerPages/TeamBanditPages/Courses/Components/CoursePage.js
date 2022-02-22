import { Fragment, useState, React } from "react";

// MUI Functions
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// CSS
import styles from "../Courses.module.css";

// Routes
import CourseRouter from "../CourseRouter";

// Table of the contents
const pages = [
    "Projects",
    "Schedule",
    "Students",
    "Teams",
    "Assignments",
    "Mentors",
    "Settings",
];

const CoursePage = ({ courseInfo, setCoursesChange }) => {
    // ENUM string for routes
    const [route, setRoute] = useState("Projects");

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setRoute(pages[newValue]);
    };

    const [state, setState] = useState({
        right: false,
    });

    const anchor = "right";

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            <Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)}>
                    {courseInfo.course_title}
                </Button>
                <Drawer
                    sx={{ zIndex: "modal" }}
                    PaperProps={{ style: { height: "100%", width: "96%" } }}
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    <AppBar
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            background: "#FAC01A",
                            alignItems: "center",
                            color: "black",
                            paddingLeft: "50px",
                        }}
                        position="static"
                    >
                        <Button
                            sx={{ mt: 2, mb: 2, mr: 5 }}
                            variant="contained"
                            onClick={toggleDrawer(anchor, false)}
                            startIcon={<ArrowBackIcon />}
                        >
                            {" "}
                            Go Back{" "}
                        </Button>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {courseInfo.course_title}
                        </Typography>

                        <Tabs
                            onChange={handleChange}
                            value={value}
                            aria-label="Tabs where selection follows focus"
                            selectionFollowsFocus
                        >
                            {pages.map((page) => (
                                <Tab label={page} />
                            ))}
                        </Tabs>
                    </AppBar>

                    {/*This will return whatever page we want displayed :)*/}
                    <CourseRouter
                        route={route}
                        courseInfo={courseInfo}
                        setRoute={setRoute}
                        setCoursesChange={setCoursesChange}
                    />
                </Drawer>
            </Fragment>
        </div>
    );
};

export default CoursePage;
