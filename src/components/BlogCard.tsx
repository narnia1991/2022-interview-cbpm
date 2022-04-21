import { Box, Card, Icon } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import { Blog } from "../types";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

type Props = {
  blog: Blog;
  onEditClick: MouseEventHandler;
  onDeleteClick: MouseEventHandler;
};

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
      <h1>{blog.title}</h1>
      <div>{blog.dateCreated}</div>
      <div>{blog.content}</div>
    </Card>
  );
};

export default BlogCard;
