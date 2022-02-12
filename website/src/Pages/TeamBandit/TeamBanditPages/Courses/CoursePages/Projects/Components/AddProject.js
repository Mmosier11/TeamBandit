import React, {Fragment, useState, useEffect} from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';


// Need this to change color schemes
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { toast } from 'react-toastify';

// Idk really, but need it for something I guess
import { styled } from '@mui/material/styles';

import styles from '../projects.module.css';
import { getScopedCssBaselineUtilityClass } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

// need to make a theme so I can use custom colors for Material UI
const theme = createTheme({
    palette: {
    sameBlue: {
        // Same blue as text for button
        main: '#003466',
    },
    },
});

const DialogBig = {
    dialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh',
    },
};

const Input = styled('input')({
    display: 'none',
});



const AddProject = ({courseInfo, setRowChange}) => {
    // Variables 
    const [project_name, setProjectName] = useState("");
    const [project_description, setProjectDescription] = useState("");
    const [project_team_lead, setProjectTeamLead] = useState("");
    const [project_members, setProjectMembers] = useState([]);
    const [project_member1, setProjectMember1] = useState("");
    const [project_member2, setProjectMember2] = useState("");
    const [project_member3, setProjectMember3] = useState("");
    const [project_member4, setProjectMember4] = useState("");
    const [project_mentor, setProjectMentor] = useState("");
    const [project_sponsor, setProjectSponsor] = useState("");

    // Value change 
    const [valueChange, setValueChange] = useState(false);

    // Variables for drop downs
    const [students, setStudents] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [clients, setClients] = useState([]);
    const [teamlead, setTeamlead] = useState([]);


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };


    const addProject = async (event) => {
        event.preventDefault();
        try {


            var courseId = courseInfo.course_id;
            var mentorName = project_mentor.mentor_name;
            var sponsorName = project_sponsor.client_name;

            const body = {project_name, project_description, mentorName, sponsorName, courseId};
            const myHeaders = new Headers();

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("token", localStorage.token);
            
            const response = await fetch("http://localhost:5000/projects/projects", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(body)
            });

            toast.success("Project was added successfully!");
            setProjectName("");
            setProjectDescription("");
            setProjectMentor("");
            setProjectSponsor("");
            setRowChange(true);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to add Failed to add project!");
        }
    }

    const theme = useTheme();

    const handleChangeTeamLead = (event) => {
        const {
        target: { value },
        } = event;
        setProjectTeamLead(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeTeamMembers= (event) => {
        const {
        target: { value },
        } = event;
        setProjectMembers(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeTeamMentor = (event) => {
        const {
        target: { value },
        } = event;
        setProjectMentor(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeProjectSponsor = (event) => {
        const {
        target: { value },
        } = event;
        setProjectSponsor(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    const getMentors = async () => {
        try {
            const response = await fetch(`http://localhost:5000/mentors/${courseInfo.course_id}`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
            
            setMentors(jsonData);
                
        } catch (err) {
            console.error(err.message);
        }
    };

    const getClients = async () => {
        try {
            const response = await fetch(`http://localhost:5000/clients/`, {method: "GET", headers: {token: localStorage.token}});
            const jsonData = await response.json();
            
            setClients(jsonData);
                
        } catch (err) {
            console.error(err.message);
        }
    };

    
    useEffect(() => {
        getMentors();
        getClients();
        setValueChange(false);
    }, [valueChange]);
    

    return (
        <Fragment>
        <Button sx={{ m: 3 }} variant="outlined" color="success"  onClick={handleOpen} startIcon={<AddIcon />} > Add </Button>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add Project
                        </Typography>
                    </Box>
                
                    <Typography>
                            Project Name
                    </Typography>
                    <TextField fullWidth sx={{ m: 2 }} label="Project Name" type = "text" value = {project_name} onChange = {e => setProjectName(e.target.value)}/>
                
                    <Typography>
                            Project Description
                    </Typography>
                    <TextField fullWidth sx={{ m: 2 }} label="Project Description" type = "text" value = {project_description} onChange = {e => setProjectDescription(e.target.value)}/>
                <Typography >
                            Team Mentor
                        </Typography>
                <Select
                sx={{ m: 2 }}
                displayEmpty
                fullWidth
                value={project_mentor}
                onChange={handleChangeTeamMentor}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em>Team Mentor</em>;
                    }
                    return selected.mentor_name;
                    
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                    <em>Team Mentor</em>
                </MenuItem>
                {mentors.map((mentor) => (
                    <MenuItem
                    key={mentor.mentor_id}
                    value={mentor}
                    
                    >
                    {mentor.mentor_name}
                    </MenuItem>
                ))}
                </Select>

                <Typography >
                            Project Sponsor
                        </Typography>
                <Select
                sx={{ m: 2 }}
                displayEmpty
                fullWidth
                value={project_sponsor}
                onChange={handleChangeProjectSponsor}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                    return <em>Project Sponsor</em>;
                    }
                    return selected.client_name;
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem disabled value="">
                    <em>Project Sponsor</em>
                </MenuItem>
                {clients.map((client) => (
                    <MenuItem
                    key={client.client_id}
                    value={client}
                    >
                    {client.client_name}
                    </MenuItem>
                ))}
                </Select>
                        
                <Button sx={{ m: 3 }} variant="contained" color="success"  onClick={(e) => (handleClose(), addProject(e))} startIcon={<AddIcon />} > Add </Button>        
                        
                        
                <Button sx={{ m: 2 }} variant="contained" color="error" onClick={handleClose} startIcon={<CloseIcon/>}> Close </Button>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default AddProject;