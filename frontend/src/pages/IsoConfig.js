import { InputComponent } from "../components/Input";

const IsoConfig = (props) => {
  const { type } = props;

  return (
    <>
      <InputComponent type={type} />
    </>
  );
};
export default IsoConfig;
