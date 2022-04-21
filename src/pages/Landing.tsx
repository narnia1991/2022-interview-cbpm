import { FC, useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Box, Button } from "@mui/material";

import { db } from "../firebase";
import BlogCard from "../components/BlogCard";
import { Blog } from "../types";
import { dataToBlog } from "../helpers/blogHelper";
import CreatePostModal from "./CreatePostModal";
import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";

export const cName = "blogList";

const Landing: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actionId, setActionId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogList, setBlogList] = useState<Record<string, Blog>>({});
  const blogCollectionRef = collection(db, cName);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getDocs(
        query(
          blogCollectionRef,
          // where("isActive", "==", true),
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

  const closeCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const closeEditModal = useCallback(() => {
    setActionId("");
    setIsEditModalOpen(false);
  }, []);

  const closeDeleteModal = useCallback(() => {
    console.log("potato");
    setActionId("");
    setIsDeleteModalOpen(false);
  }, []);

  console.log(blogList);
  return (
    <Box padding={4}>
      <CreatePostModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />

      <EditPostModal
        dataId={actionId}
        oldData={blogList[actionId]}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
      />

      <DeletePostModal
        oldData={blogList[actionId]}
        dataId={actionId}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      />

      <Button
        type="button"
        onClick={createPostClick}
        variant="contained"
        sx={{ cursor: "pointer" }}
      >
        Create Post
      </Button>

      {Object.values(blogList)
        .filter((blog) => blog.isActive === true)
        .map((blog: Blog) => (
          <BlogCard
            key={blog.dateCreated}
            blog={blog}
            onEditClick={() => editPostClick(blog.id)}
            onDeleteClick={() => deletePostClick(blog.id)}
          ></BlogCard>
        ))}
    </Box>
  );
};

export default Landing;
