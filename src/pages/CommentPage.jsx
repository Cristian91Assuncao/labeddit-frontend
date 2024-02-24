import React, { useContext, useEffect } from "react";
import Header from "../components/header/Header";
import PostCard from "../components/postCard/PostCard";
import CommentCard from "../components/commentcard/CommentCard";
import footerLine from "../assets/footer-line.svg"
import { BASE_URL } from "../constants/baseURL";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalStateContext } from "../contexts/GlobalContext";
import Loading from "../components/loading/Loading";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { getHeaders } from "../utils/storageManager";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";
import { useProtectedPage } from "../hooks/useProtectedPage";

export const MainComments = styled.div`
display: flex;
flex-direction: column;
align-items: center;
// height: 926px;

`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  justify-content: flex-start;
  height: 88vh;
  background-color: #FFFFFF;
  width: 428px;
  height: 1080px;

  hr {
    background: linear-gradient(90deg, #ff6489 0%, #f9b24e 100%);
    margin: 18px;
    width: 355px;
    height: 1px;
    border: none;
  }
  
  img.footer-line {
    display: flex;
    align-self: center;
    margin-bottom: 16px;
    margin-top: 96px;
    }
  } 
`;

export const ContainerPosts = styled.div`
  display: flex;
  width: 364px;
  flex-direction: column;
  align-items: top;
  text-align: start;
  row-gap: 10px;
  margin: 0;
  h1 {
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  h3 {
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 12px;

  textarea {
    width: 364px;
    height: 131px;
    min-width: 364px; 
    max-width: 364px; 
    min-height: 131px;
    max-height: 600px;


    flex-shrink: 0;
    border-radius: 12px;
    background: #ededed;
    color: #6f6f6f;
    font-family: IBM Plex Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
  }

  textarea::placeholder {
    padding: 16px 0 0 16px;
    color: #6f6f6f;

    font-family: IBM Plex Sans;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const Button = styled.button`
  display: flex;
  width: 365px;
  padding: 13px 0px;
  justify-content: center;
  gap: 10px;
  text-align: center;
  font-family: Noto Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 12px;
  background: linear-gradient(90deg, #ff6489 0%, #f9b24e 100%);
  color: white;
  border: none;
  margin-top: 12px;

  cursor: pointer;

&:hover {
  transform: scale(1.05); /* Ajuste o valor conforme necessário para o efeito desejado */
  transition: transform 0.3s ease; /* Adicione uma transição para suavizar o efeito */
}
`;


const CommentsPage = () => {
  useProtectedPage()
  const navigate = useNavigate();
  const [form, onChange] = useForm({
    textarea: "",
  });

  const { post_id } = useParams();
  const {
    comments,
    setComments,
    posts,
    getPosts,
    loading,
    setLoading,
    likeComment,
    dislikeComment,
    newComment,
    likePost,
    dislikePost,
  } = useContext(GlobalStateContext);

  const getComments = async () => {
    await axios
      .get(`${BASE_URL}/posts/${post_id}/comments`, getHeaders())
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, [posts]);

  const postField = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((value) => value === "")) {
      alert("Preencha o campo de texto do seu comentário");
      return;
    }

    try {
      setLoading(true);
      await newComment(form, post_id);
    } catch (error) {
      console.error("Error creating new post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || posts.length === 0) {
    return <Loading />;
  }

  const post = posts.find((post) => post.id === post_id);
  if (!post) {
    return <ErrorPage />;
  }

  const commentslist =
    comments && comments.length ? (
      comments.map((comment) => {
        return (
          <CommentCard
            key={comment.id}
            comment={comment}
            navigate={navigate}
            likeComment={likeComment}
            dislikeComment={dislikeComment}
            post_id={post_id}
          />
        );
      })
    ) : (
      <p>Postagem sem comentários</p>
    );

  return (
    <MainComments>
      <Container>
      <Header />
        <ContainerPosts>
          <PostCard
            key={post.id}
            post={post}
            navigate={navigate}
            likePost={likePost}
            dislikePost={dislikePost}
          />
        </ContainerPosts>
        <Form onSubmit={postField}>
          <textarea
            placeholder="Escreva seu comentário..."
            name="textarea"
            value={form.textarea}
            onChange={onChange}
          ></textarea>
          <Button>Responder</Button>
        </Form>
        <hr />
        <ContainerPosts>{commentslist}</ContainerPosts>
    <img className="footer-line" src={footerLine} alt="Footer Line" />
      </Container>
      
    </MainComments>
  );
};

export default CommentsPage;
