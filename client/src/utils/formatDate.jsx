import moment from 'moment';

const formatDate = (date) => {
  const now = moment();
  const difference = now.diff(date, 'seconds');

  if (difference < 60) {
    return 'Edited just now';
  } else if (difference < 3600) {
    return `Edited ${Math.floor(difference / 60)}m ago`;
  } else if (difference < 86400) {
    return `Edited ${Math.floor(difference / 3600)}h ago`;
  } else if (difference < 2592000) {
    return `Edited ${Math.floor(difference / 86400)}d ago`;
  } else if (now.year() === date.year()) {
    return `Edited ${date.format('MMM DD')}`;
  } else {
    const yearDiff = moment().year() - date.year();
    return `Edited ${yearDiff}y ago`;
  }
};

export default formatDate;
