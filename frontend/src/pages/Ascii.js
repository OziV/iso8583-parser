import { InputComponent } from "../components/Input";

const Ascii = (props) => {
  const { type } = props;

  return (
    <>
      <InputComponent type={type} />
    </>
  );
};
export default Ascii;
