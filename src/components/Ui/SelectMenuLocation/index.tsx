import Select, { SingleValue } from 'react-select';
import { useState, forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import DropdownIndicator from '../DropdownIndicator';
import { useGetLocationsQuery } from '../../../redux/api/api';
import { OptionType } from '../../../types/index';

const SelectMenuLocation = forwardRef(({ setLocalLocation, resetFlag }: any, ref) => {
  const selectRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (selectRef.current) {
        (selectRef.current as any).focus();
      }
    },
  }));
  const [currentLocations, setCurrentLocations] = useState<SingleValue<OptionType>>(null);
  const { data: locations } = useGetLocationsQuery();

  const options = locations
    ? locations.map((location) => ({
        value: location.id,
        label: location.location,
      }))
    : [];

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setCurrentLocations(selectedOption);
    setLocalLocation(selectedOption ? selectedOption.value : null);
  };

  useEffect(() => {
    if (resetFlag) {
      setCurrentLocations(null);
    }
  }, [resetFlag]);

  return (
    <div>
      <Select
        classNamePrefix="custom-select"
        options={options}
        value={currentLocations}
        onChange={handleChange}
        placeholder="Select the location"
        isSearchable={true}
        noOptionsMessage={() => 'There are no matching results for your query.'}
        components={{ DropdownIndicator }}
      />
    </div>
  );
});

export default SelectMenuLocation;