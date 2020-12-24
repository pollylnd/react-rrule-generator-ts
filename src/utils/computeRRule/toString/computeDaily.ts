import RRule from 'rrule';

const computeDaily = ({ interval }: any) => ({
  freq: RRule.DAILY,
  interval
});

export default computeDaily;
