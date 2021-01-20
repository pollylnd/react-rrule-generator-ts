import React from 'react';
import EndAfter from './After';
import EndOnDate from './OnDate';

import translateLabel from '../../utils/translateLabel';

interface Props {
  id: string;
  end: {
    mode: any;
    after: any;
    onDate: any;
    options: any;
  };
  handleChange: ({ target }: any) => void;
  translations: any;
}

const End: React.FC<Props> = ({
  id,
  end: { mode, after, onDate, options },
  handleChange,
  translations
}): React.ReactElement => {
  const isOptionAvailable = (option: string) =>
    !options.modes || options.modes.indexOf(option) !== -1;
  const isOptionSelected = (option: string) => mode === option;

  return (
    <div className='px-3'>
      <div className='form-group row'>
        <div className='col-sm-2 text-sm-right'>
          <label htmlFor={id} className='col-form-label'>
            <strong>{translateLabel(translations, 'end.label')}</strong>
          </label>
        </div>
        <div className='col-sm-4'>
          <select
            name='end.mode'
            id={id}
            className='form-control'
            value={mode}
            onChange={handleChange}
          >
            {isOptionAvailable('Never') && (
              <option value='Never'>
                {translateLabel(translations, 'end.never')}
              </option>
            )}
            {isOptionAvailable('After') && (
              <option value='After'>
                {translateLabel(translations, 'end.after')}
              </option>
            )}
            {isOptionAvailable('On date') && (
              <option value='On date'>
                {translateLabel(translations, 'end.on_date')}
              </option>
            )}
          </select>
        </div>

        {isOptionSelected('After') && (
          <EndAfter
            id={`${id}-after`}
            after={after}
            handleChange={handleChange}
            translations={translations}
          />
        )}
        {isOptionSelected('On date') && (
          <EndOnDate
            id={`${id}-onDate`}
            onDate={onDate}
            handleChange={handleChange}
            translations={translations}
          />
        )}
      </div>
    </div>
  );
};

export default End;
