export const ASCENDING = 'ASCENDING'
export const DESCENDING = 'DESCENDING'

export function getOrderBy(newProperty, oldOrderBy) {
  return {
    property: newProperty,
    direction: getDirection(newProperty, oldOrderBy.property, oldOrderBy.direction)
  }
}

function getDirection(newProperty, oldProperty, oldDirection) {
  if (oldProperty === newProperty) {
    if (oldDirection === ASCENDING) {
      return DESCENDING
    }
    return ASCENDING
  }
  return ASCENDING
}
