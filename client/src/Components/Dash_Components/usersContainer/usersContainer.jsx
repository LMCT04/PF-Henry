import { Pagination } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import style from "./usersContainer.module.css";
import Loading from "../../../Views/Loading/Loading";
import UserCard from "../userCard/userCard";

const UsersContainer = () => {
    const allUsers = useSelector((state) => state.user);

    const handleChange = (event, value) => {
        let usersPag = [...allUsers];
        setPage((prevPage) => ({ ...prevPage, current: value }));
        const startIndex = (value - 1) *5;
        const endIndex = startIndex +5;
        setPageUsers(usersPag.slice(startIndex, endIndex));
    };

    //-------------------------PAGINADO--------------------------

    const [pageUsers, setPageUsers] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: Math.ceil(allUsers.length /5),
    });

    const pageCurrentRef = useRef(page.current);

    useEffect(() => {
        let filteredUsers = [...allUsers];

        const startIndex = (pageCurrentRef.current - 1) *5;
        const endIndex = startIndex +5;
        setPageUsers(filteredUsers.slice(startIndex, endIndex));
        setPage((prevPage) => ({
            ...prevPage,
            total: Math.ceil(filteredUsers.length /5),
        }));
    }, [allUsers, pageCurrentRef]);

    return (
        <div>
            <div className={style.scrollContainer}>
                {pageUsers.length > 0 ? (
                    pageUsers.map((e) => <UserCard key={e.id} element={e} />)
                ) : (
                    <div className={style.loading}>
                        <Loading />
                    </div>
                )}
            </div>
            <Pagination
                count={page.total}
                page={page.current}
                variant="outlined"
                showFirstButton
                showLastButton
                onChange={handleChange}
                className={style.pag}
            />
        </div>
    );
};

export default UsersContainer;
