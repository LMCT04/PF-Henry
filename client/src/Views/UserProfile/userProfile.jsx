import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Box } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { storage } from "../../firebase/config";
import { setUser } from "../../redux/actions/actionsUsers";
import { auth } from "../../firebase/config";
import Avatar from "@mui/material/Avatar";
import "./userProfile.css";
import FavoritesContent from "./FavoritesContent/FavoritesContent";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  const [editMode, setEditMode] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFavoritesClick = () => {
    setShowFavorites(true);
  };

  const handleSubmit = async (values) => {
    // Lógica para guardar los cambios del perfil de usuario

    if (selectedImage) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`profile-images/${user.id}`);
      await imageRef.put(selectedImage);
      const imageUrl = await imageRef.getDownloadURL();
      // Guardar la URL de la imagen en la base de datos del usuario
      // user.id puede ser el ID único del usuario en la base de datos
      // Ejemplo: firebase.firestore().collection("users").doc(user.id).update({ imageUrl });
      console.log(imageUrl);
    }
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };
  useEffect(() => {
    // Aquí puedes obtener los datos del usuario autenticado desde Firebase
    // Por ejemplo, utilizando Firebase Auth:
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Aquí puedes obtener los datos del usuario como el nombre, correo electrónico, etc.
      const { displayName, email, photoURL } = currentUser;

      // Creas un objeto de usuario con los datos obtenidos
      const userData = {
        fullName: displayName,
        userName: "", // Puedes establecer un nombre de usuario si está disponible
        mail: email,
        image: photoURL, // URL de la foto de perfil del usuario
      };

      // Llamas a la acción setUser para establecer el usuario en el estado de Redux
      dispatch(setUser(userData));
    }
  }, [dispatch]);
  return (
    <Box display="flex" flexDirection="row" className="container">
      <Box className="setting">
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#faebd7", color: "Black" }}
          onClick={() => {
            setEditMode(true);
            setShowFavorites(false);
          }}
        >
          EDIT PROFILE
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#faebd7", color: "Black" }}
          onClick={handleFavoritesClick}
        >
          Favorites
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#faebd7", color: "Black" }}
        >
          Notification
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#faebd7", color: "Black" }}
        >
          Security
        </Button>
      </Box>
      <Box className="info-container" style={{ width: "70%" }}>
        {!showFavorites && (
          <Box
            display="flex"
            justifyContent={"space-between"}
            marginBottom="16px"
          >
            <Typography variant="h4">Perfil de Usuario</Typography>
            <label htmlFor="image-upload">
              <Avatar
                src={
                  user.image ||
                  "https://viapais.com.ar/resizer/nGD1xDG-SPBgRoB9ADa7WCzzEs4=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/VJTQYWDQN5C5XDNNK3F2OER73M.jpg"
                }
                alt="Profile Image"
                sx={{
                  width: 140,
                  height: 140,
                  marginRight: "32px",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </Box>
        )}

        {!showFavorites && (
          <Formik
            enableReinitialize
            initialValues={{
              fullName: user.fullName || "Ricardo",
              userName: user.userName || "Darin",
              mail: user.mail || "ricardodarin@darin.com",
              address: user.address || "Baire 123",
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Field
                  component={TextField}
                  name="fullName"
                  label="Nombre Completo"
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#000000" },
                  }}
                  disabled={!editMode}
                />
                <Field
                  className={"readonly-input"}
                  component={TextField}
                  name="userName"
                  label="Nombre de Usuario"
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#000000" },
                  }}
                  disabled={!editMode}
                />
                <Field
                  component={TextField}
                  name="mail"
                  label="Correo Electrónico"
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#000000" },
                  }}
                  disabled={!editMode}
                />
                <Field
                  component={TextField}
                  name="address"
                  label="Dirección"
                  fullWidth
                  style={{ marginBottom: "2rem" }}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "#000000" },
                  }}
                  disabled={!editMode}
                />
                <Box display={"flex"}>
                  <div className="edit-buttons">
                    {editMode && (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          onClick={handleSubmit}
                          style={{
                            marginRight: "1rem",
                          }}
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => setEditMode(false)}
                        >
                          Cancelar
                        </Button>
                      </>
                    )}
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        )}

        {showFavorites && (
          <FavoritesContent handleBack={() => setShowFavorites(false)} />
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
