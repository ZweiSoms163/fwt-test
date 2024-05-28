import { useState, forwardRef, ChangeEvent, Ref, useEffect } from 'react';
import MenuYears from './selecetMenuYears.module.css';

interface Props {
  setLocalStartDate: (date: string | null) => void;
  setLocalEndDate: (date: string | null) => void;
  resetFlag: boolean;
}

const SelectMenuYears = forwardRef(
  ({ setLocalStartDate, setLocalEndDate, resetFlag  }: Props, ref: Ref<HTMLDivElement>) => {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    const handleStartYearChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setStartYear(value);
        setLocalStartDate(value);
      }
    };

    const handleEndYearChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*$/.test(value)) {
        setEndYear(value);
        setLocalEndDate(value);
      }
    };
    useEffect(() => {
      if (resetFlag) {
        setStartYear('');
        setEndYear('');
        setLocalStartDate(null);
        setLocalEndDate(null);
      }
    }, [resetFlag, setLocalStartDate, setLocalEndDate]);

    return (
      <div className={MenuYears.wrapper} ref={ref}>
        <input
          type="text"
          placeholder="From"
          value={startYear}
          onChange={handleStartYearChange}
          inputMode="numeric"
          className={MenuYears.input}
        />
        <span className={MenuYears.separator}>—</span>
        <input
          type="text"
          placeholder="To"
          value={endYear}
          onChange={handleEndYearChange}
          inputMode="numeric"
          className={MenuYears.input}
        />
      </div>
    );
  },
);
export default SelectMenuYears;
