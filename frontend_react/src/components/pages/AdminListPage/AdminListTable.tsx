import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import {List, SortByListCategories} from "../../../types/models/List.model";
import { User } from "../../../types/models/User.model";
import ListService from "../../../Services/ListService";
import UserService from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import AdminListEntry from "../../molecules/AdminListEntry";
import AdminUserEntry from "../../molecules/AdminUserEntry";
import ListDropdowns from "../../molecules/ListDropdowns/ListDropdowns";

const AdminListTable = () => {
    const navigate = useNavigate();
    const oldValue = localStorage.getItem("showList") as unknown as string;
    const [showList, setShowList] = useState<boolean>(
        oldValue && true ? JSON.parse(oldValue.toLowerCase()) : false,
    );
    const [users, setUsers] = useState<User[]>([]);
    const [lists, setLists] = useState<List[]>([]);

    const [filterValue, setFilterValue] = useState<string>();
    const [sortValue, setSortValue] = useState<SortByListCategories>();
    const [userFilterValue, setUserFilterValue] = useState<string>();
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<boolean>(true);

    const loadLists = async (
        importance?: string,
        sortBy?: string,
        userId?: string,
        asc?: boolean,
    ) => {
        const params: any = {};
        if (importance) params.importance = importance;
        if (sortBy) {
            const SORT_FIELD_MAP: Record<string, string> = {
                [SortByListCategories.DATE]: "createdAt",
                [SortByListCategories.IMPORTANCE]: "importance",
            };
            params.sortBy = SORT_FIELD_MAP[sortBy] || sortBy;
        }
        if (userId) params.userId = userId;
        if (asc !== undefined) params.isAscending = asc;
        const data = await ListService.getAllListsAdmin(page, params);
        setLists(data);
    };

    useEffect(() => {
        loadLists(undefined, undefined, undefined, isAscending);
    }, []);
    useEffect(() => {
        ListService.getAllListsAdminPagesCount().then((count) => {
            setTotalPages(count);
        });
        UserService.getAllUsers().then((data) => {
            setUsers(data.data);
        });
        loadLists(undefined, undefined, undefined, isAscending);
    }, []);

    useEffect(() => {
        loadLists(
            filterValue || undefined,
            sortValue || undefined,
            userFilterValue || undefined,
            isAscending,
        );
    }, [filterValue, sortValue, userFilterValue, isAscending, page]);

    const handleShowListChange = (newValue: boolean) => {
        setShowList(newValue);
        localStorage.setItem("showList", newValue as unknown as string);
    };

    useEffect(() => {
        ListService.getAllListsAdmin(page).then((data) => {
            setLists(data);
        });
    }, [page]);

    if (showList) {
        const handleAdd = () => {
            navigate("../list/edit/admin");
        };

        const handleDelete = async (id: string) => {
            await ListService.deleteList(id);
            globalThis.location.reload();
            alert("You deleted the list entry!");
        };

        return (
            <>
                <Button
                    id="linkToHome"
                    variant="contained"
                    sx={{
                        mt: 3,
                        backgroundColor: "#00d4ff",
                        "&:hover": { backgroundColor: "#0f0fcf" },
                    }}
                    onClick={() => navigate("/")}
                >
                    Homepage
                </Button>

                <ListDropdowns
                    filterValue={filterValue}
                    sortValue={sortValue}
                    users={users}
                    onFilterChange={setFilterValue}
                    onSortChange={setSortValue}
                    userFilterValue={userFilterValue}
                    onUserFilterChange={setUserFilterValue}
                    isAdmin={true}
                    isAscending={isAscending}
                    onIsAscendingChange={() => setIsAscending(!isAscending)}
                />
                <br />
                <Switch
                    checked={showList}
                    onChange={() => handleShowListChange(!showList)}
                />
                show List Entries
                {lists.map((list) => (
                    <div key={list.id}>
                        <AdminListEntry list={list} handleDelete={handleDelete} />
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
                    <Button
                        variant="contained"
                        disabled={page === 0}
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                    >
                        Previous
                    </Button>
                    <span style={{ display: 'flex', alignItems: 'center' }}>Page {page + 1}</span>
                    <Button
                        variant="contained"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(p => p + 1)}
                    >
                        Next
                    </Button>
                </div>

                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </>
        );
    } else {
        const handleAdd = () => {
            navigate("../user/edit/admin");
        };

        const handleDelete = async (id: string) => {
            await UserService.deleteUser(id);
            globalThis.location.reload();
            alert("You deleted a user profile!");
        };

        const handleEdit = async (id: string) => {
            navigate("../user/edit/admin/" + id);
        };

        return (
            <>
                <Button
                    id="linkToHome"
                    variant="contained"
                    sx={{
                        mt: 3,
                        backgroundColor: "#00d4ff",
                        "&:hover": { backgroundColor: "#0f0fcf" },
                    }}
                    onClick={() => navigate("/")}
                >
                    Homepage
                </Button>
                <br />
                <Switch
                    checked={showList}
                    onChange={() => handleShowListChange(!showList)}
                />
                show Users
                {users.map((user) => (
                    <div key={user.id}>
                        <AdminUserEntry user={user} handleDelete={handleDelete} handleEdit={handleEdit} />
                    </div>
                ))}
                <br />
                <Button
                    size="small"
                    color="success"
                    variant="contained"
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </>
        );
    }
};

export default AdminListTable;
