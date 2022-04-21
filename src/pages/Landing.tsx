import { FC, useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { db } from "../firebase";
import BlogCard from "../components/BlogCard";
import { Blog } from "../types";
import { dataToBlog } from "../helpers/blogHelper";
import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import NoRecords from "../components/NoRecords";

export const cName = "blogList";

const sortPairs: Record<string, string> = {
  "title asc": "Title A-Z",
  "title desc": "Title Z-A",
  "dateCreated asc": "Oldest",
  "dateCreated desc": "Newest",
  "dateUpdated asc": "Most Outdated",
  "dateUpdated desc": "Most Updated",
};

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
  const [actionId, setActionId] = useState<string>("");
  const [blogList, setBlogList] = useState<Record<string, Blog>>({});
  const blogCollectionRef = collection(db, cName);
  const [sort, setSort] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getDocs(
        query(
          blogCollectionRef,
          where("isActive", "==", true),
          orderBy("dateCreated", "desc")
        )
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
  const changeSort = async (e: any) => {
    setSort(e.target.value.split(" ")[0]);
    setSortOrder(e.target.value.split(" ")[1]);
    try {
      const data = await getDocs(
        query(
          blogCollectionRef,
          where("isActive", "==", true),
          orderBy(e.target.value.split(" ")[0], e.target.value.split(" ")[1])
        )
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
  }, []);

  const showSuccessEditAlert = useCallback(() => {
    setIsEditSuccess(true);

    const successTimer = setTimeout(() => {
      setIsEditSuccess(false);
      clearTimeout(successTimer);
    }, 3000);
  }, []);

  const showSuccessDeleteAlert = useCallback(() => {
    setIsDeleteSuccess(true);

    const successTimer = setTimeout(() => {
      setIsDeleteSuccess(false);
      clearTimeout(successTimer);
    }, 3000);
  }, []);

  return (
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
        <FormControl sx={{ width: "10rem" }}>
          <InputLabel id="sortLabel">
            {!!sort && !!sortOrder && sortPairs[`${sort} ${sortOrder}`]}
          </InputLabel>
          <Select
            labelId="sortLabel"
            id="demo-simple-select"
            label="Sort"
            onChange={changeSort}
          >
            {Object.entries(sortPairs).map((entry: Array<string>) => (
              <MenuItem value={entry[0]}>{entry[1]}</MenuItem>
            ))}
          </Select>
        </FormControl>
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

      {Object.values(blogList).length ? (
        Object.values(blogList)
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
    </Box>
  );
};

export default Landing;
