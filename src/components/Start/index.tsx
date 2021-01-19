import React from 'react';
import StartOnDate from './OnDate';

import translateLabel from '../../utils/translateLabel';

interface Props {
  id: string;
  start: any;
  handleChange: ({ target }: any) => void;
  translations: {};
}

const Start: React.FC<Props> = ({
  id,
  start: { onDate },
  handleChange,
  translations
}): React.ReactElement => (
  <div className='px-3'>
    <div className='form-group row'>
      <div className='col-sm-2 text-sm-right'>
        <label htmlFor={id} className='col-form-label'>
          <strong>{translateLabel(translations, 'start.label')}</strong>
        </label>
      </div>
      <StartOnDate
        id={id}
        onDate={onDate}
        handleChange={handleChange}
        translations={translations}
      />
    </div>
  </div>
);

export default Start;
