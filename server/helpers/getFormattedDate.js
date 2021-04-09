const options = { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' };

const getFormattedDate = (customOptions) => new Date().toLocaleDateString('en-GB', Object.assign(options, customOptions));

module.exports = getFormattedDate;