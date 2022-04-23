import { FC, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { ArrowBack } from "@mui/icons-material";

import { dataToBlog } from "../helpers/blogHelper";
import { BlogDate, BlogTitle } from "../components/BlogCard";
import NoRecords from "../components/NoRecords";
import { db } from "../firebase";
import { Blog } from "../types";
import { cName } from "./Landing";

const BlogPage: FC = () => {
  const [blog, setBlog] = useState<Blog>();
  const id = window.location.pathname.substring(1);
  useEffect(() => {
    const loadBlog = async () => {
      const data = await getDocs(
        query(collection(db, cName), where(documentId(), "==", id))
      );
      setBlog(dataToBlog(data.docs[0].data(), data.docs[0].id));
    };

    loadBlog();
  }, []);

  return (
    <>
      <Box display="flex" textAlign="left" padding="2rem 2rem">
        <ArrowBack
          onClick={() => {
            global.history.back();
          }}
          sx={{ height: "4rem", width: "4rem", cursor: "pointer" }}
        />
      </Box>
      {blog ? (
        <Container>
          <Box display="flex" justifyContent="flex-end"></Box>
          <BlogTitle>{blog.title}</BlogTitle>
          <BlogDate>{blog.dateCreated}</BlogDate>
          <div>{blog.content}</div>
        </Container>
      ) : (
        <NoRecords />
      )}
    </>
  );
};

export default BlogPage;
