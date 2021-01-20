import React from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DATE_TIME_FORMAT } from '../../constants/index';
import translateLabel from '../../utils/translateLabel';
import { format } from 'date-fns';

const StartOnDate = ({
  id,
  onDate: { date, options },
  handleChange,
  translations
}: any) => {
  const CustomCalendar = options.calendarComponent;
  const locale = options.weekStartsOnSunday ? 'en-ca' : 'en-gb';
  const calendarAttributes = {
    'aria-label': translateLabel(translations, 'start.tooltip'),
    value: date,
    dateFormat: DATE_TIME_FORMAT,
    locale,
    readOnly: true
  };

  return (
    <div className='col-5'>
      {CustomCalendar ? (
        <CustomCalendar
          key={`${id}-calendar`}
          {...calendarAttributes}
          onChange={(event: any) => {
            const editedEvent = {
              target: {
                value: event.target.value,
                name: 'start.onDate.date'
              }
            };
            handleChange(editedEvent);
          }}
        />
      ) : (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            value={date}
            disableToolbar
            variant='inline'
            format='yyyy-MM-dd'
            id='date-picker-inline'
            inputProps={{
              id: `${id}-datetime`,
              name: 'start.onDate.date',
              readOnly: true,
              'aria-label': 'change date'
            }}
            inputVariant='outlined'
            onChange={(inputDate: any) => {
              const editedEvent = {
                target: {
                  value: format(inputDate, 'yyyy-MM-dd'),
                  name: 'start.onDate.date'
                }
              };
              handleChange(editedEvent);
            }}
            className='date-picker-start'
          />
        </MuiPickersUtilsProvider>
      )}
    </div>
  );
};

export default StartOnDate;
