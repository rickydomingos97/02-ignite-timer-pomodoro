import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
  neutral: 'gray',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: .5rem;
  border-radius: 5px;
  border: 0;

  background-color: ${props => props.theme['green-500']};
  color: ${props => props.theme.white}

  /* ${props => {
    return css`background-color: ${buttonVariants[props.variant]}`
  }} */
  
`