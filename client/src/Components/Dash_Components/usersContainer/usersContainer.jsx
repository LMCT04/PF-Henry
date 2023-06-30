import { Pagination, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../Views/Loading/Loading";
import UserCard from "../userCard/userCard";

const UsersContainer = () => {
    const allUsers = useSelector((state) => state.user);

    const handleChange = (event, value) => {
        let usersPag = [...allUsers];
        setPage((prevPage) => ({ ...prevPage, current: value }));
        const startIndex = (value - 1) * 5;
        const endIndex = startIndex + 5;
        setPageUsers(usersPag.slice(startIndex, endIndex));
    };

    //-------------------------PAGINADO--------------------------

    const [pageUsers, setPageUsers] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: Math.ceil(allUsers.length / 5),
    });

    const pageCurrentRef = useRef(page.current);

    useEffect(() => {
        let filteredUsers = [...allUsers];

        const startIndex = (pageCurrentRef.current - 1) * 5;
        const endIndex = startIndex + 5;
        setPageUsers(filteredUsers.slice(startIndex, endIndex));
        setPage((prevPage) => ({
            ...prevPage,
            total: Math.ceil(filteredUsers.length / 5),
        }));
    }, [allUsers, pageCurrentRef]);


    const styles = {
        scrollContainer: {
            height: "70vh",
            width: "90%",
            margin: "0 auto",
            overflow: "auto",
            boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.112)",
            scrollbarWidth: "thin",
            scrollbarColor: "#a49856 #d5cda4",
            "&::-webkit-scrollbar": {
                width: "10px",
                borderRadius: "25px",
            },
            "&::-webkit-scrollbar-track": {
                background: "#dddddd",
            },
            "&::-webkit-scrollbar-thumb": {
                background: "#1e88e5",
                borderRadius: "25px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                background: "#155fa0",
            },
        },
    };


    return (
        <Box
            sx={{
                backgroundColor:"#dddddd",
            }}
        >
            <Box
                sx={{
                    ...styles.scrollContainer,
                }}
            >
                {pageUsers.length > 0 ? (
                    pageUsers.map((e) => <UserCard key={e.id} element={e} />)
                ) : (
                    <div>
                        <Loading />
                    </div>
                )}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "5.4vh",
                }}
            >
                <Pagination
                    count={page.total}
                    page={page.current}
                    variant="outlined"
                    showFirstButton
                    showLastButton
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export default UsersContainer;
