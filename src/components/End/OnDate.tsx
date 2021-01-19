import React from 'react';

import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

interface Props {
  id: string;
  onDate: any;
  handleChange: ({ target }: any) => void;
  translations: any;
}

const EndOnDate = ({
  id,
  onDate: { date, options },
  handleChange,
  translations
}: Props) => {
  const CustomCalendar = options.calendarComponent;

  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'end.tooltip'),
    value: date,
    dateFormat: DATE_TIME_FORMAT,
    locale,
    readOnly: true
  };

  return (
    <div className='col-6 col-sm-3'>
      {CustomCalendar ? (
        <CustomCalendar
          key={`${id}-calendar`}
          {...calendarAttributes}
          onChange={(event: any) => {
            const editedEvent = {
              target: {
                value: event.target.value,
                name: 'end.onDate.date'
              }
            };

            handleChange(editedEvent);
          }}
        />
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            value={date}
            disableToolbar
            variant='inline'
            format='yyyy-MM-dd'
            id='date-picker-inline'
            inputProps={{
              id: `${id}-datetime`,
              name: 'end.onDate.date',
              readOnly: true
            }}
            inputVariant='outlined'
            onChange={(inputDate: any) => {
              const editedEvent = {
                target: {
                  value: format(inputDate, 'yyyy-MM-dd'),
                  name: 'end.onDate.date'
                }
              };
              handleChange(editedEvent);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      )}
    </div>
  );
};

export default EndOnDate;
