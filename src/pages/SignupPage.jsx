import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../routes/Coordinator";
import Header from "../components/header/Header";
import footerLine from "../assets/footer-line.svg"
import {useForm} from '../hooks/useForm'
import { emailPattern, namePattern, passwordPattern } from '../constants/patterns'
import { BASE_URL } from "../constants/baseURL";
import axios from "axios";
import { setStorageItem } from "../utils/storageManager";
import Loading from "../components/loading/Loading";
import styled from "styled-components";

export const MainLogin = styled.div`
  width: 488px;
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
    // margin-top: 96px;
    }
  } 
`

export const Container = styled.div`
  
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 92vh;
  // padding: 0 8vw;
  width: 355px;

  p {
    color: #000;
    font-family: Noto Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: auto;
  }

  a {
    color: #4088cb;
    font-family: Noto Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  // margin-top: 6vh;

  h1 {
    color: #373737;
    font-family: IBM Plex Sans;
    font-size: 33px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 3vh;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    border-radius: 4px;
    border: 1px solid #d5d8de;
    background: #fff;

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
  p {
      margin-top: 5vh;
    }

  .check {
    margin-top: 1vh;

    p {
      margin-top: 0;
    }
  }

  div {
    display: flex;
    flex-direction: row;  
    align-items: center; 

    .checkbox {
      margin-right: 10px;
    }
  }
`;

export const Button = styled.button`
  display: flex;

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

&:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

  &.orange {
    border-radius: 27px;
    background: linear-gradient(90deg, #ff6489 0%, #f9b24e 100%);
    color: white;
    border: none;
    margin-bottom: 10vh;
    margin-top: 5vh;
  }
`;


const SignupPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false)
  const [form, onChange] = useForm({
    nickname: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const signup = (e) => {
    e.preventDefault();
    if (Object.values(form).some(value => value === '')) {
      alert("Preencha todos os campos do formulário de cadastro");
      return; 
    }
    
    setLoading(true)

    axios.post(`${BASE_URL}/users/signup`, form)
      .then((res) => {
        setStorageItem("token", res.data.token)
        goToLogin(navigate);
      })
      .catch((err) => {
        console.log(form);
        console.log(err.response.data)
        alert(err.response.data.message || "Erro inesperado, tente novamente")
      })
      .finally(() => { setLoading(false) })
  }

  return (
    <MainLogin>
      <Header/>
      <Container>
        <ContainerLogo>
          <div>
            <h1>Olá, boas vindas ao LabEddit ;)</h1>
          </div>
        </ContainerLogo>
        <Form onSubmit={signup}>
          <input
            type="nickname"
            name="nickname"
            placeholder="Apelido"
            pattern={namePattern}
            value={form.value}
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            pattern={emailPattern}
            title="Digite um email válido"
            value={form.value}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            pattern={passwordPattern}
            title="Digite um password válido"
            value={form.value}
            onChange={onChange}
          />

          <p>
            Ao continuar, você concorda com o nosso <a href='/signup'>Contrato de usuário</a> e nossa <a href='/signup'>Política de Privacidade</a>
          </p>
          <div className="check">
            <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
            <p>Eu concordo em receber emails sobre coisas legais no Labeddit</p>
          </div>
          <Button className="orange" type="submit">{
            loading
              ?
              <Loading size="20px" />
              :
              "Cadastrar"
          }</Button>
        </Form>
      </Container>
    <img className="footer-line" src={footerLine} alt="Footer Line" />
    </MainLogin>
  );
};

export default SignupPage;
