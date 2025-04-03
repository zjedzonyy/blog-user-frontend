import {useEffect, useState} from "react";


export default function Posts() {
    const [posts, setPosts] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchPosts() {
          try {
            const res = await fetch('http://localhost:3000/posts', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            const data = await res.json();
            setPosts(data);
            console.log(data);
            console.log(localStorage)
          } catch (error) {
            console.error(error);
          }
        }
        fetchPosts();
      }, [token]);

      return (
        <div>
          {posts.length ? (
            posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p>No posts</p>
          )}
        </div>
      );
}