import React, { useContext, useEffect } from "react";
import Header from "../components/header/Header";
import PostCard from "../components/postcard/PostCard";
import { GlobalStateContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import footerLine from "../assets/footer-line.svg"
import { useForm } from "../hooks/useForm";
import styled from "styled-components";
import { useProtectedPage } from "../hooks/useProtectedPage";

export const MainFeed = styled.div`
  width: 488px;
  height: 1080px;
  background-color: #FFFFFF;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  img.footer-line {
    display: flex;
    align-self: center;
    margin-bottom: 16px;
    // margin-top: 6px;
    }
  } 
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  justify-content: start;
  height: 1080px;

  hr {
    background: linear-gradient(90deg, #ff6489 0%, #f9b24e 100%);
    margin: 18px;
    width: 355px;
    height: 1px;
    border: none;
  }
`;

export const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  width: 364px;
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
  margin-top: 20px;
  display: flex;
  flex-direction: column;

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


const FeedPage = () => {
  useProtectedPage();
  const navigate = useNavigate();
  const {
    posts,
    setPosts,
    getPosts,
    loading,
    setLoading,
    likePost,
    dislikePost,
    newPost,
  } = useContext(GlobalStateContext);

  const [form, onChange] = useForm({
    textarea: "",
  });

  useEffect(() => {
    getPosts();
  });

  const postField = async (e) => {
    e.preventDefault();
    if (Object.values(form).some((value) => value === "")) {
      alert("Por favor, preencha o campo de texto da sua postagem");
      return;
    }
    try {
      setLoading(true);
      await newPost(form);
    } catch (error) {
      console.error("Error creating new post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const postsList =
    posts && posts.length ? (
      posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          navigate={navigate}
          likePost={likePost}
          dislikePost={dislikePost}
        />
      ))
    ) : (
      <p>Nenhuma postagem disponível para visualização</p>
    );

  return (
    <>
    <MainFeed>
      <Container>
      <Header />
        <Form onSubmit={postField}>
          <textarea
            placeholder="Escreva seu post..."
            name="textarea"
            value={form.textarea}
            onChange={onChange}
          ></textarea>
          <Button>Postar</Button>
        </Form>
        <hr />
        <ContainerPosts>{postsList}</ContainerPosts>
      </Container>
    <img className="footer-line" src={footerLine} alt="Footer Line" />
    </MainFeed>
    </>
  );
};

export default FeedPage;
