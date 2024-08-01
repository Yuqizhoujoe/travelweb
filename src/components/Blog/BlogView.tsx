import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../shared/api/axios";

// types
import { Post } from "../../shared/type/post";
import BlogEditor from "./BlogEditor";

function BlogView() {
  const { postId } = useParams();
  const [blogData, setBlogData] = useState<Post>();

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        const response = await axios.get(`/travel/posts/${postId}`);
        setBlogData(response.data);
      } catch (error: any) {
        console.error("FETCH BLOG DATA ERROR: ", error);
      }
    };

    if (postId) {
      fetchBlogById();
    }
  }, [postId]);

  return (
    <div className="blog-view">
      <BlogEditor data={blogData} postId={postId} />
    </div>
  );
}

export default BlogView;
