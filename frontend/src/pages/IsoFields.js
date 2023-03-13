import { InputComponent } from "../components/Input";

const IsoFields = (props) => {
  const { type } = props;

  return (
    <>
      <InputComponent type={type} />
    </>
  );
};
export default IsoFields;
