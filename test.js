function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, pathParent) {
  return formatObjectValue(value, pathParent)
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if(previouslySeenValues.includes(value)) {
    return '[Circular]'
  }

  const seenValues = [...previouslySeenValues, value];

  return formatObject(value, seenValues);
}

function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return '{}';
  }

  console.log(seenValues.length, seenValues)

  if (seenValues.length > 2) {
    return '[' + getObjectTag(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function getObjectTag(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;
    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}


var a = {
  one: {

  }
}
a.one.two = a
var b = {}
console.log(123, inspect(a))
