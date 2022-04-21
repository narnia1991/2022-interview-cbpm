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

const BlogTitle = styled.h2`
  margin: 0;
`;
const BlogDate = styled.div`
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  font-style: italic;
  color: #777;
`;

const BlogCard: FC<Props> = ({ blog, onEditClick, onDeleteClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        marginTop: "1rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <EditOutlined
          sx={{ cursor: "pointer" }}
          onClick={onEditClick}
          color="primary"
        />
        <DeleteOutlined
          sx={{ cursor: "pointer" }}
          onClick={onDeleteClick}
          color="error"
        />
      </Box>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogDate>{blog.dateCreated}</BlogDate>
      <div>{blog.content}</div>
    </Card>
  );
};

export default BlogCard;
