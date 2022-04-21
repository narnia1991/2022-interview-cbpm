import { Box, Card, Icon } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { Blog } from "../types";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";

type Props = {
  blog: Blog;
  onEditClick: MouseEventHandler;
  onDeleteClick: MouseEventHandler;
};

export const BlogTitle = styled.h2`
  margin: 0;
`;

export const BlogDate = styled.div`
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-style: italic;
  color: #777;
`;

const BlogCard: FC<Props> = ({ blog, onEditClick, onDeleteClick }) => {
  const maxTitleLength = 64;
  const maxContentLength = 128;
  return (
    <Card
      variant="outlined"
      sx={{
        marginTop: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        cursor: "pointer",
      }}
      onClick={() => {
        window.location.href += blog.id;
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <EditOutlined
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEditClick(e);
          }}
          color="primary"
        />
        <DeleteOutlined
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeleteClick(e);
          }}
          color="error"
        />
      </Box>
      <BlogTitle>
        {blog.title.length > maxTitleLength
          ? `${blog.title.substring(0, maxTitleLength)}…`
          : blog.title}
      </BlogTitle>
      <BlogDate>{blog.dateCreated}</BlogDate>
      <div>
        {blog.content.length > maxContentLength
          ? `${blog.content.substring(0, maxContentLength)}…`
          : blog.content}
      </div>
    </Card>
  );
};

export default BlogCard;
