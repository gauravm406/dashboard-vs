const CustomSelect = ({
  data,
  label,
  ...rest
}: {
  data: string[];
  label: string;
}) => {
  return (
    <div>
      <label htmlFor={label}>{label}:</label>
      <select name={label} id={label} {...rest}>
        {data?.map((option, index) => {
          const key = `${option}-${index}`;
          return <option key={key}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default CustomSelect;
