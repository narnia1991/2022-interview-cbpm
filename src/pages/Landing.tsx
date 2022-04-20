import { FC, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase";
import BlogCard from "../components/BlogCard";
import { Blog } from "../types";
import { dataToBlog } from "../helpers/blogHelper";

const Landing: FC = () => {
  const [blogList, setBlogList] = useState<Array<Blog>>([]);
  const blogCollectionRef = collection(db, "blogList");

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getDocs(blogCollectionRef);
      setBlogList(
        data.docs.map((doc) => {
          return dataToBlog(doc.data());
        })
      );
    };

    loadBlogs();
  }, []);

  return (
    <div>
      {blogList.map((blog: Blog) => (
        <BlogCard key={blog.dateCreated} blog={blog}></BlogCard>
      ))}
    </div>
  );
};

export default Landing;
