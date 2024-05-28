import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import DropdownIndicator from '../DropdownIndicator';
import { useGetAuthorsQuery } from '../../../redux/api/api';
import { OptionType } from '../../../types/index';

const SelectMenuAuthor = forwardRef(({ setLocalAuthor, resetFlag }: any, ref) => {
  const selectRef = useRef(null);
  const [currentAuthors, setCurrentAuthors] = useState<SingleValue<OptionType>>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (selectRef.current) {
        (selectRef.current as any).focus();
      }
    },
  }));
  const { data: authors } = useGetAuthorsQuery();

  const options = authors
    ? authors.map((author) => ({
        value: author.id,
        label: author.name,
      }))
    : [];

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setCurrentAuthors(selectedOption);
    setLocalAuthor(selectedOption ? selectedOption.value : null);
  };

  useEffect(() => {
    if (resetFlag) {
      setCurrentAuthors(null);
    }
  }, [resetFlag]);

  return (
    <div>
      <Select
        classNamePrefix="custom-select"
        options={options}
        value={currentAuthors}
        onChange={handleChange}
        placeholder="Select the artist"
        isSearchable={true}
        noOptionsMessage={() => 'There are no matching results for your query.'}
        components={{ DropdownIndicator }}
      />
    </div>
  );
});

export default SelectMenuAuthor;


// немного погрешил any, прошу прощения