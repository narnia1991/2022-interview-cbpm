import { FC, SyntheticEvent, useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";
import ReactPaginate from "react-paginate";

import { db } from "../firebase";
import BlogCard from "../components/BlogCard";
import { Blog } from "../types";
import { dataToBlog } from "../helpers/blogHelper";
import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import NoRecords from "../components/NoRecords";
import BlogPage from "./BlogPage";

export const cName = "blogList";

const sortPairs: Record<string, string> = {
  "title asc": "Title A-Z",
  "title desc": "Title Z-A",
  "dateCreated asc": "Oldest",
  "dateCreated desc": "Newest",
  "dateUpdated asc": "Most Outdated",
  "dateUpdated desc": "Most Updated",
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;

  li {
    margin: 0.5rem;
    list-style: none;
    background-color: #eee;
    padding: 1rem;
  }

  ul {
    display: flex;
  }
`;

const Landing: FC = () => {
  // modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // alert States
  const [isCreateSuccess, setIsCreateSuccess] = useState(false);
  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  //blog States
  const blogCollectionRef = collection(db, cName);
  const [actionId, setActionId] = useState<string>("");
  const [blogList, setBlogList] = useState<Record<string, Blog>>({});
  const [filteredList, setFilteredList] = useState<Array<Blog>>([]);
  const [sort, setSort] = useState("dateCreated");
  const [sortOrder, setSortOrder] = useState("desc");

  //pagination States
  const [currentItems, setCurrentItems] = useState<Array<Blog>>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getDocs(
        query(
          blogCollectionRef,
          where("isActive", "==", true),
          orderBy("dateCreated", "desc")
        )
      );

      setFilteredList(
        data.docs.map((entry) => dataToBlog(entry.data(), entry.id))
      );

      setBlogList(
        data.docs.reduce(
          (acc, doc) => ({
            ...acc,
            [doc.id]: dataToBlog(doc.data(), doc.id),
          }),
          {}
        )
      );
    };

    loadBlogs();
  }, []);

  // click handler callbacks
  const createPostClick = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const editPostClick = useCallback(
    (id: string) => {
      setActionId(id);
      setIsEditModalOpen(true);
    },
    [actionId]
  );

  const deletePostClick = useCallback((id: string) => {
    setActionId(id);
    setIsDeleteModalOpen(true);
  }, []);

  // modal callbacks
  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const closeEditModal = useCallback(() => {
    setActionId("");
    setIsEditModalOpen(false);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setActionId("");
    setIsDeleteModalOpen(false);
  }, []);

  // sort callback
  const changeSort = async (e?: any) => {
    setSort(e ? e.target.value.split(" ")[0] : sort);
    setSortOrder(e ? e.target.value.split(" ")[1] : sortOrder);

    try {
      const data = await getDocs(
        query(
          blogCollectionRef,
          where("isActive", "==", true),
          orderBy(
            e ? e.target.value.split(" ")[0] : sort,
            e ? e.target.value.split(" ")[1] : sortOrder
          )
        )
      );

      setFilteredList(data.docs.map((doc) => dataToBlog(doc.data(), doc.id)));

      setBlogList(
        data.docs.reduce(
          (acc, doc) => ({
            ...acc,
            [doc.id]: dataToBlog(doc.data(), doc.id),
          }),
          {}
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // alert Actions
  const showSuccessCreateAlert = useCallback(() => {
    setIsCreateSuccess(true);

    const successTimer = setTimeout(() => {
      setIsCreateSuccess(false);
      clearTimeout(successTimer);
    }, 3000);

    changeSort();
  }, []);

  const showSuccessEditAlert = useCallback(() => {
    setIsEditSuccess(true);

    const successTimer = setTimeout(() => {
      setIsEditSuccess(false);
      clearTimeout(successTimer);
    }, 3000);

    changeSort();
  }, []);

  const showSuccessDeleteAlert = useCallback(() => {
    setIsDeleteSuccess(true);

    const successTimer = setTimeout(() => {
      setIsDeleteSuccess(false);
      clearTimeout(successTimer);
    }, 3000);

    changeSort();
  }, []);

  // search function
  const searchList = (e: any) => {
    e.preventDefault();
    const searchKey = e.target.value;

    console.log(searchKey);
    const titleMatch: Array<Blog> = [];
    const contentMatch: Array<Blog> = [];
    Object.values(blogList)
      .filter(
        (entry) =>
          !!entry.title.toLowerCase().match(searchKey.toLowerCase()) ||
          !!entry.content.toLowerCase().match(searchKey.toLowerCase())
      )
      .forEach((entry) => {
        if (!!entry.title.toLowerCase().match(searchKey.toLowerCase())) {
          titleMatch.push(entry);
        } else {
          contentMatch.push(entry);
        }
      });

    setFilteredList([...titleMatch, ...contentMatch]);
  };

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredList.length;
    setItemOffset(newOffset);
  };

  return window.location.pathname === "/" ? (
    <Box padding={4}>
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        onSuccess={showSuccessCreateAlert}
      />

      <EditPostModal
        dataId={actionId}
        oldData={blogList[actionId]}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSuccess={showSuccessEditAlert}
      />

      <DeletePostModal
        oldData={blogList[actionId]}
        dataId={actionId}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onSuccess={showSuccessDeleteAlert}
      />

      <Box display="flex" justifyContent="space-between" marginBottom={4}>
        <Button
          type="button"
          onClick={createPostClick}
          variant="contained"
          sx={{ cursor: "pointer" }}
        >
          Create Post
        </Button>

        <Box>
          <TextField
            id="search"
            label="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
            variant="standard"
            onKeyUp={searchList}
          />

          <FormControl sx={{ width: "10rem", marginLeft: "1rem" }}>
            <InputLabel id="sortLabel">
              {sortPairs[`${sort} ${sortOrder}`]}
            </InputLabel>
            <Select
              labelId="sortLabel"
              id="demo-simple-select"
              label="Sort"
              defaultValue={`${sort} ${sortOrder}`}
              onChange={changeSort}
            >
              {Object.entries(sortPairs).map((entry: Array<string>) => (
                <MenuItem value={entry[0]} key={entry[0]}>
                  {entry[1]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {!!isCreateSuccess && (
        <Alert variant="filled" severity="success">
          Successfully Posted The Article
        </Alert>
      )}
      {!!isEditSuccess && (
        <Alert variant="filled" severity="success">
          Successfully Edited The Article
        </Alert>
      )}
      {!!isDeleteSuccess && (
        <Alert variant="filled" severity="success">
          Successfully Deleted The Article
        </Alert>
      )}

      {currentItems.length ? (
        currentItems
          .filter((blog) => blog.isActive === true)
          .map((blog: Blog) => (
            <BlogCard
              key={blog.dateCreated}
              blog={blog}
              onEditClick={() => editPostClick(blog.id)}
              onDeleteClick={() => deletePostClick(blog.id)}
            ></BlogCard>
          ))
      ) : (
        <NoRecords />
      )}
      <PaginationContainer>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={() => {}}
        />
      </PaginationContainer>
    </Box>
  ) : (
    <BlogPage />
  );
};

export default Landing;
