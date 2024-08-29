import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GetBlogByPostId } from "../../shared/api/blog";

// types
import { Post } from "../../shared/type/post";
import BlogEditor from "./BlogEditor";

function BlogView() {
  const { postId } = useParams();
  const [blogData, setBlogData] = useState<Post>();

  useEffect(() => {
    const fetchBlogById = async (postId: string) => {
      try {
        const data = await GetBlogByPostId(postId);
        setBlogData(data);
      } catch (error: any) {
        console.error("FETCH BLOG DATA ERROR: ", error);
      }
    };

    if (postId) {
      fetchBlogById(postId);
    }
  }, [postId]);

  return (
    <div className="blog-view">
      <BlogEditor data={blogData} postId={postId} />
    </div>
  );
}

export default BlogView;
