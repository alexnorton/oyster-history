const transformEvent = event => {
  const startTime = event[0] && new Date(event[0]);
  const endTime = event[1] && new Date(event[1]);
  const action = event[2];
  const charge = event[3];
  const credit = event[4];
  const balance = event[5];
  const note = event[6];

  return {
    startTime,
    endTime,
    action,
    charge,
    credit,
    balance,
    note,
  };
};

export default transformEvent;
