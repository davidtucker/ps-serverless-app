// See - https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/10420404
export const getReadableFileSize = (bytes, precision = 1) => {
  const thresh = 1024;
  let displayBytes = bytes;

  if (Math.abs(displayBytes) < thresh) {
    return `${displayBytes} B`;
  }

  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  let u = -1;
  const r = 10 ** precision;

  do {
    displayBytes /= thresh;
    u += 1;
  } while (Math.round(Math.abs(displayBytes) * r) / r >= thresh && u < units.length - 1);

  return `${displayBytes.toFixed(precision)} ${units[u]}`;
};

export const getFormattedDate = (date) => date.toLocaleString();
