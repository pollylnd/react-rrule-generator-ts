import React from 'react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

interface Props {
  id: string;
  mode: any;
  on: any;
  hasMoreModes: boolean;
  handleChange: any;
  translations: any;
}

const RepeatMonthlyOn = ({
  id,
  mode,
  on,
  hasMoreModes,
  handleChange,
  translations
}: Props) => {
  const isActive = mode === 'on';

  const renderOptions = () => {
    const result = [];

    for (let i = 0; i < 31; i++) {
      result.push(
        <option key={i} value={i + 1}>
          {i + 1}
        </option>
      );
    }

    return result;
  }

  return (
    <div
      className={`form-group row d-flex align-items-sm-center ${
        !isActive && 'opacity-50'
      }`}
    >
      <div className='col-sm-1 offset-sm-2'>
        {hasMoreModes && (
          <input
            id={id}
            type='radio'
            name='repeat.monthly.mode'
            aria-label='Repeat monthly on'
            value='on'
            checked={isActive}
            onChange={handleChange}
          />
        )}
      </div>

      <div className='col-sm-3'>
        <select
          id={`${id}-day`}
          name='repeat.monthly.on.day'
          aria-label='Repeat monthly on a day'
          className='form-control'
          value={on.day}
          disabled={!isActive}
          onChange={numericalFieldHandler(handleChange)}
        >
          {/* {[...new Array(31)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))} */}
          {renderOptions()}
        </select>
      </div>
      <div className='col-sm-2'>
        {translateLabel(translations, 'repeat.monthly.on_day')}
      </div>
    </div>
  );
};

export default RepeatMonthlyOn;
