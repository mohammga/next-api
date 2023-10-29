export function truncate(desc, limit = 50) {
  if (desc.length <= limit) {
    return desc;
  }

  return `${desc.substring(0, limit)}...`;
}
