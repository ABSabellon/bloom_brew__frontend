

export function formatPrice(price) {
  const formattedPrice = price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `₱ ${formattedPrice}`;
}
