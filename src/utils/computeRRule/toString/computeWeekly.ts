import RRule from 'rrule';
import values from 'lodash/values';

const computeWeekly = ({ interval, days }: any) => ({
  freq: RRule.WEEKLY,
  interval,
  byweekday: values(days).reduce(
    (activeDays, isDayActive, dayIndex) =>
      isDayActive ? [...activeDays, dayIndex] : activeDays,
    []
  )
});

export default computeWeekly;
