import _ from 'lodash';

const replacePlaceholder = (text: any, replacements = {}) => {
  _.forEach(replacements, (value, key) => {
    text = text.replace(`%{${key}}`, value);
  });

  return text;
};

const translateLabel = (translations: any, key: any, replacements = {}) => {
  if (_.isFunction(translations)) {
    return translations(key, replacements);
  } else if (_.isPlainObject(translations)) {
    return replacePlaceholder(
      _.get(translations, key, `[translation missing '${key}']`),
      replacements
    );
  }

  return null;
};

export default translateLabel;
