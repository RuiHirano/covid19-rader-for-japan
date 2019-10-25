const checked = (value: boolean, options: any) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

export default {
  checked
};
