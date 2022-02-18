import {useState, React} from 'react';

import { toast } from 'react-toastify';

const TestProfilePicture = ({setStudentChange}) => {
  const [file, setFile] = useState(null);
  
  const onFileChange = (e) => {
    setFile(e.target.files[0]); 
  }

  const updateProfilePicture = async e => {
    e.preventDefault();
    console.log(file);
    try {
        const formData = new FormData();
        formData.append("avatar", file);

        const myHeaders = new Headers();
        myHeaders.append("token", localStorage.token);

        const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/studentAvatar`, {method: "PUT", body: formData, headers: myHeaders});
        console.log(await response.json());

        toast.success("Student profile picture was successfully updated!");
        setStudentChange(true);
    } catch (error) {
        console.error(error.message);
        toast.error("Failed to update profile picture!");
    }
  };

  /*
  <form action={`${process.env.REACT_APP_BASEURL}/fileuploads/upload`} method="POST" encType="multipart/form-data">
    <input type="file" name="avatar" accept="images/*"/>
    <button>Submit</button>
  </form>
  */

    return (
      <div>
        <form onSubmit={updateProfilePicture} encType="multipart/form-data">
          <input type="file" name="avatar" onChange={onFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
}

export default TestProfilePicture