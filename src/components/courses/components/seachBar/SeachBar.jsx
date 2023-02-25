import CustomInput from "../../../../common/input/Input";
import Button from "../../../../common/button/Button";
import "./seachBar.css";


const SearchBar = ({findValue, onChange, onSearch}) => {


  return (
    <div className="seach-bar">
      <div className="row">
      <CustomInput placeholder={'find...'} value={findValue} onChange={onChange}/>
      <Button text={'Seach'} onClick={onSearch}/>
      </div>
    </div>
  );
};

export default SearchBar;
