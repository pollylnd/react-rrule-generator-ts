const computeStart = ({ onDate: { date } }: any) => {
  return {
    dtstart: new Date(date)
  };
};

export default computeStart;
