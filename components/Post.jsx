import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function Post() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [formData, setFormData] = useState({ body: ''});
    const navigate = useNavigate();
    
    
    useEffect(() => {
        async function fetchPosts() {
          try {
            const res = await fetch(`http://localhost:3000/posts/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            const resComments = await fetch(`http://localhost:3000/posts/${id}/comments`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });

            const data = await res.json();
            const dataComments = await resComments.json();
            setPost(data);
            setComments(dataComments);
          } catch (error) {
            console.error(error);
          }
        }
        fetchPosts();
      }, [id, token]);

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const deleteComment = async (commentId) => {

      try {
          console.log()
          const res = await fetch(`http://localhost:3000/posts/comments/${commentId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
          });
          await res.json();
          window.location.reload();
      } catch (error) {
          console.error(error);
      }
  }

      return (
        <div>
          <h1>Hello, I'm a single post!</h1>
          { post !== null ? (
              <div key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.author.username}</p>
                <p> {new Date(post.createdAt).toLocaleString()}</p>
                <p>{post.body}</p>
                <hr />
                </div> ) : 
                ( <p>Nothing in here</p> )
          }
          { comments !== null ? (
            comments.map((comment) => (
              <div key={comment.id}>
              <p> {comment.body} </p>
              <p> {comment.author.username} </p>
              <p> {new Date(comment.createdAt).toLocaleString()}</p>
              <button type="button" onClick={() => deleteComment(comment.id)} >Delete</button>
              </div>
            ))
          ) : ( <p> Theres no comments</p>)}
          <hr />

          {
            <form onSubmit={handleSubmit}>
            <input 
            type="body" 
            id='body'
            name='body'
            value={formData.body}
            onChange={e => setFormData({...formData, body: e.target.value})}
            placeholder='Leave a comment'
            />
            <button type='submit'>Comment</button>
            </form>
          }
        </div>
      );
}