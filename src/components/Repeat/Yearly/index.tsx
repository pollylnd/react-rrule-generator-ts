import React from 'react';
import RepeatYearlyOn from './On';
import RepeatYearlyOnThe from './OnThe';

interface Props {
  id: string;
  yearly: {
    mode: any;
    on: any;
    onThe: any;
    options: any;
  };
  handleChange: any;
  translations: any;
}

const RepeatYearly = ({
  id,
  yearly: { mode, on, onThe, options },
  handleChange,
  translations
}: Props) => {
  const isTheOnlyOneMode = (option: any) => options.modes === option;
  const isOptionAvailable = (option: any) =>
    !options.modes || isTheOnlyOneMode(option);
  return (
    <div>
      {isOptionAvailable('on') && (
        <RepeatYearlyOn
          id={`${id}-on`}
          mode={mode}
          on={on}
          hasMoreModes={!isTheOnlyOneMode('on')}
          handleChange={handleChange}
          translations={translations}
        />
      )}
      {isOptionAvailable('on the') && (
        <RepeatYearlyOnThe
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

export default RepeatYearly;
