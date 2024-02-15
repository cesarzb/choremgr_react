import Select from "react-select";
import classNames from "classnames";

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
      classNames={{
        container: () => classNames("text-black"),
        control: (state) => (state.isFocused ? "border-red-600" : ""),
        menu: () => classNames("text-black"),
      }}
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
      classNamePrefix="select"
      onChange={onChange}
      classNames={{
        container: () => classNames("text-black"),
        control: (state) =>
          state.isFocused ? "border-red-600 border" : "border-red-600 border",
        menu: () => classNames("text-black"),
      }}
    />
  );
};

export default SelectList;
