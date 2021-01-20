import React from 'react';

import { MONTHS, DAYS_SHORT } from '../../../constants/index';
import translateLabel from '../../../utils/translateLabel';

interface Props {
  id: string;
  mode: any;
  onThe: any;
  hasMoreModes: boolean;
  handleChange: any;
  translations: any;
}

const RepeatYearlyOnThe = ({
  id,
  mode,
  onThe,
  hasMoreModes,
  handleChange,
  translations
}: Props) => {
  const isActive = mode === 'on the';
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
            aria-label='Repeat yearly on the'
            name='repeat.yearly.mode'
            checked={isActive}
            value='on the'
            onChange={handleChange}
          />
        )}
      </div>
      <div className='col-sm-2'>
        {translateLabel(translations, 'repeat.yearly.on_the')}
      </div>

      <div className='col-sm-3'>
        <select
          id={`${id}-which`}
          name='repeat.yearly.onThe.which'
          aria-label='Repeat yearly on the which'
          className='form-control'
          value={onThe.which}
          disabled={!isActive}
          onChange={handleChange}
        >
          <option value='First'>
            {translateLabel(translations, 'numerals.first')}
          </option>
          <option value='Second'>
            {translateLabel(translations, 'numerals.second')}
          </option>
          <option value='Third'>
            {translateLabel(translations, 'numerals.third')}
          </option>
          <option value='Fourth'>
            {translateLabel(translations, 'numerals.fourth')}
          </option>
          <option value='Fifth'>
            {translateLabel(translations, 'numerals.fifth')}
          </option>
          <option value='Sixth'>
            {translateLabel(translations, 'numerals.sixth')}
          </option>
          <option value='Last'>
            {translateLabel(translations, 'numerals.last')}
          </option>
        </select>
      </div>

      <div className='col-sm-2'>
        <select
          id={`${id}-day`}
          name='repeat.yearly.onThe.day'
          aria-label='Repeat yearly on the day'
          className='form-control'
          value={onThe.day}
          disabled={!isActive}
          onChange={handleChange}
        >
          {DAYS_SHORT.map((day) => (
            <option key={day} value={day}>
              {translateLabel(translations, `days_short.${day.toLowerCase()}`)}
            </option>
          ))}
        </select>
      </div>

      <div className='col-sm-1'>
        {translateLabel(translations, 'repeat.yearly.of')}
      </div>

      <div className='col-sm-3'>
        <select
          id={`${id}-month`}
          name='repeat.yearly.onThe.month'
          aria-label='Repeat yearly on the month'
          className='form-control'
          value={onThe.month}
          disabled={!isActive}
          onChange={handleChange}
        >
          {MONTHS.map((month) => (
            <option key={month} value={month}>
              {translateLabel(translations, `months.${month.toLowerCase()}`)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RepeatYearlyOnThe;
