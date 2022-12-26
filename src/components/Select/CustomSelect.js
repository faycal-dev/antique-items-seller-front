import Select from "react-select";
import colors from "../../constants/colors";

export const CustomSelect = ({ options, defaultValue, placeholder, onChange }) => {
  return (
    <div className="mx-3 ">
      <Select
        options={options}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "none",
            borderRadius: 5,
            boxShadow: `5px 5px 5px ${colors.greyFade}`,
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: colors.brownFade,
            primary: colors.brown,
          },
        })}
      />
    </div>
  );
};
