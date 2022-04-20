import { Card } from "@mui/material";
import { FC } from "react";
import { Blog } from "../types";

type Props = {
  blog: Blog;
};

const BlogCard: FC<Props> = ({ blog }) => {
  return (
    <Card>
      <div>{blog.title}</div>
      <div>{blog.dateCreated}</div>
      <div>{blog.content}</div>
    </Card>
  );
};

export default BlogCard;
