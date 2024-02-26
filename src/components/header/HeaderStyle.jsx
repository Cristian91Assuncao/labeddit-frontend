import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  // text-align: center;
  align-items: center;
  justify-content: space-around;
  height: 56px;
  width: 490px;
  background-color: #ededed;
  margin-bottom: 24px;
  padding-top: 0;

  img {
    width: 28.023px;
    height: 28.639px;
  }
`;

export const Button = styled.button`
  color: #4088cb;
  text-align: center;
  font-family: Noto Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;  
  cursor: pointer;

  &:hover {
    color: orange;
  }
`;

export const XButton = styled.button`
  border: none;
  img {
    width: 23px;
    height: 23px;
  }

  cursor: pointer;


`;
