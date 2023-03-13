import { InputComponent } from "../components/Input";

const Json = (props) => {
  const { type } = props;

  return (
    <>
      <InputComponent type={type} />
    </>
  );
};
export default Json;
