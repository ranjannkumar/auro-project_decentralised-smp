import React, { useState, useEffect } from "react";
import { publishPost, retrieveAllPosts } from "../utils/blockchain";
import { uploadFileToIPFS } from "../utils/ipfs";

function Posts() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await retrieveAllPosts();
      setPosts(allPosts);
    }
    loadPosts();
  }, []);

  const handleSubmit = async () => {
    const result = await publishPost(content);
    alert(result);
  };

  const uploadMediaFile = async () => {
    if (file) {
      const link = await uploadFileToIPFS(file);
      setFileUrl(link);
      alert(`Media uploaded to IPFS: ${link}`);
    }
  };

  return (
    <div>
      <h2>Create a Post</h2>
      <textarea
        placeholder="Write your post"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Publish Post</button>

      <h2>Post with Media</h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadMediaFile}>Upload Media</button>
      {fileUrl && <p>Media URL: {fileUrl}</p>}

      <h2>Feed</h2>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.content}</p>
          <p>By: {post.author}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
