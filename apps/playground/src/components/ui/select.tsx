interface SelectProps {
  label: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  value: string
}

export const Select = ({ label, onChange, options, value }: SelectProps) => {
  return (
    <>
      <label className='font-medium mb-1' htmlFor={label}>
        {label}
      </label>
      <select
        className='border border-gray-300 rounded-md p-2'
        id={label}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}
