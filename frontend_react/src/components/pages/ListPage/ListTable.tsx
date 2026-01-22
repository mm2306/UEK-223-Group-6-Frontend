import Button from "@mui/material/Button";
import { List, SortByListCategories } from "../../../types/models/List.model";
import ListService from "../../../Services/ListService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListEntry from "../../molecules/ListEntry";
import ListDropdowns from "../../molecules/ListDropdowns/ListDropdowns";

const ListTable = () => {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);


  const [filterValue, setFilterValue] = useState<string>('');
  const [sortValue, setSortValue] = useState<SortByListCategories>();

  const loadLists = (importance?: string, sortBy?: string, order?: string) => {
    const params: any = {};
    if (importance) params.importance = importance;
    if (sortBy) {
      const SORT_FIELD_MAP: Record<string,string> = {
        [SortByListCategories.DATE]: 'createdAt',
        [SortByListCategories.IMPORTANCE]: 'importance',
        [SortByListCategories.USER]: 'user',
      };
      params.sortBy = SORT_FIELD_MAP[sortBy] || sortBy;
    }
    if (order) params.sortOrder = order;

  useEffect(() => {
      loadLists(filterValue || undefined, sortValue || undefined, sortOrder || undefined);
    ListService.getAllLists(page, params).then((data) => {
      setLists(data);
    });
  }, [page, filterValue, sortValue]);

  useEffect(() => {
    ListService.getAllListsPagesCount().then((count) => {
      setTotalPages(count);
        loadLists();
    });
  }, []);

  const handleAdd = () => {
    navigate("../list/edit/list");
  };

  const handleEdit = (id: string) => {
    navigate("../list/edit/list/" + id);
  };

  const handleDelete = async (id: string) => {
    await ListService.deleteList(id);
    window.location.reload();
    alert("You deleted your list entry!");
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
            onFilterChange={setFilterValue}
            onSortChange={setSortValue}
        />
      {"  "}
      {lists.map((list) => (
        <div key={list.id}>
          <ListEntry
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            list={list}
          />
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
        id="add"
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

export default ListTable;
