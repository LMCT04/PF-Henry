import React, { useRef } from "react";
import { Button, Box } from "@mui/material";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomFileInput = ({ field, form }) => {
  const fileInputRef = useRef(null);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    form.setFieldValue(field.name, file);

    // Sube la imagen a Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);

    // Obtén la URL de descarga de la imagen
    const downloadURL = await getDownloadURL(storageRef);
    const downloadURLArray = [downloadURL];
    // Actualiza el valor de la imagen en el formulario
    form.setFieldValue("image", downloadURLArray);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box sx={{width:'24%', display:'flex', alignItems:'center', justifyContent:'center', height:'61%'}} >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        component="label"
        color="primary"
        onClick={handleClick}
        sx={{width:'90%', fontSize:'10px'}}
      >
        Choose File
      </Button>
    </Box>
  );
};

export default CustomFileInput;
