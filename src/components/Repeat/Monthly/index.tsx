import React from 'react';
import RepeatMonthlyOn from './On';
import RepeatMonthlyOnThe from './OnThe';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

interface Props {
  id: string;
  monthly: {
    mode: any;
    interval: any;
    on: any;
    onThe: any;
    options: any;
  };
  handleChange: any;
  translations: any;
}

const RepeatMonthly = ({
  id,
  monthly: { mode, interval, on, onThe, options },
  handleChange,
  translations
}: Props) => {
  const isTheOnlyOneMode = (option: any) => options.modes === option;
  const isOptionAvailable = (option: any) =>
    !options.modes || isTheOnlyOneMode(option);

  return (
    <div>
      <div className='form-group row d-flex align-items-sm-center'>
        <div className='col-sm-2 offset-sm-1'>
          {translateLabel(translations, 'repeat.monthly.every')}
        </div>
        <div className='col-sm-3'>
          <input
            id={`${id}-interval`}
            name='repeat.monthly.interval'
            aria-label='Repeat monthly interval'
            className='form-control'
            value={interval}
            onChange={numericalFieldHandler(handleChange)}
          />
        </div>
        <div className='col-sm-1'>
          {translateLabel(translations, 'repeat.monthly.months')}
        </div>
      </div>

      {isOptionAvailable('on') && (
        <RepeatMonthlyOn
          id={`${id}-on`}
          mode={mode}
          on={on}
          hasMoreModes={!isTheOnlyOneMode('on')}
          handleChange={handleChange}
          translations={translations}
        />
      )}
      {isOptionAvailable('on the') && (
        <RepeatMonthlyOnThe
          id={`${id}-onThe`}
          mode={mode}
          onThe={onThe}
          hasMoreModes={!isTheOnlyOneMode('on the')}
          handleChange={handleChange}
          translations={translations}
        />
      )}
    </div>
  );
};

export default RepeatMonthly;
