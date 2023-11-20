import Select from "react-select";

// https://react-select.com/home

const SelectList = ({ options, value, onChange: setValue }) => {
  const mapSelected = (selectedOptions) => {
    return selectedOptions
      ? selectedOptions.map((option) => ({
          id: option.value,
          email: option.label,
        }))
      : [];
  };

  const onChange = (newValue, actionMeta) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = [];
        break;
    }

    setValue(mapSelected(newValue));
  };

  return (
    <Select
      value={value}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onChange}
    />
  );
};

export const SingleSelect = ({ options, defaultValue, onChange: setValue }) => {
  const onChange = (newValue, actionMeta) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = [];
        break;
    }
    setValue(newValue);
  };

  return (
    <Select
      value={defaultValue}
      name="colors"
      options={options}
      className="basic-select"
      classNamePrefix="select"
      onChange={onChange}
    />
  );
};

export default SelectList;
