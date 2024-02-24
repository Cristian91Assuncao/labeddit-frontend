import React, { useState } from "react";
import logo from "../assets/logo.svg";
import footerLine from "../assets/footer-line.svg"
import { useNavigate } from "react-router-dom";
import { goToFeed, goToSignUp } from "../routes/Coordinator";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../constants/baseURL";
import { setStorageItem } from "../utils/storageManager";
import Loading from "../components/loading/Loading";
import styled from "styled-components";

export const MainLogin = styled.div`
  width: 428px;
  height: 926px;
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
    margin-top: 96px;
    }
  } 
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  hr {
    background: linear-gradient(90deg, #FF6489 0%, #F9B24E 100%);
    margin: 18px;
    width: 355px;
    height: 1px;
    border: none;
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin: 100px 0;
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

  input {
    border-radius: 10px;
    border: 1px solid #d5d8de;
    background: #fff;
    width: 343px;
    height: 60px;
    margin-bottom: 8px;
    padding-left: 20px;

    color: #000;

    font-family: Noto Sans;
    font-size: 16px;
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
  cursor: pointer;
  border-radius: 27px;

&:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

  &.orange {
    
    background: linear-gradient(90deg, #ff6489 0%, #f9b24e 100%);
    color: white;
    border: none;
    margin-top: 56px;
    border: none;
  }

  &.white {
    border: 1px solid #fe7e02;
    color: #fe7e02;
    width: auto;
    width: 365px;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [form, onChange] = useForm({
    email: '',
    password: ''
  })


  const login = (e) => {
    e.preventDefault();
    if (Object.values(form).some(value => value === '')) {
      alert("Por favor, preencha todos os campos do formulário de login");
      return; 
    }
    setLoading(true)
    axios.post(`${BASE_URL}/users/login`, form)
      .then((res) => {
        setStorageItem("token", res.data.token)
        goToFeed(navigate)
      })
      .catch((err) => {
        console.log(err.response)
        alert(err.response.data.message || "Erro inesperado, tente novamente")
      })
      .finally(() => { setLoading(false) })
  }

  return (
    <>
    <MainLogin>
      <Container>
        <ContainerLogo>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <h1>LabEddit</h1>
            <h3>O projeto de rede social da Labenu</h3>
          </div>
        </ContainerLogo>
        <Form onSubmit={login}>
          <input 
          type="email" 
          name="email"
          value={form.value}
          onChange={onChange} 
          placeholder="E-mail" />
          <input 
          type="password" 
          name="password"
          value={form.value}
          onChange={onChange} 
          placeholder="Senha" />
          <Button className="orange" type="submit">{
            loading
              ?
              <Loading size="20px" />
              :
              "Continuar"
          }</Button>
        </Form>
        <hr />
        <Button className="white" onClick={() => goToSignUp(navigate)}>
          Crie uma conta!
        </Button>
      </Container>
    <img className="footer-line" src={footerLine} alt="Footer Line" />
    </MainLogin>
    </>
  );
};

export default LoginPage;
