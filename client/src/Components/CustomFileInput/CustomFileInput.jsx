import React, { useRef } from "react";
import { Button } from "@mui/material";
import { uploadFile } from "../../firebase/config";

const CustomFileInput = ({ field, form }) => {
  const fileInputRef = useRef(null);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    form.setFieldValue(field.name, file);

    // Sube la imagen a Firebase Storage
    const imageUrl = await uploadFile(file);

    // Actualiza el valor de la imagen en el formulario
    form.setFieldValue("image", imageUrl);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        component="label"
        color="success"
        onClick={handleClick}
      >
        Choose File
      </Button>
    </div>
  );
};

export default CustomFileInput;
