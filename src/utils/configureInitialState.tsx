import { ReactElement } from 'react';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import computeRRuleToString from './computeRRule/toString/computeRRule';
// import { DATE_TIME_FORMAT } from '../constants/index';
import { format } from 'date-fns';

export type Config = {
  frequency: 'Yearly' | 'Monthly' | 'Weekly' | 'Daily' | 'Hourly';
  yearly: 'on' | 'on the';
  monthly: 'Never' | 'After' | 'On date';
  end: 'Never' | 'After' | 'On date';
  hideStart: boolean;
  hideEnd: boolean;
  hideError: boolean;
  weekStartsOnSunday: boolean;
  repeat: any;
};

export interface Props {
  id: string | null;
  config: Config;
  onChange: (arg: any) => {};
  calendarComponent: null | ReactElement;
  translations: {};
  value: string;
}

export interface Result {
  id: any;
  data: any;
  rrule: any;
}

const configureState = ({
  config,
  calendarComponent,
  id
}: Partial<Props>): Result => {
  const configureFrequency = () =>
    config?.repeat ? config.repeat[0] : 'Yearly';
  const configureYearly = () => config?.yearly || 'on';
  const configureMonthly = () => config?.monthly || 'on';
  const configureEnd = () => (config?.end ? config.end[0] : 'Never');
  const configureHideStart = () =>
    typeof config?.hideStart === 'undefined' ? true : config?.hideStart;
  const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;

  const data = {
    start: {
      onDate: {
        date: format(new Date(), 'yyyy-MM-dd'),
        options: {
          weekStartsOnSunday: config?.weekStartsOnSunday,
          calendarComponent
        }
      }
    },
    repeat: {
      frequency: configureFrequency(),
      yearly: {
        mode: configureYearly(),
        on: {
          month: 'Jan',
          day: 1
        },
        onThe: {
          month: 'Jan',
          day: 'Monday',
          which: 'First'
        },
        options: {
          modes: config?.yearly
        }
      },
      monthly: {
        mode: configureMonthly(),
        interval: 1,
        on: {
          day: 1
        },
        onThe: {
          day: 'Monday',
          which: 'First'
        },
        options: {
          modes: config?.monthly
        }
      },
      weekly: {
        interval: 1,
        days: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
        },
        options: {
          weekStartsOnSunday: config?.weekStartsOnSunday
        }
      },
      daily: {
        interval: 1
      },
      hourly: {
        interval: 1
      },
      options: {
        frequency: config?.repeat
      }
    },
    end: {
      mode: configureEnd(),
      after: 1,
      onDate: {
        date: format(new Date(), 'yyyy-MM-dd'),
        options: {
          weekStartsOnSunday: config?.weekStartsOnSunday,
          calendarComponent
        }
      },
      options: {
        modes: config?.end
      }
    },
    options: {
      hideStart: configureHideStart(),
      hideEnd: config?.hideEnd,
      hideError: config?.hideError,
      weekStartsOnSunday: config?.weekStartsOnSunday
    },
    error: null
  };

  return {
    id: uniqueRruleId,
    data,
    rrule: computeRRuleToString(data)
  };
};

export default configureState;
