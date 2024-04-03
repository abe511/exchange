import { FieldContainer, LabelStyled, InputStyled, TextStyled } from "./InputField";

type Props = {
  type: string,
  label: string,
  inputValue: string,
  currency: string,
}

const TextField:React.FC<Props> = ({ type, label, inputValue, currency }) => {

  return (
    <FieldContainer>
      <LabelStyled htmlFor={type}>{label}</LabelStyled>
      <InputStyled type="numeric" id={type} value={inputValue} disabled/>
      <TextStyled>{currency}</TextStyled>
    </FieldContainer>
  );
}


export default TextField;
