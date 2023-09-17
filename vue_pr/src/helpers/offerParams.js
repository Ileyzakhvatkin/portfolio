// Функция вычисления параметров оффера
export default function offerParams(id) {
  if (this.activeOffer !== null) {
    return this.product.offers.find((offer) => offer.id === id);
  } return this.product;
}
