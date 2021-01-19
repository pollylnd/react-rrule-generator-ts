import React from 'react';
import numericalFieldHandler from '../../../utils/numericalFieldHandler';
import translateLabel from '../../../utils/translateLabel';

interface Props {
  id: string;
  hourly: {
    interval: any;
  };
  handleChange: ({ target }: any) => void;
  translations: any;
}

const RepeatHourly = ({
  id,
  hourly: { interval },
  handleChange,
  translations
}: Props) => (
  <div className='form-group row d-flex align-items-sm-center'>
    <div className='col-sm-1 offset-sm-2'>
      {translateLabel(translations, 'repeat.hourly.every')}
    </div>
    <div className='col-sm-2'>
      <input
        id={`${id}-interval`}
        name='repeat.hourly.interval'
        aria-label='Repeat hourly interval'
        className='form-control'
        value={interval}
        onChange={numericalFieldHandler(handleChange)}
      />
    </div>
    <div className='col-sm-1'>
      {translateLabel(translations, 'repeat.hourly.hours')}
    </div>
  </div>
);

export default RepeatHourly;
