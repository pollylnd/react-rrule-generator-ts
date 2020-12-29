const computeEnd = ({ mode, after, onDate: { date } }: any) => {
  const end : any = {}

  if (mode === 'After') {
    end.count = after;
  }

  if (mode === 'On date') {
    end.until = new Date(date).toISOString();
  }

  return end;
};

export default computeEnd;
